export default class _default {
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
    snapOffset: Point | null;
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
    start(priority?: number, useHandCursor?: boolean): any;
    addedToGroup(): void;
    removedFromGroup(): void;
    reset(): void;
    stop(): void;
    destroy(): void;
    validForInput(highestID: any, highestRenderID: any, includePixelPerfect?: boolean): boolean;
    isPixelPerfect(): boolean;
    pointerX(pointerId?: number): number;
    pointerY(pointerId?: number): number;
    pointerDown(pointerId?: number): boolean;
    pointerUp(pointerId?: number): boolean;
    pointerTimeDown(pointerId?: number): number;
    pointerTimeUp(pointerId?: number): number;
    pointerOver(pointerId: any): boolean;
    pointerOut(pointerId: any): boolean;
    pointerTimeOver(pointerId?: number): number;
    pointerTimeOut(pointerId?: number): number;
    pointerDragged(pointerId?: number): boolean;
    checkPointerDown(pointer?: number, fastTest?: boolean): boolean;
    checkPointerOver(pointer?: number, fastTest?: boolean): boolean;
    checkPixel(x: any, y: any, pointer: any): boolean;
    _dx: any;
    _dy: any;
    update(pointer: any): boolean;
    _pointerOverHandler(pointer: any, silent: any): void;
    _pointerOutHandler(pointer: any, silent: any): void;
    _touchedHandler(pointer: any): void;
    dragTimeElapsed(pointer: any): void;
    _releasedHandler(pointer: any): void;
    updateDrag(pointer: any, fromStart?: boolean): boolean;
    justOver(pointerId?: number, delay?: number): boolean;
    justOut(pointerId?: number, delay?: number): boolean;
    justPressed(pointerId?: number, delay?: number): boolean;
    justReleased(pointerId?: number, delay?: number): boolean;
    overDuration(pointerId?: number): number;
    downDuration(pointerId?: number): number;
    enableDrag(lockCenter?: boolean, bringToTop?: boolean, pixelPerfect?: boolean, alphaThreshold?: number, boundsRect?: null, boundsSprite?: null): void;
    disableDrag(): void;
    _draggedPointerID: any;
    startDrag(pointer: any): void;
    globalToLocalX(x: any): any;
    globalToLocalY(y: any): any;
    stopDrag(pointer: any): void;
    setDragLock(allowHorizontal?: boolean, allowVertical?: boolean): void;
    enableSnap(snapX: any, snapY: any, onDrag?: boolean, onRelease?: boolean, snapOffsetX?: number, snapOffsetY?: number): void;
    disableSnap(): void;
    checkBoundsRect(): void;
    checkBoundsSprite(): void;
}
import { Point } from '../geom/point';
//# sourceMappingURL=input_handler.d.ts.map