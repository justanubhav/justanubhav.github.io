---
layout: blog
title: Blog
permalink: /blog/
---

<h1>Blog</h1>

<div class="blog-list">
  {% for post in site.posts %}
    <div class="post-card">
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <p class="post-date">{{ post.date | date: "%B %d, %Y" }}</p>
      <p>{{ post.excerpt }}</p>
      <a class="read-more" href="{{ post.url | relative_url }}">Read more</a>
    </div>
    <hr class="post-divider">
  {% endfor %}
</div>
