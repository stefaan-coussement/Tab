<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [Tab.newThrow()][ref-tab.new-throw]

Create a new tab that is put in the failed state.

<br />

---
### Tab.newThrow( ?error, ...extraValues ) » newTab

<img class="emoji" title=":bulb:" alt=":bulb:" src="https://github.global.ssl.fastly.net/images/icons/emoji/bulb.png" height="20" width="20" align="left" style="float:left; margin-top:5px;"><img src="../img/1x1.png" align="left" style="float:left;" height="10" width="5" />

````
Tab.newThrow(error, ...extraValues) ~ Tab.construct().throw(error, ...extraValues)
````

parameters:
*   **error** : *any*
    the error to throw for the new tab.

*   **...extraValues** : *...any*
    extra information to store in the new tab.

returns:
*   **newTab** : *[object Tab]*
    a newly constructed Tab object, initialized with the given error and extra values.

<br />

---
### Other methods in this family

*   [new Tab()][ref-new-tab]
<br />
*   [Tab.construct()][ref-tab.construct]
*   [Tab.newFulfill()][ref-tab.new-fulfill]
*   [Tab.newReject()][ref-tab.new-reject]
*   [Tab.newReturn()][ref-tab.new-return]
*   [Tab.newSettle()][ref-tab.new-settle]
<br />
*   [.hasThrown()][ref-tab.prototype.has-thrown]
*   [.onThrown()][ref-tab.prototype.on-thrown]
*   [.throw()][ref-tab.prototype.throw]



<br /> Back to [Top] | [Project] | [Topics] | [Reference] / [Tab Constructor Methods][ref-tab-constructor-methods] <br />
