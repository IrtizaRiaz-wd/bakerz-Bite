import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * Bakerz Bite cinematic scene. Pure Three.js; driven by an external scroll
 * progress value (0..1) and pointer position. Call dispose() on unmount.
 */
export type BakeryScene = {
  setProgress: (p: number) => void;
  setPointer: (x: number, y: number) => void;
  dispose: () => void;
};

const C = {
  espresso: 0x30241f,
  mocha: 0x604638,
  cream: 0xfaf6f0,
  rose: 0xe9d7ce,
  lavender: 0xe7dff2,
  mutedLav: 0xa99bb8,
  platinum: 0xd4d4d8,
  choc: 0x2a1610,
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const range = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function spongeTexture(base: string, dot: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  g.fillStyle = base;
  g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 1400; i++) {
    g.fillStyle = dot;
    g.globalAlpha = Math.random() * 0.35;
    const r = Math.random() * 2.2;
    g.beginPath();
    g.arc(Math.random() * 256, Math.random() * 256, r, 0, Math.PI * 2);
    g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(4, 1);
  return t;
}

/** Open cylinder whose lower edge is pulled into irregular drips. */
function dripGeometry(r: number, h: number, seed: number) {
  const g = new THREE.CylinderGeometry(r, r, h, 160, 24, true);
  const pos = g.attributes.position as THREE.BufferAttribute;
  const top = h / 2;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const a = Math.atan2(z, x);
    const drip =
      0.12 +
      Math.pow(Math.abs(Math.sin(a * 6 + seed)), 10) * h * 0.85 +
      Math.pow(Math.abs(Math.sin(a * 11 + seed * 2.3)), 14) * h * 0.5;
    const minY = top - Math.min(h, drip);
    if (y < minY) pos.setY(i, minY);
    // rounded drip tips bulge outward slightly
    const bulge = 1 + (y < minY + 0.05 ? 0.012 : 0);
    pos.setX(i, x * bulge);
    pos.setZ(i, z * bulge);
  }
  g.computeVertexNormals();
  return g;
}

export function createBakeryScene(canvas: HTMLCanvasElement, opts: { mobile: boolean; reducedMotion: boolean }): BakeryScene {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !opts.mobile, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, opts.mobile ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = !opts.mobile;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const bg = new THREE.Color(C.espresso);
  scene.background = bg;
  scene.fog = new THREE.Fog(C.espresso, 9, 24);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.45;

  const camera = new THREE.PerspectiveCamera(opts.mobile ? 48 : 35, 1, 0.1, 100);

  // ---- Lights
  scene.add(new THREE.HemisphereLight(C.rose, C.espresso, 0.6));
  const key = new THREE.SpotLight(0xffe2c4, 140, 30, Math.PI / 6, 0.6, 1.6);
  key.position.set(4, 8, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.bias = -0.0005;
  scene.add(key, key.target);
  const rim = new THREE.PointLight(C.mutedLav, 40, 20, 1.8);
  rim.position.set(-5, 3, -4);
  scene.add(rim);
  const fill = new THREE.PointLight(0xffc89a, 8, 15, 2);
  fill.position.set(-3, 1, 5);
  scene.add(fill);

  // ---- Plinth & floor
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(30, 64),
    new THREE.MeshStandardMaterial({ color: C.mocha, roughness: 0.85 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.6;
  floor.receiveShadow = true;
  scene.add(floor);

  const plinth = new THREE.Mesh(
    new THREE.CylinderGeometry(2.3, 2.45, 0.35, 96),
    new THREE.MeshPhysicalMaterial({ color: C.cream, roughness: 0.25, clearcoat: 0.6, sheen: 0.4 }),
  );
  plinth.position.y = -1.42;
  plinth.castShadow = plinth.receiveShadow = true;
  scene.add(plinth);
  const plinthRing = new THREE.Mesh(
    new THREE.TorusGeometry(2.38, 0.025, 12, 128),
    new THREE.MeshStandardMaterial({ color: C.platinum, metalness: 1, roughness: 0.2 }),
  );
  plinthRing.rotation.x = Math.PI / 2;
  plinthRing.position.y = -1.25;
  scene.add(plinthRing);

  // ---- Cake
  const cake = new THREE.Group();
  scene.add(cake);
  const spongeTex = spongeTexture("#c99a72", "#6b432c");
  const sponge = new THREE.MeshStandardMaterial({ map: spongeTex, roughness: 0.9 });
  const darkSponge = new THREE.MeshStandardMaterial({ map: spongeTexture("#4a2a1d", "#1a0d08"), roughness: 0.9 });
  const creamMat = new THREE.MeshPhysicalMaterial({ color: C.cream, roughness: 0.45, sheen: 1, sheenColor: new THREE.Color(C.rose) });
  const ganache = new THREE.MeshPhysicalMaterial({
    color: C.choc, roughness: 0.18, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.08, side: THREE.DoubleSide,
  });
  const lavGlaze = new THREE.MeshPhysicalMaterial({ color: C.lavender, roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.1, side: THREE.DoubleSide });

  type Layer = { obj: THREE.Object3D; baseY: number; explodeY: number; spin: number };
  const layers: Layer[] = [];
  const tiers = [
    { r: 1.55, h: 0.95, mat: darkSponge, glaze: ganache },
    { r: 1.15, h: 0.8, mat: sponge, glaze: lavGlaze },
    { r: 0.78, h: 0.7, mat: darkSponge, glaze: ganache },
  ];
  let y = -1.25;
  tiers.forEach((t, i) => {
    const tier = new THREE.Group();
    // sponge split by a cream filling
    const half = (t.h - 0.1) / 2;
    const s1 = new THREE.Mesh(new THREE.CylinderGeometry(t.r, t.r, half, 96), t.mat);
    s1.position.y = half / 2;
    const fillL = new THREE.Mesh(new THREE.CylinderGeometry(t.r * 1.005, t.r * 1.005, 0.1, 96), creamMat);
    fillL.position.y = half + 0.05;
    const s2 = s1.clone();
    s2.position.y = half * 1.5 + 0.1;
    // glaze cap + drips
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(t.r + 0.025, t.r + 0.025, 0.06, 96), t.glaze);
    cap.position.y = t.h + 0.01;
    const drip = new THREE.Mesh(dripGeometry(t.r + 0.02, t.h * 0.7, i * 1.7 + 0.4), t.glaze);
    drip.position.y = t.h - (t.h * 0.7) / 2 + 0.02;
    // piped cream pearls around the top edge
    const pearlGeo = new THREE.SphereGeometry(0.07 + t.r * 0.02, 16, 12);
    const count = Math.floor(t.r * 22);
    const pearls = new THREE.InstancedMesh(pearlGeo, creamMat, count);
    const m = new THREE.Matrix4();
    for (let k = 0; k < count; k++) {
      const a = (k / count) * Math.PI * 2;
      m.makeTranslation(Math.cos(a) * (t.r - 0.09), t.h + 0.09, Math.sin(a) * (t.r - 0.09));
      pearls.setMatrixAt(k, m);
    }
    [s1, fillL, s2, cap, drip, pearls].forEach((o) => {
      o.castShadow = true;
      o.receiveShadow = true;
      tier.add(o);
    });
    tier.position.y = y;
    cake.add(tier);
    layers.push({ obj: tier, baseY: y, explodeY: y + i * 1.25 + 0.2, spin: (i % 2 ? -1 : 1) * 0.6 });
    y += t.h + 0.04;
  });

  // Crown: glossy chocolate sphere with gold-leaf-like platinum ring
  const crown = new THREE.Group();
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.38, 64, 48), ganache);
  sphere.castShadow = true;
  crown.add(sphere);
  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(0.55, 0.012, 8, 96),
    new THREE.MeshStandardMaterial({ color: C.platinum, metalness: 1, roughness: 0.15 }),
  );
  halo.rotation.x = Math.PI / 2.4;
  crown.add(halo);
  // berries
  const berryMat = new THREE.MeshPhysicalMaterial({ color: 0x7a2a3a, roughness: 0.3, clearcoat: 0.8 });
  for (let k = 0; k < 5; k++) {
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 12), berryMat);
    const a = (k / 5) * Math.PI * 2;
    b.position.set(Math.cos(a) * 0.5, -0.25, Math.sin(a) * 0.5);
    crown.add(b);
  }
  const crownBase = y + 0.38;
  crown.position.y = crownBase;
  cake.add(crown);
  layers.push({ obj: crown, baseY: crownBase, explodeY: crownBase + 3.9, spin: 1.2 });

  // ---- Cream ribbons
  const ribbons = new THREE.Group();
  const ribbonMat = new THREE.MeshPhysicalMaterial({
    color: C.cream, roughness: 0.35, sheen: 1, sheenColor: new THREE.Color(C.lavender), transparent: true, opacity: 0, side: THREE.DoubleSide,
  });
  for (let r = 0; r < 3; r++) {
    const pts: THREE.Vector3[] = [];
    for (let k = 0; k <= 60; k++) {
      const t = k / 60;
      const a = t * Math.PI * 4 + r * 2.1;
      const rad = 2.4 + Math.sin(t * Math.PI * 3 + r) * 0.4;
      pts.push(new THREE.Vector3(Math.cos(a) * rad, -1 + t * 5.5, Math.sin(a) * rad));
    }
    const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 240, 0.035 + r * 0.012, 10), ribbonMat);
    ribbons.add(tube);
  }
  scene.add(ribbons);

  // ---- Floating crumbs / cocoa particles
  const N = opts.mobile ? 350 : 900;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(N * 3);
  const pSeed = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const a = Math.random() * Math.PI * 2;
    const rad = 1.8 + Math.random() * 7;
    pPos[i * 3] = Math.cos(a) * rad;
    pPos[i * 3 + 1] = -1.5 + Math.random() * 8;
    pPos[i * 3 + 2] = Math.sin(a) * rad;
    pSeed[i] = Math.random();
  }
  pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
  const dotC = document.createElement("canvas");
  dotC.width = dotC.height = 64;
  const dg = dotC.getContext("2d")!;
  const grd = dg.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(255,240,225,1)");
  grd.addColorStop(1, "rgba(255,240,225,0)");
  dg.fillStyle = grd;
  dg.fillRect(0, 0, 64, 64);
  const dotTex = new THREE.CanvasTexture(dotC);
  const pMat = new THREE.PointsMaterial({ size: 0.06, map: dotTex, transparent: true, depthWrite: false, color: 0xe9c9b0, opacity: 0.75 });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  // ---- Collection (resolves into categories)
  const collection = new THREE.Group();
  scene.add(collection);
  const pastryMat = new THREE.MeshStandardMaterial({ color: 0xc98a4a, roughness: 0.55 });
  const cookieMat = new THREE.MeshStandardMaterial({ map: spongeTexture("#a8703f", "#3a1e10"), roughness: 0.85 });
  const pieMat = new THREE.MeshStandardMaterial({ color: 0xd6a36a, roughness: 0.7 });
  const fruitMat = new THREE.MeshPhysicalMaterial({ color: 0x8a2f45, roughness: 0.25, clearcoat: 1 });

  const mini = (build: (g: THREE.Group) => void) => {
    const g = new THREE.Group();
    build(g);
    g.traverse((o) => { if ((o as THREE.Mesh).isMesh) (o as THREE.Mesh).castShadow = true; });
    return g;
  };
  // croissant: bent stack of tapered tori segments
  const croissant = mini((g) => {
    for (let k = 0; k < 7; k++) {
      const s = 1 - Math.abs(k - 3) / 4.2;
      const seg = new THREE.Mesh(new THREE.SphereGeometry(0.28 * s + 0.08, 24, 16), pastryMat);
      const a = -1.1 + k * 0.37;
      seg.position.set(Math.cos(a) * 0.6, 0, Math.sin(a) * 0.6);
      seg.scale.set(0.8, 0.75, 1.1);
      seg.rotation.y = -a;
      g.add(seg);
    }
  });
  // cookie: textured disc with chocolate chunks
  const cookie = mini((g) => {
    const d = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.66, 0.16, 48), cookieMat);
    g.add(d);
    for (let k = 0; k < 9; k++) {
      const ch = new THREE.Mesh(new THREE.DodecahedronGeometry(0.07), ganache);
      const a = Math.random() * Math.PI * 2, rr = Math.random() * 0.55;
      ch.position.set(Math.cos(a) * rr, 0.09, Math.sin(a) * rr);
      g.add(ch);
    }
    g.rotation.x = 0.5;
  });
  // pie: crust + lattice + fruit
  const pie = mini((g) => {
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.6, 0.25, 48), pieMat));
    const f = new THREE.Mesh(new THREE.CylinderGeometry(0.66, 0.66, 0.05, 48), fruitMat);
    f.position.y = 0.11;
    g.add(f);
    for (let k = -2; k <= 2; k++) {
      [0, Math.PI / 2].forEach((rot) => {
        const bar = new THREE.Mesh(new THREE.BoxGeometry(1.3 - Math.abs(k) * 0.22, 0.04, 0.08), pieMat);
        bar.position.y = 0.15;
        bar.rotation.y = rot;
        bar.position[rot ? "x" : "z"] = k * 0.24;
        g.add(bar);
      });
    }
    const rim2 = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.07, 10, 48), pieMat);
    rim2.rotation.x = Math.PI / 2;
    rim2.position.y = 0.13;
    g.add(rim2);
    g.rotation.x = 0.35;
  });
  // éclair-ish pastry: glazed capsule
  const eclair = mini((g) => {
    const b = new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 0.9, 8, 24), pastryMat);
    b.rotation.z = Math.PI / 2;
    const top = new THREE.Mesh(new THREE.CapsuleGeometry(0.15, 0.85, 8, 24), lavGlaze);
    top.rotation.z = Math.PI / 2;
    top.position.y = 0.09;
    top.scale.set(1, 1, 0.9);
    g.add(b, top);
  });
  const minis = [croissant, cookie, pie, eclair];
  minis.forEach((m2, i) => {
    const a = (i / minis.length) * Math.PI * 2 + Math.PI / 4;
    m2.userData.target = new THREE.Vector3(Math.cos(a) * 3.4, 0.2 + (i % 2) * 0.5, Math.sin(a) * 3.4);
    m2.scale.setScalar(0.001);
    collection.add(m2);
  });

  // ---- State
  let progress = 0;
  const pointer = new THREE.Vector2();
  const smoothPointer = new THREE.Vector2();
  let sp = 0; // smoothed progress
  const clock = new THREE.Clock();
  let raf = 0;
  let visible = true;

  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
  io.observe(canvas);

  const camPos = new THREE.Vector3();
  const look = new THREE.Vector3();

  const tick = () => {
    raf = requestAnimationFrame(tick);
    if (!visible) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    sp += (progress - sp) * (1 - Math.exp(-6 * dt));
    smoothPointer.lerp(pointer, 1 - Math.exp(-3 * dt));
    const p = sp;

    // intro reveal over first ~2.5s
    const reveal = opts.reducedMotion ? 1 : ease(clamp01(t / 2.6));

    // Phases
    const approach = ease(range(p, 0, 0.22));
    const explode = ease(range(p, 0.2, 0.48)) * (1 - ease(range(p, 0.62, 0.78)));
    const ribbonsIn = ease(range(p, 0.38, 0.55)) * (1 - ease(range(p, 0.8, 0.92)));
    const collect = ease(range(p, 0.7, 0.95));

    // Camera path
    const orbit = (opts.reducedMotion ? 0 : t * 0.04) + p * Math.PI * 0.9;
    const dist = lerp(lerp(13, 9.5, reveal), 7.2, approach) + explode * 2.4 + collect * 4.2;
    const height = lerp(2.6, 1.6, approach) + explode * 1.8 + collect * 2.2;
    camPos.set(Math.sin(orbit) * dist, height, Math.cos(orbit) * dist);
    camPos.x += smoothPointer.x * 0.5;
    camPos.y += smoothPointer.y * 0.3;
    camera.position.copy(camPos);
    look.set(0, 0.5 + explode * 1.8 - collect * 0.3, 0);
    camera.lookAt(look);

    // Cake
    cake.rotation.y = (opts.reducedMotion ? 0 : t * 0.12) + approach * 0.8;
    cake.scale.setScalar(lerp(0.85, 1, reveal) * lerp(1, 0.62, collect));
    cake.position.y = lerp(-0.6, 0, reveal) + collect * 0.35;
    layers.forEach((l, i) => {
      l.obj.position.y = lerp(l.baseY, l.explodeY, explode);
      l.obj.rotation.y = l.spin * explode * 1.4;
      if (i === layers.length - 1) l.obj.position.y += Math.sin(t * 1.4) * 0.04 * (opts.reducedMotion ? 0 : 1);
    });
    halo.rotation.z = t * 0.6;

    // Ribbons
    ribbonMat.opacity = ribbonsIn * 0.9;
    ribbons.visible = ribbonsIn > 0.01;
    ribbons.rotation.y = -t * 0.15 - p * 3;
    ribbons.scale.setScalar(0.8 + ribbonsIn * 0.25);

    // Particles drift
    const pa = pGeo.attributes.position as THREE.BufferAttribute;
    if (!opts.reducedMotion) {
      for (let i = 0; i < N; i++) {
        let yy = pa.getY(i) + dt * (0.08 + pSeed[i] * 0.12);
        if (yy > 6.5) yy = -1.5;
        pa.setY(i, yy);
      }
      pa.needsUpdate = true;
    }
    particles.rotation.y = t * 0.02 + p * 1.5;
    pMat.opacity = (0.35 + explode * 0.5) * reveal;

    // Collection
    minis.forEach((m2, i) => {
      const k = ease(clamp01(collect * 1.6 - i * 0.15));
      const tgt = m2.userData.target as THREE.Vector3;
      m2.position.set(tgt.x * (0.4 + k * 0.6), tgt.y + (1 - k) * -1 + Math.sin(t + i) * 0.06, tgt.z * (0.4 + k * 0.6));
      m2.scale.setScalar(Math.max(0.001, k * 1.05));
      m2.rotation.y = t * 0.3 + i;
    });

    // Lighting / mood shift: darker → softer vanilla glow during collection
    key.intensity = lerp(40, 140, reveal) + collect * 30;
    rim.intensity = 40 + ribbonsIn * 30;
    bg.setHex(C.espresso).lerp(new THREE.Color(C.mocha), collect * 0.55);
    (scene.fog as THREE.Fog).color.copy(bg);

    renderer.render(scene, camera);
  };
  tick();

  return {
    setProgress: (v) => { progress = clamp01(v); },
    setPointer: (x, y2) => pointer.set(x, y2),
    dispose: () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      [spongeTex, dotTex, envTex].forEach((x) => x.dispose());
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
