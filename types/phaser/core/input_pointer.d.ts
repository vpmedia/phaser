export default class _default {
    constructor(game: any, id: any, pointerMode: any);
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
    resetButtons(): void;
    updateButtons(event: any): void;
    start(event: any): default;
    update(): void;
    move(event: any, fromClick?: boolean): default | null;
    processInteractiveObjects(fromClick?: boolean): boolean;
    swapTarget(newTarget: any, silent?: boolean): void;
    leave(event: any): void;
    stop(event: any): default | null;
    justPressed(duration: any): boolean;
    justReleased(duration: any): boolean;
    addClickTrampoline(name: any, callback: any, callbackContext: any, callbackArgs: any): void;
    processClickTrampolines(): void;
    reset(): void;
    resetMovement(): void;
    get duration(): number;
    get worldX(): number;
    get worldY(): number;
}
import Point from '../geom/point';
import Circle from '../geom/circle';
//# sourceMappingURL=input_pointer.d.ts.map