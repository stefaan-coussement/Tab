<a name="top" ></a>

<img src="http://raw2.github.com/stefaan-coussement/Tab/master/docs/img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-8px;" height="87" /><img src="http://raw2.github.com/stefaan-coussement/Tab/master/docs/img/1x1.png" align="left" style="float:left;" height="79" width="20" />
# [Tab][top]
Get help with callbacks, pipelines, streams, promises, lazy evaluation and concurrent computing.
<br />

[![Build Status](https://secure.travis-ci.org/stefaan-coussement/tab.png?branch=master)](https://travis-ci.org/stefaan-coussement/tab)

## [The Project][project]

This project was started out of an interest in javascript promises.  However, in our view, a lot of the designs we looked into have some short-comings.  

Then came CommonJS modules...

And then came an article about Microsoft's reactive extensions...  

What if we would combine some of the aspects of promises, modules and reactive extensions?  So the end result is an attempt to put a slightly different slant on asynchronous programming.

Because this API seriously differs from the promises defined in other projects, we avoided a name that is closely linked to previous implementations such as *promises*, *futures*, *deferreds*, *vows*, *delays*, *eventuals*.  We also wanted to avoid the '-able' suffix like in *Observables*.  We eventually went for *Tabs*.

>**tab** (noun)
> A projection, flap, or short strip attached to an object to facilitate opening, handling, or identification.  
> [http://www.thefreedictionary.com/tab]
>
>**keep tabs on** (idiom)
> To observe carefully.  To maintain a watch over, record activities of.  
> [http://www.thefreedictionary.com/tab]

The general goal is to help with callbacks, pipelines, streams, promises, lazy evaluation and concurrent computing.

>**callback** (programming)
> In computer programming, a callback is a piece of executable code that is passed as an argument to other code, which is expected to call back (execute) the argument at some convenient time. The invocation may be immediate as in a synchronous callback or it might happen at later time, as in an asynchronous callback.  
> [http://en.wikipedia.org/wiki/Callback_(computer_programming)]
>
>**pipeline** (programming)
> In software engineering, a pipeline consists of a chain of processing elements (processes, threads, coroutines, etc.), arranged so that the output of each element is the input of the next; the name is by analogy to a physical pipeline. Usually some amount of buffering is provided between consecutive elements. The information that flows in these pipelines is often a stream of records, bytes or bits, and the elements of a pipeline may be called filters; this is also called the pipes and filters design pattern. Connecting elements into a pipeline is analogous to function composition.  
> [http://en.wikipedia.org/wiki/Pipeline_(software)]
>
> When a programming language is originally designed without any syntax to nest function calls, pipeline programming is a simple syntax change to add it. The programmer connects notional program modules into a flow structure, by analogy to a physical pipeline carrying reaction products through a chemical or other plant.  
> [http://en.wikipedia.org/wiki/Pipeline_programming]
>
>**stream** (programming)
> In computer science, a stream is a sequence of data elements made available over time. A stream can be thought of as a conveyor belt that allows items to be processed one at a time rather than in large batches.  
> Streams are processed differently from batch data – normal functions cannot operate on streams as a whole, as they have potentially unlimited data, and formally, streams are codata (potentially unlimited), not data (which is finite). Functions that operate on a stream, producing another stream, are known as filters, and can be connected in pipelines, analogously to function composition. Filters may operate on one item of a stream at a time, or may base an item of output on multiple items of input, such as a moving average.  
> [http://en.wikipedia.org/wiki/Stream_(computing)]
>
> In computing, reactive programming is a programming paradigm oriented around data flows and the propagation of change. This means that it should be possible to express static or dynamic data flows with ease in the programming languages used, and that the underlying execution model will automatically propagate changes through the data flow.  
> [http://en.wikipedia.org/wiki/Reactive_programming]
>
>**promise** (programming)
> In computer science, future, promise, and delay refer to constructs used for synchronizing in some concurrent programming languages. They describe an object that acts as a proxy for a result that is initially unknown, usually because the computation of its value is yet incomplete.  
> [http://en.wikipedia.org/wiki/Promise_(programming)]
>
> A promise is the final item in a stream. A stream itself is a way to shorten a very long sequence into a short one, and request only the items needed at the moment.  
> [http://en.wikipedia.org/wiki/Promise_(computing)]
>
>**lazy evaluation** (programming)
> In programming language theory, lazy evaluation, or call-by-need is an evaluation strategy which delays the evaluation of an expression until its value is needed (non-strict evaluation) and which also avoids repeated evaluations (sharing). The sharing can reduce the running time of certain functions by an exponential factor over other non-strict evaluation strategies, such as call-by-name.  
> [http://en.wikipedia.org/wiki/Lazy_evaluation]
>
>**concurrent computing** (programming)
>Concurrent computing is a form of computing in which several computations are executing during overlapping time periods – concurrently – instead of sequentially (one completing before the next starts). This is a property of a system – this may be an individual program, a computer, or a network – and there is a separate execution point or "thread of control" for each computation ("process"). A concurrent system is one where a computation can make progress without waiting for all other computations to complete – where more than one computation can make progress at "the same time".  
>[http://en.wikipedia.org/wiki/Concurrent_computing]

We are re-using names of methods of other APIs, even when the semantics of the methods are very different.   Equally, we are using different names, even if the semantics of the methods are identical to the methods in the other APIs.  This is not done to create confusion - although it certainly does - but because a lot of the method names are overloaded with a lot of very different semantics.  Especially in the *Promise*-world, we felt that it is simply impossible to come up with an intuitively understandable set of names and at the same time adhere to the semantics of the different libraries where these names are also used.



### Check it out

* [A Basic Tab][topic-a-basic-tab]  
  creating and using a basic Tab object.

* [A Basic Callback][topic-a-basic-callback]  
  using a Tab object to handle callbacks.

* [A Basic Pipeline][topic-a-basic-pipeline]  
  using Tab objects for pipelining.

* [A Basic Stream][topic-a-basic-stream]  
  using a Tab object to work with sequence of data elements.

* [A Basic Promise][topic-a-basic-promise]  
  using a Tab object as a promise.

* [Basic Lazy Evaluation][topic-basic-lazy-evaluation]  
  using a Tab object for lazy evaluation.

* [Basic Concurrent Computing][topic-basic-concurrent-computing]  
  using a Tab object to handle concurrent computing.



### Goals

The following is a maintained, and thus regularly updated and re-organized list of goals (in no particular order).  Some may seem a bit obscure without proper explanation.  Where needed and when time allows, we will create [topics][topics] to discuss them in more detail.  

1.  Basic Tabs

    1. :ok: provide the means to capture a future value in a tab and notify its observers when the value becomes available.
    
    1. :ok: provide the means to capture special values in a tab, such as `undefined`, `null` and other tabs (promises typically can't store promises without adopting the state and value of the stored promise).
    
    1. :ok: provide the means to capture a future error in a tab and notify its observers when the error becomes available.
    
    1. :ok: provide the means to work with progress events, including recoverable exceptions (reject brings a promise into a final and non-mutable state that we cannot recover from).
    
    1. provide the means to work with foreign tabs (tabs created by another tab-like constructor).
    
    1. provide the means to work with remote tabs (via a message interface).
    
    1. :ok: provide the means to cancel a tab, both its subscription for the events from other tabs and its ongoing action undertaken as a consequence of such past events.
    
1.  Callbacks

    1. :ok: provide the means to use a tab to capture the arguments for a callback, without executing the original callback, and then use the original callback function as the processor of the tab's notification.
    
    1. :ok: provide the means to capture a callback's result, without needing to change the callback's signature.
    
    1. :ok: provide the means to capture a callback's error in a tab, without needing to change the callback's signature.
    
1.  Pipelines

    1. use a fluent API wherever it makes sense (a Deferred object is not chainable).
    
    2. provide the means to asynchronously process notifications by pushing them into a pipeline of processing tabs.
    
    3. provide the means to encapsulate a pipeline of tabs in a function that then can be used as a module to compose longer pipelines.
    
1.  Streams

    1. provide the means to generate a stream of data elements, without caching or recording the generated data elements.
    
    1. :ok: provide the means to generate a stream of data elements, caching the last generated data element for observers that register after that data element was generated.
    
    1. provide the means to generate a stream of data elements, recording the sequence of generated data elements for observers that register after the data elements were generated.
    
    1. provide the means to play back a cached data element or a recorded sequence of data elements using an reactive push-model.
    
    1. provide the means to play back a cached data element or a recorded sequence of data elements using a interactive pull model.
    
1.  Promises

    1. :ok: provide the means to settle a tab with a value or error, i.e. a final and non-mutable data element, and notify its observers.
    
    1. provide the means to solve security concerns (isolation of provider and consumer) without penalizing other aspects of the API (solving security concerns is a primary goal in the promise design, in some ways limiting other API methods).
    
    1. keep compatibility with the [Promise/A+](http://promises-aplus.github.io/promises-spec/) project where possible.
    
    1. keep interoperability with [Q](https://github.com/kriskowal/q) promises where possible.
    
    1. keep interoperability with [jQuery](http://jquery.com/) promises where possible.
    
    1. keep interoperability with [NodeJS](http://nodejs.org/) promises where possible.
    
1.  Lazy Evaluation

    1. provide the means to define a tab without effectively executing the definition until the tab's result is needed (promises don't support lazy evaluation).
    
    1. provide the means for a tab to define dependencies on other tabs without triggering their evaluation (lazy evaluation).
    
1.  Concurrent Computing

    1. provide the means to combine multiple streams into a single tab.
    
    1. provide the means to combine these streams in a number of different ways:
        * wait for the value of all tabs to calculate a result (similar to boolean logic)
        * wait for the value of the first tabs in sequence to calculate a result (similar to javascript `||` and `&&`)  
        * wait for the value of the first tabs in time to calculate a result
        
    
1.  Debugging
    
    1. provide the means to log messages without needing to break the fluent chain.
    
    1. provide the means to use a tab to capture the subject and arguments of a method, for instance for use during testing.
    
    1. provide the means to use a tab to capture the subject, arguments and result or error of a method, for instance for use during testing.
    
1.  Miscellaneous
    
    1. provide the means to augment a tab with contextual information that stays accessible through the chain of tabs that are created when handling events (f.i. using the .try method).
    
    1. provide the means to throttle the execution of event handlers (f.i. only four outstanding http requests allowed at one time).
    
    1. provide the means to work with tabs in an ES3 environment.
    
    1. provide an experimental version that uses *ES.next* weak maps instead of closures.
    
    1. investigate if we can provide an experimental interface to set and get the value of a tab, using *ES.next* proxies.  It is however impossible to provide full proxying on a tab.  The prototype methods defined for Tab cannot be trapped and applied to the contained object, unless **all** of the current prototype methods are moved to a corresponding constructor method, essentially breaking the requirement of a fluid API.  Instead, we may introduce a special `.value` attribute to serve as a full proxy for the contained object? ...



### Influences

There are a lot of other projects that were (and still are) influencing this project, many more than I am able to mention, but here are a couple of the most important ones:

* [Q](https://github.com/kriskowal/q)  

* [CommonJS](http://wiki.commonjs.org/wiki/CommonJS), especially the work on Modules and Promises  
<a title="Visit CommonJS" href="http://wiki.commonjs.org/wiki/CommonJS">  
  <img src="http://wiki.commonjs.org/images/b/bc/Wiki.png" height="80"
 alt="CommonJS logo">
</a>

* [Promise/A+](http://promises-aplus.github.io/promises-spec/)  
<a title="Visit Promises/A+" href="http://promises-aplus.github.com/promises-spec">
    <img src="http://promises-aplus.github.com/promises-spec/assets/logo-small.png" height="80" alt="Promises/A+ logo" />
</a>

* [RxJS, The Reactive Extensions For Javascript](http://rxjs.codeplex.com/)  
<a title="Visit RxJS" href="http://rxjs.codeplex.com/">
    <img src="http://download-codeplex.sec.s-msft.com/Download?ProjectName=rxjs&DownloadId=530910&Build=20865" height="80" alt="RxJS logo" >
</a>



<br /> Back to [Top] | [Project] | [Topics] | [Reference] <br />
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

[ref-new-tab]:                       /docs/reference/new-tab.md#top                       "new Tab(): construct a new tab, encapsulate a given tab if requested."
[ref-tab]:                           /docs/reference/tab.md#top                           "Tab(): convert to a tab, create a new tab if required."

[ref-tab.context]:                   /docs/reference/tab.context.md#top                   "Tab.context: the processing context for a processor function."
[ref-tab.version]:                   /docs/reference/tab.version.md#top                   "Tab.version: the version of this Tab library."

[ref-tab.construct]:                 /docs/reference/tab.construct.md#top                 "Tab.construct(): construct a new tab, encapsulate a given tab if requested."
[ref-tab.convert]:                   /docs/reference/tab.convert.md#top                   "Tab.convert(): convert to a tab, create a new tab if required."
[ref-tab.defer]:                     /docs/reference/tab.defer.md#top                     "Tab.defer(): create a function that uses a given tab to store another function's result."
[ref-tab.defer-fulfill]:             /docs/reference/tab.defer-fulfill.md#top             "Tab.deferFulfill(): create a function that updates the value of a given tab and silently blocks any further updates."
[ref-tab.defer-reject]:              /docs/reference/tab.defer-reject.md#top              "Tab.deferReject(): create a function that puts a given tab in the failed state and silently blocks any further updates."
[ref-tab.defer-return]:              /docs/reference/tab.defer-return.md#top              "Tab.deferReturn(): create a function that updates the value of a given tab."
[ref-tab.defer-settle]:              /docs/reference/tab.defer-settle.md#top              "Tab.deferSettle(): create a function that silently blocks any further updates for a given tab."
[ref-tab.defer-throw]:               /docs/reference/tab.defer-throw.md#top               "Tab.deferThrow(): create a function that puts a given tab in the failed state."
[ref-tab.defer-with]:                /docs/reference/tab.defer.md#top                     "Tab.deferWith(): create a function that uses a given tab to store another function's result, using the new function's subject as a first argument for the other function."
[ref-tab.is-tab]:                    /docs/reference/tab.is-tab.md#top                    "Tab.isTab(): was the given object created by this Tab constructor?"
[ref-tab.new-fulfill]:               /docs/reference/tab.new-fulfill.md#top               "Tab.newFulfill(): create a new tab that is initialized with a given value and silently block any further updates."
[ref-tab.new-reject]:                /docs/reference/tab.new-reject.md#top                "Tab.newReject(): create a new tab that is put in the failed state and silently block any further updates."
[ref-tab.new-return]:                /docs/reference/tab.new-return.md#top                "Tab.newReturn(): create a new tab that is initialized with a given value."
[ref-tab.new-settle]:                /docs/reference/tab.new-settle.md#top                "Tab.newSettle(): create a new tab and silently block any further updates."
[ref-tab.new-throw]:                 /docs/reference/tab.new-throw.md#top                 "Tab.newThrow(): create a new tab that is put in the failed state."

[ref-tab.prototype.cancel]:          /docs/reference/tab.prototype.cancel.md#top          "Tab.prototype.cancel(): cancel all subscriptions and all scheduled processors for this tab."
[ref-tab.prototype.do-return]:       /docs/reference/tab.prototype.do-return.md#top       "Tab.prototype.doReturn(): update the value of this tab (for ES3 environments)."
[ref-tab.prototype.do-throw]:        /docs/reference/tab.prototype.do-throw.md#top        "Tab.prototype.doThrow(): put this tab in the failed state (for ES3 environments)."
[ref-tab.prototype.fulfill]:         /docs/reference/tab.prototype.fulfill.md#top         "Tab.prototype.fulfill(): update the value of this tab and silently block any further updates."
[ref-tab.prototype.has-returned]:    /docs/reference/tab.prototype.has-returned.md#top    "Tab.prototype.hasReturned(): has this tab returned a value?"
[ref-tab.prototype.has-thrown]:      /docs/reference/tab.prototype.has-thrown.md#top      "Tab.prototype.hasThrown(): has this tab thrown an error?"
[ref-tab.prototype.is-cancelled]:    /docs/reference/tab.prototype.is-cancelled.md#top    "Tab.prototype.isCancelled(): are all subscriptions for this tab cancelled?"
[ref-tab.prototype.is-settled]:      /docs/reference/tab.prototype.is-settled.md#top      "Tab.prototype.isSettled(): are any further updates for this tab blocked?"
[ref-tab.prototype.on-cancelled]:    /docs/reference/tab.prototype.on-cancelled.md#top    "Tab.prototype.onCancelled(): execute a processor when this tab is cancelled."
[ref-tab.prototype.on-returned]:     /docs/reference/tab.prototype.on-returned.md#top     "Tab.prototype.onReturned(): execute a processor when this tab has returned a value."
[ref-tab.prototype.on-settled]:      /docs/reference/tab.prototype.on-settled.md#top      "Tab.prototype.onSettled(): execute a processor when this tab is settled."
[ref-tab.prototype.on-thrown]:       /docs/reference/tab.prototype.on-thrown.md#top       "Tab.prototype.onThrown(): execute a processor when this tab has thrown an error."
[ref-tab.prototype.reject]:          /docs/reference/tab.prototype.reject.md#top          "Tab.prototype.reject(): put this tab in the failed state and silently block any further updates."
[ref-tab.prototype.return]:          /docs/reference/tab.prototype.return.md#top          "Tab.prototype.return(): update the value of this tab."
[ref-tab.prototype.settle]:          /docs/reference/tab.prototype.settle.md#top          "Tab.prototype.settle(): silently block any further updates for this tab."
[ref-tab.prototype.throw]:           /docs/reference/tab.prototype.throw.md#top           "Tab.prototype.throw(): put this tab in the failed state."
[ref-tab.prototype.to-string]:       /docs/reference/tab.prototype.to-string.md#top       "Tab.prototype.toString(): get a string representation for this tab."
[ref-tab.prototype.value-of]:        /docs/reference/tab.prototype.value-of.md#top        "Tab.prototype.valueOf(): get the principal value of this tab."

[ref-tab.schedulers.tick]:           /docs/reference/tab.schedulers.tick.md#top           "Tab.Schedulers.es5: a sequence number incremented in every turn"

[ref-tab.schedulers.schedule-first]: /docs/reference/tab.schedulers.schedule-first.md#top "Tab.Schedulers.defer(): schedule a given callback before all other callbacks in the next turn."
[ref-tab.schedulers.schedule-last]:  /docs/reference/tab.schedulers.schedule-last.md#top  "Tab.Schedulers.defer(): schedule a given callback after all other callbacks."
[ref-tab.schedulers.schedule-next]:  /docs/reference/tab.schedulers.schedule-next.md#top  "Tab.Schedulers.notify(): schedule a given callback in the next turn."
[ref-tab.schedulers.schedule-now]:   /docs/reference/tab.schedulers.schedule-now.md#top   "Tab.Schedulers.subscribe(): call the callback immediately."

[ref-tab.x.es5]:                     /docs/reference/tab.x.es5.md#top                     "Tab.X.es5: is this library running in an ES5 environment?"

[ref-tab.x.defer]:                   /docs/reference/tab.x.defer.md#top                   "Tab.X.defer(): the basic method to create deferred functions."
[ref-tab.x.notify]:                  /docs/reference/tab.x.notify.md#top                  "Tab.X.notify(): the basic method to send notifications for a tab."
[ref-tab.x.subscribe]:               /docs/reference/tab.x.subscribe.md#top               "Tab.X.subscribe(): the basic method to subscribe to notifications from a tab."
