---
layout: default
title: Blog
---

<section>
  <h1>Blogs</h1>
  <div class="cards">
    {% for post in site.posts %}
    <div class="card">
      <h3>{{ post.title }}</h3>
      <p class="post-date">{{ post.date | date: "%B %d, %Y" }}</p>
      <p class="post-excerpt">{{ post.excerpt }}</p>
      <a href="{{ post.url }}" class="read-more">Read More</a>
    </div>
    {% endfor %}
  </div>
</section>
