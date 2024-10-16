import { Point } from '../point.js';

/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} b - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function add(a, b, output = null) {
  const result = output || new Point();
  result.x = a.x + b.x;
  result.y = a.y + b.y;
  return result;
}

/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} b - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function subtract(a, b, output = null) {
  const result = output || new Point();
  result.x = a.x - b.x;
  result.y = a.y - b.y;
  return result;
}

/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} b - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function multiply(a, b, output = null) {
  const result = output || new Point();
  result.x = a.x * b.x;
  result.y = a.y * b.y;
  return result;
}

/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} b - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function divide(a, b, output = null) {
  const result = output || new Point();
  result.x = a.x / b.x;
  result.y = a.y / b.y;
  return result;
}

/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} b - TBD.
 * @returns {boolean} TBD.
 */
export function equals(a, b) {
  return a.x === b.x && a.y === b.y;
}

/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} b - TBD.
 * @returns {number} TBD.
 */
export function angle(a, b) {
  return Math.atan2(a.y - b.y, a.x - b.x);
}

/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function negative(a, output = null) {
  const result = output || new Point();
  return result.setTo(-a.x, -a.y);
}

/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} b - TBD.
 * @param {number} s - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function multiplyAdd(a, b, s, output = null) {
  const result = output || new Point();
  return result.setTo(a.x + b.x * s, a.y + b.y * s);
}

/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} b - TBD.
 * @param {number} f - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function interpolate(a, b, f, output = null) {
  const result = output || new Point();
  return result.setTo(a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f);
}

/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function perp(a, output = null) {
  const result = output || new Point();
  return result.setTo(-a.y, a.x);
}

/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function rperp(a, output = null) {
  const result = output || new Point();
  return result.setTo(a.y, -a.x);
}

/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} b - TBD.
 * @param {boolean} round - TBD.
 * @returns {number} TBD.
 */
export function distance(a, b, round = false) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const abDistance = Math.sqrt(dx * dx + dy * dy);
  return round ? Math.round(abDistance) : abDistance;
}

/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} b - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function project(a, b, output = null) {
  const result = output || new Point();
  const amt = a.dot(b) / b.getMagnitudeSq();
  if (amt !== 0) {
    result.setTo(amt * b.x, amt * b.y);
  }
  return result;
}

/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} b - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function projectUnit(a, b, output = null) {
  const result = output || new Point();
  const amt = a.dot(b);
  if (amt !== 0) {
    result.setTo(amt * b.x, amt * b.y);
  }
  return result;
}

/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function normalRightHand(a, output = null) {
  const result = output || new Point();
  return result.setTo(a.y * -1, a.x);
}

/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function normalize(a, output = null) {
  const result = output || new Point();
  const m = a.getMagnitude();
  if (m !== 0) {
    result.setTo(a.x / m, a.y / m);
  }
  return result;
}

/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {number} x - TBD.
 * @param {number} y - TBD.
 * @param {number} ang - TBD.
 * @param {boolean} asDegrees - TBD.
 * @param {number} dist - TBD.
 * @returns {object} TBD.
 */
export function rotate(a, x, y, ang, asDegrees, dist) {
  if (asDegrees) {
    ang *= Math.PI / 180;
  }
  if (dist === undefined) {
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
}

/**
 * TBD.
 * @param {Point[]} points - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 * @throws Error TBD.
 */
export function centroid(points, output = null) {
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
}

/**
 * TBD.
 * @param {object} obj - TBD.
 * @param {string} xProp - TBD.
 * @param {string} yProp - TBD.
 * @returns {Point} TBD.
 */
export function parse(obj, xProp = 'x', yProp = 'y') {
  const point = new Point();
  if (obj[xProp]) {
    point.x = parseInt(obj[xProp], 10);
  }
  if (obj[yProp]) {
    point.y = parseInt(obj[yProp], 10);
  }
  return point;
}

/**
 * TBD.
 * @param {Point} input - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function clone(input, output = null) {
  const result = output || new Point();
  result.setTo(input.x, input.y);
  return result;
}
