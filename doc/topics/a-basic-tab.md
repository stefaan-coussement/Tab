<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [A Basic Tap][topic-a-basic-tab]

````javascript
var id, interval = 0,
    counter = new Tab();

id = setInterval(function () {
    try {
        interval += 1;
        counter.return(interval);
    }
    catch (e) {
        counter.throw(e);
    }  
}, 1000);

counter
.try(function (value) {
    if (value <= 3600) {
        console.log(value % 2 === 1 ? "tick" : "tock"); 
    }
    if (value === 3600) {
        clearInterval(id);
        console.log("cuckoo");
    }
})
.catch(function (error) {
    console.log(error);
});
````

In this example:

* [new Tab()][ref-new-tab] creates a new Tab object.    Alternatively, we can also use [Tab.construct()][ref-tab.construct].
* [counter.return()][ref-tab.prototype.return] updates `counter` with a new value and notifies all its subscribers. 
* [counter.throw()][ref-tab.prototype.throw] sets `counter` to the failed state (this is probably not going to be necessary in this very simple example) and notifies all its subscribers.
* [.try( onReturnedProcessor )][ref-tab.prototype.try] subscribes to all notifications from `counter` and creates a new Tab object for further processing.  When an 'returned' notification is received, the processor function is executed.  When a 'thrown' notification is received, the notification is passed on to all subscribers of the new tab created by this method.   
* [.catch( onThrownProcessor )][ref-tab.prototype.catch] subscribes to all notifications from the tab created by `.try()`.  When a 'throw' notification is received, the processor function is executed.

If we receive an object from some other piece of code, and we don't know if that object is a Tab object or not then we may want to test if it is a Tab.

````javascript
function log(object) {
    if (Tab.isTab(object)) {
        object
        .try(function (value) {
            console.log("object = " + JSON.stringify(value));
        })
        .catch(function (error) {
            console.log("error for 'object' = " + JSON.stringify(error));
        });
    }
    else {
        console.log("object = " + JSON.stringify(object));
    }
}
````

In this example:

* [Tab.isTab()][ref-tab.is-tab] returns `true` when `object` was created with the `new Tab()` constructor.

Alternatively, we can also make our life easier by converting the object to a tab.

````javascript
function log(object) {
    Tab(object)
    .try(function (value) {
        console.log("object = " + JSON.stringify(value));
    })
    .catch(function (error) {
        console.log("error for 'object' = " + JSON.stringify(error));
    });
}
````

In this example:

* [Tab()][ref-tab] returns the original `object` if it is a Tab object, otherwise a new tab is created and its value is set to `object`.  Alternatively, we can also use [Tab.convert()][ref-tab.convert].

However, we can even do better in this very simple example.

````javascript
function log(object) {
    try {
        console.log("object = " + JSON.stringify(object.valueOf()));
    }
    catch (error) {
        console.log("error for 'object' = " + JSON.stringify(error));
    }
}
````

In this example:

* [object.valueOf()][ref-tab.prototype.value-of] returns the value of `object`, no matter if it's a Tab object or not, otherwise if `object` is a Tab object in the failed state then its error is thrown.

There are a lot of javascript methods that will implicitly call this `.valueOf()` method.  Try the following.

````javascript
var i = Tab.newReturn(1);

log(i + 1); // > 2
````

In this example:

* [Tab.newReturn( 1 )][ref-tab.new-return] returns a new Tab object and is getting the value 1.  This is a *sugar* method for `Tab.construct.return( 1 )`.
* when `i` is accessed to add 1, `.valueOf()` is applied by the addition operator.  This is true for some javascript methods, but not for all.  For instance `console.log` will log the object without applying the `.valueOf()` method.  So when in doubt... and you don't have time to read (and understand) the ECMA specification, and you don't have time to experiment with lots of different browsers, then it's probably best to apply it explicitly.

Beware that the following will fail.

````javascript
var i = Tab.newReturn(1);

log(++i); // throws
````

Supporting this would need the *Proxy* object that is on the program for *ES.next*.  We may try to implement some experimental version at some point in time.  So watch this space.

<br />

---
### Methods introduced in this topic (and some related methods)

* [new Tab()][ref-new-tab]  
* [Tab()][ref-tab]  
<br />
* [Tab.construct()][ref-tab.construct]  
* [Tab.convert()][ref-tab.convert]  
* [Tab.isTab()][ref-tab.is-tab]  
* [Tab.newReturn()][ref-tab.new-return]  
* [Tab.newThrow()][ref-tab.new-throw]  
<br />
* [.catch()][ref-tab.prototype.catch]  
* [.finally()][ref-tab.prototype.finally]  
* [.hasReturned()][ref-tab.prototype.has-returned]  
* [.hasThrown()][ref-tab.prototype.has-thrown]  
* [.return()][ref-tab.prototype.return]  
* [.throw()][ref-tab.prototype.throw]  
* [.toString()][ref-tab.prototype.to-string]  
* [.try()][ref-tab.prototype.try]  
* [.valueOf()][ref-tab.prototype.value-of]  



<br /> Back to [Top] | [Project] | [Topics] / [The Basics][topic-the-basics] | [Reference] <br />
