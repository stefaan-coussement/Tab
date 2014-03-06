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
  
    QUnit.module("Tab.prototype.settle()");

    QUnit.test("Tab.prototype.settle object", function() {
        QUnit.expect(3);
      
        QUnit.strictEqual(typeof Tab.prototype.settle, "function", 'typeof Tab.prototype.settle === "function"');
        QUnit.strictEqual(Object.prototype.toString.call(Tab.prototype.settle), "[object Function]", 'Object.prototype.toString.call(Tab.prototype.settle) === "[object Function]"');

        QUnit.strictEqual(Tab.prototype.settle.length, 0, 'Tab.prototype.settle.length === 0');
    });

    QUnit.test("tab = Tab.construct().settle()", function() {
        QUnit.expect(5);
      
        var tab = Tab.construct().settle();

        QUnit.strictEqual(tab.hasReturned(), false, 'tab.hasReturned() === false');
        QUnit.strictEqual(tab.hasThrown(), false, 'tab.hasThrown() === false');
        QUnit.strictEqual(tab.isCancelled(), false, 'tab.isCancelled() === false');
        QUnit.strictEqual(tab.isSettled(), true, 'tab.isSettled() === true');

        QUnit.strictEqual(tab.valueOf(), undefined, 'tab.valueOf() === undefined');
    });

    QUnit.test("tab = Tab.construct().settle().cancel()", function() {
        QUnit.expect(2);
      
        var tab = Tab.construct().settle().cancel();

        QUnit.strictEqual(tab.isCancelled(), false, 'tab.isCancelled() === false');

        QUnit.strictEqual(tab.valueOf(), undefined, 'tab.valueOf() === undefined');
    });

    QUnit.test("tab = Tab.construct().settle().doReturn()", function() {
        QUnit.expect(2);
      
        var tab = Tab.construct().settle().doReturn();

        QUnit.strictEqual(tab.hasReturned(), false, 'tab.hasReturned() === false');

        QUnit.strictEqual(tab.valueOf(), undefined, 'tab.valueOf() === undefined');
    });

    QUnit.test("tab = Tab.construct().settle().doThrow()", function() {
        QUnit.expect(2);
      
        var tab = Tab.construct().settle().doThrow();

        QUnit.strictEqual(tab.hasThrown(), false, 'tab.hasThrown() === false');

        QUnit.strictEqual(tab.valueOf(), undefined, 'tab.valueOf() === undefined');
    });

    QUnit.test("tab = Tab.construct().cancel().settle()", function() {
        QUnit.expect(1);
          
        var tab;
 
        QUnit.strictEqual(
            (function () {
                try { tab = Tab.construct().cancel().settle(); } catch (e) { return e.message; }
            }()),
            "cancelled",
            'try { Tab.construct().cancel().settle(); } catch (e) { e.message === "cancelled" }'
        );
    });

    QUnit.test("tab = Tab.construct().doReturn(value).settle()", function() {
        QUnit.expect(2);
      
        var value = "value",
            tab = Tab.construct().doReturn(value).settle();

        QUnit.strictEqual(tab.hasReturned(), true, 'tab.hasReturned() === true');

        QUnit.strictEqual(tab.valueOf(), value, 'tab.valueOf() === value');
    });

    QUnit.test("tab = Tab.construct().doReturn(value1).settle().doReturn(value2)", function() {
        QUnit.expect(2);
      
        var value1 = "value1",
            value2 = "value2",
            tab = Tab.construct().doReturn(value1).settle().doReturn(value2);

        QUnit.strictEqual(tab.hasReturned(), true, 'tab.hasReturned() === true');

        QUnit.strictEqual(tab.valueOf(), value1, 'tab.valueOf() === value1');
    });

    QUnit.test("tab = Tab.construct().doThrow(error).settle()", function() {
        QUnit.expect(2);
      
        var error = "error",
            tab = Tab.construct().doThrow(error).settle();

        QUnit.strictEqual(tab.hasThrown(), true, 'tab.hasThrown() === true');

        QUnit.strictEqual(
            (function () {
                try { tab.valueOf(); } catch (e) { return e; }
            }()),
            error,
            'try { tab.valueOf(); } catch (e) { e === error }'
        );
    });

    QUnit.test("tab = Tab.construct().doThrow(error1).settle().doThrow(error2)", function() {
        QUnit.expect(2);
      
        var error1 = "error1",
            error2 = "error2",
            tab = Tab.construct().doThrow(error1).settle().doThrow(error2);

        QUnit.strictEqual(tab.hasThrown(), true, 'newTab.hasThrown() === true');

        QUnit.strictEqual(
            (function () {
                try { tab.valueOf(); } catch (e) { return e; }
            }()),
            error1,
            'try { tab.valueOf(); } catch (e) { e === error1 }'
        );
    });

}());

