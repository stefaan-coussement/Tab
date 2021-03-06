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

    QUnit.module("Tab.prototype.hasThrown()");

    QUnit.test("Tab.prototype.hasThrown object", function() {
        QUnit.expect(2);

        QUnit.strictEqual(typeof Tab.prototype.hasThrown, "function", 'typeof Tab.prototype.hasThrown === "function"');
        QUnit.strictEqual(Tab.prototype.hasThrown.length, 0, 'Tab.prototype.hasThrown.length === 0');
    });

    QUnit.test("booleanValue = Tab.construct().hasThrown()", function() {
        QUnit.expect(1);

        var booleanValue = Tab.construct().hasThrown();

        QUnit.strictEqual(booleanValue, false, 'booleanValue === false');
    });

    QUnit.test("booleanValue = Tab.construct().cancel().hasThrown()", function() {
        QUnit.expect(1);

        var booleanValue = Tab.construct().cancel().hasThrown();

        QUnit.strictEqual(booleanValue, true, 'booleanValue === true');
    });

    QUnit.test("booleanValue = Tab.construct().doReturn().hasThrown()", function() {
        QUnit.expect(1);

        var booleanValue = Tab.construct().doReturn().hasThrown();

        QUnit.strictEqual(booleanValue, false, 'booleanValue === false');
    });

    QUnit.test("booleanValue = Tab.construct().settle().hasThrown()", function() {
        QUnit.expect(1);

        var booleanValue = Tab.construct().settle().hasThrown();

        QUnit.strictEqual(booleanValue, false, 'booleanValue === false');
    });

    QUnit.test("booleanValue = Tab.construct().doThrow().hasThrown()", function() {
        QUnit.expect(1);

        var booleanValue = Tab.construct().doThrow().hasThrown();

        QUnit.strictEqual(booleanValue, true, 'booleanValue === true');
    });

    QUnit.test("Tab.prototype.hasThrown.call(object)", function() {
        QUnit.expect(1);
      
        var object = { name: "object" };

        QUnit.strictEqual((function () {
                try {
                    Tab.prototype.hasThrown.call(object);
                }
                catch (e) {
                    return (e instanceof TypeError);
                }
            }()),
            true,
            'try ( Tab.prototype.hasThrown.call(object); } catch (e) { e instanceof TypeError }'
        );
    });

}());

