var MccColorPickerOriginDirective_1;
import { __decorate, __param } from "tslib";
import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, forwardRef, Input, Inject, OnDestroy, Output, Renderer2, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MccColorPickerComponent } from './color-picker.component';
import { EMPTY_COLOR, coerceHexaColor, isValidColor } from './color-picker';
import { BehaviorSubject } from 'rxjs';
/**
 * This directive change the background of the button
 */
let MccColorPickerOptionDirective = class MccColorPickerOptionDirective {
    constructor(elementRef, render, emptyColor) {
        this.elementRef = elementRef;
        this.render = render;
        this.emptyColor = emptyColor;
        this._color = emptyColor;
    }
    /**
     * Receive the color
     */
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
    }
    ngAfterViewInit() {
        if (this.color) {
            let color;
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
    }
};
MccColorPickerOptionDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: String, decorators: [{ type: Inject, args: [EMPTY_COLOR,] }] }
];
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
export { MccColorPickerOptionDirective };
/**
 * Directive applied to an element to make it usable as an origin for an ColorPicker.
 */
let MccColorPickerOriginDirective = MccColorPickerOriginDirective_1 = class MccColorPickerOriginDirective {
    /**
     * Reference to the element on which the directive is applied.
     */
    constructor(elementRef, renderer, emptyColor) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.emptyColor = emptyColor;
        /**
         * Emit changes from the origin
         */
        this.change = new BehaviorSubject('');
        // listen changes onkeyup and update color picker
        renderer.listen(elementRef.nativeElement, 'keyup', (event) => {
            const value = event.currentTarget['value'];
            if (event.isTrusted && isValidColor(value)) {
                this.writeValueFromKeyup(coerceHexaColor(value) || this.emptyColor);
            }
        });
    }
    /**
     * This method will be called by the forms API to write to the view when
     * programmatic (model -> view) changes are requested.
     */
    writeValue(color) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', color);
        this.change.next(color);
        if (this.propagateChanges) {
            this.propagateChanges(color);
        }
    }
    /**
     * This method will be called by the color picker
     */
    writeValueFromColorPicker(color) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', color);
        this.propagateChanges(color);
    }
    /**
     * This method will be called from origin whe key is up
     */
    writeValueFromKeyup(color) {
        this.change.next(color);
        this.propagateChanges(color);
    }
    /**
     * This is called by the forms API on initialization so it can update the
     * form model when values propagate from the view (view -> model).
     * @param fn any
     */
    registerOnChange(fn) {
        this.propagateChanges = fn;
    }
    /**
     * This is called by the forms API on initialization so it can update the form model on blur
     * @param fn any
     */
    registerOnTouched(fn) { }
    /**
     * called by the forms API when the control status changes to or from "DISABLED"
     * @param isDisabled boolean
     */
    setDisabledState(isDisabled) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
    }
};
MccColorPickerOriginDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: String, decorators: [{ type: Inject, args: [EMPTY_COLOR,] }] }
];
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
                useExisting: forwardRef(() => MccColorPickerOriginDirective_1),
                multi: true,
            },
        ],
    }),
    __param(2, Inject(EMPTY_COLOR))
], MccColorPickerOriginDirective);
export { MccColorPickerOriginDirective };
/**
 * Directive connect an color picker with any input, select or textarea.
 * The color picker will be automatically updated when the value of the origin is
 * changed.
 */
let MccConnectedColorPickerDirective = class MccConnectedColorPickerDirective {
    constructor(colorPicker, changeDetectorRef, emptyColor) {
        this.colorPicker = colorPicker;
        this.changeDetectorRef = changeDetectorRef;
        this.emptyColor = emptyColor;
    }
    ngAfterViewInit() {
        if (!this._colorPickerSub) {
            this._attachColorPicker();
        }
    }
    ngOnDestroy() {
        if (this._colorPickerSub && !this._colorPickerSub.closed) {
            this._colorPickerSub.unsubscribe();
        }
        if (this._originSub && !this._originSub.closed) {
            this._originSub.unsubscribe();
        }
    }
    /**
     * Attach color picker and origin
     */
    _attachColorPicker() {
        // subscribe to origin change to update color picker
        this._originSub = this.origin.change.subscribe(value => {
            if (isValidColor(value) ||
                (value === this.emptyColor && this.colorPicker.selectedColor !== this.emptyColor)) {
                this.colorPicker.updateTmpSelectedColor(value);
            }
            this.colorPicker.selectedColor = value;
            this.changeDetectorRef.detectChanges();
        });
        // subscribe to color picker changes and set on origin element
        this._colorPickerSub = this.colorPicker.change.subscribe(value => this.origin.writeValueFromColorPicker(value));
    }
};
MccConnectedColorPickerDirective.ctorParameters = () => [
    { type: MccColorPickerComponent },
    { type: ChangeDetectorRef },
    { type: String, decorators: [{ type: Inject, args: [EMPTY_COLOR,] }] }
];
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
export { MccConnectedColorPickerDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLmRpcmVjdGl2ZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXRlcmlhbC1jb21tdW5pdHktY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImNvbG9yLXBpY2tlci9jb2xvci1waWNrZXIuZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFDTCxhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRyxPQUFPLEVBQWdCLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVyRDs7R0FFRztBQUtILElBQWEsNkJBQTZCLEdBQTFDLE1BQWEsNkJBQTZCO0lBYXhDLFlBQ1UsVUFBc0IsRUFDdEIsTUFBaUIsRUFDSSxVQUFrQjtRQUZ2QyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDSSxlQUFVLEdBQVYsVUFBVSxDQUFRO1FBRS9DLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFsQkQ7O09BRUc7SUFFSCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUNELElBQUksS0FBSyxDQUFDLEtBQTJCO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFXRCxlQUFlO1FBQ2IsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFF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RixDQUFBOztZQXpDd0IsdUJBQXVCO1lBQ2xCLGlCQUFpQjt5Q0FDMUMsTUFBTSxTQUFDLFdBQVc7O0FBZm1CO0lBQXZDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQztnRUFBdUM7QUFKbkUsZ0NBQWdDO0lBSjVDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx5REFBeUQ7UUFDbkUsUUFBUSxFQUFFLHlCQUF5QjtLQUNwQyxDQUFDO0lBb0JHLFdBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0dBbkJYLGdDQUFnQyxDQTBENUM7U0ExRFksZ0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIEluamVjdCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNY2NDb2xvclBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vY29sb3ItcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFTVBUWV9DT0xPUiwgY29lcmNlSGV4YUNvbG9yLCBpc1ZhbGlkQ29sb3IsIE1jY0NvbG9yUGlja2VyT3B0aW9uIH0gZnJvbSAnLi9jb2xvci1waWNrZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBUaGlzIGRpcmVjdGl2ZSBjaGFuZ2UgdGhlIGJhY2tncm91bmQgb2YgdGhlIGJ1dHRvblxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWNjQ29sb3JQaWNrZXJPcHRpb25dLCBbbWNjLWNvbG9yLXBpY2tlci1vcHRpb25dJyxcbiAgZXhwb3J0QXM6ICdtY2NDb2xvclBpY2tlck9wdGlvbicsXG59KVxuZXhwb3J0IGNsYXNzIE1jY0NvbG9yUGlja2VyT3B0aW9uRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIC8qKlxuICAgKiBSZWNlaXZlIHRoZSBjb2xvclxuICAgKi9cbiAgQElucHV0KCdtY2NDb2xvclBpY2tlck9wdGlvbicpXG4gIGdldCBjb2xvcigpOiBNY2NDb2xvclBpY2tlck9wdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xuICB9XG4gIHNldCBjb2xvcih2YWx1ZTogTWNjQ29sb3JQaWNrZXJPcHRpb24pIHtcbiAgICB0aGlzLl9jb2xvciA9IHZhbHVlO1xuICB9XG4gIHByaXZhdGUgX2NvbG9yOiBNY2NDb2xvclBpY2tlck9wdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXI6IFJlbmRlcmVyMixcbiAgICBASW5qZWN0KEVNUFRZX0NPTE9SKSBwcml2YXRlIGVtcHR5Q29sb3I6IHN0cmluZ1xuICApIHtcbiAgICB0aGlzLl9jb2xvciA9IGVtcHR5Q29sb3I7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKHRoaXMuY29sb3IpIHtcbiAgICAgIGxldCBjb2xvcjogc3RyaW5nO1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbG9yID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb2xvciA9IHRoaXMuY29sb3I7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2xvciA9IHRoaXMuY29sb3IudmFsdWU7XG4gICAgICAgIHRoaXMucmVuZGVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FyaWEtbGFiZWwnLCB0aGlzLmNvbG9yLnRleHQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNWYWxpZENvbG9yKGNvbG9yKSkge1xuICAgICAgICAvLyBhcHBseSB0aGUgY29sb3JcbiAgICAgICAgdGhpcy5yZW5kZXIuc2V0U3R5bGUoXG4gICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgJ2JhY2tncm91bmQnLFxuICAgICAgICAgIGNvZXJjZUhleGFDb2xvcihjb2xvcikgfHwgdGhpcy5lbXB0eUNvbG9yXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRGlyZWN0aXZlIGFwcGxpZWQgdG8gYW4gZWxlbWVudCB0byBtYWtlIGl0IHVzYWJsZSBhcyBhbiBvcmlnaW4gZm9yIGFuIENvbG9yUGlja2VyLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWNjLWNvbG9yLXBpY2tlci1vcmlnaW5dLCBbbWNjQ29sb3JQaWNrZXJPcmlnaW5dJyxcbiAgZXhwb3J0QXM6ICdtY2NDb2xvclBpY2tlck9yaWdpbicsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWNjQ29sb3JQaWNrZXJPcmlnaW5EaXJlY3RpdmUpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWNjQ29sb3JQaWNrZXJPcmlnaW5EaXJlY3RpdmUgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8qKlxuICAgKiBFbWl0IGNoYW5nZXMgZnJvbSB0aGUgb3JpZ2luXG4gICAqL1xuICBAT3V0cHV0KCkgY2hhbmdlOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG5cbiAgLyoqXG4gICAqIFByb3BhZ2F0ZSBjaGFuZ2VzIHRvIGFuZ3VsYXJcbiAgICovXG4gIHByb3BhZ2F0ZUNoYW5nZXM6IChfOiBhbnkpID0+IHt9O1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGVsZW1lbnQgb24gd2hpY2ggdGhlIGRpcmVjdGl2ZSBpcyBhcHBsaWVkLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBASW5qZWN0KEVNUFRZX0NPTE9SKSBwcml2YXRlIGVtcHR5Q29sb3I6IHN0cmluZ1xuICApIHtcbiAgICAvLyBsaXN0ZW4gY2hhbmdlcyBvbmtleXVwIGFuZCB1cGRhdGUgY29sb3IgcGlja2VyXG4gICAgcmVuZGVyZXIubGlzdGVuKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2tleXVwJywgKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gZXZlbnQuY3VycmVudFRhcmdldFsndmFsdWUnXTtcbiAgICAgIGlmIChldmVudC5pc1RydXN0ZWQgJiYgaXNWYWxpZENvbG9yKHZhbHVlKSkge1xuICAgICAgICB0aGlzLndyaXRlVmFsdWVGcm9tS2V5dXAoY29lcmNlSGV4YUNvbG9yKHZhbHVlKSB8fCB0aGlzLmVtcHR5Q29sb3IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgYmUgY2FsbGVkIGJ5IHRoZSBmb3JtcyBBUEkgdG8gd3JpdGUgdG8gdGhlIHZpZXcgd2hlblxuICAgKiBwcm9ncmFtbWF0aWMgKG1vZGVsIC0+IHZpZXcpIGNoYW5nZXMgYXJlIHJlcXVlc3RlZC5cbiAgICovXG4gIHdyaXRlVmFsdWUoY29sb3I6IHN0cmluZykge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIGNvbG9yKTtcbiAgICB0aGlzLmNoYW5nZS5uZXh0KGNvbG9yKTtcbiAgICBpZiAodGhpcy5wcm9wYWdhdGVDaGFuZ2VzKSB7XG4gICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZXMoY29sb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBieSB0aGUgY29sb3IgcGlja2VyXG4gICAqL1xuICB3cml0ZVZhbHVlRnJvbUNvbG9yUGlja2VyKGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCBjb2xvcik7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2VzKGNvbG9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBmcm9tIG9yaWdpbiB3aGUga2V5IGlzIHVwXG4gICAqL1xuICB3cml0ZVZhbHVlRnJvbUtleXVwKGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNoYW5nZS5uZXh0KGNvbG9yKTtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZXMoY29sb3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgY2FsbGVkIGJ5IHRoZSBmb3JtcyBBUEkgb24gaW5pdGlhbGl6YXRpb24gc28gaXQgY2FuIHVwZGF0ZSB0aGVcbiAgICogZm9ybSBtb2RlbCB3aGVuIHZhbHVlcyBwcm9wYWdhdGUgZnJvbSB0aGUgdmlldyAodmlldyAtPiBtb2RlbCkuXG4gICAqIEBwYXJhbSBmbiBhbnlcbiAgICovXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlcyA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgY2FsbGVkIGJ5IHRoZSBmb3JtcyBBUEkgb24gaW5pdGlhbGl6YXRpb24gc28gaXQgY2FuIHVwZGF0ZSB0aGUgZm9ybSBtb2RlbCBvbiBibHVyXG4gICAqIEBwYXJhbSBmbiBhbnlcbiAgICovXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIGNhbGxlZCBieSB0aGUgZm9ybXMgQVBJIHdoZW4gdGhlIGNvbnRyb2wgc3RhdHVzIGNoYW5nZXMgdG8gb3IgZnJvbSBcIkRJU0FCTEVEXCJcbiAgICogQHBhcmFtIGlzRGlzYWJsZWQgYm9vbGVhblxuICAgKi9cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2Rpc2FibGVkJywgaXNEaXNhYmxlZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXJlY3RpdmUgY29ubmVjdCBhbiBjb2xvciBwaWNrZXIgd2l0aCBhbnkgaW5wdXQsIHNlbGVjdCBvciB0ZXh0YXJlYS5cbiAqIFRoZSBjb2xvciBwaWNrZXIgd2lsbCBiZSBhdXRvbWF0aWNhbGx5IHVwZGF0ZWQgd2hlbiB0aGUgdmFsdWUgb2YgdGhlIG9yaWdpbiBpc1xuICogY2hhbmdlZC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21jYy1jb25uZWN0ZWQtY29sb3ItcGlja2VyXSwgW21jY0Nvbm5lY3RlZENvbG9yUGlja2VyXScsXG4gIGV4cG9ydEFzOiAnbWNjQ29ubmVjdGVkQ29sb3JQaWNrZXInLFxufSlcbmV4cG9ydCBjbGFzcyBNY2NDb25uZWN0ZWRDb2xvclBpY2tlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBPcmlnaW4gb2YgdGhlIGNvbm5lY3RlZCBjb2xvciBwaWNrZXJcbiAgICovXG4gIEBJbnB1dCgnbWNjQ29ubmVjdGVkQ29sb3JQaWNrZXJPcmlnaW4nKSBvcmlnaW46IE1jY0NvbG9yUGlja2VyT3JpZ2luRGlyZWN0aXZlO1xuXG4gIC8qKlxuICAgKiBDb2xvciBwaWNrZXIgc3Vic2NyaXB0aW9uXG4gICAqL1xuICBwcml2YXRlIF9jb2xvclBpY2tlclN1YjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBPcmlnaW4gc3Vic2NyaXB0aW9uXG4gICAqL1xuICBwcml2YXRlIF9vcmlnaW5TdWI6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbG9yUGlja2VyOiBNY2NDb2xvclBpY2tlckNvbXBvbmVudCxcbiAgICBwdWJsaWMgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBJbmplY3QoRU1QVFlfQ09MT1IpIHByaXZhdGUgZW1wdHlDb2xvcjogc3RyaW5nXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKCF0aGlzLl9jb2xvclBpY2tlclN1Yikge1xuICAgICAgdGhpcy5fYXR0YWNoQ29sb3JQaWNrZXIoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fY29sb3JQaWNrZXJTdWIgJiYgIXRoaXMuX2NvbG9yUGlja2VyU3ViLmNsb3NlZCkge1xuICAgICAgdGhpcy5fY29sb3JQaWNrZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX29yaWdpblN1YiAmJiAhdGhpcy5fb3JpZ2luU3ViLmNsb3NlZCkge1xuICAgICAgdGhpcy5fb3JpZ2luU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBjb2xvciBwaWNrZXIgYW5kIG9yaWdpblxuICAgKi9cbiAgcHJpdmF0ZSBfYXR0YWNoQ29sb3JQaWNrZXIoKTogdm9pZCB7XG4gICAgLy8gc3Vic2NyaWJlIHRvIG9yaWdpbiBjaGFuZ2UgdG8gdXBkYXRlIGNvbG9yIHBpY2tlclxuICAgIHRoaXMuX29yaWdpblN1YiA9IHRoaXMub3JpZ2luLmNoYW5nZS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBpc1ZhbGlkQ29sb3IodmFsdWUpIHx8XG4gICAgICAgICh2YWx1ZSA9PT0gdGhpcy5lbXB0eUNvbG9yICYmIHRoaXMuY29sb3JQaWNrZXIuc2VsZWN0ZWRDb2xvciAhPT0gdGhpcy5lbXB0eUNvbG9yKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuY29sb3JQaWNrZXIudXBkYXRlVG1wU2VsZWN0ZWRDb2xvcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICB0aGlzLmNvbG9yUGlja2VyLnNlbGVjdGVkQ29sb3IgPSB2YWx1ZTtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pO1xuXG4gICAgLy8gc3Vic2NyaWJlIHRvIGNvbG9yIHBpY2tlciBjaGFuZ2VzIGFuZCBzZXQgb24gb3JpZ2luIGVsZW1lbnRcbiAgICB0aGlzLl9jb2xvclBpY2tlclN1YiA9IHRoaXMuY29sb3JQaWNrZXIuY2hhbmdlLnN1YnNjcmliZSh2YWx1ZSA9PlxuICAgICAgdGhpcy5vcmlnaW4ud3JpdGVWYWx1ZUZyb21Db2xvclBpY2tlcih2YWx1ZSlcbiAgICApO1xuICB9XG59XG4iXX0=