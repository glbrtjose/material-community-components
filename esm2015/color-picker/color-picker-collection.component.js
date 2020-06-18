import { __decorate, __param } from "tslib";
import { AfterContentChecked, Component, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, Input, Inject, Output, } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { EMPTY_COLOR } from './color-picker';
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
export { MccColorPickerCollectionComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLWNvbGxlY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWF0ZXJpYWwtY29tbXVuaXR5LWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJjb2xvci1waWNrZXIvY29sb3ItcGlja2VyLWNvbGxlY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBU25FLElBQWEsaUNBQWlDLEdBQTlDLE1BQWEsaUNBQWlDO0lBa0Q1QyxZQUNVLGlCQUFvQyxFQUNoQixVQUFrQjtRQUR0QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ2hCLGVBQVUsR0FBVixVQUFVLENBQVE7UUEzQ3hDLGVBQVUsR0FBWSxLQUFLLENBQUM7UUEwQnBDOztXQUVHO1FBQ00sU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUUzQjs7V0FFRztRQUNNLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBRXRDOztXQUVHO1FBQ08sZ0JBQVcsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUt0RSxDQUFDO0lBcERKOzs7T0FHRztJQUVILElBQUksU0FBUyxDQUFDLEtBQWM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBR0Q7O09BRUc7SUFFSCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUNELElBQUksS0FBSyxDQUFDLEtBQWE7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUdEOztPQUVHO0lBRUgsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFDRCxJQUFJLE1BQU0sQ0FBQyxNQUE4QjtRQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUN4QixDQUFDO0lBdUJELHFCQUFxQjtRQUNuQixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRTtZQUNyRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPO2lCQUN4QixLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7aUJBQ25CLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxzQkFBc0I7UUFDNUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDdEQsT0FBTyxDQUFDLENBQUM7U0FDVjtRQUVELE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxjQUFjO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxRQUFRLENBQUMsTUFBNEI7UUFDbkMsTUFBTSxLQUFLLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQztDQUNGLENBQUE7O1lBekM4QixpQkFBaUI7eUNBQzNDLE1BQU0sU0FBQyxXQUFXOztBQTlDckI7SUFEQyxLQUFLLEVBQUU7a0VBR1A7QUFPRDtJQURDLEtBQUssRUFBRTs4REFHUDtBQVVEO0lBREMsS0FBSyxFQUFFOytEQUdQO0FBU1E7SUFBUixLQUFLLEVBQUU7K0RBQW1CO0FBS2xCO0lBQVIsS0FBSyxFQUFFO3NFQUE4QjtBQUs1QjtJQUFULE1BQU0sRUFBRTtzRUFBZ0U7QUFoRDlELGlDQUFpQztJQVA3QyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsNkJBQTZCO1FBQ3ZDLHNxQkFBdUQ7UUFFdkQsbUJBQW1CLEVBQUUsS0FBSztRQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7S0FDaEQsQ0FBQztJQXFERyxXQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtHQXBEWCxpQ0FBaUMsQ0E0RjdDO1NBNUZZLGlDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudENoZWNrZWQsXG4gIENvbXBvbmVudCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBJbmplY3QsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgRU1QVFlfQ09MT1IsIE1jY0NvbG9yUGlja2VyT3B0aW9uIH0gZnJvbSAnLi9jb2xvci1waWNrZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtY2MtY29sb3ItcGlja2VyLWNvbGxlY3Rpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vY29sb3ItcGlja2VyLWNvbGxlY3Rpb24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jb2xvci1waWNrZXItY29sbGVjdGlvbi5jb21wb25lbnQuc2NzcyddLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1jY0NvbG9yUGlja2VyQ29sbGVjdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQge1xuICAvKipcbiAgICogSGlkZSBlbXB0eSBzbG90c1xuICAgKiBFbXB0eSBzbG90cyBhcmUgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgY29sbGVjdGlvbiBzaXplIGFuZCBsaW1pdFxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IGhpZGVFbXB0eSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZGVFbXB0eSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfaGlkZUVtcHR5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIE5hbWUgb2YgdGhlIGNvbGxlY3Rpb25cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBsYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9sYWJlbDtcbiAgfVxuICBzZXQgbGFiZWwodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2xhYmVsID0gdmFsdWU7XG4gIH1cbiAgcHJpdmF0ZSBfbGFiZWw6IHN0cmluZztcblxuICAvKipcbiAgICogQXJyYXkgb2YgY29sb3JzIHRvIGJlIGRpc3BsYXllZFxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IGNvbG9ycygpOiBNY2NDb2xvclBpY2tlck9wdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5fY29sb3JzO1xuICB9XG4gIHNldCBjb2xvcnModmFsdWVzOiBNY2NDb2xvclBpY2tlck9wdGlvbltdKSB7XG4gICAgdGhpcy5fY29sb3JzID0gdmFsdWVzO1xuICB9XG4gIHByaXZhdGUgX2NvbG9yczogTWNjQ29sb3JQaWNrZXJPcHRpb25bXTtcblxuICAvKipcbiAgICogU2l6ZSBsaW1pdCBvZiB0aGUgY29sbGVjdGlvblxuICAgKi9cbiAgQElucHV0KCkgc2l6ZTogbnVtYmVyID0gMzA7XG5cbiAgLyoqXG4gICAqIFNob3cgdHJhbnNwYXJlbnQgb3B0aW9uXG4gICAqL1xuICBASW5wdXQoKSB0cmFuc3BhcmVudDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBFbWl0IHNlbGVjdGVkIGNvbG9yIHZhbHVlXG4gICAqL1xuICBAT3V0cHV0KCkgY2hhbmdlQ29sb3I6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEluamVjdChFTVBUWV9DT0xPUikgcHVibGljIGVtcHR5Q29sb3I6IHN0cmluZ1xuICApIHt9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgIGlmICh0aGlzLl9jb2xvcnMgJiYgdGhpcy5fY29sb3JzLmxlbmd0aCAhPT0gdGhpcy5zaXplKSB7XG4gICAgICB0aGlzLl9jb2xvcnMgPSB0aGlzLl9jb2xvcnNcbiAgICAgICAgLnNsaWNlKDAsIHRoaXMuc2l6ZSlcbiAgICAgICAgLmNvbmNhdChuZXcgQXJyYXkodGhpcy5fZ2V0Q29sbGVjdGlvbkRpZmZTaXplKCkpKTtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBsaW1pdCBhbmQgdGhlIGNvbGxlY3Rpb24gc2l6ZS5cbiAgICogQWx3YXlzIHJldHVybiAwIHdoZW4gaGlkZUVtcHR5IGlzIHRydWVcbiAgICogQHJldHVybnMgbnVtYmVyXG4gICAqL1xuICBwcml2YXRlIF9nZXRDb2xsZWN0aW9uRGlmZlNpemUoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5fY29sb3JzLmxlbmd0aCA+IHRoaXMuc2l6ZSB8fCB0aGlzLl9oaWRlRW1wdHkpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNpemUgLSB0aGlzLl9jb2xvcnMubGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBjb2xvclxuICAgKi9cbiAgc2V0VHJhbnNwYXJlbnQoKTogdm9pZCB7XG4gICAgdGhpcy5jaGFuZ2VDb2xvci5lbWl0KHRoaXMuZW1wdHlDb2xvcik7XG4gIH1cblxuICAvKipcbiAgICogRW1pdCBzZWxlY3RlZCBjb2xvciB2YWx1ZVxuICAgKiBAcGFyYW0gb3B0aW9uIE1jY0NvbG9yUGlja2VyT3B0aW9uXG4gICAqL1xuICBzZXRDb2xvcihvcHRpb246IE1jY0NvbG9yUGlja2VyT3B0aW9uKSB7XG4gICAgY29uc3QgY29sb3IgPSB0eXBlb2Ygb3B0aW9uID09PSAnc3RyaW5nJyA/IG9wdGlvbiA6IG9wdGlvbi52YWx1ZTtcbiAgICB0aGlzLmNoYW5nZUNvbG9yLmVtaXQoY29sb3IpO1xuICB9XG59XG4iXX0=