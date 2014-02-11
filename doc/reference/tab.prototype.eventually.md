<a name="top" ></a>

<img src="../img/tab-logo66.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [Tab.prototype.eventually()][ref-tab.prototype.eventually]

Filter out progress notifications for this tab.

---
### .eventually() : newSettlingTab

effect:
*   ignores all received *progress*-notifications.
*   forwards all received *settled*-notifications to *newSettlingTab*.

returns: 
*   *newSettlingTab*: the tab that receives the forwarded notifications.

example:
~~~~javascript
var id, interval = 0,
    timer = new Tab();

id = setTimeout(timer.defer(Tab.prototype.fulfill), 3600000);

timer
.eventually()
    .try(function () {
        console.log("cuckoo");
    });
~~~~

<br />

---
### .eventually( scopingFunction ) : newSettlingTab

effect:
*   ignores all received *progress*-notifications.
*   forwards all received *settled*-notifications its subscribers.

    <img class="emoji" title=":bulb:" alt=":bulb:" src="https://github.global.ssl.fastly.net/images/icons/emoji/bulb.png" height="20" width="20" align="left" style="float:left; margin-top:5px;"><img src="../img/1x1.png" align="left" style="float:left;" height="10" width="5" />
    ~~~~
    if (there are subscribing methods in scopingFunction) {
        forwards all received notifications to these subscribing methods.
    }
    else { // there no are subscribing methods in scopingFunction
        forwards all received notifications to newSettlingTab.
    }
    ~~~~

arguments:
*   *function scopingFunction( targetTab, sourceTab, parentTab ) : undefined* or *principalValue*

    > subject:
    > *   the tab that receives the forwarded or dispatched notifications.
    >
    >     <img class="emoji" title=":bulb:" alt=":bulb:" src="https://github.global.ssl.fastly.net/images/icons/emoji/bulb.png" height="20" width="20" align="left" style="float:left; margin-top:5px;"><img src="../img/1x1.png" align="left" style="float:left;" height="10" width="5" />
    >     ~~~~
    >     this === newSettlingTab
    >     ~~~~
    >
    > arguments: 
    > *   *targetTab*: the tab that receives the forwarded or dispatched notifications.
    >
    >     <img class="emoji" title=":bulb:" alt=":bulb:" src="https://github.global.ssl.fastly.net/images/icons/emoji/bulb.png" height="20" width="20" align="left" style="float:left; margin-top:5px;"><img src="../img/1x1.png" align="left" style="float:left;" height="10" width="5" />
    >     ~~~~
    >     targetTab === newSettlingTab
    >     ~~~~
    >
    > *   *sourceTab*: the tab that forwards or dispatches the received notifications.
    >
    > *   *parentTab*: the subject of the call to `.eventually()`.
    >
    >     <img class="emoji" title=":bulb:" alt=":bulb:" src="https://github.global.ssl.fastly.net/images/icons/emoji/bulb.png" height="20" width="20" align="left" style="float:left; margin-top:5px;"><img src="../img/1x1.png" align="left" style="float:left;" height="10" width="5" />
    >     ~~~~
    >     if (parentTab is a single tab) {
    >         sourceTab === parentTab
    >     }
    >     else { // if parentTab is a collection of tabs:
    >         sourceTab in parentTab
    >     }
    >     ~~~~
    >
    > returns: 
    > *   *undefined*: when leaving *targetTab* unfulfilled.
    > *   *principalValue*: when fulfilling *targetTab*.

returns: 
*   *newSettlingTab*: the tab that receives the forwarded or dispatched notifications.

:construction: example:
~~~~javascript
var id, interval = 0,
    counter = new Tab();

id = setInterval(counter.defer(Tab.prototype.update), 1000);

counter
.do(function (source, target) {
    source.try(function () {
        interval += 1;
        if (interval <= 3600) {
            console.log(interval % 2 === 1 ? "tick" : "tock");
        }
        if (value === 3600) {
            clearInterval(id);
            target.fulfill();
        }
    });
})
.eventually(function (source) {
    source.try(function () {
        console.log("cuckoo");
    });
});
~~~~



<br /> Back to [Top] | [Topics] | [Reference] / [Tab Prototype Methods][ref-tab-prototype-methods] <br />





[top]:       #top                        "back to the top of this page"
[topics]:    /doc/topics.md#topics       "back to the 'Topics' section"
[reference]: /doc/reference.md#reference "back to the 'Reference' section"



[ref-tab-object]:                  /doc/reference.md#tab-object                      "more attributes and methods under 'Tab Object'"
[ref-tab-prototype-methods]:       /doc/reference.md#tab-prototype-methods           "more methods under 'Tab Prototype Methods'"
[ref-tab.prototype.eventually]:    /doc/reference/tab.prototype.eventually.md#top    "Tab.prototype.eventually(): filter out progress notifications for this tab."
