<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [Tab.trace()][ref-tab.trace]

Create a function that uses this tab to store another function's subject, arguments, and result.

<br />

---
### Tab.trace( target, ?message = "" ) » newFunction

core principle:

````
Tab.trace(target, message).call(subject, ...arguments)
~
try {
    target.return(message, subject, ...arguments, 
                  "returned", arguments[0]);
}
catch (e) {
    target.return(message, subject, ...arguments, 
                  "trown", e);
}
````

### Tab.trace( target, ?message = "", processor ) » newFunction

core principle:

````
Tab.trace(target, message, processor).call(subject, ...arguments)
~
try {
    target.return(message, subject, ...arguments, 
                  "returned", processor.call(subject, ...arguments));
}
catch (e) {
    target.return(message, subject, ...arguments, 
                  "trown", e);
}
````

<br />

---
### Concepts

The following illustrates the main concepts.  The actual implementation may be slightly different to be usable on a broad range of platforms and to optimize performance.

````javascript
function trace(message, processor) {
    var target = Tab(target),
        tracer;

    message = (message == null) ? "" : message;

    tracer = function () {
        try {
                target.return(message, subject, ...arguments, "returned", 
                    (processor) ? processor.call(subject, ...arguments) : 
                                  arguments[0]
                );
            }
            catch (e) {
                target.return(message, subject, ...arguments, "trown", e);
            }

            // avoid second notification on return
            target.defer();
        }
    };

    // ensure tracer can be used as 'new' constructor 
    tracer.prototype = Object.create(processor.prototype);
    tracer.prototype.constructor = tracer;

    return Tab.Ext.defer({ target: target }, tracer);
}
````

<br />

---
### Other methods in this family

*   [Tab.capture()][ref-tab.capture]
*   [Tab.captureWith()][ref-tab.capture-with]
*   [Tab.defer()][ref-tab.defer]
*   [Tab.deferReturn()][ref-tab.defer-return]
*   [Tab.deferThrow()][ref-tab.defer-throw]
<br />
*   [Tab.Ext.defer()][ref-tab.ext.defer]



<br /> Back to [Top] | [Project] | [Topics] | [Reference] / [Tab Constructor Methods][ref-tab-constructor-methods] <br />
