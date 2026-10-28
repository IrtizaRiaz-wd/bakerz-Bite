import { FAQ_ITEMS } from '../data/faq.js';

/**
 * BAKERZ BITE - Accessible Animated FAQ Accordion
 * Features:
 * - WAI-ARIA compliance (aria-expanded, aria-controls, role="region")
 * - Keyboard support (Enter, Space)
 * - Smooth CSS height expansion
 */

export class FAQView {
  constructor() {
    this.containerEl = document.querySelector('#faq-accordion-container');
    this.init();
  }

  init() {
    if (!this.containerEl) return;

    this.containerEl.innerHTML = FAQ_ITEMS.map((item, idx) => `
      <div class="faq-accordion-item" data-id="${item.id}">
        <button type="button" class="faq-question-btn" id="faq-btn-${idx}" aria-expanded="false" aria-controls="faq-panel-${idx}">
          <span class="faq-category-mini">${item.category}</span>
          <span class="faq-question-text">${item.question}</span>
          <span class="faq-icon-indicator" aria-hidden="true">+</span>
        </button>
        <div class="faq-answer-panel" id="faq-panel-${idx}" role="region" aria-labelledby="faq-btn-${idx}" hidden>
          <div class="faq-answer-inner">
            <p>${item.answer.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      </div>
    `).join('');

    this.containerEl.querySelectorAll('.faq-question-btn').forEach(btn => {
      btn.addEventListener('click', () => this.toggleItem(btn));
    });
  }

  toggleItem(button) {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    const panelId = button.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
    const indicator = button.querySelector('.faq-icon-indicator');

    if (isExpanded) {
      button.setAttribute('aria-expanded', 'false');
      panel.hidden = true;
      if (indicator) indicator.textContent = '+';
      button.parentElement.classList.remove('is-open');
    } else {
      // Close other accordion items for clean accordion behavior
      this.containerEl.querySelectorAll('.faq-question-btn').forEach(otherBtn => {
        if (otherBtn !== button) {
          otherBtn.setAttribute('aria-expanded', 'false');
          const otherPanel = document.getElementById(otherBtn.getAttribute('aria-controls'));
          if (otherPanel) otherPanel.hidden = true;
          const otherInd = otherBtn.querySelector('.faq-icon-indicator');
          if (otherInd) otherInd.textContent = '+';
          otherBtn.parentElement.classList.remove('is-open');
        }
      });

      button.setAttribute('aria-expanded', 'true');
      panel.hidden = false;
      if (indicator) indicator.textContent = '−';
      button.parentElement.classList.add('is-open');
    }
  }
}
