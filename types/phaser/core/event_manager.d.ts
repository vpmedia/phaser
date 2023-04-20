export class EventManager {
    /**
     * TBD.
     * @param sprite
     */
    constructor(sprite: any);
    parent: any;
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
     */
    get onAddedToGroup(): Signal;
    /**
     * TBD.
     * @param {...any} args
     */
    onAddedToGroup$dispatch(...args: any[]): void;
    /**
     * TBD.
     */
    get onRemovedFromGroup(): Signal;
    /**
     * TBD.
     * @param {...any} args
     */
    onRemovedFromGroup$dispatch(...args: any[]): void;
    /**
     * TBD.
     */
    get onDestroy(): Signal;
    /**
     * TBD.
     * @param {...any} args
     */
    onDestroy$dispatch(...args: any[]): void;
    /**
     * TBD.
     */
    get onOutOfBounds(): Signal;
    /**
     * TBD.
     * @param {...any} args
     */
    onOutOfBounds$dispatch(...args: any[]): void;
    /**
     * TBD.
     */
    get onEnterBounds(): Signal;
    /**
     * TBD.
     * @param {...any} args
     */
    onEnterBounds$dispatch(...args: any[]): void;
    /**
     * TBD.
     */
    get onInputOver(): Signal;
    /**
     * TBD.
     * @param {...any} args
     */
    onInputOver$dispatch(...args: any[]): void;
    /**
     * TBD.
     */
    get onInputOut(): Signal;
    /**
     * TBD.
     * @param {...any} args
     */
    onInputOut$dispatch(...args: any[]): void;
    /**
     * TBD.
     */
    get onInputDown(): Signal;
    /**
     * TBD.
     * @param {...any} args
     */
    onInputDown$dispatch(...args: any[]): void;
    /**
     * TBD.
     */
    get onInputUp(): Signal;
    /**
     * TBD.
     * @param {...any} args
     */
    onInputUp$dispatch(...args: any[]): void;
    /**
     * TBD.
     */
    get onDragStart(): Signal;
    /**
     * TBD.
     * @param {...any} args
     */
    onDragStart$dispatch(...args: any[]): void;
    /**
     * TBD.
     */
    get onDragUpdate(): Signal;
    /**
     * TBD.
     * @param {...any} args
     */
    onDragUpdate$dispatch(...args: any[]): void;
    /**
     * TBD.
     */
    get onDragStop(): Signal;
    /**
     * TBD.
     * @param {...any} args
     */
    onDragStop$dispatch(...args: any[]): void;
    /**
     * TBD.
     */
    get onAnimationStart(): Signal;
    /**
     * TBD.
     * @param {...any} args
     */
    onAnimationStart$dispatch(...args: any[]): void;
    /**
     * TBD.
     */
    get onAnimationComplete(): Signal;
    /**
     * TBD.
     * @param {...any} args
     */
    onAnimationComplete$dispatch(...args: any[]): void;
    /**
     * TBD.
     */
    get onAnimationLoop(): Signal;
    /**
     * TBD.
     * @param {...any} args
     */
    onAnimationLoop$dispatch(...args: any[]): void;
}
import { Signal } from './signal';
//# sourceMappingURL=event_manager.d.ts.map