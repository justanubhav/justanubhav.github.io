document.addEventListener('DOMContentLoaded', () => {

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

  if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  faders.forEach(el => observer.observe(el));
  } else {
  // fallback for older browsers
  faders.forEach(el => el.classList.add('visible'));
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
