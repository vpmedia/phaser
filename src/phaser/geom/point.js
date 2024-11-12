import { distance, rotate, clone } from './util/point.js';
import { GEOM_POINT } from '../core/const.js';

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
   * @param {Point} source - TBD.
   * @returns {Point} TBD.
   */
  copyFrom(source) {
    return this.setTo(source.x, source.y);
  }

  /**
   * TBD.
   * @returns {Point} TBD.
   */
  invert() {
    return this.setTo(this.y, this.x);
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @returns {Point} TBD.
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
   * @returns {Point} TBD.
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
   * @returns {Point} TBD.
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
   * @returns {Point} TBD.
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
   * @returns {Point} TBD.
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
   * @returns {Point} TBD.
   */
  divide(x, y) {
    this.x /= x;
    this.y /= y;
    return this;
  }

  /**
   * TBD.
   * @param {number} min - TBD.
   * @param {number} max - TBD.
   * @returns {Point} TBD.
   */
  clampX(min, max) {
    this.x = Math.max(min, Math.min(max, this.x));
    return this;
  }

  /**
   * TBD.
   * @param {number} min - TBD.
   * @param {number} max - TBD.
   * @returns {Point} TBD.
   */
  clampY(min, max) {
    this.y = Math.max(min, Math.min(max, this.y));
    return this;
  }

  /**
   * TBD.
   * @param {number} min - TBD.
   * @param {number} max - TBD.
   * @returns {Point} TBD.
   */
  clamp(min, max) {
    this.x = Math.max(min, Math.min(max, this.x));
    this.y = Math.max(min, Math.min(max, this.y));
    return this;
  }

  /**
   * TBD.
   * @returns {Point} TBD.
   */
  clone() {
    return clone(this);
  }

  /**
   * TBD.
   * @param {Point} dest - TBD.
   * @returns {Point} TBD.
   */
  copyTo(dest) {
    dest.x = this.x;
    dest.y = this.y;
    return dest;
  }

  /**
   * TBD.
   * @param {Point} b - TBD.
   * @returns {number} TBD.
   */
  distance(b) {
    return distance(this, b);
  }

  /**
   * TBD.
   * @param {Point} a - TBD.
   * @returns {boolean} TBD.
   */
  equals(a) {
    return a.x === this.x && a.y === this.y;
  }

  /**
   * TBD.
   * @param {Point} a - TBD.
   * @param {boolean} asDegrees - TBD.
   * @returns {number} TBD.
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
   * @param {number} angle - TBD.
   * @param {boolean} asDegrees - TBD.
   * @param {number} dist - TBD.
   * @returns {Point} TBD.
   */
  rotate(x, y, angle, asDegrees, dist) {
    return rotate(this, x, y, angle, asDegrees, dist);
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  getMagnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  getMagnitudeSq() {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * TBD.
   * @param {number} magnitude - TBD.
   * @returns {Point} TBD.
   */
  setMagnitude(magnitude) {
    return this.normalize().multiply(magnitude, magnitude);
  }

  /**
   * TBD.
   * @returns {Point} TBD.
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
   * @returns {boolean} TBD.
   */
  isZero() {
    return this.x === 0 && this.y === 0;
  }

  /**
   * TBD.
   * @param {Point} a - TBD.
   * @returns {number} TBD.
   */
  dot(a) {
    return this.x * a.x + this.y * a.y;
  }

  /**
   * TBD.
   * @param {Point} a - TBD.
   * @returns {number} TBD.
   */
  cross(a) {
    return this.x * a.y - this.y * a.x;
  }

  /**
   * TBD.
   * @returns {Point} TBD.
   */
  perp() {
    return this.setTo(-this.y, this.x);
  }

  /**
   * TBD.
   * @returns {Point} TBD.
   */
  rperp() {
    return this.setTo(this.y, -this.x);
  }

  /**
   * TBD.
   * @returns {Point} TBD.
   */
  normalRightHand() {
    return this.setTo(this.y * -1, this.x);
  }

  /**
   * TBD.
   * @returns {Point} TBD.
   */
  floor() {
    return this.setTo(Math.floor(this.x), Math.floor(this.y));
  }

  /**
   * TBD.
   * @returns {Point} TBD.
   */
  ceil() {
    return this.setTo(Math.ceil(this.x), Math.ceil(this.y));
  }

  /**
   * TBD.
   * @returns {string} TBD.
   */
  toString() {
    return `[{Point (x=${this.x} y=${this.y})}]`;
  }
}
