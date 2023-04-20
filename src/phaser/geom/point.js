import { distance, rotate, clone } from './util/point';
import { GEOM_POINT } from '../core/const';

export class Point {
  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.type = GEOM_POINT;
  }

  /**
   * TBD.
   * @param source - TBD.
   */
  copyFrom(source) {
    return this.setTo(source.x, source.y);
  }

  /**
   * TBD.
   */
  invert() {
    return this.setTo(this.y, this.x);
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   */
  setTo(x, y) {
    this.x = x || 0;
    this.y = y || (y !== 0 ? this.x : 0);
    return this;
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   */
  set(x, y) {
    // deprecated, use setTo(x, y)
    this.x = x || 0;
    this.y = y || (y !== 0 ? this.x : 0);
    return this;
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   */
  add(x, y) {
    this.x += x;
    this.y += y;
    return this;
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   */
  subtract(x, y) {
    this.x -= x;
    this.y -= y;
    return this;
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   */
  multiply(x, y) {
    this.x *= x;
    this.y *= y;
    return this;
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   */
  divide(x, y) {
    this.x /= x;
    this.y /= y;
    return this;
  }

  /**
   * TBD.
   * @param min - TBD.
   * @param max - TBD.
   */
  clampX(min, max) {
    this.x = Math.max(min, Math.min(max, this.x));
    return this;
  }

  /**
   * TBD.
   * @param min - TBD.
   * @param max - TBD.
   */
  clampY(min, max) {
    this.y = Math.max(min, Math.min(max, this.y));
    return this;
  }

  /**
   * TBD.
   * @param min - TBD.
   * @param max - TBD.
   */
  clamp(min, max) {
    this.x = Math.max(min, Math.min(max, this.x));
    this.y = Math.max(min, Math.min(max, this.y));
    return this;
  }

  /**
   * TBD.
   */
  clone() {
    return clone(this);
  }

  /**
   * TBD.
   * @param dest - TBD.
   */
  copyTo(dest) {
    dest.x = this.x;
    dest.y = this.y;
    return dest;
  }

  /**
   * TBD.
   * @param b - TBD.
   */
  distance(b) {
    return distance(this, b);
  }

  /**
   * TBD.
   * @param a - TBD.
   */
  equals(a) {
    return a.x === this.x && a.y === this.y;
  }

  /**
   * TBD.
   * @param a - TBD.
   * @param asDegrees - TBD.
   */
  angle(a, asDegrees = false) {
    if (asDegrees) {
      return (180 / Math.PI) * Math.atan2(a.y - this.y, a.x - this.x);
    }
    return Math.atan2(a.y - this.y, a.x - this.x);
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param angle - TBD.
   * @param asDegrees - TBD.
   * @param dist - TBD.
   */
  rotate(x, y, angle, asDegrees, dist) {
    return rotate(this, x, y, angle, asDegrees, dist);
  }

  /**
   * TBD.
   */
  getMagnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * TBD.
   */
  getMagnitudeSq() {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * TBD.
   * @param magnitude - TBD.
   */
  setMagnitude(magnitude) {
    return this.normalize().multiply(magnitude, magnitude);
  }

  /**
   * TBD.
   */
  normalize() {
    if (!this.isZero()) {
      const m = this.getMagnitude();
      this.x /= m;
      this.y /= m;
    }
    return this;
  }

  /**
   * TBD.
   */
  isZero() {
    return this.x === 0 && this.y === 0;
  }

  /**
   * TBD.
   * @param a - TBD.
   */
  dot(a) {
    return this.x * a.x + this.y * a.y;
  }

  /**
   * TBD.
   * @param a - TBD.
   */
  cross(a) {
    return this.x * a.y - this.y * a.x;
  }

  /**
   * TBD.
   */
  perp() {
    return this.setTo(-this.y, this.x);
  }

  /**
   * TBD.
   */
  rperp() {
    return this.setTo(this.y, -this.x);
  }

  /**
   * TBD.
   */
  normalRightHand() {
    return this.setTo(this.y * -1, this.x);
  }

  /**
   * TBD.
   */
  floor() {
    return this.setTo(Math.floor(this.x), Math.floor(this.y));
  }

  /**
   * TBD.
   */
  ceil() {
    return this.setTo(Math.ceil(this.x), Math.ceil(this.y));
  }

  /**
   * TBD.
   */
  toString() {
    return '[{Point (x=' + this.x + ' y=' + this.y + ')}]';
  }
}
