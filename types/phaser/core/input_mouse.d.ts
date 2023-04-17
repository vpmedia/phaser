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
    _onMouseDown: (event: any) => void;
    _onMouseMove: (event: any) => void;
    _onMouseUp: (event: any) => void;
    _onMouseOut: (event: any) => void;
    _onMouseOver: (event: any) => void;
    _onMouseWheel: (event: any) => void;
    _wheelEvent: any;
    start(): void;
    _onMouseUpGlobal: (event: any) => void;
    _onMouseOutGlobal: (event: any) => void;
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