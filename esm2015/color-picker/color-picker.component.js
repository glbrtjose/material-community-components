import { __decorate, __param } from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, QueryList, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { EMPTY_COLOR, coerceHexaColor } from './color-picker';
import { MccColorPickerCollectionComponent } from './color-picker-collection.component';
import { MccColorPickerService } from './color-picker.service';
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
export { MccColorPickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hdGVyaWFsLWNvbW11bml0eS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29sb3ItcGlja2VyL2NvbG9yLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBNEIsTUFBTSxNQUFNLENBQUM7QUFDakUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDeEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFTL0QsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBdUI7SUF3TmxDLFlBQ1UsVUFBc0IsRUFDdEIsaUJBQW9DLEVBQ3BDLGtCQUF5QyxFQUNyQixVQUFrQjtRQUh0QyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUF1QjtRQUNyQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBM014QyxvQkFBZSxHQUFXLGFBQWEsQ0FBQztRQXFCeEMsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBWW5DLGtCQUFhLEdBQVks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SyxFQUFFO3NEQUdQO0FBVUQ7SUFEQyxLQUFLLEVBQUU7MERBR1A7QUFVRDtJQURDLEtBQUssRUFBRTt3RUFHUDtBQVVEO0lBREMsS0FBSyxFQUFFO3NFQUdQO0FBU1E7SUFBUixLQUFLLEVBQUU7K0RBQTZCO0FBSzVCO0lBQVIsS0FBSyxFQUFFOzBEQUE4QjtBQUs3QjtJQUFSLEtBQUssRUFBRTsyREFBZ0M7QUFLOUI7SUFBVCxNQUFNLEVBQUU7dURBQTZCO0FBSzVCO0lBQVQsTUFBTSxFQUFFO3lEQUErQjtBQUs5QjtJQUFULE1BQU0sRUFBRTt5REFBK0I7QUFoTTdCLHVCQUF1QjtJQVBuQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLHVvRUFBNEM7UUFFNUMsbUJBQW1CLEVBQUUsS0FBSztRQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7S0FDaEQsQ0FBQztJQTZORyxXQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtHQTVOWCx1QkFBdUIsQ0FxVW5DO1NBclVZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRU1QVFlfQ09MT1IsIGNvZXJjZUhleGFDb2xvciB9IGZyb20gJy4vY29sb3ItcGlja2VyJztcbmltcG9ydCB7IE1jY0NvbG9yUGlja2VyQ29sbGVjdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY29sb3ItcGlja2VyLWNvbGxlY3Rpb24uY29tcG9uZW50JztcbmltcG9ydCB7IE1jY0NvbG9yUGlja2VyU2VydmljZSB9IGZyb20gJy4vY29sb3ItcGlja2VyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtY2MtY29sb3ItcGlja2VyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbG9yLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NvbG9yLXBpY2tlci5jb21wb25lbnQuc2NzcyddLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1jY0NvbG9yUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogR2V0IGFsbCBjb2xsZWN0aW9uc1xuICAgKi9cbiAgQENvbnRlbnRDaGlsZHJlbihNY2NDb2xvclBpY2tlckNvbGxlY3Rpb25Db21wb25lbnQpXG4gIF9jb2xsZWN0aW9uczogUXVlcnlMaXN0PE1jY0NvbG9yUGlja2VyQ29sbGVjdGlvbkNvbXBvbmVudD47XG5cbiAgLyoqXG4gICAqIENoYW5nZSBsYWJlbCBvZiB0aGUgY29sbGVjdGlvbiBVc2VkQ29sb3JzXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgdXNlZENvbG9yTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdXNlZENvbG9yTGFiZWw7XG4gIH1cbiAgc2V0IHVzZWRDb2xvckxhYmVsKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl91c2VkQ29sb3JMYWJlbCA9IHZhbHVlO1xuICB9XG4gIHByaXZhdGUgX3VzZWRDb2xvckxhYmVsOiBzdHJpbmcgPSAnVXNlZCBDb2xvcnMnO1xuXG4gIC8qKlxuICAgKiBTZXQgaW5pdGlhbCB2YWx1ZSBmb3IgdXNlZCBjb2xvclxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IHVzZWRDb2xvclN0YXJ0KGNvbG9yczogc3RyaW5nW10pIHtcbiAgICBpZiAoY29sb3JzICYmIGNvbG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGNvbnN0IGNvbG9yIG9mIGNvbG9ycykge1xuICAgICAgICB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5hZGRDb2xvcihjb2xvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB1c2VkQ29sb3IgdG8gYmUgdXNlZCBpbiByZXZlcnNlXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgcmV2ZXJzZVVzZWRDb2xvcnMocmV2ZXJzZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JldmVyc2VVc2VkQ29sb3IgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkocmV2ZXJzZSk7XG4gIH1cbiAgcHJpdmF0ZSBfcmV2ZXJzZVVzZWRDb2xvcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBIaWRlIHRoZSBoZXhhZGVjaW1hbCBjb2xvciBmb3Jtcy5cbiAgICovXG4gIEBJbnB1dCgnaGlkZUhleEZvcm1zJylcbiAgZ2V0IGhpZGVIZXhGb3JtcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGlkZUhleEZvcm1zO1xuICB9XG4gIHNldCBoaWRlSGV4Rm9ybXModmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlSGV4Rm9ybXMgPSB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF9oaWRlSGV4Rm9ybXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogSGlkZSBlbXB0eSBzbG90cyBmcm9tIHRoZSBjb2xsZWN0aW9uIFVzZWRDb2xvcnNcbiAgICovXG4gIEBJbnB1dCgnaGlkZUVtcHR5VXNlZENvbG9ycycpXG4gIGdldCBoaWRlRW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hpZGVFbXB0eTtcbiAgfVxuICBzZXQgaGlkZUVtcHR5KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGlkZUVtcHR5ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9oaWRlRW1wdHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogSGlkZSB0cmFuc3BhcmVudCBvcHRpb24gb2YgVXNlZENvbG9yc1xuICAgKi9cbiAgQElucHV0KCdoaWRlVHJhbnNwYXJlbnRVc2VkQ29sb3JzJylcbiAgZ2V0IGhpZGVUcmFuc3BhcmVudCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGlkZVRyYW5zcGFyZW50O1xuICB9XG4gIHNldCBoaWRlVHJhbnNwYXJlbnQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlVHJhbnNwYXJlbnQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2hpZGVUcmFuc3BhcmVudDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBIaWRlIFVzZWRDb2xvcnMgY29sbGVjdGlvblxuICAgKi9cbiAgQElucHV0KCdoaWRlVXNlZENvbG9ycycpXG4gIGdldCBoaWRlVXNlZENvbG9ycygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGlkZVVzZWRDb2xvcnM7XG4gIH1cbiAgc2V0IGhpZGVVc2VkQ29sb3JzKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGlkZVVzZWRDb2xvcnMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2hpZGVVc2VkQ29sb3JzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFN0YXJ0IHdpdGggYSBjb2xvciBzZWxlY3RlZFxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IHNlbGVjdGVkQ29sb3IoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRDb2xvcjtcbiAgfVxuICBzZXQgc2VsZWN0ZWRDb2xvcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGVkQ29sb3IgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHRoaXMuX3NlbGVjdGVkQ29sb3IgPSBjb2VyY2VIZXhhQ29sb3IodmFsdWUpIHx8IHRoaXMuZW1wdHlDb2xvcjtcbiAgfVxuICBwcml2YXRlIF9zZWxlY3RlZENvbG9yOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIERlZmluZSBpZiB0aGUgcGFuZWwgd2lsbCBiZSBpbml0aWF0ZWQgb3BlblxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IGlzT3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNPcGVuO1xuICB9XG4gIHNldCBpc09wZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc09wZW4gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2lzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBEZWZpbmUgaWYgdGhlIHBhbmVsIHdpbGwgc2hvdyBpbiBvdmVybGF5IG9yIG5vdFxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IG92ZXJsYXkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX292ZXJsYXk7XG4gIH1cbiAgc2V0IG92ZXJsYXkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9vdmVybGF5ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9vdmVybGF5OiBib29sZWFuID0gdHJ1ZTtcblxuICAvKipcbiAgICogSGlkZSB0aGUgYWN0aW9uIGJ1dHRvbnMgKGNhbmNlbC9jb25maXJtKVxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IGhpZGVCdXR0b25zKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oaWRlQnV0dG9ucztcbiAgfVxuICBzZXQgaGlkZUJ1dHRvbnModmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlQnV0dG9ucyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfaGlkZUJ1dHRvbnM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogRGVmaW5lIG5ldyBoZWlnaHQgZm9yIHRoZSBzZWxlY3RvclxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IGNvbG9yUGlja2VyU2VsZWN0b3JIZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY29sb3JQaWNrZXJTZWxlY3RvckhlaWdodDtcbiAgfVxuICBzZXQgY29sb3JQaWNrZXJTZWxlY3RvckhlaWdodChoZWlnaHQ6IG51bWJlcikge1xuICAgIHRoaXMuX2NvbG9yUGlja2VyU2VsZWN0b3JIZWlnaHQgPSBoZWlnaHQ7XG4gIH1cbiAgcHJpdmF0ZSBfY29sb3JQaWNrZXJTZWxlY3RvckhlaWdodDogbnVtYmVyID0gMTcwO1xuXG4gIC8qKlxuICAgKiBIaWRlIHRoZSBjb2xvciBwaWNrZXIgc2VsZWN0b3JcbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBoaWRlQ29sb3JQaWNrZXJTZWxlY3RvcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGlkZUNvbG9yUGlja2VyU2VsZWN0b3I7XG4gIH1cbiAgc2V0IGhpZGVDb2xvclBpY2tlclNlbGVjdG9yKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGlkZUNvbG9yUGlja2VyU2VsZWN0b3IgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2hpZGVDb2xvclBpY2tlclNlbGVjdG9yOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgc2l6ZSBvZiB0aGUgdXNlZCBjb2xvcnNcbiAgICovXG4gIEBJbnB1dCgpIHVzZWRTaXplQ29sb3JzOiBudW1iZXIgPSAzMDtcblxuICAvKipcbiAgICogQ2hhbmdlIGJ0bkNhbmNlbCBsYWJlbFxuICAgKi9cbiAgQElucHV0KCkgYnRuQ2FuY2VsOiBzdHJpbmcgPSAnQ2FuY2VsJztcblxuICAvKipcbiAgICogQ2hhbmdlIGJ0bkNvbmZpcm0gbGFiZWxcbiAgICovXG4gIEBJbnB1dCgpIGJ0bkNvbmZpcm06IHN0cmluZyA9ICdDb25maXJtJztcblxuICAvKipcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHVzZXIgY2hhbmdlIHRoZSBzZWxlY3RlZCBjb2xvciAod2l0aG91dCBjb25maXJtKVxuICAgKi9cbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHNlbGVjdGVkIGNvbG9yIGlzIGNvbmZpcm1cbiAgICovXG4gIEBPdXRwdXQoKSBzZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIGlzIGNsaWNrZWQgb3V0c2lkZSBvZiB0aGUgY29tcG9uZW50XG4gICAqL1xuICBAT3V0cHV0KCkgY2xpY2tPdXQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIE9ic2VydmFibGUgd2l0aCB0aGUgY29sb3IgdGhlIHVzZXIgaXMgcGlja2luZ1xuICAgKi9cbiAgZ2V0IHRtcFNlbGVjdGVkQ29sb3IkKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX3RtcFNlbGVjdGVkQ29sb3IuYXNPYnNlcnZhYmxlKCk7XG4gIH1cbiAgcHJpdmF0ZSBfdG1wU2VsZWN0ZWRDb2xvcjogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz47XG5cbiAgLyoqXG4gICAqIE9ic2VydmFibGUgd2l0aCBhbGwgdGhlIGNvbG9ycyB1c2VkIGJ5IHRoZSB1c2VyXG4gICAqL1xuICBnZXQgdXNlZENvbG9ycyQoKTogT2JzZXJ2YWJsZTxzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLmNvbG9yUGlja2VyU2VydmljZVxuICAgICAgLmdldENvbG9ycygpXG4gICAgICAucGlwZShtYXAoY29sb3JzID0+ICghdGhpcy5fcmV2ZXJzZVVzZWRDb2xvciA/IGNvbG9ycyA6IFsuLi5jb2xvcnNdLnJldmVyc2UoKSkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBzdWJzY3JpcHRpb25zIGZyb20gdGhlIGNvbGxlY3Rpb25zXG4gICAqL1xuICBwcml2YXRlIF9jb2xsZWN0aW9uU3ViczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBjb2xvclBpY2tlclNlcnZpY2U6IE1jY0NvbG9yUGlja2VyU2VydmljZSxcbiAgICBASW5qZWN0KEVNUFRZX0NPTE9SKSBwdWJsaWMgZW1wdHlDb2xvcjogc3RyaW5nXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuX3NlbGVjdGVkQ29sb3IpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGVkQ29sb3IgPSB0aGlzLmVtcHR5Q29sb3I7XG4gICAgfVxuXG4gICAgdGhpcy5fdG1wU2VsZWN0ZWRDb2xvciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPih0aGlzLl9zZWxlY3RlZENvbG9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXYWxrIHRocm93IGFsbCBjb2xsZWN0aW9ucyBhbmQgc3ViY3JpYmUgdG8gY2hhbmdlc1xuICAgKi9cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGlmICh0aGlzLl9jb2xsZWN0aW9ucykge1xuICAgICAgdGhpcy5fY29sbGVjdGlvbnMuZm9yRWFjaCgoY29sbGVjdGlvbjogTWNjQ29sb3JQaWNrZXJDb2xsZWN0aW9uQ29tcG9uZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IGNvbGxlY3Rpb24uY2hhbmdlQ29sb3Iuc3Vic2NyaWJlKGNvbG9yID0+IHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVRtcFNlbGVjdGVkQ29sb3IoY29sb3IpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uU3Vicy5wdXNoKHN1YnNjcmlwdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSBhbGwgc3Vic2NyaXB0aW9uc1xuICAgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX2NvbGxlY3Rpb25TdWJzKSB7XG4gICAgICB0aGlzLl9jb2xsZWN0aW9uU3Vicy5mb3JFYWNoKChzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbikgPT4ge1xuICAgICAgICBpZiAoc3Vic2NyaXB0aW9uICYmICFzdWJzY3JpcHRpb24uY2xvc2VkKSB7XG4gICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgc2VsZWN0ZWQgY29sb3IgYW5kIGVtaXQgdGhlIGNoYW5nZVxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlU2VsZWN0ZWRDb2xvcigpIHtcbiAgICBpZiAodGhpcy5faXNPcGVuIHx8ICF0aGlzLm92ZXJsYXkpIHtcbiAgICAgIGNvbnN0IHRtcFNlbGVjdGVkQ29sb3IgPSB0aGlzLl90bXBTZWxlY3RlZENvbG9yLmdldFZhbHVlKCk7XG4gICAgICBpZiAodGhpcy5fc2VsZWN0ZWRDb2xvciAhPT0gdG1wU2VsZWN0ZWRDb2xvcikge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZENvbG9yID0gdG1wU2VsZWN0ZWRDb2xvcjtcbiAgICAgICAgdGhpcy5zZWxlY3RlZC5uZXh0KHRoaXMuX3NlbGVjdGVkQ29sb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZC5lbWl0KHRoaXMuX3NlbGVjdGVkQ29sb3IpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVuL2Nsb3NlIGNvbG9yIHBpY2tlciBwYW5lbFxuICAgKi9cbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMuX2lzT3BlbiA9ICF0aGlzLl9pc09wZW47XG4gICAgaWYgKCF0aGlzLl9pc09wZW4gJiYgdGhpcy5fc2VsZWN0ZWRDb2xvciAhPT0gdGhpcy5lbXB0eUNvbG9yKSB7XG4gICAgICB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5hZGRDb2xvcih0aGlzLl9zZWxlY3RlZENvbG9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHNlbGVjdGVkIGNvbG9yLCBjbG9zZSB0aGUgcGFuZWwgYW5kIG5vdGlmeSB0aGUgdXNlclxuICAgKi9cbiAgYmFja2Ryb3BDbGljaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faGlkZUJ1dHRvbnMpIHtcbiAgICAgIHRoaXMuY29uZmlybVNlbGVjdGVkQ29sb3IoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jYW5jZWxTZWxlY3Rpb24oKTtcbiAgICB9XG4gICAgdGhpcy5jbGlja091dC5lbWl0KG51bGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0bXBTZWxlY3RlZENvbG9yXG4gICAqIEBwYXJhbSBjb2xvciBzdHJpbmdcbiAgICovXG4gIHVwZGF0ZVRtcFNlbGVjdGVkQ29sb3IoY29sb3I6IHN0cmluZykge1xuICAgIGlmIChjb2xvciB8fCBjb2xvciA9PT0gdGhpcy5lbXB0eUNvbG9yKSB7XG4gICAgICB0aGlzLl90bXBTZWxlY3RlZENvbG9yLm5leHQoY29sb3IpO1xuICAgICAgdGhpcy5jaGFuZ2UubmV4dChjb2xvcik7XG4gICAgICBpZiAodGhpcy5faGlkZUJ1dHRvbnMpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlU2VsZWN0ZWRDb2xvcigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYW5jZWwgdGhlIHNlbGVjdGlvbiBhbmQgY2xvc2UgdGhlIHBhbmVsXG4gICAqL1xuICBjYW5jZWxTZWxlY3Rpb24oKSB7XG4gICAgdGhpcy5fdG1wU2VsZWN0ZWRDb2xvci5uZXh0KHRoaXMuX3NlbGVjdGVkQ29sb3IpO1xuICAgIHRoaXMudG9nZ2xlKCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHNlbGVjdGVkQ29sb3IgYW5kIGNsb3NlIHRoZSBwYW5lbFxuICAgKi9cbiAgY29uZmlybVNlbGVjdGVkQ29sb3IoKSB7XG4gICAgdGhpcy5fdXBkYXRlU2VsZWN0ZWRDb2xvcigpO1xuICAgIHRoaXMudG9nZ2xlKCk7XG4gIH1cbn1cbiJdfQ==