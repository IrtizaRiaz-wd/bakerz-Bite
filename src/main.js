import { BakeryScene } from './three/scene.js';
import { initCinematicScrollController } from './three/camera-controller.js';
import { initLiveTicker } from './components/ticker.js';
import { AmbientSoundscape } from './components/audio-ambient.js';
import { initNavigation } from './components/navigation.js';
import { CartDrawer } from './components/cart-drawer.js';
import { ProductModal } from './components/product-modal.js';
import { CatalogView } from './components/catalog-view.js';
import { MerchandiseView } from './components/merchandise-view.js';
import { OffersView } from './components/offers-view.js';
import { GalleryView } from './components/gallery-view.js';
import { ReviewsView } from './components/reviews-view.js';
import { FAQView } from './components/faq-view.js';

/**
 * BAKERZ BITE - Main Application Entry Point
 * Orchestrates 3D WebGL scene, GSAP scroll choreography, and modular UI components.
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c✦ BAKERZ BITE HAUTE PÂTISSERIE ✦%c\nImmersive 3D Experience initialized in Karachi, Pakistan.',
    'color: #D4AF37; font-size: 16px; font-weight: bold; font-family: serif;',
    'color: #E7DFF2; font-size: 12px;'
  );

  // 1. Initialize Three.js Scene
  const canvasContainer = document.querySelector('#hero-canvas-container');
  let bakeryScene = null;

  if (canvasContainer) {
    try {
      bakeryScene = new BakeryScene(canvasContainer);
    } catch (err) {
      console.warn('[BakerzBite] Failed to start WebGL scene:', err);
    }
  }

  // 2. Initialize GSAP Scroll Choreographer
  if (bakeryScene) {
    initCinematicScrollController(bakeryScene);
  }

  // 3. Initialize Demonstration Cart & Product Details Modal
  const cartDrawer = new CartDrawer();
  const productModal = new ProductModal(cartDrawer);

  // 4. Initialize Product Catalogue
  const catalogView = new CatalogView(productModal, cartDrawer, bakeryScene);

  // 5. Initialize Four Worlds Cards Interaction
  const worldCards = document.querySelectorAll('.world-card');
  worldCards.forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.dataset.category;
      if (cat) {
        // Update 3D scene subject and lighting
        if (bakeryScene) {
          bakeryScene.setCategorySubject(cat);
        }

        // Highlight card
        worldCards.forEach(c => c.classList.remove('is-selected'));
        card.classList.add('is-selected');

        // Filter catalogue and scroll smoothly down to it
        if (catalogView) {
          catalogView.activeCategory = cat;
          catalogView.updateFilterButtonsState();
          catalogView.filterAndRender();

          const catalogSection = document.querySelector('#catalogue');
          if (catalogSection) {
            catalogSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') card.click();
    });
  });

  // 6. Initialize Boutique Merchandise
  new MerchandiseView(cartDrawer);

  // 7. Initialize Special Offers
  new OffersView(cartDrawer);

  // 8. Initialize Editorial Gallery & Lightbox
  new GalleryView();

  // 9. Initialize Reviews & Community Score
  new ReviewsView();

  // 10. Initialize FAQ Accordion
  new FAQView();

  // 11. Initialize Live Karachi Ticker & Real-Time Clock
  initLiveTicker();

  // 12. Initialize Ambient Web Audio Soundscape & Navigation
  const soundscape = new AmbientSoundscape();
  initNavigation(soundscape);

  // 13. Smooth scrolling for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});
