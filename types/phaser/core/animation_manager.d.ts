export class AnimationManager {
    constructor(sprite: any);
    sprite: any;
    game: any;
    currentFrame: any;
    currentAnim: any;
    updateIfVisible: boolean;
    isLoaded: boolean;
    _frameData: any;
    _anims: {};
    _outputFrames: any[];
    destroy(): void;
    loadFrameData(frameData: any, frame: any): boolean;
    set frame(arg: any);
    get frame(): any;
    set frameName(arg: any);
    get frameName(): any;
    copyFrameData(frameData: any, frame: any): boolean;
    add(name: any, frameList: any, frameRate?: number, loop?: boolean, useNumericIndex?: undefined): any;
    validateFrames(frames: any, useNumericIndex?: boolean): boolean;
    play(name: any, frameRate: any, loop: any, killOnComplete: any): any;
    stop(name: any, resetFrame?: boolean): void;
    update(): boolean;
    next(quantity: any): void;
    previous(quantity: any): void;
    getAnimation(name: any): any;
    refreshFrame(): void;
    get frameData(): any;
    get frameTotal(): any;
    set paused(arg: any);
    get paused(): any;
    get name(): any;
    _frameIndex: any;
}
//# sourceMappingURL=animation_manager.d.ts.map