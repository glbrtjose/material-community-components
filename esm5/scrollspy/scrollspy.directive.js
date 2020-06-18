import { __decorate } from "tslib";
import { AfterContentInit, Input, ContentChildren, Directive, ElementRef, QueryList, Renderer2, } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MccScrollspyService } from './scrollspy.service';
var MccScrollspyItemDirective = /** @class */ (function () {
    function MccScrollspyItemDirective(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    Object.defineProperty(MccScrollspyItemDirective.prototype, "id", {
        get: function () {
            return this._id;
        },
        /**
         * Hold the element id, if element doesn't have id
         * the method will create one
         */
        set: function (id) {
            if (!id) {
                id = this._createId();
                this.renderer.setProperty(this.elementRef.nativeElement, 'id', id);
            }
            this._id = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MccScrollspyItemDirective.prototype, "top", {
        /**
         * Element distance of the top
         */
        get: function () {
            return this.elementRef.nativeElement.offsetTop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MccScrollspyItemDirective.prototype, "focus", {
        get: function () {
            return this._focused;
        },
        /**
         * Element is focused
         */
        set: function (focused) {
            this._focused = coerceBooleanProperty(focused);
        },
        enumerable: true,
        configurable: true
    });
    MccScrollspyItemDirective.prototype.ngAfterContentInit = function () {
        if (!this.label) {
            this.label = this.elementRef.nativeElement.textContent;
        }
        this.id = this.elementRef.nativeElement.id;
    };
    /**
     * Create an ID for the element
     */
    MccScrollspyItemDirective.prototype._createId = function () {
        var tmpID = this.label.toLowerCase().replace(/[ ]+/gi, '_');
        return "mcc_scrollspy_" + tmpID;
    };
    MccScrollspyItemDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
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
    return MccScrollspyItemDirective;
}());
export { MccScrollspyItemDirective };
var MccScrollspyGroupDirective = /** @class */ (function () {
    function MccScrollspyGroupDirective(mccScrollspyService) {
        this.mccScrollspyService = mccScrollspyService;
    }
    Object.defineProperty(MccScrollspyGroupDirective.prototype, "name", {
        /**
         * Name of the scrollspy group
         */
        set: function (name) {
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    MccScrollspyGroupDirective.prototype.ngAfterContentInit = function () {
        // add the group items
        var items = this.items.map(function (item) { return item; });
        this.mccScrollspyService.create(this._name, items);
    };
    MccScrollspyGroupDirective.ctorParameters = function () { return [
        { type: MccScrollspyService }
    ]; };
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
    return MccScrollspyGroupDirective;
}());
export { MccScrollspyGroupDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsc3B5LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hdGVyaWFsLWNvbW11bml0eS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic2Nyb2xsc3B5L3Njcm9sbHNweS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsS0FBSyxFQUNMLGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUNWLFNBQVMsRUFDVCxTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFNMUQ7SUEyQ0UsbUNBQW1CLFVBQXNCLEVBQVUsUUFBbUI7UUFBbkQsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7SUFBRyxDQUFDO0lBdEMxRSxzQkFBSSx5Q0FBRTthQVFOO1lBQ0UsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ2xCLENBQUM7UUFkRDs7O1dBR0c7YUFDSCxVQUFPLEVBQVU7WUFDZixJQUFJLENBQUMsRUFBRSxFQUFFO2dCQUNQLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQzthQUNwRTtZQUVELElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLENBQUM7OztPQUFBO0lBU0Qsc0JBQUksMENBQUc7UUFIUDs7V0FFRzthQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7UUFDakQsQ0FBQzs7O09BQUE7SUFNRCxzQkFBSSw0Q0FBSzthQUdUO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZCLENBQUM7UUFURDs7V0FFRzthQUVILFVBQVUsT0FBZ0I7WUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxDQUFDOzs7T0FBQTtJQWNELHNEQUFrQixHQUFsQjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7U0FDeEQ7UUFDRCxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7O09BRUc7SUFDSyw2Q0FBUyxHQUFqQjtRQUNFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM1RCxPQUFPLG1CQUFpQixLQUFPLENBQUM7SUFDbEMsQ0FBQzs7Z0JBZjhCLFVBQVU7Z0JBQW9CLFNBQVM7O0lBZHRFO1FBREMsS0FBSyxDQUFDLE9BQU8sQ0FBQzswREFHZDtJQVVRO1FBQVIsS0FBSyxFQUFFOzREQUFlO0lBekNaLHlCQUF5QjtRQUpyQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsMENBQTBDO1lBQ3BELFFBQVEsRUFBRSxrQkFBa0I7U0FDN0IsQ0FBQztPQUNXLHlCQUF5QixDQTJEckM7SUFBRCxnQ0FBQztDQUFBLEFBM0RELElBMkRDO1NBM0RZLHlCQUF5QjtBQWlFdEM7SUFlRSxvQ0FBb0IsbUJBQXdDO1FBQXhDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7SUFBRyxDQUFDO0lBTGhFLHNCQUFJLDRDQUFJO1FBSlI7O1dBRUc7YUFFSCxVQUFTLElBQVk7WUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDcEIsQ0FBQzs7O09BQUE7SUFLRCx1REFBa0IsR0FBbEI7UUFDRSxzQkFBc0I7UUFDdEIsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3JELENBQUM7O2dCQU53QyxtQkFBbUI7O0lBWGhCO1FBQTNDLGVBQWUsQ0FBQyx5QkFBeUIsQ0FBQzs2REFBNkM7SUFNeEY7UUFEQyxLQUFLLENBQUMsbUJBQW1CLENBQUM7MERBRzFCO0lBWlUsMEJBQTBCO1FBSnRDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSw0Q0FBNEM7WUFDdEQsUUFBUSxFQUFFLG1CQUFtQjtTQUM5QixDQUFDO09BQ1csMEJBQTBCLENBc0J0QztJQUFELGlDQUFDO0NBQUEsQUF0QkQsSUFzQkM7U0F0QlksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgSW5wdXQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgTWNjU2Nyb2xsc3B5U2VydmljZSB9IGZyb20gJy4vc2Nyb2xsc3B5LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWNjU2Nyb2xsc3B5SXRlbV0sIFttY2Mtc2Nyb2xsc3B5LWl0ZW1dJyxcbiAgZXhwb3J0QXM6ICdtY2NTY3JvbGxzcHlJdGVtJyxcbn0pXG5leHBvcnQgY2xhc3MgTWNjU2Nyb2xsc3B5SXRlbURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAvKipcbiAgICogSG9sZCB0aGUgZWxlbWVudCBpZCwgaWYgZWxlbWVudCBkb2Vzbid0IGhhdmUgaWRcbiAgICogdGhlIG1ldGhvZCB3aWxsIGNyZWF0ZSBvbmVcbiAgICovXG4gIHNldCBpZChpZDogc3RyaW5nKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgaWQgPSB0aGlzLl9jcmVhdGVJZCgpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2lkJywgaWQpO1xuICAgIH1cblxuICAgIHRoaXMuX2lkID0gaWQ7XG4gIH1cbiAgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG4gIHByaXZhdGUgX2lkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEVsZW1lbnQgZGlzdGFuY2Ugb2YgdGhlIHRvcFxuICAgKi9cbiAgZ2V0IHRvcCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRUb3A7XG4gIH1cblxuICAvKipcbiAgICogRWxlbWVudCBpcyBmb2N1c2VkXG4gICAqL1xuICBASW5wdXQoJ2ZvY3VzJylcbiAgc2V0IGZvY3VzKGZvY3VzZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9mb2N1c2VkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGZvY3VzZWQpO1xuICB9XG4gIGdldCBmb2N1cygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZm9jdXNlZDtcbiAgfVxuICBwcml2YXRlIF9mb2N1c2VkOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBMYWJlbCB0aGF0IHdpbGwgYXBwZWFyIG9uIHRoZSBsaXN0IG9mIGl0ZW1zLlxuICAgKiBUaGUgZGVmYXVsdCBpcyB0aGUgdGV4dCBpbnNpZGUgdGhlIGVsZW1lbnRcbiAgICovXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmxhYmVsKSB7XG4gICAgICB0aGlzLmxhYmVsID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgfVxuICAgIHRoaXMuaWQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gSUQgZm9yIHRoZSBlbGVtZW50XG4gICAqL1xuICBwcml2YXRlIF9jcmVhdGVJZCgpOiBzdHJpbmcge1xuICAgIGxldCB0bXBJRCA9IHRoaXMubGFiZWwudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bIF0rL2dpLCAnXycpO1xuICAgIHJldHVybiBgbWNjX3Njcm9sbHNweV8ke3RtcElEfWA7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21jY1Njcm9sbHNweUdyb3VwXSwgW21jYy1zY3JvbGxzcHktZ3JvdXBdJyxcbiAgZXhwb3J0QXM6ICdtY2NTY3JvbGxzcHlHcm91cCcsXG59KVxuZXhwb3J0IGNsYXNzIE1jY1Njcm9sbHNweUdyb3VwRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIC8qKlxuICAgKiBMaXN0IG9mIHNjcm9sbHNweSBpdGVtc1xuICAgKi9cbiAgQENvbnRlbnRDaGlsZHJlbihNY2NTY3JvbGxzcHlJdGVtRGlyZWN0aXZlKSBpdGVtczogUXVlcnlMaXN0PE1jY1Njcm9sbHNweUl0ZW1EaXJlY3RpdmU+O1xuXG4gIC8qKlxuICAgKiBOYW1lIG9mIHRoZSBzY3JvbGxzcHkgZ3JvdXBcbiAgICovXG4gIEBJbnB1dCgnbWNjU2Nyb2xsc3B5R3JvdXAnKVxuICBzZXQgbmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgfVxuICBwcml2YXRlIF9uYW1lOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtY2NTY3JvbGxzcHlTZXJ2aWNlOiBNY2NTY3JvbGxzcHlTZXJ2aWNlKSB7fVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAvLyBhZGQgdGhlIGdyb3VwIGl0ZW1zXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLml0ZW1zLm1hcChpdGVtID0+IGl0ZW0pO1xuICAgIHRoaXMubWNjU2Nyb2xsc3B5U2VydmljZS5jcmVhdGUodGhpcy5fbmFtZSwgaXRlbXMpO1xuICB9XG59XG4iXX0=