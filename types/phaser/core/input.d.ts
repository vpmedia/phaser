export class Input {
    /**
     * TBD.
     * @param {object} game - TBD.
     */
    constructor(game: object);
    game: any;
    hitCanvas: any;
    hitContext: any;
    moveCallbacks: any[];
    lockCallbacks: any[];
    customCandidateHandler: any;
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
     * @param callback - TBD.
     * @param context
     */
    setInteractiveCandidateHandler(callback: any, context: any): void;
    /**
     * TBD.
     * @param callback - TBD.
     * @param context
     */
    addMoveCallback(callback: any, context: any): void;
    /**
     * TBD.
     * @param callback - TBD.
     * @param context
     */
    deleteMoveCallback(callback: any, context: any): void;
    /**
     * TBD.
     */
    addPointer(): Pointer;
    /**
     * TBD.
     */
    update(): void;
    /**
     * TBD.
     * @param hard
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
     * @param event
     */
    startPointer(event: any): any;
    /**
     * TBD.
     * @param event
     */
    updatePointer(event: any): any;
    /**
     * TBD.
     * @param event
     */
    stopPointer(event: any): any;
    /**
     * TBD.
     * @param limit
     */
    countActivePointers(limit?: number): number;
    /**
     * TBD.
     * @param isActive
     */
    getPointer(isActive?: boolean): any;
    /**
     * TBD.
     * @param identifier
     */
    getPointerFromIdentifier(identifier: any): any;
    /**
     * TBD.
     * @param pointerId
     */
    getPointerFromId(pointerId: any): any;
    /**
     * TBD.
     * @param displayObject
     * @param pointer
     * @param output
     */
    getLocalPosition(displayObject: any, pointer: any, output?: any): any;
    /**
     * TBD.
     * @param displayObject
     * @param pointer
     * @param localPoint
     */
    hitTest(displayObject: any, pointer: any, localPoint: any): any;
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
     */
    get x(): number;
    /**
     * TBD.
     */
    set y(arg: number);
    /**
     * TBD.
     */
    get y(): number;
    /**
     * TBD.
     */
    get pollLocked(): boolean;
    /**
     * TBD.
     */
    get totalInactivePointers(): number;
    /**
     * TBD.
     */
    get totalActivePointers(): number;
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
import { Pointer } from './input_pointer';
import { Mouse } from './input_mouse';
import { Touch } from './input_touch';
import { MSPointer } from './input_mspointer';
import { Signal } from './signal';
import { ArraySet } from './array_set';
//# sourceMappingURL=input.d.ts.map