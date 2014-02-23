<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [Tab.prototype.capture()][ref-tab.capture]

Create a function that uses this tab to store another function's arguments, and then executes the other function.

<br />

---
### Tab.capture( target ) » newFunction

core principle:

````
Tab.capture(target).call(subject, ...arguments)
~
target.return(...arguments);
````
    
<img class="emoji" title=":bulb:" alt=":bulb:" src="https://github.global.ssl.fastly.net/images/icons/emoji/bulb.png" height="20" width="20" align="left" style="float:left; margin-top:5px;"><img src="../img/1x1.png" align="left" style="float:left;" height="10" width="5" />

````
Tab.capture(target) ~ Tab.deferReturn(target)
````

### Tab.capture( target, processor ) » newFunction

core principle:

````
Tab.capture(target, processor).call(subject, ...arguments)
~
target.return(...arguments);
processor.call(subject, ...arguments);
````

<br />

---
### Concepts

The following illustrates the main concepts.  The actual implementation may be slightly different to be usable on a broad range of platforms and to optimize performance.

````javascript
function capture(target, processor) {
    var target = Tab(target),
        captor, deferred;

    captor = Tab.Ext.defer({ target: target });

    if (processor) {
       deferred = function () {
           captor(...arguments);
           return processor.call(this, ...arguments);
       }

       // ensure deferred can be used as 'new' constructor 
       deferred.prototype = Object.create(processor.prototype);
       deferred.prototype.constructor = deferred;
    }
    else {
       deferred = captor;
    }

    return deferred;
}
````

<br />

---
### Other methods in this family

*   [Tab.captureWith()][ref-tab.capture-with]
*   [Tab.defer()][ref-tab.defer]
*   [Tab.deferReturn()][ref-tab.defer-return]
*   [Tab.deferThrow()][ref-tab.defer-throw]
*   [Tab.trace()][ref-tab.trace]
<br />
*   [Tab.Ext.defer()][ref-tab.ext.defer]



<br /> Back to [Top] | [Project] | [Topics] | [Reference] / [Tab Constructor Methods][ref-tab-constructor-methods] <br />
