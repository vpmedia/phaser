export default class _default {
    constructor(game: any, width: any, height: any);
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
    _createdFullScreenTarget: HTMLDivElement | null;
    onFullScreenInit: Signal;
    onFullScreenChange: Signal;
    onFullScreenError: Signal;
    screenOrientation: OrientationType;
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
        orientationFallback: null;
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
    } | null;
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
    boot(): void;
    _orientationChange: ((event: any) => void) | undefined;
    _windowResize: ((event: any) => void) | undefined;
    _fullScreenChange: ((event: any) => void) | undefined;
    _fullScreenError: ((event: any) => void) | undefined;
    set scaleMode(arg: number);
    get scaleMode(): number;
    parseConfig(config: any): void;
    set fullScreenScaleMode(arg: number);
    get fullScreenScaleMode(): number;
    setupScale(width: any, height: any): void;
    _gameResumed(): void;
    setGameSize(width: any, height: any): void;
    setUserScale(hScale: any, vScale: any, hTrim: any, vTrim: any): void;
    setResizeCallback(callback: any, context: any): void;
    signalSizeChange(): void;
    setMinMax(minWidth: any, minHeight: any, maxWidth: any, maxHeight: any): void;
    preUpdate(): void;
    pauseUpdate(): void;
    updateDimensions(width: any, height: any, resize: any): void;
    updateScalingAndBounds(): void;
    forceOrientation(forceLandscape?: boolean, forcePortrait?: boolean): void;
    classifyOrientation(orientation: any): "portrait" | "landscape" | null;
    updateOrientationState(): boolean;
    orientationChange(event: any): void;
    windowResize(event: any): void;
    refresh(): void;
    updateLayout(): void;
    getParentBounds(target: any): any;
    alignCanvas(horizontal: any, vertical: any): void;
    reflowGame(): void;
    reflowCanvas(): void;
    resetCanvas(cssWidth?: string, cssHeight?: string): void;
    queueUpdate(force: any): void;
    reset(): void;
    setMaximum(): void;
    setShowAll(expanding?: boolean): void;
    setExactFit(): void;
    createFullScreenTarget(): HTMLDivElement;
    startFullScreen(antialias: any, allowTrampoline: any): boolean;
    stopFullScreen(): boolean;
    cleanupCreatedTarget(): void;
    prepScreenMode(enteringFullscreen: any): void;
    fullScreenChange(event: any): void;
    fullScreenError(event: any): void;
    destroy(): void;
    get boundingParent(): any;
    get currentScaleMode(): number;
    get pageAlignHorizontally(): boolean;
    get pageAlignVertically(): boolean;
    get isFullScreen(): boolean;
    get isPortrait(): boolean;
    get isLandscape(): boolean;
    get isGamePortrait(): boolean;
    get isGameLandscape(): boolean;
}
import DOM from './dom';
import Point from '../geom/point';
import Signal from './signal';
import Rectangle from '../geom/rectangle';
//# sourceMappingURL=scale_manager.d.ts.map