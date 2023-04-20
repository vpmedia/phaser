import { Point } from './point';
import { Rectangle } from './rectangle';
import { distance } from '../util/math';
import { clone, contains, circumferencePoint } from './util/circle';
import { GEOM_CIRCLE } from '../core/const';

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
   */
  circumference() {
    return 2 * (Math.PI * this._radius);
  }

  /**
   * TBD.
   * @param output - TBD.
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
   */
  getBounds() {
    return new Rectangle(this.x - this.radius, this.y - this.radius, this.diameter, this.diameter);
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param diameter - TBD.
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
   * @param source - TBD.
   */
  copyFrom(source) {
    return this.setTo(source.x, source.y, source.diameter);
  }

  /**
   * TBD.
   * @param dest - TBD.
   */
  copyTo(dest) {
    dest.x = this.x;
    dest.y = this.y;
    dest.diameter = this._diameter;
    return dest;
  }

  /**
   * TBD.
   * @param dest - TBD.
   * @param round - TBD.
   */
  distance(dest, round = false) {
    const d = distance(this.x, this.y, dest.x, dest.y);
    return round ? Math.round(d) : d;
  }

  /**
   * TBD.
   */
  clone() {
    return clone(this);
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   */
  contains(x, y) {
    return contains(this, x, y);
  }

  /**
   * TBD.
   * @param angle - TBD.
   * @param asDegrees - TBD.
   * @param out - TBD.
   */
  circumferencePoint(angle, asDegrees, out) {
    return circumferencePoint(this, angle, asDegrees, out);
  }

  /**
   * TBD.
   * @param dx - TBD.
   * @param dy - TBD.
   */
  offset(dx, dy) {
    this.x += dx;
    this.y += dy;
    return this;
  }

  /**
   * TBD.
   * @param point - TBD.
   */
  offsetPoint(point) {
    return this.offset(point.x, point.y);
  }

  /**
   * TBD.
   */
  toString() {
    return '[{Circle (x=' + this.x + ' y=' + this.y + ' diameter=' + this.diameter + ' radius=' + this.radius + ')}]';
  }

  /**
   * TBD.
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
   */
  get area() {
    if (this._radius > 0) {
      return Math.PI * this._radius * this._radius;
    }
    return 0;
  }

  /**
   * TBD.
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
