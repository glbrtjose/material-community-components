(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms'), require('@angular/cdk/overlay'), require('@angular/cdk/portal'), require('@angular/material/button'), require('@angular/material/form-field'), require('@angular/material/input'), require('rxjs'), require('@angular/cdk/coercion'), require('rxjs/operators'), require('@angular/cdk/scrolling'), require('@angular/animations')) :
    typeof define === 'function' && define.amd ? define('material-community-components', ['exports', '@angular/core', '@angular/common', '@angular/forms', '@angular/cdk/overlay', '@angular/cdk/portal', '@angular/material/button', '@angular/material/form-field', '@angular/material/input', 'rxjs', '@angular/cdk/coercion', 'rxjs/operators', '@angular/cdk/scrolling', '@angular/animations'], factory) :
    (global = global || self, factory(global['material-community-components'] = {}, global.ng.core, global.ng.common, global.ng.forms, global.ng.cdk.overlay, global.ng.cdk.portal, global.ng.material.button, global.ng.material.formField, global.ng.material.input, global.rxjs, global.ng.cdk.coercion, global.rxjs.operators, global.ng.cdk.scrolling, global.ng.animations));
}(this, (function (exports, core, common, forms, overlay, portal, button, formField, input, rxjs, coercion, operators, scrolling, animations) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /** Contant used as empty color */
    var EMPTY_COLOR = new core.InjectionToken('empty-color');
    /** Constante to set usedColorStart from the module import */
    var USED_COLORS = new core.InjectionToken('used-colors');
    /**
     * Verify if color has # as a first char. If not, add this char
     * to the color
     * @param color string
     */
    function coerceHexaColor(color) {
        if (color && color.indexOf('#') !== 0) {
            color = "#" + color;
        }
        if (!isValidColor(color)) {
            return;
        }
        return color.toUpperCase();
    }
    /**
     * Validate if the color is valid
     * @param color string
     */
    function isValidColor(color) {
        // validate if color is an hexadecimal
        if (!color ||
            color.charAt(0) !== '#' ||
            color.length < 4 ||
            color.length > 7) {
            return false;
        }
        // validate rgb of the color
        return color.replace('#', '')
            .match(/.{1,2}/g)
            .map(function (v) { return Number.isNaN(parseInt(v, 16)); })
            .indexOf(true) === -1;
    }

    var MccColorPickerService = /** @class */ (function () {
        function MccColorPickerService(emptyColor, usedColors) {
            this.emptyColor = emptyColor;
            this.usedColors = usedColors;
            /**
             * Array of all used colors
             */
            this._colors = new rxjs.BehaviorSubject([]);
            this._colors.next(usedColors);
        }
        /**
         * Add new color to used colors
         * @param color string
         */
        MccColorPickerService.prototype.addColor = function (color) {
            if (!color || !isValidColor(color)) {
                return;
            }
            color = coerceHexaColor(color) || this.emptyColor;
            var colors = this._colors.getValue();
            if (!colors.find(function (_color) { return _color === color; })) {
                colors.push(color);
                this._colors.next(colors);
            }
        };
        /**
         * Return Observable of colors
         */
        MccColorPickerService.prototype.getColors = function () {
            return this._colors.asObservable();
        };
        /**
         * Reset the array of used colors
         */
        MccColorPickerService.prototype.resetUseColors = function () {
            this._colors.next([]);
        };
        MccColorPickerService.ctorParameters = function () { return [
            { type: String, decorators: [{ type: core.Inject, args: [EMPTY_COLOR,] }] },
            { type: Array, decorators: [{ type: core.Inject, args: [USED_COLORS,] }] }
        ]; };
        MccColorPickerService = __decorate([
            core.Injectable(),
            __param(0, core.Inject(EMPTY_COLOR)),
            __param(1, core.Inject(USED_COLORS))
        ], MccColorPickerService);
        return MccColorPickerService;
    }());

    var MccColorPickerCollectionComponent = /** @class */ (function () {
        function MccColorPickerCollectionComponent(changeDetectorRef, emptyColor) {
            this.changeDetectorRef = changeDetectorRef;
            this.emptyColor = emptyColor;
            this._hideEmpty = false;
            /**
             * Size limit of the collection
             */
            this.size = 30;
            /**
             * Show transparent option
             */
            this.transparent = false;
            /**
             * Emit selected color value
             */
            this.changeColor = new core.EventEmitter();
        }
        Object.defineProperty(MccColorPickerCollectionComponent.prototype, "hideEmpty", {
            /**
             * Hide empty slots
             * Empty slots are the difference between the collection size and limit
             */
            set: function (value) {
                this._hideEmpty = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccColorPickerCollectionComponent.prototype, "label", {
            /**
             * Name of the collection
             */
            get: function () {
                return this._label;
            },
            set: function (value) {
                this._label = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccColorPickerCollectionComponent.prototype, "colors", {
            /**
             * Array of colors to be displayed
             */
            get: function () {
                return this._colors;
            },
            set: function (values) {
                this._colors = values;
            },
            enumerable: true,
            configurable: true
        });
        MccColorPickerCollectionComponent.prototype.ngAfterContentChecked = function () {
            if (this._colors && this._colors.length !== this.size) {
                this._colors = this._colors
                    .slice(0, this.size)
                    .concat(new Array(this._getCollectionDiffSize()));
                this.changeDetectorRef.markForCheck();
            }
        };
        /**
         * Return the difference between the limit and the collection size.
         * Always return 0 when hideEmpty is true
         * @returns number
         */
        MccColorPickerCollectionComponent.prototype._getCollectionDiffSize = function () {
            if (this._colors.length > this.size || this._hideEmpty) {
                return 0;
            }
            return this.size - this._colors.length;
        };
        /**
         * Remove color
         */
        MccColorPickerCollectionComponent.prototype.setTransparent = function () {
            this.changeColor.emit(this.emptyColor);
        };
        /**
         * Emit selected color value
         * @param option MccColorPickerOption
         */
        MccColorPickerCollectionComponent.prototype.setColor = function (option) {
            var color = typeof option === 'string' ? option : option.value;
            this.changeColor.emit(color);
        };
        MccColorPickerCollectionComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: String, decorators: [{ type: core.Inject, args: [EMPTY_COLOR,] }] }
        ]; };
        __decorate([
            core.Input()
        ], MccColorPickerCollectionComponent.prototype, "hideEmpty", null);
        __decorate([
            core.Input()
        ], MccColorPickerCollectionComponent.prototype, "label", null);
        __decorate([
            core.Input()
        ], MccColorPickerCollectionComponent.prototype, "colors", null);
        __decorate([
            core.Input()
        ], MccColorPickerCollectionComponent.prototype, "size", void 0);
        __decorate([
            core.Input()
        ], MccColorPickerCollectionComponent.prototype, "transparent", void 0);
        __decorate([
            core.Output()
        ], MccColorPickerCollectionComponent.prototype, "changeColor", void 0);
        MccColorPickerCollectionComponent = __decorate([
            core.Component({
                selector: 'mcc-color-picker-collection',
                template: "<div class=\"mcc-color-picker-collection\" role=\"listbox\" aria-label=\"Select a color\">\n        <h3>{{ label }}</h3>\n\n        <button mat-mini-fab *ngIf=\"transparent\" class=\"mcc-color-picker-remove-color mat-elevation-z0\" role=\"option\" aria-label=\"transparent\"\n                (click)=\"setTransparent()\">\n                <div class=\"mcc-color-picker-transparent\"></div>\n        </button>\n\n        <button *ngFor=\"let color of colors\" mat-mini-fab class=\"mat-elevation-z0\" role=\"option\" [disabled]=\"!color || color === emptyColor\"\n                [mccColorPickerOption]=\"color\" (click)=\"setColor(color)\">\n        </button>\n</div>",
                preserveWhitespaces: false,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                styles: [".mcc-color-picker-collection{min-height:50px;padding:10px 18px}.mcc-color-picker-collection h3{color:#100214;text-transform:uppercase;font-family:'Open Sans',sans-serif;font-size:12px;font-weight:700;margin:0 0 10px}.mcc-color-picker-remove-color{background-color:#fff;border:1px solid #e1e1e1}.mcc-color-picker-remove-color .mcc-color-picker-transparent{width:20px;height:1px;border-bottom:1px solid red;transform:translateY(-4px) translateX(0) rotate(45deg);-webkit-transform:translateY(-4px) translateX(0) rotate(45deg)}button{width:22px;height:22px;cursor:pointer;margin:3px}"]
            }),
            __param(1, core.Inject(EMPTY_COLOR))
        ], MccColorPickerCollectionComponent);
        return MccColorPickerCollectionComponent;
    }());

    var MccColorPickerComponent = /** @class */ (function () {
        function MccColorPickerComponent(elementRef, changeDetectorRef, colorPickerService, emptyColor) {
            this.elementRef = elementRef;
            this.changeDetectorRef = changeDetectorRef;
            this.colorPickerService = colorPickerService;
            this.emptyColor = emptyColor;
            this._usedColorLabel = 'Used Colors';
            this._reverseUsedColor = false;
            this._hideHexForms = false;
            this._hideEmpty = false;
            this._hideTransparent = false;
            this._hideUsedColors = false;
            this._isOpen = false;
            this._overlay = true;
            this._hideButtons = false;
            this._colorPickerSelectorHeight = 170;
            this._hideColorPickerSelector = false;
            /**
             * Set the size of the used colors
             */
            this.usedSizeColors = 30;
            /**
             * Change btnCancel label
             */
            this.btnCancel = 'Cancel';
            /**
             * Change btnConfirm label
             */
            this.btnConfirm = 'Confirm';
            /**
             * Event emitted when user change the selected color (without confirm)
             */
            this.change = new core.EventEmitter();
            /**
             * Event emitted when selected color is confirm
             */
            this.selected = new core.EventEmitter();
            /**
             * Event emitted when is clicked outside of the component
             */
            this.clickOut = new core.EventEmitter();
            /**
             * Array of subscriptions from the collections
             */
            this._collectionSubs = [];
        }
        Object.defineProperty(MccColorPickerComponent.prototype, "usedColorLabel", {
            /**
             * Change label of the collection UsedColors
             */
            get: function () {
                return this._usedColorLabel;
            },
            set: function (value) {
                this._usedColorLabel = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccColorPickerComponent.prototype, "usedColorStart", {
            /**
             * Set initial value for used color
             */
            set: function (colors) {
                var e_1, _a;
                if (colors && colors.length > 0) {
                    try {
                        for (var colors_1 = __values(colors), colors_1_1 = colors_1.next(); !colors_1_1.done; colors_1_1 = colors_1.next()) {
                            var color = colors_1_1.value;
                            this.colorPickerService.addColor(color);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (colors_1_1 && !colors_1_1.done && (_a = colors_1.return)) _a.call(colors_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccColorPickerComponent.prototype, "reverseUsedColors", {
            /**
             * Set usedColor to be used in reverse
             */
            set: function (reverse) {
                this._reverseUsedColor = coercion.coerceBooleanProperty(reverse);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccColorPickerComponent.prototype, "hideHexForms", {
            /**
             * Hide the hexadecimal color forms.
             */
            get: function () {
                return this._hideHexForms;
            },
            set: function (value) {
                this._hideHexForms = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccColorPickerComponent.prototype, "hideEmpty", {
            /**
             * Hide empty slots from the collection UsedColors
             */
            get: function () {
                return this._hideEmpty;
            },
            set: function (value) {
                this._hideEmpty = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccColorPickerComponent.prototype, "hideTransparent", {
            /**
             * Hide transparent option of UsedColors
             */
            get: function () {
                return this._hideTransparent;
            },
            set: function (value) {
                this._hideTransparent = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccColorPickerComponent.prototype, "hideUsedColors", {
            /**
             * Hide UsedColors collection
             */
            get: function () {
                return this._hideUsedColors;
            },
            set: function (value) {
                this._hideUsedColors = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccColorPickerComponent.prototype, "selectedColor", {
            /**
             * Start with a color selected
             */
            get: function () {
                return this._selectedColor;
            },
            set: function (value) {
                if (this._selectedColor !== value) {
                    this.changeDetectorRef.markForCheck();
                }
                this._selectedColor = coerceHexaColor(value) || this.emptyColor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccColorPickerComponent.prototype, "isOpen", {
            /**
             * Define if the panel will be initiated open
             */
            get: function () {
                return this._isOpen;
            },
            set: function (value) {
                this._isOpen = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccColorPickerComponent.prototype, "overlay", {
            /**
             * Define if the panel will show in overlay or not
             */
            get: function () {
                return this._overlay;
            },
            set: function (value) {
                this._overlay = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccColorPickerComponent.prototype, "hideButtons", {
            /**
             * Hide the action buttons (cancel/confirm)
             */
            get: function () {
                return this._hideButtons;
            },
            set: function (value) {
                this._hideButtons = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccColorPickerComponent.prototype, "colorPickerSelectorHeight", {
            /**
             * Define new height for the selector
             */
            get: function () {
                return this._colorPickerSelectorHeight;
            },
            set: function (height) {
                this._colorPickerSelectorHeight = height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccColorPickerComponent.prototype, "hideColorPickerSelector", {
            /**
             * Hide the color picker selector
             */
            get: function () {
                return this._hideColorPickerSelector;
            },
            set: function (value) {
                this._hideColorPickerSelector = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccColorPickerComponent.prototype, "tmpSelectedColor$", {
            /**
             * Return a Observable with the color the user is picking
             */
            get: function () {
                return this._tmpSelectedColor.asObservable();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccColorPickerComponent.prototype, "usedColors$", {
            /**
             * Observable with all the colors used by the user
             */
            get: function () {
                var _this = this;
                return this.colorPickerService
                    .getColors()
                    .pipe(operators.map(function (colors) { return (!_this._reverseUsedColor ? colors : __spread(colors).reverse()); }));
            },
            enumerable: true,
            configurable: true
        });
        MccColorPickerComponent.prototype.ngOnInit = function () {
            if (!this._selectedColor) {
                this._selectedColor = this.emptyColor;
            }
            this._tmpSelectedColor = new rxjs.BehaviorSubject(this._selectedColor);
        };
        /**
         * Walk throw all collections and subcribe to changes
         */
        MccColorPickerComponent.prototype.ngAfterContentInit = function () {
            var _this = this;
            if (this._collections) {
                this._collections.forEach(function (collection) {
                    var subscription = collection.changeColor.subscribe(function (color) {
                        _this.updateTmpSelectedColor(color);
                    });
                    _this._collectionSubs.push(subscription);
                });
            }
        };
        /**
         * Destroy all subscriptions
         */
        MccColorPickerComponent.prototype.ngOnDestroy = function () {
            if (this._collectionSubs) {
                this._collectionSubs.forEach(function (subscription) {
                    if (subscription && !subscription.closed) {
                        subscription.unsubscribe();
                    }
                });
            }
        };
        /**
         * Update selected color and emit the change
         */
        MccColorPickerComponent.prototype._updateSelectedColor = function () {
            if (this._isOpen || !this.overlay) {
                var tmpSelectedColor = this._tmpSelectedColor.getValue();
                if (this._selectedColor !== tmpSelectedColor) {
                    this._selectedColor = tmpSelectedColor;
                    this.selected.next(this._selectedColor);
                }
                else {
                    this.selected.emit(this._selectedColor);
                }
            }
        };
        /**
         * Open/close color picker panel
         */
        MccColorPickerComponent.prototype.toggle = function () {
            this._isOpen = !this._isOpen;
            if (!this._isOpen && this._selectedColor !== this.emptyColor) {
                this.colorPickerService.addColor(this._selectedColor);
            }
        };
        /**
         * Update selected color, close the panel and notify the user
         */
        MccColorPickerComponent.prototype.backdropClick = function () {
            if (this._hideButtons) {
                this.confirmSelectedColor();
            }
            else {
                this.cancelSelection();
            }
            this.clickOut.emit(null);
        };
        /**
         * Update tmpSelectedColor
         * @param color string
         */
        MccColorPickerComponent.prototype.updateTmpSelectedColor = function (color) {
            if (color || color === this.emptyColor) {
                this._tmpSelectedColor.next(color);
                this.change.next(color);
                if (this._hideButtons) {
                    this._updateSelectedColor();
                }
            }
        };
        /**
         * Cancel the selection and close the panel
         */
        MccColorPickerComponent.prototype.cancelSelection = function () {
            this._tmpSelectedColor.next(this._selectedColor);
            this.toggle();
        };
        /**
         * Update selectedColor and close the panel
         */
        MccColorPickerComponent.prototype.confirmSelectedColor = function () {
            this._updateSelectedColor();
            this.toggle();
        };
        MccColorPickerComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef },
            { type: MccColorPickerService },
            { type: String, decorators: [{ type: core.Inject, args: [EMPTY_COLOR,] }] }
        ]; };
        __decorate([
            core.ContentChildren(MccColorPickerCollectionComponent)
        ], MccColorPickerComponent.prototype, "_collections", void 0);
        __decorate([
            core.Input()
        ], MccColorPickerComponent.prototype, "usedColorLabel", null);
        __decorate([
            core.Input()
        ], MccColorPickerComponent.prototype, "usedColorStart", null);
        __decorate([
            core.Input()
        ], MccColorPickerComponent.prototype, "reverseUsedColors", null);
        __decorate([
            core.Input('hideHexForms')
        ], MccColorPickerComponent.prototype, "hideHexForms", null);
        __decorate([
            core.Input('hideEmptyUsedColors')
        ], MccColorPickerComponent.prototype, "hideEmpty", null);
        __decorate([
            core.Input('hideTransparentUsedColors')
        ], MccColorPickerComponent.prototype, "hideTransparent", null);
        __decorate([
            core.Input('hideUsedColors')
        ], MccColorPickerComponent.prototype, "hideUsedColors", null);
        __decorate([
            core.Input()
        ], MccColorPickerComponent.prototype, "selectedColor", null);
        __decorate([
            core.Input()
        ], MccColorPickerComponent.prototype, "isOpen", null);
        __decorate([
            core.Input()
        ], MccColorPickerComponent.prototype, "overlay", null);
        __decorate([
            core.Input()
        ], MccColorPickerComponent.prototype, "hideButtons", null);
        __decorate([
            core.Input()
        ], MccColorPickerComponent.prototype, "colorPickerSelectorHeight", null);
        __decorate([
            core.Input()
        ], MccColorPickerComponent.prototype, "hideColorPickerSelector", null);
        __decorate([
            core.Input()
        ], MccColorPickerComponent.prototype, "usedSizeColors", void 0);
        __decorate([
            core.Input()
        ], MccColorPickerComponent.prototype, "btnCancel", void 0);
        __decorate([
            core.Input()
        ], MccColorPickerComponent.prototype, "btnConfirm", void 0);
        __decorate([
            core.Output()
        ], MccColorPickerComponent.prototype, "change", void 0);
        __decorate([
            core.Output()
        ], MccColorPickerComponent.prototype, "selected", void 0);
        __decorate([
            core.Output()
        ], MccColorPickerComponent.prototype, "clickOut", void 0);
        MccColorPickerComponent = __decorate([
            core.Component({
                selector: 'mcc-color-picker',
                template: "<!-- color picker overlay -->\n<ng-container *ngIf=\"overlay\">\n    <button type=\"button\" class=\"btn-picker\" cdkOverlayOrigin #trigger=\"cdkOverlayOrigin\" [ngClass]=\"{ 'empty': selectedColor === emptyColor }\"\n        [style.background]=\"selectedColor\" (click)=\"toggle()\">\n        <div class=\"transparent\" *ngIf=\"selectedColor === emptyColor\"></div>\n    </button>\n\n    <ng-template cdkConnectedOverlay cdkConnectedOverlayHasBackdrop cdkConnectedOverlayBackdropClass=\"mcc-color-picker-backdrop\"\n        [cdkConnectedOverlayOrigin]=\"trigger\" [cdkConnectedOverlayOpen]=\"isOpen\" (backdropClick)=\"backdropClick()\">\n\n        <ng-template [cdkPortalOutlet]=\"overlayPanel\"></ng-template>\n\n    </ng-template>\n</ng-container>\n\n<!-- color picker flat -->\n<ng-template *ngIf=\"!overlay\" [cdkPortalOutlet]=\"overlayPanel\"></ng-template>\n\n<!-- color picker component content -->\n<ng-template cdkPortal #overlayPanel=\"cdkPortal\">\n\n    <div class=\"mcc-color-picker-overlay mat-elevation-z6\" role=\"dialog\" aria-label=\"Color picker\">\n\n        <mcc-color-picker-selector *ngIf=\"!hideColorPickerSelector\" [selectedColor]=\"tmpSelectedColor$ | async\" [hideHexForms]=\"hideHexForms\"\n            [height]=\"colorPickerSelectorHeight\" (changeSelectedColor)=\"updateTmpSelectedColor($event)\">\n        </mcc-color-picker-selector>\n\n        <mcc-color-picker-collection *ngIf=\"!hideUsedColors\" [label]=\"usedColorLabel\" [size]=\"usedSizeColors\" [transparent]=\"!hideTransparent\"\n            [hideEmpty]=\"hideEmpty\" [colors]=\"usedColors$ | async\" (changeColor)=\"updateTmpSelectedColor($event)\">\n        </mcc-color-picker-collection>\n\n        <ng-content></ng-content>\n\n        <div *ngIf=\"!hideButtons\" class=\"mcc-color-picker-actions\">\n\n            <button mat-button role=\"button\" aria-label=\"Cancel\" (click)=\"cancelSelection()\">\n                {{ btnCancel }}\n            </button>\n\n            <button mat-button role=\"button\" aria-label=\"Confirm\" (click)=\"confirmSelectedColor()\">\n                {{ btnConfirm }}\n            </button>\n\n        </div>\n\n    </div>\n\n</ng-template>",
                preserveWhitespaces: false,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                styles: ["@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700);.btn-picker{width:25px;height:25px;cursor:pointer;background:0 0;border:2px solid #ddd}.btn-picker.empty{background:#fff!important}.mcc-color-picker-overlay{display:flex;width:260px;min-height:80px;position:relative;flex-direction:column;padding:0;background:#fff;font-family:'Open Sans',sans-serif}.mcc-color-picker-overlay .mcc-color-picker-preview{width:100%;height:8px}.transparent{width:32px;height:2px;border-bottom:2px solid red;transform:translateY(-3px) translateX(-2px) rotate(45deg);-webkit-transform:translateY(-2px) translateX(-11px) rotate(45deg);position:absolute}.mcc-color-picker-actions{display:flex;padding:4px;border-top:1px solid #ddd}.mcc-color-picker-actions button{color:#100214;text-transform:uppercase;font-family:'Open Sans',sans-serif;font-size:12px;font-weight:400;flex-grow:1}"]
            }),
            __param(3, core.Inject(EMPTY_COLOR))
        ], MccColorPickerComponent);
        return MccColorPickerComponent;
    }());

    var MccColorPickerSelectorComponent = /** @class */ (function () {
        function MccColorPickerSelectorComponent(formBuilder, render, emptyColor) {
            this.formBuilder = formBuilder;
            this.render = render;
            this.emptyColor = emptyColor;
            this._height = 170;
            this._selectedColor = '';
            this._hideHexForms = false;
            /**
             * Emit update when a color is selected
             */
            this.changeSelectedColor = new core.EventEmitter();
            /**
             * RGBA current color
             */
            this._rgbaColor = 'rgba(255,0,0,1)';
            /**
             * Handle color of the text
             */
            this.textClass = 'black';
            /**
             * Validate if the mouse button is pressed
             */
            this._isPressed = false;
            /**
             * Form and keys of the fields in RGB
             */
            this.rgbKeys = ['R', 'G', 'B'];
        }
        Object.defineProperty(MccColorPickerSelectorComponent.prototype, "blockCursor", {
            /**
             * Canvas of the block
             */
            set: function (el) {
                this._bc = el;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccColorPickerSelectorComponent.prototype, "stripCursor", {
            /**
             * Container of the strip
             */
            set: function (el) {
                this._sc = el;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccColorPickerSelectorComponent.prototype, "height", {
            /**
             * Change height base of the selector
             */
            set: function (value) {
                this._height = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccColorPickerSelectorComponent.prototype, "selectorHeight", {
            get: function () {
                return this._height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccColorPickerSelectorComponent.prototype, "stripHeight", {
            get: function () {
                return this._height - 10;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccColorPickerSelectorComponent.prototype, "selectedColor", {
            /**
             * Receive selected color from the component
             */
            get: function () {
                return this._selectedColor;
            },
            set: function (value) {
                this._selectedColor = value || this.emptyColor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccColorPickerSelectorComponent.prototype, "hideHexForms", {
            /**
             * Hide the hexadecimal color forms.
             */
            get: function () {
                return this._hideHexForms;
            },
            set: function (value) {
                this._hideHexForms = value;
            },
            enumerable: true,
            configurable: true
        });
        MccColorPickerSelectorComponent.prototype.ngOnInit = function () {
            var _this = this;
            this._tmpSelectedColor = new rxjs.BehaviorSubject(this._selectedColor);
            this._tmpSelectedColorSub = this._tmpSelectedColor.subscribe(function (color) {
                if (color !== _this._selectedColor && isValidColor(color)) {
                    if (_this.hexForm.get('hexCode').value !== color) {
                        _this.hexForm.setValue({ hexCode: color });
                    }
                    _this.changeSelectedColor.emit(coerceHexaColor(color) || _this.emptyColor);
                }
            });
            // hex form
            this.hexForm = this.formBuilder.group({
                hexCode: [this.selectedColor, [forms.Validators.minLength(7), forms.Validators.maxLength(7)]],
            });
            // rgb dynamic form
            var rgbGroup = {};
            var rgbValue = this._getRGB();
            this.rgbKeys.forEach(function (key, index) {
                return (rgbGroup[key] = new forms.FormControl(rgbValue[index], {
                    validators: [
                        forms.Validators.min(0),
                        forms.Validators.max(256),
                        forms.Validators.required,
                        forms.Validators.maxLength(3),
                    ],
                    updateOn: 'blur',
                }));
            });
            this.rgbForm = this.formBuilder.group(rgbGroup);
            // watch changes on forms
            this._onChanges();
        };
        /**
         * Update RGB, RGBA and Gradient when selectedColor change and
         * the mouse button is pressed
         * @param changes SimpleChanges
         */
        MccColorPickerSelectorComponent.prototype.ngOnChanges = function (changes) {
            if ('selectedColor' in changes && changes['selectedColor'].currentValue !== this.emptyColor) {
                if (!this._isPressed) {
                    this._updateRGB();
                    this._updateRGBA();
                    if (this._blockContext) {
                        this._fillGradient();
                    }
                }
                var rgb = this._getRGB();
                var o = Math.round((rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000);
                this.textClass = o > 125 ? 'black' : 'white';
            }
        };
        /**
         * Destroy all subscriptions
         */
        MccColorPickerSelectorComponent.prototype.ngOnDestroy = function () {
            if (this._tmpSelectedColorSub && !this._tmpSelectedColorSub.closed) {
                this._tmpSelectedColorSub.unsubscribe();
            }
            if (this._hexValuesSub && !this._hexValuesSub.closed) {
                this._hexValuesSub.unsubscribe();
            }
            if (this._rgbValuesSub && !this._rgbValuesSub.closed) {
                this._rgbValuesSub.unsubscribe();
            }
        };
        MccColorPickerSelectorComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.render.listen(this._block.nativeElement, 'mousedown', function (e) {
                _this._isPressed = true;
                _this.changeColor(e);
            });
            this.render.listen(this._block.nativeElement, 'mouseup', function () { return (_this._isPressed = false); });
            this.render.listen(this._block.nativeElement, 'mouseout', function () { return (_this._isPressed = false); });
            this.render.listen(this._block.nativeElement, 'mousemove', function (e) { return _this.changeColor(e); });
            this._blockContext = this._bc.nativeElement.getContext('2d');
            this._blockContext.rect(0, 0, this._bc.nativeElement.width, this._bc.nativeElement.height);
            this.render.listen(this._strip.nativeElement, 'mousedown', function (e) {
                _this._isPressed = true;
                _this.changeBaseColor(e);
            });
            this.render.listen(this._strip.nativeElement, 'mouseup', function () { return (_this._isPressed = false); });
            this.render.listen(this._strip.nativeElement, 'mouseout', function () { return (_this._isPressed = false); });
            this.render.listen(this._strip.nativeElement, 'mousemove', function (e) { return _this.changeBaseColor(e); });
            this._stripContext = this._strip.nativeElement.getContext('2d');
            this._stripContext.rect(0, 0, this._strip.nativeElement.width, this._strip.nativeElement.height);
            var grd1 = this._stripContext.createLinearGradient(0, 0, 0, this._bc.nativeElement.height);
            grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
            grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
            grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
            grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
            grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
            grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
            grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
            this._stripContext.fillStyle = grd1;
            this._stripContext.fill();
            this._fillGradient();
        };
        /**
         * Generate colors based on the RGBA color
         */
        MccColorPickerSelectorComponent.prototype._fillGradient = function () {
            this._blockContext.fillStyle = this._rgbaColor;
            this._blockContext.fillRect(0, 0, this._bc.nativeElement.width, this._bc.nativeElement.height);
            var grdWhite = this._stripContext.createLinearGradient(0, 0, this._bc.nativeElement.width, 0);
            grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
            grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
            this._blockContext.fillStyle = grdWhite;
            this._blockContext.fillRect(0, 0, this._bc.nativeElement.width, this._bc.nativeElement.height);
            var grdBlack = this._stripContext.createLinearGradient(0, 0, 0, this._bc.nativeElement.height);
            grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
            grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
            this._blockContext.fillStyle = grdBlack;
            this._blockContext.fillRect(0, 0, this._bc.nativeElement.width, this._bc.nativeElement.height);
        };
        /**
         * Watch change on forms
         */
        MccColorPickerSelectorComponent.prototype._onChanges = function () {
            var _this = this;
            // validate digited code and update when digitation is finished
            this._hexValuesSub = this.hexForm.get('hexCode').valueChanges
                .pipe(operators.map(function (color) { return color !== _this.emptyColor ? coerceHexaColor(color) : color; }))
                .subscribe(function (value) {
                if (!_this._isPressed && isValidColor(value)) {
                    _this._tmpSelectedColor.next(value || _this.emptyColor);
                }
            });
            this._rgbValuesSub = this.rgbForm.valueChanges.subscribe(function (controls) {
                var data = [];
                for (var key in controls) {
                    if (!controls[key] && controls[key] !== 0 || controls[key] > 255) {
                        data.push('');
                        continue;
                    }
                    data.push(controls[key]);
                }
                var hex = _this._getHex(data);
                if (hex !== _this._selectedColor && hex.length === 7) {
                    _this._tmpSelectedColor.next(hex);
                }
            });
        };
        /**
         * Convert HEX/canvas value to rgb
         * @param data any
         * @returns number[]
         */
        MccColorPickerSelectorComponent.prototype._getRGB = function (data) {
            if (data) {
                return [data[0], data[1], data[2]];
            }
            if (!this._selectedColor) {
                return [null, null, null];
            }
            var hex = this._selectedColor.replace('#', '');
            var r = parseInt(hex.slice(0, 2), 16);
            var g = parseInt(hex.slice(2, 4), 16);
            var b = parseInt(hex.slice(4, 6), 16);
            return [r, g, b];
        };
        /**
         * Convert RGB value to HEX
         * @param data any
         * @returns string
         */
        MccColorPickerSelectorComponent.prototype._getHex = function (data) {
            var hex = new Array(3);
            hex[0] = data[0].toString(16);
            hex[1] = data[1].toString(16);
            hex[2] = data[2].toString(16);
            hex.forEach(function (val, key) {
                if (val.length === 1) {
                    hex[key] = '0' + hex[key];
                }
            });
            return coerceHexaColor("" + hex[0] + hex[1] + hex[2]) || this.emptyColor;
        };
        /**
         * Update RGBA color
         * @param data any
         */
        MccColorPickerSelectorComponent.prototype._updateRGBA = function (data) {
            if (!this._selectedColor && !data) {
                this._rgbaColor = 'rgba(255,0,0,1)';
            }
            var rgb = this._getRGB(data);
            this._rgbaColor = "rgba(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ", 1)";
        };
        /**
         * Update RGB form
         * @param data any
         */
        MccColorPickerSelectorComponent.prototype._updateRGB = function (data) {
            if (!this.rgbForm) {
                return;
            }
            if (!data) {
                data = this._getRGB();
            }
            this.rgbForm.setValue({ R: data[0], G: data[1], B: data[2] });
        };
        /**
         * Get selected base color from the canvas
         * @param e MouseEvent
         */
        MccColorPickerSelectorComponent.prototype.changeBaseColor = function (e) {
            if (this._isPressed) {
                this.render.setStyle(this._sc.nativeElement, 'background-position-y', e.offsetY + "px");
                var data = this._stripContext.getImageData(e.offsetX, e.offsetY, 1, 1).data;
                this._updateRGBA(data);
                this._fillGradient();
                this.updateValues(data);
            }
        };
        /**
         * Get selected color from the canvas
         * @param e MouseEvent
         */
        MccColorPickerSelectorComponent.prototype.changeColor = function (e) {
            if (this._isPressed) {
                this.render.setStyle(this._bp.nativeElement, 'top', e.offsetY - 5 + "px");
                this.render.setStyle(this._bp.nativeElement, 'left', e.offsetX - 5 + "px");
                var data = this._blockContext.getImageData(e.offsetX, e.offsetY, 1, 1).data;
                this.updateValues(data);
            }
        };
        /**
         * Emit update from the selected color
         * @param data any
         */
        MccColorPickerSelectorComponent.prototype.updateValues = function (data) {
            if (data) {
                this._updateRGB(data);
                this._tmpSelectedColor.next(this._getHex(data));
            }
        };
        MccColorPickerSelectorComponent.ctorParameters = function () { return [
            { type: forms.FormBuilder },
            { type: core.Renderer2 },
            { type: String, decorators: [{ type: core.Inject, args: [EMPTY_COLOR,] }] }
        ]; };
        __decorate([
            core.ViewChild('block')
        ], MccColorPickerSelectorComponent.prototype, "_block", void 0);
        __decorate([
            core.ViewChild('blockPointer')
        ], MccColorPickerSelectorComponent.prototype, "_bp", void 0);
        __decorate([
            core.ViewChild('blockCanvas')
        ], MccColorPickerSelectorComponent.prototype, "blockCursor", null);
        __decorate([
            core.ViewChild('strip')
        ], MccColorPickerSelectorComponent.prototype, "_strip", void 0);
        __decorate([
            core.ViewChild('stripContainer')
        ], MccColorPickerSelectorComponent.prototype, "stripCursor", null);
        __decorate([
            core.Input('height')
        ], MccColorPickerSelectorComponent.prototype, "height", null);
        __decorate([
            core.Input()
        ], MccColorPickerSelectorComponent.prototype, "selectedColor", null);
        __decorate([
            core.Input('hideHexForms')
        ], MccColorPickerSelectorComponent.prototype, "hideHexForms", null);
        __decorate([
            core.Output()
        ], MccColorPickerSelectorComponent.prototype, "changeSelectedColor", void 0);
        MccColorPickerSelectorComponent = __decorate([
            core.Component({
                selector: 'mcc-color-picker-selector',
                template: "<div class=\"mcc-color-picker-selector\" [ngStyle]=\"{ 'height.px': selectorHeight }\">\n    <div #block class=\"mcc-picker-selector\"></div>\n    <canvas #blockCanvas [height]=\"selectorHeight\" width=\"230\" id=\"picker\"></canvas>\n    <div #blockPointer class=\"mcc-picker-position\" style=\"top: 0px;left: 220px;\"></div>\n\n    <div #stripContainer class=\"mcc-colors-position\" style=\"background-position-y: 0px;\">\n        <canvas #strip [height]=\"stripHeight\" width=\"20\" id=\"colors\"></canvas>\n    </div>\n</div>\n\n<div class=\"mcc-color-picker-selector-preview\" [style.background]=\"selectedColor\">\n    <ng-container *ngIf=\"!hideHexForms\">\n        <form [formGroup]=\"hexForm\">\n            <mat-form-field class=\"hex-input\" floatLabel=\"always\" [ngClass]=\"textClass\">\n                <input matInput placeholder=\"HEX\" maxlength=\"7\" formControlName=\"hexCode\" [value]=\"selectedColor\" />\n            </mat-form-field>\n        </form>\n\n        <form [formGroup]=\"rgbForm\">\n            <mat-form-field class=\"rgb-input\" floatLabel=\"always\" [ngClass]=\"textClass\">\n                <input matInput type=\"number\" placeholder=\"RGB\" maxlength=\"3\" formControlName=\"R\" />\n            </mat-form-field>\n            <mat-form-field class=\"rgb-input\" floatLabel=\"always\" [ngClass]=\"textClass\">\n                <input matInput type=\"number\" maxlength=\"3\" formControlName=\"G\" />\n            </mat-form-field>\n            <mat-form-field class=\"rgb-input\" floatLabel=\"always\" [ngClass]=\"textClass\">\n                <input matInput type=\"number\" maxlength=\"3\" formControlName=\"B\" />\n            </mat-form-field>\n        </form>\n    </ng-container>\n</div>",
                preserveWhitespaces: false,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                styles: ["canvas#colors{margin:5px}canvas:hover{cursor:crosshair}.mcc-picker-selector{position:absolute;width:230px;height:170px;top:0;left:0;z-index:10;cursor:crosshair}.mcc-picker-position{position:absolute;width:10px;height:10px;z-index:1;border:1px solid #ddd;border-radius:50%;background:rgba(0,0,0,.3)}.mcc-colors-position{position:absolute;width:30px;height:160px;top:0;right:0;z-index:1;background:url(data:image/gif;base64,R0lGODdhHgAIALMAAAAAADU1NTk5OUJCQkpKSlZWVltbW2pqaoCAgP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAkAAAoALAAAAAAeAAgAAAQw0BhFq734yjJm/p8xFEVAeGCqGERACmahgkUrvPH81cFdnjoQy8VBBTOiguSokkQAADs=) no-repeat}.mcc-color-picker-selector{height:170px}::ng-deep mat-form-field{font-family:'Open Sans';font-size:11px;font-weight:700}::ng-deep mat-form-field.black{color:#100214}::ng-deep mat-form-field.black label.mat-form-field-label{color:#100214}::ng-deep mat-form-field.black .mat-form-field-underline{background-color:#100214}::ng-deep mat-form-field.white{color:#fff}::ng-deep mat-form-field.white label.mat-form-field-label{color:#fff}::ng-deep mat-form-field.white .mat-form-field-underline{background-color:#fff}.mcc-color-picker-selector-preview{height:40px;padding:15px;border-bottom:1px solid #e1e1e1;box-sizing:content-box}.mcc-color-picker-selector-preview form{display:inline-block;position:relative}.mcc-color-picker-selector-preview .hex-input{width:75px;margin-right:20px}.mcc-color-picker-selector-preview .hex-input input{font-size:16px;font-weight:400}.mcc-color-picker-selector-preview .rgb-input{width:40px;margin-right:5px}.mcc-color-picker-selector-preview .rgb-input input{font-size:16px;font-weight:400}"]
            }),
            __param(2, core.Inject(EMPTY_COLOR))
        ], MccColorPickerSelectorComponent);
        return MccColorPickerSelectorComponent;
    }());

    /**
     * This directive change the background of the button
     */
    var MccColorPickerOptionDirective = /** @class */ (function () {
        function MccColorPickerOptionDirective(elementRef, render, emptyColor) {
            this.elementRef = elementRef;
            this.render = render;
            this.emptyColor = emptyColor;
            this._color = emptyColor;
        }
        Object.defineProperty(MccColorPickerOptionDirective.prototype, "color", {
            /**
             * Receive the color
             */
            get: function () {
                return this._color;
            },
            set: function (value) {
                this._color = value;
            },
            enumerable: true,
            configurable: true
        });
        MccColorPickerOptionDirective.prototype.ngAfterViewInit = function () {
            if (this.color) {
                var color = void 0;
                if (typeof this.color === 'string') {
                    color = this.color;
                }
                else {
                    color = this.color.value;
                    this.render.setAttribute(this.elementRef.nativeElement, 'aria-label', this.color.text);
                }
                if (isValidColor(color)) {
                    // apply the color
                    this.render.setStyle(this.elementRef.nativeElement, 'background', coerceHexaColor(color) || this.emptyColor);
                }
            }
        };
        MccColorPickerOptionDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: String, decorators: [{ type: core.Inject, args: [EMPTY_COLOR,] }] }
        ]; };
        __decorate([
            core.Input('mccColorPickerOption')
        ], MccColorPickerOptionDirective.prototype, "color", null);
        MccColorPickerOptionDirective = __decorate([
            core.Directive({
                selector: '[mccColorPickerOption], [mcc-color-picker-option]',
                exportAs: 'mccColorPickerOption',
            }),
            __param(2, core.Inject(EMPTY_COLOR))
        ], MccColorPickerOptionDirective);
        return MccColorPickerOptionDirective;
    }());
    /**
     * Directive applied to an element to make it usable as an origin for an ColorPicker.
     */
    var MccColorPickerOriginDirective = /** @class */ (function () {
        /**
         * Reference to the element on which the directive is applied.
         */
        function MccColorPickerOriginDirective(elementRef, renderer, emptyColor) {
            var _this = this;
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.emptyColor = emptyColor;
            /**
             * Emit changes from the origin
             */
            this.change = new rxjs.BehaviorSubject('');
            // listen changes onkeyup and update color picker
            renderer.listen(elementRef.nativeElement, 'keyup', function (event) {
                var value = event.currentTarget['value'];
                if (event.isTrusted && isValidColor(value)) {
                    _this.writeValueFromKeyup(coerceHexaColor(value) || _this.emptyColor);
                }
            });
        }
        MccColorPickerOriginDirective_1 = MccColorPickerOriginDirective;
        /**
         * This method will be called by the forms API to write to the view when
         * programmatic (model -> view) changes are requested.
         */
        MccColorPickerOriginDirective.prototype.writeValue = function (color) {
            this.renderer.setProperty(this.elementRef.nativeElement, 'value', color);
            this.change.next(color);
            if (this.propagateChanges) {
                this.propagateChanges(color);
            }
        };
        /**
         * This method will be called by the color picker
         */
        MccColorPickerOriginDirective.prototype.writeValueFromColorPicker = function (color) {
            this.renderer.setProperty(this.elementRef.nativeElement, 'value', color);
            this.propagateChanges(color);
        };
        /**
         * This method will be called from origin whe key is up
         */
        MccColorPickerOriginDirective.prototype.writeValueFromKeyup = function (color) {
            this.change.next(color);
            this.propagateChanges(color);
        };
        /**
         * This is called by the forms API on initialization so it can update the
         * form model when values propagate from the view (view -> model).
         * @param fn any
         */
        MccColorPickerOriginDirective.prototype.registerOnChange = function (fn) {
            this.propagateChanges = fn;
        };
        /**
         * This is called by the forms API on initialization so it can update the form model on blur
         * @param fn any
         */
        MccColorPickerOriginDirective.prototype.registerOnTouched = function (fn) { };
        /**
         * called by the forms API when the control status changes to or from "DISABLED"
         * @param isDisabled boolean
         */
        MccColorPickerOriginDirective.prototype.setDisabledState = function (isDisabled) {
            this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
        };
        var MccColorPickerOriginDirective_1;
        MccColorPickerOriginDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: String, decorators: [{ type: core.Inject, args: [EMPTY_COLOR,] }] }
        ]; };
        __decorate([
            core.Output()
        ], MccColorPickerOriginDirective.prototype, "change", void 0);
        MccColorPickerOriginDirective = MccColorPickerOriginDirective_1 = __decorate([
            core.Directive({
                selector: '[mcc-color-picker-origin], [mccColorPickerOrigin]',
                exportAs: 'mccColorPickerOrigin',
                providers: [
                    {
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return MccColorPickerOriginDirective_1; }),
                        multi: true,
                    },
                ],
            }),
            __param(2, core.Inject(EMPTY_COLOR))
        ], MccColorPickerOriginDirective);
        return MccColorPickerOriginDirective;
    }());
    /**
     * Directive connect an color picker with any input, select or textarea.
     * The color picker will be automatically updated when the value of the origin is
     * changed.
     */
    var MccConnectedColorPickerDirective = /** @class */ (function () {
        function MccConnectedColorPickerDirective(colorPicker, changeDetectorRef, emptyColor) {
            this.colorPicker = colorPicker;
            this.changeDetectorRef = changeDetectorRef;
            this.emptyColor = emptyColor;
        }
        MccConnectedColorPickerDirective.prototype.ngAfterViewInit = function () {
            if (!this._colorPickerSub) {
                this._attachColorPicker();
            }
        };
        MccConnectedColorPickerDirective.prototype.ngOnDestroy = function () {
            if (this._colorPickerSub && !this._colorPickerSub.closed) {
                this._colorPickerSub.unsubscribe();
            }
            if (this._originSub && !this._originSub.closed) {
                this._originSub.unsubscribe();
            }
        };
        /**
         * Attach color picker and origin
         */
        MccConnectedColorPickerDirective.prototype._attachColorPicker = function () {
            var _this = this;
            // subscribe to origin change to update color picker
            this._originSub = this.origin.change.subscribe(function (value) {
                if (isValidColor(value) ||
                    (value === _this.emptyColor && _this.colorPicker.selectedColor !== _this.emptyColor)) {
                    _this.colorPicker.updateTmpSelectedColor(value);
                }
                _this.colorPicker.selectedColor = value;
                _this.changeDetectorRef.detectChanges();
            });
            // subscribe to color picker changes and set on origin element
            this._colorPickerSub = this.colorPicker.change.subscribe(function (value) {
                return _this.origin.writeValueFromColorPicker(value);
            });
        };
        MccConnectedColorPickerDirective.ctorParameters = function () { return [
            { type: MccColorPickerComponent },
            { type: core.ChangeDetectorRef },
            { type: String, decorators: [{ type: core.Inject, args: [EMPTY_COLOR,] }] }
        ]; };
        __decorate([
            core.Input('mccConnectedColorPickerOrigin')
        ], MccConnectedColorPickerDirective.prototype, "origin", void 0);
        MccConnectedColorPickerDirective = __decorate([
            core.Directive({
                selector: '[mcc-connected-color-picker], [mccConnectedColorPicker]',
                exportAs: 'mccConnectedColorPicker',
            }),
            __param(2, core.Inject(EMPTY_COLOR))
        ], MccConnectedColorPickerDirective);
        return MccConnectedColorPickerDirective;
    }());

    var ɵ0 = [];
    var MccColorPickerModule = /** @class */ (function () {
        function MccColorPickerModule() {
        }
        MccColorPickerModule_1 = MccColorPickerModule;
        /**
         *
         */
        MccColorPickerModule.forRoot = function (config) {
            return {
                ngModule: MccColorPickerModule_1,
                providers: [
                    { provide: EMPTY_COLOR, useValue: ('empty_color' in config ? config.empty_color : 'none') },
                    { provide: USED_COLORS, useValue: config.used_colors || [] }
                ],
            };
        };
        var MccColorPickerModule_1;
        MccColorPickerModule = MccColorPickerModule_1 = __decorate([
            core.NgModule({
                imports: [
                    common.CommonModule,
                    portal.PortalModule,
                    overlay.OverlayModule,
                    forms.ReactiveFormsModule,
                    button.MatButtonModule,
                    formField.MatFormFieldModule,
                    input.MatInputModule,
                ],
                declarations: [
                    MccColorPickerComponent,
                    MccConnectedColorPickerDirective,
                    MccColorPickerSelectorComponent,
                    MccColorPickerOriginDirective,
                    MccColorPickerOptionDirective,
                    MccColorPickerCollectionComponent,
                ],
                exports: [
                    MccColorPickerComponent,
                    MccConnectedColorPickerDirective,
                    MccColorPickerOriginDirective,
                    MccColorPickerCollectionComponent,
                ],
                providers: [
                    MccColorPickerService,
                    { provide: EMPTY_COLOR, useValue: 'none' },
                    { provide: USED_COLORS, useValue: ɵ0 }
                ],
            })
        ], MccColorPickerModule);
        return MccColorPickerModule;
    }());

    // scrollspy animations
    var SCROLLSPY_ANIMATION_SMOOTH = 'smooth';
    var SCROLLSPY_ANIMATION_INSTANT = 'instant';
    var SCROLLSPY_ANIMATION_AUTO = 'auto';

    var MccScrollspyService = /** @class */ (function () {
        function MccScrollspyService(window) {
            var _this = this;
            this.window = window;
            /**
             * When scroll is from click event, change this attr to true
             * So scroll event obeservable doesn't emit any update
             */
            this._fromClick = false;
            /**
             * List of scrollspy group
             */
            this.data = [];
            // listen to scroll event
            this._scrollSub = rxjs.fromEvent(window, 'scroll')
                .pipe(operators.debounceTime(50), operators.withLatestFrom(function () { return window.scrollY; }))
                .subscribe(function (position) {
                if (!_this._fromClick) {
                    _this._updateFocused(position);
                }
                _this._fromClick = false;
            });
        }
        MccScrollspyService.prototype.ngOnDestroy = function () {
            if (this._scrollSub && !this._scrollSub.closed) {
                this._scrollSub.unsubscribe();
            }
        };
        /**
         * Update information about wich element is on focus
         * @param position number
         */
        MccScrollspyService.prototype._updateFocused = function (position) {
            this.data.forEach(function (group) {
                var items = [];
                group.items.getValue().forEach(function (item, index) {
                    item.focus = false;
                    if (item.top <= position) {
                        if (items[index - 1]) {
                            items[index - 1].focus = false;
                        }
                        item.focus = true;
                    }
                    items.push(item);
                });
                group.items.next(items);
            });
        };
        /**
         * Create new group of items
         * @param name string
         * @param items MccScrollspyItemDirective[]
         * @param animation ScrollBehavior
         */
        MccScrollspyService.prototype.create = function (name, items, animation) {
            var group = this.data.find(function (group) { return group.name === name; });
            if (!group) {
                group = {
                    name: name,
                    animation: animation || SCROLLSPY_ANIMATION_SMOOTH,
                    items: new rxjs.BehaviorSubject(items || []),
                };
                this.data.push(group);
            }
            else {
                group.items.next(items || []);
            }
            return group;
        };
        /**
         * Return observable of the group
         * @param name string
         */
        MccScrollspyService.prototype.group = function (name) {
            var group = this.data.find(function (g) { return g.name === name; });
            if (!group) {
                group = this.create(name);
            }
            return group.items.asObservable();
        };
        /**
         * Scroll to one of the items
         * @param name string
         * @param id string
         */
        MccScrollspyService.prototype.scrollTo = function (name, id) {
            var _this = this;
            var group = this.data.find(function (group) { return group.name === name; });
            group.items.getValue().forEach(function (item) {
                item.focus = false;
                if (item.id === id) {
                    _this._fromClick = true;
                    _this._updateFocused(item.top);
                    window.scrollTo({ top: item.top, behavior: group.animation });
                }
            });
        };
        MccScrollspyService.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: ['Window',] }] }
        ]; };
        MccScrollspyService = __decorate([
            core.Injectable(),
            __param(0, core.Inject('Window'))
        ], MccScrollspyService);
        return MccScrollspyService;
    }());

    var MccScrollspyItemDirective = /** @class */ (function () {
        function MccScrollspyItemDirective(elementRef, renderer) {
            this.elementRef = elementRef;
            this.renderer = renderer;
        }
        Object.defineProperty(MccScrollspyItemDirective.prototype, "id", {
            get: function () {
                return this._id;
            },
            /**
             * Hold the element id, if element doesn't have id
             * the method will create one
             */
            set: function (id) {
                if (!id) {
                    id = this._createId();
                    this.renderer.setProperty(this.elementRef.nativeElement, 'id', id);
                }
                this._id = id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccScrollspyItemDirective.prototype, "top", {
            /**
             * Element distance of the top
             */
            get: function () {
                return this.elementRef.nativeElement.offsetTop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccScrollspyItemDirective.prototype, "focus", {
            get: function () {
                return this._focused;
            },
            /**
             * Element is focused
             */
            set: function (focused) {
                this._focused = coercion.coerceBooleanProperty(focused);
            },
            enumerable: true,
            configurable: true
        });
        MccScrollspyItemDirective.prototype.ngAfterContentInit = function () {
            if (!this.label) {
                this.label = this.elementRef.nativeElement.textContent;
            }
            this.id = this.elementRef.nativeElement.id;
        };
        /**
         * Create an ID for the element
         */
        MccScrollspyItemDirective.prototype._createId = function () {
            var tmpID = this.label.toLowerCase().replace(/[ ]+/gi, '_');
            return "mcc_scrollspy_" + tmpID;
        };
        MccScrollspyItemDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.Input('focus')
        ], MccScrollspyItemDirective.prototype, "focus", null);
        __decorate([
            core.Input()
        ], MccScrollspyItemDirective.prototype, "label", void 0);
        MccScrollspyItemDirective = __decorate([
            core.Directive({
                selector: '[mccScrollspyItem], [mcc-scrollspy-item]',
                exportAs: 'mccScrollspyItem',
            })
        ], MccScrollspyItemDirective);
        return MccScrollspyItemDirective;
    }());
    var MccScrollspyGroupDirective = /** @class */ (function () {
        function MccScrollspyGroupDirective(mccScrollspyService) {
            this.mccScrollspyService = mccScrollspyService;
        }
        Object.defineProperty(MccScrollspyGroupDirective.prototype, "name", {
            /**
             * Name of the scrollspy group
             */
            set: function (name) {
                this._name = name;
            },
            enumerable: true,
            configurable: true
        });
        MccScrollspyGroupDirective.prototype.ngAfterContentInit = function () {
            // add the group items
            var items = this.items.map(function (item) { return item; });
            this.mccScrollspyService.create(this._name, items);
        };
        MccScrollspyGroupDirective.ctorParameters = function () { return [
            { type: MccScrollspyService }
        ]; };
        __decorate([
            core.ContentChildren(MccScrollspyItemDirective)
        ], MccScrollspyGroupDirective.prototype, "items", void 0);
        __decorate([
            core.Input('mccScrollspyGroup')
        ], MccScrollspyGroupDirective.prototype, "name", null);
        MccScrollspyGroupDirective = __decorate([
            core.Directive({
                selector: '[mccScrollspyGroup], [mcc-scrollspy-group]',
                exportAs: 'mccScrollspyGroup',
            })
        ], MccScrollspyGroupDirective);
        return MccScrollspyGroupDirective;
    }());

    var ɵ0$1 = window;
    var MccScrollspyModule = /** @class */ (function () {
        function MccScrollspyModule() {
        }
        MccScrollspyModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, scrolling.ScrollingModule],
                providers: [MccScrollspyService, { provide: 'Window', useValue: ɵ0$1 }],
                declarations: [MccScrollspyGroupDirective, MccScrollspyItemDirective],
                exports: [MccScrollspyGroupDirective, MccScrollspyItemDirective],
            })
        ], MccScrollspyModule);
        return MccScrollspyModule;
    }());

    /**
     * Default value of action button z-index
     */
    var Z_INDEX = 23;
    /**
     * SPIN animation used on speed-dial
     */
    var SPIN_ANIMATION = animations.trigger('spin', [
        animations.state('open', animations.style({
            transform: 'rotate(360deg)',
        })),
        animations.state('closed', animations.style({
            transform: 'rotate(0deg)',
        })),
        animations.transition('open => closed', [animations.animate('.3s')]),
        animations.transition('closed => open', [animations.animate('.3s')]),
    ]);

    var MccSpeedDialActionsComponent = /** @class */ (function () {
        function MccSpeedDialActionsComponent(renderer) {
            this.renderer = renderer;
            this._animation = new rxjs.BehaviorSubject('scale');
        }
        Object.defineProperty(MccSpeedDialActionsComponent.prototype, "animation", {
            /**
             * Set type of animation will be executed on open/close
             * Type available are: scale | fling
             */
            set: function (animation) {
                this._animation.next(animation);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * The z-index style and animation class are handle separate because
         * z-index will be set only one time, and the animation class will be set
         * every time the animation change
         */
        MccSpeedDialActionsComponent.prototype.ngAfterContentInit = function () {
            var _this = this;
            // set z-index style to each button action
            this._buttons.forEach(function (button, index) {
                _this.renderer.setStyle(button._elementRef.nativeElement, 'z-index', (Z_INDEX - index));
            });
            // set the animation class to each button action
            this._animation.subscribe(function (animation) {
                var nextAnimationClass = "speed-dial-item-animation-" + animation;
                _this._buttons.forEach(function (button) {
                    if (_this._lastAnimationClass) {
                        _this.renderer.removeClass(button._elementRef.nativeElement, _this._lastAnimationClass);
                    }
                    _this.renderer.addClass(button._elementRef.nativeElement, nextAnimationClass);
                });
                _this._lastAnimationClass = nextAnimationClass;
            });
        };
        /**
         * Responsible for change the state of the action buttons to visible
         *
         * @param direction DIRECTION
         */
        MccSpeedDialActionsComponent.prototype.show = function (direction) {
            var _this = this;
            switch (this._animation.value) {
                case 'scale': {
                    this._buttons.forEach(function (button, index) {
                        var transition = 3 + (65 * index);
                        _this.renderer.setStyle(button._elementRef.nativeElement, 'transition-delay', transition + "ms");
                        _this.renderer.setStyle(button._elementRef.nativeElement, 'opacity', '1');
                        _this.renderer.setStyle(button._elementRef.nativeElement, 'transform', 'scale(1)');
                    });
                    break;
                }
                case 'fling': {
                    var translateFn_1 = (direction == 'up' || direction == 'down') ? 'translateY' : 'translateX';
                    var sign_1 = (direction == 'down' || direction == 'right') ? '-' : '';
                    this._buttons.forEach(function (button) {
                        _this.renderer.setStyle(button._elementRef.nativeElement, 'transition-delay', '0ms');
                        _this.renderer.setStyle(button._elementRef.nativeElement, 'opacity', '1');
                        _this.renderer.setStyle(button._elementRef.nativeElement, 'transform', translateFn_1 + "(" + sign_1 + "0)");
                    });
                }
            }
        };
        /**
         * Hide all the buttons action
         *
         * @param direction DIRECTION
         */
        MccSpeedDialActionsComponent.prototype.hide = function (direction) {
            var _this = this;
            switch (this._animation.value) {
                case 'scale': {
                    this._buttons.forEach(function (button, index) {
                        var transition = 3 - (65 * index);
                        _this.renderer.setStyle(button._elementRef.nativeElement, 'transition-delay', transition + "ms");
                        _this.renderer.setStyle(button._elementRef.nativeElement, 'opacity', '0');
                        _this.renderer.setStyle(button._elementRef.nativeElement, 'transform', 'scale(0)');
                    });
                    break;
                }
                case 'fling': {
                    var translateFn_2 = (direction == 'up' || direction == 'down') ? 'translateY' : 'translateX';
                    var sign_2 = (direction == 'down' || direction == 'right') ? '-' : '';
                    this._buttons.forEach(function (button, index) {
                        var transform = (55 * (index + 1) - (index * 5));
                        _this.renderer.setStyle(button._elementRef.nativeElement, 'transition-delay', '0ms');
                        _this.renderer.setStyle(button._elementRef.nativeElement, 'opacity', '1');
                        _this.renderer.setStyle(button._elementRef.nativeElement, 'transform', translateFn_2 + "(" + sign_2 + transform + "px)");
                    });
                }
            }
        };
        MccSpeedDialActionsComponent.ctorParameters = function () { return [
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.ContentChildren(button.MatButton)
        ], MccSpeedDialActionsComponent.prototype, "_buttons", void 0);
        __decorate([
            core.Input()
        ], MccSpeedDialActionsComponent.prototype, "animation", null);
        MccSpeedDialActionsComponent = __decorate([
            core.Component({
                selector: 'mcc-speed-dial-actions',
                template: "<ng-content select=\"button\"></ng-content>",
                encapsulation: core.ViewEncapsulation.None,
                styles: ["mcc-speed-dial-actions .speed-dial-item-animation-scale{transform:scale(0);transition:.3s cubic-bezier(.55,0,.55,.2);transition-duration:.14286s}mcc-speed-dial-actions .speed-dial-item-animation-fling{display:block;opacity:1;transition:.3s cubic-bezier(.55,0,.55,.2)}"]
            })
        ], MccSpeedDialActionsComponent);
        return MccSpeedDialActionsComponent;
    }());

    var MccSpeedDialComponent = /** @class */ (function () {
        function MccSpeedDialComponent() {
            this._isOpen = false;
            this._hover = false;
            this._spin = true;
            this._direction = 'up';
            /**
             * Event emitted when open state change
             */
            this.openStateChange = new core.EventEmitter();
        }
        Object.defineProperty(MccSpeedDialComponent.prototype, "isOpen", {
            get: function () {
                return this._isOpen;
            },
            /**
             * Set initial 'open' state
             */
            set: function (open) {
                this._isOpen = coercion.coerceBooleanProperty(open);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccSpeedDialComponent.prototype, "hover", {
            /**
             * When enabled, handle open/close state on mouse hover
             */
            set: function (hover) {
                this._hover = coercion.coerceBooleanProperty(hover);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccSpeedDialComponent.prototype, "spin", {
            get: function () {
                return this._spin;
            },
            /**
             * Enable/disable spin animation when button is clicked or hovered
             */
            set: function (spin) {
                this._spin = spin;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccSpeedDialComponent.prototype, "direction", {
            get: function () {
                return this._direction;
            },
            /**
             * Define the direction of the actions button
             * Directions available are: up | down | left | right
             */
            set: function (direction) {
                this._direction = direction;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Call fab speed dial actions functions to change the
         * visibility of the buttons
         */
        MccSpeedDialComponent.prototype._setActionsState = function () {
            if (this._isOpen) {
                this.actions.show(this._direction);
            }
            else {
                this.actions.hide(this._direction);
            }
        };
        /**
         * Set initial state to the action buttons inside speed-dial-actions
         */
        MccSpeedDialComponent.prototype.ngAfterViewInit = function () {
            this._setActionsState();
        };
        /**
         *
         */
        MccSpeedDialComponent.prototype.ngOnChanges = function (changes) {
            if ('isOpen' in changes && changes['isOpen'].previousValue !== undefined) {
                this._setActionsState();
            }
        };
        /**
         * When mouseHover is enabled and state is closed
         * calls toggle to open the actions
         */
        MccSpeedDialComponent.prototype.hoverStart = function () {
            if (this._hover && !this._isOpen) {
                this.toggle();
            }
        };
        /**
         * When mouseHover is enabled and state is open
         * calls toggle to close the actions
         */
        MccSpeedDialComponent.prototype.hoverStop = function () {
            if (this._hover && this._isOpen) {
                this.toggle();
            }
        };
        /**
         * Change the open state
         */
        MccSpeedDialComponent.prototype.toggle = function () {
            this._isOpen = !this._isOpen;
            this._setActionsState();
            this.openStateChange.emit(this._isOpen);
        };
        __decorate([
            core.ContentChild(MccSpeedDialActionsComponent)
        ], MccSpeedDialComponent.prototype, "actions", void 0);
        __decorate([
            core.Input('open')
        ], MccSpeedDialComponent.prototype, "isOpen", null);
        __decorate([
            core.Input('mouseHover')
        ], MccSpeedDialComponent.prototype, "hover", null);
        __decorate([
            core.Input()
        ], MccSpeedDialComponent.prototype, "spin", null);
        __decorate([
            core.Input()
        ], MccSpeedDialComponent.prototype, "direction", null);
        __decorate([
            core.Output()
        ], MccSpeedDialComponent.prototype, "openStateChange", void 0);
        MccSpeedDialComponent = __decorate([
            core.Component({
                selector: 'mcc-speed-dial',
                template: "<div class=\"mcc-speed-dial-container\" [ngClass]=\"'mcc-speed-dial-direction-' + direction\">\n  <button mat-fab [@spin]=\"spin && isOpen ? 'open' : 'closed'\" class=\"mat-elevation-z1\" (mouseenter)=\"hoverStart()\"\n    (mouseleave)=\"hoverStop()\" (click)=\"toggle()\">\n    <ng-content></ng-content>\n  </button>\n\n  <ng-content select=\"mcc-speed-dial-actions\"></ng-content>\n</div>",
                animations: [SPIN_ANIMATION],
                styles: [".mcc-speed-dial-container{position:relative;display:flex;align-items:center;z-index:20}.mcc-speed-dial-container button{pointer-events:auto;z-index:24}.mcc-speed-dial-container ::ng-deep mcc-speed-dial-actions{display:flex;height:auto}.mcc-speed-dial-container.mcc-speed-dial-direction-up{flex-direction:column}.mcc-speed-dial-container.mcc-speed-dial-direction-up button{order:2}.mcc-speed-dial-container.mcc-speed-dial-direction-up ::ng-deep mcc-speed-dial-actions{flex-direction:column-reverse;order:1}.mcc-speed-dial-container.mcc-speed-dial-direction-up ::ng-deep mcc-speed-dial-actions .mat-mini-fab{margin-bottom:10px}.mcc-speed-dial-container.mcc-speed-dial-direction-down{flex-direction:column}.mcc-speed-dial-container.mcc-speed-dial-direction-down button{order:1}.mcc-speed-dial-container.mcc-speed-dial-direction-down ::ng-deep mcc-speed-dial-actions{flex-direction:column;order:2}.mcc-speed-dial-container.mcc-speed-dial-direction-down ::ng-deep mcc-speed-dial-actions .mat-mini-fab{margin-top:10px}.mcc-speed-dial-container.mcc-speed-dial-direction-left{flex-direction:row}.mcc-speed-dial-container.mcc-speed-dial-direction-left button{order:2}.mcc-speed-dial-container.mcc-speed-dial-direction-left ::ng-deep mcc-speed-dial-actions{flex-direction:row-reverse;order:1}.mcc-speed-dial-container.mcc-speed-dial-direction-left ::ng-deep mcc-speed-dial-actions .mat-mini-fab{margin-right:10px}.mcc-speed-dial-container.mcc-speed-dial-direction-right{flex-direction:row}.mcc-speed-dial-container.mcc-speed-dial-direction-right button{order:1}.mcc-speed-dial-container.mcc-speed-dial-direction-right ::ng-deep mcc-speed-dial-actions{flex-direction:row;order:2}.mcc-speed-dial-container.mcc-speed-dial-direction-right ::ng-deep mcc-speed-dial-actions .mat-mini-fab{margin-left:10px}"]
            })
        ], MccSpeedDialComponent);
        return MccSpeedDialComponent;
    }());

    var MccSpeedDialModule = /** @class */ (function () {
        function MccSpeedDialModule() {
        }
        MccSpeedDialModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, button.MatButtonModule],
                declarations: [MccSpeedDialComponent, MccSpeedDialActionsComponent],
                exports: [MccSpeedDialComponent, MccSpeedDialActionsComponent],
            })
        ], MccSpeedDialModule);
        return MccSpeedDialModule;
    }());

    /**
     * contants to create timer with HOURS or MINUTES
     */
    var HOURS = ['12', '11', '1', '10', '2', '9', '3', '8', '4', '7', '5', '6'];
    var MINUTES = [
        '00',
        '55',
        '05',
        '50',
        '10',
        '45',
        '15',
        '40',
        '20',
        '35',
        '25',
        '30',
    ];

    var MccTimerPickerComponent = /** @class */ (function () {
        function MccTimerPickerComponent() {
            /**
             * Receive selected _hour after confirm
             */
            this._selectedHour = '12';
            /**
             * Receive selected _minute after confirm
             */
            this._selectedMinute = '00';
            /**
             * Receive selected _period after confirm
             */
            this._selectedPeriod = 'am';
            this._clock = new rxjs.BehaviorSubject(HOURS);
            this._focus = 'hour';
            this._hour = '12';
            this._minute = '00';
            this._period = 'am';
            this._hideButtons = false;
            /**
             * Format of the hour to be emited on confirm
             */
            this.format = '12';
            this.min = '00:00 am';
            this.max = '12:00 pm';
            /**
             * Change btnCancel label
             */
            this.btnCancel = 'Cancel';
            /**
             * Change btnConfirm label
             */
            this.btnConfirm = 'Ok';
            /**
             * Event emited when confirm button is pressed.
             * If buttons are hidden, the event is emited when value is changed
             */
            this.selected = new core.EventEmitter();
            /**
             * Set to true when timer picker have been connected with another component
             */
            this.connected = false;
        }
        Object.defineProperty(MccTimerPickerComponent.prototype, "clock$", {
            /**
             * Current value (hour/minute) to create the clock
             */
            get: function () {
                return this._clock.asObservable();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccTimerPickerComponent.prototype, "focus", {
            /**
             * Type there is in focus (hour/minute)
             */
            get: function () {
                return this._focus;
            },
            set: function (value) {
                if (value !== this._focus) {
                    this._focus = value;
                    this._clock.next(this._focus === 'hour' ? HOURS : MINUTES);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccTimerPickerComponent.prototype, "isOpen", {
            /**
             * State of the overlay
             */
            get: function () {
                return this._isOpen;
            },
            set: function (value) {
                this._isOpen = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccTimerPickerComponent.prototype, "hour", {
            /**
             * Return temporary selected hour (const HOURS)
             */
            get: function () {
                return this._hour;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccTimerPickerComponent.prototype, "minute", {
            /**
             * Return temporary selected minute (const MINUTES)
             */
            get: function () {
                return this._minute;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccTimerPickerComponent.prototype, "period", {
            /**
             * Return temporary selected period (am/pm)
             */
            get: function () {
                return this._period;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MccTimerPickerComponent.prototype, "hideButtons", {
            /**
             * Hide Confirm and Cancel buttons
             */
            get: function () {
                return this._hideButtons;
            },
            set: function (value) {
                this._hideButtons = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Return timer option class to create line between the middle of the clock and
         * the option
         */
        MccTimerPickerComponent.prototype.getSelectedClass = function () {
            var _this = this;
            var name = 'selected-index-';
            if (this.focus === 'hour') {
                name += HOURS.findIndex(function (h) { return h === _this.hour; });
            }
            else {
                name += MINUTES.findIndex(function (m) { return m === _this.minute; });
            }
            return name;
        };
        /**
         * Select option from the clock.
         * @param value MccTimerPickerHour | MccTimerPickerMinute
         */
        MccTimerPickerComponent.prototype.select = function (value) {
            if (this.focus === 'hour') {
                this._hour = value;
                this.focus = 'min';
            }
            else {
                this._minute = value;
            }
            // if buttons are hidden, emit new event when value is changed
            if (this._hideButtons) {
                this.confirmSelectedTime();
            }
        };
        /**
         * Returns array containing time, hour and period fragments from time string
         * @param time string
         */
        MccTimerPickerComponent.prototype.parseTimeInput = function (time) {
            var parsed = time.split(/\s|:/).map(function (fragment, index) {
                return index === 2 ? fragment : parseInt(fragment, 10);
            });
            if (parsed.length === 2) {
                // assume we are using 24 hour time format
                var hours = parsed[0];
                if (hours > 11) {
                    parsed[0] = hours - 12;
                    parsed.push('pm');
                }
                else {
                    parsed.push('am');
                }
            }
            return parsed;
        };
        /**
         * Returns true if option value is not valid
         * @param value MccTimerPickerHour | MccTimerPickerMinute
         */
        MccTimerPickerComponent.prototype.isOptionDisabled = function (value) {
            var _a = __read(this.parseTimeInput(this.min), 3), minHour = _a[0], minMinutes = _a[1], minPeriod = _a[2];
            var _b = __read(this.parseTimeInput(this.max), 3), maxHour = _b[0], maxMinutes = _b[1], maxPeriod = _b[2];
            var optionValue = parseInt(value, 10);
            var selectedHour = parseInt(this._hour, 10);
            var selectedPeriod = this._period;
            if (this.focus === 'hour') {
                if (optionValue < minHour && selectedPeriod === minPeriod) {
                    return true;
                }
                else if (optionValue > maxHour && selectedPeriod === maxPeriod) {
                    return true;
                }
            }
            else {
                if (selectedHour === minHour && selectedPeriod === minPeriod && optionValue < minMinutes) {
                    return true;
                }
                else if (selectedHour === maxHour && selectedPeriod === maxPeriod && optionValue > maxMinutes) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Change period of the clock
         * @param period MccTimerPickerPeriod
         */
        MccTimerPickerComponent.prototype.changePeriod = function (period) {
            this._period = period;
            // if buttons are hidden, emit new event when value is changed
            if (this._hideButtons) {
                this.confirmSelectedTime();
            }
        };
        /**
         * Update selected color, close the panel and notify the user
         */
        MccTimerPickerComponent.prototype.backdropClick = function () {
            this.confirmSelectedTime();
            this._isOpen = false;
        };
        /**
         * Change values to last confirm select time
         */
        MccTimerPickerComponent.prototype.cancelSelection = function () {
            this._hour = this._selectedHour;
            this._minute = this._selectedMinute;
            this._period = this._selectedPeriod;
            this._isOpen = false;
        };
        /**
         * Set new values of time and emit new event with the formated timer
         */
        MccTimerPickerComponent.prototype.confirmSelectedTime = function () {
            this._selectedHour = this.hour;
            this._selectedMinute = this.minute;
            this._selectedPeriod = this.period;
            // format string to emit selected time
            var formated;
            if (this.format === '12') {
                formated = this.hour + ":" + this.minute + " " + this.period;
            }
            else {
                var hour = this.hour;
                if (this.period === 'pm') {
                    hour = "" + (parseInt(hour) + 12);
                }
                formated = hour + ":" + this.minute;
            }
            this.selected.emit(formated);
            // only close automatically if button aren't hidden
            if (!this._hideButtons) {
                this._isOpen = false;
            }
        };
        __decorate([
            core.Input()
        ], MccTimerPickerComponent.prototype, "hideButtons", null);
        __decorate([
            core.Input('mccTimerPickerFormat')
        ], MccTimerPickerComponent.prototype, "format", void 0);
        __decorate([
            core.Input('mccTimerPickerMin')
        ], MccTimerPickerComponent.prototype, "min", void 0);
        __decorate([
            core.Input('mccTimerPickerMax')
        ], MccTimerPickerComponent.prototype, "max", void 0);
        __decorate([
            core.Input()
        ], MccTimerPickerComponent.prototype, "btnCancel", void 0);
        __decorate([
            core.Input()
        ], MccTimerPickerComponent.prototype, "btnConfirm", void 0);
        __decorate([
            core.Output()
        ], MccTimerPickerComponent.prototype, "selected", void 0);
        MccTimerPickerComponent = __decorate([
            core.Component({
                selector: 'mcc-timer-picker',
                template: "<!-- show component inside overlay -->\n<ng-container *ngIf=\"connected\">\n  <ng-template cdkConnectedOverlay cdkConnectedOverlayHasBackdrop cdkConnectedOverlayBackdropClass=\"mcc-timer-picker-backdrop\" [cdkConnectedOverlayOrigin]=\"trigger\"\n    [cdkConnectedOverlayOpen]=\"isOpen\" (backdropClick)=\"backdropClick()\">\n\n    <ng-template [cdkPortalOutlet]=\"panelComponent\"></ng-template>\n\n  </ng-template>\n</ng-container>\n\n<ng-template *ngIf=\"!connected\" [cdkPortalOutlet]=\"panelComponent\"></ng-template>\n\n<ng-template cdkPortal #panelComponent=\"cdkPortal\">\n  <div class=\"mcc-timer-picker-overlay mat-elevation-z6\" role=\"dialog\" aria-label=\"Timer picker\">\n\n    <div class=\"mcc-timer-picker-header mat-primary\">\n      <button mat-icon-button class=\"mcc-timer-picker-hours\" [ngClass]=\"{ 'mcc-active': focus === 'hour' }\" (click)=\"focus = 'hour'\">\n        {{ hour }}\n      </button>\n      <span class=\"mcc-timer-picker-separator\"></span>\n      <button mat-icon-button class=\"mcc-timer-picker-minutes\" [ngClass]=\"{ 'mcc-active': focus === 'min' }\" (click)=\"focus = 'min'\">\n        {{ minute }}\n      </button>\n\n      <div class=\"mcc-timer-picker-am-pm\">\n        <button mat-icon-button [ngClass]=\"{ 'mcc-active': period === 'am' }\" (click)=\"changePeriod('am')\">\n          AM\n        </button>\n        <button mat-icon-button [ngClass]=\"{ 'mcc-active': period === 'pm' }\" (click)=\"changePeriod('pm')\">\n          PM\n        </button>\n      </div>\n    </div>\n\n    <div class=\"mcc-timer-picker-content\">\n\n      <div class=\"mcc-timer-picker-clock\">\n        <div class=\"mcc-timer-picker-dot\"></div>\n        <div class=\"mcc-timer-picker-line\" [ngClass]=\"getSelectedClass()\"></div>\n        <ng-container *ngFor=\"let option of clock$ | async;let i = index;\">\n          <button mat-icon-button class=\"mcc-timer-picker-option\" [ngClass]=\"{ 'mcc-timer-picker-option-selected': focus === 'hour' && hour == option || focus === 'min' && minute === option }\"\n            [id]=\"'option-'+i\" (click)=\"select(option)\" [disabled]=\"isOptionDisabled(option)\">\n            {{ option }}\n          </button>\n        </ng-container>\n      </div>\n\n    </div>\n\n    <div *ngIf=\"!hideButtons\" class=\"mcc-timer-picker-actions\" dir=\"rtl\">\n\n      <button mat-button role=\"button\" aria-label=\"Confirm\" (click)=\"confirmSelectedTime()\">\n        {{ btnConfirm }}\n      </button>\n\n      <button mat-button role=\"button\" aria-label=\"Cancel\" (click)=\"cancelSelection()\">\n        {{ btnCancel }}\n      </button>\n\n    </div>\n\n  </div>\n</ng-template>",
                preserveWhitespaces: false,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                styles: ["@import url(https://fonts.googleapis.com/css?family=Roboto);.mcc-timer-picker-overlay{width:290px;height:400px}.mcc-timer-picker-header{display:flex;width:220px;height:65px;padding:10px 0 5px 70px;background:#00796b}.mcc-timer-picker-hours,.mcc-timer-picker-minutes{width:63px;height:63px;font-family:Roboto,sans-serif;font-size:50px;font-weight:400;color:rgba(255,255,255,.3)}.mcc-timer-picker-hours.mcc-standalone,.mcc-timer-picker-minutes.mcc-standalone{text-align:right}.mcc-timer-picker-hours.mcc-active,.mcc-timer-picker-minutes.mcc-active{color:#fff}.mcc-timer-picker-separator{font-family:Roboto,sans-serif;font-size:43px;font-weight:400;color:rgba(255,255,255,.3);margin:5px 5px 0 0}.mcc-timer-picker-separator::after{content:':'}.mcc-timer-picker-am-pm{display:flex;flex-direction:column;margin:10px}.mcc-timer-picker-am-pm button{width:25px;height:25px;line-height:25px;font-family:Roboto,sans-serif;font-size:12px;font-weight:400;color:rgba(255,255,255,.3)}.mcc-timer-picker-am-pm button.mcc-active{color:#fff}.mcc-timer-picker-content{width:inherit;height:260px;padding:15px 0 5px;background-color:#fff}.mcc-timer-picker-clock{position:relative;width:250px;height:250px;margin:0 auto;background-color:#eee;border-radius:50%;text-align:center}.mcc-timer-picker-clock .mcc-timer-picker-dot{position:absolute;width:8px;height:8px;border-radius:50%;background-color:#00796b;top:125px;left:125px}.mcc-timer-picker-clock .mcc-timer-picker-line{position:absolute;width:2px;height:100px;top:11.5%;left:51%;transform-origin:50% 100%;background-color:#00796b}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-0{transform:rotateZ(0);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-1{transform:rotateZ(327deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-2{transform:rotateZ(30deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-3{transform:rotateZ(300deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-4{transform:rotateZ(60deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-5{transform:rotateZ(270deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-6{transform:rotateZ(90deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-7{transform:rotateZ(240deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-8{transform:rotateZ(120deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-9{transform:rotateZ(210deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-10{transform:rotateZ(150deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-11{transform:rotateZ(180deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-option{position:absolute}.mcc-timer-picker-clock .mcc-timer-picker-option.mcc-timer-picker-option-selected{color:#fff;background-color:#00796b}.mcc-timer-picker-clock .mcc-timer-picker-option#option-0{top:0;left:113px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-1{top:25px;left:55px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-2{top:25px;right:55px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-3{top:63px;left:20px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-4{top:63px;right:20px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-5{top:113px;left:0}.mcc-timer-picker-clock .mcc-timer-picker-option#option-6{top:113px;right:0}.mcc-timer-picker-clock .mcc-timer-picker-option#option-7{bottom:55px;left:20px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-8{bottom:55px;right:20px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-9{bottom:20px;left:63px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-10{bottom:20px;right:55px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-11{bottom:0;left:113px}.mcc-timer-picker-actions{display:flex;padding:4px;background-color:#fff}.mcc-timer-picker-actions button{color:#100214;text-transform:uppercase;font-family:Roboto,sans-serif;font-size:14px;font-weight:400}::ng-deep .mat-icon-button{width:30px;height:30px;line-height:30px}"]
            })
        ], MccTimerPickerComponent);
        return MccTimerPickerComponent;
    }());

    var MccTimerPickerOriginDirective = /** @class */ (function () {
        /**
         * Reference to the element on which the directive is applied.
         */
        function MccTimerPickerOriginDirective(elementRef, renderer) {
            var _this = this;
            this.elementRef = elementRef;
            this.renderer = renderer;
            /**
             * Emit changes from the origin
             */
            this.change = new rxjs.BehaviorSubject('');
            /**
             * Emit changes from the origin
             */
            this.hasFocus = new rxjs.BehaviorSubject(false);
            // listen focus
            renderer.listen(elementRef.nativeElement, 'focus', function () { return _this.hasFocus.next(true); });
        }
        MccTimerPickerOriginDirective_1 = MccTimerPickerOriginDirective;
        /**
         * This method will be called by the forms API to write to the view when
         * programmatic (model -> view) changes are requested.
         */
        MccTimerPickerOriginDirective.prototype.writeValue = function (time) {
            this.renderer.setProperty(this.elementRef.nativeElement, 'value', time);
            this.change.next(time);
            if (this.propagateChanges) {
                this.propagateChanges(time);
            }
        };
        /**
         * This method will be called by the time picker
         */
        MccTimerPickerOriginDirective.prototype.writeValueFromTimerPicker = function (time) {
            this.renderer.setProperty(this.elementRef.nativeElement, 'value', time);
            this.propagateChanges(time);
        };
        /**
         * This method will be called from origin whe key is up
         */
        MccTimerPickerOriginDirective.prototype.writeValueFromKeyup = function (time) {
            this.change.next(time);
            this.propagateChanges(time);
        };
        /**
         * This is called by the forms API on initialization so it can update the
         * form model when values propagate from the view (view -> model).
         * @param fn any
         */
        MccTimerPickerOriginDirective.prototype.registerOnChange = function (fn) {
            this.propagateChanges = fn;
        };
        /**
         * This is called by the forms API on initialization so it can update the form model on blur
         * @param fn any
         */
        MccTimerPickerOriginDirective.prototype.registerOnTouched = function (fn) { };
        /**
         * called by the forms API when the control status changes to or from "DISABLED"
         * @param isDisabled boolean
         */
        MccTimerPickerOriginDirective.prototype.setDisabledState = function (isDisabled) {
            this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
        };
        var MccTimerPickerOriginDirective_1;
        MccTimerPickerOriginDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.Output()
        ], MccTimerPickerOriginDirective.prototype, "change", void 0);
        __decorate([
            core.Output()
        ], MccTimerPickerOriginDirective.prototype, "hasFocus", void 0);
        MccTimerPickerOriginDirective = MccTimerPickerOriginDirective_1 = __decorate([
            core.Directive({
                selector: '[mccTimerPickerOrigin], [mcc-timer-picker-origin]',
                exportAs: 'mccTimerPickerOrigin',
                providers: [
                    {
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return MccTimerPickerOriginDirective_1; }),
                        multi: true,
                    },
                ],
            })
        ], MccTimerPickerOriginDirective);
        return MccTimerPickerOriginDirective;
    }());
    var MccConnectedTimerPickerDirective = /** @class */ (function () {
        function MccConnectedTimerPickerDirective(timerPicker, changeDetectorRef) {
            this.timerPicker = timerPicker;
            this.changeDetectorRef = changeDetectorRef;
            this.timerPicker.connected = true;
        }
        MccConnectedTimerPickerDirective.prototype.ngAfterViewInit = function () {
            if (!this._timerPickerSub) {
                this.timerPicker.trigger = this.origin;
                this._attachTimerPicker();
            }
        };
        MccConnectedTimerPickerDirective.prototype.ngOnDestroy = function () {
            if (this._originFocus && !this._originFocus.closed) {
                this._originFocus.unsubscribe();
            }
            if (this._timerPickerSub && !this._timerPickerSub.closed) {
                this._timerPickerSub.unsubscribe();
            }
        };
        /**
         * Attach the timer picker to origin element (input)
         */
        MccConnectedTimerPickerDirective.prototype._attachTimerPicker = function () {
            var _this = this;
            this._originFocus = this.origin.hasFocus.subscribe(function (focused) {
                _this.timerPicker.focus = 'hour';
                _this.timerPicker.isOpen = focused;
                _this.changeDetectorRef.detectChanges();
            });
            this._timerPickerSub = this.timerPicker.selected.subscribe(function (value) {
                return _this.origin.writeValueFromTimerPicker(value);
            });
        };
        MccConnectedTimerPickerDirective.ctorParameters = function () { return [
            { type: MccTimerPickerComponent },
            { type: core.ChangeDetectorRef }
        ]; };
        __decorate([
            core.Input('mccConnectedTimerPickerOrigin')
        ], MccConnectedTimerPickerDirective.prototype, "origin", void 0);
        MccConnectedTimerPickerDirective = __decorate([
            core.Directive({
                selector: '[mccConnectedTimerPicker], [mcc-connected-timer-picker]',
                exportAs: 'mccConnectedTimerPicker',
            })
        ], MccConnectedTimerPickerDirective);
        return MccConnectedTimerPickerDirective;
    }());

    var MccTimerPickerModule = /** @class */ (function () {
        function MccTimerPickerModule() {
        }
        MccTimerPickerModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, portal.PortalModule, overlay.OverlayModule, button.MatButtonModule],
                declarations: [
                    MccTimerPickerComponent,
                    MccTimerPickerOriginDirective,
                    MccConnectedTimerPickerDirective,
                ],
                exports: [
                    MccTimerPickerComponent,
                    MccTimerPickerOriginDirective,
                    MccConnectedTimerPickerDirective,
                ],
            })
        ], MccTimerPickerModule);
        return MccTimerPickerModule;
    }());

    exports.EMPTY_COLOR = EMPTY_COLOR;
    exports.MccColorPickerModule = MccColorPickerModule;
    exports.MccColorPickerService = MccColorPickerService;
    exports.MccScrollspyItemDirective = MccScrollspyItemDirective;
    exports.MccScrollspyModule = MccScrollspyModule;
    exports.MccScrollspyService = MccScrollspyService;
    exports.MccSpeedDialModule = MccSpeedDialModule;
    exports.MccTimerPickerComponent = MccTimerPickerComponent;
    exports.MccTimerPickerModule = MccTimerPickerModule;
    exports.ɵa = USED_COLORS;
    exports.ɵb = MccScrollspyGroupDirective;
    exports.ɵc = MccColorPickerComponent;
    exports.ɵd = MccColorPickerCollectionComponent;
    exports.ɵe = MccColorPickerOptionDirective;
    exports.ɵf = MccColorPickerOriginDirective;
    exports.ɵg = MccConnectedColorPickerDirective;
    exports.ɵh = MccColorPickerSelectorComponent;
    exports.ɵi = MccSpeedDialComponent;
    exports.ɵj = SPIN_ANIMATION;
    exports.ɵk = MccSpeedDialActionsComponent;
    exports.ɵl = MccTimerPickerOriginDirective;
    exports.ɵm = MccConnectedTimerPickerDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-community-components.umd.js.map
