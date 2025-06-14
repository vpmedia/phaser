export class AnimationManager {
    /**
     * TBD.
     * @param {import('../display/image.js').Image} sprite - TBD.
     */
    constructor(sprite: import("../display/image.js").Image);
    sprite: import("../display/image.js").Image;
    game: import("./game.js").Game;
    currentFrame: any;
    currentAnim: any;
    updateIfVisible: boolean;
    isLoaded: boolean;
    _frameData: import("./frame_data.js").FrameData;
    /** @type {{[key: string]: Animation}} */
    _anims: {
        [key: string]: Animation;
    };
    /** @type {number[]} */
    _outputFrames: number[];
    /**
     * TBD.
     */
    destroy(): void;
    /**
     * TBD.
     * @param {import('./frame_data.js').FrameData} frameData - TBD.
     * @param {string|number} frame - TBD.
     * @returns {boolean} TBD.
     */
    loadFrameData(frameData: import("./frame_data.js").FrameData, frame: string | number): boolean;
    /**
     * TBD.
     */
    set frame(value: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get frame(): number;
    /**
     * TBD.
     */
    set frameName(value: string);
    /**
     * TBD.
     * @returns {string} TBD.
     */
    get frameName(): string;
    /**
     * TBD.
     * @param {import('./frame_data.js').FrameData} frameData - TBD.
     * @param {string|number} frame - TBD.
     * @returns {boolean} TBD.
     */
    copyFrameData(frameData: import("./frame_data.js").FrameData, frame: string | number): boolean;
    /**
     * TBD.
     * @param {string} name - TBD.
     * @param {number[]|string[]} frameList - TBD.
     * @param {number} frameRate - TBD.
     * @param {boolean} loop - TBD.
     * @param {boolean} useNumericIndex - TBD.
     * @returns {Animation} TBD.
     */
    add(name: string, frameList: number[] | string[], frameRate?: number, loop?: boolean, useNumericIndex?: boolean): Animation;
    /**
     * TBD.
     * @param {string[]|number[]} frames - TBD.
     * @param {boolean} useNumericIndex - TBD.
     * @returns {boolean} TBD.
     */
    validateFrames(frames: string[] | number[], useNumericIndex?: boolean): boolean;
    /**
     * TBD.
     * @param {string} name - TBD.
     * @param {number} frameRate - TBD.
     * @param {boolean} loop - TBD.
     * @returns {Animation} TBD.
     */
    play(name: string, frameRate: number, loop: boolean): Animation;
    /**
     * TBD.
     * @param {string} name - TBD.
     * @param {boolean} resetFrame - TBD.
     */
    stop(name: string, resetFrame?: boolean): void;
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    update(): boolean;
    /**
     * TBD.
     * @param {number} quantity - TBD.
     */
    next(quantity: number): void;
    /**
     * TBD.
     * @param {number} quantity - TBD.
     */
    previous(quantity: number): void;
    /**
     * TBD.
     * @param {string} name - TBD.
     * @returns {Animation} TBD.
     */
    getAnimation(name: string): Animation;
    /**
     * TBD.
     */
    refreshFrame(): void;
    /**
     * TBD.
     * @returns {import('./frame_data.js').FrameData} TBD.
     */
    get frameData(): import("./frame_data.js").FrameData;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get frameTotal(): number;
    /**
     * TBD.
     */
    set paused(value: boolean);
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    get paused(): boolean;
    /**
     * TBD.
     * @returns {string} TBD.
     */
    get name(): string;
    _frameIndex: any;
}
import { Animation } from './animation.js';
//# sourceMappingURL=animation_manager.d.ts.map