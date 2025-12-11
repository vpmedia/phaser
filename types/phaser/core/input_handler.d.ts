export class InputHandler {
    /**
     * TBD.
     * @param {import('../display/image.js').Image} sprite - TBD.
     */
    constructor(sprite: import("../display/image.js").Image);
    sprite: import("../display/image.js").Image;
    game: import("./game.js").Game;
    enabled: boolean;
    checked: boolean;
    priorityID: number;
    useHandCursor: boolean;
    _setHandCursor: boolean;
    isDragged: boolean;
    allowHorizontalDrag: boolean;
    allowVerticalDrag: boolean;
    bringToTop: boolean;
    snapOffset: Point;
    snapOnDrag: boolean;
    snapOnRelease: boolean;
    snapX: number;
    snapY: number;
    snapOffsetX: number;
    snapOffsetY: number;
    pixelPerfectOver: boolean;
    pixelPerfectClick: boolean;
    pixelPerfectAlpha: number;
    draggable: boolean;
    boundsRect: import("../geom/rectangle.js").Rectangle;
    boundsSprite: import("../display/display_object.js").DisplayObject;
    scaleLayer: boolean;
    dragOffset: Point;
    dragFromCenter: boolean;
    dragStopBlocksInputUp: boolean;
    dragStartPoint: Point;
    dragDistanceThreshold: number;
    dragTimeThreshold: number;
    downPoint: Point;
    snapPoint: Point;
    _dragPoint: Point;
    _dragPhase: boolean;
    _pendingDrag: boolean;
    _dragTimePass: boolean;
    _dragDistancePass: boolean;
    _wasEnabled: boolean;
    _tempPoint: Point;
    _pointerData: {
        id: number;
        x: number;
        y: number;
        camX: number;
        camY: number;
        isDown: boolean;
        isUp: boolean;
        isOver: boolean;
        isOut: boolean;
        timeOver: number;
        timeOut: number;
        timeDown: number;
        timeUp: number;
        downDuration: number;
        isDragged: boolean;
    }[];
    /**
     * TBD.
     * @param {number} priority - TBD.
     * @param {boolean} useHandCursor - TBD.
     * @returns {import('../display/display_object.js').DisplayObject} TBD.
     */
    start(priority?: number, useHandCursor?: boolean): import("../display/display_object.js").DisplayObject;
    /**
     * TBD.
     */
    addedToGroup(): void;
    /**
     * TBD.
     */
    removedFromGroup(): void;
    /**
     * TBD.
     */
    reset(): void;
    /**
     * TBD.
     */
    stop(): void;
    /**
     * TBD.
     */
    destroy(): void;
    /**
     * TBD.
     * @param {number} highestID - TBD.
     * @param {number} highestRenderID - TBD.
     * @param {boolean} includePixelPerfect - TBD.
     * @returns {boolean} TBD.
     */
    validForInput(highestID: number, highestRenderID: number, includePixelPerfect?: boolean): boolean;
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    isPixelPerfect(): boolean;
    /**
     * TBD.
     * @param {number} pointerId - TBD.
     * @returns {number} TBD.
     */
    pointerX(pointerId?: number): number;
    /**
     * TBD.
     * @param {number} pointerId - TBD.
     * @returns {number} TBD.
     */
    pointerY(pointerId?: number): number;
    /**
     * TBD.
     * @param {number} pointerId - TBD.
     * @returns {boolean} TBD.
     */
    pointerDown(pointerId?: number): boolean;
    /**
     * TBD.
     * @param {number} pointerId - TBD.
     * @returns {boolean} TBD.
     */
    pointerUp(pointerId?: number): boolean;
    /**
     * TBD.
     * @param {number} pointerId - TBD.
     * @returns {number} TBD.
     */
    pointerTimeDown(pointerId?: number): number;
    /**
     * TBD.
     * @param {number} pointerId - TBD.
     * @returns {number} TBD.
     */
    pointerTimeUp(pointerId?: number): number;
    /**
     * TBD.
     * @param {number} pointerId - TBD.
     * @returns {boolean} TBD.
     */
    pointerOver(pointerId?: number): boolean;
    /**
     * TBD.
     * @param {number} pointerId - TBD.
     * @returns {boolean} TBD.
     */
    pointerOut(pointerId?: number): boolean;
    /**
     * TBD.
     * @param {number} pointerId - TBD.
     * @returns {number} TBD.
     */
    pointerTimeOver(pointerId?: number): number;
    /**
     * TBD.
     * @param {number} pointerId - TBD.
     * @returns {number} TBD.
     */
    pointerTimeOut(pointerId?: number): number;
    /**
     * TBD.
     * @param {number} pointerId - TBD.
     * @returns {boolean} TBD.
     */
    pointerDragged(pointerId?: number): boolean;
    /**
     * TBD.
     * @param {import('./input_pointer.js').Pointer} pointer - TBD.
     * @param {boolean} fastTest - TBD.
     * @returns {boolean} TBD.
     */
    checkPointerDown(pointer: import("./input_pointer.js").Pointer, fastTest?: boolean): boolean;
    /**
     * TBD.
     * @param {import('./input_pointer.js').Pointer} pointer - TBD.
     * @param {boolean} fastTest - TBD.
     * @returns {boolean} TBD.
     */
    checkPointerOver(pointer: import("./input_pointer.js").Pointer, fastTest?: boolean): boolean;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {import('./input_pointer.js').Pointer} pointer - TBD.
     * @returns {boolean} TBD.
     */
    checkPixel(x: number, y: number, pointer: import("./input_pointer.js").Pointer): boolean;
    _dx: number;
    _dy: number;
    /**
     * TBD.
     * @param {import('./input_pointer.js').Pointer} pointer - TBD.
     * @returns {boolean} TBD.
     */
    update(pointer: import("./input_pointer.js").Pointer): boolean;
    /**
     * TBD.
     * @param {import('./input_pointer.js').Pointer} pointer - TBD.
     * @param {boolean} silent - TBD.
     */
    _pointerOverHandler(pointer: import("./input_pointer.js").Pointer, silent: boolean): void;
    /**
     * TBD.
     * @param {import('./input_pointer.js').Pointer} pointer - TBD.
     * @param {boolean} silent - TBD.
     */
    _pointerOutHandler(pointer: import("./input_pointer.js").Pointer, silent?: boolean): void;
    /**
     * TBD.
     * @param {import('./input_pointer.js').Pointer} pointer - TBD.
     */
    _touchedHandler(pointer: import("./input_pointer.js").Pointer): void;
    /**
     * TBD.
     * @param {import('./input_pointer.js').Pointer} pointer - TBD.
     */
    dragTimeElapsed(pointer: import("./input_pointer.js").Pointer): void;
    /**
     * TBD.
     * @param {import('./input_pointer.js').Pointer} pointer - TBD.
     */
    _releasedHandler(pointer: import("./input_pointer.js").Pointer): void;
    /**
     * TBD.
     * @param {import('./input_pointer.js').Pointer} pointer - TBD.
     * @param {boolean} fromStart - TBD.
     * @returns {boolean} TBD.
     */
    updateDrag(pointer: import("./input_pointer.js").Pointer, fromStart?: boolean): boolean;
    /**
     * TBD.
     * @param {number} pointerId - TBD.
     * @param {number} delay - TBD.
     * @returns {boolean} TBD.
     */
    justOver(pointerId?: number, delay?: number): boolean;
    /**
     * TBD.
     * @param {number} pointerId - TBD.
     * @param {number} delay - TBD.
     * @returns {boolean} TBD.
     */
    justOut(pointerId?: number, delay?: number): boolean;
    /**
     * TBD.
     * @param {number} pointerId - TBD.
     * @param {number} delay - TBD.
     * @returns {boolean} TBD.
     */
    justPressed(pointerId?: number, delay?: number): boolean;
    /**
     * TBD.
     * @param {number} pointerId - TBD.
     * @param {number} delay - TBD.
     * @returns {boolean} TBD.
     */
    justReleased(pointerId?: number, delay?: number): boolean;
    /**
     * TBD.
     * @param {number} pointerId - TBD.
     * @returns {number} TBD.
     */
    overDuration(pointerId?: number): number;
    /**
     * TBD.
     * @param {number} pointerId - TBD.
     * @returns {number} TBD.
     */
    downDuration(pointerId?: number): number;
    /**
     * TBD.
     * @param {boolean} lockCenter - TBD.
     * @param {boolean} bringToTop - TBD.
     * @param {boolean} pixelPerfect - TBD.
     * @param {number} alphaThreshold - TBD.
     * @param {import('../geom/rectangle.js').Rectangle | null | undefined} boundsRect - TBD.
     * @param {import('../display/display_object.js').DisplayObject | null | undefined} boundsSprite - TBD.
     */
    enableDrag(lockCenter?: boolean, bringToTop?: boolean, pixelPerfect?: boolean, alphaThreshold?: number, boundsRect?: import("../geom/rectangle.js").Rectangle | null | undefined, boundsSprite?: import("../display/display_object.js").DisplayObject | null | undefined): void;
    /**
     * TBD.
     */
    disableDrag(): void;
    _draggedPointerID: number;
    /**
     * TBD.
     * @param {import('./input_pointer.js').Pointer} pointer - TBD.
     */
    startDrag(pointer: import("./input_pointer.js").Pointer): void;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @returns {number} TBD.
     */
    globalToLocalX(x: number): number;
    /**
     * TBD.
     * @param {number} y - TBD.
     * @returns {number} TBD.
     */
    globalToLocalY(y: number): number;
    /**
     * TBD.
     * @param {import('./input_pointer.js').Pointer} pointer - TBD.
     */
    stopDrag(pointer: import("./input_pointer.js").Pointer): void;
    /**
     * TBD.
     * @param {boolean} allowHorizontal - TBD.
     * @param {boolean} allowVertical - TBD.
     */
    setDragLock(allowHorizontal?: boolean, allowVertical?: boolean): void;
    /**
     * TBD.
     * @param {number} snapX - TBD.
     * @param {number} snapY - TBD.
     * @param {boolean} onDrag - TBD.
     * @param {boolean} onRelease - TBD.
     * @param {number} snapOffsetX - TBD.
     * @param {number} snapOffsetY - TBD.
     */
    enableSnap(snapX: number, snapY: number, onDrag?: boolean, onRelease?: boolean, snapOffsetX?: number, snapOffsetY?: number): void;
    /**
     * TBD.
     */
    disableSnap(): void;
    /**
     * TBD.
     */
    checkBoundsRect(): void;
    /**
     * TBD.
     */
    checkBoundsSprite(): void;
}
import { Point } from '../geom/point.js';
//# sourceMappingURL=input_handler.d.ts.map