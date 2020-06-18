import { __decorate, __param } from "tslib";
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { EMPTY_COLOR, coerceHexaColor, isValidColor } from './color-picker';
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
        this.changeSelectedColor = new EventEmitter();
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
        this._tmpSelectedColor = new BehaviorSubject(this._selectedColor);
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
            hexCode: [this.selectedColor, [Validators.minLength(7), Validators.maxLength(7)]],
        });
        // rgb dynamic form
        var rgbGroup = {};
        var rgbValue = this._getRGB();
        this.rgbKeys.forEach(function (key, index) {
            return (rgbGroup[key] = new FormControl(rgbValue[index], {
                validators: [
                    Validators.min(0),
                    Validators.max(256),
                    Validators.required,
                    Validators.maxLength(3),
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
            .pipe(map(function (color) { return color !== _this.emptyColor ? coerceHexaColor(color) : color; }))
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
        { type: FormBuilder },
        { type: Renderer2 },
        { type: String, decorators: [{ type: Inject, args: [EMPTY_COLOR,] }] }
    ]; };
    __decorate([
        ViewChild('block')
    ], MccColorPickerSelectorComponent.prototype, "_block", void 0);
    __decorate([
        ViewChild('blockPointer')
    ], MccColorPickerSelectorComponent.prototype, "_bp", void 0);
    __decorate([
        ViewChild('blockCanvas')
    ], MccColorPickerSelectorComponent.prototype, "blockCursor", null);
    __decorate([
        ViewChild('strip')
    ], MccColorPickerSelectorComponent.prototype, "_strip", void 0);
    __decorate([
        ViewChild('stripContainer')
    ], MccColorPickerSelectorComponent.prototype, "stripCursor", null);
    __decorate([
        Input('height')
    ], MccColorPickerSelectorComponent.prototype, "height", null);
    __decorate([
        Input()
    ], MccColorPickerSelectorComponent.prototype, "selectedColor", null);
    __decorate([
        Input('hideHexForms')
    ], MccColorPickerSelectorComponent.prototype, "hideHexForms", null);
    __decorate([
        Output()
    ], MccColorPickerSelectorComponent.prototype, "changeSelectedColor", void 0);
    MccColorPickerSelectorComponent = __decorate([
        Component({
            selector: 'mcc-color-picker-selector',
            template: "<div class=\"mcc-color-picker-selector\" [ngStyle]=\"{ 'height.px': selectorHeight }\">\n    <div #block class=\"mcc-picker-selector\"></div>\n    <canvas #blockCanvas [height]=\"selectorHeight\" width=\"230\" id=\"picker\"></canvas>\n    <div #blockPointer class=\"mcc-picker-position\" style=\"top: 0px;left: 220px;\"></div>\n\n    <div #stripContainer class=\"mcc-colors-position\" style=\"background-position-y: 0px;\">\n        <canvas #strip [height]=\"stripHeight\" width=\"20\" id=\"colors\"></canvas>\n    </div>\n</div>\n\n<div class=\"mcc-color-picker-selector-preview\" [style.background]=\"selectedColor\">\n    <ng-container *ngIf=\"!hideHexForms\">\n        <form [formGroup]=\"hexForm\">\n            <mat-form-field class=\"hex-input\" floatLabel=\"always\" [ngClass]=\"textClass\">\n                <input matInput placeholder=\"HEX\" maxlength=\"7\" formControlName=\"hexCode\" [value]=\"selectedColor\" />\n            </mat-form-field>\n        </form>\n\n        <form [formGroup]=\"rgbForm\">\n            <mat-form-field class=\"rgb-input\" floatLabel=\"always\" [ngClass]=\"textClass\">\n                <input matInput type=\"number\" placeholder=\"RGB\" maxlength=\"3\" formControlName=\"R\" />\n            </mat-form-field>\n            <mat-form-field class=\"rgb-input\" floatLabel=\"always\" [ngClass]=\"textClass\">\n                <input matInput type=\"number\" maxlength=\"3\" formControlName=\"G\" />\n            </mat-form-field>\n            <mat-form-field class=\"rgb-input\" floatLabel=\"always\" [ngClass]=\"textClass\">\n                <input matInput type=\"number\" maxlength=\"3\" formControlName=\"B\" />\n            </mat-form-field>\n        </form>\n    </ng-container>\n</div>",
            preserveWhitespaces: false,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["canvas#colors{margin:5px}canvas:hover{cursor:crosshair}.mcc-picker-selector{position:absolute;width:230px;height:170px;top:0;left:0;z-index:10;cursor:crosshair}.mcc-picker-position{position:absolute;width:10px;height:10px;z-index:1;border:1px solid #ddd;border-radius:50%;background:rgba(0,0,0,.3)}.mcc-colors-position{position:absolute;width:30px;height:160px;top:0;right:0;z-index:1;background:url(data:image/gif;base64,R0lGODdhHgAIALMAAAAAADU1NTk5OUJCQkpKSlZWVltbW2pqaoCAgP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAkAAAoALAAAAAAeAAgAAAQw0BhFq734yjJm/p8xFEVAeGCqGERACmahgkUrvPH81cFdnjoQy8VBBTOiguSokkQAADs=) no-repeat}.mcc-color-picker-selector{height:170px}::ng-deep mat-form-field{font-family:'Open Sans';font-size:11px;font-weight:700}::ng-deep mat-form-field.black{color:#100214}::ng-deep mat-form-field.black label.mat-form-field-label{color:#100214}::ng-deep mat-form-field.black .mat-form-field-underline{background-color:#100214}::ng-deep mat-form-field.white{color:#fff}::ng-deep mat-form-field.white label.mat-form-field-label{color:#fff}::ng-deep mat-form-field.white .mat-form-field-underline{background-color:#fff}.mcc-color-picker-selector-preview{height:40px;padding:15px;border-bottom:1px solid #e1e1e1;box-sizing:content-box}.mcc-color-picker-selector-preview form{display:inline-block;position:relative}.mcc-color-picker-selector-preview .hex-input{width:75px;margin-right:20px}.mcc-color-picker-selector-preview .hex-input input{font-size:16px;font-weight:400}.mcc-color-picker-selector-preview .rgb-input{width:40px;margin-right:5px}.mcc-color-picker-selector-preview .rgb-input input{font-size:16px;font-weight:400}"]
        }),
        __param(2, Inject(EMPTY_COLOR))
    ], MccColorPickerSelectorComponent);
    return MccColorPickerSelectorComponent;
}());
export { MccColorPickerSelectorComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hdGVyaWFsLWNvbW11bml0eS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29sb3ItcGlja2VyL2NvbG9yLXBpY2tlci1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxhQUFhLEVBQ2IsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsRUFDVCxhQUFhLEVBQ2IsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRixPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFjNUU7SUFnSUUseUNBQ1UsV0FBd0IsRUFDeEIsTUFBaUIsRUFDSSxVQUFrQjtRQUZ2QyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ0ksZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQWhGekMsWUFBTyxHQUFXLEdBQUcsQ0FBQztRQVl0QixtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQVk1QixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUV2Qzs7V0FFRztRQUNPLHdCQUFtQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbkQ7O1dBRUc7UUFDSyxlQUFVLEdBQVcsaUJBQWlCLENBQUM7UUFzQi9DOztXQUVHO1FBQ0gs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LGNBQWMsQ0FBQztnRUFBaUI7SUFNM0M7UUFEQyxTQUFTLENBQUMsYUFBYSxDQUFDO3NFQUd4QjtJQU9tQjtRQUFuQixTQUFTLENBQUMsT0FBTyxDQUFDO21FQUFvQjtJQVF2QztRQURDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztzRUFHM0I7SUFPRDtRQURDLEtBQUssQ0FBQyxRQUFRLENBQUM7aUVBR2Y7SUFhRDtRQURDLEtBQUssRUFBRTt3RUFHUDtJQVVEO1FBREMsS0FBSyxDQUFDLGNBQWMsQ0FBQzt1RUFHckI7SUFTUztRQUFULE1BQU0sRUFBRTtnRkFBMEM7SUFoRnhDLCtCQUErQjtRQVAzQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsMkJBQTJCO1lBQ3JDLGd0REFBcUQ7WUFFckQsbUJBQW1CLEVBQUUsS0FBSztZQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7U0FDaEQsQ0FBQztRQW9JRyxXQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtPQW5JWCwrQkFBK0IsQ0EyWjNDO0lBQUQsc0NBQUM7Q0FBQSxBQTNaRCxJQTJaQztTQTNaWSwrQkFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRU1QVFlfQ09MT1IsIGNvZXJjZUhleGFDb2xvciwgaXNWYWxpZENvbG9yIH0gZnJvbSAnLi9jb2xvci1waWNrZXInO1xuXG5pbnRlcmZhY2UgQ29sb3JPcHRpb24ge1xuICB0eXBlOiBzdHJpbmc7XG4gIHZhbHVlOiBudW1iZXI7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21jYy1jb2xvci1waWNrZXItc2VsZWN0b3InLFxuICB0ZW1wbGF0ZVVybDogJy4vY29sb3ItcGlja2VyLXNlbGVjdG9yLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY29sb3ItcGlja2VyLXNlbGVjdG9yLmNvbXBvbmVudC5zY3NzJ10sXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWNjQ29sb3JQaWNrZXJTZWxlY3RvckNvbXBvbmVudFxuICBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogRWxlbWVuUmVmIG9mIHRoZSBtYWluIGNvbG9yXG4gICAqL1xuICAgQFZpZXdDaGlsZCgnYmxvY2snKSBfYmxvY2s6IEVsZW1lbnRSZWY7XG5cbiAgLyoqXG4gICAqIEVsZW1lblJlZiBvZiB0aGUgcG9pbnRlciBtYWluIGNvbG9yXG4gICAqL1xuICBAVmlld0NoaWxkKCdibG9ja1BvaW50ZXInKSBfYnA6IEVsZW1lbnRSZWY7XG5cbiAgLyoqXG4gICAqIENhbnZhcyBvZiB0aGUgYmxvY2tcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ2Jsb2NrQ2FudmFzJylcbiAgc2V0IGJsb2NrQ3Vyc29yKGVsOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5fYmMgPSBlbDtcbiAgfVxuICBwcml2YXRlIF9iYzogRWxlbWVudFJlZjtcbiAgcHJpdmF0ZSBfYmxvY2tDb250ZXh0OiBhbnk7XG5cbiAgLyoqXG4gICAqIEVsZW1lbnRSZWYgb2YgdGhlIGNvbG9yIGJhc2VcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ3N0cmlwJykgX3N0cmlwOiBFbGVtZW50UmVmO1xuICAvLyBob2xkIF9zdHJpcCBjb250ZXh0XG4gIHByaXZhdGUgX3N0cmlwQ29udGV4dDogYW55O1xuXG4gIC8qKlxuICAgKiBDb250YWluZXIgb2YgdGhlIHN0cmlwXG4gICAqL1xuICBAVmlld0NoaWxkKCdzdHJpcENvbnRhaW5lcicpXG4gIHNldCBzdHJpcEN1cnNvcihlbDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX3NjID0gZWw7XG4gIH1cbiAgcHJpdmF0ZSBfc2M6IEVsZW1lbnRSZWY7XG5cbiAgLyoqXG4gICAqIENoYW5nZSBoZWlnaHQgYmFzZSBvZiB0aGUgc2VsZWN0b3JcbiAgICovXG4gIEBJbnB1dCgnaGVpZ2h0JylcbiAgc2V0IGhlaWdodCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XG4gIH1cbiAgZ2V0IHNlbGVjdG9ySGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcbiAgfVxuICBnZXQgc3RyaXBIZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5faGVpZ2h0IC0gMTA7XG4gIH1cbiAgcHJpdmF0ZSBfaGVpZ2h0OiBudW1iZXIgPSAxNzA7XG5cbiAgLyoqXG4gICAqIFJlY2VpdmUgc2VsZWN0ZWQgY29sb3IgZnJvbSB0aGUgY29tcG9uZW50XG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgc2VsZWN0ZWRDb2xvcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZENvbG9yO1xuICB9XG4gIHNldCBzZWxlY3RlZENvbG9yKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9zZWxlY3RlZENvbG9yID0gdmFsdWUgfHwgdGhpcy5lbXB0eUNvbG9yO1xuICB9XG4gIHByaXZhdGUgX3NlbGVjdGVkQ29sb3I6IHN0cmluZyA9ICcnO1xuXG4gIC8qKlxuICAgKiBIaWRlIHRoZSBoZXhhZGVjaW1hbCBjb2xvciBmb3Jtcy5cbiAgICovXG4gIEBJbnB1dCgnaGlkZUhleEZvcm1zJylcbiAgZ2V0IGhpZGVIZXhGb3JtcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGlkZUhleEZvcm1zO1xuICB9XG4gIHNldCBoaWRlSGV4Rm9ybXModmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlSGV4Rm9ybXMgPSB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF9oaWRlSGV4Rm9ybXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogRW1pdCB1cGRhdGUgd2hlbiBhIGNvbG9yIGlzIHNlbGVjdGVkXG4gICAqL1xuICBAT3V0cHV0KCkgY2hhbmdlU2VsZWN0ZWRDb2xvciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogUkdCQSBjdXJyZW50IGNvbG9yXG4gICAqL1xuICBwcml2YXRlIF9yZ2JhQ29sb3I6IHN0cmluZyA9ICdyZ2JhKDI1NSwwLDAsMSknO1xuXG4gIC8qKlxuICAgKiBTdWJqZWN0IG9mIHRoZSBjdXJyZW50IHNlbGVjdGVkIGNvbG9yIGJ5IHRoZSB1c2VyXG4gICAqL1xuICBwcml2YXRlIF90bXBTZWxlY3RlZENvbG9yOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPjtcblxuICAvKipcbiAgICogU3Vic2NyaXB0aW9uIG9mIHRoZSB0bXBTZWxlY3RlZENvbG9yIE9ic2VydmFibGVcbiAgICovXG4gIHByaXZhdGUgX3RtcFNlbGVjdGVkQ29sb3JTdWI6IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogU3Vic2NyaXB0aW9uIG9mIHRoZSBoZXhGb3JtIHZhbHVlcyBjaGFuZ2VcbiAgICovXG4gIHByaXZhdGUgX2hleFZhbHVlc1N1YjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb24gb2YgdGhlIHJiZ0Zvcm0gdmFsdWVzIGNoYW5nZVxuICAgKi9cbiAgcHJpdmF0ZSBfcmdiVmFsdWVzU3ViOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBjb2xvciBvZiB0aGUgdGV4dFxuICAgKi9cbiAgdGV4dENsYXNzOiBzdHJpbmcgPSAnYmxhY2snO1xuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZSBpZiB0aGUgbW91c2UgYnV0dG9uIGlzIHByZXNzZWRcbiAgICovXG4gIF9pc1ByZXNzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogRm9ybSBvZiB0aGUgY29sb3IgaW4gaGV4YVxuICAgKi9cbiAgaGV4Rm9ybTogRm9ybUdyb3VwO1xuXG4gIC8qKlxuICAgKiBGb3JtIGFuZCBrZXlzIG9mIHRoZSBmaWVsZHMgaW4gUkdCXG4gICAqL1xuICByZ2JLZXlzID0gWydSJywgJ0cnLCAnQiddO1xuICByZ2JGb3JtOiBGb3JtR3JvdXA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSByZW5kZXI6IFJlbmRlcmVyMixcbiAgICBASW5qZWN0KEVNUFRZX0NPTE9SKSBwcml2YXRlIGVtcHR5Q29sb3I6IHN0cmluZ1xuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fdG1wU2VsZWN0ZWRDb2xvciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPih0aGlzLl9zZWxlY3RlZENvbG9yKTtcbiAgICB0aGlzLl90bXBTZWxlY3RlZENvbG9yU3ViID0gdGhpcy5fdG1wU2VsZWN0ZWRDb2xvci5zdWJzY3JpYmUoY29sb3IgPT4ge1xuICAgICAgaWYgKGNvbG9yICE9PSB0aGlzLl9zZWxlY3RlZENvbG9yICYmIGlzVmFsaWRDb2xvcihjb2xvcikpIHtcbiAgICAgICAgaWYgKHRoaXMuaGV4Rm9ybS5nZXQoJ2hleENvZGUnKS52YWx1ZSAhPT0gY29sb3IpIHtcbiAgICAgICAgICB0aGlzLmhleEZvcm0uc2V0VmFsdWUoeyBoZXhDb2RlOiBjb2xvciB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoYW5nZVNlbGVjdGVkQ29sb3IuZW1pdChjb2VyY2VIZXhhQ29sb3IoY29sb3IpIHx8IHRoaXMuZW1wdHlDb2xvcik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBoZXggZm9ybVxuICAgIHRoaXMuaGV4Rm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgaGV4Q29kZTogW3RoaXMuc2VsZWN0ZWRDb2xvciwgW1ZhbGlkYXRvcnMubWluTGVuZ3RoKDcpLCBWYWxpZGF0b3JzLm1heExlbmd0aCg3KV1dLFxuICAgIH0pO1xuXG4gICAgLy8gcmdiIGR5bmFtaWMgZm9ybVxuICAgIGNvbnN0IHJnYkdyb3VwOiBhbnkgPSB7fTtcbiAgICBjb25zdCByZ2JWYWx1ZTogbnVtYmVyW10gPSB0aGlzLl9nZXRSR0IoKTtcbiAgICB0aGlzLnJnYktleXMuZm9yRWFjaChcbiAgICAgIChrZXksIGluZGV4KSA9PlxuICAgICAgICAocmdiR3JvdXBba2V5XSA9IG5ldyBGb3JtQ29udHJvbChyZ2JWYWx1ZVtpbmRleF0sIHtcbiAgICAgICAgICB2YWxpZGF0b3JzOiBbXG4gICAgICAgICAgICBWYWxpZGF0b3JzLm1pbigwKSxcbiAgICAgICAgICAgIFZhbGlkYXRvcnMubWF4KDI1NiksXG4gICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICAgICAgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMyksXG4gICAgICAgICAgXSxcbiAgICAgICAgICB1cGRhdGVPbjogJ2JsdXInLFxuICAgICAgICB9KSlcbiAgICApO1xuICAgIHRoaXMucmdiRm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAocmdiR3JvdXApO1xuXG4gICAgLy8gd2F0Y2ggY2hhbmdlcyBvbiBmb3Jtc1xuICAgIHRoaXMuX29uQ2hhbmdlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBSR0IsIFJHQkEgYW5kIEdyYWRpZW50IHdoZW4gc2VsZWN0ZWRDb2xvciBjaGFuZ2UgYW5kXG4gICAqIHRoZSBtb3VzZSBidXR0b24gaXMgcHJlc3NlZFxuICAgKiBAcGFyYW0gY2hhbmdlcyBTaW1wbGVDaGFuZ2VzXG4gICAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCdzZWxlY3RlZENvbG9yJyBpbiBjaGFuZ2VzICYmIGNoYW5nZXNbJ3NlbGVjdGVkQ29sb3InXS5jdXJyZW50VmFsdWUgIT09IHRoaXMuZW1wdHlDb2xvcikge1xuICAgICAgaWYgKCF0aGlzLl9pc1ByZXNzZWQpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlUkdCKCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVJHQkEoKTtcbiAgICAgICAgaWYgKHRoaXMuX2Jsb2NrQ29udGV4dCkge1xuICAgICAgICAgIHRoaXMuX2ZpbGxHcmFkaWVudCgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJnYiA9IHRoaXMuX2dldFJHQigpO1xuICAgICAgY29uc3QgbyA9IE1hdGgucm91bmQoKHJnYlswXSAqIDI5OSArIHJnYlsxXSAqIDU4NyArIHJnYlsyXSAqIDExNCkgLyAxMDAwKTtcbiAgICAgIHRoaXMudGV4dENsYXNzID0gbyA+IDEyNSA/ICdibGFjaycgOiAnd2hpdGUnO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95IGFsbCBzdWJzY3JpcHRpb25zXG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fdG1wU2VsZWN0ZWRDb2xvclN1YiAmJiAhdGhpcy5fdG1wU2VsZWN0ZWRDb2xvclN1Yi5jbG9zZWQpIHtcbiAgICAgIHRoaXMuX3RtcFNlbGVjdGVkQ29sb3JTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2hleFZhbHVlc1N1YiAmJiAhdGhpcy5faGV4VmFsdWVzU3ViLmNsb3NlZCkge1xuICAgICAgdGhpcy5faGV4VmFsdWVzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9yZ2JWYWx1ZXNTdWIgJiYgIXRoaXMuX3JnYlZhbHVlc1N1Yi5jbG9zZWQpIHtcbiAgICAgIHRoaXMuX3JnYlZhbHVlc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnJlbmRlci5saXN0ZW4odGhpcy5fYmxvY2submF0aXZlRWxlbWVudCwgJ21vdXNlZG93bicsIGUgPT4ge1xuICAgICAgdGhpcy5faXNQcmVzc2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMuY2hhbmdlQ29sb3IoZSk7XG4gICAgfSk7XG4gICAgdGhpcy5yZW5kZXIubGlzdGVuKHRoaXMuX2Jsb2NrLm5hdGl2ZUVsZW1lbnQsICdtb3VzZXVwJywgKCkgPT4gKHRoaXMuX2lzUHJlc3NlZCA9IGZhbHNlKSk7XG4gICAgdGhpcy5yZW5kZXIubGlzdGVuKHRoaXMuX2Jsb2NrLm5hdGl2ZUVsZW1lbnQsICdtb3VzZW91dCcsICgpID0+ICh0aGlzLl9pc1ByZXNzZWQgPSBmYWxzZSkpO1xuICAgIHRoaXMucmVuZGVyLmxpc3Rlbih0aGlzLl9ibG9jay5uYXRpdmVFbGVtZW50LCAnbW91c2Vtb3ZlJywgZSA9PiB0aGlzLmNoYW5nZUNvbG9yKGUpKTtcbiAgICB0aGlzLl9ibG9ja0NvbnRleHQgPSB0aGlzLl9iYy5uYXRpdmVFbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy5fYmxvY2tDb250ZXh0LnJlY3QoMCwgMCwgdGhpcy5fYmMubmF0aXZlRWxlbWVudC53aWR0aCwgdGhpcy5fYmMubmF0aXZlRWxlbWVudC5oZWlnaHQpO1xuXG4gICAgdGhpcy5yZW5kZXIubGlzdGVuKHRoaXMuX3N0cmlwLm5hdGl2ZUVsZW1lbnQsICdtb3VzZWRvd24nLCBlID0+IHtcbiAgICAgIHRoaXMuX2lzUHJlc3NlZCA9IHRydWU7XG4gICAgICB0aGlzLmNoYW5nZUJhc2VDb2xvcihlKTtcbiAgICB9KTtcbiAgICB0aGlzLnJlbmRlci5saXN0ZW4odGhpcy5fc3RyaXAubmF0aXZlRWxlbWVudCwgJ21vdXNldXAnLCAoKSA9PiAodGhpcy5faXNQcmVzc2VkID0gZmFsc2UpKTtcbiAgICB0aGlzLnJlbmRlci5saXN0ZW4odGhpcy5fc3RyaXAubmF0aXZlRWxlbWVudCwgJ21vdXNlb3V0JywgKCkgPT4gKHRoaXMuX2lzUHJlc3NlZCA9IGZhbHNlKSk7XG4gICAgdGhpcy5yZW5kZXIubGlzdGVuKHRoaXMuX3N0cmlwLm5hdGl2ZUVsZW1lbnQsICdtb3VzZW1vdmUnLCBlID0+IHRoaXMuY2hhbmdlQmFzZUNvbG9yKGUpKTtcbiAgICB0aGlzLl9zdHJpcENvbnRleHQgPSB0aGlzLl9zdHJpcC5uYXRpdmVFbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy5fc3RyaXBDb250ZXh0LnJlY3QoXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIHRoaXMuX3N0cmlwLm5hdGl2ZUVsZW1lbnQud2lkdGgsXG4gICAgICB0aGlzLl9zdHJpcC5uYXRpdmVFbGVtZW50LmhlaWdodFxuICAgICk7XG4gICAgY29uc3QgZ3JkMSA9IHRoaXMuX3N0cmlwQ29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCAwLCB0aGlzLl9iYy5uYXRpdmVFbGVtZW50LmhlaWdodCk7XG4gICAgZ3JkMS5hZGRDb2xvclN0b3AoMCwgJ3JnYmEoMjU1LCAwLCAwLCAxKScpO1xuICAgIGdyZDEuYWRkQ29sb3JTdG9wKDAuMTcsICdyZ2JhKDI1NSwgMjU1LCAwLCAxKScpO1xuICAgIGdyZDEuYWRkQ29sb3JTdG9wKDAuMzQsICdyZ2JhKDAsIDI1NSwgMCwgMSknKTtcbiAgICBncmQxLmFkZENvbG9yU3RvcCgwLjUxLCAncmdiYSgwLCAyNTUsIDI1NSwgMSknKTtcbiAgICBncmQxLmFkZENvbG9yU3RvcCgwLjY4LCAncmdiYSgwLCAwLCAyNTUsIDEpJyk7XG4gICAgZ3JkMS5hZGRDb2xvclN0b3AoMC44NSwgJ3JnYmEoMjU1LCAwLCAyNTUsIDEpJyk7XG4gICAgZ3JkMS5hZGRDb2xvclN0b3AoMSwgJ3JnYmEoMjU1LCAwLCAwLCAxKScpO1xuICAgIHRoaXMuX3N0cmlwQ29udGV4dC5maWxsU3R5bGUgPSBncmQxO1xuICAgIHRoaXMuX3N0cmlwQ29udGV4dC5maWxsKCk7XG5cbiAgICB0aGlzLl9maWxsR3JhZGllbnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBjb2xvcnMgYmFzZWQgb24gdGhlIFJHQkEgY29sb3JcbiAgICovXG4gIHByaXZhdGUgX2ZpbGxHcmFkaWVudCgpOiB2b2lkIHtcbiAgICB0aGlzLl9ibG9ja0NvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5fcmdiYUNvbG9yO1xuICAgIHRoaXMuX2Jsb2NrQ29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLl9iYy5uYXRpdmVFbGVtZW50LndpZHRoLCB0aGlzLl9iYy5uYXRpdmVFbGVtZW50LmhlaWdodCk7XG5cbiAgICBjb25zdCBncmRXaGl0ZSA9IHRoaXMuX3N0cmlwQ29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCB0aGlzLl9iYy5uYXRpdmVFbGVtZW50LndpZHRoLCAwKTtcbiAgICBncmRXaGl0ZS5hZGRDb2xvclN0b3AoMCwgJ3JnYmEoMjU1LDI1NSwyNTUsMSknKTtcbiAgICBncmRXaGl0ZS5hZGRDb2xvclN0b3AoMSwgJ3JnYmEoMjU1LDI1NSwyNTUsMCknKTtcbiAgICB0aGlzLl9ibG9ja0NvbnRleHQuZmlsbFN0eWxlID0gZ3JkV2hpdGU7XG4gICAgdGhpcy5fYmxvY2tDb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMuX2JjLm5hdGl2ZUVsZW1lbnQud2lkdGgsIHRoaXMuX2JjLm5hdGl2ZUVsZW1lbnQuaGVpZ2h0KTtcblxuICAgIGNvbnN0IGdyZEJsYWNrID0gdGhpcy5fc3RyaXBDb250ZXh0LmNyZWF0ZUxpbmVhckdyYWRpZW50KFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgdGhpcy5fYmMubmF0aXZlRWxlbWVudC5oZWlnaHRcbiAgICApO1xuICAgIGdyZEJsYWNrLmFkZENvbG9yU3RvcCgwLCAncmdiYSgwLDAsMCwwKScpO1xuICAgIGdyZEJsYWNrLmFkZENvbG9yU3RvcCgxLCAncmdiYSgwLDAsMCwxKScpO1xuICAgIHRoaXMuX2Jsb2NrQ29udGV4dC5maWxsU3R5bGUgPSBncmRCbGFjaztcbiAgICB0aGlzLl9ibG9ja0NvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5fYmMubmF0aXZlRWxlbWVudC53aWR0aCwgdGhpcy5fYmMubmF0aXZlRWxlbWVudC5oZWlnaHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdhdGNoIGNoYW5nZSBvbiBmb3Jtc1xuICAgKi9cbiAgcHJpdmF0ZSBfb25DaGFuZ2VzKCkge1xuICAgIC8vIHZhbGlkYXRlIGRpZ2l0ZWQgY29kZSBhbmQgdXBkYXRlIHdoZW4gZGlnaXRhdGlvbiBpcyBmaW5pc2hlZFxuICAgIHRoaXMuX2hleFZhbHVlc1N1YiA9IHRoaXMuaGV4Rm9ybS5nZXQoJ2hleENvZGUnKS52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKG1hcChjb2xvciA9PiBjb2xvciAhPT0gdGhpcy5lbXB0eUNvbG9yID8gY29lcmNlSGV4YUNvbG9yKGNvbG9yKSA6IGNvbG9yKSlcbiAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuX2lzUHJlc3NlZCAmJiBpc1ZhbGlkQ29sb3IodmFsdWUpKSB7XG4gICAgICAgICAgdGhpcy5fdG1wU2VsZWN0ZWRDb2xvci5uZXh0KHZhbHVlIHx8IHRoaXMuZW1wdHlDb2xvcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgdGhpcy5fcmdiVmFsdWVzU3ViID0gdGhpcy5yZ2JGb3JtLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoY29udHJvbHMgPT4ge1xuICAgICAgY29uc3QgZGF0YTogc3RyaW5nW10gPSBbXTtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGNvbnRyb2xzKSB7XG4gICAgICAgIGlmICghY29udHJvbHNba2V5XSAmJiBjb250cm9sc1trZXldICE9PSAwIHx8IGNvbnRyb2xzW2tleV0gPiAyNTUpIHtcbiAgICAgICAgICBkYXRhLnB1c2goJycpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0YS5wdXNoKGNvbnRyb2xzW2tleV0pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBoZXggPSB0aGlzLl9nZXRIZXgoZGF0YSk7XG4gICAgICBpZiAoaGV4ICE9PSB0aGlzLl9zZWxlY3RlZENvbG9yICYmIGhleC5sZW5ndGggPT09IDcpIHtcbiAgICAgICAgdGhpcy5fdG1wU2VsZWN0ZWRDb2xvci5uZXh0KGhleCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBIRVgvY2FudmFzIHZhbHVlIHRvIHJnYlxuICAgKiBAcGFyYW0gZGF0YSBhbnlcbiAgICogQHJldHVybnMgbnVtYmVyW11cbiAgICovXG4gIHByaXZhdGUgX2dldFJHQihkYXRhPzogYW55KTogbnVtYmVyW10ge1xuICAgIGlmIChkYXRhKSB7XG4gICAgICByZXR1cm4gW2RhdGFbMF0sIGRhdGFbMV0sIGRhdGFbMl1dO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fc2VsZWN0ZWRDb2xvcikge1xuICAgICAgcmV0dXJuIFtudWxsLCBudWxsLCBudWxsXTtcbiAgICB9XG5cbiAgICBjb25zdCBoZXggPSB0aGlzLl9zZWxlY3RlZENvbG9yLnJlcGxhY2UoJyMnLCAnJyk7XG4gICAgY29uc3QgciA9IHBhcnNlSW50KGhleC5zbGljZSgwLCAyKSwgMTYpO1xuICAgIGNvbnN0IGcgPSBwYXJzZUludChoZXguc2xpY2UoMiwgNCksIDE2KTtcbiAgICBjb25zdCBiID0gcGFyc2VJbnQoaGV4LnNsaWNlKDQsIDYpLCAxNik7XG5cbiAgICByZXR1cm4gW3IsIGcsIGJdO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgUkdCIHZhbHVlIHRvIEhFWFxuICAgKiBAcGFyYW0gZGF0YSBhbnlcbiAgICogQHJldHVybnMgc3RyaW5nXG4gICAqL1xuICBwcml2YXRlIF9nZXRIZXgoZGF0YTogYW55KTogc3RyaW5nIHtcbiAgICBjb25zdCBoZXggPSBuZXcgQXJyYXkoMyk7XG4gICAgaGV4WzBdID0gZGF0YVswXS50b1N0cmluZygxNik7XG4gICAgaGV4WzFdID0gZGF0YVsxXS50b1N0cmluZygxNik7XG4gICAgaGV4WzJdID0gZGF0YVsyXS50b1N0cmluZygxNik7XG5cbiAgICBoZXguZm9yRWFjaCgodmFsLCBrZXkpID0+IHtcbiAgICAgIGlmICh2YWwubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGhleFtrZXldID0gJzAnICsgaGV4W2tleV07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY29lcmNlSGV4YUNvbG9yKGAke2hleFswXX0ke2hleFsxXX0ke2hleFsyXX1gKSB8fCB0aGlzLmVtcHR5Q29sb3I7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIFJHQkEgY29sb3JcbiAgICogQHBhcmFtIGRhdGEgYW55XG4gICAqL1xuICBwcml2YXRlIF91cGRhdGVSR0JBKGRhdGE/OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX3NlbGVjdGVkQ29sb3IgJiYgIWRhdGEpIHtcbiAgICAgIHRoaXMuX3JnYmFDb2xvciA9ICdyZ2JhKDI1NSwwLDAsMSknO1xuICAgIH1cblxuICAgIGNvbnN0IHJnYiA9IHRoaXMuX2dldFJHQihkYXRhKTtcbiAgICB0aGlzLl9yZ2JhQ29sb3IgPSBgcmdiYSgke3JnYlswXX0sICR7cmdiWzFdfSwgJHtyZ2JbMl19LCAxKWA7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIFJHQiBmb3JtXG4gICAqIEBwYXJhbSBkYXRhIGFueVxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlUkdCKGRhdGE/OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucmdiRm9ybSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghZGF0YSkge1xuICAgICAgZGF0YSA9IHRoaXMuX2dldFJHQigpO1xuICAgIH1cblxuICAgIHRoaXMucmdiRm9ybS5zZXRWYWx1ZSh7IFI6IGRhdGFbMF0sIEc6IGRhdGFbMV0sIEI6IGRhdGFbMl0gfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHNlbGVjdGVkIGJhc2UgY29sb3IgZnJvbSB0aGUgY2FudmFzXG4gICAqIEBwYXJhbSBlIE1vdXNlRXZlbnRcbiAgICovXG4gIHByaXZhdGUgY2hhbmdlQmFzZUNvbG9yKGUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faXNQcmVzc2VkKSB7XG4gICAgICB0aGlzLnJlbmRlci5zZXRTdHlsZSh0aGlzLl9zYy5uYXRpdmVFbGVtZW50LCAnYmFja2dyb3VuZC1wb3NpdGlvbi15JywgYCR7ZS5vZmZzZXRZfXB4YCk7XG4gICAgICBjb25zdCBkYXRhID0gdGhpcy5fc3RyaXBDb250ZXh0LmdldEltYWdlRGF0YShlLm9mZnNldFgsIGUub2Zmc2V0WSwgMSwgMSkuZGF0YTtcbiAgICAgIHRoaXMuX3VwZGF0ZVJHQkEoZGF0YSk7XG4gICAgICB0aGlzLl9maWxsR3JhZGllbnQoKTtcbiAgICAgIHRoaXMudXBkYXRlVmFsdWVzKGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgc2VsZWN0ZWQgY29sb3IgZnJvbSB0aGUgY2FudmFzXG4gICAqIEBwYXJhbSBlIE1vdXNlRXZlbnRcbiAgICovXG4gIHByaXZhdGUgY2hhbmdlQ29sb3IoZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9pc1ByZXNzZWQpIHtcbiAgICAgIHRoaXMucmVuZGVyLnNldFN0eWxlKHRoaXMuX2JwLm5hdGl2ZUVsZW1lbnQsICd0b3AnLCBgJHtlLm9mZnNldFkgLSA1fXB4YCk7XG4gICAgICB0aGlzLnJlbmRlci5zZXRTdHlsZSh0aGlzLl9icC5uYXRpdmVFbGVtZW50LCAnbGVmdCcsIGAke2Uub2Zmc2V0WCAtIDV9cHhgKTtcblxuICAgICAgY29uc3QgZGF0YSA9IHRoaXMuX2Jsb2NrQ29udGV4dC5nZXRJbWFnZURhdGEoZS5vZmZzZXRYLCBlLm9mZnNldFksIDEsIDEpLmRhdGE7XG4gICAgICB0aGlzLnVwZGF0ZVZhbHVlcyhkYXRhKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRW1pdCB1cGRhdGUgZnJvbSB0aGUgc2VsZWN0ZWQgY29sb3JcbiAgICogQHBhcmFtIGRhdGEgYW55XG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZVZhbHVlcyhkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoZGF0YSkge1xuICAgICAgdGhpcy5fdXBkYXRlUkdCKGRhdGEpO1xuICAgICAgdGhpcy5fdG1wU2VsZWN0ZWRDb2xvci5uZXh0KHRoaXMuX2dldEhleChkYXRhKSk7XG4gICAgfVxuICB9XG59XG4iXX0=