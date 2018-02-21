---
layout: default
title:  "Three JavaScript Constructs to Respond to an Asynchronous Event"
tags:
  - javascript
---

JavaScript is asynchronous in nature.  It won’t wait on an AJAX call to complete, or a setTimeout function to fire, instead it will keep trucking along and come back to these “background tasks” after they complete.  Given its asynchronous disposition, JavaScript gives a few constructs to make responding to asynchronous event completion possible.  This post covers three of these constructs: _Callbacks_, _Events_ and _Promises_.

## Callbacks

A _Callback_ is simply a function that gets invoked when an async operation completes.  A good example is _jQquery.ajax_‘s success callback:

```
var onSuccessCallback = function(data) {
  //kick off another AJAX request using data returned from first request
  if (data.yes) {
      $.ajax({
        url: "/second-request",
        success: function () {
          console.log('Second request succeeded!');
        }
    });
  }
};
$.ajax({
    url: "/should-second-request-proceed",
    success: onSuccessCallback
});
```

`$.ajax.sucess` gets invoked when the **asynchronous** AJAX call gets a successful response.  In addition, there are also callbacks for _onError_ and _onComplete_.

### Downside of callbacks

Callbacks can get pretty ugly when nested.  Often times you need to call another callback after its parent callback has completed, and then call another callback after that.  This can lead to deeply nested functions, which are not very aesthetically pleasing from a coding perspective.

## Events

Another alternative is events.  If you have ever used a framework like [Backbone](http://backbonejs.org/) or [jQuery](https://jquery.com/), you are well aware of events.  Events are nice because they allow the decoupling of where and when the event was fired from things that care about the outcome of that event.   For example, _Backbone_ will fire a _sync_ event anytime a model is saved to the server (an async event) and anything that cares about this can listen:

```
var MyModel = Backbone.Model.extend({
    urlRoot : '/foo'
});
var MyView =  Backbone.View.extend({
    initialize: function() {
        this.listenTo(this.model, "sync", this.render);
    },
    render: function () {
        this.$el.text('Synced value from the server ' + this.model.get('name'));
    }
});
var model = new Model({id: 1});
var view = new MyView({model: model});
model.fetch();  //will trigger 'sync' after AJAX request finishes and the view will render with fetched value
```

### Pros and Cons of Events

Allowing elements to listen to and trigger events allows for decoupling; the model doesn’t need to know about the view.  The main drawback to events is that when systems become complex, and events are flying all over the place, it can be hard to debug when problems arise.  Event ordering can be important.  A bug may be only visible when events A, B and C happen in order, but absent otherwise.  This can be tricky to debug.

## Promises

The final construct for dealing with async events is the newest and most promising (pun intended): _Promises_.  Prior to ES6, Promises were only available through a third party libraries like [Bluebird](https://github.com/petkaantonov/bluebird), [Q](https://github.com/kriskowal/q) or jQuery.  ES6 has promises baked in: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise.

Promises are JavaScript objects that represents an asynchronous operation.  The operation has a state of either _pending_, _fulfilled_, or _rejected_. For example, when wrapping an AJAX request within a Promise, when the request first kicks off, the promise will be in a _pending_ state. If the request fails with something like a 500 then it will transition to _rejected_.  If, on the other hand, it succeeds the _Promise_ state will transition to _fulfilled_.

Here is the same _Callback_ example using _Promises_ instead.  Conveniently, _$.ajax_ returns a promise:

```
$.ajax({url: "/should-second-request-proceed"})
  .then(function (data) {
    if (data.yes) {
      return $.ajax({
        url: "/second-request"
    });
    return $.Deferred().reject('Second request failed:(');
  }
  }).then(function () { console.log('Second request succeeded!'); });
```

The main benefit of _Promises_ is that they can be chained, avoiding the nesting-hell of callbacks.

## Conclusion

Each construct has its use.  If you are not not nesting async operations, then a _Callback_ is the way to go because it is simple and doesn’t require a third party library.  Events are great for decoupled components.  Promises can be used for “asynchronous chaining”.  All three constructs have their place in the JavaScript landscape.

Note: All the code written is pseudo code.  It was not tested in the browser.
