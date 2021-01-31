---
title: Stanford Foundations of Information Security XACS101 1.3 - Secure Design Principles
topic: Courses
---

Notes from section _1.3 - Secure Design Principles_ of [Stanford Foundations of Information Security XACS101 Course](https://online.stanford.edu/courses/xacs101-foundations-information-security).

## Principle of Least Privilege

Just enough authority to get job done.

## Defense-in-Depth - i.e. Layered defense

- Don’t just rely on one layer of defense i.e. have redundancy

- **Prevent, detect, detain and recover**

- Intrusions will happen. Containment and recovery have to be planned out in advance **!ACTION!**

## Securing the Weakest Link

- Weak Password

- People (social engineering)

- Buffer overflows

- ** Implementation vulnerabilities result from inadvertent missing of control information and data

## Fail-Safe Stance i.e. Crash Gracefully

- Expect and plan for failure

- e.g. Elevators don’t go crashing down when power goes out

- e.g. Firewall down - no traffic - Deny Access by default stance

## Secure by Default

- Only enable 20% of the product features that are used by 80% of user population **!ACTION!**

- **“Hardening” a system - all unnecessary services off by default - attack surface smaller

## Simplicity

Implement _Choke Point_ - centralized code through which all checks must pass, keep it small simple, review and audit

## Usability

- Don’t rely on documentation, secure by default

- Read [Why Johnny Can’t Encrypt](https://people.eecs.berkeley.edu/~tygar/papers/Why_Johnny_Cant_Encrypt/OReilly.pdf) !**ACTION!**

- Users will ignore security dialogs, have to prevent them with from doing insecure actions

## Security Features Do Not Imply Security

- “Security is a process, not a product!” - Schneider
