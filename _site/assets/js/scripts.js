document.addEventListener('DOMContentLoaded', () => {
  // --------------------------
  // Fade-in on scroll
  // --------------------------
  const faders = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); // Animate only once
      }
    });
  }, { threshold: 0.2 });

  faders.forEach(fader => observer.observe(fader));

  // --------------------------
  // Dark/Light Mode Toggle
  // --------------------------
  const toggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme') || 'dark';

  if(storedTheme === 'dark') {
    document.body.classList.remove('light-mode');
    toggle.textContent = '🌙';
  } else {
    document.body.classList.add('light-mode');
    toggle.textContent = '☀️';
  }

  toggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('light-mode') ? false : true;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    toggle.textContent = isDark ? '🌙' : '☀️';
  });
});
