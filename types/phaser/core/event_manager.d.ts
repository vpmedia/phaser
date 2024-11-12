export class EventManager {
    /**
     * TBD.
     * @param {import('../display/display_object.js').DisplayObject} sprite - TBD.
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
     * TBD.
     */
    destroy(): void;
    _parent: any;
    /**
     * TBD.
     * @returns {Signal} TBD.
     */
    get onAddedToGroup(): Signal;
    /**
     * TBD.
     * @param {...any} args - TBD.
     */
    onAddedToGroup$dispatch(...args: any[]): void;
    /**
     * TBD.
     * @returns {Signal} TBD.
     */
    get onRemovedFromGroup(): Signal;
    /**
     * TBD.
     * @param {...any} args - TBD.
     */
    onRemovedFromGroup$dispatch(...args: any[]): void;
    /**
     * TBD.
     * @returns {Signal} TBD.
     */
    get onDestroy(): Signal;
    /**
     * TBD.
     * @param {...any} args - TBD.
     */
    onDestroy$dispatch(...args: any[]): void;
    /**
     * TBD.
     * @returns {Signal} TBD.
     */
    get onOutOfBounds(): Signal;
    /**
     * TBD.
     * @param {...any} args - TBD.
     */
    onOutOfBounds$dispatch(...args: any[]): void;
    /**
     * TBD.
     * @returns {Signal} TBD.
     */
    get onEnterBounds(): Signal;
    /**
     * TBD.
     * @param {...any} args - TBD.
     */
    onEnterBounds$dispatch(...args: any[]): void;
    /**
     * TBD.
     * @returns {Signal} TBD.
     */
    get onInputOver(): Signal;
    /**
     * TBD.
     * @param {...any} args - TBD.
     */
    onInputOver$dispatch(...args: any[]): void;
    /**
     * TBD.
     * @returns {Signal} TBD.
     */
    get onInputOut(): Signal;
    /**
     * TBD.
     * @param {...any} args - TBD.
     */
    onInputOut$dispatch(...args: any[]): void;
    /**
     * TBD.
     * @returns {Signal} TBD.
     */
    get onInputDown(): Signal;
    /**
     * TBD.
     * @param {...any} args - TBD.
     */
    onInputDown$dispatch(...args: any[]): void;
    /**
     * TBD.
     * @returns {Signal} TBD.
     */
    get onInputUp(): Signal;
    /**
     * TBD.
     * @param {...any} args - TBD.
     */
    onInputUp$dispatch(...args: any[]): void;
    /**
     * TBD.
     * @returns {Signal} TBD.
     */
    get onDragStart(): Signal;
    /**
     * TBD.
     * @param {...any} args - TBD.
     */
    onDragStart$dispatch(...args: any[]): void;
    /**
     * TBD.
     * @returns {Signal} TBD.
     */
    get onDragUpdate(): Signal;
    /**
     * TBD.
     * @param {...any} args - TBD.
     */
    onDragUpdate$dispatch(...args: any[]): void;
    /**
     * TBD.
     * @returns {Signal} TBD.
     */
    get onDragStop(): Signal;
    /**
     * TBD.
     * @param {...any} args - TBD.
     */
    onDragStop$dispatch(...args: any[]): void;
    /**
     * TBD.
     * @returns {Signal} TBD.
     */
    get onAnimationStart(): Signal;
    /**
     * TBD.
     * @param {...any} args - TBD.
     */
    onAnimationStart$dispatch(...args: any[]): void;
    /**
     * TBD.
     * @returns {Signal} TBD.
     */
    get onAnimationComplete(): Signal;
    /**
     * TBD.
     * @param {...any} args - TBD.
     */
    onAnimationComplete$dispatch(...args: any[]): void;
    /**
     * TBD.
     * @returns {Signal} TBD.
     */
    get onAnimationLoop(): Signal;
    /**
     * TBD.
     * @param {...any} args - TBD.
     */
    onAnimationLoop$dispatch(...args: any[]): void;
}
import { Signal } from './signal.js';
//# sourceMappingURL=event_manager.d.ts.map