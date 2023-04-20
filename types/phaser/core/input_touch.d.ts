export class Touch {
    /**
     * TBD.
     * @param {object} game - TBD.
     */
    constructor(game: object);
    game: any;
    enabled: boolean;
    callbackContext: any;
    touchStartCallback: any;
    touchMoveCallback: any;
    touchEndCallback: any;
    touchEnterCallback: any;
    touchLeaveCallback: any;
    touchCancelCallback: any;
    preventDefault: boolean;
    event: any;
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
     * @param event
     */
    onTouchStart(event: any): void;
    /**
     * TBD.
     * @param event
     */
    onTouchCancel(event: any): void;
    /**
     * TBD.
     * @param event
     */
    onTouchEnter(event: any): void;
    /**
     * TBD.
     * @param event
     */
    onTouchLeave(event: any): void;
    /**
     * TBD.
     * @param event
     */
    onTouchMove(event: any): void;
    /**
     * TBD.
     * @param event
     */
    onTouchEnd(event: any): void;
    /**
     * TBD.
     * @param event
     */
    eventPreventDefault(event: any): void;
}
//# sourceMappingURL=input_touch.d.ts.map