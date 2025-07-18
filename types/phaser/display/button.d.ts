export class Button extends Image {
    /**
     * TBD.
     * @param {import('../core/game.js').Game} game - TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {string} key - TBD.
     * @param {Function} callback - TBD.
     * @param {object} callbackContext - TBD.
     * @param {string} overFrame - TBD.
     * @param {string} outFrame - TBD.
     * @param {string} downFrame - TBD.
     * @param {string} upFrame - TBD.
     * @param {string} disabledFrame - TBD.
     */
    constructor(game: import("../core/game.js").Game, x?: number, y?: number, key?: string, callback?: Function, callbackContext?: object, overFrame?: string, outFrame?: string, downFrame?: string, upFrame?: string, disabledFrame?: string);
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
     * @param {boolean} isEnabled - TBD.
     * @param {boolean} isImmediate - TBD.
     */
    setEnabled(isEnabled: boolean, isImmediate?: boolean): void;
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
    set inputEnabled(value: boolean);
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    get inputEnabled(): boolean;
    /**
     * TBD.
     * @param {string} state - TBD.
     * @param {string} frame - TBD.
     * @param {boolean} switchImmediately - TBD.
     */
    setStateFrame(state: string, frame: string, switchImmediately?: boolean): void;
    /**
     * TBD.
     * @param {string} newState - TBD.
     * @returns {boolean} TBD.
     */
    changeStateFrame(newState: string): boolean;
    /**
     * TBD.
     * @param {string} overFrame - TBD.
     * @param {string} outFrame - TBD.
     * @param {string} downFrame - TBD.
     * @param {string} upFrame - TBD.
     * @param {string} disabledFrame - TBD.
     */
    setFrames(overFrame: string, outFrame: string, downFrame: string, upFrame: string, disabledFrame?: string): void;
    /**
     * TBD.
     * @param {object} sprite - TBD.
     * @param {object} pointer - TBD.
     */
    onInputOverHandler(sprite: object, pointer: object): void;
    /**
     * TBD.
     * @param {object} sprite - TBD.
     * @param {object} pointer - TBD.
     */
    onInputOutHandler(sprite: object, pointer: object): void;
    /**
     * TBD.
     * @param {object} sprite - TBD.
     * @param {object} pointer - TBD.
     */
    onInputDownHandler(sprite: object, pointer: object): void;
    /**
     * TBD.
     * @param {object} sprite - TBD.
     * @param {object} pointer - TBD.
     * @param {boolean} isOver - TBD.
     */
    onInputUpHandler(sprite: object, pointer: object, isOver: boolean): void;
}
import { Image } from './image.js';
import { Signal } from '../core/signal.js';
import { InputHandler } from '../core/input_handler.js';
//# sourceMappingURL=button.d.ts.map