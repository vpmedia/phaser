import { create, remove } from '../display/canvas/pool.js';
import { Graphics } from '../display/graphics.js';
import { Image } from '../display/image.js';
import { Circle } from '../geom/circle.js';
import { Point } from '../geom/point.js';
import { ArraySet } from './array_set.js';
import { MOUSE_TOUCH_COMBINE, POINTER_CONTACT, POINTER_CURSOR } from './const.js';
import { Mouse } from './input_mouse.js';
import { MSPointer } from './input_mspointer.js';
import { Pointer } from './input_pointer.js';
import { Touch } from './input_touch.js';
import { Signal } from './signal.js';
import type { Game } from './game.js';
import type { DisplayObject } from '../display/display_object.js';
import type { InputEvent } from './input_event.js';
import type { CandidateHandler, PointerMoveCallback } from './callback.js';
import type { InputHandler } from './input_handler.js';

const MAX_POINTERS = 10;

export class Input {
  public game!: Game;
  public hitCanvas!: HTMLCanvasElement;
  public hitContext!: CanvasRenderingContext2D | null;
  public moveCallbacks!: { callback: PointerMoveCallback; context: unknown }[];
  public lockCallbacks!: unknown[];
  public customCandidateHandler!: CandidateHandler | null;
  public customCandidateHandlerContext!: unknown;
  public pollRate!: number;
  public enabled!: boolean;
  public multiInputOverride!: number;
  public position!: Point;
  public speed!: Point;
  public circle!: Circle;
  public scale!: Point;
  public maxPointers!: number;
  public tapRate!: number;
  public doubleTapRate!: number;
  public holdRate!: number;
  public justPressedRate!: number;
  public justReleasedRate!: number;
  public recordPointerHistory!: boolean;
  public recordRate!: number;
  public recordLimit!: number;
  public pointer1!: Pointer;
  public pointer2!: Pointer;
  public pointer3!: Pointer | null;
  public pointer4!: Pointer | null;
  public pointer5!: Pointer | null;
  public pointer6!: Pointer | null;
  public pointer7!: Pointer | null;
  public pointer8!: Pointer | null;
  public pointer9!: Pointer | null;
  public pointer10!: Pointer | null;
  public pointers!: Pointer[];
  public activePointer!: Pointer;
  public mousePointer!: Pointer;
  public mouse!: Mouse;
  public touch!: Touch;
  public mspointer!: MSPointer;
  public resetLocked!: boolean;
  public onDown!: Signal;
  public onUp!: Signal;
  public onTap!: Signal;
  public onHold!: Signal;
  public minPriorityID!: number;
  public interactiveItems!: ArraySet<InputHandler>;
  public _localPoint!: Point;
  public _pollCounter!: number;
  public _oldPosition!: Point;
  public _onClickTrampoline!: EventListener | null;
  public _x!: number;
  public _y!: number;
  /**
   * TBD.
   * @param {Game} game - TBD.
   */
  public constructor(game: Game) {
    this.game = game;
    this.hitCanvas = null!;
    this.hitContext = null;
    this.moveCallbacks = [];
    this.lockCallbacks = [];
    this.customCandidateHandler = null;
    this.customCandidateHandlerContext = null;
    this.pollRate = 0;
    this.enabled = true;
    this.multiInputOverride = MOUSE_TOUCH_COMBINE;
    this.position = null!;
    this.speed = null!;
    this.circle = null!;
    this.scale = null!;
    this.maxPointers = 1;
    this.tapRate = 200;
    this.doubleTapRate = 300;
    this.holdRate = 2000;
    this.justPressedRate = 200;
    this.justReleasedRate = 200;
    this.recordPointerHistory = false;
    this.recordRate = 100;
    this.recordLimit = 100;
    this.pointer3 = null;
    this.pointer4 = null;
    this.pointer5 = null;
    this.pointer6 = null;
    this.pointer7 = null;
    this.pointer8 = null;
    this.pointer9 = null;
    this.pointer10 = null;
    this.pointers = [];
    this.activePointer = null!;
    this.mousePointer = null!;
    this.mouse = null!;
    this.touch = null!;
    this.mspointer = null!;
    this.resetLocked = false;
    this.onDown = null!;
    this.onUp = null!;
    this.onTap = null!;
    this.onHold = null!;
    this.minPriorityID = 0;
    this.interactiveItems = new ArraySet<InputHandler>();
    this._localPoint = new Point();
    this._pollCounter = 0;
    this._oldPosition = null!;
    this._x = 0;
    this._y = 0;
  }

  /**
   * TBD.
   */
  public boot(): void {
    this.mousePointer = new Pointer(this.game, 0, POINTER_CURSOR);
    this.addPointer();
    this.addPointer();
    this.mouse = new Mouse(this.game);
    this.touch = new Touch(this.game);
    this.mspointer = new MSPointer(this.game);
    this.onDown = new Signal();
    this.onUp = new Signal();
    this.onTap = new Signal();
    this.onHold = new Signal();
    this.scale = new Point(1, 1);
    this.speed = new Point();
    this.position = new Point();
    this._oldPosition = new Point();
    this.circle = new Circle(0, 0, 44);
    this.activePointer = this.mousePointer;
    this.hitCanvas = create(this, 1, 1);
    this.hitContext = this.hitCanvas.getContext('2d', { willReadFrequently: false });
    this.mouse.start();
    if (this.game.device.mspointer) {
      this.mspointer.start();
    } else if (this.game.device.touch) {
      this.touch.start();
    }
    this.mousePointer.active = true;
    this._onClickTrampoline = (): void => {
      this.onClickTrampoline();
    };
    this.game.canvas.addEventListener('click', this._onClickTrampoline, false);
  }

  /**
   * TBD.
   */
  public destroy(): void {
    this.mouse.stop();
    if (this.game.device.mspointer) {
      this.mspointer.stop();
    } else if (this.game.device.touch) {
      this.touch.stop();
    }
    this.moveCallbacks = [];
    remove(this);
    if (this._onClickTrampoline) {
      this.game.canvas.removeEventListener('click', this._onClickTrampoline);
    }
  }

  /**
   * TBD.
   * @param {Function} callback - TBD.
   * @param {object} context - TBD.
   */
  public setInteractiveCandidateHandler(callback: CandidateHandler, context: unknown): void {
    this.customCandidateHandler = callback;
    this.customCandidateHandlerContext = context;
  }

  /**
   * TBD.
   * @param {Function} callback - TBD.
   * @param {object} context - TBD.
   */
  public addMoveCallback(callback: PointerMoveCallback, context: unknown): void {
    this.moveCallbacks.push({ callback, context });
  }

  /**
   * TBD.
   * @param {Function} callback - TBD.
   * @param {object} context - TBD.
   */
  public deleteMoveCallback(callback: PointerMoveCallback, context: unknown): void {
    let i = this.moveCallbacks.length;
    while (i) {
      i -= 1;
      if (this.moveCallbacks[i]!.callback === callback && this.moveCallbacks[i]!.context === context) {
        this.moveCallbacks.splice(i, 1);
        return;
      }
    }
  }

  /**
   * TBD.
   * @returns {Pointer} TBD.
   */
  public addPointer(): Pointer | null {
    if (this.pointers.length >= MAX_POINTERS) {
      this.game.logger.warn(`Input.addPointer: Maximum limit of ${MAX_POINTERS} pointers reached.`);
      return null;
    }
    const id = this.pointers.length + 1;
    const pointer = new Pointer(this.game, id, POINTER_CONTACT);
    this.pointers.push(pointer);
    (this as unknown as Record<string, Pointer>)[`pointer${id}`] = pointer;
    return pointer;
  }

  /**
   * TBD.
   */
  public update(): void {
    if (this.pollRate > 0 && this._pollCounter < this.pollRate) {
      this._pollCounter += 1;
      return;
    }
    this.speed.x = this.position.x - this._oldPosition.x;
    this.speed.y = this.position.y - this._oldPosition.y;
    this._oldPosition.copyFrom(this.position);
    this.mousePointer.update();
    for (const pointer of this.pointers) {
      pointer.update();
    }
    this._pollCounter = 0;
  }

  /**
   * TBD.
   * @param {boolean} hard - TBD.
   */
  public reset(hard = false): void {
    if (!this.game.isBooted || this.resetLocked) {
      return;
    }
    this.mousePointer.reset();
    for (const pointer of this.pointers) {
      pointer.reset();
    }
    if (this.game.canvas.style.cursor !== 'none') {
      this.game.canvas.style.cursor = 'inherit';
    }
    if (hard) {
      this.onDown.dispose();
      this.onUp.dispose();
      this.onTap.dispose();
      this.onHold.dispose();
      this.onDown = new Signal();
      this.onUp = new Signal();
      this.onTap = new Signal();
      this.onHold = new Signal();
      this.moveCallbacks = [];
    }
    this._pollCounter = 0;
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   */
  public resetSpeed(x: number, y: number): void {
    this._oldPosition.setTo(x, y);
    this.speed.setTo(0, 0);
  }

  /**
   * TBD.
   * @param {MouseEvent|TouchEvent|PointerEvent} event - TBD.
   * @returns {Pointer} TBD.
   */
  public startPointer(event: InputEvent): Pointer | null {
    if (this.maxPointers >= 0 && this.countActivePointers(this.maxPointers) >= this.maxPointers) {
      return null;
    }
    if (!this.pointer1.active) {
      return this.pointer1.start(event);
    }
    if (!this.pointer2.active) {
      return this.pointer2.start(event);
    }
    for (let i = 2; i < this.pointers.length; i += 1) {
      const pointer = this.pointers[i]!;
      if (!pointer.active) {
        return pointer.start(event);
      }
    }
    return null;
  }

  /**
   * TBD.
   * @param {MouseEvent|TouchEvent|PointerEvent} event - TBD.
   * @returns {Pointer} TBD.
   */
  public updatePointer(event: InputEvent): Pointer | null {
    if (this.pointer1.active && this.pointer1.identifier === event.identifier) {
      return this.pointer1.move(event);
    }
    if (this.pointer2.active && this.pointer2.identifier === event.identifier) {
      return this.pointer2.move(event);
    }
    for (let i = 2; i < this.pointers.length; i += 1) {
      const pointer = this.pointers[i]!;
      if (pointer.active && pointer.identifier === event.identifier) {
        return pointer.move(event);
      }
    }
    return null;
  }

  /**
   * TBD.
   * @param {MouseEvent|TouchEvent|PointerEvent} event - TBD.
   * @returns {Pointer} TBD.
   */
  public stopPointer(event: InputEvent): Pointer | null {
    if (this.pointer1.active && this.pointer1.identifier === event.identifier) {
      return this.pointer1.stop(event);
    }
    if (this.pointer2.active && this.pointer2.identifier === event.identifier) {
      return this.pointer2.stop(event);
    }
    for (let i = 2; i < this.pointers.length; i += 1) {
      const pointer = this.pointers[i]!;
      if (pointer.active && pointer.identifier === event.identifier) {
        return pointer.stop(event);
      }
    }
    return null;
  }

  /**
   * TBD.
   * @param {number} limit - TBD.
   * @returns {number} TBD.
   */
  public countActivePointers(limit: number = this.pointers.length): number {
    let count = limit;
    for (let i = 0; i < this.pointers.length && count > 0; i += 1) {
      const pointer = this.pointers[i]!;
      if (pointer.active) {
        count -= 1;
      }
    }
    return limit - count;
  }

  /**
   * TBD.
   * @param {boolean} isActive - TBD.
   * @returns {Pointer} TBD.
   */
  public getPointer(isActive = false): Pointer | null {
    for (const pointer of this.pointers) {
      if (pointer.active === isActive) {
        return pointer;
      }
    }
    return null;
  }

  /**
   * TBD.
   * @param {number} identifier - TBD.
   * @returns {Pointer} TBD.
   */
  public getPointerFromIdentifier(identifier: number | undefined): Pointer | null {
    for (const pointer of this.pointers) {
      if (pointer.identifier === identifier) {
        return pointer;
      }
    }

    return null;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {Pointer} TBD.
   */
  public getPointerFromId(pointerId: number): Pointer | null {
    for (const pointer of this.pointers) {
      if (pointer.pointerId === pointerId) {
        return pointer;
      }
    }

    return null;
  }

  /**
   * TBD.
   * @param {DisplayObject} displayObject - TBD.
   * @param {Pointer} pointer - TBD.
   * @param {Point} output - TBD.
   * @returns {Point} TBD.
   */
  public getLocalPosition(displayObject: DisplayObject, pointer: Pointer, output: Point | null = null): Point {
    const result = output ?? new Point();
    const wt = displayObject.worldTransform;
    const id = 1 / (wt.a * wt.d + wt.c * -wt.b);
    return result.setTo(
      wt.d * id * pointer.x + -wt.c * id * pointer.y + (wt.ty * wt.c - wt.tx * wt.d) * id,
      wt.a * id * pointer.y + -wt.b * id * pointer.x + (-wt.ty * wt.a + wt.tx * wt.b) * id
    );
  }

  /**
   * TBD.
   * @param {DisplayObject} displayObject - TBD.
   * @param {Pointer} pointer - TBD.
   * @param {Point} localPoint - TBD.
   * @returns {boolean} TBD.
   */
  public hitTest(displayObject: DisplayObject, pointer: Pointer, localPoint: Point): boolean {
    if (!displayObject.worldVisible) {
      return false;
    }
    this.getLocalPosition(displayObject, pointer, this._localPoint);
    localPoint.copyFrom(this._localPoint);
    if (displayObject.hitArea && displayObject.hitArea.contains) {
      return displayObject.hitArea.contains(this._localPoint.x, this._localPoint.y);
    } else if (displayObject instanceof Image) {
      const { width } = displayObject.texture.frame;
      const { height } = displayObject.texture.frame;
      const x1 = -width * displayObject.anchor.x;
      if (this._localPoint.x >= x1 && this._localPoint.x < x1 + width) {
        const y1 = -height * displayObject.anchor.y;
        if (this._localPoint.y >= y1 && this._localPoint.y < y1 + height) {
          return true;
        }
      }
    } else if (displayObject instanceof Graphics) {
      for (const data of displayObject.graphicsData) {
        if (data.fill && data.shape && data.shape.contains(this._localPoint.x, this._localPoint.y)) {
          // Only deal with fills..
          return true;
        }
      }
    }
    // Didn't hit the parent, does it have any children?
    for (const child of displayObject.children) {
      if (this.hitTest(child, pointer, localPoint)) {
        return true;
      }
    }
    return false;
  }

  /**
   * TBD.
   */
  public onClickTrampoline(): void {
    this.activePointer.processClickTrampolines();
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  public get x(): number {
    return this._x;
  }

  /**
   * TBD.
   */
  public set x(value: number) {
    this._x = Math.floor(value);
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  public get y(): number {
    return this._y;
  }

  /**
   * TBD.
   */
  public set y(value: number) {
    this._y = Math.floor(value);
  }

  /**
   * TBD.
   * @returns {boolean} TBD.
   */
  public get pollLocked(): boolean {
    return this.pollRate > 0 && this._pollCounter < this.pollRate;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  public get totalInactivePointers(): number {
    return this.pointers.length - this.countActivePointers();
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  public get totalActivePointers(): number {
    return this.countActivePointers();
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  public get worldX(): number {
    return this.x;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  public get worldY(): number {
    return this.y;
  }
}
