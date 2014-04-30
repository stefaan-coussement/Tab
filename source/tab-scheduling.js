
//##############################################################################
//# TAB SCHEDULING
//##############################################################################

/* global define, require */  // AMD
/* global exports, require */ // commonJS, nodeJS, Rhino

(function (augment) {
	'use strict';

	var f = Function; // avoiding jshint warning

	if ((typeof define === 'function') && define.amd) { // AMD
		require([ 'Tab' ], augment);
	}
	else if ((typeof exports === 'object') && (typeof require === 'function')) { // commonJS, nodeJS, Rhino
		augment(exports.Tab || require('Tab'));
	}
	else { // browser, etc...
		augment((f('return this')()).Tab);
	}

})(function (Tab) {
	'use strict';

	var f = Function, // avoiding jshint warning
	    global = (f('return this')());

	var setImmediate = 
	        global.setImmediate ||
	        function (callback) { return global.setTimeout(callback, 1); };
	    // a function to execute a callback in the next turn of the event-loop

	var tick = 0;
	    // counts the turns - can be useful for debugging

	var next= [];
	    // a queue of callbacks, scheduled for the next turn

	var last= [];
	    // a queue of callbacks, to execute after all items in 'next' queue

	var processing;
	    // indicates we already scheduled processing of items in the next turn

	function processItem(item) {
		var subscriber = item.subscriber;

		if (!subscriber || !subscriber._cancelled) {
			item.callback.apply(item.subject, item.args);
		}
	}

	function processItems() {
		var turn;

		// increment turn-counter
		tick += 1;

		// process high priority items
		if (next.length > 0) {
			// we don't want to process newly added items
			turn = next;
			next = [];

			// process all items in the high priority queue
			while (turn.length > 0) {
				processItem(turn.shift());
			}
		}

		// process low priority items as long as there is no high priority item
		if ((next.length === 0) && (last.length > 0)) {
			// we don't want to process newly added items
			turn = last;
			last = [];

			// process all items in the low priority queue
			while (turn.length > 0) {
				processItem(turn.shift());

 				if (next.length > 0) {
					// break when there is a high priority item
 					// re-enqueue remaining low priority items
					last = turn.concat(last);
					break;
				}
			}
		}

		if ((next.length === 0) && (last.length === 0)) {
			// stop processing
			processing = false;
		}
		else {
			// schedule processing of remaining (and new) items in next turn
			setImmediate(processItems);
		}
	}

	function process() {
		if (!processing) {
			// start processing
			processing = true;

			// schedule processing of new items in next turn
			setImmediate(processItems);
		}
	}

	//--------------------------------------------------------------------------
	// Tab.Schedulers
	//

	Tab.Schedulers = {};

	//--------------------------------------------------------------------------
	// Tab.Schedulers.tick
	//
	Object.defineProperty(Tab.Schedulers, 'tick', {
		get: function () {
			return tick;
		},
		configurable: true,
		enumerable: true
	});

	//--------------------------------------------------------------------------
	// Tab.Schedulers.scheduleFirst( subscriber, callback, subject, args )
	//
	Tab.Schedulers.scheduleFirst = function scheduleFirst(subscriber, callback, subject, args) {
		if (!subscriber || !subscriber._cancelled) {
			next.unshift({
				subscriber: subscriber,
				callback: callback,
				subject: subject,
				args: args
			});
			process();
		}
	};

	//--------------------------------------------------------------------------
	// Tab.Schedulers.scheduleLast( subscriber, callback, subject, args )
	//
	Tab.Schedulers.scheduleLast = function scheduleLast(subscriber, callback, subject, args) {
		if (!subscriber || !subscriber._cancelled) {
			last.push({
				subscriber: subscriber,
				callback: callback,
				subject: subject,
				args: args
			});
			process();
		}
	};

	//--------------------------------------------------------------------------
	// Tab.Schedulers.scheduleNext( subscriber, callback, subject, args )
	//
	Tab.Schedulers.scheduleNext = function scheduleNext(subscriber, callback, subject, args) {
		if (!subscriber || !subscriber._cancelled) {
			next.push({
				subscriber: subscriber,
				callback: callback,
				subject: subject,
				args: args
			});
			process();
		}
	};

	//--------------------------------------------------------------------------
	// Tab.Schedulers.scheduleNow( subscriber, callback )
	//
	Tab.Schedulers.scheduleNow = function scheduleNow(subscriber, callback, subject, args) {
		if (!subscriber || !subscriber._cancelled) {
			callback.apply(subject, args);
		}
	};

})();
