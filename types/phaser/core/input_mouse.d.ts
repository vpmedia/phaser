export class Mouse {
    constructor(game: any);
    game: any;
    input: any;
    callbackContext: any;
    mouseDownCallback: any;
    mouseUpCallback: any;
    mouseOutCallback: any;
    mouseOverCallback: any;
    mouseWheelCallback: any;
    capture: boolean;
    button: number;
    wheelDelta: number;
    enabled: boolean;
    locked: boolean;
    stopOnGameOut: boolean;
    event: any;
    _onMouseDown: ((event: any) => void) | null;
    _onMouseMove: ((event: any) => void) | null;
    _onMouseUp: ((event: any) => void) | null;
    _onMouseOut: ((event: any) => void) | null;
    _onMouseOver: ((event: any) => void) | null;
    _onMouseWheel: ((event: any) => void) | null;
    _wheelEvent: any;
    start(): void;
    _onMouseUpGlobal: ((event: any) => void) | undefined;
    _onMouseOutGlobal: ((event: any) => void) | undefined;
    stop(): void;
    onMouseDown(event: any): void;
    onMouseMove(event: any): void;
    onMouseUp(event: any): void;
    onMouseUpGlobal(event: any): void;
    onMouseOutGlobal(event: any): void;
    onMouseOut(event: any): void;
    onMouseOver(event: any): void;
    onMouseWheel(event: any): void;
    eventPreventDefault(event: any): void;
}
//# sourceMappingURL=input_mouse.d.ts.map