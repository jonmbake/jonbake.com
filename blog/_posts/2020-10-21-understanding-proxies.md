---
layout: default
title: Understanding Proxies
---

Proxies are used throughout the internet. This post will describe why they are used, along with the two main flavors of proxies.

The basic paradigm of the internet is the _Client-Server/Request-Response._

![Client Server Internet Paradigm](/assets/images/2020-10-21-client-internet-server.png)

The client, for example a web browser, makes a HTTP request to a web server. The web server responds. Simple enough.

## Proxies

Proxies are intermediaries that sit either in front of the server or client. If the proxy sits in front of the server, it
is often time referred to as a [reverse proxy](https://en.wikipedia.org/wiki/Reverse_proxy). Any proxy that sits between
the client and the internet, is referred to as a _forward proxy_.

## Reverse Proxies

![Reverse Proxy](/assets/images/2020-10-21-reverse-proxy.png)

Common use cases for reverse proxies include load balancing, caching, editing response headers.

For example, with [Apache HTTP Server](), a reverse proxy to an application running on port 3000 with response header modification can be configured by enabling the
[mod_proxy and mod_headers modules](https://httpd.apache.org/docs/2.4/mod/), along updating the Apache config with:

```
<VirtualHost *:*>
    ProxyPreserveHost On
    # Reverse proxy application running locally on the server at port 3000
    ProxyPass / https://0.0.0.0:3000/
    ProxyPassReverse / https://0.0.0.0:3000/
    ServerName localhost
    # set cache-control response header
    Header merge Cache-Control no-cache
</VirtualHost>
```

## Forward Proxies

![Forward Proxy](/assets/images/2020-10-21-forward-proxy.png)

An example of a forward proxy is a [VPN service](https://en.wikipedia.org/wiki/Virtual_private_network), where all internet traffic from a client flows securely through a secure tunnel. The benefit of a VPN is the traffic is encrypted (making it good to use when connecting through insecure wifi like at a coffees shop), and the IP address of the client is hidden-- the IP address will be that of the VPN provider.
