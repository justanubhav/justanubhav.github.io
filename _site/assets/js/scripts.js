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
  // Hero section featured blog click
  // --------------------------
  const blogs = [
    "/2025/09/13/my-first-post.html",
    // Add more blog URLs here as needed
  ];
  const featuredBlog = document.getElementById('featured-blog');
  if(featuredBlog){
    featuredBlog.addEventListener('click', () => {
      const randomBlog = blogs[Math.floor(Math.random() * blogs.length)];
      window.location.href = randomBlog;
    });
  }

  // --------------------------
  // Scroll Progress Bar (only on blog pages)
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

// Blog search
(function(){
  const searchInput = document.getElementById('blog-search');
  const posts = Array.from(document.querySelectorAll('.post-card'));

  function filterPosts(){
    const q = (searchInput.value || '').toLowerCase().trim();

    posts.forEach(post => {
      const title = (post.dataset.title || '').toLowerCase();
      const excerpt = (post.dataset.excerpt || '').toLowerCase();
      const show = q === '' || title.includes(q) || excerpt.includes(q);
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
