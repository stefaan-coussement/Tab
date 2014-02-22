<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [Tab.prototype.toString()][ref-tab.prototype.to-string]

Get a string representation for this tab.

<br />

---
### tab.toString() » stringValue

<br />

---
### Concepts

The following illustrates the main concepts.  The actual implementation may be slightly different to be usable on a broad range of platforms and to optimize performance.

````javascript
function toString() {
    if (this instanceof Tab) {
        return "[object Tab]";
    }
    else {
        // not a tab
        return this.toString();
    }
}
````

<br />

---

Other methods in this family:
*   [.valueOf()][ref-tab.prototype.value-of]



<br /> Back to [Top] | [Project] | [Topics] | [Reference] / [Tab Prototype Methods][ref-tab-prototype-methods] <br />
