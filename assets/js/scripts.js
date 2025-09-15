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

// Scroll Progress Bar only on blog posts
const progressBar = document.getElementById('scroll-progress');
if(progressBar) {
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
}

// Quotes
const quotes = [
  " “And God said “Love Your Enemy,” and I obeyed him and loved myself.” ",
  "“I desire the things which will destroy me in the end.”",
  "“Eurydice, dying now a second time, uttered no complaint against her husband. What was there to complain of, but that she had been loved?”"
];

const quoteDisplay = document.getElementById('quote-display');
quoteDisplay.textContent = quotes[Math.floor(Math.random() * quotes.length)];