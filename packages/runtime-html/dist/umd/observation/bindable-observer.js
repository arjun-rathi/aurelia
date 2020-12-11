(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@aurelia/kernel", "@aurelia/runtime"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BindableObserver = void 0;
    const kernel_1 = require("@aurelia/kernel");
    const runtime_1 = require("@aurelia/runtime");
    class BindableObserver {
        constructor(obj, propertyKey, cbName, $set, $controller) {
            this.obj = obj;
            this.propertyKey = propertyKey;
            this.$set = $set;
            this.$controller = $controller;
            this.currentValue = void 0;
            this.oldValue = void 0;
            this.inBatch = false;
            this.type = 4 /* Obj */;
            this.callback = this.obj[cbName];
            this.lifecycle = $controller.lifecycle;
            const propertyChangedCallback = this.propertyChangedCallback = this.obj.propertyChanged;
            const hasPropertyChangedCallback = this.hasPropertyChangedCallback = typeof propertyChangedCallback === 'function';
            const shouldInterceptSet = this.shouldInterceptSet = $set !== kernel_1.noop;
            // when user declare @bindable({ set })
            // it's expected to work from the start,
            // regardless where the assignment comes from: either direct view model assignment or from binding during render
            // so if either getter/setter config is present, alter the accessor straight await
            if (this.callback === void 0 && !hasPropertyChangedCallback && !shouldInterceptSet) {
                this.observing = false;
            }
            else {
                this.observing = true;
                const currentValue = obj[propertyKey];
                this.currentValue = shouldInterceptSet && currentValue !== void 0
                    ? $set(currentValue)
                    : currentValue;
                this.createGetterSetter();
            }
        }
        handleChange(newValue, oldValue, flags) {
            this.setValue(newValue, flags);
        }
        getValue() {
            return this.currentValue;
        }
        setValue(newValue, flags) {
            var _a;
            if (this.shouldInterceptSet) {
                newValue = this.$set(newValue);
            }
            if (this.observing) {
                const currentValue = this.currentValue;
                // eslint-disable-next-line compat/compat
                if (Object.is(newValue, currentValue)) {
                    return;
                }
                this.currentValue = newValue;
                if (this.lifecycle.batch.depth === 0) {
                    this.subs.notify(newValue, currentValue, flags);
                    if ((flags & 32 /* fromBind */) === 0 || (flags & 16 /* updateSource */) > 0) {
                        (_a = this.callback) === null || _a === void 0 ? void 0 : _a.call(this.obj, newValue, currentValue, flags);
                        if (this.hasPropertyChangedCallback) {
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                            this.propertyChangedCallback.call(this.obj, this.propertyKey, newValue, currentValue, flags);
                        }
                    }
                }
                else if (!this.inBatch) {
                    this.inBatch = true;
                    this.oldValue = currentValue;
                    this.lifecycle.batch.add(this);
                }
            }
            else {
                // See SetterObserver.setValue for explanation
                this.obj[this.propertyKey] = newValue;
            }
        }
        subscribe(subscriber) {
            if (this.observing === false) {
                this.observing = true;
                const currentValue = this.obj[this.propertyKey];
                this.currentValue = this.shouldInterceptSet
                    ? this.$set(currentValue)
                    : currentValue;
                this.createGetterSetter();
            }
            this.subs.add(subscriber);
        }
        createGetterSetter() {
            Reflect.defineProperty(this.obj, this.propertyKey, {
                enumerable: true,
                configurable: true,
                get: ( /* Bindable Observer */) => this.currentValue,
                set: (/* Bindable Observer */ value) => {
                    this.setValue(value, 0 /* none */);
                }
            });
        }
    }
    exports.BindableObserver = BindableObserver;
    runtime_1.subscriberCollection()(BindableObserver);
});
//# sourceMappingURL=bindable-observer.js.map