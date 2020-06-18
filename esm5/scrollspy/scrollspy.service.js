import { __decorate, __param } from "tslib";
import { Injectable, Inject } from '@angular/core';
import { SCROLLSPY_ANIMATION_SMOOTH } from './scrollspy';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { debounceTime, withLatestFrom } from 'rxjs/operators';
var MccScrollspyService = /** @class */ (function () {
    function MccScrollspyService(window) {
        var _this = this;
        this.window = window;
        /**
         * When scroll is from click event, change this attr to true
         * So scroll event obeservable doesn't emit any update
         */
        this._fromClick = false;
        /**
         * List of scrollspy group
         */
        this.data = [];
        // listen to scroll event
        this._scrollSub = fromEvent(window, 'scroll')
            .pipe(debounceTime(50), withLatestFrom(function () { return window.scrollY; }))
            .subscribe(function (position) {
            if (!_this._fromClick) {
                _this._updateFocused(position);
            }
            _this._fromClick = false;
        });
    }
    MccScrollspyService.prototype.ngOnDestroy = function () {
        if (this._scrollSub && !this._scrollSub.closed) {
            this._scrollSub.unsubscribe();
        }
    };
    /**
     * Update information about wich element is on focus
     * @param position number
     */
    MccScrollspyService.prototype._updateFocused = function (position) {
        this.data.forEach(function (group) {
            var items = [];
            group.items.getValue().forEach(function (item, index) {
                item.focus = false;
                if (item.top <= position) {
                    if (items[index - 1]) {
                        items[index - 1].focus = false;
                    }
                    item.focus = true;
                }
                items.push(item);
            });
            group.items.next(items);
        });
    };
    /**
     * Create new group of items
     * @param name string
     * @param items MccScrollspyItemDirective[]
     * @param animation ScrollBehavior
     */
    MccScrollspyService.prototype.create = function (name, items, animation) {
        var group = this.data.find(function (group) { return group.name === name; });
        if (!group) {
            group = {
                name: name,
                animation: animation || SCROLLSPY_ANIMATION_SMOOTH,
                items: new BehaviorSubject(items || []),
            };
            this.data.push(group);
        }
        else {
            group.items.next(items || []);
        }
        return group;
    };
    /**
     * Return observable of the group
     * @param name string
     */
    MccScrollspyService.prototype.group = function (name) {
        var group = this.data.find(function (g) { return g.name === name; });
        if (!group) {
            group = this.create(name);
        }
        return group.items.asObservable();
    };
    /**
     * Scroll to one of the items
     * @param name string
     * @param id string
     */
    MccScrollspyService.prototype.scrollTo = function (name, id) {
        var _this = this;
        var group = this.data.find(function (group) { return group.name === name; });
        group.items.getValue().forEach(function (item) {
            item.focus = false;
            if (item.id === id) {
                _this._fromClick = true;
                _this._updateFocused(item.top);
                window.scrollTo({ top: item.top, behavior: group.animation });
            }
        });
    };
    MccScrollspyService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['Window',] }] }
    ]; };
    MccScrollspyService = __decorate([
        Injectable(),
        __param(0, Inject('Window'))
    ], MccScrollspyService);
    return MccScrollspyService;
}());
export { MccScrollspyService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsc3B5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXRlcmlhbC1jb21tdW5pdHktY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNjcm9sbHNweS9zY3JvbGxzcHkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFxQiwwQkFBMEIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM1RSxPQUFPLEVBQTRCLGVBQWUsRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUUsT0FBTyxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUc5RDtJQWlCRSw2QkFBc0MsTUFBVztRQUFqRCxpQkFVQztRQVZxQyxXQUFNLEdBQU4sTUFBTSxDQUFLO1FBaEJqRDs7O1dBR0c7UUFDSyxlQUFVLEdBQVksS0FBSyxDQUFDO1FBRXBDOztXQUVHO1FBQ0ssU0FBSSxHQUF3QixFQUFFLENBQUM7UUFRckMseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUM7YUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxjQUFjLENBQUMsY0FBTSxPQUFBLE1BQU0sQ0FBQyxPQUFPLEVBQWQsQ0FBYyxDQUFDLENBQUM7YUFDNUQsU0FBUyxDQUFDLFVBQUEsUUFBUTtZQUNqQixJQUFJLENBQUMsS0FBSSxDQUFDLFVBQVUsRUFBRTtnQkFDcEIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUMvQjtZQUNELEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHlDQUFXLEdBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENB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QixLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDOUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQzthQUMvRDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0RBbEdZLE1BQU0sU0FBQyxRQUFROztJQWpCakIsbUJBQW1CO1FBRC9CLFVBQVUsRUFBRTtRQWtCRSxXQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtPQWpCbEIsbUJBQW1CLENBb0gvQjtJQUFELDBCQUFDO0NBQUEsQUFwSEQsSUFvSEM7U0FwSFksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1jY1Njcm9sbHNweUl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL3Njcm9sbHNweS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWNjU2Nyb2xsc3B5R3JvdXAsIFNDUk9MTFNQWV9BTklNQVRJT05fU01PT1RIIH0gZnJvbSAnLi9zY3JvbGxzcHknO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCB3aXRoTGF0ZXN0RnJvbSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1jY1Njcm9sbHNweVNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogV2hlbiBzY3JvbGwgaXMgZnJvbSBjbGljayBldmVudCwgY2hhbmdlIHRoaXMgYXR0ciB0byB0cnVlXG4gICAqIFNvIHNjcm9sbCBldmVudCBvYmVzZXJ2YWJsZSBkb2Vzbid0IGVtaXQgYW55IHVwZGF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBfZnJvbUNsaWNrOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIExpc3Qgb2Ygc2Nyb2xsc3B5IGdyb3VwXG4gICAqL1xuICBwcml2YXRlIGRhdGE6IE1jY1Njcm9sbHNweUdyb3VwW10gPSBbXTtcblxuICAvKipcbiAgICogU2Nyb2xsIGV2ZW50IHN1YnNjcmlwdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBfc2Nyb2xsU3ViOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoQEluamVjdCgnV2luZG93JykgcHJpdmF0ZSB3aW5kb3c6IGFueSkge1xuICAgIC8vIGxpc3RlbiB0byBzY3JvbGwgZXZlbnRcbiAgICB0aGlzLl9zY3JvbGxTdWIgPSBmcm9tRXZlbnQod2luZG93LCAnc2Nyb2xsJylcbiAgICAgIC5waXBlKGRlYm91bmNlVGltZSg1MCksIHdpdGhMYXRlc3RGcm9tKCgpID0+IHdpbmRvdy5zY3JvbGxZKSlcbiAgICAgIC5zdWJzY3JpYmUocG9zaXRpb24gPT4ge1xuICAgICAgICBpZiAoIXRoaXMuX2Zyb21DbGljaykge1xuICAgICAgICAgIHRoaXMuX3VwZGF0ZUZvY3VzZWQocG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Zyb21DbGljayA9IGZhbHNlO1xuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fc2Nyb2xsU3ViICYmICF0aGlzLl9zY3JvbGxTdWIuY2xvc2VkKSB7XG4gICAgICB0aGlzLl9zY3JvbGxTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGluZm9ybWF0aW9uIGFib3V0IHdpY2ggZWxlbWVudCBpcyBvbiBmb2N1c1xuICAgKiBAcGFyYW0gcG9zaXRpb24gbnVtYmVyXG4gICAqL1xuICBwcml2YXRlIF91cGRhdGVGb2N1c2VkKHBvc2l0aW9uOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGEuZm9yRWFjaChncm91cCA9PiB7XG4gICAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgICAgZ3JvdXAuaXRlbXMuZ2V0VmFsdWUoKS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBpdGVtLmZvY3VzID0gZmFsc2U7XG4gICAgICAgIGlmIChpdGVtLnRvcCA8PSBwb3NpdGlvbikge1xuICAgICAgICAgIGlmIChpdGVtc1tpbmRleCAtIDFdKSB7XG4gICAgICAgICAgICBpdGVtc1tpbmRleCAtIDFdLmZvY3VzID0gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaXRlbS5mb2N1cyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgfSk7XG5cbiAgICAgIGdyb3VwLml0ZW1zLm5leHQoaXRlbXMpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBuZXcgZ3JvdXAgb2YgaXRlbXNcbiAgICogQHBhcmFtIG5hbWUgc3RyaW5nXG4gICAqIEBwYXJhbSBpdGVtcyBNY2NTY3JvbGxzcHlJdGVtRGlyZWN0aXZlW11cbiAgICogQHBhcmFtIGFuaW1hdGlvbiBTY3JvbGxCZWhhdmlvclxuICAgKi9cbiAgY3JlYXRlKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBpdGVtcz86IE1jY1Njcm9sbHNweUl0ZW1EaXJlY3RpdmVbXSxcbiAgICBhbmltYXRpb24/OiBTY3JvbGxCZWhhdmlvclxuICApOiBNY2NTY3JvbGxzcHlHcm91cCB7XG4gICAgbGV0IGdyb3VwOiBNY2NTY3JvbGxzcHlHcm91cCA9IHRoaXMuZGF0YS5maW5kKGdyb3VwID0+IGdyb3VwLm5hbWUgPT09IG5hbWUpO1xuICAgIGlmICghZ3JvdXApIHtcbiAgICAgIGdyb3VwID0ge1xuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBhbmltYXRpb246IGFuaW1hdGlvbiB8fCBTQ1JPTExTUFlfQU5JTUFUSU9OX1NNT09USCxcbiAgICAgICAgaXRlbXM6IG5ldyBCZWhhdmlvclN1YmplY3Q8TWNjU2Nyb2xsc3B5SXRlbURpcmVjdGl2ZVtdPihpdGVtcyB8fCBbXSksXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmRhdGEucHVzaChncm91cCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdyb3VwLml0ZW1zLm5leHQoaXRlbXMgfHwgW10pO1xuICAgIH1cblxuICAgIHJldHVybiBncm91cDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gb2JzZXJ2YWJsZSBvZiB0aGUgZ3JvdXBcbiAgICogQHBhcmFtIG5hbWUgc3RyaW5nXG4gICAqL1xuICBncm91cChuYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPE1jY1Njcm9sbHNweUl0ZW1EaXJlY3RpdmVbXT4ge1xuICAgIGxldCBncm91cDogTWNjU2Nyb2xsc3B5R3JvdXAgPSB0aGlzLmRhdGEuZmluZChnID0+IGcubmFtZSA9PT0gbmFtZSk7XG4gICAgaWYgKCFncm91cCkge1xuICAgICAgZ3JvdXAgPSB0aGlzLmNyZWF0ZShuYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ3JvdXAuaXRlbXMuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2Nyb2xsIHRvIG9uZSBvZiB0aGUgaXRlbXNcbiAgICogQHBhcmFtIG5hbWUgc3RyaW5nXG4gICAqIEBwYXJhbSBpZCBzdHJpbmdcbiAgICovXG4gIHNjcm9sbFRvKG5hbWU6IHN0cmluZywgaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGdyb3VwOiBNY2NTY3JvbGxzcHlHcm91cCA9IHRoaXMuZGF0YS5maW5kKGdyb3VwID0+IGdyb3VwLm5hbWUgPT09IG5hbWUpO1xuXG4gICAgZ3JvdXAuaXRlbXMuZ2V0VmFsdWUoKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaXRlbS5mb2N1cyA9IGZhbHNlO1xuICAgICAgaWYgKGl0ZW0uaWQgPT09IGlkKSB7XG4gICAgICAgIHRoaXMuX2Zyb21DbGljayA9IHRydWU7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUZvY3VzZWQoaXRlbS50b3ApO1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oeyB0b3A6IGl0ZW0udG9wLCBiZWhhdmlvcjogZ3JvdXAuYW5pbWF0aW9uIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=