import { Point } from './point';
import { clone, intersectsPoints, reflect } from './util/line';
import { wrap } from '../util/math';
import { GEOM_LINE } from '../core/const';

export class Line {
  /**
   * TBD.
   * @param {number} x1 - TBD.
   * @param {number} y1 - TBD.
   * @param {number} x2 - TBD.
   * @param {number} y2 - TBD.
   */
  constructor(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
    this.start = new Point(x1, y1);
    this.end = new Point(x2, y2);
    this.type = GEOM_LINE;
  }

  /**
   * TBD.
   * @param x1
   * @param y1
   * @param x2
   * @param y2
   */
  setTo(x1, y1, x2, y2) {
    this.start.setTo(x1, y1);
    this.end.setTo(x2, y2);
    return this;
  }

  /**
   * TBD.
   * @param startSprite
   * @param endSprite
   * @param useCenter
   */
  fromSprite(startSprite, endSprite, useCenter = false) {
    if (useCenter) {
      return this.setTo(
        startSprite.center.x,
        startSprite.center.y,
        endSprite.center.x,
        endSprite.center.y
      );
    }
    return this.setTo(startSprite.x, startSprite.y, endSprite.x, endSprite.y);
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param angle
   * @param length
   */
  fromAngle(x, y, angle, length) {
    this.start.setTo(x, y);
    this.end.setTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    return this;
  }

  /**
   * TBD.
   * @param angle
   * @param asDegrees
   */
  rotate(angle, asDegrees = false) {
    const cx = (this.start.x + this.end.x) / 2;
    const cy = (this.start.y + this.end.y) / 2;
    this.start.rotate(cx, cy, angle, asDegrees);
    this.end.rotate(cx, cy, angle, asDegrees);
    return this;
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param angle
   * @param asDegrees
   */
  rotateAround(x, y, angle, asDegrees = false) {
    this.start.rotate(x, y, angle, asDegrees);
    this.end.rotate(x, y, angle, asDegrees);
    return this;
  }

  /**
   * TBD.
   * @param line
   * @param asSegment
   * @param result
   */
  intersects(line, asSegment, result) {
    return intersectsPoints(this.start, this.end, line.start, line.end, asSegment, result);
  }

  /**
   * TBD.
   * @param line
   */
  reflect(line) {
    return reflect(this, line);
  }

  /**
   * TBD.
   * @param output
   */
  midPoint(output = null) {
    const result = output || new Point();
    result.x = (this.start.x + this.end.x) / 2;
    result.y = (this.start.y + this.end.y) / 2;
    return result;
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
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
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   */
  pointOnLine(x, y) {
    return (
      (x - this.start.x) * (this.end.y - this.start.y) ===
      (this.end.x - this.start.x) * (y - this.start.y)
    );
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   */
  pointOnSegment(x, y) {
    const xMin = Math.min(this.start.x, this.end.x);
    const xMax = Math.max(this.start.x, this.end.x);
    const yMin = Math.min(this.start.y, this.end.y);
    const yMax = Math.max(this.start.y, this.end.y);
    return this.pointOnLine(x, y) && x >= xMin && x <= xMax && y >= yMin && y <= yMax;
  }

  /**
   * TBD.
   * @param output
   */
  random(output = null) {
    const result = output || new Point();
    const t = Math.random();
    result.x = this.start.x + t * (this.end.x - this.start.x);
    result.y = this.start.y + t * (this.end.y - this.start.y);
    return result;
  }

  /**
   * TBD.
   * @param stepRate
   * @param results
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
   * TBD.
   */
  clone() {
    return clone(this);
  }

  /**
   * TBD.
   */
  get length() {
    return Math.sqrt(
      (this.end.x - this.start.x) * (this.end.x - this.start.x) +
        (this.end.y - this.start.y) * (this.end.y - this.start.y)
    );
  }

  /**
   * TBD.
   */
  get angle() {
    return Math.atan2(this.end.y - this.start.y, this.end.x - this.start.x);
  }

  /**
   * TBD.
   */
  get slope() {
    return (this.end.y - this.start.y) / (this.end.x - this.start.x);
  }

  /**
   * TBD.
   */
  get perpSlope() {
    return -((this.end.x - this.start.x) / (this.end.y - this.start.y));
  }

  /**
   * TBD.
   */
  get x() {
    return Math.min(this.start.x, this.end.x);
  }

  /**
   * TBD.
   */
  get y() {
    return Math.min(this.start.y, this.end.y);
  }

  /**
   * TBD.
   */
  get left() {
    return Math.min(this.start.x, this.end.x);
  }

  /**
   * TBD.
   */
  get right() {
    return Math.max(this.start.x, this.end.x);
  }

  /**
   * TBD.
   */
  get top() {
    return Math.min(this.start.y, this.end.y);
  }

  /**
   * TBD.
   */
  get bottom() {
    return Math.max(this.start.y, this.end.y);
  }

  /**
   * TBD.
   */
  get width() {
    return Math.abs(this.start.x - this.end.x);
  }

  /**
   * TBD.
   */
  get height() {
    return Math.abs(this.start.y - this.end.y);
  }

  /**
   * TBD.
   */
  get normalX() {
    return Math.cos(this.angle - 1.5707963267948966);
  }

  /**
   * TBD.
   */
  get normalY() {
    return Math.sin(this.angle - 1.5707963267948966);
  }

  /**
   * TBD.
   */
  get normalAngle() {
    return wrap(this.angle - 1.5707963267948966, -Math.PI, Math.PI);
  }
}
