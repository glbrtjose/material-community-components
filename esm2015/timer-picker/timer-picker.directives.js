var MccTimerPickerOriginDirective_1;
import { __decorate } from "tslib";
import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, forwardRef, Input, Output, OnDestroy, Renderer2, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MccTimerPickerComponent } from './timer-picker.component';
import { BehaviorSubject } from 'rxjs';
let MccTimerPickerOriginDirective = MccTimerPickerOriginDirective_1 = class MccTimerPickerOriginDirective {
    /**
     * Reference to the element on which the directive is applied.
     */
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        /**
         * Emit changes from the origin
         */
        this.change = new BehaviorSubject('');
        /**
         * Emit changes from the origin
         */
        this.hasFocus = new BehaviorSubject(false);
        // listen focus
        renderer.listen(elementRef.nativeElement, 'focus', () => this.hasFocus.next(true));
    }
    /**
     * This method will be called by the forms API to write to the view when
     * programmatic (model -> view) changes are requested.
     */
    writeValue(time) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', time);
        this.change.next(time);
        if (this.propagateChanges) {
            this.propagateChanges(time);
        }
    }
    /**
     * This method will be called by the time picker
     */
    writeValueFromTimerPicker(time) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', time);
        this.propagateChanges(time);
    }
    /**
     * This method will be called from origin whe key is up
     */
    writeValueFromKeyup(time) {
        this.change.next(time);
        this.propagateChanges(time);
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
MccTimerPickerOriginDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
__decorate([
    Output()
], MccTimerPickerOriginDirective.prototype, "change", void 0);
__decorate([
    Output()
], MccTimerPickerOriginDirective.prototype, "hasFocus", void 0);
MccTimerPickerOriginDirective = MccTimerPickerOriginDirective_1 = __decorate([
    Directive({
        selector: '[mccTimerPickerOrigin], [mcc-timer-picker-origin]',
        exportAs: 'mccTimerPickerOrigin',
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => MccTimerPickerOriginDirective_1),
                multi: true,
            },
        ],
    })
], MccTimerPickerOriginDirective);
export { MccTimerPickerOriginDirective };
let MccConnectedTimerPickerDirective = class MccConnectedTimerPickerDirective {
    constructor(timerPicker, changeDetectorRef) {
        this.timerPicker = timerPicker;
        this.changeDetectorRef = changeDetectorRef;
        this.timerPicker.connected = true;
    }
    ngAfterViewInit() {
        if (!this._timerPickerSub) {
            this.timerPicker.trigger = this.origin;
            this._attachTimerPicker();
        }
    }
    ngOnDestroy() {
        if (this._originFocus && !this._originFocus.closed) {
            this._originFocus.unsubscribe();
        }
        if (this._timerPickerSub && !this._timerPickerSub.closed) {
            this._timerPickerSub.unsubscribe();
        }
    }
    /**
     * Attach the timer picker to origin element (input)
     */
    _attachTimerPicker() {
        this._originFocus = this.origin.hasFocus.subscribe(focused => {
            this.timerPicker.focus = 'hour';
            this.timerPicker.isOpen = focused;
            this.changeDetectorRef.detectChanges();
        });
        this._timerPickerSub = this.timerPicker.selected.subscribe(value => this.origin.writeValueFromTimerPicker(value));
    }
};
MccConnectedTimerPickerDirective.ctorParameters = () => [
    { type: MccTimerPickerComponent },
    { type: ChangeDetectorRef }
];
__decorate([
    Input('mccConnectedTimerPickerOrigin')
], MccConnectedTimerPickerDirective.prototype, "origin", void 0);
MccConnectedTimerPickerDirective = __decorate([
    Directive({
        selector: '[mccConnectedTimerPicker], [mcc-connected-timer-picker]',
        exportAs: 'mccConnectedTimerPicker',
    })
], MccConnectedTimerPickerDirective);
export { MccConnectedTimerPickerDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXItcGlja2VyLmRpcmVjdGl2ZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXRlcmlhbC1jb21tdW5pdHktY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInRpbWVyLXBpY2tlci90aW1lci1waWNrZXIuZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFDTCxhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRSxPQUFPLEVBQWdCLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQWFyRCxJQUFhLDZCQUE2QixxQ0FBMUMsTUFBYSw2QkFBNkI7SUFnQnhDOztPQUVHO0lBQ0gsWUFBbUIsVUFBc0IsRUFBVSxRQUFtQjtRQUFuRCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQWxCdEU7O1dBRUc7UUFDTyxXQUFNLEdBQTRCLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO1FBRTVFOztXQUVHO1FBQ08sYUFBUSxHQUE2QixJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztRQVdqRixlQUFlO1FBQ2YsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFRDs7O09BR0c7SUFDSCxVQUFVLENBQUMsSUFBWTtRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gseUJBQXlCLENBQUMsSUFBWTtRQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRDs7T0FFRztJQUNILG1CQUFtQixDQUFDLElBQVk7UUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsZ0JBQWdCLENBQUMsRUFBTztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxpQkFBaUIsQ0FBQyxFQUFPLElBQVUsQ0FBQztJQUVwQzs7O09BR0c7SUFDSCxnQkFBZ0IsQ0FBQyxVQUFtQjtRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbkYsQ0FBQztDQUNGLENBQUE7O1lBdkRnQyxVQUFVO1lBQW9CLFNBQVM7O0FBZjVEO0lBQVQsTUFBTSxFQUFFOzZEQUFtRTtBQUtsRTtJQUFULE1BQU0sRUFBRTsrREFBMEU7QUFUeEUsNkJBQTZCO0lBWHpDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxtREFBbUQ7UUFDN0QsUUFBUSxFQUFFLHNCQUFzQjtRQUNoQyxTQUFTLEVBQUU7WUFDVDtnQkFDRSxPQUFPLEVBQUUsaUJBQWlCO2dCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLCtCQUE2QixDQUFDO2dCQUM1RCxLQUFLLEVBQUUsSUFBSTthQUNaO1NBQ0Y7S0FDRixDQUFDO0dBQ1csNkJBQTZCLENBMEV6QztTQTFFWSw2QkFBNkI7QUFnRjFDLElBQWEsZ0NBQWdDLEdBQTdDLE1BQWEsZ0NBQWdDO0lBZ0IzQyxZQUNVLFdBQW9DLEVBQ3JDLGlCQUFvQztRQURuQyxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7UUFDckMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUUzQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDcEMsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTtZQUNsRCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUU7WUFDeEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwQztJQUNILENBQUM7SUFFRDs7T0FFRztJQUNLLGtCQUFrQjtRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMzRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7WUFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQ2pFLElBQUksQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLENBQzdDLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTs7WUFwQ3dCLHVCQUF1QjtZQUNsQixpQkFBaUI7O0FBZEw7SUFBdkMsS0FBSyxDQUFDLCtCQUErQixDQUFDO2dFQUF1QztBQUpuRSxnQ0FBZ0M7SUFKNUMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHlEQUF5RDtRQUNuRSxRQUFRLEVBQUUseUJBQXlCO0tBQ3BDLENBQUM7R0FDVyxnQ0FBZ0MsQ0FxRDVDO1NBckRZLGdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIE9uRGVzdHJveSxcbiAgUmVuZGVyZXIyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWNjVGltZXJQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL3RpbWVyLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21jY1RpbWVyUGlja2VyT3JpZ2luXSwgW21jYy10aW1lci1waWNrZXItb3JpZ2luXScsXG4gIGV4cG9ydEFzOiAnbWNjVGltZXJQaWNrZXJPcmlnaW4nLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1jY1RpbWVyUGlja2VyT3JpZ2luRGlyZWN0aXZlKSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1jY1RpbWVyUGlja2VyT3JpZ2luRGlyZWN0aXZlIHtcbiAgLyoqXG4gICAqIEVtaXQgY2hhbmdlcyBmcm9tIHRoZSBvcmlnaW5cbiAgICovXG4gIEBPdXRwdXQoKSBjaGFuZ2U6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcblxuICAvKipcbiAgICogRW1pdCBjaGFuZ2VzIGZyb20gdGhlIG9yaWdpblxuICAgKi9cbiAgQE91dHB1dCgpIGhhc0ZvY3VzOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvKipcbiAgICogUHJvcGFnYXRlIGNoYW5nZXMgdG8gYW5ndWxhclxuICAgKi9cbiAgcHJvcGFnYXRlQ2hhbmdlczogKF86IGFueSkgPT4ge307XG5cbiAgLyoqXG4gICAqIFJlZmVyZW5jZSB0byB0aGUgZWxlbWVudCBvbiB3aGljaCB0aGUgZGlyZWN0aXZlIGlzIGFwcGxpZWQuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgLy8gbGlzdGVuIGZvY3VzXG4gICAgcmVuZGVyZXIubGlzdGVuKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2ZvY3VzJywgKCkgPT4gdGhpcy5oYXNGb2N1cy5uZXh0KHRydWUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBieSB0aGUgZm9ybXMgQVBJIHRvIHdyaXRlIHRvIHRoZSB2aWV3IHdoZW5cbiAgICogcHJvZ3JhbW1hdGljIChtb2RlbCAtPiB2aWV3KSBjaGFuZ2VzIGFyZSByZXF1ZXN0ZWQuXG4gICAqL1xuICB3cml0ZVZhbHVlKHRpbWU6IHN0cmluZykge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIHRpbWUpO1xuICAgIHRoaXMuY2hhbmdlLm5leHQodGltZSk7XG4gICAgaWYgKHRoaXMucHJvcGFnYXRlQ2hhbmdlcykge1xuICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2VzKHRpbWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBieSB0aGUgdGltZSBwaWNrZXJcbiAgICovXG4gIHdyaXRlVmFsdWVGcm9tVGltZXJQaWNrZXIodGltZTogc3RyaW5nKSB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgdGltZSk7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2VzKHRpbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgYmUgY2FsbGVkIGZyb20gb3JpZ2luIHdoZSBrZXkgaXMgdXBcbiAgICovXG4gIHdyaXRlVmFsdWVGcm9tS2V5dXAodGltZTogc3RyaW5nKSB7XG4gICAgdGhpcy5jaGFuZ2UubmV4dCh0aW1lKTtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZXModGltZSk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBpcyBjYWxsZWQgYnkgdGhlIGZvcm1zIEFQSSBvbiBpbml0aWFsaXphdGlvbiBzbyBpdCBjYW4gdXBkYXRlIHRoZVxuICAgKiBmb3JtIG1vZGVsIHdoZW4gdmFsdWVzIHByb3BhZ2F0ZSBmcm9tIHRoZSB2aWV3ICh2aWV3IC0+IG1vZGVsKS5cbiAgICogQHBhcmFtIGZuIGFueVxuICAgKi9cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2VzID0gZm47XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBpcyBjYWxsZWQgYnkgdGhlIGZvcm1zIEFQSSBvbiBpbml0aWFsaXphdGlvbiBzbyBpdCBjYW4gdXBkYXRlIHRoZSBmb3JtIG1vZGVsIG9uIGJsdXJcbiAgICogQHBhcmFtIGZuIGFueVxuICAgKi9cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQgeyB9XG5cbiAgLyoqXG4gICAqIGNhbGxlZCBieSB0aGUgZm9ybXMgQVBJIHdoZW4gdGhlIGNvbnRyb2wgc3RhdHVzIGNoYW5nZXMgdG8gb3IgZnJvbSBcIkRJU0FCTEVEXCJcbiAgICogQHBhcmFtIGlzRGlzYWJsZWQgYm9vbGVhblxuICAgKi9cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2Rpc2FibGVkJywgaXNEaXNhYmxlZCk7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21jY0Nvbm5lY3RlZFRpbWVyUGlja2VyXSwgW21jYy1jb25uZWN0ZWQtdGltZXItcGlja2VyXScsXG4gIGV4cG9ydEFzOiAnbWNjQ29ubmVjdGVkVGltZXJQaWNrZXInLFxufSlcbmV4cG9ydCBjbGFzcyBNY2NDb25uZWN0ZWRUaW1lclBpY2tlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBvcmlnaW4gb2YgdGhlIGNvbm5lY3RlZCB0aW1lciBwaWNrZXJcbiAgICovXG4gIEBJbnB1dCgnbWNjQ29ubmVjdGVkVGltZXJQaWNrZXJPcmlnaW4nKSBvcmlnaW46IE1jY1RpbWVyUGlja2VyT3JpZ2luRGlyZWN0aXZlO1xuXG4gIC8qKlxuICAgKiBzdWJzY3JpcHRpb24gb2YgdGhlIG9yaWdpbiBmb2N1cyBvYnNlcnZhYmxlXG4gICAqL1xuICBwcml2YXRlIF9vcmlnaW5Gb2N1czogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBzdWJzY3JpcHRpb24gb2YgdGhlIHRpbWVyIHBpY2tlciBzZWxlY3RlZCBjaGFuZ2VcbiAgICovXG4gIHByaXZhdGUgX3RpbWVyUGlja2VyU3ViOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB0aW1lclBpY2tlcjogTWNjVGltZXJQaWNrZXJDb21wb25lbnQsXG4gICAgcHVibGljIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICB0aGlzLnRpbWVyUGlja2VyLmNvbm5lY3RlZCA9IHRydWU7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKCF0aGlzLl90aW1lclBpY2tlclN1Yikge1xuICAgICAgdGhpcy50aW1lclBpY2tlci50cmlnZ2VyID0gdGhpcy5vcmlnaW47XG4gICAgICB0aGlzLl9hdHRhY2hUaW1lclBpY2tlcigpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl9vcmlnaW5Gb2N1cyAmJiAhdGhpcy5fb3JpZ2luRm9jdXMuY2xvc2VkKSB7XG4gICAgICB0aGlzLl9vcmlnaW5Gb2N1cy51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fdGltZXJQaWNrZXJTdWIgJiYgIXRoaXMuX3RpbWVyUGlja2VyU3ViLmNsb3NlZCkge1xuICAgICAgdGhpcy5fdGltZXJQaWNrZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIHRoZSB0aW1lciBwaWNrZXIgdG8gb3JpZ2luIGVsZW1lbnQgKGlucHV0KVxuICAgKi9cbiAgcHJpdmF0ZSBfYXR0YWNoVGltZXJQaWNrZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fb3JpZ2luRm9jdXMgPSB0aGlzLm9yaWdpbi5oYXNGb2N1cy5zdWJzY3JpYmUoZm9jdXNlZCA9PiB7XG4gICAgICB0aGlzLnRpbWVyUGlja2VyLmZvY3VzID0gJ2hvdXInO1xuICAgICAgdGhpcy50aW1lclBpY2tlci5pc09wZW4gPSBmb2N1c2VkO1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl90aW1lclBpY2tlclN1YiA9IHRoaXMudGltZXJQaWNrZXIuc2VsZWN0ZWQuc3Vic2NyaWJlKHZhbHVlID0+XG4gICAgICB0aGlzLm9yaWdpbi53cml0ZVZhbHVlRnJvbVRpbWVyUGlja2VyKHZhbHVlKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==