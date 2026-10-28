import { PRODUCTS, CATEGORIES } from '../data/products.js';
import { getProductPlaceholderSVG } from './placeholder-svg.js';

/**
 * BAKERZ BITE - Product Catalogue Controller
 * Manages category filtering, search input, price/rating sorting, and product rendering.
 */

export class CatalogView {
  constructor(productModal, cartDrawer, bakeryScene) {
    this.productModal = productModal;
    this.cartDrawer = cartDrawer;
    this.bakeryScene = bakeryScene;

    this.activeCategory = 'all';
    this.searchQuery = '';
    this.sortBy = 'featured';

    this.gridEl = document.querySelector('#catalog-grid');
    this.filterBtnsContainer = document.querySelector('#catalog-category-filters');
    this.searchInput = document.querySelector('#catalog-search-input');
    this.sortSelect = document.querySelector('#catalog-sort-select');
    this.countBadge = document.querySelector('#catalog-count-badge');

    this.init();
  }

  init() {
    this.renderCategoryButtons();
    this.bindEvents();
    this.filterAndRender();
  }

  renderCategoryButtons() {
    if (!this.filterBtnsContainer) return;
    this.filterBtnsContainer.innerHTML = CATEGORIES.map(cat => `
      <button type="button" class="filter-chip ${cat.id === this.activeCategory ? 'is-active' : ''}" data-category="${cat.id}">
        <span class="chip-name">${cat.name}</span>
        <span class="chip-count">${cat.count}</span>
      </button>
    `).join('');

    this.filterBtnsContainer.querySelectorAll('.filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeCategory = btn.dataset.category;
        this.updateFilterButtonsState();
        this.filterAndRender();

        // Inform 3D Scene to synchronize lighting and category subject if relevant
        if (this.bakeryScene && this.activeCategory !== 'all') {
          this.bakeryScene.setCategorySubject(this.activeCategory);
        }
      });
    });
  }

  updateFilterButtonsState() {
    if (!this.filterBtnsContainer) return;
    this.filterBtnsContainer.querySelectorAll('.filter-chip').forEach(btn => {
      if (btn.dataset.category === this.activeCategory) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    });
  }

  bindEvents() {
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.filterAndRender();
      });
    }

    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', (e) => {
        this.sortBy = e.target.value;
        this.filterAndRender();
      });
    }
  }

  getFilteredProducts() {
    return PRODUCTS.filter(p => {
      // Category match
      const matchesCat = this.activeCategory === 'all' || p.category === this.activeCategory;

      // Search match in name, description, ingredients, or tasting notes
      const matchesSearch = !this.searchQuery ||
        p.name.toLowerCase().includes(this.searchQuery) ||
        p.description.toLowerCase().includes(this.searchQuery) ||
        p.ingredients.some(ing => ing.toLowerCase().includes(this.searchQuery)) ||
        p.tastingNotes.some(tn => tn.toLowerCase().includes(this.searchQuery));

      return matchesCat && matchesSearch;
    }).sort((a, b) => {
      if (this.sortBy === 'price-low') {
        return a.price - b.price;
      } else if (this.sortBy === 'price-high') {
        return b.price - a.price;
      } else if (this.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0; // featured / default order
    });
  }

  filterAndRender() {
    if (!this.gridEl) return;
    const items = this.getFilteredProducts();

    if (this.countBadge) {
      this.countBadge.textContent = `${items.length} ${items.length === 1 ? 'Confection' : 'Confections'}`;
    }

    if (items.length === 0) {
      this.gridEl.innerHTML = `
        <div class="catalog-empty-search">
          <p class="empty-query">No confections match "<strong>${this.searchQuery}</strong>" in ${this.activeCategory.toUpperCase()}</p>
          <button type="button" class="btn-secondary" id="btn-reset-filters">Reset Filters</button>
        </div>
      `;
      const resetBtn = this.gridEl.querySelector('#btn-reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.activeCategory = 'all';
          this.searchQuery = '';
          if (this.searchInput) this.searchInput.value = '';
          this.updateFilterButtonsState();
          this.filterAndRender();
        });
      }
      return;
    }

    this.gridEl.innerHTML = items.map(p => `
      <article class="product-card" data-id="${p.id}" tabindex="0">
        <div class="product-card-media">
          <div class="product-card-badge">${p.badge}</div>
          ${getProductPlaceholderSVG(p.svgTheme, p.imageLabel, p.name, p.categoryName)}
          <div class="product-card-hover-actions">
            <button type="button" class="card-action-btn btn-view-details" data-id="${p.id}">
              <span>View Details</span>
            </button>
            <button type="button" class="card-action-btn btn-quick-add" data-id="${p.id}" aria-label="Add ${p.name} to bag">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="product-card-body">
          <div class="card-top-row">
            <span class="card-category">${p.categoryName}</span>
            <div class="card-rating">
              <span class="star-icon">★</span>
              <span>${p.rating}</span>
            </div>
          </div>
          <h3 class="card-title">${p.name}</h3>
          <p class="card-excerpt">${p.tagline}</p>
          <div class="card-bottom-row">
            <div class="card-price">PKR ${p.price.toLocaleString()}</div>
            <button type="button" class="btn-card-link btn-view-details" data-id="${p.id}">
              Details →
            </button>
          </div>
        </div>
      </article>
    `).join('');

    // Attach click listeners to cards and buttons
    this.gridEl.querySelectorAll('.btn-view-details').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const p = PRODUCTS.find(item => item.id === btn.dataset.id);
        if (p && this.productModal) this.productModal.open(p);
      });
    });

    this.gridEl.querySelectorAll('.btn-quick-add').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const p = PRODUCTS.find(item => item.id === btn.dataset.id);
        if (p && this.cartDrawer) this.cartDrawer.addItem(p, 1);
      });
    });

    this.gridEl.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('button')) return;
        const p = PRODUCTS.find(item => item.id === card.dataset.id);
        if (p && this.productModal) this.productModal.open(p);
      });
    });
  }
}
