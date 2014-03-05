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

    QUnit.test("newTab = Tab.construct()", function() {
        QUnit.expect(6);
      
        var newTab = Tab.construct();

        QUnit.ok(Tab.isTab(newTab), 'Tab.isTab(newTab)');
        QUnit.ok(!newTab.hasReturned(), '!newTab.hasReturned()');
        QUnit.ok(!newTab.hasThrown(), '!newTab.hasThrown()');
        QUnit.ok(!newTab.isCancelled(), '!newTab.isCancelled()');
        QUnit.ok(!newTab.isSettled(), '!newTab.isSettled()');
        QUnit.ok(newTab.valueOf() === undefined, 'newTab.valueOf() === undefined');
    });

}());

