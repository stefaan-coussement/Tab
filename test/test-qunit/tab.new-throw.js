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
  
    QUnit.module("Tab.newThrow()");

    QUnit.test("Tab.newThrow object", function() {
        QUnit.expect(2);
      
        QUnit.strictEqual(typeof Tab.newThrow, "function", 'typeof Tab.newThrow === "function"');
        QUnit.strictEqual(Tab.newThrow.length, 1, 'Tab.newThrow.length === 1');
    });

    QUnit.test("newTab = Tab.newThrow(error)", function() {
        QUnit.expect(6);
      
        var error = "error",
            newTab = Tab.newThrow(error);

        QUnit.strictEqual(Tab.isTab(newTab), true, 'Tab.isTab(newTab) === true');

        QUnit.strictEqual(newTab.hasReturned(), false, 'newTab.hasReturned() === false');
        QUnit.strictEqual(newTab.hasThrown(), true, 'newTab.hasThrown() === true');
        QUnit.strictEqual(newTab.isCancelled(), false, 'newTab.isCancelled() === false');
        QUnit.strictEqual(newTab.isSettled(), false, 'newTab.isSettled() === false');

        QUnit.strictEqual(
            (function () {
                try { newTab.valueOf(); } catch (e) { return e; }
            }()),
            error,
            'try { newTab.valueOf(); } catch (e) { e === error }'
        );
    });

    QUnit.test("tab = Tab.newThrow(error1).doThrow(error2)", function() {
        QUnit.expect(5);
      
        var error1 = "error1",
            error2 = "error2",
            tab = Tab.newThrow(error1).doThrow(error2);

        QUnit.strictEqual(tab.hasReturned(), false, 'tab.hasReturned() === false');
        QUnit.strictEqual(tab.hasThrown(), true, 'tab.hasThrown() === true');
        QUnit.strictEqual(tab.isCancelled(), false, 'tab.isCancelled() === false');
        QUnit.strictEqual(tab.isSettled(), false, 'tab.isSettled() === false');

        QUnit.strictEqual(
            (function () {
                try { tab.valueOf(); } catch (e) { return e; }
            }()),
            error2,
            'try { tab.valueOf(); } catch (e) { e === error2 }'
        );
    });

}());

