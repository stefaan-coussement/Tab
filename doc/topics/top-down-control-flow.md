<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [Top-Down Control Flow][topic-top-down-control-flow]

Both in the synchronous and asynchronous world, we often need to apply functions on the result of other functions.  This often leads to an inverted control-flow, where the function that is written first in your code first is executed last.

````javascript
// synchronous using nested functions: 

sendMessage(composeMessage(getAddress(name)));
console.log(name, ": sent");
````

````javascript
// asynchronous using nested functions: 

requestAddress(name, function (address) {
    composeMessage(address, function (message) {
        sendMessage(message, function () {
            console.log(name + ": sent");
        });
    });
});
````

This is typically avoided by introducing variables.

````javascript
// synchonous using a sequence of functions

var address, message;

address = getAddress(name);
message = composeMessage(address);
sendMessage(message);
console.log(name + ": sent");
````

````javascript
// asynchronous using a sequence of functions: 

var doComposeMessage, doSendMessage, doLogMessage;

setImmediate(function () {
    requestAddress(name, doComposeMessage);
});
doComposeMessage = function (address) {
    composeMessage(address, doSendMessage);
};
doSendMessage = function (message) {
    sendMessage(message, doLogMessage);
}
doLogMessage = function () {
    console.log(name + ": sent");
}
````

This may look a bit silly in our very simple asynchronous example, but this is a technique that is sometimes used in more complex situations.

Using Tab objects, these variables are replaced by a pipeline of methods.

````javascript
// using pipelined tabs: 

requestAddress(name)
.try(composeMessage)
.try(sendMessage)
.try(function () {
    console.log(name + ": sent");
});
````



<br />

---
### Methods used in this topic

* [.try()][ref-tab.prototype.try]



<br /> Back to [Top] | [Project] | [Topics] / [Where Are Tabs Helping?][topic-where-are-tabs-helping] | [Reference] <br />
