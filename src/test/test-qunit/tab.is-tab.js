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
  
    QUnit.module("Tab.isTab()");

    QUnit.test("Tab.isTab object", function() {
        QUnit.expect(3);
      
        QUnit.strictEqual(typeof Tab.isTab, "function", 'typeof Tab.isTab === "function"');
        QUnit.strictEqual(Object.prototype.toString.call(Tab.isTab), "[object Function]", 'Object.prototype.toString.call(Tab.isTab) === "[object Function]"');

        QUnit.strictEqual(Tab.isTab.length, 1, 'Tab.isTab.length === 1');
    });

    QUnit.test("booleanValue = Tab.isTab(tab)", function() {
        QUnit.expect(1);
      
        var tab = Tab.construct(),
            booleanValue = Tab.isTab(tab);

        QUnit.strictEqual(booleanValue, true, 'booleanValue === true');
    });

    QUnit.test("booleanValue = Tab.isTab(object)", function() {
        QUnit.expect(1);
      
        var object = {},
            booleanValue = Tab.isTab(object);

        QUnit.strictEqual(booleanValue, false, 'booleanValue === false');
    });

    QUnit.test("booleanValue = Tab.isTab()", function() {
        QUnit.expect(1);
      
        var booleanValue = Tab.isTab();

        QUnit.strictEqual(booleanValue, false, 'booleanValue === false');
    });

}());

