<a name="top" ></a>

<img src="http://raw2.github.com/stefaan-coussement/Tab/master/doc/img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-8px;" height="87" /><img src="http://raw2.github.com/stefaan-coussement/Tab/master/doc/img/1x1.png" align="left" style="float:left;" height="79" width="20" />
# [Tab][top]
Get help with callbacks, promises, pipelines, lazy evaluation and concurrent computing.
<br />

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

The general goal is to help with callbacks, promises, pipelines, lazy evaluation and concurrent computing.

>**callback** (programming)
> In computer programming, a callback is a piece of executable code that is passed as an argument to other code, which is expected to call back (execute) the argument at some convenient time. The invocation may be immediate as in a synchronous callback or it might happen at later time, as in an asynchronous callback.  
> [http://en.wikipedia.org/wiki/Callback_(computer_programming)]
>
>**promise** (programming)
> In computer science, future, promise, and delay refer to constructs used for synchronizing in some concurrent programming languages. They describe an object that acts as a proxy for a result that is initially unknown, usually because the computation of its value is yet incomplete.  
> [http://en.wikipedia.org/wiki/Promise_(programming)]
>
> A promise is the final item in a stream. A stream itself is a way to shorten a very long sequence into a short one, and request only the items needed at the moment.  
> [http://en.wikipedia.org/wiki/Promise_(computing)]
>
>**pipeline** (programming)
> In software engineering, a pipeline consists of a chain of processing elements (processes, threads, coroutines, etc.), arranged so that the output of each element is the input of the next; the name is by analogy to a physical pipeline. Usually some amount of buffering is provided between consecutive elements. The information that flows in these pipelines is often a stream of records, bytes or bits, and the elements of a pipeline may be called filters; this is also called the pipes and filters design pattern. Connecting elements into a pipeline is analogous to function composition.  
> [http://en.wikipedia.org/wiki/Pipeline_(software)]
>
> When a programming language is originally designed without any syntax to nest function calls, pipeline programming is a simple syntax change to add it. The programmer connects notional program modules into a flow structure, by analogy to a physical pipeline carrying reaction products through a chemical or other plant.  
> [http://en.wikipedia.org/wiki/Pipeline_programming]
>
> In computing, reactive programming is a programming paradigm oriented around data flows and the propagation of change. This means that it should be possible to express static or dynamic data flows with ease in the programming languages used, and that the underlying execution model will automatically propagate changes through the data flow.  
> [http://en.wikipedia.org/wiki/Reactive_programming]
>
>**lazy evaluation** (programming)
> In programming language theory, lazy evaluation, or call-by-need is an evaluation strategy which delays the evaluation of an expression until its value is needed (non-strict evaluation) and which also avoids repeated evaluations (sharing). The sharing can reduce the running time of certain functions by an exponential factor over other non-strict evaluation strategies, such as call-by-name.  
> [http://en.wikipedia.org/wiki/Lazy_evaluation]
>
>**concurrent computing** (programming)
>Concurrent computing is a form of computing in which several computations are executing during overlapping time periods – concurrently – instead of sequentially (one completing before the next starts). This is a property of a system – this may be an individual program, a computer, or a network – and there is a separate execution point or "thread of control" for each computation ("process"). A concurrent system is one where a computation can make progress without waiting for all other computations to complete – where more than one computation can make progress at "the same time".  
>[http://en.wikipedia.org/wiki/Concurrent_computing]



### Check it out

* [A Basic Tab][topic-a-basic-tab]  
  creating and using a basic Tab object.

* [A Basic Callback][topic-a-basic-callback]  
  using a Tab object to handle callbacks.

* [A Basic Promise][topic-a-basic-promise]  
  using a Tab object as a promise.

* [Basic Pipelining][topic-basic-pipelining]  
  using Tab objects for pipelining.

* [Basic Lazy Evaluation][topic-basic-lazy-evaluation]  
  using a Tab object for lazy evaluation.

* [Basic Concurrent Computing][topic-basic-concurrent-computing]  
  using a Tab object to handle concurrent computing.



### Goals

The following is a maintained, and thus regularly updated and re-organized list of goals (in no particular order).  Some may seem a bit obscure without proper explanation.  Where needed and when time allows, we will create [topics][topics] to discuss them in more detail.  

1.  Basic Tabs

    1. :ok: provide the means to capture a future value in a tab and notify its observers when the value becomes available.
    
    1. :ok: provide the means to capture special values in a tab, such as `undefined`, `null` and other tabs.
    
    1. :ok: provide the means to capture a future error in a tab and notify its observers when the error becomes available.
    
    1. :ok: provide the means to work with progress events, including recoverable exceptions (reject brings a promise into a final and non-mutable state that we cannot recover from).
    
    1. provide the means to work with foreign tabs (tabs created by another tab-like constructor).
    
    1. provide the means to work with remote tabs (via a message interface).
    
    1. provide the means to cancel a tab, both its subscription for the events from other tabs and its ongoing action undertaken as a consequence of such past events.
    

1.  Callbacks

    1. provide the means to encapsulate a callback into a promise to capture the callback's result, without needing to change the encapsulated callback's signature.
    
    1. provide the means to capture multiple values in a tab without needing to encapsulate these values in an object.
    
    1. provide the means to capture an error in a tab with some contextual information.
    
    1. provide the ability to use the methods for updating the value of a tab as a callback, basically avoiding the definition of a lambda.
    

1.  Promises

    1. provide the means to settle a tab with a value or error, i.e. a final and non-mutable state, and notify its observers.
    
    1. provide the means to solve security concerns (isolation of provider and consumer) without penalizing other aspects of the API (solving security concerns is a primary goal in the promise design, in some ways limiting other API methods).
    
    1. keep compatibility with the [Promise/A+](http://promises-aplus.github.io/promises-spec/) project where possible.
    
    1. keep interoperability with [Q](https://github.com/kriskowal/q) promises where possible.
    
    1. keep interoperability with [jQuery](http://jquery.com/) promises where possible.
    
    1. keep interoperability with [NodeJS](http://nodejs.org/) promises where possible.
    

1.  Pipelining

    1. :ok: use a fluid API wherever it makes sense (a Deferred object is not chainable).
    
    2. provide the means to dynamically and asynchronously process events by pushing them into a pipeline of tabs.
    
    3. provide the means to encapsulate a pipeline of tabs in a function that then can be used as a module to compose longer pipelines.
    

1.  Lazy Evaluation

    1. provide the means to define a tab without effectively executing the definition until the tab's result is needed (promises don't support lazy evaluation).
    
    1. provide the means for a tab to define dependencies on other tabs without triggering their evaluation (lazy evaluation).
    

1.  Concurrent Computing

    1. provide the means to combine the results from multiple sources into a single tab.
    
    1. provide the means to combine these results in a number of different ways:
        * wait for the value of all tabs to calculate a result (similar to boolean logic)
        * wait for the value of the first tabs in sequence to calculate a result (similar to javascript `||` and `&&`)  
        * wait for the value of the first tabs in time to calculate a result

1.  Miscellaneous

    1. provide the means to augment a tab with contextual information that stays accessible through the chain of tabs that are created when handling events (f.i. using the .then method).
    
    1. provide the means to throttle the execution of event handlers (f.i. only four outstanding http requests allowed at one time).
        
    1. for use in *ES5* environments, provide a getter for `.length` as an alternative for the `.count()` method, hence making Tab better line-up with intuitive Javascript practise.
    
    1. provide an experimental version that uses *ES.next* weak maps instead of closures.
    
    1. investigate if we can provide an experimental interface to set and get the value of a tab, using *ES.next* proxies.  There may be a major limitation that protype methods defined for Tab cannot be trapped and applied to the contained object, unless **all** of the current prototype methods are moved to a corresponding constructor method, essentially breaking the requirement of a fluid API.  Instead, we may introduce a special `.value` attribute or method to serve as a proxy for the contained object? ...



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
[ref-other-elements]:               /doc/reference.md#other-elements                   "more methods under 'Other Elements'"

[ref-new-tab]:                      /doc/reference/new-tab.md#top                      "new Tab(): construct a new tab, encapsulate a given tab if requested."
[ref-tab]:                          /doc/reference/tab.md#top                          "Tab(): convert to a tab, create a new tab if required."

[ref-tab.version]:                  /doc/reference/tab.version.md#top                  "Tab.version: the version of this Tab library."

[ref-tab.construct]:                /doc/reference/tab.construct.md#top                "Tab.construct(): construct a new tab, encapsulate a given tab if requested."
[ref-tab.convert]:                  /doc/reference/tab.convert.md#top                  "Tab.convert(): convert to a tab, create a new tab if required."
[ref-tab.is-tab]:                   /doc/reference/tab.is-tab.md#top                   "Tab.isTab(): was the given object created by this Tab constructor?"
[ref-tab.return]:                   /doc/reference/tab.return.md#top                   "Tab.return(): construct a new tab an set its value."
[ref-tab.throw]:                    /doc/reference/tab.throw.md#top                    "Tab.throw(): construct a new tab and put it in the failed state."

[ref-tab.prototype.catch]:          /doc/reference/tab.prototype.catch.md#top          "Tab.prototype.catch(): process 'thrown' notifications for this tab and create a new tab with the result."
[ref-tab.prototype.finally]:        /doc/reference/tab.prototype.finally.md#top        "Tab.prototype.finally(): process 'returned' and 'thrown' notifications for this tab and create a new tab with the result."
[ref-tab.prototype.has-thrown]:     /doc/reference/tab.prototype.has-thrown.md#top     "Tab.prototype.hasThrown(): has this tab thrown an error?"
[ref-tab.prototype.return]:         /doc/reference/tab.prototype.return.md#top         "Tab.prototype.return(): update the value of this tab."
[ref-tab.prototype.throw]:          /doc/reference/tab.prototype.throw.md#top          "Tab.prototype.throw(): put this tab in the failed state."
[ref-tab.prototype.to-string]:      /doc/reference/tab.prototype.to-string.md#top      "Tab.prototype.toString(): get a string representation for this tab."
[ref-tab.prototype.try]:            /doc/reference/tab.prototype.try.md#top            "Tab.prototype.try(): process 'returned' notifications for this tab and create a new tab with the result."
[ref-tab.prototype.value-of]:       /doc/reference/tab.prototype.value-of.md#top       "Tab.prototype.valueOf(): get the principal value of this tab."

[ref-the-javascript-object]:        /doc/reference/the-javascript-object.md#top        "The Javascript Object: the structure of the javascript object."