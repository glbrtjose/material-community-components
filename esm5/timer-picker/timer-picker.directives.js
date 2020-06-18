import { __decorate } from "tslib";
import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, forwardRef, Input, Output, OnDestroy, Renderer2, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MccTimerPickerComponent } from './timer-picker.component';
import { BehaviorSubject } from 'rxjs';
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
        this.change = new BehaviorSubject('');
        /**
         * Emit changes from the origin
         */
        this.hasFocus = new BehaviorSubject(false);
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
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
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
                    useExisting: forwardRef(function () { return MccTimerPickerOriginDirective_1; }),
                    multi: true,
                },
            ],
        })
    ], MccTimerPickerOriginDirective);
    return MccTimerPickerOriginDirective;
}());
export { MccTimerPickerOriginDirective };
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
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input('mccConnectedTimerPickerOrigin')
    ], MccConnectedTimerPickerDirective.prototype, "origin", void 0);
    MccConnectedTimerPickerDirective = __decorate([
        Directive({
            selector: '[mccConnectedTimerPicker], [mcc-connected-timer-picker]',
            exportAs: 'mccConnectedTimerPicker',
        })
    ], MccConnectedTimerPickerDirective);
    return MccConnectedTimerPickerDirective;
}());
export { MccConnectedTimerPickerDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXItcGlja2VyLmRpcmVjdGl2ZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXRlcmlhbC1jb21tdW5pdHktY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInRpbWVyLXBpY2tlci90aW1lci1waWNrZXIuZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLGFBQWEsRUFDYixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ25FLE9BQU8sRUFBZ0IsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBYXJEO0lBZ0JFOztPQUVHO0lBQ0gsdUNBQW1CLFVBQXNCLEVBQVUsUUFBbUI7UUFBdEUsaUJBR0M7UUFIa0IsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFsQnRFOztXQUVHO1FBQ08sV0FBTSxHQUE0QixJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztRQUU1RTs7V0FFRztRQUNPLGFBQVEsR0FBNkIsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7UUFXakYsZUFBZTtRQUNmLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUF4QixDQUF3QixDQUFDLENBQUM7SUFDckYsQ0FBQztzQ0F0QlUsNkJBQTZCO0lBd0J4Qzs7O09BR0c7SUFDSCxrREFBVSxHQUFWLFVBQVcsSUFBWTtRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsaUVBQXlCLEdBQXpCLFVBQTBCLElBQVk7UUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQ7O09BRUc7SUFDSCwyREFBbUIsR0FBbkIsVUFBb0IsSUFBWTtRQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCx3REFBZ0IsR0FBaEIsVUFBaUIsRUFBTztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7O09BR0c7SUFDSCx5REFBaUIsR0FBakIsVUFBa0IsRUFBTyxJQUFVLENBQUM7SUFFcEM7OztPQUdHO0lBQ0gsd0RBQWdCLEdBQWhCLFVBQWlCLFVBQW1CO1FBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNuRixDQUFDOzs7Z0JBdEQ4QixVQUFVO2dCQUFvQixTQUFTOztJQWY1RDtRQUFULE1BQU0sRUFBRTtpRUFBbUU7SUFLbEU7UUFBVCxNQUFNLEVBQUU7bUVBQTBFO0lBVHhFLDZCQUE2QjtRQVh6QyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsbURBQW1EO1lBQzdELFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxpQkFBaUI7b0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLCtCQUE2QixFQUE3QixDQUE2QixDQUFDO29CQUM1RCxLQUFLLEVBQUUsSUFBSTtpQkFDWjthQUNGO1NBQ0YsQ0FBQztPQUNXLDZCQUE2QixDQTBFekM7SUFBRCxvQ0FBQztDQUFBLEFBMUVELElBMEVDO1NBMUVZLDZCQUE2QjtBQWdGMUM7SUFnQkUsMENBQ1UsV0FBb0MsRUFDckMsaUJBQW9DO1FBRG5DLGdCQUFXLEdBQVgsV0FBVyxDQUF5QjtRQUNyQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBRTNDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUNwQyxDQUFDO0lBRUQsMERBQWUsR0FBZjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdkMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBRUQsc0RBQVcsR0FBWDtRQUNFLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO1lBQ2xELElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDakM7UUFDRCxJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRTtZQUN4RCxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0ssNkRBQWtCLEdBQTFCO1FBQUEsaUJBVUM7UUFUQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU87WUFDeEQsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1lBQ2hDLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztZQUNsQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDOUQsT0FBQSxLQUFJLENBQUMsTUFBTSxDQUFDLHlCQUF5QixDQUFDLEtBQUssQ0FBQztRQUE1QyxDQUE0QyxDQUM3QyxDQUFDO0lBQ0osQ0FBQzs7Z0JBbkNzQix1QkFBdUI7Z0JBQ2xCLGlCQUFpQjs7SUFkTDtRQUF2QyxLQUFLLENBQUMsK0JBQStCLENBQUM7b0VBQXVDO0lBSm5FLGdDQUFnQztRQUo1QyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUseURBQXlEO1lBQ25FLFFBQVEsRUFBRSx5QkFBeUI7U0FDcEMsQ0FBQztPQUNXLGdDQUFnQyxDQXFENUM7SUFBRCx1Q0FBQztDQUFBLEFBckRELElBcURDO1NBckRZLGdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIE9uRGVzdHJveSxcbiAgUmVuZGVyZXIyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWNjVGltZXJQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL3RpbWVyLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21jY1RpbWVyUGlja2VyT3JpZ2luXSwgW21jYy10aW1lci1waWNrZXItb3JpZ2luXScsXG4gIGV4cG9ydEFzOiAnbWNjVGltZXJQaWNrZXJPcmlnaW4nLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1jY1RpbWVyUGlja2VyT3JpZ2luRGlyZWN0aXZlKSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1jY1RpbWVyUGlja2VyT3JpZ2luRGlyZWN0aXZlIHtcbiAgLyoqXG4gICAqIEVtaXQgY2hhbmdlcyBmcm9tIHRoZSBvcmlnaW5cbiAgICovXG4gIEBPdXRwdXQoKSBjaGFuZ2U6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcblxuICAvKipcbiAgICogRW1pdCBjaGFuZ2VzIGZyb20gdGhlIG9yaWdpblxuICAgKi9cbiAgQE91dHB1dCgpIGhhc0ZvY3VzOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvKipcbiAgICogUHJvcGFnYXRlIGNoYW5nZXMgdG8gYW5ndWxhclxuICAgKi9cbiAgcHJvcGFnYXRlQ2hhbmdlczogKF86IGFueSkgPT4ge307XG5cbiAgLyoqXG4gICAqIFJlZmVyZW5jZSB0byB0aGUgZWxlbWVudCBvbiB3aGljaCB0aGUgZGlyZWN0aXZlIGlzIGFwcGxpZWQuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgLy8gbGlzdGVuIGZvY3VzXG4gICAgcmVuZGVyZXIubGlzdGVuKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2ZvY3VzJywgKCkgPT4gdGhpcy5oYXNGb2N1cy5uZXh0KHRydWUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBieSB0aGUgZm9ybXMgQVBJIHRvIHdyaXRlIHRvIHRoZSB2aWV3IHdoZW5cbiAgICogcHJvZ3JhbW1hdGljIChtb2RlbCAtPiB2aWV3KSBjaGFuZ2VzIGFyZSByZXF1ZXN0ZWQuXG4gICAqL1xuICB3cml0ZVZhbHVlKHRpbWU6IHN0cmluZykge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIHRpbWUpO1xuICAgIHRoaXMuY2hhbmdlLm5leHQodGltZSk7XG4gICAgaWYgKHRoaXMucHJvcGFnYXRlQ2hhbmdlcykge1xuICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2VzKHRpbWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBieSB0aGUgdGltZSBwaWNrZXJcbiAgICovXG4gIHdyaXRlVmFsdWVGcm9tVGltZXJQaWNrZXIodGltZTogc3RyaW5nKSB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgdGltZSk7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2VzKHRpbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgYmUgY2FsbGVkIGZyb20gb3JpZ2luIHdoZSBrZXkgaXMgdXBcbiAgICovXG4gIHdyaXRlVmFsdWVGcm9tS2V5dXAodGltZTogc3RyaW5nKSB7XG4gICAgdGhpcy5jaGFuZ2UubmV4dCh0aW1lKTtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZXModGltZSk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBpcyBjYWxsZWQgYnkgdGhlIGZvcm1zIEFQSSBvbiBpbml0aWFsaXphdGlvbiBzbyBpdCBjYW4gdXBkYXRlIHRoZVxuICAgKiBmb3JtIG1vZGVsIHdoZW4gdmFsdWVzIHByb3BhZ2F0ZSBmcm9tIHRoZSB2aWV3ICh2aWV3IC0+IG1vZGVsKS5cbiAgICogQHBhcmFtIGZuIGFueVxuICAgKi9cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2VzID0gZm47XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBpcyBjYWxsZWQgYnkgdGhlIGZvcm1zIEFQSSBvbiBpbml0aWFsaXphdGlvbiBzbyBpdCBjYW4gdXBkYXRlIHRoZSBmb3JtIG1vZGVsIG9uIGJsdXJcbiAgICogQHBhcmFtIGZuIGFueVxuICAgKi9cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQgeyB9XG5cbiAgLyoqXG4gICAqIGNhbGxlZCBieSB0aGUgZm9ybXMgQVBJIHdoZW4gdGhlIGNvbnRyb2wgc3RhdHVzIGNoYW5nZXMgdG8gb3IgZnJvbSBcIkRJU0FCTEVEXCJcbiAgICogQHBhcmFtIGlzRGlzYWJsZWQgYm9vbGVhblxuICAgKi9cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2Rpc2FibGVkJywgaXNEaXNhYmxlZCk7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21jY0Nvbm5lY3RlZFRpbWVyUGlja2VyXSwgW21jYy1jb25uZWN0ZWQtdGltZXItcGlja2VyXScsXG4gIGV4cG9ydEFzOiAnbWNjQ29ubmVjdGVkVGltZXJQaWNrZXInLFxufSlcbmV4cG9ydCBjbGFzcyBNY2NDb25uZWN0ZWRUaW1lclBpY2tlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBvcmlnaW4gb2YgdGhlIGNvbm5lY3RlZCB0aW1lciBwaWNrZXJcbiAgICovXG4gIEBJbnB1dCgnbWNjQ29ubmVjdGVkVGltZXJQaWNrZXJPcmlnaW4nKSBvcmlnaW46IE1jY1RpbWVyUGlja2VyT3JpZ2luRGlyZWN0aXZlO1xuXG4gIC8qKlxuICAgKiBzdWJzY3JpcHRpb24gb2YgdGhlIG9yaWdpbiBmb2N1cyBvYnNlcnZhYmxlXG4gICAqL1xuICBwcml2YXRlIF9vcmlnaW5Gb2N1czogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBzdWJzY3JpcHRpb24gb2YgdGhlIHRpbWVyIHBpY2tlciBzZWxlY3RlZCBjaGFuZ2VcbiAgICovXG4gIHByaXZhdGUgX3RpbWVyUGlja2VyU3ViOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB0aW1lclBpY2tlcjogTWNjVGltZXJQaWNrZXJDb21wb25lbnQsXG4gICAgcHVibGljIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICB0aGlzLnRpbWVyUGlja2VyLmNvbm5lY3RlZCA9IHRydWU7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKCF0aGlzLl90aW1lclBpY2tlclN1Yikge1xuICAgICAgdGhpcy50aW1lclBpY2tlci50cmlnZ2VyID0gdGhpcy5vcmlnaW47XG4gICAgICB0aGlzLl9hdHRhY2hUaW1lclBpY2tlcigpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl9vcmlnaW5Gb2N1cyAmJiAhdGhpcy5fb3JpZ2luRm9jdXMuY2xvc2VkKSB7XG4gICAgICB0aGlzLl9vcmlnaW5Gb2N1cy51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fdGltZXJQaWNrZXJTdWIgJiYgIXRoaXMuX3RpbWVyUGlja2VyU3ViLmNsb3NlZCkge1xuICAgICAgdGhpcy5fdGltZXJQaWNrZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIHRoZSB0aW1lciBwaWNrZXIgdG8gb3JpZ2luIGVsZW1lbnQgKGlucHV0KVxuICAgKi9cbiAgcHJpdmF0ZSBfYXR0YWNoVGltZXJQaWNrZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fb3JpZ2luRm9jdXMgPSB0aGlzLm9yaWdpbi5oYXNGb2N1cy5zdWJzY3JpYmUoZm9jdXNlZCA9PiB7XG4gICAgICB0aGlzLnRpbWVyUGlja2VyLmZvY3VzID0gJ2hvdXInO1xuICAgICAgdGhpcy50aW1lclBpY2tlci5pc09wZW4gPSBmb2N1c2VkO1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl90aW1lclBpY2tlclN1YiA9IHRoaXMudGltZXJQaWNrZXIuc2VsZWN0ZWQuc3Vic2NyaWJlKHZhbHVlID0+XG4gICAgICB0aGlzLm9yaWdpbi53cml0ZVZhbHVlRnJvbVRpbWVyUGlja2VyKHZhbHVlKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==