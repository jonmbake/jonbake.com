---
title: Stanford Foundations of Information Security XACS101 1.2 - Secure System Design
topic: Courses
---

Notes from section _1.2 - Secure System Design_ of [Stanford Foundations of Information Security XACS101 Course](https://online.stanford.edu/courses/xacs101-foundations-information-security).

## Understanding Threats

* Defacement - Online Vandalism
* Infiltration - Unauthorized parties gain access to resources
* Phishing - spoofed site
* [Pharming -  DNS Cache Poisoning](https://en.wikipedia.org/wiki/Pharming)
* Insider Threats - 
    * Large percentage of attacks - How to mitigate?
        * Separation of Privilege  - not unrestricted access to all data
        * Least Privilege Principle - give them access only to least amount necessary to do job
        * Background checks
* Click Fraud - Attacker click on competitor’s ads
* DoS
* Data Theft and Data Loss
    * CA laws requires disclosure when data loss/theft happens
* Threat Modeling Exercise - Ask what are some of the worst things that could happen that would get in way of operations? Answer changes depending on goal of org.
    * Examples:
        * White House Website - Defacement
        * Commerce/Financial Institution Site - Compromise one or more accounts/DoS
        * Military - Infiltration w/ access to classified data

    * Where to spend $ to mitigate most significant risks
        * STRIDE.. Good exercise to do with team. What are the different ways each of the following can happen:
            1. Identify can be *Spoofed*
            2. *Tampered* with
            3. *Repudiated*
            4. *Information* disclosed (unauthorized)
            5. *DoS*
            6. *Escalation* of privilege

Takeaways: Security concerns are variable depending on circumstances. Have to prioritize what is important.

## Designing-In Security

* Should be built-in from the start.
* Design with security in mind
    * Define, document and measure security goals:
        * Role X should be able to do Y. Log all actions.
        * Encrypt data for Z.

    * Windows 98 diagnostic mode - bypass username/password
    * Internet - TCP/IP can put any source IP on packet (IP Spoofing) - limits usefulness of IP Whitelisting
        * [IPsec](https://en.wikipedia.org/wiki/IPsec) - secured version of IP

* Trade off between security and adoption/convenience
* Turtle Shell Architecture (e.g. Firewalls)
    * Inherently insecure system protected by another system
    * Should not be sole defense

Takeaways: Bake security in. Don’t use Turtle Shell Architecture to protect. Good technology increases security w/ little inconvenience.

## Security in Software Requirements

* Robust and consistent error handling requirements
    * Hackers try to produce errors to gain information or crash system
    * Share w/ QA team so they can write tests

* Use Defensive Programming
    * Handle Internal Errors Securely
        * Fault Injection - providing input program doesn’t expect

* Validation and Fraud Checks
* Security or Bust Policy

Mod 10 Checksum Credit Card number validity check

Access Control, Auditing, Confidentiality, Availability should be include in design docs

## Security by Obscurity

Trying to be secure by hiding details of how system work. Doesn’t work because;

* reverse engineer
* observe behavior in normal vs aberrant conditions
* Fuzzing - Systematically trying different input to find an exploit
* Blackmail insiders

Kerckhoffs’ doctrine - assume adversary knows how algorithm works. Key for security b/c can be changed/easier to keep secret.

## Game of Economics

For every dollar spend by defender, how much would attacker have to spend to break system? 

If cost to break system is much higher than gain, system can be considered secure.

Security is about risk management.

“Good Enough” security
