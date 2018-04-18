---
layout: default
title: "How Not to Get Your Blog Hacked"
tags:
  - security
---

This blog was once overtaken by a hacker. He or she somehow gained access to my [Wordpress](https://wordpress.org) site and decided to override all the posts with Asian pornography. Not cool. Luckily, a reader alerted me to the hack fairly quickly. Still, it was one of the most embarrassing experiences professionally as a software developer. Blogs of the non-technical are supposed to get hacked, not a somewhat competent web developer.

Here I’ll share a few tips on how to lower your chances of getting your blog hacked.

## Static Site Generators vs Content Management Systems (CMSs)

There are two main flavors of blogging platforms: _static site generators_ and _CMSs_.  With static site generators, you write the blog post as a plain text file (usually in [Markdown](https://en.wikipedia.org/wiki/Markdown)), generate the site from these plain text files and a bit of boilerplate, and then upload the site to your website hosting service. With CMSs, on the other hand, you typically log in to your blog to write your post with an in-browser editor. The post is stored in a database and the blog is generated from the data within the database.

## The Hacked Wordpress (CMS) Setup

The setup that got hacked was a [One-Click Install Wordpress Instance](https://www.digitalocean.com/community/tutorials/how-to-use-the-wordpress-one-click-install-on-digitalocean) on a [Small DigitalOcean Droplet](https://www.digitalocean.com/products/droplets/).

The following plugins were installed:
1. [WP Force SSL](https://wordpress.org/plugins/wp-force-ssl/) to enable HTTPS.
2. [Yoast SEO](https://wordpress.org/plugins/wordpress-seo/)

A single user with a very strong password was created... Pretty simple setup.

### How It Most Likely Got Hacked

The blog was most likely compromised in one of two ways:
1. A brute force password attack.
2. Exploiting a security vulnerability in one of the plugins or Wordpress itself.

### Additional Steps I Could Have Taken to Not Get Hacked

1. [Enabled automatic updates of plugins and Wordpress](https://codex.wordpress.org/Configuring_Automatic_Background_Updates).
2. Changed the password every three months and/or [added 2-factor authentication](https://codex.wordpress.org/Two_Step_Authentication).
3. Rate limited login attempts and used a non-standard login URL to make a brute force password attack much harder.
4. Pay to have it hosted and secured.

## The New Static Site Generator Setup

After the embarrassment of having my personal blog hacked, I decided to transition away from Wordpress to Jekyll, a [Ruby](https://www.ruby-lang.org/)-based static site generator. I chose _Jekyll_ primarily because [Github](https://github.com/) has an awesome feature called [Github Pages](https://pages.github.com/), which autogenerates and hosts Jekyll sites **for free**. All you have to do is plop the Jekyll source into a Github repo and enable _Github Pages_.

So far I am really liking the ease of posting (all it takes is pushing a single Markdown file) and low maintenance-- no updating plugins or databases or servers.

## It's All About Hardening

[Hardening](https://en.wikipedia.org/wiki/Hardening_(computing)) is a security principle that implies the system with the lowest attack surface area is the most secure. CMSs have so many layers to attack: plugins, login, database, the framework itself. Static site generators have a much smaller surface area for a hacker to take hold. That is why I will continue to use static site generators for my blogging needs. If I were to use Wordpress again, I would probably pay to do managed hosting, where someone else can worry about making sure it is secure.
