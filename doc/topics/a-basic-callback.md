<a name="top" ></a>

<a name="topic-a-basic-callback" ></a>
## [A Basic Callback][topic-a-basic-callback]

In the example of [A Basic Tab][topic-a-basic-tab] there is still quite a bit of processing in the callback function for `setInterval`.  We can do better.

~~~~javascript
var
  id, interval = 0,
  counter = new Tab();

id = setInterval(counter.defer(function () {
  interval += 1;
  return interval;
}), 1000);

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
~~~~

Compared to the example in [A Basic Tab][topic-a-basic-tab], in this example:

* [counter.defer( encapsulatedCallback )][ref-tab.prototype.defer] creates a new callback function, binding `counter` to the encapsulated callback.  This new deferred callback, when executed, will update `counter` with the return value of the encapsulated function, and a notification will be sent to all subscribers of `counter`.  In the case an error is thrown in the encapsulated function, `counter` is set to the failed state. 
 
However, we can still do better.   

~~~~javascript
var
  id, interval = 0,
  counter = new Tab();

id = setInterval(counter.defer(Tab.prototype.update), 1000);

counter
.try(function () {
  interval += 1;
  if (interval <= 3600) {
    console.log(interval % 2 === 1 ? "tick" : "tock");
  }

  if (value === 3600) {
    clearInterval(id);
    console.log("cuckoo");
  }
})
.catch(function (error) {
  console.log(error);
});
~~~~

Compared to the previous example, in this example:

* We moved the calculation of the interval to the procesor of `counter.try`.
* [counter.defer( encapsulatedCallback )][ref-tab.prototype.defer] creates a new callback function, binding `counter` to [Tap.prototype.update][ref-tab.prototype.update] - this is the method we used in the previous example to update `counter`.  This deferred callback, when executed will now update `counter` without providing a specific value, and a notification will be sent to all subscribers of `counter`.  In the case an error is thrown in the encapsulated function, `counter` is set to the failed state.



<br /> Other Tab attributes and methods used in this topic:
* [new Tab()][ref-new-tab]
* [.try()][ref-tab.prototype.try]  
* [.catch()][ref-tab.prototype.catch]  



<br /> Back to [Home] | [Topics] / [The Basics][cat-the-basics] | [Reference] | [Top] <br />





[home]: home "back to the 'Home' page"

[topics]: home#topics "back to the 'Topics' section"
[cat-the-basics]: home#cat-the-basics "more topics under 'The Basics'"
[topic-a-basic-tab]: a-basic-tab "Topics / The Basics / A Basic Tab - creating and using a basic Tab object."
[topic-a-basic-callback]: a-basic-callback "Topics / The Basics / A Basic Callback - using a Tab object to handle callbacks."

[reference]: wiki/home#reference "back to the 'Reference' section"
[ref-new-tab]: tbd "!!! coming soon !!!"
[ref-tab.prototype.catch]: tbd "!!! coming soon !!!"
[ref-tab.prototype.defer]: tbd "!!! coming soon !!!"
[ref-tab.prototype.try]: tbd "!!! coming soon !!!"
[ref-tab.prototype.update]: tbd "!!! coming soon !!!"

[top]: #top "back to the top of this page"
