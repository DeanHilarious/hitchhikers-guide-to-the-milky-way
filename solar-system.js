import * as THREE from './vendor/three.module.js';

export const SOL_CENTER = new THREE.Vector3(0, 0, 26.0);

// True Astrophysical Inclination: The Solar System's Ecliptic Plane is tilted by 60.19°
// relative to the Milky Way's Galactic Plane (North Ecliptic Pole at l = 96.38°, b = +29.81°).
export const ECLIPTIC_GALACTIC_TILT = THREE.MathUtils.degToRad(60.19);
export const ECLIPTIC_NODE_YAW = THREE.MathUtils.degToRad(6.38);

// Sun & 8 Major Planets Data (for close-up inspection, trajectory rendering & HUD telemetry)
export const SOLAR_BODIES = [
  {
    id: 'sun',
    name: 'Sun · 太阳 (Sol)',
    enName: 'The Sun',
    symbol: '☀️',
    orbitRadius: 0.0,
    radius: 0.115,
    orbitSpeed: 0.0,
    inclination: 0.0,
    axialTilt: 0.12,
    distanceAU: '0.00 AU (Center)',
    period: '25.05 Days (Equatorial Rotation)',
    spectral: 'G2V Main-Sequence Star · 5,778 K',
    mass: '1.00 M☉ (332,950 × Earth)',
    description: '太阳系中心的 G2V 型黄矮星，占据太阳系总质量的 99.86%。核心每秒将约 6 亿吨氢聚变为氦，携带着八大行星以 220 km/s 的速度绕银心公转。'
  },
  {
    id: 'mercury',
    name: 'Mercury · 水星',
    enName: 'Mercury',
    symbol: '☿',
    orbitRadius: 0.22,
    eccentricity: 0.08,
    radius: 0.014,
    orbitSpeed: 1.65,
    inclination: 0.09,
    axialTilt: 0.01,
    baseAngle: 0.4,
    orbitColor: 0xb8b2a6,
    distanceAU: '0.39 AU (5,791万 km)',
    period: '87.97 Earth Days',
    spectral: 'Silicate Crust & Large Iron Core',
    mass: '0.055 M⊕ · Radius 2,439.7 km',
    description: '离太阳最近、质量最小的类地行星，表面布满类似月球的撞击坑（如卡洛里盆地），昼夜温差超过 600°C。'
  },
  {
    id: 'venus',
    name: 'Venus · 金星',
    enName: 'Venus',
    symbol: '♀',
    orbitRadius: 0.34,
    eccentricity: 0.01,
    radius: 0.024,
    orbitSpeed: 1.18,
    inclination: 0.05,
    axialTilt: 3.09,
    baseAngle: 2.1,
    orbitColor: 0xf4c97a,
    distanceAU: '0.72 AU (1.082亿 km)',
    period: '224.70 Earth Days',
    spectral: 'Dense CO₂ & H₂SO₄ Cloud Deck',
    mass: '0.815 M⊕ · Radius 6,051.8 km',
    description: '夜空中最亮的行星，被浓密的二氧化碳与硫酸云层包裹，强烈的温室效应使其表面温度高达 465°C，且自东向西逆向自转。'
  },
  {
    id: 'earth',
    name: 'Earth · 地球 (漫游起点)',
    enName: 'Earth & Moon',
    symbol: '🌍',
    orbitRadius: 0.48,
    eccentricity: 0.016,
    radius: 0.027,
    orbitSpeed: 0.85,
    inclination: 0.0,
    axialTilt: 0.41,
    baseAngle: 1.05,
    orbitColor: 0x38b6ff,
    distanceAU: '1.00 AU (1.496亿 km)',
    period: '365.256 Days (1.00 yr)',
    spectral: 'Nitrogen-Oxygen Atmosphere · Liquid H₂O',
    mass: '1.00 M⊕ · 1 Natural Satellite (Moon)',
    description: '我们在宇宙中的蓝色家园，位于太阳系宜居带内，拥有液态海洋、动态大气云层、地磁护盾以及相伴运行的月球（Moon）。从这里出发，可一路漫游跨越 10 万光年直达银河全景。'
  },
  {
    id: 'mars',
    name: 'Mars · 火星',
    enName: 'Mars',
    symbol: '♂',
    orbitRadius: 0.65,
    eccentricity: 0.06,
    radius: 0.019,
    orbitSpeed: 0.62,
    inclination: 0.03,
    axialTilt: 0.44,
    baseAngle: 3.8,
    orbitColor: 0xff6b4a,
    distanceAU: '1.52 AU (2.279亿 km)',
    period: '686.98 Earth Days (1.88 yr)',
    spectral: 'Iron Oxide Regolith · Polar Ice Caps',
    mass: '0.107 M⊕ · Radius 3,389.5 km',
    description: '富含氧化铁的红色类地行星，拥有太阳系最高的奥林匹斯山（Olympus Mons）与绵延 4,000 公里的水手号峡谷群，两极覆盖干冰与水冰冠。'
  },
  {
    id: 'jupiter',
    name: 'Jupiter · 木星',
    enName: 'Jupiter',
    symbol: '♃',
    orbitRadius: 1.08,
    eccentricity: 0.03,
    radius: 0.058,
    orbitSpeed: 0.34,
    inclination: 0.025,
    axialTilt: 0.05,
    baseAngle: 0.68,
    orbitColor: 0xf4a261,
    distanceAU: '5.20 AU (7.785亿 km)',
    period: '11.86 Earth Years',
    spectral: 'H₂/He Gas Giant · Ammonia Cloud Bands',
    mass: '317.8 M⊕ · 95 Known Moons',
    description: '太阳系体积与质量最大的气态巨行星，表面呈现棕白相间的氨气纬向云带与持续数百年的巨型反气旋风暴「大红斑（Great Red Spot）」，并由伽利略四卫星环绕。'
  },
  {
    id: 'saturn',
    name: 'Saturn · 土星',
    enName: 'Saturn',
    symbol: '♄',
    orbitRadius: 1.48,
    eccentricity: 0.04,
    radius: 0.048,
    orbitSpeed: 0.24,
    inclination: 0.045,
    axialTilt: 0.466,
    baseAngle: 2.55,
    orbitColor: 0xe9c46a,
    distanceAU: '9.58 AU (14.34亿 km)',
    period: '29.45 Earth Years',
    spectral: 'H₂/He Gas Giant · Icy Ring System',
    mass: '95.16 M⊕ · Prominent A/B/C Rings',
    description: '以壮丽冰质行星环系统闻名的气态巨行星，光环延伸逾 28 万公里且清晰可见卡西尼环缝（Cassini Division），平均密度低于水。'
  },
  {
    id: 'uranus',
    name: 'Uranus · 天王星',
    enName: 'Uranus',
    symbol: '♅',
    orbitRadius: 1.88,
    eccentricity: 0.03,
    radius: 0.034,
    orbitSpeed: 0.16,
    inclination: 0.015,
    axialTilt: 1.706, // 97.77 deg sideways tilt!
    baseAngle: 4.35,
    orbitColor: 0x72efdd,
    distanceAU: '19.20 AU (28.71亿 km)',
    period: '84.02 Earth Years',
    spectral: 'Methane Ice Giant · Cyan Atmosphere',
    mass: '14.54 M⊕ · 97.8° Axial Tilt',
    description: '太阳系第一颗冰巨星，高层大气中的甲烷吸收红光使其呈现清澈的青蓝色彩；自转轴倾角高达 97.77°，几乎「躺着」在轨道上滚动公转，并带有纤细的暗环。'
  },
  {
    id: 'neptune',
    name: 'Neptune · 海王星',
    enName: 'Neptune',
    symbol: '♆',
    orbitRadius: 2.28,
    eccentricity: 0.01,
    radius: 0.033,
    orbitSpeed: 0.11,
    inclination: 0.032,
    axialTilt: 0.49,
    baseAngle: 5.45,
    orbitColor: 0x4361ee,
    distanceAU: '30.05 AU (44.95亿 km)',
    period: '164.8 Earth Years',
    spectral: 'Supersonic Methane Winds · Ice Giant',
    mass: '17.15 M⊕ · Outer Major Planet',
    description: '距离太阳最远的行星（约 30 AU），深邃的蔚蓝大气中吹拂着太阳系最强的超音速风暴（风速可达 2,100 km/h），外侧紧邻广阔的柯伊伯带（Kuiper Belt）。'
  }
];

// Custom Boiling Solar Photosphere & Corona Shader
const SUN_VERTEX_SHADER = /* glsl */ `
varying vec3 vNormal;
varying vec3 vLocalPos;
void main() {
  vLocalPos = position;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const SUN_FRAGMENT_SHADER = /* glsl */ `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vLocalPos;

float hash(vec3 p) {
  return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
}

float noise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(
      mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
      mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x),
      f.y
    ),
    mix(
      mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
      mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x),
      f.y
    ),
    f.z
  );
}

void main() {
  vec3 p = normalize(vLocalPos) * 6.5;
  float n1 = noise(p + vec3(uTime * 0.45, -uTime * 0.35, uTime * 0.25));
  float n2 = noise(p * 2.4 - vec3(uTime * 0.7, uTime * 0.5, -uTime * 0.4));
  float gran = n1 * 0.6 + n2 * 0.4;

  // Limb darkening & fiery solar corona rim
  float viewDot = abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
  float limb = pow(viewDot, 0.45);

  vec3 darkSpot = vec3(0.88, 0.28, 0.04);
  vec3 midGold  = vec3(1.00, 0.68, 0.14);
  vec3 hotWhite = vec3(1.00, 0.97, 0.82);

  vec3 col = mix(darkSpot, midGold, smoothstep(0.22, 0.58, gran));
  col = mix(col, hotWhite, smoothstep(0.58, 0.88, gran) * limb);
  col += vec3(1.0, 0.45, 0.08) * (1.0 - viewDot) * 0.85;

  gl_FragColor = vec4(col, 1.0);
}
`;

// ============================================================================
// PHOTOREALISTIC NASA BLUE MARBLE EARTH & RAYLEIGH ATMOSPHERE SHADERS
// ============================================================================
const EARTH_VERTEX_SHADER = /* glsl */ `
varying vec2 vUv;
varying vec3 vWorldNormal;
varying vec3 vWorldPos;
varying vec3 vViewDir;

void main() {
  vUv = uv;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPos = worldPos.xyz;
  vWorldNormal = normalize(mat3(modelMatrix) * normal);
  vViewDir = normalize(cameraPosition - worldPos.xyz);
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

const EARTH_FRAGMENT_SHADER = /* glsl */ `
uniform sampler2D uDayMap;
uniform sampler2D uSpecMap;
uniform sampler2D uNormalMap;
uniform sampler2D uNightMap;
uniform sampler2D uCloudsMap;
uniform vec3 uSunWorldPos;
uniform float uCloudOffset;

varying vec2 vUv;
varying vec3 vWorldNormal;
varying vec3 vWorldPos;
varying vec3 vViewDir;

void main() {
  vec3 N = normalize(vWorldNormal);
  vec3 V = normalize(vViewDir);

  // Combine physical Sun direction with a subtle key-light bias toward the viewer
  // so ~75% of the visible hemisphere shows crisp sunlit continents & oceans,
  // while ~25% shows the golden sunset terminator and glowing night-side city lights!
  vec3 physicalSunDir = normalize(uSunWorldPos - vWorldPos);
  vec3 viewRight = normalize(cross(vec3(0.0, 1.0, 0.0), V) + vec3(0.001));
  vec3 keyLightDir = normalize(V * 0.62 + viewRight * 0.68 + vec3(0.0, 0.25, 0.0));
  vec3 L = normalize(mix(physicalSunDir, keyLightDir, 0.68));

  // Sample real 2K NASA Blue Marble maps
  vec3 dayTex = texture2D(uDayMap, vUv).rgb;
  float oceanMask = texture2D(uSpecMap, vUv).r;
  vec3 normSample = texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0;
  vec3 nightLights = texture2D(uNightMap, vUv).rgb;

  // Approximate tangent-space topographic normal perturbation for continental mountain ranges
  vec3 upVec = abs(N.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
  vec3 T = normalize(cross(upVec, N));
  vec3 B = cross(N, T);
  float reliefScale = mix(1.35, 0.15, oceanMask);
  vec3 bumpedN = normalize(N + (T * normSample.x + B * normSample.y) * 0.35 * reliefScale);

  // Enhance true-color ocean depth & natural continental biome contrast
  // Also replace the equirectangular top-edge white pinch over the Arctic Ocean (vUv.y > 0.89) with natural Arctic Ocean water
  float arcticCapArtifact = smoothstep(0.87, 0.95, vUv.y) * smoothstep(0.55, 0.85, dot(dayTex, vec3(0.333)));
  float effectiveOcean = max(oceanMask, arcticCapArtifact * 0.92);
  vec3 cleanedDayTex = mix(dayTex, vec3(0.04, 0.19, 0.38), arcticCapArtifact * 0.88);

  vec3 deepOcean = mix(cleanedDayTex * vec3(0.78, 0.96, 1.18), vec3(0.02, 0.16, 0.38), 0.34);
  vec3 richLand = pow(cleanedDayTex, vec3(0.92)) * vec3(1.08, 1.05, 0.95);
  vec3 baseAlbedo = mix(richLand, deepOcean, smoothstep(0.15, 0.65, effectiveOcean));

  // Subtle cloud shadow projected onto the continents and oceans below
  vec2 shadowUv = vec2(fract(vUv.x + uCloudOffset - 0.003), clamp(vUv.y - 0.002, 0.0, 1.0));
  float cloudShadow = texture2D(uCloudsMap, shadowUv).r;
  baseAlbedo *= (1.0 - cloudShadow * 0.28);

  // Diffuse illumination with topographic mountain relief
  float NdotL = dot(bumpedN, L);
  float smoothNdotL = dot(N, L);
  float dayFactor = smoothstep(-0.14, 0.22, smoothNdotL);
  float diffuse = max(0.0, NdotL) * 0.88 + 0.16;

  // Blinn-Phong solar specular reflection glinting across the Pacific/Atlantic/Indian Oceans
  vec3 H = normalize(L + V);
  float specBase = max(0.0, dot(bumpedN, H));
  float oceanGlint = pow(specBase, 38.0) * 0.72 + pow(specBase, 12.0) * 0.18;
  vec3 specCol = vec3(1.0, 0.95, 0.84) * oceanGlint * oceanMask * smoothstep(0.0, 0.25, smoothNdotL);

  // Warm amber-coral Rayleigh twilight glow along the day/night terminator
  float terminator = smoothstep(-0.22, 0.04, smoothNdotL) * (1.0 - smoothstep(0.02, 0.28, smoothNdotL));
  vec3 twilightGlow = vec3(0.96, 0.38, 0.12) * terminator * 0.38;

  // Night-side illumination: NASA Black Marble golden human city lights + faint moonlit continents
  float nightFactor = 1.0 - smoothstep(-0.18, 0.10, smoothNdotL);
  vec3 cityGlow = pow(nightLights, vec3(1.25)) * vec3(1.0, 0.76, 0.36) * 1.45 * (1.0 - oceanMask * 0.85);
  vec3 nightAmbient = baseAlbedo * vec3(0.06, 0.10, 0.18) + cityGlow;

  // Rayleigh blue atmospheric scattering along the grazing horizon limb
  float fresnel = pow(clamp(1.0 - max(0.0, dot(N, V)), 0.0, 1.0), 2.8);
  vec3 atmoRim = vec3(0.24, 0.68, 1.0) * fresnel * (0.35 + 0.65 * dayFactor);

  vec3 dayLitColor = baseAlbedo * diffuse + specCol + twilightGlow;
  vec3 finalColor = mix(nightAmbient, dayLitColor, dayFactor) + atmoRim;

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

const EARTH_ATMO_FRAGMENT_SHADER = /* glsl */ `
uniform vec3 uSunWorldPos;
varying vec3 vWorldNormal;
varying vec3 vWorldPos;
varying vec3 vViewDir;

void main() {
  vec3 N = normalize(vWorldNormal);
  vec3 V = normalize(vViewDir);
  vec3 L = normalize(uSunWorldPos - vWorldPos);

  float viewDot = abs(dot(N, V));
  float rim = pow(clamp(1.0 - viewDot, 0.0, 1.0), 2.6);
  float sunSide = smoothstep(-0.45, 0.35, dot(N, L)) * 0.65 + 0.35;

  vec3 skyBlue = mix(vec3(0.12, 0.52, 0.98), vec3(0.48, 0.86, 1.0), rim);
  gl_FragColor = vec4(skyBlue, rim * sunSide * 0.68);
}
`;

// Generates high-resolution procedural planetary equirectangular textures on Canvas
function createPlanetTexture(planetId) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  let seed = planetId.charCodeAt(0) * 997 + planetId.length * 131;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  if (planetId === 'earth') {
    // Deep blue ocean base
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, 256);
    oceanGrad.addColorStop(0.0, '#dceefb');
    oceanGrad.addColorStop(0.12, '#0b3c68');
    oceanGrad.addColorStop(0.5, '#072c54');
    oceanGrad.addColorStop(0.88, '#0b3c68');
    oceanGrad.addColorStop(1.0, '#eaf4fc');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, 512, 256);

    // Sculpted continents (Eurasia, Americas, Africa, Australia silhouettes + green/ochre terrain)
    const continents = [
      { x: 120, y: 88, rx: 52, ry: 34, c1: '#2d6a4f', c2: '#74c69d' },
      { x: 155, y: 162, rx: 32, ry: 46, c1: '#1b4332', c2: '#52b788' },
      { x: 275, y: 118, rx: 46, ry: 48, c1: '#b08968', c2: '#40916c' },
      { x: 355, y: 78, rx: 78, ry: 42, c1: '#2d6a4f', c2: '#95d5b2' },
      { x: 425, y: 178, rx: 28, ry: 20, c1: '#bc6c25', c2: '#dda15e' }
    ];
    continents.forEach(ct => {
      for (let p = 0; p < 36; p++) {
        const px = ct.x + (rand() - 0.5) * ct.rx * 1.4;
        const py = ct.y + (rand() - 0.5) * ct.ry * 1.4;
        const prx = 8 + rand() * (ct.rx * 0.55);
        const pry = 6 + rand() * (ct.ry * 0.55);
        ctx.fillStyle = rand() < 0.65 ? ct.c1 : ct.c2;
        ctx.globalAlpha = 0.78;
        ctx.beginPath();
        ctx.ellipse(px, py, prx, pry, (rand() - 0.5) * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Polar ice caps
    ctx.globalAlpha = 0.92;
    ctx.fillStyle = '#f4f9ff';
    ctx.fillRect(0, 0, 512, 16);
    ctx.fillRect(0, 240, 512, 16);

    // Swirling white atmospheric clouds
    ctx.fillStyle = '#ffffff';
    for (let c = 0; c < 140; c++) {
      ctx.globalAlpha = 0.16 + rand() * 0.28;
      ctx.beginPath();
      ctx.ellipse(rand() * 512, 20 + rand() * 216, 14 + rand() * 38, 2 + rand() * 6, (rand() - 0.5) * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (planetId === 'jupiter') {
    const bands = ['#c99065', '#e6ccb2', '#b07148', '#ddb892', '#9c5a3c', '#e3c5a8', '#c68b59', '#d8b48e'];
    for (let y = 0; y < 256; y++) {
      const bIdx = Math.floor((y / 256) * bands.length * 2.2) % bands.length;
      ctx.fillStyle = bands[bIdx];
      ctx.fillRect(0, y, 512, 2);
    }
    // Wavy atmospheric eddies
    for (let i = 0; i < 180; i++) {
      ctx.globalAlpha = 0.25 + rand() * 0.35;
      ctx.fillStyle = bands[Math.floor(rand() * bands.length)];
      ctx.beginPath();
      ctx.ellipse(rand() * 512, rand() * 256, 18 + rand() * 45, 2 + rand() * 5, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    // The Great Red Spot
    ctx.globalAlpha = 0.92;
    ctx.fillStyle = '#c84b31';
    ctx.beginPath();
    ctx.ellipse(290, 165, 34, 18, 0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#f4d3b8';
    ctx.lineWidth = 3;
    ctx.stroke();
  } else if (planetId === 'saturn') {
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0.0, '#b59c6b');
    grad.addColorStop(0.25, '#e8cfa0');
    grad.addColorStop(0.5, '#f5deb3');
    grad.addColorStop(0.75, '#d4b483');
    grad.addColorStop(1.0, '#a68d5f');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);
    for (let y = 0; y < 256; y += 4) {
      ctx.fillStyle = (y % 8 === 0) ? 'rgba(255,245,215,0.18)' : 'rgba(140,105,60,0.15)';
      ctx.fillRect(0, y, 512, 2);
    }
  } else if (planetId === 'mars') {
    // Rusty iron-oxide base gradient from polar regions to equatorial desert
    const mGrad = ctx.createLinearGradient(0, 0, 0, 256);
    mGrad.addColorStop(0.0, '#d88b68');
    mGrad.addColorStop(0.22, '#c85220');
    mGrad.addColorStop(0.50, '#b53f12');
    mGrad.addColorStop(0.78, '#9e3610');
    mGrad.addColorStop(1.0, '#d88b68');
    ctx.fillStyle = mGrad;
    ctx.fillRect(0, 0, 512, 256);

    // Dark basaltic albedo features (Syrtis Major, Acidalia Planitia, Mare Erythraeum)
    for (let i = 0; i < 240; i++) {
      ctx.globalAlpha = 0.22 + rand() * 0.36;
      ctx.fillStyle = rand() < 0.48 ? '#ef8354' : '#581f0e';
      ctx.beginPath();
      ctx.ellipse(rand() * 512, 20 + rand() * 216, 8 + rand() * 38, 4 + rand() * 18, rand() * 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Valles Marineris (Great equatorial canyon system, 4,000 km long)
    ctx.globalAlpha = 0.85;
    ctx.strokeStyle = '#3d1308';
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.moveTo(185, 134);
    ctx.bezierCurveTo(220, 129, 265, 138, 305, 132);
    ctx.stroke();

    // Olympus Mons & Tharsis Montes volcanic calderas
    for (const [vx, vy, vr] of [[125, 102, 14], [148, 118, 9], [156, 130, 9], [164, 142, 9]]) {
      ctx.globalAlpha = 0.75;
      ctx.fillStyle = '#7f2b12';
      ctx.beginPath();
      ctx.arc(vx, vy, vr, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#f4a261';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // North & South H2O / CO2 Polar Ice Caps
    ctx.globalAlpha = 0.94;
    ctx.fillStyle = '#fff8f0';
    ctx.fillRect(0, 0, 512, 13);
    ctx.fillRect(0, 243, 512, 13);
  } else if (planetId === 'venus') {
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#d9a05b');
    grad.addColorStop(0.5, '#f3d088');
    grad.addColorStop(1, '#c98d48');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);
    for (let i = 0; i < 160; i++) {
      ctx.globalAlpha = 0.22;
      ctx.fillStyle = rand() < 0.5 ? '#fff1c5' : '#b57835';
      ctx.beginPath();
      ctx.ellipse(rand() * 512, rand() * 256, 25 + rand() * 50, 4 + rand() * 9, 0.1, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (planetId === 'uranus' || planetId === 'neptune') {
    const isUranus = planetId === 'uranus';
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, isUranus ? '#56cfe1' : '#1d3557');
    grad.addColorStop(0.5, isUranus ? '#90e0ef' : '#2ec4b6');
    grad.addColorStop(1, isUranus ? '#48bfe3' : '#184e77');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);
    for (let i = 0; i < 90; i++) {
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = '#e0fbfc';
      ctx.fillRect(0, rand() * 256, 512, 2 + rand() * 4);
    }
  } else {
    // Mercury / Moon cratered regolith
    ctx.fillStyle = '#8d8882';
    ctx.fillRect(0, 0, 512, 256);
    for (let i = 0; i < 240; i++) {
      const r = 3 + rand() * 16;
      const x = rand() * 512;
      const y = rand() * 256;
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = rand() < 0.5 ? '#5e5a55' : '#b8b2aa';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

// Radial Saturn Ring Texture with Cassini Division
function createSaturnRingTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  for (let x = 0; x < 256; x++) {
    const u = x / 255; // 0 = inner, 1 = outer
    // Cassini Division gap around u = 0.64..0.71
    let alpha = 0.85;
    if (u < 0.15) alpha = u / 0.15 * 0.35;
    else if (u > 0.63 && u < 0.70) alpha = 0.08;
    else if (u > 0.92) alpha = (1.0 - u) / 0.08 * 0.6;
    else alpha = 0.55 + 0.3 * Math.sin(u * 65.0);

    const tone = Math.floor(205 + 38 * Math.cos(u * 42.0));
    ctx.fillStyle = `rgba(${tone}, ${Math.floor(tone * 0.89)}, ${Math.floor(tone * 0.68)}, ${alpha.toFixed(3)})`;
    ctx.fillRect(x, 0, 1, 64);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function createRadialCoronaTexture(c0, c1) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 62);
  g.addColorStop(0.0, c0);
  g.addColorStop(0.35, c1);
  g.addColorStop(1.0, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

export function buildDetailedSolarSystem(rootGroup, interactiveMeshes) {
  const solSystemGroup = new THREE.Group();
  solSystemGroup.name = 'DetailedSolarSystem';
  solSystemGroup.position.copy(SOL_CENTER);
  rootGroup.add(solSystemGroup);

  // ==========================================================================
  // ASTROPHYSICAL GEOMETRY:
  // 1. Galactic Plane (b = 0°) is the horizontal XZ plane; Sun's Galactic Orbit
  //    velocity vector v_sun ≈ 220 km/s (towards Cygnus, l = 90°) points along +X.
  // 2. Ecliptic Plane (黄道面) is tilted by 60.19° relative to the Galactic Plane!
  //    Planets orbit COPLANAR with the Sun inside this 60.2°-tilted Ecliptic Plane
  //    (alternating physically AHEAD of the Sun and BEHIND the Sun), while their
  //    3D Galactocentric worldlines trace 8 nested tilted helices around the Sun's path.
  // ==========================================================================
  const galacticRefGroup = new THREE.Group();
  galacticRefGroup.name = 'GalacticReferenceFrame';
  solSystemGroup.add(galacticRefGroup);

  const eclipticGroup = new THREE.Group();
  eclipticGroup.name = 'TiltedEclipticPlane_60_2_deg';
  eclipticGroup.rotation.order = 'YXZ';
  eclipticGroup.rotation.y = ECLIPTIC_NODE_YAW;
  eclipticGroup.rotation.z = -ECLIPTIC_GALACTIC_TILT;
  solSystemGroup.add(eclipticGroup);
  eclipticGroup.updateMatrix();

  // Local Sunlight illuminating all 8 planets with day/night terminators
  const solarPointLight = new THREE.PointLight(0xfff4d8, 2.8, 12.0, 0.35);
  solSystemGroup.add(solarPointLight);
  const solarAmbient = new THREE.AmbientLight(0x3a4c6e, 0.95);
  solSystemGroup.add(solarAmbient);

  // 0. GALACTIC VS. ECLIPTIC 60.2° REFERENCE PLANES & SUN VELOCITY VECTOR (v☉ = 220 km/s)
  const refRadius = 2.38;
  const ringSegs = 128;
  const galPlanePts = [];
  const eclPlanePts = [];
  for (let s = 0; s <= ringSegs; s++) {
    const a = (s / ringSegs) * Math.PI * 2;
    galPlanePts.push(new THREE.Vector3(Math.cos(a) * refRadius, 0, Math.sin(a) * refRadius));
    eclPlanePts.push(new THREE.Vector3(Math.cos(a) * refRadius, 0, Math.sin(a) * refRadius));
  }
  // Galactic Plane Reference Ring (Horizontal XZ, b = 0°)
  galacticRefGroup.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(galPlanePts),
    new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.28, depthWrite: false })
  ));
  // Ecliptic Plane Reference Ring (Tilted 60.2°)
  eclipticGroup.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(eclPlanePts),
    new THREE.LineBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.32, depthWrite: false })
  ));

  // 60.2° Dihedral Inclination Arc between Galactic Plane (+X) and Ecliptic Plane
  const arcPts = [];
  const arcR = 1.15;
  for (let s = 0; s <= 32; s++) {
    const ang = (s / 32) * ECLIPTIC_GALACTIC_TILT;
    arcPts.push(new THREE.Vector3(Math.cos(ang) * arcR, -Math.sin(ang) * arcR, 0));
  }
  galacticRefGroup.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(arcPts),
    new THREE.LineBasicMaterial({ color: 0xffbe0b, transparent: true, opacity: 0.72, depthWrite: false })
  ));
  // Opposite upper 60.2° inclination arc (-X side climbing to +Y)
  const arcPtsUpper = [];
  for (let s = 0; s <= 32; s++) {
    const ang = (s / 32) * ECLIPTIC_GALACTIC_TILT;
    arcPtsUpper.push(new THREE.Vector3(-Math.cos(ang) * arcR, Math.sin(ang) * arcR, 0));
  }
  galacticRefGroup.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(arcPtsUpper),
    new THREE.LineBasicMaterial({ color: 0xffbe0b, transparent: true, opacity: 0.72, depthWrite: false })
  ));

  // Sun's Galactic Orbit Velocity Axis & Forward Arrow (v☉ = 220 km/s along +X)
  const sunVelArrowLen = 2.45;
  const sunAxisPts = [
    new THREE.Vector3(-5.2, 0, 0),
    new THREE.Vector3(sunVelArrowLen, 0, 0)
  ];
  galacticRefGroup.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(sunAxisPts),
    new THREE.LineBasicMaterial({ color: 0xffbe0b, transparent: true, opacity: 0.65, depthWrite: false })
  ));
  const arrowCone = new THREE.Mesh(
    new THREE.ConeGeometry(0.048, 0.16, 20),
    new THREE.MeshBasicMaterial({ color: 0xffbe0b })
  );
  arrowCone.position.set(sunVelArrowLen, 0, 0);
  arrowCone.rotation.z = -Math.PI / 2;
  galacticRefGroup.add(arrowCone);

  // Sun's Dynamic Galactic Worldline (with subtle vertical Z-oscillation across the Galactic disk)
  const sunWakeSegs = 120;
  const sunWakePos = new Float32Array((sunWakeSegs + 1) * 3);
  const sunWakeCol = new Float32Array((sunWakeSegs + 1) * 3);
  for (let s = 0; s <= sunWakeSegs; s++) {
    const fade = Math.pow(1.0 - s / sunWakeSegs, 1.3);
    sunWakeCol[s * 3 + 0] = 1.0 * fade;
    sunWakeCol[s * 3 + 1] = 0.78 * fade;
    sunWakeCol[s * 3 + 2] = 0.18 * fade;
  }
  const sunWakeGeo = new THREE.BufferGeometry();
  sunWakeGeo.setAttribute('position', new THREE.BufferAttribute(sunWakePos, 3));
  sunWakeGeo.setAttribute('color', new THREE.BufferAttribute(sunWakeCol, 3));
  const sunWakeLine = new THREE.Line(
    sunWakeGeo,
    new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  galacticRefGroup.add(sunWakeLine);

  // 1. THE SUN (Boiling Photosphere Shader + Multi-layer Corona)
  const sunUniforms = { uTime: { value: 0 } };
  const sunMat = new THREE.ShaderMaterial({
    vertexShader: SUN_VERTEX_SHADER,
    fragmentShader: SUN_FRAGMENT_SHADER,
    uniforms: sunUniforms
  });
  const sunData = SOLAR_BODIES[0];
  const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(sunData.radius, 40, 40), sunMat);
  sunMesh.userData = { landmarkId: 'sol', solarBodyId: 'sun' };
  eclipticGroup.add(sunMesh);
  interactiveMeshes.push(sunMesh);

  const sunCorona = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: createRadialCoronaTexture('rgba(255,248,200,1)', 'rgba(255,165,45,0.48)'),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  );
  sunCorona.scale.set(0.85, 0.85, 1);
  eclipticGroup.add(sunCorona);

  // 2. EIGHT MAJOR PLANETS:
  //    (A) Instantaneous Coplanar Keplerian Orbits inside the 60.2°-tilted Ecliptic Plane
  //    (B) 3D Galactocentric Helical Worldlines (8 nested corkscrew trajectories in Galactic space)
  const planetRuntime = new Map();
  planetRuntime.set('sun', {
    data: sunData,
    mesh: sunMesh,
    worldPos: SOL_CENTER.clone(),
    viewDistance: 0.42
  });

  const saturnRingTex = createSaturnRingTexture();

  // Load real 2K NASA Blue Marble Earth & LRO Moon satellite maps
  const texLoader = new THREE.TextureLoader();
  const earthDayTex = texLoader.load('./textures/earth_atmos_2048.jpg');
  const earthSpecTex = texLoader.load('./textures/earth_specular_2048.jpg');
  const earthNormalTex = texLoader.load('./textures/earth_normal_2048.jpg');
  const earthNightTex = texLoader.load('./textures/earth_lights_2048.png');
  const earthCloudsTex = texLoader.load('./textures/earth_clouds_1024.png');
  earthCloudsTex.wrapS = THREE.RepeatWrapping;
  earthCloudsTex.wrapT = THREE.ClampToEdgeWrapping;
  const moonRealTex = texLoader.load('./textures/moon_1024.jpg');

  const earthUniforms = {
    uDayMap: { value: earthDayTex },
    uSpecMap: { value: earthSpecTex },
    uNormalMap: { value: earthNormalTex },
    uNightMap: { value: earthNightTex },
    uCloudsMap: { value: earthCloudsTex },
    uSunWorldPos: { value: SOL_CENTER.clone() },
    uCloudOffset: { value: 0.0 }
  };

  for (let i = 1; i < SOLAR_BODIES.length; i++) {
    const body = SOLAR_BODIES[i];
    const a = body.orbitRadius;
    const e = body.eccentricity || 0.01;
    const b = a * Math.sqrt(1 - e * e);
    const focusShift = a * e * 0.45; // Subtle focus offset for visual realism

    const orbitPlane = new THREE.Group();
    orbitPlane.rotation.z = body.inclination;
    orbitPlane.rotation.x = (i % 2 === 0 ? 1 : -1) * body.inclination * 0.6;
    eclipticGroup.add(orbitPlane);
    orbitPlane.updateMatrix();

    // (A) Full 360-degree Instantaneous Keplerian Ellipse inside the 60.2° Ecliptic Plane
    const orbitPts = [];
    const segs = 160;
    for (let s = 0; s <= segs; s++) {
      const ang = (s / segs) * Math.PI * 2;
      orbitPts.push(new THREE.Vector3(Math.cos(ang) * a - focusShift, 0, Math.sin(ang) * b));
    }
    const fullOrbitLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(orbitPts),
      new THREE.LineBasicMaterial({
        color: body.orbitColor,
        transparent: true,
        opacity: body.id === 'earth' ? 0.52 : 0.30,
        depthWrite: false
      })
    );
    orbitPlane.add(fullOrbitLine);

    // Highlighted Coplanar Leading Arc inside the Ecliptic Plane
    const trailSegs = 48;
    const trailPositions = new Float32Array((trailSegs + 1) * 3);
    const trailColors = new Float32Array((trailSegs + 1) * 3);
    const baseCol = new THREE.Color(body.orbitColor);
    for (let s = 0; s <= trailSegs; s++) {
      const intensity = Math.pow(s / trailSegs, 1.8);
      trailColors[s * 3 + 0] = baseCol.r * intensity;
      trailColors[s * 3 + 1] = baseCol.g * intensity;
      trailColors[s * 3 + 2] = baseCol.b * intensity;
    }
    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
    trailGeo.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));
    const trailLine = new THREE.Line(
      trailGeo,
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.78,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    orbitPlane.add(trailLine);

    // (B) 3D Galactocentric Helical Trajectory (Worldline in Milky Way Space as Sun moves at 220 km/s)
    const helixSegs = 180;
    const helixPositions = new Float32Array((helixSegs + 1) * 3);
    const helixColors = new Float32Array((helixSegs + 1) * 3);
    for (let s = 0; s <= helixSegs; s++) {
      // s = 0 is the planet's current position; s = helixSegs is the far Galactic wake
      const fade = Math.pow(1.0 - s / helixSegs, 1.35);
      helixColors[s * 3 + 0] = baseCol.r * fade;
      helixColors[s * 3 + 1] = baseCol.g * fade;
      helixColors[s * 3 + 2] = baseCol.b * fade;
    }
    const helixGeo = new THREE.BufferGeometry();
    helixGeo.setAttribute('position', new THREE.BufferAttribute(helixPositions, 3));
    helixGeo.setAttribute('color', new THREE.BufferAttribute(helixColors, 3));
    const helixLine = new THREE.Line(
      helixGeo,
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.92,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    galacticRefGroup.add(helixLine);

    // Planet Pivot & Surface Mesh
    const planetHolder = new THREE.Group();
    orbitPlane.add(planetHolder);

    let planetMat;
    if (body.id === 'earth') {
      planetMat = new THREE.ShaderMaterial({
        vertexShader: EARTH_VERTEX_SHADER,
        fragmentShader: EARTH_FRAGMENT_SHADER,
        uniforms: earthUniforms
      });
    } else {
      const tex = createPlanetTexture(body.id);
      planetMat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.72,
        metalness: 0.05,
        emissive: new THREE.Color(body.orbitColor),
        emissiveIntensity: 0.14
      });
    }

    const sphereSegs = body.id === 'earth' ? 64 : 32;
    const planetMesh = new THREE.Mesh(
      new THREE.SphereGeometry(body.radius, sphereSegs, sphereSegs),
      planetMat
    );
    if (body.id === 'earth') {
      planetHolder.rotation.z = ECLIPTIC_GALACTIC_TILT - 0.32;
      planetHolder.rotation.x = -0.38;
      planetMesh.rotation.z = 0.18;
    } else {
      planetHolder.rotation.z = ECLIPTIC_GALACTIC_TILT - 0.35;
      planetHolder.rotation.x = -0.25;
      planetMesh.rotation.z = body.axialTilt;
    }
    planetMesh.userData = { landmarkId: 'sol', solarBodyId: body.id };
    planetHolder.add(planetMesh);
    interactiveMeshes.push(planetMesh);

    // Special planetary features:
    let moonPivot = null;
    let cloudMesh = null;
    if (body.id === 'earth') {
      // Dynamic 3D Global Meteorological Cloud Layer (NASA satellite cloud deck)
      cloudMesh = new THREE.Mesh(
        new THREE.SphereGeometry(body.radius * 1.014, 64, 64),
        new THREE.MeshLambertMaterial({
          map: earthCloudsTex,
          transparent: true,
          opacity: 0.82,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        })
      );
      planetMesh.add(cloudMesh);

      // Fresnel Rayleigh blue atmospheric scattering limb around Earth
      const atmoMesh = new THREE.Mesh(
        new THREE.SphereGeometry(body.radius * 1.085, 48, 48),
        new THREE.ShaderMaterial({
          vertexShader: EARTH_VERTEX_SHADER,
          fragmentShader: EARTH_ATMO_FRAGMENT_SHADER,
          uniforms: { uSunWorldPos: earthUniforms.uSunWorldPos },
          transparent: true,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        })
      );
      planetHolder.add(atmoMesh);

      // The Moon (Luna) + lunar orbit ring around Earth!
      const moonOrbitR = body.radius * 2.55;
      const moonOrbitPts = [];
      for (let m = 0; m <= 64; m++) {
        const ma = (m / 64) * Math.PI * 2;
        moonOrbitPts.push(new THREE.Vector3(Math.cos(ma) * moonOrbitR, 0, Math.sin(ma) * moonOrbitR));
      }
      planetHolder.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(moonOrbitPts),
        new THREE.LineBasicMaterial({ color: 0xd8e2dc, transparent: true, opacity: 0.42 })
      ));

      moonPivot = new THREE.Group();
      moonPivot.rotation.z = 0.09;
      const moonMesh = new THREE.Mesh(
        new THREE.SphereGeometry(body.radius * 0.28, 32, 32),
        new THREE.MeshStandardMaterial({
          map: moonRealTex,
          bumpMap: moonRealTex,
          bumpScale: 0.0018,
          roughness: 0.86,
          emissive: 0x22252a,
          emissiveIntensity: 0.20
        })
      );
      moonMesh.position.set(moonOrbitR, 0, 0);
      moonPivot.add(moonMesh);
      planetHolder.add(moonPivot);
    } else if (body.id === 'saturn') {
      // Saturn's iconic multi-band ring system with Cassini Division
      const ringGeo = new THREE.RingGeometry(body.radius * 1.38, body.radius * 2.55, 72);
      const pos = ringGeo.attributes.position;
      const uv = ringGeo.attributes.uv;
      for (let k = 0; k < pos.count; k++) {
        const vx = pos.getX(k);
        const vy = pos.getY(k);
        const r = Math.sqrt(vx * vx + vy * vy);
        const u = (r - body.radius * 1.38) / (body.radius * (2.55 - 1.38));
        uv.setXY(k, u, 0.5);
      }
      ringGeo.rotateX(Math.PI / 2);
      const ringMesh = new THREE.Mesh(
        ringGeo,
        new THREE.MeshBasicMaterial({
          map: saturnRingTex,
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: false
        })
      );
      ringMesh.rotation.z = body.axialTilt;
      planetHolder.add(ringMesh);
    } else if (body.id === 'uranus') {
      // Uranus's vertical pale-cyan ice ring
      const uRingGeo = new THREE.RingGeometry(body.radius * 1.45, body.radius * 1.72, 64);
      uRingGeo.rotateY(Math.PI / 2);
      const uRing = new THREE.Mesh(
        uRingGeo,
        new THREE.MeshBasicMaterial({
          color: 0x90e0ef,
          transparent: true,
          opacity: 0.35,
          side: THREE.DoubleSide,
          depthWrite: false
        })
      );
      planetHolder.add(uRing);
    } else if (body.id === 'mars') {
      // Dusty salmon-amber Martian atmosphere halo + Phobos (火卫一) & Deimos (火卫二)
      const marsAtmo = new THREE.Mesh(
        new THREE.SphereGeometry(body.radius * 1.09, 28, 28),
        new THREE.MeshBasicMaterial({
          color: 0xf4845f,
          transparent: true,
          opacity: 0.18,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        })
      );
      planetHolder.add(marsAtmo);

      moonPivot = new THREE.Group();
      moonPivot.rotation.z = 0.12;
      const marsMoons = [
        { r: body.radius * 1.85, size: body.radius * 0.15, color: 0xb8a99a, ang: 0.6 }, // Phobos
        { r: body.radius * 2.65, size: body.radius * 0.11, color: 0x9c8e80, ang: 2.4 }  // Deimos
      ];
      marsMoons.forEach(mm => {
        const pts = [];
        for (let m = 0; m <= 48; m++) {
          const ma = (m / 48) * Math.PI * 2;
          pts.push(new THREE.Vector3(Math.cos(ma) * mm.r, 0, Math.sin(ma) * mm.r));
        }
        planetHolder.add(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({ color: mm.color, transparent: true, opacity: 0.35 })
        ));
        const mMesh = new THREE.Mesh(
          new THREE.DodecahedronGeometry(mm.size, 1),
          new THREE.MeshStandardMaterial({ color: mm.color, roughness: 0.9, emissive: mm.color, emissiveIntensity: 0.18 })
        );
        mMesh.position.set(Math.cos(mm.ang) * mm.r, 0, Math.sin(mm.ang) * mm.r);
        moonPivot.add(mMesh);
      });
      planetHolder.add(moonPivot);
    } else if (body.id === 'jupiter') {
      // 4 Galilean Moons (Io 木卫一, Europa 木卫二, Ganymede 木卫三, Callisto 木卫四) + concentric orbital rings
      moonPivot = new THREE.Group();
      moonPivot.rotation.z = 0.06;
      const galileanMoons = [
        { r: body.radius * 1.48, size: body.radius * 0.085, color: 0xffbe0b, ang: 0.4 }, // Io (Volcanic sulfur)
        { r: body.radius * 1.82, size: body.radius * 0.078, color: 0xdff6ff, ang: 1.9 }, // Europa (Subsurface ocean ice)
        { r: body.radius * 2.22, size: body.radius * 0.110, color: 0xc8b8a6, ang: 3.5 }, // Ganymede (Largest moon)
        { r: body.radius * 2.68, size: body.radius * 0.098, color: 0x8d7b68, ang: 5.1 }  // Callisto
      ];
      galileanMoons.forEach(gm => {
        const jMoonPts = [];
        for (let m = 0; m <= 64; m++) {
          const ma = (m / 64) * Math.PI * 2;
          jMoonPts.push(new THREE.Vector3(Math.cos(ma) * gm.r, 0, Math.sin(ma) * gm.r));
        }
        planetHolder.add(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(jMoonPts),
          new THREE.LineBasicMaterial({ color: gm.color, transparent: true, opacity: 0.32 })
        ));
        const gmMesh = new THREE.Mesh(
          new THREE.SphereGeometry(gm.size, 16, 16),
          new THREE.MeshStandardMaterial({ color: gm.color, roughness: 0.7, emissive: gm.color, emissiveIntensity: 0.25 })
        );
        gmMesh.position.set(Math.cos(gm.ang) * gm.r, 0, Math.sin(gm.ang) * gm.r);
        moonPivot.add(gmMesh);
      });
      planetHolder.add(moonPivot);
    }

    // Combined transform from planet's local orbital plane into the Galactic Reference Frame
    const localToGalacticMatrix = new THREE.Matrix4().multiplyMatrices(eclipticGroup.matrix, orbitPlane.matrix);

    planetRuntime.set(body.id, {
      data: body,
      orbitPlane,
      planetHolder,
      planetMesh,
      cloudMesh,
      moonPivot,
      trailGeo,
      helixGeo,
      fullOrbitLine,
      trailLine,
      helixLine,
      localToGalacticMatrix,
      a,
      b,
      focusShift,
      currentAngle: body.baseAngle,
      worldPos: new THREE.Vector3(),
      viewDistance: Math.max(0.085, body.radius * 4.2)
    });
  }

  // 3. MAIN ASTEROID BELT & KUIPER BELT (Coplanar with the 60.2°-tilted Ecliptic Plane)
  function createBeltPoints(count, rMin, rMax, ySpread, colorHex, opacity) {
    let seed = Math.round(rMin * 1000);
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const pts = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = rMin + rand() * (rMax - rMin);
      const a = rand() * Math.PI * 2;
      const y = (rand() - 0.5) * ySpread;
      pts[i * 3 + 0] = Math.cos(a) * r;
      pts[i * 3 + 1] = y;
      pts[i * 3 + 2] = Math.sin(a) * r;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
    return new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        color: colorHex,
        size: 1.6,
        sizeAttenuation: false,
        transparent: true,
        opacity,
        depthWrite: false
      })
    );
  }

  const asteroidBelt = createBeltPoints(1600, 0.78, 0.94, 0.04, 0xc8b89e, 0.55);
  eclipticGroup.add(asteroidBelt);

  const kuiperBelt = createBeltPoints(2200, 2.42, 2.88, 0.09, 0x72efdd, 0.35);
  eclipticGroup.add(kuiperBelt);

  // 4. STREAMING INTERSTELLAR MEDIUM (ISM) DUST MARKERS
  // Makes the Sun's 220 km/s forward Galactic motion (+X) visually tangible in the co-moving frame
  const ismCount = 320;
  const ismBaseCoords = new Float32Array(ismCount * 3);
  const ismPositions = new Float32Array(ismCount * 3);
  let ismSeed = 90210;
  const ismRand = () => {
    ismSeed = (ismSeed * 16807) % 2147483647;
    return (ismSeed - 1) / 2147483646;
  };
  for (let i = 0; i < ismCount; i++) {
    ismBaseCoords[i * 3 + 0] = (ismRand() - 0.6) * 8.0; // X along Galactic motion axis
    ismBaseCoords[i * 3 + 1] = (ismRand() - 0.5) * 4.5; // Y Galactic latitude
    ismBaseCoords[i * 3 + 2] = (ismRand() - 0.5) * 4.5; // Z Galactic radial
  }
  const ismGeo = new THREE.BufferGeometry();
  ismGeo.setAttribute('position', new THREE.BufferAttribute(ismPositions, 3));
  const ismPoints = new THREE.Points(
    ismGeo,
    new THREE.PointsMaterial({
      color: 0x90e0ef,
      size: 1.5,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0.35,
      depthWrite: false
    })
  );
  galacticRefGroup.add(ismPoints);

  const tempPastVec = new THREE.Vector3();
  const maxLookbackTau = 11.5; // Lookback span for the 3D Galactocentric helical wake
  const galacticForwardSpeed = 0.42; // Visual propagation speed along Galactic Orbit (+X)
  const zOscAmp = 0.14; // Vertical Z-oscillation amplitude across the Galactic plane
  const zOscFreq = 0.55;

  function updatePositions(time, orbitTimeScale = 1.0) {
    sunUniforms.uTime.value = time;
    sunMesh.rotation.y = time * 0.25;
    asteroidBelt.rotation.y = -time * 0.05 * orbitTimeScale;
    kuiperBelt.rotation.y = -time * 0.018 * orbitTimeScale;

    // Update streaming ISM dust markers flowing past the Solar System along -X
    const ismAttr = ismGeo.attributes.position;
    const flowOffset = (time * galacticForwardSpeed * orbitTimeScale) % 8.0;
    for (let i = 0; i < ismCount; i++) {
      let x = ismBaseCoords[i * 3 + 0] - flowOffset;
      if (x < -5.2) x += 8.0;
      ismAttr.setXYZ(i, x, ismBaseCoords[i * 3 + 1], ismBaseCoords[i * 3 + 2]);
    }
    ismAttr.needsUpdate = true;

    // Update Sun's central Galactic worldline (with subtle vertical Z-oscillation)
    const sunWakeAttr = sunWakeGeo.attributes.position;
    const currentSunZWave = Math.sin(time * zOscFreq) * zOscAmp;
    for (let s = 0; s <= sunWakeSegs; s++) {
      const tau = (s / sunWakeSegs) * maxLookbackTau;
      const dx = -galacticForwardSpeed * tau;
      const dy = Math.sin((time - tau) * zOscFreq) * zOscAmp - currentSunZWave;
      sunWakeAttr.setXYZ(s, dx, dy, 0);
    }
    sunWakeAttr.needsUpdate = true;

    // Ensure world matrices are fresh before computing world positions
    solSystemGroup.updateMatrixWorld(true);

    for (const [id, rt] of planetRuntime.entries()) {
      if (id === 'sun') {
        sunMesh.getWorldPosition(rt.worldPos);
        continue;
      }
      const {
        data,
        planetHolder,
        planetMesh,
        cloudMesh,
        moonPivot,
        trailGeo,
        helixGeo,
        localToGalacticMatrix,
        a,
        b,
        focusShift
      } = rt;
      const angularVel = data.orbitSpeed * 0.32 * orbitTimeScale;
      const theta = data.baseAngle - time * angularVel;
      rt.currentAngle = theta;

      const lx = Math.cos(theta) * a - focusShift;
      const lz = Math.sin(theta) * b;
      planetHolder.position.set(lx, 0, lz);

      if (id === 'earth') {
        // Orient Earth so Eurasia (China, India, Europe), Africa, Indian Ocean & Western Pacific face the camera at t=0,
        // and rotate smoothly with independent atmospheric cloud drift
        planetMesh.rotation.y = 4.15 + time * 0.35;
        if (cloudMesh) {
          cloudMesh.rotation.y = 0.12 + time * 0.08;
        }
        earthUniforms.uCloudOffset.value = (0.12 + time * 0.08) / (Math.PI * 2);
      } else {
        planetMesh.rotation.y = time * 1.4;
      }

      if (moonPivot) {
        moonPivot.rotation.y = -0.42 - time * 2.6;
      }

      // (A) Update glowing coplanar orbital arc inside the 60.2°-tilted Ecliptic Plane
      const posAttr = trailGeo.attributes.position;
      const arcSpan = 0.88;
      const trailSegs = posAttr.count - 1;
      for (let s = 0; s <= trailSegs; s++) {
        const frac = s / trailSegs;
        const ang = theta + (1.0 - frac) * arcSpan;
        posAttr.setXYZ(
          s,
          Math.cos(ang) * a - focusShift,
          0,
          Math.sin(ang) * b
        );
      }
      posAttr.needsUpdate = true;

      // (B) Update 3D Galactocentric Helical Worldline (W_p(t, tau) = Delta r_sun(tau) + R_ecl(60.2°) * r_p(t - tau))
      const helixAttr = helixGeo.attributes.position;
      const helixSegs = helixAttr.count - 1;
      const helixAngularVel = data.orbitSpeed * 0.32;
      for (let s = 0; s <= helixSegs; s++) {
        const tau = (s / helixSegs) * maxLookbackTau;
        const pastTheta = theta + helixAngularVel * tau;
        tempPastVec.set(
          Math.cos(pastTheta) * a - focusShift,
          0,
          Math.sin(pastTheta) * b
        );
        // Transform from planet's inclined Ecliptic orbit plane into the Galactic Reference Frame
        tempPastVec.applyMatrix4(localToGalacticMatrix);

        // Add the Sun's historical displacement along its Galactic orbit (+X forward, -X wake)
        const sunPastDx = -galacticForwardSpeed * tau;
        const sunPastDy = Math.sin((time - tau) * zOscFreq) * zOscAmp - currentSunZWave;
        helixAttr.setXYZ(
          s,
          tempPastVec.x + sunPastDx,
          tempPastVec.y + sunPastDy,
          tempPastVec.z
        );
      }
      helixAttr.needsUpdate = true;

      // Compute exact world position of this planet for camera tracking & HUD labels
      planetHolder.getWorldPosition(rt.worldPos);
    }
  }

  // Initialize positions at t = 0
  updatePositions(0, 1.0);

  return {
    group: solSystemGroup,
    eclipticGroup,
    galacticRefGroup,
    planetRuntime,
    update(time, orbitTimeScale = 1.0) {
      updatePositions(time, orbitTimeScale);
    }
  };
}
