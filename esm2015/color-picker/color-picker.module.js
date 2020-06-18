var MccColorPickerModule_1;
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
const ɵ0 = [];
let MccColorPickerModule = MccColorPickerModule_1 = class MccColorPickerModule {
    /**
     *
     */
    static forRoot(config) {
        return {
            ngModule: MccColorPickerModule_1,
            providers: [
                { provide: EMPTY_COLOR, useValue: ('empty_color' in config ? config.empty_color : 'none') },
                { provide: USED_COLORS, useValue: config.used_colors || [] }
            ],
        };
    }
};
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
export { MccColorPickerModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hdGVyaWFsLWNvbW11bml0eS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29sb3ItcGlja2VyL2NvbG9yLXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXpELE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFxQixNQUFNLGdCQUFnQixDQUFDO0FBRTdFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRS9ELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ25FLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3hGLE9BQU8sRUFDTCxnQ0FBZ0MsRUFDaEMsNkJBQTZCLEVBQzdCLDZCQUE2QixHQUM5QixNQUFNLDJCQUEyQixDQUFDO1dBNkJHLEVBQUU7QUFHeEMsSUFBYSxvQkFBb0IsNEJBQWpDLE1BQWEsb0JBQW9CO0lBQy9COztPQUVHO0lBQ0gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUF5QjtRQUN0QyxPQUFPO1lBQ0wsUUFBUSxFQUFFLHNCQUFvQjtZQUM5QixTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxDQUFDLGFBQWEsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUMzRixFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFO2FBQzdEO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBYlksb0JBQW9CO0lBOUJoQyxRQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxZQUFZO1lBQ1osWUFBWTtZQUNaLGFBQWE7WUFDYixtQkFBbUI7WUFDbkIsZUFBZTtZQUNmLGtCQUFrQjtZQUNsQixjQUFjO1NBQ2Y7UUFDRCxZQUFZLEVBQUU7WUFDWix1QkFBdUI7WUFDdkIsZ0NBQWdDO1lBQ2hDLCtCQUErQjtZQUMvQiw2QkFBNkI7WUFDN0IsNkJBQTZCO1lBQzdCLGlDQUFpQztTQUNsQztRQUNELE9BQU8sRUFBRTtZQUNQLHVCQUF1QjtZQUN2QixnQ0FBZ0M7WUFDaEMsNkJBQTZCO1lBQzdCLGlDQUFpQztTQUNsQztRQUNELFNBQVMsRUFBRTtZQUNULHFCQUFxQjtZQUNyQixFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTtZQUMxQyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxJQUFJLEVBQUU7U0FDdkM7S0FDRixDQUFDO0dBQ1csb0JBQW9CLENBYWhDO1NBYlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IFBvcnRhbE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7IE1hdEZvcm1GaWVsZE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5cbmltcG9ydCB7IEVNUFRZX0NPTE9SLCBVU0VEX0NPTE9SUywgQ29sb3JQaWNrZXJDb25maWcgfSBmcm9tICcuL2NvbG9yLXBpY2tlcic7XG5cbmltcG9ydCB7IE1jY0NvbG9yUGlja2VyU2VydmljZSB9IGZyb20gJy4vY29sb3ItcGlja2VyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBNY2NDb2xvclBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vY29sb3ItcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNY2NDb2xvclBpY2tlclNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9jb2xvci1waWNrZXItc2VsZWN0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IE1jY0NvbG9yUGlja2VyQ29sbGVjdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY29sb3ItcGlja2VyLWNvbGxlY3Rpb24uY29tcG9uZW50JztcbmltcG9ydCB7XG4gIE1jY0Nvbm5lY3RlZENvbG9yUGlja2VyRGlyZWN0aXZlLFxuICBNY2NDb2xvclBpY2tlck9yaWdpbkRpcmVjdGl2ZSxcbiAgTWNjQ29sb3JQaWNrZXJPcHRpb25EaXJlY3RpdmUsXG59IGZyb20gJy4vY29sb3ItcGlja2VyLmRpcmVjdGl2ZXMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFBvcnRhbE1vZHVsZSxcbiAgICBPdmVybGF5TW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWNjQ29sb3JQaWNrZXJDb21wb25lbnQsXG4gICAgTWNjQ29ubmVjdGVkQ29sb3JQaWNrZXJEaXJlY3RpdmUsXG4gICAgTWNjQ29sb3JQaWNrZXJTZWxlY3RvckNvbXBvbmVudCxcbiAgICBNY2NDb2xvclBpY2tlck9yaWdpbkRpcmVjdGl2ZSxcbiAgICBNY2NDb2xvclBpY2tlck9wdGlvbkRpcmVjdGl2ZSxcbiAgICBNY2NDb2xvclBpY2tlckNvbGxlY3Rpb25Db21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBNY2NDb2xvclBpY2tlckNvbXBvbmVudCxcbiAgICBNY2NDb25uZWN0ZWRDb2xvclBpY2tlckRpcmVjdGl2ZSxcbiAgICBNY2NDb2xvclBpY2tlck9yaWdpbkRpcmVjdGl2ZSxcbiAgICBNY2NDb2xvclBpY2tlckNvbGxlY3Rpb25Db21wb25lbnQsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIE1jY0NvbG9yUGlja2VyU2VydmljZSxcbiAgICB7IHByb3ZpZGU6IEVNUFRZX0NPTE9SLCB1c2VWYWx1ZTogJ25vbmUnIH0sXG4gICAgeyBwcm92aWRlOiBVU0VEX0NPTE9SUywgdXNlVmFsdWU6IFtdIH1cbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWNjQ29sb3JQaWNrZXJNb2R1bGUge1xuICAvKipcbiAgICpcbiAgICovXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogQ29sb3JQaWNrZXJDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE1jY0NvbG9yUGlja2VyTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBNY2NDb2xvclBpY2tlck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IEVNUFRZX0NPTE9SLCB1c2VWYWx1ZTogKCdlbXB0eV9jb2xvcicgaW4gY29uZmlnID8gY29uZmlnLmVtcHR5X2NvbG9yIDogJ25vbmUnKSB9LFxuICAgICAgICB7IHByb3ZpZGU6IFVTRURfQ09MT1JTLCB1c2VWYWx1ZTogY29uZmlnLnVzZWRfY29sb3JzIHx8IFtdIH1cbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19