export default class _default extends Image {
    /**
     * TBD.
     *
     * @param {object} game - TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {string} key - TBD.
     * @param {Function} callback - TBD.
     * @param {object} callbackContext - TBD.
     * @param {string} overFrame - TBD.
     * @param {string} outFrame - TBD.
     * @param {string} downFrame - TBD.
     * @param {string} upFrame - TBD.
     */
    constructor(game: object, x?: number, y?: number, key?: string, callback?: Function, callbackContext?: object, overFrame?: string, outFrame?: string, downFrame?: string, upFrame?: string);
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