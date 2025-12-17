import { Point } from './point.js';
import { clone, intersectsPoints, reflect } from './util/line.js';
import { wrap } from '../util/math.js';
import { GEOM_LINE } from '../core/const.js';

export class Line {
  /**
   * Creates a new Line instance.
   * @param {number} x1 - The x coordinate of the start point (default: 0).
   * @param {number} y1 - The y coordinate of the start point (default: 0).
   * @param {number} x2 - The x coordinate of the end point (default: 0).
   * @param {number} y2 - The y coordinate of the end point (default: 0).
   */
  constructor(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
    /** @type {Point} */
    this.start = new Point(x1, y1);
    /** @type {Point} */
    this.end = new Point(x2, y2);
    /** @type {number} */
    this.type = GEOM_LINE;
  }

  /**
   * Sets the coordinates of this line to new values.
   * @param {number} x1 - The new x coordinate of the start point.
   * @param {number} y1 - The new y coordinate of the start point.
   * @param {number} x2 - The new x coordinate of the end point.
   * @param {number} y2 - The new y coordinate of the end point.
   * @returns {Line} This line instance for chaining.
   */
  setTo(x1, y1, x2, y2) {
    this.start.setTo(x1, y1);
    this.end.setTo(x2, y2);
    return this;
  }

  /**
   * Sets the coordinates of this line to match the positions of two sprites.
   * @param {object} startSprite - The starting sprite to get the position from.
   * @param {object} endSprite - The ending sprite to get the position from.
   * @param {boolean} useCenter - Whether to use the center of the sprites (default: false).
   * @returns {Line} This line instance for chaining.
   */
  fromSprite(startSprite, endSprite, useCenter = false) {
    if (useCenter) {
      return this.setTo(startSprite.center.x, startSprite.center.y, endSprite.center.x, endSprite.center.y);
    }
    return this.setTo(startSprite.x, startSprite.y, endSprite.x, endSprite.y);
  }

  /**
   * Sets the coordinates of this line to a point at a specific angle and distance.
   * @param {number} x - The x coordinate of the starting point.
   * @param {number} y - The y coordinate of the starting point.
   * @param {number} angle - The angle in radians to set the line at.
   * @param {number} length - The length of the line.
   * @returns {Line} This line instance for chaining.
   */
  fromAngle(x, y, angle, length) {
    this.start.setTo(x, y);
    this.end.setTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    return this;
  }

  /**
   * Rotates this line around its center point by the specified angle.
   * @param {number} angle - The angle in radians (or degrees if asDegrees is true) to rotate by.
   * @param {boolean} asDegrees - Whether the angle is provided in degrees (default: false).
   * @returns {Line} This line instance for chaining.
   */
  rotate(angle, asDegrees = false) {
    const cx = (this.start.x + this.end.x) / 2;
    const cy = (this.start.y + this.end.y) / 2;
    this.start.rotate(cx, cy, angle, asDegrees);
    this.end.rotate(cx, cy, angle, asDegrees);
    return this;
  }

  /**
   * Rotates this line around a specific point by the specified angle.
   * @param {number} x - The x coordinate of the center point to rotate around.
   * @param {number} y - The y coordinate of the center point to rotate around.
   * @param {number} angle - The angle in radians (or degrees if asDegrees is true) to rotate by.
   * @param {boolean} asDegrees - Whether the angle is provided in degrees (default: false).
   * @returns {Line} This line instance for chaining.
   */
  rotateAround(x, y, angle, asDegrees = false) {
    this.start.rotate(x, y, angle, asDegrees);
    this.end.rotate(x, y, angle, asDegrees);
    return this;
  }

  /**
   * Checks if this line intersects with another line.
   * @param {Line} line - The other line to check for intersection with.
   * @param {boolean} asSegment - Whether to treat the lines as segments (default: false).
   * @param {Point} result - The point to store the intersection in (optional).
   * @returns {Point} The intersection point, or null if no intersection occurs.
   */
  intersects(line, asSegment, result) {
    return intersectsPoints(this.start, this.end, line.start, line.end, asSegment, result);
  }

  /**
   * Calculates the reflection of this line off another line.
   * @param {Line} line - The line to reflect off.
   * @returns {number} The angle of reflection in radians.
   */
  reflect(line) {
    return reflect(this, line);
  }

  /**
   * Returns the midpoint of this line.
   * @param {Point} output - The point to store the result in (optional).
   * @returns {Point} The midpoint of this line.
   */
  midPoint(output = null) {
    const result = output || new Point();
    result.x = (this.start.x + this.end.x) / 2;
    result.y = (this.start.y + this.end.y) / 2;
    return result;
  }

  /**
   * Centers this line on the specified point.
   * @param {number} x - The x coordinate to center the line on.
   * @param {number} y - The y coordinate to center the line on.
   */
  centerOn(x, y) {
    const cx = (this.start.x + this.end.x) / 2;
    const cy = (this.start.y + this.end.y) / 2;
    const tx = x - cx;
    const ty = y - cy;
    this.start.add(tx, ty);
    this.end.add(tx, ty);
  }

  /**
   * Checks if the specified point lies on this line (not necessarily on the segment).
   * @param {number} x - The x coordinate of the point to check.
   * @param {number} y - The y coordinate of the point to check.
   * @returns {boolean} True if the point lies on this line, false otherwise.
   */
  pointOnLine(x, y) {
    return (x - this.start.x) * (this.end.y - this.start.y) === (this.end.x - this.start.x) * (y - this.start.y);
  }

  /**
   * Checks if the specified point lies on this line segment.
   * @param {number} x - The x coordinate of the point to check.
   * @param {number} y - The y coordinate of the point to check.
   * @returns {boolean} True if the point lies on this line segment, false otherwise.
   */
  pointOnSegment(x, y) {
    const xMin = Math.min(this.start.x, this.end.x);
    const xMax = Math.max(this.start.x, this.end.x);
    const yMin = Math.min(this.start.y, this.end.y);
    const yMax = Math.max(this.start.y, this.end.y);
    return this.pointOnLine(x, y) && x >= xMin && x <= xMax && y >= yMin && y <= yMax;
  }

  /**
   * Returns a random point on this line.
   * @param {Point} output - The point to store the result in (optional).
   * @returns {Point} A random point on this line.
   */
  random(output = null) {
    const result = output || new Point();
    const t = Math.random();
    result.x = this.start.x + t * (this.end.x - this.start.x);
    result.y = this.start.y + t * (this.end.y - this.start.y);
    return result;
  }

  /**
   * Gets coordinates of points along this line at regular intervals.
   * @param {number} stepRate - The interval between points (default: 1).
   * @param {number[][]} results - The array to store the results in (optional).
   * @returns {number[][]} An array of coordinate pairs representing points along this line.
   */
  coordinatesOnLine(stepRate = 1, results = []) {
    let x1 = Math.round(this.start.x);
    let y1 = Math.round(this.start.y);
    const x2 = Math.round(this.end.x);
    const y2 = Math.round(this.end.y);
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = x1 < x2 ? 1 : -1;
    const sy = y1 < y2 ? 1 : -1;
    let err = dx - dy;
    results.push([x1, y1]);
    let i = 1;
    while (!(x1 === x2 && y1 === y2)) {
      const e2 = err << 1;
      if (e2 > -dy) {
        err -= dy;
        x1 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y1 += sy;
      }
      if (i % stepRate === 0) {
        results.push([x1, y1]);
      }
      i += 1;
    }
    return results;
  }

  /**
   * Creates a clone of this line.
   * @returns {Line} A new line with the same values as this one.
   */
  clone() {
    return clone(this);
  }

  /**
   * Gets the length of this line.
   * @returns {number} The length of this line.
   */
  get length() {
    return Math.sqrt(
      (this.end.x - this.start.x) * (this.end.x - this.start.x) +
        (this.end.y - this.start.y) * (this.end.y - this.start.y)
    );
  }

  /**
   * Gets the angle of this line in radians.
   * @returns {number} The angle of this line in radians.
   */
  get angle() {
    return Math.atan2(this.end.y - this.start.y, this.end.x - this.start.x);
  }

  /**
   * Gets the slope of this line.
   * @returns {number} The slope of this line.
   */
  get slope() {
    return (this.end.y - this.start.y) / (this.end.x - this.start.x);
  }

  /**
   * Gets the perpendicular slope of this line.
   * @returns {number} The perpendicular slope of this line.
   */
  get perpSlope() {
    return -((this.end.x - this.start.x) / (this.end.y - this.start.y));
  }

  /**
   * Gets the x coordinate of the leftmost point on this line.
   * @returns {number} The x coordinate of the leftmost point on this line.
   */
  get x() {
    return Math.min(this.start.x, this.end.x);
  }

  /**
   * Gets the y coordinate of the topmost point on this line.
   * @returns {number} The y coordinate of the topmost point on this line.
   */
  get y() {
    return Math.min(this.start.y, this.end.y);
  }

  /**
   * Gets the x coordinate of the leftmost point on this line.
   * @returns {number} The x coordinate of the leftmost point on this line.
   */
  get left() {
    return Math.min(this.start.x, this.end.x);
  }

  /**
   * Gets the x coordinate of the rightmost point on this line.
   * @returns {number} The x coordinate of the rightmost point on this line.
   */
  get right() {
    return Math.max(this.start.x, this.end.x);
  }

  /**
   * Gets the y coordinate of the topmost point on this line.
   * @returns {number} The y coordinate of the topmost point on this line.
   */
  get top() {
    return Math.min(this.start.y, this.end.y);
  }

  /**
   * Gets the y coordinate of the bottommost point on this line.
   * @returns {number} The y coordinate of the bottommost point on this line.
   */
  get bottom() {
    return Math.max(this.start.y, this.end.y);
  }

  /**
   * Gets the width of this line (absolute difference between x coordinates).
   * @returns {number} The width of this line.
   */
  get width() {
    return Math.abs(this.start.x - this.end.x);
  }

  /**
   * Gets the height of this line (absolute difference between y coordinates).
   * @returns {number} The height of this line.
   */
  get height() {
    return Math.abs(this.start.y - this.end.y);
  }

  /**
   * Gets the normal vector x component of this line (perpendicular to the line).
   * @returns {number} The normal vector x component of this line.
   */
  get normalX() {
    return Math.cos(this.angle - 1.5707963267948966);
  }

  /**
   * Gets the normal vector y component of this line (perpendicular to the line).
   * @returns {number} The normal vector y component of this line.
   */
  get normalY() {
    return Math.sin(this.angle - 1.5707963267948966);
  }

  /**
   * Gets the angle of the normal vector of this line in radians.
   * @returns {number} The angle of the normal vector of this line in radians.
   */
  get normalAngle() {
    return wrap(this.angle - 1.5707963267948966, -Math.PI, Math.PI);
  }
}
