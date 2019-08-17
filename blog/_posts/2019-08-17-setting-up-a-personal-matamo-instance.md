---
layout: default
title: "Setting Up a Personal Matamo Instance with Ansible"
tags:
  - walkthroughs
---

This site used to use [Google Analytics](http://analytics.google.com) to gather website traffic data. However, there was always a level of uncomfort with subjecting my website guests to tracking by Google. So, for a while, I removed analytics all together. But then I missed the valuable insights that analytics provided in learning what posts guests found useful. So, I decided to add analytics back, but in a way more geared towards user privacy. Matomo fit that bill.

[Matamo](https://matomo.org/) is a web analytics platform that allows self-hosting an instance; user data is not shared with a third-party like Google. I could have my cake (getting insights in which posts user found useful) and eat it too (not expose my website guests to third-party web tracking). Here is how you can easily do the same with your website. If you are familiar with _Ansible_ and _Matomo_, you can jump right to the code here: <https://github.com/jonmbake/matomo-ansible>.

### Secondary Side Project Benefits

When doing personal projects, I try to think of ways to get secondary benefits like learning a new language or framework. I have always wanted to learn [Ansible](https://docs.ansible.com/ansible/latest/)-- the framework that allows easy, reproducible server provisioning. Setting up a personal _Matomo_ instance would be a great opportunity.

### Ansible Basics

[Ansible](https://docs.ansible.com/ansible/latest/) allows one to provision (e.g. install Apache, MySQL, whatever) one or many servers easily and consistently by running a single command. A [playbook](https://docs.ansible.com/ansible/latest/user_guide/playbooks.html) [YAML](https://yaml.org/) file describes how to do the provisioning. The playbook contains _tasks_ and _roles_. _Tasks_ are commands to run while provision, e.g. `apt-get install apache2`. _Roles_ can be thought of as a way to group _tasks_ that should be run together.

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

Another _Ansible_ concept is _handlers_. _Handlers_ allow an action to performed at the end of a playbook when a certain task is invoked. For example, if you wanted to restart _Apache_ after activating a module, you could add a _handler notify_ to the task definition:

```
- name: Enable Apache SSL module
  apache2_module:
    state: present
    name: ssl
  notify: Restart Apache
```


### Translating Matomo Install Instructions to an Ansible Playbook

_Matomo_ documents the [server requirements for a Matomo Instance](https://matomo.org/docs/requirements/). These would simply have to be translated into an _Ansible_ playbook. The basic requirements are a _LAMP stack_ (_Linux_, _Apache_, _MySQL_ and _PHP_) so I installed those via the [apt module](https://docs.ansible.com/ansible/latest/modules/apt_module.html#apt-module) (Ubuntu's package manager):

```
- name: Install Apache, PHP, MySQL
  apt:
    pkg:
      - apache2
      - php7.2
      - php7.2-curl
      - php7.2-gd
      - php7.2-cli
      - mysql-server
      - php7.2-mysql
      - php7.2-xml
      - php7.2-mbstring
      - php7.2-geoip
    force_apt_get: true
    update_cache: yes
```
<small style="font-style: italic"><https://github.com/jonmbake/matomo-ansible/blob/master/roles/common/tasks/install-lamp.yml></small>

It's also important to make sure HTTPS/SSL is enabled with a valid certificate. [Certbot](https://certbot.eff.org/) makes it easy:

```
- name: Add certbot repo
      apt_repository:
        repo: ppa:certbot/certbot
        state: present

    - name: Install Certbot
      apt:
        pkg:
          - certbot
          - python-certbot-apache
        force_apt_get: true

    - name: Invoke Certbot
      command: certbot --apache -n --agree-tos -m {{ certificate_contact_email }} -d {{ certificate_domain }}
```
<small style="font-style: italic"><https://github.com/jonmbake/matomo-ansible/blob/master/site.yml></small>

Once the server is "LAMPified", the database can be created:

```
- name: Start MySQL
  service:
    name: mysql
    state: started
    enabled: yes

- name: Create Matomo database
  mysql_user:
    name: "{{ db_username }}"
    password: "{{ db_password }}"
    priv: '*.*:ALL'
    state: present
```
<small style="font-style: italic"><https://github.com/jonmbake/matomo-ansible/blob/master/roles/common/tasks/initialize-database.yml></small>

Notice that like the _Certbot_ tasks above, `db_username` and `db_password` are wrapped in double curly braces. This is because they are passed in as variables. Defaults can be set in the _roles defaults_ directory.

The last thing to do is install _Matomo_. We simply have to download and extract the zip to _/var/www/html/_-- the directory that _Apache_ serves by default:

```
- name: Matomo | Check if installed
  stat:
    path: /var/www/html/matomo
  register: matomo_install

- name: Matomo | Download
  get_url:
    url: https://builds.matomo.org/matomo.zip
    dest: /tmp
  when: matomo_install.stat.exists == false

- name: Matomo | Extract zip
  command: bsdtar --strip-components=1 -xvf /tmp/matomo.zip -C /var/www/html/
  when: matomo_install.stat.exists == false
```

### Now It's Your Turn

If you are currently using _Google Analytics_, I ask you to give _Matomo_ a shot. It is well-designed, free, and easy to set up. You might even learn something new during the setup process.
