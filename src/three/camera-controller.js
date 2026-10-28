import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * BAKERZ BITE - GSAP Scroll-Driven Cinematic Story Choreographer
 * Links scroll progress directly to 3D camera trajectory, exploded layer separation,
 * ribbons, particle dynamics, and editorial typography cards.
 */

export function initCinematicScrollController(bakeryScene) {
  const journeySection = document.querySelector('#cinematic-journey');
  if (!journeySection || !bakeryScene) return;

  const cards = document.querySelectorAll('.narrative-card');
  const progressLine = document.querySelector('.story-progress-indicator .progress-fill');
  const phaseStepDisplay = document.querySelector('.story-phase-counter .current-step');

  // Timeline scrubbed strictly to scroll progress
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: journeySection,
      start: 'top top',
      end: '+=400%',
      pin: true,
      scrub: 0.8,
      onUpdate: (self) => {
        bakeryScene.scrollProgress = self.progress;

        if (progressLine) {
          progressLine.style.transform = `scaleY(${self.progress})`;
        }

        // Update phase step indicator
        if (phaseStepDisplay) {
          const step = Math.min(4, Math.floor(self.progress * 4) + 1);
          phaseStepDisplay.textContent = `0${step}`;
        }
      }
    }
  });

  // State proxies for GSAP tweening
  const camPos = bakeryScene.cameraDefaultPos;
  const camTarget = bakeryScene.cameraTarget;
  const dessertRot = bakeryScene.heroDessert.group.rotation;

  // --- ACT 1: Introduction & Approach (0% - 25%) ---
  tl.to(camPos, {
    x: 0,
    y: 0.2,
    z: 5.2,
    ease: 'power1.inOut',
    duration: 1.0
  }, 0)
  .to(dessertRot, {
    y: Math.PI * 0.45,
    x: 0.08,
    ease: 'power1.inOut',
    duration: 1.0
  }, 0)
  .to('#card-phase-1', {
    opacity: 1,
    y: 0,
    duration: 0.4
  }, 0.1)
  .to('#card-phase-1', {
    opacity: 0,
    y: -30,
    duration: 0.3
  }, 0.85);

  // --- ACT 2: Exploded Anatomy Separation (25% - 55%) ---
  tl.to(camPos, {
    x: 1.8,
    y: 1.2,
    z: 4.8,
    ease: 'power1.inOut',
    duration: 1.2
  }, 1.0)
  .to(camTarget, {
    x: 0,
    y: 0.5,
    z: 0,
    ease: 'power1.inOut',
    duration: 1.2
  }, 1.0)
  .to(dessertRot, {
    y: Math.PI * 0.95,
    x: 0.14,
    ease: 'power1.inOut',
    duration: 1.2
  }, 1.0)
  .to({ progress: 0 }, {
    progress: 1.0,
    ease: 'power2.inOut',
    duration: 1.2,
    onUpdate: function () {
      bakeryScene.heroDessert.setExplosionProgress(this.targets()[0].progress);
    }
  }, 1.0)
  .to('#card-phase-2', {
    opacity: 1,
    y: 0,
    duration: 0.4
  }, 1.2)
  .to('#card-phase-2', {
    opacity: 0,
    y: -30,
    duration: 0.3
  }, 2.0);

  // --- ACT 3: Swirling Ribbons & Dynamic Macro Inspection (55% - 80%) ---
  tl.to(camPos, {
    x: -2.0,
    y: 0.8,
    z: 4.5,
    ease: 'power1.inOut',
    duration: 1.0
  }, 2.2)
  .to(dessertRot, {
    y: Math.PI * 1.6,
    x: 0.05,
    ease: 'power1.inOut',
    duration: 1.0
  }, 2.2)
  .to('#card-phase-3', {
    opacity: 1,
    y: 0,
    duration: 0.4
  }, 2.3)
  .to('#card-phase-3', {
    opacity: 0,
    y: -30,
    duration: 0.3
  }, 3.0);

  // --- ACT 4: Reunification & Transition to Four Worlds (80% - 100%) ---
  tl.to(camPos, {
    x: 0,
    y: 0.7,
    z: 6.4,
    ease: 'power2.out',
    duration: 1.0
  }, 3.2)
  .to(camTarget, {
    x: 0,
    y: 0.1,
    z: 0,
    ease: 'power2.out',
    duration: 1.0
  }, 3.2)
  .to(dessertRot, {
    y: Math.PI * 2.0,
    x: 0.0,
    ease: 'power2.out',
    duration: 1.0
  }, 3.2)
  .to({ progress: 1.0 }, {
    progress: 0.0,
    ease: 'power2.inOut',
    duration: 0.9,
    onUpdate: function () {
      bakeryScene.heroDessert.setExplosionProgress(this.targets()[0].progress);
    }
  }, 3.2)
  .to('#card-phase-4', {
    opacity: 1,
    y: 0,
    duration: 0.4
  }, 3.3)
  .to('#card-phase-4', {
    opacity: 0,
    y: -20,
    duration: 0.3
  }, 3.9);

  return tl;
}
