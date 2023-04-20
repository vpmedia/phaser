import { Point } from './point';
import { Rectangle } from './rectangle';
import { contains } from './util/ellipse';
import { GEOM_ELLIPSE } from '../core/const';

export class Ellipse {
  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param {number} width - TBD.
   * @param {number} height - TBD.
   */
  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = GEOM_ELLIPSE;
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param {number} width - TBD.
   * @param {number} height - TBD.
   * @returns {Ellipse} TBD.
   */
  setTo(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    return this;
  }

  /**
   * TBD.
   * @returns {Rectangle} TBD.
   */
  getBounds() {
    return new Rectangle(this.x - this.width, this.y - this.height, this.width, this.height);
  }

  /**
   * TBD.
   * @param {Ellipse} source - TBD.
   * @returns {Ellipse} TBD.
   */
  copyFrom(source) {
    return this.setTo(source.x, source.y, source.width, source.height);
  }

  /**
   * TBD.
   * @param {Ellipse} dest - TBD.
   * @returns {Ellipse} TBD.
   */
  copyTo(dest) {
    dest.x = this.x;
    dest.y = this.y;
    dest.width = this.width;
    dest.height = this.height;
    return dest;
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
   * @param {Point} output - TBD.
   * @returns {Point} TBD.
   */
  random(output = null) {
    const result = output || new Point();
    const p = Math.random() * Math.PI * 2;
    const r = Math.random();
    result.x = Math.sqrt(r) * Math.cos(p);
    result.y = Math.sqrt(r) * Math.sin(p);
    result.x = this.x + (result.x * this.width) / 2.0;
    result.y = this.y + (result.y * this.height) / 2.0;
    return result;
  }

  /**
   * TBD.
   * @returns {string} TBD.
   */
  toString() {
    return '[{Ellipse (x=' + this.x + ' y=' + this.y + ' width=' + this.width + ' height=' + this.height + ')}]';
  }
}
