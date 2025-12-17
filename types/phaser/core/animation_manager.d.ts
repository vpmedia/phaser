export class AnimationManager {
    /**
     * Creates a new AnimationManager instance.
     * @param {import('../display/image.js').Image} sprite - Reference to the parent Sprite.
     */
    constructor(sprite: import("../display/image.js").Image);
    sprite: import("../display/image.js").Image;
    game: import("./game.js").Game;
    /** @type {import('./frame.js').Frame} */
    currentFrame: import("./frame.js").Frame;
    /** @type {Animation} */
    currentAnim: Animation;
    updateIfVisible: boolean;
    isLoaded: boolean;
    /** @type {import('./frame_data.js').FrameData} */
    _frameData: import("./frame_data.js").FrameData;
    /** @type {{[key: string]: Animation}} */
    _anims: {
        [key: string]: Animation;
    };
    /** @type {number[]} */
    _outputFrames: number[];
    /**
     * Destroys the AnimationManager and cleans up resources.
     */
    destroy(): void;
    /**
     * Loads frame data into the AnimationManager.
     * @param {import('./frame_data.js').FrameData} frameData - The FrameData to load.
     * @param {string|number} frame - The frame index or name to set as current.
     * @returns {boolean} True if the frame data was loaded successfully, false otherwise.
     */
    loadFrameData(frameData: import("./frame_data.js").FrameData, frame: string | number): boolean;
    /**
     * Sets the current frame index.
     */
    set frame(value: number);
    /**
     * Gets the current frame index.
     * @returns {number} The current frame index.
     */
    get frame(): number;
    /**
     * Sets the current frame by name.
     */
    set frameName(value: string);
    /**
     * Gets the current frame name.
     * @returns {string} The current frame name, or null if no frame is set.
     */
    get frameName(): string;
    /**
     * Copies frame data into the AnimationManager.
     * @param {import('./frame_data.js').FrameData} frameData - The FrameData to copy.
     * @param {string|number} frame - The frame index or name to set as current.
     * @returns {boolean} True if the frame data was copied successfully, false otherwise.
     */
    copyFrameData(frameData: import("./frame_data.js").FrameData, frame: string | number): boolean;
    /**
     * Adds a new animation to the AnimationManager.
     * @param {string} name - The name of the animation.
     * @param {number[] | string[] | null | undefined} frameList - The list of frames to include in the animation.
     * @param {number} frameRate - The frame rate of the animation (frames per second).
     * @param {boolean} loop - Whether the animation should loop.
     * @param {boolean | undefined} useNumericIndex - Whether to treat frameList as numeric indices.
     * @returns {Animation} The created Animation object.
     */
    add(name: string, frameList: number[] | string[] | null | undefined, frameRate?: number, loop?: boolean, useNumericIndex?: boolean | undefined): Animation;
    /**
     * Validates a list of frames against the current frame data.
     * @param {string[] | number[]} frames - The list of frames to validate.
     * @param {boolean} useNumericIndex - Whether to treat frameList as numeric indices.
     * @returns {boolean} True if all frames are valid, false otherwise.
     */
    validateFrames(frames: string[] | number[], useNumericIndex?: boolean): boolean;
    /**
     * Plays an animation by name.
     * @param {string} name - The name of the animation to play.
     * @param {number} frameRate - The frame rate (frames per second) to play at, or null to use the animation's default.
     * @param {boolean} loop - Whether the animation should loop, or null to use the animation's default.
     * @returns {Animation} The Animation object that was played, or null if not found.
     */
    play(name: string, frameRate?: number, loop?: boolean): Animation;
    /**
     * Stops an animation by name.
     * @param {string} name - The name of the animation to stop, or null to stop the current animation.
     * @param {boolean} resetFrame - Whether to reset the frame to the first frame of the animation.
     */
    stop(name?: string, resetFrame?: boolean): void;
    /**
     * Updates the animation manager state.
     * @returns {boolean} True if an animation was updated, false otherwise.
     */
    update(): boolean;
    /**
     * Advances the current animation by a specified number of frames.
     * @param {number} quantity - The number of frames to advance by.
     */
    next(quantity: number): void;
    /**
     * Moves the current animation back by a specified number of frames.
     * @param {number} quantity - The number of frames to move back by.
     */
    previous(quantity: number): void;
    /**
     * Gets an animation by name.
     * @param {string} name - The name of the animation to retrieve.
     * @returns {Animation} The Animation object, or null if not found.
     */
    getAnimation(name: string): Animation;
    /**
     * Refreshes the current frame texture (not implemented).
     */
    refreshFrame(): void;
    /**
     * Gets the frame data used by this AnimationManager.
     * @returns {import('./frame_data.js').FrameData} The FrameData object.
     */
    get frameData(): import("./frame_data.js").FrameData;
    /**
     * Gets the total number of frames in the frame data.
     * @returns {number} The total number of frames.
     */
    get frameTotal(): number;
    /**
     * Sets the paused state of the current animation.
     */
    set paused(value: boolean);
    /**
     * Gets the paused state of the current animation.
     * @returns {boolean} True if the current animation is paused, false otherwise.
     */
    get paused(): boolean;
    /**
     * Gets the name of the current animation.
     * @returns {string} The name of the current animation, or null if no animation is active.
     */
    get name(): string;
    _frameIndex: number;
}
import { Animation } from './animation.js';
//# sourceMappingURL=animation_manager.d.ts.map