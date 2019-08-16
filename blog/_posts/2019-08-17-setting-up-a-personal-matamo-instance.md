---
layout: default
title: "Setting Up a Personal Matamo Instance with Ansible"
published: false
tags:
  - walkthroughs
---

This site used to use [Google Analytics](http://analytics.google.com) to gather website traffic data. However, there was always a level of uncomfort subjecting my website guests to tracking by Google. So, for a while, I removed analytics all together. But then I missed the valuable insights that analytics provided in learning what posts guests found useful. So, I decided to add analytics back, but in a way more geared towards user privacy. In comes Matomo.

[Matamo](https://matomo.org/) is a web analytics platform that allows self-hosting an instance; user data is not shared with a third-party like Google. I could have my cake (getting insights in which posts user found useful) and eat it too (not expose my website guests to web tracking). Here is how you can easily do the same with your website. If you are familar with Ansible and Matomo, and want to jump right to the code, do so here: <https://github.com/jonmbake/matomo-ansible>.

### Ensure Secondary Project Benefits

When doing personal projects, I try to think of ways to get secondary benefits like learning a new language or framework. I have always wanted to learn Ansible-- the framework that allows easy, reproducable server provisioning. This would be a great opportunity. 

### Ansible Basics

[Ansible](https://docs.ansible.com/ansible/latest/) allows one to provision (e.g. install Apache, MySQL, whatever) one or many servers easily and consistently by running a single command. A [playbook](https://docs.ansible.com/ansible/latest/user_guide/playbooks.html) [YAML](https://yaml.org/) file that describes how to do the provisioning. The playbook contains _tasks_ and _roles_. _Tasks_ are commands to run while provision, e.g. `apt-get install apache2`. _Roles_ can be thought of as a way to group _tasks_ that should be ran together.

_Ansible_ includes a [number of modules](https://docs.ansible.com/ansible/latest/modules/list_of_all_modules.html). _Modules_ are "pre-packaged commands". So, for example, instead of defining the task:

```
- name: Extract foo.zip to /tmp
  command: unzip foo.zip -d /tmp
```

You can use the [unarchive module](https://docs.ansible.com/ansible/latest/modules/unarchive_module.html#unarchive-module): 
```
- name: Extract foo.zip to /tmp
  unarchive:
    src: foo.zip
    dest: /tmp
```

### Translating Matomo Install Instructions to an Ansible Playbook

_Matomo_ documents the [server requirements for a Matomo Instance](https://matomo.org/docs/requirements/). These would simply have to be translated into an Ansible playbook. I decided to run a Ubuntu 18.04 so I installed the requirements using the [apt module](https://docs.ansible.com/ansible/latest/modules/apt_module.html#apt-module)
