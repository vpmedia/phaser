export class AnimationManager {
    /**
     * TBD.
     * @param {import('../display/image').Image} sprite - TBD.
     */
    constructor(sprite: import('../display/image').Image);
    sprite: import("../display/image").Image;
    game: import("./game").Game;
    currentFrame: any;
    currentAnim: any;
    updateIfVisible: boolean;
    isLoaded: boolean;
    _frameData: import("./frame_data").FrameData;
    _anims: {};
    _outputFrames: any[];
    /**
     * TBD.
     */
    destroy(): void;
    /**
     * TBD.
     * @param {import('./frame_data').FrameData} frameData - TBD.
     * @param {string|number} frame - TBD.
     * @returns {boolean} TBD.
     */
    loadFrameData(frameData: import('./frame_data').FrameData, frame: string | number): boolean;
    /**
     * TBD.
     */
    set frame(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get frame(): number;
    /**
     * TBD.
     */
    set frameName(arg: string);
    /**
     * TBD.
     * @returns {string} TBD.
     */
    get frameName(): string;
    /**
     * TBD.
     * @param {import('./frame_data').FrameData} frameData - TBD.
     * @param {string|number} frame - TBD.
     * @returns {boolean} TBD.
     */
    copyFrameData(frameData: import('./frame_data').FrameData, frame: string | number): boolean;
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
     * @param {boolean} killOnComplete - TBD.
     * @returns {Animation} TBD.
     */
    play(name: string, frameRate: number, loop: boolean, killOnComplete: boolean): Animation;
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
     * @returns {import('./frame_data').FrameData} TBD.
     */
    get frameData(): import("./frame_data").FrameData;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get frameTotal(): number;
    /**
     * TBD.
     */
    set paused(arg: boolean);
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
import { Animation } from './animation';
//# sourceMappingURL=animation_manager.d.ts.map