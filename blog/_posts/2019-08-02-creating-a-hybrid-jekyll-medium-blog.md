---
layout: default
title: "Creating a Hybrid Jekyll/Medium Blog"
tags:
  - software_dev
---

There are so many great blogging options now-a-days from database-driven platforms like [Wordpress](https://wordpress.org/) to static site generators like [Jekyll](https://jekyllrb.com/) (my personal favorite) to baas (blogging as a service) solutions like [Medium](http://medium.com). Like most things in life, each option has its own set of pros and cons. For example, _Wordpress_ is great for its ease of use, but lacks a bit on security; Jekyll requires a bit more technical knowledge, but is more secure since there is not the additional attack vector of a database.

When I was creating this blog, I was debating using [Github Pages](https://pages.github.com/), which is a an easy way to host a Jekyll-based blog, or Medium. The pros and cons broke down like this:

### Jekyll Pros

- Blog look, feel, content distribution, etc. is completely controlled by me.
- Learn ruby, markdown, and other technogies used by Jekyll.

### Jekyll Cons

- Content is not search engine optimized (SEO) out of the box.
- More time spent on maintenance.

### Medium Pros

- Content is SEOed, often appearing on the first page of Google.
- Very easy to write a post using web editor.

### Medium Cons

- No control over content posted. Basically content is owned by Medium, Inc.
- Impossible to add custom styling/post structure.

In the end, I decided to do a hybrid approach where I would post to Medium for content that I wanted to reach a larger audience and to my Jekyll personal blog for more technical topics that would have a more naunced audience. I still wanted all my posts to display at [JonBake.com](https//jonbake.com) though. The following describes how I made that happen.

## Redirecting Jekyll Posts to Medium

The [http-equiv meta directive](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-http-equiv) allows declaring that a page should redirect to another page on load. I used this directive to create a [Jekyll Layout](https://jekyllrb.com/docs/step-by-step/04-layouts/) for medium posts:

```
<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta http-equiv="refresh" content="0; url={{ page.medium_url }}">
    <link rel="canonical" href="{{ page.medium_url }}" />
</head>
<body>
</body>
</html>
```
_\_layouts/medium.html_

With a _Medium Layout_ in place, I could then easily create a _Jekyll_ post that redirects to the _Medium_ post:

```
---
layout: medium
medium_url: https://medium.com/@jonmbake/jekyll-to-medium-redirect-example-not-a-real-post
title:  "Jekyll to Medium Redirect Example"
---
```
_\_posts/2019-08-02-jekyll-to-medium-redirect-example.md_

The one final step is to generate the correct post link for _Medium_ posts. On the main page of my site, where I have a list of all my posts, I updated the post link generating logic to:

```
{% for post in site.posts %}
    {% if post.layout == 'medium' %}
        <li><a href="{{ post.medium_url }}"><em>{{ post.date | date_to_string }} - {{ post.title }}</em></a></li>
    {% else %}
        <li><a href="{{ site.baseurl }}{{ post.url }}"><em>{{ post.date | date_to_string }} - {{ post.title }}<em></a></li>
    {% endif %}
  {% endfor %}
```

That's it. Now I have the flexibility to either post to _Medium_ or my Github pages repo and have all posts be aggregated to a single place.
