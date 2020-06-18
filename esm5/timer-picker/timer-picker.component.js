import { __decorate, __read } from "tslib";
import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { BehaviorSubject } from 'rxjs';
import { HOURS, MINUTES, } from './timer-picker';
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
        this._clock = new BehaviorSubject(HOURS);
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
        this.selected = new EventEmitter();
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
            this._isOpen = coerceBooleanProperty(value);
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
            this._hideButtons = coerceBooleanProperty(value);
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
        Input()
    ], MccTimerPickerComponent.prototype, "hideButtons", null);
    __decorate([
        Input('mccTimerPickerFormat')
    ], MccTimerPickerComponent.prototype, "format", void 0);
    __decorate([
        Input('mccTimerPickerMin')
    ], MccTimerPickerComponent.prototype, "min", void 0);
    __decorate([
        Input('mccTimerPickerMax')
    ], MccTimerPickerComponent.prototype, "max", void 0);
    __decorate([
        Input()
    ], MccTimerPickerComponent.prototype, "btnCancel", void 0);
    __decorate([
        Input()
    ], MccTimerPickerComponent.prototype, "btnConfirm", void 0);
    __decorate([
        Output()
    ], MccTimerPickerComponent.prototype, "selected", void 0);
    MccTimerPickerComponent = __decorate([
        Component({
            selector: 'mcc-timer-picker',
            template: "<!-- show component inside overlay -->\n<ng-container *ngIf=\"connected\">\n  <ng-template cdkConnectedOverlay cdkConnectedOverlayHasBackdrop cdkConnectedOverlayBackdropClass=\"mcc-timer-picker-backdrop\" [cdkConnectedOverlayOrigin]=\"trigger\"\n    [cdkConnectedOverlayOpen]=\"isOpen\" (backdropClick)=\"backdropClick()\">\n\n    <ng-template [cdkPortalOutlet]=\"panelComponent\"></ng-template>\n\n  </ng-template>\n</ng-container>\n\n<ng-template *ngIf=\"!connected\" [cdkPortalOutlet]=\"panelComponent\"></ng-template>\n\n<ng-template cdkPortal #panelComponent=\"cdkPortal\">\n  <div class=\"mcc-timer-picker-overlay mat-elevation-z6\" role=\"dialog\" aria-label=\"Timer picker\">\n\n    <div class=\"mcc-timer-picker-header mat-primary\">\n      <button mat-icon-button class=\"mcc-timer-picker-hours\" [ngClass]=\"{ 'mcc-active': focus === 'hour' }\" (click)=\"focus = 'hour'\">\n        {{ hour }}\n      </button>\n      <span class=\"mcc-timer-picker-separator\"></span>\n      <button mat-icon-button class=\"mcc-timer-picker-minutes\" [ngClass]=\"{ 'mcc-active': focus === 'min' }\" (click)=\"focus = 'min'\">\n        {{ minute }}\n      </button>\n\n      <div class=\"mcc-timer-picker-am-pm\">\n        <button mat-icon-button [ngClass]=\"{ 'mcc-active': period === 'am' }\" (click)=\"changePeriod('am')\">\n          AM\n        </button>\n        <button mat-icon-button [ngClass]=\"{ 'mcc-active': period === 'pm' }\" (click)=\"changePeriod('pm')\">\n          PM\n        </button>\n      </div>\n    </div>\n\n    <div class=\"mcc-timer-picker-content\">\n\n      <div class=\"mcc-timer-picker-clock\">\n        <div class=\"mcc-timer-picker-dot\"></div>\n        <div class=\"mcc-timer-picker-line\" [ngClass]=\"getSelectedClass()\"></div>\n        <ng-container *ngFor=\"let option of clock$ | async;let i = index;\">\n          <button mat-icon-button class=\"mcc-timer-picker-option\" [ngClass]=\"{ 'mcc-timer-picker-option-selected': focus === 'hour' && hour == option || focus === 'min' && minute === option }\"\n            [id]=\"'option-'+i\" (click)=\"select(option)\" [disabled]=\"isOptionDisabled(option)\">\n            {{ option }}\n          </button>\n        </ng-container>\n      </div>\n\n    </div>\n\n    <div *ngIf=\"!hideButtons\" class=\"mcc-timer-picker-actions\" dir=\"rtl\">\n\n      <button mat-button role=\"button\" aria-label=\"Confirm\" (click)=\"confirmSelectedTime()\">\n        {{ btnConfirm }}\n      </button>\n\n      <button mat-button role=\"button\" aria-label=\"Cancel\" (click)=\"cancelSelection()\">\n        {{ btnCancel }}\n      </button>\n\n    </div>\n\n  </div>\n</ng-template>",
            preserveWhitespaces: false,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["@import url(https://fonts.googleapis.com/css?family=Roboto);.mcc-timer-picker-overlay{width:290px;height:400px}.mcc-timer-picker-header{display:flex;width:220px;height:65px;padding:10px 0 5px 70px;background:#00796b}.mcc-timer-picker-hours,.mcc-timer-picker-minutes{width:63px;height:63px;font-family:Roboto,sans-serif;font-size:50px;font-weight:400;color:rgba(255,255,255,.3)}.mcc-timer-picker-hours.mcc-standalone,.mcc-timer-picker-minutes.mcc-standalone{text-align:right}.mcc-timer-picker-hours.mcc-active,.mcc-timer-picker-minutes.mcc-active{color:#fff}.mcc-timer-picker-separator{font-family:Roboto,sans-serif;font-size:43px;font-weight:400;color:rgba(255,255,255,.3);margin:5px 5px 0 0}.mcc-timer-picker-separator::after{content:':'}.mcc-timer-picker-am-pm{display:flex;flex-direction:column;margin:10px}.mcc-timer-picker-am-pm button{width:25px;height:25px;line-height:25px;font-family:Roboto,sans-serif;font-size:12px;font-weight:400;color:rgba(255,255,255,.3)}.mcc-timer-picker-am-pm button.mcc-active{color:#fff}.mcc-timer-picker-content{width:inherit;height:260px;padding:15px 0 5px;background-color:#fff}.mcc-timer-picker-clock{position:relative;width:250px;height:250px;margin:0 auto;background-color:#eee;border-radius:50%;text-align:center}.mcc-timer-picker-clock .mcc-timer-picker-dot{position:absolute;width:8px;height:8px;border-radius:50%;background-color:#00796b;top:125px;left:125px}.mcc-timer-picker-clock .mcc-timer-picker-line{position:absolute;width:2px;height:100px;top:11.5%;left:51%;transform-origin:50% 100%;background-color:#00796b}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-0{transform:rotateZ(0);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-1{transform:rotateZ(327deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-2{transform:rotateZ(30deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-3{transform:rotateZ(300deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-4{transform:rotateZ(60deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-5{transform:rotateZ(270deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-6{transform:rotateZ(90deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-7{transform:rotateZ(240deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-8{transform:rotateZ(120deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-9{transform:rotateZ(210deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-10{transform:rotateZ(150deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-11{transform:rotateZ(180deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-option{position:absolute}.mcc-timer-picker-clock .mcc-timer-picker-option.mcc-timer-picker-option-selected{color:#fff;background-color:#00796b}.mcc-timer-picker-clock .mcc-timer-picker-option#option-0{top:0;left:113px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-1{top:25px;left:55px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-2{top:25px;right:55px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-3{top:63px;left:20px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-4{top:63px;right:20px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-5{top:113px;left:0}.mcc-timer-picker-clock .mcc-timer-picker-option#option-6{top:113px;right:0}.mcc-timer-picker-clock .mcc-timer-picker-option#option-7{bottom:55px;left:20px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-8{bottom:55px;right:20px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-9{bottom:20px;left:63px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-10{bottom:20px;right:55px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-11{bottom:0;left:113px}.mcc-timer-picker-actions{display:flex;padding:4px;background-color:#fff}.mcc-timer-picker-actions button{color:#100214;text-transform:uppercase;font-family:Roboto,sans-serif;font-size:14px;font-weight:400}::ng-deep .mat-icon-button{width:30px;height:30px;line-height:30px}"]
        })
    ], MccTimerPickerComponent);
    return MccTimerPickerComponent;
}());
export { MccTimerPickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXItcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hdGVyaWFsLWNvbW11bml0eS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsidGltZXItcGlja2VyL3RpbWVyLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBYyxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQU1MLEtBQUssRUFDTCxPQUFPLEdBQ1IsTUFBTSxnQkFBZ0IsQ0FBQztBQVN4QjtJQXdIRTtRQXZIQTs7V0FFRztRQUNLLGtCQUFhLEdBQXVCLElBQUksQ0FBQztRQUVqRDs7V0FFRztRQUNLLG9CQUFlLEdBQXlCLElBQUksQ0FBQztRQUVyRDs7V0FFRztRQUNLLG9CQUFlLEdBQXlCLElBQUksQ0FBQztRQVE3QyxXQUFNLEdBQThCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBYy9ELFdBQU0sR0FBMkIsTUFBTSxDQUFDO1FBbUJ4QyxVQUFLLEdBQXVCLElBQUksQ0FBQztRQVFqQyxZQUFPLEdBQXlCLElBQUksQ0FBQztRQVFyQyxZQUFPLEdBQXlCLElBQUksQ0FBQztRQVlyQyxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUV0Qzs7V0FFRztRQUM0QixXQUFNLEdBQXlCLElBQUksQ0FBQztRQUV2QyxRQUFHLEdBQVcsVUFBVSxDQUFDO1FBRXpCLFFBQUcsR0FBVyxVQUFVLENBQUM7UUFFckQ7O1dBRUc7UUFDTSxjQUFTLEdBQVcsUUFBUSxDQUFDO1FBRXRDOztXQUVHO1FBQ00sZUFBVSxHQUFXLElBQUksQ0FBQztRQUVuQzs7O1dBR0c7UUFDTyxhQUFRLEdB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QUs7WUFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O1NBQ2hELENBQUM7T0FDVyx1QkFBdUIsQ0EwUW5DO0lBQUQsOEJBQUM7Q0FBQSxBQTFRRCxJQTBRQztTQTFRWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2RrT3ZlcmxheU9yaWdpbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIE1jY1RpbWVyUGlja2VyVGltZVR5cGUsXG4gIE1jY1RpbWVyUGlja2VyRm9ybWF0LFxuICBNY2NUaW1lclBpY2tlckhvdXIsXG4gIE1jY1RpbWVyUGlja2VyTWludXRlLFxuICBNY2NUaW1lclBpY2tlclBlcmlvZCxcbiAgSE9VUlMsXG4gIE1JTlVURVMsXG59IGZyb20gJy4vdGltZXItcGlja2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWNjLXRpbWVyLXBpY2tlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi90aW1lci1waWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90aW1lci1waWNrZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNY2NUaW1lclBpY2tlckNvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBSZWNlaXZlIHNlbGVjdGVkIF9ob3VyIGFmdGVyIGNvbmZpcm1cbiAgICovXG4gIHByaXZhdGUgX3NlbGVjdGVkSG91cjogTWNjVGltZXJQaWNrZXJIb3VyID0gJzEyJztcblxuICAvKipcbiAgICogUmVjZWl2ZSBzZWxlY3RlZCBfbWludXRlIGFmdGVyIGNvbmZpcm1cbiAgICovXG4gIHByaXZhdGUgX3NlbGVjdGVkTWludXRlOiBNY2NUaW1lclBpY2tlck1pbnV0ZSA9ICcwMCc7XG5cbiAgLyoqXG4gICAqIFJlY2VpdmUgc2VsZWN0ZWQgX3BlcmlvZCBhZnRlciBjb25maXJtXG4gICAqL1xuICBwcml2YXRlIF9zZWxlY3RlZFBlcmlvZDogTWNjVGltZXJQaWNrZXJQZXJpb2QgPSAnYW0nO1xuXG4gIC8qKlxuICAgKiBDdXJyZW50IHZhbHVlIChob3VyL21pbnV0ZSkgdG8gY3JlYXRlIHRoZSBjbG9ja1xuICAgKi9cbiAgZ2V0IGNsb2NrJCgpOiBPYnNlcnZhYmxlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Nsb2NrLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG4gIHByaXZhdGUgX2Nsb2NrOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChIT1VSUyk7XG5cbiAgLyoqXG4gICAqIFR5cGUgdGhlcmUgaXMgaW4gZm9jdXMgKGhvdXIvbWludXRlKVxuICAgKi9cbiAgZ2V0IGZvY3VzKCk6IE1jY1RpbWVyUGlja2VyVGltZVR5cGUge1xuICAgIHJldHVybiB0aGlzLl9mb2N1cztcbiAgfVxuICBzZXQgZm9jdXModmFsdWU6IE1jY1RpbWVyUGlja2VyVGltZVR5cGUpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX2ZvY3VzKSB7XG4gICAgICB0aGlzLl9mb2N1cyA9IHZhbHVlO1xuICAgICAgdGhpcy5fY2xvY2submV4dCh0aGlzLl9mb2N1cyA9PT0gJ2hvdXInID8gSE9VUlMgOiBNSU5VVEVTKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfZm9jdXM6IE1jY1RpbWVyUGlja2VyVGltZVR5cGUgPSAnaG91cic7XG5cbiAgLyoqXG4gICAqIFN0YXRlIG9mIHRoZSBvdmVybGF5XG4gICAqL1xuICBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc09wZW47XG4gIH1cbiAgc2V0IGlzT3Blbih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzT3BlbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfaXNPcGVuOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGVtcG9yYXJ5IHNlbGVjdGVkIGhvdXIgKGNvbnN0IEhPVVJTKVxuICAgKi9cbiAgZ2V0IGhvdXIoKTogTWNjVGltZXJQaWNrZXJIb3VyIHtcbiAgICByZXR1cm4gdGhpcy5faG91cjtcbiAgfVxuICBwcml2YXRlIF9ob3VyOiBNY2NUaW1lclBpY2tlckhvdXIgPSAnMTInO1xuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGVtcG9yYXJ5IHNlbGVjdGVkIG1pbnV0ZSAoY29uc3QgTUlOVVRFUylcbiAgICovXG4gIGdldCBtaW51dGUoKTogTWNjVGltZXJQaWNrZXJNaW51dGUge1xuICAgIHJldHVybiB0aGlzLl9taW51dGU7XG4gIH1cbiAgcHJpdmF0ZSBfbWludXRlOiBNY2NUaW1lclBpY2tlck1pbnV0ZSA9ICcwMCc7XG5cbiAgLyoqXG4gICAqIFJldHVybiB0ZW1wb3Jhcnkgc2VsZWN0ZWQgcGVyaW9kIChhbS9wbSlcbiAgICovXG4gIGdldCBwZXJpb2QoKTogTWNjVGltZXJQaWNrZXJQZXJpb2Qge1xuICAgIHJldHVybiB0aGlzLl9wZXJpb2Q7XG4gIH1cbiAgcHJpdmF0ZSBfcGVyaW9kOiBNY2NUaW1lclBpY2tlclBlcmlvZCA9ICdhbSc7XG5cbiAgLyoqXG4gICAqIEhpZGUgQ29uZmlybSBhbmQgQ2FuY2VsIGJ1dHRvbnNcbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBoaWRlQnV0dG9ucygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGlkZUJ1dHRvbnM7XG4gIH1cbiAgc2V0IGhpZGVCdXR0b25zKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGlkZUJ1dHRvbnMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2hpZGVCdXR0b25zOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEZvcm1hdCBvZiB0aGUgaG91ciB0byBiZSBlbWl0ZWQgb24gY29uZmlybVxuICAgKi9cbiAgQElucHV0KCdtY2NUaW1lclBpY2tlckZvcm1hdCcpIGZvcm1hdDogTWNjVGltZXJQaWNrZXJGb3JtYXQgPSAnMTInO1xuXG4gIEBJbnB1dCgnbWNjVGltZXJQaWNrZXJNaW4nKSBtaW46IHN0cmluZyA9ICcwMDowMCBhbSc7XG5cbiAgQElucHV0KCdtY2NUaW1lclBpY2tlck1heCcpIG1heDogc3RyaW5nID0gJzEyOjAwIHBtJztcblxuICAvKipcbiAgICogQ2hhbmdlIGJ0bkNhbmNlbCBsYWJlbFxuICAgKi9cbiAgQElucHV0KCkgYnRuQ2FuY2VsOiBzdHJpbmcgPSAnQ2FuY2VsJztcblxuICAvKipcbiAgICogQ2hhbmdlIGJ0bkNvbmZpcm0gbGFiZWxcbiAgICovXG4gIEBJbnB1dCgpIGJ0bkNvbmZpcm06IHN0cmluZyA9ICdPayc7XG5cbiAgLyoqXG4gICAqIEV2ZW50IGVtaXRlZCB3aGVuIGNvbmZpcm0gYnV0dG9uIGlzIHByZXNzZWQuXG4gICAqIElmIGJ1dHRvbnMgYXJlIGhpZGRlbiwgdGhlIGV2ZW50IGlzIGVtaXRlZCB3aGVuIHZhbHVlIGlzIGNoYW5nZWRcbiAgICovXG4gIEBPdXRwdXQoKSBzZWxlY3RlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIE9yaWdpbiByZWZlcmVuY2Ugb2YgY29ubmVjdGVkIHRpbWVyIHBpY2tlclxuICAgKi9cbiAgdHJpZ2dlcjogQ2RrT3ZlcmxheU9yaWdpbjtcblxuICAvKipcbiAgICogU2V0IHRvIHRydWUgd2hlbiB0aW1lciBwaWNrZXIgaGF2ZSBiZWVuIGNvbm5lY3RlZCB3aXRoIGFub3RoZXIgY29tcG9uZW50XG4gICAqL1xuICBjb25uZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGltZXIgb3B0aW9uIGNsYXNzIHRvIGNyZWF0ZSBsaW5lIGJldHdlZW4gdGhlIG1pZGRsZSBvZiB0aGUgY2xvY2sgYW5kXG4gICAqIHRoZSBvcHRpb25cbiAgICovXG4gIGdldFNlbGVjdGVkQ2xhc3MoKTogc3RyaW5nIHtcbiAgICBsZXQgbmFtZSA9ICdzZWxlY3RlZC1pbmRleC0nO1xuICAgIGlmICh0aGlzLmZvY3VzID09PSAnaG91cicpIHtcbiAgICAgIG5hbWUgKz0gSE9VUlMuZmluZEluZGV4KGggPT4gaCA9PT0gdGhpcy5ob3VyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmFtZSArPSBNSU5VVEVTLmZpbmRJbmRleChtID0+IG0gPT09IHRoaXMubWludXRlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3Qgb3B0aW9uIGZyb20gdGhlIGNsb2NrLlxuICAgKiBAcGFyYW0gdmFsdWUgTWNjVGltZXJQaWNrZXJIb3VyIHwgTWNjVGltZXJQaWNrZXJNaW51dGVcbiAgICovXG4gIHNlbGVjdCh2YWx1ZTogTWNjVGltZXJQaWNrZXJIb3VyIHwgTWNjVGltZXJQaWNrZXJNaW51dGUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5mb2N1cyA9PT0gJ2hvdXInKSB7XG4gICAgICB0aGlzLl9ob3VyID0gPE1jY1RpbWVyUGlja2VySG91cj52YWx1ZTtcbiAgICAgIHRoaXMuZm9jdXMgPSAnbWluJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbWludXRlID0gPE1jY1RpbWVyUGlja2VyTWludXRlPnZhbHVlO1xuICAgIH1cblxuICAgIC8vIGlmIGJ1dHRvbnMgYXJlIGhpZGRlbiwgZW1pdCBuZXcgZXZlbnQgd2hlbiB2YWx1ZSBpcyBjaGFuZ2VkXG4gICAgaWYgKHRoaXMuX2hpZGVCdXR0b25zKSB7XG4gICAgICB0aGlzLmNvbmZpcm1TZWxlY3RlZFRpbWUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhcnJheSBjb250YWluaW5nIHRpbWUsIGhvdXIgYW5kIHBlcmlvZCBmcmFnbWVudHMgZnJvbSB0aW1lIHN0cmluZ1xuICAgKiBAcGFyYW0gdGltZSBzdHJpbmdcbiAgICovXG4gIHBhcnNlVGltZUlucHV0KHRpbWU6IHN0cmluZyk6IFtudW1iZXIsIG51bWJlciwgc3RyaW5nXSB7XG4gICAgY29uc3QgcGFyc2VkID0gdGltZS5zcGxpdCgvXFxzfDovKS5tYXAoKGZyYWdtZW50LCBpbmRleCkgPT4ge1xuICAgICAgcmV0dXJuIGluZGV4ID09PSAyID8gZnJhZ21lbnQgOiBwYXJzZUludChmcmFnbWVudCwgMTApO1xuICAgIH0pO1xuXG4gICAgaWYgKHBhcnNlZC5sZW5ndGggPT09IDIpIHtcbiAgICAgIC8vIGFzc3VtZSB3ZSBhcmUgdXNpbmcgMjQgaG91ciB0aW1lIGZvcm1hdFxuICAgICAgY29uc3QgaG91cnMgPSBwYXJzZWRbMF0gYXMgbnVtYmVyO1xuICAgICAgaWYgKGhvdXJzID4gMTEpIHtcbiAgICAgICAgcGFyc2VkWzBdID0gaG91cnMgLSAxMjtcbiAgICAgICAgcGFyc2VkLnB1c2goJ3BtJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWQucHVzaCgnYW0nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcGFyc2VkIGFzIFtudW1iZXIsIG51bWJlciwgc3RyaW5nXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgb3B0aW9uIHZhbHVlIGlzIG5vdCB2YWxpZFxuICAgKiBAcGFyYW0gdmFsdWUgTWNjVGltZXJQaWNrZXJIb3VyIHwgTWNjVGltZXJQaWNrZXJNaW51dGVcbiAgICovXG4gIGlzT3B0aW9uRGlzYWJsZWQodmFsdWU6IE1jY1RpbWVyUGlja2VySG91ciB8IE1jY1RpbWVyUGlja2VyTWludXRlKTogYm9vbGVhbiB7XG5cbiAgICBjb25zdCBbbWluSG91ciwgbWluTWludXRlcywgbWluUGVyaW9kXSA9IHRoaXMucGFyc2VUaW1lSW5wdXQodGhpcy5taW4pO1xuICAgIGNvbnN0IFttYXhIb3VyLCBtYXhNaW51dGVzLCBtYXhQZXJpb2RdID0gdGhpcy5wYXJzZVRpbWVJbnB1dCh0aGlzLm1heCk7XG5cbiAgICBjb25zdCBvcHRpb25WYWx1ZSA9IHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gICAgY29uc3Qgc2VsZWN0ZWRIb3VyID0gcGFyc2VJbnQodGhpcy5faG91ciwgMTApO1xuICAgIGNvbnN0IHNlbGVjdGVkUGVyaW9kID0gdGhpcy5fcGVyaW9kO1xuXG4gICAgaWYgKHRoaXMuZm9jdXMgPT09ICdob3VyJykge1xuICAgICAgaWYgKG9wdGlvblZhbHVlIDwgbWluSG91ciAmJiBzZWxlY3RlZFBlcmlvZCA9PT0gbWluUGVyaW9kKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25WYWx1ZSA+IG1heEhvdXIgJiYgc2VsZWN0ZWRQZXJpb2QgPT09IG1heFBlcmlvZCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHNlbGVjdGVkSG91ciA9PT0gbWluSG91ciAmJiBzZWxlY3RlZFBlcmlvZCA9PT0gbWluUGVyaW9kICYmIG9wdGlvblZhbHVlIDwgbWluTWludXRlcykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRIb3VyID09PSBtYXhIb3VyICYmIHNlbGVjdGVkUGVyaW9kID09PSBtYXhQZXJpb2QgJiYgb3B0aW9uVmFsdWUgPiBtYXhNaW51dGVzKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2UgcGVyaW9kIG9mIHRoZSBjbG9ja1xuICAgKiBAcGFyYW0gcGVyaW9kIE1jY1RpbWVyUGlja2VyUGVyaW9kXG4gICAqL1xuICBjaGFuZ2VQZXJpb2QocGVyaW9kOiBNY2NUaW1lclBpY2tlclBlcmlvZCk6IHZvaWQge1xuICAgIHRoaXMuX3BlcmlvZCA9IHBlcmlvZDtcbiAgICAvLyBpZiBidXR0b25zIGFyZSBoaWRkZW4sIGVtaXQgbmV3IGV2ZW50IHdoZW4gdmFsdWUgaXMgY2hhbmdlZFxuICAgIGlmICh0aGlzLl9oaWRlQnV0dG9ucykge1xuICAgICAgdGhpcy5jb25maXJtU2VsZWN0ZWRUaW1lKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBzZWxlY3RlZCBjb2xvciwgY2xvc2UgdGhlIHBhbmVsIGFuZCBub3RpZnkgdGhlIHVzZXJcbiAgICovXG4gIGJhY2tkcm9wQ2xpY2soKTogdm9pZCB7XG4gICAgdGhpcy5jb25maXJtU2VsZWN0ZWRUaW1lKCk7XG4gICAgdGhpcy5faXNPcGVuID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlIHZhbHVlcyB0byBsYXN0IGNvbmZpcm0gc2VsZWN0IHRpbWVcbiAgICovXG4gIGNhbmNlbFNlbGVjdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9ob3VyID0gdGhpcy5fc2VsZWN0ZWRIb3VyO1xuICAgIHRoaXMuX21pbnV0ZSA9IHRoaXMuX3NlbGVjdGVkTWludXRlO1xuICAgIHRoaXMuX3BlcmlvZCA9IHRoaXMuX3NlbGVjdGVkUGVyaW9kO1xuICAgIHRoaXMuX2lzT3BlbiA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBuZXcgdmFsdWVzIG9mIHRpbWUgYW5kIGVtaXQgbmV3IGV2ZW50IHdpdGggdGhlIGZvcm1hdGVkIHRpbWVyXG4gICAqL1xuICBjb25maXJtU2VsZWN0ZWRUaW1lKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlbGVjdGVkSG91ciA9IHRoaXMuaG91cjtcbiAgICB0aGlzLl9zZWxlY3RlZE1pbnV0ZSA9IHRoaXMubWludXRlO1xuICAgIHRoaXMuX3NlbGVjdGVkUGVyaW9kID0gdGhpcy5wZXJpb2Q7XG5cbiAgICAvLyBmb3JtYXQgc3RyaW5nIHRvIGVtaXQgc2VsZWN0ZWQgdGltZVxuICAgIGxldCBmb3JtYXRlZDogc3RyaW5nO1xuICAgIGlmICh0aGlzLmZvcm1hdCA9PT0gJzEyJykge1xuICAgICAgZm9ybWF0ZWQgPSBgJHt0aGlzLmhvdXJ9OiR7dGhpcy5taW51dGV9ICR7dGhpcy5wZXJpb2R9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGhvdXI6IHN0cmluZyA9IHRoaXMuaG91cjtcbiAgICAgIGlmICh0aGlzLnBlcmlvZCA9PT0gJ3BtJykge1xuICAgICAgICBob3VyID0gYCR7cGFyc2VJbnQoaG91cikgKyAxMn1gO1xuICAgICAgfVxuXG4gICAgICBmb3JtYXRlZCA9IGAke2hvdXJ9OiR7dGhpcy5taW51dGV9YDtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGVkLmVtaXQoZm9ybWF0ZWQpO1xuXG4gICAgLy8gb25seSBjbG9zZSBhdXRvbWF0aWNhbGx5IGlmIGJ1dHRvbiBhcmVuJ3QgaGlkZGVuXG4gICAgaWYgKCF0aGlzLl9oaWRlQnV0dG9ucykge1xuICAgICAgdGhpcy5faXNPcGVuID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iXX0=