/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 */
import Signal from './signal';
import DOM from './dom';
import Point from '../geom/point';
import Rectangle from '../geom/rectangle';
import {
  SCALE_OFF,
  SCALE_RESIZE,
  SCALE_EXACT_FIT,
  SCALE_USER,
  SCALE_SHOW_ALL,
  RENDER_CANVAS,
} from './const';

export default class {
  constructor(game, width, height) {
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

  boot() {
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
    this._orientationChange = (event) => scope.orientationChange(event);
    this._windowResize = (event) => scope.windowResize(event);
    // This does not appear to be on the standards track
    window.addEventListener('orientationchange', this._orientationChange, false);
    window.addEventListener('resize', this._windowResize, false);
    if (this.compatibility.supportsFullScreen) {
      this._fullScreenChange = (event) => scope.fullScreenChange(event);
      this._fullScreenError = (event) => scope.fullScreenError(event);
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

  parseConfig(config) {
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

  setupScale(width, height) {
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
      this.offset.set(0, 0);
    } else {
      this.parentNode = target;
      this.parentIsWindow = false;
      this.getParentBounds(this._parentBounds);
      rect.width = this._parentBounds.width;
      rect.height = this._parentBounds.height;
      this.offset.set(this._parentBounds.x, this._parentBounds.y);
    }
    let newWidth = 0;
    let newHeight = 0;
    if (typeof width === 'number') {
      newWidth = width;
    } else {
      //  Percentage based
      this.parentScaleFactor.x = parseInt(width, 10) / 100;
      newWidth = rect.width * this.parentScaleFactor.x;
    }
    if (typeof height === 'number') {
      newHeight = height;
    } else {
      //  Percentage based
      this.parentScaleFactor.y = parseInt(height, 10) / 100;
      newHeight = rect.height * this.parentScaleFactor.y;
    }
    newWidth = Math.floor(newWidth);
    newHeight = Math.floor(newHeight);
    this._gameSize.setTo(0, 0, newWidth, newHeight);
    this.updateDimensions(newWidth, newHeight, false);
  }

  _gameResumed() {
    this.queueUpdate(true);
  }

  setGameSize(width, height) {
    this._gameSize.setTo(0, 0, width, height);
    if (this.currentScaleMode !== SCALE_RESIZE) {
      this.updateDimensions(width, height, true);
    }
    this.queueUpdate(true);
  }

  setUserScale(hScale, vScale, hTrim, vTrim) {
    this._userScaleFactor.setTo(hScale, vScale);
    this._userScaleTrim.setTo(hTrim | 0, vTrim | 0);
    this.queueUpdate(true);
  }

  setResizeCallback(callback, context) {
    this.onResize = callback;
    this.onResizeContext = context;
  }

  signalSizeChange() {
    if (
      this.width !== this._lastReportedCanvasSize.width ||
      this.height !== this._lastReportedCanvasSize.height ||
      this.game.width !== this._lastReportedGameSize.width ||
      this.game.height !== this._lastReportedGameSize.height
    ) {
      const width = this.width;
      const height = this.height;
      this._lastReportedCanvasSize.setTo(0, 0, width, height);
      this._lastReportedGameSize.setTo(0, 0, this.game.width, this.game.height);
      this.onSizeChange.dispatch(this, width, height);
      // Per StateManager#onResizeCallback, it only occurs when in RESIZE mode.
      if (this.currentScaleMode === SCALE_RESIZE) {
        this.game.state.resize(width, height);
        this.game.load.resize(width, height);
      }
    }
  }

  setMinMax(minWidth, minHeight, maxWidth, maxHeight) {
    this.minWidth = minWidth;
    this.minHeight = minHeight;
    if (typeof maxWidth !== 'undefined') {
      this.maxWidth = maxWidth;
    }
    if (typeof maxHeight !== 'undefined') {
      this.maxHeight = maxHeight;
    }
  }

  preUpdate() {
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

  pauseUpdate() {
    this.preUpdate();
    // Updates at slowest.
    this._updateThrottle = this.trackParentInterval;
  }

  updateDimensions(width, height, resize) {
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

  updateScalingAndBounds() {
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

  forceOrientation(forceLandscape = false, forcePortrait = false) {
    this.forceLandscape = forceLandscape;
    this.forcePortrait = forcePortrait;
    this.queueUpdate(true);
  }

  classifyOrientation(orientation) {
    if (orientation === 'portrait-primary' || orientation === 'portrait-secondary') {
      return 'portrait';
    } else if (orientation === 'landscape-primary' || orientation === 'landscape-secondary') {
      return 'landscape';
    }
    return null;
  }

  updateOrientationState() {
    const previousOrientation = this.screenOrientation;
    const previouslyIncorrect = this.incorrectOrientation;
    this.screenOrientation = this.dom.getScreenOrientation(this.compatibility.orientationFallback);
    this.incorrectOrientation =
      (this.forceLandscape && !this.isLandscape) || (this.forcePortrait && !this.isPortrait);
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

  orientationChange(event) {
    this.event = event;
    this.queueUpdate(true);
  }

  windowResize(event) {
    this.event = event;
    this.queueUpdate(true);
  }

  refresh() {
    this.queueUpdate(true);
  }

  updateLayout() {
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
    if (
      !this.compatibility.canExpandParent &&
      (scaleMode === SCALE_SHOW_ALL || scaleMode === SCALE_USER)
    ) {
      const bounds = this.getParentBounds(this._tempBounds);
      this.width = Math.min(this.width, bounds.width);
      this.height = Math.min(this.height, bounds.height);
    }
    // Always truncate / force to integer
    this.width = this.width | 0;
    this.height = this.height | 0;
    this.reflowCanvas();
  }

  getParentBounds(target) {
    const bounds = target || new Rectangle();
    const parentNode = this.boundingParent;
    const visualBounds = this.dom.visualBounds;
    const layoutBounds = this.dom.layoutBounds;
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
    bounds.setTo(
      Math.round(bounds.x),
      Math.round(bounds.y),
      Math.round(bounds.width),
      Math.round(bounds.height)
    );
    return bounds;
  }

  alignCanvas(horizontal, vertical) {
    const parentBounds = this.getParentBounds(this._tempBounds);
    const canvas = this.game.canvas;
    const margin = this.margin;
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
      canvas.style.marginLeft = margin.left + 'px';
      if (margin.left !== 0) {
        margin.right = -(parentBounds.width - canvasBounds.width - margin.left);
        canvas.style.marginRight = margin.right + 'px';
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
      canvas.style.marginTop = margin.top + 'px';
      if (margin.top !== 0) {
        margin.bottom = -(parentBounds.height - canvasBounds.height - margin.top);
        canvas.style.marginBottom = margin.bottom + 'px';
      }
    }
    // Silly backwards compatibility..
    margin.x = margin.left;
    margin.y = margin.top;
  }

  reflowGame() {
    this.resetCanvas('', '');
    const bounds = this.getParentBounds(this._tempBounds);
    this.updateDimensions(bounds.width, bounds.height, true);
  }

  reflowCanvas() {
    if (!this.incorrectOrientation) {
      this.width = Math.max(this.minWidth || 0, Math.min(this.maxWidth || this.width, this.width));
      this.height = Math.max(
        this.minHeight || 0,
        Math.min(this.maxHeight || this.height, this.height)
      );
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

  resetCanvas(cssWidth = this.width + 'px', cssHeight = this.height + 'px') {
    const canvas = this.game.canvas;
    if (!this.compatibility.noMargins) {
      canvas.style.marginLeft = '';
      canvas.style.marginTop = '';
      canvas.style.marginRight = '';
      canvas.style.marginBottom = '';
    }
    canvas.style.width = cssWidth;
    canvas.style.height = cssHeight;
  }

  queueUpdate(force) {
    if (force) {
      this._parentBounds.width = 0;
      this._parentBounds.height = 0;
    }
    this._updateThrottle = this._updateThrottleReset;
  }

  reset() {
    // pass
  }

  setMaximum() {
    this.width = this.dom.visualBounds.width;
    this.height = this.dom.visualBounds.height;
  }

  setShowAll(expanding = false) {
    const bounds = this.getParentBounds(this._tempBounds);
    const width = bounds.width;
    const height = bounds.height;
    let multiplier;
    if (expanding) {
      multiplier = Math.max(height / this.game.height, width / this.game.width);
    } else {
      multiplier = Math.min(height / this.game.height, width / this.game.width);
    }
    this.width = Math.round(this.game.width * multiplier);
    this.height = Math.round(this.game.height * multiplier);
  }

  setExactFit() {
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

  createFullScreenTarget() {
    const fsTarget = document.createElement('div');
    fsTarget.style.margin = '0';
    fsTarget.style.padding = '0';
    fsTarget.style.background = '#000';
    return fsTarget;
  }

  startFullScreen(antialias, allowTrampoline) {
    if (this.isFullScreen) {
      return false;
    }
    if (!this.compatibility.supportsFullScreen) {
      // Error is called in timeout to emulate the real fullscreenerror event better
      const scope = this;
      setTimeout(() => {
        scope.fullScreenError();
      }, 10);
      return false;
    }
    if (this.compatibility.clickTrampoline === 'when-not-mouse') {
      const input = this.game.input;
      if (
        input.activePointer &&
        input.activePointer !== input.mousePointer &&
        (allowTrampoline || allowTrampoline !== false)
      ) {
        input.activePointer.addClickTrampoline('startFullScreen', this.startFullScreen, this, [
          antialias,
          false,
        ]);
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
      const canvas = this.game.canvas;
      const parent = canvas.parentNode;
      parent.insertBefore(fsTarget, canvas);
      fsTarget.appendChild(canvas);
    }
    if (this.game.device.fullscreenKeyboard) {
      fsTarget[this.game.device.requestFullscreen](Element.ALLOW_KEYBOARD_INPUT);
    } else {
      fsTarget[this.game.device.requestFullscreen]();
    }
    return true;
  }

  stopFullScreen() {
    if (!this.isFullScreen || !this.compatibility.supportsFullScreen) {
      return false;
    }
    this.hasPhaserSetFullScreen = false;
    document[this.game.device.cancelFullscreen]();
    return true;
  }

  cleanupCreatedTarget() {
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

  prepScreenMode(enteringFullscreen) {
    const fsTarget = this._createdFullScreenTarget || this.fullScreenTarget;
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

  fullScreenChange(event) {
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

  fullScreenError(event) {
    this.event = event;
    this.cleanupCreatedTarget();
    this.onFullScreenError.dispatch(this);
  }

  destroy() {
    this.game.onResume.remove(this._gameResumed, this);
    window.removeEventListener('orientationchange', this._orientationChange, false);
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

  get boundingParent() {
    if (
      this.parentIsWindow ||
      (this.isFullScreen && this.hasPhaserSetFullScreen && !this._createdFullScreenTarget)
    ) {
      return null;
    }
    const parentNode = this.game.canvas && this.game.canvas.parentNode;
    return parentNode || null;
  }

  get scaleMode() {
    return this._scaleMode;
  }

  set scaleMode(value) {
    if (value !== this._scaleMode) {
      if (!this.isFullScreen) {
        this.updateDimensions(this._gameSize.width, this._gameSize.height, true);
        this.queueUpdate(true);
      }
      this._scaleMode = value;
    }
    // return this._scaleMode;
  }

  get fullScreenScaleMode() {
    return this._fullScreenScaleMode;
  }

  set fullScreenScaleMode(value) {
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

  get currentScaleMode() {
    return this.isFullScreen ? this._fullScreenScaleMode : this._scaleMode;
  }

  get pageAlignHorizontally() {
    return this._pageAlignHorizontally;
  }

  get pageAlignVertically() {
    return this._pageAlignVertically;
  }

  get isFullScreen() {
    return !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );
  }

  get isPortrait() {
    return this.classifyOrientation(this.screenOrientation) === 'portrait';
  }

  get isLandscape() {
    return this.classifyOrientation(this.screenOrientation) === 'landscape';
  }

  get isGamePortrait() {
    return this.height > this.width;
  }

  get isGameLandscape() {
    return this.width > this.height;
  }
}
