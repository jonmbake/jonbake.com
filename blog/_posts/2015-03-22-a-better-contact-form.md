---
layout: default
title: "A Better Contact Form"
tags:
  - software_dev
---

What the hell was I thinking? It is the question I ask myself just about everytime I look at code that I had written in the past. The longer it has been since I touched the code, the greater this feeling of bewilderment at how stupid I was. This is probably a good thing because it is an indicator of growth as a software developer.

Recently, I re-explored code I had written for a [Bootsrap Contact Form](/blog/2013/10/17/bootstrap-3-contact-form-with-captcha.html) and without failure that same feeling of “what the hell was I thinking” creeped into my mind. This post is about the mistakes I made and what I did to correct them. (PS: I pushed the updates to Github here: [Bootstrap 3 Contact Form V1.1 changes](https://github.com/jonmbake/bootstrap3-contact-form/commit/f502b9ef0dcda710d4aca2738f75fc22f2e56699))

## Email Configuration – Use Environment Variables!

The first version of the contact form required developers that used the form to go to the main PHP file, find the the place where the recipient email address was defined and change it to the email address they wanted to use. This was clunky and not very practical. If you write a library or utility, it is not a good idea to have users go in and edit your code to add their configurations.

There is a popular group of principles for building web-based applications called the [12-Factor App](http://12factor.net/). One of the principles of the 12-Factor App is to use [Environment Variables](http://en.wikipedia.org/wiki/Environment_variable) for configuration values. In the case of the contact form, the email address should be an environment config (and is in the new version).

## Problems with PHP#Mail

A big part of developing software is weighing the pros and cons of a particular solution. Solutions often times involve pulling in a dependency. The major pro of pulling in a dependency is that it usually adds greater capabilities to the applcation. On the other hand, it adds more complexity and bloat to the software systeem.

[PHP#Mail](http://php.net/manual/en/function.mail.php) is the built-in PHP function to send an email. It is very basic, not supporting things like authentication. Unfortunately, most email providers today require authentication so PHP#Mail is not a very practical solution. The solution was to use a third-party library, [PHPMailer](https://github.com/PHPMailer/PHPMailer), which supports things like authentication and SSL/TLS encryption.

## Bad Javascript Practices

Dynamic languages like Ruby and Javascript are great because they allow developers a great freedom to do pretty much whatever they want (including crazy things like [Monkey Patching](http://en.wikipedia.org/wiki/Monkey_patch)). Freedom is good, but when there are many ways to do something often times programmers will not make the best choices.

One of the greatest no-nos in Javscript is to pollute the global namespace with global variables. The previous version of the contact form had some contact form utilities defined in the global namespace like (see [var contactForm](https://github.com/jonmbake/bootstrap3-contact-form/blob/v1.0/assets/js/contact-form.js)).

A better solution is to use a self-executing function which creates a new namespace (outside of global) like so:

```
(function (window) {
    //new scope - not global
}(window))
```

## Final Thoughts

Code is never perfect. It can always be improved on. I think it is always a good idea to go back and refactor to improve upon code that you written in the past. Always strive to make your code the best it can be; I know I will.

**Check out the new version demo:** [Bootstrap 3 Contact Form Demo](http://jonmbake.github.io/bootstrap3-contact-form/)

**Source:** [Bootstrap 3 Contact Form Source](https://github.com/jonmbake/bootstrap3-contact-form)
