import { Matrix } from '../geom/matrix.js';
import { Point } from '../geom/point.js';
import { Rectangle } from '../geom/rectangle.js';
import { getIdentityMatrix } from '../geom/util/matrix.js';
import { PI_2 } from '../util/math.js';
import { renderCanvas, renderWebGL } from './sprite_util.js';

export class DisplayObject {
  /**
   * Creates a new DisplayObject instance.
   * @param {import('../core/game.js').Game} game - The game instance this display object belongs to.
   */
  constructor(game) {
    /** @type {boolean} */
    this.exists = true;
    /** @type {boolean} */
    this.renderable = false;
    /** @type {boolean} */
    this.visible = true;
    /** @type {Point} */
    this.position = new Point(0, 0);
    /** @type {Point} */
    this.scale = new Point(1, 1);
    /** @type {Point} */
    this.pivot = new Point(0, 0);
    /** @type {Point} */
    this.anchor = new Point(0, 0);
    /** @type {number} */
    this.rotation = 0;
    /** @type {number} */
    this.alpha = 1;
    /** @type {Rectangle} */
    this.hitArea = null;
    /** @type {DisplayObject} */
    this.parent = null;
    /** @type {number} */
    this.worldAlpha = 1;
    /** @type {Matrix} */
    this.worldTransform = new Matrix();
    // this.worldPosition = new Point(0, 0);
    /** @type {Point} */
    this.worldScale = new Point(1, 1);
    // this.worldRotation = 0;
    /** @type {Rectangle} */
    this.filterArea = null;
    /** @type {number} */
    this._sr = 0;
    /** @type {number} */
    this._cr = 1;
    /** @type {Rectangle} */
    this.cachedBounds = new Rectangle(0, 0, 0, 0);
    /** @type {Rectangle} */
    this.currentBounds = null;
    /** @type {import('./graphics.js').Graphics} */
    this._mask = null;
    /** @type {object[]} */
    this._filters = null;
    /** @type {object} */
    this._filterBlock = null;
    this.children = [];
    /** @type {boolean} */
    this.ignoreChildInput = false;
    /** @type {string | null } */
    this.name = this.name ?? null;
    /** @type {object | null } */
    this.data = this.data ?? null;
    /** @type {import('../core/game.js').Game } */
    this.game = game;
  }

  /**
   * Destroys this display object and cleans up resources.
   */
  destroy() {
    if (this.children) {
      let i = this.children.length;
      while (i) {
        i -= 1;
        this.children[i].destroy();
      }
    }
    this.children = null;
    this.exists = false;
    this.renderable = false;
    this.visible = false;
    // TODO: investigate how to clean up properly object references without breaking delayed tween cleanups.
    /*
    this.position = null;
    this.scale = null;
    this.pivot = null;
    this.anchor = null;
    */
    this.hitArea = null;
    this.parent = null;
    this.worldTransform = null;
    // this.worldPosition = null;
    this.worldScale = null;
    this.filterArea = null;
    this.cachedBounds = null;
    this.currentBounds = null;
    this._mask = null;
    this.destroyCachedSprite();
  }

  /**
   * Adds a child display object to this container.
   * @param {DisplayObject} child - The child display object to add.
   * @returns {DisplayObject} The added child display object.
   */
  addChild(child) {
    return this.addChildAt(child, this.children.length);
  }

  /**
   * Adds a child display object at a specific index in the children list.
   * @param {DisplayObject} child - The child display object to add.
   * @param {number} index - The index to insert the child at.
   * @returns {DisplayObject} The added child display object.
   * @throws {Error} If the index is out of bounds.
   */
  addChildAt(child, index) {
    if (index >= 0 && index <= this.children.length) {
      if (child.parent) {
        child.parent.removeChild(child);
      }
      child.parent = this;
      this.children.splice(index, 0, child);
      return child;
    }
    throw new Error(`${child}addChildAt: The index ${index} supplied is out of bounds ${this.children.length}`);
  }

  /**
   * Swaps the positions of two child display objects.
   * @param {DisplayObject} child - The first child display object.
   * @param {DisplayObject} child2 - The second child display object.
   * @throws {Error} If either child is not a child of this container.
   */
  swapChildren(child, child2) {
    if (child === child2) {
      return;
    }
    const index1 = this.getChildIndex(child);
    const index2 = this.getChildIndex(child2);
    if (index1 < 0 || index2 < 0) {
      throw new Error('swapChildren: Both the supplied DisplayObjects must be a child of the caller');
    }
    this.children[index1] = child2;
    this.children[index2] = child;
  }

  /**
   * Gets the index of a child display object in the children list.
   * @param {DisplayObject} child - The child display object to find.
   * @returns {number} The index of the child in the children list.
   * @throws {Error} If the child is not a child of this container.
   */
  getChildIndex(child) {
    const index = this.children.indexOf(child);
    if (index === -1) {
      throw new Error('The supplied DisplayObject must be a child of the caller');
    }
    return index;
  }

  /**
   * Sets the index of a child display object in the children list.
   * @param {DisplayObject} child - The child display object to move.
   * @param {number} index - The new index for the child.
   * @throws {Error} If the index is out of bounds.
   */
  setChildIndex(child, index) {
    if (index < 0 || index >= this.children.length) {
      throw new Error('The supplied index is out of bounds');
    }
    const currentIndex = this.getChildIndex(child);
    this.children.splice(currentIndex, 1); // remove from old position
    this.children.splice(index, 0, child); // add at new position
  }

  /**
   * Gets a child display object at a specific index.
   * @param {number} index - The index of the child to get.
   * @returns {DisplayObject} The child display object at the specified index.
   * @throws {Error} If the index is out of bounds.
   */
  getChildAt(index) {
    if (index < 0 || index >= this.children.length) {
      throw new Error(
        `getChildAt: Supplied index ${
          index
        } does not exist in the child list, or the supplied DisplayObject must be a child of the caller`
      );
    }
    return this.children[index];
  }

  /**
   * Removes a child display object from this container.
   * @param {DisplayObject} child - The child display object to remove.
   * @returns {DisplayObject} The removed child display object.
   */
  removeChild(child) {
    const index = this.children.indexOf(child);
    if (index === -1) {
      return null;
    }
    return this.removeChildAt(index);
  }

  /**
   * Removes a child display object at a specific index.
   * @param {number} index - The index of the child to remove.
   * @returns {DisplayObject} The removed child display object.
   */
  removeChildAt(index) {
    const child = this.getChildAt(index);
    if (child) {
      child.parent = undefined;
      this.children.splice(index, 1);
    }
    return child;
  }

  /**
   * Removes a range of child display objects from this container.
   * @param {number} beginIndex - The starting index of the range to remove.
   * @param {number} endIndex - The ending index (exclusive) of the range to remove.
   * @returns {DisplayObject[]} The array of removed child display objects.
   * @throws {Error} If the range is invalid.
   */
  removeChildren(beginIndex, endIndex) {
    if (beginIndex === undefined) {
      beginIndex = 0;
    }
    if (endIndex === undefined) {
      endIndex = this.children.length;
    }
    const range = endIndex - beginIndex;
    if (range > 0 && range <= endIndex) {
      const removed = this.children.splice(beginIndex, range);
      for (let i = 0; i < removed.length; i += 1) {
        const child = removed[i];
        child.parent = undefined;
      }
      return removed;
    }
    if (range === 0 && this.children.length === 0) {
      return [];
    }
    throw new Error('removeChildren: Range Error, numeric values are outside the acceptable range');
  }

  /**
   * Updates the world transform of this display object and its children.
   * @param {DisplayObject | null | undefined} parent - The parent display object to use for the world transform calculation.
   * @returns {DisplayObject} This DisplayObject instance for chaining.
   */
  updateTransform(parent = null) {
    if (!parent && !this.parent) {
      return this;
    }
    if (!this.game || !this.visible) {
      return this;
    }
    let p = this.parent;
    if (parent) {
      p = parent;
    } else if (!this.parent) {
      p = this.game.world;
    }
    // create some matrix refs for easy access
    const pt = p.worldTransform;
    const wt = this.worldTransform;
    // temporary matrix variables
    let a;
    let b;
    let c;
    let d;
    let tx;
    let ty;
    // so if rotation is between 0 then we can simplify the multiplication process..
    if (this.rotation % PI_2) {
      // check to see if the rotation is the same as the previous render. This means we only need to use sin and cos when rotation actually changes
      if (this.rotation !== this.rotationCache) {
        this.rotationCache = this.rotation;
        this._sr = Math.sin(this.rotation);
        this._cr = Math.cos(this.rotation);
      }
      // get the matrix values of the displayobject based on its transform properties..
      a = this._cr * this.scale.x;
      b = this._sr * this.scale.x;
      c = -this._sr * this.scale.y;
      d = this._cr * this.scale.y;
      tx = this.position.x;
      ty = this.position.y;
      // check for pivot.. not often used so geared towards that fact!
      if (this.pivot.x || this.pivot.y) {
        tx -= this.pivot.x * a + this.pivot.y * c;
        ty -= this.pivot.x * b + this.pivot.y * d;
      }
      // concat the parent matrix with the objects transform.
      wt.a = a * pt.a + b * pt.c;
      wt.b = a * pt.b + b * pt.d;
      wt.c = c * pt.a + d * pt.c;
      wt.d = c * pt.b + d * pt.d;
      wt.tx = tx * pt.a + ty * pt.c + pt.tx;
      wt.ty = tx * pt.b + ty * pt.d + pt.ty;
    } else {
      // lets do the fast version as we know there is no rotation..
      a = this.scale.x;
      d = this.scale.y;
      tx = this.position.x - this.pivot.x * a;
      ty = this.position.y - this.pivot.y * d;
      wt.a = a * pt.a;
      wt.b = a * pt.b;
      wt.c = d * pt.c;
      wt.d = d * pt.d;
      wt.tx = tx * pt.a + ty * pt.c + pt.tx;
      wt.ty = tx * pt.b + ty * pt.d + pt.ty;
    }
    //  Set the World values
    this.worldAlpha = this.alpha * p.worldAlpha;
    // this.worldPosition.setTo(wt.tx, wt.ty);
    this.worldScale.setTo(
      this.scale.x * Math.sqrt(wt.a * wt.a + wt.c * wt.c),
      this.scale.y * Math.sqrt(wt.b * wt.b + wt.d * wt.d)
    );
    this.worldRotation = Math.atan2(-wt.c, wt.d);
    // reset the bounds each time this is called!
    this.currentBounds = null;
    //  Custom callback?
    if (this.transformCallback) {
      this.transformCallback.call(this.transformCallbackContext, wt, pt);
    }
    for (let i = 0; i < this.children.length; i += 1) {
      this.children[i].updateTransform();
    }
    return this;
  }

  /**
   * Gets the bounds of this display object in world coordinates.
   * @param {DisplayObject} targetCoordinateSpace - The coordinate space to calculate bounds in.
   * @returns {Rectangle} The bounds rectangle of this display object.
   */
  getBounds(targetCoordinateSpace) {
    const isTargetCoordinateSpaceDisplayObject = targetCoordinateSpace && targetCoordinateSpace.contains !== undefined;
    let isTargetCoordinateSpaceThisOrParent = true;
    if (!isTargetCoordinateSpaceDisplayObject) {
      targetCoordinateSpace = this;
    } else if (targetCoordinateSpace.contains !== undefined) {
      isTargetCoordinateSpaceThisOrParent = targetCoordinateSpace.contains(this);
    } else {
      isTargetCoordinateSpaceThisOrParent = false;
    }
    let i;
    let matrixCache;
    if (isTargetCoordinateSpaceDisplayObject) {
      matrixCache = targetCoordinateSpace.worldTransform;
      targetCoordinateSpace.worldTransform = getIdentityMatrix();
      for (i = 0; i < targetCoordinateSpace.children.length; i += 1) {
        targetCoordinateSpace.children[i].updateTransform();
      }
    }
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let childBounds;
    let childMaxX;
    let childMaxY;
    let childVisible = false;
    for (i = 0; i < this.children.length; i += 1) {
      const child = this.children[i];
      if (child.visible) {
        childVisible = true;
        childBounds = this.children[i].getBounds();
        minX = minX < childBounds.x ? minX : childBounds.x;
        minY = minY < childBounds.y ? minY : childBounds.y;
        childMaxX = childBounds.width + childBounds.x;
        childMaxY = childBounds.height + childBounds.y;
        maxX = maxX > childMaxX ? maxX : childMaxX;
        maxY = maxY > childMaxY ? maxY : childMaxY;
      }
    }
    let bounds = this.cachedBounds;
    if (!childVisible) {
      bounds = new Rectangle();
      const w0 = bounds.x;
      const w1 = bounds.width + bounds.x;
      const h0 = bounds.y;
      const h1 = bounds.height + bounds.y;
      const worldTransform = this.worldTransform;
      const a = worldTransform.a;
      const b = worldTransform.b;
      const c = worldTransform.c;
      const d = worldTransform.d;
      const tx = worldTransform.tx;
      const ty = worldTransform.ty;
      const x1 = a * w1 + c * h1 + tx;
      const y1 = d * h1 + b * w1 + ty;
      const x2 = a * w0 + c * h1 + tx;
      const y2 = d * h1 + b * w0 + ty;
      const x3 = a * w0 + c * h0 + tx;
      const y3 = d * h0 + b * w0 + ty;
      const x4 = a * w1 + c * h0 + tx;
      const y4 = d * h0 + b * w1 + ty;
      maxX = x1;
      maxY = y1;
      minX = x1;
      minY = y1;
      minX = x2 < minX ? x2 : minX;
      minX = x3 < minX ? x3 : minX;
      minX = x4 < minX ? x4 : minX;
      minY = y2 < minY ? y2 : minY;
      minY = y3 < minY ? y3 : minY;
      minY = y4 < minY ? y4 : minY;
      maxX = x2 > maxX ? x2 : maxX;
      maxX = x3 > maxX ? x3 : maxX;
      maxX = x4 > maxX ? x4 : maxX;
      maxY = y2 > maxY ? y2 : maxY;
      maxY = y3 > maxY ? y3 : maxY;
      maxY = y4 > maxY ? y4 : maxY;
    }
    bounds.x = minX;
    bounds.y = minY;
    bounds.width = maxX - minX;
    bounds.height = maxY - minY;
    if (isTargetCoordinateSpaceDisplayObject) {
      targetCoordinateSpace.worldTransform = matrixCache;
      for (i = 0; i < targetCoordinateSpace.children.length; i += 1) {
        targetCoordinateSpace.children[i].updateTransform();
      }
    }
    if (!isTargetCoordinateSpaceThisOrParent) {
      const targetCoordinateSpaceBounds = targetCoordinateSpace.getBounds();
      bounds.x -= targetCoordinateSpaceBounds.x;
      bounds.y -= targetCoordinateSpaceBounds.y;
    }
    return bounds;
  }

  /**
   * Gets the bounds of this display object in local coordinates.
   * @returns {Rectangle} The bounds rectangle of this display object in local space.
   */
  getLocalBounds() {
    return this.getBounds(this);
  }

  /**
   * Checks if a child display object is contained within this container.
   * @param {DisplayObject} child - The child display object to check.
   * @returns {boolean} True if the child is contained within this container, false otherwise.
   */
  contains(child) {
    if (!child) {
      return false;
    }
    if (child === this) {
      return true;
    }
    return this.contains(child.parent);
  }

  /**
   * Renders this display object using WebGL.
   * @param {object} renderSession - The WebGL rendering session.
   */
  renderWebGL(renderSession) {
    if (!this.visible || this.alpha <= 0) {
      return;
    }
    let i;
    if (this._mask || this._filters) {
      // push filter first as we need to ensure the stencil buffer is correct for any masking
      if (this._filters) {
        renderSession.spriteBatch.flush();
        renderSession.filterManager.pushFilter(this._filterBlock);
      }
      if (this._mask) {
        renderSession.spriteBatch.stop();
        renderSession.maskManager.pushMask(this.mask, renderSession);
        renderSession.spriteBatch.start();
      }
      for (i = 0; i < this.children.length; i += 1) {
        this.children[i].renderWebGL(renderSession);
      }
      renderSession.spriteBatch.stop();
      if (this._mask) renderSession.maskManager.popMask(this._mask, renderSession);
      if (this._filters) renderSession.filterManager.popFilter();
      renderSession.spriteBatch.start();
    } else {
      for (i = 0; i < this.children.length; i += 1) {
        this.children[i].renderWebGL(renderSession);
      }
    }
  }

  /**
   * Renders this display object using Canvas.
   * @param {object} renderSession - The Canvas rendering session.
   */
  renderCanvas(renderSession) {
    if (!this.visible || this.alpha <= 0) {
      return;
    }
    if (this._mask) {
      renderSession.maskManager.pushMask(this._mask, renderSession);
    }
    for (let i = 0; i < this.children.length; i += 1) {
      this.children[i].renderCanvas(renderSession);
    }
    if (this._mask) {
      renderSession.maskManager.popMask(renderSession);
    }
  }

  /**
   * Called before the update cycle for this display object.
   */
  preUpdate() {
    // override
  }

  /**
   * Called during the update cycle for this display object.
   */
  update() {
    // override
  }

  /**
   * Called after the update cycle for this display object.
   */
  postUpdate() {
    // override
  }

  /**
   * Generates a texture for this display object.
   * @throws {Error} This method is not implemented yet.
   */
  generateTexture() {
    // TODO
    throw new Error('display_object.generateTexture() is not implemented');
  }

  /**
   * Converts a local position to global (world) coordinates.
   * @param {Point} position - The local position to convert.
   * @returns {Point} The converted global position.
   */
  toGlobal(position) {
    this.updateTransform();
    return this.worldTransform.apply(position);
  }

  /**
   * Converts a global (world) position to local coordinates.
   * @param {Point} position - The global position to convert.
   * @param {DisplayObject} from - The display object to convert from (defaults to this).
   * @returns {Point} The converted local position.
   */
  toLocal(position, from) {
    if (from) {
      position = from.toGlobal(position);
    }
    this.updateTransform();
    return this.worldTransform.applyInverse(position);
  }

  /**
   * Renders a cached sprite for this display object.
   * @param {object} renderSession - The rendering session.
   */
  renderCachedSprite(renderSession) {
    if (!this._cachedSprite) {
      return;
    }
    this._cachedSprite.worldAlpha = this.worldAlpha;
    if (renderSession.gl) {
      renderWebGL(this._cachedSprite, renderSession);
    } else {
      renderCanvas(this._cachedSprite, renderSession);
    }
  }

  /**
   * Generates a cached sprite for this display object.
   */
  generateCachedSprite() {
    // TODO
  }

  /**
   * Destroys the cached sprite for this display object.
   */
  destroyCachedSprite() {
    if (!this._cachedSprite) {
      return;
    }
    this._cachedSprite.texture.destroy(true);
    this._cachedSprite = null;
  }

  // GETTER SETTER

  /**
   * Gets the width of this display object.
   * @returns {number} The width in pixels.
   */
  get width() {
    return this.getLocalBounds().width * this.scale.x;
  }

  /**
   * Sets the width of this display object.
   * @param {number} value - The new width in pixels.
   */
  set width(value) {
    const width = this.getLocalBounds().width;
    if (width !== 0) {
      this.scale.x = value / width;
    } else {
      this.scale.x = 1;
    }
    this._width = value;
  }

  /**
   * Gets the height of this display object.
   * @returns {number} The height in pixels.
   */
  get height() {
    return this.getLocalBounds().height * this.scale.y;
  }

  /**
   * Sets the height of this display object.
   * @param {number} value - The new height in pixels.
   */
  set height(value) {
    const height = this.getLocalBounds().height;
    if (height !== 0) {
      this.scale.y = value / height;
    } else {
      this.scale.y = 1;
    }
    this._height = value;
  }

  /**
   * Gets the x position of this display object.
   * @returns {number} The x position in pixels.
   */
  get x() {
    return this.position.x;
  }

  /**
   * Sets the x position of this display object.
   * @param {number} value - The new x position in pixels.
   */
  set x(value) {
    this.position.x = value;
  }

  /**
   * Gets the y position of this display object.
   * @returns {number} The y position in pixels.
   */
  get y() {
    return this.position.y;
  }

  /**
   * Sets the y position of this display object.
   * @param {number} value - The new y position in pixels.
   */
  set y(value) {
    this.position.y = value;
  }

  /**
   * Gets whether this display object is visible in the world.
   * @returns {boolean} True if the object is visible, false otherwise.
   */
  get worldVisible() {
    if (!this.visible) {
      return false;
    }
    let item = this.parent;
    if (!item) {
      return this.visible;
    }
    do {
      if (!item.visible) {
        return false;
      }
      item = item.parent;
    } while (item);
    return true;
  }

  // MASK

  /**
   * Gets the mask for this display object.
   * @returns {import('./graphics.js').Graphics} The mask object or null if none is set.
   */
  get mask() {
    return this._mask;
  }

  /**
   * Sets the mask for this display object.
   * @param {import('./graphics.js').Graphics} value - The mask object to set, or null to remove the mask.
   */
  set mask(value) {
    if (this._mask) {
      this._mask.isMask = false;
    }
    this._mask = value;
    if (value) {
      this._mask.isMask = true;
    }
  }

  // BOUNDS

  /**
   * Gets the x offset for this display object (based on anchor point).
   * @returns {number} The x offset in pixels.
   */
  get offsetX() {
    return this.anchor.x * this.width;
  }

  /**
   * Gets the y offset for this display object (based on anchor point).
   * @returns {number} The y offset in pixels.
   */
  get offsetY() {
    return this.anchor.y * this.height;
  }

  /**
   * Gets the center x position of this display object.
   * @returns {number} The center x position in pixels.
   */
  get centerX() {
    return this.x - this.offsetX + this.width * 0.5;
  }

  /**
   * Sets the center x position of this display object.
   * @param {number} value - The new center x position in pixels.
   */
  set centerX(value) {
    this.x = value + this.offsetX - this.width * 0.5;
  }

  /**
   * Gets the center y position of this display object.
   * @returns {number} The center y position in pixels.
   */
  get centerY() {
    return this.y - this.offsetY + this.height * 0.5;
  }

  /**
   * Sets the center y position of this display object.
   * @param {number} value - The new center y position in pixels.
   */
  set centerY(value) {
    this.y = value + this.offsetY - this.height * 0.5;
  }

  /**
   * Gets the left x position of this display object.
   * @returns {number} The left x position in pixels.
   */
  get left() {
    return this.x - this.offsetX;
  }

  /**
   * Sets the left x position of this display object.
   * @param {number} value - The new left x position in pixels.
   */
  set left(value) {
    this.x = value + this.offsetX;
  }

  /**
   * Gets the right x position of this display object.
   * @returns {number} The right x position in pixels.
   */
  get right() {
    return this.x + this.width - this.offsetX;
  }

  /**
   * Sets the right x position of this display object.
   * @param {number} value - The new right x position in pixels.
   */
  set right(value) {
    this.x = value - this.width + this.offsetX;
  }

  /**
   * Gets the top y position of this display object.
   * @returns {number} The top y position in pixels.
   */
  get top() {
    return this.y - this.offsetY;
  }

  /**
   * Sets the top y position of this display object.
   * @param {number} value - The new top y position in pixels.
   */
  set top(value) {
    this.y = value + this.offsetY;
  }

  /**
   * Gets the bottom y position of this display object.
   * @returns {number} The bottom y position in pixels.
   */
  get bottom() {
    return this.y + this.height - this.offsetY;
  }

  /**
   * Sets the bottom y position of this display object.
   * @param {number} value - The new bottom y position in pixels.
   */
  set bottom(value) {
    this.y = value - this.height + this.offsetY;
  }
}
