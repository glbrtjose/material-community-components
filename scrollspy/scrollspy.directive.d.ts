import { AfterContentInit, ElementRef, QueryList, Renderer2 } from '@angular/core';
import { MccScrollspyService } from './scrollspy.service';
export declare class MccScrollspyItemDirective implements AfterContentInit {
    elementRef: ElementRef;
    private renderer;
    /**
     * Hold the element id, if element doesn't have id
     * the method will create one
     */
    set id(id: string);
    get id(): string;
    private _id;
    /**
     * Element distance of the top
     */
    get top(): number;
    /**
     * Element is focused
     */
    set focus(focused: boolean);
    get focus(): boolean;
    private _focused;
    /**
     * Label that will appear on the list of items.
     * The default is the text inside the element
     */
    label: string;
    constructor(elementRef: ElementRef, renderer: Renderer2);
    ngAfterContentInit(): void;
    /**
     * Create an ID for the element
     */
    private _createId;
}
export declare class MccScrollspyGroupDirective implements AfterContentInit {
    private mccScrollspyService;
    /**
     * List of scrollspy items
     */
    items: QueryList<MccScrollspyItemDirective>;
    /**
     * Name of the scrollspy group
     */
    set name(name: string);
    private _name;
    constructor(mccScrollspyService: MccScrollspyService);
    ngAfterContentInit(): void;
}
