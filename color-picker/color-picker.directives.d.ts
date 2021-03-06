import { AfterViewInit, ChangeDetectorRef, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { MccColorPickerComponent } from './color-picker.component';
import { MccColorPickerOption } from './color-picker';
import { BehaviorSubject } from 'rxjs';
/**
 * This directive change the background of the button
 */
export declare class MccColorPickerOptionDirective implements AfterViewInit {
    private elementRef;
    private render;
    private emptyColor;
    /**
     * Receive the color
     */
    get color(): MccColorPickerOption;
    set color(value: MccColorPickerOption);
    private _color;
    constructor(elementRef: ElementRef, render: Renderer2, emptyColor: string);
    ngAfterViewInit(): void;
}
/**
 * Directive applied to an element to make it usable as an origin for an ColorPicker.
 */
export declare class MccColorPickerOriginDirective implements ControlValueAccessor {
    private elementRef;
    private renderer;
    private emptyColor;
    /**
     * Emit changes from the origin
     */
    change: BehaviorSubject<string>;
    /**
     * Propagate changes to angular
     */
    propagateChanges: (_: any) => {};
    /**
     * Reference to the element on which the directive is applied.
     */
    constructor(elementRef: ElementRef, renderer: Renderer2, emptyColor: string);
    /**
     * This method will be called by the forms API to write to the view when
     * programmatic (model -> view) changes are requested.
     */
    writeValue(color: string): void;
    /**
     * This method will be called by the color picker
     */
    writeValueFromColorPicker(color: string): void;
    /**
     * This method will be called from origin whe key is up
     */
    writeValueFromKeyup(color: string): void;
    /**
     * This is called by the forms API on initialization so it can update the
     * form model when values propagate from the view (view -> model).
     * @param fn any
     */
    registerOnChange(fn: any): void;
    /**
     * This is called by the forms API on initialization so it can update the form model on blur
     * @param fn any
     */
    registerOnTouched(fn: any): void;
    /**
     * called by the forms API when the control status changes to or from "DISABLED"
     * @param isDisabled boolean
     */
    setDisabledState(isDisabled: boolean): void;
}
/**
 * Directive connect an color picker with any input, select or textarea.
 * The color picker will be automatically updated when the value of the origin is
 * changed.
 */
export declare class MccConnectedColorPickerDirective implements AfterViewInit, OnDestroy {
    private colorPicker;
    changeDetectorRef: ChangeDetectorRef;
    private emptyColor;
    /**
     * Origin of the connected color picker
     */
    origin: MccColorPickerOriginDirective;
    /**
     * Color picker subscription
     */
    private _colorPickerSub;
    /**
     * Origin subscription
     */
    private _originSub;
    constructor(colorPicker: MccColorPickerComponent, changeDetectorRef: ChangeDetectorRef, emptyColor: string);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /**
     * Attach color picker and origin
     */
    private _attachColorPicker;
}
