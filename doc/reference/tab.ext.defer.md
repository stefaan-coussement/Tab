<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [Tab.Ext.defer()][ref-tab.ext.defer]

The basic method to create deferred functions.

<br />

---
### Tab.Ext.defer( executionContext ) » newFunction

### Tab.Ext.defer( executionContext, processor ) » newFunction

<br />

---
### Concepts

The following illustrates the main concepts.  The actual implementation may be slightly different to be usable on a broad range of platforms and to optimize performance.

````javascript
function defer(executionContext, processor) {
    var target = executionContext.target, 
        deferred, context;

    // set the _deferred flag in the outer context
    context = Tab.context;
    if (context._deferred === false) { //  not just falsy
        context._deferred = true;
    }

    // create deferred function
    if (processor) {
        deferred = function () {
            var result;

            if (target.isCancelled()) {
                try {
                    // prepare inner context
                    context = Tab.context.push(executionContext);
                    context._deferred = false;

                    // execute processor
                    result = processor.call(this, ...arguments);

                    // process result
                    if (context._deferred) {
                        target.return(result);
                    }

                    // preserve external behaviour of processor
                    return result;
                }
                catch (error) {
                    // process error
                    target.throw(error);

                    // preserve external behaviour of processor
                    throw error;
                }
                finally {
                    // cleanup inner context
                    Tab.context.pop()
                }
            }
        };

        // ensure deferred can be used as a 'new' constructor 
        deferred.prototype = Object.create(processor.prototype);
        deferred.prototype.constructor = deferred;
    }
    else {
        deferred = function () {
            if (target.isCancelled()) {
                // process immediate result
                target.return(...arguments);
            }
        };
    }

    return deferred;
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
*   [Tab.trace()][ref-tab.trace]



<br /> Back to [Top] | [Project] | [Topics] | [Reference] / [Tab.Ext Methods][ref-tab.ext-methods] <br />
