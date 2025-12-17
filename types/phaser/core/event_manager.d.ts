export class EventManager {
    /**
     * Creates a new EventManager instance.
     * @param {import('../display/display_object.js').DisplayObject} sprite - Reference to the parent DisplayObject.
     */
    constructor(sprite: import("../display/display_object.js").DisplayObject);
    parent: import("../display/display_object.js").DisplayObject;
    _onAddedToGroup: Signal;
    _onRemovedFromGroup: Signal;
    _onDestroy: Signal;
    _onOutOfBounds: Signal;
    _onEnterBounds: Signal;
    _onInputOver: Signal;
    _onInputOut: Signal;
    _onInputDown: Signal;
    _onInputUp: Signal;
    _onDragStart: Signal;
    _onDragUpdate: Signal;
    _onDragStop: Signal;
    _onAnimationStart: Signal;
    _onAnimationComplete: Signal;
    _onAnimationLoop: Signal;
    /**
     * Destroys the EventManager and cleans up resources.
     */
    destroy(): void;
    _parent: any;
    /**
     * Gets the onAddedToGroup signal.
     * @returns {Signal} The Signal object for the onAddedToGroup event.
     */
    get onAddedToGroup(): Signal;
    /**
     * Dispatches the onAddedToGroup event.
     * @param {...any} args - Arguments to pass to the signal.
     */
    onAddedToGroup$dispatch(...args: any[]): void;
    /**
     * Gets the onRemovedFromGroup signal.
     * @returns {Signal} The Signal object for the onRemovedFromGroup event.
     */
    get onRemovedFromGroup(): Signal;
    /**
     * Dispatches the onRemovedFromGroup event.
     * @param {...any} args - Arguments to pass to the signal.
     */
    onRemovedFromGroup$dispatch(...args: any[]): void;
    /**
     * Gets the onDestroy signal.
     * @returns {Signal} The Signal object for the onDestroy event.
     */
    get onDestroy(): Signal;
    /**
     * Dispatches the onDestroy event.
     * @param {...any} args - Arguments to pass to the signal.
     */
    onDestroy$dispatch(...args: any[]): void;
    /**
     * Gets the onOutOfBounds signal.
     * @returns {Signal} The Signal object for the onOutOfBounds event.
     */
    get onOutOfBounds(): Signal;
    /**
     * Dispatches the onOutOfBounds event.
     * @param {...any} args - Arguments to pass to the signal.
     */
    onOutOfBounds$dispatch(...args: any[]): void;
    /**
     * Gets the onEnterBounds signal.
     * @returns {Signal} The Signal object for the onEnterBounds event.
     */
    get onEnterBounds(): Signal;
    /**
     * Dispatches the onEnterBounds event.
     * @param {...any} args - Arguments to pass to the signal.
     */
    onEnterBounds$dispatch(...args: any[]): void;
    /**
     * Gets the onInputOver signal.
     * @returns {Signal} The Signal object for the onInputOver event.
     */
    get onInputOver(): Signal;
    /**
     * Dispatches the onInputOver event.
     * @param {...any} args - Arguments to pass to the signal.
     */
    onInputOver$dispatch(...args: any[]): void;
    /**
     * Gets the onInputOut signal.
     * @returns {Signal} The Signal object for the onInputOut event.
     */
    get onInputOut(): Signal;
    /**
     * Dispatches the onInputOut event.
     * @param {...any} args - Arguments to pass to the signal.
     */
    onInputOut$dispatch(...args: any[]): void;
    /**
     * Gets the onInputDown signal.
     * @returns {Signal} The Signal object for the onInputDown event.
     */
    get onInputDown(): Signal;
    /**
     * Dispatches the onInputDown event.
     * @param {...any} args - Arguments to pass to the signal.
     */
    onInputDown$dispatch(...args: any[]): void;
    /**
     * Gets the onInputUp signal.
     * @returns {Signal} The Signal object for the onInputUp event.
     */
    get onInputUp(): Signal;
    /**
     * Dispatches the onInputUp event.
     * @param {...any} args - Arguments to pass to the signal.
     */
    onInputUp$dispatch(...args: any[]): void;
    /**
     * Gets the onDragStart signal.
     * @returns {Signal} The Signal object for the onDragStart event.
     */
    get onDragStart(): Signal;
    /**
     * Dispatches the onDragStart event.
     * @param {...any} args - Arguments to pass to the signal.
     */
    onDragStart$dispatch(...args: any[]): void;
    /**
     * Gets the onDragUpdate signal.
     * @returns {Signal} The Signal object for the onDragUpdate event.
     */
    get onDragUpdate(): Signal;
    /**
     * Dispatches the onDragUpdate event.
     * @param {...any} args - Arguments to pass to the signal.
     */
    onDragUpdate$dispatch(...args: any[]): void;
    /**
     * Gets the onDragStop signal.
     * @returns {Signal} The Signal object for the onDragStop event.
     */
    get onDragStop(): Signal;
    /**
     * Dispatches the onDragStop event.
     * @param {...any} args - Arguments to pass to the signal.
     */
    onDragStop$dispatch(...args: any[]): void;
    /**
     * Gets the onAnimationStart signal.
     * @returns {Signal} The Signal object for the onAnimationStart event.
     */
    get onAnimationStart(): Signal;
    /**
     * Dispatches the onAnimationStart event.
     * @param {...any} args - Arguments to pass to the signal.
     */
    onAnimationStart$dispatch(...args: any[]): void;
    /**
     * Gets the onAnimationComplete signal.
     * @returns {Signal} The Signal object for the onAnimationComplete event.
     */
    get onAnimationComplete(): Signal;
    /**
     * Dispatches the onAnimationComplete event.
     * @param {...any} args - Arguments to pass to the signal.
     */
    onAnimationComplete$dispatch(...args: any[]): void;
    /**
     * Gets the onAnimationLoop signal.
     * @returns {Signal} The Signal object for the onAnimationLoop event.
     */
    get onAnimationLoop(): Signal;
    /**
     * Dispatches the onAnimationLoop event.
     * @param {...any} args - Arguments to pass to the signal.
     */
    onAnimationLoop$dispatch(...args: any[]): void;
}
import { Signal } from './signal.js';
//# sourceMappingURL=event_manager.d.ts.map