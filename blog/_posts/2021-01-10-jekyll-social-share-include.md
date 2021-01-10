---
layout: default
title: Jekyll Social Share Include
---

An important tool to empower your blog to grow is to make it easier for visitors to share a post-- whether that is through email or social media. The following is the [Jekyll Include](https://jekyllrb.com/docs/includes/) used on this site to render the _share bar_ above. Feel free to steal it for your own use. Note: it requires [Font Awesome](https://github.com/FortAwesome/Font-Awesome) in order to render the icons.

```
{% raw %}
<div class="social-share">
  Share:
  <a class="social-btn twitter-share" href="https://twitter.com/intent/tweet?text={{ page.title | url_encode }}&url={{ site.url | url_encode }}{{ page.url | url_encode }}" rel="nofollow" target="_blank" title="Share on Twitter"><i class="fa fa-twitter" aria-hidden="true"></i> Twitter</a>
  <a class="social-btn fb-share" href="https://facebook.com/sharer.php?u={{ site.url | url_encode }}{{ page.url | url_encode }}" rel="nofollow" target="_blank" title="Share on Facebook"><i class="fa fa-facebook" aria-hidden="true"></i> Facebook</a>
  <a class="social-btn email-share" href="mailto:?subject=Blog post to check out&amp;body={{ site.url | url_encode }}{{ page.url | url_encode }}" title="Share via Email"><i class="fa fa-envelope" aria-hidden="true"></i> Email</a>
</div>
{% endraw %}
```
<small style="font-style: italic"><a target="_blank" rel="noopener noreferrer" href="{{ site.source_url }}/blob/master/_includes/social-share.html">_includes/social-share.html</a></small>
