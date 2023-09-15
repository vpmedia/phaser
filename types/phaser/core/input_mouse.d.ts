export class Mouse {
    /**
     * TBD.
     * @param {import('./game.js').Game} game - TBD.
     */
    constructor(game: import('./game.js').Game);
    game: import("./game.js").Game;
    input: import("./input.js").Input;
    callbackContext: import("./game.js").Game;
    mouseDownCallback: any;
    mouseUpCallback: any;
    mouseOutCallback: any;
    mouseOverCallback: any;
    mouseWheelCallback: any;
    mouseMoveCallback: any;
    capture: boolean;
    button: number;
    wheelDelta: number;
    enabled: boolean;
    locked: boolean;
    stopOnGameOut: boolean;
    event: MouseEvent | WheelEvent;
    _onMouseDown: (event: any) => void;
    _onMouseMove: (event: any) => void;
    _onMouseUp: (event: any) => void;
    _onMouseOut: (event: any) => void;
    _onMouseOver: (event: any) => void;
    _onMouseWheel: (event: any) => void;
    _wheelEvent: any;
    /**
     * TBD.
     */
    start(): void;
    _onMouseUpGlobal: (event: any) => void;
    _onMouseOutGlobal: (event: any) => void;
    /**
     * TBD.
     */
    stop(): void;
    /**
     * TBD.
     * @param {MouseEvent} event - TBD.
     */
    onMouseDown(event: MouseEvent): void;
    /**
     * TBD.
     * @param {MouseEvent} event - TBD.
     */
    onMouseMove(event: MouseEvent): void;
    /**
     * TBD.
     * @param {MouseEvent} event - TBD.
     */
    onMouseUp(event: MouseEvent): void;
    /**
     * TBD.
     * @param {MouseEvent} event - TBD.
     */
    onMouseUpGlobal(event: MouseEvent): void;
    /**
     * TBD.
     * @param {MouseEvent} event - TBD.
     */
    onMouseOutGlobal(event: MouseEvent): void;
    /**
     * TBD.
     * @param {MouseEvent} event - TBD.
     */
    onMouseOut(event: MouseEvent): void;
    /**
     * TBD.
     * @param {MouseEvent} event - TBD.
     */
    onMouseOver(event: MouseEvent): void;
    /**
     * TBD.
     * @param {WheelEvent} event - TBD.
     */
    onMouseWheel(event: WheelEvent): void;
    /**
     * TBD.
     * @param {MouseEvent} event - TBD.
     */
    eventPreventDefault(event: MouseEvent): void;
}
//# sourceMappingURL=input_mouse.d.ts.map