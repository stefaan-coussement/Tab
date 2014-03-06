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
  
    QUnit.module("Tab.prototype.fulfill()");

    QUnit.test("Tab.prototype.fulfill object", function() {
        QUnit.expect(3);
      
        QUnit.strictEqual(typeof Tab.prototype.fulfill, "function", 'typeof Tab.prototype.fulfill === "function"');
        QUnit.strictEqual(Object.prototype.toString.call(Tab.prototype.fulfill), "[object Function]", 'Object.prototype.toString.call(Tab.prototype.fulfill) === "[object Function]"');

        QUnit.strictEqual(Tab.prototype.fulfill.length, 1, 'Tab.prototype.fulfill.length === 1');
    });

    QUnit.test("tab = Tab.construct().fulfill(value)", function() {
        QUnit.expect(5);
      
        var value = "value",
            tab = Tab.construct().fulfill(value);

        QUnit.strictEqual(tab.hasReturned(), true, 'tab.hasReturned() === true');
        QUnit.strictEqual(tab.hasThrown(), false, 'tab.hasThrown() === false');
        QUnit.strictEqual(tab.isCancelled(), false, 'tab.isCancelled() === false');
        QUnit.strictEqual(tab.isSettled(), true, 'tab.isSettled() === true');

        QUnit.strictEqual(tab.valueOf(), value, 'tab.valueOf() === value');
    });

    QUnit.test("tab = Tab.construct().fulfill(value1).doReturn(value2)", function() {
        QUnit.expect(5);
      
        var value1 = "value1",
            value2 = "value2",
            tab = Tab.construct().fulfill(value1).doReturn(value2);

        QUnit.strictEqual(tab.hasReturned(), true, 'tab.hasReturned() === true');
        QUnit.strictEqual(tab.hasThrown(), false, 'tab.hasThrown() === false');
        QUnit.strictEqual(tab.isCancelled(), false, 'tab.isCancelled() === false');
        QUnit.strictEqual(tab.isSettled(), true, 'tab.isSettled() === true');

        QUnit.strictEqual(tab.valueOf(), value1, 'tab.valueOf() === value1');
    });

}());

