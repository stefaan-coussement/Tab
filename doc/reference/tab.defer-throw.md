<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [Tab.prototype.deferThrow()][ref-tab.defer-throw]

Create a function that puts a given tab in the failed state.

<br />

---
### Tab.deferThrow( target ) » newFunction

core principle:

````
Tab.deferThrow(target).call(subject, ...arguments)
~
target.throw(...arguments);
````

<br />

---
### Concepts

The following illustrates the main concepts.  The actual implementation may be slightly different to be usable on a broad range of platforms and to optimize performance.

````javascript
function deferThrow(target) {
    var target = Tab(target);

    return Tab.Ext.defer({ target: target }, Tab.prototype.throw.bind(target));
}
````

<br />

---
### Other methods in this family

*   [Tab.capture()][ref-tab.capture]
*   [Tab.captureWith()][ref-tab.capture-with]
*   [Tab.defer()][ref-tab.defer]
*   [Tab.deferReturn()][ref-tab.defer-return]
*   [Tab.trace()][ref-tab.trace]
<br />
*   [Tab.Ext.defer()][ref-tab.ext.defer]



<br /> Back to [Top] | [Project] | [Topics] | [Reference] / [Tab Prototype Methods][ref-tab-prototype-methods] <br />
