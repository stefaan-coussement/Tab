<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [Exception Style Error Propagation][topic-exception-style-error-propagation]

Error handling is rather cumbersome when using callbacks and is often forgotten (*nodeJS* APIs avoid this by specifying the error callbacks as the first argument in a function).


````javascript
// synchronous:

try {
    sendMessage(composeMessage(getAddress(name)));
    console.log(name + ": sent");
}
catch (error) {
    console.log(name + ": error");
}
````

````javascript
// asynchronous:

function onError(error) {
    console.log(name + ": error");
}

requestAddress(name, function (address) {
    composeMessage(address, function (message) {
        sendMessage(message, function () {
            console.log(name + ": sent");
        }, onError); 
    }, onError);
}, onError);
````

Tabs provide an elegant solution by automatically propagating the error through the chain of processing tabs until an error handler is found, similar to exceptions bubbling up the chain of synchronously calling functions until an exception-handler is found.

````javascript
// using nested tabs:

requestAddress(name)
.try(function (address) { 
    composeMessage(address)
    .try(function (message) {
        sendMessage(message)
        .try(function () {
            console.log(name + ": sent");
        })
        .raise();
    })
    .raise();
})
.catch(function (error) { 
    console.log(name + ": error");
});
````

You use the `.raise()` method to propagate the errors to `Tab.context.target`.  Inside the processor function of a processing method (such as `.try`), this is set to the new tab that was created by the processing method.

````javascript
// using pipelined tabs:

requestAddress(name)
.try(composeMessage)
.try(sendMessage)
.try(function () {
    console.log(name + ": sent");
})
.catch(function (error) {
    console.log(name + ": error");
});
````

The main difference between the traditional `catch` block and the Tab method `.catch()` is that the former will only catch errors thrown in the immediately preceding `try` block, while the latter will catch errors thrown in the preceding `.try()` method and every other method preceding that `.try()` method.

One of the biggest problems with asynchronous functions is that the exceptions thrown are not caught.  Some javascript engines will log a message, but there is no mechanism to catch them.

The Tabs library has a special tab exactly for that purpose.  As illustrated higher, you use the `.raise()` method to propagate the errors to `Tab.context.target`, the new tab that was created by the enclosing processing method.  Outside any enclosing processing method, this `Tab.context.target` is a catch-all tab that can be used to catch otherwise unhandled errors.

````javascript
// using pipelined tabs, leaving errors unhandled:

requestAddress(name)
.try(composeMessage)
.try(sendMessage)
.try(function () {
    console.log(name + ": sent");
})
.raise();

// catching unhandled errors

Tab.context.target
.catch(function (error) {
    console.log(name + ": error");
});
````

Remark that the error handler may be added somewhere else in the code, so it may not be there yet at the moment an error is thrown.  Hence, we need some indication that we don't expect any other part of the program to take care of this for us, we need to explicitly `.raise()` the unhandled errors.  



<br />

---
### Attributes and methods used in this topic

* [Tab.context][ref-tab.context]
<br />
* [.raise()][ref-tab.prototype.raise]
* [.try()][ref-tab.prototype.try]



<br /> Back to [Top] | [Project] | [Topics] / [Where Are Tabs Helping?][topic-where-are-tabs-helping] | [Reference] <br />
