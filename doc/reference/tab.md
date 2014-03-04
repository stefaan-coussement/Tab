<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [Tab()][ref-tab]

Convert to a tab, create a new tab if required.

<br />

---
### Tab( object ) » convertedTab

<img class="emoji" title=":bulb:" alt=":bulb:" src="https://github.global.ssl.fastly.net/images/icons/emoji/bulb.png" height="20" width="20" align="left" style="float:left; margin-top:5px;"><img src="../img/1x1.png" align="left" style="float:left;" height="10" width="5" />

````
Tab(object) ~ Tab.convert(object)
````

core principle:

````javascript
if (Tab.isTab(object)) {
    return object;
}
else {
    return Tab.construct().return(object);
}
````

parameters:
*   **object** : *any*
    the object to convert

returns:
*   **covertedTab** : *[object Tab]*
    
    *   if the object is a Tab object, then returns the object.
    *   otherwise, returns a new Tab object and initialize its value with the given object.

        <img class="emoji" title=":bulb:" alt=":bulb:" src="https://github.global.ssl.fastly.net/images/icons/emoji/bulb.png" height="20" width="20" align="left" style="float:left; margin-top:5px;"><img src="../img/1x1.png" align="left" style="float:left;" height="10" width="5" />

        ````
        Tab(object) ~ Tab.newReturn(object)
        ````

<br />

---
### Other methods in this family

*   [new Tab()][ref-new-tab]
<br />
*   [Tab.construct()][ref-tab.construct]
*   [Tab.convert()][ref-tab.convert]
*   [Tab.isTab()][ref-tab.is-tab]



<br /> Back to [Top] | [Project] | [Topics] | [Reference] / [Tab Constructor][ref-tab-constructor] <br />
