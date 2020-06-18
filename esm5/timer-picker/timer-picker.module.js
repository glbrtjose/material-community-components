import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import { MccTimerPickerComponent } from './timer-picker.component';
import { MccTimerPickerOriginDirective, MccConnectedTimerPickerDirective, } from './timer-picker.directives';
var MccTimerPickerModule = /** @class */ (function () {
    function MccTimerPickerModule() {
    }
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
    return MccTimerPickerModule;
}());
export { MccTimerPickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXItcGlja2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hdGVyaWFsLWNvbW11bml0eS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsidGltZXItcGlja2VyL3RpbWVyLXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTNELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ25FLE9BQU8sRUFDTCw2QkFBNkIsRUFDN0IsZ0NBQWdDLEdBQ2pDLE1BQU0sMkJBQTJCLENBQUM7QUFlbkM7SUFBQTtJQUFvQyxDQUFDO0lBQXhCLG9CQUFvQjtRQWJoQyxRQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxlQUFlLENBQUM7WUFDckUsWUFBWSxFQUFFO2dCQUNaLHVCQUF1QjtnQkFDdkIsNkJBQTZCO2dCQUM3QixnQ0FBZ0M7YUFDakM7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsdUJBQXVCO2dCQUN2Qiw2QkFBNkI7Z0JBQzdCLGdDQUFnQzthQUNqQztTQUNGLENBQUM7T0FDVyxvQkFBb0IsQ0FBSTtJQUFELDJCQUFDO0NBQUEsQUFBckMsSUFBcUM7U0FBeEIsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQb3J0YWxNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuXG5pbXBvcnQgeyBNY2NUaW1lclBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vdGltZXItcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBNY2NUaW1lclBpY2tlck9yaWdpbkRpcmVjdGl2ZSxcbiAgTWNjQ29ubmVjdGVkVGltZXJQaWNrZXJEaXJlY3RpdmUsXG59IGZyb20gJy4vdGltZXItcGlja2VyLmRpcmVjdGl2ZXMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBQb3J0YWxNb2R1bGUsIE92ZXJsYXlNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1jY1RpbWVyUGlja2VyQ29tcG9uZW50LFxuICAgIE1jY1RpbWVyUGlja2VyT3JpZ2luRGlyZWN0aXZlLFxuICAgIE1jY0Nvbm5lY3RlZFRpbWVyUGlja2VyRGlyZWN0aXZlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTWNjVGltZXJQaWNrZXJDb21wb25lbnQsXG4gICAgTWNjVGltZXJQaWNrZXJPcmlnaW5EaXJlY3RpdmUsXG4gICAgTWNjQ29ubmVjdGVkVGltZXJQaWNrZXJEaXJlY3RpdmUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1jY1RpbWVyUGlja2VyTW9kdWxlIHsgfVxuIl19