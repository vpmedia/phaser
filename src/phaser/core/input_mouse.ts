import type { InputEvent } from './input_event.js';
import type { Input } from './input.js';
import type { Game } from './game.js';

export class Mouse {
  public game!: Game;
  public input!: Input;
  public callbackContext!: unknown;
  public mouseDownCallback: EventListener | null;
  public mouseUpCallback: EventListener | null;
  public mouseOutCallback: EventListener | null;
  public mouseOverCallback: EventListener | null;
  public mouseWheelCallback: EventListener | null;
  public mouseMoveCallback: EventListener | null;
  public capture!: boolean;
  public button!: number;
  public wheelDelta!: number;
  public enabled!: boolean;
  public locked!: boolean;
  public stopOnGameOut!: boolean;
  public event!: InputEvent | null;
  public _onMouseDown: EventListener | null;
  public _onMouseMove: EventListener | null;
  public _onMouseUp: EventListener | null;
  public _onMouseOut: EventListener | null;
  public _onMouseOver: EventListener | null;
  public _onMouseWheel: EventListener | null;
  public _onMouseUpGlobal!: EventListener;
  public _onMouseOutGlobal!: EventListener;
  public _wheelEvent!: any;
  /**
   * TBD.
   * @param {Game} game - TBD.
   */
  public constructor(game: Game) {
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
  public start() {
    if (this.game.device.android && !this.game.device.chrome) {
      //  Android stock browser fires mouse events even if you preventDefault on the touchStart, so ...
      return;
    }
    if (this._onMouseDown !== null) {
      //  Avoid setting multiple listeners
      return;
    }
    const scope = this;
    this._onMouseDown = (event) => {
      scope.onMouseDown(event);
    };
    this._onMouseMove = (event) => {
      scope.onMouseMove(event);
    };
    this._onMouseUp = (event) => {
      scope.onMouseUp(event);
    };
    this._onMouseUpGlobal = (event) => {
      scope.onMouseUpGlobal(event);
    };
    this._onMouseOutGlobal = (event) => {
      scope.onMouseOutGlobal(event);
    };
    this._onMouseOut = (event) => {
      scope.onMouseOut(event);
    };
    this._onMouseOver = (event) => {
      scope.onMouseOver(event);
    };
    this._onMouseWheel = (event) => {
      scope.onMouseWheel(event);
    };
    const { canvas } = this.game;
    canvas.addEventListener('mousedown', this._onMouseDown, true);
    canvas.addEventListener('mousemove', this._onMouseMove, true);
    canvas.addEventListener('mouseup', this._onMouseUp, true);
    globalThis.addEventListener('mouseup', this._onMouseUpGlobal, true);
    globalThis.addEventListener('mouseout', this._onMouseOutGlobal, true);
    canvas.addEventListener('mouseover', this._onMouseOver, true);
    canvas.addEventListener('mouseout', this._onMouseOut, true);
    const { wheelEvent } = this.game.device;
    if (wheelEvent) {
      canvas.addEventListener(wheelEvent, this._onMouseWheel, true);
    }
  }

  /**
   * TBD.
   */
  public stop() {
    const { canvas } = this.game;
    if (this._onMouseDown) {
      canvas.removeEventListener('mousedown', this._onMouseDown, true);
    }
    if (this._onMouseMove) {
      canvas.removeEventListener('mousemove', this._onMouseMove, true);
    }
    if (this._onMouseUp) {
      canvas.removeEventListener('mouseup', this._onMouseUp, true);
    }
    if (this._onMouseOver) {
      canvas.removeEventListener('mouseover', this._onMouseOver, true);
    }
    if (this._onMouseOut) {
      canvas.removeEventListener('mouseout', this._onMouseOut, true);
    }
    const { wheelEvent } = this.game.device;
    if (wheelEvent) {
      if (this._onMouseWheel) {
        canvas.removeEventListener(wheelEvent, this._onMouseWheel, true);
      }
    }
    if (this._onMouseUpGlobal) {
      globalThis.removeEventListener('mouseup', this._onMouseUpGlobal, true);
    }
    if (this._onMouseOutGlobal) {
      globalThis.removeEventListener('mouseout', this._onMouseOutGlobal, true);
    }
  }

  /**
   * TBD.
   * @param {MouseEvent} event - TBD.
   */
  public onMouseDown(event: InputEvent) {
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
  public onMouseMove(event: InputEvent) {
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
  public onMouseUp(event: InputEvent) {
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
  public onMouseUpGlobal(event: InputEvent) {
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
  public onMouseOutGlobal(event: InputEvent) {
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
  public onMouseOut(event: InputEvent) {
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
  public onMouseOver(event: InputEvent) {
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
  public onMouseWheel(event: InputEvent) {
    if (this._wheelEvent) {
      event = this._wheelEvent.bindEvent(event);
    }
    this.event = event;
    this.eventPreventDefault(event);
    // reverse detail for firefox
    this.wheelDelta = Math.max(-1, Math.min(1, -(event.deltaY ?? 0)));
    if (this.mouseWheelCallback) {
      this.mouseWheelCallback.call(this.callbackContext, event);
    }
  }

  /**
   * TBD.
   * @param {MouseEvent} event - TBD.
   */
  public eventPreventDefault(event: Event) {
    if (this.capture) {
      if (typeof event.cancelable !== 'boolean' || event.cancelable) {
        event.preventDefault();
      }
    }
  }
}
