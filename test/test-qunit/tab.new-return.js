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
  
    QUnit.module("Tab.newReturn()");

    QUnit.test("Tab.newReturn object", function() {
        QUnit.expect(2);
      
        QUnit.strictEqual(typeof Tab.newReturn, "function", 'typeof Tab.newReturn === "function"');
        QUnit.strictEqual(Tab.newReturn.length, 1, 'Tab.newReturn.length === 1');
    });

    QUnit.test("newTab = Tab.newReturn(value)", function() {
        QUnit.expect(6);
      
        var value = "value",
            newTab = Tab.newReturn(value);

        QUnit.strictEqual(Tab.isTab(newTab), true, 'Tab.isTab(newTab) === true');

        QUnit.strictEqual(newTab.hasReturned(), true, 'newTab.hasReturned() === true');
        QUnit.strictEqual(newTab.hasThrown(), false, 'newTab.hasThrown() === false');
        QUnit.strictEqual(newTab.isCancelled(), false, 'newTab.isCancelled() === false');
        QUnit.strictEqual(newTab.isSettled(), false, 'newTab.isSettled() === false');

        QUnit.strictEqual(newTab.valueOf(), value, 'newTab.valueOf === value');
    });

    QUnit.test("tab = Tab.newReturn(value1).doReturn(value2)", function() {
        QUnit.expect(5);
      
        var value1 = "value1",
            value2 = "value2",
            tab = Tab.newReturn(value1).doReturn(value2);

        QUnit.strictEqual(tab.hasReturned(), true, 'tab.hasReturned() === true');
        QUnit.strictEqual(tab.hasThrown(), false, 'tab.hasThrown() === false');
        QUnit.strictEqual(tab.isCancelled(), false, 'tab.isCancelled() === false');
        QUnit.strictEqual(tab.isSettled(), false, 'tab.isSettled() === false');

        QUnit.strictEqual(tab.valueOf(), value2, 'tab.valueOf === value2');
    });

}());

