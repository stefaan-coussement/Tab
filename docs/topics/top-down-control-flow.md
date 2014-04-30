<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [Top-Down Control Flow][topic-top-down-control-flow]

We often need to apply functions on the result of other functions.  This can lead to an inverted control-flow, where the function that is written first in your code is executed last.

````javascript
// using nested functions: 

sendMessage(composeMessage(getAddress(name)));
console.log(name, ": sent");
````

This is typically avoided by introducing variables.

````javascript
// using a sequence of assignments

var address, message;

address = getAddress(name);
message = composeMessage(address);
sendMessage(message);
console.log(name + ": sent");
````

There are various techniques to restore the normal order of control flow without needing to introduce variables.

````javascript
// using nested callbacks: 

getAddress(name, function (address) {
    composeMessage(address, function (message) {
        sendMessage(message, function () {
            console.log(name + ": sent");
        });
    });
});
````

Things can get a bit more complex when we try to avoid changing the signature of the original functions and avoid the deep nesting of callbacks.  One of the many available techniques, all with their particular advantages and disadvantages, could end up to be something like the following example.

````javascript
// using a sequence of callbacks: 

(function () {
    return function (doGetAddress) {
        return doGetAddress(name);
    };
})
(function (name) { // defines doGetAddress
    return function (doComposeMessage) {
        return doComposeMessage(getAddress(name));
    };
})
(function (address) { // defines doComposeMessage
    return function (doSendMessage) {
        return doSendMessage(composeMessage(address);
    };
})
(function (message) { // defines doSendMessage
    return function (doLog) {
       sendMessage(message);
       return doLog();
    };
})
(function () { // defines doLog
    return function () {
       console.log(name + ": sent");
    };
});
````

Their are a lot of libraries that do things like the previous example without needing to explicitly write all the boiler-plate code.

Using Tab objects, the previous examples could look something like the following.

````javascript
// using pipelined tabs: 

Tab.return(name)
.try(getAddress)
.try(composeMessage)
.try(sendMessage)
.try(function () {
    console.log(name + ": sent");
});
````



<br />

---
### Methods used in this topic

* [Tab.return()][ref-tab.return]

* [.try()][ref-tab.prototype.try]



<br /> Back to [Top] | [Project] | [Topics] / [Where Are Tabs Helping?][topic-where-are-tabs-helping] | [Reference] <br />
<!-- ##### start of links ##### -->

[top]:       #top                        "back to the top of this page."
[project]:   /docs/project.md#the-project "back to the 'Project' section."
[topics]:    /docs/topics.md#topics       "back to the 'Topics' section."
[reference]: /docs/reference.md#reference "back to the 'Reference' section."



[topic-the-basics]:                              /docs/topics.md#the-basics                                  "more topics under 'The Basics'"
[topic-where-are-tabs-helping]:                  /docs/topics.md#where-are-tabs-helping                      "more topics under 'Where Are Tabs Helping?'"
[topic-where-are-tabs-lacking]:                  /docs/topics.md#where-are-tabs-lacking                      "more topics under 'Where Are Tabs Lacking?'"
[topic-advanced-topics]:                         /docs/topics.md#advanced-topics                             "more topics under 'Advanced Topics'"

[topic-a-basic-tab]:                             /docs/topics/a-basic-tab.md#top                             "A Basic Tab: creating and using a basic Tab object."
[topic-a-basic-callback]:                        /docs/topics/a-basic-callback.md#top                        "A Basic Callback: using a Tab object to handle callbacks."
[topic-a-basic-pipeline]:                        /docs/topics/a-basic-pipeline.md#top                        "A Basic Pipeline: using Tab objects for pipelining."
[topic-a-basic-stream]:                          /docs/topics/a-basic-stream.md#top                          "A Basic Stream: using a Tab object to work with sequence of data elements."
[topic-a-basic-promise]:                         /docs/topics/a-basic-promise.md#top                         "A Basic Promise: using a Tab object as a promise."
[topic-basic-lazy-evaluation]:                   /docs/topics/basic-lazy-evaluation.md#top                   "Basic Lazy Evaluation: using a Tab object for lazy evaluation."
[topic-basic-concurrent-computing]:              /docs/topics/basic-concurrent-computing.md#top              "Basic Concurrent Computing: using a Tab object to handle concurrent computing."

[topic-clean-function-signatures]:               /docs/topics/clean-function-signatures.md#top               "Clean Function Signatures: using function signatures without callbacks."
[topic-shallow-callback-nesting]:                /docs/topics/shallow-callback-nesting.md#top                "Shallow Callback Nesting: avoiding deeply nested functions."
[topic-top-down-control-flow]:                   /docs/topics/top-down-control-flow.md#top                   "Top-Down Control Flow: turning inverted control-flow back around."
[topic-predictable-execution-order]:             /docs/topics/predictable-execution-order.md#top             "Predictable Execution Order: avoiding issues with immediate callbacks."
[topic-modular-decomposition]:                   /docs/topics/modular-decomposition.md#top                   "Modular Decomposition:  ..."
[topic-aspect-oriented-programming]:             /docs/topics/aspect-oriented-programming.md#top             "Aspect Oriented Programming: ..."
[topic-exception-style-error-propagation]:       /docs/topics/exception-style-error-propagation.md#top       "Exception Style Error Propagation: letting errors propagate through a sequence of processing tabs."

[topic-debugging-asynchronous-events]:           /docs/topics/debugging-asynchronous-events.md#top           "Debugging Asynchronous Events: ..."

[topic-scheduling]:                              /docs/topics/scheduling.md#top                              "Scheduling: ..."
[topic-streaming-caching-queuing-collecting]:    /docs/topics/streaming-caching-queuing-collecting.md#top    "Streaming, Caching, Queuing, Collecting: ..."
[topic-extending-tab]:                           /docs/topics/extending-tab.md#top                           "Extending Tab: ..."



[ref-tab-object]:                    /docs/reference.md#tab-object                        "more attributes and methods under 'Tab Object'"
[ref-tab-constructor]:               /docs/reference.md#tab-constructor                   "more attributes and methods under 'Tab Constructor'"
[ref-tab-constructor-attributes]:    /docs/reference.md#tab-constructor-attributes        "more attributes under 'Tab Constructor Attributes'"
[ref-tab-constructor-methods]:       /docs/reference.md#tab-constructor-methods           "more methods under 'Tab Constructor Methods'"
[ref-tab-prototype-methods]:         /docs/reference.md#tab-prototype-methods             "more methods under 'Tab Prototype Methods'"
[ref-tab-instance-methods]:          /docs/reference.md#tab-instance-methods              "more methods under 'Tab Instance Methods'"
[ref-tab.schedulers-object]:         /docs/reference.md#tabschedulers-object              "more attributes and methods under 'Tab.Schedulers Object'"
[ref-tab.schedulers-attributes]:     /docs/reference.md#tabschedulers-attributes          "more attributes and methods under 'Tab.Schedulers Attributes'"
[ref-tab.schedulers-methods]:        /docs/reference.md#tabschedulers-methods             "more attributes and methods under 'Tab.Schedulers Methods'"
[ref-tab.x-object]:                  /docs/reference.md#tabx-object                       "more attributes and methods under 'Tab.X Object'"
[ref-tab.x-attributes]:              /docs/reference.md#tabx-attributes                   "more attributes and methods under 'Tab.X Attributes'"
[ref-tab.x-methods]:                 /docs/reference.md#tabx-methods                      "more attributes and methods under 'Tab.X Methods'"

[ref-new-tab]:                       /docs/reference/new-tab.md#top                       "new Tab(): construct a new tab, delegate to a given tab if requested."
[ref-tab]:                           /docs/reference/tab.md#top                           "Tab(): convert to a tab, create a new tab if required."

[ref-tab.context]:                   /docs/reference/tab.context.md#top                   "Tab.context: the processing context for a processor function."
[ref-tab.version]:                   /docs/reference/tab.version.md#top                   "Tab.version: the version of this Tab library."

[ref-tab.construct]:                 /docs/reference/tab.construct.md#top                 "Tab.construct(): construct a new tab, delegate to a given tab if requested."
[ref-tab.convert]:                   /docs/reference/tab.convert.md#top                   "Tab.convert(): convert to a tab, create a new tab if required."
[ref-tab.defer]:                     /docs/reference/tab.defer.md#top                     "Tab.defer(): create a function that uses a given tab to store another function's result."
[ref-tab.defer-raise]:               /docs/reference/tab.defer-raise.md#top               "Tab.deferRaise(): create a function that puts a given tab in the failed state."
[ref-tab.defer-return]:              /docs/reference/tab.defer-return.md#top              "Tab.deferReturn(): create a function that updates the value of a given tab, and silently blocks any further updates."
[ref-tab.defer-settle]:              /docs/reference/tab.defer-settle.md#top              "Tab.deferSettle(): create a function that silently blocks any further updates for a given tab."
[ref-tab.defer-throw]:               /docs/reference/tab.defer-throw.md#top               "Tab.deferThrow(): create a function that puts a given tab in the failed state, and silently blocks any further updates."
[ref-tab.defer-yield]:               /docs/reference/tab.defer-yield.md#top               "Tab.deferYield(): create a function that updates the value of a given tab."
[ref-tab.defer-with]:                /docs/reference/tab.defer-with.md#top                "Tab.deferWith(): create a function that uses a given tab to store another function's result, using the new function's subject as a first argument for the other function."
[ref-tab.do-raise]:                  /docs/reference/tab.do-raise.md#top                  "Tab.doRaise(): create a new tab that is put in the failed state (for ES3 environments)."
[ref-tab.do-return]:                 /docs/reference/tab.do-return.md#top                 "Tab.doReturn(): create a new tab that is initialized with a given value, and silently block any further updates (for ES3 environments)."
[ref-tab.do-throw]:                  /docs/reference/tab.do-throw.md#top                  "Tab.doThrow(): create a new tab that is put in the failed state, and silently block any further updates (for ES3 environments)."
[ref-tab.do-yield]:                  /docs/reference/tab.do-yield.md#top                  "Tab.doYield(): create a new tab that is initialized with a given value (for ES3 environments)."
[ref-tab.is-tab]:                    /docs/reference/tab.is-tab.md#top                    "Tab.isTab(): was the given object created by this Tab constructor?"
[ref-tab.raise]:                     /docs/reference/tab.raise.md#top                     "Tab.raise(): create a new tab that is put in the failed state."
[ref-tab.return]:                    /docs/reference/tab.return.md#top                    "Tab.return(): create a new tab that is initialized with a given value, and silently block any further updates."
[ref-tab.throw]:                     /docs/reference/tab.throw.md#top                     "Tab.throw(): create a new tab that is put in the failed state, and silently block any further updates."
[ref-tab.yield]:                     /docs/reference/tab.yield.md#top                     "Tab.yield(): create a new tab that is initialized with a given value."

[ref-tab.prototype.cancel]:          /docs/reference/tab.prototype.cancel.md#top          "Tab.prototype.cancel(): cancel all subscriptions and all scheduled processors for this tab."
[ref-tab.prototype.catch]:           /doc/reference/tab.prototype.catch.md#top            "Tab.prototype.catch(): process 'raised' and 'thrown' notifications for this tab and create a new tab with the result."
[ref-tab.prototype.do-catch]:        /doc/reference/tab.prototype.do-catch.md#top         "Tab.prototype.doCatch(): process 'raised' and 'thrown' notifications for this tab and create a new tab with the result (for ES3 environments)."
[ref-tab.prototype.do-finally]:      /doc/reference/tab.prototype.do-finally.md#top       "Tab.prototype.doFinally(): process all notifications for this tab and create a new tab with the result (for ES3 environments)."
[ref-tab.prototype.do-raise]:        /docs/reference/tab.prototype.do-raise.md#top        "Tab.prototype.doRaise(): put this tab in the failed state (for ES3 environments)."
[ref-tab.prototype.do-return]:       /docs/reference/tab.prototype.do-return.md#top       "Tab.prototype.doReturn(): update the value of this tab, and silently block any further updates (for ES3 environments)."
[ref-tab.prototype.do-throw]:        /docs/reference/tab.prototype.do-throw.md#top        "Tab.prototype.doThrow(): put this tab in the failed state, and silently block any further updates (for ES3 environments)."
[ref-tab.prototype.do-try]:          /doc/reference/tab.prototype.do-try.md#top           "Tab.prototype.doTry(): process 'yielded' and 'returned' notifications for this tab and create a new tab with the result (for ES3 environments)."
[ref-tab.prototype.do-yield]:        /docs/reference/tab.prototype.do-yield.md#top        "Tab.prototype.doYield(): update the value of this tab (for ES3 environments)."
[ref-tab.prototype.finally]:         /doc/reference/tab.prototype.finally.md#top          "Tab.prototype.finally(): process all notifications for this tab and create a new tab with the result."
[ref-tab.prototype.has-raised]:      /docs/reference/tab.prototype.has-raised.md#top      "Tab.prototype.hasRaised(): has this tab raised an error?"
[ref-tab.prototype.has-returned]:    /docs/reference/tab.prototype.has-returned.md#top    "Tab.prototype.hasReturned(): has this tab returned a value?"
[ref-tab.prototype.has-thrown]:      /docs/reference/tab.prototype.has-thrown.md#top      "Tab.prototype.hasThrown(): has this tab thrown an error?"
[ref-tab.prototype.has-yielded]:     /docs/reference/tab.prototype.has-yielded.md#top     "Tab.prototype.hasYielded(): has this tab yielded a value?"
[ref-tab.prototype.is-cancelled]:    /docs/reference/tab.prototype.is-cancelled.md#top    "Tab.prototype.isCancelled(): are all subscriptions for this tab cancelled?"
[ref-tab.prototype.is-settled]:      /docs/reference/tab.prototype.is-settled.md#top      "Tab.prototype.isSettled(): are any further updates for this tab blocked?"
[ref-tab.prototype.on-cancelled]:    /docs/reference/tab.prototype.on-cancelled.md#top    "Tab.prototype.onCancelled(): execute a processor when this tab is cancelled."
[ref-tab.prototype.on-raised]:       /docs/reference/tab.prototype.on-raised.md#top       "Tab.prototype.onRaised(): execute a processor when this tab has raised an error."
[ref-tab.prototype.on-returned]:     /docs/reference/tab.prototype.on-returned.md#top     "Tab.prototype.onReturned(): execute a processor when this tab has returned a value."
[ref-tab.prototype.on-settled]:      /docs/reference/tab.prototype.on-settled.md#top      "Tab.prototype.onSettled(): execute a processor when this tab is settled."
[ref-tab.prototype.on-thrown]:       /docs/reference/tab.prototype.on-thrown.md#top       "Tab.prototype.onThrown(): execute a processor when this tab has thrown an error."
[ref-tab.prototype.on-yielded]:      /docs/reference/tab.prototype.on-yielded.md#top      "Tab.prototype.onYielded(): execute a processor when this tab has yielded a value."
[ref-tab.prototype.raise]:           /docs/reference/tab.prototype.raise.md#top           "Tab.prototype.raise(): put this tab in the failed state."
[ref-tab.prototype.return]:          /docs/reference/tab.prototype.return.md#top          "Tab.prototype.return(): update the value of this tab, and silently block any further updates."
[ref-tab.prototype.settle]:          /docs/reference/tab.prototype.settle.md#top          "Tab.prototype.settle(): silently block any further updates for this tab."
[ref-tab.prototype.throw]:           /docs/reference/tab.prototype.throw.md#top           "Tab.prototype.throw(): put this tab in the failed state, and silently block any further updates."
[ref-tab.prototype.to-string]:       /docs/reference/tab.prototype.to-string.md#top       "Tab.prototype.toString(): get a string representation for this tab."
[ref-tab.prototype.try]:             /doc/reference/tab.prototype.try.md#top              "Tab.prototype.try(): process 'yielded' and 'returned' notifications for this tab and create a new tab with the result."
[ref-tab.prototype.value-of]:        /docs/reference/tab.prototype.value-of.md#top        "Tab.prototype.valueOf(): get the principal value of this tab."
[ref-tab.prototype.yield]:           /docs/reference/tab.prototype.yield.md#top           "Tab.prototype.yield(): update the value of this tab."

[ref-tab.schedulers.tick]:           /docs/reference/tab.schedulers.tick.md#top           "Tab.Schedulers.es5: a sequence number incremented in every turn"

[ref-tab.schedulers.schedule-first]: /docs/reference/tab.schedulers.schedule-first.md#top "Tab.Schedulers.defer(): schedule a given callback before all other callbacks in the next turn."
[ref-tab.schedulers.schedule-last]:  /docs/reference/tab.schedulers.schedule-last.md#top  "Tab.Schedulers.defer(): schedule a given callback after all other callbacks."
[ref-tab.schedulers.schedule-next]:  /docs/reference/tab.schedulers.schedule-next.md#top  "Tab.Schedulers.notify(): schedule a given callback in the next turn."
[ref-tab.schedulers.schedule-now]:   /docs/reference/tab.schedulers.schedule-now.md#top   "Tab.Schedulers.subscribe(): call the callback immediately."

[ref-tab.x.es5]:                     /docs/reference/tab.x.es5.md#top                     "Tab.X.es5: is this library running in an ES5 environment?"

[ref-tab.x.defer]:                   /docs/reference/tab.x.defer.md#top                   "Tab.X.defer(): the basic method to create deferred functions."
[ref-tab.x.notify]:                  /docs/reference/tab.x.notify.md#top                  "Tab.X.notify(): the basic method to send notifications for a tab."
[ref-tab.x.subscribe]:               /docs/reference/tab.x.subscribe.md#top               "Tab.X.subscribe(): the basic method to subscribe to notifications from a tab."
