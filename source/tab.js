
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
