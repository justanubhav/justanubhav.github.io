---
layout: default
title: Blog
permalink: /blog/
---

<h1 class="blog-title">Posts</h1>

<input type="text" 
       id="blog-search" 
       placeholder="Search posts..." />

<div class="blog-list">
  {% for post in site.posts %}
    <div class="post-card"
         data-title="{{ post.title | downcase | escape }}"
         data-excerpt="{{ post.excerpt | strip_html | downcase | escape }}"
         data-tags="{{ post.tags | join: ' ' | downcase | escape }}">
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
