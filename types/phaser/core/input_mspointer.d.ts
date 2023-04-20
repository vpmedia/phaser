export class MSPointer {
    /**
     * TBD.
     * @param {Game} game - TBD.
     */
    constructor(game: Game);
    game: Game;
    input: import("./input").Input;
    callbackContext: Game;
    pointerDownCallback: any;
    pointerMoveCallback: any;
    pointerUpCallback: any;
    capture: boolean;
    button: number;
    event: any;
    enabled: boolean;
    _onMSPointerDown: (event: any) => void;
    _onMSPointerMove: (event: any) => void;
    _onMSPointerUp: (event: any) => void;
    _onMSPointerUpGlobal: (event: any) => void;
    _onMSPointerOut: (event: any) => void;
    _onMSPointerOver: (event: any) => void;
    /**
     * TBD.
     */
    start(): void;
    /**
     * TBD.
     */
    stop(): void;
    /**
     * TBD.
     * @param event
     */
    onPointerDown(event: any): void;
    /**
     * TBD.
     * @param event
     */
    onPointerMove(event: any): void;
    /**
     * TBD.
     * @param event
     */
    onPointerUp(event: any): void;
    /**
     * TBD.
     * @param event
     */
    onPointerUpGlobal(event: any): void;
    /**
     * TBD.
     * @param event
     */
    onPointerOut(event: any): void;
    /**
     * TBD.
     * @param event
     */
    onPointerOver(event: any): void;
    /**
     * TBD.
     * @param event
     */
    eventPreventDefault(event: any): void;
}
import { Game } from './game';
//# sourceMappingURL=input_mspointer.d.ts.map