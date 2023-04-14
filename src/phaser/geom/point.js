/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 */
import { distance, rotate, clone } from './util/point';
import { GEOM_POINT } from '../core/const';

export default class {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.type = GEOM_POINT;
  }

  copyFrom(source) {
    return this.setTo(source.x, source.y);
  }

  invert() {
    return this.setTo(this.y, this.x);
  }

  setTo(x, y) {
    this.x = x || 0;
    this.y = y || (y !== 0 ? this.x : 0);
    return this;
  }

  set(x, y) {
    // deprecated, use setTo(x, y)
    this.x = x || 0;
    this.y = y || (y !== 0 ? this.x : 0);
    return this;
  }

  add(x, y) {
    this.x += x;
    this.y += y;
    return this;
  }

  subtract(x, y) {
    this.x -= x;
    this.y -= y;
    return this;
  }

  multiply(x, y) {
    this.x *= x;
    this.y *= y;
    return this;
  }

  divide(x, y) {
    this.x /= x;
    this.y /= y;
    return this;
  }

  clampX(min, max) {
    this.x = Math.max(min, Math.min(max, this.x));
    return this;
  }

  clampY(min, max) {
    this.y = Math.max(min, Math.min(max, this.y));
    return this;
  }

  clamp(min, max) {
    this.x = Math.max(min, Math.min(max, this.x));
    this.y = Math.max(min, Math.min(max, this.y));
    return this;
  }

  clone() {
    return clone(this);
  }

  copyTo(dest) {
    dest.x = this.x;
    dest.y = this.y;
    return dest;
  }

  distance(b) {
    return distance(this, b);
  }

  equals(a) {
    return a.x === this.x && a.y === this.y;
  }

  angle(a, asDegrees = false) {
    if (asDegrees) {
      return (180 / Math.PI) * Math.atan2(a.y - this.y, a.x - this.x);
    }
    return Math.atan2(a.y - this.y, a.x - this.x);
  }

  rotate(x, y, angle, asDegrees, dist) {
    return rotate(this, x, y, angle, asDegrees, dist);
  }

  getMagnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  getMagnitudeSq() {
    return this.x * this.x + this.y * this.y;
  }

  setMagnitude(magnitude) {
    return this.normalize().multiply(magnitude, magnitude);
  }

  normalize() {
    if (!this.isZero()) {
      const m = this.getMagnitude();
      this.x /= m;
      this.y /= m;
    }
    return this;
  }

  isZero() {
    return this.x === 0 && this.y === 0;
  }

  dot(a) {
    return this.x * a.x + this.y * a.y;
  }

  cross(a) {
    return this.x * a.y - this.y * a.x;
  }

  perp() {
    return this.setTo(-this.y, this.x);
  }

  rperp() {
    return this.setTo(this.y, -this.x);
  }

  normalRightHand() {
    return this.setTo(this.y * -1, this.x);
  }

  floor() {
    return this.setTo(Math.floor(this.x), Math.floor(this.y));
  }

  ceil() {
    return this.setTo(Math.ceil(this.x), Math.ceil(this.y));
  }

  toString() {
    return '[{Point (x=' + this.x + ' y=' + this.y + ')}]';
  }
}
