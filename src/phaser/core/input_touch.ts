import type { Game } from './game.js';
export class Touch {
  public game!: any;
  public enabled!: any;
  public callbackContext!: any;
  public touchStartCallback!: any;
  public touchMoveCallback!: any;
  public touchEndCallback!: any;
  public touchEnterCallback!: any;
  public touchLeaveCallback!: any;
  public touchCancelCallback!: any;
  public preventDefault!: any;
  public event!: any;
  public _onTouchStart: ((event: TouchEvent) => void) | null;
  public _onTouchMove: ((event: TouchEvent) => void) | null;
  public _onTouchEnd: ((event: TouchEvent) => void) | null;
  public _onTouchEnter: ((event: TouchEvent) => void) | null;
  public _onTouchLeave: ((event: TouchEvent) => void) | null;
  public _onTouchCancel: ((event: TouchEvent) => void) | null;
  public _documentTouchMove!: (event: TouchEvent) => void;
  /**
   * TBD.
   * @param {Game} game - TBD.
   */
  public constructor(game: Game) {
    this.game = game;
    this.enabled = true;
    this.callbackContext = this.game;
    this.touchStartCallback = null;
    this.touchMoveCallback = null;
    this.touchEndCallback = null;
    this.touchEnterCallback = null;
    this.touchLeaveCallback = null;
    this.touchCancelCallback = null;
    this.preventDefault = true;
    this.event = null;
    this._onTouchStart = null;
    this._onTouchMove = null;
    this._onTouchEnd = null;
    this._onTouchEnter = null;
    this._onTouchLeave = null;
    this._onTouchCancel = null;
    this._onTouchMove = null;
  }

  /**
   * TBD.
   */
  public start() {
    if (!this.game.device.touch || this._onTouchStart !== null) {
      return;
    }
    const scope = this;
    this._onTouchStart = (event) => {
      scope.onTouchStart(event);
    };
    this._onTouchMove = (event) => {
      scope.onTouchMove(event);
    };
    this._onTouchEnd = (event) => {
      scope.onTouchEnd(event);
    };
    this._onTouchEnter = (event) => {
      scope.onTouchEnter(event);
    };
    this._onTouchLeave = (event) => {
      scope.onTouchLeave(event);
    };
    this._onTouchCancel = (event) => {
      scope.onTouchCancel(event);
    };
    this.game.canvas.addEventListener('touchstart', this._onTouchStart, false);
    this.game.canvas.addEventListener('touchmove', this._onTouchMove, false);
    this.game.canvas.addEventListener('touchend', this._onTouchEnd, false);
    this.game.canvas.addEventListener('touchcancel', this._onTouchCancel, false);
    this.game.canvas.addEventListener('touchenter', this._onTouchEnter, false);
    this.game.canvas.addEventListener('touchleave', this._onTouchLeave, false);
  }

  /**
   * TBD.
   */
  public stop() {
    if (!this.game.device.touch) {
      return;
    }
    this.game.canvas.removeEventListener('touchstart', this._onTouchStart);
    this.game.canvas.removeEventListener('touchmove', this._onTouchMove);
    this.game.canvas.removeEventListener('touchend', this._onTouchEnd);
    this.game.canvas.removeEventListener('touchenter', this._onTouchEnter);
    this.game.canvas.removeEventListener('touchleave', this._onTouchLeave);
    this.game.canvas.removeEventListener('touchcancel', this._onTouchCancel);
  }

  /**
   * TBD.
   */
  public consumeDocumentTouches() {
    this._documentTouchMove = (event) => {
      event.preventDefault();
    };
    document.addEventListener('touchmove', this._documentTouchMove, false);
  }

  /**
   * TBD.
   * @param {TouchEvent} event - TBD.
   */
  public onTouchStart(event: any) {
    this.event = event;
    if (!this.game.input.enabled || !this.enabled) {
      return;
    }
    if (this.touchStartCallback) {
      this.touchStartCallback.call(this.callbackContext, event);
    }
    this.eventPreventDefault(event);
    // event.targetTouches = list of all touches on the TARGET ELEMENT (i.e. game dom element)
    // event.touches = list of all touches on the ENTIRE DOCUMENT, not just the target element
    // event.changedTouches = the touches that CHANGED in this event, not the total number of them
    for (let i = 0; i < event.changedTouches.length; i += 1) {
      this.game.input.startPointer(event.changedTouches[i]);
    }
  }

  /**
   * TBD.
   * @param {TouchEvent} event - TBD.
   */
  public onTouchCancel(event: any) {
    this.event = event;
    if (this.touchCancelCallback) {
      this.touchCancelCallback.call(this.callbackContext, event);
    }
    if (!this.game.input.enabled || !this.enabled) {
      return;
    }
    this.eventPreventDefault(event);
    // Touch cancel - touches that were disrupted (perhaps by moving into a plugin or browser chrome)
    // http://www.w3.org/TR/touch-events/#dfn-touchcancel
    for (let i = 0; i < event.changedTouches.length; i += 1) {
      this.game.input.stopPointer(event.changedTouches[i]);
    }
  }

  /**
   * TBD.
   * @param {TouchEvent} event - TBD.
   */
  public onTouchEnter(event: any) {
    this.event = event;
    if (this.touchEnterCallback) {
      this.touchEnterCallback.call(this.callbackContext, event);
    }
    if (!this.game.input.enabled || !this.enabled) {
      return;
    }
    this.eventPreventDefault(event);
  }

  /**
   * TBD.
   * @param {TouchEvent} event - TBD.
   */
  public onTouchLeave(event: any) {
    this.event = event;
    if (this.touchLeaveCallback) {
      this.touchLeaveCallback.call(this.callbackContext, event);
    }
    this.eventPreventDefault(event);
  }

  /**
   * TBD.
   * @param {TouchEvent} event - TBD.
   */
  public onTouchMove(event: any) {
    this.event = event;
    if (this.touchMoveCallback) {
      this.touchMoveCallback.call(this.callbackContext, event);
    }
    this.eventPreventDefault(event);
    for (let i = 0; i < event.changedTouches.length; i += 1) {
      this.game.input.updatePointer(event.changedTouches[i]);
    }
  }

  /**
   * TBD.
   * @param {TouchEvent} event - TBD.
   */
  public onTouchEnd(event: any) {
    this.event = event;
    if (this.touchEndCallback) {
      this.touchEndCallback.call(this.callbackContext, event);
    }
    this.eventPreventDefault(event);
    // For touch end its a list of the touch points that have been removed from the surface
    // https://developer.mozilla.org/en-US/docs/DOM/TouchList
    // event.changedTouches = the touches that CHANGED in this event, not the total number of them
    for (let i = 0; i < event.changedTouches.length; i += 1) {
      this.game.input.stopPointer(event.changedTouches[i]);
    }
  }

  /**
   * TBD.
   * @param {TouchEvent} event - TBD.
   */
  public eventPreventDefault(event: any) {
    if (this.preventDefault) {
      if (typeof event.cancelable !== 'boolean' || event.cancelable) {
        event.preventDefault();
      }
    }
  }
}
