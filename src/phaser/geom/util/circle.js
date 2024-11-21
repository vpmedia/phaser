import { degToRad, distance } from '../../util/math.js';
import { Circle } from '../circle.js';
import { Point } from '../point.js';

/**
 * TBD.
 * @param {Circle} input - TBD.
 * @param {Circle} output - TBD.
 * @returns {Circle} TBD.
 */
export const clone = (input, output = null) => {
  const result = output || new Circle();
  result.x = input.x;
  result.y = input.y;
  result.diameter = input.diameter;
  return result;
};

/**
 * TBD.
 * @param {Circle} a - TBD.
 * @param {number} x - TBD.
 * @param {number} y - TBD.
 * @returns {boolean} TBD.
 */
export const contains = (a, x, y) => {
  if (a.radius > 0 && x >= a.left && x <= a.right && y >= a.top && y <= a.bottom) {
    const dx = (a.x - x) * (a.x - x);
    const dy = (a.y - y) * (a.y - y);
    return dx + dy <= a.radius * a.radius;
  }
  return false;
};

/**
 * TBD.
 * @param {Circle} a - TBD.
 * @param {Circle} b - TBD.
 * @returns {boolean} TBD.
 */
export const equals = (a, b) => {
  return a.x === b.x && a.y === b.y && a.diameter === b.diameter;
};

/**
 * TBD.
 * @param {Circle} a - TBD.
 * @param {Circle} b - TBD.
 * @returns {boolean} TBD.
 */
export const intersects = (a, b) => {
  return distance(a.x, a.y, b.x, b.y) <= a.radius + b.radius;
};

/**
 * TBD.
 * @param {Circle} a - TBD.
 * @param {number} angle - TBD.
 * @param {boolean} asDegrees - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export const circumferencePoint = (a, angle, asDegrees = false, output = null) => {
  const result = output || new Point();
  if (asDegrees === true) {
    angle = degToRad(angle);
  }
  result.x = a.x + a.radius * Math.cos(angle);
  result.y = a.y + a.radius * Math.sin(angle);
  return result;
};

/**
 * TBD.
 * @param {Circle} a - TBD.
 * @param {number} angle - TBD.
 * @param {boolean} asDegrees - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export const intersectsPoint = (a, angle, asDegrees = false, output = null) => {
  const result = output || new Point();
  if (asDegrees === true) {
    angle = degToRad(angle);
  }
  result.x = a.x + a.radius * Math.cos(angle);
  result.y = a.y + a.radius * Math.sin(angle);
  return result;
};

/**
 * TBD.
 * @param {Circle} c - TBD.
 * @param {object} r - TBD.
 * @returns {boolean} TBD.
 */
export const intersectsRectangle = (c, r) => {
  const cx = Math.abs(c.x - r.x - r.halfWidth);
  const xDist = r.halfWidth + c.radius;
  if (cx > xDist) {
    return false;
  }
  const cy = Math.abs(c.y - r.y - r.halfHeight);
  const yDist = r.halfHeight + c.radius;
  if (cy > yDist) {
    return false;
  }
  if (cx <= r.halfWidth || cy <= r.halfHeight) {
    return true;
  }
  const xCornerDist = cx - r.halfWidth;
  const yCornerDist = cy - r.halfHeight;
  const xCornerDistSq = xCornerDist * xCornerDist;
  const yCornerDistSq = yCornerDist * yCornerDist;
  const maxCornerDistSq = c.radius * c.radius;
  return xCornerDistSq + yCornerDistSq <= maxCornerDistSq;
};
