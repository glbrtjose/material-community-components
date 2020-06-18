import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { BehaviorSubject } from 'rxjs';
import { HOURS, MINUTES, } from './timer-picker';
let MccTimerPickerComponent = class MccTimerPickerComponent {
    constructor() {
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
    /**
     * Current value (hour/minute) to create the clock
     */
    get clock$() {
        return this._clock.asObservable();
    }
    /**
     * Type there is in focus (hour/minute)
     */
    get focus() {
        return this._focus;
    }
    set focus(value) {
        if (value !== this._focus) {
            this._focus = value;
            this._clock.next(this._focus === 'hour' ? HOURS : MINUTES);
        }
    }
    /**
     * State of the overlay
     */
    get isOpen() {
        return this._isOpen;
    }
    set isOpen(value) {
        this._isOpen = coerceBooleanProperty(value);
    }
    /**
     * Return temporary selected hour (const HOURS)
     */
    get hour() {
        return this._hour;
    }
    /**
     * Return temporary selected minute (const MINUTES)
     */
    get minute() {
        return this._minute;
    }
    /**
     * Return temporary selected period (am/pm)
     */
    get period() {
        return this._period;
    }
    /**
     * Hide Confirm and Cancel buttons
     */
    get hideButtons() {
        return this._hideButtons;
    }
    set hideButtons(value) {
        this._hideButtons = coerceBooleanProperty(value);
    }
    /**
     * Return timer option class to create line between the middle of the clock and
     * the option
     */
    getSelectedClass() {
        let name = 'selected-index-';
        if (this.focus === 'hour') {
            name += HOURS.findIndex(h => h === this.hour);
        }
        else {
            name += MINUTES.findIndex(m => m === this.minute);
        }
        return name;
    }
    /**
     * Select option from the clock.
     * @param value MccTimerPickerHour | MccTimerPickerMinute
     */
    select(value) {
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
    }
    /**
     * Returns array containing time, hour and period fragments from time string
     * @param time string
     */
    parseTimeInput(time) {
        const parsed = time.split(/\s|:/).map((fragment, index) => {
            return index === 2 ? fragment : parseInt(fragment, 10);
        });
        if (parsed.length === 2) {
            // assume we are using 24 hour time format
            const hours = parsed[0];
            if (hours > 11) {
                parsed[0] = hours - 12;
                parsed.push('pm');
            }
            else {
                parsed.push('am');
            }
        }
        return parsed;
    }
    /**
     * Returns true if option value is not valid
     * @param value MccTimerPickerHour | MccTimerPickerMinute
     */
    isOptionDisabled(value) {
        const [minHour, minMinutes, minPeriod] = this.parseTimeInput(this.min);
        const [maxHour, maxMinutes, maxPeriod] = this.parseTimeInput(this.max);
        const optionValue = parseInt(value, 10);
        const selectedHour = parseInt(this._hour, 10);
        const selectedPeriod = this._period;
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
    }
    /**
     * Change period of the clock
     * @param period MccTimerPickerPeriod
     */
    changePeriod(period) {
        this._period = period;
        // if buttons are hidden, emit new event when value is changed
        if (this._hideButtons) {
            this.confirmSelectedTime();
        }
    }
    /**
     * Update selected color, close the panel and notify the user
     */
    backdropClick() {
        this.confirmSelectedTime();
        this._isOpen = false;
    }
    /**
     * Change values to last confirm select time
     */
    cancelSelection() {
        this._hour = this._selectedHour;
        this._minute = this._selectedMinute;
        this._period = this._selectedPeriod;
        this._isOpen = false;
    }
    /**
     * Set new values of time and emit new event with the formated timer
     */
    confirmSelectedTime() {
        this._selectedHour = this.hour;
        this._selectedMinute = this.minute;
        this._selectedPeriod = this.period;
        // format string to emit selected time
        let formated;
        if (this.format === '12') {
            formated = `${this.hour}:${this.minute} ${this.period}`;
        }
        else {
            let hour = this.hour;
            if (this.period === 'pm') {
                hour = `${parseInt(hour) + 12}`;
            }
            formated = `${hour}:${this.minute}`;
        }
        this.selected.emit(formated);
        // only close automatically if button aren't hidden
        if (!this._hideButtons) {
            this._isOpen = false;
        }
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
export { MccTimerPickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXItcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hdGVyaWFsLWNvbW11bml0eS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsidGltZXItcGlja2VyL3RpbWVyLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBYyxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQU1MLEtBQUssRUFDTCxPQUFPLEdBQ1IsTUFBTSxnQkFBZ0IsQ0FBQztBQVN4QixJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF1QjtJQXdIbEM7UUF2SEE7O1dBRUc7UUFDSyxrQkFBYSxHQUF1QixJQUFJLENBQUM7UUFFakQ7O1dBRUc7UUFDSyxvQkFBZSxHQUF5QixJQUFJLENBQUM7UUFFckQ7O1dBRUc7UUFDSyxvQkFBZSxHQUF5QixJQUFJLENBQUM7UUFRN0MsV0FBTSxHQUE4QixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQWMvRCxXQUFNLEdBQTJCLE1BQU0sQ0FBQztRQW1CeEMsVUFBSyxHQUF1QixJQUFJLENBQUM7UUFRakMsWUFBTyxHQUF5QixJQUFJLENBQUM7UUFRckMsWUFBTyxHQUF5QixJQUFJLENBQUM7UUFZckMsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFFdEM7O1dBRUc7UUFDNEIsV0FBTSxHQUF5QixJQUFJLENBQUM7UUFFdkMsUUFBRyxHQUFXLFVBQVUsQ0FBQztRQUV6QixRQUFHLEdBQVcsVUFBVSxDQUFDO1FBRXJEOztXQUVHO1FBQ00sY0FBUyxHQUFXLFFBQVEsQ0FBQztRQUV0Qzs7V0FFRztRQUNNLGVBQVUsR0FBVyxJQUFJ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UUFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O0tBQ2hELENBQUM7R0FDVyx1QkFBdUIsQ0EwUW5DO1NBMVFZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGtPdmVybGF5T3JpZ2luIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgTWNjVGltZXJQaWNrZXJUaW1lVHlwZSxcbiAgTWNjVGltZXJQaWNrZXJGb3JtYXQsXG4gIE1jY1RpbWVyUGlja2VySG91cixcbiAgTWNjVGltZXJQaWNrZXJNaW51dGUsXG4gIE1jY1RpbWVyUGlja2VyUGVyaW9kLFxuICBIT1VSUyxcbiAgTUlOVVRFUyxcbn0gZnJvbSAnLi90aW1lci1waWNrZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtY2MtdGltZXItcGlja2VyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RpbWVyLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RpbWVyLXBpY2tlci5jb21wb25lbnQuc2NzcyddLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1jY1RpbWVyUGlja2VyQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIFJlY2VpdmUgc2VsZWN0ZWQgX2hvdXIgYWZ0ZXIgY29uZmlybVxuICAgKi9cbiAgcHJpdmF0ZSBfc2VsZWN0ZWRIb3VyOiBNY2NUaW1lclBpY2tlckhvdXIgPSAnMTInO1xuXG4gIC8qKlxuICAgKiBSZWNlaXZlIHNlbGVjdGVkIF9taW51dGUgYWZ0ZXIgY29uZmlybVxuICAgKi9cbiAgcHJpdmF0ZSBfc2VsZWN0ZWRNaW51dGU6IE1jY1RpbWVyUGlja2VyTWludXRlID0gJzAwJztcblxuICAvKipcbiAgICogUmVjZWl2ZSBzZWxlY3RlZCBfcGVyaW9kIGFmdGVyIGNvbmZpcm1cbiAgICovXG4gIHByaXZhdGUgX3NlbGVjdGVkUGVyaW9kOiBNY2NUaW1lclBpY2tlclBlcmlvZCA9ICdhbSc7XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgdmFsdWUgKGhvdXIvbWludXRlKSB0byBjcmVhdGUgdGhlIGNsb2NrXG4gICAqL1xuICBnZXQgY2xvY2skKCk6IE9ic2VydmFibGU8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gdGhpcy5fY2xvY2suYXNPYnNlcnZhYmxlKCk7XG4gIH1cbiAgcHJpdmF0ZSBfY2xvY2s6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KEhPVVJTKTtcblxuICAvKipcbiAgICogVHlwZSB0aGVyZSBpcyBpbiBmb2N1cyAoaG91ci9taW51dGUpXG4gICAqL1xuICBnZXQgZm9jdXMoKTogTWNjVGltZXJQaWNrZXJUaW1lVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvY3VzO1xuICB9XG4gIHNldCBmb2N1cyh2YWx1ZTogTWNjVGltZXJQaWNrZXJUaW1lVHlwZSkge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fZm9jdXMpIHtcbiAgICAgIHRoaXMuX2ZvY3VzID0gdmFsdWU7XG4gICAgICB0aGlzLl9jbG9jay5uZXh0KHRoaXMuX2ZvY3VzID09PSAnaG91cicgPyBIT1VSUyA6IE1JTlVURVMpO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF9mb2N1czogTWNjVGltZXJQaWNrZXJUaW1lVHlwZSA9ICdob3VyJztcblxuICAvKipcbiAgICogU3RhdGUgb2YgdGhlIG92ZXJsYXlcbiAgICovXG4gIGdldCBpc09wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzT3BlbjtcbiAgfVxuICBzZXQgaXNPcGVuKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNPcGVuID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9pc09wZW46IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFJldHVybiB0ZW1wb3Jhcnkgc2VsZWN0ZWQgaG91ciAoY29uc3QgSE9VUlMpXG4gICAqL1xuICBnZXQgaG91cigpOiBNY2NUaW1lclBpY2tlckhvdXIge1xuICAgIHJldHVybiB0aGlzLl9ob3VyO1xuICB9XG4gIHByaXZhdGUgX2hvdXI6IE1jY1RpbWVyUGlja2VySG91ciA9ICcxMic7XG5cbiAgLyoqXG4gICAqIFJldHVybiB0ZW1wb3Jhcnkgc2VsZWN0ZWQgbWludXRlIChjb25zdCBNSU5VVEVTKVxuICAgKi9cbiAgZ2V0IG1pbnV0ZSgpOiBNY2NUaW1lclBpY2tlck1pbnV0ZSB7XG4gICAgcmV0dXJuIHRoaXMuX21pbnV0ZTtcbiAgfVxuICBwcml2YXRlIF9taW51dGU6IE1jY1RpbWVyUGlja2VyTWludXRlID0gJzAwJztcblxuICAvKipcbiAgICogUmV0dXJuIHRlbXBvcmFyeSBzZWxlY3RlZCBwZXJpb2QgKGFtL3BtKVxuICAgKi9cbiAgZ2V0IHBlcmlvZCgpOiBNY2NUaW1lclBpY2tlclBlcmlvZCB7XG4gICAgcmV0dXJuIHRoaXMuX3BlcmlvZDtcbiAgfVxuICBwcml2YXRlIF9wZXJpb2Q6IE1jY1RpbWVyUGlja2VyUGVyaW9kID0gJ2FtJztcblxuICAvKipcbiAgICogSGlkZSBDb25maXJtIGFuZCBDYW5jZWwgYnV0dG9uc1xuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IGhpZGVCdXR0b25zKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oaWRlQnV0dG9ucztcbiAgfVxuICBzZXQgaGlkZUJ1dHRvbnModmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlQnV0dG9ucyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfaGlkZUJ1dHRvbnM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogRm9ybWF0IG9mIHRoZSBob3VyIHRvIGJlIGVtaXRlZCBvbiBjb25maXJtXG4gICAqL1xuICBASW5wdXQoJ21jY1RpbWVyUGlja2VyRm9ybWF0JykgZm9ybWF0OiBNY2NUaW1lclBpY2tlckZvcm1hdCA9ICcxMic7XG5cbiAgQElucHV0KCdtY2NUaW1lclBpY2tlck1pbicpIG1pbjogc3RyaW5nID0gJzAwOjAwIGFtJztcblxuICBASW5wdXQoJ21jY1RpbWVyUGlja2VyTWF4JykgbWF4OiBzdHJpbmcgPSAnMTI6MDAgcG0nO1xuXG4gIC8qKlxuICAgKiBDaGFuZ2UgYnRuQ2FuY2VsIGxhYmVsXG4gICAqL1xuICBASW5wdXQoKSBidG5DYW5jZWw6IHN0cmluZyA9ICdDYW5jZWwnO1xuXG4gIC8qKlxuICAgKiBDaGFuZ2UgYnRuQ29uZmlybSBsYWJlbFxuICAgKi9cbiAgQElucHV0KCkgYnRuQ29uZmlybTogc3RyaW5nID0gJ09rJztcblxuICAvKipcbiAgICogRXZlbnQgZW1pdGVkIHdoZW4gY29uZmlybSBidXR0b24gaXMgcHJlc3NlZC5cbiAgICogSWYgYnV0dG9ucyBhcmUgaGlkZGVuLCB0aGUgZXZlbnQgaXMgZW1pdGVkIHdoZW4gdmFsdWUgaXMgY2hhbmdlZFxuICAgKi9cbiAgQE91dHB1dCgpIHNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogT3JpZ2luIHJlZmVyZW5jZSBvZiBjb25uZWN0ZWQgdGltZXIgcGlja2VyXG4gICAqL1xuICB0cmlnZ2VyOiBDZGtPdmVybGF5T3JpZ2luO1xuXG4gIC8qKlxuICAgKiBTZXQgdG8gdHJ1ZSB3aGVuIHRpbWVyIHBpY2tlciBoYXZlIGJlZW4gY29ubmVjdGVkIHdpdGggYW5vdGhlciBjb21wb25lbnRcbiAgICovXG4gIGNvbm5lY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aW1lciBvcHRpb24gY2xhc3MgdG8gY3JlYXRlIGxpbmUgYmV0d2VlbiB0aGUgbWlkZGxlIG9mIHRoZSBjbG9jayBhbmRcbiAgICogdGhlIG9wdGlvblxuICAgKi9cbiAgZ2V0U2VsZWN0ZWRDbGFzcygpOiBzdHJpbmcge1xuICAgIGxldCBuYW1lID0gJ3NlbGVjdGVkLWluZGV4LSc7XG4gICAgaWYgKHRoaXMuZm9jdXMgPT09ICdob3VyJykge1xuICAgICAgbmFtZSArPSBIT1VSUy5maW5kSW5kZXgoaCA9PiBoID09PSB0aGlzLmhvdXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuYW1lICs9IE1JTlVURVMuZmluZEluZGV4KG0gPT4gbSA9PT0gdGhpcy5taW51dGUpO1xuICAgIH1cblxuICAgIHJldHVybiBuYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCBvcHRpb24gZnJvbSB0aGUgY2xvY2suXG4gICAqIEBwYXJhbSB2YWx1ZSBNY2NUaW1lclBpY2tlckhvdXIgfCBNY2NUaW1lclBpY2tlck1pbnV0ZVxuICAgKi9cbiAgc2VsZWN0KHZhbHVlOiBNY2NUaW1lclBpY2tlckhvdXIgfCBNY2NUaW1lclBpY2tlck1pbnV0ZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmZvY3VzID09PSAnaG91cicpIHtcbiAgICAgIHRoaXMuX2hvdXIgPSA8TWNjVGltZXJQaWNrZXJIb3VyPnZhbHVlO1xuICAgICAgdGhpcy5mb2N1cyA9ICdtaW4nO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9taW51dGUgPSA8TWNjVGltZXJQaWNrZXJNaW51dGU+dmFsdWU7XG4gICAgfVxuXG4gICAgLy8gaWYgYnV0dG9ucyBhcmUgaGlkZGVuLCBlbWl0IG5ldyBldmVudCB3aGVuIHZhbHVlIGlzIGNoYW5nZWRcbiAgICBpZiAodGhpcy5faGlkZUJ1dHRvbnMpIHtcbiAgICAgIHRoaXMuY29uZmlybVNlbGVjdGVkVGltZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFycmF5IGNvbnRhaW5pbmcgdGltZSwgaG91ciBhbmQgcGVyaW9kIGZyYWdtZW50cyBmcm9tIHRpbWUgc3RyaW5nXG4gICAqIEBwYXJhbSB0aW1lIHN0cmluZ1xuICAgKi9cbiAgcGFyc2VUaW1lSW5wdXQodGltZTogc3RyaW5nKTogW251bWJlciwgbnVtYmVyLCBzdHJpbmddIHtcbiAgICBjb25zdCBwYXJzZWQgPSB0aW1lLnNwbGl0KC9cXHN8Oi8pLm1hcCgoZnJhZ21lbnQsIGluZGV4KSA9PiB7XG4gICAgICByZXR1cm4gaW5kZXggPT09IDIgPyBmcmFnbWVudCA6IHBhcnNlSW50KGZyYWdtZW50LCAxMCk7XG4gICAgfSk7XG5cbiAgICBpZiAocGFyc2VkLmxlbmd0aCA9PT0gMikge1xuICAgICAgLy8gYXNzdW1lIHdlIGFyZSB1c2luZyAyNCBob3VyIHRpbWUgZm9ybWF0XG4gICAgICBjb25zdCBob3VycyA9IHBhcnNlZFswXSBhcyBudW1iZXI7XG4gICAgICBpZiAoaG91cnMgPiAxMSkge1xuICAgICAgICBwYXJzZWRbMF0gPSBob3VycyAtIDEyO1xuICAgICAgICBwYXJzZWQucHVzaCgncG0nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZC5wdXNoKCdhbScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwYXJzZWQgYXMgW251bWJlciwgbnVtYmVyLCBzdHJpbmddO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBvcHRpb24gdmFsdWUgaXMgbm90IHZhbGlkXG4gICAqIEBwYXJhbSB2YWx1ZSBNY2NUaW1lclBpY2tlckhvdXIgfCBNY2NUaW1lclBpY2tlck1pbnV0ZVxuICAgKi9cbiAgaXNPcHRpb25EaXNhYmxlZCh2YWx1ZTogTWNjVGltZXJQaWNrZXJIb3VyIHwgTWNjVGltZXJQaWNrZXJNaW51dGUpOiBib29sZWFuIHtcblxuICAgIGNvbnN0IFttaW5Ib3VyLCBtaW5NaW51dGVzLCBtaW5QZXJpb2RdID0gdGhpcy5wYXJzZVRpbWVJbnB1dCh0aGlzLm1pbik7XG4gICAgY29uc3QgW21heEhvdXIsIG1heE1pbnV0ZXMsIG1heFBlcmlvZF0gPSB0aGlzLnBhcnNlVGltZUlucHV0KHRoaXMubWF4KTtcblxuICAgIGNvbnN0IG9wdGlvblZhbHVlID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICBjb25zdCBzZWxlY3RlZEhvdXIgPSBwYXJzZUludCh0aGlzLl9ob3VyLCAxMCk7XG4gICAgY29uc3Qgc2VsZWN0ZWRQZXJpb2QgPSB0aGlzLl9wZXJpb2Q7XG5cbiAgICBpZiAodGhpcy5mb2N1cyA9PT0gJ2hvdXInKSB7XG4gICAgICBpZiAob3B0aW9uVmFsdWUgPCBtaW5Ib3VyICYmIHNlbGVjdGVkUGVyaW9kID09PSBtaW5QZXJpb2QpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvblZhbHVlID4gbWF4SG91ciAmJiBzZWxlY3RlZFBlcmlvZCA9PT0gbWF4UGVyaW9kKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc2VsZWN0ZWRIb3VyID09PSBtaW5Ib3VyICYmIHNlbGVjdGVkUGVyaW9kID09PSBtaW5QZXJpb2QgJiYgb3B0aW9uVmFsdWUgPCBtaW5NaW51dGVzKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZEhvdXIgPT09IG1heEhvdXIgJiYgc2VsZWN0ZWRQZXJpb2QgPT09IG1heFBlcmlvZCAmJiBvcHRpb25WYWx1ZSA+IG1heE1pbnV0ZXMpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZSBwZXJpb2Qgb2YgdGhlIGNsb2NrXG4gICAqIEBwYXJhbSBwZXJpb2QgTWNjVGltZXJQaWNrZXJQZXJpb2RcbiAgICovXG4gIGNoYW5nZVBlcmlvZChwZXJpb2Q6IE1jY1RpbWVyUGlja2VyUGVyaW9kKTogdm9pZCB7XG4gICAgdGhpcy5fcGVyaW9kID0gcGVyaW9kO1xuICAgIC8vIGlmIGJ1dHRvbnMgYXJlIGhpZGRlbiwgZW1pdCBuZXcgZXZlbnQgd2hlbiB2YWx1ZSBpcyBjaGFuZ2VkXG4gICAgaWYgKHRoaXMuX2hpZGVCdXR0b25zKSB7XG4gICAgICB0aGlzLmNvbmZpcm1TZWxlY3RlZFRpbWUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHNlbGVjdGVkIGNvbG9yLCBjbG9zZSB0aGUgcGFuZWwgYW5kIG5vdGlmeSB0aGUgdXNlclxuICAgKi9cbiAgYmFja2Ryb3BDbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLmNvbmZpcm1TZWxlY3RlZFRpbWUoKTtcbiAgICB0aGlzLl9pc09wZW4gPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2UgdmFsdWVzIHRvIGxhc3QgY29uZmlybSBzZWxlY3QgdGltZVxuICAgKi9cbiAgY2FuY2VsU2VsZWN0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2hvdXIgPSB0aGlzLl9zZWxlY3RlZEhvdXI7XG4gICAgdGhpcy5fbWludXRlID0gdGhpcy5fc2VsZWN0ZWRNaW51dGU7XG4gICAgdGhpcy5fcGVyaW9kID0gdGhpcy5fc2VsZWN0ZWRQZXJpb2Q7XG4gICAgdGhpcy5faXNPcGVuID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogU2V0IG5ldyB2YWx1ZXMgb2YgdGltZSBhbmQgZW1pdCBuZXcgZXZlbnQgd2l0aCB0aGUgZm9ybWF0ZWQgdGltZXJcbiAgICovXG4gIGNvbmZpcm1TZWxlY3RlZFRpbWUoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VsZWN0ZWRIb3VyID0gdGhpcy5ob3VyO1xuICAgIHRoaXMuX3NlbGVjdGVkTWludXRlID0gdGhpcy5taW51dGU7XG4gICAgdGhpcy5fc2VsZWN0ZWRQZXJpb2QgPSB0aGlzLnBlcmlvZDtcblxuICAgIC8vIGZvcm1hdCBzdHJpbmcgdG8gZW1pdCBzZWxlY3RlZCB0aW1lXG4gICAgbGV0IGZvcm1hdGVkOiBzdHJpbmc7XG4gICAgaWYgKHRoaXMuZm9ybWF0ID09PSAnMTInKSB7XG4gICAgICBmb3JtYXRlZCA9IGAke3RoaXMuaG91cn06JHt0aGlzLm1pbnV0ZX0gJHt0aGlzLnBlcmlvZH1gO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgaG91cjogc3RyaW5nID0gdGhpcy5ob3VyO1xuICAgICAgaWYgKHRoaXMucGVyaW9kID09PSAncG0nKSB7XG4gICAgICAgIGhvdXIgPSBgJHtwYXJzZUludChob3VyKSArIDEyfWA7XG4gICAgICB9XG5cbiAgICAgIGZvcm1hdGVkID0gYCR7aG91cn06JHt0aGlzLm1pbnV0ZX1gO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0ZWQuZW1pdChmb3JtYXRlZCk7XG5cbiAgICAvLyBvbmx5IGNsb3NlIGF1dG9tYXRpY2FsbHkgaWYgYnV0dG9uIGFyZW4ndCBoaWRkZW5cbiAgICBpZiAoIXRoaXMuX2hpZGVCdXR0b25zKSB7XG4gICAgICB0aGlzLl9pc09wZW4gPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==