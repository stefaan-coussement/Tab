<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [A Basic Tap][topic-a-basic-tab]

````javascript
var id, interval = 0,
    counter = new Tab();

id = setInterval(function () {
    try {
        interval += 1;
        counter.return(interval);
    }
    catch (e) {
        counter.throw(e);
    }  
}, 1000);

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

In this example:

* [new Tab()][ref-new-tab] creates a new Tab object.    Alternatively, we can also use [Tab.construct()][ref-tab.construct].
* [counter.return()][ref-tab.prototype.return] updates `counter` with a new value and notifies all its subscribers. 
* [counter.throw()][ref-tab.prototype.throw] sets `counter` to the failed state (this is probably not going to be necessary in this very simple example) and notifies all its subscribers.
* [.try( onReturnedProcessor )][ref-tab.prototype.try] subscribes to all notifications from `counter` and creates a new Tab object for further processing.  When an 'returned' notification is received, the processor function is executed.  When a 'thrown' notification is received, the notification is passed on to all subscribers of the new tab created by this method.   
* [.catch( onThrownProcessor )][ref-tab.prototype.catch] subscribes to all notifications from the tab created by `.try()`.  When a 'throw' notification is received, the processor function is executed.

If we receive an object from some other piece of code, and we don't know if that object is a Tab object or not then we may want to test if it is a Tab.

````javascript
function log(object) {
    if (Tab.isTab(object)) {
        object
        .try(function (value) {
            console.log("object = " + JSON.stringify(value));
        })
        .catch(function (error) {
            console.log("error for 'object' = " + JSON.stringify(error));
        });
    }
    else {
        console.log("object = " + JSON.stringify(object));
    }
}
````

In this example:

* [Tab.isTab()][ref-tab.is-tab] returns `true` when `object` was created with the `new Tab()` constructor.

Alternatively, we can also make our life easier by converting the object to a tab.

````javascript
function log(object) {
    Tab(object)
    .try(function (value) {
        console.log("object = " + JSON.stringify(value));
    })
    .catch(function (error) {
        console.log("error for 'object' = " + JSON.stringify(error));
    });
}
````

In this example:

* [Tab()][ref-tab] returns the original `object` if it is a Tab object, otherwise a new tab is created and its value is set to `object`.  Alternatively, we can also use [Tab.convert()][ref-tab.convert].

However, we can even do better in this very simple example.

````javascript
function log(object) {
    try {
        console.log("object = " + JSON.stringify(object.valueOf()));
    }
    catch (error) {
        console.log("error for 'object' = " + JSON.stringify(error));
    }
}
````

In this example:

* [object.valueOf()][ref-tab.prototype.value-of] returns the value of `object`, no matter if it's a Tab object or not, otherwise if `object` is a Tab object in the failed state then its error is thrown.

There are a lot of javascript methods that will implicitly call this `.valueOf()` method.  Try the following.

````javascript
var i = Tab.newReturn(1);

log(i + 1); // > 2
````

In this example:

* [Tab.newReturn( 1 )][ref-tab.new-return] returns a new Tab object and is getting the value 1.  This is a *sugar* method for `Tab.construct().return(1)`.
* when `i` is accessed to add 1, `.valueOf()` is applied by the addition operator.  This is true for some javascript methods, but not for all.  For instance `console.log` will log the object without applying the `.valueOf()` method.  So when in doubt... and you don't have time to read (and understand) the ECMA specification, and you don't have time to experiment with lots of different browsers, then it's probably best to apply it explicitly.

Beware that the following will fail.

````javascript
var i = Tab.newReturn(1);

log(++i); // throws
````

Supporting this would need the *Proxy* object that is on the program for *ES.next*.  We may try to implement some experimental version at some point in time.  So watch this space.

<br />

---
### Methods introduced in this topic (and some related methods)

* [new Tab()][ref-new-tab]  
* [Tab()][ref-tab]  
<br />
* [Tab.construct()][ref-tab.construct]  
* [Tab.convert()][ref-tab.convert]  
* [Tab.isTab()][ref-tab.is-tab]  
* [Tab.newReturn()][ref-tab.new-return]  
* [Tab.newThrow()][ref-tab.new-throw]  
<br />
* [.catch()][ref-tab.prototype.catch]  
* [.finally()][ref-tab.prototype.finally]  
* [.hasReturned()][ref-tab.prototype.has-returned]  
* [.hasThrown()][ref-tab.prototype.has-thrown]  
* [.return()][ref-tab.prototype.return]  
* [.throw()][ref-tab.prototype.throw]  
* [.toString()][ref-tab.prototype.to-string]  
* [.try()][ref-tab.prototype.try]  
* [.valueOf()][ref-tab.prototype.value-of]  



<br /> Back to [Top] | [Project] | [Topics] / [The Basics][topic-the-basics] | [Reference] <br />
[$$$$$ start of links $$$$$]: #

[top]:       #top                        "back to the top of this page."
[project]:   /doc/project.md#the-project "back to the 'Project' section."
[topics]:    /doc/topics.md#topics       "back to the 'Topics' section."
[reference]: /doc/reference.md#reference "back to the 'Reference' section."



[topic-the-basics]:                              /doc/topics.md#the-basics                                  "more topics under 'The Basics'"
[topic-where-are-tabs-helping]:                  /doc/topics.md#where-are-tabs-helping                      "more topics under 'Where Are Tabs Helping?'"
[topic-where-are-tabs-lacking]:                  /doc/topics.md#where-are-tabs-lacking                      "more topics under 'Where Are Tabs Lacking?'"

[topic-a-basic-tab]:                             /doc/topics/a-basic-tab.md#top                             "A Basic Tab: creating and using a basic Tab object."
[topic-a-basic-callback]:                        /doc/topics/a-basic-callback.md#top                        "A Basic Callback: using a Tab object to handle callbacks."
[topic-a-basic-pipeline]:                        /doc/topics/a-basic-pipeline.md#top                        "A Basic Pipeline: using Tab objects for pipelining."
[topic-a-basic-promise]:                         /doc/topics/a-basic-promise.md#top                         "A Basic Promise: using a Tab object as a promise."
[topic-basic-lazy-evaluation]:                   /doc/topics/basic-lazy-evaluation.md#top                   "Basic Lazy Evaluation: using a Tab object for lazy evaluation."
[topic-basic-concurrent-computing]:              /doc/topics/basic-concurrent-computing.md#top              "Basic Concurrent Computing: using a Tab object to handle concurrent computing."

[topic-clean-function-signatures]:               /doc/topics/clean-function-signatures.md#top               "Clean Function Signatures: using function signatures without callbacks."
[topic-shallow-callback-nesting]:                /doc/topics/shallow-callback-nesting.md#top                "Shallow Callback Nesting: avoiding deeply nested functions."
[topic-top-down-control-flow]:                   /doc/topics/top-down-control-flow.md#top                   "Top-Down Control Flow: turning inverted control-flow back around."
[topic-predictable-execution-order]:             /doc/topics/predictable-execution-order.md#top             "Predictable Execution Order: avoiding issues with immediate callbacks."
[topic-modular-decomposition]:                   /doc/topics/modular-decomposition.md#top                   "Modular Decomposition:  ..."
[topic-aspect-oriented-programming]:             /doc/topics/aspect-oriented-programming.md#top             "Aspect Oriented Programming: ..."
[topic-exception-style-error-propagation]:       /doc/topics/exception-style-error-propagation.md#top       "Exception Style Error Propagation: letting errors propagate through a sequence of processing tabs."

[topic-debugging-asynchronous-events]:           /doc/topics/debugging-asynchronous-events.md#top           "Debugging Asynchronous Events: ..."



[ref-tab-object]:                   /doc/reference.md#tab-object                       "more attributes and methods under 'Tab Object'"
[ref-tab-constructor]:              /doc/reference.md#tab-constructor                  "more attributes and methods under 'Tab Constructor'"
[ref-tab-constructor-attributes]:   /doc/reference.md#tab-constructor-attributes       "more attributes under 'Tab Constructor Attributes'"
[ref-tab-constructor-methods]:      /doc/reference.md#tab-constructor-methods          "more methods under 'Tab Constructor Methods'"
[ref-tab-prototype-methods]:        /doc/reference.md#tab-prototype-methods            "more methods under 'Tab Prototype Methods'"
[ref-tab-instance-methods]:         /doc/reference.md#tab-instance-methods             "more methods under 'Tab Instance Methods'"
[ref-tab.ext-object]:               /doc/reference.md#tabext-object                    "more attributes and methods under 'Tab.Ext Object'"
[ref-tab.ext-methods]:              /doc/reference.md#tabext-methods                   "more attributes and methods under 'Tab.Ext Methods'"

[ref-new-tab]:                      /doc/reference/new-tab.md#top                      "new Tab(): construct a new tab, encapsulate a given tab if requested."
[ref-tab]:                          /doc/reference/tab.md#top                          "Tab(): convert to a tab, create a new tab if required."

[ref-tab.context]:                  /doc/reference/tab.context.md#top                  "Tab.context: the execution context for a processor function."
[ref-tab.context.pop]:              /doc/reference/tab.context.pop.md#top              "Tab.context.pop(): re-instate the previous execution context for a processor function."
[ref-tab.context.push]:             /doc/reference/tab.context.push.md#top             "Tab.context.push(): create a new execution context for a processor function."
[ref-tab.version]:                  /doc/reference/tab.version.md#top                  "Tab.version: the version of this Tab library."

[ref-tab.capture]:                  /doc/reference/tab.capture.md#top                  "Tab.capture(): create a function that uses a given tab to store another function's arguments, and then executes the other function."
[ref-tab.capture-with]:             /doc/reference/tab.capture-with.md#top             "Tab.captureWith(): create a function that uses a given tab to store another function's subject and arguments, and then executes the other function."
[ref-tab.construct]:                /doc/reference/tab.construct.md#top                "Tab.construct(): construct a new tab, encapsulate a given tab if requested."
[ref-tab.convert]:                  /doc/reference/tab.convert.md#top                  "Tab.convert(): convert to a tab, create a new tab if required."
[ref-tab.defer]:                    /doc/reference/tab.defer.md#top                    "Tab.defer(): create a function that uses a given tab to store another function's result."
[ref-tab.defer-return]:             /doc/reference/tab.defer-return.md#top             "Tab.deferReturn(): create a function that updates the value of a given tab."
[ref-tab.defer-throw]:              /doc/reference/tab.defer-throw.md#top              "Tab.deferThrow(): create a function that puts a given tab in the failed state."
[ref-tab.is-tab]:                   /doc/reference/tab.is-tab.md#top                   "Tab.isTab(): was the given object created by this Tab constructor?"
[ref-tab.new-return]:               /doc/reference/tab.new-return.md#top               "Tab.newReturn(): create a new tab that is initialized with a given value."
[ref-tab.new-throw]:                /doc/reference/tab.new-throw.md#top                "Tab.newThrow(): create a new tab that is put in the failed state."
[ref-tab.trace]:                    /doc/reference/tab.trace.md#top                    "Tab.trace(): create a function that uses a given tab to store another function's subject, arguments, and result."

[ref-tab.prototype.catch]:          /doc/reference/tab.prototype.catch.md#top          "Tab.prototype.catch(): process 'thrown' notifications for this tab and create a new tab with the result."
[ref-tab.prototype.finally]:        /doc/reference/tab.prototype.finally.md#top        "Tab.prototype.finally(): process 'returned' and 'thrown' notifications for this tab and create a new tab with the result."
[ref-tab.prototype.has-returned]:   /doc/reference/tab.prototype.has-returned.md#top   "Tab.prototype.hasReturned(): has this tab an update value?"
[ref-tab.prototype.has-thrown]:     /doc/reference/tab.prototype.has-thrown.md#top     "Tab.prototype.hasThrown(): has this tab thrown an error?"
[ref-tab.prototype.raise]:          /doc/reference/tab.prototype.has-raise.md#top      "Tab.prototype.raise(): pass the values of this tab to the target tab of the enclosing processing method."
[ref-tab.prototype.return]:         /doc/reference/tab.prototype.return.md#top         "Tab.prototype.return(): update the value of this tab."
[ref-tab.prototype.throw]:          /doc/reference/tab.prototype.throw.md#top          "Tab.prototype.throw(): put this tab in the failed state."
[ref-tab.prototype.to-string]:      /doc/reference/tab.prototype.to-string.md#top      "Tab.prototype.toString(): get a string representation for this tab."
[ref-tab.prototype.try]:            /doc/reference/tab.prototype.try.md#top            "Tab.prototype.try(): process 'returned' notifications for this tab and create a new tab with the result."
[ref-tab.prototype.value-of]:       /doc/reference/tab.prototype.value-of.md#top       "Tab.prototype.valueOf(): get the principal value of this tab."

[ref-tab.ext]:                      /doc/reference/tab.ext.md#top                      "Tab.Ext: resources for extending the Tab library."

[ref-tab.ext.defer]:                /doc/reference/tab.ext.defer.md#top                "Tab.Ext.defer(): the basic method to create deferred functions."
[ref-tab.ext.initialize]:           /doc/reference/tab.ext.initialize.md#top           "Tab.Ext.defer(): the basic method to initialize methods that process notifications from a tab."
[ref-tab.ext.has-returned]:         /doc/reference/tab.ext.has-returned.md#top         "Tab.Ext.hasReturned(): the basic method to check if a tab has returned a value."
[ref-tab.ext.has-thrown]:           /doc/reference/tab.ext.has-thrown.md#top           "Tab.Ext.hasThrown(): the basic method to check if a tab has thrown an error."
[ref-tab.ext.return]:               /doc/reference/tab.ext.return.md#top               "Tab.Ext.defer(): the basic method to update the value of a tab."
[ref-tab.ext.subscribe]:            /doc/reference/tab.ext.subscribe.md#top            "Tab.Ext.defer(): the basic method to subscribe to notifications from a tab."
[ref-tab.ext.throw]:                /doc/reference/tab.ext.throw.md#top                "Tab.Ext.defer(): the basic method to set a tab in the failed state."
