//#################################################################################################
//# POLYFILL
//#################################################################################################

(function () {
	"use strict";
	// jshint freeze: false

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
}());