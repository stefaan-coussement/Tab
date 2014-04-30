/*
The MIT License (MIT)

Copyright (c) 2014 Stefaan Coussement

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


//##############################################################################
//# TAB
//##############################################################################

/* global define, require */  // AMD
/* global exports, require */ // commonJS, nodeJS, Rhino
/* global setTimeout */

(function (create) {
	'use strict';

	var f = Function; // avoiding jshint warning

	var Tab;

	// create the module immediately
	Tab = create();

	// publish the module
	if ((typeof define === 'function') && define.amd) { // AMD
		define('Tab', [], function () { return Tab; });
	}
	else if ((typeof exports === 'object') && (typeof require === 'function')) { // commonJS, nodeJS, Rhino
		exports.Tab = Tab; 
	}
	else { // browser, etc...
		(f('return this')()).Tab = Tab;
	}

	// augment the module once all definitions in this file are loaded
	setTimeout(function () {
		if (!Tab.hasReturned && (typeof require === 'function')) { // AMD, commonJS, nodeJS, Rhino
			require('tab-basics');
			require('tab-scheduling');
			require('tab-extending');                                           //<<<<<<<<<<<<<<<<<< AMD: how to signal everything is there?
		}
	}, 0);

})(function () {
	'use strict';

	var version = '#{VERSION}'; // populated based on package.json when building

	//==========================================================================
	// Tab constructor
	//

	//--------------------------------------------------------------------------
	// new Tab( ?object ) >> newTab
	// Tab( object ) >> convertedTab
	//
	function Tab() {
		if (this instanceof Tab) {
			return Tab.construct.apply(this, arguments);
		}
		else {
			return Tab.convert.apply(this, arguments);
		}
	}

	//==========================================================================
	// Tab constructor properties
	//

	//--------------------------------------------------------------------------
	// Tab.version
	//
	Tab.version = version;

	//--------------------------------------------------------------------------
	// Tab.construct( ?object ) >> newTab
	//
	// if object,  requires 'tab-delegating.js'
	//
	Tab.construct = function () {
		var newTab = Object.create(Tab.prototype);

		if (arguments.length === 0) {
			return newTab;
		}
		else {
			return Tab.delegate.call(newTab, arguments[0]);
		}
	};

	//--------------------------------------------------------------------------
	// Tab.convert( object ) >> convertedTab
	//
	// if object,  requires 'tab-promising.js' || 'tab-basics.js'
	//
	Tab.convert = function (object) {
		if (object instanceof Tab) {
			return object;
		}
		else {
			return (Tab.accept || Tab.return).call(Object.create(Tab.prototype), object);
		}
	};

	//--------------------------------------------------------------------------
	// Tab.isTab( object ) >> booleanValue
	//
	Tab.isTab = function (object) {
		return (object instanceof Tab);
	};

	//==========================================================================
	// Tab prototype properties
	//

	//--------------------------------------------------------------------------
	// Tab.prototype.toString() >> stringValue
	//
	Tab.prototype.toString = function () {
		if (this instanceof Tab) {
			if (this._type === 'value') {
				if (this._values && (this._values[0] != null)) {
					return this._values[0].toString();
				}
				else { // has returned without arguments or with 'undefined'/'null'
					return '';
				}
			}
			else if (this._type === 'error') {
				if (this._values && (this._values[0] != null)) {
					throw this._values[0].valueOf();
				}
				else { // has thrown without arguments or with 'undefined'/'null'
					throw this._values[0];
				}
			}
			else { // has not yet returned or thrown
				return;
			}
		}
		else { // not a tab
			return this.toString();
		}
	};

	//--------------------------------------------------------------------------
	// Tab.prototype.valueOf() >> value
	//
	Tab.prototype.valueOf = function () {
		if (this instanceof Tab) {
			if (this._type === 'value') {
				if (this._values && (this._values[0] != null)) {
					return this._values[0].valueOf();
				}
				else { // has returned without arguments or with 'undefined'/'null'
					return this._values[0];
				}
			}
			else if (this._type === 'error') {
				if (this._values && (this._values[0] != null)) {
					throw this._values[0].valueOf();
				}
				else { // has thrown without arguments or with 'undefined'/'null'
					throw this._values[0];
				}
			}
			else { // has not yet returned or thrown
				return;
			}
		}
		else { // not a tab
			return this.valueOf();
		}
	};

	return Tab;  
})();


//##############################################################################
//# TAB BASICS
//##############################################################################

/* global define, require */  // AMD
/* global exports, require */ // commonJS, nodeJS, Rhino

(function (augment) {
	'use strict';

	var f = Function; // avoiding jshint warning

	// augment the module once all definitions in this file are loaded
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

	//--------------------------------------------------------------------------
	// doReturn( ?value, ...extraValues ) >> thisTab
	//
	// - if 'this' is not a Tab object then 'thisTab' is a newly constructed Tab
	//
	function doReturn(value) {
		// jshint validthis: true, unused: false
		var thisTab = this;

		// construct a new tab when none provided
		if (!(thisTab instanceof Tab)) {
			thisTab = Tab.construct();
		}

		// throw when this tab is cancelled
		if (thisTab._cancelled) {
			throw thisTab._values[0].valueOf();
		}

		// ignore when tab is settled, else set the value
		if (!thisTab._settled) {
			// set the value and notify subscribers
			thisTab._values = arguments;
			thisTab._completed = true;
			thisTab._type = 'value';
			Tab.X.notify(thisTab, 'returned', arguments);
		}

		return thisTab;
	}

	//--------------------------------------------------------------------------
	// doThrow( ?error, ...extraValues ) >> thisTab
	//
	// - if 'this' is not a Tab object then 'thisTab' is a newly constructed Tab
	//
	function doThrow(error) {
		// jshint validthis: true, unused: false
		var thisTab = this;

		// construct a new tab when none provided
		if (!(thisTab instanceof Tab)) {
			thisTab = Tab.construct();
		}

		// throw when this tab is cancelled
		if (thisTab._cancelled) {
			throw thisTab._values[0].valueOf();
		}

		// ignore when tab is settled, else set the value
		if (!thisTab._settled) {
			// set the error and notify subscribers
			this._values = arguments;
			this._completed = true;
			thisTab._type = 'error';
			Tab.X.notify(this, 'thrown', arguments);
		}

		return this;
	}

	//==========================================================================
	// Tab constructor properties
	//

	//--------------------------------------------------------------------------
	// Tab.return( ?value, ...extraValues ) >> newTab
	//
	Tab.return =
	Tab.doReturn = doReturn;

	//--------------------------------------------------------------------------
	// Tab.throw( ?error, ...extraValues ) >> newTab
	//
	Tab.throw =
	Tab.doThrow = doThrow;

	//==========================================================================
	// Tab prototype properties
	//

	//--------------------------------------------------------------------------
	// Tab.prototype.return( ?value, ...extraValues ) >> thisTab
	//
	Tab.prototype.return = 
	Tab.prototype.doReturn = doReturn;

	//--------------------------------------------------------------------------
	// Tab.prototype.throw( ?error, ...extraValues ) >> thisTab
	//
	Tab.prototype.throw = 
	Tab.prototype.doThrow = doThrow;

	//--------------------------------------------------------------------------
	// Tab.prototype.hasReturned() >> booleanValue
	//
	Tab.prototype.hasReturned = function hasReturned() {
		if (this instanceof Tab) {
			return (this._completed && (this._type === 'value'));
		}
		else { // not a tab
			throw new TypeError('invalid subject');
		}
	};

	//--------------------------------------------------------------------------
	// Tab.prototype.hasThrown() >> booleanvalue
	//
	Tab.prototype.hasThrown = function hasThrown() {
		if (this instanceof Tab) {
			return (this._completed && (this._type === 'error'));
		}
		else { // not a tab
			throw new TypeError('invalid subject');
		}
	};

	//--------------------------------------------------------------------------
	// Tab.prototype.onReturned( processor ) >> thisTab
	//
	Tab.prototype.onReturned = function onReturned(processor) {
		var deferred;

		// throw when 'this' is not a Tab
		if (!(this instanceof Tab)) {
			throw new TypeError('invalid subject');
		}

		// throw when this tab is cancelled
		if (this._cancelled) {
			throw this._values[0].valueOf();
		}

		// prepare a deferred callback
		if (!this._settled || (this._completed && (this._type === 'value'))) {
			deferred = Tab.X.defer(null, processor);
		}

		// if we can expect more events, subscribe for them 
		if (!this._settled) {
			Tab.X.subscribe(this, this, 'returned', deferred);
		}

		// if 'this' already has returned, schedule the callback
		if (this._completed && (this._type === 'value')) {
			Tab.Schedulers.scheduleNext(this, deferred, undefined, this._values);
		}

		return this;
	};

	//--------------------------------------------------------------------------
	// Tab.prototype.onThrown( processor ) >> thisTab
	//
	Tab.prototype.onThrown = function onThrown(processor) {
		var deferred;

		// throw when 'this' is not a Tab
		if (!(this instanceof Tab)) {
			throw new TypeError('invalid subject');
		}

		// throw when this tab is cancelled
		if (this._cancelled) {
			throw this._values[0].valueOf();
		}

		// prepare a deferred callback
		if (!this._settled || (this._completed && (this._type === 'error'))) {
			deferred = Tab.X.defer(null, processor);
		}

		// if we can expect more events, subscribe for them 
		if (!this._settled) {
			Tab.X.subscribe(this, this, 'thrown', deferred);
		}

		// if 'this' already has thrown, schedule the callback
		if (this._completed && (this._type === 'error')) {
			Tab.Schedulers.scheduleNext(this, deferred, undefined, this._values);
		}

		return this;
	};

	return Tab;  
})();


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


//##############################################################################
//# TAB EXTENDING
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

	//--------------------------------------------------------------------------
	// Tab.X
	//
	Tab.X = {};

	//--------------------------------------------------------------------------
	// Tab.X.defer( target, ?processor ) >> newFunction
	//
	Tab.X.defer = function defer(target, processor) {

		var deferred;
			// the deferred callback function

		if (processor) {
			deferred = function deferred() {
				var result;

				try {
					// prepare inner context
					target._deferred = false;

					// execute processor
					result = processor.apply(this, arguments);
					if ((this instanceof deferred) && (typeof result !== 'object')) {
						result = this;
					}

                            // process result
                            if (canUpdate && !target._deferred) {
                                target.doReturn(result);
                            }

                            // preserve external behaviour of processor
                            return result;
                        }
                        catch (error) {
                            // process error
                            if (canUpdate) {
                                target.doThrow(error);
                            }

                            // preserve external behaviour of processor
                            throw error;
                        }
                        finally {
                            // cleanup inner context
                            context = context.context;
                        }
                    };

			// ensure deferred can be used as a 'new' constructor 
			deferred.prototype = Object.create(processor.prototype);
			deferred.prototype.constructor = deferred;

			return deferred;
		}
		else {
			return function () {
				if (canUpdate) {
					// process immediate result
					Tab.prototype.return.apply(target, arguments);
				}
			};
		}
	};

	//--------------------------------------------------------------------------
	// Tab.X.notify( source, event, args ) >> source
	//
	Tab.X.notify = function notify(source, event, args) {
		var callbacks, i, n;

		// if source has no registered callbacks, return
		if (!source._callbacks) {
			return;
		}

		// if source has no registered callbacks for 'event', return
		if (!source._callbacks[event]) {
			return;
		}

		// notify all subscribers
		callbacks = source._callbacks[event];
		for (i = 0, n = callbacks.length; i < n; i += 1) {
			callbacks[i].call(null, undefined, args);
			    // function scheduler( subscriber, callback, subject, args )
			    // when Tab.X.subscribe:
			    //     subscriber <- subscriber
			    //     callback <- deferred
			    // when Tab.X.notify:
			    //     subject <- undefined
			    //     args <- args
		}

		return source;
	};

	//--------------------------------------------------------------------------
	// Tab.X.subscribe( subscriber, source, event, deferred, ?directives ) >> subscriber
	//
	// accepts directives:
	// * scheduler
	//
	Tab.X.subscribe = function subscribe(subscriber, source, event, deferred, directives) {
		var scheduler;

		// if source has no registered callbacks, create '_callbacks' attribute
		if (!source._callbacks) {
			source._callbacks = {};
		}

		// if source has no registered callbacks for 'event', create callbacks array
		if (!source._callbacks[event]) {
			source._callbacks[event] = [];
		}

		// prepare scheduler - use ScheduleNext as a default
		scheduler = (directives && directives.scheduler) || Tab.Schedulers.scheduleNext;

		// prepare subscriber - create one if none given
		subscriber = subscriber || Tab.construct();
		    // the subscriber is a tab object used to cancel a set of subscriptions, 
		    // typically the receiver of the event notifications.

		// subscribe
		source._callbacks[event].push(scheduler.bind(null, subscriber, deferred));
		    // function scheduler( subscriber, callback, subject, args )
		    // when Tab.X.subscribe:
		    //     subscriber <- subscriber
		    //     callback <- deferred
		    // when Tab.X.notify:
		    //     subject <- undefined
		    //     args <- args

		return subscriber;
	};

})();

//#################################################################################################
//# FUNCTION POLYFILL
//#################################################################################################

(function (augment) {
	'use strict';

	augment(Function);

})(function (Function) {
	'use strict';
	// jshint freeze: false

	// needed for PhantomJS (used for testing) and for older browsers
	if (!Function.prototype.bind) {
		Function.prototype.bind = function (subject) {
			var thisFunction = this,
			    args = (arguments.length <= 1) ? [] : Array.prototype.slice.call(arguments, 1);

			// at this moment we don't use this on Constructors
			return function () {
				return thisFunction.apply(subject, args.concat(Array.prototype.slice.call(arguments, 0)));
			};
		};
	}
})();