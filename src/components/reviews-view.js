import { getStoredReviews, saveReviews, calculateReviewStats } from '../data/reviews.js';

/**
 * BAKERZ BITE - Customer Reviews View & Interactive Submission
 * 
 * Demonstrates local-first state persistence in localStorage ('bakerz_bite_reviews_v1').
 * All newly submitted feedback dynamically recalculates the live average rating and distribution.
 */

export class ReviewsView {
  constructor() {
    this.reviews = getStoredReviews();
    this.selectedRating = 5;

    this.listEl = document.querySelector('#reviews-list');
    this.avgScoreEl = document.querySelector('#reviews-avg-score');
    this.totalCountEl = document.querySelector('#reviews-total-count');
    this.starsGraphicEl = document.querySelector('#reviews-stars-graphic');
    this.distBarsEl = document.querySelector('#reviews-dist-bars');
    this.formEl = document.querySelector('#review-submission-form');

    this.init();
  }

  init() {
    this.renderStats();
    this.renderList();
    this.bindForm();
  }

  renderStats() {
    const stats = calculateReviewStats(this.reviews);

    if (this.avgScoreEl) {
      this.avgScoreEl.textContent = stats.average.toFixed(1);
    }
    if (this.totalCountEl) {
      this.totalCountEl.textContent = `Based on ${stats.total} verified patron reviews in Karachi`;
    }

    // Dynamic Star Distribution Bars
    if (this.distBarsEl) {
      this.distBarsEl.innerHTML = [5, 4, 3, 2, 1].map(star => {
        const count = stats.distribution[star] || 0;
        const pct = stats.total > 0 ? (count / stats.total) * 100 : 0;
        return `
          <div class="dist-row">
            <span class="dist-star-label">${star} ★</span>
            <div class="dist-bar-track">
              <div class="dist-bar-fill" style="width: ${pct}%"></div>
            </div>
            <span class="dist-count">${count}</span>
          </div>
        `;
      }).join('');
    }
  }

  renderList() {
    if (!this.listEl) return;

    this.listEl.innerHTML = this.reviews.map(r => `
      <div class="review-card" data-id="${r.id}">
        <div class="review-card-top">
          <div class="review-author-info">
            <h4 class="review-author-name">${r.author}</h4>
            <span class="review-author-loc">${r.location || 'Karachi, Pakistan'}</span>
          </div>
          <div class="review-rating-stars">
            ${'★'.repeat(Math.round(r.rating))}${'☆'.repeat(5 - Math.round(r.rating))}
          </div>
        </div>

        <div class="review-meta-row">
          <span class="review-cat-tag">${r.category}</span>
          <span class="review-date">${r.date}</span>
          ${r.verified ? '<span class="verified-badge">✓ Verified Patron</span>' : ''}
        </div>

        <h5 class="review-title">${r.title || 'Exceptional Confection'}</h5>
        <p class="review-comment">"${r.comment}"</p>
      </div>
    `).join('');
  }

  bindForm() {
    if (!this.formEl) return;

    // Star selector buttons
    const starButtons = this.formEl.querySelectorAll('.star-picker-btn');
    starButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedRating = parseInt(btn.dataset.rating, 10);
        this.updateStarPickerVisuals();
      });
      btn.addEventListener('mouseenter', () => {
        const hoverVal = parseInt(btn.dataset.rating, 10);
        this.previewStarPicker(hoverVal);
      });
      btn.addEventListener('mouseleave', () => {
        this.updateStarPickerVisuals();
      });
    });

    this.updateStarPickerVisuals();

    // Form submit
    this.formEl.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = this.formEl.querySelector('#review-input-name');
      const locationInput = this.formEl.querySelector('#review-input-location');
      const categorySelect = this.formEl.querySelector('#review-input-category');
      const titleInput = this.formEl.querySelector('#review-input-title');
      const commentInput = this.formEl.querySelector('#review-input-comment');
      const feedbackNotice = this.formEl.querySelector('#review-form-feedback');

      const name = nameInput ? nameInput.value.trim() : '';
      const location = locationInput ? locationInput.value.trim() : 'Karachi, Pakistan';
      const category = categorySelect ? categorySelect.value : 'Cakes';
      const title = titleInput ? titleInput.value.trim() : '';
      const comment = commentInput ? commentInput.value.trim() : '';

      if (!name || !comment) {
        if (feedbackNotice) {
          feedbackNotice.className = 'form-feedback error';
          feedbackNotice.textContent = 'Please provide your name and your review feedback.';
        }
        return;
      }

      const today = new Date().toISOString().split('T')[0];

      const newReview = {
        id: 'rev-' + Date.now(),
        author: name,
        location: location || 'Karachi, Pakistan',
        rating: this.selectedRating,
        category: category,
        date: today,
        title: title || 'A Savoury Experience',
        comment: comment,
        verified: true,
        helpfulCount: 1
      };

      // Prepend review and persist to localStorage
      this.reviews.unshift(newReview);
      saveReviews(this.reviews);

      // Refresh displays
      this.renderStats();
      this.renderList();

      if (feedbackNotice) {
        feedbackNotice.className = 'form-feedback success';
        feedbackNotice.textContent = 'Thank you! Your verified review has been submitted and saved to local storage.';
      }

      this.formEl.reset();
      this.selectedRating = 5;
      this.updateStarPickerVisuals();

      setTimeout(() => {
        if (feedbackNotice) feedbackNotice.textContent = '';
      }, 5000);
    });
  }

  previewStarPicker(val) {
    const starButtons = this.formEl.querySelectorAll('.star-picker-btn');
    starButtons.forEach(btn => {
      const r = parseInt(btn.dataset.rating, 10);
      btn.classList.toggle('is-highlighted', r <= val);
    });
  }

  updateStarPickerVisuals() {
    const starButtons = this.formEl.querySelectorAll('.star-picker-btn');
    starButtons.forEach(btn => {
      const r = parseInt(btn.dataset.rating, 10);
      btn.classList.toggle('is-selected', r <= this.selectedRating);
      btn.classList.remove('is-highlighted');
    });

    const labelEl = this.formEl.querySelector('#star-rating-label');
    if (labelEl) {
      const descriptions = {
        5: '5 Stars — Exceptional, Parisian Artistry',
        4: '4 Stars — Very Good, Highly Recommended',
        3: '3 Stars — Good, Satisfying',
        2: '2 Stars — Fair, Needed Refinement',
        1: '1 Star — Needs Improvement'
      };
      labelEl.textContent = descriptions[this.selectedRating] || `${this.selectedRating} Stars`;
    }
  }
}
