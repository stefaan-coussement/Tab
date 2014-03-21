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
  
    QUnit.module("Tab.Schedulers.tick");

    QUnit.test("Tab.Schedulers.tick object", function() {
        QUnit.expect(1);
      
        QUnit.strictEqual(typeof Tab.Schedulers.tick, "number", 'typeof Tab.Schedulers.tick === "number"');
    });

    QUnit.asyncTest("Tab.Schedulers.tick - schedule - tick - schedule - tick", function() {
        QUnit.expect(5);
      
        var firstTick = Tab.Schedulers.tick,
            currentTick = Tab.Schedulers.tick;

        Tab.Schedulers.scheduleNext(null, function () {
            currentTick = Tab.Schedulers.tick;
            QUnit.ok(true, 'scheduleNext executed');
            QUnit.strictEqual(currentTick, firstTick + 1, 'currentTick === firstTick + 1');

            Tab.Schedulers.scheduleNext(null, function () {
                QUnit.start();

                currentTick = Tab.Schedulers.tick;
                QUnit.ok(true, 'nested scheduleNext executed');
                QUnit.strictEqual(currentTick, firstTick + 2, 'currentTick === firstTick + 2');
            });
        });

        QUnit.strictEqual(currentTick, firstTick, 'currentTick === firstTick');
    });

}());

