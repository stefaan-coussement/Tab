<a name="top" ></a>

<img src="./doc/img/tab-logo102.png" alt="Tab logo" align="left" style="float:left; margin-top:-8px;" /><img src="./doc/img/1x1.png" align="left" style="float:left;" height="94" width="20" />
# [Tab][top]
A javascript object to help with callbacks, promises, lazy evaluation and concurrent computing.
<br />

**tab** (noun)
> A projection, flap, or short strip attached to an object to facilitate opening, handling, or identification. <br /> [http://www.thefreedictionary.com/tab]

**keep tabs on** (idiom)
> To observe carefully.  To maintain a watch over, record activities of. <br /> [http://www.thefreedictionary.com/tab]

**callback** (programming)
> In computer programming, a callback is a piece of executable code that is passed as an argument to other code, which is expected to call back (execute) the argument at some convenient time. The invocation may be immediate as in a synchronous callback or it might happen at later time, as in an asynchronous callback. <br /> [http://en.wikipedia.org/wiki/Callback_(computer_programming)]

**promise** (programming)
> In computer science, future, promise, and delay refer to constructs used for synchronizing in some concurrent programming languages. They describe an object that acts as a proxy for a result that is initially unknown, usually because the computation of its value is yet incomplete. <br /> [http://en.wikipedia.org/wiki/Promise_(programming)]
>
> A promise is the final item in a stream. A stream itself is a way to shorten a very long sequence into a short one, and request only the items needed at the moment. <br /> [http://en.wikipedia.org/wiki/Promise_(computing)]

**lazy evaluation** (programming)
> In programming language theory, lazy evaluation, or call-by-need is an evaluation strategy which delays the evaluation of an expression until its value is needed (non-strict evaluation) and which also avoids repeated evaluations (sharing). The sharing can reduce the running time of certain functions by an exponential factor over other non-strict evaluation strategies, such as call-by-name. <br /> [http://en.wikipedia.org/wiki/Lazy_evaluation]

**concurrent computing** (programming)
>Concurrent computing is a form of computing in which several computations are executing during overlapping time periods – concurrently – instead of sequentially (one completing before the next starts). This is a property of a system – this may be an individual program, a computer, or a network – and there is a separate execution point or "thread of control" for each computation ("process"). A concurrent system is one where a computation can make progress without waiting for all other computations to complete – where more than one computation can make progress at "the same time". <br /> [http://en.wikipedia.org/wiki/Concurrent_computing]
>
> Concurrent computing is related to but distinct from parallel computing, though these concepts are frequently confused, and both can be described as "multiple processes executing at the same time". In parallel computing, execution literally occurs at the same instant, for example on separate processors of a multi-processor machine – parallel computing is impossible on a (single-core) single processor, as only one computation can occur at any instant (during any single clock cycle). By contrast, concurrent computing consists of process lifetimes overlapping, but execution need not happen at the same instant. <br /> [http://en.wikipedia.org/wiki/Concurrent_computing#Definition]



Promises (futures, deferreds, vows, delays, eventuals) are gaining increasing popularity in the world of callbacks and concurrent computing.  However, promises are typically resolved to a single, final and non-mutable value, and we have typically no visibility on what happens before reaching this final state.  
Although there may be very good scientific, mathematical reasons for this 'non-mutable' behavior, it is often necessary to follow what is going on before reaching the final state.  Some implementations of promises do provide such means to follow the progress, but this is completely absent in most.  Usually, 'progress' is a kind of afterthought to the API design.

Tabs can be a considered an extension to the traditional promises.  Tabs are observing the asynchronous world from a 'progress' perspective, that can eventually lead to a final and non-mutable 'promised' state.

Check it out...

### [The Basics][topic-the-basics]
> * [A Basic Tab][topic-a-basic-tab] :new:  
>   creating and using a basic Tab object.
> * [A Basic Callback][topic-a-basic-callback] :new:  
>   using a Tab object to handle callbacks.
> * [A Basic Promise][topic-a-basic-promise] :new:  
>   using a Tab object as a promise.
> * [Basic Lazy Evaluation][topic-basic-lazy-evaluation]  
>   :thought_balloon:
> * [Basic Concurrent Computing][topic-basic-concurrent-computing]  
>   :thought_balloon:

### [Where Are Tabs Helping?][topic-where-are-tabs-helping]
> * [Keeping Clean Callback Signatures][topic-keeping-clean-callback-signatures]  
>   :thought_balloon:
> * [Shallow Callback Nesting][topic-shallow-callback-nesting]  
>   :thought_balloon:
> * [Top-Down Control Flow][topic-top-down-control-flow]  
>   :thought_balloon:
> * [Predicting Execution Order][topic-predicting-execution-order]  
>   :thought_balloon:
> * [Modular Decomposition][topic-modular-decomposition]  
>   :thought_balloon:
> * [Aspect Oriented Programming][topic-aspect-oriented-programming]  
>   :thought_balloon:
> * [Exception Style Error Propagation][topic-exception-style-error-propagation]  
>   :thought_balloon:
> * [Monitoring Function Calls][topic-monitoring-function-calls]  
>   :thought_balloon:
> * [Throttling Execution][topic-throttling-execution]  
>   :thought_balloon:
> * [Cancelling Execution][topic-cancelling-execution]  
>   :thought_balloon:
> * [Timing Out Execution][topic-timing-out-execution]  
>   :thought_balloon:
> * [Delaying Execution][topic-delaying-execution]  
>   :thought_balloon:
> * [Prioritizing Execution][topic-prioritizing-execution]  
>   :thought_balloon:
> * [Lazy Evaluation][topic-lazy-evaluation]  
>   :zzz:
> * [Working With Remote Objects][topic-working-with-remote-objects]  
>   :thought_balloon:
> * [Enumerating Tabs][topic-enumerating-tabs]  
>   :thought_balloon:
> * [Iterating Tabs][topic-iterating-tabs]  
>   :thought_balloon:
> * [Generating Tabs][topic-generating-tabs]  
>   :thought_balloon:
> * [Joining Results From Parallel Callbacks][topic-joining-results-from-parallel-execution]  
>   :thought_balloon:
> * [Synchronizing Execution][topic-synchronizing-execution]  
>   :thought_balloon:
> * [Isolating Information Providers][topic-isolating-information-providers]  
>   :thought_balloon:
> * [Isolating Information Consumers][topic-isolating-information-consumers]  
>   :thought_balloon:

### [Where Are Tabs Lacking?][topic-where-are-tabs-lacking]
> * [Debugging asynchronous events][topic-debugging-asynchronous-events]  
>   :thought_balloon:



<br /> Back to [Top] | [Topics] | [Reference] <br />





[top]:       #top                        "back to the top of this page"
[topics]:    /doc/topics.md#topics       "back to the 'Topics' section"
[reference]: /doc/reference.md#reference "back to the 'Reference' section"



[topic-the-basics]:                              #the-basics                                  "more topics under 'The Basics'"
[topic-where-are-tabs-helping]:                  #where-are-tabs-helping                      "more topics under 'Where Are Tabs Helping'"
[topic-where-are-tabs-lacking]:                  #where-are-tabs-lacking                      "more topics under 'Where Are Tabs Lacking'"



[topic-a-basic-tab]:                             /doc/topics/a-basic-tab.md#top                             "A Basic Tab: creating and using a basic Tab object."
[topic-a-basic-callback]:                        /doc/topics/a-basic-callback.md#top                        "A Basic Callback: using a Tab object to handle callbacks."
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
