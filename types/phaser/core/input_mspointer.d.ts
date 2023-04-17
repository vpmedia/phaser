/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 */
export class MSPointer {
    constructor(game: any);
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
    start(): void;
    stop(): void;
    onPointerDown(event: any): void;
    onPointerMove(event: any): void;
    onPointerUp(event: any): void;
    onPointerUpGlobal(event: any): void;
    onPointerOut(event: any): void;
    onPointerOver(event: any): void;
    eventPreventDefault(event: any): void;
}
//# sourceMappingURL=input_mspointer.d.ts.map