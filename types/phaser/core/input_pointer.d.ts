export class Pointer {
    /**
     * TBD.
     * @param {import('./game.js').Game} game - TBD.
     * @param {number} id - TBD.
     * @param {number} pointerMode - TBD.
     */
    constructor(game: import("./game.js").Game, id: number, pointerMode: number);
    game: import("./game.js").Game;
    id: number;
    /** @type {number} */
    type: number;
    exists: boolean;
    /** @type {number} */
    identifier: number;
    pointerId: number;
    pointerMode: number;
    target: EventTarget;
    button: any;
    _holdSent: boolean;
    _history: any[];
    /** @type {number} */
    _nextDrop: number;
    _stateReset: boolean;
    withinGame: boolean;
    clientX: number;
    /** @type {number} */
    clientY: number;
    /** @type {number} */
    pageX: number;
    /** @type {number} */
    pageY: number;
    /** @type {number} */
    screenX: number;
    /** @type {number} */
    screenY: number;
    /** @type {number} */
    rawMovementX: number;
    /** @type {number} */
    rawMovementY: number;
    /** @type {number} */
    movementX: number;
    /** @type {number} */
    movementY: number;
    /** @type {number} */
    x: number;
    /** @type {number} */
    y: number;
    isMouse: boolean;
    isDown: boolean;
    isUp: boolean;
    /** @type {number} */
    timeDown: number;
    /** @type {number} */
    timeUp: number;
    /** @type {number} */
    previousTapTime: number;
    /** @type {number} */
    totalTouches: number;
    msSinceLastClick: number;
    targetObject: any;
    interactiveCandidates: any[];
    active: boolean;
    dirty: boolean;
    position: Point;
    positionDown: Point;
    positionUp: Point;
    circle: Circle;
    _clickTrampolines: any;
    _trampolineTargetObject: any;
    /**
     * TBD.
     */
    resetButtons(): void;
    /**
     * TBD.
     * @param {MouseEvent|PointerEvent} event - TBD.
     */
    updateButtons(event: MouseEvent | PointerEvent): void;
    /**
     * TBD.
     * @param {PointerEvent} event - TBD.
     * @returns {Pointer} TBD.
     */
    start(event: PointerEvent): Pointer;
    /**
     * TBD.
     */
    update(): void;
    /**
     * TBD.
     * @param {MouseEvent|PointerEvent} event - TBD.
     * @param {boolean} fromClick - TBD.
     * @returns {Pointer} TBD.
     */
    move(event: MouseEvent | PointerEvent, fromClick?: boolean): Pointer;
    /**
     * TBD.
     * @param {boolean} fromClick - TBD.
     * @returns {boolean} TBD.
     */
    processInteractiveObjects(fromClick?: boolean): boolean;
    /**
     * TBD.
     * @param {import('./input_handler.js').InputHandler} newTarget - TBD.
     * @param {boolean} silent - TBD.
     */
    swapTarget(newTarget: import("./input_handler.js").InputHandler, silent?: boolean): void;
    /**
     * TBD.
     * @param {MouseEvent|PointerEvent} event - TBD.
     */
    leave(event: MouseEvent | PointerEvent): void;
    /**
     * TBD.
     * @param {MouseEvent|PointerEvent} event - TBD.
     * @returns {Pointer} TBD.
     */
    stop(event: MouseEvent | PointerEvent): Pointer;
    /**
     * TBD.
     * @param {number} duration - TBD.
     * @returns {boolean} TBD.
     */
    justPressed(duration: number): boolean;
    /**
     * TBD.
     * @param {number} duration - TBD.
     * @returns {boolean} TBD.
     */
    justReleased(duration: number): boolean;
    /**
     * TBD.
     * @param {string} name - TBD.
     * @param {Function} callback - TBD.
     * @param {object} callbackContext - TBD.
     * @param {...any} callbackArgs - TBD.
     */
    addClickTrampoline(name: string, callback: Function, callbackContext: object, callbackArgs: any[]): void;
    /**
     * TBD.
     */
    processClickTrampolines(): void;
    /**
     * TBD.
     */
    reset(): void;
    /**
     * TBD.
     */
    resetMovement(): void;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get duration(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get worldX(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get worldY(): number;
}
import { Point } from '../geom/point.js';
import { Circle } from '../geom/circle.js';
//# sourceMappingURL=input_pointer.d.ts.map