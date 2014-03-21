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
  
    QUnit.module("Tab.defer()");

    QUnit.test("Tab.defer object", function() {
        QUnit.expect(2);
      
        QUnit.strictEqual(typeof Tab.defer, "function", 'typeof Tab.defer === "function"');
        QUnit.strictEqual(Tab.defer.length, 2, 'Tab.defer.length === 2');
    });

    QUnit.test("deferred = Tab.defer(target, processor)", function() {
        QUnit.expect(3);

        var target = new Tab(),
            processor, deferred;

        processor = function () {};
        deferred = Tab.defer(target, processor);
      
        QUnit.strictEqual(typeof deferred, "function", 'typeof deferred === "function"');
        QUnit.strictEqual(Object.prototype.toString.call(deferred), "[object Function]", 'Object.prototype.toString.call(deferred) === "[object Function]"');

        QUnit.strictEqual(deferred.length, 0, 'deferred.length === 0');
    });

    QUnit.test("deferred = Tab.defer(target, processor) - return arguments[0]", function() {
        QUnit.expect(13);
      
        var target = new Tab(),
            processor,
            deferred,
            subject = { name: "subject" },
            value = "value",
            defaultContext = Tab.context;
         
        processor = function () {
            // processor called same as deferred
            QUnit.strictEqual(this, subject, 'deferred.call(subject, value) - this === subject');
            QUnit.strictEqual(arguments.length, 1, 'deferred.call(subject, value) - arguments.length === 1');
            QUnit.strictEqual(arguments[0], value, 'deferred.call(subject, value) - arguments[0] === value');

            // new context
            QUnit.notStrictEqual(Tab.context, defaultContext, 'deferred.call(subject, value) - Tab.context !== defaultContext');

            QUnit.strictEqual(typeof Tab.context, "object", 'deferred.call(subject, value) - typeof Tab.context === "object"');
            QUnit.strictEqual(Object.prototype.toString.call(Tab.context), "[object Object]", 'deferred.call(subject, value) - Object.prototype.toString.call(Tab.context) === "[object Object]"');
            QUnit.strictEqual(Object.keys(Tab.context).length, 2, 'deferred.call(subject, value) - Object.keys(Tab.context).length === 2');
            QUnit.strictEqual(Object.getOwnPropertyNames(Tab.context).length, 3, 'deferred.call(subject, value) - Object.getOwnPropertyNames(Tab.context).length === 3');

            // parent context
            QUnit.strictEqual(Tab.context.context, defaultContext, 'deferred.call(subject, value) - Tab.context.context === defaultContext');

            // target
            QUnit.strictEqual(Tab.context.target, target, 'deferred.call(subject, value) - Tab.context.target === target');

            return arguments[0];
        };
        deferred = Tab.defer(target, processor);

        // deferred returns same as processor?
        QUnit.strictEqual(deferred.call(subject, value), value, 'deferred.call(subject, value) === value');

        // old context restored?
        QUnit.strictEqual(Tab.context, defaultContext, 'Tab.context === defaultContext');

        // target captured result?
        QUnit.strictEqual(target.valueOf(), value, 'target.valueOf() === value');
    });

    QUnit.test("deferred = Tab.defer(target, processor) - throw error", function() {
        QUnit.expect(13);
      
        var target = new Tab(),
            processor,
            deferred,
            subject = { name: "subject" },
            value = "value",
            error = "error",
            defaultContext = Tab.context;
         
        processor = function () {
            // processor called same as deferred
            QUnit.strictEqual(this, subject, 'deferred.call(subject, value) - this === subject');
            QUnit.strictEqual(arguments.length, 1, 'deferred.call(subject, value) - arguments.length === 1');
            QUnit.strictEqual(arguments[0], value, 'deferred.call(subject, value) - arguments[0] === value');

            // new context
            QUnit.notStrictEqual(Tab.context, defaultContext, 'deferred.call(subject, value) - Tab.context !== defaultContext');

            QUnit.strictEqual(typeof Tab.context, "object", 'deferred.call(subject, value) - typeof Tab.context === "object"');
            QUnit.strictEqual(Object.prototype.toString.call(Tab.context), "[object Object]", 'deferred.call(subject, value) - Object.prototype.toString.call(Tab.context) === "[object Object]"');
            QUnit.strictEqual(Object.keys(Tab.context).length, 2, 'deferred.call(subject, value) - Object.keys(Tab.context).length === 2');
            QUnit.strictEqual(Object.getOwnPropertyNames(Tab.context).length, 3, 'deferred.call(subject, value) - Object.getOwnPropertyNames(Tab.context).length === 3');

            // parent context
            QUnit.strictEqual(Tab.context.context, defaultContext, 'deferred.call(subject, value) - Tab.context.context === defaultContext');

            // target
            QUnit.strictEqual(Tab.context.target, target, 'deferred.call(subject, value) - Tab.context.target === target');

            throw error;
        };
        deferred = Tab.defer(target, processor);

        // deferred returns same as processor?
        QUnit.strictEqual(
            (function () {
                try { deferred.call(subject, value); } catch (e) { return e; }
            }()),
            error,
            'try { deferred.call(subject, value); } catch (e) { e === error }'
        );

        // old context restored?
        QUnit.strictEqual(Tab.context, defaultContext, 'Tab.context === defaultContext');

        // target captured result?
        QUnit.strictEqual(
            (function () {
                try { target.valueOf(); } catch (e) { return e; }
            }()),
            error,
            'try { target.valueOf(); } catch (e) { e === error }'
        );
    });

    QUnit.asyncTest("deferred = Tab.defer(target, processor) - async - return arguments[0]", function() {
        QUnit.expect(15);
      
        var target = new Tab(),
            processor,
            deferred,
            subject = { name: "subject" },
            value = "value",
            defaultContext = Tab.context;
         
        processor = function () {
            // processor called same as deferred
            QUnit.strictEqual(this, subject, 'deferred.call(subject, value) - this === subject');
            QUnit.strictEqual(arguments.length, 1, 'deferred.call(subject, value) - arguments.length === 1');
            QUnit.strictEqual(arguments[0], value, 'deferred.call(subject, value) - arguments[0] === value');

            // new context
            QUnit.notStrictEqual(Tab.context, defaultContext, 'deferred.call(subject, value) - Tab.context !== defaultContext');

            QUnit.strictEqual(typeof Tab.context, "object", 'deferred.call(subject, value) - typeof Tab.context === "object"');
            QUnit.strictEqual(Object.prototype.toString.call(Tab.context), "[object Object]", 'deferred.call(subject, value) - Object.prototype.toString.call(Tab.context) === "[object Object]"');
            QUnit.strictEqual(Object.keys(Tab.context).length, 2, 'deferred.call(subject, value) - Object.keys(Tab.context).length === 2');
            QUnit.strictEqual(Object.getOwnPropertyNames(Tab.context).length, 3, 'deferred.call(subject, value) - Object.getOwnPropertyNames(Tab.context).length === 3');

            // parent context
            QUnit.strictEqual(Tab.context.context, defaultContext, 'deferred.call(subject, value) - Tab.context.context === defaultContext');

            // target
            QUnit.strictEqual(Tab.context.target, target, 'deferred.call(subject, value) - Tab.context.target === target');

            return arguments[0];
        };
        deferred = Tab.defer(target, processor);

        setTimeout(function () {
            QUnit.start();

            // deferred returns same as processor?
            QUnit.strictEqual(deferred.call(subject, value), value, 'deferred.call(subject, value) === value');

            // old context restored?
            QUnit.strictEqual(Tab.context, defaultContext, 'Tab.context === defaultContext');

            // target captured result?
            QUnit.strictEqual(target.valueOf(), value, 'target.valueOf() === value');
        }, 0);

        // old context still there?
        QUnit.strictEqual(Tab.context, defaultContext, 'Tab.context === defaultContext');

        // target still empty?
        QUnit.strictEqual(target.hasReturned(), false, 'target.hasReturned() === false');
    });

    QUnit.asyncTest("deferred = Tab.defer(target, processor) - async - throw error", function() {
        QUnit.expect(15);
      
        var target = new Tab(),
            processor,
            deferred,
            subject = { name: "subject" },
            value = "value",
            error = "error",
            defaultContext = Tab.context;
         
        processor = function () {
            // processor called same as deferred
            QUnit.strictEqual(this, subject, 'deferred.call(subject, value) - this === subject');
            QUnit.strictEqual(arguments.length, 1, 'deferred.call(subject, value) - arguments.length === 1');
            QUnit.strictEqual(arguments[0], value, 'deferred.call(subject, value) - arguments[0] === value');

            // new context
            QUnit.notStrictEqual(Tab.context, defaultContext, 'deferred.call(subject, value) - Tab.context !== defaultContext');

            QUnit.strictEqual(typeof Tab.context, "object", 'deferred.call(subject, value) - typeof Tab.context === "object"');
            QUnit.strictEqual(Object.prototype.toString.call(Tab.context), "[object Object]", 'deferred.call(subject, value) - Object.prototype.toString.call(Tab.context) === "[object Object]"');
            QUnit.strictEqual(Object.keys(Tab.context).length, 2, 'deferred.call(subject, value) - Object.keys(Tab.context).length === 2');
            QUnit.strictEqual(Object.getOwnPropertyNames(Tab.context).length, 3, 'deferred.call(subject, value) - Object.getOwnPropertyNames(Tab.context).length === 3');

            // parent context
            QUnit.strictEqual(Tab.context.context, defaultContext, 'deferred.call(subject, value) - Tab.context.context === defaultContext');

            // target
            QUnit.strictEqual(Tab.context.target, target, 'deferred.call(subject, value) - Tab.context.target === target');

            throw error;
        };
        deferred = Tab.defer(target, processor);

        setTimeout(function () {
            QUnit.start();

            // deferred returns same as processor?
            QUnit.strictEqual(
                (function () {
                    try { deferred.call(subject, value); } catch (e) { return e; }
                }()),
                error,
                'try { deferred.call(subject, value); } catch (e) { e === error }'
            );

            // old context restored?
            QUnit.strictEqual(Tab.context, defaultContext, 'Tab.context === defaultContext');

            // target captured result?
            QUnit.strictEqual(
                (function () {
                    try { target.valueOf(); } catch (e) { return e; }
                }()),
                error,
                'try { target.valueOf(); } catch (e) { e === error }'
            );
        }, 0);

        // old context still there?
        QUnit.strictEqual(Tab.context, defaultContext, 'Tab.context === defaultContext');

        // target still empty?
        QUnit.strictEqual(target.hasReturned(), false, 'target.hasReturned() === false');
    });

    QUnit.test("deferred = Tab.defer(target, processor) - Tab.defer(); return arguments[0]", function() {
        QUnit.expect(3);
      
        var target = new Tab(),
            processor,
            deferred,
            value = "value",
            defaultContext = Tab.context;
         
        processor = function () {
            Tab.defer();
            return arguments[0];
        };
        deferred = Tab.defer(target, processor);

        // deferred returns same as processor?
        QUnit.strictEqual(deferred.call(null, value), value, 'deferred.call(null, value) === value');

        // old context restored?
        QUnit.strictEqual(Tab.context, defaultContext, 'Tab.context === defaultContext');

        // target captured result?
        QUnit.strictEqual(target.valueOf(), undefined, 'target.valueOf() === undefined');
    });

    QUnit.test("deferred = Tab.defer(target, processor) - Tab.defer(); throw error", function() {
        QUnit.expect(3);
      
        var target = new Tab(),
            processor,
            deferred,
            value = "value",
            error = "error",
            defaultContext = Tab.context;
         
        processor = function () {
            Tab.defer();
            throw error;
        };
        deferred = Tab.defer(target, processor);

        // deferred returns same as processor?
        QUnit.strictEqual(
            (function () {
                try { deferred.call(null, value); } catch (e) { return e; }
            }()),
            error,
            'try { deferred.call(null, value); } catch (e) { e === error }'
        );

        // old context restored?
        QUnit.strictEqual(Tab.context, defaultContext, 'Tab.context === defaultContext');

        // target captured result?
        QUnit.strictEqual(
            (function () {
                try { target.valueOf(); } catch (e) { return e; }
            }()),
            error,
            'try { target.valueOf(); } catch (e) { e === error }'
        );
    });

    QUnit.test("deferred = Tab.defer(target, processor) - Tab.context.target.doReturn(value2); return arguments[0];", function() {
        QUnit.expect(3);
      
        var target = new Tab(),
            processor,
            deferred,
            value1 = "value1",
            value2 = "value2",
            defaultContext = Tab.context;
         
        processor = function () {
            Tab.context.target.doReturn(value2);
            return arguments[0];
        };
        deferred = Tab.defer(target, processor);

        // deferred returns same as processor?
        QUnit.strictEqual(deferred.call(null, value1), value1, 'deferred.call(null, value1) === value1');

        // old context restored?
        QUnit.strictEqual(Tab.context, defaultContext, 'Tab.context === defaultContext');

        // target captured result?
        QUnit.strictEqual(target.valueOf(), value1, 'target.valueOf() === value1');
    });

    QUnit.test("deferred = Tab.defer(target, processor) - Tab.defer(); Tab.context.target.doReturn(value2); return arguments[0];", function() {
        QUnit.expect(3);
      
        var target = new Tab(),
            processor,
            deferred,
            value1 = "value1",
            value2 = "value2",
            defaultContext = Tab.context;
         
        processor = function () {
            Tab.defer();
            Tab.context.target.doReturn(value2);
            return arguments[0];
        };
        deferred = Tab.defer(target, processor);

        // deferred returns same as processor?
        QUnit.strictEqual(deferred.call(null, value1), value1, 'deferred.call(null, value1) === value1');

        // old context restored?
        QUnit.strictEqual(Tab.context, defaultContext, 'Tab.context === defaultContext');

        // target captured result?
        QUnit.strictEqual(target.valueOf(), value2, 'target.valueOf() === value2');
    });

    QUnit.test("deferred = Tab.defer(target, processor) - Tab.context.target.doThrow(error); return arguments[0];", function() {
        QUnit.expect(3);
      
        var target = new Tab(),
            processor,
            deferred,
            value = "value",
            error = "error",
            defaultContext = Tab.context;
         
        processor = function () {
            Tab.context.target.doThrow(error);
            return arguments[0];
        };
        deferred = Tab.defer(target, processor);

        // deferred returns same as processor?
        QUnit.strictEqual(deferred.call(null, value), value, 'deferred.call(null, value) === value');

        // old context restored?
        QUnit.strictEqual(Tab.context, defaultContext, 'Tab.context === defaultContext');

        // target captured result?
        QUnit.strictEqual(target.valueOf(), value, 'target.valueOf() === value');
    });

    QUnit.test("deferred = Tab.defer(target, processor) - Tab.defer(); Tab.context.target.doThrow(error); return arguments[0];", function() {
        QUnit.expect(3);
      
        var target = new Tab(),
            processor,
            deferred,
            value = "value",
            error = "error",
            defaultContext = Tab.context;
         
        processor = function () {
            Tab.defer();
            Tab.context.target.doThrow(error);
            return arguments[0];
        };
        deferred = Tab.defer(target, processor);

        // deferred returns same as processor?
        QUnit.strictEqual(deferred.call(null, value), value, 'deferred.call(null, value) === value');

        // old context restored?
        QUnit.strictEqual(Tab.context, defaultContext, 'Tab.context === defaultContext');

        // target captured result?
        QUnit.strictEqual(
            (function () {
                try { target.valueOf(); } catch (e) { return e; }
            }()),
            error,
            'try { target.valueOf(); } catch (e) { e === error }'
        );
    });

    QUnit.test("deferred = Tab.defer(target)", function() {
        QUnit.expect(3);
      
        var target = new Tab(),
            deferred,
            subject = { name: "subject" },
            value = "value",
            defaultContext = Tab.context;
         
        deferred = Tab.defer(target);

        // deferred returns undefined?
        QUnit.strictEqual(deferred.call(subject, value), undefined, 'deferred.call(subject, value) === undefined');

        // old context still there?
        QUnit.strictEqual(Tab.context, defaultContext, 'Tab.context === defaultContext');

        // target captured result?
        QUnit.strictEqual(target.valueOf(), value, 'target.valueOf() === value');
    });

    QUnit.asyncTest("deferred = Tab.defer(target) - async", function() {
        QUnit.expect(5);
      
        var target = new Tab(),
            deferred,
            subject = { name: "subject" },
            value = "value",
            defaultContext = Tab.context;
         
        deferred = Tab.defer(target);

        setTimeout(function () {
            QUnit.start();

            // deferred returns undefined?
            QUnit.strictEqual(deferred.call(subject, value), undefined, 'deferred.call(subject, value) === undefined');

            // old context still there?
            QUnit.strictEqual(Tab.context, defaultContext, 'Tab.context === defaultContext');

            // target captured result?
            QUnit.strictEqual(target.valueOf(), value, 'target.valueOf() === value');
        }, 0);

        // old context still there?
        QUnit.strictEqual(Tab.context, defaultContext, 'Tab.context === defaultContext');

        // target still empty?
        QUnit.strictEqual(target.hasReturned(), false, 'target.hasReturned() === false');
    });

    QUnit.test("Deferred = Tab.defer(target, Processor) - this.value = value; Processor.prototype.getValue >> this.value", function() {
        QUnit.expect(4);
      
        var target = new Tab(),
            Processor,
            Deferred,
            value = "value";
        
        Processor = function () {
            this.value = value;
        };
        Processor.prototype.getValue = function () {
            return this.value;
        };
        Deferred = Tab.defer(target, Processor);

        QUnit.strictEqual((new Deferred()).value, value, '(new Deferred()).value === value');
        QUnit.strictEqual((new Deferred()).getValue(), value, '(new Deferred()).getValue() === value');

        // target captured result?
        QUnit.strictEqual(target.valueOf().value, value, 'target.valueOf().value === value');
        QUnit.strictEqual(target.valueOf().getValue(), value, 'target.valueOf().getValue() === value');
    });
}());

