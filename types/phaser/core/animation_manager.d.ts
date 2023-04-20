export class AnimationManager {
    /**
     * TBD.
     * @param sprite
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
     * @param frameData
     * @param frame
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
     * @param frameData
     * @param frame
     */
    copyFrameData(frameData: any, frame: any): boolean;
    /**
     * TBD.
     * @param name
     * @param frameList
     * @param frameRate
     * @param loop
     * @param useNumericIndex
     */
    add(name: any, frameList: any, frameRate?: number, loop?: boolean, useNumericIndex?: any): any;
    /**
     * TBD.
     * @param frames
     * @param useNumericIndex
     */
    validateFrames(frames: any, useNumericIndex?: boolean): boolean;
    /**
     * TBD.
     * @param name
     * @param frameRate
     * @param loop
     * @param killOnComplete
     */
    play(name: any, frameRate: any, loop: any, killOnComplete: any): any;
    /**
     * TBD.
     * @param name
     * @param resetFrame
     */
    stop(name: any, resetFrame?: boolean): void;
    /**
     * TBD.
     */
    update(): boolean;
    /**
     * TBD.
     * @param quantity
     */
    next(quantity: any): void;
    /**
     * TBD.
     * @param quantity
     */
    previous(quantity: any): void;
    /**
     * TBD.
     * @param name
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