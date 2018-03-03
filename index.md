---
layout: default
---
<h1>Posts</h1>
<select style="width: 100%" class="topic-filter" name="topic" multiple="multiple">
</select>

<ul class="posts">
  {% for post in site.posts %}
    {% if post.layout == 'medium' %}
        <li class="medium {{ post.tags | join }}"><a href="{{ post.medium_url }}">{{ post.date | date_to_string }} - <span class="post-title">{{ post.title }}</span>{% include post-tags.html %}</a></li>
    {% else %}
        <li class="{{ post.tags | join }}"><a href="{{ site.baseurl }}{{ post.url }}">{{ post.date | date_to_string }} - <span class="post-title">{{ post.title }}</span>{% include post-tags.html %}</a></li>
    {% endif %}
  {% endfor %}
</ul>
