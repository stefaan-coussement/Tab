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
  
    QUnit.module("Tab.prototype.valueOf()");

    QUnit.test("Tab.prototype.valueOf object", function() {
        QUnit.expect(3);
      
        QUnit.strictEqual(typeof Tab.prototype.valueOf, "function", 'typeof Tab.prototype.valueOf === "function"');
        QUnit.strictEqual(Object.prototype.toString.call(Tab.prototype.valueOf), "[object Function]", 'Object.prototype.toString.call(Tab.prototype.valueOf) === "[object Function]"');

        QUnit.strictEqual(Tab.prototype.valueOf.length, 0, 'Tab.prototype.valueOf.length === 0');
    });

    QUnit.test("value = Tab.construct().valueOf()", function() {
        QUnit.expect(1);
      
        var value = Tab.construct().valueOf();

        QUnit.strictEqual(value, undefined, 'value === undefined');
    });

    QUnit.test("value = Tab.newReturn().valueOf()", function() {
        QUnit.expect(1);
      
        var value = Tab.newReturn().valueOf();

        QUnit.strictEqual(value, undefined, 'value === undefined');
    });

    QUnit.test("value = Tab.newReturn(value1).valueOf()", function() {
        QUnit.expect(1);
      
        var value1 = "value1",
            value = Tab.newReturn(value1).valueOf();

        QUnit.strictEqual(value, value1, 'value === value1');
    });

    QUnit.test("value = Tab.newReturn(Tab.newReturn(value2)).valueOf()", function() {
        QUnit.expect(1);
      
        var value2 = "value2",
            value = Tab.newReturn(Tab.newReturn(value2)).valueOf();

        QUnit.strictEqual(value, value2, 'value === value2');
    });

    QUnit.test("value = Tab.newReturn(Tab.newThrow(error2)).valueOf()", function() {
        QUnit.expect(1);
      
        var error2 = "error2",
            tab = Tab.newReturn(Tab.newThrow(error2));

        QUnit.strictEqual(
            (function () {
                try { tab.valueOf(); } catch (e) { return e; }
            }()),
            error2,
            'try { Tab.newReturn(Tab.newThrow(error2)).valueOf(); } catch (e) { e === error2 }'
        );
    });

    QUnit.test("value = Tab.newThrow(error1).valueOf()", function() {
        QUnit.expect(1);
      
        var error1 = "error1",
            tab = Tab.newThrow(error1);

        QUnit.strictEqual(
            (function () {
                try { tab.valueOf(); } catch (e) { return e; }
            }()),
            error1,
            'try { Tab.newThrow(error1).valueOf(); } catch (e) { e === error1 }'
        );
    });

    QUnit.test("value = Tab.newThrow(Tab.newReturn(error2)).valueOf()", function() {
        QUnit.expect(1);
      
        var error2 = "error2",
            tab = Tab.newThrow(Tab.newReturn(error2));

        QUnit.strictEqual(
            (function () {
                try { tab.valueOf(); } catch (e) { return e; }
            }()),
            error2,
            'try { Tab.newThrow(Tab.newReturn(error2)).valueOf(); } catch (e) { e === error2 }'
        );
    });

    QUnit.test("value = Tab.newThrow(Tab.newThrow(error2)).valueOf()", function() {
        QUnit.expect(1);
      
        var error2 = "error2",
            tab = Tab.newThrow(Tab.newThrow(error2));

        QUnit.strictEqual(
            (function () {
                try { tab.valueOf(); } catch (e) { return e; }
            }()),
            error2,
            'try { Tab.newThrow(Tab.newThrow(error2)).valueOf(); } catch (e) { e === error2 }'
        );
    });

    QUnit.test('value = Tab.prototype.valueOf.call(object); object.valueOf() === "value of object"', function() {
        QUnit.expect(1);
      
        var object = { valueOf: function () { return "value of object"; } },
            value = Tab.prototype.valueOf.call(object);

        QUnit.strictEqual(value, "value of object", 'value === "value of object"');
    });

}());

