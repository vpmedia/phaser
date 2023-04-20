import { clone } from './util/rounded_rectangle';
import { GEOM_ROUNDED_RECTANGLE } from '../core/const';

export class RoundedRectangle {
  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param {number} width - TBD.
   * @param {number} height - TBD.
   * @param {number} radius - TBD.
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
   *
   * @param x
   * @param y
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
   *
   */
  clone() {
    return clone(this);
  }
}
