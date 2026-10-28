/**
 * BAKERZ BITE - Demonstration Shopping Bag Drawer
 * Manages item selections, quantities, PKR totals, and simulated checkout.
 * Clearly documents demonstration nature with zero false payment claims.
 */

export class CartDrawer {
  constructor() {
    this.items = [];
    this.isOpen = false;
    this.drawerEl = document.querySelector('#cart-drawer');
    this.overlayEl = document.querySelector('#cart-overlay');
    this.badgeEl = document.querySelector('#nav-cart-badge');
    this.listEl = document.querySelector('#cart-items-list');
    this.subtotalEl = document.querySelector('#cart-subtotal-val');
    this.countHeaderEl = document.querySelector('#cart-count-header');
    this.toastContainer = document.querySelector('#toast-container');

    this.init();
  }

  init() {
    // Open trigger
    const openBtns = document.querySelectorAll('.trigger-open-cart');
    openBtns.forEach(btn => btn.addEventListener('click', () => this.open()));

    // Close trigger
    const closeBtn = document.querySelector('#cart-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());
    if (this.overlayEl) this.overlayEl.addEventListener('click', () => this.close());

    // Demonstration checkout button
    const checkoutBtn = document.querySelector('#cart-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => this.handleDemoCheckout());
    }

    // Keyboard ESC to close
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    this.render();
  }

  addItem(item, quantity = 1) {
    const existing = this.items.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({
        id: item.id,
        name: item.name,
        price: item.price,
        category: item.categoryName || item.category,
        quantity: quantity
      });
    }

    this.render();
    this.showToast(`Added "${item.name}" to your bag.`);
  }

  removeItem(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.render();
  }

  updateQuantity(id, delta) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeItem(id);
    } else {
      this.render();
    }
  }

  open() {
    if (!this.drawerEl) return;
    this.isOpen = true;
    this.drawerEl.classList.add('is-open');
    if (this.overlayEl) this.overlayEl.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.drawerEl) return;
    this.isOpen = false;
    this.drawerEl.classList.remove('is-open');
    if (this.overlayEl) this.overlayEl.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  getTotalCount() {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }

  getSubtotal() {
    return this.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  }

  render() {
    const totalCount = this.getTotalCount();
    const subtotal = this.getSubtotal();

    if (this.badgeEl) {
      this.badgeEl.textContent = totalCount;
      this.badgeEl.style.display = totalCount > 0 ? 'inline-flex' : 'none';
    }

    if (this.countHeaderEl) {
      this.countHeaderEl.textContent = `(${totalCount} ${totalCount === 1 ? 'item' : 'items'})`;
    }

    if (this.subtotalEl) {
      this.subtotalEl.textContent = `PKR ${subtotal.toLocaleString()}`;
    }

    if (!this.listEl) return;

    if (this.items.length === 0) {
      this.listEl.innerHTML = `
        <div class="cart-empty-state">
          <div class="empty-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </div>
          <p class="empty-title">Your Bag is Empty</p>
          <p class="empty-sub">Explore our confections, fresh viennoiserie, or lifestyle merchandise to add items.</p>
        </div>
      `;
      return;
    }

    this.listEl.innerHTML = this.items.map(item => `
      <div class="cart-item-row" data-id="${item.id}">
        <div class="cart-item-details">
          <span class="cart-item-cat">${item.category}</span>
          <h4 class="cart-item-title">${item.name}</h4>
          <span class="cart-item-price">PKR ${(item.price * item.quantity).toLocaleString()} <small>(PKR ${item.price.toLocaleString()} each)</small></span>
        </div>
        <div class="cart-item-controls">
          <div class="qty-stepper">
            <button type="button" class="qty-btn btn-qty-minus" aria-label="Decrease quantity" data-id="${item.id}">−</button>
            <span class="qty-val">${item.quantity}</span>
            <button type="button" class="qty-btn btn-qty-plus" aria-label="Increase quantity" data-id="${item.id}">+</button>
          </div>
          <button type="button" class="btn-remove-item" aria-label="Remove item" data-id="${item.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    `).join('');

    // Bind event handlers on buttons
    this.listEl.querySelectorAll('.btn-qty-minus').forEach(btn => {
      btn.addEventListener('click', () => this.updateQuantity(btn.dataset.id, -1));
    });
    this.listEl.querySelectorAll('.btn-qty-plus').forEach(btn => {
      btn.addEventListener('click', () => this.updateQuantity(btn.dataset.id, 1));
    });
    this.listEl.querySelectorAll('.btn-remove-item').forEach(btn => {
      btn.addEventListener('click', () => this.removeItem(btn.dataset.id));
    });
  }

  handleDemoCheckout() {
    if (this.items.length === 0) {
      this.showToast('Please add items to your bag first.');
      return;
    }

    const modal = document.querySelector('#checkout-demo-modal');
    if (!modal) return;

    const total = this.getSubtotal();
    const orderNum = 'BB-' + Math.floor(100000 + Math.random() * 900000);

    const summaryEl = modal.querySelector('#demo-checkout-summary');
    if (summaryEl) {
      summaryEl.innerHTML = `
        <div class="demo-summary-box">
          <div class="summary-line"><span>Simulated Reference:</span> <strong>#${orderNum}</strong></div>
          <div class="summary-line"><span>Demonstration Total:</span> <strong>PKR ${total.toLocaleString()}</strong></div>
          <div class="summary-line"><span>Estimated Delivery:</span> <strong>Today by Courier in Karachi</strong></div>
          <p class="demo-disclaimer">
            <strong>Demonstration Notice:</strong> No real payment transaction or live financial processing has taken place.
            In production, this initiates a 3D Secure payment gateway or concierge WhatsApp dispatch.
          </p>
        </div>
      `;
    }

    modal.classList.add('is-open');
    this.close();

    // Clear bag after demo checkout
    this.items = [];
    this.render();
  }

  showToast(message) {
    if (!this.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'bakerz-toast';
    toast.innerHTML = `
      <span class="toast-dot"></span>
      <span class="toast-text">${message}</span>
    `;
    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('is-visible');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }
}
