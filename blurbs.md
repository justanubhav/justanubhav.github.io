---
layout: default
title: Blurbs
permalink: /blurbs/
---

<h1 class="blurb-title">Posts</h1>

<input type="text" 
       id="blurb-search" 
       placeholder="Search posts..." />

<div class="blurb-list">
  {% comment %} Pinned posts section {% endcomment %}
  {% assign pinned_posts = site.posts | where_exp: "post", "post.pinned == true" %}
  {% if pinned_posts.size > 0 %}
    {% for post in pinned_posts %}
      <div class="post-card pinned"
           data-title="{{ post.title | downcase | escape }}"
           data-excerpt="{{ post.excerpt | strip_html | downcase | escape }}"
           data-tags="{{ post.tags | join: ' ' | downcase | escape }}">
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <p class="post-date">
          {{ post.date | date: "%B %d, %Y" }}
          <span class="pinned-icon" title="Pinned">📌</span>
        </p>
        <p class="post-excerpt">{{ post.excerpt | strip_html }}</p>
        <a class="read-more" href="{{ post.url | relative_url }}">Read more</a>
      </div>
    {% endfor %}

    {% comment %} Divider after pinned section {% endcomment %}
    <hr class="post-divider">
  {% endif %}

  {% comment %} Regular posts section {% endcomment %}
  {% assign regular_posts = site.posts | where_exp: "post", "post.pinned != true" %}
  {% for post in regular_posts %}
    <div class="post-card"
         data-title="{{ post.title | downcase | escape }}"
         data-excerpt="{{ post.excerpt | strip_html | downcase | escape }}"
         data-tags="{{ post.tags | join: ' ' | downcase | escape }}">
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <p class="post-date">{{ post.date | date: "%B %d, %Y" }}</p>
      <p class="post-excerpt">{{ post.excerpt | strip_html }}</p>
      <a class="read-more" href="{{ post.url | relative_url }}">Read more</a>
    </div>
  {% endfor %}

  {% comment %} Always show divider at the very bottom {% endcomment %}
  <hr class="post-divider">
</div>

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
      if(hr && hr.classList.contains('post-divider')) hr.style.display = match ? '' : 'none';
    });
  }

  searchInput.addEventListener('input', filterPosts);

  document.addEventListener('keydown', e => {
    if(e.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
  });
})();
</script>
