<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [Tab.Ext.context.pop()][ref-tab.ext.context.pop]

The basic method to re-instate the previous execution context.

<br />

---
### Tab.Ext.context.pop() » context

<br />

---
### Concepts

The following illustrates the main concepts.  The actual implementation may be slightly different to be usable on a broad range of platforms and to optimize performance.

````javascript
function pop() {
    Tab._context = Tab._context.parent;
    return Tab._context;
}
````

<br />

---
### Other attributes and methods in this family

*   [Tab.context][ref-tab.context]
<br />
*   [Tab.Ext.context.push()][ref-tab.ext.context.push]



<br /> Back to [Top] | [Project] | [Topics] | [Reference] / [Tab.Ext Methods][ref-tab.ext-methods] <br />
