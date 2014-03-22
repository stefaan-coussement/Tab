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
	// jshint quotmark: false
    var thisUndefined = (function () { return this; }).call(undefined);
  
    QUnit.module("Tab.prototype.onThrown()");

    QUnit.test("Tab.prototype.onThrown object", function() {
        QUnit.expect(2);
      
        QUnit.strictEqual(typeof Tab.prototype.onThrown, "function", 'typeof Tab.prototype.onThrown === "function"');
        QUnit.strictEqual(Tab.prototype.onThrown.length, 1, 'Tab.prototype.onThrown.length === 1');
    });

    QUnit.asyncTest("tab = Tab.construct().onThrown(function () { turn = 1; }).doThrow(error)", function() {
        QUnit.expect(6);
      
        var turn = 0,
            error = "error",
            tab;

        tab = Tab.construct()
        .onThrown(function () {
            QUnit.start();

            turn = 1;
            QUnit.ok(true, "onThrown executed");
            QUnit.strictEqual(turn, 1, 'turn === 1');

            // processor called with source tab
            QUnit.strictEqual(this, thisUndefined, 'processor.call(subject, error) - this === thisUndefined');

            // processor called with returned value
            QUnit.strictEqual(arguments.length, 1, 'processor.call(subject, error) - arguments.length === 1');
            QUnit.strictEqual(arguments[0], error, 'processor.call(subject, error) - arguments[0] === error');
        })
        .doThrow(error);

        QUnit.strictEqual(turn, 0, 'turn === 0');
    });

    QUnit.asyncTest("tab = Tab.construct().doThrow(error).onThrown(function () { turn = 1; })", function() {
        QUnit.expect(6);
      
        var turn = 0,
            error = "error",
            tab;

        tab = Tab.construct()
        .doThrow(error)
        .onThrown(function () {
            QUnit.start();

            turn = 1;
            QUnit.ok(true, "onThrown executed");
            QUnit.strictEqual(turn, 1, 'turn === 1');

            // processor called with source tab
            QUnit.strictEqual(this, thisUndefined, 'processor.call(subject, error) - this === thisUndefined');

            // processor called with returned value
            QUnit.strictEqual(arguments.length, 1, 'processor.call(subject, error) - arguments.length === 1');
            QUnit.strictEqual(arguments[0], error, 'processor.call(subject, error) - arguments[0] === error');
        });

        QUnit.strictEqual(turn, 0, 'turn === 0');
    });

    QUnit.asyncTest("tab = Tab.construct().doThrow(error1).onThrown(function () { turn += 1; }).doThrow(error2)", function() {
        QUnit.expect(9);
        QUnit.stop(); // add an additional semaphore
      
        var turn = 0,
            error1 = "error1",
            error2 = "error2",
            tab;

        tab = Tab.construct()
        .doThrow(error1)
        .onThrown(function () {
            QUnit.start();

            turn += 1;
            QUnit.ok(true, "onThrown executed");

            // processor called with thisUndefined
            QUnit.strictEqual(this, thisUndefined, 'processor.call(subject, value) - this === thisUndefined');

            // processor called with returned value
            QUnit.strictEqual(arguments.length, 1, 'processor.call(subject, value) - arguments.length === 1');
            if (turn === 1) {
                QUnit.strictEqual(arguments[0], error1, 'processor.call(subject, error1) - arguments[0] === error1');
            }
            else {
                QUnit.strictEqual(arguments[0], error2, 'processor.call(subject, error2) - arguments[0] === error2');
            }
        })
        .doThrow(error2);

        QUnit.strictEqual(turn, 0, 'turn === 0');
    });

    QUnit.test("Tab.prototype.onThrown.call(object, function () {})", function() {
        QUnit.expect(1);
      
        var object = { name: "object" };

        QUnit.strictEqual((function () {
                try {
                    Tab.prototype.onThrown.call(object, function () {});
                }
                catch (e) {
                    return (e instanceof TypeError);
                }
            }()),
            true,
            'try ( Tab.prototype.onThrown.call(object, function () {}); } catch (e) { e instanceof TypeError }'
        );
    });

}());

