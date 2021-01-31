---
title: Stanford Foundations of Information Security XACS101 1.1 -  Security Goals
topic: Courses
---

Notes from section _1.1 - Security Goals_ of [Stanford Foundations of Information Security XACS101 Course](https://online.stanford.edu/courses/xacs101-foundations-information-security).

## Security is Holistic

Hackers start with the simplest thing possible.

1. Physical
    1. Limit access to physical spaces includes offsite Data Centers
    2. Dumpster diving - shred sensitive documents

2. Technological
    1. Application Security e.g.:
        1. No flaws in identity verification process
        2. server configured correctly
        3. Interpret data robustly

    2. OS
    3. Network Security
        1. Mitigate malicious traffic
        2. Firewalls and Intrusion Detection Systems

    4. Policies and Procedures
        1. e.g. Phishing/Social Engineering
        2. Sneaking in tail gators
        3. Fixed through Education eg. never give out your password

Authentication - Who are you talking to

## Goals

Verify Identity - Three Ways:

1. Something you Know (Passwords)
    - One-time Passwords (OTP)

2. Something you Have (Token)
    - Strength depends on difficult of forging

3. Something you Are (Biometrics)
    - Palm scans for most effective
    - Has false positives and false negatives
        - false positive - authentic user rejected
        - false negative - imposter accepted            
    - Key management harder i.e. you can’t issue a new finger

Three types:

1. Server authentication - verifying cert
2. Client authentication - logging in
3. Mutual - both

## Authorization - Has permission to conduct action

Access Control List - e.g. Unix permission model

Access Control Model:

1. Mandatory - computer decides who can do what
2. Discretionary (unix) - users authorized to determine access
3. Non-Discretionary- determined by role

### [Bell-LaPadula Model](https://en.wikipedia.org/wiki/Bell%E2%80%93LaPadula_model)

* Classifications - Top Secret, Secret, Classified, Unclassified
* 3 Rules/Properties
    * Simple Property (no read up) - can’t access files with higher classification
    * Property (confinement) (no write down) - prevent information leakage - only people with at or greater classifications can see documents you create
    * Tranquility property - object can’t change classification level unless there are no other readers or writers

**2 Side Note: [Biba Integrity Model](https://en.wikipedia.org/wiki/Biba_model)

## Confidentiality - keep contents secret

- Encryption/crypo 

- [Stenography](https://en.wikipedia.org/wiki/Steganography)

- Access Controls

## Data Integrity

- Man in the Middle Attack
- Integrity Checks - Using Hashing Functions/Checksum
- Message Authentication Code (MACs) like Checksum w/ keys (SSL uses this)
- e.g. TCP/IP

## Accountability

- Who performed action
- Logging/Audit Trails
- Make sure to use secure logging w/ time stamping
- Data integrity in logs, can’t be able to change logs
- [WORM device](https://en.wikipedia.org/wiki/Write_once_read_many) - write once, read many

## Availability

- Uptime
- Have redundancy
- [DDoS](https://en.wikipedia.org/wiki/Denial-of-service_attack)

## Non-Repudiation

- Undeniability of transaction
- Usually involves 3rd party (not bitcoin)
- Generate evidence e.g. receipts (need to be digitally signed)
- Side Note: Interesting to create software to handle this.

Acronyms:

1. AAA - Authentication, Authorization, Accountability
2. CIA - Confidentiality, Integrity, Availability

Further study:

1. MACs
2. Bell-LaPadula Model
