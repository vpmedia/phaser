export class Animation {
    /**
     * TBD.
     * @param {import('./game.js').Game} game - TBD.
     * @param {import('../display/image.js').Image} parent - TBD.
     * @param {string} name - TBD.
     * @param {import('./frame_data.js').FrameData} frameData - TBD.
     * @param {string[]|number[]} frames - TBD.
     * @param {number} frameRate - TBD.
     * @param {boolean} loop - TBD.
     */
    constructor(game: import("./game.js").Game, parent: import("../display/image.js").Image, name: string, frameData: import("./frame_data.js").FrameData, frames: string[] | number[], frameRate: number, loop?: boolean);
    game: import("./game.js").Game;
    _parent: import("../display/image.js").Image;
    _frameData: import("./frame_data.js").FrameData;
    name: string;
    _frames: any[];
    delay: number;
    loop: boolean;
    loopCount: number;
    isFinished: boolean;
    isPlaying: boolean;
    isPaused: boolean;
    _pauseStartTime: number;
    _frameIndex: number;
    _frameDiff: number;
    _frameSkip: number;
    currentFrame: import("./frame.js").Frame;
    onStart: Signal;
    onUpdate: Signal;
    onComplete: Signal;
    onLoop: Signal;
    isReversed: boolean;
    /**
     * TBD.
     * @param {number} frameRate - TBD.
     * @param {boolean} loop - TBD.
     * @returns {Animation} TBD.
     */
    play(frameRate: number, loop: boolean): Animation;
    /**
     * TBD.
     */
    set paused(value: boolean);
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    get paused(): boolean;
    _timeLastFrame: number;
    _timeNextFrame: number;
    /**
     * TBD.
     */
    restart(): void;
    /**
     * TBD.
     * @returns {Animation} TBD.
     */
    reverse(): Animation;
    /**
     * TBD.
     */
    set reversed(value: boolean);
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    get reversed(): boolean;
    /**
     * TBD.
     * @returns {Animation} TBD.
     */
    reverseOnce(): Animation;
    /**
     * TBD.
     * @param {string|number} frameId - TBD.
     * @param {boolean} useLocalFrameIndex - TBD.
     */
    setFrame(frameId: string | number, useLocalFrameIndex?: boolean): void;
    /**
     * TBD.
     * @param {boolean} resetFrame - TBD.
     * @param {boolean} dispatchComplete - TBD.
     */
    stop(resetFrame?: boolean, dispatchComplete?: boolean): void;
    /**
     * TBD.
     */
    onPause(): void;
    /**
     * TBD.
     */
    onResume(): void;
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    update(): boolean;
    /**
     * TBD.
     * @param {boolean} signalUpdate - TBD.
     * @param {boolean} fromPlay - TBD.
     * @returns {boolean} TBD.
     */
    updateCurrentFrame(signalUpdate: boolean, fromPlay?: boolean): boolean;
    /**
     * TBD.
     * @param {number} quantity - TBD.
     */
    next(quantity?: number): void;
    /**
     * TBD.
     * @param {number} quantity - TBD.
     */
    previous(quantity?: number): void;
    /**
     * TBD.
     * @param {import('./frame_data.js').FrameData} frameData - TBD.
     */
    updateFrameData(frameData: import("./frame_data.js").FrameData): void;
    /**
     * TBD.
     */
    destroy(): void;
    /**
     * TBD.
     */
    complete(): void;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get frameTotal(): number;
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
    set speed(value: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get speed(): number;
    /**
     * TBD.
     */
    set enableUpdate(value: boolean);
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    get enableUpdate(): boolean;
}
import { Signal } from './signal.js';
//# sourceMappingURL=animation.d.ts.map