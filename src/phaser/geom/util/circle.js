import { degToRad, distance } from '../../util/math.js';
import { Circle } from '../circle.js';
import { Point } from '../point.js';

/**
 * Clones a circle.
 * @param {Circle} input - The circle to clone.
 * @param {Circle} output - Optional circle to store the result in.
 * @returns {Circle} The cloned circle.
 */
export const clone = (input, output = null) => {
  const result = output || new Circle();
  result.x = input.x;
  result.y = input.y;
  result.diameter = input.diameter;
  return result;
};

/**
 * Checks if a point is contained within the circle.
 * @param {Circle} a - The circle to check.
 * @param {number} x - The x coordinate of the point.
 * @param {number} y - The y coordinate of the point.
 * @returns {boolean} True if the point is contained within the circle, false otherwise.
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
 * Checks if two circles are equal.
 * @param {Circle} a - The first circle to compare.
 * @param {Circle} b - The second circle to compare.
 * @returns {boolean} True if the circles are equal, false otherwise.
 */
export const equals = (a, b) => {
  return a.x === b.x && a.y === b.y && a.diameter === b.diameter;
};

/**
 * Checks if two circles intersect.
 * @param {Circle} a - The first circle to check.
 * @param {Circle} b - The second circle to check.
 * @returns {boolean} True if the circles intersect, false otherwise.
 */
export const intersects = (a, b) => {
  return distance(a.x, a.y, b.x, b.y) <= a.radius + b.radius;
};

/**
 * Gets a point on the circumference of the circle at the specified angle.
 * @param {Circle} a - The circle to get the point from.
 * @param {number} angle - The angle in radians or degrees (depending on asDegrees).
 * @param {boolean} asDegrees - True if the angle is in degrees, false if in radians.
 * @param {Point} output - Optional point to store the result in.
 * @returns {Point} The point on the circumference of the circle.
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
 * Gets a point on the circumference of the circle at the specified angle.
 * @param {Circle} a - The circle to get the point from.
 * @param {number} angle - The angle in radians or degrees (depending on asDegrees).
 * @param {boolean} asDegrees - True if the angle is in degrees, false if in radians.
 * @param {Point} output - Optional point to store the result in.
 * @returns {Point} The point on the circumference of the circle.
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
 * Checks if a circle intersects with a rectangle.
 * @param {Circle} c - The circle to check.
 * @param {object} r - The rectangle to check.
 * @returns {boolean} True if the circle intersects with the rectangle, false otherwise.
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
