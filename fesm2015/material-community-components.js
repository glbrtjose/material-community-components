import { __decorate, __param } from 'tslib';
import { InjectionToken, Inject, Injectable, EventEmitter, ChangeDetectorRef, Input, Output, Component, ChangeDetectionStrategy, ElementRef, ContentChildren, Renderer2, ViewChild, Directive, forwardRef, NgModule, ViewEncapsulation, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators, FormControl, FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { map, debounceTime, withLatestFrom } from 'rxjs/operators';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { trigger, state, style, transition, animate } from '@angular/animations';

/** Contant used as empty color */
const EMPTY_COLOR = new InjectionToken('empty-color');
/** Constante to set usedColorStart from the module import */
const USED_COLORS = new InjectionToken('used-colors');
/**
 * Verify if color has # as a first char. If not, add this char
 * to the color
 * @param color string
 */
function coerceHexaColor(color) {
    if (color && color.indexOf('#') !== 0) {
        color = `#${color}`;
    }
    if (!isValidColor(color)) {
        return;
    }
    return color.toUpperCase();
}
/**
 * Validate if the color is valid
 * @param color string
 */
function isValidColor(color) {
    // validate if color is an hexadecimal
    if (!color ||
        color.charAt(0) !== '#' ||
        color.length < 4 ||
        color.length > 7) {
        return false;
    }
    // validate rgb of the color
    return color.replace('#', '')
        .match(/.{1,2}/g)
        .map(v => Number.isNaN(parseInt(v, 16)))
        .indexOf(true) === -1;
}

let MccColorPickerService = class MccColorPickerService {
    constructor(emptyColor, usedColors) {
        this.emptyColor = emptyColor;
        this.usedColors = usedColors;
        /**
         * Array of all used colors
         */
        this._colors = new BehaviorSubject([]);
        this._colors.next(usedColors);
    }
    /**
     * Add new color to used colors
     * @param color string
     */
    addColor(color) {
        if (!color || !isValidColor(color)) {
            return;
        }
        color = coerceHexaColor(color) || this.emptyColor;
        const colors = this._colors.getValue();
        if (!colors.find(_color => _color === color)) {
            colors.push(color);
            this._colors.next(colors);
        }
    }
    /**
     * Return Observable of colors
     */
    getColors() {
        return this._colors.asObservable();
    }
    /**
     * Reset the array of used colors
     */
    resetUseColors() {
        this._colors.next([]);
    }
};
MccColorPickerService.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [EMPTY_COLOR,] }] },
    { type: Array, decorators: [{ type: Inject, args: [USED_COLORS,] }] }
];
MccColorPickerService = __decorate([
    Injectable(),
    __param(0, Inject(EMPTY_COLOR)),
    __param(1, Inject(USED_COLORS))
], MccColorPickerService);

let MccColorPickerCollectionComponent = class MccColorPickerCollectionComponent {
    constructor(changeDetectorRef, emptyColor) {
        this.changeDetectorRef = changeDetectorRef;
        this.emptyColor = emptyColor;
        this._hideEmpty = false;
        /**
         * Size limit of the collection
         */
        this.size = 30;
        /**
         * Show transparent option
         */
        this.transparent = false;
        /**
         * Emit selected color value
         */
        this.changeColor = new EventEmitter();
    }
    /**
     * Hide empty slots
     * Empty slots are the difference between the collection size and limit
     */
    set hideEmpty(value) {
        this._hideEmpty = coerceBooleanProperty(value);
    }
    /**
     * Name of the collection
     */
    get label() {
        return this._label;
    }
    set label(value) {
        this._label = value;
    }
    /**
     * Array of colors to be displayed
     */
    get colors() {
        return this._colors;
    }
    set colors(values) {
        this._colors = values;
    }
    ngAfterContentChecked() {
        if (this._colors && this._colors.length !== this.size) {
            this._colors = this._colors
                .slice(0, this.size)
                .concat(new Array(this._getCollectionDiffSize()));
            this.changeDetectorRef.markForCheck();
        }
    }
    /**
     * Return the difference between the limit and the collection size.
     * Always return 0 when hideEmpty is true
     * @returns number
     */
    _getCollectionDiffSize() {
        if (this._colors.length > this.size || this._hideEmpty) {
            return 0;
        }
        return this.size - this._colors.length;
    }
    /**
     * Remove color
     */
    setTransparent() {
        this.changeColor.emit(this.emptyColor);
    }
    /**
     * Emit selected color value
     * @param option MccColorPickerOption
     */
    setColor(option) {
        const color = typeof option === 'string' ? option : option.value;
        this.changeColor.emit(color);
    }
};
MccColorPickerCollectionComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: String, decorators: [{ type: Inject, args: [EMPTY_COLOR,] }] }
];
__decorate([
    Input()
], MccColorPickerCollectionComponent.prototype, "hideEmpty", null);
__decorate([
    Input()
], MccColorPickerCollectionComponent.prototype, "label", null);
__decorate([
    Input()
], MccColorPickerCollectionComponent.prototype, "colors", null);
__decorate([
    Input()
], MccColorPickerCollectionComponent.prototype, "size", void 0);
__decorate([
    Input()
], MccColorPickerCollectionComponent.prototype, "transparent", void 0);
__decorate([
    Output()
], MccColorPickerCollectionComponent.prototype, "changeColor", void 0);
MccColorPickerCollectionComponent = __decorate([
    Component({
        selector: 'mcc-color-picker-collection',
        template: "<div class=\"mcc-color-picker-collection\" role=\"listbox\" aria-label=\"Select a color\">\n        <h3>{{ label }}</h3>\n\n        <button mat-mini-fab *ngIf=\"transparent\" class=\"mcc-color-picker-remove-color mat-elevation-z0\" role=\"option\" aria-label=\"transparent\"\n                (click)=\"setTransparent()\">\n                <div class=\"mcc-color-picker-transparent\"></div>\n        </button>\n\n        <button *ngFor=\"let color of colors\" mat-mini-fab class=\"mat-elevation-z0\" role=\"option\" [disabled]=\"!color || color === emptyColor\"\n                [mccColorPickerOption]=\"color\" (click)=\"setColor(color)\">\n        </button>\n</div>",
        preserveWhitespaces: false,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".mcc-color-picker-collection{min-height:50px;padding:10px 18px}.mcc-color-picker-collection h3{color:#100214;text-transform:uppercase;font-family:'Open Sans',sans-serif;font-size:12px;font-weight:700;margin:0 0 10px}.mcc-color-picker-remove-color{background-color:#fff;border:1px solid #e1e1e1}.mcc-color-picker-remove-color .mcc-color-picker-transparent{width:20px;height:1px;border-bottom:1px solid red;transform:translateY(-4px) translateX(0) rotate(45deg);-webkit-transform:translateY(-4px) translateX(0) rotate(45deg)}button{width:22px;height:22px;cursor:pointer;margin:3px}"]
    }),
    __param(1, Inject(EMPTY_COLOR))
], MccColorPickerCollectionComponent);

let MccColorPickerComponent = class MccColorPickerComponent {
    constructor(elementRef, changeDetectorRef, colorPickerService, emptyColor) {
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        this.colorPickerService = colorPickerService;
        this.emptyColor = emptyColor;
        this._usedColorLabel = 'Used Colors';
        this._reverseUsedColor = false;
        this._hideHexForms = false;
        this._hideEmpty = false;
        this._hideTransparent = false;
        this._hideUsedColors = false;
        this._isOpen = false;
        this._overlay = true;
        this._hideButtons = false;
        this._colorPickerSelectorHeight = 170;
        this._hideColorPickerSelector = false;
        /**
         * Set the size of the used colors
         */
        this.usedSizeColors = 30;
        /**
         * Change btnCancel label
         */
        this.btnCancel = 'Cancel';
        /**
         * Change btnConfirm label
         */
        this.btnConfirm = 'Confirm';
        /**
         * Event emitted when user change the selected color (without confirm)
         */
        this.change = new EventEmitter();
        /**
         * Event emitted when selected color is confirm
         */
        this.selected = new EventEmitter();
        /**
         * Event emitted when is clicked outside of the component
         */
        this.clickOut = new EventEmitter();
        /**
         * Array of subscriptions from the collections
         */
        this._collectionSubs = [];
    }
    /**
     * Change label of the collection UsedColors
     */
    get usedColorLabel() {
        return this._usedColorLabel;
    }
    set usedColorLabel(value) {
        this._usedColorLabel = value;
    }
    /**
     * Set initial value for used color
     */
    set usedColorStart(colors) {
        if (colors && colors.length > 0) {
            for (const color of colors) {
                this.colorPickerService.addColor(color);
            }
        }
    }
    /**
     * Set usedColor to be used in reverse
     */
    set reverseUsedColors(reverse) {
        this._reverseUsedColor = coerceBooleanProperty(reverse);
    }
    /**
     * Hide the hexadecimal color forms.
     */
    get hideHexForms() {
        return this._hideHexForms;
    }
    set hideHexForms(value) {
        this._hideHexForms = value;
    }
    /**
     * Hide empty slots from the collection UsedColors
     */
    get hideEmpty() {
        return this._hideEmpty;
    }
    set hideEmpty(value) {
        this._hideEmpty = coerceBooleanProperty(value);
    }
    /**
     * Hide transparent option of UsedColors
     */
    get hideTransparent() {
        return this._hideTransparent;
    }
    set hideTransparent(value) {
        this._hideTransparent = coerceBooleanProperty(value);
    }
    /**
     * Hide UsedColors collection
     */
    get hideUsedColors() {
        return this._hideUsedColors;
    }
    set hideUsedColors(value) {
        this._hideUsedColors = coerceBooleanProperty(value);
    }
    /**
     * Start with a color selected
     */
    get selectedColor() {
        return this._selectedColor;
    }
    set selectedColor(value) {
        if (this._selectedColor !== value) {
            this.changeDetectorRef.markForCheck();
        }
        this._selectedColor = coerceHexaColor(value) || this.emptyColor;
    }
    /**
     * Define if the panel will be initiated open
     */
    get isOpen() {
        return this._isOpen;
    }
    set isOpen(value) {
        this._isOpen = coerceBooleanProperty(value);
    }
    /**
     * Define if the panel will show in overlay or not
     */
    get overlay() {
        return this._overlay;
    }
    set overlay(value) {
        this._overlay = coerceBooleanProperty(value);
    }
    /**
     * Hide the action buttons (cancel/confirm)
     */
    get hideButtons() {
        return this._hideButtons;
    }
    set hideButtons(value) {
        this._hideButtons = coerceBooleanProperty(value);
    }
    /**
     * Define new height for the selector
     */
    get colorPickerSelectorHeight() {
        return this._colorPickerSelectorHeight;
    }
    set colorPickerSelectorHeight(height) {
        this._colorPickerSelectorHeight = height;
    }
    /**
     * Hide the color picker selector
     */
    get hideColorPickerSelector() {
        return this._hideColorPickerSelector;
    }
    set hideColorPickerSelector(value) {
        this._hideColorPickerSelector = coerceBooleanProperty(value);
    }
    /**
     * Return a Observable with the color the user is picking
     */
    get tmpSelectedColor$() {
        return this._tmpSelectedColor.asObservable();
    }
    /**
     * Observable with all the colors used by the user
     */
    get usedColors$() {
        return this.colorPickerService
            .getColors()
            .pipe(map(colors => (!this._reverseUsedColor ? colors : [...colors].reverse())));
    }
    ngOnInit() {
        if (!this._selectedColor) {
            this._selectedColor = this.emptyColor;
        }
        this._tmpSelectedColor = new BehaviorSubject(this._selectedColor);
    }
    /**
     * Walk throw all collections and subcribe to changes
     */
    ngAfterContentInit() {
        if (this._collections) {
            this._collections.forEach((collection) => {
                const subscription = collection.changeColor.subscribe(color => {
                    this.updateTmpSelectedColor(color);
                });
                this._collectionSubs.push(subscription);
            });
        }
    }
    /**
     * Destroy all subscriptions
     */
    ngOnDestroy() {
        if (this._collectionSubs) {
            this._collectionSubs.forEach((subscription) => {
                if (subscription && !subscription.closed) {
                    subscription.unsubscribe();
                }
            });
        }
    }
    /**
     * Update selected color and emit the change
     */
    _updateSelectedColor() {
        if (this._isOpen || !this.overlay) {
            const tmpSelectedColor = this._tmpSelectedColor.getValue();
            if (this._selectedColor !== tmpSelectedColor) {
                this._selectedColor = tmpSelectedColor;
                this.selected.next(this._selectedColor);
            }
            else {
                this.selected.emit(this._selectedColor);
            }
        }
    }
    /**
     * Open/close color picker panel
     */
    toggle() {
        this._isOpen = !this._isOpen;
        if (!this._isOpen && this._selectedColor !== this.emptyColor) {
            this.colorPickerService.addColor(this._selectedColor);
        }
    }
    /**
     * Update selected color, close the panel and notify the user
     */
    backdropClick() {
        if (this._hideButtons) {
            this.confirmSelectedColor();
        }
        else {
            this.cancelSelection();
        }
        this.clickOut.emit(null);
    }
    /**
     * Update tmpSelectedColor
     * @param color string
     */
    updateTmpSelectedColor(color) {
        if (color || color === this.emptyColor) {
            this._tmpSelectedColor.next(color);
            this.change.next(color);
            if (this._hideButtons) {
                this._updateSelectedColor();
            }
        }
    }
    /**
     * Cancel the selection and close the panel
     */
    cancelSelection() {
        this._tmpSelectedColor.next(this._selectedColor);
        this.toggle();
    }
    /**
     * Update selectedColor and close the panel
     */
    confirmSelectedColor() {
        this._updateSelectedColor();
        this.toggle();
    }
};
MccColorPickerComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: MccColorPickerService },
    { type: String, decorators: [{ type: Inject, args: [EMPTY_COLOR,] }] }
];
__decorate([
    ContentChildren(MccColorPickerCollectionComponent)
], MccColorPickerComponent.prototype, "_collections", void 0);
__decorate([
    Input()
], MccColorPickerComponent.prototype, "usedColorLabel", null);
__decorate([
    Input()
], MccColorPickerComponent.prototype, "usedColorStart", null);
__decorate([
    Input()
], MccColorPickerComponent.prototype, "reverseUsedColors", null);
__decorate([
    Input('hideHexForms')
], MccColorPickerComponent.prototype, "hideHexForms", null);
__decorate([
    Input('hideEmptyUsedColors')
], MccColorPickerComponent.prototype, "hideEmpty", null);
__decorate([
    Input('hideTransparentUsedColors')
], MccColorPickerComponent.prototype, "hideTransparent", null);
__decorate([
    Input('hideUsedColors')
], MccColorPickerComponent.prototype, "hideUsedColors", null);
__decorate([
    Input()
], MccColorPickerComponent.prototype, "selectedColor", null);
__decorate([
    Input()
], MccColorPickerComponent.prototype, "isOpen", null);
__decorate([
    Input()
], MccColorPickerComponent.prototype, "overlay", null);
__decorate([
    Input()
], MccColorPickerComponent.prototype, "hideButtons", null);
__decorate([
    Input()
], MccColorPickerComponent.prototype, "colorPickerSelectorHeight", null);
__decorate([
    Input()
], MccColorPickerComponent.prototype, "hideColorPickerSelector", null);
__decorate([
    Input()
], MccColorPickerComponent.prototype, "usedSizeColors", void 0);
__decorate([
    Input()
], MccColorPickerComponent.prototype, "btnCancel", void 0);
__decorate([
    Input()
], MccColorPickerComponent.prototype, "btnConfirm", void 0);
__decorate([
    Output()
], MccColorPickerComponent.prototype, "change", void 0);
__decorate([
    Output()
], MccColorPickerComponent.prototype, "selected", void 0);
__decorate([
    Output()
], MccColorPickerComponent.prototype, "clickOut", void 0);
MccColorPickerComponent = __decorate([
    Component({
        selector: 'mcc-color-picker',
        template: "<!-- color picker overlay -->\n<ng-container *ngIf=\"overlay\">\n    <button type=\"button\" class=\"btn-picker\" cdkOverlayOrigin #trigger=\"cdkOverlayOrigin\" [ngClass]=\"{ 'empty': selectedColor === emptyColor }\"\n        [style.background]=\"selectedColor\" (click)=\"toggle()\">\n        <div class=\"transparent\" *ngIf=\"selectedColor === emptyColor\"></div>\n    </button>\n\n    <ng-template cdkConnectedOverlay cdkConnectedOverlayHasBackdrop cdkConnectedOverlayBackdropClass=\"mcc-color-picker-backdrop\"\n        [cdkConnectedOverlayOrigin]=\"trigger\" [cdkConnectedOverlayOpen]=\"isOpen\" (backdropClick)=\"backdropClick()\">\n\n        <ng-template [cdkPortalOutlet]=\"overlayPanel\"></ng-template>\n\n    </ng-template>\n</ng-container>\n\n<!-- color picker flat -->\n<ng-template *ngIf=\"!overlay\" [cdkPortalOutlet]=\"overlayPanel\"></ng-template>\n\n<!-- color picker component content -->\n<ng-template cdkPortal #overlayPanel=\"cdkPortal\">\n\n    <div class=\"mcc-color-picker-overlay mat-elevation-z6\" role=\"dialog\" aria-label=\"Color picker\">\n\n        <mcc-color-picker-selector *ngIf=\"!hideColorPickerSelector\" [selectedColor]=\"tmpSelectedColor$ | async\" [hideHexForms]=\"hideHexForms\"\n            [height]=\"colorPickerSelectorHeight\" (changeSelectedColor)=\"updateTmpSelectedColor($event)\">\n        </mcc-color-picker-selector>\n\n        <mcc-color-picker-collection *ngIf=\"!hideUsedColors\" [label]=\"usedColorLabel\" [size]=\"usedSizeColors\" [transparent]=\"!hideTransparent\"\n            [hideEmpty]=\"hideEmpty\" [colors]=\"usedColors$ | async\" (changeColor)=\"updateTmpSelectedColor($event)\">\n        </mcc-color-picker-collection>\n\n        <ng-content></ng-content>\n\n        <div *ngIf=\"!hideButtons\" class=\"mcc-color-picker-actions\">\n\n            <button mat-button role=\"button\" aria-label=\"Cancel\" (click)=\"cancelSelection()\">\n                {{ btnCancel }}\n            </button>\n\n            <button mat-button role=\"button\" aria-label=\"Confirm\" (click)=\"confirmSelectedColor()\">\n                {{ btnConfirm }}\n            </button>\n\n        </div>\n\n    </div>\n\n</ng-template>",
        preserveWhitespaces: false,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: ["@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700);.btn-picker{width:25px;height:25px;cursor:pointer;background:0 0;border:2px solid #ddd}.btn-picker.empty{background:#fff!important}.mcc-color-picker-overlay{display:flex;width:260px;min-height:80px;position:relative;flex-direction:column;padding:0;background:#fff;font-family:'Open Sans',sans-serif}.mcc-color-picker-overlay .mcc-color-picker-preview{width:100%;height:8px}.transparent{width:32px;height:2px;border-bottom:2px solid red;transform:translateY(-3px) translateX(-2px) rotate(45deg);-webkit-transform:translateY(-2px) translateX(-11px) rotate(45deg);position:absolute}.mcc-color-picker-actions{display:flex;padding:4px;border-top:1px solid #ddd}.mcc-color-picker-actions button{color:#100214;text-transform:uppercase;font-family:'Open Sans',sans-serif;font-size:12px;font-weight:400;flex-grow:1}"]
    }),
    __param(3, Inject(EMPTY_COLOR))
], MccColorPickerComponent);

let MccColorPickerSelectorComponent = class MccColorPickerSelectorComponent {
    constructor(formBuilder, render, emptyColor) {
        this.formBuilder = formBuilder;
        this.render = render;
        this.emptyColor = emptyColor;
        this._height = 170;
        this._selectedColor = '';
        this._hideHexForms = false;
        /**
         * Emit update when a color is selected
         */
        this.changeSelectedColor = new EventEmitter();
        /**
         * RGBA current color
         */
        this._rgbaColor = 'rgba(255,0,0,1)';
        /**
         * Handle color of the text
         */
        this.textClass = 'black';
        /**
         * Validate if the mouse button is pressed
         */
        this._isPressed = false;
        /**
         * Form and keys of the fields in RGB
         */
        this.rgbKeys = ['R', 'G', 'B'];
    }
    /**
     * Canvas of the block
     */
    set blockCursor(el) {
        this._bc = el;
    }
    /**
     * Container of the strip
     */
    set stripCursor(el) {
        this._sc = el;
    }
    /**
     * Change height base of the selector
     */
    set height(value) {
        this._height = value;
    }
    get selectorHeight() {
        return this._height;
    }
    get stripHeight() {
        return this._height - 10;
    }
    /**
     * Receive selected color from the component
     */
    get selectedColor() {
        return this._selectedColor;
    }
    set selectedColor(value) {
        this._selectedColor = value || this.emptyColor;
    }
    /**
     * Hide the hexadecimal color forms.
     */
    get hideHexForms() {
        return this._hideHexForms;
    }
    set hideHexForms(value) {
        this._hideHexForms = value;
    }
    ngOnInit() {
        this._tmpSelectedColor = new BehaviorSubject(this._selectedColor);
        this._tmpSelectedColorSub = this._tmpSelectedColor.subscribe(color => {
            if (color !== this._selectedColor && isValidColor(color)) {
                if (this.hexForm.get('hexCode').value !== color) {
                    this.hexForm.setValue({ hexCode: color });
                }
                this.changeSelectedColor.emit(coerceHexaColor(color) || this.emptyColor);
            }
        });
        // hex form
        this.hexForm = this.formBuilder.group({
            hexCode: [this.selectedColor, [Validators.minLength(7), Validators.maxLength(7)]],
        });
        // rgb dynamic form
        const rgbGroup = {};
        const rgbValue = this._getRGB();
        this.rgbKeys.forEach((key, index) => (rgbGroup[key] = new FormControl(rgbValue[index], {
            validators: [
                Validators.min(0),
                Validators.max(256),
                Validators.required,
                Validators.maxLength(3),
            ],
            updateOn: 'blur',
        })));
        this.rgbForm = this.formBuilder.group(rgbGroup);
        // watch changes on forms
        this._onChanges();
    }
    /**
     * Update RGB, RGBA and Gradient when selectedColor change and
     * the mouse button is pressed
     * @param changes SimpleChanges
     */
    ngOnChanges(changes) {
        if ('selectedColor' in changes && changes['selectedColor'].currentValue !== this.emptyColor) {
            if (!this._isPressed) {
                this._updateRGB();
                this._updateRGBA();
                if (this._blockContext) {
                    this._fillGradient();
                }
            }
            const rgb = this._getRGB();
            const o = Math.round((rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000);
            this.textClass = o > 125 ? 'black' : 'white';
        }
    }
    /**
     * Destroy all subscriptions
     */
    ngOnDestroy() {
        if (this._tmpSelectedColorSub && !this._tmpSelectedColorSub.closed) {
            this._tmpSelectedColorSub.unsubscribe();
        }
        if (this._hexValuesSub && !this._hexValuesSub.closed) {
            this._hexValuesSub.unsubscribe();
        }
        if (this._rgbValuesSub && !this._rgbValuesSub.closed) {
            this._rgbValuesSub.unsubscribe();
        }
    }
    ngAfterViewInit() {
        this.render.listen(this._block.nativeElement, 'mousedown', e => {
            this._isPressed = true;
            this.changeColor(e);
        });
        this.render.listen(this._block.nativeElement, 'mouseup', () => (this._isPressed = false));
        this.render.listen(this._block.nativeElement, 'mouseout', () => (this._isPressed = false));
        this.render.listen(this._block.nativeElement, 'mousemove', e => this.changeColor(e));
        this._blockContext = this._bc.nativeElement.getContext('2d');
        this._blockContext.rect(0, 0, this._bc.nativeElement.width, this._bc.nativeElement.height);
        this.render.listen(this._strip.nativeElement, 'mousedown', e => {
            this._isPressed = true;
            this.changeBaseColor(e);
        });
        this.render.listen(this._strip.nativeElement, 'mouseup', () => (this._isPressed = false));
        this.render.listen(this._strip.nativeElement, 'mouseout', () => (this._isPressed = false));
        this.render.listen(this._strip.nativeElement, 'mousemove', e => this.changeBaseColor(e));
        this._stripContext = this._strip.nativeElement.getContext('2d');
        this._stripContext.rect(0, 0, this._strip.nativeElement.width, this._strip.nativeElement.height);
        const grd1 = this._stripContext.createLinearGradient(0, 0, 0, this._bc.nativeElement.height);
        grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
        grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
        grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
        grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
        grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
        grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
        grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
        this._stripContext.fillStyle = grd1;
        this._stripContext.fill();
        this._fillGradient();
    }
    /**
     * Generate colors based on the RGBA color
     */
    _fillGradient() {
        this._blockContext.fillStyle = this._rgbaColor;
        this._blockContext.fillRect(0, 0, this._bc.nativeElement.width, this._bc.nativeElement.height);
        const grdWhite = this._stripContext.createLinearGradient(0, 0, this._bc.nativeElement.width, 0);
        grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
        grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
        this._blockContext.fillStyle = grdWhite;
        this._blockContext.fillRect(0, 0, this._bc.nativeElement.width, this._bc.nativeElement.height);
        const grdBlack = this._stripContext.createLinearGradient(0, 0, 0, this._bc.nativeElement.height);
        grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
        grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
        this._blockContext.fillStyle = grdBlack;
        this._blockContext.fillRect(0, 0, this._bc.nativeElement.width, this._bc.nativeElement.height);
    }
    /**
     * Watch change on forms
     */
    _onChanges() {
        // validate digited code and update when digitation is finished
        this._hexValuesSub = this.hexForm.get('hexCode').valueChanges
            .pipe(map(color => color !== this.emptyColor ? coerceHexaColor(color) : color))
            .subscribe(value => {
            if (!this._isPressed && isValidColor(value)) {
                this._tmpSelectedColor.next(value || this.emptyColor);
            }
        });
        this._rgbValuesSub = this.rgbForm.valueChanges.subscribe(controls => {
            const data = [];
            for (const key in controls) {
                if (!controls[key] && controls[key] !== 0 || controls[key] > 255) {
                    data.push('');
                    continue;
                }
                data.push(controls[key]);
            }
            const hex = this._getHex(data);
            if (hex !== this._selectedColor && hex.length === 7) {
                this._tmpSelectedColor.next(hex);
            }
        });
    }
    /**
     * Convert HEX/canvas value to rgb
     * @param data any
     * @returns number[]
     */
    _getRGB(data) {
        if (data) {
            return [data[0], data[1], data[2]];
        }
        if (!this._selectedColor) {
            return [null, null, null];
        }
        const hex = this._selectedColor.replace('#', '');
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        return [r, g, b];
    }
    /**
     * Convert RGB value to HEX
     * @param data any
     * @returns string
     */
    _getHex(data) {
        const hex = new Array(3);
        hex[0] = data[0].toString(16);
        hex[1] = data[1].toString(16);
        hex[2] = data[2].toString(16);
        hex.forEach((val, key) => {
            if (val.length === 1) {
                hex[key] = '0' + hex[key];
            }
        });
        return coerceHexaColor(`${hex[0]}${hex[1]}${hex[2]}`) || this.emptyColor;
    }
    /**
     * Update RGBA color
     * @param data any
     */
    _updateRGBA(data) {
        if (!this._selectedColor && !data) {
            this._rgbaColor = 'rgba(255,0,0,1)';
        }
        const rgb = this._getRGB(data);
        this._rgbaColor = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`;
    }
    /**
     * Update RGB form
     * @param data any
     */
    _updateRGB(data) {
        if (!this.rgbForm) {
            return;
        }
        if (!data) {
            data = this._getRGB();
        }
        this.rgbForm.setValue({ R: data[0], G: data[1], B: data[2] });
    }
    /**
     * Get selected base color from the canvas
     * @param e MouseEvent
     */
    changeBaseColor(e) {
        if (this._isPressed) {
            this.render.setStyle(this._sc.nativeElement, 'background-position-y', `${e.offsetY}px`);
            const data = this._stripContext.getImageData(e.offsetX, e.offsetY, 1, 1).data;
            this._updateRGBA(data);
            this._fillGradient();
            this.updateValues(data);
        }
    }
    /**
     * Get selected color from the canvas
     * @param e MouseEvent
     */
    changeColor(e) {
        if (this._isPressed) {
            this.render.setStyle(this._bp.nativeElement, 'top', `${e.offsetY - 5}px`);
            this.render.setStyle(this._bp.nativeElement, 'left', `${e.offsetX - 5}px`);
            const data = this._blockContext.getImageData(e.offsetX, e.offsetY, 1, 1).data;
            this.updateValues(data);
        }
    }
    /**
     * Emit update from the selected color
     * @param data any
     */
    updateValues(data) {
        if (data) {
            this._updateRGB(data);
            this._tmpSelectedColor.next(this._getHex(data));
        }
    }
};
MccColorPickerSelectorComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: Renderer2 },
    { type: String, decorators: [{ type: Inject, args: [EMPTY_COLOR,] }] }
];
__decorate([
    ViewChild('block')
], MccColorPickerSelectorComponent.prototype, "_block", void 0);
__decorate([
    ViewChild('blockPointer')
], MccColorPickerSelectorComponent.prototype, "_bp", void 0);
__decorate([
    ViewChild('blockCanvas')
], MccColorPickerSelectorComponent.prototype, "blockCursor", null);
__decorate([
    ViewChild('strip')
], MccColorPickerSelectorComponent.prototype, "_strip", void 0);
__decorate([
    ViewChild('stripContainer')
], MccColorPickerSelectorComponent.prototype, "stripCursor", null);
__decorate([
    Input('height')
], MccColorPickerSelectorComponent.prototype, "height", null);
__decorate([
    Input()
], MccColorPickerSelectorComponent.prototype, "selectedColor", null);
__decorate([
    Input('hideHexForms')
], MccColorPickerSelectorComponent.prototype, "hideHexForms", null);
__decorate([
    Output()
], MccColorPickerSelectorComponent.prototype, "changeSelectedColor", void 0);
MccColorPickerSelectorComponent = __decorate([
    Component({
        selector: 'mcc-color-picker-selector',
        template: "<div class=\"mcc-color-picker-selector\" [ngStyle]=\"{ 'height.px': selectorHeight }\">\n    <div #block class=\"mcc-picker-selector\"></div>\n    <canvas #blockCanvas [height]=\"selectorHeight\" width=\"230\" id=\"picker\"></canvas>\n    <div #blockPointer class=\"mcc-picker-position\" style=\"top: 0px;left: 220px;\"></div>\n\n    <div #stripContainer class=\"mcc-colors-position\" style=\"background-position-y: 0px;\">\n        <canvas #strip [height]=\"stripHeight\" width=\"20\" id=\"colors\"></canvas>\n    </div>\n</div>\n\n<div class=\"mcc-color-picker-selector-preview\" [style.background]=\"selectedColor\">\n    <ng-container *ngIf=\"!hideHexForms\">\n        <form [formGroup]=\"hexForm\">\n            <mat-form-field class=\"hex-input\" floatLabel=\"always\" [ngClass]=\"textClass\">\n                <input matInput placeholder=\"HEX\" maxlength=\"7\" formControlName=\"hexCode\" [value]=\"selectedColor\" />\n            </mat-form-field>\n        </form>\n\n        <form [formGroup]=\"rgbForm\">\n            <mat-form-field class=\"rgb-input\" floatLabel=\"always\" [ngClass]=\"textClass\">\n                <input matInput type=\"number\" placeholder=\"RGB\" maxlength=\"3\" formControlName=\"R\" />\n            </mat-form-field>\n            <mat-form-field class=\"rgb-input\" floatLabel=\"always\" [ngClass]=\"textClass\">\n                <input matInput type=\"number\" maxlength=\"3\" formControlName=\"G\" />\n            </mat-form-field>\n            <mat-form-field class=\"rgb-input\" floatLabel=\"always\" [ngClass]=\"textClass\">\n                <input matInput type=\"number\" maxlength=\"3\" formControlName=\"B\" />\n            </mat-form-field>\n        </form>\n    </ng-container>\n</div>",
        preserveWhitespaces: false,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: ["canvas#colors{margin:5px}canvas:hover{cursor:crosshair}.mcc-picker-selector{position:absolute;width:230px;height:170px;top:0;left:0;z-index:10;cursor:crosshair}.mcc-picker-position{position:absolute;width:10px;height:10px;z-index:1;border:1px solid #ddd;border-radius:50%;background:rgba(0,0,0,.3)}.mcc-colors-position{position:absolute;width:30px;height:160px;top:0;right:0;z-index:1;background:url(data:image/gif;base64,R0lGODdhHgAIALMAAAAAADU1NTk5OUJCQkpKSlZWVltbW2pqaoCAgP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAkAAAoALAAAAAAeAAgAAAQw0BhFq734yjJm/p8xFEVAeGCqGERACmahgkUrvPH81cFdnjoQy8VBBTOiguSokkQAADs=) no-repeat}.mcc-color-picker-selector{height:170px}::ng-deep mat-form-field{font-family:'Open Sans';font-size:11px;font-weight:700}::ng-deep mat-form-field.black{color:#100214}::ng-deep mat-form-field.black label.mat-form-field-label{color:#100214}::ng-deep mat-form-field.black .mat-form-field-underline{background-color:#100214}::ng-deep mat-form-field.white{color:#fff}::ng-deep mat-form-field.white label.mat-form-field-label{color:#fff}::ng-deep mat-form-field.white .mat-form-field-underline{background-color:#fff}.mcc-color-picker-selector-preview{height:40px;padding:15px;border-bottom:1px solid #e1e1e1;box-sizing:content-box}.mcc-color-picker-selector-preview form{display:inline-block;position:relative}.mcc-color-picker-selector-preview .hex-input{width:75px;margin-right:20px}.mcc-color-picker-selector-preview .hex-input input{font-size:16px;font-weight:400}.mcc-color-picker-selector-preview .rgb-input{width:40px;margin-right:5px}.mcc-color-picker-selector-preview .rgb-input input{font-size:16px;font-weight:400}"]
    }),
    __param(2, Inject(EMPTY_COLOR))
], MccColorPickerSelectorComponent);

var MccColorPickerOriginDirective_1;
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

var MccColorPickerModule_1;
const ɵ0 = [];
let MccColorPickerModule = MccColorPickerModule_1 = class MccColorPickerModule {
    /**
     *
     */
    static forRoot(config) {
        return {
            ngModule: MccColorPickerModule_1,
            providers: [
                { provide: EMPTY_COLOR, useValue: ('empty_color' in config ? config.empty_color : 'none') },
                { provide: USED_COLORS, useValue: config.used_colors || [] }
            ],
        };
    }
};
MccColorPickerModule = MccColorPickerModule_1 = __decorate([
    NgModule({
        imports: [
            CommonModule,
            PortalModule,
            OverlayModule,
            ReactiveFormsModule,
            MatButtonModule,
            MatFormFieldModule,
            MatInputModule,
        ],
        declarations: [
            MccColorPickerComponent,
            MccConnectedColorPickerDirective,
            MccColorPickerSelectorComponent,
            MccColorPickerOriginDirective,
            MccColorPickerOptionDirective,
            MccColorPickerCollectionComponent,
        ],
        exports: [
            MccColorPickerComponent,
            MccConnectedColorPickerDirective,
            MccColorPickerOriginDirective,
            MccColorPickerCollectionComponent,
        ],
        providers: [
            MccColorPickerService,
            { provide: EMPTY_COLOR, useValue: 'none' },
            { provide: USED_COLORS, useValue: ɵ0 }
        ],
    })
], MccColorPickerModule);

// scrollspy animations
const SCROLLSPY_ANIMATION_SMOOTH = 'smooth';
const SCROLLSPY_ANIMATION_INSTANT = 'instant';
const SCROLLSPY_ANIMATION_AUTO = 'auto';

let MccScrollspyService = class MccScrollspyService {
    constructor(window) {
        this.window = window;
        /**
         * When scroll is from click event, change this attr to true
         * So scroll event obeservable doesn't emit any update
         */
        this._fromClick = false;
        /**
         * List of scrollspy group
         */
        this.data = [];
        // listen to scroll event
        this._scrollSub = fromEvent(window, 'scroll')
            .pipe(debounceTime(50), withLatestFrom(() => window.scrollY))
            .subscribe(position => {
            if (!this._fromClick) {
                this._updateFocused(position);
            }
            this._fromClick = false;
        });
    }
    ngOnDestroy() {
        if (this._scrollSub && !this._scrollSub.closed) {
            this._scrollSub.unsubscribe();
        }
    }
    /**
     * Update information about wich element is on focus
     * @param position number
     */
    _updateFocused(position) {
        this.data.forEach(group => {
            const items = [];
            group.items.getValue().forEach((item, index) => {
                item.focus = false;
                if (item.top <= position) {
                    if (items[index - 1]) {
                        items[index - 1].focus = false;
                    }
                    item.focus = true;
                }
                items.push(item);
            });
            group.items.next(items);
        });
    }
    /**
     * Create new group of items
     * @param name string
     * @param items MccScrollspyItemDirective[]
     * @param animation ScrollBehavior
     */
    create(name, items, animation) {
        let group = this.data.find(group => group.name === name);
        if (!group) {
            group = {
                name: name,
                animation: animation || SCROLLSPY_ANIMATION_SMOOTH,
                items: new BehaviorSubject(items || []),
            };
            this.data.push(group);
        }
        else {
            group.items.next(items || []);
        }
        return group;
    }
    /**
     * Return observable of the group
     * @param name string
     */
    group(name) {
        let group = this.data.find(g => g.name === name);
        if (!group) {
            group = this.create(name);
        }
        return group.items.asObservable();
    }
    /**
     * Scroll to one of the items
     * @param name string
     * @param id string
     */
    scrollTo(name, id) {
        const group = this.data.find(group => group.name === name);
        group.items.getValue().forEach(item => {
            item.focus = false;
            if (item.id === id) {
                this._fromClick = true;
                this._updateFocused(item.top);
                window.scrollTo({ top: item.top, behavior: group.animation });
            }
        });
    }
};
MccScrollspyService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['Window',] }] }
];
MccScrollspyService = __decorate([
    Injectable(),
    __param(0, Inject('Window'))
], MccScrollspyService);

let MccScrollspyItemDirective = class MccScrollspyItemDirective {
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    /**
     * Hold the element id, if element doesn't have id
     * the method will create one
     */
    set id(id) {
        if (!id) {
            id = this._createId();
            this.renderer.setProperty(this.elementRef.nativeElement, 'id', id);
        }
        this._id = id;
    }
    get id() {
        return this._id;
    }
    /**
     * Element distance of the top
     */
    get top() {
        return this.elementRef.nativeElement.offsetTop;
    }
    /**
     * Element is focused
     */
    set focus(focused) {
        this._focused = coerceBooleanProperty(focused);
    }
    get focus() {
        return this._focused;
    }
    ngAfterContentInit() {
        if (!this.label) {
            this.label = this.elementRef.nativeElement.textContent;
        }
        this.id = this.elementRef.nativeElement.id;
    }
    /**
     * Create an ID for the element
     */
    _createId() {
        let tmpID = this.label.toLowerCase().replace(/[ ]+/gi, '_');
        return `mcc_scrollspy_${tmpID}`;
    }
};
MccScrollspyItemDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
__decorate([
    Input('focus')
], MccScrollspyItemDirective.prototype, "focus", null);
__decorate([
    Input()
], MccScrollspyItemDirective.prototype, "label", void 0);
MccScrollspyItemDirective = __decorate([
    Directive({
        selector: '[mccScrollspyItem], [mcc-scrollspy-item]',
        exportAs: 'mccScrollspyItem',
    })
], MccScrollspyItemDirective);
let MccScrollspyGroupDirective = class MccScrollspyGroupDirective {
    constructor(mccScrollspyService) {
        this.mccScrollspyService = mccScrollspyService;
    }
    /**
     * Name of the scrollspy group
     */
    set name(name) {
        this._name = name;
    }
    ngAfterContentInit() {
        // add the group items
        const items = this.items.map(item => item);
        this.mccScrollspyService.create(this._name, items);
    }
};
MccScrollspyGroupDirective.ctorParameters = () => [
    { type: MccScrollspyService }
];
__decorate([
    ContentChildren(MccScrollspyItemDirective)
], MccScrollspyGroupDirective.prototype, "items", void 0);
__decorate([
    Input('mccScrollspyGroup')
], MccScrollspyGroupDirective.prototype, "name", null);
MccScrollspyGroupDirective = __decorate([
    Directive({
        selector: '[mccScrollspyGroup], [mcc-scrollspy-group]',
        exportAs: 'mccScrollspyGroup',
    })
], MccScrollspyGroupDirective);

const ɵ0$1 = window;
let MccScrollspyModule = class MccScrollspyModule {
};
MccScrollspyModule = __decorate([
    NgModule({
        imports: [CommonModule, ScrollingModule],
        providers: [MccScrollspyService, { provide: 'Window', useValue: ɵ0$1 }],
        declarations: [MccScrollspyGroupDirective, MccScrollspyItemDirective],
        exports: [MccScrollspyGroupDirective, MccScrollspyItemDirective],
    })
], MccScrollspyModule);

/**
 * Default value of action button z-index
 */
const Z_INDEX = 23;
/**
 * SPIN animation used on speed-dial
 */
const SPIN_ANIMATION = trigger('spin', [
    state('open', style({
        transform: 'rotate(360deg)',
    })),
    state('closed', style({
        transform: 'rotate(0deg)',
    })),
    transition('open => closed', [animate('.3s')]),
    transition('closed => open', [animate('.3s')]),
]);

let MccSpeedDialActionsComponent = class MccSpeedDialActionsComponent {
    constructor(renderer) {
        this.renderer = renderer;
        this._animation = new BehaviorSubject('scale');
    }
    /**
     * Set type of animation will be executed on open/close
     * Type available are: scale | fling
     */
    set animation(animation) {
        this._animation.next(animation);
    }
    /**
     * The z-index style and animation class are handle separate because
     * z-index will be set only one time, and the animation class will be set
     * every time the animation change
     */
    ngAfterContentInit() {
        // set z-index style to each button action
        this._buttons.forEach((button, index) => {
            this.renderer.setStyle(button._elementRef.nativeElement, 'z-index', (Z_INDEX - index));
        });
        // set the animation class to each button action
        this._animation.subscribe(animation => {
            const nextAnimationClass = `speed-dial-item-animation-${animation}`;
            this._buttons.forEach(button => {
                if (this._lastAnimationClass) {
                    this.renderer.removeClass(button._elementRef.nativeElement, this._lastAnimationClass);
                }
                this.renderer.addClass(button._elementRef.nativeElement, nextAnimationClass);
            });
            this._lastAnimationClass = nextAnimationClass;
        });
    }
    /**
     * Responsible for change the state of the action buttons to visible
     *
     * @param direction DIRECTION
     */
    show(direction) {
        switch (this._animation.value) {
            case 'scale': {
                this._buttons.forEach((button, index) => {
                    const transition = 3 + (65 * index);
                    this.renderer.setStyle(button._elementRef.nativeElement, 'transition-delay', `${transition}ms`);
                    this.renderer.setStyle(button._elementRef.nativeElement, 'opacity', '1');
                    this.renderer.setStyle(button._elementRef.nativeElement, 'transform', 'scale(1)');
                });
                break;
            }
            case 'fling': {
                const translateFn = (direction == 'up' || direction == 'down') ? 'translateY' : 'translateX';
                const sign = (direction == 'down' || direction == 'right') ? '-' : '';
                this._buttons.forEach(button => {
                    this.renderer.setStyle(button._elementRef.nativeElement, 'transition-delay', '0ms');
                    this.renderer.setStyle(button._elementRef.nativeElement, 'opacity', '1');
                    this.renderer.setStyle(button._elementRef.nativeElement, 'transform', `${translateFn}(${sign}0)`);
                });
            }
        }
    }
    /**
     * Hide all the buttons action
     *
     * @param direction DIRECTION
     */
    hide(direction) {
        switch (this._animation.value) {
            case 'scale': {
                this._buttons.forEach((button, index) => {
                    const transition = 3 - (65 * index);
                    this.renderer.setStyle(button._elementRef.nativeElement, 'transition-delay', `${transition}ms`);
                    this.renderer.setStyle(button._elementRef.nativeElement, 'opacity', '0');
                    this.renderer.setStyle(button._elementRef.nativeElement, 'transform', 'scale(0)');
                });
                break;
            }
            case 'fling': {
                const translateFn = (direction == 'up' || direction == 'down') ? 'translateY' : 'translateX';
                const sign = (direction == 'down' || direction == 'right') ? '-' : '';
                this._buttons.forEach((button, index) => {
                    const transform = (55 * (index + 1) - (index * 5));
                    this.renderer.setStyle(button._elementRef.nativeElement, 'transition-delay', '0ms');
                    this.renderer.setStyle(button._elementRef.nativeElement, 'opacity', '1');
                    this.renderer.setStyle(button._elementRef.nativeElement, 'transform', `${translateFn}(${sign}${transform}px)`);
                });
            }
        }
    }
};
MccSpeedDialActionsComponent.ctorParameters = () => [
    { type: Renderer2 }
];
__decorate([
    ContentChildren(MatButton)
], MccSpeedDialActionsComponent.prototype, "_buttons", void 0);
__decorate([
    Input()
], MccSpeedDialActionsComponent.prototype, "animation", null);
MccSpeedDialActionsComponent = __decorate([
    Component({
        selector: 'mcc-speed-dial-actions',
        template: "<ng-content select=\"button\"></ng-content>",
        encapsulation: ViewEncapsulation.None,
        styles: ["mcc-speed-dial-actions .speed-dial-item-animation-scale{transform:scale(0);transition:.3s cubic-bezier(.55,0,.55,.2);transition-duration:.14286s}mcc-speed-dial-actions .speed-dial-item-animation-fling{display:block;opacity:1;transition:.3s cubic-bezier(.55,0,.55,.2)}"]
    })
], MccSpeedDialActionsComponent);

let MccSpeedDialComponent = class MccSpeedDialComponent {
    constructor() {
        this._isOpen = false;
        this._hover = false;
        this._spin = true;
        this._direction = 'up';
        /**
         * Event emitted when open state change
         */
        this.openStateChange = new EventEmitter();
    }
    /**
     * Set initial 'open' state
     */
    set isOpen(open) {
        this._isOpen = coerceBooleanProperty(open);
    }
    get isOpen() {
        return this._isOpen;
    }
    /**
     * When enabled, handle open/close state on mouse hover
     */
    set hover(hover) {
        this._hover = coerceBooleanProperty(hover);
    }
    /**
     * Enable/disable spin animation when button is clicked or hovered
     */
    set spin(spin) {
        this._spin = spin;
    }
    get spin() {
        return this._spin;
    }
    /**
     * Define the direction of the actions button
     * Directions available are: up | down | left | right
     */
    set direction(direction) {
        this._direction = direction;
    }
    get direction() {
        return this._direction;
    }
    /**
     * Call fab speed dial actions functions to change the
     * visibility of the buttons
     */
    _setActionsState() {
        if (this._isOpen) {
            this.actions.show(this._direction);
        }
        else {
            this.actions.hide(this._direction);
        }
    }
    /**
     * Set initial state to the action buttons inside speed-dial-actions
     */
    ngAfterViewInit() {
        this._setActionsState();
    }
    /**
     *
     */
    ngOnChanges(changes) {
        if ('isOpen' in changes && changes['isOpen'].previousValue !== undefined) {
            this._setActionsState();
        }
    }
    /**
     * When mouseHover is enabled and state is closed
     * calls toggle to open the actions
     */
    hoverStart() {
        if (this._hover && !this._isOpen) {
            this.toggle();
        }
    }
    /**
     * When mouseHover is enabled and state is open
     * calls toggle to close the actions
     */
    hoverStop() {
        if (this._hover && this._isOpen) {
            this.toggle();
        }
    }
    /**
     * Change the open state
     */
    toggle() {
        this._isOpen = !this._isOpen;
        this._setActionsState();
        this.openStateChange.emit(this._isOpen);
    }
};
__decorate([
    ContentChild(MccSpeedDialActionsComponent)
], MccSpeedDialComponent.prototype, "actions", void 0);
__decorate([
    Input('open')
], MccSpeedDialComponent.prototype, "isOpen", null);
__decorate([
    Input('mouseHover')
], MccSpeedDialComponent.prototype, "hover", null);
__decorate([
    Input()
], MccSpeedDialComponent.prototype, "spin", null);
__decorate([
    Input()
], MccSpeedDialComponent.prototype, "direction", null);
__decorate([
    Output()
], MccSpeedDialComponent.prototype, "openStateChange", void 0);
MccSpeedDialComponent = __decorate([
    Component({
        selector: 'mcc-speed-dial',
        template: "<div class=\"mcc-speed-dial-container\" [ngClass]=\"'mcc-speed-dial-direction-' + direction\">\n  <button mat-fab [@spin]=\"spin && isOpen ? 'open' : 'closed'\" class=\"mat-elevation-z1\" (mouseenter)=\"hoverStart()\"\n    (mouseleave)=\"hoverStop()\" (click)=\"toggle()\">\n    <ng-content></ng-content>\n  </button>\n\n  <ng-content select=\"mcc-speed-dial-actions\"></ng-content>\n</div>",
        animations: [SPIN_ANIMATION],
        styles: [".mcc-speed-dial-container{position:relative;display:flex;align-items:center;z-index:20}.mcc-speed-dial-container button{pointer-events:auto;z-index:24}.mcc-speed-dial-container ::ng-deep mcc-speed-dial-actions{display:flex;height:auto}.mcc-speed-dial-container.mcc-speed-dial-direction-up{flex-direction:column}.mcc-speed-dial-container.mcc-speed-dial-direction-up button{order:2}.mcc-speed-dial-container.mcc-speed-dial-direction-up ::ng-deep mcc-speed-dial-actions{flex-direction:column-reverse;order:1}.mcc-speed-dial-container.mcc-speed-dial-direction-up ::ng-deep mcc-speed-dial-actions .mat-mini-fab{margin-bottom:10px}.mcc-speed-dial-container.mcc-speed-dial-direction-down{flex-direction:column}.mcc-speed-dial-container.mcc-speed-dial-direction-down button{order:1}.mcc-speed-dial-container.mcc-speed-dial-direction-down ::ng-deep mcc-speed-dial-actions{flex-direction:column;order:2}.mcc-speed-dial-container.mcc-speed-dial-direction-down ::ng-deep mcc-speed-dial-actions .mat-mini-fab{margin-top:10px}.mcc-speed-dial-container.mcc-speed-dial-direction-left{flex-direction:row}.mcc-speed-dial-container.mcc-speed-dial-direction-left button{order:2}.mcc-speed-dial-container.mcc-speed-dial-direction-left ::ng-deep mcc-speed-dial-actions{flex-direction:row-reverse;order:1}.mcc-speed-dial-container.mcc-speed-dial-direction-left ::ng-deep mcc-speed-dial-actions .mat-mini-fab{margin-right:10px}.mcc-speed-dial-container.mcc-speed-dial-direction-right{flex-direction:row}.mcc-speed-dial-container.mcc-speed-dial-direction-right button{order:1}.mcc-speed-dial-container.mcc-speed-dial-direction-right ::ng-deep mcc-speed-dial-actions{flex-direction:row;order:2}.mcc-speed-dial-container.mcc-speed-dial-direction-right ::ng-deep mcc-speed-dial-actions .mat-mini-fab{margin-left:10px}"]
    })
], MccSpeedDialComponent);

let MccSpeedDialModule = class MccSpeedDialModule {
};
MccSpeedDialModule = __decorate([
    NgModule({
        imports: [CommonModule, MatButtonModule],
        declarations: [MccSpeedDialComponent, MccSpeedDialActionsComponent],
        exports: [MccSpeedDialComponent, MccSpeedDialActionsComponent],
    })
], MccSpeedDialModule);

/**
 * contants to create timer with HOURS or MINUTES
 */
const HOURS = ['12', '11', '1', '10', '2', '9', '3', '8', '4', '7', '5', '6'];
const MINUTES = [
    '00',
    '55',
    '05',
    '50',
    '10',
    '45',
    '15',
    '40',
    '20',
    '35',
    '25',
    '30',
];

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

var MccTimerPickerOriginDirective_1;
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

let MccTimerPickerModule = class MccTimerPickerModule {
};
MccTimerPickerModule = __decorate([
    NgModule({
        imports: [CommonModule, PortalModule, OverlayModule, MatButtonModule],
        declarations: [
            MccTimerPickerComponent,
            MccTimerPickerOriginDirective,
            MccConnectedTimerPickerDirective,
        ],
        exports: [
            MccTimerPickerComponent,
            MccTimerPickerOriginDirective,
            MccConnectedTimerPickerDirective,
        ],
    })
], MccTimerPickerModule);

/**
 * Generated bundle index. Do not edit.
 */

export { EMPTY_COLOR, MccColorPickerModule, MccColorPickerService, MccScrollspyItemDirective, MccScrollspyModule, MccScrollspyService, MccSpeedDialModule, MccTimerPickerComponent, MccTimerPickerModule, USED_COLORS as ɵa, MccScrollspyGroupDirective as ɵb, MccColorPickerComponent as ɵc, MccColorPickerCollectionComponent as ɵd, MccColorPickerOptionDirective as ɵe, MccColorPickerOriginDirective as ɵf, MccConnectedColorPickerDirective as ɵg, MccColorPickerSelectorComponent as ɵh, MccSpeedDialComponent as ɵi, SPIN_ANIMATION as ɵj, MccSpeedDialActionsComponent as ɵk, MccTimerPickerOriginDirective as ɵl, MccConnectedTimerPickerDirective as ɵm };
//# sourceMappingURL=material-community-components.js.map
