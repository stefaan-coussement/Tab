
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
