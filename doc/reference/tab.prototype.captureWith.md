<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [Tab.prototype.captureWith()][ref-tab.prototype.capture-with]

Create a function that uses this tab to store another function's subject and arguments, and then executes the other function.

<br />

---
### target.captureWith() » newFunction

core principle:

````
target.captureWith().call(subject, ...arguments)
~
target.return(subject, ...arguments);
````

### target.captureWith( processor ) » newFunction

core principle:

````
target.captureWith(processor).call(subject, ...arguments)
~
target.return(subject, ...arguments);
processor.call(subject, ...arguments);
````

<br />

---
### Concepts

The following illustrates the main concepts.  The actual implementation may be slightly different to be usable on a broad range of platforms and to optimize performance.

````javascript
function captureWith( processor ) {
    var target = Tab(this)
        captor, deferred;

    captor = Tab.Ext.defer({ target: target });

    deferred = function () {
        captor(this, ...arguments);
        return processor.call(this, ...arguments);
    }

    if (processor) {
       // ensure deferred can be used as 'new' constructor 
       deferred.prototype = Object.create(processor.prototype);
       deferred.prototype.constructor = deferred;
    }

    return deferred;
}
````

<br />

---

Other methods in this family:
*   [.capture()][ref-tab.prototype.capture]
*   [.defer()][ref-tab.prototype.defer]
*   [.trace()][ref-tab.prototype.trace]
*   [Tab.Ext.defer()][ref-tab.ext.defer]



<br /> Back to [Top] | [Project] | [Topics] | [Reference] / [Tab Prototype Methods][ref-tab-prototype-methods] <br />
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
[ref-tab.get-context]:              /doc/reference/tab.get-context.md#top              "Tab.getContext(): get the execution context for a processor function."
[ref-tab.convert]:                  /doc/reference/tab.convert.md#top                  "Tab.convert(): convert to a tab, create a new tab if required."
[ref-tab.is-tab]:                   /doc/reference/tab.is-tab.md#top                   "Tab.isTab(): was the given object created by this Tab constructor?"
[ref-tab.return]:                   /doc/reference/tab.return.md#top                   "Tab.return(): construct a new tab an set its value."
[ref-tab.throw]:                    /doc/reference/tab.throw.md#top                    "Tab.throw(): construct a new tab and put it in the failed state."

[ref-tab.prototype.capture]:        /doc/reference/tab.prototype.capture.md#top        "Tab.prototype.capture(): create a function that uses this tab to store another function's arguments, and then executes the other function."
[ref-tab.prototype.capture-with]:   /doc/reference/tab.prototype.capture-with.md#top   "Tab.prototype.captureWith(): create a function that uses this tab to store another function's subject and arguments, and then executes the other function."
[ref-tab.prototype.catch]:          /doc/reference/tab.prototype.catch.md#top          "Tab.prototype.catch(): process 'thrown' notifications for this tab and create a new tab with the result."
[ref-tab.prototype.defer]:          /doc/reference/tab.prototype.defer.md#top          "Tab.prototype.defer(): create a function that uses this tab to store another function's result."
[ref-tab.prototype.finally]:        /doc/reference/tab.prototype.finally.md#top        "Tab.prototype.finally(): process 'returned' and 'thrown' notifications for this tab and create a new tab with the result."
[ref-tab.prototype.has-thrown]:     /doc/reference/tab.prototype.has-thrown.md#top     "Tab.prototype.hasThrown(): has this tab thrown an error?"
[ref-tab.prototype.return]:         /doc/reference/tab.prototype.return.md#top         "Tab.prototype.return(): update the value of this tab."
[ref-tab.prototype.throw]:          /doc/reference/tab.prototype.throw.md#top          "Tab.prototype.throw(): put this tab in the failed state."
[ref-tab.prototype.to-string]:      /doc/reference/tab.prototype.to-string.md#top      "Tab.prototype.toString(): get a string representation for this tab."
[ref-tab.prototype.trace]:          /doc/reference/tab.prototype.trace.md#top          "Tab.prototype.trace(): create a function that uses this tab to store another function's subject, arguments, and result."
[ref-tab.prototype.try]:            /doc/reference/tab.prototype.try.md#top            "Tab.prototype.try(): process 'returned' notifications for this tab and create a new tab with the result."
[ref-tab.prototype.value-of]:       /doc/reference/tab.prototype.value-of.md#top       "Tab.prototype.valueOf(): get the principal value of this tab."

[ref-tab.ext]:                      /doc/reference/tab.ext.md#top                      "Tab.Ext: resources for extending the Tab library."

[ref-tab.ext.defer]:                /doc/reference/tab.defer.md#top                    "Tab.Ext.defer(): the basic method to create deferred functions."
