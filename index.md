---
layout: default
---
<h1>Posts</h1>
<ul class="posts">
  {% for post in site.posts %}
    {% if post.layout == 'medium' %}
        <li><a href="{{ post.medium_url }}">{{ post.date | date_to_string }} - <span class="post-title">{{ post.title }}</span>{% include post-tags.html %}</a></li>
    {% else %}
        <li><a href="{{ site.baseurl }}{{ post.url }}">{{ post.date | date_to_string }} - <span class="post-title">{{ post.title }}</span>{% include post-tags.html %}</a></li>
    {% endif %}
  {% endfor %}
</ul>
