<a name="top" ></a>

<img src="../img/tab-logo66.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [A Basic Callback][topic-a-basic-callback]

In the example of [A Basic Tab][topic-a-basic-tab] there is still quite a bit of processing in the callback function for `setInterval`.  We can do better.

~~~~javascript
var id, interval = 0,
    counter = new Tab();

id = setInterval(counter.defer(function () {
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

* [counter.defer( encapsulatedCallback )][ref-tab.prototype.defer] creates a new callback function, binding `counter` to the encapsulated callback.  This new deferred callback, when executed, will update `counter` with the return value of the encapsulated function, and a notification will be sent to all subscribers of `counter`.  In the case an error is thrown in the encapsulated function, `counter` is set to the failed state. 
 
However, we can still do better.   

~~~~javascript
var id, interval = 0,
    counter = new Tab();

id = setInterval(counter.defer(Tab.prototype.update), 1000);

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

* We moved the calculation of the interval to the procesor of `counter.try`.
* [counter.defer( encapsulatedCallback )][ref-tab.prototype.defer] creates a new callback function, binding `counter` to [Tap.prototype.update][ref-tab.prototype.update] - this is the method we used in the previous example to update `counter`.  This deferred callback, when executed will now update `counter` without providing a specific value, and a notification will be sent to all subscribers of `counter`.  In the case an error is thrown in the encapsulated function, `counter` is set to the failed state.



<br /> Other Tab attributes and methods used in this topic:
* [new Tab()][ref-new-tab]
* [.try()][ref-tab.prototype.try]  
* [.catch()][ref-tab.prototype.catch]  



<br /> Back to [Top] | [Topics] / [The Basics][topic-the-basics] | [Reference] <br />





[top]:       #top                        "back to the top of this page"
[topics]:    /doc/topics.md#topics       "back to the 'Topics' section"
[reference]: /doc/reference.md#reference "back to the 'Reference' section"



[topic-the-basics]:                              /doc/topics.md#the-basics                                  "more topics under 'The Basics'"
[topic-where-are-tabs-helping]:                  /doc/topics.md#where-are-tabs-helping                      "more topics under 'Where Are Tabs Helping'"
[topic-where-are-tabs-lacking]:                  /doc/topics.md#where-are-tabs-lacking                      "more topics under 'Where Are Tabs Lacking'"

[topic-a-basic-tab]:                             /doc/topics/a-basic-tab.md#top                             "A Basic Tab: creating and using a basic Tab object."
[topic-a-basic-callback]:                        #top                        "A Basic Callback: using a Tab object to handle callbacks."
[topic-a-basic-promise]:                         /doc/topics/a-basic-promise.md#top                         "A Basic Promise: using a Tab object as a promise."
[topic-basic-lazy-evaluation]:                   /doc/topics/basic-lazy-evaluation.md#top                   "Basic Lazy Evaluation: ..."
[topic-basic-concurrent-computing]:              /doc/topics/basic-concurrent-computing.md#top              "Basic Concurrent Computing: ..."

[topic-keeping-clean-callback-signatures]:       /doc/topics/keeping-clean-callback-signatures.md#top       "Keeping Clean Callback Signatures: ..."
[topic-shallow-callback-nesting]:                /doc/topics/shallow-callback-nesting.md#top                "Shallow Callback Nesting: ..."
[topic-top-down-control-flow]:                   /doc/topics/top-down-control-flow.md#top                   "Top-Down Control Flow: ..."
[topic-predicting-execution-order]:              /doc/topics/predicting-execution-order.md#top              "Predicting Execution Order: ..."
[topic-modular-decomposition]:                   /doc/topics/modular-decomposition.md#top                   "Modular Decomposition: ..."
[topic-aspect-oriented-programming]:             /doc/topics/aspect-oriented-programming].md#top            "Aspect Oriented Programming: ..."
[topic-exception-style-error-propagation]:       /doc/topics/exception-style-error-propagation.md#top       "Exception Style Error Propagation: ..."
[topic-monitoring-function-calls]:               /doc/topics/monitoring-function-calls.md#top               "Monitoring Function Calls: ..."
[topic-throttling-execution]:                    /doc/topics/throttling-execution.md#top                    "Throttling Execution: ..."
[topic-cancelling-execution]:                    /doc/topics/cancelling-execution.md#top                    "Cancelling Execution: ..."
[topic-timing-out-execution]:                    /doc/topics/timing-out-execution.md#top                    "Timing Out Execution: ..."
[topic-delaying-execution]:                      /doc/topics/delaying-execution.md#top                      "Delaying Execution: ..."
[topic-prioritizing-execution]:                  /doc/topics/prioritizing-execution.md#top                  "Prioritizing Execution: ..."
[topic-lazy-evaluation]:                         /doc/topics/lazy-evaluation.md#top                         "Lazy Evaluation: !!! thinking hard !!!"
[topic-working-with-remote-objects]:             /doc/topics/working-with-remote-objects.md#top             "Working With Remote Objects: ..."
[topic-enumerating-tabs]:                        /doc/topics/enumerating-tabs.md#top                        "Enumerating Tabs: ..."
[topic-iterating-tabs]:                          /doc/topics/iterating-tabs.md#top                          "Iterating Tabs: ..."
[topic-generating-tabs]:                         /doc/topics/generating-tabs.md#top                         "Generating Tabs: ..."
[topic-joining-results-from-parallel-execution]: /doc/topics/joining-results-from-parallel-execution.md#top "Joining Results From Parallel Execution: ..."
[topic-synchronizing-execution]:                 /doc/topics/synchronizing-execution.md#top                 "Synchronizing Execution: ..."
[topic-isolating-information-providers]:         /doc/topics/isolating-information-providers.md#top         "Isolating Information Providers: ..."
[topic-isolating-information-consumers]:         /doc/topics/isolating-information-consumers.md#top         "Isolating Information Consumers: ..."

[topic-debugging-asynchronous-events]:           /doc/topics/debugging-asynchronous-events.md#top           "Debugging Asynchronous Events: ..."



[ref-tab-object]:                  /doc/reference.md#tab-object                      "more attributes and methods under 'Tab Object'"
[ref-tab-constructor]:             /doc/reference.md#tab-constructor                 "more attributes and methods under 'Tab Constructor'"
[ref-tab-constructor-attributes]:  /doc/reference.md#tab-constructor-attributes      "more attributes under 'Tab Constructor Attributes'"
[ref-tab-constructor-methods]:     /doc/reference.md#tab-constructor-methods         "more methods under 'Tab Constructor Methods'"
[ref-tab-prototype-methods]:       /doc/reference.md#tab-prototype-methods           "more methods under 'Tab Prototype Methods'"
[ref-tab-instance-methods]:        /doc/reference.md#tab-instance-methods            "more methods under 'Tab Instance Methods'"



[ref-new-tab]:                     /doc/reference/new-tab.md#top                     "new Tab(): create a new tab."
[ref-tab]:                         /doc/reference/tab.md#top                         "Tab(): convert to a tab, create a new tab if required."

[ref-tab.context]:                 /doc/reference/tab.context.md#top                 "Tab.context: ..."
[ref-tab.version]:                 /doc/reference/tab.version.md#top                 "Tab.version: version of this Tab library."

[ref-tab.eventually]:              /doc/reference/tab.eventually.md#top              "Tab.eventually: filter out progress notifications for a given tab."
[ref-tab.is-settling-tab]:         /doc/reference/tab.is-settling-tab.md#top         "Tab.isSettlingTab: are progress notifications being filtered out for a given tab?"
[ref-tab.is-tab]:                  /doc/reference/tab.is-tab.md#top                  "Tab.isTab: was the given object created by this Tab library?"
[ref-tab.like-tab]:                /doc/reference/tab.like-tab.md#top                "Tab.likeTab: ..."
[ref-tab.tabify]:                  /doc/reference/tab.tabify.md#top                  "Tab.tabify: ..."
[ref-tab.tabify-with]:             /doc/reference/tab.tabify-with.md#top             "Tab.tabifyWith: ..."
[ref-tab.untabify]:                /doc/reference/tab.untabify.md#top                "Tab.untabify: ..."
[ref-tab.untabify-with]:           /doc/reference/tab.untabify-with.md#top           "Tab.untabifyWith: ..."
[ref-tab.when]:                    /doc/reference/tab.when.md#top                    "Tab.when: ..."

[ref-tab.prototype.cancel]:        /doc/reference/tab.prototype.cancel.md#top        "Tab.prototype.cancel(): ..."
[ref-tab.prototype.catch]:         /doc/reference/tab.prototype.catch.md#top         "Tab.prototype.catch(): process error notifications for this tab."
[ref-tab.prototype.count]:         /doc/reference/tab.prototype.count.md#top         "Tab.prototype.count(): ..."
[ref-tab.prototype.defer]:         /doc/reference/tab.prototype.defer.md#top         "Tab.prototype.defer(): convert a function to use this tab to store its result."
[ref-tab.prototype.defer-with]:    /doc/reference/tab.prototype.defer-with.md#top    "Tab.prototype.deferWith(): ..."
[ref-tab.prototype.delegate]:      /doc/reference/tab.prototype.delegate.md#top      "Tab.prototype.delegate(): !!! where are my glasses? !!!"
[ref-tab.prototype.do]:            /doc/reference/tab.prototype.do.md#top            "Tab.prototype.do(): create an notification processing scope for this tab."
[ref-tab.prototype.end]:           /doc/reference/tab.prototype.end.md#top           "Tab.prototype.end(): ..."
[ref-tab.prototype.evaluate]:      /doc/reference/tab.prototype.evaluate.md#top      "Tab.prototype.evaluate(): ..."
[ref-tab.prototype.eventually]:    /doc/reference/tab.prototype.eventually.md#top    "Tab.prototype.eventually(): filter out progress notifications for this tab."
[ref-tab.prototype.finally]:       /doc/reference/tab.prototype.finally.md#top       "Tab.prototype.finally(): process value and error notifications for this tab."
[ref-tab.prototype.fulfill]:       /doc/reference/tab.prototype.fulfill.md#top       "Tab.prototype.fulfill(): settle this tab with a value."
[ref-tab.prototype.has-delegated]: /doc/reference/tab.prototype.has-delegated.md#top "Tab.prototype.hasDelegated(): ..."
[ref-tab.prototype.has-error]:     /doc/reference/tab.prototype.has-error.md#top     "Tab.prototype.hasError(): has this tab an error?"
[ref-tab.prototype.has-settled]:   /doc/reference/tab.prototype.has-settled.md#top   "Tab.prototype.hasSettled(): has this tab settled?"
[ref-tab.prototype.has-value]:     /doc/reference/tab.prototype.has-value.md#top     "Tab.prototype.hasValue(): has this tab a value?"
[ref-tab.prototype.raise]:         /doc/reference/tab.prototype.raise.md#top         "Tab.prototype.raise(): ..."
[ref-tab.prototype.reject]:        /doc/reference/tab.prototype.reject.md#top        "Tab.prototype.reject(): settle this tab with an error."
[ref-tab.prototype.settle]:        /doc/reference/tab.prototype.settle.md#top        "Tab.prototype.settle(): settle this tab without changing its current value or error."
[ref-tab.prototype.then]:          /doc/reference/tab.prototype.then.md#top          "Tab.prototype.then(): ..."
[ref-tab.prototype.throw]:         /doc/reference/tab.prototype.throw.md#top         "Tab.prototype.throw(): set an error for this tab."
[ref-tab.prototype.to-string]:     /doc/reference/tab.prototype.to-string.md#top     "Tab.prototype.toString(): get a string representation for this tab."
[ref-tab.prototype.try]:           /doc/reference/tab.prototype.try.md#top           "Tab.prototype.try(): process value notifications for this tab."
[ref-tab.prototype.undelegate]:    /doc/reference/tab.prototype.undelegate.md#top    "Tab.prototype.undelegate(): ..."
[ref-tab.prototype.update]:        /doc/reference/tab.prototype.update.md#top        "Tab.prototype.update(): set a value for this tab."
[ref-tab.prototype.value-of]:      /doc/reference/tab.prototype.value-of.md#top      "Tab.prototype.valueOf(): get the principal value of this tab."
[ref-tab.prototype.wrap]:          /doc/reference/tab.prototype.wrap.md#top          "Tab.prototype.wrap(): ..."

[ref-tab._delegate]:               /doc/reference/tab._delegate.md#top               "tab._delegate(): ..."
[ref-tab._has-delegated]:          /doc/reference/tab._has-delegated.md#top          "tab._has-delegated(): ..."
[ref-tab._trap]:                   /doc/reference/tab._trap.md#top                   "tab._trap(): ..."
[ref-tab._undelegate]:             /doc/reference/tab._undelegate.md#top             "tab._undelegate(): ..."

