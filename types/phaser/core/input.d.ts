export class Input {
    /**
     * TBD.
     * @param {import('./game.js').Game} game - TBD.
     */
    constructor(game: import('./game').Game);
    game: import("./game").Game;
    hitCanvas: HTMLCanvasElement;
    hitContext: CanvasRenderingContext2D;
    moveCallbacks: any[];
    lockCallbacks: any[];
    customCandidateHandler: Function;
    customCandidateHandlerContext: any;
    pollRate: number;
    enabled: boolean;
    multiInputOverride: number;
    position: Point;
    speed: Point;
    circle: Circle;
    scale: Point;
    maxPointers: number;
    tapRate: number;
    doubleTapRate: number;
    holdRate: number;
    justPressedRate: number;
    justReleasedRate: number;
    recordPointerHistory: boolean;
    recordRate: number;
    recordLimit: number;
    pointer1: any;
    pointer2: any;
    pointer3: any;
    pointer4: any;
    pointer5: any;
    pointer6: any;
    pointer7: any;
    pointer8: any;
    pointer9: any;
    pointer10: any;
    pointers: any[];
    activePointer: Pointer;
    mousePointer: Pointer;
    mouse: Mouse;
    touch: Touch;
    mspointer: MSPointer;
    resetLocked: boolean;
    onDown: Signal;
    onUp: Signal;
    onTap: Signal;
    onHold: Signal;
    minPriorityID: number;
    interactiveItems: ArraySet;
    _localPoint: Point;
    _pollCounter: number;
    _oldPosition: Point;
    _x: number;
    _y: number;
    /**
     * TBD.
     */
    boot(): void;
    _onClickTrampoline: (event: any) => void;
    /**
     * TBD.
     */
    destroy(): void;
    /**
     * TBD.
     * @param {Function} callback - TBD.
     * @param {object} context - TBD.
     */
    setInteractiveCandidateHandler(callback: Function, context: object): void;
    /**
     * TBD.
     * @param {Function} callback - TBD.
     * @param {object} context - TBD.
     */
    addMoveCallback(callback: Function, context: object): void;
    /**
     * TBD.
     * @param {Function} callback - TBD.
     * @param {object} context - TBD.
     */
    deleteMoveCallback(callback: Function, context: object): void;
    /**
     * TBD.
     * @returns {Pointer} TBD.
     */
    addPointer(): Pointer;
    /**
     * TBD.
     */
    update(): void;
    /**
     * TBD.
     * @param {boolean} hard - TBD.
     */
    reset(hard?: boolean): void;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    resetSpeed(x: number, y: number): void;
    /**
     * TBD.
     * @param {MouseEvent|TouchEvent|PointerEvent} event - TBD.
     * @returns {Pointer} TBD.
     */
    startPointer(event: MouseEvent | TouchEvent | PointerEvent): Pointer;
    /**
     * TBD.
     * @param {MouseEvent|TouchEvent|PointerEvent} event - TBD.
     * @returns {Pointer} TBD.
     */
    updatePointer(event: MouseEvent | TouchEvent | PointerEvent): Pointer;
    /**
     * TBD.
     * @param {MouseEvent|TouchEvent|PointerEvent} event - TBD.
     * @returns {Pointer} TBD.
     */
    stopPointer(event: MouseEvent | TouchEvent | PointerEvent): Pointer;
    /**
     * TBD.
     * @param {number} limit - TBD.
     * @returns {number} TBD.
     */
    countActivePointers(limit?: number): number;
    /**
     * TBD.
     * @param {boolean} isActive - TBD.
     * @returns {Pointer} TBD.
     */
    getPointer(isActive?: boolean): Pointer;
    /**
     * TBD.
     * @param {number} identifier - TBD.
     * @returns {Pointer} TBD.
     */
    getPointerFromIdentifier(identifier: number): Pointer;
    /**
     * TBD.
     * @param {number} pointerId - TBD.
     * @returns {Pointer} TBD.
     */
    getPointerFromId(pointerId: number): Pointer;
    /**
     * TBD.
     * @param {import('../display/display_object').DisplayObject} displayObject - TBD.
     * @param {Pointer} pointer - TBD.
     * @param {Point} output - TBD.
     * @returns {Point} TBD.
     */
    getLocalPosition(displayObject: import('../display/display_object').DisplayObject, pointer: Pointer, output?: Point): Point;
    /**
     * TBD.
     * @param {import('../display/display_object').DisplayObject} displayObject - TBD.
     * @param {Pointer} pointer - TBD.
     * @param {Point} localPoint - TBD.
     * @returns {boolean} TBD.
     */
    hitTest(displayObject: import('../display/display_object').DisplayObject, pointer: Pointer, localPoint: Point): boolean;
    /**
     * TBD.
     */
    onClickTrampoline(): void;
    /**
     * TBD.
     */
    set x(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get x(): number;
    /**
     * TBD.
     */
    set y(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get y(): number;
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    get pollLocked(): boolean;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get totalInactivePointers(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get totalActivePointers(): number;
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
import { Circle } from '../geom/circle';
import { Point } from '../geom/point';
import { ArraySet } from './array_set';
import { Mouse } from './input_mouse';
import { MSPointer } from './input_mspointer';
import { Pointer } from './input_pointer';
import { Touch } from './input_touch';
import { Signal } from './signal';
//# sourceMappingURL=input.d.ts.map
