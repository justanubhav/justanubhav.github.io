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
  // Dark/Light Mode Toggle (Desktop + Mobile)
  // --------------------------
  const toggle = document.getElementById('theme-toggle');
  const mobileToggle = document.getElementById('mobile-theme-toggle');
  const storedTheme = localStorage.getItem('theme') || 'dark';

  // Apply stored theme
  let isDark = storedTheme === 'dark';
  function applyTheme(isDarkMode) {
    if(isDarkMode) {
      document.body.classList.remove('light-mode');
      toggle && (toggle.textContent = '🌙');
      mobileToggle && (mobileToggle.textContent = '🌙');
    } else {
      document.body.classList.add('light-mode');
      toggle && (toggle.textContent = '☀️');
      mobileToggle && (mobileToggle.textContent = '☀️');
    }
  }
  applyTheme(isDark);

  // Theme toggle handler
  const handleToggle = () => {
    isDark = !isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    applyTheme(isDark);
  };

  toggle && toggle.addEventListener('click', handleToggle);
  mobileToggle && mobileToggle.addEventListener('click', handleToggle);

// --------------------------
// Hero section featured blurb click
// --------------------------
const blurbs = [
  "/2025/09/13/my-first-post.html",
  "/2025/09/16/morality.html",
  "/2025/10/05/dnd-with-deepseek.html",
  "/2025/09/23/ai-aversion.html",
  "/2025/10/18/ai-is-sentient.html",
  "/2025/10-24-determinism.html"
  // Add more blurb URLs here as needed
];

const featuredBlurb = document.getElementById('featured-blurb');

if(featuredBlurb){
  featuredBlurb.style.cursor = "pointer"; // show pointer
  featuredBlurb.addEventListener('click', () => {
    const randomBlurb = blurbs[Math.floor(Math.random() * blurbs.length)];
    window.location.href = randomBlurb;
  });
}

  // --------------------------
  // Scroll Progress Bar (only on blurb pages)
  // --------------------------
  const progressBar = document.getElementById('scroll-progress');
  if(progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    });
  }

});

// Blurb search
(function(){
  const searchInput = document.getElementById('blurb-search');
  const posts = Array.from(document.querySelectorAll('.post-card'));

  function filterPosts(){
    const q = (searchInput.value || '').toLowerCase().trim();

    posts.forEach(post => {
      const title = (post.dataset.title || '').toLowerCase();
      const excerpt = (post.dataset.excerpt || '').toLowerCase();
      const tags = (post.dataset.tags || '').toLowerCase();
      const show = q === '' || title.includes(q) || excerpt.includes(q) || tags.includes(q);
      post.style.display = show ? '' : 'none';
      const hr = post.nextElementSibling;
      if(hr && hr.classList.contains('post-divider')) hr.style.display = show ? '' : 'none';
    });
  }

  searchInput.addEventListener('input', filterPosts);

  // Focus search with "/"
  document.addEventListener('keydown', e => {
    if(e.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
  });
})();
