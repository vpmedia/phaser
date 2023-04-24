export class Touch {
    /**
     * TBD.
     * @param {import('./game').Game} game - TBD.
     */
    constructor(game: import('./game').Game);
    game: import("./game").Game;
    enabled: boolean;
    callbackContext: import("./game").Game;
    touchStartCallback: any;
    touchMoveCallback: any;
    touchEndCallback: any;
    touchEnterCallback: any;
    touchLeaveCallback: any;
    touchCancelCallback: any;
    preventDefault: boolean;
    event: TouchEvent;
    _onTouchStart: (event: any) => void;
    _onTouchMove: (event: any) => void;
    _onTouchEnd: (event: any) => void;
    _onTouchEnter: (event: any) => void;
    _onTouchLeave: (event: any) => void;
    _onTouchCancel: (event: any) => void;
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
     */
    consumeDocumentTouches(): void;
    _documentTouchMove: (event: any) => void;
    /**
     * TBD.
     * @param {TouchEvent} event - TBD.
     */
    onTouchStart(event: TouchEvent): void;
    /**
     * TBD.
     * @param {TouchEvent} event - TBD.
     */
    onTouchCancel(event: TouchEvent): void;
    /**
     * TBD.
     * @param {TouchEvent} event - TBD.
     */
    onTouchEnter(event: TouchEvent): void;
    /**
     * TBD.
     * @param {TouchEvent} event - TBD.
     */
    onTouchLeave(event: TouchEvent): void;
    /**
     * TBD.
     * @param {TouchEvent} event - TBD.
     */
    onTouchMove(event: TouchEvent): void;
    /**
     * TBD.
     * @param {TouchEvent} event - TBD.
     */
    onTouchEnd(event: TouchEvent): void;
    /**
     * TBD.
     * @param {TouchEvent} event - TBD.
     */
    eventPreventDefault(event: TouchEvent): void;
}
//# sourceMappingURL=input_touch.d.ts.map