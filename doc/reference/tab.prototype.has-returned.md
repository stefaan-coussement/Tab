<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [Tab.prototype.hasReturned()][ref-tab.prototype.has-returned]

Has this tab an update value?

<br />

---
### tab.hasReturned() » booleanValue

core principle:

````javascript
Tab.construct().hasReturned() === false
tab.return().hasReturned() === true
tab.throw().hasReturned() === false
````

returns:
*   **booleanValue** : *boolean*  
    
    *   if this tab has previously been updated, then returns `true`.
    *   otherwise, returns `false`.

<br />

---
### Other methods in this family

*   [Tab.newReturn()][ref-tab.new-return]
<br />
*   [.hasThrown()][ref-tab.prototype.has-thrown]
*   [.isCancelled()][ref-tab.prototype.is-cancelled]
*   [.isSettled()][ref-tab.prototype.is-settled]
*   [.onReturned()][ref-tab.prototype.on-returned]
*   [.return()][ref-tab.prototype.return]



<br /> Back to [Top] | [Project] | [Topics] | [Reference] / [Tab Prototype Methods][ref-tab-prototype-methods] <br />
