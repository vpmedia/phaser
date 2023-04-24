export class ScaleManager {
    /**
     * TBD.
     * @param {import('./game').Game} game - TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    constructor(game: import('./game').Game, width: number, height: number);
    game: import("./game").Game;
    dom: DOM;
    width: number;
    height: number;
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
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
    screenOrientation: string;
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
    event: Event;
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
    onResize: Function;
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
     * @returns {number} TBD.
     */
    get scaleMode(): number;
    /**
     * TBD.
     * @param {object} config - TBD.
     */
    parseConfig(config: object): void;
    /**
     * TBD.
     */
    set fullScreenScaleMode(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
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
     * @param {number} hScale - TBD.
     * @param {number} vScale - TBD.
     * @param {number} hTrim - TBD.
     * @param {number} vTrim - TBD.
     */
    setUserScale(hScale: number, vScale: number, hTrim: number, vTrim: number): void;
    /**
     * TBD.
     * @param {Function} callback - TBD.
     * @param {object} context - TBD.
     */
    setResizeCallback(callback: Function, context: object): void;
    /**
     * TBD.
     */
    signalSizeChange(): void;
    /**
     * TBD.
     * @param {number} minWidth - TBD.
     * @param {number} minHeight - TBD.
     * @param {number} maxWidth - TBD.
     * @param {number} maxHeight - TBD.
     */
    setMinMax(minWidth: number, minHeight: number, maxWidth: number, maxHeight: number): void;
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
     * @param {boolean} resize - TBD.
     */
    updateDimensions(width: number, height: number, resize: boolean): void;
    /**
     * TBD.
     */
    updateScalingAndBounds(): void;
    /**
     * TBD.
     * @param {boolean} forceLandscape - TBD.
     * @param {boolean} forcePortrait - TBD.
     */
    forceOrientation(forceLandscape?: boolean, forcePortrait?: boolean): void;
    /**
     * TBD.
     * @param {string} orientation - TBD.
     * @returns {string} TBD.
     */
    classifyOrientation(orientation: string): string;
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    updateOrientationState(): boolean;
    /**
     * TBD.
     * @param {Event} event - TBD.
     */
    orientationChange(event: Event): void;
    /**
     * TBD.
     * @param {Event} event - TBD.
     */
    windowResize(event: Event): void;
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
     * @param {Rectangle} target - TBD.
     * @returns {Rectangle} TBD.
     */
    getParentBounds(target: Rectangle): Rectangle;
    /**
     * TBD.
     * @param {boolean} horizontal - TBD.
     * @param {boolean} vertical - TBD.
     */
    alignCanvas(horizontal: boolean, vertical: boolean): void;
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
     * @param {string} cssWidth - TBD.
     * @param {string} cssHeight - TBD.
     */
    resetCanvas(cssWidth?: string, cssHeight?: string): void;
    /**
     * TBD.
     * @param {boolean} force - TBD.
     */
    queueUpdate(force: boolean): void;
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
     * @param {boolean} expanding - TBD.
     */
    setShowAll(expanding?: boolean): void;
    /**
     * TBD.
     */
    setExactFit(): void;
    /**
     * TBD.
     * @returns {HTMLDivElement} TBD.
     */
    createFullScreenTarget(): HTMLDivElement;
    /**
     * TBD.
     * @param {boolean} antialias - TBD.
     * @param {boolean} allowTrampoline - TBD.
     * @returns {boolean} TBD.
     */
    startFullScreen(antialias: boolean, allowTrampoline: boolean): boolean;
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    stopFullScreen(): boolean;
    /**
     * TBD.
     */
    cleanupCreatedTarget(): void;
    /**
     * TBD.
     * @param {boolean} enteringFullscreen - TBD.
     */
    prepScreenMode(enteringFullscreen: boolean): void;
    /**
     * TBD.
     * @param {Event} event - TBD.
     */
    fullScreenChange(event: Event): void;
    /**
     * TBD.
     * @param {Event} event - TBD.
     */
    fullScreenError(event: Event): void;
    /**
     * TBD.
     */
    destroy(): void;
    /**
     * TBD.
     * @returns {object} TBD.
     */
    get boundingParent(): any;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get currentScaleMode(): number;
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    get pageAlignHorizontally(): boolean;
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    get pageAlignVertically(): boolean;
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    get isFullScreen(): boolean;
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    get isPortrait(): boolean;
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    get isLandscape(): boolean;
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    get isGamePortrait(): boolean;
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    get isGameLandscape(): boolean;
}
import { DOM } from './dom';
import { Point } from '../geom/point';
import { Signal } from './signal';
import { Rectangle } from '../geom/rectangle';
//# sourceMappingURL=scale_manager.d.ts.map