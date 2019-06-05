---
layout: posts-list
title: Posts
---
<div class="pure-g">
  <div class="posts pure-u-4-5">
    {% for post in site.posts %}
      <div class="post {% if post.layout == 'medium' %}medium{% endif %} {{ post.tags | join }}">
          <h2><a href="{% if post.layout == 'medium' %}{{ post.medium_url }}{% else %}{{ site.baseurl }}{{ post.url }}{% endif %}">{{ post.title }}</a></h2>
          <div>
            <time>{{ post.date | date_to_string | upcase }} </time>{% include post-tags.html %}
          </div>
        </div>
    {% endfor %}
  </div>
  <div class="posts pure-u-1-5">
    <div class="filter-header">Filter by Topic</div>
    <div class="topic-filter">
    </div>
  </div>
</div>
