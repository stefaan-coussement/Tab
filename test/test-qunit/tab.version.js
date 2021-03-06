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
  
    QUnit.module("Tab.version");

    QUnit.test("Tab.version object", function() {
        QUnit.expect(4);
      
        QUnit.strictEqual(typeof Tab.version, "object", 'typeof Tab.version === "object"');
        QUnit.strictEqual(Object.prototype.toString.call(Tab.version), "[object Object]", 'Object.prototype.toString.call(Tab.version) === "[object Object]"');
                   
        QUnit.strictEqual(Object.keys(Tab.version).length, 2, 'Object.keys(Tab.version).length === 2');
        QUnit.strictEqual(Object.getOwnPropertyNames(Tab.version).length, 2, 'Object.getOwnPropertyNames(Tab.version).length === 2');
    });

    QUnit.test("Tab.version properties", function() {
        QUnit.expect(2);
    
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.version, "toString"),    'Tab.version.toString');
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.version, "valueOf"),     'Tab.version.valueOf');
    });

    QUnit.test("Tab.version.toString()", function() {
        QUnit.expect(3);
      
        QUnit.strictEqual(typeof Tab.version.toString, "function", 'typeof Tab.version.toString === "function"');
        QUnit.strictEqual(Tab.version.toString.length, 0, 'Tab.version.toString.length === 0');

        QUnit.strictEqual(typeof Tab.version.toString(), "string", 'typeof Tab.version.toString() === "string"');
    });

    QUnit.test("Tab.version.valueOf()", function() {
        QUnit.expect(3);
      
        QUnit.strictEqual(typeof Tab.version.valueOf, "function", 'typeof Tab.version.valueOf === "function"');
        QUnit.strictEqual(Tab.version.valueOf.length, 0, 'Tab.version.valueOf.length === 0');

        QUnit.strictEqual(typeof Tab.version.valueOf(), "number", 'typeof Tab.version.valueOf() === "number"');
    });

}());

