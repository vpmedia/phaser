/* const NO_BUTTON = -1;
const LEFT_BUTTON = 0;
const MIDDLE_BUTTON = 1;
const RIGHT_BUTTON = 2;
const BACK_BUTTON = 3;
const FORWARD_BUTTON = 4;
const WHEEL_UP = 1;
const WHEEL_DOWN = -1; */

class WheelEventProxy {
  /**
   * TBD.
   * @param {number} scaleFactor - TBD.
   * @param {number} deltaMode - TBD.
   */
  constructor(scaleFactor, deltaMode) {
    this._scaleFactor = scaleFactor;
    this._deltaMode = deltaMode;
    this.originalEvent = null;
    this.type = 'wheel';
    this.deltaZ = { value: 0 };
  }

  /**
   * TBD.
   * @param {WheelEvent} event - TBD.
   * @returns {WheelEventProxy} TBD.
   */
  bindEvent(event) {
    // TODO
    console.warn('input_mouse.bindEvent() is not implemented');
    /*
    if (!window.PhaserRegistry.isMouseWheelEventBinded && event) {
      const makeBinder = (name) => {
        return () => {
          const v = this.originalEvent[name];
          return typeof v !== 'function' ? v : v.bind(this.originalEvent);
        };
      };
      window.PhaserRegistry.isMouseWheelEventBinded = true;
    }
    */
    this.originalEvent = event;
    return this;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get deltaMode() {
    return this._deltaMode;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get deltaY() {
    return this._scaleFactor * (this.originalEvent.wheelDelta || this.originalEvent.detail) || 0;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get deltaX() {
    return this._scaleFactor * this.originalEvent.wheelDeltaX || 0;
  }
}

export class Mouse {
  /**
   * TBD.
   * @param {import('./game.js').Game} game - TBD.
   */
  constructor(game) {
    this.game = game;
    this.input = game.input;
    this.callbackContext = this.game;
    this.mouseDownCallback = null;
    this.mouseUpCallback = null;
    this.mouseOutCallback = null;
    this.mouseOverCallback = null;
    this.mouseWheelCallback = null;
    this.mouseMoveCallback = null;
    this.capture = false;
    this.button = -1;
    this.wheelDelta = 0;
    this.enabled = true;
    this.locked = false;
    this.stopOnGameOut = false;
    this.event = null;
    this._onMouseDown = null;
    this._onMouseMove = null;
    this._onMouseUp = null;
    this._onMouseOut = null;
    this._onMouseOver = null;
    this._onMouseWheel = null;
    this._wheelEvent = null;
  }

  /**
   * TBD.
   */
  start() {
    if (this.game.device.android && this.game.device.chrome === false) {
      //  Android stock browser fires mouse events even if you preventDefault on the touchStart, so ...
      return;
    }
    if (this._onMouseDown !== null) {
      //  Avoid setting multiple listeners
      return;
    }
    const scope = this;
    this._onMouseDown = (event) => scope.onMouseDown(event);
    this._onMouseMove = (event) => scope.onMouseMove(event);
    this._onMouseUp = (event) => scope.onMouseUp(event);
    this._onMouseUpGlobal = (event) => scope.onMouseUpGlobal(event);
    this._onMouseOutGlobal = (event) => scope.onMouseOutGlobal(event);
    this._onMouseOut = (event) => scope.onMouseOut(event);
    this._onMouseOver = (event) => scope.onMouseOver(event);
    this._onMouseWheel = (event) => scope.onMouseWheel(event);
    const canvas = this.game.canvas;
    canvas.addEventListener('mousedown', this._onMouseDown, true);
    canvas.addEventListener('mousemove', this._onMouseMove, true);
    canvas.addEventListener('mouseup', this._onMouseUp, true);
    window.addEventListener('mouseup', this._onMouseUpGlobal, true);
    window.addEventListener('mouseout', this._onMouseOutGlobal, true);
    canvas.addEventListener('mouseover', this._onMouseOver, true);
    canvas.addEventListener('mouseout', this._onMouseOut, true);
    const wheelEvent = this.game.device.wheelEvent;
    if (wheelEvent) {
      canvas.addEventListener(wheelEvent, this._onMouseWheel, true);
    }
  }

  /**
   * TBD.
   */
  stop() {
    const canvas = this.game.canvas;
    canvas.removeEventListener('mousedown', this._onMouseDown, true);
    canvas.removeEventListener('mousemove', this._onMouseMove, true);
    canvas.removeEventListener('mouseup', this._onMouseUp, true);
    canvas.removeEventListener('mouseover', this._onMouseOver, true);
    canvas.removeEventListener('mouseout', this._onMouseOut, true);
    const wheelEvent = this.game.device.wheelEvent;
    if (wheelEvent) {
      canvas.removeEventListener(wheelEvent, this._onMouseWheel, true);
    }
    window.removeEventListener('mouseup', this._onMouseUpGlobal, true);
    window.removeEventListener('mouseout', this._onMouseOutGlobal, true);
  }

  /**
   * TBD.
   * @param {MouseEvent} event - TBD.
   */
  onMouseDown(event) {
    this.event = event;
    this.eventPreventDefault(event);
    if (this.mouseDownCallback) {
      this.mouseDownCallback.call(this.callbackContext, event);
    }
    if (!this.input.enabled || !this.enabled) {
      return;
    }
    event.identifier = 0;
    this.input.mousePointer.start(event);
  }

  /**
   * TBD.
   * @param {MouseEvent} event - TBD.
   */
  onMouseMove(event) {
    this.event = event;
    this.eventPreventDefault(event);
    if (this.mouseMoveCallback) {
      this.mouseMoveCallback.call(this.callbackContext, event);
    }
    if (!this.input.enabled || !this.enabled) {
      return;
    }
    event.identifier = 0;
    this.input.mousePointer.move(event);
  }

  /**
   * TBD.
   * @param {MouseEvent} event - TBD.
   */
  onMouseUp(event) {
    this.event = event;
    this.eventPreventDefault(event);
    if (this.mouseUpCallback) {
      this.mouseUpCallback.call(this.callbackContext, event);
    }
    if (!this.input.enabled || !this.enabled) {
      return;
    }
    event.identifier = 0;
    this.input.mousePointer.stop(event);
  }

  /**
   * TBD.
   * @param {MouseEvent} event - TBD.
   */
  onMouseUpGlobal(event) {
    if (!this.input.mousePointer.withinGame) {
      if (this.mouseUpCallback) {
        this.mouseUpCallback.call(this.callbackContext, event);
      }
      event.identifier = 0;
      this.input.mousePointer.stop(event);
    }
  }

  /**
   * TBD.
   * @param {MouseEvent} event - TBD.
   */
  onMouseOutGlobal(event) {
    this.event = event;
    this.eventPreventDefault(event);
    this.input.mousePointer.withinGame = false;
    if (!this.input.enabled || !this.enabled) {
      return;
    }
    //  If we get a mouseout event from the window then basically
    //  something serious has gone down, usually along the lines of
    //  the browser opening a context-menu or similar.
    //  On OS X Chrome especially this is bad news, as it blocks
    //  us then getting a mouseup event, so we need to force that through.
    this.input.mousePointer.stop(event);
  }

  /**
   * TBD.
   * @param {MouseEvent} event - TBD.
   */
  onMouseOut(event) {
    this.event = event;
    this.eventPreventDefault(event);
    this.input.mousePointer.withinGame = false;
    if (this.mouseOutCallback) {
      this.mouseOutCallback.call(this.callbackContext, event);
    }
    if (!this.input.enabled || !this.enabled) {
      return;
    }
    if (this.stopOnGameOut) {
      event.identifier = 0;
      this.input.mousePointer.stop(event);
    }
  }

  /**
   * TBD.
   * @param {MouseEvent} event - TBD.
   */
  onMouseOver(event) {
    this.event = event;
    this.eventPreventDefault(event);
    this.input.mousePointer.withinGame = true;
    if (this.mouseOverCallback) {
      this.mouseOverCallback.call(this.callbackContext, event);
    }
  }

  /**
   * TBD.
   * @param {WheelEvent} event - TBD.
   */
  onMouseWheel(event) {
    if (this._wheelEvent) {
      event = this._wheelEvent.bindEvent(event);
    }
    this.event = event;
    this.eventPreventDefault(event);
    // reverse detail for firefox
    this.wheelDelta = Math.max(-1, Math.min(1, -event.deltaY));
    if (this.mouseWheelCallback) {
      this.mouseWheelCallback.call(this.callbackContext, event);
    }
  }

  /**
   * TBD.
   * @param {MouseEvent} event - TBD.
   */
  eventPreventDefault(event) {
    if (this.capture) {
      if (typeof event.cancelable !== 'boolean' || event.cancelable) {
        event.preventDefault();
      }
    }
  }
}
