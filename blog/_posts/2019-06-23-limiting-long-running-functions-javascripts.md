---
layout: default
title: "Limiting Long Running Functions in JavaScript with Promise.race()"
tags:
  - software_dev
---

[AWS Lambda](https://aws.amazon.com/lambda/) is great for getting code up and running fast. You have to be careful, however, because there is a configurable execution timeout, which defaults to three seconds. If a Lambda execution runs for greater than the value configured, a nasty 500 error will be returned.

For _Lambda_ functions written in [Node](https://nodejs.org), [Promise.race()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race) can be leveraged to guard against timeouts. From the MDN docs:

> The Promise.race() method returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects, with the value or reason from that promise.

So, if we want our _Lambda_ to take an action programmatically before a timeout is about to occur, e.g. provide a better response message to the client, we can write code like:

```
const request = require('request');

exports.lambdaHandler = async (event, context) => {
  const lambdaTimeoutMs = 3000;

  // A promise that safe guards against a Lambda timeout by invoking logic after 3000 ms
  const timeoutProtectingPromise = new Promise(resolve => {
    const customTimeoutResponse = {
      'statusCode': 200, // Probably not the appropriate response code
      'body': 'The request took too long. Please try again.'
    };
    // Note: third argument in setTimeout is what is passed to #resolve
    setTimeout(resolve, lambdaTimeoutMs, customTimeoutResponse);
  );

  // Wrap the main logic of our lambda in a promise
  const possiblyLongRunningPromise = new Promise(resolve => {
    // Do work here. Possibly make a HTTP request, database query, or any action that might timeout
    request('https://example.com/slow-api', { json: true }, (err, response, body) => {
      response.on('end', () => {
        resolve({
          'statusCode': 200,
          'body': body
        });
      })
    });
  );

  // Use Promise.race to guard against hitting lambda timeout
  return Promise.race([timeoutProtectingPromise, possiblyLongRunningPromise]);
}
```

In the code above, we have a `timeoutProtectingPromise` that resolves a custom timeout response after the Lambda timeout is reached. We have another promise that wraps the main logic of the Lambda. We can then pass both _Promises_ to `Promise.race()`. If `possiblyLongRunningPromise` runs for greater than three seconds, the `timeoutProtectingPromise` will resolve first and `customTimeoutResponse` will be returned from the _Lambda_.
