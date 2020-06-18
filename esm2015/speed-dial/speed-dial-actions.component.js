import { __decorate } from "tslib";
import { AfterContentInit, Component, ContentChildren, Input, QueryList, Renderer2, ViewEncapsulation } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';
import { Z_INDEX } from './animations';
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
export { MccSpeedDialActionsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlZWQtZGlhbC1hY3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hdGVyaWFsLWNvbW11bml0eS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3BlZWQtZGlhbC9zcGVlZC1kaWFsLWFjdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3SCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQWEsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBU2xELElBQWEsNEJBQTRCLEdBQXpDLE1BQWEsNEJBQTRCO0lBb0J2QyxZQUFvQixRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBUC9CLGVBQVUsR0FBK0IsSUFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7SUFPbkMsQ0FBQztJQWQ1Qzs7O09BR0c7SUFDTSxJQUFJLFNBQVMsQ0FBQyxTQUFvQjtRQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBVUQ7Ozs7T0FJRztJQUNILGtCQUFrQjtRQUNoQiwwQ0FBMEM7UUFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDekYsQ0FBQyxDQUFDLENBQUM7UUFFSCxnREFB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RUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDcEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN6RSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsR0FBRyxXQUFXLElBQUksSUFBSSxHQUFHLFNBQVMsS0FBSyxDQUFDLENBQUM7Z0JBQ2pILENBQUMsQ0FBQyxDQUFDO2FBQ0o7U0FDRjtJQUNILENBQUM7Q0FDRixDQUFBOztZQTFGK0IsU0FBUzs7QUFoQlg7SUFBM0IsZUFBZSxDQUFDLFNBQVMsQ0FBQzs4REFBZ0M7QUFNbEQ7SUFBUixLQUFLLEVBQUU7NkRBRVA7QUFaVSw0QkFBNEI7SUFOeEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHdCQUF3QjtRQUNsQyx1REFBa0Q7UUFFbEQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O0tBQ3RDLENBQUM7R0FDVyw0QkFBNEIsQ0E4R3hDO1NBOUdZLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBJbnB1dCwgUXVlcnlMaXN0LCBSZW5kZXJlcjIsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRCdXR0b24gfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBTklNQVRJT04sIFpfSU5ERVggfSBmcm9tICcuL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgRElSRUNUSU9OIH0gZnJvbSAnLi9kaXJlY3Rpb25zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWNjLXNwZWVkLWRpYWwtYWN0aW9ucycsXG4gIHRlbXBsYXRlVXJsOiAnLi9zcGVlZC1kaWFsLWFjdGlvbnMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zcGVlZC1kaWFsLWFjdGlvbnMuY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNY2NTcGVlZERpYWxBY3Rpb25zQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIC8qKlxuICAgKiBIb2xkIGFsbCB0aGUgYWN0aW9ucyBidXR0b24gaW5zaWRlIGZhYiBzcGVlZCBkaWFsXG4gICAqL1xuICBAQ29udGVudENoaWxkcmVuKE1hdEJ1dHRvbikgX2J1dHRvbnM6IFF1ZXJ5TGlzdDxNYXRCdXR0b24+O1xuXG4gIC8qKlxuICAgKiBTZXQgdHlwZSBvZiBhbmltYXRpb24gd2lsbCBiZSBleGVjdXRlZCBvbiBvcGVuL2Nsb3NlXG4gICAqIFR5cGUgYXZhaWxhYmxlIGFyZTogc2NhbGUgfCBmbGluZ1xuICAgKi9cbiAgQElucHV0KCkgc2V0IGFuaW1hdGlvbihhbmltYXRpb246IEFOSU1BVElPTikge1xuICAgIHRoaXMuX2FuaW1hdGlvbi5uZXh0KGFuaW1hdGlvbik7XG4gIH1cbiAgcHJpdmF0ZSBfYW5pbWF0aW9uOiBCZWhhdmlvclN1YmplY3Q8QU5JTUFUSU9OPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoJ3NjYWxlJyk7XG5cbiAgLyoqXG4gICAqIExhc3QgYW5pbWF0aW9uIHRoZSB3YXMgdXNlZFxuICAgKi9cbiAgcHJpdmF0ZSBfbGFzdEFuaW1hdGlvbkNsYXNzOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7IH1cblxuICAvKipcbiAgICogVGhlIHotaW5kZXggc3R5bGUgYW5kIGFuaW1hdGlvbiBjbGFzcyBhcmUgaGFuZGxlIHNlcGFyYXRlIGJlY2F1c2VcbiAgICogei1pbmRleCB3aWxsIGJlIHNldCBvbmx5IG9uZSB0aW1lLCBhbmQgdGhlIGFuaW1hdGlvbiBjbGFzcyB3aWxsIGJlIHNldFxuICAgKiBldmVyeSB0aW1lIHRoZSBhbmltYXRpb24gY2hhbmdlXG4gICAqL1xuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgLy8gc2V0IHotaW5kZXggc3R5bGUgdG8gZWFjaCBidXR0b24gYWN0aW9uXG4gICAgdGhpcy5fYnV0dG9ucy5mb3JFYWNoKChidXR0b24sIGluZGV4KSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJ1dHRvbi5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnei1pbmRleCcsIChaX0lOREVYIC0gaW5kZXgpKTtcbiAgICB9KTtcblxuICAgIC8vIHNldCB0aGUgYW5pbWF0aW9uIGNsYXNzIHRvIGVhY2ggYnV0dG9uIGFjdGlvblxuICAgIHRoaXMuX2FuaW1hdGlvbi5zdWJzY3JpYmUoYW5pbWF0aW9uID0+IHtcbiAgICAgIGNvbnN0IG5leHRBbmltYXRpb25DbGFzcyA9IGBzcGVlZC1kaWFsLWl0ZW0tYW5pbWF0aW9uLSR7YW5pbWF0aW9ufWA7XG4gICAgICB0aGlzLl9idXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX2xhc3RBbmltYXRpb25DbGFzcykge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoYnV0dG9uLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX2xhc3RBbmltYXRpb25DbGFzcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhidXR0b24uX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgbmV4dEFuaW1hdGlvbkNsYXNzKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9sYXN0QW5pbWF0aW9uQ2xhc3MgPSBuZXh0QW5pbWF0aW9uQ2xhc3M7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVzcG9uc2libGUgZm9yIGNoYW5nZSB0aGUgc3RhdGUgb2YgdGhlIGFjdGlvbiBidXR0b25zIHRvIHZpc2libGVcbiAgICogXG4gICAqIEBwYXJhbSBkaXJlY3Rpb24gRElSRUNUSU9OXG4gICAqL1xuICBzaG93KGRpcmVjdGlvbjogRElSRUNUSU9OKSB7XG4gICAgc3dpdGNoICh0aGlzLl9hbmltYXRpb24udmFsdWUpIHtcbiAgICAgIGNhc2UgJ3NjYWxlJzoge1xuICAgICAgICB0aGlzLl9idXR0b25zLmZvckVhY2goKGJ1dHRvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCB0cmFuc2l0aW9uID0gMyArICg2NSAqIGluZGV4KTtcblxuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYnV0dG9uLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2l0aW9uLWRlbGF5JywgYCR7dHJhbnNpdGlvbn1tc2ApO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYnV0dG9uLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdvcGFjaXR5JywgJzEnKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJ1dHRvbi5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgJ3NjYWxlKDEpJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnZmxpbmcnOiB7XG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZUZuID0gKGRpcmVjdGlvbiA9PSAndXAnIHx8IGRpcmVjdGlvbiA9PSAnZG93bicpID8gJ3RyYW5zbGF0ZVknIDogJ3RyYW5zbGF0ZVgnO1xuICAgICAgICBjb25zdCBzaWduID0gKGRpcmVjdGlvbiA9PSAnZG93bicgfHwgZGlyZWN0aW9uID09ICdyaWdodCcpID8gJy0nIDogJyc7XG5cbiAgICAgICAgdGhpcy5fYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShidXR0b24uX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3RyYW5zaXRpb24tZGVsYXknLCAnMG1zJyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShidXR0b24uX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ29wYWNpdHknLCAnMScpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYnV0dG9uLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCBgJHt0cmFuc2xhdGVGbn0oJHtzaWdufTApYCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlIGFsbCB0aGUgYnV0dG9ucyBhY3Rpb25cbiAgICogXG4gICAqIEBwYXJhbSBkaXJlY3Rpb24gRElSRUNUSU9OXG4gICAqL1xuICBoaWRlKGRpcmVjdGlvbjogRElSRUNUSU9OKSB7XG4gICAgc3dpdGNoICh0aGlzLl9hbmltYXRpb24udmFsdWUpIHtcbiAgICAgIGNhc2UgJ3NjYWxlJzoge1xuICAgICAgICB0aGlzLl9idXR0b25zLmZvckVhY2goKGJ1dHRvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCB0cmFuc2l0aW9uID0gMyAtICg2NSAqIGluZGV4KTtcblxuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYnV0dG9uLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2l0aW9uLWRlbGF5JywgYCR7dHJhbnNpdGlvbn1tc2ApO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYnV0dG9uLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdvcGFjaXR5JywgJzAnKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJ1dHRvbi5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgJ3NjYWxlKDApJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnZmxpbmcnOiB7XG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZUZuID0gKGRpcmVjdGlvbiA9PSAndXAnIHx8IGRpcmVjdGlvbiA9PSAnZG93bicpID8gJ3RyYW5zbGF0ZVknIDogJ3RyYW5zbGF0ZVgnO1xuICAgICAgICBjb25zdCBzaWduID0gKGRpcmVjdGlvbiA9PSAnZG93bicgfHwgZGlyZWN0aW9uID09ICdyaWdodCcpID8gJy0nIDogJyc7XG5cbiAgICAgICAgdGhpcy5fYnV0dG9ucy5mb3JFYWNoKChidXR0b24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3QgdHJhbnNmb3JtID0gKDU1ICogKGluZGV4ICsgMSkgLSAoaW5kZXggKiA1KSk7XG5cbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJ1dHRvbi5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndHJhbnNpdGlvbi1kZWxheScsICcwbXMnKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJ1dHRvbi5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnb3BhY2l0eScsICcxJyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShidXR0b24uX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsIGAke3RyYW5zbGF0ZUZufSgke3NpZ259JHt0cmFuc2Zvcm19cHgpYCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19