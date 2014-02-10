<a name="top" ></a>

<img src="../img/tab-logo106.png" alt="Tab logo" align="left" style="float:left;" /><img src="../img/1x1.png" align="left" style="float:left;" height="106" width="20" /><img src="../img/1x1.png" height="1" width="20" style="margin-top:45px;" />
## [A Basic Tap][topic-a-basic-tab]
<br />

~~~~javascript
var id, interval = 0,
    counter = new Tab();

id = setInterval(function () {
    try {
        interval += 1;
        counter.update(interval);
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
~~~~

In this example:

* [new Tab()][ref-new-tab] creates a new Tab object.
* [counter.update()][ref-tab.prototype.update] updates `counter` with a new value and notifies all its subscribers. 
* [counter.throw()][ref-tab.prototype.throw] sets `counter` to the failed state (this is probably not going to be necessary in this very simple example) and notifies all its subscribers.
* [counter.try( onUpdatedProcessor )][ref-tab.prototype.try] subscribes to all notifications from `counter` and creates a new Tab object for further processing.  When an update notification is received, the processor function is executed.  When an error notification is received, the notification is passed on to all subscribers of the new tab created by this method.   
* [.catch( onThrownProcessor )][ref-tab.prototype.catch] subscribes to all notifications from the tab created by `counter.try`.  When an error notification is received, the processor function is executed.



<br /> Back to [Top] | [Topics] / [The Basics][topic-the-basics] | [Reference] <br />





[top]:       #top                        "back to the top of this page"
[topics]:    /doc/topics.md#topics       "back to the 'Topics' section"
[reference]: /doc/reference.md#reference "back to the 'Reference' section"

[topic-the-basics]:                              /doc/topics.md#the-basics                                  "more topics under 'The Basics'"
[topic-where-are-tabs-helping]:                  /doc/topics.md#where-are-tabs-helping                      "more topics under 'Where Are Tabs Helping'"
[topic-where-are-tabs-lacking]:                  /doc/topics.md#where-are-tabs-lacking                      "more topics under 'Where Are Tabs Lacking'"

[topic-a-basic-tab]:                             /doc/topics/a-basic-tab.md#top                             "A Basic Tab - creating and using a basic Tab object."
[topic-a-basic-callback]:                        #top                        "A Basic Callback - using a Tab object to handle callbacks."
[topic-a-basic-promise]:                         /doc/topics/a-basic-promise.md#top                         "A Basic Promise - using a Tab object as a promise."
[topic-basic-lazy-evaluation]:                   /doc/topics/basic-lazy-evaluation.md#top                   "!!! thinking hard !!!"
[topic-basic-concurrent-computing]:              /doc/topics/basic-concurrent-computing.md#top              "!!! coming soon !!!"

[topic-keeping-clean-callback-signatures]:       /doc/topics/keeping-clean-callback-signatures.md#top       "!!! having some vague ideas !!!"
[topic-shallow-callback-nesting]:                /doc/topics/shallow-callback-nesting.md#top                "!!! having some vague ideas !!!"
[topic-top-down-control-flow]:                   /doc/topics/top-down-control-flow.md#top                   "!!! having some vague ideas !!!"
[topic-predicting-execution-order]:              /doc/topics/predicting-execution-order.md#top              "!!! having some vague ideas !!!"
[topic-modular-decomposition]:                   /doc/topics/modular-decomposition.md#top                   "!!! having some vague ideas !!!"
[topic-aspect-oriented-programming]:             /doc/topics/aspect-oriented-programming].md#top            "!!! having some vague ideas !!!"
[topic-exception-style-error-propagation]:       /doc/topics/exception-style-error-propagation.md#top       "!!! having some vague ideas !!!"
[topic-monitoring-function-calls]:               /doc/topics/monitoring-function-calls.md#top               "!!! having some vague ideas !!!"
[topic-throttling-execution]:                    /doc/topics/throttling-execution.md#top                    "!!! having some vague ideas !!!"
[topic-cancelling-execution]:                    /doc/topics/cancelling-execution.md#top                    "!!! having some vague ideas !!!"
[topic-timing-out-execution]:                    /doc/topics/timing-out-execution.md#top                    "!!! having some vague ideas !!!"
[topic-delaying-execution]:                      /doc/topics/delaying-execution.md#top                      "!!! having some vague ideas !!!"
[topic-prioritizing-execution]:                  /doc/topics/prioritizing-execution.md#top                  "!!! having some vague ideas !!!"
[topic-lazy-evaluation]:                         /doc/topics/lazy-evaluation.md#top                         "!!! having some vague ideas !!!"
[topic-working-with-remote-objects]:             /doc/topics/working-with-remote-objects.md#top             "!!! having some vague ideas !!!"
[topic-enumerating-tabs]:                        /doc/topics/enumerating-tabs.md#top                        "!!! having some vague ideas !!!"
[topic-iterating-tabs]:                          /doc/topics/iterating-tabs.md#top                          "!!! having some vague ideas !!!"
[topic-generating-tabs]:                         /doc/topics/generating-tabs.md#top                         "!!! having some vague ideas !!!"
[topic-joining-results-from-parallel-execution]: /doc/topics/joining-results-from-parallel-execution.md#top "!!! having some vague ideas !!!"
[topic-synchronizing-execution]:                 /doc/topics/synchronizing-execution.md#top                 "!!! having some vague ideas !!!"
[topic-isolating-information-providers]:         /doc/topics/isolating-information-providers.md#top         "!!! having some vague ideas !!!"
[topic-isolating-information-consumers]:         /doc/topics/isolating-information-consumers.md#top         "!!! having some vague ideas !!!"

[topic-debugging-asynchronous-events]:           /doc/topics/debugging-asynchronous-events.md#top           "!!! having some vague ideas !!!"

[ref-tab-object]:                  /doc/reference.md#tab-object                      "more attributes and methods under 'Tab Object'"
[ref-tab-constructor]:             /doc/reference.md#tab-constructor                 "more attributes and methods under 'Tab Constructor'"
[ref-tab-constructor-attributes]:  /doc/reference.md#tab-constructor-attributes      "more attributes under 'Tab Constructor Attributes'"
[ref-tab-constructor-methods]:     /doc/reference.md#tab-constructor-methods         "more methods under 'Tab Constructor Methods'"
[ref-tab-prototype-methods]:       /doc/reference.md#tab-prototype-methods           "more methods under 'Tab Prototype Methods'"
[ref-tab-instance-methods]:        /doc/reference.md#tab-instance-methods            "more methods under 'Tab Instance Methods'"

[ref-new-tab]:                     /doc/reference/new-tab.md#top                     "!!! coming soon !!!"
[ref-tab]:                         /doc/reference/tab.md#top                         "!!! coming soon !!!"

[ref-tab.context]:                 /doc/reference/tab.context.md#top                 "!!! having some vague ideas !!!"
[ref-tab.version]:                 /doc/reference/tab.version.md#top                 "!!! coming soon !!!"

[ref-tab.eventually]:              /doc/reference/tab.eventually.md#top              "!!! coming soon !!!"
[ref-tab.is-settling-tab]:         /doc/reference/tab.is-settling-tab.md#top         "!!! coming soon !!!"
[ref-tab.is-tab]:                  /doc/reference/tab.is-tab.md#top                  "!!! coming soon !!!"
[ref-tab.like-tab]:                /doc/reference/tab.like-tab.md#top                "!!! having some vague ideas !!!"
[ref-tab.tabify]:                  /doc/reference/tab.tabify.md#top                  "!!! having some vague ideas !!!"
[ref-tab.tabify-with]:             /doc/reference/tab.tabify-with.md#top             "!!! having some vague ideas !!!"
[ref-tab.untabify]:                /doc/reference/tab.untabify.md#top                "!!! having some vague ideas !!!"
[ref-tab.untabify-with]:           /doc/reference/tab.untabify-with.md#top           "!!! having some vague ideas !!!"
[ref-tab.when]:                    /doc/reference/tab.when.md#top                    "!!! having some vague ideas !!!"

[ref-tab.prototype.cancel]:        /doc/reference/tab.prototype.cancel.md#top        "!!! having some vague ideas !!!"
[ref-tab.prototype.catch]:         /doc/reference/tab.prototype.catch.md#top         "!!! coming soon !!!"
[ref-tab.prototype.count]:         /doc/reference/tab.prototype.count.md#top         "!!! having some vague ideas !!!"
[ref-tab.prototype.defer]:         /doc/reference/tab.prototype.defer.md#top         "!!! coming soon !!!"
[ref-tab.prototype.defer-with]:    /doc/reference/tab.prototype.defer-with.md#top    "!!! having some vague ideas !!!"
[ref-tab.prototype.delegate]:      /doc/reference/tab.prototype.delegate.md#top      "!!! looking for my glasses !!!"
[ref-tab.prototype.do]:            /doc/reference/tab.prototype.do.md#top            "!!! coming soon !!!"
[ref-tab.prototype.end]:           /doc/reference/tab.prototype.end.md#top           "!!! having some vague ideas !!!"
[ref-tab.prototype.evaluate]:      /doc/reference/tab.prototype.evaluate.md#top      "!!! having some vague ideas !!!"
[ref-tab.prototype.eventually]:    /doc/reference/tab.prototype.eventually.md#top    "!!! coming soon !!!"
[ref-tab.prototype.finally]:       /doc/reference/tab.prototype.finally.md#top       "!!! coming soon !!!"
[ref-tab.prototype.fulfill]:       /doc/reference/tab.prototype.fulfill.md#top       "!!! coming soon !!!"
[ref-tab.prototype.has-delegated]: /doc/reference/tab.prototype.has-delegated.md#top "!!! having some vague ideas !!!"
[ref-tab.prototype.has-error]:     /doc/reference/tab.prototype.has-error.md#top     "!!! coming soon !!!"
[ref-tab.prototype.has-settled]:   /doc/reference/tab.prototype.has-settled.md#top   "!!! coming soon !!!"
[ref-tab.prototype.has-value]:     /doc/reference/tab.prototype.has-value.md#top     "!!! coming soon !!!"
[ref-tab.prototype.raise]:         /doc/reference/tab.prototype.raise.md#top         "!!! having some vague ideas !!!"
[ref-tab.prototype.reject]:        /doc/reference/tab.prototype.reject.md#top        "!!! coming soon !!!"
[ref-tab.prototype.settle]:        /doc/reference/tab.prototype.settle.md#top        "!!! coming soon !!!"
[ref-tab.prototype.then]:          /doc/reference/tab.prototype.then.md#top          "!!! having some vague ideas !!!"
[ref-tab.prototype.throw]:         /doc/reference/tab.prototype.throw.md#top         "!!! coming soon !!!"
[ref-tab.prototype.to-string]:     /doc/reference/tab.prototype.to-string.md#top     "!!! coming soon !!!"
[ref-tab.prototype.try]:           /doc/reference/tab.prototype.try.md#top           "!!! coming soon !!!"
[ref-tab.prototype.undelegate]:    /doc/reference/tab.prototype.undelegate.md#top    "!!! having some vague ideas !!!"
[ref-tab.prototype.update]:        /doc/reference/tab.prototype.update.md#top        "!!! coming soon !!!"
[ref-tab.prototype.value-of]:      /doc/reference/tab.prototype.value-of.md#top      "!!! coming soon !!!"
[ref-tab.prototype.wrap]:          /doc/reference/tab.prototype.wrap.md#top          "!!! having some vague ideas !!!"

[ref-tab._delegate]:               /doc/reference/tab._delegate.md#top               "!!! having some vague ideas !!!"
[ref-tab._has-delegated]:          /doc/reference/tab._has-delegated.md#top          "!!! having some vague ideas !!!"
[ref-tab._trap]:                   /doc/reference/tab._trap.md#top                   "!!! having some vague ideas !!!"
[ref-tab._undelegate]:             /doc/reference/tab._undelegate.md#top             "!!! having some vague ideas !!!"

