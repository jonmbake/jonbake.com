---
layout: default
title: "Leveraging JavaScript’s Type Coercion"
tags:
  - javascript
---

JavaScript has no Static Type System;  it is dynamic in nature.  But that does not mean it doesn’t have types.  With statically-typed languages like Java, you will see type information strewn all over the code– attached to formal parameters, on local variables, on class variables, etc.  Dynamical languages have types, it is just that types are **associated with the variable value**, rather than the variable itself.

## Using “== null” to Test for Null and Undefined

JavaScript treats many values as “falsy”;  these include _null_, _undefined_, _zero_ and _the empty string_.  JavaScript also has the _triple equals operator (===)_, which tests for type and value equality; and the _double equals operator (==)_, which only tests for value equality and allows for type coercion.

A common scenario is having to test for _null_ or _undefined_.  You can do this by leveraging _type coercion_.  Let’s write a quick code snippet that tests _double equals_ with the various “falsy” values:

```
//create a map of
var falsies = {null: null, undefined: undefined, emptyString: '', zero: 0};
for(var key in falsies) {
  var test = falsies[key] == null;
  console.log("Comparing " + key + " to null using double equals returns " + test);
}
```

This code outputs the following to console:  
Comparing **null** to null using double equals returns **true**  
Comparing **undefined** to null using double equals returns **true**  
Comparing **emptyString** to null using double equals returns **false**  
Comparing **zero** to null using double equals returns **false**

As you can see _null_ and _undefined_ both return _true_, the others return false.

## Casting a Falsy/Truthy Value to Boolean

As we all know, using the bang operator (!) negates a predicate expression.  At first glass, double negating an expression (!!) may seem pointless, but it does allow for the conversion from falsy/truthy values to the corresponding boolean value.  For example:

```
!!undefined //=>false
!!null //=>false
!!"" //=>false
!!0 //=>false
```

## Using “+StringValue” as an Alternative to parseInt

JavaScript has a built-in function called **parseInt** which takes a string value and converts it into a number.  You can do something similar with type coercion using the plus operator.

```
typeof +'1234' //prints "number"
```

## Wrap Up

This post showed just a couple examples on how to leverage the power of type coercion in JavaScript; there are many more.  It is important to remember that just because type information is not visible within your JavaScript code that does not mean types don’t exist.
