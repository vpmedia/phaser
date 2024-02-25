import { Point } from './point.js';
import {
  inflate,
  size,
  clone,
  contains,
  containsRect,
  equals,
  intersects,
  intersection,
  intersectsRaw,
  union,
} from './util/rectangle.js';
import {
  GEOM_RECTANGLE,
  TOP_LEFT,
  TOP_CENTER,
  TOP_RIGHT,
  LEFT_CENTER,
  CENTER,
  RIGHT_CENTER,
  BOTTOM_LEFT,
  BOTTOM_CENTER,
  BOTTOM_RIGHT,
} from '../core/const.js';

export class Rectangle {
  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param {number} width - TBD.
   * @param {number} height - TBD.
   */
  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = GEOM_RECTANGLE;
  }

  /**
   * TBD.
   * @param {number} dx - TBD.
   * @param {number} dy - TBD.
   * @returns {Rectangle} TBD.
   */
  offset(dx, dy) {
    this.x += dx;
    this.y += dy;
    return this;
  }

  /**
   * TBD.
   * @param {Point} point - TBD.
   * @returns {Rectangle} TBD.
   */
  offsetPoint(point) {
    return this.offset(point.x, point.y);
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param {number} width - TBD.
   * @param {number} height - TBD.
   * @returns {Rectangle} TBD.
   */
  setTo(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    return this;
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @returns {Rectangle} TBD.
   */
  scale(x, y) {
    if (y === undefined) {
      y = x;
    }
    this.width *= x;
    this.height *= y;
    return this;
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @returns {Rectangle} TBD.
   */
  centerOn(x, y) {
    this.centerX = x;
    this.centerY = y;
    return this;
  }

  /**
   * TBD.
   */
  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
  }

  /**
   * TBD.
   */
  floorAll() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
  }

  /**
   * TBD.
   */
  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
  }

  /**
   * TBD.
   */
  ceilAll() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
  }

  /**
   * TBD.
   * @param {Rectangle} source - TBD.
   * @returns {Rectangle} TBD.
   */
  copyFrom(source) {
    return this.setTo(source.x, source.y, source.width, source.height);
  }

  /**
   * TBD.
   * @param {Rectangle} dest - TBD.
   * @returns {Rectangle} TBD.
   */
  copyTo(dest) {
    dest.x = this.x;
    dest.y = this.y;
    dest.width = this.width;
    dest.height = this.height;
    return dest;
  }

  /**
   * TBD.
   * @param {number} dx - TBD.
   * @param {number} dy - TBD.
   * @returns {Rectangle} TBD.
   */
  inflate(dx, dy) {
    return inflate(this, dx, dy);
  }

  /**
   * TBD.
   * @param {Point} output - TBD.
   * @returns {Point} TBD.
   */
  size(output) {
    return size(this, output);
  }

  /**
   * TBD.
   * @param {number} width - TBD.
   * @param {number} height - TBD.
   * @returns {Rectangle} TBD.
   */
  resize(width, height) {
    this.width = width;
    this.height = height;
    return this;
  }

  /**
   * TBD.
   * @param {Rectangle} output - TBD.
   * @returns {Rectangle} TBD.
   */
  clone(output) {
    return clone(this, output);
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @returns {boolean} TBD.
   */
  contains(x, y) {
    return contains(this, x, y);
  }

  /**
   * TBD.
   * @param {Rectangle} b - TBD.
   * @returns {boolean} TBD.
   */
  containsRect(b) {
    return containsRect(b, this);
  }

  /**
   * TBD.
   * @param {Rectangle} b - TBD.
   * @returns {boolean} TBD.
   */
  equals(b) {
    return equals(this, b);
  }

  /**
   * TBD.
   * @param {Rectangle} b - TBD.
   * @param {Rectangle} out - TBD.
   * @returns {Rectangle} TBD.
   */
  intersection(b, out) {
    return intersection(this, b, out);
  }

  /**
   * TBD.
   * @param {Rectangle} b - TBD.
   * @returns {boolean} TBD.
   */
  intersects(b) {
    return intersects(this, b);
  }

  /**
   * TBD.
   * @param {number} left - TBD.
   * @param {number} right - TBD.
   * @param {number} top - TBD.
   * @param {number} bottom - TBD.
   * @param {number} tolerance - TBD.
   * @returns {boolean} TBD.
   */
  intersectsRaw(left, right, top, bottom, tolerance) {
    return intersectsRaw(this, left, right, top, bottom, tolerance);
  }

  /**
   * TBD.
   * @param {Rectangle} b - TBD.
   * @param {Rectangle} out - TBD.
   * @returns {Rectangle} TBD.
   */
  union(b, out) {
    return union(this, b, out);
  }

  /**
   * TBD.
   * @param {Point} output - TBD.
   * @returns {Point} TBD.
   */
  random(output = null) {
    const result = output || new Point();
    result.x = this.randomX;
    result.y = this.randomY;
    return result;
  }

  /**
   * TBD.
   * @param {number} position - TBD.
   * @param {Point} output - TBD.
   * @returns {Point} TBD.
   */
  getPoint(position, output = null) {
    const result = output || new Point();
    switch (position) {
      case TOP_LEFT:
        return result.set(this.x, this.y);
      case TOP_CENTER:
        return result.set(this.centerX, this.y);
      case TOP_RIGHT:
        return result.set(this.right, this.y);
      case LEFT_CENTER:
        return result.set(this.x, this.centerY);
      case CENTER:
        return result.set(this.centerX, this.centerY);
      case RIGHT_CENTER:
        return result.set(this.right, this.centerY);
      case BOTTOM_LEFT:
        return result.set(this.x, this.bottom);
      case BOTTOM_CENTER:
        return result.set(this.centerX, this.bottom);
      case BOTTOM_RIGHT:
        return result.set(this.right, this.bottom);
      default:
        return result.set(this.x, this.y);
    }
  }

  /**
   * TBD.
   * @returns {string} TBD.
   */
  toString() {
    return (
      `[{Rectangle (x=${ 
      this.x 
      } y=${ 
      this.y 
      } width=${ 
      this.width 
      } height=${ 
      this.height 
      } empty=${ 
      this.empty 
      })}]`
    );
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get halfWidth() {
    return Math.round(this.width / 2);
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get halfHeight() {
    return Math.round(this.height / 2);
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get top() {
    return this.y;
  }

  /**
   * TBD.
   */
  set top(value) {
    if (value >= this.bottom) {
      this.height = 0;
      this.y = value;
    } else {
      this.height = this.bottom - value;
    }
  }

  /**
   * TBD.
   * @returns {Point} TBD.
   */
  get topLeft() {
    return new Point(this.x, this.y);
  }

  /**
   * TBD.
   */
  set topLeft(value) {
    this.x = value.x;
    this.y = value.y;
  }

  /**
   * TBD.
   * @returns {Point} TBD.
   */
  get topRight() {
    return new Point(this.x + this.width, this.y);
  }

  /**
   * TBD.
   */
  set topRight(value) {
    this.right = value.x;
    this.y = value.y;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get bottom() {
    return this.y + this.height;
  }

  /**
   * TBD.
   */
  set bottom(value) {
    if (value <= this.y) {
      this.height = 0;
    } else {
      this.height = value - this.y;
    }
  }

  /**
   * TBD.
   * @returns {Point} TBD.
   */
  get bottomLeft() {
    return new Point(this.x, this.bottom);
  }

  /**
   * TBD.
   */
  set bottomLeft(value) {
    this.x = value.x;
    this.bottom = value.y;
  }

  /**
   * TBD.
   * @returns {Point} TBD.
   */
  get bottomRight() {
    return new Point(this.right, this.bottom);
  }

  /**
   * TBD.
   */
  set bottomRight(value) {
    this.right = value.x;
    this.bottom = value.y;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get left() {
    return this.x;
  }

  /**
   * TBD.
   */
  set left(value) {
    if (value >= this.right) {
      this.width = 0;
    } else {
      this.width = this.right - value;
    }
    this.x = value;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get right() {
    return this.x + this.width;
  }

  /**
   * TBD.
   */
  set right(value) {
    if (value <= this.x) {
      this.width = 0;
    } else {
      this.width = value - this.x;
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get volume() {
    return this.width * this.height;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get perimeter() {
    return this.width * 2 + this.height * 2;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get centerX() {
    return this.x + this.halfWidth;
  }

  /**
   * TBD.
   */
  set centerX(value) {
    this.x = value - this.halfWidth;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get centerY() {
    return this.y + this.halfHeight;
  }

  /**
   * TBD.
   */
  set centerY(value) {
    this.y = value - this.halfHeight;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get randomX() {
    return this.x + Math.random() * this.width;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get randomY() {
    return this.y + Math.random() * this.height;
  }

  /**
   * TBD.
   * @returns {boolean} TBD.
   */
  get empty() {
    return !this.width || !this.height;
  }

  /**
   * TBD.
   */
  set empty(value) {
    if (value === true) {
      this.setTo(0, 0, 0, 0);
    }
  }
}
