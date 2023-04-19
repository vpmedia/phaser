
export class MSPointer {
  constructor(game) {
    this.game = game;
    this.input = game.input;
    this.callbackContext = this.game;
    this.pointerDownCallback = null;
    this.pointerMoveCallback = null;
    this.pointerUpCallback = null;
    this.capture = true;
    this.button = -1;
    this.event = null;
    this.enabled = true;
    this._onMSPointerDown = null;
    this._onMSPointerMove = null;
    this._onMSPointerUp = null;
    this._onMSPointerUpGlobal = null;
    this._onMSPointerOut = null;
    this._onMSPointerOver = null;
  }

  start() {
    if (!this.game.device.mspointer || this._onMSPointerDown !== null) {
      return;
    }
    const scope = this;
    this._onMSPointerDown = (event) => scope.onPointerDown(event);
    this._onMSPointerMove = (event) => scope.onPointerMove(event);
    this._onMSPointerUp = (event) => scope.onPointerUp(event);
    this._onMSPointerUpGlobal = (event) => scope.onPointerUpGlobal(event);
    this._onMSPointerOut = (event) => scope.onPointerOut(event);
    this._onMSPointerOver = (event) => scope.onPointerOver(event);
    const canvas = this.game.canvas;
    canvas.addEventListener('MSPointerDown', this._onMSPointerDown, false);
    canvas.addEventListener('MSPointerMove', this._onMSPointerMove, false);
    canvas.addEventListener('MSPointerUp', this._onMSPointerUp, false);
    //  IE11+ uses non-prefix events
    canvas.addEventListener('pointerdown', this._onMSPointerDown, false);
    canvas.addEventListener('pointermove', this._onMSPointerMove, false);
    canvas.addEventListener('pointerup', this._onMSPointerUp, false);
    canvas.style['-ms-content-zooming'] = 'none';
    canvas.style['-ms-touch-action'] = 'none';
    window.addEventListener('MSPointerUp', this._onMSPointerUpGlobal, true);
    canvas.addEventListener('MSPointerOver', this._onMSPointerOver, true);
    canvas.addEventListener('MSPointerOut', this._onMSPointerOut, true);
    //  IE11+ uses non-prefix events
    window.addEventListener('pointerup', this._onMSPointerUpGlobal, true);
    canvas.addEventListener('pointerover', this._onMSPointerOver, true);
    canvas.addEventListener('pointerout', this._onMSPointerOut, true);
  }

  stop() {
    if (!this.game.device.mspointer) {
      return;
    }
    const canvas = this.game.canvas;
    canvas.removeEventListener('MSPointerDown', this._onMSPointerDown, false);
    canvas.removeEventListener('MSPointerMove', this._onMSPointerMove, false);
    canvas.removeEventListener('MSPointerUp', this._onMSPointerUp, false);
    //  IE11+ uses non-prefix events
    canvas.removeEventListener('pointerdown', this._onMSPointerDown, false);
    canvas.removeEventListener('pointermove', this._onMSPointerMove, false);
    canvas.removeEventListener('pointerup', this._onMSPointerUp, false);
    window.removeEventListener('MSPointerUp', this._onMSPointerUpGlobal, true);
    canvas.removeEventListener('MSPointerOver', this._onMSPointerOver, true);
    canvas.removeEventListener('MSPointerOut', this._onMSPointerOut, true);
    //  IE11+ uses non-prefix events
    window.removeEventListener('pointerup', this._onMSPointerUpGlobal, true);
    canvas.removeEventListener('pointerover', this._onMSPointerOver, true);
    canvas.removeEventListener('pointerout', this._onMSPointerOut, true);
  }

  onPointerDown(event) {
    this.event = event;
    this.eventPreventDefault(event);
    if (this.pointerDownCallback) {
      this.pointerDownCallback.call(this.callbackContext, event);
    }
    if (!this.input.enabled || !this.enabled) {
      return;
    }
    event.identifier = event.pointerId;
    if (event.pointerType === 'mouse' || event.pointerType === 0x00000004) {
      this.input.mousePointer.start(event);
    } else {
      this.input.startPointer(event);
    }
  }

  onPointerMove(event) {
    this.event = event;
    this.eventPreventDefault(event);
    if (this.pointerMoveCallback) {
      this.pointerMoveCallback.call(this.callbackContext, event);
    }
    if (!this.input.enabled || !this.enabled) {
      return;
    }
    event.identifier = event.pointerId;
    if (event.pointerType === 'mouse' || event.pointerType === 0x00000004) {
      this.input.mousePointer.move(event);
    } else {
      this.input.updatePointer(event);
    }
  }

  onPointerUp(event) {
    this.event = event;
    this.eventPreventDefault(event);
    if (this.pointerUpCallback) {
      this.pointerUpCallback.call(this.callbackContext, event);
    }
    if (!this.input.enabled || !this.enabled) {
      return;
    }
    event.identifier = event.pointerId;
    if (event.pointerType === 'mouse' || event.pointerType === 0x00000004) {
      this.input.mousePointer.stop(event);
    } else {
      this.input.stopPointer(event);
    }
  }

  onPointerUpGlobal(event) {
    if (
      (event.pointerType === 'mouse' || event.pointerType === 0x00000004) &&
      !this.input.mousePointer.withinGame
    ) {
      this.onPointerUp(event);
    } else {
      const pointer = this.input.getPointerFromIdentifier(event.identifier);
      if (pointer && pointer.withinGame) {
        this.onPointerUp(event);
      }
    }
  }

  onPointerOut(event) {
    this.event = event;
    this.eventPreventDefault(event);
    let pointer;
    if (event.pointerType === 'mouse' || event.pointerType === 0x00000004) {
      this.input.mousePointer.withinGame = false;
    } else {
      pointer = this.input.getPointerFromIdentifier(event.identifier);
      if (pointer) {
        pointer.withinGame = false;
      }
    }
    if (this.input.mouse.mouseOutCallback) {
      this.input.mouse.mouseOutCallback.call(this.input.mouse.callbackContext, event);
    }
    if (!this.input.enabled || !this.enabled) {
      return;
    }
    if (this.input.mouse.stopOnGameOut) {
      event.identifier = 0;
      if (pointer) {
        pointer.stop(event);
      } else {
        this.input.mousePointer.stop(event);
      }
    }
  }

  onPointerOver(event) {
    this.event = event;
    this.eventPreventDefault(event);
    if (event.pointerType === 'mouse' || event.pointerType === 0x00000004) {
      this.input.mousePointer.withinGame = true;
    } else {
      const pointer = this.input.getPointerFromIdentifier(event.identifier);
      if (pointer) {
        pointer.withinGame = true;
      }
    }
    if (this.input.mouse.mouseOverCallback) {
      this.input.mouse.mouseOverCallback.call(this.input.mouse.callbackContext, event);
    }
  }

  eventPreventDefault(event) {
    if (this.capture) {
      if (typeof event.cancelable !== 'boolean' || event.cancelable) {
        event.preventDefault();
      }
    }
  }
}
