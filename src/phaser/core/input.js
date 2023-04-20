import { ArraySet } from './array_set';
import { Graphics } from  '../display/graphics';
import { Image } from '../display/image';
import { Signal } from  './signal';
import { Point } from '../geom/point';
import { Circle } from  '../geom/circle';
import { Mouse } from './input_mouse';
import { MSPointer } from './input_mspointer';
import { Pointer } from './input_pointer';
import { Touch } from './input_touch';
import { POINTER_CURSOR, POINTER_CONTACT, MOUSE_TOUCH_COMBINE } from './const';
import { create, remove } from '../display/canvas/pool';

const MAX_POINTERS = 10;

export class Input {
  /**
   *
   * @param game
   */
  constructor(game) {
    this.game = game;
    this.hitCanvas = null;
    this.hitContext = null;
    this.moveCallbacks = [];
    this.lockCallbacks = [];
    this.customCandidateHandler = null;
    this.customCandidateHandlerContext = null;
    this.pollRate = 0;
    this.enabled = true;
    this.multiInputOverride = MOUSE_TOUCH_COMBINE;
    this.position = null;
    this.speed = null;
    this.circle = null;
    this.scale = null;
    this.maxPointers = 1;
    this.tapRate = 200;
    this.doubleTapRate = 300;
    this.holdRate = 2000;
    this.justPressedRate = 200;
    this.justReleasedRate = 200;
    this.recordPointerHistory = false;
    this.recordRate = 100;
    this.recordLimit = 100;
    this.pointer1 = null;
    this.pointer2 = null;
    this.pointer3 = null;
    this.pointer4 = null;
    this.pointer5 = null;
    this.pointer6 = null;
    this.pointer7 = null;
    this.pointer8 = null;
    this.pointer9 = null;
    this.pointer10 = null;
    this.pointers = [];
    this.activePointer = null;
    this.mousePointer = null;
    this.mouse = null;
    this.touch = null;
    this.mspointer = null;
    this.resetLocked = false;
    this.onDown = null;
    this.onUp = null;
    this.onTap = null;
    this.onHold = null;
    this.minPriorityID = 0;
    this.interactiveItems = new ArraySet();
    this._localPoint = new Point();
    this._pollCounter = 0;
    this._oldPosition = null;
    this._x = 0;
    this._y = 0;
  }

  /**
   *
   */
  boot() {
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
    this.hitContext = this.hitCanvas.getContext('2d');
    this.mouse.start();
    if (this.game.device.mspointer) {
      this.mspointer.start();
    } else if (this.game.device.touch) {
      this.touch.start();
    }
    this.mousePointer.active = true;
    const scope = this;
    this._onClickTrampoline = (event) => scope.onClickTrampoline(event);
    this.game.canvas.addEventListener('click', this._onClickTrampoline, false);
  }

  /**
   *
   */
  destroy() {
    this.mouse.stop();
    if (this.game.device.mspointer) {
      this.mspointer.stop();
    } else if (this.game.device.touch) {
      this.touch.stop();
    }
    this.moveCallbacks = [];
    remove(this);
    this.game.canvas.removeEventListener('click', this._onClickTrampoline);
  }

  /**
   *
   * @param callback
   * @param context
   */
  setInteractiveCandidateHandler(callback, context) {
    this.customCandidateHandler = callback;
    this.customCandidateHandlerContext = context;
  }

  /**
   *
   * @param callback
   * @param context
   */
  addMoveCallback(callback, context) {
    this.moveCallbacks.push({ callback, context });
  }

  /**
   *
   * @param callback
   * @param context
   */
  deleteMoveCallback(callback, context) {
    let i = this.moveCallbacks.length;
    while (i) {
      i -= 1;
      if (
        this.moveCallbacks[i].callback === callback &&
        this.moveCallbacks[i].context === context
      ) {
        this.moveCallbacks.splice(i, 1);
        return;
      }
    }
  }

  /**
   *
   */
  addPointer() {
    if (this.pointers.length >= MAX_POINTERS) {
      console.warn('Input.addPointer: Maximum limit of ' + MAX_POINTERS + ' pointers reached.');
      return null;
    }
    const id = this.pointers.length + 1;
    const pointer = new Pointer(this.game, id, POINTER_CONTACT);
    this.pointers.push(pointer);
    this['pointer' + id] = pointer;
    return pointer;
  }

  /**
   *
   */
  update() {
    if (this.pollRate > 0 && this._pollCounter < this.pollRate) {
      this._pollCounter += 1;
      return;
    }
    this.speed.x = this.position.x - this._oldPosition.x;
    this.speed.y = this.position.y - this._oldPosition.y;
    this._oldPosition.copyFrom(this.position);
    this.mousePointer.update();
    for (let i = 0; i < this.pointers.length; i += 1) {
      this.pointers[i].update();
    }
    this._pollCounter = 0;
  }

  /**
   *
   * @param hard
   */
  reset(hard = false) {
    if (!this.game.isBooted || this.resetLocked) {
      return;
    }
    this.mousePointer.reset();
    for (let i = 0; i < this.pointers.length; i += 1) {
      this.pointers[i].reset();
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
   *
   * @param x
   * @param y
   */
  resetSpeed(x, y) {
    this._oldPosition.setTo(x, y);
    this.speed.setTo(0, 0);
  }

  /**
   *
   * @param event
   */
  startPointer(event) {
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
      const pointer = this.pointers[i];
      if (!pointer.active) {
        return pointer.start(event);
      }
    }
    return null;
  }

  /**
   *
   * @param event
   */
  updatePointer(event) {
    if (this.pointer1.active && this.pointer1.identifier === event.identifier) {
      return this.pointer1.move(event);
    }
    if (this.pointer2.active && this.pointer2.identifier === event.identifier) {
      return this.pointer2.move(event);
    }
    for (let i = 2; i < this.pointers.length; i += 1) {
      const pointer = this.pointers[i];
      if (pointer.active && pointer.identifier === event.identifier) {
        return pointer.move(event);
      }
    }
    return null;
  }

  /**
   *
   * @param event
   */
  stopPointer(event) {
    if (this.pointer1.active && this.pointer1.identifier === event.identifier) {
      return this.pointer1.stop(event);
    }
    if (this.pointer2.active && this.pointer2.identifier === event.identifier) {
      return this.pointer2.stop(event);
    }
    for (let i = 2; i < this.pointers.length; i += 1) {
      const pointer = this.pointers[i];
      if (pointer.active && pointer.identifier === event.identifier) {
        return pointer.stop(event);
      }
    }
    return null;
  }

  /**
   *
   * @param limit
   */
  countActivePointers(limit = this.pointers.length) {
    let count = limit;
    for (let i = 0; i < this.pointers.length && count > 0; i += 1) {
      const pointer = this.pointers[i];
      if (pointer.active) {
        count -= 1;
      }
    }
    return limit - count;
  }

  /**
   *
   * @param isActive
   */
  getPointer(isActive = false) {
    for (let i = 0; i < this.pointers.length; i += 1) {
      const pointer = this.pointers[i];
      if (pointer.active === isActive) {
        return pointer;
      }
    }
    return null;
  }

  /**
   *
   * @param identifier
   */
  getPointerFromIdentifier(identifier) {
    for (let i = 0; i < this.pointers.length; i += 1) {
      const pointer = this.pointers[i];
      if (pointer.identifier === identifier) {
        return pointer;
      }
    }

    return null;
  }

  /**
   *
   * @param pointerId
   */
  getPointerFromId(pointerId) {
    for (let i = 0; i < this.pointers.length; i += 1) {
      const pointer = this.pointers[i];
      if (pointer.pointerId === pointerId) {
        return pointer;
      }
    }

    return null;
  }

  /**
   *
   * @param displayObject
   * @param pointer
   * @param output
   */
  getLocalPosition(displayObject, pointer, output = null) {
    const result = output || new Point();
    const wt = displayObject.worldTransform;
    const id = 1 / (wt.a * wt.d + wt.c * -wt.b);
    return result.setTo(
      wt.d * id * pointer.x + -wt.c * id * pointer.y + (wt.ty * wt.c - wt.tx * wt.d) * id,
      wt.a * id * pointer.y + -wt.b * id * pointer.x + (-wt.ty * wt.a + wt.tx * wt.b) * id
    );
  }

  /**
   *
   * @param displayObject
   * @param pointer
   * @param localPoint
   */
  hitTest(displayObject, pointer, localPoint) {
    if (!displayObject.worldVisible) {
      return false;
    }
    this.getLocalPosition(displayObject, pointer, this._localPoint);
    localPoint.copyFrom(this._localPoint);
    if (displayObject.hitArea && displayObject.hitArea.contains) {
      return displayObject.hitArea.contains(this._localPoint.x, this._localPoint.y);
    } else if (displayObject instanceof Image) {
      const width = displayObject.texture.frame.width;
      const height = displayObject.texture.frame.height;
      const x1 = -width * displayObject.anchor.x;
      if (this._localPoint.x >= x1 && this._localPoint.x < x1 + width) {
        const y1 = -height * displayObject.anchor.y;
        if (this._localPoint.y >= y1 && this._localPoint.y < y1 + height) {
          return true;
        }
      }
    } else if (displayObject instanceof Graphics) {
      for (let i = 0; i < displayObject.graphicsData.length; i += 1) {
        const data = displayObject.graphicsData[i];
        if (
          data.fill &&
          data.shape &&
          data.shape.contains(this._localPoint.x, this._localPoint.y)
        ) {
          // Only deal with fills..
          return true;
        }
      }
    }
    // Didn't hit the parent, does it have any children?
    for (let i = 0; i < displayObject.children.length; i += 1) {
      if (this.hitTest(displayObject.children[i], pointer, localPoint)) {
        return true;
      }
    }
    return false;
  }

  /**
   *
   */
  onClickTrampoline() {
    this.activePointer.processClickTrampolines();
  }

  /**
   *
   */
  get x() {
    return this._x;
  }

  /**
   *
   */
  set x(value) {
    this._x = Math.floor(value);
  }

  /**
   *
   */
  get y() {
    return this._y;
  }

  /**
   *
   */
  set y(value) {
    this._y = Math.floor(value);
  }

  /**
   *
   */
  get pollLocked() {
    return this.pollRate > 0 && this._pollCounter < this.pollRate;
  }

  /**
   *
   */
  get totalInactivePointers() {
    return this.pointers.length - this.countActivePointers();
  }

  /**
   *
   */
  get totalActivePointers() {
    return this.countActivePointers();
  }

  /**
   *
   */
  get worldX() {
    return this.x;
  }

  /**
   *
   */
  get worldY() {
    return this.y;
  }
}
