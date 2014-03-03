<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [A Basic Callback][topic-a-basic-callback]

In the first example of [A Basic Tab][topic-a-basic-tab] there is still quite a bit of processing in the callback function for `setInterval`.  We can do better.

````javascript
var id, interval = 0,
    counter = new Tab();

id = setInterval(Tab.defer(counter, function () {
    interval += 1;
    return interval;
}), 1000);

counter
.try(function (value) {
    if (value <= 3600) {
        console.log(value % 2 === 1 ? "tick" : "tock");
    }
    if (value === 3600) {
        clearInterval(id);
        console.log("cuckoo");
    }
})
.catch(function (error) {
    console.log(error);
});
````

Compared to the example in [A Basic Tab][topic-a-basic-tab], in this example:

* [Tab.defer( counter, encapsulatedCallback )][ref-tab.defer] creates a new callback function, binding `counter` to the encapsulated callback.  This new deferred callback, when executed, will update `counter` with the return value of the encapsulated function, and a notification will be sent to all subscribers of `counter`.  In the case an error is thrown in the encapsulated function, `counter` is set to the failed state, and a notification will be sent to all subscribers of `counter`. 
 
However, we can still do better.   

````javascript
var id, interval = 0,
    counter = new Tab();

id = setInterval(Tab.deferReturn(counter), 1000);

counter
.try(function () {
    interval += 1;
    if (interval <= 3600) {
        console.log(interval % 2 === 1 ? "tick" : "tock");
    }
    if (value === 3600) {
        clearInterval(id);
        console.log("cuckoo");
    }
})
.catch(function (error) {
    console.log(error);
});
````

Compared to the previous example, in this example:

* We moved the calculation of the interval to the processor of `counter.try`.
* [Tab.deferReturn( counter )][ref-tab.defer-return] binds [Tab.prototype.return()][ref-tab.prototype.return] to `counter` - the latter method is what we used in the example in [A Basic Tab][topic-a-basic-tab] to update `counter`.  This callback, when executed will now update `counter` without providing a specific value, and a notification will be sent to all subscribers of `counter`.  In the unlikely case an error is thrown in the `return` method, `counter` is set to the failed state.   This is a *sugar* method for something like `Tab.defer(response, Tab.prototype.return.bind(response))`

We can also work with callbacks that have more than one argument.  The following assumes a function `httpGet` that hides a lot of the detailed mechanics of working with `XMLHttpRequest`, and that expects a callback with multiple arguments - a selection of the attributes of an `XMLHTTPRequest`-object.

````javascript
var response = new Tab(), 
    text = new Tab();

httpGet("http://code.jquery.com/jquery.js", Tab.deferReturn(response));

response
.try(function (responseText, responseStatus, readyState) {
    if ((readyState === 4) && (responseStatus === 200)) {
        text.return(responseText);
    }
});
````

In this example:

* [Tab.deferReturn( response )][ref-tab.defer-return], when called-back, updates `response` with **all** callback arguments.
* [response.try()][ref-tab.prototype.try] picks up the 'returned' notification with the arguments from the callback.  
* `this` refers to the new Tab object that is created by the `.try()` method.  In this specific case, we could also use `text`.
* When the conditions are right, [this.return()][ref-tab.prototype.return] updates `text` with the fetched document.  Alternatively, we could also just `return` the text, as we illustrated higher.

We could also write the following

~~~~javascript
var response = new Tab(), 
    text;

httpGet("http://code.jquery.com/jquery.js", Tab.deferReturn(response));

text = response.try(function (responseText, responseStatus, readyState) {
    if ((readyState === 4) && (responseStatus === 200)) {
        return responseText;
    }
    else {
        Tab.defer();
    }
});
~~~~

Compared to previous example, in this example:

* `text` is now a new tab created by the methods `response.try()`, instead explicitly needing to construct it.
* A traditional return statement is used to update `text` with `responseText`.
* When the conditions aren't right, [Tab.defer()][ref-tab.defer] defers the update further until next time the callback is called.  This avoids that the `undefined` return is interpreted as a valid value to update `text` - this is necessary because there is no way to distinguish between a function that returns `undefined` and a function that doesn't return anything.

<br />

---
### Methods introduced in this topic (and some related methods)

* [Tab.capture()][ref-tab.capture]
* [Tab.captureWith()][ref-tab.capture-with]
* [Tab.defer()][ref-tab.defer]
* [Tab.deferReturn()][ref-tab.defer-return]
* [Tab.deferThrow()][ref-tab.defer-throw]
* [Tab.trace()][ref-tab.trace]



### Other methods used in this topic

* [new Tab()][ref-new-tab]
<br />
* [.catch()][ref-tab.prototype.catch]
* [.return()][ref-tab.prototype.return]
* [.try()][ref-tab.prototype.try]



<br /> Back to [Top] | [Project] | [Topics] / [The Basics][topic-the-basics] | [Reference] <br />
