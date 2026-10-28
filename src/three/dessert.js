import * as THREE from 'three';

/**
 * BAKERZ BITE - 3D Sculptural Dessert & Confection Models
 * Contains the procedural hero masterpiece (L'Éclipse Noire Entremet with exploded layers)
 * as well as 3D category subjects for Pastries, Cookies, and Pies.
 */

export function createHeroDessert(materials) {
  const masterGroup = new THREE.Group();
  masterGroup.name = 'HeroMasterpieceGroup';

  // Base Pedestal / Slate Turntable (stays stationary)
  const pedestalGroup = new THREE.Group();
  const slateGeo = new THREE.CylinderGeometry(2.4, 2.5, 0.18, 64);
  const slateMesh = new THREE.Mesh(slateGeo, materials.slatePedestal);
  slateMesh.position.y = -1.2;
  slateMesh.receiveShadow = true;
  pedestalGroup.add(slateMesh);

  // Platinum bevel accent ring
  const ringGeo = new THREE.TorusGeometry(2.45, 0.025, 16, 64);
  ringGeo.rotateX(Math.PI / 2);
  const ringMesh = new THREE.Mesh(ringGeo, materials.platinum);
  ringMesh.position.y = -1.1;
  pedestalGroup.add(ringMesh);
  masterGroup.add(pedestalGroup);

  // --- EXPLODED LAYERS GROUP ---
  // Each layer has an initial local resting position (restingY) and an exploded target displacement.

  // 1. Layer: Dacquoise & Crunchy Praline Base
  const layerBase = new THREE.Group();
  layerBase.userData = { restingY: -0.9, explodedDelta: 0.0 };
  layerBase.position.y = layerBase.userData.restingY;

  const baseGeo = new THREE.CylinderGeometry(1.9, 1.95, 0.45, 64);
  const baseMesh = new THREE.Mesh(baseGeo, materials.dacquoiseBase);
  baseMesh.castShadow = true;
  baseMesh.receiveShadow = true;
  layerBase.add(baseMesh);

  // Praline crumble rim detail
  const pralineRimGeo = new THREE.TorusGeometry(1.92, 0.04, 16, 64);
  pralineRimGeo.rotateX(Math.PI / 2);
  const pralineRimMesh = new THREE.Mesh(pralineRimGeo, materials.dacquoiseBase);
  pralineRimMesh.position.y = 0.2;
  layerBase.add(pralineRimMesh);
  masterGroup.add(layerBase);

  // 2. Layer: Valrhona 72% Dark Chocolate Ganache
  const layerGanache = new THREE.Group();
  layerGanache.userData = { restingY: -0.42, explodedDelta: 0.65 };
  layerGanache.position.y = layerGanache.userData.restingY;

  const ganacheGeo = new THREE.CylinderGeometry(1.85, 1.88, 0.5, 64);
  const ganacheMesh = new THREE.Mesh(ganacheGeo, materials.darkGanache);
  ganacheMesh.castShadow = true;
  ganacheMesh.receiveShadow = true;
  layerGanache.add(ganacheMesh);
  masterGroup.add(layerGanache);

  // 3. Layer: Wild French Raspberry Confit Core (Translucent ruby gelée)
  const layerGelee = new THREE.Group();
  layerGelee.userData = { restingY: -0.05, explodedDelta: 1.35 };
  layerGelee.position.y = layerGelee.userData.restingY;

  const geleeGeo = new THREE.CylinderGeometry(1.72, 1.72, 0.22, 64);
  const geleeMesh = new THREE.Mesh(geleeGeo, materials.raspberryGelee);
  geleeMesh.castShadow = true;
  layerGelee.add(geleeMesh);

  // Subtle interior gold leaf speckles inside the gelée
  for (let i = 0; i < 12; i++) {
    const speckGeo = new THREE.PlaneGeometry(0.06, 0.06);
    const speckMesh = new THREE.Mesh(speckGeo, materials.goldLeaf);
    const ang = Math.random() * Math.PI * 2;
    const rad = Math.random() * 1.4;
    speckMesh.position.set(Math.cos(ang) * rad, (Math.random() - 0.5) * 0.1, Math.sin(ang) * rad);
    speckMesh.rotation.set(Math.random(), Math.random(), Math.random());
    layerGelee.add(speckMesh);
  }
  masterGroup.add(layerGelee);

  // 4. Layer: Madagascan Vanilla Chantilly & Mousse
  const layerCream = new THREE.Group();
  layerCream.userData = { restingY: 0.28, explodedDelta: 2.1 };
  layerCream.position.y = layerCream.userData.restingY;

  const creamGeo = new THREE.CylinderGeometry(1.82, 1.84, 0.45, 64);
  const creamMesh = new THREE.Mesh(creamGeo, materials.chantillyCream);
  creamMesh.castShadow = true;
  layerCream.add(creamMesh);
  masterGroup.add(layerCream);

  // 5. Layer: L'Éclipse Mirror Glaze Dome
  const layerDome = new THREE.Group();
  layerDome.userData = { restingY: 0.72, explodedDelta: 2.9 };
  layerDome.position.y = layerDome.userData.restingY;

  // Dome cap
  const domeGeo = new THREE.SphereGeometry(1.82, 64, 32, 0, Math.PI * 2, 0, Math.PI * 0.42);
  const domeMesh = new THREE.Mesh(domeGeo, materials.mirrorGlaze);
  domeMesh.castShadow = true;
  domeMesh.receiveShadow = true;
  layerDome.add(domeMesh);

  // Lower rim lip of the glaze
  const lipGeo = new THREE.TorusGeometry(1.8, 0.04, 16, 64);
  lipGeo.rotateX(Math.PI / 2);
  const lipMesh = new THREE.Mesh(lipGeo, materials.mirrorGlaze);
  layerDome.add(lipMesh);
  masterGroup.add(layerDome);

  // 6. Layer: The Haute Pâtisserie Crown (Chocolate Ribbons, Berries & 24k Gold)
  const layerCrown = new THREE.Group();
  layerCrown.userData = { restingY: 1.45, explodedDelta: 3.8 };
  layerCrown.position.y = layerCrown.userData.restingY;

  // Curled Chocolate Ribbon Sail
  const curvePoints = [];
  for (let i = 0; i <= 30; i++) {
    const t = i / 30;
    const angle = t * Math.PI * 2.5;
    const r = (1 - t * 0.7) * 0.75;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    const y = t * 1.1;
    curvePoints.push(new THREE.Vector3(x, y, z));
  }
  const ribbonCurve = new THREE.CatmullRomCurve3(curvePoints);
  const ribbonGeo = new THREE.TubeGeometry(ribbonCurve, 40, 0.035, 12, false);
  const ribbonMesh = new THREE.Mesh(ribbonGeo, materials.mirrorGlaze);
  ribbonMesh.castShadow = true;
  layerCrown.add(ribbonMesh);

  // Secondary Arching Chocolate Arc
  const arcCurvePoints = [
    new THREE.Vector3(-0.4, 0.1, -0.2),
    new THREE.Vector3(-0.1, 0.8, -0.4),
    new THREE.Vector3(0.5, 0.6, 0.2),
    new THREE.Vector3(0.2, 0.05, 0.4)
  ];
  const arcCurve = new THREE.CatmullRomCurve3(arcCurvePoints);
  const arcGeo = new THREE.TubeGeometry(arcCurve, 30, 0.03, 10, false);
  const arcMesh = new THREE.Mesh(arcGeo, materials.mirrorGlaze);
  layerCrown.add(arcMesh);

  // Central Sculptural Chocolate Quenelle / Sphere
  const sphereGeo = new THREE.SphereGeometry(0.32, 32, 32);
  sphereGeo.scale(1.2, 0.85, 0.85);
  const quenelleMesh = new THREE.Mesh(sphereGeo, materials.mirrorGlaze);
  quenelleMesh.position.set(0.1, 0.4, 0.1);
  quenelleMesh.rotation.set(0.3, 0.5, 0.2);
  quenelleMesh.castShadow = true;
  layerCrown.add(quenelleMesh);

  // Cluster of Wild Glossy Berries
  const berryMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x6E122A,
    roughness: 0.18,
    clearcoat: 0.9,
    clearcoatRoughness: 0.1
  });

  const berryCoords = [
    [-0.35, 0.15, 0.3, 0.14],
    [-0.5, 0.12, 0.15, 0.11],
    [-0.22, 0.12, 0.48, 0.12],
    [0.45, 0.18, -0.25, 0.13],
    [0.6, 0.14, -0.1, 0.11]
  ];

  berryCoords.forEach(([bx, by, bz, br]) => {
    const bGeo = new THREE.SphereGeometry(br, 16, 16);
    const bMesh = new THREE.Mesh(bGeo, berryMaterial);
    bMesh.position.set(bx, by, bz);
    bMesh.castShadow = true;
    layerCrown.add(bMesh);
  });

  // Fluttering 24k Edible Gold Leaf Flakes
  for (let i = 0; i < 18; i++) {
    const leafGeo = new THREE.PlaneGeometry(0.08, 0.08);
    const leafMesh = new THREE.Mesh(leafGeo, materials.goldLeaf);
    const theta = Math.random() * Math.PI * 2;
    const rad = 0.2 + Math.random() * 0.6;
    leafMesh.position.set(Math.cos(theta) * rad, 0.2 + Math.random() * 0.7, Math.sin(theta) * rad);
    leafMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    layerCrown.add(leafMesh);
  }

  masterGroup.add(layerCrown);

  // Array of separable layers for GSAP scroll-driven exploded animation
  const separableLayers = [layerBase, layerGanache, layerGelee, layerCream, layerDome, layerCrown];

  /**
   * Updates exploded view offset from 0 (pristine cake) to 1 (full exploded anatomy)
   */
  function setExplosionProgress(progress) {
    const p = Math.max(0, Math.min(1, progress));
    separableLayers.forEach(layer => {
      const targetY = layer.userData.restingY + layer.userData.explodedDelta * p;
      layer.position.y = targetY;
    });
  }

  return {
    group: masterGroup,
    setExplosionProgress,
    separableLayers
  };
}

/**
 * 3D Golden Croissant for Pastries World
 */
export function createPastryModel(materials) {
  const group = new THREE.Group();
  group.name = 'PastryWorldModel';

  // Laminated crescent croissant created from segmented curved torus/tubes
  const curvePts = [
    new THREE.Vector3(-1.8, -0.4, 0.4),
    new THREE.Vector3(-1.1, 0.2, 0.1),
    new THREE.Vector3(0, 0.5, -0.2),
    new THREE.Vector3(1.1, 0.2, 0.1),
    new THREE.Vector3(1.8, -0.4, 0.4)
  ];
  const curve = new THREE.CatmullRomCurve3(curvePts);

  // Main body
  const bodyGeo = new THREE.TubeGeometry(curve, 32, 0.55, 20, false);
  const bodyMesh = new THREE.Mesh(bodyGeo, materials.goldenPastry);
  bodyMesh.castShadow = true;
  group.add(bodyMesh);

  // Honeycomb lamination rings
  for (let i = 0; i < 7; i++) {
    const ringT = (i + 1) / 8;
    const pt = curve.getPointAt(ringT);
    const rGeo = new THREE.TorusGeometry(0.58 - Math.abs(ringT - 0.5) * 0.35, 0.04, 12, 32);
    const rMesh = new THREE.Mesh(rGeo, materials.goldenPastry);
    rMesh.position.copy(pt);
    rMesh.lookAt(curve.getPointAt(Math.min(1, ringT + 0.05)));
    group.add(rMesh);
  }

  // Golden glazed highlights
  const glowGeo = new THREE.SphereGeometry(0.35, 16, 16);
  glowGeo.scale(2.5, 0.6, 1.2);
  const glowMesh = new THREE.Mesh(glowGeo, materials.goldLeaf);
  glowMesh.position.set(0, 0.45, -0.15);
  glowMesh.scale.set(0.4, 0.2, 0.4);
  group.add(glowMesh);

  return group;
}

/**
 * 3D Chunky Triple Chocolate Sablé Puck for Cookies World
 */
export function createCookieModel(materials) {
  const group = new THREE.Group();
  group.name = 'CookieWorldModel';

  // Craggy thick cookie puck
  const puckGeo = new THREE.CylinderGeometry(1.65, 1.7, 0.55, 48);
  const puckMesh = new THREE.Mesh(puckGeo, materials.dacquoiseBase);
  puckMesh.castShadow = true;
  group.add(puckMesh);

  // Molten Valrhona Chocolate Pools
  const poolMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x1A110D,
    roughness: 0.12,
    clearcoat: 0.8
  });

  const pools = [
    [-0.6, 0.28, -0.4, 0.35],
    [0.5, 0.28, 0.3, 0.4],
    [-0.2, 0.28, 0.6, 0.32],
    [0.6, 0.28, -0.5, 0.28]
  ];

  pools.forEach(([px, py, pz, pr]) => {
    const pGeo = new THREE.CylinderGeometry(pr, pr * 1.1, 0.08, 24);
    const pMesh = new THREE.Mesh(pGeo, poolMaterial);
    pMesh.position.set(px, py, pz);
    group.add(pMesh);
  });

  // Flaky White Maldon Sea Salt Crystals
  const saltMaterial = new THREE.MeshStandardMaterial({
    color: 0xFAF6F0,
    roughness: 0.2,
    metalness: 0.1
  });

  for (let i = 0; i < 20; i++) {
    const sGeo = new THREE.BoxGeometry(0.08, 0.05, 0.08);
    const sMesh = new THREE.Mesh(sGeo, saltMaterial);
    const ang = Math.random() * Math.PI * 2;
    const r = Math.random() * 1.35;
    sMesh.position.set(Math.cos(ang) * r, 0.3, Math.sin(ang) * r);
    sMesh.rotation.set(Math.random() * 0.5, Math.random() * Math.PI, Math.random() * 0.5);
    group.add(sMesh);
  }

  return group;
}

/**
 * 3D Lattice Pie for Pies World
 */
export function createPieModel(materials) {
  const group = new THREE.Group();
  group.name = 'PieWorldModel';

  // Fluted ceramic pie baking dish
  const dishGeo = new THREE.CylinderGeometry(1.9, 1.5, 0.65, 48);
  const dishMesh = new THREE.Mesh(dishGeo, materials.ceramicDish);
  dishMesh.position.y = -0.15;
  dishMesh.castShadow = true;
  group.add(dishMesh);

  // Golden crimped crust rim
  const rimGeo = new THREE.TorusGeometry(1.88, 0.12, 16, 48);
  rimGeo.rotateX(Math.PI / 2);
  const rimMesh = new THREE.Mesh(rimGeo, materials.pieCrust);
  rimMesh.position.y = 0.2;
  group.add(rimMesh);

  // Spiced Apple & Amber Caramel Fill Bed
  const fillGeo = new THREE.CylinderGeometry(1.75, 1.75, 0.15, 32);
  const fillMesh = new THREE.Mesh(fillGeo, materials.darkGanache);
  fillMesh.position.y = 0.15;
  group.add(fillMesh);

  // Hand-Woven Butter Pastry Lattice Strips
  const latticeStrips = [-1.0, -0.5, 0, 0.5, 1.0];

  latticeStrips.forEach(offset => {
    // Horizontal strips
    const lenX = Math.sqrt(Math.max(0.1, 1.7 * 1.7 - offset * offset)) * 2;
    const stripGeoX = new THREE.BoxGeometry(lenX, 0.06, 0.22);
    const stripMeshX = new THREE.Mesh(stripGeoX, materials.pieCrust);
    stripMeshX.position.set(0, 0.22, offset);
    stripMeshX.castShadow = true;
    group.add(stripMeshX);

    // Vertical strips
    const lenZ = Math.sqrt(Math.max(0.1, 1.7 * 1.7 - offset * offset)) * 2;
    const stripGeoZ = new THREE.BoxGeometry(0.22, 0.06, lenZ);
    const stripMeshZ = new THREE.Mesh(stripGeoZ, materials.pieCrust);
    stripMeshZ.position.set(offset, 0.25, 0);
    stripMeshZ.castShadow = true;
    group.add(stripMeshZ);
  });

  return group;
}
