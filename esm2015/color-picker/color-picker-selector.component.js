import { __decorate, __param } from "tslib";
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { EMPTY_COLOR, coerceHexaColor, isValidColor } from './color-picker';
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
export { MccColorPickerSelectorComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hdGVyaWFsLWNvbW11bml0eS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29sb3ItcGlja2VyL2NvbG9yLXBpY2tlci1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxhQUFhLEVBQ2IsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsRUFDVCxhQUFhLEVBQ2IsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRixPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFjNUUsSUFBYSwrQkFBK0IsR0FBNUMsTUFBYSwrQkFBK0I7SUFnSTFDLFlBQ1UsV0FBd0IsRUFDeEIsTUFBaUIsRUFDSSxVQUFrQjtRQUZ2QyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ0ksZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQWhGekMsWUFBTyxHQUFXLEdBQUcsQ0FBQztRQVl0QixtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQVk1QixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUV2Qzs7V0FFRztRQUNPLHdCQUFtQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbkQ7O1dBRUc7UUFDSyxlQUFVLEdBQVcs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RUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckYsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFM0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQzdELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDMUYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzNGLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsQ0FBQyxFQUNELENBQUMsRUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FDakMsQ0FBQztRQUNGLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0YsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLHNCQUFzQixDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUUxQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0ssYUFBYTtRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQy9DLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRS9GLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEcsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUscUJBQXFCLENBQUMsQ0FBQztRQUNoRCxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUN4QyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUvRixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUN0RCxDQUFDLEVBQ0QsQ0FBQyxFQUNELENBQUMsRUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQzlCLENBQUM7UUFDRixRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUMxQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakcsQ0FBQztJQUVEOztPQUVHO0lBQ0ssVUFBVTtRQUNoQiwrREFBK0Q7UUFDL0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxZQUFZO2FBQzFELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM5RSxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMzQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDdkQ7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVMLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2xFLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztZQUMxQixLQUFLLE1BQU0sR0FBRyxJQUFJLFFBQVEsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUU7b0JBQ2hFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ2QsU0FBUztpQkFDVjtnQkFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzFCO1lBRUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUMsY0FBYyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUNuRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2xDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLE9BQU8sQ0FBQyxJQUFVO1FBQ3hCLElBQUksSUFBSSxFQUFFO1lBQ1IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEM7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN4QixPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMzQjtRQUVELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqRCxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDeEMsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUV4QyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLE9BQU8sQ0FBQyxJQUFTO1FBQ3ZCLE1BQU0sR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTlCLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDdkIsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDcEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDM0I7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sZUFBZSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0UsQ0FBQztJQUVEOzs7T0FHRztJQUNLLFdBQVcsQ0FBQyxJQUFVO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLENBQUM7U0FDckM7UUFFRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQy9ELENBQUM7SUFFRDs7O09BR0c7SUFDSyxVQUFVLENBQUMsSUFBVTtRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN2QjtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRDs7O09BR0c7SUFDSyxlQUFlLENBQUMsQ0FBQztRQUN2QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsdUJBQXVCLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztZQUN4RixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUM5RSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNLLFdBQVcsQ0FBQyxDQUFDO1FBQ25CLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTNFLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzlFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssWUFBWSxDQUFDLElBQVM7UUFDNUIsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2pEO0lBQ0gsQ0FBQztDQUNGLENBQUE7O1lBMVJ3QixXQUFXO1lBQ2hCLFNBQVM7eUNBQ3hCLE1BQU0sU0FBQyxXQUFXOztBQTlIQTtJQUFuQixTQUFTLENBQUMsT0FBTyxDQUFDOytEQUFvQjtBQUtiO0lBQTFCLFNBQVMsQ0FBQyxjQUFjLENBQUM7NERBQWlCO0FBTTNDO0lBREMsU0FBUyxDQUFDLGFBQWEsQ0FBQztrRUFHeEI7QUFPbUI7SUFBbkIsU0FBUyxDQUFDLE9BQU8sQ0FBQzsrREFBb0I7QUFRdkM7SUFEQyxTQUFTLENBQUMsZ0JBQWdCLENBQUM7a0VBRzNCO0FBT0Q7SUFEQyxLQUFLLENBQUMsUUFBUSxDQUFDOzZEQUdmO0FBYUQ7SUFEQyxLQUFLLEVBQUU7b0VBR1A7QUFVRDtJQURDLEtBQUssQ0FBQyxjQUFjLENBQUM7bUVBR3JCO0FBU1M7SUFBVCxNQUFNLEVBQUU7NEVBQTBDO0FBaEZ4QywrQkFBK0I7SUFQM0MsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDJCQUEyQjtRQUNyQyxndERBQXFEO1FBRXJELG1CQUFtQixFQUFFLEtBQUs7UUFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O0tBQ2hELENBQUM7SUFvSUcsV0FBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7R0FuSVgsK0JBQStCLENBMlozQztTQTNaWSwrQkFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRU1QVFlfQ09MT1IsIGNvZXJjZUhleGFDb2xvciwgaXNWYWxpZENvbG9yIH0gZnJvbSAnLi9jb2xvci1waWNrZXInO1xuXG5pbnRlcmZhY2UgQ29sb3JPcHRpb24ge1xuICB0eXBlOiBzdHJpbmc7XG4gIHZhbHVlOiBudW1iZXI7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21jYy1jb2xvci1waWNrZXItc2VsZWN0b3InLFxuICB0ZW1wbGF0ZVVybDogJy4vY29sb3ItcGlja2VyLXNlbGVjdG9yLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY29sb3ItcGlja2VyLXNlbGVjdG9yLmNvbXBvbmVudC5zY3NzJ10sXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWNjQ29sb3JQaWNrZXJTZWxlY3RvckNvbXBvbmVudFxuICBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogRWxlbWVuUmVmIG9mIHRoZSBtYWluIGNvbG9yXG4gICAqL1xuICAgQFZpZXdDaGlsZCgnYmxvY2snKSBfYmxvY2s6IEVsZW1lbnRSZWY7XG5cbiAgLyoqXG4gICAqIEVsZW1lblJlZiBvZiB0aGUgcG9pbnRlciBtYWluIGNvbG9yXG4gICAqL1xuICBAVmlld0NoaWxkKCdibG9ja1BvaW50ZXInKSBfYnA6IEVsZW1lbnRSZWY7XG5cbiAgLyoqXG4gICAqIENhbnZhcyBvZiB0aGUgYmxvY2tcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ2Jsb2NrQ2FudmFzJylcbiAgc2V0IGJsb2NrQ3Vyc29yKGVsOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5fYmMgPSBlbDtcbiAgfVxuICBwcml2YXRlIF9iYzogRWxlbWVudFJlZjtcbiAgcHJpdmF0ZSBfYmxvY2tDb250ZXh0OiBhbnk7XG5cbiAgLyoqXG4gICAqIEVsZW1lbnRSZWYgb2YgdGhlIGNvbG9yIGJhc2VcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ3N0cmlwJykgX3N0cmlwOiBFbGVtZW50UmVmO1xuICAvLyBob2xkIF9zdHJpcCBjb250ZXh0XG4gIHByaXZhdGUgX3N0cmlwQ29udGV4dDogYW55O1xuXG4gIC8qKlxuICAgKiBDb250YWluZXIgb2YgdGhlIHN0cmlwXG4gICAqL1xuICBAVmlld0NoaWxkKCdzdHJpcENvbnRhaW5lcicpXG4gIHNldCBzdHJpcEN1cnNvcihlbDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX3NjID0gZWw7XG4gIH1cbiAgcHJpdmF0ZSBfc2M6IEVsZW1lbnRSZWY7XG5cbiAgLyoqXG4gICAqIENoYW5nZSBoZWlnaHQgYmFzZSBvZiB0aGUgc2VsZWN0b3JcbiAgICovXG4gIEBJbnB1dCgnaGVpZ2h0JylcbiAgc2V0IGhlaWdodCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XG4gIH1cbiAgZ2V0IHNlbGVjdG9ySGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcbiAgfVxuICBnZXQgc3RyaXBIZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5faGVpZ2h0IC0gMTA7XG4gIH1cbiAgcHJpdmF0ZSBfaGVpZ2h0OiBudW1iZXIgPSAxNzA7XG5cbiAgLyoqXG4gICAqIFJlY2VpdmUgc2VsZWN0ZWQgY29sb3IgZnJvbSB0aGUgY29tcG9uZW50XG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgc2VsZWN0ZWRDb2xvcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZENvbG9yO1xuICB9XG4gIHNldCBzZWxlY3RlZENvbG9yKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9zZWxlY3RlZENvbG9yID0gdmFsdWUgfHwgdGhpcy5lbXB0eUNvbG9yO1xuICB9XG4gIHByaXZhdGUgX3NlbGVjdGVkQ29sb3I6IHN0cmluZyA9ICcnO1xuXG4gIC8qKlxuICAgKiBIaWRlIHRoZSBoZXhhZGVjaW1hbCBjb2xvciBmb3Jtcy5cbiAgICovXG4gIEBJbnB1dCgnaGlkZUhleEZvcm1zJylcbiAgZ2V0IGhpZGVIZXhGb3JtcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGlkZUhleEZvcm1zO1xuICB9XG4gIHNldCBoaWRlSGV4Rm9ybXModmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlSGV4Rm9ybXMgPSB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF9oaWRlSGV4Rm9ybXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogRW1pdCB1cGRhdGUgd2hlbiBhIGNvbG9yIGlzIHNlbGVjdGVkXG4gICAqL1xuICBAT3V0cHV0KCkgY2hhbmdlU2VsZWN0ZWRDb2xvciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogUkdCQSBjdXJyZW50IGNvbG9yXG4gICAqL1xuICBwcml2YXRlIF9yZ2JhQ29sb3I6IHN0cmluZyA9ICdyZ2JhKDI1NSwwLDAsMSknO1xuXG4gIC8qKlxuICAgKiBTdWJqZWN0IG9mIHRoZSBjdXJyZW50IHNlbGVjdGVkIGNvbG9yIGJ5IHRoZSB1c2VyXG4gICAqL1xuICBwcml2YXRlIF90bXBTZWxlY3RlZENvbG9yOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPjtcblxuICAvKipcbiAgICogU3Vic2NyaXB0aW9uIG9mIHRoZSB0bXBTZWxlY3RlZENvbG9yIE9ic2VydmFibGVcbiAgICovXG4gIHByaXZhdGUgX3RtcFNlbGVjdGVkQ29sb3JTdWI6IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogU3Vic2NyaXB0aW9uIG9mIHRoZSBoZXhGb3JtIHZhbHVlcyBjaGFuZ2VcbiAgICovXG4gIHByaXZhdGUgX2hleFZhbHVlc1N1YjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb24gb2YgdGhlIHJiZ0Zvcm0gdmFsdWVzIGNoYW5nZVxuICAgKi9cbiAgcHJpdmF0ZSBfcmdiVmFsdWVzU3ViOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBjb2xvciBvZiB0aGUgdGV4dFxuICAgKi9cbiAgdGV4dENsYXNzOiBzdHJpbmcgPSAnYmxhY2snO1xuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZSBpZiB0aGUgbW91c2UgYnV0dG9uIGlzIHByZXNzZWRcbiAgICovXG4gIF9pc1ByZXNzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogRm9ybSBvZiB0aGUgY29sb3IgaW4gaGV4YVxuICAgKi9cbiAgaGV4Rm9ybTogRm9ybUdyb3VwO1xuXG4gIC8qKlxuICAgKiBGb3JtIGFuZCBrZXlzIG9mIHRoZSBmaWVsZHMgaW4gUkdCXG4gICAqL1xuICByZ2JLZXlzID0gWydSJywgJ0cnLCAnQiddO1xuICByZ2JGb3JtOiBGb3JtR3JvdXA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSByZW5kZXI6IFJlbmRlcmVyMixcbiAgICBASW5qZWN0KEVNUFRZX0NPTE9SKSBwcml2YXRlIGVtcHR5Q29sb3I6IHN0cmluZ1xuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fdG1wU2VsZWN0ZWRDb2xvciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPih0aGlzLl9zZWxlY3RlZENvbG9yKTtcbiAgICB0aGlzLl90bXBTZWxlY3RlZENvbG9yU3ViID0gdGhpcy5fdG1wU2VsZWN0ZWRDb2xvci5zdWJzY3JpYmUoY29sb3IgPT4ge1xuICAgICAgaWYgKGNvbG9yICE9PSB0aGlzLl9zZWxlY3RlZENvbG9yICYmIGlzVmFsaWRDb2xvcihjb2xvcikpIHtcbiAgICAgICAgaWYgKHRoaXMuaGV4Rm9ybS5nZXQoJ2hleENvZGUnKS52YWx1ZSAhPT0gY29sb3IpIHtcbiAgICAgICAgICB0aGlzLmhleEZvcm0uc2V0VmFsdWUoeyBoZXhDb2RlOiBjb2xvciB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoYW5nZVNlbGVjdGVkQ29sb3IuZW1pdChjb2VyY2VIZXhhQ29sb3IoY29sb3IpIHx8IHRoaXMuZW1wdHlDb2xvcik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBoZXggZm9ybVxuICAgIHRoaXMuaGV4Rm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgaGV4Q29kZTogW3RoaXMuc2VsZWN0ZWRDb2xvciwgW1ZhbGlkYXRvcnMubWluTGVuZ3RoKDcpLCBWYWxpZGF0b3JzLm1heExlbmd0aCg3KV1dLFxuICAgIH0pO1xuXG4gICAgLy8gcmdiIGR5bmFtaWMgZm9ybVxuICAgIGNvbnN0IHJnYkdyb3VwOiBhbnkgPSB7fTtcbiAgICBjb25zdCByZ2JWYWx1ZTogbnVtYmVyW10gPSB0aGlzLl9nZXRSR0IoKTtcbiAgICB0aGlzLnJnYktleXMuZm9yRWFjaChcbiAgICAgIChrZXksIGluZGV4KSA9PlxuICAgICAgICAocmdiR3JvdXBba2V5XSA9IG5ldyBGb3JtQ29udHJvbChyZ2JWYWx1ZVtpbmRleF0sIHtcbiAgICAgICAgICB2YWxpZGF0b3JzOiBbXG4gICAgICAgICAgICBWYWxpZGF0b3JzLm1pbigwKSxcbiAgICAgICAgICAgIFZhbGlkYXRvcnMubWF4KDI1NiksXG4gICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICAgICAgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMyksXG4gICAgICAgICAgXSxcbiAgICAgICAgICB1cGRhdGVPbjogJ2JsdXInLFxuICAgICAgICB9KSlcbiAgICApO1xuICAgIHRoaXMucmdiRm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAocmdiR3JvdXApO1xuXG4gICAgLy8gd2F0Y2ggY2hhbmdlcyBvbiBmb3Jtc1xuICAgIHRoaXMuX29uQ2hhbmdlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBSR0IsIFJHQkEgYW5kIEdyYWRpZW50IHdoZW4gc2VsZWN0ZWRDb2xvciBjaGFuZ2UgYW5kXG4gICAqIHRoZSBtb3VzZSBidXR0b24gaXMgcHJlc3NlZFxuICAgKiBAcGFyYW0gY2hhbmdlcyBTaW1wbGVDaGFuZ2VzXG4gICAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCdzZWxlY3RlZENvbG9yJyBpbiBjaGFuZ2VzICYmIGNoYW5nZXNbJ3NlbGVjdGVkQ29sb3InXS5jdXJyZW50VmFsdWUgIT09IHRoaXMuZW1wdHlDb2xvcikge1xuICAgICAgaWYgKCF0aGlzLl9pc1ByZXNzZWQpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlUkdCKCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVJHQkEoKTtcbiAgICAgICAgaWYgKHRoaXMuX2Jsb2NrQ29udGV4dCkge1xuICAgICAgICAgIHRoaXMuX2ZpbGxHcmFkaWVudCgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJnYiA9IHRoaXMuX2dldFJHQigpO1xuICAgICAgY29uc3QgbyA9IE1hdGgucm91bmQoKHJnYlswXSAqIDI5OSArIHJnYlsxXSAqIDU4NyArIHJnYlsyXSAqIDExNCkgLyAxMDAwKTtcbiAgICAgIHRoaXMudGV4dENsYXNzID0gbyA+IDEyNSA/ICdibGFjaycgOiAnd2hpdGUnO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95IGFsbCBzdWJzY3JpcHRpb25zXG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fdG1wU2VsZWN0ZWRDb2xvclN1YiAmJiAhdGhpcy5fdG1wU2VsZWN0ZWRDb2xvclN1Yi5jbG9zZWQpIHtcbiAgICAgIHRoaXMuX3RtcFNlbGVjdGVkQ29sb3JTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2hleFZhbHVlc1N1YiAmJiAhdGhpcy5faGV4VmFsdWVzU3ViLmNsb3NlZCkge1xuICAgICAgdGhpcy5faGV4VmFsdWVzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9yZ2JWYWx1ZXNTdWIgJiYgIXRoaXMuX3JnYlZhbHVlc1N1Yi5jbG9zZWQpIHtcbiAgICAgIHRoaXMuX3JnYlZhbHVlc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnJlbmRlci5saXN0ZW4odGhpcy5fYmxvY2submF0aXZlRWxlbWVudCwgJ21vdXNlZG93bicsIGUgPT4ge1xuICAgICAgdGhpcy5faXNQcmVzc2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMuY2hhbmdlQ29sb3IoZSk7XG4gICAgfSk7XG4gICAgdGhpcy5yZW5kZXIubGlzdGVuKHRoaXMuX2Jsb2NrLm5hdGl2ZUVsZW1lbnQsICdtb3VzZXVwJywgKCkgPT4gKHRoaXMuX2lzUHJlc3NlZCA9IGZhbHNlKSk7XG4gICAgdGhpcy5yZW5kZXIubGlzdGVuKHRoaXMuX2Jsb2NrLm5hdGl2ZUVsZW1lbnQsICdtb3VzZW91dCcsICgpID0+ICh0aGlzLl9pc1ByZXNzZWQgPSBmYWxzZSkpO1xuICAgIHRoaXMucmVuZGVyLmxpc3Rlbih0aGlzLl9ibG9jay5uYXRpdmVFbGVtZW50LCAnbW91c2Vtb3ZlJywgZSA9PiB0aGlzLmNoYW5nZUNvbG9yKGUpKTtcbiAgICB0aGlzLl9ibG9ja0NvbnRleHQgPSB0aGlzLl9iYy5uYXRpdmVFbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy5fYmxvY2tDb250ZXh0LnJlY3QoMCwgMCwgdGhpcy5fYmMubmF0aXZlRWxlbWVudC53aWR0aCwgdGhpcy5fYmMubmF0aXZlRWxlbWVudC5oZWlnaHQpO1xuXG4gICAgdGhpcy5yZW5kZXIubGlzdGVuKHRoaXMuX3N0cmlwLm5hdGl2ZUVsZW1lbnQsICdtb3VzZWRvd24nLCBlID0+IHtcbiAgICAgIHRoaXMuX2lzUHJlc3NlZCA9IHRydWU7XG4gICAgICB0aGlzLmNoYW5nZUJhc2VDb2xvcihlKTtcbiAgICB9KTtcbiAgICB0aGlzLnJlbmRlci5saXN0ZW4odGhpcy5fc3RyaXAubmF0aXZlRWxlbWVudCwgJ21vdXNldXAnLCAoKSA9PiAodGhpcy5faXNQcmVzc2VkID0gZmFsc2UpKTtcbiAgICB0aGlzLnJlbmRlci5saXN0ZW4odGhpcy5fc3RyaXAubmF0aXZlRWxlbWVudCwgJ21vdXNlb3V0JywgKCkgPT4gKHRoaXMuX2lzUHJlc3NlZCA9IGZhbHNlKSk7XG4gICAgdGhpcy5yZW5kZXIubGlzdGVuKHRoaXMuX3N0cmlwLm5hdGl2ZUVsZW1lbnQsICdtb3VzZW1vdmUnLCBlID0+IHRoaXMuY2hhbmdlQmFzZUNvbG9yKGUpKTtcbiAgICB0aGlzLl9zdHJpcENvbnRleHQgPSB0aGlzLl9zdHJpcC5uYXRpdmVFbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy5fc3RyaXBDb250ZXh0LnJlY3QoXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIHRoaXMuX3N0cmlwLm5hdGl2ZUVsZW1lbnQud2lkdGgsXG4gICAgICB0aGlzLl9zdHJpcC5uYXRpdmVFbGVtZW50LmhlaWdodFxuICAgICk7XG4gICAgY29uc3QgZ3JkMSA9IHRoaXMuX3N0cmlwQ29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCAwLCB0aGlzLl9iYy5uYXRpdmVFbGVtZW50LmhlaWdodCk7XG4gICAgZ3JkMS5hZGRDb2xvclN0b3AoMCwgJ3JnYmEoMjU1LCAwLCAwLCAxKScpO1xuICAgIGdyZDEuYWRkQ29sb3JTdG9wKDAuMTcsICdyZ2JhKDI1NSwgMjU1LCAwLCAxKScpO1xuICAgIGdyZDEuYWRkQ29sb3JTdG9wKDAuMzQsICdyZ2JhKDAsIDI1NSwgMCwgMSknKTtcbiAgICBncmQxLmFkZENvbG9yU3RvcCgwLjUxLCAncmdiYSgwLCAyNTUsIDI1NSwgMSknKTtcbiAgICBncmQxLmFkZENvbG9yU3RvcCgwLjY4LCAncmdiYSgwLCAwLCAyNTUsIDEpJyk7XG4gICAgZ3JkMS5hZGRDb2xvclN0b3AoMC44NSwgJ3JnYmEoMjU1LCAwLCAyNTUsIDEpJyk7XG4gICAgZ3JkMS5hZGRDb2xvclN0b3AoMSwgJ3JnYmEoMjU1LCAwLCAwLCAxKScpO1xuICAgIHRoaXMuX3N0cmlwQ29udGV4dC5maWxsU3R5bGUgPSBncmQxO1xuICAgIHRoaXMuX3N0cmlwQ29udGV4dC5maWxsKCk7XG5cbiAgICB0aGlzLl9maWxsR3JhZGllbnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBjb2xvcnMgYmFzZWQgb24gdGhlIFJHQkEgY29sb3JcbiAgICovXG4gIHByaXZhdGUgX2ZpbGxHcmFkaWVudCgpOiB2b2lkIHtcbiAgICB0aGlzLl9ibG9ja0NvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5fcmdiYUNvbG9yO1xuICAgIHRoaXMuX2Jsb2NrQ29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLl9iYy5uYXRpdmVFbGVtZW50LndpZHRoLCB0aGlzLl9iYy5uYXRpdmVFbGVtZW50LmhlaWdodCk7XG5cbiAgICBjb25zdCBncmRXaGl0ZSA9IHRoaXMuX3N0cmlwQ29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCB0aGlzLl9iYy5uYXRpdmVFbGVtZW50LndpZHRoLCAwKTtcbiAgICBncmRXaGl0ZS5hZGRDb2xvclN0b3AoMCwgJ3JnYmEoMjU1LDI1NSwyNTUsMSknKTtcbiAgICBncmRXaGl0ZS5hZGRDb2xvclN0b3AoMSwgJ3JnYmEoMjU1LDI1NSwyNTUsMCknKTtcbiAgICB0aGlzLl9ibG9ja0NvbnRleHQuZmlsbFN0eWxlID0gZ3JkV2hpdGU7XG4gICAgdGhpcy5fYmxvY2tDb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMuX2JjLm5hdGl2ZUVsZW1lbnQud2lkdGgsIHRoaXMuX2JjLm5hdGl2ZUVsZW1lbnQuaGVpZ2h0KTtcblxuICAgIGNvbnN0IGdyZEJsYWNrID0gdGhpcy5fc3RyaXBDb250ZXh0LmNyZWF0ZUxpbmVhckdyYWRpZW50KFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgdGhpcy5fYmMubmF0aXZlRWxlbWVudC5oZWlnaHRcbiAgICApO1xuICAgIGdyZEJsYWNrLmFkZENvbG9yU3RvcCgwLCAncmdiYSgwLDAsMCwwKScpO1xuICAgIGdyZEJsYWNrLmFkZENvbG9yU3RvcCgxLCAncmdiYSgwLDAsMCwxKScpO1xuICAgIHRoaXMuX2Jsb2NrQ29udGV4dC5maWxsU3R5bGUgPSBncmRCbGFjaztcbiAgICB0aGlzLl9ibG9ja0NvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5fYmMubmF0aXZlRWxlbWVudC53aWR0aCwgdGhpcy5fYmMubmF0aXZlRWxlbWVudC5oZWlnaHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdhdGNoIGNoYW5nZSBvbiBmb3Jtc1xuICAgKi9cbiAgcHJpdmF0ZSBfb25DaGFuZ2VzKCkge1xuICAgIC8vIHZhbGlkYXRlIGRpZ2l0ZWQgY29kZSBhbmQgdXBkYXRlIHdoZW4gZGlnaXRhdGlvbiBpcyBmaW5pc2hlZFxuICAgIHRoaXMuX2hleFZhbHVlc1N1YiA9IHRoaXMuaGV4Rm9ybS5nZXQoJ2hleENvZGUnKS52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKG1hcChjb2xvciA9PiBjb2xvciAhPT0gdGhpcy5lbXB0eUNvbG9yID8gY29lcmNlSGV4YUNvbG9yKGNvbG9yKSA6IGNvbG9yKSlcbiAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuX2lzUHJlc3NlZCAmJiBpc1ZhbGlkQ29sb3IodmFsdWUpKSB7XG4gICAgICAgICAgdGhpcy5fdG1wU2VsZWN0ZWRDb2xvci5uZXh0KHZhbHVlIHx8IHRoaXMuZW1wdHlDb2xvcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgdGhpcy5fcmdiVmFsdWVzU3ViID0gdGhpcy5yZ2JGb3JtLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoY29udHJvbHMgPT4ge1xuICAgICAgY29uc3QgZGF0YTogc3RyaW5nW10gPSBbXTtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGNvbnRyb2xzKSB7XG4gICAgICAgIGlmICghY29udHJvbHNba2V5XSAmJiBjb250cm9sc1trZXldICE9PSAwIHx8IGNvbnRyb2xzW2tleV0gPiAyNTUpIHtcbiAgICAgICAgICBkYXRhLnB1c2goJycpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0YS5wdXNoKGNvbnRyb2xzW2tleV0pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBoZXggPSB0aGlzLl9nZXRIZXgoZGF0YSk7XG4gICAgICBpZiAoaGV4ICE9PSB0aGlzLl9zZWxlY3RlZENvbG9yICYmIGhleC5sZW5ndGggPT09IDcpIHtcbiAgICAgICAgdGhpcy5fdG1wU2VsZWN0ZWRDb2xvci5uZXh0KGhleCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBIRVgvY2FudmFzIHZhbHVlIHRvIHJnYlxuICAgKiBAcGFyYW0gZGF0YSBhbnlcbiAgICogQHJldHVybnMgbnVtYmVyW11cbiAgICovXG4gIHByaXZhdGUgX2dldFJHQihkYXRhPzogYW55KTogbnVtYmVyW10ge1xuICAgIGlmIChkYXRhKSB7XG4gICAgICByZXR1cm4gW2RhdGFbMF0sIGRhdGFbMV0sIGRhdGFbMl1dO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fc2VsZWN0ZWRDb2xvcikge1xuICAgICAgcmV0dXJuIFtudWxsLCBudWxsLCBudWxsXTtcbiAgICB9XG5cbiAgICBjb25zdCBoZXggPSB0aGlzLl9zZWxlY3RlZENvbG9yLnJlcGxhY2UoJyMnLCAnJyk7XG4gICAgY29uc3QgciA9IHBhcnNlSW50KGhleC5zbGljZSgwLCAyKSwgMTYpO1xuICAgIGNvbnN0IGcgPSBwYXJzZUludChoZXguc2xpY2UoMiwgNCksIDE2KTtcbiAgICBjb25zdCBiID0gcGFyc2VJbnQoaGV4LnNsaWNlKDQsIDYpLCAxNik7XG5cbiAgICByZXR1cm4gW3IsIGcsIGJdO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgUkdCIHZhbHVlIHRvIEhFWFxuICAgKiBAcGFyYW0gZGF0YSBhbnlcbiAgICogQHJldHVybnMgc3RyaW5nXG4gICAqL1xuICBwcml2YXRlIF9nZXRIZXgoZGF0YTogYW55KTogc3RyaW5nIHtcbiAgICBjb25zdCBoZXggPSBuZXcgQXJyYXkoMyk7XG4gICAgaGV4WzBdID0gZGF0YVswXS50b1N0cmluZygxNik7XG4gICAgaGV4WzFdID0gZGF0YVsxXS50b1N0cmluZygxNik7XG4gICAgaGV4WzJdID0gZGF0YVsyXS50b1N0cmluZygxNik7XG5cbiAgICBoZXguZm9yRWFjaCgodmFsLCBrZXkpID0+IHtcbiAgICAgIGlmICh2YWwubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGhleFtrZXldID0gJzAnICsgaGV4W2tleV07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY29lcmNlSGV4YUNvbG9yKGAke2hleFswXX0ke2hleFsxXX0ke2hleFsyXX1gKSB8fCB0aGlzLmVtcHR5Q29sb3I7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIFJHQkEgY29sb3JcbiAgICogQHBhcmFtIGRhdGEgYW55XG4gICAqL1xuICBwcml2YXRlIF91cGRhdGVSR0JBKGRhdGE/OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX3NlbGVjdGVkQ29sb3IgJiYgIWRhdGEpIHtcbiAgICAgIHRoaXMuX3JnYmFDb2xvciA9ICdyZ2JhKDI1NSwwLDAsMSknO1xuICAgIH1cblxuICAgIGNvbnN0IHJnYiA9IHRoaXMuX2dldFJHQihkYXRhKTtcbiAgICB0aGlzLl9yZ2JhQ29sb3IgPSBgcmdiYSgke3JnYlswXX0sICR7cmdiWzFdfSwgJHtyZ2JbMl19LCAxKWA7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIFJHQiBmb3JtXG4gICAqIEBwYXJhbSBkYXRhIGFueVxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlUkdCKGRhdGE/OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucmdiRm9ybSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghZGF0YSkge1xuICAgICAgZGF0YSA9IHRoaXMuX2dldFJHQigpO1xuICAgIH1cblxuICAgIHRoaXMucmdiRm9ybS5zZXRWYWx1ZSh7IFI6IGRhdGFbMF0sIEc6IGRhdGFbMV0sIEI6IGRhdGFbMl0gfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHNlbGVjdGVkIGJhc2UgY29sb3IgZnJvbSB0aGUgY2FudmFzXG4gICAqIEBwYXJhbSBlIE1vdXNlRXZlbnRcbiAgICovXG4gIHByaXZhdGUgY2hhbmdlQmFzZUNvbG9yKGUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faXNQcmVzc2VkKSB7XG4gICAgICB0aGlzLnJlbmRlci5zZXRTdHlsZSh0aGlzLl9zYy5uYXRpdmVFbGVtZW50LCAnYmFja2dyb3VuZC1wb3NpdGlvbi15JywgYCR7ZS5vZmZzZXRZfXB4YCk7XG4gICAgICBjb25zdCBkYXRhID0gdGhpcy5fc3RyaXBDb250ZXh0LmdldEltYWdlRGF0YShlLm9mZnNldFgsIGUub2Zmc2V0WSwgMSwgMSkuZGF0YTtcbiAgICAgIHRoaXMuX3VwZGF0ZVJHQkEoZGF0YSk7XG4gICAgICB0aGlzLl9maWxsR3JhZGllbnQoKTtcbiAgICAgIHRoaXMudXBkYXRlVmFsdWVzKGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgc2VsZWN0ZWQgY29sb3IgZnJvbSB0aGUgY2FudmFzXG4gICAqIEBwYXJhbSBlIE1vdXNlRXZlbnRcbiAgICovXG4gIHByaXZhdGUgY2hhbmdlQ29sb3IoZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9pc1ByZXNzZWQpIHtcbiAgICAgIHRoaXMucmVuZGVyLnNldFN0eWxlKHRoaXMuX2JwLm5hdGl2ZUVsZW1lbnQsICd0b3AnLCBgJHtlLm9mZnNldFkgLSA1fXB4YCk7XG4gICAgICB0aGlzLnJlbmRlci5zZXRTdHlsZSh0aGlzLl9icC5uYXRpdmVFbGVtZW50LCAnbGVmdCcsIGAke2Uub2Zmc2V0WCAtIDV9cHhgKTtcblxuICAgICAgY29uc3QgZGF0YSA9IHRoaXMuX2Jsb2NrQ29udGV4dC5nZXRJbWFnZURhdGEoZS5vZmZzZXRYLCBlLm9mZnNldFksIDEsIDEpLmRhdGE7XG4gICAgICB0aGlzLnVwZGF0ZVZhbHVlcyhkYXRhKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRW1pdCB1cGRhdGUgZnJvbSB0aGUgc2VsZWN0ZWQgY29sb3JcbiAgICogQHBhcmFtIGRhdGEgYW55XG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZVZhbHVlcyhkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoZGF0YSkge1xuICAgICAgdGhpcy5fdXBkYXRlUkdCKGRhdGEpO1xuICAgICAgdGhpcy5fdG1wU2VsZWN0ZWRDb2xvci5uZXh0KHRoaXMuX2dldEhleChkYXRhKSk7XG4gICAgfVxuICB9XG59XG4iXX0=