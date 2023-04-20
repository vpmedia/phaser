export class ScaleManager {
    /**
     * TBD.
     * @param {object} game - TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    constructor(game: object, width: number, height: number);
    game: any;
    dom: DOM;
    width: number;
    height: number;
    minWidth: any;
    maxWidth: any;
    minHeight: any;
    maxHeight: any;
    offset: Point;
    forceLandscape: boolean;
    forcePortrait: boolean;
    incorrectOrientation: boolean;
    _pageAlignHorizontally: boolean;
    _pageAlignVertically: boolean;
    onOrientationChange: Signal;
    enterIncorrectOrientation: Signal;
    leaveIncorrectOrientation: Signal;
    hasPhaserSetFullScreen: boolean;
    fullScreenTarget: any;
    _createdFullScreenTarget: HTMLDivElement;
    onFullScreenInit: Signal;
    onFullScreenChange: Signal;
    onFullScreenError: Signal;
    screenOrientation: any;
    scaleFactor: Point;
    scaleFactorInversed: Point;
    margin: {
        left: number;
        top: number;
        right: number;
        bottom: number;
        x: number;
        y: number;
    };
    bounds: Rectangle;
    aspectRatio: number;
    sourceAspectRatio: number;
    event: any;
    windowConstraints: {
        right: string;
        bottom: string;
    };
    compatibility: {
        supportsFullScreen: boolean;
        orientationFallback: any;
        noMargins: boolean;
        canExpandParent: boolean;
        clickTrampoline: string;
    };
    _scaleMode: number;
    _fullScreenScaleMode: number;
    parentIsWindow: boolean;
    parentNode: any;
    parentScaleFactor: Point;
    trackParentInterval: number;
    onSizeChange: Signal;
    onResize: any;
    onResizeContext: any;
    _pendingScaleMode: any;
    _fullScreenRestore: {
        targetWidth: any;
        targetHeight: any;
    };
    _gameSize: Rectangle;
    _userScaleFactor: Point;
    _userScaleTrim: Point;
    _lastUpdate: number;
    _updateThrottle: number;
    _updateThrottleReset: number;
    _parentBounds: Rectangle;
    _tempBounds: Rectangle;
    _lastReportedCanvasSize: Rectangle;
    _lastReportedGameSize: Rectangle;
    _booted: boolean;
    /**
     * TBD.
     */
    boot(): void;
    _orientationChange: (event: any) => void;
    _windowResize: (event: any) => void;
    _fullScreenChange: (event: any) => void;
    _fullScreenError: (event: any) => void;
    /**
     * TBD.
     */
    set scaleMode(arg: number);
    /**
     * TBD.
     */
    get scaleMode(): number;
    /**
     * TBD.
     * @param config
     */
    parseConfig(config: any): void;
    /**
     * TBD.
     */
    set fullScreenScaleMode(arg: number);
    /**
     * TBD.
     */
    get fullScreenScaleMode(): number;
    /**
     * TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    setupScale(width: number, height: number): void;
    /**
     * TBD.
     */
    _gameResumed(): void;
    /**
     * TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    setGameSize(width: number, height: number): void;
    /**
     * TBD.
     * @param hScale
     * @param vScale
     * @param hTrim
     * @param vTrim
     */
    setUserScale(hScale: any, vScale: any, hTrim: any, vTrim: any): void;
    /**
     * TBD.
     * @param callback
     * @param context
     */
    setResizeCallback(callback: any, context: any): void;
    /**
     * TBD.
     */
    signalSizeChange(): void;
    /**
     * TBD.
     * @param minWidth
     * @param minHeight
     * @param maxWidth
     * @param maxHeight
     */
    setMinMax(minWidth: any, minHeight: any, maxWidth: any, maxHeight: any): void;
    /**
     * TBD.
     */
    preUpdate(): void;
    /**
     * TBD.
     */
    pauseUpdate(): void;
    /**
     * TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     * @param resize
     */
    updateDimensions(width: number, height: number, resize: any): void;
    /**
     * TBD.
     */
    updateScalingAndBounds(): void;
    /**
     * TBD.
     * @param forceLandscape
     * @param forcePortrait
     */
    forceOrientation(forceLandscape?: boolean, forcePortrait?: boolean): void;
    /**
     * TBD.
     * @param orientation
     */
    classifyOrientation(orientation: any): "portrait" | "landscape";
    /**
     * TBD.
     */
    updateOrientationState(): boolean;
    /**
     * TBD.
     * @param event
     */
    orientationChange(event: any): void;
    /**
     * TBD.
     * @param event
     */
    windowResize(event: any): void;
    /**
     * TBD.
     */
    refresh(): void;
    /**
     * TBD.
     */
    updateLayout(): void;
    /**
     * TBD.
     * @param target
     */
    getParentBounds(target: any): any;
    /**
     * TBD.
     * @param horizontal
     * @param vertical
     */
    alignCanvas(horizontal: any, vertical: any): void;
    /**
     * TBD.
     */
    reflowGame(): void;
    /**
     * TBD.
     */
    reflowCanvas(): void;
    /**
     * TBD.
     * @param cssWidth
     * @param cssHeight
     */
    resetCanvas(cssWidth?: string, cssHeight?: string): void;
    /**
     * TBD.
     * @param force
     */
    queueUpdate(force: any): void;
    /**
     * TBD.
     */
    reset(): void;
    /**
     * TBD.
     */
    setMaximum(): void;
    /**
     * TBD.
     * @param expanding
     */
    setShowAll(expanding?: boolean): void;
    /**
     * TBD.
     */
    setExactFit(): void;
    /**
     * TBD.
     */
    createFullScreenTarget(): HTMLDivElement;
    /**
     * TBD.
     * @param antialias
     * @param allowTrampoline
     */
    startFullScreen(antialias: any, allowTrampoline: any): boolean;
    /**
     * TBD.
     */
    stopFullScreen(): boolean;
    /**
     * TBD.
     */
    cleanupCreatedTarget(): void;
    /**
     * TBD.
     * @param enteringFullscreen
     */
    prepScreenMode(enteringFullscreen: any): void;
    /**
     * TBD.
     * @param event
     */
    fullScreenChange(event: any): void;
    /**
     * TBD.
     * @param event
     */
    fullScreenError(event: any): void;
    /**
     * TBD.
     */
    destroy(): void;
    /**
     * TBD.
     */
    get boundingParent(): any;
    /**
     * TBD.
     */
    get currentScaleMode(): number;
    /**
     * TBD.
     */
    get pageAlignHorizontally(): boolean;
    /**
     * TBD.
     */
    get pageAlignVertically(): boolean;
    /**
     * TBD.
     */
    get isFullScreen(): boolean;
    /**
     * TBD.
     */
    get isPortrait(): boolean;
    /**
     * TBD.
     */
    get isLandscape(): boolean;
    /**
     * TBD.
     */
    get isGamePortrait(): boolean;
    /**
     * TBD.
     */
    get isGameLandscape(): boolean;
}
import { DOM } from './dom';
import { Point } from '../geom/point';
import { Signal } from './signal';
import { Rectangle } from '../geom/rectangle';
//# sourceMappingURL=scale_manager.d.ts.map