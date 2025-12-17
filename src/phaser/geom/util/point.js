import { Point } from '../point.js';

/**
 * Adds two points together.
 * @param {Point} a - The first point to add.
 * @param {Point} b - The second point to add.
 * @param {Point} output - The point to store the result in (optional).
 * @returns {Point} A new point containing the sum of the two points.
 */
export const add = (a, b, output = null) => {
  const result = output || new Point();
  result.x = a.x + b.x;
  result.y = a.y + b.y;
  return result;
};

/**
 * Subtracts the second point from the first point.
 * @param {Point} a - The first point to subtract from.
 * @param {Point} b - The second point to subtract.
 * @param {Point} output - The point to store the result in (optional).
 * @returns {Point} A new point containing the difference of the two points.
 */
export const subtract = (a, b, output = null) => {
  const result = output || new Point();
  result.x = a.x - b.x;
  result.y = a.y - b.y;
  return result;
};

/**
 * Multiplies two points together.
 * @param {Point} a - The first point to multiply.
 * @param {Point} b - The second point to multiply.
 * @param {Point} output - The point to store the result in (optional).
 * @returns {Point} A new point containing the product of the two points.
 */
export const multiply = (a, b, output = null) => {
  const result = output || new Point();
  result.x = a.x * b.x;
  result.y = a.y * b.y;
  return result;
};

/**
 * Divides the first point by the second point.
 * @param {Point} a - The first point to divide.
 * @param {Point} b - The second point to divide by.
 * @param {Point} output - The point to store the result in (optional).
 * @returns {Point} A new point containing the quotient of the two points.
 */
export const divide = (a, b, output = null) => {
  const result = output || new Point();
  result.x = a.x / b.x;
  result.y = a.y / b.y;
  return result;
};

/**
 * Checks if two points are equal.
 * @param {Point} a - The first point to compare.
 * @param {Point} b - The second point to compare.
 * @returns {boolean} True if the points are equal, false otherwise.
 */
export const equals = (a, b) => {
  return a.x === b.x && a.y === b.y;
};

/**
 * Calculates the angle between two points.
 * @param {Point} a - The first point to calculate the angle from.
 * @param {Point} b - The second point to calculate the angle to.
 * @returns {number} The angle between the two points in radians.
 */
export const angle = (a, b) => {
  return Math.atan2(a.y - b.y, a.x - b.x);
};

/**
 * Creates a new point with the same coordinates as the input point but with inverted signs.
 * @param {Point} a - The point to negate.
 * @param {Point} output - The point to store the result in (optional).
 * @returns {Point} A new point with negated coordinates.
 */
export const negative = (a, output = null) => {
  const result = output || new Point();
  return result.setTo(-a.x, -a.y);
};

/**
 * Multiplies the second point by a scalar and adds it to the first point.
 * @param {Point} a - The first point to add to.
 * @param {Point} b - The second point to multiply by the scalar and add.
 * @param {number} s - The scalar value to multiply the second point by.
 * @param {Point} output - The point to store the result in (optional).
 * @returns {Point} A new point with the result of the operation.
 */
export const multiplyAdd = (a, b, s, output = null) => {
  const result = output || new Point();
  return result.setTo(a.x + b.x * s, a.y + b.y * s);
};

/**
 * Interpolates between two points at a given factor.
 * @param {Point} a - The first point to interpolate from.
 * @param {Point} b - The second point to interpolate to.
 * @param {number} f - The interpolation factor (0-1).
 * @param {Point} output - The point to store the result in (optional).
 * @returns {Point} A new point interpolated between the two points.
 */
export const interpolate = (a, b, f, output = null) => {
  const result = output || new Point();
  return result.setTo(a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f);
};

/**
 * Returns a perpendicular point (rotated 90 degrees counter-clockwise).
 * @param {Point} a - The point to calculate the perpendicular for.
 * @param {Point} output - The point to store the result in (optional).
 * @returns {Point} A new point that is perpendicular to the input point.
 */
export const perp = (a, output = null) => {
  const result = output || new Point();
  return result.setTo(-a.y, a.x);
};

/**
 * Returns a perpendicular point (rotated 90 degrees clockwise).
 * @param {Point} a - The point to calculate the perpendicular for.
 * @param {Point} output - The point to store the result in (optional).
 * @returns {Point} A new point that is perpendicular to the input point (rotated clockwise).
 */
export const rperp = (a, output = null) => {
  const result = output || new Point();
  return result.setTo(a.y, -a.x);
};

/**
 * Calculates the distance between two points.
 * @param {Point} a - The first point to calculate the distance from.
 * @param {Point} b - The second point to calculate the distance to.
 * @param {boolean} round - Whether to round the result (default: false).
 * @returns {number} The distance between the two points.
 */
export const distance = (a, b, round = false) => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const abDistance = Math.sqrt(dx * dx + dy * dy);
  return round ? Math.round(abDistance) : abDistance;
};

/**
 * Projects the first point onto the second point.
 * @param {Point} a - The point to project.
 * @param {Point} b - The point to project onto.
 * @param {Point} output - The point to store the result in (optional).
 * @returns {Point} A new point with the projected result.
 */
export const project = (a, b, output = null) => {
  const result = output || new Point();
  const amt = a.dot(b) / b.getMagnitudeSq();
  if (amt !== 0) {
    result.setTo(amt * b.x, amt * b.y);
  }
  return result;
};

/**
 * Projects the first point onto the unit vector of the second point.
 * @param {Point} a - The point to project.
 * @param {Point} b - The point to project onto (unit vector).
 * @param {Point} output - The point to store the result in (optional).
 * @returns {Point} A new point with the projected result.
 */
export const projectUnit = (a, b, output = null) => {
  const result = output || new Point();
  const amt = a.dot(b);
  if (amt !== 0) {
    result.setTo(amt * b.x, amt * b.y);
  }
  return result;
};

/**
 * Returns a point with the same direction as the input point but with y coordinate negated.
 * @param {Point} a - The point to calculate the normal for.
 * @param {Point} output - The point to store the result in (optional).
 * @returns {Point} A new point with the same x coordinate but negated y coordinate.
 */
export const normalRightHand = (a, output = null) => {
  const result = output || new Point();
  return result.setTo(a.y * -1, a.x);
};

/**
 * Normalizes the input point to have a magnitude of 1 while preserving its direction.
 * @param {Point} a - The point to normalize.
 * @param {Point} output - The point to store the result in (optional).
 * @returns {Point} A new normalized point.
 */
export const normalize = (a, output = null) => {
  const result = output || new Point();
  const m = a.getMagnitude();
  if (m !== 0) {
    result.setTo(a.x / m, a.y / m);
  }
  return result;
};

/**
 * Rotates a point around another point by a given angle.
 * @param {Point} a - The point to rotate.
 * @param {number} x - The x coordinate of the center point to rotate around.
 * @param {number} y - The y coordinate of the center point to rotate around.
 * @param {number} ang - The angle in radians to rotate by.
 * @param {boolean} asDegrees - Whether the angle is provided in degrees (default: false).
 * @param {number | null | undefined} dist - The distance to rotate from (default: null).
 * @returns {Point} The rotated point instance for chaining.
 */
export const rotate = (a, x, y, ang, asDegrees, dist) => {
  if (asDegrees) {
    ang *= Math.PI / 180;
  }
  if (dist === undefined || dist === null) {
    a.subtract(x, y);
    const s = Math.sin(ang);
    const c = Math.cos(ang);
    const tx = c * a.x - s * a.y;
    const ty = s * a.x + c * a.y;
    a.x = tx + x;
    a.y = ty + y;
  } else {
    const t = ang + Math.atan2(a.y - y, a.x - x);
    a.x = x + dist * Math.cos(t);
    a.y = y + dist * Math.sin(t);
  }
  return a;
};

/**
 * Calculates the centroid (average position) of a set of points.
 * @param {Point[]} points - The array of points to calculate the centroid for.
 * @param {Point} output - The point to store the result in (optional).
 * @returns {Point} A new point representing the centroid of the input points.
 * @throws {Error} If the points array is empty.
 */
export const centroid = (points, output = null) => {
  const result = output || new Point();
  const pointsLen = points.length;
  if (pointsLen < 1) {
    throw new Error('Point(points) array must not be empty');
  }
  if (pointsLen === 1) {
    result.copyFrom(points[0]);
    return result;
  }
  for (let i = 0; i < pointsLen; i += 1) {
    add(result, points[i], result);
  }
  result.divide(pointsLen, pointsLen);
  return result;
};

/**
 * Parses an object with x and y properties into a Point.
 * @param {object} obj - The object to parse (must have x and y properties).
 * @param {string} xProp - The name of the property containing the x value (default: 'x').
 * @param {string} yProp - The name of the property containing the y value (default: 'y').
 * @returns {Point} A new point with parsed x and y values.
 */
export const parse = (obj, xProp = 'x', yProp = 'y') => {
  const point = new Point();
  if (obj[xProp]) {
    point.x = Number.parseInt(obj[xProp], 10);
  }
  if (obj[yProp]) {
    point.y = Number.parseInt(obj[yProp], 10);
  }
  return point;
};

/**
 * Creates a clone of the input point.
 * @param {Point} input - The point to clone.
 * @param {Point} output - The point to store the result in (optional).
 * @returns {Point} A new point with the same coordinates as the input.
 */
export const clone = (input, output = null) => {
  const result = output || new Point();
  result.setTo(input.x, input.y);
  return result;
};
