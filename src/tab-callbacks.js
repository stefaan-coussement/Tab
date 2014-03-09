/*global Tab: true */

//#################################################################################################
//# CALLBACKS
//#################################################################################################

(function (Tab) {
    "use strict";
    var slice = Array.prototype.slice;

    //---------------------------------------------------------------------------------------------
    //- Tab.defer() >> undefined
    //- Tab.defer( target, ?processor ) >> newFunction
    //-
    function defer(target, processor) {
        return Tab.X.defer({ target: target }, processor);
    }
    Tab.defer = defer;

    //---------------------------------------------------------------------------------------------
    //- Tab.deferFulfill( target ) >> newFunction
    //-
    function deferFulfill(target) {
        return Tab.X.defer(null, function () {
            // encapsulate and do not return, to avoid leaking target
            Tab.prototype.fulfill.apply(target, arguments);
        });
    }
    Tab.deferFulfill = deferFulfill;

    //---------------------------------------------------------------------------------------------
    //- Tab.deferReject( target ) >> newFunction
    //-
    function deferReject(target) {
        return Tab.X.defer(null, function () {
            // encapsulate and do not return, to avoid leaking target
            Tab.prototype.reject.apply(target, arguments);
        });
    }
    Tab.deferReject = deferReject;

    //---------------------------------------------------------------------------------------------
    //- Tab.deferReturn( target ) >> newFunction
    //-
    function deferReturn(target) {
        return Tab.X.defer(null, function () {
            // encapsulate and do not return, to avoid leaking target
            Tab.prototype.doReturn.apply(target, arguments);
        });
    }
    Tab.deferReturn = deferReturn;

    //---------------------------------------------------------------------------------------------
    //- Tab.deferSettle( target ) >> newFunction
    //-
    function deferSettle(target) {
        return Tab.X.defer(null, function () {
            // encapsulate and do not return, to avoid leaking target
            target.settle();
        });
    }
    Tab.deferSettle = deferSettle;

    //---------------------------------------------------------------------------------------------
    //- Tab.deferThrow( target ) >> newFunction
    //-
    function deferThrow(target) {
        return Tab.X.defer(null, function () {
            // encapsulate and do not return, to avoid leaking target
            Tab.prototype.doThrow.apply(target, arguments);
        });
    }
    Tab.deferThrow = deferThrow;

    //---------------------------------------------------------------------------------------------
    //- Tab.deferWith( target, ?processor ) >> newFunction
    //-
    function deferWith(target, processor) {
        var deferrer;

        if (processor) {
            // create a deferrer function
            deferrer = function () {
                // jshint validthis: true
                var args = slice.call(arguments, 0);
                args.unshift(this);

                return processor.apply(null, args);
            };

            return Tab.X.defer({ target: target }, deferrer);
        }
        else {
            return Tab.X.defer(null, function () {
                // jshint validthis: true
                var args = slice.call(arguments, 0);
                args.unshift(this);

                Tab.prototype.doReturn.apply(target, args);
            });
        }
    }
    Tab.deferWith = deferWith;

}(Tab));
