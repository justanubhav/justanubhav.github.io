---
layout: default
title: Religion
tag: religion
---

<div style="padding-top: 5rem;">
  <h1>{{ page.title }}</h1>

  <div class="tag-posts">
    {% for post in site.posts %}
      {% if post.tags contains page.tag %}
        <div class="post-card">
          <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
          <p class="post-date">{{ post.date | date: "%B %d, %Y" }}</p>
          <p class="post-excerpt">{{ post.excerpt | strip_html }}</p>
          <a class="read-more" href="{{ post.url | relative_url }}">Read more</a>
        </div>
        <hr class="post-divider">
      {% endif %}
    {% endfor %}
  </div>
</div>
