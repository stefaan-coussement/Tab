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
  
    QUnit.module("Tab.context");

    QUnit.test("Tab.context object", function() {
        QUnit.expect(4);
      
        QUnit.strictEqual(typeof Tab.context, "object", 'typeof Tab.context === "object"');
        QUnit.strictEqual(Object.prototype.toString.call(Tab.context), "[object Object]", 'Object.prototype.toString.call(Tab.context) === "[object Object]"');
                   
        QUnit.strictEqual(Object.keys(Tab.context).length, 1, 'Object.keys(Tab.context).length === 1');
        QUnit.strictEqual(Object.getOwnPropertyNames(Tab.context).length, 1, 'Object.getOwnPropertyNames(Tab.context).length === 1');
    });

    QUnit.test("Tab.context properties", function() {
        QUnit.expect(1);
    
        QUnit.ok(Object.prototype.hasOwnProperty.call(Tab.context, "target"),    'Tab.context.target');
    });

    QUnit.test("Tab.context.target", function() {
        QUnit.expect(3);
      
        QUnit.strictEqual(typeof Tab.context.target, "object", 'typeof Tab.context.target === "object"');
        QUnit.strictEqual(Object.prototype.toString.call(Tab.context.target), "[object Object]", 'Object.prototype.toString.call(Tab.context.target) === "[object Object]"');

        QUnit.strictEqual(Tab.isTab(Tab.context.target), true, 'Tab.isTab(Tab.context.target) === true');
    });

}());

