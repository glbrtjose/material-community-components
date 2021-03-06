import { EventEmitter } from '@angular/core';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { MccTimerPickerTimeType, MccTimerPickerFormat, MccTimerPickerHour, MccTimerPickerMinute, MccTimerPickerPeriod } from './timer-picker';
export declare class MccTimerPickerComponent {
    /**
     * Receive selected _hour after confirm
     */
    private _selectedHour;
    /**
     * Receive selected _minute after confirm
     */
    private _selectedMinute;
    /**
     * Receive selected _period after confirm
     */
    private _selectedPeriod;
    /**
     * Current value (hour/minute) to create the clock
     */
    get clock$(): Observable<string[]>;
    private _clock;
    /**
     * Type there is in focus (hour/minute)
     */
    get focus(): MccTimerPickerTimeType;
    set focus(value: MccTimerPickerTimeType);
    private _focus;
    /**
     * State of the overlay
     */
    get isOpen(): boolean;
    set isOpen(value: boolean);
    private _isOpen;
    /**
     * Return temporary selected hour (const HOURS)
     */
    get hour(): MccTimerPickerHour;
    private _hour;
    /**
     * Return temporary selected minute (const MINUTES)
     */
    get minute(): MccTimerPickerMinute;
    private _minute;
    /**
     * Return temporary selected period (am/pm)
     */
    get period(): MccTimerPickerPeriod;
    private _period;
    /**
     * Hide Confirm and Cancel buttons
     */
    get hideButtons(): boolean;
    set hideButtons(value: boolean);
    private _hideButtons;
    /**
     * Format of the hour to be emited on confirm
     */
    format: MccTimerPickerFormat;
    min: string;
    max: string;
    /**
     * Change btnCancel label
     */
    btnCancel: string;
    /**
     * Change btnConfirm label
     */
    btnConfirm: string;
    /**
     * Event emited when confirm button is pressed.
     * If buttons are hidden, the event is emited when value is changed
     */
    selected: EventEmitter<string>;
    /**
     * Origin reference of connected timer picker
     */
    trigger: CdkOverlayOrigin;
    /**
     * Set to true when timer picker have been connected with another component
     */
    connected: boolean;
    constructor();
    /**
     * Return timer option class to create line between the middle of the clock and
     * the option
     */
    getSelectedClass(): string;
    /**
     * Select option from the clock.
     * @param value MccTimerPickerHour | MccTimerPickerMinute
     */
    select(value: MccTimerPickerHour | MccTimerPickerMinute): void;
    /**
     * Returns array containing time, hour and period fragments from time string
     * @param time string
     */
    parseTimeInput(time: string): [number, number, string];
    /**
     * Returns true if option value is not valid
     * @param value MccTimerPickerHour | MccTimerPickerMinute
     */
    isOptionDisabled(value: MccTimerPickerHour | MccTimerPickerMinute): boolean;
    /**
     * Change period of the clock
     * @param period MccTimerPickerPeriod
     */
    changePeriod(period: MccTimerPickerPeriod): void;
    /**
     * Update selected color, close the panel and notify the user
     */
    backdropClick(): void;
    /**
     * Change values to last confirm select time
     */
    cancelSelection(): void;
    /**
     * Set new values of time and emit new event with the formated timer
     */
    confirmSelectedTime(): void;
}
