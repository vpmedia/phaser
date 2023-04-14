/**
 * @module geom/rectangle
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 */
import Point from './point';
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

export default class {
  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = GEOM_RECTANGLE;
  }

  offset(dx, dy) {
    this.x += dx;
    this.y += dy;
    return this;
  }

  offsetPoint(point) {
    return this.offset(point.x, point.y);
  }

  setTo(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    return this;
  }

  scale(x, y) {
    if (y === undefined) {
      y = x;
    }
    this.width *= x;
    this.height *= y;
    return this;
  }

  centerOn(x, y) {
    this.centerX = x;
    this.centerY = y;
    return this;
  }

  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
  }

  floorAll() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
  }

  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
  }

  ceilAll() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
  }

  copyFrom(source) {
    return this.setTo(source.x, source.y, source.width, source.height);
  }

  copyTo(dest) {
    dest.x = this.x;
    dest.y = this.y;
    dest.width = this.width;
    dest.height = this.height;
    return dest;
  }

  inflate(dx, dy) {
    return inflate(this, dx, dy);
  }

  size(output) {
    return size(this, output);
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
    return this;
  }

  clone(output) {
    return clone(this, output);
  }

  contains(x, y) {
    return contains(this, x, y);
  }

  containsRect(b) {
    return containsRect(b, this);
  }

  equals(b) {
    return equals(this, b);
  }

  intersection(b, out) {
    return intersection(this, b, out);
  }

  intersects(b) {
    return intersects(this, b);
  }

  intersectsRaw(left, right, top, bottom, tolerance) {
    return intersectsRaw(this, left, right, top, bottom, tolerance);
  }

  union(b, out) {
    return union(this, b, out);
  }

  random(output = null) {
    const result = output || new Point();
    result.x = this.randomX;
    result.y = this.randomY;
    return result;
  }

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

  get halfWidth() {
    return Math.round(this.width / 2);
  }

  get halfHeight() {
    return Math.round(this.height / 2);
  }

  get top() {
    return this.y;
  }

  set top(value) {
    if (value >= this.bottom) {
      this.height = 0;
      this.y = value;
    } else {
      this.height = this.bottom - value;
    }
  }

  get topLeft() {
    return new Point(this.x, this.y);
  }

  set topLeft(value) {
    this.x = value.x;
    this.y = value.y;
  }

  get topRight() {
    return new Point(this.x + this.width, this.y);
  }

  set topRight(value) {
    this.right = value.x;
    this.y = value.y;
  }

  get bottom() {
    return this.y + this.height;
  }

  set bottom(value) {
    if (value <= this.y) {
      this.height = 0;
    } else {
      this.height = value - this.y;
    }
  }

  get bottomLeft() {
    return new Point(this.x, this.bottom);
  }

  set bottomLeft(value) {
    this.x = value.x;
    this.bottom = value.y;
  }

  get bottomRight() {
    return new Point(this.right, this.bottom);
  }

  set bottomRight(value) {
    this.right = value.x;
    this.bottom = value.y;
  }

  get left() {
    return this.x;
  }

  set left(value) {
    if (value >= this.right) {
      this.width = 0;
    } else {
      this.width = this.right - value;
    }
    this.x = value;
  }

  get right() {
    return this.x + this.width;
  }

  set right(value) {
    if (value <= this.x) {
      this.width = 0;
    } else {
      this.width = value - this.x;
    }
  }

  get volume() {
    return this.width * this.height;
  }

  get perimeter() {
    return this.width * 2 + this.height * 2;
  }

  get centerX() {
    return this.x + this.halfWidth;
  }

  set centerX(value) {
    this.x = value - this.halfWidth;
  }

  get centerY() {
    return this.y + this.halfHeight;
  }

  set centerY(value) {
    this.y = value - this.halfHeight;
  }

  get randomX() {
    return this.x + Math.random() * this.width;
  }

  get randomY() {
    return this.y + Math.random() * this.height;
  }

  get empty() {
    return !this.width || !this.height;
  }

  set empty(value) {
    if (value === true) {
      this.setTo(0, 0, 0, 0);
    }
  }
}
