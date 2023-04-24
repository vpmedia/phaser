import { DisplayObject } from './display_object';
import { Image } from './image';
import { Rectangle } from '../geom/rectangle';
import { RoundedRectangle } from '../geom/rounded_rectangle';
import { Polygon } from '../geom/polygon';
import { Circle } from '../geom/circle';
import { Ellipse } from '../geom/ellipse';
import { Point } from '../geom/point';
import { GraphicsData } from './graphics_data';
import { CanvasBuffer } from './canvas/buffer';
import { textureFromCanvas } from './webgl/texture_util';
import { renderGraphics as renderCanvasGraphics } from './canvas/graphics';
import { renderGraphics as renderWebGLGraphics } from './webgl/graphics';
import { renderCanvas as renderSpriteCanvas, renderWebGL as renderSpriteWebGL } from './sprite_util';
import { getEmptyRectangle } from '../geom/util/rectangle';
import { getIdentityMatrix } from '../geom/util/matrix';
import {
  BLEND_NORMAL,
  GRAPHICS,
  GEOM_POLYGON,
  GEOM_CIRCLE,
  GEOM_ELLIPSE,
  GEOM_RECTANGLE,
  GEOM_ROUNDED_RECTANGLE,
} from '../core/const';

export class Graphics extends DisplayObject {
  /**
   * TBD.
   * @param {Game} game - TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   */
  constructor(game, x = 0, y = 0) {
    super();
    this.game = game;
    this.type = GRAPHICS;
    this.position.set(x, y);
    this.renderable = true;
    this.fillAlpha = 1;
    this.lineWidth = 0;
    this.lineColor = 0;
    this.graphicsData = [];
    this.tint = 0xffffff;
    this.blendMode = BLEND_NORMAL;
    this.currentPath = null;
    this._webGL = [];
    this.isMask = false;
    this.boundsPadding = 0;
    this._localBounds = new Rectangle(0, 0, 1, 1);
    this.dirty = true;
    this._boundsDirty = false;
    this._cacheAsBitmap = false;
    this.webGLDirty = false;
    this.cachedSpriteDirty = false;
  }

  /**
   * TBD.
   */
  destroy() {
    // TODO
    this.clear();
    super.destroy();
  }

  /**
   * TBD.
   * @param {number} lineWidth - TBD.
   * @param {number} color - TBD.
   * @param {number} alpha - TBD.
   * @returns {Graphics} TBD.
   */
  lineStyle(lineWidth = 0, color = 0, alpha = 1) {
    this.lineWidth = lineWidth || 0;
    this.lineColor = color || 0;
    this.lineAlpha = alpha === undefined ? 1 : alpha;
    if (this.currentPath) {
      if (this.currentPath.shape.points.length) {
        // halfway through a line? start a new one!
        this.drawShape(new Polygon(this.currentPath.shape.points.slice(-2)));
      } else {
        // otherwise its empty so lets just set the line properties
        this.currentPath.lineWidth = this.lineWidth;
        this.currentPath.lineColor = this.lineColor;
        this.currentPath.lineAlpha = this.lineAlpha;
      }
    }
    return this;
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @returns {Graphics} TBD.
   */
  moveTo(x, y) {
    this.drawShape(new Polygon([x, y]));
    return this;
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @returns {Graphics} TBD.
   */
  lineTo(x, y) {
    if (!this.currentPath) {
      this.moveTo(0, 0);
    }
    this.currentPath.shape.points.push(x, y);
    this.dirty = true;
    this._boundsDirty = true;
    return this;
  }

  /**
   * TBD.
   * @param {number} cpX - TBD.
   * @param {number} cpY - TBD.
   * @param {number} toX - TBD.
   * @param {number} toY - TBD.
   * @returns {Graphics} TBD.
   */
  quadraticCurveTo(cpX, cpY, toX, toY) {
    if (this.currentPath) {
      if (this.currentPath.shape.points.length === 0) {
        this.currentPath.shape.points = [0, 0];
      }
    } else {
      this.moveTo(0, 0);
    }
    let xa;
    let ya;
    const n = 20;
    const points = this.currentPath.shape.points;
    if (points.length === 0) {
      this.moveTo(0, 0);
    }
    const fromX = points[points.length - 2];
    const fromY = points[points.length - 1];
    let j = 0;
    for (let i = 1; i <= n; i += 1) {
      j = i / n;
      xa = fromX + (cpX - fromX) * j;
      ya = fromY + (cpY - fromY) * j;
      points.push(xa + (cpX + (toX - cpX) * j - xa) * j, ya + (cpY + (toY - cpY) * j - ya) * j);
    }
    this.dirty = true;
    this._boundsDirty = true;
    return this;
  }

  /**
   * TBD.
   * @param {number} cpX - TBD.
   * @param {number} cpY - TBD.
   * @param {number} cpX2 - TBD.
   * @param {number} cpY2 - TBD.
   * @param {number} toX - TBD.
   * @param {number} toY - TBD.
   * @returns {Graphics} TBD.
   */
  bezierCurveTo(cpX, cpY, cpX2, cpY2, toX, toY) {
    if (this.currentPath) {
      if (this.currentPath.shape.points.length === 0) {
        this.currentPath.shape.points = [0, 0];
      }
    } else {
      this.moveTo(0, 0);
    }
    const n = 20;
    let dt;
    let dt2;
    let dt3;
    let t2;
    let t3;
    const points = this.currentPath.shape.points;
    const fromX = points[points.length - 2];
    const fromY = points[points.length - 1];
    let j = 0;
    for (let i = 1; i <= n; i += 1) {
      j = i / n;
      dt = 1 - j;
      dt2 = dt * dt;
      dt3 = dt2 * dt;
      t2 = j * j;
      t3 = t2 * j;
      points.push(
        dt3 * fromX + 3 * dt2 * j * cpX + 3 * dt * t2 * cpX2 + t3 * toX,
        dt3 * fromY + 3 * dt2 * j * cpY + 3 * dt * t2 * cpY2 + t3 * toY
      );
    }
    this.dirty = true;
    this._boundsDirty = true;
    return this;
  }

  /**
   * TBD.
   * @param {number} x1 - TBD.
   * @param {number} y1 - TBD.
   * @param {number} x2 - TBD.
   * @param {number} y2 - TBD.
   * @param {number} radius - TBD.
   * @returns {Graphics} TBD.
   */
  arcTo(x1, y1, x2, y2, radius) {
    if (this.currentPath) {
      if (this.currentPath.shape.points.length === 0) {
        this.currentPath.shape.points.push(x1, y1);
      }
    } else {
      this.moveTo(x1, y1);
    }
    const points = this.currentPath.shape.points;
    const fromX = points[points.length - 2];
    const fromY = points[points.length - 1];
    const a1 = fromY - y1;
    const b1 = fromX - x1;
    const a2 = y2 - y1;
    const b2 = x2 - x1;
    const mm = Math.abs(a1 * b2 - b1 * a2);
    if (mm < 1.0e-8 || radius === 0) {
      if (points[points.length - 2] !== x1 || points[points.length - 1] !== y1) {
        points.push(x1, y1);
      }
    } else {
      const dd = a1 * a1 + b1 * b1;
      const cc = a2 * a2 + b2 * b2;
      const tt = a1 * a2 + b1 * b2;
      const k1 = (radius * Math.sqrt(dd)) / mm;
      const k2 = (radius * Math.sqrt(cc)) / mm;
      const j1 = (k1 * tt) / dd;
      const j2 = (k2 * tt) / cc;
      const cx = k1 * b2 + k2 * b1;
      const cy = k1 * a2 + k2 * a1;
      const px = b1 * (k2 + j1);
      const py = a1 * (k2 + j1);
      const qx = b2 * (k1 + j2);
      const qy = a2 * (k1 + j2);
      const startAngle = Math.atan2(py - cy, px - cx);
      const endAngle = Math.atan2(qy - cy, qx - cx);
      this.arc(cx + x1, cy + y1, radius, startAngle, endAngle, b1 * a2 > b2 * a1);
    }
    this.dirty = true;
    this._boundsDirty = true;
    return this;
  }

  /**
   * TBD.
   * @param {number} cx - TBD.
   * @param {number} cy - TBD.
   * @param {number} radius - TBD.
   * @param {number} startAngle - TBD.
   * @param {number} endAngle - TBD.
   * @param {boolean} anticlockwise - TBD.
   * @param {number} segments - TBD.
   * @returns {Graphics} TBD.
   */
  arc(cx, cy, radius, startAngle, endAngle, anticlockwise = false, segments = 40) {
    //  If we do this we can never draw a full circle
    if (startAngle === endAngle) {
      return this;
    }
    if (!anticlockwise && endAngle <= startAngle) {
      endAngle += Math.PI * 2;
    } else if (anticlockwise && startAngle <= endAngle) {
      startAngle += Math.PI * 2;
    }
    const sweep = anticlockwise ? (startAngle - endAngle) * -1 : endAngle - startAngle;
    const segs = Math.ceil(Math.abs(sweep) / (Math.PI * 2)) * segments;
    //  Sweep check - moved here because we don't want to do the moveTo below if the arc fails
    if (sweep === 0) {
      return this;
    }
    const startX = cx + Math.cos(startAngle) * radius;
    const startY = cy + Math.sin(startAngle) * radius;
    if (anticlockwise && this.filling) {
      this.moveTo(cx, cy);
    } else {
      this.moveTo(startX, startY);
    }
    //  currentPath will always exist after calling a moveTo
    const points = this.currentPath.shape.points;
    const theta = sweep / (segs * 2);
    const theta2 = theta * 2;
    const cTheta = Math.cos(theta);
    const sTheta = Math.sin(theta);
    const segMinus = segs - 1;
    const remainder = (segMinus % 1) / segMinus;
    for (let i = 0; i <= segMinus; i += 1) {
      const real = i + remainder * i;
      const angle = theta + startAngle + theta2 * real;
      const c = Math.cos(angle);
      const s = -Math.sin(angle);
      points.push((cTheta * c + sTheta * s) * radius + cx, (cTheta * -s + sTheta * c) * radius + cy);
    }
    this.dirty = true;
    this._boundsDirty = true;
    return this;
  }

  /**
   * TBD.
   * @param {number} color - TBD.
   * @param {number} alpha - TBD.
   * @returns {Graphics} TBD.
   */
  beginFill(color = 0, alpha = 1) {
    this.filling = true;
    this.fillColor = color || 0;
    this.fillAlpha = alpha === undefined ? 1 : alpha;
    if (this.currentPath) {
      if (this.currentPath.shape.points.length <= 2) {
        this.currentPath.fill = this.filling;
        this.currentPath.fillColor = this.fillColor;
        this.currentPath.fillAlpha = this.fillAlpha;
      }
    }
    return this;
  }

  /**
   * TBD.
   * @returns {Graphics} TBD.
   */
  endFill() {
    this.filling = false;
    this.fillColor = null;
    this.fillAlpha = 1;
    return this;
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param {number} width - TBD.
   * @param {number} height - TBD.
   * @returns {Graphics} TBD.
   */
  drawRect(x, y, width, height) {
    this.drawShape(new Rectangle(x, y, width, height));
    return this;
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param {number} width - TBD.
   * @param {number} height - TBD.
   * @param {number} radius - TBD.
   * @returns {Graphics} TBD.
   */
  drawRoundedRect(x, y, width, height, radius) {
    this.drawShape(new RoundedRectangle(x, y, width, height, radius));
    return this;
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param {number} diameter - TBD.
   * @returns {Graphics} TBD.
   */
  drawCircle(x, y, diameter) {
    this.drawShape(new Circle(x, y, diameter));
    return this;
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param {number} width - TBD.
   * @param {number} height - TBD.
   * @returns {Graphics} TBD.
   */
  drawEllipse(x, y, width, height) {
    this.drawShape(new Ellipse(x, y, width, height));
    return this;
  }

  /**
   * TBD.
   * @param {Polygon} path - TBD.
   * @returns {Graphics} TBD.
   */
  drawPolygon(path) {
    let points;
    if (path instanceof Polygon) {
      points = path.points;
    } else {
      points = path;
    }
    // TODO
    /*
    if (!Array.isArray(points)) {
      points = new Array(arguments.length);
      for (let i = 0; i < points.length; i += 1) {
        points[i] = arguments[i];
      }
    }
    */
    this.drawShape(new Polygon(points));
    return this;
  }

  /**
   * TBD.
   * @returns {Graphics} TBD.
   */
  clear() {
    this.lineWidth = 0;
    this.filling = false;
    this.dirty = true;
    this._boundsDirty = true;
    this.clearDirty = true;
    this.graphicsData = [];
    this.updateLocalBounds();
    return this;
  }

  /**
   * TBD.
   */
  generateTexture() {
    // TODO
    console.warn('graphics.generateTexture() is not implemented');
  }

  /**
   * TBD.
   * @param {object} renderSession - TBD.
   */
  renderWebGL(renderSession) {
    // if the sprite is not visible or the alpha is 0 then no need to render this element
    if (this.visible === false || this.alpha === 0 || this.isMask === true) {
      return;
    }
    if (this._cacheAsBitmap) {
      if (this.dirty || this.cachedSpriteDirty) {
        this.generateCachedSprite();
        // we will also need to update the texture on the gpu too!
        this.updateCachedSpriteTexture();
        this.cachedSpriteDirty = false;
        this.dirty = false;
      }
      this._cachedSprite.worldAlpha = this.worldAlpha;
      renderSpriteWebGL.call(this._cachedSprite, renderSession);
    } else {
      renderSession.spriteBatch.stop();
      renderSession.blendModeManager.setBlendMode(this.blendMode);
      if (this._mask) {
        renderSession.maskManager.pushMask(this._mask, renderSession);
      }
      if (this._filters) {
        renderSession.filterManager.pushFilter(this._filterBlock);
      }
      // check blend mode
      if (this.blendMode !== renderSession.spriteBatch.currentBlendMode) {
        renderSession.spriteBatch.currentBlendMode = this.blendMode;
        const blendModeWebGL = window.PhaserRegistry.blendModesWebGL[renderSession.spriteBatch.currentBlendMode];
        renderSession.spriteBatch.gl.blendFunc(blendModeWebGL[0], blendModeWebGL[1]);
      }
      // check if the webgl graphic needs to be updated
      if (this.webGLDirty) {
        this.dirty = true;
        this.webGLDirty = false;
      }
      renderWebGLGraphics(this, renderSession);
      // only render if it has children!
      if (this.children.length) {
        renderSession.spriteBatch.start();
        // simple render children!
        for (let i = 0; i < this.children.length; i += 1) {
          this.children[i].renderWebGL(renderSession);
        }
        renderSession.spriteBatch.stop();
      }
      if (this._filters) {
        renderSession.filterManager.popFilter();
      }
      if (this._mask) {
        renderSession.maskManager.popMask(this.mask, renderSession);
      }
      renderSession.drawCount += 1;
      renderSession.spriteBatch.start();
    }
  }

  /**
   * TBD.
   * @param {object} renderSession - TBD.
   */
  renderCanvas(renderSession) {
    // if the sprite is not visible or the alpha is 0 then no need to render this element
    if (this.visible === false || this.alpha === 0 || this.isMask === true) {
      return;
    }
    // if the tint has changed, set the graphics object to dirty.
    if (this._prevTint !== this.tint) {
      this.dirty = true;
      this._prevTint = this.tint;
    }
    if (this._cacheAsBitmap) {
      if (this.dirty || this.cachedSpriteDirty) {
        this.generateCachedSprite();
        // we will also need to update the texture
        this.updateCachedSpriteTexture();
        this.cachedSpriteDirty = false;
        this.dirty = false;
      }
      this._cachedSprite.alpha = this.alpha;
      renderSpriteCanvas(this._cachedSprite, renderSession);
    } else {
      const context = renderSession.context;
      const transform = this.worldTransform;
      if (this.blendMode !== renderSession.currentBlendMode) {
        renderSession.currentBlendMode = this.blendMode;
        context.globalCompositeOperation = window.PhaserRegistry.blendModesCanvas[renderSession.currentBlendMode];
      }
      if (this._mask) {
        renderSession.maskManager.pushMask(this._mask, renderSession);
      }
      const resolution = renderSession.resolution;
      const tx = transform.tx * renderSession.resolution + renderSession.shakeX;
      const ty = transform.ty * renderSession.resolution + renderSession.shakeY;
      context.setTransform(
        transform.a * resolution,
        transform.b * resolution,
        transform.c * resolution,
        transform.d * resolution,
        tx,
        ty
      );
      renderCanvasGraphics(this, context);
      // simple render children!
      for (let i = 0; i < this.children.length; i += 1) {
        this.children[i].renderCanvas(renderSession);
      }
      if (this._mask) {
        renderSession.maskManager.popMask(renderSession);
      }
    }
  }

  /**
   * TBD.
   * @param {Matrix} matrix - TBD.
   * @returns {Rectangle} TBD.
   */
  getBounds(matrix = null) {
    if (!this.renderable) {
      return getEmptyRectangle();
    }
    if (this.dirty) {
      this.updateLocalBounds();
      this.webGLDirty = true;
      this.cachedSpriteDirty = true;
      this.dirty = false;
    } else if (this.currentBounds) {
      return this.currentBounds;
    }
    const bounds = this._localBounds;
    const w0 = bounds.x;
    const w1 = bounds.width + bounds.x;
    const h0 = bounds.y;
    const h1 = bounds.height + bounds.y;
    const worldTransform = matrix || this.worldTransform;
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
    let maxX = x1;
    let maxY = y1;
    let minX = x1;
    let minY = y1;
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
    this.cachedBounds.x = minX;
    this.cachedBounds.width = maxX - minX;
    this.cachedBounds.y = minY;
    this.cachedBounds.height = maxY - minY;
    this.currentBounds = this.cachedBounds;
    return this.currentBounds;
  }

  /**
   * TBD.
   * @returns {Rectangle} TBD.
   */
  getLocalBounds() {
    const matrixCache = this.worldTransform;
    this.worldTransform = getIdentityMatrix();
    for (let i = 0; i < this.children.length; i += 1) {
      this.children[i].updateTransform();
    }
    const bounds = this.getBounds();
    this.worldTransform = matrixCache;
    for (let i = 0; i < this.children.length; i += 1) {
      this.children[i].updateTransform();
    }
    return bounds;
  }

  /**
   * TBD.
   * @param {Point} point - TBD.
   * @param {Point} tempPoint - TBD.
   * @returns {boolean} TBD.
   */
  containsPoint(point, tempPoint) {
    this.worldTransform.applyInverse(point, tempPoint);
    const graphicsData = this.graphicsData;
    for (let i = 0; i < graphicsData.length; i += 0) {
      const data = graphicsData[i];
      if (data.fill && data.shape) {
        if (data.shape.contains(tempPoint.x, tempPoint.y)) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * TBD.
   */
  updateLocalBounds() {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    if (this.graphicsData.length) {
      let shape;
      let points;
      let x;
      let y;
      let w;
      let h;
      for (let i = 0; i < this.graphicsData.length; i += 1) {
        const data = this.graphicsData[i];
        const type = data.type;
        const lineWidth = data.lineWidth;
        shape = data.shape;
        if (type === GEOM_RECTANGLE || type === GEOM_ROUNDED_RECTANGLE) {
          x = shape.x - lineWidth / 2;
          y = shape.y - lineWidth / 2;
          w = shape.width + lineWidth;
          h = shape.height + lineWidth;
          minX = x < minX ? x : minX;
          maxX = x + w > maxX ? x + w : maxX;
          minY = y < minY ? y : minY;
          maxY = y + h > maxY ? y + h : maxY;
        } else if (type === GEOM_CIRCLE) {
          x = shape.x;
          y = shape.y;
          w = shape.radius + lineWidth / 2;
          h = shape.radius + lineWidth / 2;
          minX = x - w < minX ? x - w : minX;
          maxX = x + w > maxX ? x + w : maxX;
          minY = y - h < minY ? y - h : minY;
          maxY = y + h > maxY ? y + h : maxY;
        } else if (type === GEOM_ELLIPSE) {
          x = shape.x;
          y = shape.y;
          w = shape.width + lineWidth / 2;
          h = shape.height + lineWidth / 2;
          minX = x - w < minX ? x - w : minX;
          maxX = x + w > maxX ? x + w : maxX;
          minY = y - h < minY ? y - h : minY;
          maxY = y + h > maxY ? y + h : maxY;
        } else {
          // POLY - assumes points are sequential, not Point objects
          points = shape.points;
          for (let j = 0; j < points.length; j += 1) {
            if (points[j] instanceof Point) {
              x = points[j].x;
              y = points[j].y;
            } else {
              x = points[j];
              y = points[j + 1];
              if (j < points.length - 1) {
                j += 1;
              }
            }
            minX = x - lineWidth < minX ? x - lineWidth : minX;
            maxX = x + lineWidth > maxX ? x + lineWidth : maxX;
            minY = y - lineWidth < minY ? y - lineWidth : minY;
            maxY = y + lineWidth > maxY ? y + lineWidth : maxY;
          }
        }
      }
    } else {
      minX = 0;
      maxX = 0;
      minY = 0;
      maxY = 0;
    }
    const padding = this.boundsPadding;
    this._localBounds.x = minX - padding;
    this._localBounds.width = maxX - minX + padding * 2;
    this._localBounds.y = minY - padding;
    this._localBounds.height = maxY - minY + padding * 2;
  }

  /**
   * TBD.
   */
  generateCachedSprite() {
    const bounds = this.getLocalBounds();
    if (!this._cachedSprite) {
      const canvasBuffer = new CanvasBuffer(bounds.width, bounds.height);
      const texture = textureFromCanvas(canvasBuffer.canvas);
      this._cachedSprite = new Image(this.game, 0, 0, texture);
      this._cachedSprite.buffer = canvasBuffer;
      this._cachedSprite.worldTransform = this.worldTransform;
    } else {
      this._cachedSprite.buffer.resize(bounds.width, bounds.height);
    }
    // leverage the anchor to account for the offset of the element
    this._cachedSprite.anchor.x = -(bounds.x / bounds.width);
    this._cachedSprite.anchor.y = -(bounds.y / bounds.height);
    // this._cachedSprite.buffer.context.save();
    this._cachedSprite.buffer.context.translate(-bounds.x, -bounds.y);
    // make sure we set the alpha of the graphics to 1 for the render..
    this.worldAlpha = 1;
    // now render the graphic..
    renderCanvasGraphics(this, this._cachedSprite.buffer.context);
    this._cachedSprite.alpha = this.alpha;
  }

  /**
   * TBD.
   */
  updateCachedSpriteTexture() {
    const cachedSprite = this._cachedSprite;
    const texture = cachedSprite.texture;
    const canvas = cachedSprite.buffer.canvas;
    texture.baseTexture.width = canvas.width;
    texture.baseTexture.height = canvas.height;
    texture.crop.width = canvas.width;
    texture.crop.height = canvas.height;
    texture.frame.width = canvas.width;
    texture.frame.height = canvas.height;
    cachedSprite._width = canvas.width;
    cachedSprite._height = canvas.height;
    // update the dirty base textures
    texture.baseTexture.dirty();
  }

  /**
   * TBD.
   */
  destroyCachedSprite() {
    if (!this._cachedSprite) {
      return;
    }
    this._cachedSprite.texture.destroy(true);
    this._cachedSprite = null;
  }

  /**
   * TBD.
   * @param shape - TBD.
   * @returns {GraphicsData} TBD.
   */
  drawShape(shape) {
    if (this.currentPath) {
      // check current path!
      if (this.currentPath.shape.points.length <= 2) {
        this.graphicsData.pop();
      }
    }
    this.currentPath = null;
    //  Handle mixed-type polygons
    if (shape instanceof Polygon) {
      shape = shape.clone();
      shape.flatten();
    }
    const data = new GraphicsData(
      this.lineWidth,
      this.lineColor,
      this.lineAlpha,
      this.fillColor,
      this.fillAlpha,
      this.filling,
      shape
    );
    this.graphicsData.push(data);
    if (data.type === GEOM_POLYGON) {
      data.shape.closed = this.filling;
      this.currentPath = data;
    }
    this.dirty = true;
    this._boundsDirty = true;
    return data;
  }

  /**
   * TBD.
   */
  postUpdate() {
    if (this._boundsDirty) {
      this.updateLocalBounds();
      this._boundsDirty = false;
    }
    for (let i = 0; i < this.children.length; i += 1) {
      this.children[i].postUpdate();
    }
  }

  /**
   * TBD.
   * @param {Point[]} points - TBD.
   * @param {boolean} cull - TBD.
   */
  drawTriangle(points, cull = false) {
    const triangle = new Polygon(points);
    if (cull) {
      const cameraToFace = new Point(0 - points[0].x, 0 - points[0].y);
      const ab = new Point(points[1].x - points[0].x, points[1].y - points[0].y);
      const cb = new Point(points[1].x - points[2].x, points[1].y - points[2].y);
      const faceNormal = cb.cross(ab);
      if (cameraToFace.dot(faceNormal) > 0) {
        this.drawPolygon(triangle);
      }
    } else {
      this.drawPolygon(triangle);
    }
  }

  /**
   * TBD.
   * @param {number[]|Point[]} vertices - TBD.
   * @param {number[]} indices - TBD.
   * @param {boolean} cull - TBD.
   */
  drawTriangles(vertices, indices, cull = false) {
    const point1 = new Point();
    const point2 = new Point();
    const point3 = new Point();
    let points = [];
    let i;
    if (!indices) {
      if (vertices[0] instanceof Point) {
        for (i = 0; i < vertices.length / 3; i += 1) {
          this.drawTriangle([vertices[i * 3], vertices[i * 3 + 1], vertices[i * 3 + 2]], cull);
        }
      } else {
        for (i = 0; i < vertices.length / 6; i += 1) {
          point1.x = vertices[i * 6 + 0];
          point1.y = vertices[i * 6 + 1];
          point2.x = vertices[i * 6 + 2];
          point2.y = vertices[i * 6 + 3];
          point3.x = vertices[i * 6 + 4];
          point3.y = vertices[i * 6 + 5];
          this.drawTriangle([point1, point2, point3], cull);
        }
      }
    } else if (vertices[0] instanceof Point) {
      for (i = 0; i < indices.length / 3; i += 1) {
        points.push(vertices[indices[i * 3]]);
        points.push(vertices[indices[i * 3 + 1]]);
        points.push(vertices[indices[i * 3 + 2]]);
        if (points.length === 3) {
          this.drawTriangle(points, cull);
          points = [];
        }
      }
    } else {
      for (i = 0; i < indices.length; i += 1) {
        point1.x = vertices[indices[i] * 2];
        point1.y = vertices[indices[i] * 2 + 1];
        points.push(point1.copyTo({}));
        if (points.length === 3) {
          this.drawTriangle(points, cull);
          points = [];
        }
      }
    }
  }
}
