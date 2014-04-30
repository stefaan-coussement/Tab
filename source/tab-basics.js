
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
