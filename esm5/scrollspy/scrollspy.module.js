import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MccScrollspyService } from './scrollspy.service';
import { MccScrollspyGroupDirective, MccScrollspyItemDirective } from './scrollspy.directive';
var ɵ0 = window;
var MccScrollspyModule = /** @class */ (function () {
    function MccScrollspyModule() {
    }
    MccScrollspyModule = __decorate([
        NgModule({
            imports: [CommonModule, ScrollingModule],
            providers: [MccScrollspyService, { provide: 'Window', useValue: ɵ0 }],
            declarations: [MccScrollspyGroupDirective, MccScrollspyItemDirective],
            exports: [MccScrollspyGroupDirective, MccScrollspyItemDirective],
        })
    ], MccScrollspyModule);
    return MccScrollspyModule;
}());
export { MccScrollspyModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsc3B5Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hdGVyaWFsLWNvbW11bml0eS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic2Nyb2xsc3B5L3Njcm9sbHNweS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV6RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztTQUk1QixNQUFNO0FBSXhFO0lBQUE7SUFBaUMsQ0FBQztJQUFyQixrQkFBa0I7UUFOOUIsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQztZQUN4QyxTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxJQUFRLEVBQUUsQ0FBQztZQUN6RSxZQUFZLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSx5QkFBeUIsQ0FBQztZQUNyRSxPQUFPLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSx5QkFBeUIsQ0FBQztTQUNqRSxDQUFDO09BQ1csa0JBQWtCLENBQUc7SUFBRCx5QkFBQztDQUFBLEFBQWxDLElBQWtDO1NBQXJCLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU2Nyb2xsaW5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5cbmltcG9ydCB7IE1jY1Njcm9sbHNweVNlcnZpY2UgfSBmcm9tICcuL3Njcm9sbHNweS5zZXJ2aWNlJztcbmltcG9ydCB7IE1jY1Njcm9sbHNweUdyb3VwRGlyZWN0aXZlLCBNY2NTY3JvbGxzcHlJdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi9zY3JvbGxzcHkuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgU2Nyb2xsaW5nTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbTWNjU2Nyb2xsc3B5U2VydmljZSwgeyBwcm92aWRlOiAnV2luZG93JywgdXNlVmFsdWU6IHdpbmRvdyB9XSxcbiAgZGVjbGFyYXRpb25zOiBbTWNjU2Nyb2xsc3B5R3JvdXBEaXJlY3RpdmUsIE1jY1Njcm9sbHNweUl0ZW1EaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbTWNjU2Nyb2xsc3B5R3JvdXBEaXJlY3RpdmUsIE1jY1Njcm9sbHNweUl0ZW1EaXJlY3RpdmVdLFxufSlcbmV4cG9ydCBjbGFzcyBNY2NTY3JvbGxzcHlNb2R1bGUge31cbiJdfQ==