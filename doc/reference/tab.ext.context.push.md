<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [Tab.Ext.context.push()][ref-tab.ext.context.push]

The basic method to create a new execution context.

<br />

---
### Tab.Ext.context.push( ?contextProperties ) » newContext

<br />

---
### Concepts

The following illustrates the main concepts.  The actual implementation may be slightly different to be usable on a broad range of platforms and to optimize performance.

````javascript
function push(contextProperties) {
    var old = Tab._context,
        new = Object.create(old);

    Object.keys(contextProperties).forEach(function (key) {
        Object.defineProperty(new, key, {
            value: contextProperties[key],
            enumerable: true
        });
    });

    Object.defineProperty(new, "context", {
        get: function () {
            return old;
        }
    });
    Tab._context = new;

    return Tab._context;
}
````

<br />

---
### Other attributes and methods in this family

*   [Tab.context][ref-tab.context]
<br />
*   [Tab.Ext.context.pop()][ref-tab.ext.context.pop]



<br /> Back to [Top] | [Project] | [Topics] | [Reference] / [Tab.Ext Methods][ref-tab.ext-methods] <br />
