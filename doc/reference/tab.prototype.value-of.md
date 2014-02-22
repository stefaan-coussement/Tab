<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [Tab.prototype.valueOf()][ref-tab.prototype.value-of]

Get the principal value of this tab.

<br />

---
### tab.valueOf() » value

<br />

---
### Concepts

The following illustrates the main concepts.  The actual implementation may be slightly different to be usable on a broad range of platforms and to optimize performance.

````javascript
function valueOf() {
    if (this.isTab()) {
        if (this._thrown) {
            throw this._values[0];
        }
        else {
            return this._values[0];
        }
    }
    else {
        // not a tab
        return this.valueOf();
    }
}
````

<br />

---

Other methods in this family:
*   [Tab.isTab()][ref-tab.is-tab]
*   [.toString()][ref-tab.prototype.to-string]



<br /> Back to [Top] | [Project] | [Topics] | [Reference] / [Tab Prototype Methods][ref-tab-prototype-methods] <br />
