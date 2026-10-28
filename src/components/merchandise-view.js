import { MERCHANDISE, MERCH_CATEGORIES } from '../data/merchandise.js';
import { getMerchandisePlaceholderSVG } from './placeholder-svg.js';

/**
 * BAKERZ BITE - Boutique Lifestyle Merchandise View
 * Tableware, carrywear, fluted glassware, and solid walnut serving boards.
 */

export class MerchandiseView {
  constructor(cartDrawer) {
    this.cartDrawer = cartDrawer;
    this.activeCategory = 'all';

    this.gridEl = document.querySelector('#merchandise-grid');
    this.filtersContainer = document.querySelector('#merchandise-category-filters');

    this.init();
  }

  init() {
    this.renderFilters();
    this.renderItems();
  }

  renderFilters() {
    if (!this.filtersContainer) return;
    this.filtersContainer.innerHTML = MERCH_CATEGORIES.map(cat => `
      <button type="button" class="filter-chip ${cat.id === this.activeCategory ? 'is-active' : ''}" data-merch-cat="${cat.id}">
        ${cat.name}
      </button>
    `).join('');

    this.filtersContainer.querySelectorAll('.filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeCategory = btn.dataset.merchCat;
        this.updateFilterButtons();
        this.renderItems();
      });
    });
  }

  updateFilterButtons() {
    if (!this.filtersContainer) return;
    this.filtersContainer.querySelectorAll('.filter-chip').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.merchCat === this.activeCategory);
    });
  }

  getFilteredItems() {
    if (this.activeCategory === 'all') return MERCHANDISE;
    return MERCHANDISE.filter(m => m.category === this.activeCategory);
  }

  renderItems() {
    if (!this.gridEl) return;
    const items = this.getFilteredItems();

    this.gridEl.innerHTML = items.map(m => `
      <div class="merch-card" data-id="${m.id}">
        <div class="merch-card-media">
          <span class="merch-card-badge">${m.badge}</span>
          ${getMerchandisePlaceholderSVG(m.svgTheme, m.imageLabel, m.name, m.material)}
        </div>
        <div class="merch-card-info">
          <div class="merch-meta">
            <span class="merch-category">${m.categoryName}</span>
            <span class="merch-origin">${m.origin}</span>
          </div>
          <h3 class="merch-title">${m.name}</h3>
          <p class="merch-desc">${m.description}</p>
          
          <div class="merch-specs">
            <div class="spec-line"><span>Dimensions:</span> <strong>${m.dimensions}</strong></div>
            <div class="spec-line"><span>Care:</span> <strong>${m.care}</strong></div>
          </div>

          <div class="merch-bottom-bar">
            <div class="merch-price">PKR ${m.price.toLocaleString()}</div>
            <button type="button" class="btn-primary btn-add-merch" data-id="${m.id}">
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    `).join('');

    this.gridEl.querySelectorAll('.btn-add-merch').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = MERCHANDISE.find(m => m.id === btn.dataset.id);
        if (item && this.cartDrawer) {
          this.cartDrawer.addItem(item, 1);
        }
      });
    });
  }
}
