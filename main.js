import * as THREE from './vendor/three.module.js';
import {
  buildMilkyWayWorld,
  LANDMARKS,
  SPIRAL_ARM_LABELS,
  SOLAR_BODIES,
  SOL_CENTER
} from './galaxy-builder.js';

const canvas = document.getElementById('galaxy-canvas');
const labelsContainer = document.getElementById('labels-layer');

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: 'high-performance',
  preserveDrawingBuffer: true
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x03050a);

// Near plane set to 0.002 so we can zoom right up to Earth & Moon (radius 0.027) and out to 100,000 ly!
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.002,
  1200
);
const camKeyLight = new THREE.DirectionalLight(0xfff6e5, 1.9);
camKeyLight.position.set(1.2, 0.8, 1.5);
camera.add(camKeyLight);
scene.add(camera);

const galaxy = buildMilkyWayWorld(scene);
const solarSystem = galaxy.solarSystem;

// ============================================================================
// ASTROMETRIC SIMULATION & CAMERA STATE
// ============================================================================
const settings = {
  planetOrbitSpeed: 1.0,
  rotationSpeed: 0.14,
  exposure: 1.18,
  nebulaOpacity: 1.0,
  spectralMode: 0.0,     // 0 = Optical, 1 = JWST Infrared, 2 = High-Energy X-Ray
  targetSpectralMode: 0.0,
  showGrid: true,
  showLabels: true,
  showSolarOrbit: true,
  showDust: true
};

const camState = {
  mode: 'orbit',               // 'orbit' | 'earthToGalaxy'
  activeLandmarkId: 'sol',
  trackedSolarBodyId: 'earth', // 'sun'|'mercury'|'venus'|'earth'|'mars'|'jupiter'|'saturn'|'uranus'|'neptune'|'all'|null
  targetCenter: new THREE.Vector3(),
  currentCenter: new THREE.Vector3(),
  spherical: new THREE.Spherical(0.115, 1.18, 0.55),
  targetSpherical: new THREE.Spherical(0.115, 1.18, 0.55),
  autoOrbit: true,
  journeyProgress: 0.0,        // 0.0 (Earth Close-Up) -> 1.0 (Milky Way Macro Panorama)
  journeyDuration: 26.0,       // Seconds for full Earth -> Milky Way voyage
  keys: {}
};

// ============================================================================
// BUILD 3D-PROJECTED HUD LABELS (GALACTIC LANDMARKS + SPIRAL ARMS + 8 PLANETS)
// ============================================================================
const labelNodes = [];

// 1. Macro Galactic Landmark Pins
LANDMARKS.forEach(lm => {
  if (lm.id === 'overview') return;
  const el = document.createElement('button');
  el.className = 'space-label landmark-pin';
  el.innerHTML = `<span class="pin-dot"></span><span class="pin-text">${lm.name}</span>`;
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    if (lm.id === 'sol') {
      selectSolarBody('all');
    } else {
      selectLandmark(lm.id);
    }
  });
  labelsContainer.appendChild(el);
  labelNodes.push({ el, pos: lm.position, type: 'landmark', id: lm.id });
});

// 2. Spiral Arm Tags
SPIRAL_ARM_LABELS.forEach(arm => {
  const el = document.createElement('div');
  el.className = 'space-label arm-tag';
  el.textContent = arm.name;
  labelsContainer.appendChild(el);
  labelNodes.push({ el, pos: arm.pos, type: 'arm' });
});

// 3. Solar System Sun + 8 Planets Dynamic Pins
SOLAR_BODIES.forEach(body => {
  const el = document.createElement('button');
  el.className = 'space-label planet-pin';
  el.innerHTML = `<span>${body.symbol}</span><span>${body.name.split('·')[1] || body.name}</span>`;
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    selectSolarBody(body.id);
  });
  labelsContainer.appendChild(el);
  const rt = solarSystem.planetRuntime.get(body.id);
  labelNodes.push({
    el,
    getPos: () => rt.worldPos,
    yOffset: body.radius * 1.45 + 0.012,
    type: 'planet',
    id: body.id
  });
});

// 4. Astrophysical Reference Frame Pins (Galactic Velocity Vector & 60.2° Ecliptic-Galactic Tilt)
const solarAstrophysicsPins = [
  {
    id: 'solar-apex-vec',
    label: '↗ 太阳绕银心公转方向 v☉ = 220 km/s (l=90°)',
    pos: new THREE.Vector3(SOL_CENTER.x + 1.45, SOL_CENTER.y + 0.18, SOL_CENTER.z)
  },
  {
    id: 'ecliptic-tilt-arc',
    label: '∠ 黄道面 vs 银道面真实倾角 60.2°',
    pos: new THREE.Vector3(SOL_CENTER.x + 0.92, SOL_CENTER.y - 0.65, SOL_CENTER.z)
  }
];
solarAstrophysicsPins.forEach(pin => {
  const el = document.createElement('div');
  el.className = 'space-label arm-pin';
  el.style.borderColor = 'rgba(255, 190, 11, 0.55)';
  el.style.color = '#fde68a';
  el.textContent = pin.label;
  labelsContainer.appendChild(el);
  labelNodes.push({
    el,
    getPos: () => pin.pos,
    yOffset: 0,
    type: 'planet',
    id: pin.id
  });
});

// 5. Micro-Landmark Detail Pins (Proxima Centauri, Alpha Centauri A/B, TRAPPIST-1 Habitable Zone)
const microDetailPins = [
  {
    parentId: 'proxima',
    label: '🔴 比邻星 Proxima Centauri (M5.5Ve 红矮星)',
    pos: new THREE.Vector3(-3.35, -0.05, 23.55)
  },
  {
    parentId: 'proxima',
    label: '🟢 比邻星 b (宜居带岩石行星 · 1.07 M⊕)',
    pos: new THREE.Vector3(-3.02, -0.26, 23.68)
  },
  {
    parentId: 'proxima',
    label: '✨ 南门二双星 α Centauri A (G2V) & B (K1V)',
    pos: new THREE.Vector3(-3.07, 0.24, 23.30)
  },
  {
    parentId: 'trappist1',
    label: '🟢 TRAPPIST-1 e · f · g (三颗液态水宜居带行星)',
    pos: new THREE.Vector3(3.15, -0.78, 24.35)
  },
  {
    parentId: 'pillars',
    label: '🏛️ 创生之柱柱顶原恒星指状突起 (EGGs · 4.5 ly)',
    pos: new THREE.Vector3(8.40, 0.92, 17.50)
  },
  {
    parentId: 'eta_carinae',
    label: '💥 1843年大爆发双叶沙漏「侏儒星云」',
    pos: new THREE.Vector3(-14.50, 0.28, 18.20)
  }
];
microDetailPins.forEach(pin => {
  const el = document.createElement('div');
  el.className = 'space-label arm-pin';
  el.style.borderColor = 'rgba(52, 211, 153, 0.55)';
  el.style.color = '#d1fae5';
  el.textContent = pin.label;
  labelsContainer.appendChild(el);
  labelNodes.push({
    el,
    pos: pin.pos,
    parentId: pin.parentId,
    type: 'microDetail'
  });
});

function updateProjectedLabels() {
  if (!settings.showLabels) {
    labelsContainer.style.display = 'none';
    return;
  }
  labelsContainer.style.display = 'block';

  const halfW = window.innerWidth * 0.5;
  const halfH = window.innerHeight * 0.5;
  const tempV = new THREE.Vector3();
  const camDistToSol = camera.position.distanceTo(SOL_CENTER);
  const inSolarSystemView = camState.activeLandmarkId === 'sol' && camDistToSol < 5.2;

  for (let i = 0; i < labelNodes.length; i++) {
    const item = labelNodes[i];

    // Show planet pins when inside or near the Solar System; show macro pins when outside
    if (item.type === 'planet') {
      if (!inSolarSystemView) {
        item.el.style.opacity = '0';
        item.el.style.pointerEvents = 'none';
        continue;
      }
      // If zoomed tightly onto a single planet, hide floating planet pins so background labels don't clutter the close-up portrait
      if (camState.trackedSolarBodyId && camState.trackedSolarBodyId !== 'all' && camState.spherical.radius < 0.85 && camState.mode === 'orbit') {
        item.el.style.opacity = '0';
        item.el.style.pointerEvents = 'none';
        continue;
      }
      tempV.copy(item.getPos());
      tempV.y += item.yOffset;
    } else if (item.type === 'microDetail') {
      if (camState.activeLandmarkId !== item.parentId) {
        item.el.style.opacity = '0';
        item.el.style.pointerEvents = 'none';
        continue;
      }
      tempV.copy(item.pos);
    } else {
      if (inSolarSystemView) {
        item.el.style.opacity = '0';
        item.el.style.pointerEvents = 'none';
        continue;
      }
      const isMicroZoom = camState.activeLandmarkId !== 'overview' && camState.spherical.radius < 12;
      if (isMicroZoom) {
        item.el.style.opacity = '0';
        item.el.style.pointerEvents = 'none';
        continue;
      }
      tempV.copy(item.pos);
    }

    tempV.project(camera);
    if (tempV.z > 1.0 || tempV.z < -1.0) {
      item.el.style.opacity = '0';
      item.el.style.pointerEvents = 'none';
      continue;
    }

    const x = (tempV.x * halfW) + halfW;
    const y = -(tempV.y * halfH) + halfH;
    item.el.style.transform = `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;

    if (item.type === 'planet') {
      item.el.style.opacity = '0.94';
      item.el.style.pointerEvents = 'auto';
      item.el.classList.toggle('active-pin', camState.trackedSolarBodyId === item.id);
    } else if (item.type === 'microDetail') {
      item.el.style.opacity = '0.94';
      item.el.style.pointerEvents = 'none';
    } else {
      item.el.style.opacity = item.type === 'landmark' ? '0.92' : '0.62';
      item.el.style.pointerEvents = item.type === 'landmark' ? 'auto' : 'none';
      if (item.type === 'landmark') {
        item.el.classList.toggle('active-pin', item.id === camState.activeLandmarkId);
      }
    }
  }
}

// ============================================================================
// UI ELEMENTS & DOSSIER UPDATES
// ============================================================================
const elCategory = document.getElementById('lm-category');
const elTitle = document.getElementById('lm-title');
const elSubtitle = document.getElementById('lm-subtitle');
const elScale = document.getElementById('tm-scale');
const elDistCore = document.getElementById('tm-dist-core');
const elDistSol = document.getElementById('tm-dist-sol');
const elSpectral = document.getElementById('tm-spectral');
const elMass = document.getElementById('tm-mass');
const elDesc = document.getElementById('lm-desc');
const elGalCoord = document.getElementById('tm-gal-coord');

const landmarkButtons = document.querySelectorAll('[data-landmark]');
const planetButtons = document.querySelectorAll('[data-solar-body]');
const earthGalaxySlider = document.getElementById('earth-galaxy-slider');
const earthJourneyBtn = document.getElementById('btn-earth-journey');

function updateDossierForSolarBody(bodyId) {
  if (bodyId === 'all') {
    elCategory.textContent = 'SOLAR SYSTEM · 60.2° ECLIPTIC TILT & 3D HELICAL ORBITS';
    elTitle.textContent = 'Solar System (60.2° 黄银倾角与三维螺旋轨道)';
    elSubtitle.textContent = 'Coplanar 60.2° Ecliptic Ellipses + Galactocentric 3D Helical Worldlines';
    elScale.textContent = '60 AU · Ecliptic Tilt = 60.19° to Galaxy';
    elDistCore.textContent = 'v☉ ≈ 220 km/s · 230 Myr Galactic Year';
    elDistSol.textContent = 'NEP: l = 96.38°, b = +29.81° (黄道北极)';
    elSpectral.textContent = 'Heliocentric Coplanar + Galactocentric Helix';
    elMass.textContent = '1.0014 M☉ · Z-Oscillation ±200 ly (64 Myr)';
    elDesc.textContent = '真实天体力学模型：太阳系黄道面与银河系银道面呈 60.2° 陡峭倾角。八大行星始终与太阳共面（交替超前或落后于太阳，绝非彗星式拖尾），在随太阳以 220 km/s 绕银心公转时，于三维银心空间中编织出 8 条嵌套的斜螺旋世界线。';
    return;
  }

  const b = SOLAR_BODIES.find(item => item.id === bodyId) || SOLAR_BODIES[3];
  elCategory.textContent = `SOLAR SYSTEM · ${b.enName.toUpperCase()} CLOSE-UP`;
  elTitle.textContent = `${b.symbol} ${b.name}`;
  elSubtitle.textContent = `${b.distanceAU} · Orbital Period: ${b.period}`;
  elScale.textContent = b.distanceAU;
  elDistCore.textContent = `${b.period} · 26,000 ly to Core`;
  elDistSol.textContent = b.distanceAU;
  elSpectral.textContent = b.spectral;
  elMass.textContent = b.mass;
  elDesc.textContent = b.description;
}

function updateDossierForLandmark(lm) {
  elCategory.textContent = lm.category;
  elTitle.textContent = lm.name;
  elSubtitle.textContent = lm.subtitle;
  elScale.textContent = lm.scaleLy;
  elDistCore.textContent = lm.distCore;
  elDistSol.textContent = lm.distSol;
  elSpectral.textContent = lm.spectral;
  elMass.textContent = lm.mass;
  elDesc.textContent = lm.description;
}

export function selectSolarBody(bodyId, instant = false) {
  camState.mode = 'orbit';
  camState.activeLandmarkId = 'sol';
  camState.trackedSolarBodyId = bodyId;
  updateJourneyButtonUI();

  if (bodyId === 'all') {
    camState.targetCenter.set(SOL_CENTER.x - 0.55, SOL_CENTER.y, SOL_CENTER.z);
    camState.targetSpherical.set(3.85, 1.14, 0.22);
    earthGalaxySlider.value = 380;
  } else {
    const rt = solarSystem.planetRuntime.get(bodyId) || solarSystem.planetRuntime.get('earth');
    camState.targetCenter.copy(rt.worldPos);
    camState.targetSpherical.set(rt.viewDistance, 1.15, rt.currentAngle + 0.65);
    earthGalaxySlider.value = bodyId === 'earth' ? 0 : 120;
  }

  if (instant) {
    camState.currentCenter.copy(camState.targetCenter);
    camState.spherical.copy(camState.targetSpherical);
  }

  updateDossierForSolarBody(bodyId);
  landmarkButtons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-landmark') === 'sol'));
  planetButtons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-solar-body') === bodyId));
}

export function selectLandmark(id, instant = false) {
  if (id === 'sol') {
    selectSolarBody('all', instant);
    return;
  }
  const lm = LANDMARKS.find(item => item.id === id) || LANDMARKS[0];
  camState.mode = 'orbit';
  camState.activeLandmarkId = lm.id;
  camState.trackedSolarBodyId = null;
  updateJourneyButtonUI();

  camState.targetCenter.copy(lm.lookAt);
  const offset = lm.cameraPos.clone().sub(lm.lookAt);
  camState.targetSpherical.setFromVector3(offset);

  if (instant) {
    camState.currentCenter.copy(camState.targetCenter);
    camState.spherical.copy(camState.targetSpherical);
  }

  earthGalaxySlider.value = id === 'overview' ? 1000 : 720;
  updateDossierForLandmark(lm);
  landmarkButtons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-landmark') === lm.id));
  planetButtons.forEach(btn => btn.classList.remove('active'));
}

planetButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    selectSolarBody(btn.getAttribute('data-solar-body'));
  });
});

landmarkButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    selectLandmark(btn.getAttribute('data-landmark'));
  });
});

// ============================================================================
// CONTINUOUS MULTI-WAYPOINT "EARTH -> MARS -> JUPITER -> PROXIMA -> MILKY WAY" CONTROLLER
// ============================================================================
function getLandmarkWaypoint(id) {
  const lm = LANDMARKS.find(item => item.id === id) || LANDMARKS[0];
  const off = lm.cameraPos.clone().sub(lm.lookAt);
  const sph = new THREE.Spherical().setFromVector3(off);
  return {
    center: lm.lookAt.clone(),
    r: sph.radius,
    phi: sph.phi,
    theta: sph.theta,
    lm
  };
}

function applyEarthToGalaxyProgress(u) {
  const clampedU = THREE.MathUtils.clamp(u, 0, 1);
  camState.journeyProgress = clampedU;
  earthGalaxySlider.value = Math.round(clampedU * 1000);

  const earthRt = solarSystem.planetRuntime.get('earth');
  const marsRt = solarSystem.planetRuntime.get('mars');
  const jupRt = solarSystem.planetRuntime.get('jupiter');

  const wpProxima = getLandmarkWaypoint('proxima');
  const wpTrappist = getLandmarkWaypoint('trappist1');
  const wpPillars = getLandmarkWaypoint('pillars');
  const wpSgra = getLandmarkWaypoint('sgra');
  const wpOverview = getLandmarkWaypoint('overview');

  // 9 Iconic Multi-Scale Waypoints from Earth (1 AU) out to the 100,000-ly Milky Way
  const waypoints = [
    {
      u: 0.00,
      kind: 'solar',
      id: 'earth',
      center: earthRt.worldPos.clone(),
      r: earthRt.viewDistance,
      phi: 1.15,
      theta: earthRt.currentAngle + 0.65
    },
    {
      u: 0.12,
      kind: 'solar',
      id: 'mars',
      center: marsRt.worldPos.clone(),
      r: marsRt.viewDistance,
      phi: 1.15,
      theta: marsRt.currentAngle + 0.65
    },
    {
      u: 0.24,
      kind: 'solar',
      id: 'jupiter',
      center: jupRt.worldPos.clone(),
      r: jupRt.viewDistance,
      phi: 1.15,
      theta: jupRt.currentAngle + 0.65
    },
    {
      u: 0.36,
      kind: 'solar',
      id: 'all',
      center: new THREE.Vector3(SOL_CENTER.x - 0.55, SOL_CENTER.y, SOL_CENTER.z),
      r: 3.85,
      phi: 1.14,
      theta: 0.22
    },
    {
      u: 0.50,
      kind: 'landmark',
      id: 'proxima',
      center: wpProxima.center,
      r: wpProxima.r,
      phi: wpProxima.phi,
      theta: wpProxima.theta,
      lm: wpProxima.lm
    },
    {
      u: 0.62,
      kind: 'landmark',
      id: 'trappist1',
      center: wpTrappist.center,
      r: wpTrappist.r,
      phi: wpTrappist.phi,
      theta: wpTrappist.theta,
      lm: wpTrappist.lm
    },
    {
      u: 0.74,
      kind: 'landmark',
      id: 'pillars',
      center: wpPillars.center,
      r: wpPillars.r,
      phi: wpPillars.phi,
      theta: wpPillars.theta,
      lm: wpPillars.lm
    },
    {
      u: 0.86,
      kind: 'landmark',
      id: 'sgra',
      center: wpSgra.center,
      r: wpSgra.r,
      phi: wpSgra.phi,
      theta: wpSgra.theta,
      lm: wpSgra.lm
    },
    {
      u: 1.00,
      kind: 'landmark',
      id: 'overview',
      center: wpOverview.center,
      r: wpOverview.r,
      phi: wpOverview.phi,
      theta: wpOverview.theta,
      lm: wpOverview.lm
    }
  ];

  let segIdx = 0;
  for (let i = 0; i < waypoints.length - 1; i++) {
    if (clampedU >= waypoints[i].u && clampedU <= waypoints[i + 1].u) {
      segIdx = i;
      break;
    }
  }

  const wpA = waypoints[segIdx];
  const wpB = waypoints[segIdx + 1];
  const rawSpan = Math.max(0.0001, wpB.u - wpA.u);
  const localLinear = THREE.MathUtils.clamp((clampedU - wpA.u) / rawSpan, 0, 1);
  // Hold briefly near each waypoint before gliding to the next
  const s = THREE.MathUtils.smoothstep(localLinear, 0.12, 0.88);

  const lookCenter = new THREE.Vector3().lerpVectors(wpA.center, wpB.center, s);
  const logR = wpA.r * Math.pow(wpB.r / wpA.r, s);
  const phi = THREE.MathUtils.lerp(wpA.phi, wpB.phi, s);
  const theta = THREE.MathUtils.lerp(wpA.theta, wpB.theta, s);

  const offset = new THREE.Vector3().setFromSphericalCoords(logR, phi, theta);
  camera.position.copy(lookCenter).add(offset);
  camera.lookAt(lookCenter);
  camState.currentCenter.copy(lookCenter);
  camState.targetCenter.copy(lookCenter);
  camState.spherical.set(logR, phi, theta);
  camState.targetSpherical.copy(camState.spherical);

  // Determine the currently active waypoint for HUD Dossier & Button highlights
  const activeWp = localLinear < 0.5 ? wpA : wpB;
  if (activeWp.kind === 'solar') {
    camState.activeLandmarkId = 'sol';
    camState.trackedSolarBodyId = activeWp.id;
    updateDossierForSolarBody(activeWp.id);
    planetButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-solar-body') === activeWp.id));
    landmarkButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-landmark') === 'sol'));
  } else {
    camState.activeLandmarkId = activeWp.id;
    camState.trackedSolarBodyId = null;
    updateDossierForLandmark(activeWp.lm);
    planetButtons.forEach(b => b.classList.remove('active'));
    landmarkButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-landmark') === activeWp.id));
  }
}

function updateJourneyButtonUI() {
  const active = camState.mode === 'earthToGalaxy';
  earthJourneyBtn.textContent = active ? '⏸ 暂停地球→银河漫游' : '🌍➡️🌌 从地球漫游至银河系';
}

earthJourneyBtn.addEventListener('click', () => {
  if (camState.mode === 'earthToGalaxy') {
    camState.mode = 'orbit';
  } else {
    if (camState.journeyProgress > 0.96) camState.journeyProgress = 0.0;
    camState.mode = 'earthToGalaxy';
  }
  updateJourneyButtonUI();
});

earthGalaxySlider.addEventListener('input', (e) => {
  camState.mode = 'orbit';
  updateJourneyButtonUI();
  const u = Number(e.target.value) / 1000;
  applyEarthToGalaxyProgress(u);
});

// ============================================================================
// OBSERVATORY CONTROLS & SPECTRAL BAND SWITCHER
// ============================================================================
const spectralButtons = document.querySelectorAll('[data-spectral]');
spectralButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const modeVal = Number(btn.getAttribute('data-spectral'));
    settings.targetSpectralMode = modeVal;
    spectralButtons.forEach(b => b.classList.toggle('active', b === btn));
  });
});

document.getElementById('slider-planet-speed').addEventListener('input', (e) => {
  settings.planetOrbitSpeed = Number(e.target.value) * 0.01;
});
document.getElementById('slider-rotation').addEventListener('input', (e) => {
  settings.rotationSpeed = Number(e.target.value) * 0.01;
});
document.getElementById('slider-exposure').addEventListener('input', (e) => {
  settings.exposure = Number(e.target.value) * 0.01;
});

function bindToggleButton(id, key) {
  const btn = document.getElementById(id);
  btn.addEventListener('click', () => {
    settings[key] = !settings[key];
    btn.classList.toggle('active', settings[key]);
  });
}
bindToggleButton('toggle-grid', 'showGrid');
bindToggleButton('toggle-labels', 'showLabels');
bindToggleButton('toggle-orbit', 'showSolarOrbit');
bindToggleButton('toggle-dust', 'showDust');

// ============================================================================
// MOUSE ORBIT, LOGARITHMIC ZOOM, RAYCASTING & WASD
// ============================================================================
let isDragging = false;
let dragMoved = false;
let prevPointer = { x: 0, y: 0 };
const raycaster = new THREE.Raycaster();
const pointerNDC = new THREE.Vector2();

canvas.addEventListener('pointerdown', (e) => {
  isDragging = true;
  dragMoved = false;
  prevPointer.x = e.clientX;
  prevPointer.y = e.clientY;
});

window.addEventListener('pointermove', (e) => {
  if (!isDragging) return;
  const dx = e.clientX - prevPointer.x;
  const dy = e.clientY - prevPointer.y;
  if (Math.abs(dx) + Math.abs(dy) > 3) dragMoved = true;
  prevPointer.x = e.clientX;
  prevPointer.y = e.clientY;

  if (camState.mode === 'earthToGalaxy') {
    camState.mode = 'orbit';
    updateJourneyButtonUI();
  }
  camState.targetSpherical.theta -= dx * 0.0055;
  camState.targetSpherical.phi = THREE.MathUtils.clamp(
    camState.targetSpherical.phi - dy * 0.0055,
    0.10,
    Math.PI - 0.10
  );
});

window.addEventListener('pointerup', (e) => {
  if (isDragging && !dragMoved) {
    pointerNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointerNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointerNDC, camera);
    const hits = raycaster.intersectObjects(galaxy.interactiveMeshes, false);
    if (hits.length > 0) {
      const ud = hits[0].object.userData;
      if (ud.solarBodyId) {
        selectSolarBody(ud.solarBodyId);
      } else if (ud.landmarkId) {
        selectLandmark(ud.landmarkId);
      }
    }
  }
  isDragging = false;
});

window.addEventListener('wheel', (e) => {
  if (camState.mode === 'earthToGalaxy') {
    camState.mode = 'orbit';
    updateJourneyButtonUI();
  }
  const factor = Math.exp(e.deltaY * 0.0012);
  camState.targetSpherical.radius = THREE.MathUtils.clamp(
    camState.targetSpherical.radius * factor,
    0.055,
    155.0
  );
}, { passive: true });

window.addEventListener('keydown', (e) => { camState.keys[e.code] = true; });
window.addEventListener('keyup', (e) => { camState.keys[e.code] = false; });

const autoOrbitBtn = document.getElementById('btn-autoorbit');
autoOrbitBtn.addEventListener('click', () => {
  camState.autoOrbit = !camState.autoOrbit;
  autoOrbitBtn.classList.toggle('active', camState.autoOrbit);
  autoOrbitBtn.textContent = camState.autoOrbit ? '🔄 自动环绕: 开' : '🔄 自动环绕: 关';
});

// ============================================================================
// BUILT-IN 60FPS VIDEO RECORDER
// ============================================================================
const recordBtn = document.getElementById('btn-record');
let mediaRecorder = null;
let recordedChunks = [];

recordBtn.addEventListener('click', () => {
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    mediaRecorder.stop();
    return;
  }
  const stream = canvas.captureStream(60);
  const mimeTypes = ['video/mp4;codecs=avc1.42E01E', 'video/webm;codecs=vp9', 'video/webm'];
  const mimeType = mimeTypes.find(t => MediaRecorder.isTypeSupported(t)) || 'video/webm';

  recordedChunks = [];
  mediaRecorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 16_000_000 });
  mediaRecorder.ondataavailable = (ev) => {
    if (ev.data && ev.data.size > 0) recordedChunks.push(ev.data);
  };
  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: mimeType });
    const ext = mimeType.includes('mp4') ? 'mp4' : 'webm';
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `earth-to-milky-way.${ext}`;
    a.click();
    recordBtn.textContent = '🎥 录制漫游视频';
    recordBtn.classList.remove('recording');
  };
  mediaRecorder.start(200);
  recordBtn.textContent = '⏹ 停止并保存视频';
  recordBtn.classList.add('recording');
});

// ============================================================================
// MAIN UPDATE & RENDER LOOP
// ============================================================================
let lastTime = performance.now() * 0.001;
let elapsed = 0;
let manualStepping = false;

function stepSimulation(time, dt) {
  settings.spectralMode = THREE.MathUtils.lerp(settings.spectralMode, settings.targetSpectralMode, Math.min(1, dt * 6.0));

  // Update galaxy & solar system planetary positions first so camera tracking is exact
  galaxy.update(time, dt, settings, camera.position);

  if (camState.mode === 'earthToGalaxy') {
    camState.journeyProgress += dt / camState.journeyDuration;
    if (camState.journeyProgress > 1.0) {
      camState.journeyProgress = 0.0;
    }
    applyEarthToGalaxyProgress(camState.journeyProgress);
  } else {
    // If tracking a specific moving planet or the Sun, keep targetCenter locked onto its live orbital position!
    if (camState.trackedSolarBodyId && camState.trackedSolarBodyId !== 'all') {
      const rt = solarSystem.planetRuntime.get(camState.trackedSolarBodyId);
      if (rt) {
        camState.targetCenter.copy(rt.worldPos);
        camState.currentCenter.lerp(camState.targetCenter, Math.min(1.0, dt * 14.0));
      }
    }

    if (camState.autoOrbit && !isDragging) {
      camState.targetSpherical.theta += dt * 0.14;
    }

    const damp = Math.min(1.0, dt * 6.5);
    camState.currentCenter.lerp(camState.targetCenter, damp);
    camState.spherical.radius = THREE.MathUtils.lerp(camState.spherical.radius, camState.targetSpherical.radius, damp);
    camState.spherical.phi = THREE.MathUtils.lerp(camState.spherical.phi, camState.targetSpherical.phi, damp);
    camState.spherical.theta = THREE.MathUtils.lerp(camState.spherical.theta, camState.targetSpherical.theta, damp);

    const offset = new THREE.Vector3().setFromSpherical(camState.spherical);
    camera.position.copy(camState.currentCenter).add(offset);
    camera.lookAt(camState.currentCenter);
  }

  // Update real-time Galactic Coordinates & Scale readout
  const relToSol = camera.position.clone().sub(SOL_CENTER);
  const camSpan = camera.position.distanceTo(camState.currentCenter);
  const galL = ((Math.atan2(relToSol.x, -relToSol.z) * 180 / Math.PI) + 360) % 360;
  const galB = Math.asin(THREE.MathUtils.clamp(relToSol.y / Math.max(0.0001, relToSol.length()), -1, 1)) * 180 / Math.PI;
  const scaleStr = camSpan < 4.5
    ? `FOV ~${(camSpan * 13.5).toFixed(1)} AU (Solar System)`
    : `FOV ~${Math.round(camSpan * 1000).toLocaleString()} ly (Galactic)`;
  elGalCoord.textContent = `l = ${galL.toFixed(1)}° · b = ${galB >= 0 ? '+' : ''}${galB.toFixed(1)}° · ${scaleStr}`;

  renderer.render(scene, camera);
  updateProjectedLabels();
}

function animate(nowMs) {
  requestAnimationFrame(animate);
  if (manualStepping) return;

  const now = nowMs * 0.001;
  const dt = Math.min(0.05, Math.max(0.001, now - lastTime));
  lastTime = now;
  elapsed += dt;

  stepSimulation(elapsed, dt);
}

// Start right at Earth & Moon close-up, ready to roam out to the entire Milky Way!
selectSolarBody('earth', true);
requestAnimationFrame(animate);

// Deterministic stepping API for headless verification & 1080p MP4 video rendering
window.__galaxyApp = {
  settings,
  camState,
  selectSolarBody(bodyId, spectral = 0.0) {
    manualStepping = true;
    settings.spectralMode = spectral;
    settings.targetSpectralMode = spectral;
    spectralButtons.forEach(b => b.classList.toggle('active', Number(b.getAttribute('data-spectral')) === Math.round(spectral)));
    galaxy.update(elapsed, 0.016, settings, camera.position);
    selectSolarBody(bodyId, true);
    stepSimulation(elapsed, 0.016);
  },
  selectLandmark(id, spectral = 0.0) {
    manualStepping = true;
    settings.spectralMode = spectral;
    settings.targetSpectralMode = spectral;
    spectralButtons.forEach(b => b.classList.toggle('active', Number(b.getAttribute('data-spectral')) === Math.round(spectral)));
    galaxy.update(elapsed, 0.016, settings, camera.position);
    selectLandmark(id, true);
    stepSimulation(elapsed, 0.016);
  },
  setEarthToGalaxyProgress(u, dt = 1 / 30) {
    manualStepping = true;
    camState.mode = 'orbit';
    elapsed += dt;
    galaxy.update(elapsed, dt, settings, camera.position);
    applyEarthToGalaxyProgress(u);
    renderer.render(scene, camera);
    updateProjectedLabels();
  },
  stepFrame(dt = 1 / 30) {
    manualStepping = true;
    elapsed += dt;
    stepSimulation(elapsed, dt);
  }
};

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
