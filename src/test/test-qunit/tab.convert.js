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
  
    QUnit.module("Tab.convert()");

    QUnit.test("Tab.convert object", function() {
        QUnit.expect(3);
      
        QUnit.strictEqual(typeof Tab.convert, "function", 'typeof Tab.convert === "function"');
        QUnit.strictEqual(Object.prototype.toString.call(Tab.convert), "[object Function]", 'Object.prototype.toString.call(Tab.convert) === "[object Function]"');

        QUnit.strictEqual(Tab.convert.length, 1, 'Tab.convert.length === 1');
    });

    QUnit.test("convertedTab = Tab.convert(tab)", function() {
        QUnit.expect(1);
      
        var tab = Tab.construct(),
            convertedTab = Tab.convert(tab);

        QUnit.strictEqual(convertedTab, tab, 'convertedTab === tab');
    });

    QUnit.test("convertedTab = Tab.convert(object)", function() {
        QUnit.expect(6);
      
        var object = {},
            convertedTab = Tab.convert(object);

        QUnit.strictEqual(Tab.isTab(convertedTab), true, 'Tab.isTab(convertedTab) === true');

        QUnit.strictEqual(convertedTab.hasReturned(), true, 'convertedTab.hasReturned() === true');
        QUnit.strictEqual(convertedTab.hasThrown(), false, 'convertedTab.hasThrown() === false');
        QUnit.strictEqual(convertedTab.isCancelled(), false, 'convertedTab.isCancelled() === false');
        QUnit.strictEqual(convertedTab.isSettled(), false, 'convertedTab.isSettled() === false');

        QUnit.strictEqual(convertedTab.valueOf(), object, 'convertedTab.valueOf() === object');
    });

    QUnit.test("convertedTab = Tab.convert()", function() {
        QUnit.expect(6);
      
        var convertedTab = Tab.convert();

        QUnit.strictEqual(Tab.isTab(convertedTab), true, 'Tab.isTab(convertedTab) === true');

        QUnit.strictEqual(convertedTab.hasReturned(), true, 'convertedTab.hasReturned() === true');
        QUnit.strictEqual(convertedTab.hasThrown(), false, 'convertedTab.hasThrown() === false');
        QUnit.strictEqual(convertedTab.isCancelled(), false, 'convertedTab.isCancelled() === false');
        QUnit.strictEqual(convertedTab.isSettled(), false, 'convertedTab.isSettled() === false');
        
        QUnit.strictEqual(convertedTab.valueOf(), undefined, 'convertedTab.valueOf() === undefined');
    });

}());

