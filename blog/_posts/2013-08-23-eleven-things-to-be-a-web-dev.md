---
layout: default
title: "Eleven Things to Learn to Become a Successful Web Developer"
tags:
  - software_dev
---

I remember when I started out on my path to become a software developer. It started out with excitement and gradually developed into a sense of being overwhelmed with all the stuff to be learned. It is easy to become overwhelmed when starting out because there are so many things to learn in order to be a successful software developer. The plethora of things to learn can be scary, but it can (and should) also be exciting.

It is important to remember that it is not possible to be a great software developer overnight. Rome wasn’t built in a day and neither was any great web developer. It takes years of conscious effort. The key is to prioritize your learning so you that you learn the most relevant things early on and save the not-so-important things for later on.

These are things (in order) of what I would study if I were starting out today. Note: this article is more geared towards web development, but any software developer can benefit.  You might be asking yourself, “why eleven things to learn and not ten (a nice round number)?”  And to that I would respond, “Because it is my blog and I do what I want.”

## \#1 Data Structures/Algorithms

In order to be a good software developer, you must think like a software developer and algorithms are the way in which a software developer thinks. An algorithm is defined as the step-wise process to solve a problem. A certain way of thinking is a hard thing to learn. It is more about being exposed to many problems solved by algorithms than reading a book.  Hint, hint: start thinking about how to solve a problem with an algorithm.

While algorithms are the process, data structures are the components of the algorithm. Common data structures used in practice are: array, list, map (hash), tree structures (like binary search tree, for example). Learn these well, my friends.

## \#2 A Good Text Editor

If you can improve the speed at which you edit text by 5% by using a good text editor that almost directly translates into being a 5% more efficient software developer. The text editor is the canvas on which we create our art, and just as a good artist would not choose a cheap canvas, so you should not choose a clunky editor. Whatever editor you choose, make sure to spend time learning its features.

Some good candidates for text editors are: Vim or Sublime Text.  Although Vim takes a bit longer to learn (but it’s worth it).

## \#3 Version Control

Imagine that you are writing a great piece of software and you make a few changes, which completely mess everything up.  What do you do?  If your software is under version control, you can easily back out the change to when things weren’t so messed up.  Version control is great because it gives you a history of all your changes.  It makes it easy to see the the history that brought about the current state of the code base.  It also makes it easy for a team to collaborate.

There are two main paradigms in the version control world:  Distributed and Central.  In the central model, there is a single repository from which all clients push to.  On the other hand, in a distributed version control system, each client clones a copy of the repository.  This gives each client better control of local changes, which is always good.  The most popular distributed systems are [Git](http://git-scm.com/) and [Mercurial](http://mercurial.selenic.com/).  A popular Central VCS is [Subversion](http://subversion.apache.org/)

## \#4 HTML/HTML5/CSS

There is not much to learn with HTML. HTML is a declarative, markup language, which browsers use to interrupt how to display a web page. While HTML is static, dull and boring; HTML5 is exciting, dynamic and fun. The really cool thing about HTML5 is that it supports a lot of the current multi-media flavors. For instance, coding of 2D and 3D graphics is possible in HTML5, which allows developing HTML5 games. Pretty cool stuff.

No matter how much of a “server-side” guy you are i.e. a guy who is all about getting things done with little regards for style, at some point you will have to add some style to a web page. CSS is the style component of the web. It is really hard to make a website look beautiful. I give major “props” to web designer who can do this. Fortunately, there are front-end frameworks like [Bootstrap](http://getbootstrap.com/), which allow you to make beautiful sites without delving too much into the intricacies of CSS, but it is still something you should know.

## \#5 Javascript

More and more code is moving to the front end. This is great because it leads to more interactive sites, but it also means that you have to know Javascript. With the advent of front-end frameworks like Backbone and Ember, you can do some really cool things in the front-end. Learn Javascript and you will be able to make some really cool web apps.

## \#6 SQL

SQL is another declarative language. However, unlike HTML, its purpose is the language of data storage. Data is huge in apps nowadays, and while SQL is not the language to access and alter data in all cases, it is for the majority of data. Almost every application now a day is data driven. It is a good idea to know the language to access and update that data.

A small note: if you use a framework like Ruby on Rails or Java EE, you will most likely use a ORM (Object-relational mapping) sub-framework like Hibernate or ActiveRecord. Using a ORM framework is not an excuse for not learning SQL. Even if you use a ORM, chances are you will still need to know SQL.

## \#7 NoSQL

Often times, software developers get into a single-mode of thinking. It can be difficult to imagine attacking the problem any other way. This can be dangerous to a software developer because often times the way things were done in the past is not the best way now. We need open minds in order to use the best tools available to solve a problem in the most elegant way. Even if you are not going to use NoSQL in a project, it is still a good idea to learn a bit of it if for no other reason than to offer a different way of thinking about the language of data storage beyond SQL.

There are a few flavors, with some of the more common ones being: CouchDB, MongoDB, Neo4j and a few others.

## \#8 A Dynamic/Scripting Language

There are two flavors of common programming languages: dynamically typed and statically typed. Dynamically typed languages are typically interpreted, while statically typed are compiled.

Your dynamic language is like a swiss army knife in your software development tool belt. There are often times when you need to write a quick script to do something, like, for instance, authenticate to an active directory server. It is a really good thing to know an “all-purpose” language.

A bonus to learning one of these languages is that many of them have web frameworks built around them. For example, Ruby has Ruby on Rails, Python has Django, etc.

Some good candidates to study are Ruby, Python, Perl or JavaScript.

## \#9 A Statically Typed “Heavyweight” Language

These are a bit more heavy-duty. They are compiled, which means it is slower to go from writing code to seeing the results of the code. The benefits of a statically typed language is that the compiler can catch many errors at compile-time. Also, they will typically run a little faster.

There is some debate whether the static benefits of compiling is worth it in the modern times of really smart IDEs and really fast processors. One thing that is for certain is that there will always be great quantities of statically typed legacy code out there so it is a good idea to learn one (or a couple) of these.

Some good candidates are: C++ or Java

## \#10 Regular Expressions

It is a huge understatement to say that searching and replacing text are of great importance to a software developer. Writing regular expressions is the language of the search and replace. Beyond search and replace, you will find regular expressions used in places like defining a lexer (used in parsing) . Regular expressions are important. You should become good at writing them.

## \#11 Common Software Practices

When someone first thinks of software development, they probably think of a nerdy guy alone in his basement hacking away on the keyboard. This is not a very accurate vision of the actual life of a developer. In fact, a software developer’s life is very social. There is interaction with other developers, customers, and management.

One of the biggest boasts you can give yourself as a software developer is to learn common software development practices. That way when you work with another developer, or a team of developers, you are on the same page.

**Reading and comprehending another person’s code is probably the single most important skill you can possess.** Another good thing to learn is common workflows of software development. It is good to know common software development processes like Agile and Waterfall. It is good to learn common coding styles. Software development is not just about getting a piece of software to function, it is more about doing it in an elegant, extendable, efficient way that your peers can quickly understand. This truly takes a lot of skill.

## Final Thoughts

You don’t have to be good at everything. I will go even further than that and say that it is impossible to be good at everything. The important thing is to learn. Being in such an ever changing industry such as software development means that you must continue to learn so go start learning!
