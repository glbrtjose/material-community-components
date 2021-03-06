import { AfterContentChecked, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { MccColorPickerOption } from './color-picker';
export declare class MccColorPickerCollectionComponent implements AfterContentChecked {
    private changeDetectorRef;
    emptyColor: string;
    /**
     * Hide empty slots
     * Empty slots are the difference between the collection size and limit
     */
    set hideEmpty(value: boolean);
    private _hideEmpty;
    /**
     * Name of the collection
     */
    get label(): string;
    set label(value: string);
    private _label;
    /**
     * Array of colors to be displayed
     */
    get colors(): MccColorPickerOption[];
    set colors(values: MccColorPickerOption[]);
    private _colors;
    /**
     * Size limit of the collection
     */
    size: number;
    /**
     * Show transparent option
     */
    transparent: boolean;
    /**
     * Emit selected color value
     */
    changeColor: EventEmitter<string>;
    constructor(changeDetectorRef: ChangeDetectorRef, emptyColor: string);
    ngAfterContentChecked(): void;
    /**
     * Return the difference between the limit and the collection size.
     * Always return 0 when hideEmpty is true
     * @returns number
     */
    private _getCollectionDiffSize;
    /**
     * Remove color
     */
    setTransparent(): void;
    /**
     * Emit selected color value
     * @param option MccColorPickerOption
     */
    setColor(option: MccColorPickerOption): void;
}
