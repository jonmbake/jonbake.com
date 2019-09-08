---
layout: default
title: My Home Network Setup
---

![Home network setup](/assets/images/blog/2019/09/08/home-network.jpeg)

For all the nerdy networking folks out there, this is an overview of my home networking setup (picture included).

## 1. Fiber Network Box

I am fortunate to live in an area where _Fiber Internet_ is offered. The posted speed from my [ISP](https://en.wikipedia.org/wiki/Internet_service_provider) is 300mb/s. I mostly stream sports via [YouTube TV](https://tv.youtube.com/), watch informational videos on [YouTube](https://youtube.com/), and perform work-related activities (e.g. `git clone`, `npm install`, etc.), which is not network intensive. The speed is plenty for my needs.

The _Network Box_ is the junction point where the internet becomes consumable. The fiber cable is feed in and the box itself functions as a router. This was provided by my _ISP_.

## 2. Pepwave Surf SOHO Wifi Router

 The [Pepwave Surf SOHO Router](https://www.peplink.com/products/pepwave-surf-soho/) is a great "professional-grade" router for home use. Peplink, the company that creates the router, provides frequent firmware updates. The wifi range is wonderful, easily covering my largish apartment.

## 3. Raspberry Pi 3 B+ Running Pi-hole

[Pi-hole](https://pi-hole.net/) is a _DNS server proxy_ that returns _Not Found_ when a DNS query is ran for a known advertisement URL (stored and configurable in Pi-hole as [ad lists](https://github.com/pi-hole/pi-hole/wiki/Customising-sources-for-ad-lists)). This _DNS server proxy_ setup is formally known as a [DNS sinkhole](https://en.wikipedia.org/wiki/DNS_sinkhole). When configuring the router to use Pi-hole as the DNS server, it basically functions as a network-wide ad blocker.

![Pi-hole router setup](/assets/images/blog/2019/09/08/router-pi-hole-setup.png)

<small style="font-style: italic">Configuring Pi-hole as a network-wide ad blocker. Pi-hole's DNS server is running at 192.168.50.26</small>

The problem with browser ad blockers is that they have to be installed within each browser instance and some browsers, e.g. Chrome on Android, do not support them. By using Pi-hole, you get the benefit of browser ad-blockers across the entire network without the need to install any additional software.


## 4. Phillips Hue Bridge

The [Phillips Hue Bridge](https://www2.meethue.com/en-us/p/hue-bridge/046677458478) controls the Hue lights in my apartment. Awhile back I was having problems with my sleep, which seemed to be [circadian rhythm](https://www.sleepfoundation.org/articles/what-circadian-rhythm) related. One of things that has been helpful is setting the light level to "Energize" in the morning and "Dimmed" at night.

# 5. AmazonBasics Surge Protector Power Strip

It's not highlighted in picture, but I also use the [AmazonBasics Surge Protector Power Strip](https://amazon.com/AmazonBasics-6-Outlet-Surge-Protector-Power/dp/B00TP1C1UC) as a cheap and effective way to provide surge protection to the whole setup.
