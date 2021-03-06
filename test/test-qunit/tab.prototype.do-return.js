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
  
    QUnit.module("Tab.prototype.doReturn()");

    QUnit.test("Tab.prototype.doReturn object", function() {
        QUnit.expect(2);
      
        QUnit.strictEqual(typeof Tab.prototype.doReturn, "function", 'typeof Tab.prototype.doReturn === "function"');
        QUnit.strictEqual(Tab.prototype.doReturn.length, 1, 'Tab.prototype.doReturn.length === 1');
    });

    QUnit.test("tab = Tab.construct().doReturn(value)", function() {
        QUnit.expect(5);
      
        var value = "value",
            tab = Tab.construct().doReturn(value);

        QUnit.strictEqual(tab.hasReturned(), true, 'tab.hasReturned() === true');
        QUnit.strictEqual(tab.hasThrown(), false, 'tab.hasThrown() === false');
        QUnit.strictEqual(tab.isCancelled(), false, 'tab.isCancelled() === false');
        QUnit.strictEqual(tab.isSettled(), false, 'tab.isSettled() === false');

        QUnit.strictEqual(tab.valueOf(), value, 'tab.valueOf === value');
    });

    QUnit.test("tab = Tab.construct().doReturn(value1).doReturn(value2)", function() {
        QUnit.expect(5);
      
        var value1 = "value1",
            value2 = "value2",
            tab = Tab.construct().doReturn(value1).doReturn(value2);

        QUnit.strictEqual(tab.hasReturned(), true, 'tab.hasReturned() === true');
        QUnit.strictEqual(tab.hasThrown(), false, 'tab.hasThrown() === false');
        QUnit.strictEqual(tab.isCancelled(), false, 'tab.isCancelled() === false');
        QUnit.strictEqual(tab.isSettled(), false, 'tab.isSettled() === false');

        QUnit.strictEqual(tab.valueOf(), value2, 'tab.valueOf === value2');
    });

    QUnit.test("tab = Tab.construct().doReturn(value).cancel()", function() {
        QUnit.expect(2);
      
        var value = "value",
            tab = Tab.construct().doReturn(value).cancel();

        QUnit.strictEqual(tab.isCancelled(), true, 'tab.isCancelled() === true');

        QUnit.strictEqual(
            (function () {
                try { tab.valueOf(); } catch (e) { return e.message; }
            }()),
            "cancelled",
            'try { tab.valueOf(); } catch (e) { e.message === "cancelled" }'
        );
    });

    QUnit.test("tab = Tab.construct().doReturn(value).settle()", function() {
        QUnit.expect(2);
      
        var value = "value",
            tab = Tab.construct().doReturn(value).settle();

        QUnit.strictEqual(tab.isSettled(), true, 'tab.isSettled() === true');

        QUnit.strictEqual(tab.valueOf(), value, 'tab.valueOf === value');
    });

    QUnit.test("tab = Tab.construct().doReturn(value).doThrow(error)", function() {
        QUnit.expect(2);
      
        var value = "value",
            error = "error",
            tab = Tab.construct().doReturn(value).doThrow(error);

        QUnit.strictEqual(tab.hasThrown(), true, 'tab.hasThrown() === true');

        QUnit.strictEqual(
            (function () {
                try { tab.valueOf(); } catch (e) { return e; }
            }()),
            error,
            'try { tab.valueOf(); } catch (e) { e === error }'
        );
    });

    QUnit.test("tab = Tab.construct().cancel().doReturn()", function() {
        QUnit.expect(1);
          
        var tab;
 
        QUnit.strictEqual(
            (function () {
                try { tab = Tab.construct().cancel().doReturn(); } catch (e) { return e.message; }
            }()),
            "cancelled",
            'try { Tab.construct().cancel().doReturn(); } catch (e) { e.message === "cancelled" }'
        );
    });

    QUnit.test("tab = Tab.construct().settle().doReturn(value)", function() {
        QUnit.expect(2);
      
        var value = "value",
            tab = Tab.construct().settle().doReturn(value);

        QUnit.strictEqual(tab.isSettled(), true, 'tab.isSettled() === true');

        QUnit.strictEqual(tab.valueOf(), undefined, 'tab.valueOf() === undefined');
    });

    QUnit.test("tab = Tab.construct().doThrow(error).doReturn(value)", function() {
        QUnit.expect(2);
      
        var error = "error",
            value = "value",
            tab = Tab.construct().doThrow(error).doReturn(value);

        QUnit.strictEqual(tab.hasThrown(), false, 'tab.hasThrown() === false');

        QUnit.strictEqual(tab.valueOf(), value, 'tab.valueOf() === value');
    });

    QUnit.asyncTest("tab = Tab.construct().onReturned(function () { value = 1; }).doReturn()", function() {
        QUnit.expect(3);
      
        var value = 0,
            tab;

        tab = Tab.construct()
        .onReturned(function () {
            QUnit.start();

            value = 1;
            QUnit.ok(true, "onReturned executed");
            QUnit.strictEqual(value, 1, 'value === 1');
        })
        .doReturn();

        QUnit.strictEqual(value, 0, 'value === 0');
    });

    QUnit.test("Tab.prototype.doReturn.call(object)", function() {
        QUnit.expect(1);
      
        var object = { name: "object" };

        QUnit.strictEqual((function () {
                try {
                    Tab.prototype.doReturn.call(object);
                }
                catch (e) {
                    return (e instanceof TypeError);
                }
            }()),
            true,
            'try ( Tab.prototype.doReturn.call(object); } catch (e) { e instanceof TypeError }'
        );
    });

}());

