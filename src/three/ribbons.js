import * as THREE from 'three';

/**
 * BAKERZ BITE - Flowing Chantilly Cream & Golden Swirling Ribbons
 * Abstract dynamic forms that swirl majestically around the dessert as you scroll.
 */

export function createFlowingRibbons() {
  const ribbonGroup = new THREE.Group();
  ribbonGroup.name = 'FlowingRibbonsGroup';

  // Ribbon 1: Chantilly Vanilla Cream Ribbon (Spirals up and widens)
  const pts1 = [];
  const count1 = 60;
  for (let i = 0; i <= count1; i++) {
    const t = i / count1;
    const angle = t * Math.PI * 3.5;
    const r = 2.4 + Math.sin(t * Math.PI * 2) * 0.45;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    const y = (t - 0.5) * 4.2;
    pts1.push(new THREE.Vector3(x, y, z));
  }
  const curve1 = new THREE.CatmullRomCurve3(pts1);
  const geo1 = new THREE.TubeGeometry(curve1, 80, 0.08, 14, false);

  const mat1 = new THREE.MeshPhysicalMaterial({
    color: 0xFAF6EE, // Vanilla Cream
    roughness: 0.25,
    metalness: 0.05,
    clearcoat: 0.8,
    clearcoatRoughness: 0.15,
    transparent: true,
    opacity: 0.85
  });

  const mesh1 = new THREE.Mesh(geo1, mat1);
  ribbonGroup.add(mesh1);

  // Ribbon 2: Pale Lavender & Platinum Satin Filament
  const pts2 = [];
  const count2 = 50;
  for (let i = 0; i <= count2; i++) {
    const t = i / count2;
    const angle = -t * Math.PI * 2.8 + Math.PI * 0.5;
    const r = 2.8 + Math.cos(t * Math.PI * 2) * 0.5;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    const y = (0.5 - t) * 3.8;
    pts2.push(new THREE.Vector3(x, y, z));
  }
  const curve2 = new THREE.CatmullRomCurve3(pts2);
  const geo2 = new THREE.TubeGeometry(curve2, 60, 0.045, 12, false);

  const mat2 = new THREE.MeshPhysicalMaterial({
    color: 0xE7DFF2, // Pale Lavender
    roughness: 0.2,
    metalness: 0.7,
    clearcoat: 1.0,
    transparent: true,
    opacity: 0.75
  });

  const mesh2 = new THREE.Mesh(geo2, mat2);
  ribbonGroup.add(mesh2);

  // Initial state: subtle and elegant
  ribbonGroup.scale.set(0.85, 0.85, 0.85);

  function update(time, scrollProgress = 0) {
    ribbonGroup.rotation.y = time * 0.15 + scrollProgress * Math.PI * 1.5;
    const scale = 0.85 + Math.sin(scrollProgress * Math.PI) * 0.25;
    ribbonGroup.scale.set(scale, scale, scale);
    mat1.opacity = 0.5 + scrollProgress * 0.45;
  }

  return {
    group: ribbonGroup,
    update
  };
}
