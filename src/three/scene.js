import * as THREE from 'three';
import { createBakeryMaterials } from './materials.js';
import { createHeroDessert, createPastryModel, createCookieModel, createPieModel } from './dessert.js';
import { createBakeryParticleSystem } from './particles.js';
import { createFlowingRibbons } from './ribbons.js';

/**
 * BAKERZ BITE - Master 3D Scene Controller
 * Coordinates the Three.js canvas, lighting, camera, shaders, and procedural subjects.
 */

export class BakeryScene {
  constructor(canvasContainer) {
    this.container = canvasContainer;
    this.width = this.container.clientWidth || window.innerWidth;
    this.height = this.container.clientHeight || window.innerHeight;

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scrollProgress = 0;
    this.scrollVelocity = 0;
    this.lastScrollY = window.scrollY;
    this.currentCategory = 'cakes';

    this.init();
  }

  init() {
    // 1. Scene & Atmospheric Fog
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1F1612); // Deep Espresso
    this.scene.fog = new THREE.FogExp2(0x1F1612, 0.085);

    // 2. Camera Setup
    this.camera = new THREE.PerspectiveCamera(38, this.width / this.height, 0.1, 100);
    this.cameraDefaultPos = new THREE.Vector3(0, 0.6, 7.2);
    this.camera.position.copy(this.cameraDefaultPos);
    this.cameraTarget = new THREE.Vector3(0, 0.1, 0);
    this.camera.lookAt(this.cameraTarget);

    // 3. WebGL Renderer with High-Performance Config
    try {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      console.error('[BakerzBite] WebGL initialization failed:', e);
      this.renderFallback();
      return;
    }

    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.appendChild(this.renderer.domElement);

    // 4. Lighting Rig
    this.setupLighting();

    // 5. Materials & Scene Objects
    this.materials = createBakeryMaterials();

    // Hero Dessert (L'Éclipse Noire Entremet with exploded layers)
    this.heroDessert = createHeroDessert(this.materials);
    this.scene.add(this.heroDessert.group);

    // 4 Worlds Category Showcase 3D Models
    this.pastryModel = createPastryModel(this.materials);
    this.pastryModel.position.set(0, 0.2, 0);
    this.pastryModel.visible = false;
    this.scene.add(this.pastryModel);

    this.cookieModel = createCookieModel(this.materials);
    this.cookieModel.position.set(0, 0.1, 0);
    this.cookieModel.visible = false;
    this.scene.add(this.cookieModel);

    this.pieModel = createPieModel(this.materials);
    this.pieModel.position.set(0, 0.05, 0);
    this.pieModel.visible = false;
    this.scene.add(this.pieModel);

    // Dynamic Flowing Ribbons
    this.ribbons = createFlowingRibbons();
    this.scene.add(this.ribbons.group);

    // Atmospheric Crumbs & Golden Particles
    this.particles = createBakeryParticleSystem(420);
    this.scene.add(this.particles.group);

    // 6. Event Listeners
    this.bindEvents();

    // 7. Render Loop
    this.clock = new THREE.Clock();
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.animate();
  }

  setupLighting() {
    // Ambient Warm Glow
    this.ambientLight = new THREE.AmbientLight(0x422B1E, 0.9);
    this.scene.add(this.ambientLight);

    // Key Light: Warm Golden Patisserie Spotlight
    this.keyLight = new THREE.SpotLight(0xFFF1DD, 4.2);
    this.keyLight.position.set(3.5, 5.5, 4.0);
    this.keyLight.angle = 0.55;
    this.keyLight.penumbra = 0.8;
    this.keyLight.castShadow = true;
    this.keyLight.shadow.mapSize.width = 1024;
    this.keyLight.shadow.mapSize.height = 1024;
    this.keyLight.shadow.bias = -0.0005;
    this.scene.add(this.keyLight);

    // Rim / Edge Light: Platinum Cool Sheen catching the mirror glaze
    this.rimLight = new THREE.DirectionalLight(0xE2D8F0, 2.8);
    this.rimLight.position.set(-4.0, 3.0, -3.5);
    this.scene.add(this.rimLight);

    // Fill Light: Rich Mocha Bounce
    this.fillLight = new THREE.DirectionalLight(0x8C5E43, 1.4);
    this.fillLight.position.set(-3.0, -1.0, 3.0);
    this.scene.add(this.fillLight);

    // Accent Under-Glow Point Light for the turntable base
    this.accentPoint = new THREE.PointLight(0xD4AF37, 1.8, 8);
    this.accentPoint.position.set(0, -0.8, 1.8);
    this.scene.add(this.accentPoint);
  }

  bindEvents() {
    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  onResize() {
    this.width = this.container.clientWidth || window.innerWidth;
    this.height = this.container.clientHeight || window.innerHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  }

  onMouseMove(e) {
    if (this.isReducedMotion) return;
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = -(e.clientY / window.innerHeight) * 2 + 1;
    this.mouse.targetX = nx * 0.45;
    this.mouse.targetY = ny * 0.35;
  }

  /**
   * Switch active 3D model when interacting with the Four Signature Worlds
   */
  setCategorySubject(cat) {
    this.currentCategory = cat;
    const isCakes = cat === 'cakes' || cat === 'all';
    const isPastries = cat === 'pastries';
    const isCookies = cat === 'cookies';
    const isPies = cat === 'pies';

    this.heroDessert.group.visible = isCakes;
    this.pastryModel.visible = isPastries;
    this.cookieModel.visible = isCookies;
    this.pieModel.visible = isPies;

    // Adjust light warmth based on world
    if (isPastries) {
      this.keyLight.color.setHex(0xFFE2B8); // Warm buttery gold
      this.rimLight.color.setHex(0xFFF4DE);
    } else if (isCookies) {
      this.keyLight.color.setHex(0xE0AC69); // Caramel amber
      this.rimLight.color.setHex(0xD4AF37);
    } else if (isPies) {
      this.keyLight.color.setHex(0xFCE6C9); // Soft vanilla
      this.rimLight.color.setHex(0xE7DFF2);
    } else {
      this.keyLight.color.setHex(0xFFF1DD); // Signature mocha-espresso
      this.rimLight.color.setHex(0xE2D8F0);
    }
  }

  renderFallback() {
    this.container.innerHTML = `
      <div class="webgl-fallback-container">
        <div class="fallback-content">
          <span class="fallback-badge">BAKERZ BITE HAUTE PÂTISSERIE</span>
          <h2>An Immersive Culinary World</h2>
          <p>WebGL hardware acceleration is paused or unsupported. All bakery catalogues, menus, and reservations remain fully interactive below.</p>
        </div>
      </div>
    `;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Smooth mouse parallax lerp
    this.mouse.x = THREE.MathUtils.lerp(this.mouse.x, this.mouse.targetX, 0.05);
    this.mouse.y = THREE.MathUtils.lerp(this.mouse.y, this.mouse.targetY, 0.05);

    // Calculate scroll velocity for dynamic particle swirl
    const currentScrollY = window.scrollY;
    this.scrollVelocity = (currentScrollY - this.lastScrollY) * 0.02;
    this.lastScrollY = currentScrollY;

    // Subtle gentle idle rotation if reduced-motion is not requested
    if (!this.isReducedMotion) {
      if (this.heroDessert.group.visible) {
        this.heroDessert.group.rotation.y += 0.0025;
      }
      if (this.pastryModel.visible) {
        this.pastryModel.rotation.y += 0.003;
      }
      if (this.cookieModel.visible) {
        this.cookieModel.rotation.y += 0.003;
      }
      if (this.pieModel.visible) {
        this.pieModel.rotation.y += 0.002;
      }
    }

    // Parallax camera displacement
    this.camera.position.x = this.cameraDefaultPos.x + this.mouse.x;
    this.camera.position.y = this.cameraDefaultPos.y + this.mouse.y;
    this.camera.lookAt(this.cameraTarget);

    // Update particles & flowing ribbons
    if (this.particles) {
      this.particles.update(elapsedTime, this.scrollVelocity);
    }
    if (this.ribbons) {
      this.ribbons.update(elapsedTime, this.scrollProgress);
    }

    this.renderer.render(this.scene, this.camera);
  }
}
