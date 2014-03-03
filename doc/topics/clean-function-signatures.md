<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [Clean Function Signatures][topic-clean-function-signatures]

When we compare a synchronous function with its asynchronous counter part, then we can see one or more extra callbacks added in the latter.

````javascript
// synchronous: getJSON(path) -> response

console.log(getJSON("file://my_server/my_options/options.json"));
````

````javascript
// asynchrounous: getJSON(path, onResponse) -> undefined

getJSON("http://my_domain.com/my_options/options.json", function (response) {
    console.log(response);
});
````

Using Tab objects we can avoid this pollution of the signature and move the callbacks back out of the signature into a chained processing method.  The function's signature is now again the same as the synchronous signature.

````javascript
// asynchronous using tabs: getJSON(path) -> responseTab

getJSON("http://my_domain.com/my_options/options.json").try(function (response) {
    console.log(response);
));
````



<br />

---
### Methods used in this topic

* [.try()][ref-tab.prototype.try]



<br /> Back to [Top] | [Project] | [Topics] / [Where Are Tabs Helping?][topic-where-are-tabs-helping] | [Reference] <br />
