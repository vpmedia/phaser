export class MSPointer {
    /**
     * TBD.
     * @param {object} game - TBD.
     */
    constructor(game: object);
    game: any;
    input: any;
    callbackContext: any;
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
//# sourceMappingURL=input_mspointer.d.ts.map