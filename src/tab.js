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
    //- Tab.prototype.cancel() >> thisTab
    //-
    function cancel() {
        // jshint validthis: true
        if (this instanceof Tab) {
            if(!this._completed) {
                this.doThrow(new Error("cancelled"));
                this._completed = "cancelled";
                _notify(this, "cancelled");

                // cancelled notifications are scheduled now so it's safe to cleanup this tab
                this._callbacks = null;
            }

            return this;
        }
        else {
            // not a tab
            throw new TypeError("invalid subject");
        }
    }
    Tab.prototype.cancel = cancel;

    //---------------------------------------------------------------------------------------------
    //- Tab.prototype.fulfill( ?value, ...extraValues ) >> thisTab
    //-
    function fulfill(error) {
        // jshint validthis: true, unused: false
        return doReturn.apply(this, arguments).settle();
    }
    Tab.prototype.fulfill = fulfill;

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
    //- Tab.prototype.isSettled() >> booleanValue
    //-
    function isSettled() {
        // jshint validthis: true
        if (this instanceof Tab) {
            return (this._completed === "settled");
        }
        else {
            // not a tab
            throw new TypeError("invalid subject");
        }
    }
    Tab.prototype.isSettled = isSettled;

    //---------------------------------------------------------------------------------------------
    //- Tab.prototype.onCancelled( processor ) >> thisTab
    //-
    function onCancelled(processor) {
        // jshint validthis: true
        var deferred;

        if (this instanceof Tab) {
            deferred = _defer({ source: this, target: null }, processor);
            _subscribe(this, this, "cancelled", deferred, {
                scheduler: Tab.Schedulers.scheduleNow
            });

            return this;
        }
        else {
            // not a tab
            throw new TypeError("invalid subject");
        }
    }
    Tab.prototype.onCancelled = onCancelled;

    //---------------------------------------------------------------------------------------------
    //- Tab.prototype.onReturned( processor ) >> thisTab
    //-
    function onReturned(processor) {
        // jshint validthis: true
        var deferred;

        if (this instanceof Tab) {
            deferred = _defer({ source: this, target: null }, processor);
            _subscribe(this, this, "returned", deferred);

            return this;
        }
        else {
            // not a tab
            throw new TypeError("invalid subject");
        }
    }
    Tab.prototype.onReturned = onReturned;

    //---------------------------------------------------------------------------------------------
    //- Tab.prototype.onSettled( processor ) >> thisTab
    //-
    function onSettled(processor) {
        // jshint validthis: true
        var deferred;

        if (this instanceof Tab) {
            deferred = _defer({ source: this, target: null }, processor);
            _subscribe(this, this, "settled", deferred);

            return this;
        }
        else {
            // not a tab
            throw new TypeError("invalid subject");
        }
    }
    Tab.prototype.onSettled = onSettled;

    //---------------------------------------------------------------------------------------------
    //- Tab.prototype.onThrown( processor ) >> thisTab
    //-
    function onThrown(processor) {
        // jshint validthis: true
        var deferred;

        if (this instanceof Tab) {
            // create source and target tabs
            deferred = _defer({ source: this, target: null }, processor);
            _subscribe(this, this, "thrown", deferred);

            return this;
        }
        else {
            // not a tab
            throw new TypeError("invalid subject");
        }
    }
    Tab.prototype.onThrown = onThrown;

    //---------------------------------------------------------------------------------------------
    //- Tab.prototype.reject( ?error, ...extraValues ) >> thisTab
    //-
    function reject(error) {
        // jshint validthis: true, unused: false
        return doThrow.apply(this, arguments).settle();
    }
    Tab.prototype.reject = reject;

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
    //- Tab.prototype.settle() >> thisTab
    //-
    function settle() {
        // jshint validthis: true
        if (this instanceof Tab) {
            if(!this._completed) {
                this._completed = "settled";
                _notify(this, "settled", arguments);
            }

            return this;
        }
        else {
            // not a tab
            throw new TypeError("invalid subject");
        }
    }
    Tab.prototype.settle = settle;

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

            if (!scheduler._requester.isCancelled()) {
                id = setImmediate(scheduler);

                scheduler._requester.onCancelled(function () {
                    clearImmediate(id);
                });
            }
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
        //- Tab.Schedulers.scheduleFirst( requester, callback )
        //-
        function scheduleFirst(requester, callback) {
            function scheduler() {
                if (!requester.isCancelled()) {
                    next.unshift(callback);
                    process();
                }
            }

            scheduler._requester = requester;

            return scheduler;
        }
        Schedulers.scheduleFirst = scheduleFirst;

        //-----------------------------------------------------------------------------------------
        //- Tab.Schedulers.scheduleLast( requester, callback )
        //-
        function scheduleLast(requester, callback) {
            function scheduler() {
                if (!requester.isCancelled()) {
                    last.push(callback);
                    process();
                }
            }

            scheduler._requester = requester;

            return scheduler;
        }
        Schedulers.scheduleLast = scheduleLast;

        //-----------------------------------------------------------------------------------------
        //- Tab.Schedulers.scheduleNext( requester, callback )
        //-
        function scheduleNext(requester, callback) {
            function scheduler() {
                if (!requester.isCancelled()) {
                    next.push(callback);
                    process();
                }
            }

            scheduler._requester = requester;

            return scheduler;
        }
        Schedulers.scheduleNext = scheduleNext;

        //-----------------------------------------------------------------------------------------
        //- Tab.Schedulers.scheduleNow( requester, callback )
        //-
        function scheduleNow(requester, callback) {
            function scheduler() {
                if (!requester.isCancelled()) {
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
        if (!contextProperties) {
            canUpdate = target && (!directives || !directives.noUpdate);

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
                        doReturn.apply(target, arguments);
                    }
                };
            }
        }
        else {
            return processor;
        }
    }
    Tab.X.defer = _defer;

    //---------------------------------------------------------------------------------------------
    //- Tab.X.notify( source, type, args ) >> source
    //-
    function _notify(source, type, args) {
        var callbacks, i, n;

        if (!source._callbacks) {
            return;
        }

        if (!source._callbacks[type]) {
            return;
        }

        // notify all subscribers
        callbacks = source._callbacks[type];
        for (i = 0, n = callbacks.length; i < n; i += 1) {
            callbacks[i].call(null, args);
        }

        return source;
    }
    Tab.X.notify = _notify;

    //---------------------------------------------------------------------------------------------
    //- Tab.X.subscribe( subscriber, source, type, deferred, ?directives ) >> subscriber
    //-
    //- accepts directives:
    //- * scheduler
    //-
    function _subscribe(subscriber, source, type, deferred, directives) {
        var scheduler;

        if (!source._callbacks) {
            source._callbacks = {};
        }

        if (!source._callbacks[type]) {
            source._callbacks[type] = [];
        }

        // prepare scheduler - use ScheduleNext as a default
        scheduler = (directives && directives.scheduler) || Tab.Schedulers.scheduleNext;

        // prepare subscriber - create one if none given
        subscriber = subscriber || construct();

        // subscribe
        source._callbacks[type].push(scheduler.bind(subscriber, deferred));

        return subscriber;
    }
    Tab.X.subscribe = _subscribe;

    //*********************************************************************************************
    //*********************************************************************************************

    return Tab;

}(window));

//#################################################################################################
//# CALLBACKS
//#################################################################################################

(function (Tab) {
    "use strict";

    //---------------------------------------------------------------------------------------------
    //- Tab.capture( target, ?processor ) >> newFunction
    //- Tab.capture( target, message, ?processor ) >> newFunction
    //-
    function capture(target, processor) {
        var message,
            processReturn, captor;

        // process arguments
        target = Tab.convert(target);
        if (typeof arguments[1] === "string") {
            message = arguments[1];
            processor = arguments[2];
        }

        // create a function to capture the deferred arguments, bind the message
        if (message) {
            processReturn = Tab.prototype.doReturn.bind(target, message);
        }
        else {
            processReturn = Tab.prototype.doReturn.bind(target);
        }

        if (processor) {
            // create a captor function
            captor = function () {
                // jshint validthis: true

                // capture the arguments
                processReturn.apply(null, arguments);

                // execute processor
                return processor.apply(this, arguments);
            };

            // ensure captor can be used as 'new' constructor 
            captor.prototype = Object.create(processor.prototype);
            captor.prototype.constructor = captor;

            return Tab.X.defer({ target: null }, captor);
        }
        else {
            return Tab.X.defer(null, function () {
                processReturn.apply(null, arguments);
            });
        }
    }
    Tab.capture = capture;

    //---------------------------------------------------------------------------------------------
    //- Tab.captureWith( target, ?processor ) >> newFunction
    //- Tab.captureWith( target, message, ?processor ) >> newFunction
    //-
    function captureWith(target, processor) {
        var message,
            processReturn, captor;

        // process arguments
        target = Tab.convert(target);
        if (typeof arguments[1] === "string") {
            message = arguments[1];
            processor = arguments[2];
        }

        // create a function to capture the deferred subject and arguments, bind the message
        if (message) {
            processReturn = Tab.prototype.doReturn.bind(target, message);
        }
        else {
            processReturn = Tab.prototype.doReturn.bind(target);
        }

        if (processor) {
            // create a captor function
            captor = function () {
                // jshint validthis: true
                var bindings;

                // bind the subject and arguments
                bindings = [this].concat(arguments);
                processReturn.apply(null, bindings);

                // execute processor
                return processor.apply(this, bindings);
            };

            // ensure captor can be used as 'new' constructor 
            captor.prototype = Object.create(processor.prototype);
            captor.prototype.constructor = captor;

            return Tab.X.defer({ target: null }, captor);
        }
        else {
            return Tab.X.defer(null, function () {
                // jshint validthis: true
                processReturn.apply(null, [this].concat(arguments));
            });
        }
    }
    Tab.captureWith = captureWith;

    //---------------------------------------------------------------------------------------------
    //- Tab.defer() >> undefined
    //- Tab.defer( target, ?processor ) >> newFunction
    //-
    function defer(target, processor) {
        target = (target != null) ? Tab.convert(target) : null;
        return Tab.X.defer({ target: target }, processor);
    }
    Tab.defer = defer;

    //---------------------------------------------------------------------------------------------
    //- Tab.deferReturn( target ) >> newFunction
    //-
    function deferReturn(target) {
        target = Tab.convert(target);
        return Tab.X.defer(null, Tab.prototype.doReturn.bind(target));
    }
    Tab.deferReturn = deferReturn;

    //---------------------------------------------------------------------------------------------
    //- Tab.deferThrow( target ) >> newFunction
    //-
    function deferThrow(target) {
        target = Tab.convert(target);
        return Tab.X.defer(null, Tab.prototype.doThrow.bind(target));
    }
    Tab.deferThrow = deferThrow;

    //---------------------------------------------------------------------------------------------
    //- Tab.deferWith( target, ?processor ) >> newFunction
    //-
    function deferWith(target, processor) {
        var deferrer;

        target = Tab.convert(target);
        if (processor) {
            // create a deferrer function
            deferrer = function () {
                // jshint validthis: true
                return processor.apply(null, [this].concat(arguments));
            };

            // ensure deferrer can be used as 'new' constructor 
            deferrer.prototype = Object.create(processor.prototype);
            deferrer.prototype.constructor = deferrer;

            return Tab.X.defer({ target: target }, deferrer);
        }
        else {
            return Tab.X.defer(null, function () {
                // jshint validthis: true
                Tab.prototype.doReturn.apply(null, [this].concat(arguments));
            });
        }
    }
    Tab.deferWith = deferWith;

    //---------------------------------------------------------------------------------------------
    //- Tab.trace( target, ?processor ) >> newFunction
    //- Tab.trace( target, message, ?processor ) >> newFunction
    //-
    function trace(target, processor) {
        var message,
            processReturn, tracer;

        // process arguments
        target = Tab.convert(target);
        if (typeof arguments[1] === "string") {
            message = arguments[1];
            processor = arguments[2];
        }

        // create a function to capture the deferred subject, arguments and result, bind the message
        if (message) {
            processReturn = Tab.prototype.doReturn.bind(target, message);
        }
        else {
            processReturn = Tab.prototype.doReturn.bind(target);
        }

        if (processor) {
            // create a tracer function
            tracer = function () {
                var bindings, result;

                // bind the arguments
                bindings = [].concat(arguments);

                // execute processor
                try {
                    result = processor.apply(this, arguments);

                    // bind the result
                    if (Tab.context._deferred) {
                        bindings.push("deferred");
                    }
                    else {
                        bindings.push("returned").push(result);
                    }
                    processReturn.apply(null, bindings);

                    return result;
                }
                catch (error) {
                    // bind the error
                    bindings.push("thrown").push(error);
                    processReturn.apply(null, bindings);

                    throw error;
                }
            };

            // ensure tracer can be used as 'new' constructor 
            tracer.prototype = Object.create(processor.prototype);
            tracer.prototype.constructor = tracer;

            return Tab.X.defer({ target: null }, tracer);
        }
        else {
            return Tab.X.defer(null, function () {
                processReturn.apply(null, [].concat(arguments).push("returned"));
            });
        }
    }
    Tab.trace = trace;

    //---------------------------------------------------------------------------------------------
    //- Tab.traceWith( target, ?processor ) >> newFunction
    //- Tab.traceWith( target, message, ?processor ) >> newFunction
    //-
    function traceWith(target, processor) {
        var message,
            processReturn, tracer;

        // process arguments
        target = Tab.convert(target);
        if (typeof arguments[1] === "string") {
            message = arguments[1];
            processor = arguments[2];
        }

        // create a function to capture the deferred subject, arguments and result, bind the message
        if (message) {
            processReturn = Tab.prototype.doReturn.bind(target, message);
        }
        else {
            processReturn = Tab.prototype.doReturn.bind(target);
        }

        if (processor) {
            // create a tracer function
            tracer = function () {
                // jshint validthis: true
                var bindings, result;

                // bind the subject and arguments
                bindings = [this].concat(arguments);

                // execute processor
                try {
                    result = processor.apply(this, bindings);

                    // bind the result
                    if (Tab.context._deferred) {
                        bindings.push("deferred");
                    }
                    else {
                        bindings.push("returned").push(result);
                    }
                    processReturn.apply(null, bindings);

                    return result;
                }
                catch (error) {
                    // bind the error
                    bindings.push("thrown").push(error);
                    processReturn.apply(null, bindings);

                    throw error;
                }
            };

            // ensure tracer can be used as 'new' constructor 
            tracer.prototype = Object.create(processor.prototype);
            tracer.prototype.constructor = tracer;

            return Tab.X.defer({ target: null }, tracer);
        }
        else {
            return Tab.X.defer(null, function () {
                // jshint validthis: true
                processReturn.apply(null, [this].concat(arguments).push("returned"));
            });
        }
    }
    Tab.traceWith = traceWith;

}(Tab));
