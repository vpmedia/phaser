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
    event: Event;
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
     * @param {Event} event - TBD.
     */
    onPointerDown(event: Event): void;
    /**
     * TBD.
     * @param {Event} event - TBD.
     */
    onPointerMove(event: Event): void;
    /**
     * TBD.
     * @param {Event} event - TBD.
     */
    onPointerUp(event: Event): void;
    /**
     * TBD.
     * @param {Event} event - TBD.
     */
    onPointerUpGlobal(event: Event): void;
    /**
     * TBD.
     * @param {Event} event - TBD.
     */
    onPointerOut(event: Event): void;
    /**
     * TBD.
     * @param {Event} event - TBD.
     */
    onPointerOver(event: Event): void;
    /**
     * TBD.
     * @param {Event} event - TBD.
     */
    eventPreventDefault(event: Event): void;
}
import { Game } from './game';
//# sourceMappingURL=input_mspointer.d.ts.map