export class MSPointer {
    /**
     * TBD.
     * @param {import('./game.js').Game} game - TBD.
     */
    constructor(game: import('./game.js').Game);
    game: import("./game.js").Game;
    input: import("./input.js").Input;
    callbackContext: import("./game.js").Game;
    pointerDownCallback: any;
    pointerMoveCallback: any;
    pointerUpCallback: any;
    capture: boolean;
    button: number;
    event: PointerEvent;
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
     * @param {PointerEvent} event - TBD.
     */
    onPointerDown(event: PointerEvent): void;
    /**
     * TBD.
     * @param {PointerEvent} event - TBD.
     */
    onPointerMove(event: PointerEvent): void;
    /**
     * TBD.
     * @param {PointerEvent} event - TBD.
     */
    onPointerUp(event: PointerEvent): void;
    /**
     * TBD.
     * @param {PointerEvent} event - TBD.
     */
    onPointerUpGlobal(event: PointerEvent): void;
    /**
     * TBD.
     * @param {PointerEvent} event - TBD.
     */
    onPointerOut(event: PointerEvent): void;
    /**
     * TBD.
     * @param {PointerEvent} event - TBD.
     */
    onPointerOver(event: PointerEvent): void;
    /**
     * TBD.
     * @param {Event} event - TBD.
     */
    eventPreventDefault(event: Event): void;
}
//# sourceMappingURL=input_mspointer.d.ts.map