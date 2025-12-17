export class Animation {
    /**
     * Creates a new Animation instance.
     * @param {import('./game.js').Game} game - The game instance this animation belongs to.
     * @param {import('../display/image.js').Image} parent - The Image object that owns this animation.
     * @param {string} name - The unique name of this animation.
     * @param {import('./frame_data.js').FrameData} frameData - The FrameData object that contains the frames for this animation.
     * @param {string[]|number[]} frames - An array of frame identifiers (names or indices) to use in this animation.
     * @param {number} frameRate - The frame rate at which this animation should play (frames per second).
     * @param {boolean} loop - Whether the animation should loop when it completes.
     */
    constructor(game: import("./game.js").Game, parent: import("../display/image.js").Image, name: string, frameData: import("./frame_data.js").FrameData, frames: string[] | number[], frameRate: number, loop?: boolean);
    /** @type {import('./game.js').Game} */
    game: import("./game.js").Game;
    _parent: import("../display/image.js").Image;
    /** @type {import('./frame_data.js').FrameData} */
    _frameData: import("./frame_data.js").FrameData;
    /** @type {string} */
    name: string;
    _frames: any[];
    /** @type {number} */
    delay: number;
    /** @type {boolean} */
    loop: boolean;
    /** @type {number} */
    loopCount: number;
    /** @type {boolean} */
    isFinished: boolean;
    /** @type {boolean} */
    isPlaying: boolean;
    /** @type {boolean} */
    isPaused: boolean;
    /** @type {number} */
    _pauseStartTime: number;
    /** @type {number} */
    _frameIndex: number;
    /** @type {number} */
    _frameDiff: number;
    /** @type {number} */
    _frameSkip: number;
    currentFrame: import("./frame.js").Frame;
    /** @type {Signal} */
    onStart: Signal;
    /** @type {Signal} */
    onUpdate: Signal;
    /** @type {Signal} */
    onComplete: Signal;
    /** @type {Signal} */
    onLoop: Signal;
    /** @type {boolean} */
    isReversed: boolean;
    /**
     * Plays this animation.
     * @param {number} frameRate - The new frame rate to use for this animation (if null, uses the original frame rate).
     * @param {boolean} loop - Whether to loop this animation (if null, uses the original loop setting).
     * @returns {Animation} This Animation instance for chaining.
     */
    play(frameRate?: number, loop?: boolean): Animation;
    /**
     * Sets whether this animation is currently paused.
     * @param {boolean} value - True to pause the animation, false to resume it.
     */
    set paused(value: boolean);
    /**
     * Gets whether this animation is currently paused.
     * @returns {boolean} True if the animation is paused, false otherwise.
     */
    get paused(): boolean;
    _timeLastFrame: number;
    _timeNextFrame: number;
    /**
     * Restarts this animation from the beginning.
     */
    restart(): void;
    /**
     * Reverses the direction of this animation.
     * @returns {Animation} This Animation instance for chaining.
     */
    reverse(): Animation;
    /**
     * Sets whether this animation is currently reversed.
     * @param {boolean} value - True to reverse the animation, false to normal direction.
     */
    set reversed(value: boolean);
    /**
     * Gets whether this animation is currently reversed.
     * @returns {boolean} True if the animation is reversed, false otherwise.
     */
    get reversed(): boolean;
    /**
     * Reverses the animation direction once, then returns to normal direction.
     * @returns {Animation} This Animation instance for chaining.
     */
    reverseOnce(): Animation;
    /**
     * Sets the current frame of this animation.
     * @param {string|number} frameId - The identifier (name or index) of the frame to set.
     * @param {boolean} useLocalFrameIndex - If true, treats frameId as an index into the local frames array.
     */
    setFrame(frameId: string | number, useLocalFrameIndex?: boolean): void;
    /**
     * Stops this animation.
     * @param {boolean} resetFrame - If true, resets to the first frame.
     * @param {boolean} dispatchComplete - If true, dispatches the onComplete signal.
     */
    stop(resetFrame?: boolean, dispatchComplete?: boolean): void;
    /**
     * Called when the game is paused.
     */
    onPause(): void;
    /**
     * Called when the game is resumed.
     */
    onResume(): void;
    /**
     * Updates this animation.
     * @returns {boolean} True if the animation was updated, false otherwise.
     */
    update(): boolean;
    /**
     * Updates the current frame of this animation.
     * @param {boolean} signalUpdate - Whether to signal the update event.
     * @param {boolean} fromPlay - Whether this call is from play().
     * @returns {boolean} True if the frame was updated, false otherwise.
     */
    updateCurrentFrame(signalUpdate: boolean, fromPlay?: boolean): boolean;
    /**
     * Advances the animation to the next frame(s).
     * @param {number} quantity - The number of frames to advance by.
     */
    next(quantity?: number): void;
    /**
     * Moves the animation to the previous frame(s).
     * @param {number} quantity - The number of frames to move back by.
     */
    previous(quantity?: number): void;
    /**
     * Updates the frame data used by this animation.
     * @param {import('./frame_data.js').FrameData} frameData - The new FrameData object to use.
     */
    updateFrameData(frameData: import("./frame_data.js").FrameData): void;
    /**
     * Destroys this animation and cleans up resources.
     */
    destroy(): void;
    /**
     * Completes this animation, setting it to the final frame.
     */
    complete(): void;
    /**
     * Gets the total number of frames in this animation.
     * @returns {number} The total number of frames.
     */
    get frameTotal(): number;
    /**
     * Sets the current frame index.
     * @param {number} value - The new frame index to set.
     */
    set frame(value: number);
    /**
     * Gets the current frame index.
     * @returns {number} The current frame index.
     */
    get frame(): number;
    /**
     * Sets the animation speed (frame rate).
     * @param {number} value - The new frame rate in frames per second.
     */
    set speed(value: number);
    /**
     * Gets the current animation speed (frame rate).
     * @returns {number} The frame rate in frames per second.
     */
    get speed(): number;
    /**
     * Sets whether the update signal is enabled.
     * @param {boolean} value - True to enable the update signal, false to disable it.
     */
    set enableUpdate(value: boolean);
    /**
     * Gets whether the update signal is enabled.
     * @returns {boolean} True if the update signal is enabled, false otherwise.
     */
    get enableUpdate(): boolean;
}
import { Signal } from './signal.js';
//# sourceMappingURL=animation.d.ts.map