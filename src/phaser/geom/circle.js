import { Point } from './point.js';
import { Rectangle } from './rectangle.js';
import { distance } from '../util/math.js';
import { clone, contains, circumferencePoint } from './util/circle.js';
import { GEOM_CIRCLE } from '../core/const.js';

export class Circle {
  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param {number} diameter - TBD.
   */
  constructor(x = 0, y = 0, diameter = 0) {
    this.x = x;
    this.y = y;
    this._diameter = diameter;
    this._radius = 0;
    if (diameter > 0) {
      this._radius = diameter * 0.5;
    }
    this.type = GEOM_CIRCLE;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  circumference() {
    return 2 * (Math.PI * this._radius);
  }

  /**
   * TBD.
   * @param {Point} output - TBD.
   * @returns {Point} TBD.
   */
  random(output = null) {
    const result = output || new Point();
    const t = 2 * Math.PI * Math.random();
    const u = Math.random() + Math.random();
    const r = u > 1 ? 2 - u : u;
    const x = r * Math.cos(t);
    const y = r * Math.sin(t);
    result.x = this.x + x * this.radius;
    result.y = this.y + y * this.radius;
    return result;
  }

  /**
   * TBD.
   * @returns {Rectangle} TBD.
   */
  getBounds() {
    return new Rectangle(this.x - this.radius, this.y - this.radius, this.diameter, this.diameter);
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param {number} diameter - TBD.
   * @returns {Circle} TBD.
   */
  setTo(x, y, diameter) {
    this.x = x;
    this.y = y;
    this._diameter = diameter;
    this._radius = diameter * 0.5;
    return this;
  }

  /**
   * TBD.
   * @param {Circle} source - TBD.
   * @returns {Circle} TBD.
   */
  copyFrom(source) {
    return this.setTo(source.x, source.y, source.diameter);
  }

  /**
   * TBD.
   * @param {Circle} dest - TBD.
   * @returns {Circle} TBD.
   */
  copyTo(dest) {
    dest.x = this.x;
    dest.y = this.y;
    dest.diameter = this._diameter;
    return dest;
  }

  /**
   * TBD.
   * @param {Circle} dest - TBD.
   * @param {boolean} round - TBD.
   * @returns {number} TBD.
   */
  distance(dest, round = false) {
    const d = distance(this.x, this.y, dest.x, dest.y);
    return round ? Math.round(d) : d;
  }

  /**
   * TBD.
   * @returns {Circle} TBD.
   */
  clone() {
    return clone(this);
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
   * @param {number} angle - TBD.
   * @param {boolean} asDegrees - TBD.
   * @param {Point} out - TBD.
   * @returns {Point} TBD.
   */
  circumferencePoint(angle, asDegrees, out) {
    return circumferencePoint(this, angle, asDegrees, out);
  }

  /**
   * TBD.
   * @param {number} dx - TBD.
   * @param {number} dy - TBD.
   * @returns {Circle} TBD.
   */
  offset(dx, dy) {
    this.x += dx;
    this.y += dy;
    return this;
  }

  /**
   * TBD.
   * @param {Point} point - TBD.
   * @returns {Circle} TBD.
   */
  offsetPoint(point) {
    return this.offset(point.x, point.y);
  }

  /**
   * TBD.
   * @returns {string} TBD.
   */
  toString() {
    return `[{Circle (x=${this.x} y=${this.y} diameter=${this.diameter} radius=${this.radius})}]`;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get diameter() {
    return this._diameter;
  }

  /**
   * TBD.
   */
  set diameter(value) {
    if (value > 0) {
      this._diameter = value;
      this._radius = value * 0.5;
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get radius() {
    return this._radius;
  }

  /**
   * TBD.
   */
  set radius(value) {
    if (value > 0) {
      this._radius = value;
      this._diameter = value * 2;
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get left() {
    return this.x - this._radius;
  }

  /**
   * TBD.
   */
  set left(value) {
    if (value > this.x) {
      this._radius = 0;
      this._diameter = 0;
    } else {
      this.radius = this.x - value;
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get right() {
    return this.x + this._radius;
  }

  /**
   * TBD.
   */
  set right(value) {
    if (value < this.x) {
      this._radius = 0;
      this._diameter = 0;
    } else {
      this.radius = value - this.x;
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get top() {
    return this.y - this._radius;
  }

  /**
   * TBD.
   */
  set top(value) {
    if (value > this.y) {
      this._radius = 0;
      this._diameter = 0;
    } else {
      this.radius = this.y - value;
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get bottom() {
    return this.y + this._radius;
  }

  /**
   * TBD.
   */
  set bottom(value) {
    if (value < this.y) {
      this._radius = 0;
      this._diameter = 0;
    } else {
      this.radius = value - this.y;
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get area() {
    if (this._radius > 0) {
      return Math.PI * this._radius * this._radius;
    }
    return 0;
  }

  /**
   * TBD.
   * @returns {boolean} TBD.
   */
  get empty() {
    return this._diameter === 0;
  }

  /**
   * TBD.
   */
  set empty(value) {
    if (value === true) {
      this.setTo(0, 0, 0);
    }
  }
}
