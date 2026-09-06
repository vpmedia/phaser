import type { Game } from './game.js';
import type { InputEvent } from './input_event.js';
export class Touch {
  public game!: Game;
  public enabled!: boolean;
  public callbackContext!: unknown;
  public touchStartCallback: EventListener | null;
  public touchMoveCallback: EventListener | null;
  public touchEndCallback: EventListener | null;
  public touchEnterCallback: EventListener | null;
  public touchLeaveCallback: EventListener | null;
  public touchCancelCallback: EventListener | null;
  public preventDefault!: boolean;
  public event!: InputEvent | null;
  public _onTouchStart: EventListener | null;
  public _onTouchMove: EventListener | null;
  public _onTouchEnd: EventListener | null;
  public _onTouchEnter: EventListener | null;
  public _onTouchLeave: EventListener | null;
  public _onTouchCancel: EventListener | null;
  public _documentTouchMove!: EventListener;
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
  public start(): void {
    if (!this.game.device.touch || this._onTouchStart !== null) {
      return;
    }
    this._onTouchStart = (event): void => {
      this.onTouchStart(event);
    };
    this._onTouchMove = (event): void => {
      this.onTouchMove(event);
    };
    this._onTouchEnd = (event): void => {
      this.onTouchEnd(event);
    };
    this._onTouchEnter = (event): void => {
      this.onTouchEnter(event);
    };
    this._onTouchLeave = (event): void => {
      this.onTouchLeave(event);
    };
    this._onTouchCancel = (event): void => {
      this.onTouchCancel(event);
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
  public stop(): void {
    if (!this.game.device.touch) {
      return;
    }
    if (this._onTouchStart) {
      this.game.canvas.removeEventListener('touchstart', this._onTouchStart);
    }
    if (this._onTouchMove) {
      this.game.canvas.removeEventListener('touchmove', this._onTouchMove);
    }
    if (this._onTouchEnd) {
      this.game.canvas.removeEventListener('touchend', this._onTouchEnd);
    }
    if (this._onTouchEnter) {
      this.game.canvas.removeEventListener('touchenter', this._onTouchEnter);
    }
    if (this._onTouchLeave) {
      this.game.canvas.removeEventListener('touchleave', this._onTouchLeave);
    }
    if (this._onTouchCancel) {
      this.game.canvas.removeEventListener('touchcancel', this._onTouchCancel);
    }
  }

  /**
   * TBD.
   */
  public consumeDocumentTouches(): void {
    this._documentTouchMove = (event): void => {
      event.preventDefault();
    };
    document.addEventListener('touchmove', this._documentTouchMove, false);
  }

  /**
   * TBD.
   * @param {TouchEvent} event - TBD.
   */
  public onTouchStart(event: InputEvent): void {
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
    const changed = event.changedTouches ?? [];
    for (const touch of changed) {
      this.game.input.startPointer(touch);
    }
  }

  /**
   * TBD.
   * @param {TouchEvent} event - TBD.
   */
  public onTouchCancel(event: InputEvent): void {
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
    const changed = event.changedTouches ?? [];
    for (const touch of changed) {
      this.game.input.stopPointer(touch);
    }
  }

  /**
   * TBD.
   * @param {TouchEvent} event - TBD.
   */
  public onTouchEnter(event: InputEvent): void {
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
  public onTouchLeave(event: InputEvent): void {
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
  public onTouchMove(event: InputEvent): void {
    this.event = event;
    if (this.touchMoveCallback) {
      this.touchMoveCallback.call(this.callbackContext, event);
    }
    this.eventPreventDefault(event);
    const changed = event.changedTouches ?? [];
    for (const touch of changed) {
      this.game.input.updatePointer(touch);
    }
  }

  /**
   * TBD.
   * @param {TouchEvent} event - TBD.
   */
  public onTouchEnd(event: InputEvent): void {
    this.event = event;
    if (this.touchEndCallback) {
      this.touchEndCallback.call(this.callbackContext, event);
    }
    this.eventPreventDefault(event);
    // For touch end its a list of the touch points that have been removed from the surface
    // https://developer.mozilla.org/en-US/docs/DOM/TouchList
    // event.changedTouches = the touches that CHANGED in this event, not the total number of them
    const changed = event.changedTouches ?? [];
    for (const touch of changed) {
      this.game.input.stopPointer(touch);
    }
  }

  /**
   * TBD.
   * @param {TouchEvent} event - TBD.
   */
  public eventPreventDefault(event: InputEvent): void {
    if (this.preventDefault && (typeof event.cancelable !== 'boolean' || event.cancelable)) {
      event.preventDefault();
    }
  }
}
