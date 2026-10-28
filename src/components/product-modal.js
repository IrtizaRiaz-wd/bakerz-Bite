import { getProductPlaceholderSVG } from './placeholder-svg.js';

/**
 * BAKERZ BITE - Accessible Product Details Modal
 * Features:
 * - Keyboard trap and Escape-key closing
 * - Backdrop click to close
 * - ARIA role="dialog", aria-modal="true"
 * - Detailed ingredients breakdown, allergens, tasting notes, and quantity picker
 * - Add to Demonstration Bag integration
 */

export class ProductModal {
  constructor(cartDrawer) {
    this.cartDrawer = cartDrawer;
    this.modalEl = document.querySelector('#product-detail-modal');
    this.contentEl = document.querySelector('#product-modal-content');
    this.closeBtn = document.querySelector('#product-modal-close-btn');
    this.backdropEl = document.querySelector('#product-modal-backdrop');
    this.isOpen = false;
    this.currentProduct = null;
    this.selectedQuantity = 1;
    this.previouslyFocusedElement = null;

    this.init();
  }

  init() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
    if (this.backdropEl) {
      this.backdropEl.addEventListener('click', () => this.close());
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  open(product) {
    if (!this.modalEl || !product) return;
    this.currentProduct = product;
    this.selectedQuantity = 1;
    this.previouslyFocusedElement = document.activeElement;

    this.render();

    this.modalEl.classList.add('is-open');
    this.modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    this.isOpen = true;

    // Focus close button for accessibility
    setTimeout(() => {
      if (this.closeBtn) this.closeBtn.focus();
    }, 100);
  }

  close() {
    if (!this.modalEl) return;
    this.modalEl.classList.remove('is-open');
    this.modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    this.isOpen = false;

    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
    }
  }

  render() {
    const p = this.currentProduct;
    if (!this.contentEl || !p) return;

    const svgVisual = getProductPlaceholderSVG(p.svgTheme, p.imageLabel, p.name, p.categoryName);

    this.contentEl.innerHTML = `
      <div class="modal-grid">
        <div class="modal-visual-column">
          ${svgVisual}
        </div>
        <div class="modal-info-column">
          <div class="modal-meta-row">
            <span class="modal-category-tag">${p.categoryName}</span>
            <span class="modal-badge-tag">${p.badge}</span>
            <div class="modal-rating">
              <span class="stars-gold">★★★★★</span>
              <span class="rating-val">${p.rating}</span>
              <span class="reviews-count">(${p.reviewsCount} verified reviews)</span>
            </div>
          </div>

          <h2 class="modal-title" id="product-modal-title">${p.name}</h2>
          <p class="modal-tagline">${p.tagline}</p>
          <div class="modal-price">PKR ${p.price.toLocaleString()}</div>

          <p class="modal-description">${p.description}</p>

          <div class="modal-section-group">
            <h4 class="modal-subheading">Tasting Notes</h4>
            <div class="modal-tasting-chips">
              ${p.tastingNotes.map(note => `<span class="tasting-chip">${note}</span>`).join('')}
            </div>
          </div>

          <div class="modal-section-group">
            <h4 class="modal-subheading">Artisanal Ingredients</h4>
            <ul class="modal-ingredients-list">
              ${p.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
          </div>

          <div class="modal-details-table">
            <div class="table-row">
              <span class="label">Allergens:</span>
              <span class="val">${p.allergens.join(', ')}</span>
            </div>
            <div class="table-row">
              <span class="label">Dietary:</span>
              <span class="val">${p.dietary}</span>
            </div>
            <div class="table-row">
              <span class="label">Preparation:</span>
              <span class="val">${p.prepTime}</span>
            </div>
            <div class="table-row">
              <span class="label">Serving:</span>
              <span class="val">${p.servingSuggestion}</span>
            </div>
          </div>

          <div class="modal-actions-bar">
            <div class="modal-qty-selector">
              <button type="button" class="qty-btn" id="modal-qty-minus" aria-label="Decrease quantity">−</button>
              <span class="qty-display" id="modal-qty-val">1</span>
              <button type="button" class="qty-btn" id="modal-qty-plus" aria-label="Increase quantity">+</button>
            </div>
            <button type="button" class="btn-primary btn-add-bag" id="modal-add-to-bag-btn">
              <span>ADD TO DEMONSTRATION BAG</span>
              <span class="btn-price-preview" id="modal-total-price">PKR ${p.price.toLocaleString()}</span>
            </button>
          </div>
        </div>
      </div>
    `;

    // Bind Quantity Buttons
    const qtyMinus = this.contentEl.querySelector('#modal-qty-minus');
    const qtyPlus = this.contentEl.querySelector('#modal-qty-plus');
    const qtyVal = this.contentEl.querySelector('#modal-qty-val');
    const totalPricePreview = this.contentEl.querySelector('#modal-total-price');
    const addBagBtn = this.contentEl.querySelector('#modal-add-to-bag-btn');

    if (qtyMinus && qtyPlus && qtyVal) {
      qtyMinus.addEventListener('click', () => {
        if (this.selectedQuantity > 1) {
          this.selectedQuantity -= 1;
          qtyVal.textContent = this.selectedQuantity;
          totalPricePreview.textContent = `PKR ${(p.price * this.selectedQuantity).toLocaleString()}`;
        }
      });
      qtyPlus.addEventListener('click', () => {
        this.selectedQuantity += 1;
        qtyVal.textContent = this.selectedQuantity;
        totalPricePreview.textContent = `PKR ${(p.price * this.selectedQuantity).toLocaleString()}`;
      });
    }

    if (addBagBtn) {
      addBagBtn.addEventListener('click', () => {
        if (this.cartDrawer) {
          this.cartDrawer.addItem(p, this.selectedQuantity);
        }
        this.close();
      });
    }
  }
}
