/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 */
export class Touch {
    constructor(game: any);
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
    start(): void;
    stop(): void;
    consumeDocumentTouches(): void;
    _documentTouchMove: (event: any) => void;
    onTouchStart(event: any): void;
    onTouchCancel(event: any): void;
    onTouchEnter(event: any): void;
    onTouchLeave(event: any): void;
    onTouchMove(event: any): void;
    onTouchEnd(event: any): void;
    eventPreventDefault(event: any): void;
}
//# sourceMappingURL=input_touch.d.ts.map