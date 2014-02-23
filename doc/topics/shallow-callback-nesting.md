<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [Shallow Callback Nesting][topic-shallow-callback-nesting]

Both in the synchronous and asynchronous world, we often need to apply functions on the result of other functions.  Especially in the case of asynchronous callbacks, this often leads to deeply nested programs.  Once you start an asynchronous chain, it is usually impossible to break out of it.  You need to continue nesting ever deeper until you reach a result.

````javascript
// synchronous: 

sendMessage(composeMessage(getAddress(name)));
console.log(name + ": sent");
````

````javascript
// asynchronous: 

requestAddress(name, function (address) {
    composeMessage(address, function (message) {
        sendMessage(message, function () {
            console.log(name + ": sent");
        });
    });
});
````

````javascript
// asynchronous using nested tabs: 

requestAddress(name).try(function (address) {
    composeMessage(address).try(function (message) {
        sendMessage(message).try(function () {
            console.log(name + ": sent");
        });
    });
});
````

There are various techniques to improve on this, all having advantages and disadvantages.  Using Tab objects, you can turn a nested sequence of methods into a pipeline of processing methods.

````javascript
// asynchronous using pipelined tabs: 

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
