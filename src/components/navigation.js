/**
 * BAKERZ BITE - Navigation & Interactive Shell
 * Handles sticky nav, mobile menu drawer, active anchor spy, soundscape toggle,
 * and contact form validation.
 */

export function initNavigation(soundscape) {
  const header = document.querySelector('#master-header');
  const mobileToggle = document.querySelector('#mobile-menu-toggle');
  const mobileDrawer = document.querySelector('#mobile-nav-drawer');
  const soundToggleBtn = document.querySelector('#btn-toggle-sound');
  const contactForm = document.querySelector('#contact-us-form');

  let lastScrollY = window.scrollY;

  // 1. Header scroll hide/reveal
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (header) {
      if (currentScrollY > 120) {
        header.classList.add('is-scrolled');
        if (currentScrollY > lastScrollY && currentScrollY > 300) {
          header.classList.add('nav-hidden');
        } else {
          header.classList.remove('nav-hidden');
        }
      } else {
        header.classList.remove('is-scrolled', 'nav-hidden');
      }
    }
    lastScrollY = currentScrollY;
  }, { passive: true });

  // 2. Mobile Menu Drawer
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('is-open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close when clicking mobile nav links
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => closeMobileMenu());
    });

    // Close mobile menu on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
        closeMobileMenu();
      }
    });
  }

  function openMobileMenu() {
    mobileDrawer.classList.add('is-open');
    mobileToggle.classList.add('is-active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('is-open');
    mobileToggle.classList.remove('is-active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // 3. Audio Ambient Soundscape Button
  if (soundToggleBtn && soundscape) {
    soundToggleBtn.addEventListener('click', () => {
      const isPlaying = soundscape.toggle();
      soundToggleBtn.classList.toggle('is-playing', isPlaying);
      const textSpan = soundToggleBtn.querySelector('.sound-btn-text');
      if (textSpan) {
        textSpan.textContent = isPlaying ? 'SOUND ON' : 'ATMOSPHERE';
      }
    });
  }

  // 4. Contact Us Form Validation
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = contactForm.querySelector('#contact-name');
      const emailInput = contactForm.querySelector('#contact-email');
      const subjectInput = contactForm.querySelector('#contact-subject');
      const messageInput = contactForm.querySelector('#contact-message');
      const feedback = contactForm.querySelector('#contact-form-feedback');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      // Simple email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        if (feedback) {
          feedback.className = 'contact-feedback error';
          feedback.textContent = 'Please fill out all required fields.';
        }
        return;
      }

      if (!emailRegex.test(email)) {
        if (feedback) {
          feedback.className = 'contact-feedback error';
          feedback.textContent = 'Please enter a valid email address.';
        }
        return;
      }

      if (feedback) {
        feedback.className = 'contact-feedback success';
        feedback.textContent = 'Thank you, ' + name + '! Your message has been received by our Karachi atelier team. We will respond within 24 hours.';
      }

      contactForm.reset();

      setTimeout(() => {
        if (feedback) feedback.textContent = '';
      }, 7000);
    });
  }

  // 5. Active section anchor highlight via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-desktop-links a[href^="#"]');

  if (sections.length > 0 && navLinks.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('is-current');
            } else {
              link.classList.remove('is-current');
            }
          });
        }
      });
    }, { threshold: 0.25 });

    sections.forEach(sec => observer.observe(sec));
  }
}
