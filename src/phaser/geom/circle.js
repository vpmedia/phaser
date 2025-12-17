import { Point } from './point.js';
import { Rectangle } from './rectangle.js';
import { distance } from '../util/math.js';
import { clone, contains, circumferencePoint } from './util/circle.js';
import { GEOM_CIRCLE } from '../core/const.js';

export class Circle {
  /**
   * Creates a new Circle instance.
   * @param {number} x - The x coordinate of the center point (default: 0).
   * @param {number} y - The y coordinate of the center point (default: 0).
   * @param {number} diameter - The diameter of the circle (default: 0).
   */
  constructor(x = 0, y = 0, diameter = 0) {
    /** @type {number} */
    this.x = x;
    /** @type {number} */
    this.y = y;
    /** @type {number} */
    this._diameter = diameter;
    /** @type {number} */
    this._radius = 0;
    if (diameter > 0) {
      this._radius = diameter * 0.5;
    }
    /** @type {number} */
    this.type = GEOM_CIRCLE;
  }

  /**
   * Calculates the circumference of this circle.
   * @returns {number} The circumference of this circle.
   */
  circumference() {
    return 2 * (Math.PI * this._radius);
  }

  /**
   * Returns a random point within this circle.
   * @param {Point} output - The point to store the result in (optional).
   * @returns {Point} A random point within this circle.
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
   * Gets the bounding rectangle of this circle.
   * @returns {Rectangle} The bounding rectangle of this circle.
   */
  getBounds() {
    return new Rectangle(this.x - this.radius, this.y - this.radius, this.diameter, this.diameter);
  }

  /**
   * Sets the position and size of this circle to new values.
   * @param {number} x - The new x coordinate of the center point.
   * @param {number} y - The new y coordinate of the center point.
   * @param {number} diameter - The new diameter of the circle.
   * @returns {Circle} This circle instance for chaining.
   */
  setTo(x, y, diameter) {
    this.x = x;
    this.y = y;
    this._diameter = diameter;
    this._radius = diameter * 0.5;
    return this;
  }

  /**
   * Copies the values from another circle to this circle.
   * @param {Circle} source - The circle to copy values from.
   * @returns {Circle} This circle instance for chaining.
   */
  copyFrom(source) {
    return this.setTo(source.x, source.y, source.diameter);
  }

  /**
   * Copies the values of this circle to another circle.
   * @param {Circle} dest - The circle to copy values to.
   * @returns {Circle} The destination circle.
   */
  copyTo(dest) {
    dest.x = this.x;
    dest.y = this.y;
    dest.diameter = this._diameter;
    return dest;
  }

  /**
   * Calculates the distance between this circle and another circle.
   * @param {Circle} dest - The other circle to calculate the distance to.
   * @param {boolean} round - Whether to round the result (default: false).
   * @returns {number} The distance between the circles.
   */
  distance(dest, round = false) {
    const d = distance(this.x, this.y, dest.x, dest.y);
    return round ? Math.round(d) : d;
  }

  /**
   * Creates a clone of this circle.
   * @returns {Circle} A new circle with the same values as this one.
   */
  clone() {
    return clone(this);
  }

  /**
   * Checks if the specified point is contained within this circle.
   * @param {number} x - The x coordinate of the point to check.
   * @param {number} y - The y coordinate of the point to check.
   * @returns {boolean} True if the point is contained within this circle, false otherwise.
   */
  contains(x, y) {
    return contains(this, x, y);
  }

  /**
   * Gets a point at a specific angle on the circumference of this circle.
   * @param {number} angle - The angle in radians (or degrees if asDegrees is true) to get the point for.
   * @param {boolean} asDegrees - Whether the angle is provided in degrees (default: false).
   * @param {Point} out - The point to store the result in (optional).
   * @returns {Point} A point at the specified angle on the circumference of this circle.
   */
  circumferencePoint(angle, asDegrees, out) {
    return circumferencePoint(this, angle, asDegrees, out);
  }

  /**
   * Offsets the position of this circle by the specified amounts.
   * @param {number} dx - The amount to offset the x coordinate by.
   * @param {number} dy - The amount to offset the y coordinate by.
   * @returns {Circle} This circle instance for chaining.
   */
  offset(dx, dy) {
    this.x += dx;
    this.y += dy;
    return this;
  }

  /**
   * Offsets the position of this circle by the specified point coordinates.
   * @param {Point} point - The point to offset the circle by.
   * @returns {Circle} This circle instance for chaining.
   */
  offsetPoint(point) {
    return this.offset(point.x, point.y);
  }

  /**
   * Returns a string representation of this circle.
   * @returns {string} A string representation of the circle.
   */
  toString() {
    return `[{Circle (x=${this.x} y=${this.y} diameter=${this.diameter} radius=${this.radius})}]`;
  }

  /**
   * Gets the diameter of this circle.
   * @returns {number} The diameter of this circle.
   */
  get diameter() {
    return this._diameter;
  }

  /**
   * Sets the diameter of this circle.
   */
  set diameter(value) {
    if (value > 0) {
      this._diameter = value;
      this._radius = value * 0.5;
    }
  }

  /**
   * Gets the radius of this circle.
   * @returns {number} The radius of this circle.
   */
  get radius() {
    return this._radius;
  }

  /**
   * Sets the radius of this circle.
   */
  set radius(value) {
    if (value > 0) {
      this._radius = value;
      this._diameter = value * 2;
    }
  }

  /**
   * Gets the left coordinate of this circle.
   * @returns {number} The left coordinate of this circle.
   */
  get left() {
    return this.x - this._radius;
  }

  /**
   * Sets the left coordinate of this circle.
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
   * Gets the right coordinate of this circle.
   * @returns {number} The right coordinate of this circle.
   */
  get right() {
    return this.x + this._radius;
  }

  /**
   * Sets the right coordinate of this circle.
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
   * Gets the top coordinate of this circle.
   * @returns {number} The top coordinate of this circle.
   */
  get top() {
    return this.y - this._radius;
  }

  /**
   * Sets the top coordinate of this circle.
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
   * Gets the bottom coordinate of this circle.
   * @returns {number} The bottom coordinate of this circle.
   */
  get bottom() {
    return this.y + this._radius;
  }

  /**
   * Sets the bottom coordinate of this circle.
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
   * Gets the area of this circle.
   * @returns {number} The area of this circle.
   */
  get area() {
    if (this._radius > 0) {
      return Math.PI * this._radius * this._radius;
    }
    return 0;
  }

  /**
   * Checks if this circle is empty (has zero diameter).
   * @returns {boolean} True if the circle is empty, false otherwise.
   */
  get empty() {
    return this._diameter === 0;
  }

  /**
   * Sets whether this circle is empty (zero diameter).
   */
  set empty(value) {
    if (value === true) {
      this.setTo(0, 0, 0);
    }
  }
}
