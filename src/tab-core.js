/*global window: true, Tab: true */

//#################################################################################################
//# CORE
//#################################################################################################

Tab = (function (global) {
    "use strict";
    var versionString = "1.0.0-alpha.1+1",

        version,
        context,

        es5;

    es5 = (function () {
        // jshint es3: false
        try {
            var test = {};
            test.return = function () {};
            return true;
        }
        catch (e) {}
    }());

    //*********************************************************************************************
    //*********************************************************************************************

    //---------------------------------------------------------------------------------------------
    //- new Tab() >> newTab
    //- Tab( object ) >> convertedTab
    //-
    function Tab() {
        if (this instanceof Tab) {
            return construct.apply(this, arguments);
        }
        else {
            return convert.apply(this, arguments);
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
    version = {};
    Tab.version = version;

    version.toString = function () {
        return versionString;
    };

    version.valueOf = function () {
        return parseInt(versionString.split("+")[1], 10);
    };

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
    //- Tab.newAccept( ?value, ...extraValues ) >> newTab
    //-
    function newAccept(value) {
        // jshint unused: false
        return accept.apply(construct(), arguments);
    }
    Tab.newAccept = newAccept;

    //---------------------------------------------------------------------------------------------
    //- Tab.newReject( ?error, ...extraValues ) >> newTab
    //-
    function newReject(error) {
        // jshint unused: false
        return reject.apply(construct(), arguments);
    }
    Tab.newReject = newReject;

    //---------------------------------------------------------------------------------------------
    //- Tab.newReturn( ?value, ...extraValues ) >> newTab
    //-
    function newReturn(value) {
        // jshint unused: false
        return doReturn.apply(construct(), arguments);
    }
    Tab.newReturn = newReturn;

    //---------------------------------------------------------------------------------------------
    //- Tab.newSettle() >> newTab
    //-
    function newSettle() {
        // jshint unused: false
        return settle.apply(construct(), arguments);
    }
    Tab.newSettle = newSettle;

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
                Tab.X.notify(this, "cancelled");
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
    //- Tab.prototype.accept( ?value, ...extraValues ) >> thisTab
    //-
    function accept(error) {
        // jshint validthis: true, unused: false
        return doReturn.apply(this, arguments).settle();
    }
    Tab.prototype.accept = accept;

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
            if (this._completed !== "settled") {
                deferred = Tab.X.defer({ source: this, target: null }, processor);
                if (this._completed) { // (this._completed === "cancelled")
                    Tab.Schedulers.scheduleNow(null, deferred);
                }
                else {
                    Tab.X.subscribe(null, this, "cancelled", deferred, {
                        scheduler: Tab.Schedulers.scheduleNow
                    });
                }
            }

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
            if (this._started === "returned") {
                deferred = Tab.X.defer({ source: this, target: null }, processor);
                if (this._completed) {
                    Tab.Schedulers.scheduleNext(this, deferred);
                }
                else {
                    Tab.X.subscribe(this, this, "returned", deferred);
                }
            }

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
            if (this._completed !== "cancelled") {
                deferred = Tab.X.defer({ source: this, target: null }, processor);
                if (this._completed) { // (this._completed === "settled")
                    Tab.Schedulers.scheduleNext(this, deferred);
                }
                else {
                    Tab.X.subscribe(this, this, "settled", deferred);
                }
            }

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
            if (this._started === "thrown") {
                deferred = Tab.X.defer({ source: this, target: null }, processor);
                if (this._completed) {
                    Tab.Schedulers.scheduleNext(this, deferred);
                }
                else {
                    Tab.X.subscribe(this, this, "thrown", deferred);
                }
            }

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
            if (this._completed) {
                if (this._completed === "cancelled") {
                    throw this._values[0].valueOf();
                }
            }
            else {
                this._values = arguments;
                this._started = "returned";
                Tab.X.notify(this, "returned", arguments);
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
            if (this._completed) {
                if (this._completed === "cancelled") {
                    throw this._values[0].valueOf();
                }
            }
            else {
                this._completed = "settled";
                Tab.X.notify(this, "settled");
                this._callbacks = null;
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
            if (this._completed) {
                if (this._completed === "cancelled") {
                    throw this._values[0].valueOf();
                }
            }
            else {
                this._values = arguments;
                this._started = "thrown";
                Tab.X.notify(this, "thrown", arguments);
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
            if (this.hasReturned()) {
                if ((this._values.length > 0) && (this._values[0] != null)) {
                    return this._values[0].toString();
                }
                else { // has returned without arguments
                    return;
                }
            }
            else if (this.hasThrown()) {
                if ((this._values.length > 0) && (this._values[0] != null)) {
                    throw this._values[0].valueOf();
                }
                else { // has thrown without arguments
                    throw undefined;
                }
            }
            else { // has not yet returned or thrown
                return;
            }
        }
        else { // not a tab
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
            if (this.hasReturned()) {
                if ((this._values.length > 0) && (this._values[0] != null)) {
                    return this._values[0].valueOf();
                }
                else { // has returned without arguments
                    return;
                }
            }
            if (this.hasThrown()) {
                if ((this._values.length > 0) && (this._values[0] != null)) {
                    throw this._values[0].valueOf();
                }
                else { // has thrown without arguments
                    throw undefined;
                }
            }
            else { // has not yet returned or thrown
                return;
            }
        }
        else { // not a tab
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
            tick = 0,

            setImmediate;

        if (global.setImmediate) {
            setImmediate = global.setImmediate;
        }
        else {
            setImmediate = function (callback) { return global.setTimeout(callback, 0); };
        }

        function processItem(item) {
            var requester = item.requester;

            if (!requester || !requester.isCancelled()) {
                item.callback();
            }
        }

        function processQueues() {
            var turn;

            tick += 1;

            if (next.length > 0) {
                // don't process newly added callbacks
                turn = next;
                next = [];

                while (turn.length > 0) {
                    processItem(turn.shift());
                }
            }

            if ((next.length === 0) && (last.length > 0)) {
                // don't process newly added callbacks
                turn = last;
                last = [];

                while (turn.length > 0) {
                    processItem(turn.shift());

                    // break when a 'next' callback newly added
                    if (next.length > 0) {
                        last = turn.concat(last); // reschedule remaining items in 'turn'
                        break;
                    }
                }
            }

            if ((next.length === 0) && (last.length === 0)) {
                processing = false;
            }
            else {
                // schedule next turn
                setImmediate(processQueues);
            }
        }

        function process() {
            if (!processing) {
                processing = true;
                setImmediate(processQueues);
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
            if (!requester || !requester.isCancelled()) {
                next.unshift({
                    requester: requester,
                    callback: callback
                });
                process();
            }
        }
        Schedulers.scheduleFirst = scheduleFirst;

        //-----------------------------------------------------------------------------------------
        //- Tab.Schedulers.scheduleLast( requester, callback )
        //-
        function scheduleLast(requester, callback) {
            if (!requester || !requester.isCancelled()) {
                last.push({
                    requester: requester,
                    callback: callback
                });
                process();
            }
        }
        Schedulers.scheduleLast = scheduleLast;

        //-----------------------------------------------------------------------------------------
        //- Tab.Schedulers.scheduleNext( requester, callback )
        //-
        function scheduleNext(requester, callback) {
            if (!requester || !requester.isCancelled()) {
                next.push({
                    requester: requester,
                    callback: callback
                });
                process();
            }
        }
        Schedulers.scheduleNext = scheduleNext;

        //-----------------------------------------------------------------------------------------
        //- Tab.Schedulers.scheduleNow( requester, callback )
        //-
        function scheduleNow(requester, callback) {
            if (!requester || !requester.isCancelled()) {
                callback();
            }
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
    Tab.X = (function () {
        var X = {};

        //-----------------------------------------------------------------------------------------
        //- Tab.X.es5
        //-
        X.es5 = es5;

        //-----------------------------------------------------------------------------------------
        //- Tab.X.defer( contextProperties, ?processor, ?directives ) >> newFunction
        //-
        //- accepts directives:
        //- * noUpdate
        //-
        function defer(contextProperties, processor, directives) {
            var target, deferred, canUpdate, pushContext;

            // set the _deferred flag in the outer context
            if (context._deferred === false) { //  not just falsy
                context._deferred = true;
            }

            // create deferred function
            if (contextProperties) {
                target = contextProperties && contextProperties.target;
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
                            if ((this instanceof deferred) && (typeof result !== "object")) {
                                result = this;
                            }

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
        X.defer = defer;

        //-----------------------------------------------------------------------------------------
        //- Tab.X.notify( source, type, args ) >> source
        //-
        function notify(source, type, args) {
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
        X.notify = notify;

        //-----------------------------------------------------------------------------------------
        //- Tab.X.subscribe( subscriber, source, type, deferred, ?directives ) >> subscriber
        //-
        //- accepts directives:
        //- * scheduler
        //-
        function subscribe(subscriber, source, type, deferred, directives) {
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
            source._callbacks[type].push(scheduler.bind(null, subscriber, deferred));

            return subscriber;
        }
        X.subscribe = subscribe;

        //-----------------------------------------------------------------------------------------

        return X;
    }());

    //*********************************************************************************************
    //*********************************************************************************************

    return Tab;

}(window));
