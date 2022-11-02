/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
import Signal from './signal';

const NO_BUTTON = -1;
const LEFT_BUTTON = 0;
const MIDDLE_BUTTON = 1;
const RIGHT_BUTTON = 2;
const BACK_BUTTON = 3;
const FORWARD_BUTTON = 4;
const WHEEL_UP = 1;
const WHEEL_DOWN = -1;

class WheelEventProxy {

  constructor(scaleFactor, deltaMode) {
    this._scaleFactor = scaleFactor;
    this._deltaMode = deltaMode;
    this.originalEvent = null;
    this.type = 'wheel';
    this.deltaZ = { value: 0 };
  }

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

  get deltaMode() {
    return this._deltaMode;
  }

  get deltaY() {
    return (this._scaleFactor * (this.originalEvent.wheelDelta || this.originalEvent.detail)) || 0;
  }

  get deltaX() {
    return (this._scaleFactor * this.originalEvent.wheelDeltaX) || 0;
  }

}

export default class {

  constructor(game) {
    this.game = game;
    this.input = game.input;
    this.callbackContext = this.game;
    this.mouseDownCallback = null;
    this.mouseUpCallback = null;
    this.mouseOutCallback = null;
    this.mouseOverCallback = null;
    this.mouseWheelCallback = null;
    this.capture = false;
    this.button = -1;
    this.wheelDelta = 0;
    this.enabled = true;
    this.locked = false;
    this.stopOnGameOut = false;
    this.pointerLock = new Signal();
    this.event = null;
    this._onMouseDown = null;
    this._onMouseMove = null;
    this._onMouseUp = null;
    this._onMouseOut = null;
    this._onMouseOver = null;
    this._onMouseWheel = null;
    this._wheelEvent = null;
  }

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
    this._onMouseDown = event => scope.onMouseDown(event);
    this._onMouseMove = event => scope.onMouseMove(event);
    this._onMouseUp = event => scope.onMouseUp(event);
    this._onMouseUpGlobal = event => scope.onMouseUpGlobal(event);
    this._onMouseOutGlobal = event => scope.onMouseOutGlobal(event);
    this._onMouseOut = event => scope.onMouseOut(event);
    this._onMouseOver = event => scope.onMouseOver(event);
    this._onMouseWheel = event => scope.onMouseWheel(event);
    const canvas = this.game.canvas;
    canvas.addEventListener('mousedown', this._onMouseDown, true);
    canvas.addEventListener('mousemove', this._onMouseMove, true);
    canvas.addEventListener('mouseup', this._onMouseUp, true);
    if (!this.game.device.cocoonJS) {
      window.addEventListener('mouseup', this._onMouseUpGlobal, true);
      window.addEventListener('mouseout', this._onMouseOutGlobal, true);
      canvas.addEventListener('mouseover', this._onMouseOver, true);
      canvas.addEventListener('mouseout', this._onMouseOut, true);
    }
    const wheelEvent = this.game.device.wheelEvent;
    if (wheelEvent) {
      canvas.addEventListener(wheelEvent, this._onMouseWheel, true);
      if (wheelEvent === 'mousewheel') {
        this._wheelEvent = new WheelEventProxy(-1 / 40, 1);
      } else if (wheelEvent === 'DOMMouseScroll') {
        this._wheelEvent = new WheelEventProxy(1, 1);
      }
    }
  }

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
    document.removeEventListener('pointerlockchange', this._pointerLockChange, true);
    document.removeEventListener('mozpointerlockchange', this._pointerLockChange, true);
    document.removeEventListener('webkitpointerlockchange', this._pointerLockChange, true);
  }

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

  onMouseUpGlobal(event) {
    if (!this.input.mousePointer.withinGame) {
      if (this.mouseUpCallback) {
        this.mouseUpCallback.call(this.callbackContext, event);
      }
      event.identifier = 0;
      this.input.mousePointer.stop(event);
    }
  }

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

  onMouseOver(event) {
    this.event = event;
    this.eventPreventDefault(event);
    this.input.mousePointer.withinGame = true;
    if (this.mouseOverCallback) {
      this.mouseOverCallback.call(this.callbackContext, event);
    }
  }

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

  requestPointerLock() {
    if (this.game.device.pointerLock) {
      const element = this.game.canvas;
      element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
      element.requestPointerLock();
      const scope = this;
      this._pointerLockChange = event => scope.pointerLockChange(event);
      document.addEventListener('pointerlockchange', this._pointerLockChange, true);
      document.addEventListener('mozpointerlockchange', this._pointerLockChange, true);
      document.addEventListener('webkitpointerlockchange', this._pointerLockChange, true);
    }

  }

  pointerLockChange(event) {
    const element = this.game.canvas;
    if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
      //  Pointer was successfully locked
      this.locked = true;
      this.pointerLock.dispatch(true, event);
    } else {
      //  Pointer was unlocked
      this.locked = false;
      this.pointerLock.dispatch(false, event);
    }
  }

  releasePointerLock() {
    document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;
    document.exitPointerLock();
    document.removeEventListener('pointerlockchange', this._pointerLockChange, true);
    document.removeEventListener('mozpointerlockchange', this._pointerLockChange, true);
    document.removeEventListener('webkitpointerlockchange', this._pointerLockChange, true);
  }

  eventPreventDefault(event) {
    if (this.capture) {
      if (typeof event.cancelable !== 'boolean' || event.cancelable) {
        event.preventDefault();
      }
    }
  }

}
