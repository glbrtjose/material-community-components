import { AfterViewInit, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
export declare class MccColorPickerSelectorComponent implements AfterViewInit, OnInit, OnChanges, OnDestroy {
    private formBuilder;
    private render;
    private emptyColor;
    /**
     * ElemenRef of the main color
     */
    _block: ElementRef;
    /**
     * ElemenRef of the pointer main color
     */
    _bp: ElementRef;
    /**
     * Canvas of the block
     */
    set blockCursor(el: ElementRef);
    private _bc;
    private _blockContext;
    /**
     * ElementRef of the color base
     */
    _strip: ElementRef;
    private _stripContext;
    /**
     * Container of the strip
     */
    set stripCursor(el: ElementRef);
    private _sc;
    /**
     * Change height base of the selector
     */
    set height(value: number);
    get selectorHeight(): number;
    get stripHeight(): number;
    private _height;
    /**
     * Receive selected color from the component
     */
    get selectedColor(): string;
    set selectedColor(value: string);
    private _selectedColor;
    /**
     * Hide the hexadecimal color forms.
     */
    get hideHexForms(): boolean;
    set hideHexForms(value: boolean);
    private _hideHexForms;
    /**
     * Emit update when a color is selected
     */
    changeSelectedColor: EventEmitter<any>;
    /**
     * RGBA current color
     */
    private _rgbaColor;
    /**
     * Subject of the current selected color by the user
     */
    private _tmpSelectedColor;
    /**
     * Subscription of the tmpSelectedColor Observable
     */
    private _tmpSelectedColorSub;
    /**
     * Subscription of the hexForm values change
     */
    private _hexValuesSub;
    /**
     * Subscription of the rbgForm values change
     */
    private _rgbValuesSub;
    /**
     * Handle color of the text
     */
    textClass: string;
    /**
     * Validate if the mouse button is pressed
     */
    _isPressed: boolean;
    /**
     * Form of the color in hexa
     */
    hexForm: FormGroup;
    /**
     * Form and keys of the fields in RGB
     */
    rgbKeys: string[];
    rgbForm: FormGroup;
    constructor(formBuilder: FormBuilder, render: Renderer2, emptyColor: string);
    ngOnInit(): void;
    /**
     * Update RGB, RGBA and Gradient when selectedColor change and
     * the mouse button is pressed
     * @param changes SimpleChanges
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Destroy all subscriptions
     */
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    /**
     * Generate colors based on the RGBA color
     */
    private _fillGradient;
    /**
     * Watch change on forms
     */
    private _onChanges;
    /**
     * Convert HEX/canvas value to rgb
     * @param data any
     * @returns number[]
     */
    private _getRGB;
    /**
     * Convert RGB value to HEX
     * @param data any
     * @returns string
     */
    private _getHex;
    /**
     * Update RGBA color
     * @param data any
     */
    private _updateRGBA;
    /**
     * Update RGB form
     * @param data any
     */
    private _updateRGB;
    /**
     * Get selected base color from the canvas
     * @param e MouseEvent
     */
    private changeBaseColor;
    /**
     * Get selected color from the canvas
     * @param e MouseEvent
     */
    private changeColor;
    /**
     * Emit update from the selected color
     * @param data any
     */
    private updateValues;
}
