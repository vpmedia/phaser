/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
export default class _default {
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
    _onTouchStart: ((event: any) => void) | null;
    _onTouchMove: ((event: any) => void) | null;
    _onTouchEnd: ((event: any) => void) | null;
    _onTouchEnter: ((event: any) => void) | null;
    _onTouchLeave: ((event: any) => void) | null;
    _onTouchCancel: ((event: any) => void) | null;
    start(): void;
    stop(): void;
    consumeDocumentTouches(): void;
    _documentTouchMove: ((event: any) => void) | undefined;
    onTouchStart(event: any): void;
    onTouchCancel(event: any): void;
    onTouchEnter(event: any): void;
    onTouchLeave(event: any): void;
    onTouchMove(event: any): void;
    onTouchEnd(event: any): void;
    eventPreventDefault(event: any): void;
}
//# sourceMappingURL=input_touch.d.ts.map