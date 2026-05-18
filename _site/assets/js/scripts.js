document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --------------------------
  // Mobile navigation
  // --------------------------
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.getElementById('site-nav');

  if (navToggle && siteNav) {
    const navLinks = siteNav.querySelectorAll('a');

    function closeNav() {
      siteNav.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    }

    navToggle.addEventListener('click', () => {
      const willOpen = !siteNav.classList.contains('is-open');
      siteNav.classList.toggle('is-open', willOpen);
      navToggle.classList.toggle('is-open', willOpen);
      navToggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      document.body.classList.toggle('nav-open', willOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
        closeNav();
      }
    });
  }

  // --------------------------
  // Fade-in on scroll
  // --------------------------
  const faders = document.querySelectorAll('.fade-in');
  const typingElements = document.querySelectorAll('[data-type-text]');

  function typeText(element) {
    if (!element || element.dataset.typed === 'true') return;

    const text = element.dataset.typeText || element.textContent.trim();
    element.dataset.typed = 'true';

    if (prefersReducedMotion) {
      element.textContent = text;
      element.classList.add('typed');
      return;
    }

    element.textContent = '';
    element.classList.add('is-typing');

    let index = 0;
    const speed = Math.max(18, Math.min(42, 680 / Math.max(text.length, 1)));

    function tick() {
      element.textContent = text.slice(0, index + 1);
      index += 1;

      if (index < text.length) {
        window.setTimeout(tick, speed);
      } else {
        element.classList.remove('is-typing');
        element.classList.add('typed');
      }
    }

    window.setTimeout(tick, 80);
  }

  function typeInside(container) {
    if (!container) return;

    if (container.matches && container.matches('[data-type-text]')) {
      typeText(container);
    }

    container.querySelectorAll('[data-type-text]').forEach(typeText);
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          typeInside(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    faders.forEach(el => observer.observe(el));

    const typingObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeText(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });

    typingElements.forEach(el => {
      if (!el.closest('.fade-in')) {
        typingObserver.observe(el);
      }
    });
  } else {
    // fallback for older browsers
    faders.forEach(el => {
      el.classList.add('visible');
      typeInside(el);
    });
    typingElements.forEach(typeText);
  }

  // --------------------------
  // Scroll Progress Bar
  // --------------------------
  
const progressBar = document.getElementById('scroll-progress');

if (progressBar) {
  window.addEventListener('scroll', () => {
    const doc = document.documentElement;

    const scrollTop = doc.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;

    if (scrollHeight <= 0) return;

    const scrollPercent = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = scrollPercent + '%';
  });
}

  // --------------------------
  // Card modal
  // --------------------------
  const modal = document.getElementById('card-modal');
  const modalTitle = document.getElementById('card-modal-title');
  const modalBody = document.getElementById('card-modal-body');
  const cardButtons = document.querySelectorAll('.card-button, .modal-trigger');
  let lastFocusedButton = null;

  if (modal && modalTitle && modalBody && cardButtons.length) {
    const closeTargets = modal.querySelectorAll('[data-modal-close]');
    const closeButton = modal.querySelector('.modal-close');

    function openModal(button) {
      lastFocusedButton = button;
      modalTitle.textContent = button.dataset.modalTitle || '';
      modalBody.textContent = button.dataset.modalBody || '';
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      if (closeButton) {
        closeButton.focus();
      }
    }

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      if (lastFocusedButton) {
        lastFocusedButton.focus();
      }
    }

    cardButtons.forEach(button => {
      button.addEventListener('click', () => openModal(button));
    });

    closeTargets.forEach(element => {
      element.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

});
