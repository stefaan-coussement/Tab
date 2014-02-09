<a name="top" ></a>

<a name="topic-a-basic-tab" ></a>
## [A Basic Tap][topic-a-basic-tab]

~~~~javascript
var
  id, interval = 0,
  counter = new Tab();

id = setInterval(function () {
  try {
    interval += 1;
    counter.update(interval);
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
~~~~

In this example:

* [new Tab()][ref-new-tab] creates a new Tab object.
* [counter.update()][ref-tab.prototype.update] updates `counter` with a new value and notifies all its subscribers. 
* [counter.throw()][ref-tab.prototype.throw] sets `counter` to the failed state (this is probably not going to be necessary in this very simple example) and notifies all its subscribers.
* [counter.try( onUpdatedProcessor )][ref-tab.prototype.try] subscribes to all notifications from `counter` and creates a new Tab object for further processing.  When an update notification is received, the processor function is executed.  When an error notification is received, the notification is passed on to all subscribers of the new tab created by this method.   
* [.catch( onThrownProcessor )][ref-tab.prototype.catch] subscribes to all notifications from the tab created by `counter.try`.  When an error notification is received, the processor function is executed.



<br /> Back to [Home] | [Topics] / [The Basics][cat-the-basics] | [Reference] | [Top] <br />





[home]: home "back to the 'Home' page"

[topics]: home#topics "back to the 'Topics' section"
[cat-the-basics]: home#cat-the-basics "more topics under 'The Basics'"
[topic-a-basic-tab]: a-basic-tab "Topics / The Basics / A Basic Tab - creating and using a basic Tab object."

[reference]: home#reference "back to the 'Reference' section"
[ref-new-tab]: tbd "!!! coming soon !!!"
[ref-tab.prototype.catch]: tbd "!!! coming soon !!!"
[ref-tab.prototype.throw]: tbd "!!! coming soon !!!"
[ref-tab.prototype.try]: tbd "!!! coming soon !!!"
[ref-tab.prototype.update]: tbd "!!! coming soon !!!"

[top]: #top "back to the top of this page"