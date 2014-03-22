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
    var thisUndefined = (function () { return this; }).call(undefined);
  
    QUnit.module("Tab.Schedulers.scheduleNow()");

    QUnit.test("Tab.Schedulers.scheduleNow object", function() {
        QUnit.expect(2);
      
        QUnit.strictEqual(typeof Tab.Schedulers.scheduleNow, "function", 'typeof Tab.Schedulers.scheduleNow === "function"');
        QUnit.strictEqual(Tab.Schedulers.scheduleNow.length, 4, 'Tab.Schedulers.scheduleNow.length === 4');
    });

    QUnit.test("Tab.Schedulers.scheduleNow(null, function () { value = 1; }, void 0, [argument])", function() {
        QUnit.expect(5);
      
        var value = 0,
            argument = "argument";

        Tab.Schedulers.scheduleNow(null, function () {
            value = 1;
            QUnit.ok(true, 'scheduler executed');

            // processor called with thisUndefined
            QUnit.strictEqual(this, thisUndefined, 'processor.call(subject, argument) - this === thisUndefined');

            // processor called with returned value
            QUnit.strictEqual(arguments.length, 1, 'processor.call(subject, argument) - arguments.length === 1');
            QUnit.strictEqual(arguments[0], argument, 'processor.call(subject, argument) - arguments[0] === argument');
        }, void 0, [argument]);

        QUnit.strictEqual(value, 1, 'value === 1');
    });

    QUnit.test("Tab.Schedulers.scheduleNow(requester, function () { value = 1; })", function() {
        QUnit.expect(2);
      
        var value = 0,
            requester = new Tab();

        Tab.Schedulers.scheduleNow(requester, function () {
            value = 1;
            QUnit.ok(true, 'scheduler executed');
        });

        QUnit.strictEqual(value, 1, 'value === 1');
    });

    QUnit.test("Tab.Schedulers.scheduleNow(requester, function () { value = 1; }) - requester.cancel()", function() {
        QUnit.expect(1);
      
        var value = 0,
            requester = new Tab();

        requester.cancel();
        Tab.Schedulers.scheduleNow(requester, function () {
            value = 1;
            QUnit.ok(true, 'scheduler executed');
        });

        QUnit.strictEqual(value, 0, 'value === 0');
    });

}());

