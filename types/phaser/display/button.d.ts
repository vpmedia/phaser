export class Button extends Image {
    /**
     * Creates a new Button instance.
     * @param {import('../core/game.js').Game} game - The game instance this button belongs to.
     * @param {number} x - The x position of the button.
     * @param {number} y - The y position of the button.
     * @param {string} key - The texture key to use for the button.
     * @param {Function} callback - The function to call when the button is clicked.
     * @param {object} callbackContext - The context in which to call the callback function.
     * @param {string} overFrame - The frame identifier to use when the mouse is over the button.
     * @param {string} outFrame - The frame identifier to use when the mouse is outside the button.
     * @param {string} downFrame - The frame identifier to use when the button is pressed.
     * @param {string} upFrame - The frame identifier to use when the button is released.
     * @param {string} disabledFrame - The frame identifier to use when the button is disabled.
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
     * Sets whether this button is enabled or disabled.
     * @param {boolean} isEnabled - Whether the button should be enabled (true) or disabled (false).
     * @param {boolean} isImmediate - Whether to change the state immediately or with a delay (default: false).
     */
    setEnabled(isEnabled: boolean, isImmediate?: boolean): void;
    /**
     * Clears all the frame settings for this button.
     */
    clearFrames(): void;
    /**
     * Called when this button is removed from the world.
     */
    removedFromWorld(): void;
    /**
     * Sets whether input is currently enabled for this button.
     * @param {boolean} value - Whether to enable (true) or disable (false) input.
     */
    set inputEnabled(value: boolean);
    /**
     * Gets whether input is currently enabled for this button.
     * @returns {boolean} True if input is enabled, false otherwise.
     */
    get inputEnabled(): boolean;
    /**
     * Sets a specific frame for a particular state of this button.
     * @param {string} state - The state name (Over, Out, Down, Up, Disabled).
     * @param {string} frame - The frame identifier to set for this state.
     * @param {boolean} switchImmediately - Whether to switch to the new frame immediately (default: false).
     */
    setStateFrame(state: string, frame: string, switchImmediately?: boolean): void;
    /**
     * Changes the frame of this button to match the specified state.
     * @param {string} newState - The new state to change to (Over, Out, Down, Up, Disabled).
     * @returns {boolean} True if the frame was changed, false otherwise.
     */
    changeStateFrame(newState: string): boolean;
    /**
     * Sets the frame identifiers for all states of this button.
     * @param {string} overFrame - The frame identifier to use when the mouse is over the button.
     * @param {string} outFrame - The frame identifier to use when the mouse is outside the button.
     * @param {string} downFrame - The frame identifier to use when the button is pressed.
     * @param {string} upFrame - The frame identifier to use when the button is released.
     * @param {string} disabledFrame - The frame identifier to use when the button is disabled.
     */
    setFrames(overFrame: string, outFrame: string, downFrame: string, upFrame: string, disabledFrame?: string): void;
    /**
     * Handles the input over event for this button.
     * @param {object} sprite - The sprite that triggered the event.
     * @param {object} pointer - The pointer that triggered the event.
     */
    onInputOverHandler(sprite: object, pointer: object): void;
    /**
     * Handles the input out event for this button.
     * @param {object} sprite - The sprite that triggered the event.
     * @param {object} pointer - The pointer that triggered the event.
     */
    onInputOutHandler(sprite: object, pointer: object): void;
    /**
     * Handles the input down event for this button.
     * @param {object} sprite - The sprite that triggered the event.
     * @param {object} pointer - The pointer that triggered the event.
     */
    onInputDownHandler(sprite: object, pointer: object): void;
    /**
     * Handles the input up event for this button.
     * @param {object} sprite - The sprite that triggered the event.
     * @param {object} pointer - The pointer that triggered the event.
     * @param {boolean} isOver - Whether the pointer is currently over the button (default: true).
     */
    onInputUpHandler(sprite: object, pointer: object, isOver: boolean): void;
}
import { Image } from './image.js';
import { Signal } from '../core/signal.js';
import { InputHandler } from '../core/input_handler.js';
//# sourceMappingURL=button.d.ts.map