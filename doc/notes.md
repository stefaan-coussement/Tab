<a name="top" ></a>

<img src="./img/tab-logo87.png" alt="Tab logo" align="left" style="float:left; margin-top:-8px;" /><img src="./img/1x1.png" align="left" style="float:left;" height="79" width="20" />
# Tab
A javascript object to help with callbacks, promises, lazy evaluation and concurrent computing.
<br />

## Notes

### Tab Object
> 
> #### Tab Constructor
> * :ok: [new Tab()][ref-new-tab]  
> * :ok: [Tab()][ref-tab]  
> 
> #### Tab Constructor Attributes
> * .context  
> * :ok: [.version][ref-tab.version]  
>
> #### Tab Constructor Methods
> * ._scheduleFirst()  
> * ._scheduleLast()  
> * ._scheduleNext()  
> * ._scheduleNow()  
> * :ok: [.construct()][ref-tab.construct]  
> * :ok: [.create()][ref-tab.create]  
> * :ok: [.convert()][ref-tab.convert]  
> * .enumerate()  
> * .generate()  
> * :ok: [.isTab()][ref-tab.is-tab]  
> * .iterate()  
> * :ok: [.likeTab()][ref-tab.like-tab]  
> * .tabify()  
> * .tabifyWith()  
> * .untabify()  
> * .untabifyWith()  
> * :ok: [.when()][ref-tab.when]  
> * .whenAll()  
> * .whenFirst()  
> * .whenGreedy()  
> * .whenLast()  
> * .whenLazy()  
> * .whenLess()  
> * .whenMore()  
> * .whenNone()  
> * .whenOne()  
> * .whenSome()  
> * .yield()  
>
> #### Tab Prototype Methods
> * .apply()
> * .bind()
> * .call()
> * :ok: [.cancel()][ref-tab.prototype.cancel]  
> * :ok: [.catch()][ref-tab.prototype.catch]  
> * :ok: [.count()][ref-tab.prototype.count]  
> * .collect()  
> * :ok: [.defer()][ref-tab.prototype.defer]  
> * :ok: [.deferWith()][ref-tab.prototype.defer-with]  
> * :ok: [.define()][ref-tab.prototype.define]  
> * .delay()  
> * :ok: [.delegate()][ref-tab.prototype.delegate]  
> * .delete()  
> * .digest()  
> * .dispatch()  
> * :ok: [.do()][ref-tab.prototype.do]  
> * .signalBack()  
> * :ok: [.end()][ref-tab.prototype.end]  
> * .enumerate()  
> * :ok: [.evaluate()][ref-tab.prototype.evaluate]  
> * :ok: [.eventually()][ref-tab.prototype.eventually]  
> * :ok: [.finally()][ref-tab.prototype.finally]  
> * :ok: [.fulfill()][ref-tab.prototype.fulfill]  
> * .fork()  
> * .get()  
> * .generate()  
> * .guard()  
> * :ok: [.hasError()][ref-tab.prototype.has-error]  
> * :ok: [.hasProgressed()][ref-tab.prototype.has-progressed]  
> * :ok: [.hasSettled()][ref-tab.prototype.has-settled]  
> * :ok: [.hasValue()][ref-tab.prototype.has-value]  
> * .inspect()  
> * .info()  
> * .invoke()  
> * :ok: [.isDelegating()][ref-tab.prototype.is-delegating]  
> * .isEnumerating()  
> * .isGenerating()  
> * .isIterating()  
> * .isYielding()  
> * :ok: [.isSettling()][ref-tab.prototype.is-settling]  
> * .iterate()  
> * .join()  
> * .label()  
> * .next()  
> * .play()  
> * .post()  
> * .push()  
> * .put()  
> * :ok: [.raise()][ref-tab.prototype.raise]  
> * .record()  
> * :ok: [.reject()][ref-tab.prototype.reject]  
> * .requires()  
> * .set()  
> * :ok: [.settle()][ref-tab.prototype.settle]  
> * .shift()  
> * .spread()  
> * :ok: [.then()][ref-tab.prototype.then]  
> * .throttle()  
> * :ok: [.throw()][ref-tab.prototype.throw]  
> * .timeout()  
> * :ok: [.toString()][ref-tab.prototype.to-string]  
> * :ok: [.try()][ref-tab.prototype.try]  
> * .unshift()  
> * :ok: [.undelegate()][ref-tab.prototype.undelegate]  
> * :ok: [.update()][ref-tab.prototype.update]  
> * .yield()  
> * :ok: [.valueOf()][ref-tab.prototype.value-of]  
> * :ok: [.wrap()][ref-tab.prototype.wrap]  
>
> #### Tab Instance Methods
> * :ok: [._delegate()][ref-tab._delegate]  
> * :ok: [._isDelegating()][ref-tab._is-delegating]  
> * :ok: [._trap()][ref-tab._trap]  
> * :ok: [._undelegate()][ref-tab._undelegate]  
>
> #### Other Elements
> * :ok: [Scoping Function][ref-scoping-function]  
> * :ok: [Processor Function][ref-processor-function]  



<br /> Back to [Top] | [Topics] | [Reference] <br />





[top]: #top "back to the top of this page"
[topics]: /doc/topics.md#topics "back to the 'Topics' section"
[reference]: /doc/reference.md#reference "back to the 'Reference' section"



[ref-tab-object]:                   #tab-object                                        "more attributes and methods under 'Tab Object'"
[ref-tab-constructor]:              #tab-constructor                                   "more attributes and methods under 'Tab Constructor'"
[ref-tab-constructor-attributes]:   #tab-constructor-attributes                        "more attributes under 'Tab Constructor Attributes'"
[ref-tab-constructor-methods]:      #tab-constructor-methods                           "more methods under 'Tab Constructor Methods'"
[ref-tab-prototype-methods]:        #tab-prototype-methods                             "more methods under 'Tab Prototype Methods'"
[ref-tab-instance-methods]:         #tab-instance-methods                              "more methods under 'Tab Instance Methods'"
[ref-other-elements]:               #other-elements                                    "more methods under 'Other Elements'"



[ref-new-tab]:                      /doc/reference/new-tab.md#top                      "new Tab(): construct a new tab, delegate if needed."
[ref-tab]:                          /doc/reference/tab.md#top                          "Tab(): convert to a tab, create a new tab if required."

[ref-tab.context]:                  /doc/reference/tab.context.md#top                  "Tab.context: ..."
[ref-tab.version]:                  /doc/reference/tab.version.md#top                  "Tab.version: version of this Tab library."

[ref-tab.construct]:                /doc/reference/tab.construct.md#top                "Tab.construct(): construct a new tab, delegate if needed."
[ref-tab.convert]:                  /doc/reference/tab.convert.md#top                  "Tab.convert(): convert to a tab, create a new tab if required."
[ref-tab.create]:                   /doc/reference/tab.construct.md#top                "Tab.create(): create a new tab, fulfill if needed."
[ref-tab.is-tab]:                   /doc/reference/tab.is-tab.md#top                   "Tab.isTab: was the given object created by this Tab library?"
[ref-tab.like-tab]:                 /doc/reference/tab.like-tab.md#top                 "Tab.likeTab: ..."
[ref-tab.when]:                     /doc/reference/tab.when.md#top                     "Tab.when: ..."

[ref-tab.prototype.cancel]:         /doc/reference/tab.prototype.cancel.md#top         "Tab.prototype.cancel(): ..."
[ref-tab.prototype.catch]:          /doc/reference/tab.prototype.catch.md#top          "Tab.prototype.catch(): process error notifications for this tab."
[ref-tab.prototype.count]:          /doc/reference/tab.prototype.count.md#top          "Tab.prototype.count(): ..."
[ref-tab.prototype.defer]:          /doc/reference/tab.prototype.defer.md#top          "Tab.prototype.defer(): convert a function to use this tab to store its result."
[ref-tab.prototype.defer-with]:     /doc/reference/tab.prototype.defer-with.md#top     "Tab.prototype.deferWith(): ..."
[ref-tab.prototype.define]:         /doc/reference/tab.prototype.define.md#top         "Tab.prototype.define(): ..."
[ref-tab.prototype.delegate]:       /doc/reference/tab.prototype.delegate.md#top       "Tab.prototype.delegate(): !!! where are my glasses? !!!"
[ref-tab.prototype.do]:             /doc/reference/tab.prototype.do.md#top             "Tab.prototype.do(): create an notification processing scope for this tab."
[ref-tab.prototype.end]:            /doc/reference/tab.prototype.end.md#top            "Tab.prototype.end(): ..."
[ref-tab.prototype.evaluate]:       /doc/reference/tab.prototype.evaluate.md#top       "Tab.prototype.evaluate(): ..."
[ref-tab.prototype.eventually]:     /doc/reference/tab.prototype.eventually.md#top     "Tab.prototype.eventually(): filter out progress notifications for this tab."
[ref-tab.prototype.finally]:        /doc/reference/tab.prototype.finally.md#top        "Tab.prototype.finally(): process value and error notifications for this tab."
[ref-tab.prototype.fulfill]:        /doc/reference/tab.prototype.fulfill.md#top        "Tab.prototype.fulfill(): settle this tab with a value."
[ref-tab.prototype.has-error]:      /doc/reference/tab.prototype.has-error.md#top      "Tab.prototype.hasError(): has this tab an error?"
[ref-tab.prototype.has-progressed]: /doc/reference/tab.prototype.has-progressed.md#top "Tab.prototype.hasProgressed(): has this tab progressed?"
[ref-tab.prototype.has-settled]:    /doc/reference/tab.prototype.has-settled.md#top    "Tab.prototype.hasSettled(): has this tab settled?"
[ref-tab.prototype.has-value]:      /doc/reference/tab.prototype.has-value.md#top      "Tab.prototype.hasValue(): has this tab a value?"
[ref-tab.prototype.is-delegating]:  /doc/reference/tab.prototype.is-delegating.md#top  "Tab.prototype.isDelegating(): ..."
[ref-tab.prototype.is-settling]:    /doc/reference/tab.is-settling.md#top              "Tab.prototype.isSettling: are progress notifications being filtered out for this tab?"
[ref-tab.prototype.raise]:          /doc/reference/tab.prototype.raise.md#top          "Tab.prototype.raise(): ..."
[ref-tab.prototype.reject]:         /doc/reference/tab.prototype.reject.md#top         "Tab.prototype.reject(): settle this tab with an error."
[ref-tab.prototype.settle]:         /doc/reference/tab.prototype.settle.md#top         "Tab.prototype.settle(): settle this tab without changing its current value or error."
[ref-tab.prototype.then]:           /doc/reference/tab.prototype.then.md#top           "Tab.prototype.then(): ..."
[ref-tab.prototype.throw]:          /doc/reference/tab.prototype.throw.md#top          "Tab.prototype.throw(): set an error for this tab."
[ref-tab.prototype.to-string]:      /doc/reference/tab.prototype.to-string.md#top      "Tab.prototype.toString(): get a string representation for this tab."
[ref-tab.prototype.try]:            /doc/reference/tab.prototype.try.md#top            "Tab.prototype.try(): process value notifications for this tab."
[ref-tab.prototype.undelegate]:     /doc/reference/tab.prototype.undelegate.md#top     "Tab.prototype.undelegate(): ..."
[ref-tab.prototype.update]:         /doc/reference/tab.prototype.update.md#top         "Tab.prototype.update(): set a value for this tab."
[ref-tab.prototype.value-of]:       /doc/reference/tab.prototype.value-of.md#top       "Tab.prototype.valueOf(): get the principal value of this tab."
[ref-tab.prototype.wrap]:           /doc/reference/tab.prototype.wrap.md#top           "Tab.prototype.wrap(): ..."

[ref-tab._delegate]:                /doc/reference/tab._delegate.md#top                "tab._delegate(): ..."
[ref-tab._is-delegating]:           /doc/reference/tab._is-delegating.md#top           "tab._is-delegating(): ..."
[ref-tab._trap]:                    /doc/reference/tab._trap.md#top                    "tab._trap(): ..."
[ref-tab._undelegate]:              /doc/reference/tab._undelegate.md#top              "tab._undelegate(): ..."

[ref-scoping-function]:             /doc/reference/scoping-function.md#top             "scopingFunction: a function used as an argument in scoping Tab methods."
[ref-processor-function]:           /doc/reference/processor-function.md#top           "processorFunction: a function used as an argument in processing Tab methods."
