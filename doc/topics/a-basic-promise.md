<a name="top" ></a>

![logo]

<a name="topic-a-basic-promise" ></a>
## [A Basic Promise][topic-a-basic-promise]

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
      this.fulfill();
    }
  })
.eventually()
  .try(function () {
     console.log("cuckoo");
  });
~~~~

Compared to the examples in [A Basic Callback][topic-a-basic-callback], in this example:

* We dropped the `.catch()` calls to make the example shorter and easier to read.
* We removed the `console.log("cuckoo")` and replaced it by a call to [this.fulfill()][ref-tab.prototype.fulfill].  This **settles** the tab that is created and returned by the  encapsulating `counter.try()` method, making its value final and non-mutable.
* [.eventually()][ref-tab.prototype.eventually] filters the notifications, only letting those events through that are emitted after the tap settled.  From this point in the chain, none of the **progress** events from previous steps are forwarded, only **settled** events are passed on.  The method returns a new **settling** Tap object.  
* The second [.try( onFulfilledProcessor )][ref-tab.prototype.try] call picks up the events from the settling tap.  When receiving a notification that the tap is fulfilled, the processor is executed.  

Remark that we tried to make the two phases clear by using indentation.  Although this is certainly not required in this example, it can be a good idea to do this in more complex cases, since the `.eventually()` can be difficult to spot when surrounded by other code. 
Alternatively, we can also use more explicit scoping functions as in next example.

~~~~javascript
var
  id, interval = 0,
  counter = new Tab();

id = setInterval(counter.defer(Tab.prototype.update), 1000);

counter
.do(function (source, target) {
  source.try(function () {
    interval += 1;
    if (interval <= 3600) {
      console.log(interval % 2 === 1 ? "tick" : "tock");
    }

    if (value === 3600) {
      clearInterval(id);
      target.fulfill();
    }
  });
})
.eventually(function (source) {
  source.try(function () {
     console.log("cuckoo");
  });
});
~~~~

Compared to the previous example, in this example:

* we introduced [.do( scopingFunction )][ref-tab.prototype.do] to encapsulate all processing before `counter` is settled.  The scoping function is called with references to the source tab of notification - `counter` - and the target tab that was newly created by the `.do()` method - equal to `this` in the scoping function.
* `this.fulfill()` can now be replaced by `target.fulfill()`, probably making a lot of people very happy.
* we also introduced a scoping function in [.eventually( scopingFunction )][ref-tab.prototype.eventually].

If you don't need to progress notifications, this can be simplified.

~~~~javascript
var
  id, interval = 0,
  timer = new Tab();

id = setTimeout(timer.defer(Tab.prototype.fulfill), 3600000);

timer
.eventually()
  .try(function () {
    console.log("cuckoo");
  });
~~~~

Compared to the previous examples, in this example:

* We dropped the first `.try()` clause as we do no longer need the progress events.
* [timer.defer( encapsulatedCallback )][ref-tab.prototype.defer] creates a new callback function, binding `timer` to [Tab.prototype.fulfill][ref-tab.prototype.fulfill].  This encapsulated callback, when executed will now fulfill `timer` instead of updating it, and a notification will be sent to all subscribers of `timer`.

Remark that in this very simple example, we can also keep updating `timer` instead of fulfilling it and drop the `.eventually()` clause.  However, fulfilling the tap corresponds better to the real situation: the expired status of a timeout is a final and non-mutable state. 

Making the previous example a bit more explicit, making it easier to follow what is happening.

~~~~javascript
var
  id, interval = 0,
  timer = new Tab();

id = setTimeout(function () {
  try {
    timer.fulfill();
  }
  catch (e) {
    timer.reject(e);
  }  
}, 3600000);

timer
.eventually()
  .try(function () {
    console.log("cuckoo");
   })
  .catch(function (error) {
    console.log(error);
  });
~~~~

Compared to the previous example, in this example:

* We now used [timer.reject()][ref-tab.prototype.reject] to **settle** `timer` into its error state instead of just throwing an error as we did in the examples in [A Basic Callback][topic-a-basic-callback].
* [.catch()][ref-tab.prototype.catch], since executed on a **settling** Tab object, will now process the error notifications from the `timer.reject' method.

Remark that in this very simple example, we can drop the `.eventually()` step, making the execution a bit faster. The `.fulfill()` method is equivalent to first applying the `.update()` method, and then applying [.settle()][ref-tab.prototype.settle].  This means that first an 'updated' notification will be sent out, followed by a 'fulfilled' notification.   

~~~~javascript
tab.fulfill( value ) ~ tab.update( value ).settle()
~~~~

A similar equivalence relationship exists between the `.reject()` and `.thow()` methods.

~~~~javascript
tab.reject( value ) ~ tab.throw( value ).settle()
~~~~



<br /> Other Tab attributes and methods used in this topic:
* [new Tab()][ref-new-tab]
* [.throw()][ref-tab.prototype.throw]
* [.update()][ref-tab.prototype.update]



<br /> Back to [Top] | [Topics] / [The Basics][cat-the-basics] | [Reference] <br />





[top]: #top "back to the top of this page"
[topics]: /doc/topics.md#topics "back to the 'Topics' section"
[reference]: /doc/reference.md#reference "back to the 'Reference' section"
[logo]: /doc/img/tab-logo64.png "Tab logo"

[cat-the-basics]: /doc/topics.md#cat-the-basics "more topics under 'The Basics'"
[topic-a-basic-callback]: /doc/topics.md/a-basic-callback#topic-a-basic-callback "Topics / The Basics / A Basic Callback - using a Tab object to handle callbacks."
[topic-a-basic-promise]: #topic-a-basic-promise "Topics / The Basics / A Basic Promise - using a Tab object as a promise."

[ref-new-tab]: tbd "!!! coming soon !!!"
[ref-tab.prototype.catch]: tbd "!!! coming soon !!!"
[ref-tab.prototype.defer]: tbd "!!! coming soon !!!"
[ref-tab.prototype.do]: tbd "!!! coming soon !!!"
[ref-tab.prototype.eventually]: tbd "!!! coming soon !!!"
[ref-tab.prototype.fulfill]: tbd "!!! coming soon !!!"
[ref-tab.prototype.reject]: tbd "!!! coming soon !!!"
[ref-tab.prototype.settle]: tbd "!!! coming soon !!!"
[ref-tab.prototype.try]: tbd "!!! coming soon !!!"
[ref-tab.prototype.throw]: tbd "!!! coming soon !!!"
[ref-tab.prototype.update]: tbd "!!! coming soon !!!"

[top]: #top "back to the top of this page"