import { __decorate, __param } from "tslib";
import { Injectable, Inject } from '@angular/core';
import { SCROLLSPY_ANIMATION_SMOOTH } from './scrollspy';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { debounceTime, withLatestFrom } from 'rxjs/operators';
let MccScrollspyService = class MccScrollspyService {
    constructor(window) {
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
            .pipe(debounceTime(50), withLatestFrom(() => window.scrollY))
            .subscribe(position => {
            if (!this._fromClick) {
                this._updateFocused(position);
            }
            this._fromClick = false;
        });
    }
    ngOnDestroy() {
        if (this._scrollSub && !this._scrollSub.closed) {
            this._scrollSub.unsubscribe();
        }
    }
    /**
     * Update information about wich element is on focus
     * @param position number
     */
    _updateFocused(position) {
        this.data.forEach(group => {
            const items = [];
            group.items.getValue().forEach((item, index) => {
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
    }
    /**
     * Create new group of items
     * @param name string
     * @param items MccScrollspyItemDirective[]
     * @param animation ScrollBehavior
     */
    create(name, items, animation) {
        let group = this.data.find(group => group.name === name);
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
    }
    /**
     * Return observable of the group
     * @param name string
     */
    group(name) {
        let group = this.data.find(g => g.name === name);
        if (!group) {
            group = this.create(name);
        }
        return group.items.asObservable();
    }
    /**
     * Scroll to one of the items
     * @param name string
     * @param id string
     */
    scrollTo(name, id) {
        const group = this.data.find(group => group.name === name);
        group.items.getValue().forEach(item => {
            item.focus = false;
            if (item.id === id) {
                this._fromClick = true;
                this._updateFocused(item.top);
                window.scrollTo({ top: item.top, behavior: group.animation });
            }
        });
    }
};
MccScrollspyService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['Window',] }] }
];
MccScrollspyService = __decorate([
    Injectable(),
    __param(0, Inject('Window'))
], MccScrollspyService);
export { MccScrollspyService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsc3B5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXRlcmlhbC1jb21tdW5pdHktY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNjcm9sbHNweS9zY3JvbGxzcHkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFxQiwwQkFBMEIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM1RSxPQUFPLEVBQTRCLGVBQWUsRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUUsT0FBTyxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUc5RCxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQWlCOUIsWUFBc0MsTUFBVztRQUFYLFdBQU0sR0FBTixNQUFNLENBQUs7UUFoQmpEOzs7V0FHRztRQUNLLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFFcEM7O1dBRUc7UUFDSyxTQUFJLEdBQXdCLEVBQUUsQ0FBQztRQVFyQyx5QkFBeUI7UUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQzthQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDNUQsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQy9CO1lBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxD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QyxDQUFDO2dCQUM5QixNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO2FBQy9EO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQTs7NENBbkdjLE1BQU0sU0FBQyxRQUFROztBQWpCakIsbUJBQW1CO0lBRC9CLFVBQVUsRUFBRTtJQWtCRSxXQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtHQWpCbEIsbUJBQW1CLENBb0gvQjtTQXBIWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWNjU2Nyb2xsc3B5SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vc2Nyb2xsc3B5LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNY2NTY3JvbGxzcHlHcm91cCwgU0NST0xMU1BZX0FOSU1BVElPTl9TTU9PVEggfSBmcm9tICcuL3Njcm9sbHNweSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIHdpdGhMYXRlc3RGcm9tIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWNjU2Nyb2xsc3B5U2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBXaGVuIHNjcm9sbCBpcyBmcm9tIGNsaWNrIGV2ZW50LCBjaGFuZ2UgdGhpcyBhdHRyIHRvIHRydWVcbiAgICogU28gc2Nyb2xsIGV2ZW50IG9iZXNlcnZhYmxlIGRvZXNuJ3QgZW1pdCBhbnkgdXBkYXRlXG4gICAqL1xuICBwcml2YXRlIF9mcm9tQ2xpY2s6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogTGlzdCBvZiBzY3JvbGxzcHkgZ3JvdXBcbiAgICovXG4gIHByaXZhdGUgZGF0YTogTWNjU2Nyb2xsc3B5R3JvdXBbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBTY3JvbGwgZXZlbnQgc3Vic2NyaXB0aW9uXG4gICAqL1xuICBwcml2YXRlIF9zY3JvbGxTdWI6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KCdXaW5kb3cnKSBwcml2YXRlIHdpbmRvdzogYW55KSB7XG4gICAgLy8gbGlzdGVuIHRvIHNjcm9sbCBldmVudFxuICAgIHRoaXMuX3Njcm9sbFN1YiA9IGZyb21FdmVudCh3aW5kb3csICdzY3JvbGwnKVxuICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDUwKSwgd2l0aExhdGVzdEZyb20oKCkgPT4gd2luZG93LnNjcm9sbFkpKVxuICAgICAgLnN1YnNjcmliZShwb3NpdGlvbiA9PiB7XG4gICAgICAgIGlmICghdGhpcy5fZnJvbUNsaWNrKSB7XG4gICAgICAgICAgdGhpcy5fdXBkYXRlRm9jdXNlZChwb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZnJvbUNsaWNrID0gZmFsc2U7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl9zY3JvbGxTdWIgJiYgIXRoaXMuX3Njcm9sbFN1Yi5jbG9zZWQpIHtcbiAgICAgIHRoaXMuX3Njcm9sbFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgaW5mb3JtYXRpb24gYWJvdXQgd2ljaCBlbGVtZW50IGlzIG9uIGZvY3VzXG4gICAqIEBwYXJhbSBwb3NpdGlvbiBudW1iZXJcbiAgICovXG4gIHByaXZhdGUgX3VwZGF0ZUZvY3VzZWQocG9zaXRpb246IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZGF0YS5mb3JFYWNoKGdyb3VwID0+IHtcbiAgICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgICBncm91cC5pdGVtcy5nZXRWYWx1ZSgpLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGl0ZW0uZm9jdXMgPSBmYWxzZTtcbiAgICAgICAgaWYgKGl0ZW0udG9wIDw9IHBvc2l0aW9uKSB7XG4gICAgICAgICAgaWYgKGl0ZW1zW2luZGV4IC0gMV0pIHtcbiAgICAgICAgICAgIGl0ZW1zW2luZGV4IC0gMV0uZm9jdXMgPSBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpdGVtLmZvY3VzID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICB9KTtcblxuICAgICAgZ3JvdXAuaXRlbXMubmV4dChpdGVtcyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIG5ldyBncm91cCBvZiBpdGVtc1xuICAgKiBAcGFyYW0gbmFtZSBzdHJpbmdcbiAgICogQHBhcmFtIGl0ZW1zIE1jY1Njcm9sbHNweUl0ZW1EaXJlY3RpdmVbXVxuICAgKiBAcGFyYW0gYW5pbWF0aW9uIFNjcm9sbEJlaGF2aW9yXG4gICAqL1xuICBjcmVhdGUoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGl0ZW1zPzogTWNjU2Nyb2xsc3B5SXRlbURpcmVjdGl2ZVtdLFxuICAgIGFuaW1hdGlvbj86IFNjcm9sbEJlaGF2aW9yXG4gICk6IE1jY1Njcm9sbHNweUdyb3VwIHtcbiAgICBsZXQgZ3JvdXA6IE1jY1Njcm9sbHNweUdyb3VwID0gdGhpcy5kYXRhLmZpbmQoZ3JvdXAgPT4gZ3JvdXAubmFtZSA9PT0gbmFtZSk7XG4gICAgaWYgKCFncm91cCkge1xuICAgICAgZ3JvdXAgPSB7XG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIGFuaW1hdGlvbjogYW5pbWF0aW9uIHx8IFNDUk9MTFNQWV9BTklNQVRJT05fU01PT1RILFxuICAgICAgICBpdGVtczogbmV3IEJlaGF2aW9yU3ViamVjdDxNY2NTY3JvbGxzcHlJdGVtRGlyZWN0aXZlW10+KGl0ZW1zIHx8IFtdKSxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuZGF0YS5wdXNoKGdyb3VwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ3JvdXAuaXRlbXMubmV4dChpdGVtcyB8fCBbXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdyb3VwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBvYnNlcnZhYmxlIG9mIHRoZSBncm91cFxuICAgKiBAcGFyYW0gbmFtZSBzdHJpbmdcbiAgICovXG4gIGdyb3VwKG5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8TWNjU2Nyb2xsc3B5SXRlbURpcmVjdGl2ZVtdPiB7XG4gICAgbGV0IGdyb3VwOiBNY2NTY3JvbGxzcHlHcm91cCA9IHRoaXMuZGF0YS5maW5kKGcgPT4gZy5uYW1lID09PSBuYW1lKTtcbiAgICBpZiAoIWdyb3VwKSB7XG4gICAgICBncm91cCA9IHRoaXMuY3JlYXRlKG5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiBncm91cC5pdGVtcy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTY3JvbGwgdG8gb25lIG9mIHRoZSBpdGVtc1xuICAgKiBAcGFyYW0gbmFtZSBzdHJpbmdcbiAgICogQHBhcmFtIGlkIHN0cmluZ1xuICAgKi9cbiAgc2Nyb2xsVG8obmFtZTogc3RyaW5nLCBpZDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZ3JvdXA6IE1jY1Njcm9sbHNweUdyb3VwID0gdGhpcy5kYXRhLmZpbmQoZ3JvdXAgPT4gZ3JvdXAubmFtZSA9PT0gbmFtZSk7XG5cbiAgICBncm91cC5pdGVtcy5nZXRWYWx1ZSgpLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpdGVtLmZvY3VzID0gZmFsc2U7XG4gICAgICBpZiAoaXRlbS5pZCA9PT0gaWQpIHtcbiAgICAgICAgdGhpcy5fZnJvbUNsaWNrID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fdXBkYXRlRm9jdXNlZChpdGVtLnRvcCk7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7IHRvcDogaXRlbS50b3AsIGJlaGF2aW9yOiBncm91cC5hbmltYXRpb24gfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==