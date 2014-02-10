<a name="top" ></a>

<img src="./img/tab-logo128.png" alt="Tab logo" align="left" style="float:left;" /><img src="./img/1x1.png" align="left" style="float:left;" height="128" width="20" /><img src="./img/1x1.png" height="1" width="20" style="margin-top:35px;" />
# [Tab][top]
A javascript object to help with callbacks, promises, lazy evaluation and concurrent computing.
<br />

## [Reference]

### [Tab Object][ref-tab-object]
> 
> #### [Tab Constructor][ref-tab-constructor]
> * [new Tab()][ref-new-tab] :construction:  
>   create a new tab.
>   
> * [Tab()][ref-tab] :construction:  
>   convert to a tab, create a new tab if required.
> 
> #### [Tab Constructor Attributes][ref-tab-constructor-attributes]
> * [.context][ref-tab.context]  
>   :thought_balloon:
>   
> * [.version][ref-tab.version] :construction:  
>   version of this Tab library.
>
> #### [Tab Constructor Methods][ref-tab-constructor-methods]
> * [.eventually()][ref-tab.eventually] :construction:  
>   filter out progress notifications for a given tab.
> 
> * [.isSettlingTab()][ref-tab.is-settling-tab] :construction:  
>   are progress notifications being filtered out for a given tab?
> 
> * [.isTab()][ref-tab.is-tab] :construction:  
>   was the given object created by this Tab library?
> 
> * [.likeTab()][ref-tab.like-tab]  
>   :thought_balloon:
> 
> * [.tabify()][ref-tab.tabify]  
>   :thought_balloon:
> 
> * [.tabifyWith()][ref-tab.tabify-with]  
>   :thought_balloon:
> 
> * [.untabify()][ref-tab.untabify]  
>   :thought_balloon:
> 
> * [.untabifyWith()][ref-tab.untabify-with]  
>   :thought_balloon:
> 
> * [.when()][ref-tab.when]  
>   :thought_balloon:
>
> #### [Tab Prototype Methods][ref-tab-prototype-methods]
> * [**.cancel()**][ref-tab.prototype.cancel]  
>   :thought_balloon:
>
> * [**.catch()**][ref-tab.prototype.catch] :construction:  
>   process error notifications for this tab.
>
> * [**.count()**][ref-tab.prototype.count]  
>   :thought_balloon:
>
> * [**.defer()**][ref-tab.prototype.defer] :construction:  
>   create a function that uses this tab to store its result.
>
> * [**.deferWith()**][ref-tab.prototype.defer-with]  
>   :thought_balloon:
>
> * [**.delegate()**][ref-tab.prototype.delegate]  
>   :eyeglasses:
>
> * [**.do()**][ref-tab.prototype.do] :construction:  
>   create an notification processing scope for this tab.
>
> * [**.end()**][ref-tab.prototype.end]  
>   :thought_balloon:
>
> * [**.evaluate()**][ref-tab.prototype.evaluate]  
>   :thought_balloon:
>
> * [**.eventually()**][ref-tab.prototype.eventually] :construction:  
>   filter out progress notifications for this tab.
>
> * [**.finally()**][ref-tab.prototype.finally]:construction:  
>   process value and error notifications for this tab.
>
> * [**.fulfill()**][ref-tab.prototype.fulfill] :construction:  
>   settle this tab with a value.
>
> * [**.hasDelegated()**][ref-tab.prototype.has-delegated]  
>   :thought_balloon:
>
> * [**.hasError()**][ref-tab.prototype.has-error] :construction:  
>   has this tab an error?
>
> * [**.hasSettled()**][ref-tab.prototype.has-settled] :construction:  
>   has this tab settled?
>
> * [**.hasValue()**][ref-tab.prototype.has-value] :construction:  
>   has this tab a value?
>
> * [**.raise()**][ref-tab.prototype.raise]  
>   :thought_balloon:
>
> * [**.reject()**][ref-tab.prototype.reject] :construction:  
>   settle this tab with an error.
>
> * [**.settle()**][ref-tab.prototype.settle] :construction:  
>   settle this tab without changing its current value or error.
>
> * [**.then()**][ref-tab.prototype.then]  
>   :thought_balloon:
>
> * [**.throw()**][ref-tab.prototype.throw] :construction:  
>   set an error for this tab.
>
> * [**.toString()**][ref-tab.prototype.to-string] :construction:  
>   get a string representation for this tab.
>
> * [**.try()**][ref-tab.prototype.try] :construction:  
>   process value notifications for this tab.
>
> * [**.undelegate()**][ref-tab.prototype.undelegate]  
>   :thought_balloon:
>
> * [**.update()**][ref-tab.prototype.update] :construction:  
>   set a value for this tab.
>
> * [**.valueOf()**][ref-tab.prototype.value-of] :construction:  
>   get the principal value of this tab.
>
> * [**.wrap()**][ref-tab.prototype.wrap]  
>   :thought_balloon:
>
> #### [Tab Instance Methods][ref-tab-instance-methods]
> * [**._delegate()**][ref-tab._delegate]  
>   :thought_balloon:
>
> * [**._hasDelegated()**][ref-tab._has-delegated]  
>   :thought_balloon:
>
> * [**._trap()**][ref-tab._trap]  
>   :thought_balloon:
>
> * [**._undelegate()**][ref-tab._undelegate]  
>   :thought_balloon:
>



<br /> Back to [Top] | [Topics] | [Reference] <br />





[top]:       #top                        "back to the top of this page"
[topics]:    /doc/topics.md#topics       "back to the 'Topics' section"
[reference]: #reference                  "back to the 'Reference' section"

[ref-tab-object]:                  #tab-object                                       "more attributes and methods under 'Tab Object'"
[ref-tab-constructor]:             #tab-constructor                                  "more attributes and methods under 'Tab Constructor'"
[ref-tab-constructor-attributes]:  #tab-constructor-attributes                       "more attributes under 'Tab Constructor Attributes'"
[ref-tab-constructor-methods]:     #tab-constructor-methods                          "more methods under 'Tab Constructor Methods'"
[ref-tab-prototype-methods]:       #tab-prototype-methods                            "more methods under 'Tab Prototype Methods'"
[ref-tab-instance-methods]:        #tab-instance-methods                             "more methods under 'Tab Instance Methods'"

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
[ref-tab.prototype.defer]:         /doc/reference/tab.prototype.defer.md#top         "Tab.prototype.defer(): create a function that uses this tab to store its result."
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

