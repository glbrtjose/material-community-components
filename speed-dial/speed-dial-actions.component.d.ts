import { AfterContentInit, QueryList, Renderer2 } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ANIMATION } from './animations';
import { DIRECTION } from './directions';
export declare class MccSpeedDialActionsComponent implements AfterContentInit {
    private renderer;
    /**
     * Hold all the actions button inside fab speed dial
     */
    _buttons: QueryList<MatButton>;
    /**
     * Set type of animation will be executed on open/close
     * Type available are: scale | fling
     */
    set animation(animation: ANIMATION);
    private _animation;
    /**
     * Last animation the was used
     */
    private _lastAnimationClass;
    constructor(renderer: Renderer2);
    /**
     * The z-index style and animation class are handle separate because
     * z-index will be set only one time, and the animation class will be set
     * every time the animation change
     */
    ngAfterContentInit(): void;
    /**
     * Responsible for change the state of the action buttons to visible
     *
     * @param direction DIRECTION
     */
    show(direction: DIRECTION): void;
    /**
     * Hide all the buttons action
     *
     * @param direction DIRECTION
     */
    hide(direction: DIRECTION): void;
}
