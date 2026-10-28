import * as THREE from 'three';

/**
 * BAKERZ BITE - Floating Crumbs, Golden Dust & Flour Particle Field
 * Adds atmospheric depth and micro-dynamics to the 3D bakery scenes.
 */

export function createBakeryParticleSystem(count = 420) {
  const particleGroup = new THREE.Group();
  particleGroup.name = 'BakeryParticleSystem';

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const velocities = [];

  // Palette: Gold (#E8BA47), Amber Caramel (#C68B59), Dark Cocoa (#30241F), Cream (#FAF6EE)
  const colorPalette = [
    new THREE.Color(0xE8BA47), // Gold Leaf
    new THREE.Color(0xC68B59), // Caramel
    new THREE.Color(0x604638), // Mocha
    new THREE.Color(0xFAF6EE), // Flour / Cream
    new THREE.Color(0xE7DFF2)  // Pale Lavender sparkle
  ];

  for (let i = 0; i < count; i++) {
    // Distribute in a spherical cylinder volume around the dessert
    const radius = 1.2 + Math.random() * 5.5;
    const theta = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * 6.5;

    positions[i * 3] = Math.cos(theta) * radius;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = Math.sin(theta) * radius;

    // Pick random color from palette
    const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i * 3] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;

    scales[i] = Math.random() * 0.08 + 0.02;

    velocities.push({
      vx: (Math.random() - 0.5) * 0.003,
      vy: Math.random() * 0.002 + 0.001,
      vz: (Math.random() - 0.5) * 0.003,
      swirlSpeed: (Math.random() - 0.5) * 0.005,
      initialY: y
    });
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Procedural soft circular particle sprite
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.85)');
  grad.addColorStop(0.8, 'rgba(255, 255, 255, 0.2)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);

  const spriteTexture = new THREE.CanvasTexture(canvas);

  const material = new THREE.PointsMaterial({
    size: 0.12,
    vertexColors: true,
    map: spriteTexture,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const points = new THREE.Points(geometry, material);
  particleGroup.add(points);

  let turbulenceFactor = 1.0;

  function update(time, scrollVelocity = 0) {
    const posAttr = geometry.attributes.position;
    const posArray = posAttr.array;
    turbulenceFactor = THREE.MathUtils.lerp(turbulenceFactor, 1.0 + Math.abs(scrollVelocity) * 4, 0.08);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const v = velocities[i];

      // Swirl around central axis
      const x = posArray[idx];
      const z = posArray[idx + 2];
      const curRadius = Math.sqrt(x * x + z * z);
      let angle = Math.atan2(z, x);
      angle += v.swirlSpeed * turbulenceFactor;

      posArray[idx] = Math.cos(angle) * curRadius + v.vx;
      posArray[idx + 1] += v.vy * turbulenceFactor;
      posArray[idx + 2] = Math.sin(angle) * curRadius + v.vz;

      // Wrap vertically within boundary
      if (posArray[idx + 1] > 3.5) {
        posArray[idx + 1] = -3.5;
      } else if (posArray[idx + 1] < -3.5) {
        posArray[idx + 1] = 3.5;
      }
    }

    posAttr.needsUpdate = true;
  }

  return {
    group: particleGroup,
    update
  };
}
