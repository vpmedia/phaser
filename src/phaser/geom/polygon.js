import { Point } from './point';
import { clone } from './util/polygon';
import { GEOM_POLYGON } from '../core/const';

export class Polygon {
  /**
   * TBD.
   * @param {object[]} points - TBD.
   */
  constructor(points = null) {
    this.area = 0;
    this._points = [];
    this.closed = true;
    this.flattened = false;
    this.type = GEOM_POLYGON;
    if (points) {
      this.setTo(points);
    }
  }

  /**
   * TBD.
   * @param {number[]} output - TBD.
   * @returns {number[]} TBD.
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
   * TBD.
   * @returns {Polygon} TBD.
   */
  flatten() {
    this._points = this.toNumberArray();
    this.flattened = true;
    return this;
  }

  /**
   * TBD.
   * @returns {Polygon} TBD.
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
   * TBD.
   * @param {object[]} points - TBD.
   * @returns {Polygon} TBD.
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
   * TBD.
   * @param {number} y0 - TBD.
   * @returns {number} TBD.
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
   * TBD.
   * @returns {object[]} TBD.
   */
  get points() {
    return this._points;
  }

  /**
   * TBD.
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
