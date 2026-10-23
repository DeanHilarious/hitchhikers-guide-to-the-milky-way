#!/usr/bin/env python3
"""
Generate Volcengine TTS narrations (MP3 + word/sentence timestamps JSON) for all 18
Solar System planets & Milky Way landmarks, plus a seamless Deep Cosmic Ambient BGM MP3.

Usage:
  eval "$(grep '^export VOLC_TTS_API_KEY=' ~/.zshrc | tail -1)" && python3 generate_narration.py [--force] [--speaker S_31XFsNrh2]
"""
import asyncio
import json
import math
import os
import shutil
import struct
import subprocess
import sys
import wave

SKILL_SCRIPTS = os.path.expanduser("~/.claude/skills/video-narration/scripts")
sys.path.insert(0, SKILL_SCRIPTS)
import volc_tts  # noqa: E402

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
NARRATION_JSON = os.path.join(BASE_DIR, "narration.json")
AUDIO_DIR = os.path.join(BASE_DIR, "audio")
FFMPEG = (
    os.environ.get("FFMPEG")
    or shutil.which("ffmpeg")
    or ("/Users/rongyaozu/homebrew/bin/ffmpeg" if os.path.exists("/Users/rongyaozu/homebrew/bin/ffmpeg") else None)
    or ("/opt/homebrew/bin/ffmpeg" if os.path.exists("/opt/homebrew/bin/ffmpeg") else "ffmpeg")
)
SUBTITLE_EVENT = 364

PREFERRED_SPEAKER = os.environ.get("VOLC_SPEAKER", "S_31XFsNrh2")
FALLBACK_FEMALE_SPEAKER = "zh_female_wenroushunv_uranus_bigtts"
GENTLE_CONTEXT = "请用温柔、知性、空灵且富有感染力的宇宙纪录片女声娓娓道来，语调舒缓深邃。"


async def probe_speaker(speaker: str):
    """Test whether `speaker` is authorized on the current VOLC_TTS_API_KEY and return (speaker, resource_id, context)."""
    if speaker.startswith("S_"):
        for res_id in ["seed-icl-2.0", "seed-icl-1.0", "volc.megatts.default", "seed-tts-2.0"]:
            os.environ["VOLC_TTS_RESOURCE_ID"] = res_id
            try:
                await volc_tts.synth_many(["你好"], speaker, fmt="mp3", sample_rate=24000, subtitle=False)
                print(f"[TTS] Cloned speaker {speaker} succeeded with X-Api-Resource-Id={res_id}")
                return speaker, res_id, None
            except Exception as e:
                print(f"[TTS] Probe {speaker} with {res_id} -> {e}")
        print(
            f"[TTS] Notice: Cloned voice '{speaker}' requires 'seed-icl-2.0' / 'volc.seedicl.default' permission on VOLC_TTS_API_KEY.\n"
            f"[TTS] Falling back to Volcengine 2.0 gentle female voice '{FALLBACK_FEMALE_SPEAKER}' on 'seed-tts-2.0'."
        )
        os.environ["VOLC_TTS_RESOURCE_ID"] = "seed-tts-2.0"
        return FALLBACK_FEMALE_SPEAKER, "seed-tts-2.0", GENTLE_CONTEXT
    else:
        res_id = os.environ.get("VOLC_TTS_RESOURCE_ID", "seed-tts-2.0")
        os.environ["VOLC_TTS_RESOURCE_ID"] = res_id
        return speaker, res_id, GENTLE_CONTEXT


def generate_cosmic_bgm(mp3_path: str, duration_sec: float = 64.0, sr: int = 44100):
    """
    Synthesize a deep, atmospheric, seamless-looping cosmic pure music BGM (Interstellar / Brian Eno style):
    - 4-chord slow cosmic progression (Dm9 -> Bbmaj7#11 -> Fmaj9 -> C6/9 -> Am11) over 64 seconds
    - Warm pipe-organ / analog poly-pad harmonics with slow stereo chorus & low-pass filter breathe
    - Deep sub-bass gravitational drone (D1 / Bb0 / F1 / A1)
    - Shimmering high celestial fifths & gentle starlight bell arpeggios
    """
    wav_path = mp3_path.replace(".mp3", "_temp.wav")
    n_samples = int(duration_sec * sr)

    # 4 cosmic chords, each 16 seconds (seamless loop at 64.0s)
    chords = [
        # Dm9 (D2, A2, F3, A3, C4, E4)
        [73.42, 110.00, 174.61, 220.00, 261.63, 329.63],
        # Bbmaj7#11 (Bb1, F2, D3, A3, C4, E4)
        [58.27, 87.31, 146.83, 220.00, 261.63, 329.63],
        # Fmaj9 (F1, C2, A2, E3, G3, C4)
        [43.65, 65.41, 110.00, 164.81, 196.00, 261.63],
        # Am11 / C6 (A1, E2, G2, C3, E3, B3)
        [55.00, 82.41, 98.00, 130.81, 164.81, 246.94],
    ]
    # Sparse celestial starlight bell notes (frequency, start_time, decay_sec, pan)
    bell_notes = [
        (523.25, 2.5, 4.5, -0.35),
        (659.25, 5.2, 5.0, 0.40),
        (587.33, 8.8, 5.5, -0.20),
        (880.00, 12.5, 4.8, 0.30),
        (659.25, 18.0, 5.0, -0.40),
        (783.99, 22.0, 5.2, 0.25),
        (587.33, 26.5, 5.5, -0.30),
        (1046.50, 30.0, 4.8, 0.35),
        (659.25, 34.5, 5.2, -0.25),
        (523.25, 39.0, 5.0, 0.40),
        (880.00, 43.5, 5.5, -0.35),
        (783.99, 47.0, 4.5, 0.20),
        (587.33, 51.5, 5.2, -0.30),
        (659.25, 55.8, 5.0, 0.35),
        (440.00, 60.0, 3.8, 0.00),
    ]

    chord_len = duration_sec / len(chords)
    two_pi = 2.0 * math.pi
    buf = bytearray(n_samples * 4)  # 16-bit stereo

    for i in range(n_samples):
        t = i / sr
        # Smooth chord crossfade position
        c_pos = (t / chord_len) % len(chords)
        c_idx0 = int(c_pos) % len(chords)
        c_idx1 = (c_idx0 + 1) % len(chords)
        frac = c_pos - int(c_pos)
        # Crossfade only in the last 3.5 seconds of each 16s chord
        fade_zone = 3.5 / chord_len
        if frac > (1.0 - fade_zone):
            u = (frac - (1.0 - fade_zone)) / fade_zone
            # Cosine crossfade
            w1 = 0.5 * (1.0 - math.cos(math.pi * u))
            w0 = 1.0 - w1
        else:
            w0, w1 = 1.0, 0.0

        # Slow breathing LFOs for cosmic expanse
        breath = 0.72 + 0.28 * math.sin(two_pi * t / 16.0)
        shimmer_l = math.sin(two_pi * 0.11 * t) * 0.003
        shimmer_r = math.cos(two_pi * 0.13 * t) * 0.003

        left = 0.0
        right = 0.0

        # Blend active chords
        for weight, freqs in ((w0, chords[c_idx0]), (w1, chords[c_idx1])):
            if weight <= 0.0001:
                continue
            # 1. Sub-bass & root drone
            f_sub = freqs[0]
            sub = math.sin(two_pi * f_sub * t) * 0.24 + math.sin(two_pi * (f_sub * 2.0) * t) * 0.10
            left += weight * sub
            right += weight * sub

            # 2. Warm poly-organ / pad voices with stereo detune + 2nd & 3rd warm harmonics
            for v_idx, f in enumerate(freqs[1:]):
                pan = (v_idx - 2.0) * 0.18
                ph_l = two_pi * f * (1.0 + shimmer_l * (v_idx + 1)) * t + v_idx * 1.1
                ph_r = two_pi * f * (1.0 + shimmer_r * (v_idx + 1)) * t + v_idx * 1.7
                sig_l = math.sin(ph_l) * 0.11 + math.sin(2.0 * ph_l) * 0.035 * breath + math.sin(3.0 * ph_l) * 0.012
                sig_r = math.sin(ph_r) * 0.11 + math.sin(2.0 * ph_r) * 0.035 * breath + math.sin(3.0 * ph_r) * 0.012
                left += weight * sig_l * (1.0 - pan * 0.4)
                right += weight * sig_r * (1.0 + pan * 0.4)

        # 3. High ethereal crystal shimmer (octave harmonic pad)
        eth_f = chords[c_idx0][4] * 2.0
        eth_env = 0.5 + 0.5 * math.sin(two_pi * t / 12.8 - 1.2)
        left += math.sin(two_pi * eth_f * t + 0.4) * 0.022 * eth_env * w0
        right += math.sin(two_pi * (eth_f * 1.001) * t + 1.9) * 0.022 * eth_env * w0

        # 4. Delicate starlight bell notes
        for bf, b_start, b_decay, b_pan in bell_notes:
            dt = t - b_start
            if 0.0 <= dt < b_decay:
                attack = min(1.0, dt / 0.08)
                env = attack * math.exp(-dt * (3.2 / b_decay))
                bell = (math.sin(two_pi * bf * t) * 0.085 + math.sin(two_pi * bf * 2.0 * t) * 0.025) * env
                left += bell * (1.0 - b_pan * 0.5)
                right += bell * (1.0 + b_pan * 0.5)

        # Seamless loop envelope at the very start & end (first/last 1.5s blend)
        loop_env = 1.0
        if t < 1.5:
            loop_env = 0.35 + 0.65 * (t / 1.5)
        elif t > duration_sec - 1.5:
            loop_env = 0.35 + 0.65 * ((duration_sec - t) / 1.5)

        s_l = max(-0.95, min(0.95, left * loop_env * 0.78))
        s_r = max(-0.95, min(0.95, right * loop_env * 0.78))
        struct.pack_into("<hh", buf, i * 4, int(s_l * 32767), int(s_r * 32767))

    with wave.open(wav_path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(sr)
        w.writeframes(buf)

    m4a_path = mp3_path.replace(".mp3", ".m4a")
    if os.path.exists("/usr/bin/afconvert"):
        subprocess.run(
            ["/usr/bin/afconvert", "-f", "m4af", "-d", "aac", "-b", "128000", wav_path, m4a_path],
            check=True,
        )
        shutil.copyfile(m4a_path, mp3_path)
        os.remove(wav_path)
    else:
        shutil.move(wav_path, mp3_path)
    print(f"[BGM] Generated cosmic ambient pure music: {mp3_path} ({os.path.getsize(mp3_path) // 1024} KB)")


def main(force=False):
    os.makedirs(AUDIO_DIR, exist_ok=True)
    bgm_path = os.path.join(AUDIO_DIR, "cosmic_bgm.mp3")
    if force or not os.path.exists(bgm_path):
        generate_cosmic_bgm(bgm_path)

    scenes = json.load(open(NARRATION_JSON, encoding="utf-8"))
    speaker, res_id, context_prompt = asyncio.run(probe_speaker(PREFERRED_SPEAKER))

    todo = [
        s
        for s in scenes
        if force
        or not os.path.exists(os.path.join(AUDIO_DIR, s["id"] + ".mp3"))
        or not os.path.exists(os.path.join(AUDIO_DIR, s["id"] + ".json"))
    ]

    if todo:
        print(f"[TTS] Synthesizing {len(todo)} narration tracks using speaker='{speaker}' (resource='{res_id}')...")
        # Synthesize in batches of 6 to keep WebSocket sessions fast and reliable
        batch_size = 6
        for b_start in range(0, len(todo), batch_size):
            batch = todo[b_start : b_start + batch_size]
            res = asyncio.run(
                volc_tts.synth_many(
                    [s["text"] for s in batch],
                    speaker,
                    fmt="mp3",
                    sample_rate=24000,
                    speech_rate=-5,
                    context=context_prompt,
                    subtitle=True,
                    with_events=True,
                )
            )
            for s, (audio, events) in zip(batch, res):
                mp3 = os.path.join(AUDIO_DIR, s["id"] + ".mp3")
                with open(mp3, "wb") as f:
                    f.write(audio)

                sentences, words = [], []
                for e in events:
                    p = e["payload"] or {}
                    if e["event"] == SUBTITLE_EVENT and p.get("words"):
                        ws = [
                            {"w": x["word"], "s": round(x["startTime"], 3), "e": round(x["endTime"], 3)}
                            for x in p["words"]
                        ]
                        words += ws
                        sentences.append({"text": p["text"], "start": ws[0]["s"], "end": ws[-1]["e"]})

                dur = (words[-1]["e"] + 0.35) if words else max(1.0, len(audio) / 8000.0)

                meta = {
                    "id": s["id"],
                    "title": s["title"],
                    "speaker": speaker,
                    "duration": round(dur, 3),
                    "text": s["text"],
                    "audio": f"./audio/{s['id']}.mp3",
                    "sentences": sentences,
                    "words": words,
                }
                with open(os.path.join(AUDIO_DIR, s["id"] + ".json"), "w", encoding="utf-8") as f:
                    json.dump(meta, f, ensure_ascii=False, indent=2)
                print(f"  ✓ {s['id']} ({s['title']}): {dur:.1f}s, {len(sentences)} sentences, {len(words)} words")
    else:
        print("[TTS] All 18 narration tracks already cached.")

    # Build combined manifest.json for instant frontend loading
    manifest = {}
    for s in scenes:
        meta_path = os.path.join(AUDIO_DIR, s["id"] + ".json")
        if os.path.exists(meta_path):
            manifest[s["id"]] = json.load(open(meta_path, encoding="utf-8"))
    with open(os.path.join(AUDIO_DIR, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    print(f"[TTS] Wrote combined manifest: {os.path.join(AUDIO_DIR, 'manifest.json')} ({len(manifest)} tracks)")


if __name__ == "__main__":
    force_flag = "--force" in sys.argv
    for idx, arg in enumerate(sys.argv):
        if arg == "--speaker" and idx + 1 < len(sys.argv):
            PREFERRED_SPEAKER = sys.argv[idx + 1]
    main(force=force_flag)
