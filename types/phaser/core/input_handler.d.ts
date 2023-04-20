export class InputHandler {
    /**
     * TBD.
     * @param sprite
     */
    constructor(sprite: any);
    sprite: any;
    game: any;
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
    boundsRect: any;
    boundsSprite: any;
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
     * @param priority
     * @param useHandCursor
     */
    start(priority?: number, useHandCursor?: boolean): any;
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
     * @param highestID
     * @param highestRenderID
     * @param includePixelPerfect
     */
    validForInput(highestID: any, highestRenderID: any, includePixelPerfect?: boolean): boolean;
    /**
     * TBD.
     */
    isPixelPerfect(): boolean;
    /**
     * TBD.
     * @param pointerId
     */
    pointerX(pointerId?: number): number;
    /**
     * TBD.
     * @param pointerId
     */
    pointerY(pointerId?: number): number;
    /**
     * TBD.
     * @param pointerId
     */
    pointerDown(pointerId?: number): boolean;
    /**
     * TBD.
     * @param pointerId
     */
    pointerUp(pointerId?: number): boolean;
    /**
     * TBD.
     * @param pointerId
     */
    pointerTimeDown(pointerId?: number): number;
    /**
     * TBD.
     * @param pointerId
     */
    pointerTimeUp(pointerId?: number): number;
    /**
     * TBD.
     * @param pointerId
     */
    pointerOver(pointerId: any): boolean;
    /**
     * TBD.
     * @param pointerId
     */
    pointerOut(pointerId: any): boolean;
    /**
     * TBD.
     * @param pointerId
     */
    pointerTimeOver(pointerId?: number): number;
    /**
     * TBD.
     * @param pointerId
     */
    pointerTimeOut(pointerId?: number): number;
    /**
     * TBD.
     * @param pointerId
     */
    pointerDragged(pointerId?: number): boolean;
    /**
     * TBD.
     * @param pointer
     * @param fastTest
     */
    checkPointerDown(pointer?: number, fastTest?: boolean): boolean;
    /**
     * TBD.
     * @param pointer
     * @param fastTest
     */
    checkPointerOver(pointer?: number, fastTest?: boolean): boolean;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param pointer
     */
    checkPixel(x: number, y: number, pointer: any): boolean;
    _dx: number;
    _dy: number;
    /**
     * TBD.
     * @param pointer
     */
    update(pointer: any): boolean;
    /**
     * TBD.
     * @param pointer
     * @param silent
     */
    _pointerOverHandler(pointer: any, silent: any): void;
    /**
     * TBD.
     * @param pointer
     * @param silent
     */
    _pointerOutHandler(pointer: any, silent: any): void;
    /**
     * TBD.
     * @param pointer
     */
    _touchedHandler(pointer: any): void;
    /**
     * TBD.
     * @param pointer
     */
    dragTimeElapsed(pointer: any): void;
    /**
     * TBD.
     * @param pointer
     */
    _releasedHandler(pointer: any): void;
    /**
     * TBD.
     * @param pointer
     * @param fromStart
     */
    updateDrag(pointer: any, fromStart?: boolean): boolean;
    /**
     * TBD.
     * @param pointerId
     * @param delay
     */
    justOver(pointerId?: number, delay?: number): boolean;
    /**
     * TBD.
     * @param pointerId
     * @param delay
     */
    justOut(pointerId?: number, delay?: number): boolean;
    /**
     * TBD.
     * @param pointerId
     * @param delay
     */
    justPressed(pointerId?: number, delay?: number): boolean;
    /**
     * TBD.
     * @param pointerId
     * @param delay
     */
    justReleased(pointerId?: number, delay?: number): boolean;
    /**
     * TBD.
     * @param pointerId
     */
    overDuration(pointerId?: number): number;
    /**
     * TBD.
     * @param pointerId
     */
    downDuration(pointerId?: number): number;
    /**
     * TBD.
     * @param lockCenter
     * @param bringToTop
     * @param pixelPerfect
     * @param alphaThreshold
     * @param boundsRect
     * @param boundsSprite
     */
    enableDrag(lockCenter?: boolean, bringToTop?: boolean, pixelPerfect?: boolean, alphaThreshold?: number, boundsRect?: any, boundsSprite?: any): void;
    /**
     * TBD.
     */
    disableDrag(): void;
    _draggedPointerID: any;
    /**
     * TBD.
     * @param pointer
     */
    startDrag(pointer: any): void;
    /**
     * TBD.
     * @param {number} x - TBD.
     */
    globalToLocalX(x: number): number;
    /**
     * TBD.
     * @param {number} y - TBD.
     */
    globalToLocalY(y: number): number;
    /**
     * TBD.
     * @param pointer
     */
    stopDrag(pointer: any): void;
    /**
     * TBD.
     * @param allowHorizontal
     * @param allowVertical
     */
    setDragLock(allowHorizontal?: boolean, allowVertical?: boolean): void;
    /**
     * TBD.
     * @param snapX
     * @param snapY
     * @param onDrag
     * @param onRelease
     * @param snapOffsetX
     * @param snapOffsetY
     */
    enableSnap(snapX: any, snapY: any, onDrag?: boolean, onRelease?: boolean, snapOffsetX?: number, snapOffsetY?: number): void;
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
import { Point } from '../geom/point';
//# sourceMappingURL=input_handler.d.ts.map