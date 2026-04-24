---
layout: default
title: Blurbs
permalink: /blurbs/
---

<section class="blurb-shell fade-in">
  <div class="blurb-hero">
    <p class="section-kicker">Blurbs</p>
    <h1 class="blurb-title">Short writing, reflections, and fragments of thought.</h1>
    <p class="blurb-intro">A simple archive of brief posts on ideas, technology, philosophy, religion, and whatever else feels worth writing down.</p>

    <div class="blurb-toolbar">
      <label class="blurb-search-wrap" for="blurb-search">
        <span class="blurb-search-label">Search</span>
        <input
          type="text"
          id="blurb-search"
          placeholder="Search posts, tags, or themes..."
        />
      </label>
    </div>
  </div>

  <div class="blurb-list">
    {% assign pinned_posts = site.posts | where_exp: "post", "post.pinned == true" %}
    {% if pinned_posts.size > 0 %}
      {% for post in pinned_posts %}
        <div class="post-card pinned"
             data-title="{{ post.title | downcase | escape }}"
             data-excerpt="{{ post.excerpt | strip_html | downcase | escape }}"
             data-tags="{{ post.tags | join: ' ' | downcase | escape }}">
          <div class="post-meta-row">
            <p class="post-date">{{ post.date | date: "%B %d, %Y" }}</p>
            <span class="pinned-badge" title="Pinned">Pinned</span>
          </div>
          <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
          <p class="post-excerpt">{{ post.excerpt | strip_html }}</p>
          {% if post.tags %}
            <div class="post-tag-row">
              {% for tag in post.tags limit:3 %}
                <span class="post-mini-tag">{{ tag }}</span>
              {% endfor %}
            </div>
          {% endif %}
          <a class="read-more" href="{{ post.url | relative_url }}">Read more</a>
        </div>
      {% endfor %}

      <hr class="post-divider">
    {% endif %}

    {% assign regular_posts = site.posts | where_exp: "post", "post.pinned != true" %}
    {% for post in regular_posts %}
      <div class="post-card"
           data-title="{{ post.title | downcase | escape }}"
           data-excerpt="{{ post.excerpt | strip_html | downcase | escape }}"
           data-tags="{{ post.tags | join: ' ' | downcase | escape }}">
        <p class="post-date">{{ post.date | date: "%B %d, %Y" }}</p>
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <p class="post-excerpt">{{ post.excerpt | strip_html }}</p>
        {% if post.tags %}
          <div class="post-tag-row">
            {% for tag in post.tags limit:3 %}
              <span class="post-mini-tag">{{ tag }}</span>
            {% endfor %}
          </div>
        {% endif %}
        <a class="read-more" href="{{ post.url | relative_url }}">Read more</a>
      </div>
    {% endfor %}

    <hr class="post-divider">
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
      const tags = post.dataset.tags || '';
      const match = q === '' || title.includes(q) || excerpt.includes(q) || tags.includes(q);
      post.style.display = match ? '' : 'none';
      const hr = post.nextElementSibling;
      if (hr && hr.classList.contains('post-divider')) {
        hr.style.display = match ? '' : 'none';
      }
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
