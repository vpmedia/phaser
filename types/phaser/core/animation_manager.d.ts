export class AnimationManager {
    /**
     * TBD.
     * @param {Image} sprite - TBD.
     */
    constructor(sprite: Image);
    sprite: Image;
    game: import("./game").Game;
    currentFrame: any;
    currentAnim: any;
    updateIfVisible: boolean;
    isLoaded: boolean;
    _frameData: FrameData;
    _anims: {};
    _outputFrames: any[];
    /**
     * TBD.
     */
    destroy(): void;
    /**
     * TBD.
     * @param {FrameData} frameData - TBD.
     * @param {number|string} frame - TBD.
     * @returns {boolean} TBD.
     */
    loadFrameData(frameData: FrameData, frame: number | string): boolean;
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
     * @param {FrameData} frameData - TBD.
     * @param {number|string} frame - TBD.
     * @returns {boolean} TBD.
     */
    copyFrameData(frameData: FrameData, frame: number | string): boolean;
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
     * @returns {FrameData} TBD.
     */
    get frameData(): FrameData;
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
import { Image } from '../display/image';
import { FrameData } from './frame_data';
import { Animation } from './animation';
//# sourceMappingURL=animation_manager.d.ts.map