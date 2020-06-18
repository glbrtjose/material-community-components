import { __decorate } from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { SPIN_ANIMATION } from './animations';
import { MccSpeedDialActionsComponent } from './speed-dial-actions.component';
var MccSpeedDialComponent = /** @class */ (function () {
    function MccSpeedDialComponent() {
        this._isOpen = false;
        this._hover = false;
        this._spin = true;
        this._direction = 'up';
        /**
         * Event emitted when open state change
         */
        this.openStateChange = new EventEmitter();
    }
    Object.defineProperty(MccSpeedDialComponent.prototype, "isOpen", {
        get: function () {
            return this._isOpen;
        },
        /**
         * Set initial 'open' state
         */
        set: function (open) {
            this._isOpen = coerceBooleanProperty(open);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MccSpeedDialComponent.prototype, "hover", {
        /**
         * When enabled, handle open/close state on mouse hover
         */
        set: function (hover) {
            this._hover = coerceBooleanProperty(hover);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MccSpeedDialComponent.prototype, "spin", {
        get: function () {
            return this._spin;
        },
        /**
         * Enable/disable spin animation when button is clicked or hovered
         */
        set: function (spin) {
            this._spin = spin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MccSpeedDialComponent.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        /**
         * Define the direction of the actions button
         * Directions available are: up | down | left | right
         */
        set: function (direction) {
            this._direction = direction;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Call fab speed dial actions functions to change the
     * visibility of the buttons
     */
    MccSpeedDialComponent.prototype._setActionsState = function () {
        if (this._isOpen) {
            this.actions.show(this._direction);
        }
        else {
            this.actions.hide(this._direction);
        }
    };
    /**
     * Set initial state to the action buttons inside speed-dial-actions
     */
    MccSpeedDialComponent.prototype.ngAfterViewInit = function () {
        this._setActionsState();
    };
    /**
     *
     */
    MccSpeedDialComponent.prototype.ngOnChanges = function (changes) {
        if ('isOpen' in changes && changes['isOpen'].previousValue !== undefined) {
            this._setActionsState();
        }
    };
    /**
     * When mouseHover is enabled and state is closed
     * calls toggle to open the actions
     */
    MccSpeedDialComponent.prototype.hoverStart = function () {
        if (this._hover && !this._isOpen) {
            this.toggle();
        }
    };
    /**
     * When mouseHover is enabled and state is open
     * calls toggle to close the actions
     */
    MccSpeedDialComponent.prototype.hoverStop = function () {
        if (this._hover && this._isOpen) {
            this.toggle();
        }
    };
    /**
     * Change the open state
     */
    MccSpeedDialComponent.prototype.toggle = function () {
        this._isOpen = !this._isOpen;
        this._setActionsState();
        this.openStateChange.emit(this._isOpen);
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
    return MccSpeedDialComponent;
}());
export { MccSpeedDialComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlZWQtZGlhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXRlcmlhbC1jb21tdW5pdHktY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNwZWVkLWRpYWwvc3BlZWQtZGlhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDOUgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUU5QyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQVE5RTtJQXFERTtRQXRDUSxZQUFPLEdBQVksS0FBSyxDQUFDO1FBUXpCLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFXeEIsVUFBSyxHQUFZLElBQUksQ0FBQztRQVl0QixlQUFVLEdBQWMsSUFBSSxDQUFDO1FBRXJDOztXQUVHO1FBQ08sb0JBQWUsR0FBMEIsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQUUvRCxDQUFDO0lBNUNGLHNCQUFJLHlDQUFNO2FBR3pCO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENBQUM7UUFSRDs7V0FFRzthQUNZLFVBQVcsSUFBYTtZQUNyQyxJQUFJLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLENBQUM7OztPQUFBO0lBU29CLHNCQUFJLHdDQUFLO1FBSDlCOztXQUVHO2FBQ2tCLFVBQVUsS0FBYztZQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLENBQUM7OztPQUFBO0lBTVEsc0JBQUksdUNBQUk7YUFHakI7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQztRQVJEOztXQUVHO2FBQ00sVUFBUyxJQUFhO1lBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLENBQUM7OztPQUFBO0lBVVEsc0JBQUksNENBQVM7YUFHdEI7WUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDekIsQ0FBQztRQVREOzs7V0FHRzthQUNNLFVBQWMsU0FBb0I7WUFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFhRDs7O09BR0c7SUFDSyxnREFBZ0IsR0FBeEI7UUFDRSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3BDO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDcEM7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCwrQ0FBZSxHQUFmO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsMkNBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksUUFBUSxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxLQUFLLFNBQVMsRUFBRTtZQUN4RSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUN6QjtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCwwQ0FBVSxHQUFWO1FBQ0UsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDZjtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCx5Q0FBUyxHQUFUO1FBQ0UsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2Y7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxzQ0FBTSxHQUFOO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFFN0IsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUE1RzJDO1FBQTNDLFlBQVksQ0FBQyw0QkFBNEIsQ0FBQzswREFBdUM7SUFLbkU7UUFBZCxLQUFLLENBQUMsTUFBTSxDQUFDO3VEQUViO0lBU29CO1FBQXBCLEtBQUssQ0FBQyxZQUFZLENBQUM7c0RBRW5CO0lBTVE7UUFBUixLQUFLLEVBQUU7cURBRVA7SUFVUTtRQUFSLEtBQUssRUFBRTswREFFUDtJQVNTO1FBQVQsTUFBTSxFQUFFO2tFQUFzRTtJQW5EcEUscUJBQXFCO1FBTmpDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsa1pBQTBDO1lBRTFDLFVBQVUsRUFBRSxDQUFDLGNBQWMsQ0FBQzs7U0FDN0IsQ0FBQztPQUNXLHFCQUFxQixDQWlIakM7SUFBRCw0QkFBQztDQUFBLEFBakhELElBaUhDO1NBakhZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNQSU5fQU5JTUFUSU9OIH0gZnJvbSAnLi9hbmltYXRpb25zJztcbmltcG9ydCB7IERJUkVDVElPTiB9IGZyb20gJy4vZGlyZWN0aW9ucyc7XG5pbXBvcnQgeyBNY2NTcGVlZERpYWxBY3Rpb25zQ29tcG9uZW50IH0gZnJvbSAnLi9zcGVlZC1kaWFsLWFjdGlvbnMuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWNjLXNwZWVkLWRpYWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vc3BlZWQtZGlhbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NwZWVkLWRpYWwuY29tcG9uZW50LnNjc3MnXSxcbiAgYW5pbWF0aW9uczogW1NQSU5fQU5JTUFUSU9OXSxcbn0pXG5leHBvcnQgY2xhc3MgTWNjU3BlZWREaWFsQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcbiAgLyoqXG4gICAqIEhvbGQgc3BlZWQtZGlhbC1hY3Rpb25zIGNvbXBvbmVudCBpbnNpZGUgdGhpcyBjb21wb25lbnRcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoTWNjU3BlZWREaWFsQWN0aW9uc0NvbXBvbmVudCkgYWN0aW9uczogTWNjU3BlZWREaWFsQWN0aW9uc0NvbXBvbmVudDtcblxuICAvKipcbiAgICogU2V0IGluaXRpYWwgJ29wZW4nIHN0YXRlXG4gICAqL1xuICBASW5wdXQoJ29wZW4nKSBzZXQgaXNPcGVuKG9wZW46IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc09wZW4gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkob3Blbik7XG4gIH1cbiAgZ2V0IGlzT3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNPcGVuO1xuICB9XG4gIHByaXZhdGUgX2lzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBXaGVuIGVuYWJsZWQsIGhhbmRsZSBvcGVuL2Nsb3NlIHN0YXRlIG9uIG1vdXNlIGhvdmVyXG4gICAqL1xuICBASW5wdXQoJ21vdXNlSG92ZXInKSBzZXQgaG92ZXIoaG92ZXI6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9ob3ZlciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShob3Zlcik7XG4gIH1cbiAgcHJpdmF0ZSBfaG92ZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogRW5hYmxlL2Rpc2FibGUgc3BpbiBhbmltYXRpb24gd2hlbiBidXR0b24gaXMgY2xpY2tlZCBvciBob3ZlcmVkXG4gICAqL1xuICBASW5wdXQoKSBzZXQgc3BpbihzcGluOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc3BpbiA9IHNwaW47XG4gIH1cbiAgZ2V0IHNwaW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NwaW47XG4gIH1cbiAgcHJpdmF0ZSBfc3BpbjogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIERlZmluZSB0aGUgZGlyZWN0aW9uIG9mIHRoZSBhY3Rpb25zIGJ1dHRvblxuICAgKiBEaXJlY3Rpb25zIGF2YWlsYWJsZSBhcmU6IHVwIHwgZG93biB8IGxlZnQgfCByaWdodFxuICAgKi9cbiAgQElucHV0KCkgc2V0IGRpcmVjdGlvbihkaXJlY3Rpb246IERJUkVDVElPTikge1xuICAgIHRoaXMuX2RpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgfVxuICBnZXQgZGlyZWN0aW9uKCk6IERJUkVDVElPTiB7XG4gICAgcmV0dXJuIHRoaXMuX2RpcmVjdGlvbjtcbiAgfVxuICBwcml2YXRlIF9kaXJlY3Rpb246IERJUkVDVElPTiA9ICd1cCc7XG5cbiAgLyoqXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBvcGVuIHN0YXRlIGNoYW5nZVxuICAgKi9cbiAgQE91dHB1dCgpIG9wZW5TdGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgLyoqXG4gICAqIENhbGwgZmFiIHNwZWVkIGRpYWwgYWN0aW9ucyBmdW5jdGlvbnMgdG8gY2hhbmdlIHRoZVxuICAgKiB2aXNpYmlsaXR5IG9mIHRoZSBidXR0b25zXG4gICAqL1xuICBwcml2YXRlIF9zZXRBY3Rpb25zU3RhdGUoKSB7XG4gICAgaWYgKHRoaXMuX2lzT3Blbikge1xuICAgICAgdGhpcy5hY3Rpb25zLnNob3codGhpcy5fZGlyZWN0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hY3Rpb25zLmhpZGUodGhpcy5fZGlyZWN0aW9uKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IGluaXRpYWwgc3RhdGUgdG8gdGhlIGFjdGlvbiBidXR0b25zIGluc2lkZSBzcGVlZC1kaWFsLWFjdGlvbnNcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9zZXRBY3Rpb25zU3RhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcbiAgICovXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoJ2lzT3BlbicgaW4gY2hhbmdlcyAmJiBjaGFuZ2VzWydpc09wZW4nXS5wcmV2aW91c1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX3NldEFjdGlvbnNTdGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIG1vdXNlSG92ZXIgaXMgZW5hYmxlZCBhbmQgc3RhdGUgaXMgY2xvc2VkXG4gICAqIGNhbGxzIHRvZ2dsZSB0byBvcGVuIHRoZSBhY3Rpb25zXG4gICAqL1xuICBob3ZlclN0YXJ0KCkge1xuICAgIGlmICh0aGlzLl9ob3ZlciAmJiAhdGhpcy5faXNPcGVuKSB7XG4gICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIG1vdXNlSG92ZXIgaXMgZW5hYmxlZCBhbmQgc3RhdGUgaXMgb3BlblxuICAgKiBjYWxscyB0b2dnbGUgdG8gY2xvc2UgdGhlIGFjdGlvbnNcbiAgICovXG4gIGhvdmVyU3RvcCgpIHtcbiAgICBpZiAodGhpcy5faG92ZXIgJiYgdGhpcy5faXNPcGVuKSB7XG4gICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2UgdGhlIG9wZW4gc3RhdGVcbiAgICovXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLl9pc09wZW4gPSAhdGhpcy5faXNPcGVuO1xuXG4gICAgdGhpcy5fc2V0QWN0aW9uc1N0YXRlKCk7XG5cbiAgICB0aGlzLm9wZW5TdGF0ZUNoYW5nZS5lbWl0KHRoaXMuX2lzT3Blbik7XG4gIH1cbn1cbiJdfQ==