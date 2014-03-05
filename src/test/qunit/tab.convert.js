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

    QUnit.test("convertedTab = Tab.convert(tab)", function() {
        QUnit.expect(1);
      
        var tab = Tab.construct(),
            convertedTab = Tab.convert(tab);

        QUnit.ok(convertedTab === tab, 'convertedTab === tab');
    });

    QUnit.test("convertedTab = Tab.convert(object)", function() {
        QUnit.expect(5);
      
        var object = {},
            convertedTab = Tab.convert(object);

        QUnit.ok(Tab.isTab(convertedTab), 'Tab.isTab(convertedTab)');
        QUnit.ok(convertedTab.hasReturned(), 'convertedTab.hasReturned()');
        QUnit.ok(!convertedTab.hasThrown(), '!convertedTab.hasThrown()');
        QUnit.ok(!convertedTab.isCancelled(), '!convertedTab.isCancelled()');
        QUnit.ok(!convertedTab.isSettled(), '!convertedTab.isSettled()');
        QUnit.ok(convertedTab.valueOf() === object, 'convertedTab.valueOf() === object');
    });

    QUnit.test("convertedTab = Tab.convert()", function() {
        QUnit.expect(5);
      
        var convertedTab = Tab.convert();

        QUnit.ok(Tab.isTab(convertedTab), 'Tab.isTab(convertedTab)');
        QUnit.ok(convertedTab.hasReturned(), 'convertedTab.hasReturned()');
        QUnit.ok(!convertedTab.hasThrown(), '!convertedTab.hasThrown()');
        QUnit.ok(!convertedTab.isCancelled(), '!convertedTab.isCancelled()');
        QUnit.ok(!convertedTab.isSettled(), '!convertedTab.isSettled()');
        QUnit.ok(convertedTab.valueOf() === undefined, 'convertedTab.valueOf() === undefined');
    });

}());

