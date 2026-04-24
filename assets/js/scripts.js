document.addEventListener('DOMContentLoaded', () => {

  // --------------------------
  // Fade-in on scroll
  // --------------------------
  const faders = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  faders.forEach(el => observer.observe(el));

  // --------------------------
  // Featured blurb click
  // --------------------------
  const blurbs = ["/blurbs/"];

  const featuredBlurb = document.getElementById('featured-blurb');

  if (featuredBlurb) {
    featuredBlurb.style.cursor = "pointer";

    featuredBlurb.addEventListener('click', () => {
      const randomBlurb = blurbs[Math.floor(Math.random() * blurbs.length)];
      window.location.href = randomBlurb;
    });
  }

  // --------------------------
  // Scroll Progress Bar
  // --------------------------
  const progressBar = document.getElementById('scroll-progress');

  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    });
  }

  // --------------------------
  // Blurb search
  // --------------------------
  const searchInput = document.getElementById('blurb-search');
  const posts = Array.from(document.querySelectorAll('.post-card'));

  if (searchInput) {
    function filterPosts() {
      const q = searchInput.value.toLowerCase().trim();

      posts.forEach(post => {
        const title = (post.dataset.title || '').toLowerCase();
        const excerpt = (post.dataset.excerpt || '').toLowerCase();
        const tags = (post.dataset.tags || '').toLowerCase();

        const show = !q || title.includes(q) || excerpt.includes(q) || tags.includes(q);

        post.style.display = show ? '' : 'none';

        const hr = post.nextElementSibling;
        if (hr && hr.classList.contains('post-divider')) {
          hr.style.display = show ? '' : 'none';
        }
      });
    }

    searchInput.addEventListener('input', filterPosts);

    document.addEventListener('keydown', e => {
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)
      ) {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      }
    });
  }

});