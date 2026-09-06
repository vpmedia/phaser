import { Point } from '../geom/point.js';
import { Rectangle } from '../geom/rectangle.js';
import { RENDER_CANVAS, SCALE_EXACT_FIT, SCALE_OFF, SCALE_RESIZE, SCALE_SHOW_ALL, SCALE_USER } from './const.js';
import type { Game } from './game.js';
import { DOM } from './dom.js';
import { Signal } from './signal.js';

export class ScaleManager {
  public game!: Game;
  public dom!: DOM;
  public width!: number;
  public height!: number;
  public minWidth!: number | null;
  public maxWidth!: number | null;
  public minHeight!: number | null;
  public maxHeight!: number | null;
  public offset!: Point;
  public forceLandscape!: boolean;
  public forcePortrait!: boolean;
  public incorrectOrientation!: boolean;
  public _pageAlignHorizontally!: boolean;
  public _pageAlignVertically!: boolean;
  public onOrientationChange!: Signal;
  public enterIncorrectOrientation!: Signal;
  public leaveIncorrectOrientation!: Signal;
  public hasPhaserSetFullScreen!: boolean;
  public fullScreenTarget!: any;
  public _createdFullScreenTarget!: any;
  public onFullScreenInit!: Signal;
  public onFullScreenChange!: Signal;
  public onFullScreenError!: Signal;
  public screenOrientation!: any;
  public scaleFactor!: Point;
  public scaleFactorInversed!: Point;
  public margin!: any;
  public bounds!: Rectangle;
  public aspectRatio!: number;
  public sourceAspectRatio!: number;
  public event!: Event | null | undefined;
  public windowConstraints!: any;
  public compatibility!: any;
  public _scaleMode!: number;
  public _fullScreenScaleMode!: number;
  public parentIsWindow!: boolean;
  public parentNode!: any;
  public parentScaleFactor!: Point;
  public trackParentInterval!: number;
  public onSizeChange!: Signal;
  public onResize!: any;
  public onResizeContext!: any;
  public _pendingScaleMode!: any;
  public _fullScreenRestore!: any;
  public _gameSize!: Rectangle;
  public _userScaleFactor!: Point;
  public _userScaleTrim!: Point;
  public _lastUpdate!: number;
  public _updateThrottle!: number;
  public _updateThrottleReset!: number;
  public _parentBounds!: Rectangle;
  public _tempBounds!: Rectangle;
  public _lastReportedCanvasSize!: Rectangle;
  public _lastReportedGameSize!: Rectangle;
  public _booted!: boolean;
  public _orientationChange!: (event: Event) => void;
  public _windowResize!: (event: UIEvent) => void;
  public _fullScreenChange!: (event: Event) => void;
  public _fullScreenError!: (event: Event) => void;
  /**
   * TBD.
   * @param {Game} game - TBD.
   * @param {number} width - TBD.
   * @param {number} height - TBD.
   */
  public constructor(game: Game, width: number, height: number) {
    this.game = game;
    this.dom = new DOM(game.device);
    this.width = 0;
    this.height = 0;
    this.minWidth = null;
    this.maxWidth = null;
    this.minHeight = null;
    this.maxHeight = null;
    this.offset = new Point();
    this.forceLandscape = false;
    this.forcePortrait = false;
    this.incorrectOrientation = false;
    this._pageAlignHorizontally = false;
    this._pageAlignVertically = false;
    this.onOrientationChange = new Signal();
    this.enterIncorrectOrientation = new Signal();
    this.leaveIncorrectOrientation = new Signal();
    this.hasPhaserSetFullScreen = false;
    this.fullScreenTarget = null;
    this._createdFullScreenTarget = null;
    this.onFullScreenInit = new Signal();
    this.onFullScreenChange = new Signal();
    this.onFullScreenError = new Signal();
    this.screenOrientation = this.dom.getScreenOrientation();
    this.scaleFactor = new Point(1, 1);
    this.scaleFactorInversed = new Point(1, 1);
    this.margin = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      x: 0,
      y: 0,
    };
    this.bounds = new Rectangle();
    this.aspectRatio = 0;
    this.sourceAspectRatio = 0;
    this.event = null;
    this.windowConstraints = {
      right: 'layout',
      bottom: '',
    };
    this.compatibility = {
      supportsFullScreen: false,
      orientationFallback: null,
      noMargins: false,
      canExpandParent: true,
      clickTrampoline: '',
    };
    this._scaleMode = SCALE_OFF;
    this._fullScreenScaleMode = SCALE_OFF;
    this.parentIsWindow = false;
    this.parentNode = null;
    this.parentScaleFactor = new Point(1, 1);
    this.trackParentInterval = 2000;
    this.onSizeChange = new Signal();
    this.onResize = null;
    this.onResizeContext = null;
    this._pendingScaleMode = null;
    this._fullScreenRestore = null;
    this._gameSize = new Rectangle();
    this._userScaleFactor = new Point(1, 1);
    this._userScaleTrim = new Point(0, 0);
    this._lastUpdate = 0;
    this._updateThrottle = 0;
    this._updateThrottleReset = 100;
    this._parentBounds = new Rectangle();
    this._tempBounds = new Rectangle();
    this._lastReportedCanvasSize = new Rectangle();
    this._lastReportedGameSize = new Rectangle();
    this._booted = false;
    if (game.config) {
      this.parseConfig(game.config);
    }
    this.setupScale(width, height);
  }

  /**
   * TBD.
   */
  public boot() {
    // Configure device-dependent compatibility
    const compat = this.compatibility;
    compat.supportsFullScreen = this.game.device.fullscreen;
    if (this.game.device.desktop) {
      compat.orientationFallback = 'screen';
      compat.clickTrampoline = 'when-not-mouse';
    } else {
      compat.orientationFallback = '';
      compat.clickTrampoline = '';
    }
    // Configure event listeners
    const scope = this;
    this._orientationChange = (event) => {
      scope.orientationChange(event);
    };
    this._windowResize = (event) => {
      scope.windowResize(event);
    };
    // This does not appear to be on the standards track
    globalThis.addEventListener('orientationchange', this._orientationChange, false);
    window.addEventListener('resize', this._windowResize, false);
    if (this.compatibility.supportsFullScreen) {
      this._fullScreenChange = (event) => {
        scope.fullScreenChange(event);
      };
      this._fullScreenError = (event) => {
        scope.fullScreenError(event);
      };
      document.addEventListener('webkitfullscreenchange', this._fullScreenChange, false);
      document.addEventListener('mozfullscreenchange', this._fullScreenChange, false);
      document.addEventListener('MSFullscreenChange', this._fullScreenChange, false);
      document.addEventListener('fullscreenchange', this._fullScreenChange, false);
      document.addEventListener('webkitfullscreenerror', this._fullScreenError, false);
      document.addEventListener('mozfullscreenerror', this._fullScreenError, false);
      document.addEventListener('MSFullscreenError', this._fullScreenError, false);
      document.addEventListener('fullscreenerror', this._fullScreenError, false);
    }
    this.game.onResume.add(this._gameResumed, this);
    // Initialize core bounds
    this.dom.getOffset(this.game.canvas, this.offset);
    this.bounds.setTo(this.offset.x, this.offset.y, this.width, this.height);
    this.setGameSize(this.game.width, this.game.height);
    // Don't use updateOrientationState so events are not fired
    this.screenOrientation = this.dom.getScreenOrientation(this.compatibility.orientationFallback);
    this._booted = true;
    if (this._pendingScaleMode !== null) {
      this.scaleMode = this._pendingScaleMode;
      this._pendingScaleMode = null;
    }
  }

  /**
   * TBD.
   * @param {object} config - TBD.
   */
  public parseConfig(config: any) {
    if (config.scaleMode !== undefined) {
      if (this._booted) {
        this.scaleMode = config.scaleMode;
      } else {
        this._pendingScaleMode = config.scaleMode;
      }
    }
    if (config.fullScreenScaleMode !== undefined) {
      this.fullScreenScaleMode = config.fullScreenScaleMode;
    }
    if (config.fullScreenTarget) {
      this.fullScreenTarget = config.fullScreenTarget;
    } else {
      this.fullScreenTarget = document.documentElement;
    }
  }

  /**
   * TBD.
   * @param {number} width - TBD.
   * @param {number} height - TBD.
   */
  public setupScale(width: number, height: number) {
    let target;
    const rect = new Rectangle();
    if (this.game.parent !== '') {
      if (typeof this.game.parent === 'string') {
        // hopefully an element ID
        target = document.getElementById(this.game.parent);
      } else if (this.game.parent && this.game.parent.nodeType === 1) {
        // quick test for a HTMLelement
        target = this.game.parent;
      }
    }
    // Fallback, covers an invalid ID and a non HTMLelement object
    if (!target) {
      //  Use the full window
      this.parentNode = null;
      this.parentIsWindow = true;
      rect.width = this.dom.visualBounds.width;
      rect.height = this.dom.visualBounds.height;
      this.offset.setTo(0, 0);
    } else {
      this.parentNode = target;
      this.parentIsWindow = false;
      this.getParentBounds(this._parentBounds);
      rect.width = this._parentBounds.width;
      rect.height = this._parentBounds.height;
      this.offset.setTo(this._parentBounds.x, this._parentBounds.y);
    }
    let newWidth = 0;
    let newHeight = 0;
    if (typeof width === 'number') {
      newWidth = width;
    } else {
      //  Percentage based
      this.parentScaleFactor.x = Math.trunc(Number(width)) / 100;
      newWidth = rect.width * this.parentScaleFactor.x;
    }
    if (typeof height === 'number') {
      newHeight = height;
    } else {
      //  Percentage based
      this.parentScaleFactor.y = Math.trunc(Number(height)) / 100;
      newHeight = rect.height * this.parentScaleFactor.y;
    }
    newWidth = Math.floor(newWidth);
    newHeight = Math.floor(newHeight);
    this._gameSize.setTo(0, 0, newWidth, newHeight);
    this.updateDimensions(newWidth, newHeight, false);
  }

  /**
   * TBD.
   */
  public _gameResumed() {
    this.queueUpdate(true);
  }

  /**
   * TBD.
   * @param {number} width - TBD.
   * @param {number} height - TBD.
   */
  public setGameSize(width: number, height: number) {
    this._gameSize.setTo(0, 0, width, height);
    if (this.currentScaleMode !== SCALE_RESIZE) {
      this.updateDimensions(width, height, true);
    }
    this.queueUpdate(true);
  }

  /**
   * TBD.
   * @param {number} hScale - TBD.
   * @param {number} vScale - TBD.
   * @param {number} hTrim - TBD.
   * @param {number} vTrim - TBD.
   */
  public setUserScale(hScale: number, vScale: number, hTrim: number, vTrim: number) {
    this._userScaleFactor.setTo(hScale, vScale);
    this._userScaleTrim.setTo(Math.trunc(hTrim), Math.trunc(vTrim));
    this.queueUpdate(true);
  }

  /**
   * TBD.
   * @param {Function} callback - TBD.
   * @param {object} context - TBD.
   */
  public setResizeCallback(callback: Function, context: CanvasRenderingContext2D) {
    this.onResize = callback;
    this.onResizeContext = context;
  }

  /**
   * TBD.
   */
  public signalSizeChange() {
    if (
      this.width !== this._lastReportedCanvasSize.width ||
      this.height !== this._lastReportedCanvasSize.height ||
      this.game.width !== this._lastReportedGameSize.width ||
      this.game.height !== this._lastReportedGameSize.height
    ) {
      const { width } = this;
      const { height } = this;
      this._lastReportedCanvasSize.setTo(0, 0, width, height);
      this._lastReportedGameSize.setTo(0, 0, this.game.width, this.game.height);
      this.onSizeChange.dispatch(this, width, height);
      // Per StateManager#onResizeCallback, it only occurs when in RESIZE mode.
      if (this.currentScaleMode === SCALE_RESIZE) {
        this.game.state.resize(width, height);
        this.game.load.resize();
      }
    }
  }

  /**
   * TBD.
   * @param {number} minWidth - TBD.
   * @param {number} minHeight - TBD.
   * @param {number} maxWidth - TBD.
   * @param {number} maxHeight - TBD.
   */
  public setMinMax(minWidth: number, minHeight: number, maxWidth: number, maxHeight: number) {
    this.minWidth = minWidth;
    this.minHeight = minHeight;
    if (maxWidth !== undefined) {
      this.maxWidth = maxWidth;
    }
    if (maxHeight !== undefined) {
      this.maxHeight = maxHeight;
    }
  }

  /**
   * TBD.
   */
  public preUpdate() {
    if (this.game.time.time < this._lastUpdate + this._updateThrottle) {
      return;
    }
    const prevThrottle = this._updateThrottle;
    this._updateThrottleReset = prevThrottle >= 400 ? 0 : 100;
    this.dom.getOffset(this.game.canvas, this.offset);
    const prevWidth = this._parentBounds.width;
    const prevHeight = this._parentBounds.height;
    const bounds = this.getParentBounds(this._parentBounds);
    const boundsChanged = bounds.width !== prevWidth || bounds.height !== prevHeight;
    // Always invalidate on a newly detected orientation change
    const orientationChanged = this.updateOrientationState();
    if (boundsChanged || orientationChanged) {
      if (this.onResize) {
        this.onResize.call(this.onResizeContext, this, bounds);
      }
      this.updateLayout();
      this.signalSizeChange();
    }
    // Next throttle, eg. 25, 50, 100, 200..
    let throttle = this._updateThrottle * 2;
    // Don't let an update be too eager about resetting the throttle.
    if (this._updateThrottle < prevThrottle) {
      throttle = Math.min(prevThrottle, this._updateThrottleReset);
    }
    this._updateThrottle = Math.max(25, Math.min(this.trackParentInterval, throttle));
    this._lastUpdate = this.game.time.time;
  }

  /**
   * TBD.
   */
  public pauseUpdate() {
    this.preUpdate();
    // Updates at slowest.
    this._updateThrottle = this.trackParentInterval;
  }

  /**
   * TBD.
   * @param {number} width - TBD.
   * @param {number} height - TBD.
   * @param {boolean} resize - TBD.
   */
  public updateDimensions(width: number, height: number, resize: boolean) {
    this.width = width * this.parentScaleFactor.x;
    this.height = height * this.parentScaleFactor.y;
    this.game.width = this.width;
    this.game.height = this.height;
    this.sourceAspectRatio = this.width / this.height;
    this.updateScalingAndBounds();
    if (resize) {
      //  Resize the renderer (which in turn resizes the Display canvas!)
      this.game.renderer.resize(this.width, this.height);
    }
  }

  /**
   * TBD.
   */
  public updateScalingAndBounds() {
    this.scaleFactor.x = this.game.width / this.width;
    this.scaleFactor.y = this.game.height / this.height;
    this.scaleFactorInversed.x = this.width / this.game.width;
    this.scaleFactorInversed.y = this.height / this.game.height;
    this.aspectRatio = this.width / this.height;
    // This can be invoked in boot pre-canvas
    if (this.game.canvas) {
      this.dom.getOffset(this.game.canvas, this.offset);
    }
    this.bounds.setTo(this.offset.x, this.offset.y, this.width, this.height);
    // Can be invoked in boot pre-input
    if (this.game.input && this.game.input.scale) {
      this.game.input.scale.setTo(this.scaleFactor.x, this.scaleFactor.y);
    }
  }

  /**
   * TBD.
   * @param {boolean} forceLandscape - TBD.
   * @param {boolean} forcePortrait - TBD.
   */
  public forceOrientation(forceLandscape = false, forcePortrait = false) {
    this.forceLandscape = forceLandscape;
    this.forcePortrait = forcePortrait;
    this.queueUpdate(true);
  }

  /**
   * TBD.
   * @param {string} orientation - TBD.
   * @returns {string} TBD.
   */
  public classifyOrientation(orientation: string) {
    if (orientation === 'portrait-primary' || orientation === 'portrait-secondary') {
      return 'portrait';
    } else if (orientation === 'landscape-primary' || orientation === 'landscape-secondary') {
      return 'landscape';
    }
    return null;
  }

  /**
   * TBD.
   * @returns {boolean} TBD.
   */
  public updateOrientationState() {
    const previousOrientation = this.screenOrientation;
    const previouslyIncorrect = this.incorrectOrientation;
    this.screenOrientation = this.dom.getScreenOrientation(this.compatibility.orientationFallback);
    this.incorrectOrientation = (this.forceLandscape && !this.isLandscape) || (this.forcePortrait && !this.isPortrait);
    const changed = previousOrientation !== this.screenOrientation;
    const correctnessChanged = previouslyIncorrect !== this.incorrectOrientation;
    if (correctnessChanged) {
      if (this.incorrectOrientation) {
        this.enterIncorrectOrientation.dispatch();
      } else {
        this.leaveIncorrectOrientation.dispatch();
      }
    }
    if (changed || correctnessChanged) {
      this.onOrientationChange.dispatch(this, previousOrientation, previouslyIncorrect);
    }
    return changed || correctnessChanged;
  }

  /**
   * TBD.
   * @param {Event} event - TBD.
   */
  public orientationChange(event: Event) {
    this.event = event;
    this.queueUpdate(true);
  }

  /**
   * TBD.
   * @param {Event} event - TBD.
   */
  public windowResize(event: Event) {
    this.event = event;
    this.queueUpdate(true);
  }

  /**
   * TBD.
   */
  public refresh() {
    this.queueUpdate(true);
  }

  /**
   * TBD.
   */
  public updateLayout() {
    const scaleMode = this.currentScaleMode;
    if (scaleMode === SCALE_RESIZE) {
      this.reflowGame();
      return;
    }
    if (this.incorrectOrientation) {
      this.setMaximum();
    } else if (scaleMode === SCALE_EXACT_FIT) {
      this.setExactFit();
    } else if (scaleMode === SCALE_SHOW_ALL) {
      if (!this.isFullScreen && this.boundingParent && this.compatibility.canExpandParent) {
        // Try to expand parent out, but choosing maximizing dimensions.
        // Then select minimize dimensions which should then honor parent
        // maximum bound applications.
        this.setShowAll(true);
        this.resetCanvas();
        this.setShowAll();
      } else {
        this.setShowAll();
      }
    } else if (scaleMode === SCALE_OFF) {
      this.width = this.game.width;
      this.height = this.game.height;
    } else if (scaleMode === SCALE_USER) {
      this.width = this.game.width * this._userScaleFactor.x - this._userScaleTrim.x;
      this.height = this.game.height * this._userScaleFactor.y - this._userScaleTrim.y;
    }
    if (!this.compatibility.canExpandParent && (scaleMode === SCALE_SHOW_ALL || scaleMode === SCALE_USER)) {
      const bounds = this.getParentBounds(this._tempBounds);
      this.width = Math.min(this.width, bounds.width);
      this.height = Math.min(this.height, bounds.height);
    }
    // Always truncate / force to integer
    this.width |= 0;
    this.height |= 0;
    this.reflowCanvas();
  }

  /**
   * TBD.
   * @param {Rectangle} target - TBD.
   * @returns {Rectangle} TBD.
   */
  public getParentBounds(target: Rectangle) {
    const bounds = target || new Rectangle();
    const parentNode = this.boundingParent;
    const { visualBounds } = this.dom;
    const { layoutBounds } = this.dom;
    if (!parentNode) {
      bounds.setTo(0, 0, visualBounds.width, visualBounds.height);
    } else {
      // Ref. http://msdn.microsoft.com/en-us/library/hh781509(v=vs.85).aspx for getBoundingClientRect
      const clientRect = parentNode.getBoundingClientRect();
      const parentRect = parentNode.offsetParent
        ? parentNode.offsetParent.getBoundingClientRect()
        : parentNode.getBoundingClientRect();
      bounds.setTo(
        clientRect.left - parentRect.left,
        clientRect.top - parentRect.top,
        clientRect.width,
        clientRect.height
      );
      const wc = this.windowConstraints;
      if (wc.right) {
        const windowBounds = wc.right === 'layout' ? layoutBounds : visualBounds;
        bounds.right = Math.min(bounds.right, windowBounds.width);
      }
      if (wc.bottom) {
        const windowBounds = wc.bottom === 'layout' ? layoutBounds : visualBounds;
        bounds.bottom = Math.min(bounds.bottom, windowBounds.height);
      }
    }
    bounds.setTo(Math.round(bounds.x), Math.round(bounds.y), Math.round(bounds.width), Math.round(bounds.height));
    return bounds;
  }

  /**
   * TBD.
   * @param {boolean} horizontal - TBD.
   * @param {boolean} vertical - TBD.
   */
  public alignCanvas(horizontal: boolean, vertical: boolean) {
    const parentBounds = this.getParentBounds(this._tempBounds);
    const { canvas } = this.game;
    const { margin } = this;
    if (horizontal) {
      margin.left = 0;
      margin.right = 0;
      const canvasBounds = canvas.getBoundingClientRect();
      if (this.width < parentBounds.width && !this.incorrectOrientation) {
        const currentEdge = canvasBounds.left - parentBounds.x;
        let targetEdge = parentBounds.width / 2 - this.width / 2;
        targetEdge = Math.max(targetEdge, 0);
        const offset = targetEdge - currentEdge;
        margin.left = Math.round(offset);
      }
      canvas.style.marginLeft = `${margin.left}px`;
      if (margin.left !== 0) {
        margin.right = -(parentBounds.width - canvasBounds.width - margin.left);
        canvas.style.marginRight = `${margin.right}px`;
      }
    }
    if (vertical) {
      margin.top = 0;
      margin.bottom = 0;
      const canvasBounds = canvas.getBoundingClientRect();
      if (this.height < parentBounds.height && !this.incorrectOrientation) {
        const currentEdge = canvasBounds.top - parentBounds.y;
        let targetEdge = parentBounds.height / 2 - this.height / 2;
        targetEdge = Math.max(targetEdge, 0);
        const offset = targetEdge - currentEdge;
        margin.top = Math.round(offset);
      }
      canvas.style.marginTop = `${margin.top}px`;
      if (margin.top !== 0) {
        margin.bottom = -(parentBounds.height - canvasBounds.height - margin.top);
        canvas.style.marginBottom = `${margin.bottom}px`;
      }
    }
    // Silly backwards compatibility..
    margin.x = margin.left;
    margin.y = margin.top;
  }

  /**
   * TBD.
   */
  public reflowGame() {
    this.resetCanvas('', '');
    const bounds = this.getParentBounds(this._tempBounds);
    this.updateDimensions(bounds.width, bounds.height, true);
  }

  /**
   * TBD.
   */
  public reflowCanvas() {
    if (!this.incorrectOrientation) {
      this.width = Math.max(this.minWidth ?? 0, Math.min(this.maxWidth ?? this.width, this.width));
      this.height = Math.max(this.minHeight ?? 0, Math.min(this.maxHeight ?? this.height, this.height));
    }
    this.resetCanvas();
    if (!this.compatibility.noMargins) {
      if (this.isFullScreen && this._createdFullScreenTarget) {
        this.alignCanvas(true, true);
      } else {
        this.alignCanvas(this.pageAlignHorizontally, this.pageAlignVertically);
      }
    }
    this.updateScalingAndBounds();
  }

  /**
   * TBD.
   * @param {string} cssWidth - TBD.
   * @param {string} cssHeight - TBD.
   */
  public resetCanvas(cssWidth = `${this.width}px`, cssHeight = `${this.height}px`) {
    const { canvas } = this.game;
    if (!this.compatibility.noMargins) {
      canvas.style.marginLeft = '';
      canvas.style.marginTop = '';
      canvas.style.marginRight = '';
      canvas.style.marginBottom = '';
    }
    canvas.style.width = cssWidth;
    canvas.style.height = cssHeight;
  }

  /**
   * TBD.
   * @param {boolean} force - TBD.
   */
  public queueUpdate(force: boolean) {
    if (force) {
      this._parentBounds.width = 0;
      this._parentBounds.height = 0;
    }
    this._updateThrottle = this._updateThrottleReset;
  }

  /**
   * TBD.
   */
  public reset() {
    // pass
  }

  /**
   * TBD.
   */
  public setMaximum() {
    this.width = this.dom.visualBounds.width;
    this.height = this.dom.visualBounds.height;
  }

  /**
   * TBD.
   * @param {boolean} expanding - TBD.
   */
  public setShowAll(expanding = false) {
    const bounds = this.getParentBounds(this._tempBounds);
    const { width } = bounds;
    const { height } = bounds;
    let multiplier;
    if (expanding) {
      multiplier = Math.max(height / this.game.height, width / this.game.width);
    } else {
      multiplier = Math.min(height / this.game.height, width / this.game.width);
    }
    this.width = Math.round(this.game.width * multiplier);
    this.height = Math.round(this.game.height * multiplier);
  }

  /**
   * TBD.
   */
  public setExactFit() {
    const bounds = this.getParentBounds(this._tempBounds);
    this.width = bounds.width;
    this.height = bounds.height;
    if (this.isFullScreen) {
      // Max/min not honored fullscreen
      return;
    }
    if (this.maxWidth) {
      this.width = Math.min(this.width, this.maxWidth);
    }
    if (this.maxHeight) {
      this.height = Math.min(this.height, this.maxHeight);
    }
  }

  /**
   * TBD.
   * @returns {HTMLDivElement} TBD.
   */
  public createFullScreenTarget() {
    const fsTarget = document.createElement('div');
    fsTarget.style.margin = '0';
    fsTarget.style.padding = '0';
    fsTarget.style.background = '#000';
    return fsTarget;
  }

  /**
   * TBD.
   * @param {boolean} antialias - TBD.
   * @param {boolean} allowTrampoline - TBD.
   * @returns {boolean} TBD.
   */
  public startFullScreen(antialias: boolean, allowTrampoline: boolean) {
    if (this.isFullScreen) {
      return false;
    }
    if (!this.compatibility.supportsFullScreen) {
      // Error is called in timeout to emulate the real fullscreenerror event better
      const scope = this;
      setTimeout(() => {
        scope.fullScreenError({} as any);
      }, 10);
      return false;
    }
    if (this.compatibility.clickTrampoline === 'when-not-mouse') {
      const { input } = this.game;
      if (input.activePointer && input.activePointer !== input.mousePointer && allowTrampoline) {
        input.activePointer.addClickTrampoline('startFullScreen', this.startFullScreen, this, [antialias, false]);
        return false;
      }
    }
    if (antialias !== undefined && this.game.renderer.type === RENDER_CANVAS) {
      this.game.stage.smoothed = antialias;
    }
    let fsTarget = this.fullScreenTarget;
    if (!fsTarget) {
      this.cleanupCreatedTarget();
      this._createdFullScreenTarget = this.createFullScreenTarget();
      fsTarget = this._createdFullScreenTarget;
    }
    this.hasPhaserSetFullScreen = true;
    this.onFullScreenInit.dispatch(this, { targetElement: fsTarget });
    if (this._createdFullScreenTarget) {
      // Move the Display canvas inside of the target and add the target to the DOM
      // (The target has to be added for the Fullscreen API to work.)
      const { canvas } = this.game;
      const parent = canvas.parentNode;
      if (parent) {
        canvas.before(fsTarget);
      }
      fsTarget.append(canvas);
    }
    if (this.game.device.fullscreenKeyboard) {
      fsTarget[this.game.device.requestFullscreen]((Element as any).ALLOW_KEYBOARD_INPUT);
    } else {
      fsTarget[this.game.device.requestFullscreen]();
    }
    return true;
  }

  /**
   * TBD.
   * @returns {boolean} TBD.
   */
  public stopFullScreen() {
    if (!this.isFullScreen || !this.compatibility.supportsFullScreen) {
      return false;
    }
    this.hasPhaserSetFullScreen = false;
    (document as unknown as Record<string, (() => void) | undefined>)[this.game.device.cancelFullscreen]?.();
    return true;
  }

  /**
   * TBD.
   */
  public cleanupCreatedTarget() {
    const fsTarget = this._createdFullScreenTarget;
    if (fsTarget && fsTarget.parentNode) {
      // Make sure to cleanup synthetic target for sure;
      // swap the canvas back to the parent.
      const parent = fsTarget.parentNode;
      parent.insertBefore(this.game.canvas, fsTarget);
      parent.removeChild(fsTarget);
    }
    this._createdFullScreenTarget = null;
  }

  /**
   * TBD.
   * @param {boolean} enteringFullscreen - TBD.
   */
  public prepScreenMode(enteringFullscreen: boolean) {
    const fsTarget = this._createdFullScreenTarget ?? this.fullScreenTarget;
    if (!fsTarget) {
      return;
    }
    if (enteringFullscreen) {
      if (this._createdFullScreenTarget || this.fullScreenScaleMode === SCALE_EXACT_FIT) {
        // Resize target, as long as it's not the canvas
        if (fsTarget !== this.game.canvas) {
          this._fullScreenRestore = {
            targetWidth: fsTarget.style.width,
            targetHeight: fsTarget.style.height,
          };
          fsTarget.style.width = '100%';
          fsTarget.style.height = '100%';
        }
      }
    } else {
      // Have restore information
      if (this._fullScreenRestore) {
        fsTarget.style.width = this._fullScreenRestore.targetWidth;
        fsTarget.style.height = this._fullScreenRestore.targetHeight;
        this._fullScreenRestore = null;
      }
      // Always reset to game size
      this.updateDimensions(this._gameSize.width, this._gameSize.height, true);
      this.resetCanvas();
    }
  }

  /**
   * TBD.
   * @param {Event} event - TBD.
   */
  public fullScreenChange(event: Event) {
    this.event = event;
    if (this.isFullScreen) {
      this.prepScreenMode(true);
      this.updateLayout();
      this.queueUpdate(true);
    } else {
      this.prepScreenMode(false);
      this.cleanupCreatedTarget();
      this.updateLayout();
      this.queueUpdate(true);
    }
    this.onFullScreenChange.dispatch(this, this.width, this.height);
  }

  /**
   * TBD.
   * @param {Event} [event] - TBD.
   */
  public fullScreenError(event: Event) {
    this.event = event;
    this.cleanupCreatedTarget();
    this.onFullScreenError.dispatch(this);
  }

  /**
   * TBD.
   */
  public destroy() {
    this.game.onResume.remove(this._gameResumed, this);
    globalThis.removeEventListener('orientationchange', this._orientationChange, false);
    window.removeEventListener('resize', this._windowResize, false);
    if (this.compatibility.supportsFullScreen) {
      document.removeEventListener('webkitfullscreenchange', this._fullScreenChange, false);
      document.removeEventListener('mozfullscreenchange', this._fullScreenChange, false);
      document.removeEventListener('MSFullscreenChange', this._fullScreenChange, false);
      document.removeEventListener('fullscreenchange', this._fullScreenChange, false);

      document.removeEventListener('webkitfullscreenerror', this._fullScreenError, false);
      document.removeEventListener('mozfullscreenerror', this._fullScreenError, false);
      document.removeEventListener('MSFullscreenError', this._fullScreenError, false);
      document.removeEventListener('fullscreenerror', this._fullScreenError, false);
    }
  }

  /**
   * TBD.
   * @returns {ParentNode | null} TBD.
   */
  public get boundingParent() {
    if (this.parentIsWindow || (this.isFullScreen && this.hasPhaserSetFullScreen && !this._createdFullScreenTarget)) {
      return null;
    }
    const parentNode = this.game.canvas ? (this.game.canvas.parentNode as HTMLElement | null) : null;
    return parentNode ?? null;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  public get scaleMode() {
    return this._scaleMode;
  }

  /**
   * TBD.
   */
  public set scaleMode(value) {
    if (value !== this._scaleMode) {
      if (!this.isFullScreen) {
        this.updateDimensions(this._gameSize.width, this._gameSize.height, true);
        this.queueUpdate(true);
      }
      this._scaleMode = value;
    }
    // return this._scaleMode;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  public get fullScreenScaleMode() {
    return this._fullScreenScaleMode;
  }

  /**
   * TBD.
   */
  public set fullScreenScaleMode(value) {
    if (value !== this._fullScreenScaleMode) {
      // If in fullscreen then need a wee bit more work
      if (this.isFullScreen) {
        this.prepScreenMode(false);
        this._fullScreenScaleMode = value;
        this.prepScreenMode(true);
        this.queueUpdate(true);
      } else {
        this._fullScreenScaleMode = value;
      }
    }
    // return this._fullScreenScaleMode;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  public get currentScaleMode() {
    return this.isFullScreen ? this._fullScreenScaleMode : this._scaleMode;
  }

  /**
   * TBD.
   * @returns {boolean} TBD.
   */
  public get pageAlignHorizontally() {
    return this._pageAlignHorizontally;
  }

  /**
   * TBD.
   * @returns {boolean} TBD.
   */
  public get pageAlignVertically() {
    return this._pageAlignVertically;
  }

  /**
   * TBD.
   * @returns {boolean} TBD.
   */
  public get isFullScreen() {
    return Boolean(
      document.fullscreenElement ??
      (document as any).webkitFullscreenElement ??
      (document as any).mozFullScreenElement ??
      (document as any).msFullscreenElement
    );
  }

  /**
   * TBD.
   * @returns {boolean} TBD.
   */
  public get isPortrait() {
    return this.classifyOrientation(this.screenOrientation) === 'portrait';
  }

  /**
   * TBD.
   * @returns {boolean} TBD.
   */
  public get isLandscape() {
    return this.classifyOrientation(this.screenOrientation) === 'landscape';
  }

  /**
   * TBD.
   * @returns {boolean} TBD.
   */
  public get isGamePortrait() {
    return this.height > this.width;
  }

  /**
   * TBD.
   * @returns {boolean} TBD.
   */
  public get isGameLandscape() {
    return this.width > this.height;
  }
}
