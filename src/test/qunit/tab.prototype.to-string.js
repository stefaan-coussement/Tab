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
	// jshint quotmark: false, es3: false
  
    QUnit.module("Tab.prototype.toString()");

    QUnit.test("Tab.prototype.toString object", function() {
        QUnit.expect(3);
      
        QUnit.strictEqual(typeof Tab.prototype.toString, "function", 'typeof Tab.prototype.toString === "function"');
        QUnit.strictEqual(Object.prototype.toString.call(Tab.prototype.toString), "[object Function]", 'Object.prototype.toString.call(Tab.prototype.toString) === "[object Function]"');

        QUnit.strictEqual(Tab.prototype.toString.length, 0, 'Tab.prototype.toString.length === 0');
    });

    QUnit.test("stringValue = Tab.construct().toString()", function() {
        QUnit.expect(1);
      
        var stringValue = Tab.construct().toString();

        QUnit.strictEqual(stringValue, undefined, 'stringValue === undefined');
    });

    QUnit.test("stringValue = Tab.newReturn().toString()", function() {
        QUnit.expect(1);
      
        var stringValue = Tab.newReturn().toString();

        QUnit.strictEqual(stringValue, undefined, 'stringValue === undefined');
    });

    QUnit.test('stringValue = Tab.newReturn(value1).toString(); value1.toString() === "value1"', function() {
        QUnit.expect(1);
      
        var value1 = { toString: function () { return "value1"; } },
            stringValue = Tab.newReturn(value1).toString();

        QUnit.strictEqual(stringValue, "value1", 'stringValue === "value1"');
    });

    QUnit.test('stringValue = Tab.newReturn(Tab.newReturn(value2)).toString(); value2.toString() === "value2"', function() {
        QUnit.expect(1);
      
        var value2 = { toString: function () { return "value2"; } },
            stringValue = Tab.newReturn(Tab.newReturn(value2)).toString();

        QUnit.strictEqual(stringValue, "value2", 'stringValue === "value2"');
    });

    QUnit.test("stringValue = Tab.newReturn(Tab.newThrow(error2)).toString()", function() {
        QUnit.expect(1);
      
        var error2 = "error2",
            tab = Tab.newReturn(Tab.newThrow(error2));

        QUnit.strictEqual(
            (function () {
                try { tab.toString(); } catch (e) { return e; }
            }()),
            error2,
            'try { Tab.newReturn(Tab.newThrow(error2)).toString(); } catch (e) { e === error2 }'
        );
    });

    QUnit.test("stringValue = Tab.newThrow(error1).toString()", function() {
        QUnit.expect(1);
      
        var error1 = "error1",
            tab = Tab.newThrow(error1);

        QUnit.strictEqual(
            (function () {
                try { tab.toString(); } catch (e) { return e; }
            }()),
            error1,
            'try { Tab.newThrow(error1).toString(); } catch (e) { e === error1 }'
        );
    });

    QUnit.test("stringValue = Tab.newThrow(Tab.newReturn(error2)).toString()", function() {
        QUnit.expect(1);
      
        var error2 = "error2",
            tab = Tab.newThrow(Tab.newReturn(error2));

        QUnit.strictEqual(
            (function () {
                try { tab.toString(); } catch (e) { return e; }
            }()),
            error2,
            'try { Tab.newThrow(Tab.newReturn(error2)).toString(); } catch (e) { e === error2 }'
        );
    });

    QUnit.test("stringValue = Tab.newThrow(Tab.newThrow(error2)).toString()", function() {
        QUnit.expect(1);
      
        var error2 = "error2",
            tab = Tab.newThrow(Tab.newThrow(error2));

        QUnit.strictEqual(
            (function () {
                try { tab.toString(); } catch (e) { return e; }
            }()),
            error2,
            'try { Tab.newThrow(Tab.newThrow(error2)).toString(); } catch (e) { e === error2 }'
        );
    });

    QUnit.test('stringValue = Tab.prototype.toString.call(object); object.toString() === "string for object"', function() {
        QUnit.expect(1);
      
        var object = { toString: function () { return "string for object"; } },
            stringValue = Tab.prototype.toString.call(object);

        QUnit.strictEqual(stringValue, "string for object", 'stringValue === "string for object"');
    });

}());

