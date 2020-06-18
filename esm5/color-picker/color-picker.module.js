import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EMPTY_COLOR, USED_COLORS } from './color-picker';
import { MccColorPickerService } from './color-picker.service';
import { MccColorPickerComponent } from './color-picker.component';
import { MccColorPickerSelectorComponent } from './color-picker-selector.component';
import { MccColorPickerCollectionComponent } from './color-picker-collection.component';
import { MccConnectedColorPickerDirective, MccColorPickerOriginDirective, MccColorPickerOptionDirective, } from './color-picker.directives';
var ɵ0 = [];
var MccColorPickerModule = /** @class */ (function () {
    function MccColorPickerModule() {
    }
    MccColorPickerModule_1 = MccColorPickerModule;
    /**
     *
     */
    MccColorPickerModule.forRoot = function (config) {
        return {
            ngModule: MccColorPickerModule_1,
            providers: [
                { provide: EMPTY_COLOR, useValue: ('empty_color' in config ? config.empty_color : 'none') },
                { provide: USED_COLORS, useValue: config.used_colors || [] }
            ],
        };
    };
    var MccColorPickerModule_1;
    MccColorPickerModule = MccColorPickerModule_1 = __decorate([
        NgModule({
            imports: [
                CommonModule,
                PortalModule,
                OverlayModule,
                ReactiveFormsModule,
                MatButtonModule,
                MatFormFieldModule,
                MatInputModule,
            ],
            declarations: [
                MccColorPickerComponent,
                MccConnectedColorPickerDirective,
                MccColorPickerSelectorComponent,
                MccColorPickerOriginDirective,
                MccColorPickerOptionDirective,
                MccColorPickerCollectionComponent,
            ],
            exports: [
                MccColorPickerComponent,
                MccConnectedColorPickerDirective,
                MccColorPickerOriginDirective,
                MccColorPickerCollectionComponent,
            ],
            providers: [
                MccColorPickerService,
                { provide: EMPTY_COLOR, useValue: 'none' },
                { provide: USED_COLORS, useValue: ɵ0 }
            ],
        })
    ], MccColorPickerModule);
    return MccColorPickerModule;
}());
export { MccColorPickerModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hdGVyaWFsLWNvbW11bml0eS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29sb3ItcGlja2VyL2NvbG9yLXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQXFCLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFL0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbkUsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEYsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDeEYsT0FBTyxFQUNMLGdDQUFnQyxFQUNoQyw2QkFBNkIsRUFDN0IsNkJBQTZCLEdBQzlCLE1BQU0sMkJBQTJCLENBQUM7U0E2QkcsRUFBRTtBQUd4QztJQUFBO0lBYUEsQ0FBQzs2QkFiWSxvQkFBb0I7SUFDL0I7O09BRUc7SUFDSSw0QkFBTyxHQUFkLFVBQWUsTUFBeUI7UUFDdEMsT0FBTztZQUNMLFFBQVEsRUFBRSxzQkFBb0I7WUFDOUIsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxhQUFhLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDM0YsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFBRTthQUM3RDtTQUNGLENBQUM7SUFDSixDQUFDOztJQVpVLG9CQUFvQjtRQTlCaEMsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLFlBQVk7Z0JBQ1osWUFBWTtnQkFDWixhQUFhO2dCQUNiLG1CQUFtQjtnQkFDbkIsZUFBZTtnQkFDZixrQkFBa0I7Z0JBQ2xCLGNBQWM7YUFDZjtZQUNELFlBQVksRUFBRTtnQkFDWix1QkFBdUI7Z0JBQ3ZCLGdDQUFnQztnQkFDaEMsK0JBQStCO2dCQUMvQiw2QkFBNkI7Z0JBQzdCLDZCQUE2QjtnQkFDN0IsaUNBQWlDO2FBQ2xDO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLHVCQUF1QjtnQkFDdkIsZ0NBQWdDO2dCQUNoQyw2QkFBNkI7Z0JBQzdCLGlDQUFpQzthQUNsQztZQUNELFNBQVMsRUFBRTtnQkFDVCxxQkFBcUI7Z0JBQ3JCLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFO2dCQUMxQyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxJQUFJLEVBQUU7YUFDdkM7U0FDRixDQUFDO09BQ1csb0JBQW9CLENBYWhDO0lBQUQsMkJBQUM7Q0FBQSxBQWJELElBYUM7U0FiWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgUG9ydGFsTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcblxuaW1wb3J0IHsgRU1QVFlfQ09MT1IsIFVTRURfQ09MT1JTLCBDb2xvclBpY2tlckNvbmZpZyB9IGZyb20gJy4vY29sb3ItcGlja2VyJztcblxuaW1wb3J0IHsgTWNjQ29sb3JQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi9jb2xvci1waWNrZXIuc2VydmljZSc7XG5cbmltcG9ydCB7IE1jY0NvbG9yUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb2xvci1waWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1jY0NvbG9yUGlja2VyU2VsZWN0b3JDb21wb25lbnQgfSBmcm9tICcuL2NvbG9yLXBpY2tlci1zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWNjQ29sb3JQaWNrZXJDb2xsZWN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb2xvci1waWNrZXItY29sbGVjdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgTWNjQ29ubmVjdGVkQ29sb3JQaWNrZXJEaXJlY3RpdmUsXG4gIE1jY0NvbG9yUGlja2VyT3JpZ2luRGlyZWN0aXZlLFxuICBNY2NDb2xvclBpY2tlck9wdGlvbkRpcmVjdGl2ZSxcbn0gZnJvbSAnLi9jb2xvci1waWNrZXIuZGlyZWN0aXZlcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUG9ydGFsTW9kdWxlLFxuICAgIE92ZXJsYXlNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNY2NDb2xvclBpY2tlckNvbXBvbmVudCxcbiAgICBNY2NDb25uZWN0ZWRDb2xvclBpY2tlckRpcmVjdGl2ZSxcbiAgICBNY2NDb2xvclBpY2tlclNlbGVjdG9yQ29tcG9uZW50LFxuICAgIE1jY0NvbG9yUGlja2VyT3JpZ2luRGlyZWN0aXZlLFxuICAgIE1jY0NvbG9yUGlja2VyT3B0aW9uRGlyZWN0aXZlLFxuICAgIE1jY0NvbG9yUGlja2VyQ29sbGVjdGlvbkNvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE1jY0NvbG9yUGlja2VyQ29tcG9uZW50LFxuICAgIE1jY0Nvbm5lY3RlZENvbG9yUGlja2VyRGlyZWN0aXZlLFxuICAgIE1jY0NvbG9yUGlja2VyT3JpZ2luRGlyZWN0aXZlLFxuICAgIE1jY0NvbG9yUGlja2VyQ29sbGVjdGlvbkNvbXBvbmVudCxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgTWNjQ29sb3JQaWNrZXJTZXJ2aWNlLFxuICAgIHsgcHJvdmlkZTogRU1QVFlfQ09MT1IsIHVzZVZhbHVlOiAnbm9uZScgfSxcbiAgICB7IHByb3ZpZGU6IFVTRURfQ09MT1JTLCB1c2VWYWx1ZTogW10gfVxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNY2NDb2xvclBpY2tlck1vZHVsZSB7XG4gIC8qKlxuICAgKlxuICAgKi9cbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBDb2xvclBpY2tlckNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8TWNjQ29sb3JQaWNrZXJNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE1jY0NvbG9yUGlja2VyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogRU1QVFlfQ09MT1IsIHVzZVZhbHVlOiAoJ2VtcHR5X2NvbG9yJyBpbiBjb25maWcgPyBjb25maWcuZW1wdHlfY29sb3IgOiAnbm9uZScpIH0sXG4gICAgICAgIHsgcHJvdmlkZTogVVNFRF9DT0xPUlMsIHVzZVZhbHVlOiBjb25maWcudXNlZF9jb2xvcnMgfHwgW10gfVxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=