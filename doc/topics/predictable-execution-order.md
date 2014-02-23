<a name="top" ></a>

<img src="../img/tab-logo128.png" alt="Tab logo" align="left" style="float:left; margin-top:-22px;" height="66" /><img src="../img/1x1.png" align="left" style="float:left;" height="44" width="20" />
## [Predictable Execution Order][topic-predictable-execution-order]

The code that calls a method with a callback typically expects that callback to be executed in a future turn of the event-loop, thus allowing the execution of the remaining code in the program, before the callback is called.  

However, when an asynchronous method or some underlining mechanisms is caching its data, the callback is often executed immediately.  This can lead to unexpected behaviour when the callback is effectively executed before the calling code has completed.

````javascript
var cache = {}, loadingURL;

function loadOptions(module, callback) {
    var optionsURL = getBaseURL() + module + ".json";
    
    if (cache[optionsURL]) {
        callback(cache[optionsURL]);
    }
    else {
        loadJSON(optionsURL, function () {
            cache[optionsURL] = JSON.parse(text);
            callback(cache[optionsURL]);
        });
    }
    return optionsURL;
}

loadingURL = loadOptions("myModule", function (options) {
    console.log(“options loaded for ” + loadingURL + ": " + JSON.stringify(options));
});

console.log(“options loading for ” + loadingURL);
````

This example will not work as expected when the callback is executed immediately
* the *loaded*-message will be logged before the *loading*-message.  
* the value returned by `loadOptions` is not yet assigned to the `loadingURL` and thus the *loaded*-message will log an undefined URL.

One way to solve issues like this is to introduce a status variable, and to add the URL  as an argument to the callback.

````javascript
var cache = {}, loadingURL, status;

function loadOptions(module, callback) {
    var optionsURL = getBaseURL() + module + ".json";
    
    if (cache[optionsURL]) {
        callback(cache[optionsURL], optionsURL);
    }
    else {
        loadJSON(optionsURL, function () {
            cache[optionsURL] = JSON.parse(text);
            callback(cache[optionsURL], optionsURL);
        });
    }
    return optionsURL;
}

loadingURL = loadOptions("myModule", function (options, optionsURL) {
    if (status !== “loading”) {
        // log a fake message in case the result is immediately available
        console.log(“options loading for ” + optionsURL);
    }

    console.log(“options loaded for ” + optionsURL + ": " + JSON.stringify(options));
    status = “loaded”;
});

if (status !== “loaded”) { 
    // avoid logging a message if the text is already loaded
    console.log(“options loading for ” + loadingURL);
    status = “loading”;
}
````

Although the previous code is over-kill for this specific simple example, it should be clear that this technique can become quite complicated.
Instead, it is usually better to avoid calling the callback immediately using the `setImmediate()` (or `setTimeout()`) function.

````javascript
var cache = {}, loadingURL;

function loadOptions(module, callback) {
    var optionsURL = getBaseURL() + module + ".json";
    
    if (cache[optionsURL]) {
        setImmediate(function () {
            callback(cache[optionsURL]);
        });
    }
    else {
        loadJSON(optionsURL, function () {
            cache[optionsURL] = JSON.parse(text);
            callback(cache[optionsURL]);
        });
    }
    return optionsURL;
}

loadingURL = loadOptions("myModule", function (options) {
    console.log(“options loaded for ” + loadingURL + ": " + JSON.stringify(options));
});

console.log(“options loading for ” + loadingURL);
````

The latter is exactly what tabs do under-the-hood.

````javascript
var cache = {}, loadingTab;

function loadOptions(module) {
    var options = new Tab(),
        optionsURL = getBaseURL() + module + ".json";
  
    if (cache[URL]) {
        options.return(cache[URL]);
    }
    else {
        loadJSON(URL, function (text) {
            cache[URL] = JSON.parse(text);
            options.return(cache[URL]);
        });
    }
    options.URL = optionsURL;
    return options;
}

loadingTab = loadOptions("myModule");
console.log(“options loading for ” + loadingURL);

loadingTab.try(function (options) {
    console.log(“options loaded for ” + loadingURL + ": " + JSON.stringify(options));
});
````



<br />

---
### Methods used in this topic

* [new Tab()][ref-new-tab]
<br />
* [.return()][ref-tab.prototype.return]
* [.try()][ref-tab.prototype.try]



<br /> Back to [Top] | [Project] | [Topics] / [Where Are Tabs Helping?][topic-where-are-tabs-helping] | [Reference] <br />
