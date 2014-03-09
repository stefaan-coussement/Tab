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
  
    QUnit.module("Tab.construct()");

    QUnit.test("Tab.construct object", function() {
        QUnit.expect(3);
      
        QUnit.strictEqual(typeof Tab.construct, "function", 'typeof Tab.construct === "function"');
        QUnit.strictEqual(Object.prototype.toString.call(Tab.construct), "[object Function]", 'Object.prototype.toString.call(Tab.construct) === "[object Function]"');

        QUnit.strictEqual(Tab.construct.length, 0, 'Tab.construct.length === 0');
    });

    QUnit.test("newTab = Tab.construct()", function() {
        QUnit.expect(6);
      
        var newTab = Tab.construct();

        QUnit.strictEqual(Tab.isTab(newTab), true, 'Tab.isTab(newTab) === true');

        QUnit.strictEqual(newTab.hasReturned(), false, 'newTab.hasReturned() === false');
        QUnit.strictEqual(newTab.hasThrown(), false, 'newTab.hasThrown() === false');
        QUnit.strictEqual(newTab.isCancelled(), false, 'newTab.isCancelled() === false');
        QUnit.strictEqual(newTab.isSettled(), false, 'newTab.isSettled() === false');

        QUnit.strictEqual(newTab.valueOf(), undefined, 'newTab.valueOf() === undefined');
    });

}());

