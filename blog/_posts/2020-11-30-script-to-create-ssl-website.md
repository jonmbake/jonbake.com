---
layout: default
title: A Script to Create a HTTPS Website (For Free)
---

My go-to setup for static websites (like jonbake.com) is [GitHub Pages](https://pages.github.com/) and [Cloudflare](https://www.cloudflare.com/). _GitHub Pages_ offers a way to host a static website directly from a git repository. _Cloudflare_ offers a [free CDN service](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/) (making the website extremely fast) with free SSL/HTTPS certificates on custom domains.

It really is a great setup, but it can be a bit time-consuming to configure through the _GitHub_ and _Cloudflare_ websites. Fortunately, both [GitHub](https://developer.github.com/v3/) and [Cloudflare](https://api.cloudflare.com/) have APIs. **Using their APIs, this script can be used to quickly set up your own GitHub Pages/Cloudflare HTTPS-enabled, custom domain website:**

<script src="https://gist.github.com/jonmbake/5ec4435b39bec9ad21d34581cf0c93ea.js"></script>
