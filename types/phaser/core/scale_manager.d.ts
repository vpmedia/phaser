export class ScaleManager {
    /**
     * TBD.
     * @param {Game} game - TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    constructor(game: Game, width: number, height: number);
    game: Game;
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
    parentNode: HTMLElement;
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
     * @param config - TBD.
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
     * @param hScale - TBD.
     * @param vScale - TBD.
     * @param hTrim - TBD.
     * @param vTrim - TBD.
     */
    setUserScale(hScale: any, vScale: any, hTrim: any, vTrim: any): void;
    /**
     * TBD.
     * @param callback - TBD.
     * @param context - TBD.
     */
    setResizeCallback(callback: any, context: any): void;
    /**
     * TBD.
     */
    signalSizeChange(): void;
    /**
     * TBD.
     * @param minWidth - TBD.
     * @param minHeight - TBD.
     * @param maxWidth - TBD.
     * @param maxHeight - TBD.
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
     * @param forceLandscape - TBD.
     * @param forcePortrait - TBD.
     */
    forceOrientation(forceLandscape?: boolean, forcePortrait?: boolean): void;
    /**
     * TBD.
     * @param orientation - TBD.
     */
    classifyOrientation(orientation: any): "portrait" | "landscape";
    /**
     * TBD.
     */
    updateOrientationState(): boolean;
    /**
     * TBD.
     * @param event - TBD.
     */
    orientationChange(event: any): void;
    /**
     * TBD.
     * @param event - TBD.
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
     * @param target - TBD.
     */
    getParentBounds(target: any): any;
    /**
     * TBD.
     * @param horizontal - TBD.
     * @param vertical - TBD.
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
     * @param cssWidth - TBD.
     * @param cssHeight - TBD.
     */
    resetCanvas(cssWidth?: string, cssHeight?: string): void;
    /**
     * TBD.
     * @param force - TBD.
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
     * @param expanding - TBD.
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
     * @param antialias - TBD.
     * @param allowTrampoline - TBD.
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
     * @param enteringFullscreen - TBD.
     */
    prepScreenMode(enteringFullscreen: any): void;
    /**
     * TBD.
     * @param event - TBD.
     */
    fullScreenChange(event: any): void;
    /**
     * TBD.
     * @param event - TBD.
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
import { Game } from './game';
import { DOM } from './dom';
import { Point } from '../geom/point';
import { Signal } from './signal';
import { Rectangle } from '../geom/rectangle';
//# sourceMappingURL=scale_manager.d.ts.map