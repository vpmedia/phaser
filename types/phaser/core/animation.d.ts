export class Animation {
    /**
     * TBD.
     * @param {Game} game - TBD.
     * @param parent - TBD.
     * @param name - TBD.
     * @param frameData - TBD.
     * @param frames - TBD.
     * @param frameRate - TBD.
     * @param loop - TBD.
     */
    constructor(game: Game, parent: any, name: any, frameData: any, frames: any, frameRate: any, loop?: boolean);
    game: Game;
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
     * @param frameRate - TBD.
     * @param loop - TBD.
     * @param killOnComplete - TBD.
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
    _timeLastFrame: number;
    _timeNextFrame: number;
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
     * @param frameId - TBD.
     * @param useLocalFrameIndex - TBD.
     */
    setFrame(frameId: any, useLocalFrameIndex?: boolean): void;
    /**
     * TBD.
     * @param resetFrame - TBD.
     * @param dispatchComplete - TBD.
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
     * @param signalUpdate - TBD.
     * @param fromPlay - TBD.
     */
    updateCurrentFrame(signalUpdate: any, fromPlay?: boolean): boolean;
    /**
     * TBD.
     * @param quantity - TBD.
     */
    next(quantity?: number): void;
    /**
     * TBD.
     * @param quantity - TBD.
     */
    previous(quantity?: number): void;
    /**
     * TBD.
     * @param frameData - TBD.
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
import { Game } from './game';
import { Signal } from './signal';
//# sourceMappingURL=animation.d.ts.map