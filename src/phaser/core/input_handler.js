import { Point } from '../geom/point';
import { GROUP } from './const';
import { distance } from '../util/math';

export class InputHandler {
  /**
   * TBD.
   * @param {Image} sprite - TBD.
   */
  constructor(sprite) {
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
    this.bringToTop = false;
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
    this.scaleLayer = false;
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
    this._pointerData = [];
    this._pointerData.push({
      id: 0,
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
  }

  /**
   * TBD.
   * @param {number} priority - TBD.
   * @param {boolean} useHandCursor - TBD.
   * @returns {DisplayObject} TBD.
   */
  start(priority = 0, useHandCursor = false) {
    //  Turning on
    if (this.enabled === false) {
      //  Register, etc
      this.game.input.interactiveItems.add(this);
      this.useHandCursor = useHandCursor;
      this.priorityID = priority;
      for (let i = 0; i < 10; i += 1) {
        this._pointerData[i] = {
          id: i,
          x: 0,
          y: 0,
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
        };
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
  addedToGroup() {
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
  removedFromGroup() {
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
  reset() {
    this.enabled = false;
    for (let i = 0; i < 10; i += 1) {
      this._pointerData[i] = {
        id: i,
        x: 0,
        y: 0,
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
      };
    }
  }

  /**
   * TBD.
   */
  stop() {
    if (this.enabled) {
      this.enabled = false;
      this.game.input.interactiveItems.remove(this);
    }
  }

  /**
   * TBD.
   */
  destroy() {
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
      this.sprite = null;
    }
  }

  /**
   * TBD.
   * @param {number} highestID - TBD.
   * @param {number} highestRenderID - TBD.
   * @param {boolean} includePixelPerfect - TBD.
   * @returns {boolean} TBD.
   */
  validForInput(highestID, highestRenderID, includePixelPerfect = true) {
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
  isPixelPerfect() {
    return this.pixelPerfectClick || this.pixelPerfectOver;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {number} TBD.
   */
  pointerX(pointerId = 0) {
    return this._pointerData[pointerId].x;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {number} TBD.
   */
  pointerY(pointerId = 0) {
    return this._pointerData[pointerId].y;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {boolean} TBD.
   */
  pointerDown(pointerId = 0) {
    return this._pointerData[pointerId].isDown;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {boolean} TBD.
   */
  pointerUp(pointerId = 0) {
    return this._pointerData[pointerId].isUp;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {number} TBD.
   */
  pointerTimeDown(pointerId = 0) {
    return this._pointerData[pointerId].timeDown;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {number} TBD.
   */
  pointerTimeUp(pointerId = 0) {
    return this._pointerData[pointerId].timeUp;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {boolean} TBD.
   */
  pointerOver(pointerId) {
    if (!this.enabled) {
      return false;
    }
    if (pointerId === undefined) {
      for (let i = 0; i < 10; i += 1) {
        if (this._pointerData[i].isOver) {
          return true;
        }
      }
      return false;
    }
    return this._pointerData[pointerId].isOver;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {boolean} TBD.
   */
  pointerOut(pointerId) {
    if (!this.enabled) {
      return false;
    }
    if (pointerId === undefined) {
      for (let i = 0; i < 10; i += 1) {
        if (this._pointerData[i].isOut) {
          return true;
        }
      }
    }
    return this._pointerData[pointerId].isOut;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {number} TBD.
   */
  pointerTimeOver(pointerId = 0) {
    return this._pointerData[pointerId].timeOver;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {number} TBD.
   */
  pointerTimeOut(pointerId = 0) {
    return this._pointerData[pointerId].timeOut;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {boolean} TBD.
   */
  pointerDragged(pointerId = 0) {
    return this._pointerData[pointerId].isDragged;
  }

  /**
   * TBD.
   * @param {Pointer} pointer - TBD.
   * @param {boolean} fastTest - TBD.
   * @returns {boolean} TBD.
   */
  checkPointerDown(pointer, fastTest = false) {
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
  checkPointerOver(pointer, fastTest = false) {
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
  checkPixel(x, y, pointer) {
    //  Grab a pixel from our image into the hitCanvas and then test it
    if (this.sprite.texture.baseTexture.source) {
      if (x === null && y === null) {
        //  Use the pointer parameter
        this.game.input.getLocalPosition(this.sprite, pointer, this._tempPoint);
        x = this._tempPoint.x;
        y = this._tempPoint.y;
      }
      if (this.sprite.anchor.x !== 0) {
        x -= -this.sprite.texture.frame.width * this.sprite.anchor.x;
      }
      if (this.sprite.anchor.y !== 0) {
        y -= -this.sprite.texture.frame.height * this.sprite.anchor.y;
      }
      x += this.sprite.texture.frame.x;
      y += this.sprite.texture.frame.y;
      if (this.sprite.texture.trim) {
        x -= this.sprite.texture.trim.x;
        y -= this.sprite.texture.trim.y;
        //  If the coordinates are outside the trim area we return false immediately, to save doing a draw call
        if (
          x < this.sprite.texture.crop.x ||
          x > this.sprite.texture.crop.right ||
          y < this.sprite.texture.crop.y ||
          y > this.sprite.texture.crop.bottom
        ) {
          this._dx = x;
          this._dy = y;
          return false;
        }
      }
      this._dx = x;
      this._dy = y;
      this.game.input.hitContext.clearRect(0, 0, 1, 1);
      this.game.input.hitContext.drawImage(this.sprite.texture.baseTexture.source, x, y, 1, 1, 0, 0, 1, 1);
      const rgb = this.game.input.hitContext.getImageData(0, 0, 1, 1);
      if (rgb.data[3] >= this.pixelPerfectAlpha) {
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
  update(pointer) {
    if (this.sprite === null || this.sprite.parent === undefined) {
      // Abort. We've been destroyed.
      return false;
    }
    if (!this.enabled || !this.sprite.visible || !this.sprite.parent.visible) {
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
    } else if (this._pointerData[pointer.id].isOver) {
      if (this.checkPointerOver(pointer)) {
        this._pointerData[pointer.id].x = pointer.x - this.sprite.x;
        this._pointerData[pointer.id].y = pointer.y - this.sprite.y;
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
  _pointerOverHandler(pointer, silent) {
    if (this.sprite === null) {
      // Abort. We've been destroyed.
      return;
    }
    const data = this._pointerData[pointer.id];
    if (data.isOver === false || pointer.dirty) {
      const sendEvent = data.isOver === false;
      data.isOver = true;
      data.isOut = false;
      data.timeOver = this.game.time.time;
      data.x = pointer.x - this.sprite.x;
      data.y = pointer.y - this.sprite.y;
      if (this.useHandCursor && data.isDragged === false) {
        this.game.canvas.style.cursor = 'pointer';
        this._setHandCursor = true;
      }
      if (!silent && sendEvent && this.sprite && this.sprite.events) {
        this.sprite.events.onInputOver$dispatch(this.sprite, pointer);
      }
      if (this.sprite.parent && this.sprite.parent.type === GROUP) {
        this.sprite.parent.onChildInputOver.dispatch(this.sprite, pointer);
      }
    }
  }

  /**
   * TBD.
   * @param {Pointer} pointer - TBD.
   * @param {boolean} silent - TBD.
   */
  _pointerOutHandler(pointer, silent = false) {
    if (this.sprite === null) {
      // Abort. We've been destroyed.
      return;
    }
    const data = this._pointerData[pointer.id];
    data.isOver = false;
    data.isOut = true;
    data.timeOut = this.game.time.time;
    if (this.useHandCursor && data.isDragged === false) {
      this.game.canvas.style.cursor = 'default';
      this._setHandCursor = false;
    }
    if (!silent && this.sprite && this.sprite.events) {
      this.sprite.events.onInputOut$dispatch(this.sprite, pointer);
      if (this.sprite && this.sprite.parent && this.sprite.parent.type === GROUP) {
        this.sprite.parent.onChildInputOut.dispatch(this.sprite, pointer);
      }
    }
  }

  /**
   * TBD.
   * @param {Pointer} pointer - TBD.
   */
  _touchedHandler(pointer) {
    if (this.sprite === null) {
      // Abort. We've been destroyed.
      return;
    }
    const data = this._pointerData[pointer.id];
    if (!data.isDown && data.isOver) {
      if (this.pixelPerfectClick && !this.checkPixel(null, null, pointer)) {
        return;
      }
      data.isDown = true;
      data.isUp = false;
      data.timeDown = this.game.time.time;
      this.downPoint.set(pointer.x, pointer.y);
      // It's possible the onInputDown event creates a new Sprite that is on-top of this one, so we ought to force a Pointer update
      pointer.dirty = true;
      if (this.sprite && this.sprite.events) {
        this.sprite.events.onInputDown$dispatch(this.sprite, pointer);
        // The event above might have destroyed this sprite.
        if (this.sprite && this.sprite.parent && this.sprite.parent.type === GROUP) {
          this.sprite.parent.onChildInputDown.dispatch(this.sprite, pointer);
        }
        //  The events might have destroyed this sprite.
        if (this.sprite === null) {
          return;
        }
      }
      //  Start drag
      if (this.draggable && this.isDragged === false) {
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
      if (this.bringToTop) {
        this.sprite.bringToTop();
      }
    }
  }

  /**
   * TBD.
   * @param {Pointer} pointer - TBD.
   */
  dragTimeElapsed(pointer) {
    this._dragTimePass = true;
    if (this._pendingDrag && this.sprite) {
      if (this._dragDistancePass) {
        this.startDrag(pointer);
      }
    }
  }

  /**
   * TBD.
   * @param {Pointer} pointer - TBD.
   */
  _releasedHandler(pointer) {
    if (this.sprite === null) {
      // Abort. We've been destroyed.
      return;
    }
    const data = this._pointerData[pointer.id];
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
          this.sprite.parent.onChildInputUp.dispatch(this.sprite, pointer, isOver);
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
  updateDrag(pointer, fromStart = false) {
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
      this.snapPoint.set(this.sprite.x, this.sprite.y);
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
  justOver(pointerId = 0, delay = 500) {
    return this._pointerData[pointerId].isOver && this.overDuration(pointerId) < delay;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @param {number} delay - TBD.
   * @returns {boolean} TBD.
   */
  justOut(pointerId = 0, delay = 500) {
    return this._pointerData[pointerId].isOut && this.game.time.time - this._pointerData[pointerId].timeOut < delay;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @param {number} delay - TBD.
   * @returns {boolean} TBD.
   */
  justPressed(pointerId = 0, delay = 500) {
    return this._pointerData[pointerId].isDown && this.downDuration(pointerId) < delay;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @param {number} delay - TBD.
   * @returns {boolean} TBD.
   */
  justReleased(pointerId = 0, delay = 500) {
    return this._pointerData[pointerId].isUp && this.game.time.time - this._pointerData[pointerId].timeUp < delay;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {number} TBD.
   */
  overDuration(pointerId = 0) {
    if (this._pointerData[pointerId].isOver) {
      return this.game.time.time - this._pointerData[pointerId].timeOver;
    }
    return -1;
  }

  /**
   * TBD.
   * @param {number} pointerId - TBD.
   * @returns {number} TBD.
   */
  downDuration(pointerId = 0) {
    if (this._pointerData[pointerId].isDown) {
      return this.game.time.time - this._pointerData[pointerId].timeDown;
    }
    return -1;
  }

  /**
   * TBD.
   * @param {boolean} lockCenter - TBD.
   * @param {boolean} bringToTop - TBD.
   * @param {boolean} pixelPerfect - TBD.
   * @param {number} alphaThreshold - TBD.
   * @param {Rectangle} boundsRect - TBD.
   * @param {DisplayObject} boundsSprite - TBD.
   */
  enableDrag(
    lockCenter = false,
    bringToTop = false,
    pixelPerfect = false,
    alphaThreshold = 255,
    boundsRect = null,
    boundsSprite = null
  ) {
    this._dragPoint = new Point();
    this.draggable = true;
    this.bringToTop = bringToTop;
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
  disableDrag() {
    if (this._pointerData) {
      for (let i = 0; i < 10; i += 1) {
        this._pointerData[i].isDragged = false;
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
  startDrag(pointer) {
    const x = this.sprite.x;
    const y = this.sprite.y;
    this.isDragged = true;
    this._draggedPointerID = pointer.id;
    this._pointerData[pointer.id].camX = 0;
    this._pointerData[pointer.id].camY = 0;
    this._pointerData[pointer.id].isDragged = true;
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
    if (this.bringToTop) {
      this._dragPhase = true;
      this.sprite.parent.bringToTop(this.sprite);
    }
    this.dragStartPoint.set(x, y);
    this.sprite.events.onDragStart$dispatch(this.sprite, pointer, x, y);
    this._pendingDrag = false;
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @returns {number} TBD.
   */
  globalToLocalX(x) {
    if (this.scaleLayer) {
      x -= this.game.scale.grid.boundsFluid.x;
      x *= this.game.scale.grid.scaleFluidInversed.x;
    }
    return x;
  }

  /**
   * TBD.
   * @param {number} y - TBD.
   * @returns {number} TBD.
   */
  globalToLocalY(y) {
    if (this.scaleLayer) {
      y -= this.game.scale.grid.boundsFluid.y;
      y *= this.game.scale.grid.scaleFluidInversed.y;
    }
    return y;
  }

  /**
   * TBD.
   * @param {Pointer} pointer - TBD.
   */
  stopDrag(pointer) {
    this.isDragged = false;
    this._draggedPointerID = -1;
    this._pointerData[pointer.id].isDragged = false;
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
    if (this.checkPointerOver(pointer) === false) {
      this._pointerOutHandler(pointer);
    }
  }

  /**
   * TBD.
   * @param {boolean} allowHorizontal - TBD.
   * @param {boolean} allowVertical - TBD.
   */
  setDragLock(allowHorizontal = true, allowVertical = true) {
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
  enableSnap(snapX, snapY, onDrag = true, onRelease = false, snapOffsetX = 0, snapOffsetY = 0) {
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
  disableSnap() {
    this.snapOnDrag = false;
    this.snapOnRelease = false;
  }

  /**
   * TBD.
   */
  checkBoundsRect() {
    if (this.sprite.left < this.boundsRect.left) {
      this.sprite.x = this.boundsRect.x + this.sprite.offsetX;
    } else if (this.sprite.right > this.boundsRect.right) {
      this.sprite.x = this.boundsRect.right - (this.sprite.width - this.sprite.offsetX);
    }
    if (this.sprite.top < this.boundsRect.top) {
      this.sprite.y = this.boundsRect.top + this.sprite.offsetY;
    } else if (this.sprite.bottom > this.boundsRect.bottom) {
      this.sprite.y = this.boundsRect.bottom - (this.sprite.height - this.sprite.offsetY);
    }
  }

  /**
   * TBD.
   */
  checkBoundsSprite() {
    if (this.sprite.left < this.boundsSprite.left) {
      this.sprite.x = this.boundsSprite.left + this.sprite.offsetX;
    } else if (this.sprite.right > this.boundsSprite.right) {
      this.sprite.x = this.boundsSprite.right - (this.sprite.width - this.sprite.offsetX);
    }
    if (this.sprite.top < this.boundsSprite.top) {
      this.sprite.y = this.boundsSprite.top + this.sprite.offsetY;
    } else if (this.sprite.bottom > this.boundsSprite.bottom) {
      this.sprite.y = this.boundsSprite.bottom - (this.sprite.height - this.sprite.offsetY);
    }
  }
}
