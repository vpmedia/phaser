import { GEOM_ELLIPSE } from '../core/const.js';
import { Point } from './point.js';
import { Rectangle } from './rectangle.js';
import { contains } from './util/ellipse.js';

export class Ellipse {
  /**
   * Creates a new Ellipse instance.
   * @param {number} x - The x coordinate of the center point (default: 0).
   * @param {number} y - The y coordinate of the center point (default: 0).
   * @param {number} width - The width of the ellipse (default: 0).
   * @param {number} height - The height of the ellipse (default: 0).
   */
  constructor(x = 0, y = 0, width = 0, height = 0) {
    /** @type {number} */
    this.x = x;
    /** @type {number} */
    this.y = y;
    /** @type {number} */
    this.width = width;
    /** @type {number} */
    this.height = height;
    /** @type {number} */
    this.type = GEOM_ELLIPSE;
  }

  /**
   * Sets the position and size of this ellipse to new values.
   * @param {number} x - The new x coordinate of the center point.
   * @param {number} y - The new y coordinate of the center point.
   * @param {number} width - The new width of the ellipse.
   * @param {number} height - The new height of the ellipse.
   * @returns {Ellipse} This ellipse instance for chaining.
   */
  setTo(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    return this;
  }

  /**
   * Gets the bounding rectangle of this ellipse.
   * @returns {Rectangle} The bounding rectangle of this ellipse.
   */
  getBounds() {
    return new Rectangle(this.x - this.width, this.y - this.height, this.width, this.height);
  }

  /**
   * Copies the values from another ellipse to this ellipse.
   * @param {Ellipse} source - The ellipse to copy values from.
   * @returns {Ellipse} This ellipse instance for chaining.
   */
  copyFrom(source) {
    return this.setTo(source.x, source.y, source.width, source.height);
  }

  /**
   * Copies the values of this ellipse to another ellipse.
   * @param {Ellipse} dest - The ellipse to copy values to.
   * @returns {Ellipse} The destination ellipse.
   */
  copyTo(dest) {
    dest.x = this.x;
    dest.y = this.y;
    dest.width = this.width;
    dest.height = this.height;
    return dest;
  }

  /**
   * Checks if the specified point is contained within this ellipse.
   * @param {number} x - The x coordinate of the point to check.
   * @param {number} y - The y coordinate of the point to check.
   * @returns {boolean} True if the point is contained within this ellipse, false otherwise.
   */
  contains(x, y) {
    return contains(this, x, y);
  }

  /**
   * Returns a random point within this ellipse.
   * @param {Point} output - The point to store the result in (optional).
   * @returns {Point} A random point within this ellipse.
   */
  random(output = null) {
    const result = output || new Point();
    const p = Math.random() * Math.PI * 2;
    const r = Math.random();
    result.x = Math.sqrt(r) * Math.cos(p);
    result.y = Math.sqrt(r) * Math.sin(p);
    result.x = this.x + (result.x * this.width) / 2;
    result.y = this.y + (result.y * this.height) / 2;
    return result;
  }

  /**
   * Returns a string representation of this ellipse.
   * @returns {string} A string representation of the ellipse.
   */
  toString() {
    return `[{Ellipse (x=${this.x} y=${this.y} width=${this.width} height=${this.height})}]`;
  }
}
