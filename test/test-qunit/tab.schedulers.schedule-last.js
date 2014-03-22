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

/*global window: true, QUnit: true, Tab: true */

(function (global) {
	"use strict";
	// jshint quotmark: false, es3: false
    var thisUndefined = (function () { return this; }).call(undefined),
        setImmediate;

    if (global.setImmediate) {
        setImmediate = global.setImmediate;
    }
    else {
        setImmediate = function (callback) { return global.setTimeout(callback, 0); };
    }
  
    QUnit.module("Tab.Schedulers.scheduleLast()");

    QUnit.test("Tab.Schedulers.scheduleLast object", function() {
        QUnit.expect(2);
      
        QUnit.strictEqual(typeof Tab.Schedulers.scheduleLast, "function", 'typeof Tab.Schedulers.scheduleLast === "function"');
        QUnit.strictEqual(Tab.Schedulers.scheduleLast.length, 4, 'Tab.Schedulers.scheduleLast.length === 4');
    });

    QUnit.asyncTest("Tab.Schedulers.scheduleLast(null, function () { currentTick = Tab.Schedulers.tick; value += 1; }, void 0, [argument]) - then scheduleNext", function() {
        QUnit.expect(10);
        QUnit.stop(); // add an additional semaphore
      
        var firstTick = Tab.Schedulers.tick,
            currentTick,
            value = 0,
            argument = "argument";

        Tab.Schedulers.scheduleLast(null, function () {
            QUnit.start();

            currentTick = Tab.Schedulers.tick;
            value += 1;
            QUnit.ok(true, 'scheduleLast executed');

            QUnit.strictEqual(value, 2, 'value === 2');
            QUnit.strictEqual(currentTick, firstTick + 1, 'currentTick === firstTick + 1');

            // processor called with thisUndefined
            QUnit.strictEqual(this, thisUndefined, 'processor.call(subject, argument) - this === thisUndefined');

            // processor called with returned value
            QUnit.strictEqual(arguments.length, 1, 'processor.call(subject, argument) - arguments.length === 1');
            QUnit.strictEqual(arguments[0], argument, 'processor.call(subject, argument) - arguments[0] === argument');
        }, void 0, [argument]);

        Tab.Schedulers.scheduleNext(null, function () {
            QUnit.start();

            currentTick = Tab.Schedulers.tick;
            value += 1;
            QUnit.ok(true, 'scheduleNext executed');

            QUnit.strictEqual(value, 1, 'value === 1');
            QUnit.strictEqual(currentTick, firstTick + 1, 'currentTick === firstTick + 1');
        });

        QUnit.strictEqual(currentTick, undefined, 'currentTick === undefined');
    });

    QUnit.asyncTest("Tab.Schedulers.scheduleLast(requester, function () { currentTick = Tab.Schedulers.tick; }) - then scheduleNext", function() {
        QUnit.expect(7);
        QUnit.stop(); // add an additional semaphore
      
        var firstTick = Tab.Schedulers.tick,
            currentTick,
            value = 0,
            requester = new Tab();

        Tab.Schedulers.scheduleLast(requester, function () {
            QUnit.start();

            currentTick = Tab.Schedulers.tick;
            value += 1;
            QUnit.ok(true, 'scheduleLast executed');

            QUnit.strictEqual(value, 2, 'value === 2');
            QUnit.strictEqual(currentTick, firstTick + 1, 'currentTick === firstTick + 1');
        });

        Tab.Schedulers.scheduleNext(null, function () {
            QUnit.start();

            currentTick = Tab.Schedulers.tick;
            value += 1;
            QUnit.ok(true, 'scheduleNext executed');

            QUnit.strictEqual(value, 1, 'value === 1');
            QUnit.strictEqual(currentTick, firstTick + 1, 'currentTick === firstTick + 1');
        });

        QUnit.strictEqual(currentTick, undefined, 'currentTick === undefined');
    });

    QUnit.asyncTest("Tab.Schedulers.scheduleLast(null, function () { nested scheduleLast; }) - then scheduleLast", function() {
        QUnit.expect(10);
        QUnit.stop(); // add an additional semaphore
      
        var firstTick = Tab.Schedulers.tick,
            currentTick,
            value = 0,
            requester = new Tab();

        Tab.Schedulers.scheduleLast(requester, function () {

            Tab.Schedulers.scheduleLast(null, function () {
                QUnit.start();

                currentTick = Tab.Schedulers.tick;
                value += 1;
                QUnit.ok(true, 'nested scheduleLast executed');

                QUnit.strictEqual(value, 3, 'value === 3');
                QUnit.strictEqual(currentTick, firstTick + 2, 'currentTick === firstTick + 2');
            });

            currentTick = Tab.Schedulers.tick;
            value += 1;
            QUnit.ok(true, 'first scheduleLast executed');

            QUnit.strictEqual(value, 1, 'value === 1');
            QUnit.strictEqual(currentTick, firstTick + 1, 'currentTick === firstTick + 1');
        });

        Tab.Schedulers.scheduleLast(null, function () {
            QUnit.start();

            currentTick = Tab.Schedulers.tick;
            value += 1;
            QUnit.ok(true, 'second scheduleLast executed');

            QUnit.strictEqual(value, 2, 'value === 2');
            QUnit.strictEqual(currentTick, firstTick + 1, 'currentTick === firstTick + 1');
        });

        QUnit.strictEqual(currentTick, undefined, 'currentTick === undefined');
    });

    QUnit.asyncTest("Tab.Schedulers.scheduleLast(null, function () { nested scheduleNext and scheduleLast; }) - then scheduleLast", function() {
        QUnit.expect(13);
        QUnit.stop(); // add an additional semaphore
        QUnit.stop(); // add an additional semaphore
      
        var firstTick = Tab.Schedulers.tick,
            currentTick,
            value = 0,
            requester = new Tab();

        Tab.Schedulers.scheduleLast(requester, function () {

            Tab.Schedulers.scheduleLast(null, function () {
                QUnit.start();

                currentTick = Tab.Schedulers.tick;
                value += 1;
                QUnit.ok(true, 'nested scheduleLast executed');

                QUnit.strictEqual(value, 4, 'value === 4');
                QUnit.strictEqual(currentTick, firstTick + 2, 'currentTick === firstTick + 2');
            });

            Tab.Schedulers.scheduleNext(null, function () {
                QUnit.start();

                currentTick = Tab.Schedulers.tick;
                value += 1;
                QUnit.ok(true, 'nested scheduleNext executed');

                QUnit.strictEqual(value, 2, 'value === 2');
                QUnit.strictEqual(currentTick, firstTick + 2, 'currentTick === firstTick + 2');
            });

            currentTick = Tab.Schedulers.tick;
            value += 1;
            QUnit.ok(true, 'first scheduleLast executed');

            QUnit.strictEqual(value, 1, 'value === 1');
            QUnit.strictEqual(currentTick, firstTick + 1, 'currentTick === firstTick + 1');
        });

        Tab.Schedulers.scheduleLast(null, function () {
            QUnit.start();

            currentTick = Tab.Schedulers.tick;
            value += 1;
            QUnit.ok(true, 'second scheduleLast executed');

            QUnit.strictEqual(value, 3, 'value === 3');
            QUnit.strictEqual(currentTick, firstTick + 2, 'currentTick === firstTick + 2');
        });

        QUnit.strictEqual(currentTick, undefined, 'currentTick === undefined');
    });

    QUnit.test("Tab.Schedulers.scheduleLast(requester, function () { currentTick = Tab.Schedulers.tick; }) - requester.cancel()", function() {
        QUnit.expect(1);
      
        var currentTick,
            requester = new Tab(),
            callback = function () {
                QUnit.ok(false, 'scheduler executed');
            };

        requester.cancel();
        Tab.Schedulers.scheduleFirst(requester, callback);

        QUnit.strictEqual(currentTick, undefined, 'currentTick === undefined');
    });

    QUnit.asyncTest("Tab.Schedulers.scheduleLast(requester, function () { currentTick = Tab.Schedulers.tick; }) - setImmediate(function () { requester.cancel(); })", function() {
        QUnit.expect(2);

        var currentTick,
            requester = new Tab();

        setImmediate(function () { // can not use a Tab function between scheduleLast only schedules a single item
            QUnit.start();
                
            requester.cancel();
            QUnit.ok(true, 'requester cancelled');
        });

        Tab.Schedulers.scheduleLast(requester, function () {
            QUnit.ok(false, 'scheduler executed');
        });

        QUnit.strictEqual(currentTick, undefined, 'currentTick === undefined');
    });

}(window));

