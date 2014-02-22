<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [A Basic Callback][topic-a-basic-callback]

In the first example of [A Basic Tab][topic-a-basic-tab] there is still quite a bit of processing in the callback function for `setInterval`.  We can do better.

~~~~javascript
var id, interval = 0,
    counter = new Tab();

id = setInterval(Tab.doDefer(counter, function () {
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
~~~~

Compared to the example in [A Basic Tab][topic-a-basic-tab], in this example:

* [Tab.doDefer( counter, encapsulatedCallback )][ref-tab.do-defer] creates a new callback function, binding `counter` to the encapsulated callback.  This new deferred callback, when executed, will 
*  `counter` with the return value of the encapsulated function, and a notification will be sent to all subscribers of `counter`.  In the case an error is thrown in the encapsulated function, `counter` is set to the failed state, and a notification will be sent to all subscribers of `counter`. 
 
However, we can still do better.   

~~~~javascript
var id, interval = 0,
    counter = new Tab();

id = setInterval(Tab.return(counter), 1000);

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
~~~~

Compared to the previous example, in this example:

* We moved the calculation of the interval to the processor of `counter.try`.
* [Tab.doReturn( counter )][ref-tab.do-return] binds [Tab.prototype.return()][ref-tab.prototype.return] to `counter` - the latter method is what we used in the example in [A Basic Tab][topic-a-basic-tab] to update `counter`.  This callback, when executed will now update `counter` without providing a specific value, and a notification will be sent to all subscribers of `counter`.  In the unlikely case an error is thrown in the `return` method, `counter` is set to the failed state.

We can also work with callbacks that have more than one argument.  The following assumes a function `httpGet` that hides a lot of the detailed mechanics of working with `XMLHttpRequest`, and that expects a callback with multiple arguments - a selection of the attributes of an `XMLHTTPRequest`-object.

~~~~javascript
var response = new Tab(), 
    text;

httpGet("http://code.jquery.com/jquery.js", Tab.doReturn(response));

text = response.try(function (responseText, responseStatus, readyState) {
    if ((readyState === 4) && (responseStatus === 200)) {
        this.return(responseText);
    }
    else {
        doDefer(this);
    }
});
~~~~

In this example:

* [Tab.doReturn( response )][ref-tab.do-return], when called-back, updates `response` with **all** callback arguments.
* [response.try()][ref-tab.prototype.try] picks up the 'returned' notification with the arguments from the callback.  
* `this` refers to the new Tab object that is created by the `.try()` method.  In this specific case, we could also use `text`.
* When the conditions are right, [this.return()][ref-tab.prototype.return] updates `text` with the fetched document.  Alternatively, we could also just `return` the text, as we illustrated higher.
* When the conditions are not right, [this.defer()][ref-tab.prototype.defer] defers the update further until next time the callback is called.  This avoids that the `undefined` return is interpreted as a valid value to update `text` - this is necessary because there is no way to distinguish between a function that returns `undefined` and a function that doesn't return anything.

>>>>>>>>> defer inner async function calls.

>>>>>>>>> better to do this using try.

>>>>>>>>> capture, captureWith.

>>>>>>>>> trace.



### Methods introduced in this topic (and some related methods):

* [Tab.doCapture()][ref-tab.do-capture]
* [Tab.doCaptureWith()][ref-tab.do-capture-with]
* [Tab.doDefer()][ref-tab.do-defer]
* [Tab.doReturn()][ref-tab.do-return]
* [Tab.doThrow()][ref-tab.do-throw]
* [Tab.doTrace()][ref-tab.do-trace]



### Other methods used in this topic:

* [new Tab()][ref-new-tab]
<br />
* [.catch()][ref-tab.prototype.catch]
* [.return()][ref-tab.prototype.return]
* [.try()][ref-tab.prototype.try]



<br /> Back to [Top] | [Project] | [Topics] / [The Basics][topic-the-basics] | [Reference] <br />
[$$$$$ start of links $$$$$]: #

[top]:       #top                        "back to the top of this page."
[project]:   /doc/project.md#the-project "back to the 'Project' section."
[topics]:    /doc/topics.md#topics       "back to the 'Topics' section."
[reference]: /doc/reference.md#reference "back to the 'Reference' section."



[topic-the-basics]:                              /doc/topics.md#the-basics                                  "more topics under 'The Basics'"

[topic-a-basic-tab]:                             /doc/topics/a-basic-tab.md#top                             "A Basic Tab: creating and using a basic Tab object."
[topic-a-basic-callback]:                        /doc/topics/a-basic-callback.md#top                        "A Basic Callback: using a Tab object to handle callbacks."
[topic-a-basic-promise]:                         /doc/topics/a-basic-promise.md#top                         "A Basic Promise: using a Tab object as a promise."
[topic-basic-pipelining]:                        /doc/topics/basic-pipelining.md#top                        "A Basic Pipeline: using Tab objects for pipelining."
[topic-basic-lazy-evaluation]:                   /doc/topics/basic-lazy-evaluation.md#top                   "Basic Lazy Evaluation: using a Tab object for lazy evaluation."
[topic-basic-concurrent-computing]:              /doc/topics/basic-concurrent-computing.md#top              "Basic Concurrent Computing: using a Tab object to handle concurrent computing."



[ref-tab-object]:                   /doc/reference.md#tab-object                       "more attributes and methods under 'Tab Object'"
[ref-tab-constructor]:              /doc/reference.md#tab-constructor                  "more attributes and methods under 'Tab Constructor'"
[ref-tab-constructor-attributes]:   /doc/reference.md#tab-constructor-attributes       "more attributes under 'Tab Constructor Attributes'"
[ref-tab-constructor-methods]:      /doc/reference.md#tab-constructor-methods          "more methods under 'Tab Constructor Methods'"
[ref-tab-prototype-methods]:        /doc/reference.md#tab-prototype-methods            "more methods under 'Tab Prototype Methods'"
[ref-tab-instance-methods]:         /doc/reference.md#tab-instance-methods             "more methods under 'Tab Instance Methods'"
[ref-tab.ext-object]:               /doc/reference.md#tab.ext-object                   "more attributes and methods under 'Tab.Ext Object'"
[ref-tab.ext-methods]:               /doc/reference.md#tab.ext-methods                 "more attributes and methods under 'Tab.Ext Methods'"

[ref-new-tab]:                      /doc/reference/new-tab.md#top                      "new Tab(): construct a new tab, encapsulate a given tab if requested."
[ref-tab]:                          /doc/reference/tab.md#top                          "Tab(): convert to a tab, create a new tab if required."

[ref-tab.context]:                  /doc/reference/tab.context.md#top                  "Tab.context: the execution context for a processor function."
[ref-tab.context.pop]:              /doc/reference/tab.context.pop.md#top              "Tab.context.pop(): re-instate the previous execution context for a processor function."
[ref-tab.context.push]:             /doc/reference/tab.context.push.md#top             "Tab.context.push(): create a new execution context for a processor function."
[ref-tab.version]:                  /doc/reference/tab.version.md#top                  "Tab.version: the version of this Tab library."

[ref-tab.construct]:                /doc/reference/tab.construct.md#top                "Tab.construct(): construct a new tab, encapsulate a given tab if requested."
[ref-tab.convert]:                  /doc/reference/tab.convert.md#top                  "Tab.convert(): convert to a tab, create a new tab if required."
[ref-tab.do-capture]:               /doc/reference/tab.do-capture.md#top               "Tab.doCapture(): create a function that uses a given tab to store another function's arguments, and then executes the other function."
[ref-tab.do-capture-with]:          /doc/reference/tab.do-capture-with.md#top          "Tab.doCaptureWith(): create a function that uses a given tab to store another function's subject and arguments, and then executes the other function."
[ref-tab.do-defer]:                 /doc/reference/tab.do-defer.md#top                 "Tab.doDefer(): create a function that uses a given tab to store another function's result."
[ref-tab.do-return]:                /doc/reference/tab.do-return.md#top                "Tab.doReturn(): create a function that updates the value of a given tab."
[ref-tab.do-throw]:                 /doc/reference/tab.do-throw.md#top                 "Tab.doThrow(): create a function that puts a given tab in the failed state."
[ref-tab.do-trace]:                 /doc/reference/tab.do-trace.md#top                 "Tab.doTrace(): create a function that uses a given tab to store another function's subject, arguments, and result."
[ref-tab.get-context]:              /doc/reference/tab.get-context.md#top              "Tab.getContext(): get the execution context for a processor function."
[ref-tab.is-tab]:                   /doc/reference/tab.is-tab.md#top                   "Tab.isTab(): was the given object created by this Tab constructor?"
[ref-tab.new-return]:               /doc/reference/tab.new-return.md#top               "Tab.newReturn(): create a new tab that is initialized with a given value."
[ref-tab.new-throw]:                /doc/reference/tab.new-throw.md#top                "Tab.newThrow(): create a new tab that is put in the failed state."

[ref-tab.prototype.catch]:          /doc/reference/tab.prototype.catch.md#top          "Tab.prototype.catch(): process 'thrown' notifications for this tab and create a new tab with the result."
[ref-tab.prototype.finally]:        /doc/reference/tab.prototype.finally.md#top        "Tab.prototype.finally(): process 'returned' and 'thrown' notifications for this tab and create a new tab with the result."
[ref-tab.prototype.has-thrown]:     /doc/reference/tab.prototype.has-thrown.md#top     "Tab.prototype.hasThrown(): has this tab thrown an error?"
[ref-tab.prototype.return]:         /doc/reference/tab.prototype.return.md#top         "Tab.prototype.return(): update the value of this tab."
[ref-tab.prototype.throw]:          /doc/reference/tab.prototype.throw.md#top          "Tab.prototype.throw(): put this tab in the failed state."
[ref-tab.prototype.to-string]:      /doc/reference/tab.prototype.to-string.md#top      "Tab.prototype.toString(): get a string representation for this tab."
[ref-tab.prototype.try]:            /doc/reference/tab.prototype.try.md#top            "Tab.prototype.try(): process 'returned' notifications for this tab and create a new tab with the result."
[ref-tab.prototype.value-of]:       /doc/reference/tab.prototype.value-of.md#top       "Tab.prototype.valueOf(): get the principal value of this tab."

[ref-tab.ext]:                      /doc/reference/tab.ext.md#top                      "Tab.Ext: resources for extending the Tab library."

[ref-tab.ext.defer]:                /doc/reference/tab.ext.defer.md#top                "Tab.Ext.defer(): the basic method to create deferred functions."
[ref-tab.ext.initialize]:           /doc/reference/tab.ext.initialize.md#top           "Tab.Ext.defer(): the basic method to initialize methods that process notifications from a tab."
[ref-tab.ext.has-thrown]:           /doc/reference/tab.ext.has-thrown.md#top           "Tab.Ext.hasThrown(): the basic method to check if a tab has thrown an error."
[ref-tab.ext.return]:               /doc/reference/tab.ext.return.md#top               "Tab.Ext.defer(): the basic method to update the value of a tab."
[ref-tab.ext.subscribe]:            /doc/reference/tab.ext.subscribe.md#top            "Tab.Ext.defer(): the basic method to subscribe to notifications from a tab."
[ref-tab.ext.throw]:                /doc/reference/tab.ext.throw.md#top                "Tab.Ext.defer(): the basic method to set a tab in the failed state."
