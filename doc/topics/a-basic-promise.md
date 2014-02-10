<a name="top" ></a>

<img src="../img/tab-logo106.png" alt="Tab logo" align="left" style="float:left;" /><img src="../img/1x1.png" align="left" style="float:left;" height="106" width="20" /><img src="../img/1x1.png" height="1" width="20" style="margin-top:45px;" />
## [A Basic Promise][topic-a-basic-promise]
<br />

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
            this.fulfill();
        }
    })
.eventually()
    .try(function () {
         console.log("cuckoo");
    });
~~~~

Compared to the examples in [A Basic Callback][topic-a-basic-callback], in this example:

* We dropped the `.catch()` calls to make the example shorter and easier to read.
* We removed the `console.log("cuckoo")` and replaced it by a call to [this.fulfill()][ref-tab.prototype.fulfill].  This **settles** the tab that is created and returned by the  encapsulating `counter.try()` method, making its value final and non-mutable.
* [.eventually()][ref-tab.prototype.eventually] filters the notifications, only letting those events through that are emitted after the tap settled.  From this point in the chain, none of the **progress** events from previous steps are forwarded, only **settled** events are passed on.  The method returns a new **settling** Tap object.  
* The second [.try( onFulfilledProcessor )][ref-tab.prototype.try] call picks up the events from the settling tap.  When receiving a notification that the tap is fulfilled, the processor is executed.  

Remark that we tried to make the two phases clear by using indentation.  Although this is certainly not required in this example, it can be a good idea to do this in more complex cases, since the `.eventually()` can be difficult to spot when surrounded by other code. 
Alternatively, we can also use more explicit scoping functions as in next example.

~~~~javascript
var id, interval = 0,
    counter = new Tab();

id = setInterval(counter.defer(Tab.prototype.update), 1000);

counter
.do(function (source, target) {
    source.try(function () {
        interval += 1;
        if (interval <= 3600) {
            console.log(interval % 2 === 1 ? "tick" : "tock");
        }
        if (value === 3600) {
            clearInterval(id);
            target.fulfill();
        }
    });
})
.eventually(function (source) {
    source.try(function () {
        console.log("cuckoo");
    });
});
~~~~

Compared to the previous example, in this example:

* we introduced [.do( scopingFunction )][ref-tab.prototype.do] to encapsulate all processing before `counter` is settled.  The scoping function is called with references to the source tab of notification - `counter` - and the target tab that was newly created by the `.do()` method - equal to `this` in the scoping function.
* `this.fulfill()` can now be replaced by `target.fulfill()`, probably making a lot of people very happy.
* we also introduced a scoping function in [.eventually( scopingFunction )][ref-tab.prototype.eventually].

If you don't need to progress notifications, this can be simplified.

~~~~javascript
var id, interval = 0,
    timer = new Tab();

id = setTimeout(timer.defer(Tab.prototype.fulfill), 3600000);

timer
.eventually()
    .try(function () {
        console.log("cuckoo");
    });
~~~~

Compared to the previous examples, in this example:

* We dropped the first `.try()` clause as we do no longer need the progress events.
* [timer.defer( encapsulatedCallback )][ref-tab.prototype.defer] creates a new callback function, binding `timer` to [Tab.prototype.fulfill][ref-tab.prototype.fulfill].  This encapsulated callback, when executed will now fulfill `timer` instead of updating it, and a notification will be sent to all subscribers of `timer`.

Remark that in this very simple example, we can also keep updating `timer` instead of fulfilling it and drop the `.eventually()` clause.  However, fulfilling the tap corresponds better to the real situation: the expired status of a timeout is a final and non-mutable state. 

Making the previous example a bit more explicit, making it easier to follow what is happening.

~~~~javascript
var id, interval = 0,
    timer = new Tab();

id = setTimeout(function () {
    try {
        timer.fulfill();
    }
    catch (e) {
        timer.reject(e);
    }  
}, 3600000);

timer
.eventually()
    .try(function () {
        console.log("cuckoo");
    })
    .catch(function (error) {
        console.log(error);
    });
~~~~

Compared to the previous example, in this example:

* We now used [timer.reject()][ref-tab.prototype.reject] to **settle** `timer` into its error state instead of just throwing an error as we did in the examples in [A Basic Callback][topic-a-basic-callback].
* [.catch()][ref-tab.prototype.catch], since executed on a **settling** Tab object, will now process the error notifications from the `timer.reject' method.

Remark that in this very simple example, we can drop the `.eventually()` step, making the execution a bit faster. The `.fulfill()` method is equivalent to first applying the `.update()` method, and then applying [.settle()][ref-tab.prototype.settle].  This means that first an 'updated' notification will be sent out, followed by a 'fulfilled' notification.   

<img class="emoji" title=":bulb:" alt=":bulb:" src="https://github.global.ssl.fastly.net/images/icons/emoji/bulb.png" height="20" width="20" align="left" style="float:left; margin-top:5px;"><img src="../img/1x1.png" align="left" style="float:left;" height="10" width="5" />
~~~~
tab.fulfill( value ) ~ tab.update( value ).settle()
~~~~

A similar equivalence relationship exists between the `.reject()` and `.thow()` methods.

<img class="emoji" title=":bulb:" alt=":bulb:" src="https://github.global.ssl.fastly.net/images/icons/emoji/bulb.png" height="20" width="20" align="left" style="float:left; margin-top:5px;"><img src="../img/1x1.png" align="left" style="float:left;" height="10" width="5" />
~~~~
tab.reject( value ) ~ tab.throw( value ).settle()
~~~~



<br /> Other Tab attributes and methods used in this topic:
* [new Tab()][ref-new-tab]
* [.throw()][ref-tab.prototype.throw]
* [.update()][ref-tab.prototype.update]



<br /> Back to [Top] | [Topics] / [The Basics][topic-the-basics] | [Reference] <br />





[top]:       #top                        "back to the top of this page"
[topics]:    /doc/topics.md#topics       "back to the 'Topics' section"
[reference]: /doc/reference.md#reference "back to the 'Reference' section"

[topic-the-basics]:                              /doc/topics.md#the-basics                                  "more topics under 'The Basics'"
[topic-where-are-tabs-helping]:                  /doc/topics.md#where-are-tabs-helping                      "more topics under 'Where Are Tabs Helping'"
[topic-where-are-tabs-lacking]:                  /doc/topics.md#where-are-tabs-lacking                      "more topics under 'Where Are Tabs Lacking'"

[topic-a-basic-tab]:                             /doc/topics/a-basic-tab.md#top                             "A Basic Tab - creating and using a basic Tab object."
[topic-a-basic-callback]:                        /doc/topics/a-basic-callback.md#top                        "A Basic Callback - using a Tab object to handle callbacks."
[topic-a-basic-promise]:                         #top                         "A Basic Promise - using a Tab object as a promise."
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

