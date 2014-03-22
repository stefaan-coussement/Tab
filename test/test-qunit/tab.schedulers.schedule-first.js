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

/*global QUnit: true, Tab: true */

(function () {
	"use strict";
	// jshint quotmark: false, es3: false
  
    QUnit.module("Tab.Schedulers.scheduleFirst()");

    QUnit.test("Tab.Schedulers.scheduleFirst object", function() {
        QUnit.expect(2);
      
        QUnit.strictEqual(typeof Tab.Schedulers.scheduleFirst, "function", 'typeof Tab.Schedulers.scheduleFirst === "function"');
        QUnit.strictEqual(Tab.Schedulers.scheduleFirst.length, 2, 'Tab.Schedulers.scheduleFirst.length === 2');
    });

    QUnit.asyncTest("Tab.Schedulers.scheduleFirst(null, function () { currentTick = Tab.Schedulers.tick; value += 1; }) - first scheduleNext", function() {
        QUnit.expect(7);
        QUnit.stop(); // add an additional semaphore
      
        var firstTick = Tab.Schedulers.tick,
            currentTick,
            value = 0;

        Tab.Schedulers.scheduleNext(null, function () {
            QUnit.start();

            currentTick = Tab.Schedulers.tick;
            value += 1;
            QUnit.ok(true, 'scheduleNext executed');

            QUnit.strictEqual(value, 2, 'value === 2');
            QUnit.strictEqual(currentTick, firstTick + 1, 'currentTick === firstTick + 1');
        });

        Tab.Schedulers.scheduleFirst(null, function () {
            QUnit.start();

            currentTick = Tab.Schedulers.tick;
            value += 1;
            QUnit.ok(true, 'scheduleFirst executed');

            QUnit.strictEqual(value, 1, 'value === 1');
            QUnit.strictEqual(currentTick, firstTick + 1, 'currentTick === firstTick + 1');
        });

        QUnit.strictEqual(currentTick, undefined, 'currentTick === undefined');
    });

    QUnit.asyncTest("Tab.Schedulers.scheduleFirst(requester, function () { currentTick = Tab.Schedulers.tick; }) - first scheduleNext", function() {
        QUnit.expect(7);
        QUnit.stop(); // add an additional semaphore
      
        var firstTick = Tab.Schedulers.tick,
            currentTick,
            value = 0,
            requester = new Tab();

        Tab.Schedulers.scheduleNext(null, function () {
            QUnit.start();

            currentTick = Tab.Schedulers.tick;
            value += 1;
            QUnit.ok(true, 'scheduleNext executed');

            QUnit.strictEqual(value, 2, 'value === 2');
            QUnit.strictEqual(currentTick, firstTick + 1, 'currentTick === firstTick + 1');
        });

        Tab.Schedulers.scheduleFirst(requester, function () {
            QUnit.start();

            currentTick = Tab.Schedulers.tick;
            value += 1;
            QUnit.ok(true, 'scheduleFirst executed');

            QUnit.strictEqual(value, 1, 'value === 1');
            QUnit.strictEqual(currentTick, firstTick + 1, 'currentTick === firstTick + 1');
        });

        QUnit.strictEqual(currentTick, undefined, 'currentTick === undefined');
    });

    QUnit.asyncTest("Tab.Schedulers.scheduleNext(null, function () { nested scheduleFirst; }) - then scheduleNext", function() {
        QUnit.expect(9);
        QUnit.stop(); // add an additional semaphore
      
        var firstTick = Tab.Schedulers.tick,
            currentTick,
            value = 0;

        Tab.Schedulers.scheduleNext(null, function () {
            Tab.Schedulers.scheduleFirst(null, function () {
                QUnit.start();

                currentTick = Tab.Schedulers.tick;
                value += 1;
                QUnit.ok(true, 'nested scheduleFirst executed');

                QUnit.strictEqual(value, 2, 'value === 2');
                QUnit.strictEqual(currentTick, firstTick + 2, 'currentTick === firstTick + 2');
            });

            currentTick = Tab.Schedulers.tick;
            QUnit.ok(true, 'scheduler executed');

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

    QUnit.test("Tab.Schedulers.scheduleFirst(requester, function () { currentTick = Tab.Schedulers.tick; }) - requester.cancel()", function() {
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

    QUnit.asyncTest("Tab.Schedulers.scheduleFirst(requester, function () { currentTick = Tab.Schedulers.tick; }) - scheduleFirst(function () { requester.cancel(); })", function() {
        QUnit.expect(2);

        var currentTick,
            requester = new Tab();

        Tab.Schedulers.scheduleFirst(requester, function () {
            QUnit.ok(false, 'scheduler executed');
        });
        Tab.Schedulers.scheduleFirst(null, function () {
            QUnit.start();
                
            requester.cancel();
            QUnit.ok(true, 'requester cancelled');
        });

        QUnit.strictEqual(currentTick, undefined, 'currentTick === undefined');
    });

}());

