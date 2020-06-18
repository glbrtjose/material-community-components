import { __decorate } from "tslib";
import { AfterContentInit, Component, ContentChildren, Input, QueryList, Renderer2, ViewEncapsulation } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';
import { Z_INDEX } from './animations';
var MccSpeedDialActionsComponent = /** @class */ (function () {
    function MccSpeedDialActionsComponent(renderer) {
        this.renderer = renderer;
        this._animation = new BehaviorSubject('scale');
    }
    Object.defineProperty(MccSpeedDialActionsComponent.prototype, "animation", {
        /**
         * Set type of animation will be executed on open/close
         * Type available are: scale | fling
         */
        set: function (animation) {
            this._animation.next(animation);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * The z-index style and animation class are handle separate because
     * z-index will be set only one time, and the animation class will be set
     * every time the animation change
     */
    MccSpeedDialActionsComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        // set z-index style to each button action
        this._buttons.forEach(function (button, index) {
            _this.renderer.setStyle(button._elementRef.nativeElement, 'z-index', (Z_INDEX - index));
        });
        // set the animation class to each button action
        this._animation.subscribe(function (animation) {
            var nextAnimationClass = "speed-dial-item-animation-" + animation;
            _this._buttons.forEach(function (button) {
                if (_this._lastAnimationClass) {
                    _this.renderer.removeClass(button._elementRef.nativeElement, _this._lastAnimationClass);
                }
                _this.renderer.addClass(button._elementRef.nativeElement, nextAnimationClass);
            });
            _this._lastAnimationClass = nextAnimationClass;
        });
    };
    /**
     * Responsible for change the state of the action buttons to visible
     *
     * @param direction DIRECTION
     */
    MccSpeedDialActionsComponent.prototype.show = function (direction) {
        var _this = this;
        switch (this._animation.value) {
            case 'scale': {
                this._buttons.forEach(function (button, index) {
                    var transition = 3 + (65 * index);
                    _this.renderer.setStyle(button._elementRef.nativeElement, 'transition-delay', transition + "ms");
                    _this.renderer.setStyle(button._elementRef.nativeElement, 'opacity', '1');
                    _this.renderer.setStyle(button._elementRef.nativeElement, 'transform', 'scale(1)');
                });
                break;
            }
            case 'fling': {
                var translateFn_1 = (direction == 'up' || direction == 'down') ? 'translateY' : 'translateX';
                var sign_1 = (direction == 'down' || direction == 'right') ? '-' : '';
                this._buttons.forEach(function (button) {
                    _this.renderer.setStyle(button._elementRef.nativeElement, 'transition-delay', '0ms');
                    _this.renderer.setStyle(button._elementRef.nativeElement, 'opacity', '1');
                    _this.renderer.setStyle(button._elementRef.nativeElement, 'transform', translateFn_1 + "(" + sign_1 + "0)");
                });
            }
        }
    };
    /**
     * Hide all the buttons action
     *
     * @param direction DIRECTION
     */
    MccSpeedDialActionsComponent.prototype.hide = function (direction) {
        var _this = this;
        switch (this._animation.value) {
            case 'scale': {
                this._buttons.forEach(function (button, index) {
                    var transition = 3 - (65 * index);
                    _this.renderer.setStyle(button._elementRef.nativeElement, 'transition-delay', transition + "ms");
                    _this.renderer.setStyle(button._elementRef.nativeElement, 'opacity', '0');
                    _this.renderer.setStyle(button._elementRef.nativeElement, 'transform', 'scale(0)');
                });
                break;
            }
            case 'fling': {
                var translateFn_2 = (direction == 'up' || direction == 'down') ? 'translateY' : 'translateX';
                var sign_2 = (direction == 'down' || direction == 'right') ? '-' : '';
                this._buttons.forEach(function (button, index) {
                    var transform = (55 * (index + 1) - (index * 5));
                    _this.renderer.setStyle(button._elementRef.nativeElement, 'transition-delay', '0ms');
                    _this.renderer.setStyle(button._elementRef.nativeElement, 'opacity', '1');
                    _this.renderer.setStyle(button._elementRef.nativeElement, 'transform', translateFn_2 + "(" + sign_2 + transform + "px)");
                });
            }
        }
    };
    MccSpeedDialActionsComponent.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
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
    return MccSpeedDialActionsComponent;
}());
export { MccSpeedDialActionsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlZWQtZGlhbC1hY3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hdGVyaWFsLWNvbW11bml0eS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3BlZWQtZGlhbC9zcGVlZC1kaWFsLWFjdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3SCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQWEsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBU2xEO0lBb0JFLHNDQUFvQixRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBUC9CLGVBQVUsR0FBK0IsSUFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7SUFPbkMsQ0FBQztJQVZuQyxzQkFBSSxtREFBUztRQUp0Qjs7O1dBR0c7YUFDTSxVQUFjLFNBQW9CO1lBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7OztPQUFBO0lBVUQ7Ozs7T0FJRztJQUNILHlEQUFrQixHQUFsQjtRQUFBLGlCQWtCQztRQWpCQywwQ0FBMEM7UUFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNLEVBQUUsS0FBSztZQUNsQyxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN6RixDQUFDLENBQUMsQ0FBQztRQUVILGdEQUFnRDtRQUNo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QUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ3pFLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBSyxhQUFXLFNBQUksTUFBSSxHQUFHLFNBQVMsUUFBSyxDQUFDLENBQUM7Z0JBQ2pILENBQUMsQ0FBQyxDQUFDO2FBQ0o7U0FDRjtJQUNILENBQUM7O2dCQXpGNkIsU0FBUzs7SUFoQlg7UUFBM0IsZUFBZSxDQUFDLFNBQVMsQ0FBQztrRUFBZ0M7SUFNbEQ7UUFBUixLQUFLLEVBQUU7aUVBRVA7SUFaVSw0QkFBNEI7UUFOeEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHdCQUF3QjtZQUNsQyx1REFBa0Q7WUFFbEQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O1NBQ3RDLENBQUM7T0FDVyw0QkFBNEIsQ0E4R3hDO0lBQUQsbUNBQUM7Q0FBQSxBQTlHRCxJQThHQztTQTlHWSw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgSW5wdXQsIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0QnV0dG9uIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQU5JTUFUSU9OLCBaX0lOREVYIH0gZnJvbSAnLi9hbmltYXRpb25zJztcbmltcG9ydCB7IERJUkVDVElPTiB9IGZyb20gJy4vZGlyZWN0aW9ucyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21jYy1zcGVlZC1kaWFsLWFjdGlvbnMnLFxuICB0ZW1wbGF0ZVVybDogJy4vc3BlZWQtZGlhbC1hY3Rpb25zLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc3BlZWQtZGlhbC1hY3Rpb25zLmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTWNjU3BlZWREaWFsQWN0aW9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAvKipcbiAgICogSG9sZCBhbGwgdGhlIGFjdGlvbnMgYnV0dG9uIGluc2lkZSBmYWIgc3BlZWQgZGlhbFxuICAgKi9cbiAgQENvbnRlbnRDaGlsZHJlbihNYXRCdXR0b24pIF9idXR0b25zOiBRdWVyeUxpc3Q8TWF0QnV0dG9uPjtcblxuICAvKipcbiAgICogU2V0IHR5cGUgb2YgYW5pbWF0aW9uIHdpbGwgYmUgZXhlY3V0ZWQgb24gb3Blbi9jbG9zZVxuICAgKiBUeXBlIGF2YWlsYWJsZSBhcmU6IHNjYWxlIHwgZmxpbmdcbiAgICovXG4gIEBJbnB1dCgpIHNldCBhbmltYXRpb24oYW5pbWF0aW9uOiBBTklNQVRJT04pIHtcbiAgICB0aGlzLl9hbmltYXRpb24ubmV4dChhbmltYXRpb24pO1xuICB9XG4gIHByaXZhdGUgX2FuaW1hdGlvbjogQmVoYXZpb3JTdWJqZWN0PEFOSU1BVElPTj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KCdzY2FsZScpO1xuXG4gIC8qKlxuICAgKiBMYXN0IGFuaW1hdGlvbiB0aGUgd2FzIHVzZWRcbiAgICovXG4gIHByaXZhdGUgX2xhc3RBbmltYXRpb25DbGFzczogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikgeyB9XG5cbiAgLyoqXG4gICAqIFRoZSB6LWluZGV4IHN0eWxlIGFuZCBhbmltYXRpb24gY2xhc3MgYXJlIGhhbmRsZSBzZXBhcmF0ZSBiZWNhdXNlXG4gICAqIHotaW5kZXggd2lsbCBiZSBzZXQgb25seSBvbmUgdGltZSwgYW5kIHRoZSBhbmltYXRpb24gY2xhc3Mgd2lsbCBiZSBzZXRcbiAgICogZXZlcnkgdGltZSB0aGUgYW5pbWF0aW9uIGNoYW5nZVxuICAgKi9cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIC8vIHNldCB6LWluZGV4IHN0eWxlIHRvIGVhY2ggYnV0dG9uIGFjdGlvblxuICAgIHRoaXMuX2J1dHRvbnMuZm9yRWFjaCgoYnV0dG9uLCBpbmRleCkgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShidXR0b24uX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3otaW5kZXgnLCAoWl9JTkRFWCAtIGluZGV4KSk7XG4gICAgfSk7XG5cbiAgICAvLyBzZXQgdGhlIGFuaW1hdGlvbiBjbGFzcyB0byBlYWNoIGJ1dHRvbiBhY3Rpb25cbiAgICB0aGlzLl9hbmltYXRpb24uc3Vic2NyaWJlKGFuaW1hdGlvbiA9PiB7XG4gICAgICBjb25zdCBuZXh0QW5pbWF0aW9uQ2xhc3MgPSBgc3BlZWQtZGlhbC1pdGVtLWFuaW1hdGlvbi0ke2FuaW1hdGlvbn1gO1xuICAgICAgdGhpcy5fYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9sYXN0QW5pbWF0aW9uQ2xhc3MpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKGJ1dHRvbi5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl9sYXN0QW5pbWF0aW9uQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYnV0dG9uLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIG5leHRBbmltYXRpb25DbGFzcyk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fbGFzdEFuaW1hdGlvbkNsYXNzID0gbmV4dEFuaW1hdGlvbkNsYXNzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc3BvbnNpYmxlIGZvciBjaGFuZ2UgdGhlIHN0YXRlIG9mIHRoZSBhY3Rpb24gYnV0dG9ucyB0byB2aXNpYmxlXG4gICAqIFxuICAgKiBAcGFyYW0gZGlyZWN0aW9uIERJUkVDVElPTlxuICAgKi9cbiAgc2hvdyhkaXJlY3Rpb246IERJUkVDVElPTikge1xuICAgIHN3aXRjaCAodGhpcy5fYW5pbWF0aW9uLnZhbHVlKSB7XG4gICAgICBjYXNlICdzY2FsZSc6IHtcbiAgICAgICAgdGhpcy5fYnV0dG9ucy5mb3JFYWNoKChidXR0b24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3QgdHJhbnNpdGlvbiA9IDMgKyAoNjUgKiBpbmRleCk7XG5cbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJ1dHRvbi5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndHJhbnNpdGlvbi1kZWxheScsIGAke3RyYW5zaXRpb259bXNgKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJ1dHRvbi5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnb3BhY2l0eScsICcxJyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShidXR0b24uX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsICdzY2FsZSgxKScpO1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2ZsaW5nJzoge1xuICAgICAgICBjb25zdCB0cmFuc2xhdGVGbiA9IChkaXJlY3Rpb24gPT0gJ3VwJyB8fCBkaXJlY3Rpb24gPT0gJ2Rvd24nKSA/ICd0cmFuc2xhdGVZJyA6ICd0cmFuc2xhdGVYJztcbiAgICAgICAgY29uc3Qgc2lnbiA9IChkaXJlY3Rpb24gPT0gJ2Rvd24nIHx8IGRpcmVjdGlvbiA9PSAncmlnaHQnKSA/ICctJyA6ICcnO1xuXG4gICAgICAgIHRoaXMuX2J1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYnV0dG9uLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2l0aW9uLWRlbGF5JywgJzBtcycpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYnV0dG9uLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdvcGFjaXR5JywgJzEnKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJ1dHRvbi5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgYCR7dHJhbnNsYXRlRm59KCR7c2lnbn0wKWApO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGlkZSBhbGwgdGhlIGJ1dHRvbnMgYWN0aW9uXG4gICAqIFxuICAgKiBAcGFyYW0gZGlyZWN0aW9uIERJUkVDVElPTlxuICAgKi9cbiAgaGlkZShkaXJlY3Rpb246IERJUkVDVElPTikge1xuICAgIHN3aXRjaCAodGhpcy5fYW5pbWF0aW9uLnZhbHVlKSB7XG4gICAgICBjYXNlICdzY2FsZSc6IHtcbiAgICAgICAgdGhpcy5fYnV0dG9ucy5mb3JFYWNoKChidXR0b24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3QgdHJhbnNpdGlvbiA9IDMgLSAoNjUgKiBpbmRleCk7XG5cbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJ1dHRvbi5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndHJhbnNpdGlvbi1kZWxheScsIGAke3RyYW5zaXRpb259bXNgKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJ1dHRvbi5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnb3BhY2l0eScsICcwJyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShidXR0b24uX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsICdzY2FsZSgwKScpO1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2ZsaW5nJzoge1xuICAgICAgICBjb25zdCB0cmFuc2xhdGVGbiA9IChkaXJlY3Rpb24gPT0gJ3VwJyB8fCBkaXJlY3Rpb24gPT0gJ2Rvd24nKSA/ICd0cmFuc2xhdGVZJyA6ICd0cmFuc2xhdGVYJztcbiAgICAgICAgY29uc3Qgc2lnbiA9IChkaXJlY3Rpb24gPT0gJ2Rvd24nIHx8IGRpcmVjdGlvbiA9PSAncmlnaHQnKSA/ICctJyA6ICcnO1xuXG4gICAgICAgIHRoaXMuX2J1dHRvbnMuZm9yRWFjaCgoYnV0dG9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9ICg1NSAqIChpbmRleCArIDEpIC0gKGluZGV4ICogNSkpO1xuXG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShidXR0b24uX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3RyYW5zaXRpb24tZGVsYXknLCAnMG1zJyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShidXR0b24uX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ29wYWNpdHknLCAnMScpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYnV0dG9uLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCBgJHt0cmFuc2xhdGVGbn0oJHtzaWdufSR7dHJhbnNmb3JtfXB4KWApO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==