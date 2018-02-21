---
layout: default
title: "From Java To Javascript"
tags:
  - java
  - javascript
---

Sometimes we get trapped in our ways of thinking. What I mean by this is that once we are comfortable with a way to solve a problem, we always resort to solving problems using that technique, even it is not the best. We, as software developers often get into this trap.

We do this because it is hard to change our mode of thinking. I can’t imagine how hard it was for those back in the day who coded in C (a procedural language) to grasp the concepts of Object Oriented Programming. It probably took a great deal of hard work to retrain their brain to think the Object-Oriented way.

For me, learning Javascript was difficult coming from a Java background. Specifically there were five areas I had trouble grasping:

## 1 – Prototypical Inheritance

In Java, a class defines the template of an object. Classes allow the encapsulation of data/methods. They also allow classes to inherit from other classes creating an inheritance hierarchy.

Javascript does not have classes, just objects. The inheritance hierarchy is set up by objects inheriting from other objects, commonly referred to as prototypical inheritance. The parent object is referred to as the _Prototype_ of the inheriting object. Prototypical inheritance allows a great deal of flexibility, but can be dangerous because it is possible to change an object which is the parent to many other objects.

## 2 – The Many Different Ways to Construct an Object

In Java, there is a single way to create an object and that is with the _new_ keyword. Yes, there are constructional design patterns like _Factory Method_ and _Abstract Factory_ that abstract out the invocation of new, but these abstractions always must rely on _new_ to create an object.

In Javascript, there are three ways to construct an object:

1)  **Using Object Literal Notation** Basically Object Literal Notation creates a singleton of an object. An example of using this method of construction is:

```
var foo = {
  property: 1,
  method: function () {}
}
```

2)  **Using a Function Constructor** If you want to make many instances of a certain object, you can use a _Function Constructor_. A _Function Constructor_ looks very similar to how Java creates objects:

```
function Foo () {
  this.property = 1;
}

Foo.prototype.method = function () {
  return this.property;
};

var f = new Foo();
f.method(); //returns 1
```

3)  **Using Object.create** This allows one to create an object from a prototype. For example, you can do:

```
var proto = {
  protoFunction: function () {
    return "I am a function in the prototype";
  }
}

var newObj = Object.create(proto);

newObj.protoFunction(); //returns "I am a function in the prototype"
```

## 3 – Block vs Functional scope

Scope refers to the variables in reference at a given point in a program. In Java, scope is segmented by block (between the curly braces). For instance, local variables defined within a method are only accessible to code within that method, once the method returns, the scope also changes to back to the scope in which the function was invoked.

Unlike Java, Javascript is functionally scoped. Functional scope means anything defined within a function is visible to anything else within that same function (this includes other functions!!). One welcome side-effect of functional scope is _closures_. In Javascript, you can do something like:

```
function foo () {
    var ref = 1;  //CLOSURE -- this reference will be available to bar even after foo returns
    return function bar () {
        return ref++;
    };
}

var f = foo ();

f(); //returns 1

f(); //return 2
```

## 4 – Changing Contexts (this)

In Java, using _this_ always references the current object (class). Javascript functions have a _variable context_ meaning reference to _this_ might not always refer to the same thing. Confusing right? Take the following example:

```
function invokePrint () {
    this.print();
}

invokePrint();
```

If you run this code within Chrome Developer Tools Console, the print page dialog will appear. Why is this? It is because _this_ “defaults” to the window object which has a print method that displays the Print Dialog.

Alternatively, if we were to run the following the code:

```
var consolePrinter = {
    print: function () {
        console.log('Printing to console');
    }
};

invokePrint.bind(consolePrinter).call();  //will print 'Printing to console' to console
```

By calling _bind_ on _invokePrint_, we are changing the context and _this_ now refers the _consolePrinter_ object instead of _Window_.

## 5 – Javascript is Non-Opinionated

In Java, it is not possible to program using the _Functional Programming_ paradigm– functions or methods are not first class citizens– they can not be passed around. It might be possible to write procedural code using Java, but it would be really ugly. If you code in Java, you are going to write Object-Oriented code.

Javascript does not take such an opinionated approach. Basically, Javascript says, “code in style you like.” In Javascript, Functions are first class, meaning they can be passed into and returned from functions. As outlined above, Javascript supports OOP, but it is optional; technically, you could get on fine without using the OOP features of Javascript (this doesn’t mean you should). It is a bit strange at first to not be so constrained.

## Conclusion

This blog post highlights the differences between Java and Javascript. At a higher level, it points to the need to expand your horizon– _think outside your current box_.
