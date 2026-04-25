---
layout: default
title: Blurbs
permalink: /blurbs/
---

<section class="blurb-shell fade-in">
  <div class="section-heading blurb-heading">
    <p class="section-kicker">Blurbs</p>
    <h1 class="blurb-title">Short writing, reflections, and fragments of thought.</h1>
    <p class="blurb-intro">A curated archive of brief essays, unfinished ideas, and intellectual notes on philosophy, religion, technology, and culture.</p>
  </div>

  <div class="blurb-toolbar-shell">
    <label class="blurb-search-wrap" for="blurb-search">
      <span class="blurb-search-label">Search</span>
      <input
        type="text"
        id="blurb-search"
        placeholder="Search posts or themes..."
      />
    </label>
  </div>

  {% assign pinned_posts = site.posts | where_exp: "post", "post.pinned == true" %}
  {% assign regular_posts = site.posts | where_exp: "post", "post.pinned != true" %}

  {% if pinned_posts.size > 0 %}
    <div class="blurb-featured-strip blurb-panel">
      <div class="blurb-list-header">
        <p class="blurb-group-label">Pinned</p>
        <p class="blurb-list-copy">Announcements and highlighted notes.</p>
      </div>
      <div class="featured-strip-list">
        {% for post in pinned_posts %}
          <article class="post-card post-card-featured pinned"
                   data-title="{{ post.title | downcase | escape }}"
                   data-excerpt="{{ post.excerpt | strip_html | downcase | escape }}">
            <a class="blurb-card-link" href="{{ post.url | relative_url }}">
              <div class="post-meta-row">
                <p class="post-date">{{ post.date | date: "%B %d, %Y" }}</p>
                <span class="pinned-badge" title="Pinned">Pinned</span>
              </div>
              <h2>{{ post.title }}</h2>
              <p class="post-excerpt">{{ post.excerpt | strip_html }}</p>
            </a>
          </article>
        {% endfor %}
      </div>
    </div>
  {% endif %}

  <div class="blurb-list blurb-panel">
    <div class="blurb-list-header">
      <p class="blurb-group-label">Archive</p>
      <p class="blurb-list-copy">Recent notes and essays.</p>
    </div>

    <div class="post-stream">
      {% for post in regular_posts %}
        <article class="post-card post-card-stream"
                 data-title="{{ post.title | downcase | escape }}"
                 data-excerpt="{{ post.excerpt | strip_html | downcase | escape }}">
          <a class="blurb-card-link" href="{{ post.url | relative_url }}">
            <div class="post-card-main">
              <p class="post-date">{{ post.date | date: "%B %d, %Y" }}</p>
              <h2>{{ post.title }}</h2>
              <p class="post-excerpt">{{ post.excerpt | strip_html }}</p>
            </div>
          </a>
        </article>
      {% endfor %}
    </div>
  </div>
</section>

<script>
(function(){
  const searchInput = document.getElementById('blurb-search');
  const posts = Array.from(document.querySelectorAll('.post-card'));

  function filterPosts(){
    const q = (searchInput.value || '').toLowerCase().trim();
    posts.forEach(post => {
      const title = post.dataset.title || '';
      const excerpt = post.dataset.excerpt || '';
      const match = q === '' || title.includes(q) || excerpt.includes(q);
      post.style.display = match ? '' : 'none';
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
