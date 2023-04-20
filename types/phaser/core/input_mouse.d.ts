export class Mouse {
    /**
     * TBD.
     * @param {Game} game - TBD.
     */
    constructor(game: Game);
    game: Game;
    input: import("./input").Input;
    callbackContext: Game;
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
     * @param event
     */
    onMouseDown(event: any): void;
    /**
     * TBD.
     * @param event
     */
    onMouseMove(event: any): void;
    /**
     * TBD.
     * @param event
     */
    onMouseUp(event: any): void;
    /**
     * TBD.
     * @param event
     */
    onMouseUpGlobal(event: any): void;
    /**
     * TBD.
     * @param event
     */
    onMouseOutGlobal(event: any): void;
    /**
     * TBD.
     * @param event
     */
    onMouseOut(event: any): void;
    /**
     * TBD.
     * @param event
     */
    onMouseOver(event: any): void;
    /**
     * TBD.
     * @param event
     */
    onMouseWheel(event: any): void;
    /**
     * TBD.
     * @param event
     */
    eventPreventDefault(event: any): void;
}
import { Game } from './game';
//# sourceMappingURL=input_mouse.d.ts.map