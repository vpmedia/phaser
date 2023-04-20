export class Pointer {
    /**
     * TBD.
     * @param {object} game - TBD.
     * @param id
     * @param pointerMode
     */
    constructor(game: object, id: any, pointerMode: any);
    game: any;
    id: any;
    type: number;
    exists: boolean;
    identifier: number;
    pointerId: any;
    pointerMode: any;
    target: any;
    button: any;
    _holdSent: boolean;
    _history: any[];
    _nextDrop: number;
    _stateReset: boolean;
    withinGame: boolean;
    clientX: number;
    clientY: number;
    pageX: number;
    pageY: number;
    screenX: number;
    screenY: number;
    rawMovementX: number;
    rawMovementY: number;
    movementX: number;
    movementY: number;
    x: number;
    y: number;
    isMouse: boolean;
    isDown: boolean;
    isUp: boolean;
    timeDown: number;
    timeUp: number;
    previousTapTime: number;
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
     * @param event
     */
    updateButtons(event: any): void;
    /**
     * TBD.
     * @param event
     */
    start(event: any): Pointer;
    /**
     * TBD.
     */
    update(): void;
    /**
     * TBD.
     * @param event
     * @param fromClick
     */
    move(event: any, fromClick?: boolean): Pointer;
    /**
     * TBD.
     * @param fromClick
     */
    processInteractiveObjects(fromClick?: boolean): boolean;
    /**
     * TBD.
     * @param newTarget
     * @param silent
     */
    swapTarget(newTarget: any, silent?: boolean): void;
    /**
     * TBD.
     * @param event
     */
    leave(event: any): void;
    /**
     * TBD.
     * @param event
     */
    stop(event: any): Pointer;
    /**
     * TBD.
     * @param duration
     */
    justPressed(duration: any): boolean;
    /**
     * TBD.
     * @param duration
     */
    justReleased(duration: any): boolean;
    /**
     * TBD.
     * @param name
     * @param callback
     * @param callbackContext
     * @param callbackArgs
     */
    addClickTrampoline(name: any, callback: any, callbackContext: any, callbackArgs: any): void;
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
     */
    get duration(): number;
    /**
     * TBD.
     */
    get worldX(): number;
    /**
     * TBD.
     */
    get worldY(): number;
}
import { Point } from '../geom/point';
import { Circle } from '../geom/circle';
//# sourceMappingURL=input_pointer.d.ts.map