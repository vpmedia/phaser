export class Button extends Image {
    /**
     * TBD.
     * @param {Game} game - TBD.
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
    constructor(game: Game, x?: number, y?: number, key?: string, callback?: Function, callbackContext?: object, overFrame?: string, outFrame?: string, downFrame?: string, upFrame?: string);
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
    /**
     * TBD.
     * @param isEnabled
     * @param isImmediate
     */
    setEnabled(isEnabled: any, isImmediate: any): void;
    /**
     * TBD.
     */
    clearFrames(): void;
    /**
     * TBD.
     */
    removedFromWorld(): void;
    /**
     * TBD.
     */
    set inputEnabled(arg: boolean);
    /**
     * TBD.
     */
    get inputEnabled(): boolean;
    /**
     * TBD.
     * @param state
     * @param frame
     * @param switchImmediately
     */
    setStateFrame(state: any, frame: any, switchImmediately?: boolean): void;
    /**
     * TBD.
     * @param newState
     */
    changeStateFrame(newState: any): boolean;
    /**
     * TBD.
     * @param overFrame
     * @param outFrame
     * @param downFrame
     * @param upFrame
     */
    setFrames(overFrame: any, outFrame: any, downFrame: any, upFrame: any): void;
    /**
     * TBD.
     * @param sprite
     * @param pointer
     */
    onInputOverHandler(sprite: any, pointer: any): void;
    /**
     * TBD.
     * @param sprite
     * @param pointer
     */
    onInputOutHandler(sprite: any, pointer: any): void;
    /**
     * TBD.
     * @param sprite
     * @param pointer
     */
    onInputDownHandler(sprite: any, pointer: any): void;
    /**
     * TBD.
     * @param sprite
     * @param pointer
     * @param isOver
     */
    onInputUpHandler(sprite: any, pointer: any, isOver: any): void;
}
import { Image } from './image';
import { Signal } from '../core/signal';
import { InputHandler } from '../core/input_handler';
import { Game } from '../core/game';
//# sourceMappingURL=button.d.ts.map