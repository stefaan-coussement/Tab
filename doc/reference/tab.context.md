<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [Tab.context][ref-tab.context]

The execution context for a processor function.

<br />

---
### Tab.context : [object Object], read-only

core principle:

`Tab.context` always has at least a property "target" - the tab that will receive the traditionally returned values or traditionally thrown errors.

````
Tab.defer(target, function () {
  return value;
}).call();
~
Tab.defer(target, function () {
  Tab.context.target.return(value);
}).call();
~
target.return(value);
````

````
Tab.defer(target, function () {
  throw error;
}).call();
~
Tab.defer(target, function () {
  Tab.context.target.throw(error);
}).call();
~
target.throw(error);
````

When used outside a processor function, the *target* tab is used as a catch-all for otherwise unhandled but *raised* errors.

````
Tab.newThrow(error)
.raise();
~
Tab.context.target.throw(error);
````

<br />

---
### Other methods in this family

*   [Tab.capture()][ref-tab.capture]
*   [Tab.captureWith()][ref-tab.capture-with]
*   [Tab.defer()][ref-tab.defer]
*   [Tab.trace()][ref-tab.trace]
<br />
*   [Tab.prototype.catch()][ref-tab.prototype.catch]
*   [Tab.prototype.finally()][ref-tab.prototype.finally]
*   [Tab.prototype.raise()][ref-tab.prototype.raise]
*   [Tab.prototype.try()][ref-tab.prototype.try]
<br />
*   [Tab.Ext.context.pop()][ref-tab.ext.context.pop]
*   [Tab.Ext.context.push()][ref-tab.ext.context.push]



<br /> Back to [Top] | [Project] | [Topics] | [Reference] / [Tab Constructor Attributes][ref-tab-constructor-attributes] <br />
