import * as THREE from 'three';

/**
 * BAKERZ BITE - Procedural 3D Materials
 * Physically-based materials for chocolate mirror glaze, dacquoise crumb,
 * ruby confit, vanilla chantilly, golden pastry, and 24k edible gold.
 * All textures generated procedurally via Canvas API - zero external assets required.
 */

// Procedural Canvas Texture Generators
function createNoiseTexture(width = 512, height = 512, type = 'praline') {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (type === 'praline') {
    // Rich biscuit crumb with caramelized hazelnut flecks
    ctx.fillStyle = '#4A3225';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 4000; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 2.5 + 0.5;
      const shade = Math.random();
      if (shade > 0.7) {
        ctx.fillStyle = '#C68B59'; // Amber caramel
      } else if (shade > 0.4) {
        ctx.fillStyle = '#2A1A12'; // Dark cocoa
      } else {
        ctx.fillStyle = '#E9D7CE'; // Hazelnut kernel
      }
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === 'glaze-swirl') {
    // Subtle luxury marbling for the mirror glaze
    const grad = ctx.createRadialGradient(width * 0.5, height * 0.5, 20, width * 0.5, height * 0.5, width * 0.5);
    grad.addColorStop(0, '#2C1B14');
    grad.addColorStop(0.5, '#1E120D');
    grad.addColorStop(1, '#140C09');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(231, 223, 242, 0.08)'; // Pale lavender swirl
    ctx.lineWidth = 14;
    ctx.filter = 'blur(12px)';
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      const angle = (i / 6) * Math.PI * 2;
      const cx = width * 0.5 + Math.cos(angle) * 80;
      const cy = height * 0.5 + Math.sin(angle) * 80;
      ctx.arc(cx, cy, 140, 0, Math.PI * 1.5);
      ctx.stroke();
    }
  } else if (type === 'puff-pastry') {
    // Flaky layered golden dough texture
    ctx.fillStyle = '#C78C48';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#E9B973';
    for (let y = 0; y < height; y += 8) {
      ctx.fillRect(0, y + (Math.sin(y * 0.1) * 3), width, 3 + Math.random() * 2);
    }
    for (let i = 0; i < 800; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? '#8F5422' : '#F7D9A6';
      ctx.fillRect(Math.random() * width, Math.random() * height, Math.random() * 4 + 1, 2);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function createBakeryMaterials() {
  const pralineTexture = createNoiseTexture(512, 512, 'praline');
  const glazeTexture = createNoiseTexture(512, 512, 'glaze-swirl');
  const pastryTexture = createNoiseTexture(512, 512, 'puff-pastry');

  // 1. Signature Obsidian Mirror Glaze (High Gloss, Specular, Dark Chocolate)
  const mirrorGlazeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x1A110D,
    roughness: 0.08,
    metalness: 0.12,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    reflectivity: 0.95,
    map: glazeTexture,
    bumpMap: glazeTexture,
    bumpScale: 0.002
  });

  // 2. Valrhona 72% Dark Chocolate Ganache (Satin sheen, deep cocoa)
  const darkGanacheMaterial = new THREE.MeshStandardMaterial({
    color: 0x2A1C16,
    roughness: 0.38,
    metalness: 0.05
  });

  // 3. Dacquoise & Hazelnut Feuilletine Base (Textured crunchy biscuit)
  const dacquoiseBaseMaterial = new THREE.MeshStandardMaterial({
    color: 0x5C3E2B,
    roughness: 0.85,
    metalness: 0.02,
    map: pralineTexture,
    bumpMap: pralineTexture,
    bumpScale: 0.04
  });

  // 4. Wild French Raspberry Gelée (Translucent ruby confit)
  const raspberryGeleeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x8A1832,
    roughness: 0.15,
    metalness: 0.05,
    transmission: 0.35,
    ior: 1.45,
    transparent: true,
    opacity: 0.92
  });

  // 5. Madagascan Bourbon Vanilla Chantilly Cream (Warm ivory softness)
  const chantillyCreamMaterial = new THREE.MeshStandardMaterial({
    color: 0xFAF6EE,
    roughness: 0.55,
    metalness: 0.0
  });

  // 6. 24k Edible Gold Leaf Accents
  const goldLeafMaterial = new THREE.MeshStandardMaterial({
    color: 0xE8BA47,
    roughness: 0.22,
    metalness: 0.92,
    bumpScale: 0.01
  });

  // 7. Dark Polished Slate / Granite Turntable Pedestal
  const slatePedestalMaterial = new THREE.MeshStandardMaterial({
    color: 0x140E0C,
    roughness: 0.25,
    metalness: 0.3
  });

  // 8. Brushed Platinum Rim Detail
  const platinumMaterial = new THREE.MeshStandardMaterial({
    color: 0xD4D4D8,
    roughness: 0.28,
    metalness: 0.85
  });

  // 9. Golden Laminated Puff Pastry (for Croissant 3D model)
  const goldenPastryMaterial = new THREE.MeshStandardMaterial({
    color: 0xD89547,
    roughness: 0.45,
    metalness: 0.05,
    map: pastryTexture,
    bumpMap: pastryTexture,
    bumpScale: 0.03
  });

  // 10. Fluted Ceramic Pie Dish & Lattice Crust
  const ceramicDishMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x30241F,
    roughness: 0.15,
    clearcoat: 0.9,
    clearcoatRoughness: 0.1
  });

  const pieCrustMaterial = new THREE.MeshStandardMaterial({
    color: 0xB8783B,
    roughness: 0.65,
    metalness: 0.02
  });

  return {
    mirrorGlaze: mirrorGlazeMaterial,
    darkGanache: darkGanacheMaterial,
    dacquoiseBase: dacquoiseBaseMaterial,
    raspberryGelee: raspberryGeleeMaterial,
    chantillyCream: chantillyCreamMaterial,
    goldLeaf: goldLeafMaterial,
    slatePedestal: slatePedestalMaterial,
    platinum: platinumMaterial,
    goldenPastry: goldenPastryMaterial,
    ceramicDish: ceramicDishMaterial,
    pieCrust: pieCrustMaterial
  };
}
