<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [Tab.newReturn()][ref-tab.new-return]

Create a new tab that is initialized with a given value.

<br />

---
### Tab.newReturn( ?value, ...extraValues ) » newTab

<img class="emoji" title=":bulb:" alt=":bulb:" src="https://github.global.ssl.fastly.net/images/icons/emoji/bulb.png" height="20" width="20" align="left" style="float:left; margin-top:5px;"><img src="../img/1x1.png" align="left" style="float:left;" height="10" width="5" />

````
Tab.newReturn(value, ...extraValues) ~ Tab.construct().return(value, ...extraValues)
````

parameters:
*   **value** : *any*  
    the principal value to store in the new tab.

*   **...extraValues** : *...any*  
    extra information to store in the new tab.

returns:
*   **newTab** : *[object Tab]*  
    a newly constructed Tab object, initialized with the given values.

<br />

---
### Other methods in this family

*   [new Tab()][ref-new-tab]
<br />
*   [Tab.construct()][ref-tab.construct]
*   [Tab.newFulfill()][ref-tab.new-fulfill]
*   [Tab.newReject()][ref-tab.new-reject]
*   [Tab.newSettle()][ref-tab.new-settle]
*   [Tab.newThrow()][ref-tab.new-throw]
<br />
*   [.hasReturned()][ref-tab.prototype.has-returned]
*   [.onReturned()][ref-tab.prototype.on-returned]
*   [.return()][ref-tab.prototype.return]



<br /> Back to [Top] | [Project] | [Topics] | [Reference] / [Tab Constructor Methods][ref-tab-constructor-methods] <br />
