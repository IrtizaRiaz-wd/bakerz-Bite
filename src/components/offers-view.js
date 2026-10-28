import { SPECIAL_OFFERS } from '../data/offers.js';
import { getProductPlaceholderSVG } from './placeholder-svg.js';

/**
 * BAKERZ BITE - Special Offers & Curated Packages
 */

export class OffersView {
  constructor(cartDrawer) {
    this.cartDrawer = cartDrawer;
    this.containerEl = document.querySelector('#offers-container');

    this.init();
  }

  init() {
    this.render();
  }

  render() {
    if (!this.containerEl) return;

    this.containerEl.innerHTML = SPECIAL_OFFERS.map(offer => `
      <div class="offer-card" data-id="${offer.id}">
        <div class="offer-visual-pane">
          <div class="offer-badge-pill">${offer.badge}</div>
          ${getProductPlaceholderSVG(offer.svgTheme, offer.imageLabel, offer.title, 'CURATED SUITE')}
        </div>
        <div class="offer-content-pane">
          <div class="offer-validity-tag">
            <span class="pulse-indicator"></span>
            <span>${offer.validity}</span>
          </div>

          <h3 class="offer-title">${offer.title}</h3>
          <p class="offer-subtitle">${offer.subtitle}</p>

          <p class="offer-description">${offer.description}</p>

          <div class="offer-includes-box">
            <h4 class="includes-heading">Ensemble Includes:</h4>
            <ul class="includes-list">
              ${offer.includes.map(inc => `<li><span class="inc-bullet">✦</span> ${inc}</li>`).join('')}
            </ul>
          </div>

          <div class="offer-pricing-row">
            <div class="offer-prices">
              <span class="offer-current-price">PKR ${offer.offerPrice.toLocaleString()}</span>
              <span class="offer-original-price">PKR ${offer.originalPrice.toLocaleString()}</span>
              <span class="offer-savings-tag">${offer.savingsText}</span>
            </div>
            <button type="button" class="btn-primary btn-claim-offer" data-id="${offer.id}">
              Reserve Suite
            </button>
          </div>
        </div>
      </div>
    `).join('');

    this.containerEl.querySelectorAll('.btn-claim-offer').forEach(btn => {
      btn.addEventListener('click', () => {
        const offer = SPECIAL_OFFERS.find(o => o.id === btn.dataset.id);
        if (offer && this.cartDrawer) {
          this.cartDrawer.addItem({
            id: offer.id,
            name: offer.title,
            price: offer.offerPrice,
            categoryName: 'Special Offer'
          }, 1);
        }
      });
    });
  }
}
