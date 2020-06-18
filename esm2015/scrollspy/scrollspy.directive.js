import { __decorate } from "tslib";
import { AfterContentInit, Input, ContentChildren, Directive, ElementRef, QueryList, Renderer2, } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MccScrollspyService } from './scrollspy.service';
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
export { MccScrollspyItemDirective };
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
export { MccScrollspyGroupDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsc3B5LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hdGVyaWFsLWNvbW11bml0eS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic2Nyb2xsc3B5L3Njcm9sbHNweS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsS0FBSyxFQUNMLGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUNWLFNBQVMsRUFDVCxTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFNMUQsSUFBYSx5QkFBeUIsR0FBdEMsTUFBYSx5QkFBeUI7SUEyQ3BDLFlBQW1CLFVBQXNCLEVBQVUsUUFBbUI7UUFBbkQsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7SUFBRyxDQUFDO0lBMUMxRTs7O09BR0c7SUFDSCxJQUFJLEVBQUUsQ0FBQyxFQUFVO1FBQ2YsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNQLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3BFO1FBRUQsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUNELElBQUksRUFBRTtRQUNKLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBR0Q7O09BRUc7SUFDSCxJQUFJLEdBQUc7UUFDTCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7O09BRUc7SUFFSCxJQUFJLEtBQUssQ0FBQyxPQUFnQjtRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFDRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQVdELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO1NBQ3hEO1FBQ0QsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVEOztPQUVHO0lBQ0ssU0FBUztRQUNmLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM1RCxPQUFPLGlCQUFpQixLQUFLLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0NBQ0YsQ0FBQTs7WUFoQmdDLFVBQVU7WUFBb0IsU0FBUzs7QUFkdEU7SUFEQyxLQUFLLENBQUMsT0FBTyxDQUFDO3NEQUdkO0FBVVE7SUFBUixLQUFLLEVBQUU7d0RBQWU7QUF6Q1oseUJBQXlCO0lBSnJDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSwwQ0FBMEM7UUFDcEQsUUFBUSxFQUFFLGtCQUFrQjtLQUM3QixDQUFDO0dBQ1cseUJBQXlCLENBMkRyQztTQTNEWSx5QkFBeUI7QUFpRXRDLElBQWEsMEJBQTBCLEdBQXZDLE1BQWEsMEJBQTBCO0lBZXJDLFlBQW9CLG1CQUF3QztRQUF4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO0lBQUcsQ0FBQztJQVRoRTs7T0FFRztJQUVILElBQUksSUFBSSxDQUFDLElBQVk7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDcEIsQ0FBQztJQUtELGtCQUFrQjtRQUNoQixzQkFBc0I7UUFDdEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDckQsQ0FBQztDQUNGLENBQUE7O1lBUDBDLG1CQUFtQjs7QUFYaEI7SUFBM0MsZUFBZSxDQUFDLHlCQUF5QixDQUFDO3lEQUE2QztBQU14RjtJQURDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQztzREFHMUI7QUFaVSwwQkFBMEI7SUFKdEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDRDQUE0QztRQUN0RCxRQUFRLEVBQUUsbUJBQW1CO0tBQzlCLENBQUM7R0FDVywwQkFBMEIsQ0FzQnRDO1NBdEJZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIElucHV0LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgUXVlcnlMaXN0LFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IE1jY1Njcm9sbHNweVNlcnZpY2UgfSBmcm9tICcuL3Njcm9sbHNweS5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21jY1Njcm9sbHNweUl0ZW1dLCBbbWNjLXNjcm9sbHNweS1pdGVtXScsXG4gIGV4cG9ydEFzOiAnbWNjU2Nyb2xsc3B5SXRlbScsXG59KVxuZXhwb3J0IGNsYXNzIE1jY1Njcm9sbHNweUl0ZW1EaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgLyoqXG4gICAqIEhvbGQgdGhlIGVsZW1lbnQgaWQsIGlmIGVsZW1lbnQgZG9lc24ndCBoYXZlIGlkXG4gICAqIHRoZSBtZXRob2Qgd2lsbCBjcmVhdGUgb25lXG4gICAqL1xuICBzZXQgaWQoaWQ6IHN0cmluZykge1xuICAgIGlmICghaWQpIHtcbiAgICAgIGlkID0gdGhpcy5fY3JlYXRlSWQoKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdpZCcsIGlkKTtcbiAgICB9XG5cbiAgICB0aGlzLl9pZCA9IGlkO1xuICB9XG4gIGdldCBpZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9pZDtcbiAgfVxuICBwcml2YXRlIF9pZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBFbGVtZW50IGRpc3RhbmNlIG9mIHRoZSB0b3BcbiAgICovXG4gIGdldCB0b3AoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0VG9wO1xuICB9XG5cbiAgLyoqXG4gICAqIEVsZW1lbnQgaXMgZm9jdXNlZFxuICAgKi9cbiAgQElucHV0KCdmb2N1cycpXG4gIHNldCBmb2N1cyhmb2N1c2VkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZm9jdXNlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShmb2N1c2VkKTtcbiAgfVxuICBnZXQgZm9jdXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvY3VzZWQ7XG4gIH1cbiAgcHJpdmF0ZSBfZm9jdXNlZDogYm9vbGVhbjtcblxuICAvKipcbiAgICogTGFiZWwgdGhhdCB3aWxsIGFwcGVhciBvbiB0aGUgbGlzdCBvZiBpdGVtcy5cbiAgICogVGhlIGRlZmF1bHQgaXMgdGhlIHRleHQgaW5zaWRlIHRoZSBlbGVtZW50XG4gICAqL1xuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGlmICghdGhpcy5sYWJlbCkge1xuICAgICAgdGhpcy5sYWJlbCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnRleHRDb250ZW50O1xuICAgIH1cbiAgICB0aGlzLmlkID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaWQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGFuIElEIGZvciB0aGUgZWxlbWVudFxuICAgKi9cbiAgcHJpdmF0ZSBfY3JlYXRlSWQoKTogc3RyaW5nIHtcbiAgICBsZXQgdG1wSUQgPSB0aGlzLmxhYmVsLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvWyBdKy9naSwgJ18nKTtcbiAgICByZXR1cm4gYG1jY19zY3JvbGxzcHlfJHt0bXBJRH1gO1xuICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttY2NTY3JvbGxzcHlHcm91cF0sIFttY2Mtc2Nyb2xsc3B5LWdyb3VwXScsXG4gIGV4cG9ydEFzOiAnbWNjU2Nyb2xsc3B5R3JvdXAnLFxufSlcbmV4cG9ydCBjbGFzcyBNY2NTY3JvbGxzcHlHcm91cERpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAvKipcbiAgICogTGlzdCBvZiBzY3JvbGxzcHkgaXRlbXNcbiAgICovXG4gIEBDb250ZW50Q2hpbGRyZW4oTWNjU2Nyb2xsc3B5SXRlbURpcmVjdGl2ZSkgaXRlbXM6IFF1ZXJ5TGlzdDxNY2NTY3JvbGxzcHlJdGVtRGlyZWN0aXZlPjtcblxuICAvKipcbiAgICogTmFtZSBvZiB0aGUgc2Nyb2xsc3B5IGdyb3VwXG4gICAqL1xuICBASW5wdXQoJ21jY1Njcm9sbHNweUdyb3VwJylcbiAgc2V0IG5hbWUobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gIH1cbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWNjU2Nyb2xsc3B5U2VydmljZTogTWNjU2Nyb2xsc3B5U2VydmljZSkge31cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgLy8gYWRkIHRoZSBncm91cCBpdGVtc1xuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5pdGVtcy5tYXAoaXRlbSA9PiBpdGVtKTtcbiAgICB0aGlzLm1jY1Njcm9sbHNweVNlcnZpY2UuY3JlYXRlKHRoaXMuX25hbWUsIGl0ZW1zKTtcbiAgfVxufVxuIl19