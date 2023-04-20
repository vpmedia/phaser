export class AnimationManager {
    /**
     * TBD.
     * @param sprite - TBD.
     */
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
    /**
     * TBD.
     */
    destroy(): void;
    /**
     * TBD.
     * @param frameData - TBD.
     * @param frame - TBD.
     */
    loadFrameData(frameData: any, frame: any): boolean;
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
    set frameName(arg: any);
    /**
     * TBD.
     */
    get frameName(): any;
    /**
     * TBD.
     * @param frameData - TBD.
     * @param frame - TBD.
     */
    copyFrameData(frameData: any, frame: any): boolean;
    /**
     * TBD.
     * @param name - TBD.
     * @param frameList - TBD.
     * @param frameRate - TBD.
     * @param loop - TBD.
     * @param useNumericIndex - TBD.
     */
    add(name: any, frameList: any, frameRate?: number, loop?: boolean, useNumericIndex?: any): any;
    /**
     * TBD.
     * @param frames - TBD.
     * @param useNumericIndex - TBD.
     */
    validateFrames(frames: any, useNumericIndex?: boolean): boolean;
    /**
     * TBD.
     * @param name - TBD.
     * @param frameRate - TBD.
     * @param loop - TBD.
     * @param killOnComplete - TBD.
     */
    play(name: any, frameRate: any, loop: any, killOnComplete: any): any;
    /**
     * TBD.
     * @param name - TBD.
     * @param resetFrame - TBD.
     */
    stop(name: any, resetFrame?: boolean): void;
    /**
     * TBD.
     */
    update(): boolean;
    /**
     * TBD.
     * @param quantity - TBD.
     */
    next(quantity: any): void;
    /**
     * TBD.
     * @param quantity - TBD.
     */
    previous(quantity: any): void;
    /**
     * TBD.
     * @param name - TBD.
     */
    getAnimation(name: any): any;
    /**
     * TBD.
     */
    refreshFrame(): void;
    /**
     * TBD.
     */
    get frameData(): any;
    /**
     * TBD.
     */
    get frameTotal(): any;
    /**
     * TBD.
     */
    set paused(arg: any);
    /**
     * TBD.
     */
    get paused(): any;
    /**
     * TBD.
     */
    get name(): any;
    _frameIndex: any;
}
//# sourceMappingURL=animation_manager.d.ts.map