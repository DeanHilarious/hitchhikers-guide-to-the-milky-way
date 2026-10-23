import * as THREE from './vendor/three.module.js';
import {
  STAR_VERTEX_SHADER,
  STAR_FRAGMENT_SHADER,
  NEBULA_VERTEX_SHADER,
  NEBULA_FRAGMENT_SHADER,
  ACCRETION_VERTEX_SHADER,
  ACCRETION_FRAGMENT_SHADER
} from './shaders.js';
import { buildDetailedSolarSystem, SOLAR_BODIES, SOL_CENTER } from './solar-system.js';

export { SOLAR_BODIES, SOL_CENTER };

// Scale convention: 1 world unit = 1,000 Light-Years (ly)
// Galactic radius R = 50 units => 100,000 ly diameter
// Solar System at [0, 0, 26] => 26,000 ly from Galactic Center (Sagittarius A*)

export const LANDMARKS = [
  {
    id: 'overview',
    name: 'Milky Way Galaxy (银河系全景)',
    subtitle: 'SBbc Barred Spiral Galaxy · 100,000 Light-Years Across',
    category: 'BARRED SPIRAL GALAXY · SBbc',
    position: new THREE.Vector3(0, 0, 0),
    cameraPos: new THREE.Vector3(0, 56, 74),
    lookAt: new THREE.Vector3(0, 0, 0),
    scaleLy: '100,000 ly',
    distCore: '0 — 52,000 ly',
    distSol: '26,000 ly (to Core)',
    spectral: 'Integrated G2–K0 Composite',
    mass: '1.15 × 10¹² M☉ · ~200–400 Billion Stars',
    description: 'Our home barred spiral galaxy features a central peanut-shaped bar tilted at ~28°, four major logarithmic spiral arms (Scutum-Centaurus, Perseus, Sagittarius, Norma), and the local Orion Spur.'
  },
  {
    id: 'sgra',
    name: 'Sagittarius A* (人马座 A* 银心黑洞)',
    subtitle: 'Supermassive Black Hole & S-Star Relativistic Cluster',
    category: 'SUPERMASSIVE BLACK HOLE · GALACTIC CORE',
    position: new THREE.Vector3(0, 0, 0),
    cameraPos: new THREE.Vector3(0.0, 1.35, 3.35),
    lookAt: new THREE.Vector3(0, 0, 0),
    scaleLy: '120 ly (Core Micro-View)',
    distCore: '0.00 ly (Galactic Origin)',
    distSol: '26,670 ± 130 ly',
    spectral: 'Relativistic Synchrotron / Sub-mm Plasma',
    mass: '4.154 × 10⁶ M☉ · Schwarzschild R ≈ 12M km',
    description: 'At the dynamical heart of the Milky Way lies Sagittarius A*, a 4.15-million-solar-mass black hole encircled by a superheated plasma accretion disk and high-velocity B-type S-stars (like S2, reaching 2.5% the speed of light at periapsis).'
  },
  {
    id: 'sol',
    name: 'Solar Neighborhood · Sol (太阳系与猎户支臂)',
    subtitle: 'Orion-Cygnus Spur · Local Interstellar Bubble & Nearby Stars',
    category: 'G2V MAIN-SEQUENCE STAR · ORION SPUR',
    position: new THREE.Vector3(0, 0, 26.0),
    cameraPos: new THREE.Vector3(1.45, 1.15, 28.6),
    lookAt: new THREE.Vector3(0, 0, 26.0),
    scaleLy: '1,200 ly (Local Spur)',
    distCore: '26,000 ly (8.0 kpc)',
    distSol: '0.00 ly (Home Reference)',
    spectral: 'G2V Yellow Dwarf · T = 5,778 K',
    mass: '1.00 M☉ · Galactic Period ≈ 230 Myr',
    description: 'Nestled along the inner edge of the Orion-Cygnus Spur, our Solar System orbits the Galactic Center at 220 km/s inside the Local Bubble—a 300-light-year cavity sculpted by ancient supernovae, surrounded by Sirius, Alpha Centauri, Vega, and Betelgeuse.'
  },
  {
    id: 'proxima',
    name: 'Proxima Centauri · α Cen (比邻星与南门二三星系统)',
    subtitle: 'Nearest Star System (4.2465 ly) · Habitable Exoplanet Proxima b',
    category: 'TRIPLE STAR SYSTEM · NEAREST EXOPLANET',
    position: new THREE.Vector3(-3.35, -0.22, 23.55),
    cameraPos: new THREE.Vector3(-2.45, 0.35, 24.65),
    lookAt: new THREE.Vector3(-3.35, -0.22, 23.55),
    scaleLy: '4.2465 ly from Sol (Nearest Neighbor)',
    distCore: '25,997 ly (l = 313.9°, b = -1.9°)',
    distSol: '4.2465 ly (1.3020 pc)',
    spectral: 'M5.5Ve Flare Dwarf + G2V (α Cen A) + K1V (α Cen B)',
    mass: '0.122 M☉ (Proxima) · Planet Proxima b = 1.07 M⊕',
    description: '距离太阳系最近的恒星系统（仅 4.2465 光年，《三体》原型三星系统）：主星为南门二双星（α Cen A 与 B），外围红矮星「比邻星 Proxima Centauri」的宜居带内已探明岩石系外行星「比邻星 b」（公转周期 11.186 天）与内圈行星比邻星 d。'
  },
  {
    id: 'trappist1',
    name: 'TRAPPIST-1 System (TRAPPIST-1 七行星宜居系统)',
    subtitle: 'Ultracool Red Dwarf with 7 Earth-Sized Worlds in Resonance',
    category: 'CONFIRMED 7-EXOPLANET SYSTEM · JWST TARGET',
    position: new THREE.Vector3(3.15, -1.05, 24.35),
    cameraPos: new THREE.Vector3(3.95, -0.45, 25.35),
    lookAt: new THREE.Vector3(3.15, -1.05, 24.35),
    scaleLy: '0.12 AU Compact Planetary System',
    distCore: '26,015 ly (l = 69.7°, b = -56.6°)',
    distSol: '40.66 ± 0.04 ly (Aquarius)',
    spectral: 'M8V Ultracool Dwarf · T = 2,566 K',
    mass: '0.0898 M☉ · 7 Rocky Planets (b, c, d, e, f, g, h)',
    description: '目前银河系中已探明最具代表性的多行星系统（距地球 40.66 光年）：7 颗与地球大小相仿的岩石行星（b 至 h）紧密环绕超冷红矮星呈拉普拉斯轨道共振，其中 e、f、g 三颗行星位于绿色液态水宜居带（Habitable Zone）内，是韦伯望远镜（JWST）的核心大气观测目标。'
  },
  {
    id: 'm42',
    name: 'Orion Nebula M42 (猎户座大星云恒星摇篮)',
    subtitle: 'Diffuse H-II Emission Nursery & The Trapezium OB Cluster',
    category: 'H-II EMISSION NEBULA · STELLAR NURSERY',
    position: new THREE.Vector3(3.8, -0.35, 27.3),
    cameraPos: new THREE.Vector3(5.3, 0.55, 29.5),
    lookAt: new THREE.Vector3(3.8, -0.35, 27.3),
    scaleLy: '650 ly (Nursery Region)',
    distCore: '27,450 ly',
    distSol: '1,344 ± 20 ly',
    spectral: 'Hα / [O III] / [S II] Ionized Emission',
    mass: '~2,000 M☉ · Age < 2 Million Years',
    description: 'The closest massive star-forming region to Earth. Intense ultraviolet radiation from the newborn Trapezium O-type stars carves glowing cavities and photo-evaporating protoplanetary disks (proplyds) out of dense hydrogen-sulfur molecular clouds.'
  },
  {
    id: 'pillars',
    name: 'Pillars of Creation · M16 (鹰状星云「创生之柱」)',
    subtitle: 'Towering Photo-Evaporating Molecular Hydrogen Columns',
    category: 'STAR-FORMING PILLARS · SAGITTARIUS ARM',
    position: new THREE.Vector3(8.5, 0.35, 17.5),
    cameraPos: new THREE.Vector3(9.8, 1.05, 19.2),
    lookAt: new THREE.Vector3(8.5, 0.35, 17.5),
    scaleLy: '4–5 ly Pillar Height (70 × 55 ly M16)',
    distCore: '20,300 ly (l = 16.95°, b = +0.79°)',
    distSol: '5,700 ± 400 ly (Sagittarius Arm)',
    spectral: 'JWST Near/Mid-IR Dust + Hubble Hα/[S II]/[O III]',
    mass: '~200 M☉ Dense Molecular Gas · NGC 6611 Cluster',
    description: '位于人马臂（距地球约 5,700 光年）鹰状星云 M16 核心的标志性天体：三根高约 4–5 光年的冷分子氢与星际尘埃巨柱，在年轻星团 NGC 6611 强烈紫外辐射的光致蒸发雕刻下屹立，柱顶指状突起（EGGs）中正孕育着新生原恒星。'
  },
  {
    id: 'crab',
    name: 'Crab Pulsar PSR B0531+21 (蟹状星云脉冲星)',
    subtitle: 'SN 1054 Supernova Remnant & Relativistic Synchrotron Jets',
    category: 'MILLISECOND PULSAR · SUPERNOVA REMNANT',
    position: new THREE.Vector3(-8.2, 0.65, 31.6),
    cameraPos: new THREE.Vector3(-6.4, 1.45, 33.8),
    lookAt: new THREE.Vector3(-8.2, 0.65, 31.6),
    scaleLy: '500 ly (Perseus Arm Edge)',
    distCore: '32,500 ly',
    distSol: '6,500 ± 1,600 ly',
    spectral: 'Non-Thermal Synchrotron / Gamma / X-Ray',
    mass: '1.4 M☉ Neutron Core · Spin = 30.2 Hz',
    description: 'Born in the historic supernova of 1054 AD, this city-sized magnetized neutron star spins 30 times per second, whipping twin relativistic particle beams and powering an expanding cage of ionized filaments in the Perseus Arm.'
  },
  {
    id: 'eta_carinae',
    name: 'Eta Carinae (海山二极超巨星与双叶侏儒星云)',
    subtitle: 'Bipolar Homunculus Nebula & 100+ M☉ Luminous Blue Variable',
    category: 'LUMINOUS BLUE VARIABLE · CARINA ARM',
    position: new THREE.Vector3(-14.5, -0.35, 18.2),
    cameraPos: new THREE.Vector3(-13.0, 0.45, 19.9),
    lookAt: new THREE.Vector3(-14.5, -0.35, 18.2),
    scaleLy: '0.58 ly Bipolar Homunculus Lobes',
    distCore: '23,950 ly (l = 287.6°, b = -0.63°)',
    distSol: '7,500 ± 150 ly (Carina-Sagittarius Arm)',
    spectral: 'LBV Binary Colliding-Wind X-Ray + IR Dust Shell',
    mass: '~120–150 M☉ (Primary + Companion) · 5×10⁶ L☉',
    description: '船底-人马臂中最震撼的极超巨星系统（距地球 7,500 光年，光度达太阳 500 万倍）：1843 年大爆发抛射出逾 10 倍太阳质量的物质，形成了对称的双叶沙漏状「侏儒星云（Homunculus Nebula）」，随时可能演化为超亮超新星。'
  }
];

export const SPIRAL_ARM_LABELS = [
  { name: 'Scutum-Centaurus Arm (盾牌-半人马臂)', pos: new THREE.Vector3(-19, 1.2, -16) },
  { name: 'Perseus Arm (英仙臂)', pos: new THREE.Vector3(16, 1.2, 31) },
  { name: 'Sagittarius-Carina Arm (人马-船底臂)', pos: new THREE.Vector3(22, 1.2, -18) },
  { name: 'Norma-Outer Arm (矩尺-外旋臂)', pos: new THREE.Vector3(-32, 1.2, 18) },
  { name: 'Orion-Cygnus Spur (猎户支臂)', pos: new THREE.Vector3(5.5, 0.9, 24.5) },
  { name: 'Galactic Bar (银心棒状核球)', pos: new THREE.Vector3(4.5, 2.2, -3.5) }
];

function createRadialGlowTexture(c0 = 'rgba(255,240,200,1)', c1 = 'rgba(255,160,80,0.35)', c2 = 'rgba(0,0,0,0)') {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 2, 64, 64, 62);
  g.addColorStop(0.0, c0);
  g.addColorStop(0.38, c1);
  g.addColorStop(1.0, c2);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

export function buildMilkyWayWorld(scene) {
  const root = new THREE.Group();
  root.name = 'MilkyWayAtlasRoot';
  scene.add(root);

  // Deterministic PRNG so the galaxy structure is reproducible
  let seed = 20261022;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const gauss = () => {
    const u = Math.max(1e-6, rand());
    const v = Math.max(1e-6, rand());
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  };

  // ============================================================================
  // 1. BACKGROUND DEEP-SPACE FIELD & DISTANT GALAXIES
  // ============================================================================
  const bgCount = 4500;
  const bgPos = new Float32Array(bgCount * 3);
  const bgCol = new Float32Array(bgCount * 3);
  for (let i = 0; i < bgCount; i++) {
    const u = rand() * 2 - 1;
    const theta = rand() * Math.PI * 2;
    const r = 340 + rand() * 180;
    const s = Math.sqrt(1 - u * u);
    bgPos[i * 3 + 0] = r * s * Math.cos(theta);
    bgPos[i * 3 + 1] = r * u;
    bgPos[i * 3 + 2] = r * s * Math.sin(theta);

    const tint = 0.75 + rand() * 0.25;
    bgCol[i * 3 + 0] = tint * (0.85 + rand() * 0.15);
    bgCol[i * 3 + 1] = tint * (0.88 + rand() * 0.12);
    bgCol[i * 3 + 2] = tint;
  }
  const bgGeo = new THREE.BufferGeometry();
  bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
  bgGeo.setAttribute('color', new THREE.BufferAttribute(bgCol, 3));
  const bgStars = new THREE.Points(
    bgGeo,
    new THREE.PointsMaterial({
      size: 1.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false
    })
  );
  root.add(bgStars);

  // ============================================================================
  // 2. 125,000-STAR BARRED SPIRAL GALAXY PARTICLE SYSTEM
  // ============================================================================
  const STAR_COUNT = 125000;
  const sPos = new Float32Array(STAR_COUNT * 3);
  const aSize = new Float32Array(STAR_COUNT);
  const aRadius = new Float32Array(STAR_COUNT);
  const aBaseAngle = new Float32Array(STAR_COUNT);
  const aAngularVel = new Float32Array(STAR_COUNT);
  const aHeight = new Float32Array(STAR_COUNT);
  const aTempType = new Float32Array(STAR_COUNT);
  const aArmOffset = new Float32Array(STAR_COUNT);
  const aRandomPhase = new Float32Array(STAR_COUNT);

  const barAngle = 0.48; // ~27.5 deg Galactic Bar orientation
  const armBaseAngles = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5];
  const spiralWind = 4.35; // Logarithmic winding tightness

  // Globular Clusters in the Galactic Halo
  const globularCenters = [
    new THREE.Vector3(-16.0, 7.2, 12.5),  // Omega Centauri
    new THREE.Vector3(14.5, 9.8, -11.0),  // M13 Hercules
    new THREE.Vector3(-9.5, -8.4, -18.0), // 47 Tucanae
    new THREE.Vector3(21.0, -6.5, 14.0),  // M22
    new THREE.Vector3(4.0, 11.5, 6.0),    // M5
    new THREE.Vector3(-22.0, 5.5, -8.0)   // M15
  ];

  for (let i = 0; i < STAR_COUNT; i++) {
    let x = 0, y = 0, z = 0;
    let r = 0, theta = 0, temp = 0.5, size = 1.0, alpha = 0.85;

    const p = i / STAR_COUNT;

    if (p < 0.24) {
      // A) GALACTIC CORE & PEANUT-SHAPED BAR (24% of stars)
      const u = Math.pow(rand(), 1.55);
      const alongBar = (rand() * 2 - 1) * 11.5 * u + gauss() * 2.1;
      const acrossBar = gauss() * (2.4 + (1.0 - u) * 1.8);
      x = alongBar * Math.cos(barAngle) - acrossBar * Math.sin(barAngle);
      z = alongBar * Math.sin(barAngle) + acrossBar * Math.cos(barAngle);
      r = Math.sqrt(x * x + z * z);
      theta = Math.atan2(z, x);

      const coreThickness = Math.max(0.45, 2.8 * Math.exp(-r / 6.5));
      y = gauss() * coreThickness;

      // Older warm golden-amber K/G/M giants in the bulge, with scorching bright stars right at Sgr A*
      temp = (r < 1.8) ? (0.55 + rand() * 0.45) : (0.18 + rand() * 0.48);
      size = (r < 3.0) ? (1.1 + Math.pow(rand(), 3.0) * 2.6) : (0.8 + Math.pow(rand(), 3.0) * 2.1);
      alpha = 0.92;
    } else if (p < 0.82) {
      // B) FOUR MAJOR LOGARITHMIC SPIRAL ARMS + ORION SPUR (58% of stars)
      const isOrionSpur = (p > 0.77);
      let armIdx = i % 4;
      // Weight Scutum-Centaurus (0) and Perseus (2) slightly higher as primary barred-spiral arms
      if (rand() < 0.28) armIdx = (i % 2) * 2;

      if (isOrionSpur) {
        // Local Orion-Cygnus Spur passing through [0, 0, 26]
        r = 19.0 + rand() * 14.5;
        const spurProgress = (r - 26.0) / 10.0;
        theta = Math.PI * 0.5 + spurProgress * 0.52 + gauss() * 0.085;
      } else {
        r = 6.5 + Math.pow(rand(), 0.86) * 43.5;
        const armSpread = (0.11 + (r / 50.0) * 0.19) * (armIdx % 2 === 0 ? 0.9 : 1.15);
        theta = armBaseAngles[armIdx] + Math.log(r / 5.5) * spiralWind + gauss() * armSpread;
      }

      const diskHeight = 0.28 + (r / 50.0) * 0.85;
      y = gauss() * diskHeight;

      // Spiral ridge contains hotter blue-white O/B/A stars
      const isHotYoung = rand() < 0.58;
      temp = isHotYoung ? (0.62 + rand() * 0.38) : (0.20 + rand() * 0.45);
      size = 0.75 + Math.pow(rand(), 3.6) * 2.9;
      alpha = 0.78 + rand() * 0.22;
    } else if (p < 0.96) {
      // C) DIFFUSE GALACTIC DISK & OUTER HALO (14% of stars)
      r = 3.0 + Math.pow(rand(), 1.1) * 51.0;
      theta = rand() * Math.PI * 2;
      y = gauss() * (1.1 + (r / 50.0) * 2.6);
      temp = 0.15 + rand() * 0.55;
      size = 0.65 + Math.pow(rand(), 4.0) * 1.9;
      alpha = 0.48 + rand() * 0.35;
    } else {
      // D) GLOBULAR CLUSTERS ORBITING IN THE HALO (4% of stars)
      const gc = globularCenters[i % globularCenters.length];
      const cr = Math.pow(rand(), 1.9) * 2.4;
      const cu = rand() * 2 - 1;
      const cphi = rand() * Math.PI * 2;
      const cs = Math.sqrt(1 - cu * cu);
      x = gc.x + cr * cs * Math.cos(cphi);
      y = gc.y + cr * cu;
      z = gc.z + cr * cs * Math.sin(cphi);
      r = Math.sqrt(x * x + z * z);
      theta = Math.atan2(z, x);
      temp = 0.25 + rand() * 0.45; // Ancient Population II golden stars
      size = 0.85 + Math.pow(rand(), 3.0) * 2.0;
      alpha = 0.90;
    }

    const sx = Math.cos(theta) * r;
    const sz = Math.sin(theta) * r;
    // Keep a clean 3.1-unit clearing right around our Solar System [0, 0, 26]
    // so no random background star point spawns inside the 8 planetary orbits!
    const distFromSol = Math.hypot(sx, y, sz - 26.0);
    if (distFromSol < 3.1) {
      r += 3.3;
    }

    sPos[i * 3 + 0] = Math.cos(theta) * r;
    sPos[i * 3 + 1] = y;
    sPos[i * 3 + 2] = Math.sin(theta) * r;

    aSize[i] = size;
    aRadius[i] = r;
    aBaseAngle[i] = theta;
    // Differential angular velocity: faster near core, flat rotation curve in outer disk
    aAngularVel[i] = 1.0 / (0.35 + Math.pow(r * 0.12, 0.72));
    aHeight[i] = y;
    aTempType[i] = temp;
    aArmOffset[i] = alpha;
    aRandomPhase[i] = rand();
  }

  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
  starGeo.setAttribute('aSize', new THREE.BufferAttribute(aSize, 1));
  starGeo.setAttribute('aRadius', new THREE.BufferAttribute(aRadius, 1));
  starGeo.setAttribute('aBaseAngle', new THREE.BufferAttribute(aBaseAngle, 1));
  starGeo.setAttribute('aAngularVel', new THREE.BufferAttribute(aAngularVel, 1));
  starGeo.setAttribute('aHeight', new THREE.BufferAttribute(aHeight, 1));
  starGeo.setAttribute('aTempType', new THREE.BufferAttribute(aTempType, 1));
  starGeo.setAttribute('aArmOffset', new THREE.BufferAttribute(aArmOffset, 1));
  starGeo.setAttribute('aRandomPhase', new THREE.BufferAttribute(aRandomPhase, 1));

  const starUniforms = {
    uTime: { value: 0 },
    uRotationSpeed: { value: 0.12 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
    uExposure: { value: 1.15 },
    uSpectralMode: { value: 0.0 }
  };

  const starMat = new THREE.ShaderMaterial({
    vertexShader: STAR_VERTEX_SHADER,
    fragmentShader: STAR_FRAGMENT_SHADER,
    uniforms: starUniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const starPoints = new THREE.Points(starGeo, starMat);
  starPoints.frustumCulled = false;
  root.add(starPoints);

  // ============================================================================
  // 3. VOLUMETRIC EMISSION NEBULAE & DARK INTERSTELLAR DUST LANES
  // ============================================================================
  function buildCloudLayer(count, isDustLayer) {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const rad = new Float32Array(count);
    const ang = new Float32Array(count);
    const vel = new Float32Array(count);
    const hgt = new Float32Array(count);
    const typ = new Float32Array(count);
    const sd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      let r, theta, y, nType, cSize;
      if (!isDustLayer && i < count * 0.22) {
        // Warm golden galactic bar & core glow clouds
        const along = (rand() * 2 - 1) * 9.5;
        const across = gauss() * 2.2;
        const x = along * Math.cos(barAngle) - across * Math.sin(barAngle);
        const z = along * Math.sin(barAngle) + across * Math.cos(barAngle);
        r = Math.sqrt(x * x + z * z);
        theta = Math.atan2(z, x);
        y = gauss() * 0.85;
        nType = 2.0; // Warm Core Gold
        cSize = 3.2 + rand() * 3.8;
      } else {
        const armIdx = i % 4;
        r = 6.0 + Math.pow(rand(), 0.9) * 41.0;
        // Dark dust lanes hug the inner concave edge of each spiral arm
        const laneOffset = isDustLayer ? -0.09 : (rand() - 0.5) * 0.14;
        theta = armBaseAngles[armIdx] + Math.log(r / 5.5) * spiralWind + laneOffset + gauss() * 0.06;
        y = gauss() * (isDustLayer ? 0.18 : 0.35);
        nType = isDustLayer ? 3.0 : (rand() < 0.56 ? 0.0 : 1.0); // 0 = H-II Magenta, 1 = Reflection Cyan
        cSize = isDustLayer ? (2.6 + rand() * 3.2) : (2.2 + rand() * 3.6);
      }

      pos[i * 3 + 0] = Math.cos(theta) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * r;

      sz[i] = cSize;
      rad[i] = r;
      ang[i] = theta;
      vel[i] = 1.0 / (0.35 + Math.pow(r * 0.12, 0.72));
      hgt[i] = y;
      typ[i] = nType;
      sd[i] = rand() * 100.0;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sz, 1));
    geo.setAttribute('aRadius', new THREE.BufferAttribute(rad, 1));
    geo.setAttribute('aBaseAngle', new THREE.BufferAttribute(ang, 1));
    geo.setAttribute('aAngularVel', new THREE.BufferAttribute(vel, 1));
    geo.setAttribute('aHeight', new THREE.BufferAttribute(hgt, 1));
    geo.setAttribute('aNebulaType', new THREE.BufferAttribute(typ, 1));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(sd, 1));
    return geo;
  }

  const nebulaUniforms = {
    uTime: { value: 0 },
    uRotationSpeed: { value: 0.12 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
    uNebulaOpacity: { value: 1.0 },
    uDustVisibility: { value: 1.0 },
    uSpectralMode: { value: 0.0 }
  };

  // Additive Emission & Reflection Nebulae (2,600 clouds)
  const emissionNebulaMat = new THREE.ShaderMaterial({
    vertexShader: NEBULA_VERTEX_SHADER,
    fragmentShader: NEBULA_FRAGMENT_SHADER,
    uniforms: nebulaUniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const emissionNebulaPoints = new THREE.Points(buildCloudLayer(2600, false), emissionNebulaMat);
  emissionNebulaPoints.frustumCulled = false;
  root.add(emissionNebulaPoints);

  // Dark Interstellar Dust Lanes (1,200 absorbing clouds along inner spiral arms)
  const dustLaneMat = new THREE.ShaderMaterial({
    vertexShader: NEBULA_VERTEX_SHADER,
    fragmentShader: NEBULA_FRAGMENT_SHADER,
    uniforms: nebulaUniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending
  });
  const dustLanePoints = new THREE.Points(buildCloudLayer(1200, true), dustLaneMat);
  dustLanePoints.frustumCulled = false;
  root.add(dustLanePoints);

  // High-Energy Fermi Gamma/X-Ray Bubbles above and below the Galactic Core (visible especially in X-Ray mode!)
  const fermiGroup = new THREE.Group();
  const fermiGeo = new THREE.SphereGeometry(12, 24, 18);
  const fermiMat = new THREE.MeshBasicMaterial({
    color: 0x8a38ff,
    transparent: true,
    opacity: 0.0,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const topBubble = new THREE.Mesh(fermiGeo, fermiMat);
  topBubble.scale.set(0.85, 1.35, 0.85);
  topBubble.position.y = 14.5;
  const botBubble = new THREE.Mesh(fermiGeo, fermiMat);
  botBubble.scale.set(0.85, 1.35, 0.85);
  botBubble.position.y = -14.5;
  fermiGroup.add(topBubble, botBubble);
  root.add(fermiGroup);

  // ============================================================================
  // 4. SCIENTIFIC ASTROMETRIC OVERLAYS (Galactic Coordinate Grid & Solar Orbit)
  // ============================================================================
  const gridGroup = new THREE.Group();
  root.add(gridGroup);

  const gridLineMat = new THREE.LineBasicMaterial({
    color: 0x4ea8de,
    transparent: true,
    opacity: 0.22,
    depthWrite: false
  });

  // Concentric galactocentric distance rings: 10k, 20k, 30k, 40k, 50k ly
  for (const radius of [10, 20, 30, 40, 50]) {
    const pts = [];
    for (let s = 0; s <= 128; s++) {
      const a = (s / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    const ringGeo = new THREE.BufferGeometry().setFromPoints(pts);
    gridGroup.add(new THREE.Line(ringGeo, gridLineMat));
  }

  // Radial Galactic Spokes every 30 degrees
  for (let d = 0; d < 12; d++) {
    const a = (d / 12) * Math.PI * 2;
    const spokeGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(Math.cos(a) * 4, 0, Math.sin(a) * 4),
      new THREE.Vector3(Math.cos(a) * 50, 0, Math.sin(a) * 50)
    ]);
    gridGroup.add(new THREE.Line(spokeGeo, gridLineMat));
  }

  // Sun's 230-Million-Year Galactic Orbit Ring (at R = 26,000 ly)
  const solarOrbitGroup = new THREE.Group();
  root.add(solarOrbitGroup);
  const solarPts = [];
  for (let s = 0; s <= 160; s++) {
    const a = (s / 160) * Math.PI * 2;
    solarPts.push(new THREE.Vector3(Math.cos(a) * 26.0, 0.04, Math.sin(a) * 26.0));
  }
  const solarOrbitLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(solarPts),
    new THREE.LineBasicMaterial({
      color: 0xffd166,
      transparent: true,
      opacity: 0.65,
      depthWrite: false
    })
  );
  solarOrbitGroup.add(solarOrbitLine);

  // Line of sight from Sol [0, 0, 26] to Sagittarius A* [0, 0, 0] (Galactic Longitude l = 0°)
  const lZeroLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0.05, 26.0),
      new THREE.Vector3(0, 0.05, 0.0)
    ]),
    new THREE.LineBasicMaterial({ color: 0x56cfe1, transparent: true, opacity: 0.45 })
  );
  solarOrbitGroup.add(lZeroLine);

  // ============================================================================
  // 5. DETAILED 3D MICRO-SCALE COSMIC LANDMARKS
  // ============================================================================
  const interactiveMeshes = [];

  // --- LANDMARK 1: SAGITTARIUS A* SUPERMASSIVE BLACK HOLE ([0, 0, 0]) ---
  const sgraGroup = new THREE.Group();
  sgraGroup.position.set(0, 0, 0);
  root.add(sgraGroup);

  // Intense galactic center ambient halo sprite
  const coreGlowSprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: createRadialGlowTexture('rgba(255,248,220,1)', 'rgba(255,175,75,0.45)', 'rgba(255,90,20,0)'),
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  );
  coreGlowSprite.scale.set(22, 16, 1);
  sgraGroup.add(coreGlowSprite);

  // Event Horizon Black Sphere (Schwarzschild Shadow)
  const horizonMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.46, 36, 36),
    new THREE.MeshBasicMaterial({ color: 0x000000 })
  );
  horizonMesh.userData = { landmarkId: 'sgra' };
  sgraGroup.add(horizonMesh);
  interactiveMeshes.push(horizonMesh);

  // Relativistic Swirling Plasma Accretion Disk
  const accretionUniforms = { uTime: { value: 0 } };
  const accretionDiskMat = new THREE.ShaderMaterial({
    vertexShader: ACCRETION_VERTEX_SHADER,
    fragmentShader: ACCRETION_FRAGMENT_SHADER,
    uniforms: accretionUniforms,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending
  });

  const diskGeo = new THREE.PlaneGeometry(4.2, 4.2, 1, 1);
  diskGeo.rotateX(-Math.PI / 2);
  const mainAccretionDisk = new THREE.Mesh(diskGeo, accretionDiskMat);
  mainAccretionDisk.rotation.z = 0.16;
  mainAccretionDisk.rotation.x = 0.08;
  sgraGroup.add(mainAccretionDisk);

  // Gravitationally Lensed Vertical Photon Ring Halo (Einstein Ring arch over/under the black hole)
  const lensedRing = new THREE.Mesh(diskGeo, accretionDiskMat);
  lensedRing.rotation.x = Math.PI / 2 - 0.12;
  lensedRing.scale.setScalar(0.72);
  sgraGroup.add(lensedRing);

  // Orbiting High-Velocity S-Stars (S2, S14, S38, S55) around Sagittarius A*
  const sStarOrbits = [];
  const sStarSpecs = [
    { a: 1.05, e: 0.58, incX: 0.65, incZ: 0.35, speed: 2.2, color: 0x72efdd }, // S2 (famous 16-year orbit)
    { a: 1.35, e: 0.68, incX: -0.45, incZ: 0.82, speed: 1.6, color: 0x90e0ef }, // S14
    { a: 0.92, e: 0.45, incX: 0.95, incZ: -0.52, speed: 2.8, color: 0xffd166 }, // S38
    { a: 0.78, e: 0.52, incX: -0.82, incZ: -0.28, speed: 3.3, color: 0xf4a261 }  // S55 / S62
  ];

  sStarSpecs.forEach((sp, idx) => {
    const orbitGroup = new THREE.Group();
    orbitGroup.rotation.set(sp.incX, idx * 0.8, sp.incZ);
    const b = sp.a * Math.sqrt(1 - sp.e * sp.e);
    const focusOffset = sp.a * sp.e;

    const pts = [];
    for (let s = 0; s <= 96; s++) {
      const t = (s / 96) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(t) * sp.a - focusOffset, 0, Math.sin(t) * b));
    }
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({ color: sp.color, transparent: true, opacity: 0.45 })
    );
    orbitGroup.add(line);

    const starDot = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 12, 12),
      new THREE.MeshBasicMaterial({ color: sp.color })
    );
    orbitGroup.add(starDot);
    sgraGroup.add(orbitGroup);

    sStarOrbits.push({ starDot, a: sp.a, b, focusOffset, speed: sp.speed, phase: idx * 1.7 });
  });

  // --- LANDMARK 2: DETAILED SOLAR SYSTEM (SUN + 8 PLANETS + ORBITAL TRAILS + ASTEROID/KUIPER BELTS) ---
  const solarSystem = buildDetailedSolarSystem(root, interactiveMeshes);

  // --- LANDMARK 3: ORION NEBULA M42 & STELLAR NURSERY ([3.8, -0.35, 27.3]) ---
  const m42Group = new THREE.Group();
  m42Group.position.set(3.8, -0.35, 27.3);
  root.add(m42Group);

  const m42HitSphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.65, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xff4d8d, wireframe: true, transparent: true, opacity: 0.0 })
  );
  m42HitSphere.userData = { landmarkId: 'm42' };
  m42Group.add(m42HitSphere);
  interactiveMeshes.push(m42HitSphere);

  // Layered Volumetric Glowing H-II Nursery Clouds & Trapezium OB Stars
  const m42Sprites = [];
  const nurseryColors = [
    ['rgba(255,95,165,0.95)', 'rgba(195,40,120,0.38)'],
    ['rgba(110,210,255,0.95)', 'rgba(55,120,235,0.35)'],
    ['rgba(255,185,95,0.90)', 'rgba(215,85,45,0.32)']
  ];
  for (let c = 0; c < 18; c++) {
    const pal = nurseryColors[c % nurseryColors.length];
    const sp = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: createRadialGlowTexture(pal[0], pal[1], 'rgba(0,0,0,0)'),
        transparent: true,
        opacity: 0.42,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    );
    sp.position.set((rand() - 0.5) * 1.9, (rand() - 0.5) * 1.2, (rand() - 0.5) * 1.9);
    const sc = 1.4 + rand() * 2.1;
    sp.scale.set(sc, sc, 1);
    m42Group.add(sp);
    m42Sprites.push({ sprite: sp, baseScale: sc, phase: c * 0.7 });
  }

  // The Trapezium Cluster (4 brilliant newborn O/B stars at the heart of M42)
  for (let t = 0; t < 4; t++) {
    const a = (t / 4) * Math.PI * 2 + 0.3;
    const trapStar = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xdff6ff })
    );
    trapStar.position.set(Math.cos(a) * 0.22, (t % 2 === 0 ? 0.08 : -0.08), Math.sin(a) * 0.22);
    m42Group.add(trapStar);
  }

  // --- LANDMARK 4: CRAB PULSAR PSR B0531+21 ([-8.2, 0.65, 31.6]) ---
  const crabGroup = new THREE.Group();
  crabGroup.position.set(-8.2, 0.65, 31.6);
  root.add(crabGroup);

  const pulsarCore = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 20, 20),
    new THREE.MeshBasicMaterial({ color: 0x80ffdb })
  );
  pulsarCore.userData = { landmarkId: 'crab' };
  crabGroup.add(pulsarCore);
  interactiveMeshes.push(pulsarCore);

  // Expanding Supernova Remnant Filament Cage
  const remnantShell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.95, 2),
    new THREE.MeshBasicMaterial({
      color: 0x72efdd,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending
    })
  );
  crabGroup.add(remnantShell);

  // Twin Relativistic Synchrotron Lighthouse Beams
  const pulsarJetPivot = new THREE.Group();
  const jetGeo = new THREE.ConeGeometry(0.32, 3.6, 16, 1, true);
  const jetMat = new THREE.MeshBasicMaterial({
    color: 0x56cfe1,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending
  });
  const jetNorth = new THREE.Mesh(jetGeo, jetMat);
  jetNorth.position.y = 1.8;
  jetNorth.rotation.x = Math.PI;
  const jetSouth = new THREE.Mesh(jetGeo, jetMat);
  jetSouth.position.y = -1.8;
  pulsarJetPivot.add(jetNorth, jetSouth);
  pulsarJetPivot.rotation.z = 0.58;
  crabGroup.add(pulsarJetPivot);

  // --- LANDMARK 5: PROXIMA CENTAURI & ALPHA CENTAURI TRIPLE SYSTEM ([-3.35, -0.22, 23.55]) ---
  const proximaGroup = new THREE.Group();
  proximaGroup.position.set(-3.35, -0.22, 23.55);
  root.add(proximaGroup);

  // 4.2465-Light-Year Interstellar Baseline connecting Sol [0, 0, 26] to Proxima Centauri
  root.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 26.0),
      new THREE.Vector3(-3.35, -0.22, 23.55)
    ]),
    new THREE.LineBasicMaterial({ color: 0xffbe0b, transparent: true, opacity: 0.35, depthWrite: false })
  ));

  // Proxima Centauri (M5.5Ve Red Flare Dwarf)
  const proximaStar = new THREE.Mesh(
    new THREE.SphereGeometry(0.11, 28, 28),
    new THREE.MeshBasicMaterial({ color: 0xff4d2a })
  );
  proximaStar.userData = { landmarkId: 'proxima' };
  proximaGroup.add(proximaStar);
  interactiveMeshes.push(proximaStar);

  const proximaCorona = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: createRadialGlowTexture('rgba(255,140,85,1)', 'rgba(235,45,25,0.48)', 'rgba(0,0,0,0)'),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  );
  proximaCorona.scale.set(0.68, 0.68, 1);
  proximaGroup.add(proximaCorona);

  // Emerald Habitable Zone Ring around Proxima Centauri (0.04–0.08 AU scaled)
  const proxHzRing = new THREE.Mesh(
    new THREE.RingGeometry(0.28, 0.42, 64),
    new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.24,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  );
  proxHzRing.rotation.x = Math.PI / 2 - 0.18;
  proximaGroup.add(proxHzRing);

  // Proxima Centauri b (1.07 M⊕ Habitable-Zone Exoplanet) & Proxima d
  const proximaPlanetPivot = new THREE.Group();
  proximaPlanetPivot.rotation.x = -0.18;
  proximaGroup.add(proximaPlanetPivot);

  const proxBPts = [];
  for (let s = 0; s <= 64; s++) {
    const a = (s / 64) * Math.PI * 2;
    proxBPts.push(new THREE.Vector3(Math.cos(a) * 0.35, 0, Math.sin(a) * 0.35));
  }
  proximaPlanetPivot.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(proxBPts),
    new THREE.LineBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.72 })
  ));
  const proximaBMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.032, 20, 20),
    new THREE.MeshStandardMaterial({ color: 0x2ec4b6, roughness: 0.6, emissive: 0x10b981, emissiveIntensity: 0.45 })
  );
  proximaPlanetPivot.add(proximaBMesh);

  // Companion Binary Pair: Alpha Centauri A (G2V) & Alpha Centauri B (K1V)
  const alphaCenBinaryPivot = new THREE.Group();
  alphaCenBinaryPivot.position.set(0.28, 0.34, -0.25);
  alphaCenBinaryPivot.rotation.z = 0.35;
  proximaGroup.add(alphaCenBinaryPivot);

  const alphaABOrbitPts = [];
  for (let s = 0; s <= 64; s++) {
    const a = (s / 64) * Math.PI * 2;
    alphaABOrbitPts.push(new THREE.Vector3(Math.cos(a) * 0.22, 0, Math.sin(a) * 0.16));
  }
  alphaCenBinaryPivot.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(alphaABOrbitPts),
    new THREE.LineBasicMaterial({ color: 0xffd166, transparent: true, opacity: 0.48 })
  ));
  const alphaCenA = new THREE.Mesh(
    new THREE.SphereGeometry(0.085, 20, 20),
    new THREE.MeshBasicMaterial({ color: 0xfff3d1 })
  );
  const alphaCenB = new THREE.Mesh(
    new THREE.SphereGeometry(0.068, 20, 20),
    new THREE.MeshBasicMaterial({ color: 0xffa64d })
  );
  alphaCenBinaryPivot.add(alphaCenA, alphaCenB);

  // --- LANDMARK 6: TRAPPIST-1 SEVEN-EXOPLANET SYSTEM ([3.15, -1.05, 24.35]) ---
  const trappistGroup = new THREE.Group();
  trappistGroup.position.set(3.15, -1.05, 24.35);
  trappistGroup.rotation.x = 0.22;
  trappistGroup.rotation.z = -0.18;
  root.add(trappistGroup);

  const trappistStar = new THREE.Mesh(
    new THREE.SphereGeometry(0.10, 28, 28),
    new THREE.MeshBasicMaterial({ color: 0xff3b30 })
  );
  trappistStar.userData = { landmarkId: 'trappist1' };
  trappistGroup.add(trappistStar);
  interactiveMeshes.push(trappistStar);

  const trappistGlow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: createRadialGlowTexture('rgba(255,115,85,1)', 'rgba(220,38,38,0.45)', 'rgba(0,0,0,0)'),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  );
  trappistGlow.scale.set(0.62, 0.62, 1);
  trappistGroup.add(trappistGlow);

  // Habitable Zone annulus spanning planets e, f, g
  const trapHzMesh = new THREE.Mesh(
    new THREE.RingGeometry(0.35, 0.56, 64),
    new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  );
  trapHzMesh.rotation.x = Math.PI / 2;
  trappistGroup.add(trapHzMesh);

  const trappistPlanets = [];
  const trapSpecs = [
    { name: 'b', r: 0.18, size: 0.020, speed: 3.2, col: 0xf4a261 },
    { name: 'c', r: 0.24, size: 0.020, speed: 2.5, col: 0xe76f51 },
    { name: 'd', r: 0.30, size: 0.016, speed: 1.9, col: 0xe9c46a },
    { name: 'e', r: 0.38, size: 0.019, speed: 1.45, col: 0x2ec4b6 }, // Habitable Zone
    { name: 'f', r: 0.46, size: 0.021, speed: 1.10, col: 0x38bdf8 }, // Habitable Zone
    { name: 'g', r: 0.54, size: 0.022, speed: 0.85, col: 0x4cc9f0 }, // Habitable Zone
    { name: 'h', r: 0.64, size: 0.015, speed: 0.62, col: 0x90e0ef }
  ];
  trapSpecs.forEach((tp, idx) => {
    const pts = [];
    for (let s = 0; s <= 64; s++) {
      const a = (s / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * tp.r, 0, Math.sin(a) * tp.r));
    }
    trappistGroup.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({ color: tp.col, transparent: true, opacity: 0.52 })
    ));
    const pMesh = new THREE.Mesh(
      new THREE.SphereGeometry(tp.size, 16, 16),
      new THREE.MeshBasicMaterial({ color: tp.col })
    );
    trappistGroup.add(pMesh);
    trappistPlanets.push({ mesh: pMesh, r: tp.r, speed: tp.speed, phase: idx * 0.95 });
  });

  // --- LANDMARK 7: PILLARS OF CREATION · EAGLE NEBULA M16 ([8.5, 0.35, 17.5]) ---
  const pillarsGroup = new THREE.Group();
  pillarsGroup.position.set(8.5, 0.35, 17.5);
  root.add(pillarsGroup);

  const pillarsHit = new THREE.Mesh(
    new THREE.SphereGeometry(0.65, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.0, depthWrite: false })
  );
  pillarsHit.userData = { landmarkId: 'pillars' };
  pillarsGroup.add(pillarsHit);
  interactiveMeshes.push(pillarsHit);

  // Three towering molecular hydrogen & dust columns (Left Pillar 1, Middle Pillar 2, Right Pillar 3)
  const pillarDefs = [
    { bx: -0.32, bz: -0.08, height: 1.05, tiltZ: -0.18, width: 0.36 },
    { bx: 0.04,  bz: 0.06,  height: 0.86, tiltZ: -0.12, width: 0.30 },
    { bx: 0.36,  bz: -0.04, height: 0.68, tiltZ: -0.08, width: 0.25 }
  ];
  pillarDefs.forEach((pd) => {
    const steps = 11;
    for (let k = 0; k <= steps; k++) {
      const u = k / steps;
      const px = pd.bx + Math.sin(pd.tiltZ) * (u - 0.3) * pd.height;
      const py = (u - 0.42) * pd.height;
      const pz = pd.bz;
      // Golden photo-evaporating ionization rim + deep teal/amber dust column
      const isTip = u > 0.82;
      const sp = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: createRadialGlowTexture(
            isTip ? 'rgba(255,235,155,0.98)' : 'rgba(215,135,55,0.88)',
            isTip ? 'rgba(56,189,248,0.52)' : 'rgba(120,55,25,0.42)',
            'rgba(0,0,0,0)'
          ),
          transparent: true,
          opacity: isTip ? 0.82 : 0.56,
          depthWrite: false,
          blending: THREE.AdditiveBlending
        })
      );
      sp.position.set(px, py, pz);
      const sc = pd.width * (1.15 - u * 0.38);
      sp.scale.set(sc, sc * 1.25, 1);
      pillarsGroup.add(sp);
    }
    // Protostar EGG at the tip of each pillar
    const eggStar = new THREE.Mesh(
      new THREE.SphereGeometry(0.032, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xfffbeb })
    );
    eggStar.position.set(pd.bx + Math.sin(pd.tiltZ) * 0.7 * pd.height, 0.58 * pd.height, pd.bz);
    pillarsGroup.add(eggStar);
  });

  // Ambient cyan/teal ionized [O III] bath around M16
  const m16Halo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: createRadialGlowTexture('rgba(56,189,248,0.48)', 'rgba(245,158,11,0.22)', 'rgba(0,0,0,0)'),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  );
  m16Halo.scale.set(2.4, 2.1, 1);
  pillarsGroup.add(m16Halo);

  // --- LANDMARK 8: ETA CARINAE & HOMUNCULUS NEBULA ([-14.5, -0.35, 18.2]) ---
  const etaCarGroup = new THREE.Group();
  etaCarGroup.position.set(-14.5, -0.35, 18.2);
  etaCarGroup.rotation.z = 0.46;
  etaCarGroup.rotation.x = 0.24;
  root.add(etaCarGroup);

  const etaCore = new THREE.Mesh(
    new THREE.SphereGeometry(0.11, 20, 20),
    new THREE.MeshBasicMaterial({ color: 0xe0f2fe })
  );
  etaCore.userData = { landmarkId: 'eta_carinae' };
  etaCarGroup.add(etaCore);
  interactiveMeshes.push(etaCore);

  // Twin Bipolar Hourglass Lobes of the Homunculus Nebula
  const lobeGeo = new THREE.SphereGeometry(0.36, 28, 24);
  lobeGeo.scale(1.0, 1.38, 1.0);
  const lobeMat = new THREE.MeshBasicMaterial({
    color: 0xf59e0b,
    wireframe: true,
    transparent: true,
    opacity: 0.38,
    blending: THREE.AdditiveBlending
  });
  const northLobe = new THREE.Mesh(lobeGeo, lobeMat);
  northLobe.position.y = 0.42;
  const southLobe = new THREE.Mesh(lobeGeo, lobeMat);
  southLobe.position.y = -0.42;
  etaCarGroup.add(northLobe, southLobe);

  for (const sign of [-1, 1]) {
    const lobeGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: createRadialGlowTexture('rgba(255,215,130,0.92)', 'rgba(234,88,12,0.45)', 'rgba(0,0,0,0)'),
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    );
    lobeGlow.position.set(0, sign * 0.42, 0);
    lobeGlow.scale.set(0.95, 1.15, 1);
    etaCarGroup.add(lobeGlow);
  }

  // Equatorial Debris Skirt around the pinch of the hourglass
  const skirtRing = new THREE.Mesh(
    new THREE.RingGeometry(0.18, 0.62, 48),
    new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  );
  skirtRing.rotation.x = Math.PI / 2;
  etaCarGroup.add(skirtRing);

  return {
    root,
    starUniforms,
    nebulaUniforms,
    gridGroup,
    solarOrbitGroup,
    dustLanePoints,
    interactiveMeshes,
    solarSystem,
    update(time, dt, settings, camPos) {
      starUniforms.uTime.value = time;
      starUniforms.uRotationSpeed.value = settings.rotationSpeed;
      starUniforms.uExposure.value = settings.exposure;
      starUniforms.uSpectralMode.value = settings.spectralMode;

      nebulaUniforms.uTime.value = time;
      nebulaUniforms.uRotationSpeed.value = settings.rotationSpeed;
      nebulaUniforms.uNebulaOpacity.value = settings.nebulaOpacity;
      nebulaUniforms.uDustVisibility.value = settings.showDust ? 1.0 : 0.0;
      nebulaUniforms.uSpectralMode.value = settings.spectralMode;

      // Update Detailed Solar System (Sun + 8 Planets + Moons + Glowing Orbital Trails)
      solarSystem.update(time, settings.planetOrbitSpeed ?? 1.0);

      // Fade macro core glow sprite when camera dives directly into Sagittarius A*
      const camCoreDist = camPos ? camPos.length() : 90.0;
      coreGlowSprite.material.opacity = THREE.MathUtils.smoothstep(camCoreDist, 6.0, 26.0) * 0.85;

      // Hide distant Galactic landmark 3D micro-meshes when inspecting Solar System planets up close
      const camSolDist = camPos ? camPos.distanceTo(SOL_CENTER) : 90.0;
      const showGalacticMicro = camSolDist > 2.2;
      m42Group.visible = showGalacticMicro;
      crabGroup.visible = showGalacticMicro;
      proximaGroup.visible = showGalacticMicro;
      trappistGroup.visible = showGalacticMicro;
      pillarsGroup.visible = showGalacticMicro;
      etaCarGroup.visible = showGalacticMicro;

      // Show Fermi High-Energy Gamma/X-Ray bubbles in X-Ray mode
      const xrayWeight = Math.max(0, settings.spectralMode - 1.0);
      fermiMat.opacity = xrayWeight * 0.16;

      gridGroup.visible = settings.showGrid;
      solarOrbitGroup.visible = settings.showSolarOrbit;

      // Update Sagittarius A* accretion disk & Keplerian S-star orbits
      accretionUniforms.uTime.value = time;
      for (let i = 0; i < sStarOrbits.length; i++) {
        const orb = sStarOrbits[i];
        const ang = time * orb.speed + orb.phase;
        orb.starDot.position.set(
          Math.cos(ang) * orb.a - orb.focusOffset,
          0,
          Math.sin(ang) * orb.b
        );
      }

      // Pulse Orion Nebula M42 clouds gently
      for (let i = 0; i < m42Sprites.length; i++) {
        const m = m42Sprites[i];
        const s = m.baseScale * (0.94 + 0.06 * Math.sin(time * 1.4 + m.phase));
        m.sprite.scale.set(s, s, 1);
      }

      // Spin Crab Pulsar lighthouse beams & supernova remnant cage
      pulsarJetPivot.rotation.y = time * 8.5;
      remnantShell.rotation.y = time * 0.25;
      remnantShell.rotation.x = time * 0.18;

      // Animate Proxima Centauri b & Alpha Centauri A/B binary orbit
      const proxAng = -time * 1.65;
      proximaBMesh.position.set(Math.cos(proxAng) * 0.35, 0, Math.sin(proxAng) * 0.35);
      const abAng = time * 0.75;
      alphaCenA.position.set(Math.cos(abAng) * 0.11, 0, Math.sin(abAng) * 0.08);
      alphaCenB.position.set(-Math.cos(abAng) * 0.11, 0, -Math.sin(abAng) * 0.08);

      // Animate TRAPPIST-1 7 resonant exoplanets
      for (let i = 0; i < trappistPlanets.length; i++) {
        const tp = trappistPlanets[i];
        const a = tp.phase - time * tp.speed * 0.85;
        tp.mesh.position.set(Math.cos(a) * tp.r, 0, Math.sin(a) * tp.r);
      }

      // Gently rotate Eta Carinae Homunculus hourglass lobes
      northLobe.rotation.y = time * 0.32;
      southLobe.rotation.y = -time * 0.32;
    }
  };
}
