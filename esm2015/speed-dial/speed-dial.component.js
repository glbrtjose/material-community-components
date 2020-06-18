import { __decorate } from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { SPIN_ANIMATION } from './animations';
import { MccSpeedDialActionsComponent } from './speed-dial-actions.component';
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
export { MccSpeedDialComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlZWQtZGlhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXRlcmlhbC1jb21tdW5pdHktY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNwZWVkLWRpYWwvc3BlZWQtZGlhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDOUgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUU5QyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQVE5RSxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQXFEaEM7UUF0Q1EsWUFBTyxHQUFZLEtBQUssQ0FBQztRQVF6QixXQUFNLEdBQVksS0FBSyxDQUFDO1FBV3hCLFVBQUssR0FBWSxJQUFJLENBQUM7UUFZdEIsZUFBVSxHQUFjLElBQUksQ0FBQztRQUVyQzs7V0FFRztRQUNPLG9CQUFlLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7SUFFL0QsQ0FBQztJQS9DakI7O09BRUc7SUFDWSxJQUFJLE1BQU0sQ0FBQyxJQUFhO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUNELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBR0Q7O09BRUc7SUFDa0IsSUFBSSxLQUFLLENBQUMsS0FBYztRQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFHRDs7T0FFRztJQUNNLElBQUksSUFBSSxDQUFDLElBQWE7UUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDcEIsQ0FBQztJQUNELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBR0Q7OztPQUdHO0lBQ00sSUFBSSxTQUFTLENBQUMsU0FBb0I7UUFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7SUFDOUIsQ0FBQztJQUNELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBVUQ7OztPQUdHO0lBQ0ssZ0JBQWdCO1FBQ3RCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDcEM7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNwQztJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILGVBQWU7UUFDYixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxRQUFRLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUFFO1lBQ3hFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILFVBQVU7UUFDUixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNmO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILFNBQVM7UUFDUCxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUMvQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDZjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU07UUFDSixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUU3QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUV4QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQztDQUNGLENBQUE7QUE3RzZDO0lBQTNDLFlBQVksQ0FBQyw0QkFBNEIsQ0FBQztzREFBdUM7QUFLbkU7SUFBZCxLQUFLLENBQUMsTUFBTSxDQUFDO21EQUViO0FBU29CO0lBQXBCLEtBQUssQ0FBQyxZQUFZLENBQUM7a0RBRW5CO0FBTVE7SUFBUixLQUFLLEVBQUU7aURBRVA7QUFVUTtJQUFSLEtBQUssRUFBRTtzREFFUDtBQVNTO0lBQVQsTUFBTSxFQUFFOzhEQUFzRTtBQW5EcEUscUJBQXFCO0lBTmpDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsa1pBQTBDO1FBRTFDLFVBQVUsRUFBRSxDQUFDLGNBQWMsQ0FBQzs7S0FDN0IsQ0FBQztHQUNXLHFCQUFxQixDQWlIakM7U0FqSFkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU1BJTl9BTklNQVRJT04gfSBmcm9tICcuL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgRElSRUNUSU9OIH0gZnJvbSAnLi9kaXJlY3Rpb25zJztcbmltcG9ydCB7IE1jY1NwZWVkRGlhbEFjdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL3NwZWVkLWRpYWwtYWN0aW9ucy5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtY2Mtc3BlZWQtZGlhbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zcGVlZC1kaWFsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc3BlZWQtZGlhbC5jb21wb25lbnQuc2NzcyddLFxuICBhbmltYXRpb25zOiBbU1BJTl9BTklNQVRJT05dLFxufSlcbmV4cG9ydCBjbGFzcyBNY2NTcGVlZERpYWxDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuICAvKipcbiAgICogSG9sZCBzcGVlZC1kaWFsLWFjdGlvbnMgY29tcG9uZW50IGluc2lkZSB0aGlzIGNvbXBvbmVudFxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChNY2NTcGVlZERpYWxBY3Rpb25zQ29tcG9uZW50KSBhY3Rpb25zOiBNY2NTcGVlZERpYWxBY3Rpb25zQ29tcG9uZW50O1xuXG4gIC8qKlxuICAgKiBTZXQgaW5pdGlhbCAnb3Blbicgc3RhdGVcbiAgICovXG4gIEBJbnB1dCgnb3BlbicpIHNldCBpc09wZW4ob3BlbjogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzT3BlbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShvcGVuKTtcbiAgfVxuICBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc09wZW47XG4gIH1cbiAgcHJpdmF0ZSBfaXNPcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFdoZW4gZW5hYmxlZCwgaGFuZGxlIG9wZW4vY2xvc2Ugc3RhdGUgb24gbW91c2UgaG92ZXJcbiAgICovXG4gIEBJbnB1dCgnbW91c2VIb3ZlcicpIHNldCBob3Zlcihob3ZlcjogYm9vbGVhbikge1xuICAgIHRoaXMuX2hvdmVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGhvdmVyKTtcbiAgfVxuICBwcml2YXRlIF9ob3ZlcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBFbmFibGUvZGlzYWJsZSBzcGluIGFuaW1hdGlvbiB3aGVuIGJ1dHRvbiBpcyBjbGlja2VkIG9yIGhvdmVyZWRcbiAgICovXG4gIEBJbnB1dCgpIHNldCBzcGluKHNwaW46IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zcGluID0gc3BpbjtcbiAgfVxuICBnZXQgc3BpbigpIHtcbiAgICByZXR1cm4gdGhpcy5fc3BpbjtcbiAgfVxuICBwcml2YXRlIF9zcGluOiBib29sZWFuID0gdHJ1ZTtcblxuICAvKipcbiAgICogRGVmaW5lIHRoZSBkaXJlY3Rpb24gb2YgdGhlIGFjdGlvbnMgYnV0dG9uXG4gICAqIERpcmVjdGlvbnMgYXZhaWxhYmxlIGFyZTogdXAgfCBkb3duIHwgbGVmdCB8IHJpZ2h0XG4gICAqL1xuICBASW5wdXQoKSBzZXQgZGlyZWN0aW9uKGRpcmVjdGlvbjogRElSRUNUSU9OKSB7XG4gICAgdGhpcy5fZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICB9XG4gIGdldCBkaXJlY3Rpb24oKTogRElSRUNUSU9OIHtcbiAgICByZXR1cm4gdGhpcy5fZGlyZWN0aW9uO1xuICB9XG4gIHByaXZhdGUgX2RpcmVjdGlvbjogRElSRUNUSU9OID0gJ3VwJztcblxuICAvKipcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIG9wZW4gc3RhdGUgY2hhbmdlXG4gICAqL1xuICBAT3V0cHV0KCkgb3BlblN0YXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICAvKipcbiAgICogQ2FsbCBmYWIgc3BlZWQgZGlhbCBhY3Rpb25zIGZ1bmN0aW9ucyB0byBjaGFuZ2UgdGhlXG4gICAqIHZpc2liaWxpdHkgb2YgdGhlIGJ1dHRvbnNcbiAgICovXG4gIHByaXZhdGUgX3NldEFjdGlvbnNTdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5faXNPcGVuKSB7XG4gICAgICB0aGlzLmFjdGlvbnMuc2hvdyh0aGlzLl9kaXJlY3Rpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFjdGlvbnMuaGlkZSh0aGlzLl9kaXJlY3Rpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgaW5pdGlhbCBzdGF0ZSB0byB0aGUgYWN0aW9uIGJ1dHRvbnMgaW5zaWRlIHNwZWVkLWRpYWwtYWN0aW9uc1xuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX3NldEFjdGlvbnNTdGF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFxuICAgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICgnaXNPcGVuJyBpbiBjaGFuZ2VzICYmIGNoYW5nZXNbJ2lzT3BlbiddLnByZXZpb3VzVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fc2V0QWN0aW9uc1N0YXRlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gbW91c2VIb3ZlciBpcyBlbmFibGVkIGFuZCBzdGF0ZSBpcyBjbG9zZWRcbiAgICogY2FsbHMgdG9nZ2xlIHRvIG9wZW4gdGhlIGFjdGlvbnNcbiAgICovXG4gIGhvdmVyU3RhcnQoKSB7XG4gICAgaWYgKHRoaXMuX2hvdmVyICYmICF0aGlzLl9pc09wZW4pIHtcbiAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gbW91c2VIb3ZlciBpcyBlbmFibGVkIGFuZCBzdGF0ZSBpcyBvcGVuXG4gICAqIGNhbGxzIHRvZ2dsZSB0byBjbG9zZSB0aGUgYWN0aW9uc1xuICAgKi9cbiAgaG92ZXJTdG9wKCkge1xuICAgIGlmICh0aGlzLl9ob3ZlciAmJiB0aGlzLl9pc09wZW4pIHtcbiAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZSB0aGUgb3BlbiBzdGF0ZVxuICAgKi9cbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMuX2lzT3BlbiA9ICF0aGlzLl9pc09wZW47XG5cbiAgICB0aGlzLl9zZXRBY3Rpb25zU3RhdGUoKTtcblxuICAgIHRoaXMub3BlblN0YXRlQ2hhbmdlLmVtaXQodGhpcy5faXNPcGVuKTtcbiAgfVxufVxuIl19