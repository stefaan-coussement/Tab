// The MIT License (MIT)
//
// Copyright (c) 2014 Stefaan Coussement
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/*global window: true, Tab: true */

//#################################################################################################
//# CORE
//#################################################################################################

Tab = (function (global) {
    "use strict";
    var version = "0.1",
        context,
        es5,
        setImmediate, clearImmediate;

    es5 = (function () {
        // jshint es3: false
        try {
            var test = {};
            test.return = function () {};
            return true;
        }
        catch (e) {
            return false;
        }
    }());

    if (global.setImmediate) {
        setImmediate = global.setImmediate;
        clearImmediate = global.clearImmediate;
    }
    else {
        setImmediate = function (callback) { return global.setTimeout(callback, 0); };
        clearImmediate = function (id) { global.clearTimeout(id); };
    }

    //*********************************************************************************************
    //*********************************************************************************************

    //---------------------------------------------------------------------------------------------
    //- new Tab() >> newTab
    //- Tab( object ) >> convertedTab
    //-
    function Tab() {
        if (this instanceof Tab) {
            construct.apply(this, arguments);
        }
        else {
            convert.apply(this, arguments);
        }
    }

    //*********************************************************************************************
    //*********************************************************************************************

    //---------------------------------------------------------------------------------------------
    //- Tab.context
    //-
    context = {};

    Object.defineProperty(context, "target", {
        value: construct(),
        enumerable: true
    });

    Object.defineProperty(Tab, "context", {
        get: function () {
            return context;
        },
        configurable: true,
        enumerable: true
    });

    //---------------------------------------------------------------------------------------------
    //- Tab.version
    //-
    Object.defineProperty(Tab, "version", {
        get: function () {
            return version;
        },
        configurable: true,
        enumerable: true
    });

    //*********************************************************************************************
    //*********************************************************************************************

    //---------------------------------------------------------------------------------------------
    //- Tab.construct() >> newTab
    //-
    function construct() {
        return Object.create(Tab.prototype);
    }
    Tab.construct = construct;

    //---------------------------------------------------------------------------------------------
    //- Tab.convert( object ) >> convertedTab
    //-
    function convert(object) {
        if (object instanceof Tab) {
            return object;
        }
        else {
            return doReturn.apply(construct(), arguments);
        }
    }
    Tab.convert = convert;

    //---------------------------------------------------------------------------------------------
    //- Tab.isTab( object ) >> booleanValue
    //-
    function isTab(object) {
        return (object instanceof Tab);
    }
    Tab.isTab = isTab;

    //---------------------------------------------------------------------------------------------
    //- Tab.newReturn( ?value, ...extraValues ) >> newTab
    //-
    function newReturn(value) {
        // jshint unused: false
        return doReturn.apply(construct(), arguments);
    }
    Tab.newReturn = newReturn;

    //---------------------------------------------------------------------------------------------
    //- Tab.newThrow( ?error, ...extraValues ) >> newTab
    //-
    function newThrow(error) {
        // jshint unused: false
        return doThrow.apply(construct(), arguments);
    }
    Tab.newThrow = newThrow;

    //*********************************************************************************************
    //*********************************************************************************************

    //---------------------------------------------------------------------------------------------
    //- Tab.prototype.doCancel() >> thisTab
    //- Tab.prototype.cancel() >> thisTab // ES5 only
    //-
    function doCancel() {
        // jshint validthis: true
        if (this instanceof Tab) {
            if(!this._fixed) {
                _notify(this, "cancelling", []);
                this.doThrow(new Error("cancelled"));

                this._completed = "cancelled";
            }

            return this;
        }
        else {
            // not a tab
            throw new TypeError("invalid subject");
        }
    }
    Tab.prototype.doCancel = doCancel;
    if (es5) { // jshint es3: false   
        // strictly speaking no need to restrict, but done in analogy with doReturn and doThrow                        
        Tab.prototype.cancel = doCancel;
    } // jshint es3: true

    //---------------------------------------------------------------------------------------------
    //- Tab.prototype.hasReturned() >> booleanValue
    //-
    function hasReturned() {
        // jshint validthis: true
        if (this instanceof Tab) {
            return (this._started === "returned");
        }
        else {
            // not a tab
            throw new TypeError("invalid subject");
        }
    }
    Tab.prototype.hasReturned = hasReturned;

    //---------------------------------------------------------------------------------------------
    //- Tab.prototype.hasThrown() >> booleanvalue
    //-
    function hasThrown() {
        // jshint validthis: true
        if (this instanceof Tab) {
            return (this._started === "thrown");
        }
        else {
            // not a tab
            throw new TypeError("invalid subject");
        }
    }
    Tab.prototype.hasThrown = hasThrown;

    //---------------------------------------------------------------------------------------------
    //- Tab.prototype.isCancelled() >> booleanValue
    //-
    function isCancelled() {
        // jshint validthis: true
        if (this instanceof Tab) {
            return (this._completed === "cancelled");
        }
        else {
            // not a tab
            throw new TypeError("invalid subject");
        }
    }
    Tab.prototype.isCancelled = isCancelled;

    //---------------------------------------------------------------------------------------------
    //- Tab.prototype.onCancelling( processor ) >> thisTab
    //-
    function onCancelling(processor) {
        // jshint validthis: true
        var deferred;

        if (this instanceof Tab) {
            deferred = _defer({ source: this, target: null }, processor);
            _subscribe(this, "cancelling", deferred, {
                scheduler: Tab.Schedulers.scheduleNow
            });

            return this;
        }
        else {
            // not a tab
            throw new TypeError("invalid subject");
        }
    }
    Tab.prototype.onCancelling = onCancelling;

    //---------------------------------------------------------------------------------------------
    //- Tab.prototype.onReturned( processor ) >> thisTab
    //-
    function onReturned(processor) {
        // jshint validthis: true
        var deferred;

        if (this instanceof Tab) {
            deferred = _defer({ source: this, target: null }, processor);
            _subscribe(this, "returned", deferred);

            return this;
        }
        else {
            // not a tab
            throw new TypeError("invalid subject");
        }
    }
    Tab.prototype.onReturned = onReturned;

    //---------------------------------------------------------------------------------------------
    //- Tab.prototype.onThrown( processor ) >> thisTab
    //-
    function onThrown(processor) {
        // jshint validthis: true
        var deferred;

        if (this instanceof Tab) {
            // create source and target tabs
            deferred = _defer({ source: this, target: null }, processor);
            _subscribe(this, "thrown", deferred);

            return this;
        }
        else {
            // not a tab
            throw new TypeError("invalid subject");
        }
    }
    Tab.prototype.onThrown = onThrown;

    //---------------------------------------------------------------------------------------------
    //- Tab.prototype.doReturn( ?value, ...extraValues ) >> thisTab
    //- Tab.prototype.return( ?value, ...extraValues ) >> thisTab // ES5 only
    //-
    function doReturn(value) {
        // jshint validthis: true, unused: false
        if (this instanceof Tab) {
            if(!this._completed) {
                this._values = arguments;
                this._started = "returned";
                _notify(this, "returned", arguments);
            }

            return this;
        }
        else {
            // not a tab
            throw new TypeError("invalid subject");
        }
    }
    Tab.prototype.doReturn = doReturn;
    if (es5) { // jshint es3: false                           
        Tab.prototype.return = doReturn;
    } // jshint es3: true

    //---------------------------------------------------------------------------------------------
    //- Tab.prototype.doThrow( ?error, ...extraValues ) >> thisTab
    //- Tab.prototype.throw( ?error, ...extraValues ) >> thisTab // ES5 only
    //-
    function doThrow(error) {
        // jshint validthis: true, unused: false
        if (this instanceof Tab) {
            if(!this._completed) {
                this._values = arguments;
                this._started = "thrown";
                _notify(this, "thrown", arguments);
            }

            return this;
        }
        else {
            // not a tab
            throw new TypeError("invalid subject");
        }
    }
    Tab.prototype.doThrow = doThrow;
    if (es5) { // jshint es3: false                           
        Tab.prototype.throw = doThrow;
    } // jshint es3: true

    //---------------------------------------------------------------------------------------------
    //- Tab.prototype.toString() >> stringValue
    //-
    function toString() {
        // jshint validthis: true
        if (this instanceof Tab) {
            if (this.hasThrown()) {
                throw this._values[0].valueOf();
            }
            else {
                return this._values[0].toString();
            }
        }
        else {
            // not a tab
            return this.toString();
        }
    }
    Tab.prototype.toString = toString;

    //---------------------------------------------------------------------------------------------
    //- Tab.prototype.valueOf() >> value
    //-
    function valueOf() {
        // jshint validthis: true
        if (this instanceof Tab) {
            if (this.hasThrown()) {
                throw this._values[0].valueOf();
            }
            else {
                return this._values[0].valueOf();
            }
        }
        else {
            // not a tab
            return this.valueOf();
        }
    }
    Tab.prototype.valueOf = valueOf;

    //*********************************************************************************************
    //*********************************************************************************************

    //---------------------------------------------------------------------------------------------
    //- Tab.Schedulers
    //-

    Tab.Schedulers = (function () {
        var Schedulers = {},
            next= [],
            last= [],
            processing,
            tick = 0;

        function processScheduler(scheduler) {
            var id;

            if (!scheduler._canceller.isCancelled()) {
                id = setImmediate(scheduler);
            }

            scheduler._canceller.onCancelling(function () {
                clearImmediate(id);
            });
        }

        function processQueues() {
            if (next.length > 0) {
                processing = true;
                while (next.length > 0) {
                    processScheduler(next.shift());
                }
                setImmediate(processQueues);
                tick += 1;
            }
            else if (last.length > 0) {
                processing = true;
                processScheduler(last.shift());
                setImmediate(processQueues);
                tick += 1;
            }
            else {
                processing = false;
            }
        }

        function process() {
            if (!processing) {
                processQueues();
            }
        }

        //-----------------------------------------------------------------------------------------
        //- Tab.Schedulers.tick
        //-
        Object.defineProperty(Schedulers, "tick", {
            get: function () {
                return tick;
            },
            configurable: true,
            enumerable: true
        });

        //-----------------------------------------------------------------------------------------
        //- Tab.Schedulers.scheduleFirst( canceller, callback )
        //-
        function scheduleFirst(canceller, callback) {
            function scheduler() {
                if (!canceller.isCancelled()) {
                    next.unshift(callback);
                    process();
                }
            }

            scheduler._canceller = canceller;

            return scheduler;
        }
        Schedulers.scheduleFirst = scheduleFirst;

        //-----------------------------------------------------------------------------------------
        //- Tab.Schedulers.scheduleLast( canceller, callback )
        //-
        function scheduleLast(canceller, callback) {
            function scheduler() {
                if (!canceller.isCancelled()) {
                    last.push(callback);
                    process();
                }
            }

            scheduler._canceller = canceller;

            return scheduler;
        }
        Schedulers.scheduleLast = scheduleLast;

        //-----------------------------------------------------------------------------------------
        //- Tab.Schedulers.scheduleNext( canceller, callback )
        //-
        function scheduleNext(canceller, callback) {
            function scheduler() {
                if (!canceller.isCancelled()) {
                    next.push(callback);
                    process();
                }
            }

            scheduler._canceller = canceller;

            return scheduler;
        }
        Schedulers.scheduleNext = scheduleNext;

        //-----------------------------------------------------------------------------------------
        //- Tab.Schedulers.scheduleNow( canceller, callback )
        //-
        function scheduleNow(canceller, callback) {
            function scheduler() {
                if (!canceller.isCancelled()) {
                    callback();
                }
            }

            return scheduler;
        }
        Schedulers.scheduleNow = scheduleNow;

        //-----------------------------------------------------------------------------------------

        return Schedulers;
    }());

    //*********************************************************************************************
    //*********************************************************************************************

    //---------------------------------------------------------------------------------------------
    //- Tab.X
    //-
    Tab.X = {};

    //---------------------------------------------------------------------------------------------
    //- Tab.X.es5
    //-
    Tab.X.es5 = es5;

    //---------------------------------------------------------------------------------------------
    //- Tab.X.defer( contextProperties, ?processor, ?directives ) >> newFunction
    //-
    //- accepts directives:
    //- * noContext
    //- * noUpdate
    //-
    function _defer(contextProperties, processor, directives) {
        var target = contextProperties.target,
            deferred, canUpdate, pushContext;

        // set the _deferred flag in the outer context
        if (context._deferred === false) { //  not just falsy
            context._deferred = true;
        }

        // create deferred function
        if (directives && !directives.noContext) {
            canUpdate = target && (directives && !directives.noUpdate);

            if (processor) {
                // function to create a new inner context
                pushContext = function (contextProperties) {
                    var oldContext = context;

                    context = Object.create(context);

                    Object.keys(contextProperties).forEach(function (key) {
                        Object.defineProperty(context, key, {
                            value: contextProperties[key],
                            enumerable: true
                        });
                    });

                    Object.defineProperty(context, "context", {
                        get: function () {
                            return oldContext;
                        }
                    });
                };

                deferred = function () {
                    var result;

                    if (!target || !target.isCancelled()) {
                        try {
                            // prepare inner context
                            pushContext(contextProperties);
                            context._deferred = false;

                            // execute processor
                            result = processor.apply(this, arguments);

                            // process result
                            if (canUpdate && !context._deferred) {
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
                    }
                };

                // ensure deferred can be used as a 'new' constructor 
                deferred.prototype = Object.create(processor.prototype);
                deferred.prototype.constructor = deferred;
            }
            else {
                deferred = function () {
                    if (canUpdate && !target.isCancelled()) {
                        // process immediate result
                        doReturn.apply(target, arguments);
                    }
                };
            }
        }
        else {
            deferred = processor;
        }

        return deferred;
    }
    Tab.X.defer = _defer;

    //---------------------------------------------------------------------------------------------
    //- Tab.X.notify( source, type, args ) >> undefined
    //-
    function _notify(source, type, args) {
        var callbacks, i, n;

        if (!source._callbacks) {
            return;
        }

        if (!source._callbacks[type]) {
            return;
        }

        callbacks = source._callbacks[type];
        for (i = 0, n = callbacks.length; i < n; i += 1) {
            callbacks[i].call(null, args);
        }
    }
    Tab.X.notify = _notify;

    //---------------------------------------------------------------------------------------------
    //- Tab.X.subscribe( source, type, processor, ?directives ) >> undefined
    //-
    //- accepts directives:
    //- * scheduler
    //-
    function _subscribe(source, type, processor, directives) {
        var scheduler;

        if (!source._callbacks) {
            source._callbacks = {};
        }

        if (!source._callbacks[type]) {
            source._callbacks[type] = [];
        }

        scheduler = (directives && directives.scheduler) || Tab.Schedulers.scheduleNext;
        source._callbacks[type].push(scheduler.bind(source, processor));
    }
    Tab.X.subscribe = _subscribe;

    //*********************************************************************************************
    //*********************************************************************************************

    return Tab;

}(window));
