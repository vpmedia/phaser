/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 */
import Point from '../geom/point';
import Rectangle from '../geom/rectangle';
import Matrix from '../geom/matrix';
import { getIdentityMatrix } from '../geom/util/matrix';
import { PI_2 } from '../util/math';
import { renderCanvas, renderWebGL } from './sprite_util';

export default class {
  constructor() {
    this.exists = true;
    this.renderable = false;
    this.visible = true;
    this.position = new Point(0, 0);
    this.scale = new Point(1, 1);
    this.pivot = new Point(0, 0);
    this.anchor = new Point(0, 0);
    this.rotation = 0;
    this.alpha = 1;
    this.hitArea = null;
    this.parent = null;
    this.worldAlpha = 1;
    this.worldTransform = new Matrix();
    // this.worldPosition = new Point(0, 0);
    this.worldScale = new Point(1, 1);
    // this.worldRotation = 0;
    this.filterArea = null;
    this._sr = 0;
    this._cr = 1;
    this.cachedBounds = new Rectangle(0, 0, 0, 0);
    this.currentBounds = null;
    this._mask = null;
    this.children = [];
    this.ignoreChildInput = false;
  }

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

  addChild(child) {
    return this.addChildAt(child, this.children.length);
  }

  addChildAt(child, index) {
    if (index >= 0 && index <= this.children.length) {
      if (child.parent) {
        child.parent.removeChild(child);
      }
      child.parent = this;
      this.children.splice(index, 0, child);
      return child;
    }
    throw new Error(
      child +
        'addChildAt: The index ' +
        index +
        ' supplied is out of bounds ' +
        this.children.length
    );
  }

  swapChildren(child, child2) {
    if (child === child2) {
      return;
    }
    const index1 = this.getChildIndex(child);
    const index2 = this.getChildIndex(child2);
    if (index1 < 0 || index2 < 0) {
      throw new Error(
        'swapChildren: Both the supplied DisplayObjects must be a child of the caller.'
      );
    }
    this.children[index1] = child2;
    this.children[index2] = child;
  }

  getChildIndex(child) {
    const index = this.children.indexOf(child);
    if (index === -1) {
      throw new Error('The supplied DisplayObject must be a child of the caller');
    }
    return index;
  }

  setChildIndex(child, index) {
    if (index < 0 || index >= this.children.length) {
      throw new Error('The supplied index is out of bounds');
    }
    const currentIndex = this.getChildIndex(child);
    this.children.splice(currentIndex, 1); // remove from old position
    this.children.splice(index, 0, child); // add at new position
  }

  getChildAt(index) {
    if (index < 0 || index >= this.children.length) {
      throw new Error(
        'getChildAt: Supplied index ' +
          index +
          ' does not exist in the child list, or the supplied DisplayObject must be a child of the caller'
      );
    }
    return this.children[index];
  }

  removeChild(child) {
    const index = this.children.indexOf(child);
    if (index === -1) {
      return null;
    }
    return this.removeChildAt(index);
  }

  removeChildAt(index) {
    const child = this.getChildAt(index);
    if (child) {
      child.parent = undefined;
      this.children.splice(index, 1);
    }
    return child;
  }

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

  updateTransform(parent) {
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
    // this.worldPosition.set(wt.tx, wt.ty);
    this.worldScale.set(
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

  getBounds(targetCoordinateSpace) {
    const isTargetCoordinateSpaceDisplayObject =
      targetCoordinateSpace && targetCoordinateSpace.contains !== undefined;
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

  getLocalBounds() {
    return this.getBounds(this);
  }

  contains(child) {
    if (!child) {
      return false;
    }
    if (child === this) {
      return true;
    }
    return this.contains(child.parent);
  }

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

  preUpdate() {
    // override
  }

  update() {
    // override
  }

  postUpdate() {
    // override
  }

  generateTexture() {
    // TODO
    console.warn('display_object.generateTexture() is not implemented');
  }

  toGlobal(position) {
    this.updateTransform();
    return this.worldTransform.apply(position);
  }

  toLocal(position, from) {
    if (from) {
      position = from.toGlobal(position);
    }
    this.updateTransform();
    return this.worldTransform.applyInverse(position);
  }

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

  generateCachedSprite() {
    // TODO
  }

  destroyCachedSprite() {
    if (!this._cachedSprite) {
      return;
    }
    this._cachedSprite.texture.destroy(true);
    this._cachedSprite = null;
  }

  // GETTER SETTER

  get width() {
    return this.getLocalBounds().width * this.scale.x;
  }

  set width(value) {
    const width = this.getLocalBounds().width;
    if (width !== 0) {
      this.scale.x = value / width;
    } else {
      this.scale.x = 1;
    }
    this._width = value;
  }

  get height() {
    return this.getLocalBounds().height * this.scale.y;
  }

  set height(value) {
    const height = this.getLocalBounds().height;
    if (height !== 0) {
      this.scale.y = value / height;
    } else {
      this.scale.y = 1;
    }
    this._height = value;
  }

  get x() {
    return this.position.x;
  }

  set x(value) {
    this.position.x = value;
  }

  get y() {
    return this.position.y;
  }

  set y(value) {
    this.position.y = value;
  }

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

  get mask() {
    return this._mask;
  }

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

  get offsetX() {
    return this.anchor.x * this.width;
  }

  get offsetY() {
    return this.anchor.y * this.height;
  }

  get centerX() {
    return this.x - this.offsetX + this.width * 0.5;
  }

  set centerX(value) {
    this.x = value + this.offsetX - this.width * 0.5;
  }

  get centerY() {
    return this.y - this.offsetY + this.height * 0.5;
  }

  set centerY(value) {
    this.y = value + this.offsetY - this.height * 0.5;
  }

  get left() {
    return this.x - this.offsetX;
  }

  set left(value) {
    this.x = value + this.offsetX;
  }

  get right() {
    return this.x + this.width - this.offsetX;
  }

  set right(value) {
    this.x = value - this.width + this.offsetX;
  }

  get top() {
    return this.y - this.offsetY;
  }

  set top(value) {
    this.y = value + this.offsetY;
  }

  get bottom() {
    return this.y + this.height - this.offsetY;
  }

  set bottom(value) {
    this.y = value - this.height + this.offsetY;
  }
}
