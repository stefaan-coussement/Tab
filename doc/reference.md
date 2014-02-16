<a name="top" ></a>

<img src="./img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-8px;" height="87" /><img src="./img/1x1.png" align="left" style="float:left;" height="79" width="20" />
# [Tab][top]
Get help with callbacks, promises, pipelines, lazy evaluation and concurrent computing.
<br />

## [Reference]

### [Tab Object][ref-tab-object]
> 
> #### [Tab Constructor][ref-tab-constructor]
> 
>   * [new Tab()][ref-new-tab]  
>     construct a new tab, encapsulate a given tab if requested.
>   * [Tab()][ref-tab]  
>     convert to a tab, create a new tab if required.
>   
> 
> #### [Tab Constructor Attributes][ref-tab-constructor-attributes]
> 
>   * [Tab.version][ref-tab.version]  
>     the version of this Tab library.
>   
> 
> #### [Tab Constructor Methods][ref-tab-constructor-methods]
> 
>   * [Tab.construct()][ref-tab.construct]  
>     construct a new tab, encapsulate a given tab if requested.
>   * [Tab.convert()][ref-tab.convert]  
>     convert to a tab, create a new tab if required.
>   * [Tab.isTab()][ref-tab.is-tab]  
>     was the given object created by this Tab constructor?
>   * [Tab.return()][ref-tab.return]  
>     construct a new tab an set its value.
>   * [Tab.throw()][ref-tab.throw]  
>     construct a new tab and put it in the failed state.
>   
> 
> #### [Tab Prototype Methods][ref-tab-prototype-methods]
> 
>   * [.catch()][ref-tab.prototype.catch]  
>     process 'thrown' notifications for this tab and create a new tab with the result.
>   * [.finally()][ref-tab.prototype.finally]  
>     process 'returned' and 'thrown' notifications for this tab and create a new tab with the result.
>   * [.hasThrown()][ref-tab.prototype.has-thrown]  
>     has this tab thrown an error?
>   * [.return()][ref-tab.prototype.return]  
>     update the value of this tab.
>   * [.throw()][ref-tab.prototype.throw]  
>     put this tab in the failed state.
>   * [.toString()][ref-tab.prototype.to-string]  
>     get a string representation for this tab.
>   * [.try()][ref-tab.prototype.try]  
>     process 'returned' notifications for this tab and create a new tab with the result.
>   * [.valueOf()][ref-tab.prototype.value-of]  
>     get the principal value of this tab.
>   
>
> #### [Other Elements][ref-other-elements]
> 
>   * [The Javascript Object][ref-the-javascript-object]  
>     the structure of the javascript object.
>   
> 



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
