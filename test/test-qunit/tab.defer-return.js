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

/*global setTimeout: true, QUnit: true, Tab: true */

(function () {
	"use strict";
	// jshint quotmark: false
  
    QUnit.module("Tab.deferReturn()");

    QUnit.test("Tab.deferReturn object", function() {
        QUnit.expect(2);
      
        QUnit.strictEqual(typeof Tab.deferReturn, "function", 'typeof Tab.deferReturn === "function"');
        QUnit.strictEqual(Tab.deferReturn.length, 1, 'Tab.deferReturn.length === 1');
    });

    QUnit.test("deferred = Tab.deferReturn(target)", function() {
        QUnit.expect(4);
      
        var target = new Tab(),
            deferred,
            subject = { name: "subject" },
            value = "value";
         
        deferred = Tab.deferReturn(target);

        // deferred returns undefined?
        QUnit.strictEqual(deferred.call(subject, value), undefined, 'deferred.call(subject, value) === undefined');

        // target captured result?
        QUnit.strictEqual(target.hasReturned(), true, 'target.hasReturned() === true');
        QUnit.strictEqual(target.isSettled(), false, 'target.isSettled() === false');
        QUnit.strictEqual(target.valueOf(), value, 'target.valueOf() === value');
    });

    QUnit.asyncTest("deferred = Tab.deferReturn(target) - async", function() {
        QUnit.expect(7);
      
        var target = new Tab(),
            deferred,
            subject = { name: "subject" },
            value = "value";
         
        deferred = Tab.deferReturn(target);

        setTimeout(function () {
            QUnit.start();

            // deferred returns undefined?
            QUnit.strictEqual(deferred.call(subject, value), undefined, 'deferred.call(subject, value) === undefined');

            // target captured result?
            QUnit.strictEqual(target.hasReturned(), true, 'target.hasReturned() === true');
            QUnit.strictEqual(target.isSettled(), false, 'target.isSettled() === false');
            QUnit.strictEqual(target.valueOf(), value, 'target.valueOf() === value');
        }, 0);

        // target still empty?
        QUnit.strictEqual(target.hasReturned(), false, 'target.hasReturned() === false');
        QUnit.strictEqual(target.hasThrown(), false, 'target.hasThrown() === false');
        QUnit.strictEqual(target.isSettled(), false, 'target.isSettled() === false');
    });
}());

