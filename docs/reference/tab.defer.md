<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [Tab.defer()][ref-tab.defer]

Create a function that uses a given tab to store another function's result.

<br />

---
### Tab.defer() » undefined

this is typically used in the function-body of a processor, to avoid that the returned value from a processor is used to update the target tab of this processor.

### Tab.defer( target ) » newFunction
    
> :bulb:
> ````
> Tab.defer(target) ~ Tab.deferReturn(target)
> ````

parameters:
*   **target** : *[object Tab]*  
    the tab that will get updated with the arguments of the new function, when the latter is being called.

returns:
*   **newFunction** : *function*  
    a newly constructed function that uses a given tab to store this new function's arguments.

core principle:

````
Tab.defer(target).call(null, ...arguments) 
~ 
target.return(...arguments)
````

### Tab.defer( target, processor ) » newFunction

parameters:
*   **target** : *[object Tab]*  
    the tab that will get updated with the result of the processor, when the new function is being called.

*   **procesor** : *function*  
    The function, the gets called when the newly created encapsulating function is called, and whom's result is stored in the target tab.

returns:
*   **newFunction** : *function*  
    a newly constructed function that uses a given tab to store a processor's result.

throws:
*   *TypeError* if processor is not a function and not equal to `undefeined` or `null`.

core principle:

````
Tab.defer(target, processor).call(subject, ...arguments)
~
try {
    target.return(processor.call(subject, ...arguments));
}
catch (e) {
    target.throw(e);
}
````

<br />

---
### Other attributes and methods in this family

*   [Tab.context][ref-tab.context]
<br />
*   [Tab.deferFulfill()][ref-tab.defer-fulfill]
*   [Tab.deferReject()][ref-tab.defer-reject]
*   [Tab.deferReturn()][ref-tab.defer-return]
*   [Tab.deferSettle()][ref-tab.defer-settle]
*   [Tab.deferThrow()][ref-tab.defer-throw]
*   [Tab.deferWith()][ref-tab.defer-with]



<br /> Back to [Top] | [Project] | [Topics] | [Reference] / [Tab Constructor Methods][ref-tab-constructor-methods] <br />
[$$$$$ start of links $$$$$]: #

[top]:       #top                        "back to the top of this page."
[project]:   /doc/project.md#the-project "back to the 'Project' section."
[topics]:    /doc/topics.md#topics       "back to the 'Topics' section."
[reference]: /doc/reference.md#reference "back to the 'Reference' section."



[topic-the-basics]:                              /doc/topics.md#the-basics                                  "more topics under 'The Basics'"
[topic-where-are-tabs-helping]:                  /doc/topics.md#where-are-tabs-helping                      "more topics under 'Where Are Tabs Helping?'"
[topic-where-are-tabs-lacking]:                  /doc/topics.md#where-are-tabs-lacking                      "more topics under 'Where Are Tabs Lacking?'"
[topic-advanced-topics]:                         /doc/topics.md#advanced-topics                             "more topics under 'Advanced Topics'"

[topic-a-basic-tab]:                             /doc/topics/a-basic-tab.md#top                             "A Basic Tab: creating and using a basic Tab object."
[topic-a-basic-callback]:                        /doc/topics/a-basic-callback.md#top                        "A Basic Callback: using a Tab object to handle callbacks."
[topic-a-basic-pipeline]:                        /doc/topics/a-basic-pipeline.md#top                        "A Basic Pipeline: using Tab objects for pipelining."
[topic-a-basic-stream]:                          /doc/topics/a-basic-stream.md#top                          "A Basic Stream: using a Tab object to work with sequence of data elements."
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

[topic-scheduling]:                              /doc/topics/scheduling.md#top                              "Scheduling: ..."
[topic-streaming-caching-recording]:             /doc/topics/streaming-caching-recording.md#top             "Streaming, Caching, Recording: ..."
[topic-extending-tab]:                           /doc/topics/extending-tab.md#top                           "Extending Tab: ..."



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
[ref-tab.version]:                  /doc/reference/tab.version.md#top                  "Tab.version: the version of this Tab library."

[ref-tab.capture]:                  /doc/reference/tab.capture.md#top                  "Tab.capture(): create a function that uses a given tab to store another function's subject and arguments, and then executes the other function."
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

[ref-tab.ext.context.pop]:          /doc/reference/tab.ext.context.pop.md#top          "Tab.Ext.context.pop(): the basic method to re-instate the previous execution context."
[ref-tab.ext.context.push]:         /doc/reference/tab.ext.context.push.md#top         "Tab.Ext.context.push(): the basic method to create a new execution context."
[ref-tab.ext.defer]:                /doc/reference/tab.ext.defer.md#top                "Tab.Ext.defer(): the basic method to create deferred functions."
[ref-tab.ext.initialize]:           /doc/reference/tab.ext.initialize.md#top           "Tab.Ext.initialize(): the basic method to initialize methods that process notifications from a tab."
[ref-tab.ext.return]:               /doc/reference/tab.ext.return.md#top               "Tab.Ext.return(): the basic method to update the value of a tab."
[ref-tab.ext.subscribe]:            /doc/reference/tab.ext.subscribe.md#top            "Tab.Ext.subscribe(): the basic method to subscribe to notifications from a tab."
[ref-tab.ext.throw]:                /doc/reference/tab.ext.throw.md#top                "Tab.Ext.throw(): the basic method to set a tab in the failed state."
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
