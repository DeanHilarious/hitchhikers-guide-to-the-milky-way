// Custom GLSL Shaders for the Milky Way 3D Interactive Atlas
// Differential Galactic Rotation, Spectral Modes (Optical / JWST IR / Chandra X-Ray),
// Volumetric H-II Nebulae & Dark Dust Lanes, and Sagittarius A* Relativistic Accretion Disk

export const STAR_VERTEX_SHADER = /* glsl */ `
uniform float uTime;
uniform float uRotationSpeed;
uniform float uPixelRatio;
uniform float uExposure;
uniform float uSpectralMode; // 0 = Optical, 1 = JWST Infrared, 2 = High-Energy X-Ray

attribute float aSize;
attribute float aRadius;
attribute float aBaseAngle;
attribute float aAngularVel;
attribute float aHeight;
attribute float aTempType;     // 0.0 (cool M red) -> 1.0 (hot O blue-violet)
attribute float aArmOffset;    // Spiral arm / bulge membership
attribute float aRandomPhase;

varying vec3 vColor;
varying float vAlpha;
varying float vSpikeFactor;

vec3 getOpticalStarColor(float t) {
  // O/B (blue-white) -> A/F (white-cream) -> G/K (gold-amber) -> M (warm coral-red)
  vec3 colM = vec3(1.00, 0.42, 0.25);
  vec3 colK = vec3(1.00, 0.72, 0.42);
  vec3 colG = vec3(1.00, 0.92, 0.78);
  vec3 colA = vec3(0.86, 0.93, 1.00);
  vec3 colO = vec3(0.48, 0.72, 1.00);

  if (t < 0.25) return mix(colM, colK, t / 0.25);
  if (t < 0.55) return mix(colK, colG, (t - 0.25) / 0.30);
  if (t < 0.80) return mix(colG, colA, (t - 0.55) / 0.25);
  return mix(colA, colO, (t - 0.80) / 0.20);
}

vec3 getInfraredStarColor(float t) {
  // JWST NIRCam / MIRI palette: deep crimson, burnished gold, warm amber, and diamond cyan cores
  vec3 irCool = vec3(0.92, 0.24, 0.16);
  vec3 irMid  = vec3(1.00, 0.68, 0.25);
  vec3 irHot  = vec3(0.78, 0.94, 1.00);
  return (t < 0.6) ? mix(irCool, irMid, t / 0.6) : mix(irMid, irHot, (t - 0.6) / 0.4);
}

vec3 getXRayStarColor(float t) {
  // High-Energy X-Ray / Gamma palette: deep indigo-violet, magenta, electric cyan-white
  vec3 xrLow  = vec3(0.46, 0.18, 0.82);
  vec3 xrMid  = vec3(0.95, 0.28, 0.78);
  vec3 xrHigh = vec3(0.45, 0.96, 1.00);
  return (t < 0.55) ? mix(xrLow, xrMid, t / 0.55) : mix(xrMid, xrHigh, (t - 0.55) / 0.45);
}

void main() {
  // Differential galactic rotation: inner bulge/bar orbits faster than outer spiral arms
  float theta = aBaseAngle - uTime * uRotationSpeed * aAngularVel;
  vec3 pos = vec3(
    cos(theta) * aRadius,
    aHeight + sin(uTime * 0.4 + aRandomPhase) * 0.03,
    sin(theta) * aRadius
  );

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  float dist = max(0.8, -mvPosition.z);

  // Subtle stellar scintillation
  float twinkle = 0.88 + 0.12 * sin(uTime * 2.4 + aRandomPhase * 6.2831);

  vec3 optCol = getOpticalStarColor(aTempType);
  vec3 irCol  = getInfraredStarColor(aTempType);
  vec3 xrCol  = getXRayStarColor(aTempType);

  vec3 c = optCol;
  if (uSpectralMode > 0.5 && uSpectralMode < 1.5) {
    c = mix(optCol, irCol, uSpectralMode);
  } else if (uSpectralMode >= 1.5) {
    c = mix(irCol, xrCol, uSpectralMode - 1.0);
  } else {
    c = mix(optCol, irCol, uSpectralMode);
  }

  // Boost core bulge warm golden glow in optical mode
  float coreBoost = 1.0 - smoothstep(0.0, 14.0, aRadius);
  c = mix(c, vec3(1.0, 0.86, 0.64), coreBoost * 0.45 * (1.0 - clamp(uSpectralMode, 0.0, 1.0)));

  // Attenuate dense core stars when the camera dives inside the Galactic Core (< 14 units)
  // AND attenuate local Orion Spur background stars when diving inside the Solar System around [0,0,26] (< 6 units)
  // so Sagittarius A* or the 8 Planets + Sun stand out crystal clear against a starry sky!
  float camRadius = length(cameraPosition);
  float coreDiveMask = smoothstep(3.5, 14.0, camRadius);
  float insideBulgeMask = 1.0 - smoothstep(0.0, 9.0, aRadius);
  float localCoreAtten = mix(1.0, 0.16, (1.0 - coreDiveMask) * insideBulgeMask);

  float camDistToSol = length(cameraPosition - vec3(0.0, 0.0, 26.0));
  float solDiveMask = smoothstep(2.5, 8.0, camDistToSol);
  float localSolAtten = mix(0.22, 1.0, solDiveMask);

  vColor = c * twinkle * uExposure * localCoreAtten * localSolAtten;
  vAlpha = clamp(aArmOffset, 0.25, 1.0)
    * mix(1.0, 0.28, (1.0 - coreDiveMask) * insideBulgeMask)
    * mix(0.28, 1.0, solDiveMask);
  vSpikeFactor = step(2.6, aSize) * solDiveMask;

  float sizeScale = mix(1.0, 0.38, (1.0 - coreDiveMask) * insideBulgeMask)
    * mix(0.28, 1.0, solDiveMask);
  float pointSize = (aSize * uPixelRatio * 48.0 * sizeScale) / pow(dist, 0.78);
  gl_PointSize = clamp(pointSize, 1.0, 32.0);
  gl_Position = projectionMatrix * mvPosition;
}
`;

export const STAR_FRAGMENT_SHADER = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
varying float vSpikeFactor;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float d = length(uv) * 2.0;
  if (d > 1.0) discard;

  // Soft airy disc core + exponential halo
  float core = exp(-d * d * 7.5);
  float halo = pow(max(0.0, 1.0 - d), 2.4) * 0.55;

  // Subtle 4-point diffraction spikes on bright supergiant stars
  float spikes = 0.0;
  if (vSpikeFactor > 0.5) {
    float sx = exp(-abs(uv.y) * 26.0) * exp(-abs(uv.x) * 4.5);
    float sy = exp(-abs(uv.x) * 26.0) * exp(-abs(uv.y) * 4.5);
    spikes = (sx + sy) * 0.42;
  }

  float intensity = core + halo + spikes;
  vec3 finalCol = mix(vColor, vec3(1.0, 0.98, 0.95), core * 0.55);

  gl_FragColor = vec4(finalCol * intensity, intensity * vAlpha);
}
`;

// Volumetric Spiral-Arm Nebulae & Dark Interstellar Dust Shader
export const NEBULA_VERTEX_SHADER = /* glsl */ `
uniform float uTime;
uniform float uRotationSpeed;
uniform float uPixelRatio;
uniform float uNebulaOpacity;
uniform float uDustVisibility;
uniform float uSpectralMode;

attribute float aSize;
attribute float aRadius;
attribute float aBaseAngle;
attribute float aAngularVel;
attribute float aHeight;
attribute float aNebulaType; // 0 = H-II Magenta/Rose, 1 = Reflection Cyan/Blue, 2 = Warm Core Gold, 3 = Dark Dust Lane
attribute float aSeed;

varying vec3 vColor;
varying float vAlpha;
varying float vSeed;
varying float vIsDust;

void main() {
  float theta = aBaseAngle - uTime * uRotationSpeed * aAngularVel;
  vec3 pos = vec3(cos(theta) * aRadius, aHeight, sin(theta) * aRadius);

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  float dist = max(1.0, -mvPosition.z);

  vSeed = aSeed;
  vIsDust = step(2.5, aNebulaType);

  // Assign palette based on nebula type & spectral mode
  vec3 colHII  = vec3(0.92, 0.25, 0.56); // Glowing ionized hydrogen pink-magenta
  vec3 colRefl = vec3(0.22, 0.62, 0.96); // Reflection nebula cyan-azure
  vec3 colCore = vec3(0.98, 0.72, 0.36); // Galactic bar warm amber-gold
  vec3 colDust = vec3(0.06, 0.05, 0.09); // Absorbing dark dust lane (or glowing warm dust in IR!)

  if (uSpectralMode > 0.5 && uSpectralMode < 1.5) {
    // In JWST Infrared, dark dust lanes glow warm golden-amber and crimson!
    colHII  = vec3(0.98, 0.52, 0.22);
    colRefl = vec3(0.32, 0.82, 0.88);
    colDust = vec3(0.65, 0.28, 0.14);
  } else if (uSpectralMode >= 1.5) {
    // In High-Energy X-Ray, hot supernova gas & Fermi bubbles glow violet & electric cyan
    colHII  = vec3(0.68, 0.24, 0.98);
    colRefl = vec3(0.24, 0.92, 1.00);
    colCore = vec3(0.88, 0.42, 1.00);
  }

  vec3 chosen = colHII;
  if (aNebulaType > 0.5 && aNebulaType < 1.5) chosen = colRefl;
  else if (aNebulaType >= 1.5 && aNebulaType < 2.5) chosen = colCore;
  else if (aNebulaType >= 2.5) chosen = colDust;

  vColor = chosen;

  // Fade out gently when camera is very close so there is never harsh billboard clipping
  float nearFade = smoothstep(1.8, 9.5, dist);
  float baseAlpha = (vIsDust > 0.5)
    ? (0.22 * uDustVisibility * (uSpectralMode > 0.5 && uSpectralMode < 1.5 ? 0.55 : 1.0))
    : (0.11 * uNebulaOpacity);

  vAlpha = baseAlpha * nearFade;

  float pSize = (aSize * uPixelRatio * 145.0) / pow(dist, 0.85);
  gl_PointSize = clamp(pSize, 4.0, 210.0);
  gl_Position = projectionMatrix * mvPosition;
}
`;

export const NEBULA_FRAGMENT_SHADER = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
varying float vSeed;
varying float vIsDust;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float r = length(uv) * 2.0;
  if (r > 1.0) discard;

  // Organic FBM cloud puff shape
  float n1 = noise(gl_PointCoord * 3.6 + vec2(vSeed, vSeed * 1.7));
  float n2 = noise(gl_PointCoord * 7.2 - vec2(vSeed * 2.1, vSeed));
  float cloud = (n1 * 0.65 + n2 * 0.35);

  float falloff = pow(1.0 - r, 1.85);
  float alpha = falloff * (0.55 + 0.65 * cloud) * vAlpha;
  if (alpha < 0.003) discard;

  gl_FragColor = vec4(vColor, alpha);
}
`;

// Sagittarius A* Supermassive Black Hole Relativistic Accretion Disk Shader
export const ACCRETION_VERTEX_SHADER = /* glsl */ `
varying vec2 vUv;
varying vec3 vLocalPos;

void main() {
  vUv = uv;
  vLocalPos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const ACCRETION_FRAGMENT_SHADER = /* glsl */ `
uniform float uTime;
varying vec2 vUv;
varying vec3 vLocalPos;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

void main() {
  vec2 p = vLocalPos.xz;
  float r = length(p);
  // Inner ISCO photon ring at r = 0.28, outer accretion edge at r = 1.0
  if (r < 0.26 || r > 1.0) discard;

  float angle = atan(p.y, p.x);
  // Relativistic Keplerian shear: inner plasma spins much faster
  float spiral = angle * 3.0 + 4.2 / (r + 0.08) - uTime * 4.5;
  float n1 = noise(vec2(r * 14.0, spiral));
  float n2 = noise(vec2(r * 28.0 - uTime * 2.0, angle * 6.0));
  float streaks = 0.55 * n1 + 0.45 * n2;

  // Radial brightness profile peaking sharply at the inner photon ring
  float innerEdge = smoothstep(0.26, 0.33, r);
  float outerEdge = 1.0 - smoothstep(0.62, 1.0, r);
  float photonRing = exp(-pow((r - 0.32) * 18.0, 2.0)) * 1.4;

  // Relativistic Doppler beaming (left side brighter/hotter than right side)
  float doppler = 0.78 + 0.34 * cos(angle + 0.6);

  vec3 hotCore = vec3(1.00, 0.95, 0.82);
  vec3 midGold = vec3(1.00, 0.58, 0.18);
  vec3 outerRed = vec3(0.75, 0.16, 0.08);

  float t = smoothstep(0.30, 0.92, r);
  vec3 col = mix(hotCore, midGold, smoothstep(0.0, 0.45, t));
  col = mix(col, outerRed, smoothstep(0.45, 1.0, t));
  col *= (0.65 + 0.75 * streaks) * doppler;
  col += hotCore * photonRing;

  float alpha = innerEdge * outerEdge * (0.55 + 0.45 * streaks + photonRing * 0.5);
  gl_FragColor = vec4(col, clamp(alpha, 0.0, 0.98));
}
`;
