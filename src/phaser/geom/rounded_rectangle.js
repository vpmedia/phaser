import { clone } from './util/rounded_rectangle.js';
import { GEOM_ROUNDED_RECTANGLE } from '../core/const.js';

export class RoundedRectangle {
  /**
   * Creates a new RoundedRectangle instance.
   * @param {number} x - The x coordinate of the top-left corner of the rectangle (default: 0).
   * @param {number} y - The y coordinate of the top-left corner of the rectangle (default: 0).
   * @param {number} width - The width of the rectangle (default: 0).
   * @param {number} height - The height of the rectangle (default: 0).
   * @param {number} radius - The corner radius (default: 20).
   */
  constructor(x = 0, y = 0, width = 0, height = 0, radius = 20) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.radius = radius;
    this.type = GEOM_ROUNDED_RECTANGLE;
  }

  /**
   * Checks if the specified point is contained within this rounded rectangle.
   * @param {number} x - The x coordinate of the point to check.
   * @param {number} y - The y coordinate of the point to check.
   * @returns {boolean} True if the point is contained within this rounded rectangle, false otherwise.
   */
  contains(x, y) {
    if (this.width <= 0 || this.height <= 0) {
      return false;
    }
    if (x >= this.x && x <= this.x + this.width) {
      if (y >= this.y && y <= this.y + this.height) {
        return true;
      }
    }
    return false;
  }

  /**
   * Creates a clone of this rounded rectangle.
   * @returns {RoundedRectangle} A new rounded rectangle with the same values as this one.
   */
  clone() {
    return clone(this);
  }
}
