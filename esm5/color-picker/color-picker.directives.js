import { __decorate, __param } from "tslib";
import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, forwardRef, Input, Inject, OnDestroy, Output, Renderer2, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MccColorPickerComponent } from './color-picker.component';
import { EMPTY_COLOR, coerceHexaColor, isValidColor } from './color-picker';
import { BehaviorSubject } from 'rxjs';
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
        { type: ElementRef },
        { type: Renderer2 },
        { type: String, decorators: [{ type: Inject, args: [EMPTY_COLOR,] }] }
    ]; };
    __decorate([
        Input('mccColorPickerOption')
    ], MccColorPickerOptionDirective.prototype, "color", null);
    MccColorPickerOptionDirective = __decorate([
        Directive({
            selector: '[mccColorPickerOption], [mcc-color-picker-option]',
            exportAs: 'mccColorPickerOption',
        }),
        __param(2, Inject(EMPTY_COLOR))
    ], MccColorPickerOptionDirective);
    return MccColorPickerOptionDirective;
}());
export { MccColorPickerOptionDirective };
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
        this.change = new BehaviorSubject('');
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
        { type: ElementRef },
        { type: Renderer2 },
        { type: String, decorators: [{ type: Inject, args: [EMPTY_COLOR,] }] }
    ]; };
    __decorate([
        Output()
    ], MccColorPickerOriginDirective.prototype, "change", void 0);
    MccColorPickerOriginDirective = MccColorPickerOriginDirective_1 = __decorate([
        Directive({
            selector: '[mcc-color-picker-origin], [mccColorPickerOrigin]',
            exportAs: 'mccColorPickerOrigin',
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return MccColorPickerOriginDirective_1; }),
                    multi: true,
                },
            ],
        }),
        __param(2, Inject(EMPTY_COLOR))
    ], MccColorPickerOriginDirective);
    return MccColorPickerOriginDirective;
}());
export { MccColorPickerOriginDirective };
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
        { type: ChangeDetectorRef },
        { type: String, decorators: [{ type: Inject, args: [EMPTY_COLOR,] }] }
    ]; };
    __decorate([
        Input('mccConnectedColorPickerOrigin')
    ], MccConnectedColorPickerDirective.prototype, "origin", void 0);
    MccConnectedColorPickerDirective = __decorate([
        Directive({
            selector: '[mcc-connected-color-picker], [mccConnectedColorPicker]',
            exportAs: 'mccConnectedColorPicker',
        }),
        __param(2, Inject(EMPTY_COLOR))
    ], MccConnectedColorPickerDirective);
    return MccConnectedColorPickerDirective;
}());
export { MccConnectedColorPickerDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLmRpcmVjdGl2ZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXRlcmlhbC1jb21tdW5pdHktY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImNvbG9yLXBpY2tlci9jb2xvci1waWNrZXIuZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLGFBQWEsRUFDYixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsTUFBTSxFQUNOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBQ2xHLE9BQU8sRUFBZ0IsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXJEOztHQUVHO0FBS0g7SUFhRSx1Q0FDVSxVQUFzQixFQUN0QixNQUFpQixFQUNJLFVBQWtCO1FBRnZDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNJLGVBQVUsR0FBVixVQUFVLENBQVE7UUFFL0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQWRELHNCQUFJLGdEQUFLO1FBSlQ7O1dBRUc7YUFFSDtZQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDO2FBQ0QsVUFBVSxLQUEyQjtZQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FIQTtJQWNELHVEQUFlLEdBQWY7UUFDRSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLEtBQUssU0FBUSxD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QUFNLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDO1FBQTVDLENBQTRDLENBQzdDLENBQUM7SUFDSixDQUFDOztnQkF4Q3NCLHVCQUF1QjtnQkFDbEIsaUJBQWlCOzZDQUMxQyxNQUFNLFNBQUMsV0FBVzs7SUFmbUI7UUFBdkMsS0FBSyxDQUFDLCtCQUErQixDQUFDO29FQUF1QztJQUpuRSxnQ0FBZ0M7UUFKNUMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHlEQUF5RDtZQUNuRSxRQUFRLEVBQUUseUJBQXlCO1NBQ3BDLENBQUM7UUFvQkcsV0FBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7T0FuQlgsZ0NBQWdDLENBMEQ1QztJQUFELHVDQUFDO0NBQUEsQUExREQsSUEwREM7U0ExRFksZ0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIEluamVjdCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNY2NDb2xvclBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vY29sb3ItcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFTVBUWV9DT0xPUiwgY29lcmNlSGV4YUNvbG9yLCBpc1ZhbGlkQ29sb3IsIE1jY0NvbG9yUGlja2VyT3B0aW9uIH0gZnJvbSAnLi9jb2xvci1waWNrZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBUaGlzIGRpcmVjdGl2ZSBjaGFuZ2UgdGhlIGJhY2tncm91bmQgb2YgdGhlIGJ1dHRvblxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWNjQ29sb3JQaWNrZXJPcHRpb25dLCBbbWNjLWNvbG9yLXBpY2tlci1vcHRpb25dJyxcbiAgZXhwb3J0QXM6ICdtY2NDb2xvclBpY2tlck9wdGlvbicsXG59KVxuZXhwb3J0IGNsYXNzIE1jY0NvbG9yUGlja2VyT3B0aW9uRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIC8qKlxuICAgKiBSZWNlaXZlIHRoZSBjb2xvclxuICAgKi9cbiAgQElucHV0KCdtY2NDb2xvclBpY2tlck9wdGlvbicpXG4gIGdldCBjb2xvcigpOiBNY2NDb2xvclBpY2tlck9wdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xuICB9XG4gIHNldCBjb2xvcih2YWx1ZTogTWNjQ29sb3JQaWNrZXJPcHRpb24pIHtcbiAgICB0aGlzLl9jb2xvciA9IHZhbHVlO1xuICB9XG4gIHByaXZhdGUgX2NvbG9yOiBNY2NDb2xvclBpY2tlck9wdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXI6IFJlbmRlcmVyMixcbiAgICBASW5qZWN0KEVNUFRZX0NPTE9SKSBwcml2YXRlIGVtcHR5Q29sb3I6IHN0cmluZ1xuICApIHtcbiAgICB0aGlzLl9jb2xvciA9IGVtcHR5Q29sb3I7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKHRoaXMuY29sb3IpIHtcbiAgICAgIGxldCBjb2xvcjogc3RyaW5nO1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbG9yID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb2xvciA9IHRoaXMuY29sb3I7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2xvciA9IHRoaXMuY29sb3IudmFsdWU7XG4gICAgICAgIHRoaXMucmVuZGVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FyaWEtbGFiZWwnLCB0aGlzLmNvbG9yLnRleHQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNWYWxpZENvbG9yKGNvbG9yKSkge1xuICAgICAgICAvLyBhcHBseSB0aGUgY29sb3JcbiAgICAgICAgdGhpcy5yZW5kZXIuc2V0U3R5bGUoXG4gICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgJ2JhY2tncm91bmQnLFxuICAgICAgICAgIGNvZXJjZUhleGFDb2xvcihjb2xvcikgfHwgdGhpcy5lbXB0eUNvbG9yXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRGlyZWN0aXZlIGFwcGxpZWQgdG8gYW4gZWxlbWVudCB0byBtYWtlIGl0IHVzYWJsZSBhcyBhbiBvcmlnaW4gZm9yIGFuIENvbG9yUGlja2VyLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWNjLWNvbG9yLXBpY2tlci1vcmlnaW5dLCBbbWNjQ29sb3JQaWNrZXJPcmlnaW5dJyxcbiAgZXhwb3J0QXM6ICdtY2NDb2xvclBpY2tlck9yaWdpbicsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWNjQ29sb3JQaWNrZXJPcmlnaW5EaXJlY3RpdmUpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWNjQ29sb3JQaWNrZXJPcmlnaW5EaXJlY3RpdmUgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8qKlxuICAgKiBFbWl0IGNoYW5nZXMgZnJvbSB0aGUgb3JpZ2luXG4gICAqL1xuICBAT3V0cHV0KCkgY2hhbmdlOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG5cbiAgLyoqXG4gICAqIFByb3BhZ2F0ZSBjaGFuZ2VzIHRvIGFuZ3VsYXJcbiAgICovXG4gIHByb3BhZ2F0ZUNoYW5nZXM6IChfOiBhbnkpID0+IHt9O1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGVsZW1lbnQgb24gd2hpY2ggdGhlIGRpcmVjdGl2ZSBpcyBhcHBsaWVkLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBASW5qZWN0KEVNUFRZX0NPTE9SKSBwcml2YXRlIGVtcHR5Q29sb3I6IHN0cmluZ1xuICApIHtcbiAgICAvLyBsaXN0ZW4gY2hhbmdlcyBvbmtleXVwIGFuZCB1cGRhdGUgY29sb3IgcGlja2VyXG4gICAgcmVuZGVyZXIubGlzdGVuKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2tleXVwJywgKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gZXZlbnQuY3VycmVudFRhcmdldFsndmFsdWUnXTtcbiAgICAgIGlmIChldmVudC5pc1RydXN0ZWQgJiYgaXNWYWxpZENvbG9yKHZhbHVlKSkge1xuICAgICAgICB0aGlzLndyaXRlVmFsdWVGcm9tS2V5dXAoY29lcmNlSGV4YUNvbG9yKHZhbHVlKSB8fCB0aGlzLmVtcHR5Q29sb3IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgYmUgY2FsbGVkIGJ5IHRoZSBmb3JtcyBBUEkgdG8gd3JpdGUgdG8gdGhlIHZpZXcgd2hlblxuICAgKiBwcm9ncmFtbWF0aWMgKG1vZGVsIC0+IHZpZXcpIGNoYW5nZXMgYXJlIHJlcXVlc3RlZC5cbiAgICovXG4gIHdyaXRlVmFsdWUoY29sb3I6IHN0cmluZykge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIGNvbG9yKTtcbiAgICB0aGlzLmNoYW5nZS5uZXh0KGNvbG9yKTtcbiAgICBpZiAodGhpcy5wcm9wYWdhdGVDaGFuZ2VzKSB7XG4gICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZXMoY29sb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBieSB0aGUgY29sb3IgcGlja2VyXG4gICAqL1xuICB3cml0ZVZhbHVlRnJvbUNvbG9yUGlja2VyKGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCBjb2xvcik7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2VzKGNvbG9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBmcm9tIG9yaWdpbiB3aGUga2V5IGlzIHVwXG4gICAqL1xuICB3cml0ZVZhbHVlRnJvbUtleXVwKGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNoYW5nZS5uZXh0KGNvbG9yKTtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZXMoY29sb3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgY2FsbGVkIGJ5IHRoZSBmb3JtcyBBUEkgb24gaW5pdGlhbGl6YXRpb24gc28gaXQgY2FuIHVwZGF0ZSB0aGVcbiAgICogZm9ybSBtb2RlbCB3aGVuIHZhbHVlcyBwcm9wYWdhdGUgZnJvbSB0aGUgdmlldyAodmlldyAtPiBtb2RlbCkuXG4gICAqIEBwYXJhbSBmbiBhbnlcbiAgICovXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlcyA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgY2FsbGVkIGJ5IHRoZSBmb3JtcyBBUEkgb24gaW5pdGlhbGl6YXRpb24gc28gaXQgY2FuIHVwZGF0ZSB0aGUgZm9ybSBtb2RlbCBvbiBibHVyXG4gICAqIEBwYXJhbSBmbiBhbnlcbiAgICovXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIGNhbGxlZCBieSB0aGUgZm9ybXMgQVBJIHdoZW4gdGhlIGNvbnRyb2wgc3RhdHVzIGNoYW5nZXMgdG8gb3IgZnJvbSBcIkRJU0FCTEVEXCJcbiAgICogQHBhcmFtIGlzRGlzYWJsZWQgYm9vbGVhblxuICAgKi9cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2Rpc2FibGVkJywgaXNEaXNhYmxlZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXJlY3RpdmUgY29ubmVjdCBhbiBjb2xvciBwaWNrZXIgd2l0aCBhbnkgaW5wdXQsIHNlbGVjdCBvciB0ZXh0YXJlYS5cbiAqIFRoZSBjb2xvciBwaWNrZXIgd2lsbCBiZSBhdXRvbWF0aWNhbGx5IHVwZGF0ZWQgd2hlbiB0aGUgdmFsdWUgb2YgdGhlIG9yaWdpbiBpc1xuICogY2hhbmdlZC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21jYy1jb25uZWN0ZWQtY29sb3ItcGlja2VyXSwgW21jY0Nvbm5lY3RlZENvbG9yUGlja2VyXScsXG4gIGV4cG9ydEFzOiAnbWNjQ29ubmVjdGVkQ29sb3JQaWNrZXInLFxufSlcbmV4cG9ydCBjbGFzcyBNY2NDb25uZWN0ZWRDb2xvclBpY2tlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBPcmlnaW4gb2YgdGhlIGNvbm5lY3RlZCBjb2xvciBwaWNrZXJcbiAgICovXG4gIEBJbnB1dCgnbWNjQ29ubmVjdGVkQ29sb3JQaWNrZXJPcmlnaW4nKSBvcmlnaW46IE1jY0NvbG9yUGlja2VyT3JpZ2luRGlyZWN0aXZlO1xuXG4gIC8qKlxuICAgKiBDb2xvciBwaWNrZXIgc3Vic2NyaXB0aW9uXG4gICAqL1xuICBwcml2YXRlIF9jb2xvclBpY2tlclN1YjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBPcmlnaW4gc3Vic2NyaXB0aW9uXG4gICAqL1xuICBwcml2YXRlIF9vcmlnaW5TdWI6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbG9yUGlja2VyOiBNY2NDb2xvclBpY2tlckNvbXBvbmVudCxcbiAgICBwdWJsaWMgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBJbmplY3QoRU1QVFlfQ09MT1IpIHByaXZhdGUgZW1wdHlDb2xvcjogc3RyaW5nXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKCF0aGlzLl9jb2xvclBpY2tlclN1Yikge1xuICAgICAgdGhpcy5fYXR0YWNoQ29sb3JQaWNrZXIoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fY29sb3JQaWNrZXJTdWIgJiYgIXRoaXMuX2NvbG9yUGlja2VyU3ViLmNsb3NlZCkge1xuICAgICAgdGhpcy5fY29sb3JQaWNrZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX29yaWdpblN1YiAmJiAhdGhpcy5fb3JpZ2luU3ViLmNsb3NlZCkge1xuICAgICAgdGhpcy5fb3JpZ2luU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBjb2xvciBwaWNrZXIgYW5kIG9yaWdpblxuICAgKi9cbiAgcHJpdmF0ZSBfYXR0YWNoQ29sb3JQaWNrZXIoKTogdm9pZCB7XG4gICAgLy8gc3Vic2NyaWJlIHRvIG9yaWdpbiBjaGFuZ2UgdG8gdXBkYXRlIGNvbG9yIHBpY2tlclxuICAgIHRoaXMuX29yaWdpblN1YiA9IHRoaXMub3JpZ2luLmNoYW5nZS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBpc1ZhbGlkQ29sb3IodmFsdWUpIHx8XG4gICAgICAgICh2YWx1ZSA9PT0gdGhpcy5lbXB0eUNvbG9yICYmIHRoaXMuY29sb3JQaWNrZXIuc2VsZWN0ZWRDb2xvciAhPT0gdGhpcy5lbXB0eUNvbG9yKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuY29sb3JQaWNrZXIudXBkYXRlVG1wU2VsZWN0ZWRDb2xvcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICB0aGlzLmNvbG9yUGlja2VyLnNlbGVjdGVkQ29sb3IgPSB2YWx1ZTtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pO1xuXG4gICAgLy8gc3Vic2NyaWJlIHRvIGNvbG9yIHBpY2tlciBjaGFuZ2VzIGFuZCBzZXQgb24gb3JpZ2luIGVsZW1lbnRcbiAgICB0aGlzLl9jb2xvclBpY2tlclN1YiA9IHRoaXMuY29sb3JQaWNrZXIuY2hhbmdlLnN1YnNjcmliZSh2YWx1ZSA9PlxuICAgICAgdGhpcy5vcmlnaW4ud3JpdGVWYWx1ZUZyb21Db2xvclBpY2tlcih2YWx1ZSlcbiAgICApO1xuICB9XG59XG4iXX0=