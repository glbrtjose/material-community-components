import { AfterViewInit, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DIRECTION } from './directions';
import { MccSpeedDialActionsComponent } from './speed-dial-actions.component';
export declare class MccSpeedDialComponent implements AfterViewInit, OnChanges {
    /**
     * Hold speed-dial-actions component inside this component
     */
    actions: MccSpeedDialActionsComponent;
    /**
     * Set initial 'open' state
     */
    set isOpen(open: boolean);
    get isOpen(): boolean;
    private _isOpen;
    /**
     * When enabled, handle open/close state on mouse hover
     */
    set hover(hover: boolean);
    private _hover;
    /**
     * Enable/disable spin animation when button is clicked or hovered
     */
    set spin(spin: boolean);
    get spin(): boolean;
    private _spin;
    /**
     * Define the direction of the actions button
     * Directions available are: up | down | left | right
     */
    set direction(direction: DIRECTION);
    get direction(): DIRECTION;
    private _direction;
    /**
     * Event emitted when open state change
     */
    openStateChange: EventEmitter<boolean>;
    constructor();
    /**
     * Call fab speed dial actions functions to change the
     * visibility of the buttons
     */
    private _setActionsState;
    /**
     * Set initial state to the action buttons inside speed-dial-actions
     */
    ngAfterViewInit(): void;
    /**
     *
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * When mouseHover is enabled and state is closed
     * calls toggle to open the actions
     */
    hoverStart(): void;
    /**
     * When mouseHover is enabled and state is open
     * calls toggle to close the actions
     */
    hoverStop(): void;
    /**
     * Change the open state
     */
    toggle(): void;
}
