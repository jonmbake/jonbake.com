---
layout: posts-list
title: Top Posts
description: A personal website by Jon Bake on software and personal development. Includes learning notes, optimization checklists, and writings.
---
<div class="posts">
  {% for post in site.posts %}
    {% if post.tags contains 'front-page' %}
    <div class="post {% if post.layout == 'medium' %}medium{% endif %}">
        <h2><a href="{% if post.layout == 'medium' %}{{ post.medium_url }}{% else %}{{ site.baseurl }}{{ post.url }}{% endif %}">{{ post.title }}</a></h2>
        <div>
          <time>{{ post.date | date_to_string | upcase }} </time>{% include post-tags.html %}
        </div>
      </div>
      {% endif %}
  {% endfor %}
</div>
<a class="font-weight-bold" href="/posts">View all posts</a>
