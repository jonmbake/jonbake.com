---
layout: default
---
<h1>Posts</h1>
<ul class="posts">
  {% for post in site.posts %}
    <li><a href="{{ site.baseurl }}{{ post.url }}">{{ post.date | date_to_string }} - {{ post.title }}</a></li>
  {% endfor %}
</ul>