<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [Tab.defer()][ref-tab.defer]

Create a function that uses this tab to store another function's result.

<br />

---
### Tab.defer( target ) » newFunction

core principle:

````
Tab.defer(target).call(subject, ...arguments) 
~ 
target.return(...arguments)
````
    
<img class="emoji" title=":bulb:" alt=":bulb:" src="https://github.global.ssl.fastly.net/images/icons/emoji/bulb.png" height="20" width="20" align="left" style="float:left; margin-top:5px;"><img src="../img/1x1.png" align="left" style="float:left;" height="10" width="5" />

````
Tab.defer(target) ~ Tab.deferReturn(target)
````

### Tab.defer( target, processor ) » newFunction

core principle:

````
Tab.defer(target, processor).call(subject, ...arguments)
~
try {
    target.return(processor.call(subject, ...arguments));
}
catch (e) {
    target.throw(e);
}
````

<br />

---
### Concepts

The following illustrates the main concepts.  The actual implementation may be slightly different to be usable on a broad range of platforms and to optimize performance.

````javascript
function defer(processor) {
    var target = Tab(target);

    return Tab.Ext.defer({ target: target }, processor);
}
````

<br />

---
### Other methods in this family

*   [Tab.capture()][ref-tab.capture]
*   [Tab.captureWith()][ref-tab.capture-with]
*   [Tab.deferReturn()][ref-tab.defer-return]
*   [Tab.deferThrow()][ref-tab.defer-throw]
*   [Tab.trace()][ref-tab.trace]
<br />
*   [Tab.Ext.defer()][ref-tab.ext.defer]



<br /> Back to [Top] | [Project] | [Topics] | [Reference] / [Tab Prototype Methods][ref-tab-prototype-methods] <br />
