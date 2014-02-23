<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [Tab.prototype.deferReturn()][ref-tab.defer-return]

Create a function that updates the value of a given tab.

<br />

---
### Tab.deferReturn( target ) » newFunction

core principle:

````
Tab.deferReturn(target).call(subject, ...arguments)
~
target.return(...arguments);
````

<br />

---
### Concepts

The following illustrates the main concepts.  The actual implementation may be slightly different to be usable on a broad range of platforms and to optimize performance.

````javascript
function deferReturn(target) {
    var target = Tab(target);

    return Tab.Ext.defer({ target: target });
}
````

<br />

---
### Other methods in this family

*   [Tab.capture()][ref-tab.capture]
*   [Tab.captureWith()][ref-tab.capture-with]
*   [Tab.defer()][ref-tab.defer]
*   [Tab.deferThrow()][ref-tab.defer-throw]
*   [Tab.trace()][ref-tab.trace]
<br />
*   [Tab.Ext.defer()][ref-tab.ext.defer]



<br /> Back to [Top] | [Project] | [Topics] | [Reference] / [Tab Constructor Methods][ref-tab-constructor-methods] <br />
