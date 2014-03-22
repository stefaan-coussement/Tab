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
  
    QUnit.module("Tab.prototype.cancel()");

    QUnit.test("Tab.prototype.cancel object", function() {
        QUnit.expect(2);
      
        QUnit.strictEqual(typeof Tab.prototype.cancel, "function", 'typeof Tab.prototype.cancel === "function"');
        QUnit.strictEqual(Tab.prototype.cancel.length, 0, 'Tab.prototype.cancel.length === 0');
    });

    QUnit.test("tab = Tab.construct().cancel()", function() {
        QUnit.expect(5);
      
        var tab = Tab.construct().cancel();

        QUnit.strictEqual(tab.hasReturned(), false, 'tab.hasReturned() === false');
        QUnit.strictEqual(tab.hasThrown(), true, 'tab.hasThrown() === true');
        QUnit.strictEqual(tab.isCancelled(), true, 'tab.isCancelled() === true');
        QUnit.strictEqual(tab.isSettled(), false, 'tab.isSettled() === false');

        QUnit.strictEqual(
            (function () {
                try { tab.valueOf(); } catch (e) { return e.message; }
            }()),
            "cancelled",
            'try { tab.valueOf(); } catch (e) { e.message === "cancelled" }'
        );
    });

    QUnit.test("tab = Tab.construct().cancel().cancel()", function() {
        QUnit.expect(5);
      
        var tab = Tab.construct().cancel().cancel();

        QUnit.strictEqual(tab.hasReturned(), false, 'tab.hasReturned() === false');
        QUnit.strictEqual(tab.hasThrown(), true, 'tab.hasThrown() === true');
        QUnit.strictEqual(tab.isCancelled(), true, 'tab.isCancelled() === true');
        QUnit.strictEqual(tab.isSettled(), false, 'tab.isSettled() === false');

        QUnit.strictEqual(
            (function () {
                try { tab.valueOf(); } catch (e) { return e.message; }
            }()),
            "cancelled",
            'try { tab.valueOf(); } catch (e) { e.message === "cancelled" }'
        );
    });

    QUnit.asyncTest("tab = Tab.construct().onCancelled(function () { value = 1; }).cancel()", function() {
        QUnit.expect(3);
      
        var value = 0,
            tab;

        tab = Tab.construct()
        .onCancelled(function () {
            QUnit.start();

            value = 1;
            QUnit.ok(true, "onCancelled executed");
            QUnit.strictEqual(value, 1, 'value === 1');
        })
        .cancel();

        QUnit.strictEqual(value, 1, 'value === 1');
    });

    QUnit.test("Tab.prototype.cancel.call(object)", function() {
        QUnit.expect(1);
      
        var object = { name: "object" };

        QUnit.strictEqual((function () {
                try {
                    Tab.prototype.cancel.call(object);
                }
                catch (e) {
                    return (e instanceof TypeError);
                }
            }()),
            true,
            'try ( Tab.prototype.cancel.call(object); } catch (e) { e instanceof TypeError }'
        );
    });

}());

