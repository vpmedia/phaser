import { Point } from './point.js';
import { clone } from './util/polygon.js';
import { GEOM_POLYGON } from '../core/const.js';

export class Polygon {
  /**
   * Creates a new Polygon instance.
   * @param {object[]} points - The array of points to define the polygon (optional).
   */
  constructor(points = null) {
    /** @type {number} */
    this.area = 0;
    /** @type {Point[]} */
    this._points = [];
    /** @type {boolean} */
    this.closed = true;
    /** @type {boolean} */
    this.flattened = false;
    /** @type {number} */
    this.type = GEOM_POLYGON;
    if (points) {
      this.setTo(points);
    }
  }

  /**
   * Converts the polygon's points to a number array.
   * @param {number[]} output - The array to store the result in (optional).
   * @returns {number[]} An array of numbers representing the polygon's points.
   */
  toNumberArray(output = []) {
    for (let i = 0; i < this._points.length; i += 1) {
      if (typeof this._points[i] === 'number') {
        output.push(this._points[i]);
        output.push(this._points[i + 1]);
        i += 1;
      } else {
        output.push(this._points[i].x);
        output.push(this._points[i].y);
      }
    }
    return output;
  }

  /**
   * Flattens the polygon's point array to a simple numeric array.
   * @returns {Polygon} This polygon instance for chaining.
   */
  flatten() {
    this._points = this.toNumberArray();
    this.flattened = true;
    return this;
  }

  /**
   * Creates a clone of this polygon.
   * @returns {Polygon} A new polygon with the same values as this one.
   */
  clone() {
    return clone(this);
  }

  /**
   * Checks if the specified point is contained within this polygon.
   * @param {number} x - The x coordinate of the point to check.
   * @param {number} y - The y coordinate of the point to check.
   * @returns {boolean} True if the point is contained within this polygon, false otherwise.
   */
  contains(x, y) {
    //  Adapted from http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html by Jonas Raoni Soares Silva
    let inside = false;
    if (this.flattened) {
      for (let i = -2, j = this._points.length - 2; (i += 2) < this._points.length; j = i) {
        const ix = this._points[i];
        const iy = this._points[i + 1];
        const jx = this._points[j];
        const jy = this._points[j + 1];
        if (((iy <= y && y < jy) || (jy <= y && y < iy)) && x < ((jx - ix) * (y - iy)) / (jy - iy) + ix) {
          inside = !inside;
        }
      }
    } else {
      for (let i = -1, j = this._points.length - 1; ++i < this._points.length; j = i) {
        const ix = this._points[i].x;
        const iy = this._points[i].y;
        const jx = this._points[j].x;
        const jy = this._points[j].y;
        if (((iy <= y && y < jy) || (jy <= y && y < iy)) && x < ((jx - ix) * (y - iy)) / (jy - iy) + ix) {
          inside = !inside;
        }
      }
    }
    return inside;
  }

  /**
   * Sets the polygon's points to new values.
   * @param {object[]} points - The array of points to define the polygon.
   * @returns {Polygon} This polygon instance for chaining.
   */
  setTo(points) {
    this.area = 0;
    this._points = [];
    if (points) {
      //  If points isn't an array, use arguments as the array
      if (!Array.isArray(points)) {
        console.error('[Polygon] setTo() error, input parameter is not an array', points);
      }
      /* if (!Array.isArray(points)) {
        points = Array.prototype.slice.call(arguments);
      } */
      let y0 = Number.MAX_VALUE;
      //  Allows for mixed-type arguments
      for (let i = 0, len = points.length; i < len; i += 1) {
        let p;
        if (typeof points[i] === 'number') {
          p = new Point(points[i], points[i + 1]);
          i += 1;
        } else if (Array.isArray(points[i])) {
          p = new Point(points[i][0], points[i][1]);
        } else {
          p = new Point(points[i].x, points[i].y);
        }
        this._points.push(p);
        //  Lowest boundary
        if (p.y < y0) {
          y0 = p.y;
        }
      }
      this.calculateArea(y0);
    }
    return this;
  }

  /**
   * Calculates the area of this polygon.
   * @param {number} y0 - The y coordinate of the lowest boundary (internal use).
   * @returns {number} The area of this polygon.
   */
  calculateArea(y0) {
    let p1;
    let p2;
    let avgHeight;
    let width;
    for (let i = 0, len = this._points.length; i < len; i += 1) {
      p1 = this._points[i];
      if (i === len - 1) {
        p2 = this._points[0];
      } else {
        p2 = this._points[i + 1];
      }
      avgHeight = (p1.y - y0 + (p2.y - y0)) / 2;
      width = p1.x - p2.x;
      this.area += avgHeight * width;
    }
    return this.area;
  }

  /**
   * Gets the points of this polygon.
   * @returns {object[]} The array of points that define this polygon.
   */
  get points() {
    return this._points;
  }

  /**
   * Sets the points of this polygon.
   */
  set points(value) {
    if (value !== null) {
      this.setTo(value);
    } else {
      this.area = 0;
      this._points = [];
    }
  }
}
