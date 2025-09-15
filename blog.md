---
layout: default
title: Blog
permalink: /blog/
---

<style>
  h1 {
    margin-top: 5rem;   /* clears navbar */
    margin-bottom: 1rem; /* keep title → search spacing */
  }

  #blog-search {
    display: block;
    margin: 0 auto 0.5rem auto; /* bottom margin before posts */
    padding: 0.4rem;
    width: 60%;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  .blog-list {
    margin-top: 0.4rem !important; /* ~1/5 of the old 2rem gap */
  }
</style>

<h1>Posts</h1>

<input type="text" 
       id="blog-search" 
       placeholder="Search posts..." />

<div class="blog-list">
  {% for post in site.posts %}
    <div class="post-card"
         data-title="{{ post.title | downcase | escape }}"
         data-excerpt="{{ post.excerpt | strip_html | downcase | escape }}">
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <p class="post-date">{{ post.date | date: "%B %d, %Y" }}</p>
      <p class="post-excerpt">{{ post.excerpt | strip_html }}</p>
      <a class="read-more" href="{{ post.url | relative_url }}">Read more</a>
    </div>
    <hr class="post-divider">
  {% endfor %}
</div>

<script>
(function(){
  const searchInput = document.getElementById('blog-search');
  const posts = Array.from(document.querySelectorAll('.post-card'));

  function filterPosts(){
    const q = (searchInput.value || '').toLowerCase().trim();
    posts.forEach(post => {
      const title = (post.dataset.title || '').toLowerCase();
      const excerpt = (post.dataset.excerpt || '').toLowerCase();
      const match = q === '' || title.includes(q) || excerpt.includes(q);
      post.style.display = match ? '' : 'none';
      const hr = post.nextElementSibling;
      if (hr && hr.classList.contains('post-divider')) hr.style.display = match ? '' : 'none';
    });
  }

  searchInput.addEventListener('input', filterPosts);

  document.addEventListener('keydown', e => {
    if (e.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
  });
})();
</script>
