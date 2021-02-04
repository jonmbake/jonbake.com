---
layout: default
title: Tools for Privacy and Security Online
tags:
  - front-page
---

Online adverting and in turn bulk personal data collection is a multi-billion dollar industry. Sometimes it feels as if there is little an individual can do to protect privacy online. That doesn't mean we shouldn't try. There are simple steps we can all take to increase privacy and security online. This post outlines a few tools one can employ to be more secure online.

## Browser Extensions

Browser extensions allow third-parties to extend the behavior of browsers. There's a set of extensions that allow for greater browsing privacy by blocking certain unsafe behaviors. It's important to make sure the browser creator is a trusted third-party.

### Ad blocker

Ad blockers work by blocking network connections to known tracking sources. For example, many websites use _Google Analytics_ to track user behavior. The data is sent to Google and can be aggregated to track user behavior across the web. Ad blockers will block the tracking code from loading. Some good choices are:

- [uBlock Origin Chrome Extension](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm); [uBlock Origin Firefox Extension](https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/)


- [AdBlock Plus](https://adblockplus.org/)

### EFF's Privacy Badger

The [Electronic Frontier Foundation - EFF](https://www.eff.org/) is non-profit committed to fighting for privacy and user rights on the web. They offer privacy tools available free to the public. One of those tools is [Privacy Badger](https://www.eff.org/privacybadger), which works similarly to an ad blocker like _uBlock Origin_. Adding _Privacy Badger_ adds an extra layer of protection and will likely catch additional invisible trackers.

## Browser Settings

In addition to enabling browser extensions, you can also tweak browser settings to create a more secure browsing experience.

### Disable Third-party Cookies

Cookies are little bits of data that get transmitted with each web request. They are necessary for things like logging into a site and maintaining a session. However, third-party cookies-- cookies set by sites other than the one you're currently interacting with-- for the most part are unnecessary. They are primarily used to track user behavior across the web. They can be disabled in most browsers. In Chrome, you go to _chrome://settings/content/cookies_ and toggle the _Block third-party cookies_ button:

![Enable Block third-party cookies Chrome](/assets/images/blog/2019/11/09/chrome-block-third-party-cookies.png)

### Enable Do Not Track

When _Do Not Track_ is enabled, the browser will send a _DNT (Do not track)_ header with every request. Of course, it is the responsibility of the web page owner on whether the header will be respected. _GDPR_ and other government regulations are forcing companies to respect _DNT_. With more websites respecting _Do Not Track_, it is a valuable tool to increase user privacy.

## Behavioral

Beyond tools like enabling browser extensions, there are simple behaviors you can do to increase your online privacy and security. Here are a few.

### Turn Off Devices When Not In Use

To turn off devices when not in use seems rather impractical, but it is probably one of the best things you can do to increase your online security. Especially with mobile phones, app APIs are constantly being pinged with your location and other sensitive data. Short of hooking up a network sniffer, there is really no way to know what data is being uploaded in the background when your phone is on. The only solution is to turn it off so nothing can be sent.

### Use Private Browser

Private browsing mode creates a new cookie store. This ensures previously set cookies are not sent. It can be an additional safeguard against tracking cookies getting sent to untrusted sites.

#### Look for HTTPS

HTTPS encrypts web traffic between you and the website. In Chrome, a web page displays with a little lock icon if the site is using HTTPS. If the icon is not displaying, be aware that any data sent to the site will not be encrypted.

## More Advanced

You can go beyond behavioral and browser setting/extensions with these more advanced practices.

### Use a VPN

Even when a site does not use a tracking cookie, your [IP Address](https://en.wikipedia.org/wiki/IP_address) can be used as a tracking device. A Virtual Private Network (VPN) acts as a reverse proxy to the internet-- making your IP Address that of the provider. VPN traffic is also encrypted to the VPN server, making it an option for use over an untrusted Wifi connection like at a café.

It is very important to choose a trustworthy VPN provider. The VPN provider has the same level of insight into your online behavior as an [ISP](https://en.wikipedia.org/wiki/Internet_service_provider). They could log all your behavior. Make sure to do a bit of research prior to choosing one.

### Setup a Pi-Hole

A [Pi-Hole](https://pi-hole.net/) is a bit of software that runs on a [Raspberry Pi](https://www.raspberrypi.org/) that effectively acts as a network-wide ad blocker. It's like having uBlock origin automatically installed on every device connected to the network. It's more of an advanced option because it requires a bit of technical knowledge to set up, but the extra protection is well worth it.
