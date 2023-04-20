export class Animation {
    /**
     * TBD.
     * @param {object} game - TBD.
     * @param parent
     * @param name
     * @param frameData
     * @param frames
     * @param frameRate
     * @param loop
     */
    constructor(game: object, parent: any, name: any, frameData: any, frames: any, frameRate: any, loop?: boolean);
    game: any;
    _parent: any;
    _frameData: any;
    name: any;
    _frames: any[];
    delay: number;
    loop: boolean;
    loopCount: number;
    killOnComplete: boolean;
    isFinished: boolean;
    isPlaying: boolean;
    isPaused: boolean;
    _pauseStartTime: number;
    _frameIndex: number;
    _frameDiff: number;
    _frameSkip: number;
    currentFrame: any;
    onStart: Signal;
    onUpdate: Signal;
    onComplete: Signal;
    onLoop: Signal;
    isReversed: boolean;
    /**
     * TBD.
     * @param frameRate
     * @param loop
     * @param killOnComplete
     */
    play(frameRate: any, loop: any, killOnComplete: any): Animation;
    /**
     * TBD.
     */
    set paused(arg: boolean);
    /**
     * TBD.
     */
    get paused(): boolean;
    _timeLastFrame: any;
    _timeNextFrame: any;
    /**
     * TBD.
     */
    restart(): void;
    /**
     * TBD.
     */
    reverse(): Animation;
    /**
     * TBD.
     */
    set reversed(arg: boolean);
    /**
     * TBD.
     */
    get reversed(): boolean;
    /**
     * TBD.
     */
    reverseOnce(): Animation;
    /**
     * TBD.
     * @param frameId
     * @param useLocalFrameIndex
     */
    setFrame(frameId: any, useLocalFrameIndex?: boolean): void;
    /**
     * TBD.
     * @param resetFrame
     * @param dispatchComplete
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
     */
    update(): boolean;
    /**
     * TBD.
     * @param signalUpdate
     * @param fromPlay
     */
    updateCurrentFrame(signalUpdate: any, fromPlay?: boolean): boolean;
    /**
     * TBD.
     * @param quantity
     */
    next(quantity?: number): void;
    /**
     * TBD.
     * @param quantity
     */
    previous(quantity?: number): void;
    /**
     * TBD.
     * @param frameData
     */
    updateFrameData(frameData: any): void;
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
     */
    get frameTotal(): number;
    /**
     * TBD.
     */
    set frame(arg: any);
    /**
     * TBD.
     */
    get frame(): any;
    /**
     * TBD.
     */
    set speed(arg: number);
    /**
     * TBD.
     */
    get speed(): number;
    /**
     * TBD.
     */
    set enableUpdate(arg: boolean);
    /**
     * TBD.
     */
    get enableUpdate(): boolean;
}
import { Signal } from './signal';
//# sourceMappingURL=animation.d.ts.map