import { Point } from '../point.js';
import { Rectangle } from '../rectangle.js';

/**
 * TBD.
 * @param {Rectangle} a - TBD.
 * @param {number} dx - TBD.
 * @param {number} dy - TBD.
 * @returns {Rectangle} TBD.
 */
export const inflate = (a, dx, dy) => {
  a.x -= dx;
  a.width += 2 * dx;
  a.y -= dy;
  a.height += 2 * dy;
  return a;
};

/**
 * TBD.
 * @param {Rectangle} a - TBD.
 * @param {object} point - TBD.
 * @returns {Rectangle} TBD.
 */
export const inflatePoint = (a, point) => {
  return inflate(a, point.x, point.y);
};

/**
 * TBD.
 * @param {Rectangle} a - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export const size = (a, output = null) => {
  const result = output || new Point();
  result.setTo(a.width, a.height);
  return result;
};

/**
 * TBD.
 * @param {Rectangle} input - TBD.
 * @param {Rectangle} output - TBD.
 * @returns {Rectangle} TBD.
 */
export const clone = (input, output = null) => {
  const result = output || new Rectangle();
  result.setTo(input.x, input.y, input.width, input.height);
  return result;
};

/**
 * TBD.
 * @param {Rectangle} a - TBD.
 * @param {number} x - TBD.
 * @param {number} y - TBD.
 * @returns {boolean} TBD.
 */
export const contains = (a, x, y) => {
  if (a.width <= 0 || a.height <= 0) {
    return false;
  }
  return x >= a.x && x < a.right && y >= a.y && y < a.bottom;
};

/**
 * TBD.
 * @param {number} rx - TBD.
 * @param {number} ry - TBD.
 * @param {number} rw - TBD.
 * @param {number} rh - TBD.
 * @param {number} x - TBD.
 * @param {number} y - TBD.
 * @returns {boolean} TBD.
 */
export const containsRaw = (rx, ry, rw, rh, x, y) => {
  return x >= rx && x < rx + rw && y >= ry && y < ry + rh;
};

/**
 * TBD.
 * @param {Rectangle} a - TBD.
 * @param {Point} point - TBD.
 * @returns {boolean} TBD.
 */
export const containsPoint = (a, point) => {
  return contains(a, point.x, point.y);
};

/**
 * TBD.
 * @param {Rectangle} a - TBD.
 * @param {Rectangle} b - TBD.
 * @returns {boolean} TBD.
 */
export const containsRect = (a, b) => {
  if (a.volume > b.volume) {
    return false;
  }
  return a.x >= b.x && a.y >= b.y && a.right < b.right && a.bottom < b.bottom;
};

/**
 * TBD.
 * @param {Rectangle} a - TBD.
 * @param {Rectangle} b - TBD.
 * @returns {boolean} TBD.
 */
export const equals = (a, b) => {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
};

/**
 * TBD.
 * @param {Rectangle} a - TBD.
 * @param {Rectangle} b - TBD.
 * @returns {boolean} TBD.
 */
export const sameDimensions = (a, b) => {
  return a.width === b.width && a.height === b.height;
};

/**
 * TBD.
 * @param {Rectangle} a - TBD.
 * @param {Rectangle} b - TBD.
 * @returns {boolean} TBD.
 */
export const intersects = (a, b) => {
  if (a.width <= 0 || a.height <= 0 || b.width <= 0 || b.height <= 0) {
    return false;
  }
  return !(a.right < b.x || a.bottom < b.y || a.x > b.right || a.y > b.bottom);
};

/**
 * TBD.
 * @param {Rectangle} a - TBD.
 * @param {Rectangle} b - TBD.
 * @param {Rectangle} output - TBD.
 * @returns {Rectangle} TBD.
 */
export const intersection = (a, b, output = null) => {
  const result = output || new Rectangle();
  if (intersects(a, b)) {
    result.x = Math.max(a.x, b.x);
    result.y = Math.max(a.y, b.y);
    result.width = Math.min(a.right, b.right) - result.x;
    result.height = Math.min(a.bottom, b.bottom) - result.y;
  }
  return result;
};

/**
 * TBD.
 * @param {Rectangle} a - TBD.
 * @param {number} left - TBD.
 * @param {number} right - TBD.
 * @param {number} top - TBD.
 * @param {number} bottom - TBD.
 * @param {number} tolerance - TBD.
 * @returns {boolean} TBD.
 */
export const intersectsRaw = (a, left, right, top, bottom, tolerance = 0) => {
  return !(
    left > a.right + tolerance ||
    right < a.left - tolerance ||
    top > a.bottom + tolerance ||
    bottom < a.top - tolerance
  );
};

/**
 * TBD.
 * @param {Rectangle} a - TBD.
 * @param {Rectangle} b - TBD.
 * @param {Rectangle} output - TBD.
 * @returns {Rectangle} TBD.
 */
export const union = (a, b, output = null) => {
  const result = output || new Rectangle();
  return result.setTo(
    Math.min(a.x, b.x),
    Math.min(a.y, b.y),
    Math.max(a.right, b.right) - Math.min(a.left, b.left),
    Math.max(a.bottom, b.bottom) - Math.min(a.top, b.top)
  );
};

/**
 * TBD.
 * @param {Point[]} points - TBD.
 * @param {Rectangle} output - TBD.
 * @returns {Rectangle} TBD.
 */
export const aabb = (points, output = null) => {
  const result = output || new Rectangle();
  let xMax = Number.NEGATIVE_INFINITY;
  let xMin = Number.POSITIVE_INFINITY;
  let yMax = Number.NEGATIVE_INFINITY;
  let yMin = Number.POSITIVE_INFINITY;
  points.forEach((point) => {
    if (point.x > xMax) {
      xMax = point.x;
    }
    if (point.x < xMin) {
      xMin = point.x;
    }
    if (point.y > yMax) {
      yMax = point.y;
    }
    if (point.y < yMin) {
      yMin = point.y;
    }
  });
  result.setTo(xMin, yMin, xMax - xMin, yMax - yMin);
  return result;
};

/**
 * TBD.
 * @returns {Rectangle} TBD.
 */
export const getEmptyRectangle = () => {
  if (!window.PhaserRegistry) {
    window.PhaserRegistry = {};
  }
  if (!window.PhaserRegistry.EMPTY_RECTANGLE) {
    window.PhaserRegistry.EMPTY_RECTANGLE = new Rectangle();
  }
  return window.PhaserRegistry.EMPTY_RECTANGLE;
};
