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

// Custom Boiling Solar Photosphere & Corona Shader (NASA SDO 2K + 3D Convection Granulation)
const SUN_VERTEX_SHADER = /* glsl */ `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vLocalPos;
void main() {
  vUv = uv;
  vLocalPos = position;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const SUN_FRAGMENT_SHADER = /* glsl */ `
uniform sampler2D uSunMap;
uniform float uTime;
varying vec2 vUv;
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
  vec3 texCol = texture2D(uSunMap, vUv).rgb;
  vec3 p = normalize(vLocalPos) * 7.5;
  float n1 = noise(p + vec3(uTime * 0.45, -uTime * 0.35, uTime * 0.25));
  float n2 = noise(p * 2.6 - vec3(uTime * 0.7, uTime * 0.5, -uTime * 0.4));
  float gran = n1 * 0.6 + n2 * 0.4;

  // Limb darkening & fiery solar corona rim
  float viewDot = abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
  float limb = pow(viewDot, 0.48);

  vec3 darkSpot = vec3(0.85, 0.24, 0.03);
  vec3 midGold  = vec3(1.00, 0.66, 0.14);
  vec3 hotWhite = vec3(1.00, 0.97, 0.84);

  vec3 procCol = mix(darkSpot, midGold, smoothstep(0.20, 0.58, gran));
  procCol = mix(procCol, hotWhite, smoothstep(0.58, 0.88, gran) * limb);

  // Blend real 2K SDO photosphere map with animated 3D convection cells
  vec3 col = mix(procCol, texCol * (0.78 + 0.45 * gran), 0.62) * (0.42 + 0.68 * limb);
  col += vec3(1.0, 0.42, 0.07) * pow(1.0 - viewDot, 1.8) * 1.15;

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
  // Smoothly vanish at the outer boundary of the BackSide shell (viewDot -> 0)
  // while peaking right at the planet's grazing horizon limb (viewDot ~ 0.34)
  float outerFade = smoothstep(0.02, 0.36, viewDot);
  float rim = outerFade * pow(clamp(1.0 - viewDot, 0.0, 1.0), 2.8) * 1.85;
  float sunSide = smoothstep(-0.45, 0.35, dot(N, L)) * 0.65 + 0.35;

  vec3 skyBlue = mix(vec3(0.12, 0.52, 0.98), vec3(0.48, 0.86, 1.0), clamp(rim, 0.0, 1.0));
  gl_FragColor = vec4(skyBlue, clamp(rim * sunSide * 0.68, 0.0, 0.88));
}
`;

// ============================================================================
// PHOTOREALISTIC MARS, JUPITER, SATURN & PLANETARY SHADERS (2K NASA / CASSINI MAPS)
// ============================================================================
const PLANET_SURFACE_FRAGMENT_SHADER = /* glsl */ `
uniform sampler2D uAlbedoMap;
uniform sampler2D uRingMap;
uniform vec3 uSunWorldPos;
uniform vec3 uPlanetCenter;
uniform vec3 uRingAxis;
uniform vec3 uAtmoColor;
uniform vec3 uTerminatorColor;
uniform float uReliefScale;
uniform float uAtmoStrength;
uniform float uLimbDarken;
uniform float uPlanetType; // 1 = Mars, 2 = Jupiter, 3 = Saturn, 4 = Other 2K Planet
uniform float uRingInner;
uniform float uRingOuter;

varying vec2 vUv;
varying vec3 vWorldNormal;
varying vec3 vWorldPos;
varying vec3 vViewDir;

float luma(vec3 c) {
  return dot(c, vec3(0.299, 0.587, 0.114));
}

void main() {
  vec3 N = normalize(vWorldNormal);
  vec3 V = normalize(vViewDir);

  // Physical Sun direction blended with viewer key-light bias so the visible hemisphere
  // exhibits rich 3D illumination, crisp surface/cloud detail, and a dramatic day/night terminator
  vec3 physicalSunDir = normalize(uSunWorldPos - vWorldPos);
  vec3 viewRight = normalize(cross(vec3(0.0, 1.0, 0.0), V) + vec3(0.001));
  vec3 keyLightDir = normalize(V * 0.58 + viewRight * 0.72 + vec3(0.0, 0.24, 0.0));
  vec3 L = normalize(mix(physicalSunDir, keyLightDir, 0.66));

  vec3 texCol = texture2D(uAlbedoMap, vUv).rgb;

  // Finite-difference tangent-space normal perturbation from 2K satellite map
  vec2 duv = vec2(1.0 / 2048.0, 1.0 / 1024.0);
  float hL = luma(texture2D(uAlbedoMap, vUv - vec2(duv.x, 0.0)).rgb);
  float hR = luma(texture2D(uAlbedoMap, vUv + vec2(duv.x, 0.0)).rgb);
  float hD = luma(texture2D(uAlbedoMap, vUv - vec2(0.0, duv.y)).rgb);
  float hU = luma(texture2D(uAlbedoMap, vUv + vec2(0.0, duv.y)).rgb);
  vec2 grad = vec2(hL - hR, hD - hU);

  vec3 upVec = abs(N.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
  vec3 T = normalize(cross(upVec, N));
  vec3 B = cross(N, T);
  vec3 bumpedN = normalize(N + (T * grad.x + B * grad.y) * uReliefScale);

  float NdotL = dot(bumpedN, L);
  float smoothNdotL = dot(N, L);
  float NdotV = max(0.0, dot(N, V));
  float dayFactor = smoothstep(-0.16, 0.22, smoothNdotL);

  vec3 baseAlbedo = texCol;
  float specGlow = 0.0;

  if (uPlanetType > 0.5 && uPlanetType < 1.5) {
    // --- MARS (♂ 火星): Terracotta Iron-Oxide Regolith, Basalt Plains & Polar Ice Caps ---
    baseAlbedo = pow(texCol, vec3(0.95)) * vec3(1.08, 0.98, 0.92);
    // Oren-Nayar dusty opposition surge (rusty regolith back-scatter)
    float dustyBackscatter = pow(max(0.0, dot(N, V)), 0.65) * 0.14;
    baseAlbedo += vec3(0.24, 0.08, 0.03) * dustyBackscatter;

    // North & South H2O / CO2 Polar Ice Cap frost glint
    float polarMask = smoothstep(0.88, 0.96, vUv.y) + (1.0 - smoothstep(0.04, 0.12, vUv.y));
    float iceMask = clamp(polarMask * smoothstep(0.55, 0.82, luma(texCol)), 0.0, 1.0);
    vec3 H = normalize(L + V);
    specGlow = pow(max(0.0, dot(bumpedN, H)), 28.0) * iceMask * 0.45;
  } else if (uPlanetType > 1.5 && uPlanetType < 2.5) {
    // --- JUPITER (♃ 木星): Rich Cassini Ammonia Cloud Belts, Festoons & Great Red Spot ---
    baseAlbedo = pow(texCol, vec3(0.92)) * vec3(1.10, 1.03, 0.95);
    // Enhance warm crimson-orange saturation inside the Great Red Spot & turbulent belts
    float redness = clamp((texCol.r - texCol.b) * 1.8, 0.0, 1.0);
    baseAlbedo = mix(baseAlbedo, baseAlbedo * vec3(1.14, 0.96, 0.88), redness * 0.55);
  } else if (uPlanetType > 2.5 && uPlanetType < 3.5) {
    // --- SATURN (♄ 土星): Golden Butterscotch Ammonia Bands & North Polar Hexagon ---
    baseAlbedo = pow(texCol, vec3(0.93)) * vec3(1.08, 1.04, 0.94);
  }

  // Minnaert limb darkening for gas giants (or subtle rocky limb falloff)
  float minnaert = mix(1.0, pow(NdotV, uLimbDarken), clamp(uLimbDarken * 2.2, 0.0, 1.0));
  float diffuse = (max(0.0, NdotL) * 0.88 + 0.14) * minnaert;

  // Real-time analytical Saturn Ring Shadow cast onto Saturn's cloud tops!
  float ringShadow = 1.0;
  if (uPlanetType > 2.5 && uPlanetType < 3.5) {
    vec3 P = vWorldPos - uPlanetCenter;
    vec3 A = normalize(uRingAxis);
    float denom = dot(L, A);
    if (abs(denom) > 0.001) {
      float tHit = -dot(P, A) / denom;
      if (tHit > 0.0) {
        vec3 hitPos = P + L * tHit;
        float rHit = length(hitPos);
        if (rHit >= uRingInner && rHit <= uRingOuter) {
          float uCoord = (rHit - uRingInner) / (uRingOuter - uRingInner);
          float rAlpha = texture2D(uRingMap, vec2(uCoord, 0.5)).a;
          ringShadow = 1.0 - rAlpha * 0.72;
        }
      }
    }
  }

  // Twilight scattering along day/night terminator
  float terminator = smoothstep(-0.24, 0.04, smoothNdotL) * (1.0 - smoothstep(0.02, 0.30, smoothNdotL));
  vec3 twilightGlow = uTerminatorColor * terminator * 0.36;

  // Fresnel atmospheric scattering along grazing horizon limb
  float fresnel = pow(clamp(1.0 - NdotV, 0.0, 1.0), 2.7);
  vec3 atmoRim = uAtmoColor * fresnel * uAtmoStrength * (0.28 + 0.72 * dayFactor);

  vec3 nightSide = baseAlbedo * vec3(0.05, 0.06, 0.09);
  vec3 daySide = baseAlbedo * diffuse * ringShadow + vec3(1.0, 0.96, 0.90) * specGlow + twilightGlow;
  vec3 finalColor = mix(nightSide, daySide, dayFactor) + atmoRim;

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

const PLANET_ATMO_FRAGMENT_SHADER = /* glsl */ `
uniform vec3 uSunWorldPos;
uniform vec3 uAtmoColor;
uniform float uAtmoOpacity;
varying vec3 vWorldNormal;
varying vec3 vWorldPos;
varying vec3 vViewDir;

void main() {
  vec3 N = normalize(vWorldNormal);
  vec3 V = normalize(vViewDir);
  vec3 physicalSunDir = normalize(uSunWorldPos - vWorldPos);
  vec3 viewRight = normalize(cross(vec3(0.0, 1.0, 0.0), V) + vec3(0.001));
  vec3 keyLightDir = normalize(V * 0.58 + viewRight * 0.72 + vec3(0.0, 0.24, 0.0));
  vec3 L = normalize(mix(physicalSunDir, keyLightDir, 0.66));

  float viewDot = abs(dot(N, V));
  float outerFade = smoothstep(0.08, 0.42, viewDot);
  float rim = outerFade * pow(clamp(1.0 - viewDot, 0.0, 1.0), 3.6) * 2.2;
  // Only glow on the sunlit limb; vanish completely on the night-side limb so there is no detached dark-side ring
  float sunSide = smoothstep(-0.05, 0.42, dot(N, L));

  gl_FragColor = vec4(uAtmoColor, clamp(rim * sunSide * uAtmoOpacity, 0.0, 0.75));
}
`;

const MOON_FRAGMENT_SHADER = /* glsl */ `
uniform sampler2D uMoonMap;
uniform vec3 uSunWorldPos;
uniform vec3 uTintColor;
uniform float uReliefScale;
varying vec2 vUv;
varying vec3 vWorldNormal;
varying vec3 vWorldPos;
varying vec3 vViewDir;

float luma(vec3 c) {
  return dot(c, vec3(0.299, 0.587, 0.114));
}

void main() {
  vec3 N = normalize(vWorldNormal);
  vec3 V = normalize(vViewDir);
  vec3 physicalSunDir = normalize(uSunWorldPos - vWorldPos);
  vec3 viewRight = normalize(cross(vec3(0.0, 1.0, 0.0), V) + vec3(0.001));
  vec3 keyLightDir = normalize(V * 0.58 + viewRight * 0.72 + vec3(0.0, 0.24, 0.0));
  vec3 L = normalize(mix(physicalSunDir, keyLightDir, 0.68));

  vec3 texCol = texture2D(uMoonMap, vUv).rgb * uTintColor;
  vec2 duv = vec2(1.0 / 512.0, 1.0 / 256.0);
  float hL = luma(texture2D(uMoonMap, vUv - vec2(duv.x, 0.0)).rgb);
  float hR = luma(texture2D(uMoonMap, vUv + vec2(duv.x, 0.0)).rgb);
  float hD = luma(texture2D(uMoonMap, vUv - vec2(0.0, duv.y)).rgb);
  float hU = luma(texture2D(uMoonMap, vUv + vec2(0.0, duv.y)).rgb);
  vec2 grad = vec2(hL - hR, hD - hU);

  vec3 upVec = abs(N.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
  vec3 T = normalize(cross(upVec, N));
  vec3 B = cross(N, T);
  vec3 bumpedN = normalize(N + (T * grad.x + B * grad.y) * uReliefScale);

  float diff = max(0.0, dot(bumpedN, L)) * 0.88 + 0.14;
  float dayFactor = smoothstep(-0.18, 0.20, dot(N, L));
  vec3 col = mix(texCol * 0.08, texCol * diff, dayFactor);
  gl_FragColor = vec4(col, 1.0);
}
`;

// ============================================================================
// PHOTOREALISTIC CASSINI SATURN RING SHADER (WITH PLANETARY SHADOW & ICE GLINT)
// ============================================================================
const SATURN_RING_VERTEX_SHADER = /* glsl */ `
varying vec3 vWorldPos;
varying vec3 vViewDir;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPos = worldPos.xyz;
  vViewDir = normalize(cameraPosition - worldPos.xyz);
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

const SATURN_RING_FRAGMENT_SHADER = /* glsl */ `
uniform sampler2D uRingMap;
uniform vec3 uSunWorldPos;
uniform vec3 uPlanetCenter;
uniform vec3 uRingAxis;
uniform float uPlanetRadius;
uniform float uRingInner;
uniform float uRingOuter;

varying vec3 vWorldPos;
varying vec3 vViewDir;
varying vec2 vUv;

void main() {
  vec3 P = vWorldPos - uPlanetCenter;
  float r = length(P);
  float u = clamp((r - uRingInner) / (uRingOuter - uRingInner), 0.0, 1.0);

  // Sample real 2K Cassini radial ring profile (D, C, B, Cassini Division, A, Encke Gap, F rings)
  vec4 ringTex = texture2D(uRingMap, vec2(u, 0.5));
  if (ringTex.a < 0.015) discard;

  // Fine high-frequency concentric icy ringlet micro-structure
  float microRinglets = 0.90 + 0.10 * sin(u * 420.0) * cos(u * 115.0);
  vec3 ringColor = pow(ringTex.rgb, vec3(0.92)) * vec3(1.08, 1.02, 0.92) * microRinglets;

  // Sunlight & viewer phase-angle ice crystal brilliance
  vec3 V = normalize(vViewDir);
  vec3 physicalSunDir = normalize(uSunWorldPos - vWorldPos);
  vec3 viewRight = normalize(cross(vec3(0.0, 1.0, 0.0), V) + vec3(0.001));
  vec3 keyLightDir = normalize(V * 0.58 + viewRight * 0.72 + vec3(0.0, 0.24, 0.0));
  vec3 L = normalize(mix(physicalSunDir, keyLightDir, 0.66));

  float backScatter = pow(max(0.0, dot(V, L)), 4.0) * 0.24;
  ringColor += vec3(1.0, 0.95, 0.82) * backScatter;

  // Real-time analytical shadow cast by Saturn's oblate globe across the back of the rings!
  float planetShadow = 1.0;
  float projL = dot(P, L);
  if (projL < 0.0) {
    vec3 A = normalize(uRingAxis);
    // Account for Saturn's 1:0.95 polar flattening
    vec3 Ps = P + A * dot(P, A) * 0.052;
    vec3 Ls = normalize(L + A * dot(L, A) * 0.052);
    float perpDist = length(Ps - Ls * dot(Ps, Ls));
    planetShadow = smoothstep(uPlanetRadius * 0.94, uPlanetRadius * 1.03, perpDist);
  }

  vec3 finalRingCol = ringColor * mix(0.10, 1.08, planetShadow);
  float finalAlpha = clamp(ringTex.a * 1.12, 0.0, 0.96);

  gl_FragColor = vec4(finalRingCol, finalAlpha);
}
`;

// High-detail procedural textures for the Galilean Moons (Io, Europa, Ganymede, Callisto), Phobos/Deimos & Titan
function createMoonDetailTexture(moonId) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  let seed = moonId.charCodeAt(0) * 1373 + moonId.length * 293;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  if (moonId === 'io') {
    // Io (木卫一): Volcanic sulfur yellow, orange-red plumes & dark lava calderas
    const g = ctx.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0.0, '#c98a2c');
    g.addColorStop(0.25, '#f4d35e');
    g.addColorStop(0.5, '#ee964b');
    g.addColorStop(0.75, '#f4d35e');
    g.addColorStop(1.0, '#b5651d');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 256);
    for (let i = 0; i < 160; i++) {
      ctx.globalAlpha = 0.35 + rand() * 0.4;
      ctx.fillStyle = rand() < 0.45 ? '#fff3b0' : (rand() < 0.75 ? '#d9534f' : '#3d2b1f');
      ctx.beginPath();
      ctx.ellipse(rand() * 512, rand() * 256, 6 + rand() * 26, 4 + rand() * 18, rand() * 3, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (moonId === 'europa') {
    // Europa (木卫二): Smooth bright water-ice shell criss-crossed by reddish-brown tectonic lineae fractures
    ctx.fillStyle = '#e8f1f5';
    ctx.fillRect(0, 0, 512, 256);
    for (let i = 0; i < 90; i++) {
      ctx.globalAlpha = 0.22;
      ctx.fillStyle = rand() < 0.5 ? '#cfe5f0' : '#d8c3a5';
      ctx.beginPath();
      ctx.ellipse(rand() * 512, rand() * 256, 20 + rand() * 45, 10 + rand() * 25, rand() * 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = '#9c5a3c';
    for (let l = 0; l < 55; l++) {
      ctx.globalAlpha = 0.28 + rand() * 0.32;
      ctx.lineWidth = 0.8 + rand() * 1.6;
      ctx.beginPath();
      const x0 = rand() * 512;
      const y0 = rand() * 256;
      ctx.moveTo(x0, y0);
      ctx.bezierCurveTo(x0 + (rand() - 0.5) * 140, y0 + (rand() - 0.5) * 90, x0 + (rand() - 0.5) * 200, y0 + (rand() - 0.5) * 120, x0 + (rand() - 0.5) * 260, y0 + (rand() - 0.5) * 140);
      ctx.stroke();
    }
  } else if (moonId === 'ganymede' || moonId === 'callisto') {
    // Ganymede (木卫三) & Callisto (木卫四): Dark ancient cratered regions + bright icy impact rays
    const isGanymede = moonId === 'ganymede';
    ctx.fillStyle = isGanymede ? '#9e9284' : '#6c6258';
    ctx.fillRect(0, 0, 512, 256);
    for (let i = 0; i < 220; i++) {
      ctx.globalAlpha = 0.32;
      ctx.fillStyle = rand() < 0.45 ? '#524940' : '#d6cfc7';
      ctx.beginPath();
      ctx.arc(rand() * 512, rand() * 256, 2 + rand() * 16, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (moonId === 'titan') {
    // Titan (土卫六): Dense golden-orange nitrogen + methane stratospheric haze
    const g = ctx.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0.0, '#b56e28');
    g.addColorStop(0.5, '#e8993e');
    g.addColorStop(1.0, '#c47a2c');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 256);
  } else {
    // Phobos / Deimos cratered dark carbonaceous asteroid regolith
    ctx.fillStyle = '#7d7268';
    ctx.fillRect(0, 0, 512, 256);
    for (let i = 0; i < 180; i++) {
      ctx.globalAlpha = 0.38;
      ctx.fillStyle = rand() < 0.55 ? '#4a423b' : '#a89b8e';
      ctx.beginPath();
      ctx.arc(rand() * 512, rand() * 256, 3 + rand() * 18, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
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

  // Load real 2K NASA / Cassini / Viking / MESSENGER / Voyager / SDO Planetary Maps
  const texLoader = new THREE.TextureLoader();
  const loadPlanetTex = (url) => {
    const t = texLoader.load(url);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  };
  const sunRealTex = loadPlanetTex('./textures/sun_2k.jpg');

  // 1. THE SUN (Boiling Photosphere Shader + Multi-layer Corona)
  const sunUniforms = { uSunMap: { value: sunRealTex }, uTime: { value: 0 } };
  const sunMat = new THREE.ShaderMaterial({
    vertexShader: SUN_VERTEX_SHADER,
    fragmentShader: SUN_FRAGMENT_SHADER,
    uniforms: sunUniforms
  });
  const sunData = SOLAR_BODIES[0];
  const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(sunData.radius, 64, 64), sunMat);
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
    currentAngle: 0.0,
    viewDistance: 0.36
  });
  const earthDayTex = loadPlanetTex('./textures/earth_atmos_2048.jpg');
  const earthSpecTex = texLoader.load('./textures/earth_specular_2048.jpg');
  const earthNormalTex = texLoader.load('./textures/earth_normal_2048.jpg');
  const earthNightTex = loadPlanetTex('./textures/earth_lights_2048.png');
  const earthCloudsTex = texLoader.load('./textures/earth_clouds_1024.png');
  earthCloudsTex.wrapS = THREE.RepeatWrapping;
  earthCloudsTex.wrapT = THREE.ClampToEdgeWrapping;
  const moonRealTex = loadPlanetTex('./textures/moon_1024.jpg');

  const marsRealTex = loadPlanetTex('./textures/mars_2k.jpg');
  const jupiterRealTex = loadPlanetTex('./textures/jupiter_2k.jpg');
  const saturnRealTex = loadPlanetTex('./textures/saturn_2k.jpg');
  const saturnRingRealTex = texLoader.load('./textures/saturn_ring_alpha.png');
  const mercuryRealTex = loadPlanetTex('./textures/mercury_2k.jpg');
  const venusRealTex = loadPlanetTex('./textures/venus_2k.jpg');
  const uranusRealTex = loadPlanetTex('./textures/uranus_2k.jpg');
  const neptuneRealTex = loadPlanetTex('./textures/neptune_2k.jpg');

  const realPlanetMaps = {
    mercury: mercuryRealTex,
    venus: venusRealTex,
    mars: marsRealTex,
    jupiter: jupiterRealTex,
    saturn: saturnRealTex,
    uranus: uranusRealTex,
    neptune: neptuneRealTex
  };

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
    let planetUniforms = null;
    let saturnRingUniforms = null;
    const ringInnerR = body.radius * 1.25;
    const ringOuterR = body.radius * 2.58;

    if (body.id === 'earth') {
      planetMat = new THREE.ShaderMaterial({
        vertexShader: EARTH_VERTEX_SHADER,
        fragmentShader: EARTH_FRAGMENT_SHADER,
        uniforms: earthUniforms
      });
    } else {
      const pType = body.id === 'mars' ? 1.0 : (body.id === 'jupiter' ? 2.0 : (body.id === 'saturn' ? 3.0 : 4.0));
      const reliefMap = {
        mercury: 6.5,
        venus: 1.2,
        mars: 5.5,
        jupiter: 2.2,
        saturn: 1.4,
        uranus: 0.6,
        neptune: 1.2
      };
      const atmoColMap = {
        mercury: new THREE.Vector3(0.65, 0.62, 0.58),
        venus: new THREE.Vector3(0.98, 0.82, 0.48),
        mars: new THREE.Vector3(0.96, 0.52, 0.30),
        jupiter: new THREE.Vector3(0.94, 0.84, 0.66),
        saturn: new THREE.Vector3(0.96, 0.88, 0.64),
        uranus: new THREE.Vector3(0.48, 0.92, 0.98),
        neptune: new THREE.Vector3(0.26, 0.58, 1.00)
      };
      const termColMap = {
        mercury: new THREE.Vector3(0.35, 0.32, 0.28),
        venus: new THREE.Vector3(0.88, 0.48, 0.14),
        mars: new THREE.Vector3(0.86, 0.38, 0.18),
        jupiter: new THREE.Vector3(0.86, 0.44, 0.18),
        saturn: new THREE.Vector3(0.82, 0.56, 0.20),
        uranus: new THREE.Vector3(0.18, 0.65, 0.78),
        neptune: new THREE.Vector3(0.14, 0.36, 0.86)
      };
      const atmoStrMap = {
        mercury: 0.08,
        venus: 0.62,
        mars: 0.64,
        jupiter: 0.42,
        saturn: 0.44,
        uranus: 0.58,
        neptune: 0.65
      };
      const limbDarkMap = {
        mercury: 0.06,
        venus: 0.22,
        mars: 0.12,
        jupiter: 0.28,
        saturn: 0.32,
        uranus: 0.26,
        neptune: 0.28
      };

      planetUniforms = {
        uAlbedoMap: { value: realPlanetMaps[body.id] || marsRealTex },
        uRingMap: { value: saturnRingRealTex },
        uSunWorldPos: { value: SOL_CENTER.clone() },
        uPlanetCenter: { value: new THREE.Vector3() },
        uRingAxis: { value: new THREE.Vector3(0, 1, 0) },
        uAtmoColor: { value: atmoColMap[body.id] || new THREE.Vector3(0.8, 0.8, 0.8) },
        uTerminatorColor: { value: termColMap[body.id] || new THREE.Vector3(0.6, 0.3, 0.1) },
        uReliefScale: { value: reliefMap[body.id] ?? 2.0 },
        uAtmoStrength: { value: atmoStrMap[body.id] ?? 0.4 },
        uLimbDarken: { value: limbDarkMap[body.id] ?? 0.2 },
        uPlanetType: { value: pType },
        uRingInner: { value: ringInnerR },
        uRingOuter: { value: ringOuterR }
      };

      planetMat = new THREE.ShaderMaterial({
        vertexShader: EARTH_VERTEX_SHADER,
        fragmentShader: PLANET_SURFACE_FRAGMENT_SHADER,
        uniforms: planetUniforms
      });
    }

    const sphereSegs = ['earth', 'mars', 'jupiter', 'saturn'].includes(body.id) ? 64 : 40;
    const planetMesh = new THREE.Mesh(
      new THREE.SphereGeometry(body.radius, sphereSegs, sphereSegs),
      planetMat
    );

    // Authentic gas-giant polar oblateness (flattening from rapid ~10h rotation)
    if (body.id === 'jupiter') {
      planetMesh.scale.set(1.034, 0.968, 1.034);
    } else if (body.id === 'saturn') {
      planetMesh.scale.set(1.048, 0.952, 1.048);
    }

    if (body.id === 'earth') {
      planetHolder.rotation.z = ECLIPTIC_GALACTIC_TILT - 0.32;
      planetHolder.rotation.x = -0.38;
      planetMesh.rotation.z = 0.18;
    } else if (body.id === 'saturn') {
      // Tilt Saturn & its rings at a dramatic 26.7° Cassini viewing angle relative to the camera
      planetHolder.rotation.z = ECLIPTIC_GALACTIC_TILT - 0.44;
      planetHolder.rotation.x = -0.18;
      planetMesh.rotation.z = 0.0;
    } else if (body.id === 'jupiter') {
      // Tilt Jupiter slightly so the Southern Tropical Zone (22°S Great Red Spot) and equatorial belts face the camera squarely
      planetHolder.rotation.z = ECLIPTIC_GALACTIC_TILT - 0.15;
      planetHolder.rotation.x = 0.14;
      planetMesh.rotation.z = 0.05;
    } else if (body.id === 'mars') {
      planetHolder.rotation.z = ECLIPTIC_GALACTIC_TILT - 0.24;
      planetHolder.rotation.x = -0.16;
      planetMesh.rotation.z = 0.16;
    } else {
      planetHolder.rotation.z = ECLIPTIC_GALACTIC_TILT - 0.35;
      planetHolder.rotation.x = -0.25;
      planetMesh.rotation.z = body.axialTilt;
    }
    planetMesh.userData = { landmarkId: 'sol', solarBodyId: body.id };
    planetHolder.add(planetMesh);
    interactiveMeshes.push(planetMesh);

    const makeMoonMat = (tex, tintVec, relief = 3.5) => new THREE.ShaderMaterial({
      vertexShader: EARTH_VERTEX_SHADER,
      fragmentShader: MOON_FRAGMENT_SHADER,
      uniforms: {
        uMoonMap: { value: tex },
        uSunWorldPos: { value: SOL_CENTER.clone() },
        uTintColor: { value: tintVec },
        uReliefScale: { value: relief }
      }
    });

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
        makeMoonMat(moonRealTex, new THREE.Vector3(1.0, 0.99, 0.96), 4.5)
      );
      moonMesh.position.set(moonOrbitR, 0, 0);
      moonPivot.add(moonMesh);
      planetHolder.add(moonPivot);
    } else if (body.id === 'saturn') {
      // Subtle golden stratospheric limb halo around Saturn
      const saturnAtmo = new THREE.Mesh(
        new THREE.SphereGeometry(body.radius * 1.032, 48, 48),
        new THREE.ShaderMaterial({
          vertexShader: EARTH_VERTEX_SHADER,
          fragmentShader: PLANET_ATMO_FRAGMENT_SHADER,
          uniforms: {
            uSunWorldPos: planetUniforms.uSunWorldPos,
            uAtmoColor: { value: new THREE.Vector3(0.96, 0.86, 0.58) },
            uAtmoOpacity: { value: 0.34 }
          },
          transparent: true,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        })
      );
      saturnAtmo.scale.set(1.048, 0.952, 1.048);
      planetHolder.add(saturnAtmo);

      // Saturn's iconic Cassini 2K multi-band ring system (D, C, B, Cassini Division, A, Encke Gap, F)
      // with real-time analytical planetary shadow cast by Saturn onto the rings!
      const ringGeo = new THREE.RingGeometry(ringInnerR, ringOuterR, 180, 4);
      ringGeo.rotateX(Math.PI / 2);

      saturnRingUniforms = {
        uRingMap: { value: saturnRingRealTex },
        uSunWorldPos: planetUniforms.uSunWorldPos,
        uPlanetCenter: planetUniforms.uPlanetCenter,
        uRingAxis: planetUniforms.uRingAxis,
        uPlanetRadius: { value: body.radius },
        uRingInner: { value: ringInnerR },
        uRingOuter: { value: ringOuterR }
      };

      const ringMesh = new THREE.Mesh(
        ringGeo,
        new THREE.ShaderMaterial({
          vertexShader: SATURN_RING_VERTEX_SHADER,
          fragmentShader: SATURN_RING_FRAGMENT_SHADER,
          uniforms: saturnRingUniforms,
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: false
        })
      );
      planetHolder.add(ringMesh);

      // Saturn's Major Moons: Enceladus (土卫二 - icy plume world) & Titan (土卫六 - golden nitrogen haze world)
      moonPivot = new THREE.Group();
      const saturnMoons = [
        { id: 'europa', r: body.radius * 2.82, size: body.radius * 0.068, color: 0xe0f7ff, tint: new THREE.Vector3(0.95, 1.0, 1.05), ang: 0.72 }, // Enceladus
        { id: 'titan',  r: body.radius * 3.32, size: body.radius * 0.115, color: 0xe8993e, tint: new THREE.Vector3(1.05, 0.88, 0.65), ang: 2.38 }  // Titan
      ];
      saturnMoons.forEach(sm => {
        const sPts = [];
        for (let m = 0; m <= 64; m++) {
          const ma = (m / 64) * Math.PI * 2;
          sPts.push(new THREE.Vector3(Math.cos(ma) * sm.r, 0, Math.sin(ma) * sm.r));
        }
        planetHolder.add(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(sPts),
          new THREE.LineBasicMaterial({ color: sm.color, transparent: true, opacity: 0.28 })
        ));
        const mTex = createMoonDetailTexture(sm.id);
        const smMesh = new THREE.Mesh(
          new THREE.SphereGeometry(sm.size, 24, 24),
          makeMoonMat(mTex, sm.tint, 2.2)
        );
        smMesh.position.set(Math.cos(sm.ang) * sm.r, 0, Math.sin(sm.ang) * sm.r);
        moonPivot.add(smMesh);
      });
      planetHolder.add(moonPivot);
    } else if (body.id === 'uranus') {
      // Uranus's vertical pale-cyan epsilon ice ring
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
      // Photorealistic Mie Dusty Martian Atmosphere Halo + Irregular Cratered Moons Phobos (火卫一) & Deimos (火卫二)
      const marsAtmo = new THREE.Mesh(
        new THREE.SphereGeometry(body.radius * 1.034, 48, 48),
        new THREE.ShaderMaterial({
          vertexShader: EARTH_VERTEX_SHADER,
          fragmentShader: PLANET_ATMO_FRAGMENT_SHADER,
          uniforms: {
            uSunWorldPos: planetUniforms.uSunWorldPos,
            uAtmoColor: { value: new THREE.Vector3(0.96, 0.48, 0.26) },
            uAtmoOpacity: { value: 0.42 }
          },
          transparent: true,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        })
      );
      planetHolder.add(marsAtmo);

      moonPivot = new THREE.Group();
      moonPivot.rotation.z = 0.08;
      const asteroidTex = createMoonDetailTexture('phobos');
      const marsMoons = [
        { r: body.radius * 1.86, size: body.radius * 0.135, scale: [1.32, 0.88, 1.04], color: 0xb8a99a, tint: new THREE.Vector3(0.96, 0.88, 0.82), ang: -0.22 }, // Phobos (火卫一)
        { r: body.radius * 2.58, size: body.radius * 0.095, scale: [1.24, 0.84, 0.96], color: 0x9c8e80, tint: new THREE.Vector3(0.88, 0.82, 0.76), ang: 2.35 }   // Deimos (火卫二)
      ];
      marsMoons.forEach(mm => {
        const pts = [];
        for (let m = 0; m <= 64; m++) {
          const ma = (m / 64) * Math.PI * 2;
          pts.push(new THREE.Vector3(Math.cos(ma) * mm.r, 0, Math.sin(ma) * mm.r));
        }
        planetHolder.add(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({ color: mm.color, transparent: true, opacity: 0.34 })
        ));
        const mMesh = new THREE.Mesh(
          new THREE.SphereGeometry(mm.size, 24, 24),
          makeMoonMat(asteroidTex, mm.tint, 5.5)
        );
        mMesh.scale.set(mm.scale[0], mm.scale[1], mm.scale[2]);
        mMesh.position.set(Math.cos(mm.ang) * mm.r, 0, Math.sin(mm.ang) * mm.r);
        moonPivot.add(mMesh);
      });
      planetHolder.add(moonPivot);
    } else if (body.id === 'jupiter') {
      // Subtle stratospheric hydrocarbon haze around Jupiter's oblate limb
      const jupAtmo = new THREE.Mesh(
        new THREE.SphereGeometry(body.radius * 1.030, 48, 48),
        new THREE.ShaderMaterial({
          vertexShader: EARTH_VERTEX_SHADER,
          fragmentShader: PLANET_ATMO_FRAGMENT_SHADER,
          uniforms: {
            uSunWorldPos: planetUniforms.uSunWorldPos,
            uAtmoColor: { value: new THREE.Vector3(0.95, 0.82, 0.62) },
            uAtmoOpacity: { value: 0.34 }
          },
          transparent: true,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        })
      );
      jupAtmo.scale.set(1.034, 0.968, 1.034);
      planetHolder.add(jupAtmo);

      // 4 Galilean Moons (Io 木卫一, Europa 木卫二, Ganymede 木卫三, Callisto 木卫四) with authentic surface textures
      moonPivot = new THREE.Group();
      moonPivot.rotation.z = 0.05;
      const galileanMoons = [
        { id: 'io',       r: body.radius * 1.48, size: body.radius * 0.082, color: 0xffbe0b, tint: new THREE.Vector3(1.08, 0.96, 0.72), ang: 0.42 }, // Io (Volcanic sulfur)
        { id: 'europa',   r: body.radius * 1.82, size: body.radius * 0.074, color: 0xdff6ff, tint: new THREE.Vector3(0.98, 1.00, 1.04), ang: 1.92 }, // Europa (Lineae ice crust)
        { id: 'ganymede', r: body.radius * 2.22, size: body.radius * 0.106, color: 0xc8b8a6, tint: new THREE.Vector3(0.96, 0.92, 0.86), ang: 3.55 }, // Ganymede (Largest moon)
        { id: 'callisto', r: body.radius * 2.68, size: body.radius * 0.095, color: 0x8d7b68, tint: new THREE.Vector3(0.84, 0.78, 0.72), ang: 5.12 }  // Callisto (Cratered ice)
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
        const gmTex = createMoonDetailTexture(gm.id);
        const gmMesh = new THREE.Mesh(
          new THREE.SphereGeometry(gm.size, 24, 24),
          makeMoonMat(gmTex, gm.tint, 3.8)
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
      planetUniforms,
      saturnRingUniforms,
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
      viewDistance: body.id === 'saturn' ? body.radius * 6.4 : Math.max(0.085, body.radius * 4.2)
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
        planetUniforms,
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
      } else if (id === 'mars') {
        // Orient Mars so Valles Marineris canyon, Olympus Mons & Tharsis volcanoes face the camera at t=0
        planetMesh.rotation.y = 2.65 + time * 0.38;
      } else if (id === 'jupiter') {
        // Orient Jupiter so the Great Red Spot & turbulent South Equatorial Belt face the camera at t=0
        planetMesh.rotation.y = 5.42 + time * 0.65;
      } else if (id === 'saturn') {
        planetMesh.rotation.y = 1.40 + time * 0.55;
      } else {
        planetMesh.rotation.y = time * 0.45;
      }

      if (moonPivot) {
        moonPivot.rotation.y = -0.42 - time * 1.6;
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

      // Compute exact world position of this planet for camera tracking, HUD labels & Saturn ring-globe shadow shaders
      planetHolder.updateMatrixWorld(true);
      planetHolder.getWorldPosition(rt.worldPos);
      if (planetUniforms) {
        planetUniforms.uPlanetCenter.value.copy(rt.worldPos);
        planetUniforms.uRingAxis.value.set(0, 1, 0).transformDirection(planetHolder.matrixWorld).normalize();
      }
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
