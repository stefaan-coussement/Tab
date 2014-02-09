<a name="top" ></a>
# [Tab][top]

A javascript object to help with callbacks, promises, lazy evaluation and concurrent computing.



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

**Check it out on our wiki**:
* [ A Basic Tab][topic-a-basic-tab] :new:
* [ A Basic Callback][topic-a-basic-callback] :new:
* [ A Basic Promise][topic-a-basic-promise] :new:
* :zzz: [ Basic Lazy Evaluation][topic-basic-lazy-evaluation]
* :construction: [ Basic Concurrent Computing][topic-basic-concurrent-computing]



<br /> To [Wiki Home] | [Wiki Topics] | [Wiki Reference] | [Top] <br />





[home]: https://github.com/stefaan-coussement/Tab/wiki/home.md "to the 'Wiki Home' page"
[topics]: https://github.com/stefaan-coussement/Tab/wiki/home.md#topics "to the 'Wiki Topics' section"
[topic-a-basic-tab]: https://github.com/stefaan-coussement/Tab/wiki/a-basic-tab.md "Wiki Topics / The Basics / A Basic Tab - creating and using a basic Tab object."
[topic-a-basic-callback]: https://github.com/stefaan-coussement/Tab/wiki/a-basic-callback.md "Wiki Topics / The Basics / A Basic Callback - using a Tab object to handle callbacks."
[topic-a-basic-promise]: https://github.com/stefaan-coussement/Tab/wiki/a-basic-promise.md "Wiki Topics / The Basics / A Basic Promise - using a Tab object as a promise."
[topic-basic-lazy-evaluation]: tbd "!!! thinking very hard !!!"
[topic-basic-concurrent-computing]: tbd "!!! coming soon !!!"
[reference]: https://github.com/stefaan-coussement/Tab/wiki/home.md#reference "back to the 'Wiki Reference' section"
[top]: #top "back to the top of this page"
