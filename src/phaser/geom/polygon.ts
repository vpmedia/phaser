import { Point } from './point.js';
import { clone } from './util/polygon.js';
import { GEOM_POLYGON } from '../core/const.js';

/** A vertex as `setTo` accepts it: a point, an `{x, y}` pair, an `[x, y]` tuple, or a loose number. */
export type PolygonVertex = Point | { x: number; y: number } | [number, number] | number;

export class Polygon {
  public area = 0;
  public _points: Point[] | number[];
  public closed: boolean;
  public flattened: boolean;
  public type: number;

  /**
   * Creates a new Polygon instance.
   * @param {object[]} points - The array of points to define the polygon (optional).
   */
  public constructor(points: PolygonVertex[] | null = null) {
    /** @type {number} */

    /** @type {Point[]} */
    this._points = [];
    /** @type {boolean} */
    this.closed = true;
    /** @type {boolean} */
    this.flattened = false;
    /** @type {number} */
    this.type = GEOM_POLYGON;
    if (points !== null) {
      this.setTo(points);
    }
  }

  /**
   * Converts the polygon's points to a number array.
   * @param {number[]} output - The array to store the result in (optional).
   * @returns {number[]} An array of numbers representing the polygon's points.
   */
  public toNumberArray(output: number[] = []): number[] {
    const points: (Point | number | undefined)[] = this._points;
    for (let i = 0; i < points.length; i += 1) {
      const point = points[i];
      if (typeof point === 'number') {
        output.push(point, points[i + 1] as number);
        i += 1;
      } else if (point) {
        output.push(point.x, point.y);
      }
    }
    return output;
  }

  /**
   * Flattens the polygon's point array to a simple numeric array.
   * @returns {Polygon} This polygon instance for chaining.
   */
  public flatten(): this {
    this._points = this.toNumberArray();
    this.flattened = true;
    return this;
  }

  /**
   * Creates a clone of this polygon.
   * @returns {Polygon} A new polygon with the same values as this one.
   */
  public clone(): Polygon {
    return clone(this);
  }

  /**
   * Checks if the specified point is contained within this polygon.
   * @param {number} x - The x coordinate of the point to check.
   * @param {number} y - The y coordinate of the point to check.
   * @returns {boolean} True if the point is contained within this polygon, false otherwise.
   */
  public contains(x: number, y: number): boolean {
    //  Adapted from http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html by Jonas Raoni Soares Silva
    let inside = false;
    if (this.flattened) {
      const points = this._points as number[];
      for (let i = -2, j = points.length - 2; (i += 2) < points.length; j = i) {
        const ix = points[i]!;
        const iy = points[i + 1]!;
        const jx = points[j]!;
        const jy = points[j + 1]!;
        if (((iy <= y && y < jy) || (jy <= y && y < iy)) && x < ((jx - ix) * (y - iy)) / (jy - iy) + ix) {
          inside = !inside;
        }
      }
    } else {
      const points = this._points as Point[];
      for (let i = 0, j = points.length - 1; i < points.length; j = i, i += 1) {
        const { x: ix, y: iy } = points[i]!;
        const { x: jx, y: jy } = points[j]!;
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
  public setTo(points: PolygonVertex[]): this {
    this.area = 0;
    const vertices: Point[] = [];
    this._points = vertices;
    if (points.length > 0) {
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
        const vertex = points[i]!;
        let p;
        if (typeof vertex === 'number') {
          p = new Point(vertex, points[i + 1] as number);
          i += 1;
        } else if (Array.isArray(vertex)) {
          p = new Point(vertex[0], vertex[1]);
        } else {
          p = new Point(vertex.x, vertex.y);
        }
        vertices.push(p);
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
  public calculateArea(y0: number): number {
    const points = this._points as Point[];
    for (let i = 0, len = points.length; i < len; i += 1) {
      const p1 = points[i]!;
      const p2 = (i === len - 1 ? points[0] : points[i + 1])!;
      const avgHeight = (p1.y - y0 + (p2.y - y0)) / 2;
      const width = p1.x - p2.x;
      this.area += avgHeight * width;
    }
    return this.area;
  }

  /**
   * Gets the points of this polygon.
   * @returns {object[]} The array of points that define this polygon.
   */
  public get points(): Point[] | number[] {
    return this._points;
  }

  /**
   * Sets the points of this polygon.
   */
  public set points(value: PolygonVertex[] | null) {
    if (value === null) {
      this.area = 0;
      this._points = [];
    } else {
      this.setTo(value);
    }
  }
}
