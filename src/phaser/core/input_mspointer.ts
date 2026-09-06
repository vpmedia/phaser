import type { Game } from './game.js';
import type { InputEvent } from './input_event.js';
import type { Input } from './input.js';
export class MSPointer {
  public game!: Game;
  public input!: Input;
  public callbackContext!: unknown;
  public pointerDownCallback: EventListener | null;
  public pointerMoveCallback: EventListener | null;
  public pointerUpCallback: EventListener | null;
  public capture!: boolean;
  public button!: number;
  public event!: InputEvent | null;
  public enabled!: boolean;
  public _onMSPointerDown: EventListener | null;
  public _onMSPointerMove: EventListener | null;
  public _onMSPointerUp: EventListener | null;
  public _onMSPointerUpGlobal: EventListener | null;
  public _onMSPointerOut: EventListener | null;
  public _onMSPointerOver: EventListener | null;
  /**
   * TBD.
   * @param {Game} game - TBD.
   */
  public constructor(game: Game) {
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

  /**
   * TBD.
   */
  public start(): void {
    if (!this.game.device.mspointer || this._onMSPointerDown !== null) {
      return;
    }
    const scope = this;
    this._onMSPointerDown = (event): void => {
      scope.onPointerDown(event);
    };
    this._onMSPointerMove = (event): void => {
      scope.onPointerMove(event);
    };
    this._onMSPointerUp = (event): void => {
      scope.onPointerUp(event);
    };
    this._onMSPointerUpGlobal = (event): void => {
      scope.onPointerUpGlobal(event);
    };
    this._onMSPointerOut = (event): void => {
      scope.onPointerOut(event);
    };
    this._onMSPointerOver = (event): void => {
      scope.onPointerOver(event);
    };
    const { canvas } = this.game;
    canvas.addEventListener('MSPointerDown', this._onMSPointerDown, false);
    canvas.addEventListener('MSPointerMove', this._onMSPointerMove, false);
    canvas.addEventListener('MSPointerUp', this._onMSPointerUp, false);
    //  IE11+ uses non-prefix events
    canvas.addEventListener('pointerdown', this._onMSPointerDown, false);
    canvas.addEventListener('pointermove', this._onMSPointerMove, false);
    canvas.addEventListener('pointerup', this._onMSPointerUp, false);
    canvas.style.setProperty('-ms-content-zooming', 'none');
    canvas.style.setProperty('-ms-touch-action', 'none');
    globalThis.addEventListener('MSPointerUp', this._onMSPointerUpGlobal, true);
    canvas.addEventListener('MSPointerOver', this._onMSPointerOver, true);
    canvas.addEventListener('MSPointerOut', this._onMSPointerOut, true);
    //  IE11+ uses non-prefix events
    globalThis.addEventListener('pointerup', this._onMSPointerUpGlobal, true);
    canvas.addEventListener('pointerover', this._onMSPointerOver, true);
    canvas.addEventListener('pointerout', this._onMSPointerOut, true);
  }

  /**
   * TBD.
   */
  public stop(): void {
    if (!this.game.device.mspointer) {
      return;
    }
    const { canvas } = this.game;
    if (this._onMSPointerDown) {
      canvas.removeEventListener('MSPointerDown', this._onMSPointerDown, false);
    }
    if (this._onMSPointerMove) {
      canvas.removeEventListener('MSPointerMove', this._onMSPointerMove, false);
    }
    if (this._onMSPointerUp) {
      canvas.removeEventListener('MSPointerUp', this._onMSPointerUp, false);
    }
    //  IE11+ uses non-prefix events
    if (this._onMSPointerDown) {
      canvas.removeEventListener('pointerdown', this._onMSPointerDown, false);
    }
    if (this._onMSPointerMove) {
      canvas.removeEventListener('pointermove', this._onMSPointerMove, false);
    }
    if (this._onMSPointerUp) {
      canvas.removeEventListener('pointerup', this._onMSPointerUp, false);
    }
    if (this._onMSPointerUpGlobal) {
      globalThis.removeEventListener('MSPointerUp', this._onMSPointerUpGlobal, true);
    }
    if (this._onMSPointerOver) {
      canvas.removeEventListener('MSPointerOver', this._onMSPointerOver, true);
    }
    if (this._onMSPointerOut) {
      canvas.removeEventListener('MSPointerOut', this._onMSPointerOut, true);
    }
    //  IE11+ uses non-prefix events
    if (this._onMSPointerUpGlobal) {
      globalThis.removeEventListener('pointerup', this._onMSPointerUpGlobal, true);
    }
    if (this._onMSPointerOver) {
      canvas.removeEventListener('pointerover', this._onMSPointerOver, true);
    }
    if (this._onMSPointerOut) {
      canvas.removeEventListener('pointerout', this._onMSPointerOut, true);
    }
  }

  /**
   * TBD.
   * @param {PointerEvent} event - TBD.
   */
  public onPointerDown(event: InputEvent): void {
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

  /**
   * TBD.
   * @param {PointerEvent} event - TBD.
   */
  public onPointerMove(event: InputEvent): void {
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

  /**
   * TBD.
   * @param {PointerEvent} event - TBD.
   */
  public onPointerUp(event: InputEvent): void {
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

  /**
   * TBD.
   * @param {PointerEvent} event - TBD.
   */
  public onPointerUpGlobal(event: InputEvent): void {
    if ((event.pointerType === 'mouse' || event.pointerType === 0x00000004) && !this.input.mousePointer.withinGame) {
      this.onPointerUp(event);
    } else {
      const pointer = this.input.getPointerFromIdentifier(event.identifier);
      if (pointer && pointer.withinGame) {
        this.onPointerUp(event);
      }
    }
  }

  /**
   * TBD.
   * @param {PointerEvent} event - TBD.
   */
  public onPointerOut(event: InputEvent): void {
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

  /**
   * TBD.
   * @param {PointerEvent} event - TBD.
   */
  public onPointerOver(event: InputEvent): void {
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

  /**
   * TBD.
   * @param {Event} event - TBD.
   */
  public eventPreventDefault(event: Event): void {
    if (this.capture) {
      if (typeof event.cancelable !== 'boolean' || event.cancelable) {
        event.preventDefault();
      }
    }
  }
}
