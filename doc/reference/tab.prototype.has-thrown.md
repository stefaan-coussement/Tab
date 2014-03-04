<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [Tab.prototype.hasThrown()][ref-tab.prototype.has-thrown]

Has this tab thrown an error?

<br />

---
### tab.hasThrown() » booleanValue

core principle:

````javascript
Tab.construct().hasThrown() === false
tab.return().hasThrown() === false
tab.throw().hasThrown() === true
````

returns:
*   **booleanValue** : *boolean*  
    
    *   if this tab has previously thrown an error, then returns `true`.
    *   otherwise, returns `false`.

<br />

---
### Other methods in this family

*   [Tab.newThrow()][ref-tab.new-throw]
<br />
*   [.hasReturned()][ref-tab.prototype.has-returned]
*   [.isCancelled()][ref-tab.prototype.is-cancelled]
*   [.isSettled()][ref-tab.prototype.is-settled]
*   [.onThrown()][ref-tab.prototype.on-thrown]
*   [.throw()][ref-tab.prototype.throw]



<br /> Back to [Top] | [Project] | [Topics] | [Reference] / [Tab Prototype Methods][ref-tab-prototype-methods] <br />
