export default class _default extends Image {
    constructor(game: any, x?: number, y?: number, key?: null, callback?: null, callbackContext?: null, overFrame?: null, outFrame?: null, downFrame?: null, upFrame?: null);
    _onOverFrame: any;
    _onOutFrame: any;
    _onDownFrame: any;
    _onUpFrame: any;
    _onDisabledFrame: any;
    onInputOver: Signal;
    onInputOut: Signal;
    onInputDown: Signal;
    onInputUp: Signal;
    onOverMouseOnly: boolean;
    justReleasedPreventsOver: number;
    freezeFrames: boolean;
    forceOut: boolean;
    input: InputHandler;
    setEnabled(isEnabled: any, isImmediate: any): void;
    clearFrames(): void;
    removedFromWorld(): void;
    set inputEnabled(arg: boolean);
    get inputEnabled(): boolean;
    setStateFrame(state: any, frame: any, switchImmediately?: boolean): void;
    changeStateFrame(newState: any): boolean;
    setFrames(overFrame: any, outFrame: any, downFrame: any, upFrame: any): void;
    onInputOverHandler(sprite: any, pointer: any): void;
    onInputOutHandler(sprite: any, pointer: any): void;
    onInputDownHandler(sprite: any, pointer: any): void;
    onInputUpHandler(sprite: any, pointer: any, isOver: any): void;
}
import Image from './image';
import Signal from '../core/signal';
import InputHandler from '../core/input_handler';
//# sourceMappingURL=button.d.ts.map