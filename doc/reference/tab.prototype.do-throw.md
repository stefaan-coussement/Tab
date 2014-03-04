<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [Tab.prototype.doThrow()][ref-tab.prototype.do-throw]

Put this tab in the failed state (for ES3 environments).

<br />

---
### tab.doThrow( ?error, ...extraValues ) » tab

<img class="emoji" title=":bulb:" alt=":bulb:" src="https://github.global.ssl.fastly.net/images/icons/emoji/bulb.png" height="20" width="20" align="left" style="float:left; margin-top:5px;"><img src="../img/1x1.png" align="left" style="float:left;" height="10" width="5" />

````
tab.doThrow(error) ~ tab.throw(error)
````

parameters:
*   **error** : *any*
    the error to throw for the new tab.

*   **...extraValues** : *...any*
    extra information to store in this tab.

returns:
*   **tab** : *[object Tab]*
    this tab, updated with the given error and extra values.

<br />

---
### Other methods in this family

*   [Tab.newThrow()][ref-tab.new-throw]
<br />
*   [.cancel()][ref-tab.prototype.cancel]
*   [.doReturn()][ref-tab.prototype.do-return]
*   [.fulfill()][ref-tab.prototype.fulfill]
*   [.hasThrown()][ref-tab.prototype.has-thrown]
*   [.onThrown()][ref-tab.prototype.on-thrown]
*   [.reject()][ref-tab.prototype.reject]
*   [.return()][ref-tab.prototype.return]
*   [.settle()][ref-tab.prototype.settle]
*   [.throw()][ref-tab.prototype.throw]



<br /> Back to [Top] | [Project] | [Topics] | [Reference] / [Tab Prototype Methods][ref-tab-prototype-methods] <br />
