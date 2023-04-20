import { Point } from './point';
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
} from './util/rectangle';
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
} from '../core/const';

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
   *
   * @param dx
   * @param dy
   */
  offset(dx, dy) {
    this.x += dx;
    this.y += dy;
    return this;
  }

  /**
   *
   * @param point
   */
  offsetPoint(point) {
    return this.offset(point.x, point.y);
  }

  /**
   *
   * @param x
   * @param y
   * @param width
   * @param height
   */
  setTo(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    return this;
  }

  /**
   *
   * @param x
   * @param y
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
   *
   * @param x
   * @param y
   */
  centerOn(x, y) {
    this.centerX = x;
    this.centerY = y;
    return this;
  }

  /**
   *
   */
  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
  }

  /**
   *
   */
  floorAll() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
  }

  /**
   *
   */
  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
  }

  /**
   *
   */
  ceilAll() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
  }

  /**
   *
   * @param source
   */
  copyFrom(source) {
    return this.setTo(source.x, source.y, source.width, source.height);
  }

  /**
   *
   * @param dest
   */
  copyTo(dest) {
    dest.x = this.x;
    dest.y = this.y;
    dest.width = this.width;
    dest.height = this.height;
    return dest;
  }

  /**
   *
   * @param dx
   * @param dy
   */
  inflate(dx, dy) {
    return inflate(this, dx, dy);
  }

  /**
   *
   * @param output
   */
  size(output) {
    return size(this, output);
  }

  /**
   *
   * @param width
   * @param height
   */
  resize(width, height) {
    this.width = width;
    this.height = height;
    return this;
  }

  /**
   *
   * @param output
   */
  clone(output) {
    return clone(this, output);
  }

  /**
   *
   * @param x
   * @param y
   */
  contains(x, y) {
    return contains(this, x, y);
  }

  /**
   *
   * @param b
   */
  containsRect(b) {
    return containsRect(b, this);
  }

  /**
   *
   * @param b
   */
  equals(b) {
    return equals(this, b);
  }

  /**
   *
   * @param b
   * @param out
   */
  intersection(b, out) {
    return intersection(this, b, out);
  }

  /**
   *
   * @param b
   */
  intersects(b) {
    return intersects(this, b);
  }

  /**
   *
   * @param left
   * @param right
   * @param top
   * @param bottom
   * @param tolerance
   */
  intersectsRaw(left, right, top, bottom, tolerance) {
    return intersectsRaw(this, left, right, top, bottom, tolerance);
  }

  /**
   *
   * @param b
   * @param out
   */
  union(b, out) {
    return union(this, b, out);
  }

  /**
   *
   * @param output
   */
  random(output = null) {
    const result = output || new Point();
    result.x = this.randomX;
    result.y = this.randomY;
    return result;
  }

  /**
   *
   * @param position
   * @param output
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
   *
   */
  toString() {
    return (
      '[{Rectangle (x=' +
      this.x +
      ' y=' +
      this.y +
      ' width=' +
      this.width +
      ' height=' +
      this.height +
      ' empty=' +
      this.empty +
      ')}]'
    );
  }

  /**
   *
   */
  get halfWidth() {
    return Math.round(this.width / 2);
  }

  /**
   *
   */
  get halfHeight() {
    return Math.round(this.height / 2);
  }

  /**
   *
   */
  get top() {
    return this.y;
  }

  /**
   *
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
   *
   */
  get topLeft() {
    return new Point(this.x, this.y);
  }

  /**
   *
   */
  set topLeft(value) {
    this.x = value.x;
    this.y = value.y;
  }

  /**
   *
   */
  get topRight() {
    return new Point(this.x + this.width, this.y);
  }

  /**
   *
   */
  set topRight(value) {
    this.right = value.x;
    this.y = value.y;
  }

  /**
   *
   */
  get bottom() {
    return this.y + this.height;
  }

  /**
   *
   */
  set bottom(value) {
    if (value <= this.y) {
      this.height = 0;
    } else {
      this.height = value - this.y;
    }
  }

  /**
   *
   */
  get bottomLeft() {
    return new Point(this.x, this.bottom);
  }

  /**
   *
   */
  set bottomLeft(value) {
    this.x = value.x;
    this.bottom = value.y;
  }

  /**
   *
   */
  get bottomRight() {
    return new Point(this.right, this.bottom);
  }

  /**
   *
   */
  set bottomRight(value) {
    this.right = value.x;
    this.bottom = value.y;
  }

  /**
   *
   */
  get left() {
    return this.x;
  }

  /**
   *
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
   *
   */
  get right() {
    return this.x + this.width;
  }

  /**
   *
   */
  set right(value) {
    if (value <= this.x) {
      this.width = 0;
    } else {
      this.width = value - this.x;
    }
  }

  /**
   *
   */
  get volume() {
    return this.width * this.height;
  }

  /**
   *
   */
  get perimeter() {
    return this.width * 2 + this.height * 2;
  }

  /**
   *
   */
  get centerX() {
    return this.x + this.halfWidth;
  }

  /**
   *
   */
  set centerX(value) {
    this.x = value - this.halfWidth;
  }

  /**
   *
   */
  get centerY() {
    return this.y + this.halfHeight;
  }

  /**
   *
   */
  set centerY(value) {
    this.y = value - this.halfHeight;
  }

  /**
   *
   */
  get randomX() {
    return this.x + Math.random() * this.width;
  }

  /**
   *
   */
  get randomY() {
    return this.y + Math.random() * this.height;
  }

  /**
   *
   */
  get empty() {
    return !this.width || !this.height;
  }

  /**
   *
   */
  set empty(value) {
    if (value === true) {
      this.setTo(0, 0, 0, 0);
    }
  }
}
