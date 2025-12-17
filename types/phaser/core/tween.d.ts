export class Tween {
    /**
     * Creates a new Tween instance.
     * @param {import('../display/display_object.js').DisplayObject} target - The object to tween.
     * @param {import('./game.js').Game} game - Reference to the Phaser Game instance.
     * @param {import('./tween_manager.js').TweenManager} manager - Reference to the Tween Manager.
     */
    constructor(target: import("../display/display_object.js").DisplayObject, game: import("./game.js").Game, manager: import("./tween_manager.js").TweenManager);
    game: import("./game.js").Game;
    target: import("../display/display_object.js").DisplayObject;
    /** @type {import('./tween_manager.js').TweenManager} */
    manager: import("./tween_manager.js").TweenManager;
    /** @type {TweenData[]} */
    timeline: TweenData[];
    /** @type {boolean} */
    reverse: boolean;
    /** @type {number} */
    timeScale: number;
    /** @type {number} */
    repeatCounter: number;
    /** @type {boolean} */
    pendingDelete: boolean;
    /** @type {Signal} */
    onStart: Signal;
    /** @type {Signal} */
    onLoop: Signal;
    /** @type {Signal} */
    onRepeat: Signal;
    /** @type {Signal} */
    onChildComplete: Signal;
    /** @type {Signal} */
    onComplete: Signal;
    /** @type {boolean} */
    isRunning: boolean;
    /** @type {number} */
    current: number;
    properties: {};
    chainedTween: any;
    /** @type {boolean} */
    isPaused: boolean;
    _onUpdateCallback: Function;
    _onUpdateCallbackContext: any;
    /** @type {number} */
    _pausedTime: number;
    /** @type {boolean} */
    _codePaused: boolean;
    /** @type {boolean} */
    _hasStarted: boolean;
    /**
     * Adds a tween to the timeline that animates properties to their target values.
     * @param {object} properties - The properties to tween and their target values.
     * @param {number} duration - The duration of the tween in milliseconds.
     * @param {string | Function} ease - The easing function to use.
     * @param {boolean} autoStart - Whether to start the tween immediately.
     * @param {number} delay - The delay before starting the tween in milliseconds.
     * @param {number} repeat - Number of times to repeat the tween.
     * @param {boolean} yoyo - Whether to reverse the tween on repeat.
     * @returns {Tween} This Tween object for chaining.
     */
    to(properties: object, duration?: number, ease?: string | Function, autoStart?: boolean, delay?: number, repeat?: number, yoyo?: boolean): Tween;
    /**
     * Adds a tween to the timeline that animates properties from their current values.
     * @param {object} properties - The properties to tween and their target values.
     * @param {number} duration - The duration of the tween in milliseconds.
     * @param {string | Function} ease - The easing function to use.
     * @param {boolean} autoStart - Whether to start the tween immediately.
     * @param {number} delay - The delay before starting the tween in milliseconds.
     * @param {number} repeat - Number of times to repeat the tween.
     * @param {boolean} yoyo - Whether to reverse the tween on repeat.
     * @returns {Tween} This Tween object for chaining.
     */
    from(properties: object, duration?: number, ease?: string | Function, autoStart?: boolean, delay?: number, repeat?: number, yoyo?: boolean): Tween;
    /**
     * Starts the tween timeline from a specific index.
     * @param {number} index - The index to start from in the timeline.
     * @returns {Tween} This Tween object for chaining.
     */
    start(index?: number): Tween;
    /**
     * Stops the tween and optionally completes it.
     * @param {boolean} complete - Whether to dispatch the complete event.
     * @returns {Tween} This Tween object for chaining.
     */
    stop(complete?: boolean): Tween;
    /**
     * Updates a property in the tween data.
     * @param {string} property - The property name to update.
     * @param {object} value - The new value for the property.
     * @param {number} index - The index in the timeline to update.
     * @returns {Tween} This Tween object for chaining.
     */
    updateTweenData(property: string, value: object, index?: number): Tween;
    /**
     * Sets a delay for a specific timeline entry.
     * @param {number} duration - The delay in milliseconds.
     * @param {number} index - The index in the timeline to apply the delay to.
     * @returns {Tween} This Tween object for chaining.
     */
    delay(duration: number, index: number): Tween;
    /**
     * Sets how many times to repeat the tween.
     * @param {number} total - The number of times to repeat (-1 for infinite).
     * @param {number} repeatDelay - Delay between repeats in milliseconds.
     * @param {number} index - The index in the timeline to apply the repeat to.
     * @returns {Tween} This Tween object for chaining.
     */
    repeat(total: number, repeatDelay?: number, index?: number): Tween;
    /**
     * Sets the repeat delay for a specific timeline entry.
     * @param {number} duration - The delay between repeats in milliseconds.
     * @param {number} index - The index in the timeline to apply the delay to.
     * @returns {Tween} This Tween object for chaining.
     */
    repeatDelay(duration: number, index: number): Tween;
    /**
     * Enables or disables yoyo behavior for a timeline entry.
     * @param {boolean} enable - Whether to enable yoyo behavior.
     * @param {number} yoyoDelay - Delay between yoyo cycles in milliseconds.
     * @param {number} index - The index in the timeline to apply yoyo to.
     * @returns {Tween} This Tween object for chaining.
     */
    yoyo(enable: boolean, yoyoDelay?: number, index?: number): Tween;
    /**
     * Sets the yoyo delay for a specific timeline entry.
     * @param {number} duration - The delay between yoyo cycles in milliseconds.
     * @param {number} index - The index in the timeline to apply the delay to.
     * @returns {Tween} This Tween object for chaining.
     */
    yoyoDelay(duration: number, index: number): Tween;
    /**
     * Sets the easing function for a timeline entry.
     * @param {string|Function} ease - The easing function to use.
     * @param {number} index - The index in the timeline to apply easing to.
     * @returns {Tween} This Tween object for chaining.
     */
    easing(ease: string | Function, index: number): Tween;
    /**
     * Sets the interpolation function for a timeline entry.
     * @param {Function} interpolation - The interpolation function to use.
     * @param {object} context - The context in which to call the interpolation function.
     * @param {number} index - The index in the timeline to apply interpolation to.
     * @returns {Tween} This Tween object for chaining.
     */
    interpolation(interpolation: Function, context?: object, index?: number): Tween;
    /**
     * Sets how many times to repeat all timeline entries.
     * @param {number} total - The number of times to repeat (-1 for infinite).
     * @returns {Tween} This Tween object for chaining.
     */
    repeatAll(total?: number): Tween;
    /**
     * Chains one or more tweens to this tween.
     * @param {...any} args - The tweens to chain.
     * @returns {Tween} This Tween object for chaining.
     */
    chain(...args: any[]): Tween;
    /**
     * Sets whether the tween should loop infinitely.
     * @param {boolean} value - Whether to loop infinitely.
     * @returns {Tween} This Tween object for chaining.
     */
    loop(value?: boolean): Tween;
    /**
     * Sets a callback to be called when the tween updates.
     * @param {Function} callback - The callback function to call.
     * @param {object} callbackContext - The context in which to call the callback.
     * @returns {Tween} This Tween object for chaining.
     */
    onUpdateCallback(callback: Function, callbackContext: object): Tween;
    /**
     * Pauses the tween.
     */
    pause(): void;
    /**
     * Internal method to pause the tween.
     */
    _pause(): void;
    /**
     * Resumes the tween.
     */
    resume(): void;
    /**
     * Internal method to resume the tween.
     */
    _resume(): void;
    /**
     * Updates the tween state at a given time.
     * @param {number} time - The current game time.
     * @returns {boolean} True if the tween should continue running, false if it's complete.
     */
    update(time: number): boolean;
    /**
     * Generates animation data for a given frame rate.
     * @param {number} frameRate - The target frame rate.
     * @param {object[]} data - The array to store the generated data in.
     * @returns {object[]} The populated data array.
     */
    generateData(frameRate?: number, data?: object[]): object[];
    /**
     * Gets the total duration of all timeline entries.
     * @returns {number} The total duration in milliseconds.
     */
    get totalDuration(): number;
}
import { TweenData } from './tween_data.js';
import { Signal } from './signal.js';
//# sourceMappingURL=tween.d.ts.map