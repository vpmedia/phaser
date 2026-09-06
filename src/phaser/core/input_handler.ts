import type { Group } from '../display/group.js';
import { Point } from '../geom/point.js';
import { distance } from '../util/math.js';
import { GROUP } from './const.js';
import type { Image } from '../display/image.js';
import type { Pointer } from './input_pointer.js';
import type { Rectangle } from '../geom/rectangle.js';
import type { Game } from './game.js';

interface PointerData {
  id: number;
  x: number;
  y: number;
  camX: number;
  camY: number;
  isDown: boolean;
  isUp: boolean;
  isOver: boolean;
  isOut: boolean;
  timeOver: number;
  timeOut: number;
  timeDown: number;
  timeUp: number;
  downDuration: number;
  isDragged: boolean;
}

const createPointerData = (id: number): PointerData => ({
  id,
  x: 0,
  y: 0,
  camX: 0,
  camY: 0,
  isDown: false,
  isUp: false,
  isOver: false,
  isOut: false,
  timeOver: 0,
  timeOut: 0,
  timeDown: 0,
  timeUp: 0,
  downDuration: 0,
  isDragged: false,
});

export class InputHandler {
  public sprite!: Image;
  public game!: Game;
  public enabled!: boolean;
  public checked!: boolean;
  public priorityID!: number;
  public useHandCursor!: boolean;
  public _setHandCursor!: boolean;
  public isDragged!: boolean;
  public allowHorizontalDrag!: boolean;
  public allowVerticalDrag!: boolean;
  public snapOffset!: Point | null;
  public snapOnDrag!: boolean;
  public snapOnRelease!: boolean;
  public snapX!: number;
  public snapY!: number;
  public snapOffsetX!: number;
  public snapOffsetY!: number;
  public pixelPerfectOver!: boolean;
  public pixelPerfectClick!: boolean;
  public pixelPerfectAlpha!: number;
  public draggable!: boolean;
  public boundsRect!: Rectangle | null;
  public boundsSprite!: Image | null;
  public dragOffset!: Point;
  public dragFromCenter!: boolean;
  public dragStopBlocksInputUp!: boolean;
  public dragStartPoint!: Point;
  public dragDistanceThreshold!: number;
  public dragTimeThreshold!: number;
  public downPoint!: Point;
  public snapPoint!: Point;
  public _dragPoint!: Point;
  public _dragPhase!: boolean;
  public _pendingDrag!: boolean;
  public _dragTimePass!: boolean;
  public _dragDistancePass!: boolean;
  public _wasEnabled!: boolean;
  public _tempPoint!: Point;
  public _pointerData!: PointerData[];
  public _dx!: number;
  public _dy!: number;
  public _draggedPointerID!: number;
  /**
   * TBD.
   * @param {Image} sprite - TBD.
   */
  public constructor(sprite: Image) {
    this.sprite = sprite;
    this.game = sprite.game;
    this.enabled = false;
    this.checked = false;
    this.priorityID = 0;
    this.useHandCursor = false;
    this._setHandCursor = false;
    this.isDragged = false;
    this.allowHorizontalDrag = true;
    this.allowVerticalDrag = true;
    this.snapOffset = null;
    this.snapOnDrag = false;
    this.snapOnRelease = false;
    this.snapX = 0;
    this.snapY = 0;
    this.snapOffsetX = 0;
    this.snapOffsetY = 0;
    this.pixelPerfectOver = false;
    this.pixelPerfectClick = false;
    this.pixelPerfectAlpha = 255;
    this.draggable = false;
    this.boundsRect = null;
    this.boundsSprite = null;
    this.dragOffset = new Point();
    this.dragFromCenter = false;
    this.dragStopBlocksInputUp = false;
    this.dragStartPoint = new Point();
    this.dragDistanceThreshold = 0;
    this.dragTimeThreshold = 0;
    this.downPoint = new Point();
    this.snapPoint = new Point();
    this._dragPoint = new Point();
    this._dragPhase = false;
    this._pendingDrag = false;
    this._dragTimePass = false;
    this._dragDistancePass = false;
    this._wasEnabled = false;
    this._tempPoint = new Point();
    this._pointerData = [createPointerData(0)];
  }

  /**
   * TBD.
   * @param {number} priority - TBD.
   * @param {boolean} useHandCursor - TBD.
   * @returns {DisplayObject} TBD.
   */
  public start(priority = 0, useHandCursor = false) {
    //  Turning on
    if (!this.enabled) {
      //  Register, etc
      this.game.input.interactiveItems.add(this);
      this.useHandCursor = useHandCursor;
      this.priorityID = priority;
      for (let i = 0; i < 10; i += 1) {
        this._pointerData[i] = createPointerData(i);
      }
      this.snapOffset = new Point();
      this.enabled = true;
      this._wasEnabled = true;
    }
    this.sprite.events.onAddedToGroup.add(this.addedToGroup, this);
    this.sprite.events.onRemovedFromGroup.add(this.removedFromGroup, this);
    return this.sprite;
  }

  /**
   * TBD.
   */
  public addedToGroup(): void {
    if (this._dragPhase) {
      return;
    }
    if (this._wasEnabled && !this.enabled) {
      this.start();
    }
  }

  /**
   * TBD.
   */
  public removedFromGroup(): void {
    if (this._dragPhase) {
      return;
    }
    if (this.enabled) {
      this._wasEnabled = true;
      this.stop();
    } else {
      this._wasEnabled = false;
    }
  }

  /**
   * TBD.
   */
  public reset(): void {
    this.enabled = false;
    for (let i = 0; i < 10; i += 1) {
      this._pointerData[i] = createPointerData(i);
    }
  }

  /**
   * Returns the tracking record for a pointer, creating it on first use.
   * @param {number} pointerId - TBD.
   * @returns {PointerData} TBD.
   */
  public pointerData(pointerId: number): PointerData {
    const existing = this._pointerData[pointerId];
    if (existing) {
      return existing;
    }
    const created = createPointerData(pointerId);
    this._pointerData[pointerId] = created;
    return created;
  }

  /**
   * TBD.
   */
  public stop(): void {
    if (this.enabled) {
      this.enabled = false;
      this.game.input.interactiveItems.remove(this);
    }
  }

  /**
   * TBD.
   */
  public destroy(): void {
    if (this.sprite) {
      if (this._setHandCursor) {
        this.game.canvas.style.cursor = 'default';
        this._setHandCursor = false;
      }
      this.enabled = false;
      this.game.input.interactiveItems.remove(this);
      this._pointerData.length = 0;
      this.boundsRect = null;
      this.boundsSprite = null;
    }
  }

  /**
   * TBD.
   * @param {number} highestID - TBD.
   * @param {number} highestRenderID - TBD.
   * @param {boolean} includePixelPerfect - TBD.
   * @returns {boolean} TBD.
   */
  public validForInput(highestID: number, highestRenderID: number, includePixelPerfect = true): boolean {
    if (
      !this.enabled ||
      this.sprite.scale.x === 0 ||
      this.sprite.scale.y === 0 ||
      this.priorityID < this.game.input.minPriorityID ||
      (this.sprite.parent && this.sprite.parent.ignoreChildInput)
    ) {
      return false;
    }
    // If we're trying to specifically IGNORE pixel perfect objects, then set includePixelPerfect to false and skip it
    if (!includePixelPerfect && (this.pixelPerfectClick || this.pixelPerfectOver)) {
      return false;
    }
    if (this.priorityID > highestID || (this.priorityID === highestID && this.sprite.renderOrderID > highestRenderID)) {
      return true;
    }
    return false;
  }

  /**
   * TBD.
   * @returns {boolean} TBD.
   */
  public isPixelPerfect(): boolean {
    return this.pixelPerfectClick || this.pixelPerfectOver;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {number} TBD.
   */
  public pointerX(pointerId = 0): number {
    return this.pointerData(pointerId).x;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {number} TBD.
   */
  public pointerY(pointerId = 0): number {
    return this.pointerData(pointerId).y;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {boolean} TBD.
   */
  public pointerDown(pointerId = 0): boolean {
    return this.pointerData(pointerId).isDown;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {boolean} TBD.
   */
  public pointerUp(pointerId = 0): boolean {
    return this.pointerData(pointerId).isUp;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {number} TBD.
   */
  public pointerTimeDown(pointerId = 0): number {
    return this.pointerData(pointerId).timeDown;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {number} TBD.
   */
  public pointerTimeUp(pointerId = 0): number {
    return this.pointerData(pointerId).timeUp;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {boolean} TBD.
   */
  public pointerOver(pointerId: number | null = null): boolean {
    if (!this.enabled) {
      return false;
    }
    if (pointerId === undefined || pointerId === null) {
      for (let i = 0; i < 10; i += 1) {
        if (this.pointerData(i).isOver) {
          return true;
        }
      }
      return false;
    }
    return this.pointerData(pointerId).isOver;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {boolean} TBD.
   */
  public pointerOut(pointerId: number | null = null): boolean {
    if (!this.enabled) {
      return false;
    }
    if (pointerId === undefined || pointerId === null) {
      for (let i = 0; i < 10; i += 1) {
        if (this.pointerData(i).isOut) {
          return true;
        }
      }
      return false;
    }
    return this.pointerData(pointerId).isOut;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {number} TBD.
   */
  public pointerTimeOver(pointerId = 0): number {
    return this.pointerData(pointerId).timeOver;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {number} TBD.
   */
  public pointerTimeOut(pointerId = 0): number {
    return this.pointerData(pointerId).timeOut;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {boolean} TBD.
   */
  public pointerDragged(pointerId = 0): boolean {
    return this.pointerData(pointerId).isDragged;
  }

  /**
   * TBD.
   * @param {Pointer} pointer - TBD.
   * @param {boolean} fastTest - TBD.
   * @returns {boolean} TBD.
   */
  public checkPointerDown(pointer: Pointer, fastTest = false): boolean {
    if (
      !pointer.isDown ||
      !this.enabled ||
      !this.sprite ||
      !this.sprite.parent ||
      !this.sprite.visible ||
      !this.sprite.parent.visible ||
      this.sprite.worldScale.x === 0 ||
      this.sprite.worldScale.y === 0
    ) {
      return false;
    }
    //  Need to pass it a temp point, in case we need it again for the pixel check
    if (this.game.input.hitTest(this.sprite, pointer, this._tempPoint)) {
      if (!fastTest && this.pixelPerfectClick) {
        return this.checkPixel(this._tempPoint.x, this._tempPoint.y);
      }
      return true;
    }
    return false;
  }

  /**
   * TBD.
   * @param {Pointer} pointer - TBD.
   * @param {boolean} fastTest - TBD.
   * @returns {boolean} TBD.
   */
  public checkPointerOver(pointer: Pointer, fastTest = false): boolean {
    if (
      !this.enabled ||
      !this.sprite ||
      !this.sprite.parent ||
      !this.sprite.visible ||
      !this.sprite.parent.visible ||
      this.sprite.worldScale.x === 0 ||
      this.sprite.worldScale.y === 0
    ) {
      return false;
    }
    //  Need to pass it a temp point, in case we need it again for the pixel check
    if (this.game.input.hitTest(this.sprite, pointer, this._tempPoint)) {
      if (!fastTest && this.pixelPerfectOver) {
        return this.checkPixel(this._tempPoint.x, this._tempPoint.y);
      }
      return true;
    }
    return false;
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param {Pointer} pointer - TBD.
   * @returns {boolean} TBD.
   */
  public checkPixel(x: number | null, y: number | null, pointer?: Pointer): boolean {
    //  Grab a pixel from our image into the hitCanvas and then test it
    if (this.sprite.texture.baseTexture.source) {
      let localX = x;
      let localY = y;
      if (localX === null || localY === null) {
        //  Use the pointer parameter
        this.game.input.getLocalPosition(this.sprite, pointer!, this._tempPoint);
        ({ x: localX, y: localY } = this._tempPoint);
      }
      if (this.sprite.anchor.x !== 0) {
        localX -= -this.sprite.texture.frame.width * this.sprite.anchor.x;
      }
      if (this.sprite.anchor.y !== 0) {
        localY -= -this.sprite.texture.frame.height * this.sprite.anchor.y;
      }
      localX += this.sprite.texture.frame.x;
      localY += this.sprite.texture.frame.y;
      if (this.sprite.texture.trim) {
        localX -= this.sprite.texture.trim.x;
        localY -= this.sprite.texture.trim.y;
        //  If the coordinates are outside the trim area we return false immediately, to save doing a draw call
        if (
          localX < this.sprite.texture.crop.x ||
          localX > this.sprite.texture.crop.right ||
          localY < this.sprite.texture.crop.y ||
          localY > this.sprite.texture.crop.bottom
        ) {
          this._dx = localX;
          this._dy = localY;
          return false;
        }
      }
      this._dx = localX;
      this._dy = localY;
      this.game.input.hitContext!.clearRect(0, 0, 1, 1);
      this.game.input.hitContext!.drawImage(this.sprite.texture.baseTexture.source, localX, localY, 1, 1, 0, 0, 1, 1);
      const rgb = this.game.input.hitContext!.getImageData(0, 0, 1, 1);
      if (rgb.data[3]! >= this.pixelPerfectAlpha) {
        return true;
      }
    }
    return false;
  }

  /**
   * TBD.
   * @param {Pointer} pointer - TBD.
   * @returns {boolean} TBD.
   */
  public update(pointer: Pointer): boolean {
    if (this.sprite === null || this.sprite.parent === undefined) {
      // Abort. We've been destroyed.
      return false;
    }
    if (!this.enabled || !this.sprite.visible || !this.sprite.parent?.visible) {
      this._pointerOutHandler(pointer);
      return false;
    }
    if (this._pendingDrag) {
      if (!this._dragDistancePass) {
        this._dragDistancePass =
          distance(pointer.x, pointer.y, this.downPoint.x, this.downPoint.y) >= this.dragDistanceThreshold;
      }
      if (this._dragDistancePass && this._dragTimePass) {
        this.startDrag(pointer);
      }
      return true;
    } else if (this.draggable && this._draggedPointerID === pointer.id) {
      return this.updateDrag(pointer, false);
    } else if (this.pointerData(pointer.id).isOver) {
      if (this.checkPointerOver(pointer)) {
        this.pointerData(pointer.id).x = pointer.x - this.sprite.x;
        this.pointerData(pointer.id).y = pointer.y - this.sprite.y;
        return true;
      }
      this._pointerOutHandler(pointer);
      return false;
    }
    return false;
  }

  /**
   * TBD.
   * @param {Pointer} pointer - TBD.
   * @param {boolean} silent - TBD.
   */
  public _pointerOverHandler(pointer: Pointer, silent: boolean): void {
    if (this.sprite === null) {
      // Abort. We've been destroyed.
      return;
    }
    const data = this.pointerData(pointer.id);
    if (!data.isOver || pointer.dirty) {
      const sendEvent = !data.isOver;
      data.isOver = true;
      data.isOut = false;
      data.timeOver = this.game.time.time;
      data.x = pointer.x - this.sprite.x;
      data.y = pointer.y - this.sprite.y;
      if (this.useHandCursor && !data.isDragged) {
        this.game.canvas.style.cursor = 'pointer';
        this._setHandCursor = true;
      }
      if (!silent && sendEvent && this.sprite && this.sprite.events) {
        this.sprite.events.onInputOver$dispatch(this.sprite, pointer);
      }
      if (this.sprite.parent && this.sprite.parent.type === GROUP) {
        (this.sprite.parent as Group).onChildInputOver.dispatch(this.sprite, pointer);
      }
    }
  }

  /**
   * TBD.
   * @param {Pointer} pointer - TBD.
   * @param {boolean} silent - TBD.
   */
  public _pointerOutHandler(pointer: Pointer, silent = false): void {
    if (this.sprite === null) {
      // Abort. We've been destroyed.
      return;
    }
    const data = this.pointerData(pointer.id);
    data.isOver = false;
    data.isOut = true;
    data.timeOut = this.game.time.time;
    if (this.useHandCursor && !data.isDragged) {
      this.game.canvas.style.cursor = 'default';
      this._setHandCursor = false;
    }
    if (!silent && this.sprite && this.sprite.events) {
      this.sprite.events.onInputOut$dispatch(this.sprite, pointer);
      if (this.sprite && this.sprite.parent && this.sprite.parent.type === GROUP) {
        (this.sprite.parent as Group).onChildInputOut.dispatch(this.sprite, pointer);
      }
    }
  }

  /**
   * TBD.
   * @param {Pointer} pointer - TBD.
   */
  public _touchedHandler(pointer: Pointer): void {
    if (this.sprite === null) {
      // Abort. We've been destroyed.
      return;
    }
    const data = this.pointerData(pointer.id);
    if (!data.isDown && data.isOver) {
      if (this.pixelPerfectClick && !this.checkPixel(null, null, pointer)) {
        return;
      }
      data.isDown = true;
      data.isUp = false;
      data.timeDown = this.game.time.time;
      this.downPoint.setTo(pointer.x, pointer.y);
      // It's possible the onInputDown event creates a new Sprite that is on-top of this one, so we ought to force a Pointer update
      pointer.dirty = true;
      if (this.sprite && this.sprite.events) {
        this.sprite.events.onInputDown$dispatch(this.sprite, pointer);
        // The event above might have destroyed this sprite.
        if (this.sprite && this.sprite.parent && this.sprite.parent.type === GROUP) {
          (this.sprite.parent as Group).onChildInputDown.dispatch(this.sprite, pointer);
        }
        //  The events might have destroyed this sprite.
        if (this.sprite === null) {
          return;
        }
      }
      //  Start drag
      if (this.draggable && !this.isDragged) {
        if (this.dragTimeThreshold === 0 && this.dragDistanceThreshold === 0) {
          this.startDrag(pointer);
        } else {
          this._pendingDrag = true;
          this._dragDistancePass = this.dragDistanceThreshold === 0;
          if (this.dragTimeThreshold > 0) {
            this._dragTimePass = false;
            this.game.time.events.add(this.dragTimeThreshold, this.dragTimeElapsed, this, pointer);
          } else {
            this._dragTimePass = true;
          }
        }
      }
    }
  }

  /**
   * TBD.
   * @param {Pointer} pointer - TBD.
   */
  public dragTimeElapsed(pointer: Pointer): void {
    this._dragTimePass = true;
    if (this._pendingDrag && this.sprite && this._dragDistancePass) {
      this.startDrag(pointer);
    }
  }

  /**
   * TBD.
   * @param {Pointer} pointer - TBD.
   */
  public _releasedHandler(pointer: Pointer): void {
    if (this.sprite === null) {
      // Abort. We've been destroyed.
      return;
    }
    const data = this.pointerData(pointer.id);
    // If was previously touched by this Pointer, check if still is AND still over this item
    if (data.isDown && pointer.isUp) {
      data.isDown = false;
      data.isUp = true;
      data.timeUp = this.game.time.time;
      data.downDuration = data.timeUp - data.timeDown;
      // Only release the InputUp signal if the pointer is still over this sprite
      let isOver = this.checkPointerOver(pointer);
      if (this.sprite && this.sprite.events) {
        if (
          !this.dragStopBlocksInputUp ||
          (this.dragStopBlocksInputUp && !(this.draggable && this.isDragged && this._draggedPointerID === pointer.id))
        ) {
          this.sprite.events.onInputUp$dispatch(this.sprite, pointer, isOver);
        }
        if (this.sprite && this.sprite.parent && this.sprite.parent.type === GROUP) {
          (this.sprite.parent as Group).onChildInputUp.dispatch(this.sprite, pointer, isOver);
        }
        // The onInputUp event may have changed the sprite so that checkPointerOver is no longer true, so update it.
        if (isOver) {
          isOver = this.checkPointerOver(pointer);
        }
      }
      data.isOver = isOver;
      if (!isOver && this.useHandCursor) {
        this.game.canvas.style.cursor = 'default';
        this._setHandCursor = false;
      }
      // It's possible the onInputUp event created a new Sprite that is on-top of this one, so force a Pointer update
      pointer.dirty = true;
      this._pendingDrag = false;
      // Stop drag
      if (this.draggable && this.isDragged && this._draggedPointerID === pointer.id) {
        this.stopDrag(pointer);
      }
    }
  }

  /**
   * TBD.
   * @param {Pointer} pointer - TBD.
   * @param {boolean} fromStart - TBD.
   * @returns {boolean} TBD.
   */
  public updateDrag(pointer: Pointer, fromStart = false): boolean {
    if (pointer.isUp) {
      this.stopDrag(pointer);
      return false;
    }
    const px = this.globalToLocalX(pointer.x) + this._dragPoint.x + this.dragOffset.x;
    const py = this.globalToLocalY(pointer.y) + this._dragPoint.y + this.dragOffset.y;
    const cx = 0;
    const cy = 0;
    if (this.allowHorizontalDrag) {
      this.sprite.x = px + cx;
    }
    if (this.allowVerticalDrag) {
      this.sprite.y = py + cy;
    }
    if (this.boundsRect) {
      this.checkBoundsRect();
    }
    if (this.boundsSprite) {
      this.checkBoundsSprite();
    }
    if (this.snapOnDrag) {
      this.sprite.x =
        Math.round((this.sprite.x - (this.snapOffsetX % this.snapX)) / this.snapX) * this.snapX +
        (this.snapOffsetX % this.snapX);
      this.sprite.y =
        Math.round((this.sprite.y - (this.snapOffsetY % this.snapY)) / this.snapY) * this.snapY +
        (this.snapOffsetY % this.snapY);
      this.snapPoint.setTo(this.sprite.x, this.sprite.y);
    }
    this.sprite.events.onDragUpdate.dispatch(this.sprite, pointer, px, py, this.snapPoint, fromStart);
    return true;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @param {number} delay - TBD.
   * @returns {boolean} TBD.
   */
  public justOver(pointerId = 0, delay = 500): boolean {
    return this.pointerData(pointerId).isOver && this.overDuration(pointerId) < delay;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @param {number} delay - TBD.
   * @returns {boolean} TBD.
   */
  public justOut(pointerId = 0, delay = 500): boolean {
    return this.pointerData(pointerId).isOut && this.game.time.time - this.pointerData(pointerId).timeOut < delay;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @param {number} delay - TBD.
   * @returns {boolean} TBD.
   */
  public justPressed(pointerId = 0, delay = 500): boolean {
    return this.pointerData(pointerId).isDown && this.downDuration(pointerId) < delay;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @param {number} delay - TBD.
   * @returns {boolean} TBD.
   */
  public justReleased(pointerId = 0, delay = 500): boolean {
    return this.pointerData(pointerId).isUp && this.game.time.time - this.pointerData(pointerId).timeUp < delay;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {number} TBD.
   */
  public overDuration(pointerId = 0): number {
    if (this.pointerData(pointerId).isOver) {
      return this.game.time.time - this.pointerData(pointerId).timeOver;
    }
    return -1;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {number} TBD.
   */
  public downDuration(pointerId = 0): number {
    if (this.pointerData(pointerId).isDown) {
      return this.game.time.time - this.pointerData(pointerId).timeDown;
    }
    return -1;
  }

  /**
   * TBD.
   * @param {boolean} lockCenter - TBD.
   * @param {boolean} bringToTop - TBD.
   * @param {boolean} pixelPerfect - TBD.
   * @param {number} alphaThreshold - TBD.
   * @param {Rectangle | null | undefined} boundsRect - TBD.
   * @param {Image | null | undefined} boundsSprite - TBD.
   */
  public enableDrag(
    lockCenter = false,
    // Kept so the positional signature holds; this engine has no bringToTop to raise the sprite.
    _bringToTop = false,
    pixelPerfect = false,
    alphaThreshold = 255,
    boundsRect: Rectangle | null | undefined = null,
    boundsSprite: Image | null | undefined = null
  ): void {
    this._dragPoint = new Point();
    this.draggable = true;
    this.dragOffset = new Point();
    this.dragFromCenter = lockCenter;
    this.pixelPerfectClick = pixelPerfect;
    this.pixelPerfectAlpha = alphaThreshold;
    if (boundsRect) {
      this.boundsRect = boundsRect;
    }
    if (boundsSprite) {
      this.boundsSprite = boundsSprite;
    }
  }

  /**
   * TBD.
   */
  public disableDrag(): void {
    if (this._pointerData) {
      for (let i = 0; i < 10; i += 1) {
        this.pointerData(i).isDragged = false;
      }
    }
    this.draggable = false;
    this.isDragged = false;
    this._draggedPointerID = -1;
    this._pendingDrag = false;
  }

  /**
   * TBD.
   * @param {Pointer} pointer - TBD.
   */
  public startDrag(pointer: Pointer): void {
    const { x } = this.sprite;
    const { y } = this.sprite;
    this.isDragged = true;
    this._draggedPointerID = pointer.id;
    this.pointerData(pointer.id).camX = 0;
    this.pointerData(pointer.id).camY = 0;
    this.pointerData(pointer.id).isDragged = true;
    if (this.dragFromCenter) {
      const bounds = this.sprite.getBounds();
      this.sprite.x = this.globalToLocalX(pointer.x) + (this.sprite.x - bounds.centerX);
      this.sprite.y = this.globalToLocalY(pointer.y) + (this.sprite.y - bounds.centerY);
    }
    this._dragPoint.setTo(
      this.sprite.x - this.globalToLocalX(pointer.x),
      this.sprite.y - this.globalToLocalY(pointer.y)
    );
    this.updateDrag(pointer, true);
    this.dragStartPoint.setTo(x, y);
    this.sprite.events.onDragStart$dispatch(this.sprite, pointer, x, y);
    this._pendingDrag = false;
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @returns {number} TBD.
   */
  public globalToLocalX(x: number): number {
    return x;
  }

  /**
   * TBD.
   * @param {number} y - TBD.
   * @returns {number} TBD.
   */
  public globalToLocalY(y: number): number {
    return y;
  }

  /**
   * TBD.
   * @param {Pointer} pointer - TBD.
   */
  public stopDrag(pointer: Pointer): void {
    this.isDragged = false;
    this._draggedPointerID = -1;
    this.pointerData(pointer.id).isDragged = false;
    this._dragPhase = false;
    this._pendingDrag = false;
    if (this.snapOnRelease) {
      this.sprite.x =
        Math.round((this.sprite.x - (this.snapOffsetX % this.snapX)) / this.snapX) * this.snapX +
        (this.snapOffsetX % this.snapX);
      this.sprite.y =
        Math.round((this.sprite.y - (this.snapOffsetY % this.snapY)) / this.snapY) * this.snapY +
        (this.snapOffsetY % this.snapY);
    }
    this.sprite.events.onDragStop$dispatch(this.sprite, pointer);
    if (!this.checkPointerOver(pointer)) {
      this._pointerOutHandler(pointer);
    }
  }

  /**
   * TBD.
   * @param {boolean} allowHorizontal - TBD.
   * @param {boolean} allowVertical - TBD.
   */
  public setDragLock(allowHorizontal = true, allowVertical = true): void {
    this.allowHorizontalDrag = allowHorizontal;
    this.allowVerticalDrag = allowVertical;
  }

  /**
   * TBD.
   * @param {number} snapX - TBD.
   * @param {number} snapY - TBD.
   * @param {boolean} onDrag - TBD.
   * @param {boolean} onRelease - TBD.
   * @param {number} snapOffsetX - TBD.
   * @param {number} snapOffsetY - TBD.
   */
  public enableSnap(
    snapX: number,
    snapY: number,
    onDrag = true,
    onRelease = false,
    snapOffsetX = 0,
    snapOffsetY = 0
  ): void {
    this.snapX = snapX;
    this.snapY = snapY;
    this.snapOffsetX = snapOffsetX;
    this.snapOffsetY = snapOffsetY;
    this.snapOnDrag = onDrag;
    this.snapOnRelease = onRelease;
  }

  /**
   * TBD.
   */
  public disableSnap(): void {
    this.snapOnDrag = false;
    this.snapOnRelease = false;
  }

  /**
   * TBD.
   */
  public checkBoundsRect(): void {
    if (this.sprite.left < this.boundsRect!.left) {
      this.sprite.x = this.boundsRect!.x + this.sprite.offsetX;
    } else if (this.sprite.right > this.boundsRect!.right) {
      this.sprite.x = this.boundsRect!.right - (this.sprite.width - this.sprite.offsetX);
    }
    if (this.sprite.top < this.boundsRect!.top) {
      this.sprite.y = this.boundsRect!.top + this.sprite.offsetY;
    } else if (this.sprite.bottom > this.boundsRect!.bottom) {
      this.sprite.y = this.boundsRect!.bottom - (this.sprite.height - this.sprite.offsetY);
    }
  }

  /**
   * TBD.
   */
  public checkBoundsSprite(): void {
    if (this.sprite.left < this.boundsSprite!.left) {
      this.sprite.x = this.boundsSprite!.left + this.sprite.offsetX;
    } else if (this.sprite.right > this.boundsSprite!.right) {
      this.sprite.x = this.boundsSprite!.right - (this.sprite.width - this.sprite.offsetX);
    }
    if (this.sprite.top < this.boundsSprite!.top) {
      this.sprite.y = this.boundsSprite!.top + this.sprite.offsetY;
    } else if (this.sprite.bottom > this.boundsSprite!.bottom) {
      this.sprite.y = this.boundsSprite!.bottom - (this.sprite.height - this.sprite.offsetY);
    }
  }
}
