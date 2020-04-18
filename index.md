---
layout: posts-list
title: Posts
---
<div class="posts">
  {% for post in site.posts %}
    <div class="post {% if post.layout == 'medium' %}medium{% endif %}">
        <h2><a href="{% if post.layout == 'medium' %}{{ post.medium_url }}{% else %}{{ site.baseurl }}{{ post.url }}{% endif %}">{{ post.title }}</a></h2>
        <div>
          <time>{{ post.date | date_to_string | upcase }} </time>{% include post-tags.html %}
        </div>
      </div>
  {% endfor %}
</div>
