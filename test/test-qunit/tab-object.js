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
    var functionPropertyNames = Object.getOwnPropertyNames(function () {}).length - 1; // we only consider "prototype"
  
    QUnit.module("Tab");

    QUnit.test("Tab object", function() {
        QUnit.expect(4);
      
        QUnit.strictEqual(typeof Tab, "function", 'typeof Tab === "function"');
        QUnit.strictEqual(Tab.length, 0, 'Tab.length === 0');
                   
        QUnit.strictEqual(Object.keys(Tab).length, 19, 'Object.keys(Tab).length');
        QUnit.strictEqual(Object.getOwnPropertyNames(Tab).length - functionPropertyNames, 20, 'Object.getOwnPropertyNames(Tab).length');
    });

    QUnit.test("Tab properties", function() {
        QUnit.expect(20);
    
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab, "context"),      'Tab.context');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab, "version"),      'Tab.version');

        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab, "construct"),    'Tab.construct');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab, "convert"),      'Tab.convert');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab, "defer"),        'Tab.defer');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab, "deferAccept"),  'Tab.deferAccept');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab, "deferReject"),  'Tab.deferReject');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab, "deferReturn"),  'Tab.deferReturn');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab, "deferSettle"),  'Tab.deferSettle');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab, "deferThrow"),   'Tab.deferThrow');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab, "deferWith"),    'Tab.deferWith');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab, "isTab"),        'Tab.isTab');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab, "newAccept"),    'Tab.newAccept');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab, "newReject"),    'Tab.newReject');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab, "newReturn"),    'Tab.newReturn');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab, "newSettle"),    'Tab.newSettle');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab, "newThrow"),     'Tab.newThrow');

        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab, "prototype"),    'Tab.prototype'); // not enumerable

        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab, "Schedulers"),   'Tab.Schedulers');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab, "X"),            'Tab.X');
    });

    QUnit.test("Tab.prototype object", function() {
        QUnit.expect(4);
      
        QUnit.strictEqual(typeof Tab.prototype, "object", 'typeof Tab.prototype === "object"');
        QUnit.strictEqual(Object.prototype.toString.call(Tab.prototype), "[object Object]", 'Object.prototype.toString.call(Tab.prototype) === "[object Object]"');
                   
        QUnit.strictEqual(Object.keys(Tab.prototype).length, 18, 'Object.keys(Tab.prototype).length');
        QUnit.strictEqual(Object.getOwnPropertyNames(Tab.prototype).length, 19, 'Object.getOwnPropertyNames(Tab.prototype).length');
    });

    QUnit.test("Tab.prototype properties", function() {
        QUnit.expect(19);
    
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.prototype, "accept"),      'Tab.prototype.accept');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.prototype, "cancel"),      'Tab.prototype.cancel');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.prototype, "doReturn"),    'Tab.prototype.doReturn');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.prototype, "doThrow"),     'Tab.prototype.doThrow');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.prototype, "hasReturned"), 'Tab.prototype.hasReturned');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.prototype, "hasThrown"),   'Tab.prototype.hasThrown');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.prototype, "isCancelled"), 'Tab.prototype.isCancelled');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.prototype, "isSettled"),   'Tab.prototype.isSettled');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.prototype, "onCancelled"), 'Tab.prototype.onCancelled');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.prototype, "onReturned"),  'Tab.prototype.onReturned');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.prototype, "onSettled"),   'Tab.prototype.onSettled');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.prototype, "onThrown"),    'Tab.prototype.onThrown');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.prototype, "reject"),      'Tab.prototype.reject');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.prototype, "return"),      'Tab.prototype.return');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.prototype, "settle"),      'Tab.prototype.settle');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.prototype, "throw"),       'Tab.prototype.throw');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.prototype, "toString"),    'Tab.prototype.toString');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.prototype, "valueOf"),     'Tab.prototype.valueOf');

        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.prototype, "constructor"), 'Tab.prototype.constructor'); // not enumerable
    });

    QUnit.test("Tab.Schedulers object", function() {
        QUnit.expect(4);
      
        QUnit.strictEqual(typeof Tab.Schedulers, "object", 'typeof Tab.Schedulers === "object"');
        QUnit.strictEqual(Object.prototype.toString.call(Tab.Schedulers), "[object Object]", 'Object.prototype.toString.call(Tab.Schedulers) === "[object Object]"');
                   
        QUnit.strictEqual(Object.keys(Tab.Schedulers).length, 5, 'Object.keys(Tab.Schedulers).length');
        QUnit.strictEqual(Object.getOwnPropertyNames(Tab.Schedulers).length, 5, 'Object.getOwnPropertyNames(Tab.Schedulers).length');
    });

    QUnit.test("Tab.Schedulers properties", function() {
        QUnit.expect(5);
    
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.Schedulers, "tick"),          'Tab.Schedulers.tick');

        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.Schedulers, "scheduleFirst"), 'Tab.Schedulers.scheduleFirst');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.Schedulers, "scheduleLast"),  'Tab.Schedulers.scheduleLast');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.Schedulers, "scheduleNext"),  'Tab.Schedulers.scheduleNext');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.Schedulers, "scheduleNow"),   'Tab.Schedulers.scheduleNow');
    });

    QUnit.test("Tab.X object", function() {
        QUnit.expect(4);
      
        QUnit.strictEqual(typeof Tab.X, "object", 'typeof Tab.X === "object"');
        QUnit.strictEqual(Object.prototype.toString.call(Tab.X), "[object Object]", 'Object.prototype.toString.call(Tab.X) === "[object Object]"');
                   
        QUnit.strictEqual(Object.keys(Tab.X).length, 4, 'Object.keys(Tab.X).length');
        QUnit.strictEqual(Object.getOwnPropertyNames(Tab.X).length, 4, 'Object.getOwnPropertyNames(Tab.X).length');
    });

    QUnit.test("Tab.X properties", function() {
        QUnit.expect(4);
    
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.X, "es5"),       'Tab.X.es5');

        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.X, "defer"),     'Tab.X.defer');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.X, "notify"),    'Tab.X.notify');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.X, "subscribe"), 'Tab.X.subscribe');
    });

}());

