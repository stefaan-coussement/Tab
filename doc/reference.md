<a name="top" ></a>

<img src="./img/tab-logo128.png" alt="Tab logo" align="left" style="float:left;" /><img src="./img/1x1.png" align="left" style="float:left;" height="128" width="20" /><img src="./img/1x1.png" height="1" width="20" style="margin-top:35px;" />
# [Tab][top]
A javascript object to help with callbacks, promises, lazy evaluation and concurrent computing.
<br />

## [Reference]

### [Tab Object][ref-tab-object]
> 
> #### [Tab Constructor][ref-tab-constructor]
> * [new Tab()][ref-new-tab]  
>   Create a new tab.
>   
> * [Tab()][ref-tab]  
>   Convert to a tab, create a new tab if required.
> 
> #### [Tab Constructor Attributes][ref-tab-constructor-attributes]
> * :thought_balloon: [ .context][ref-tab.context]  
>   ...
>   
> * [.version][ref-tab.version]  
>   Version of this Tab library.
>
> #### [Tab Constructor Methods][ref-tab-constructor-methods]
> * [.eventually()][ref-tab.eventually]  
>   Filter out progress notifications for a given tab.
> 
> * [.isSettlingTab()][ref-tab.is-settling-tab]  
>   Are progress notifications being filtered out for a given tab?
> 
> * [.isTab()][ref-tab.is-tab]  
>   Was the given object created by this Tab library?
> 
> * :thought_balloon: [ .likeTab()][ref-tab.like-tab]  
>   ...
> 
> * :thought_balloon: [ .tabify()][ref-tab.tabify]  
>   ...
> 
> * :thought_balloon: [ .tabifyWith()][ref-tab.tabify-with]  
>   ...
> 
> * :thought_balloon: [ .untabify()][ref-tab.untabify]  
>   ...
> 
> * :thought_balloon: [ .untabifyWith()][ref-tab.untabify-with]  
>   ...
> 
> * :thought_balloon: [ .when()][ref-tab.when]  
>   ...
>
> #### [Tab Prototype Methods][ref-tab-prototype-methods]
> * :thought_balloon: [ .cancel()][ref-tab.prototype.cancel]  
>   ...
>
> * [.catch()][ref-tab.prototype.catch]  
>   Process error notifications for this tab.
>
> * :thought_balloon: [ .count()][ref-tab.prototype.count]  
>   ...
>
> * [.defer()][ref-tab.prototype.defer]  
>   Create a function that uses this tab to store its result.
>
> * :thought_balloon: [ .deferWith()][ref-tab.prototype.defer-with]  
>   ...
>
> * :eyeglasses: [ .delegate()][ref-tab.prototype.delegate]  
>   ...
>
> * [.do()][ref-tab.prototype.do]  
>   Create an notification processing scope for this tab.
>
> * :thought_balloon: [ .end()][ref-tab.prototype.end]  
>   ...
>
> * :thought_balloon: [ .evaluate()][ref-tab.prototype.evaluate]  
>   ...
>
> * [.eventually()][ref-tab.prototype.eventually]  
>   Filter out progress notifications for this tab.
>
> * [.finally()][ref-tab.prototype.finally]  
>   Process value and error notifications for this tab.
>
> * [.fulfill()][ref-tab.prototype.fulfill]  
>   Settle this tab with a value.
>
> * :thought_balloon: [ .hasDelegated()][ref-tab.prototype.has-delegated]  
>   ...
>
> * [.hasError()][ref-tab.prototype.has-error]  
>   Has this tab an error?
>
> * [.hasSettled()][ref-tab.prototype.has-settled]  
>   Has this tab settled?
>
> * [.hasValue()][ref-tab.prototype.has-value]  
>   Has this tab a value?
>
> * :thought_balloon: [ .raise()][ref-tab.prototype.raise]  
>   ...
>
> * [.reject()][ref-tab.prototype.reject]  
>   Settle this tab with an error.
>
> * [.settle()][ref-tab.prototype.settle]  
>   Settle this tab without changing its current value or error.
>
> * :thought_balloon: [ .then()][ref-tab.prototype.then]  
>   ...
>
> * [.throw()][ref-tab.prototype.throw]  
>   Set an error for this tab.
>
> * [.toString()][ref-tab.prototype.to-string]  
>   Get a string representation for this tab.
>
> * [.try()][ref-tab.prototype.try]  
>   Process value notifications for this tab.
>
> * :thought_balloon: [ .undelegate()][ref-tab.prototype.undelegate]  
>   ...
>
> * [.update()][ref-tab.prototype.update]  
>   Set a value for this tab
>
> * [.valueOf()][ref-tab.prototype.value-of]  
>   Get the principal value of this tab.
>
> * :thought_balloon: [ .wrap()][ref-tab.prototype.wrap]  
>   ...
>
> #### [Tab Instance Methods][ref-tab-instance-methods]
> * :thought_balloon: [ ._delegate()][ref-tab._delegate]  
>   ...
>
> * :thought_balloon: [ ._hasDelegated()][ref-tab._has-delegated]  
>   ...
>
> * :thought_balloon: [ ._trap()][ref-tab._trap]  
>   ...
>
> * :thought_balloon: [ ._undelegate()][ref-tab._undelegate]  
>   ...
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

