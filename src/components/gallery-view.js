import { GALLERY_ITEMS, GALLERY_CATEGORIES } from '../data/gallery.js';
import { getGalleryPlaceholderSVG } from './placeholder-svg.js';

/**
 * BAKERZ BITE - Editorial Gallery & Accessible Lightbox
 * Features:
 * - Masonry/editorial layout
 * - Category filter chips
 * - Full-screen lightbox with prev/next controls, counter, and keyboard support (ArrowLeft, ArrowRight, Escape)
 */

export class GalleryView {
  constructor() {
    this.activeCategory = 'All';
    this.currentLightboxIndex = 0;
    this.lightboxOpen = false;

    this.gridEl = document.querySelector('#gallery-grid');
    this.filtersEl = document.querySelector('#gallery-filters');
    this.lightboxEl = document.querySelector('#gallery-lightbox-modal');
    this.lightboxContent = document.querySelector('#lightbox-media-container');
    this.lightboxCaption = document.querySelector('#lightbox-caption-text');
    this.lightboxCounter = document.querySelector('#lightbox-counter-badge');
    this.lightboxPrev = document.querySelector('#lightbox-btn-prev');
    this.lightboxNext = document.querySelector('#lightbox-btn-next');
    this.lightboxClose = document.querySelector('#lightbox-btn-close');

    this.init();
  }

  init() {
    this.renderFilters();
    this.renderGrid();
    this.bindLightboxEvents();
  }

  renderFilters() {
    if (!this.filtersEl) return;
    this.filtersEl.innerHTML = GALLERY_CATEGORIES.map(cat => `
      <button type="button" class="filter-chip ${cat === this.activeCategory ? 'is-active' : ''}" data-gal-cat="${cat}">
        ${cat}
      </button>
    `).join('');

    this.filtersEl.querySelectorAll('.filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeCategory = btn.dataset.galCat;
        this.updateFilterButtons();
        this.renderGrid();
      });
    });
  }

  updateFilterButtons() {
    if (!this.filtersEl) return;
    this.filtersEl.querySelectorAll('.filter-chip').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.galCat === this.activeCategory);
    });
  }

  getFilteredItems() {
    if (this.activeCategory === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter(item => item.category === this.activeCategory);
  }

  renderGrid() {
    if (!this.gridEl) return;
    const items = this.getFilteredItems();

    this.gridEl.innerHTML = items.map((item, idx) => `
      <div class="gallery-tile tile-${item.aspectRatio}" data-index="${idx}" tabindex="0">
        <div class="gallery-tile-inner">
          ${getGalleryPlaceholderSVG(item.svgTheme, item.imageLabel, item.title, item.tag)}
          <div class="gallery-tile-overlay">
            <span class="gallery-tag">${item.tag}</span>
            <h4 class="gallery-title">${item.title}</h4>
            <p class="gallery-caption-preview">${item.caption}</p>
            <div class="gallery-expand-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M15 3h6v6"></path>
                <path d="M9 21H3v-6"></path>
                <path d="M21 3l-7 7"></path>
                <path d="M3 21l7-7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    this.gridEl.querySelectorAll('.gallery-tile').forEach((tile, index) => {
      tile.addEventListener('click', () => this.openLightbox(index));
      tile.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.openLightbox(index);
      });
    });
  }

  bindLightboxEvents() {
    if (this.lightboxClose) {
      this.lightboxClose.addEventListener('click', () => this.closeLightbox());
    }
    if (this.lightboxPrev) {
      this.lightboxPrev.addEventListener('click', () => this.stepLightbox(-1));
    }
    if (this.lightboxNext) {
      this.lightboxNext.addEventListener('click', () => this.stepLightbox(1));
    }

    if (this.lightboxEl) {
      this.lightboxEl.addEventListener('click', (e) => {
        if (e.target === this.lightboxEl) this.closeLightbox();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (!this.lightboxOpen) return;
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft') this.stepLightbox(-1);
      if (e.key === 'ArrowRight') this.stepLightbox(1);
    });
  }

  openLightbox(index) {
    if (!this.lightboxEl) return;
    this.currentLightboxIndex = index;
    this.lightboxOpen = true;

    this.updateLightboxContent();

    this.lightboxEl.classList.add('is-open');
    this.lightboxEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (this.lightboxClose) this.lightboxClose.focus();
  }

  closeLightbox() {
    if (!this.lightboxEl) return;
    this.lightboxOpen = false;
    this.lightboxEl.classList.remove('is-open');
    this.lightboxEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  stepLightbox(delta) {
    const items = this.getFilteredItems();
    if (items.length === 0) return;
    this.currentLightboxIndex = (this.currentLightboxIndex + delta + items.length) % items.length;
    this.updateLightboxContent();
  }

  updateLightboxContent() {
    const items = this.getFilteredItems();
    const item = items[this.currentLightboxIndex];
    if (!item) return;

    if (this.lightboxContent) {
      this.lightboxContent.innerHTML = getGalleryPlaceholderSVG(item.svgTheme, item.imageLabel, item.title, item.tag);
    }

    if (this.lightboxCaption) {
      this.lightboxCaption.innerHTML = `
        <span class="caption-cat">${item.category} • ${item.tag}</span>
        <h3 class="caption-title">${item.title}</h3>
        <p class="caption-desc">${item.caption}</p>
      `;
    }

    if (this.lightboxCounter) {
      this.lightboxCounter.textContent = `${this.currentLightboxIndex + 1} / ${items.length}`;
    }
  }
}
