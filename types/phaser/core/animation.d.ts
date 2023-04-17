export class Animation {
    constructor(game: any, parent: any, name: any, frameData: any, frames: any, frameRate: any, loop?: boolean);
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
    play(frameRate: any, loop: any, killOnComplete: any): Animation;
    set paused(arg: boolean);
    get paused(): boolean;
    _timeLastFrame: any;
    _timeNextFrame: any;
    restart(): void;
    reverse(): Animation;
    set reversed(arg: boolean);
    get reversed(): boolean;
    reverseOnce(): Animation;
    setFrame(frameId: any, useLocalFrameIndex?: boolean): void;
    stop(resetFrame?: boolean, dispatchComplete?: boolean): void;
    onPause(): void;
    onResume(): void;
    update(): boolean;
    updateCurrentFrame(signalUpdate: any, fromPlay?: boolean): boolean;
    next(quantity?: number): void;
    previous(quantity?: number): void;
    updateFrameData(frameData: any): void;
    destroy(): void;
    complete(): void;
    get frameTotal(): number;
    set frame(arg: any);
    get frame(): any;
    set speed(arg: number);
    get speed(): number;
    set enableUpdate(arg: boolean);
    get enableUpdate(): boolean;
}
import { Signal } from './signal';
//# sourceMappingURL=animation.d.ts.map