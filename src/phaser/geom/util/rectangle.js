import { Point } from '../point.js';
import { Rectangle } from '../rectangle.js';

/**
 * Inflates the rectangle by the specified amounts on each axis.
 * @param {Rectangle} a - The rectangle to inflate.
 * @param {number} dx - The amount to inflate the rectangle horizontally.
 * @param {number} dy - The amount to inflate the rectangle vertically.
 * @returns {Rectangle} The inflated rectangle.
 */
export const inflate = (a, dx, dy) => {
  a.x -= dx;
  a.width += 2 * dx;
  a.y -= dy;
  a.height += 2 * dy;
  return a;
};

/**
 * Inflates the rectangle by the specified point values on each axis.
 * @param {Rectangle} a - The rectangle to inflate.
 * @param {object} point - The point containing x and y values to inflate the rectangle by.
 * @returns {Rectangle} The inflated rectangle.
 */
export const inflatePoint = (a, point) => {
  return inflate(a, point.x, point.y);
};

/**
 * Gets the size of the rectangle as a point.
 * @param {Rectangle} a - The rectangle to get the size of.
 * @param {Point} output - Optional point to store the result in.
 * @returns {Point} The size of the rectangle as a point (width, height).
 */
export const size = (a, output = null) => {
  const result = output || new Point();
  result.setTo(a.width, a.height);
  return result;
};

/**
 * Clones a rectangle.
 * @param {Rectangle} input - The rectangle to clone.
 * @param {Rectangle} output - Optional rectangle to store the result in.
 * @returns {Rectangle} The cloned rectangle.
 */
export const clone = (input, output = null) => {
  const result = output || new Rectangle();
  result.setTo(input.x, input.y, input.width, input.height);
  return result;
};

/**
 * Checks if a point is contained within the rectangle.
 * @param {Rectangle} a - The rectangle to check.
 * @param {number} x - The x coordinate of the point.
 * @param {number} y - The y coordinate of the point.
 * @returns {boolean} True if the point is contained within the rectangle, false otherwise.
 */
export const contains = (a, x, y) => {
  if (a.width <= 0 || a.height <= 0) {
    return false;
  }
  return x >= a.x && x < a.right && y >= a.y && y < a.bottom;
};

/**
 * Checks if a point is contained within the rectangle (raw version).
 * @param {number} rx - The x coordinate of the rectangle.
 * @param {number} ry - The y coordinate of the rectangle.
 * @param {number} rw - The width of the rectangle.
 * @param {number} rh - The height of the rectangle.
 * @param {number} x - The x coordinate of the point.
 * @param {number} y - The y coordinate of the point.
 * @returns {boolean} True if the point is contained within the rectangle, false otherwise.
 */
export const containsRaw = (rx, ry, rw, rh, x, y) => {
  return x >= rx && x < rx + rw && y >= ry && y < ry + rh;
};

/**
 * Checks if a point is contained within the rectangle.
 * @param {Rectangle} a - The rectangle to check.
 * @param {Point} point - The point to check.
 * @returns {boolean} True if the point is contained within the rectangle, false otherwise.
 */
export const containsPoint = (a, point) => {
  return contains(a, point.x, point.y);
};

/**
 * Checks if rectangle a contains rectangle b.
 * @param {Rectangle} a - The first rectangle to check.
 * @param {Rectangle} b - The second rectangle to check.
 * @returns {boolean} True if rectangle a contains rectangle b, false otherwise.
 */
export const containsRect = (a, b) => {
  if (a.volume > b.volume) {
    return false;
  }
  return a.x >= b.x && a.y >= b.y && a.right < b.right && a.bottom < b.bottom;
};

/**
 * Checks if two rectangles are equal.
 * @param {Rectangle} a - The first rectangle to compare.
 * @param {Rectangle} b - The second rectangle to compare.
 * @returns {boolean} True if the rectangles are equal, false otherwise.
 */
export const equals = (a, b) => {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
};

/**
 * Checks if two rectangles have the same dimensions.
 * @param {Rectangle} a - The first rectangle to compare.
 * @param {Rectangle} b - The second rectangle to compare.
 * @returns {boolean} True if the rectangles have the same dimensions, false otherwise.
 */
export const sameDimensions = (a, b) => {
  return a.width === b.width && a.height === b.height;
};

/**
 * Checks if two rectangles intersect.
 * @param {Rectangle} a - The first rectangle to check.
 * @param {Rectangle} b - The second rectangle to check.
 * @returns {boolean} True if the rectangles intersect, false otherwise.
 */
export const intersects = (a, b) => {
  if (a.width <= 0 || a.height <= 0 || b.width <= 0 || b.height <= 0) {
    return false;
  }
  return !(a.right < b.x || a.bottom < b.y || a.x > b.right || a.y > b.bottom);
};

/**
 * Gets the intersection of two rectangles.
 * @param {Rectangle} a - The first rectangle.
 * @param {Rectangle} b - The second rectangle.
 * @param {Rectangle} output - Optional rectangle to store the result in.
 * @returns {Rectangle} The intersection of the rectangles, or an empty rectangle if they don't intersect.
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
 * Checks if a rectangle intersects with a set of raw coordinates.
 * @param {Rectangle} a - The rectangle to check.
 * @param {number} left - The left coordinate of the area to check.
 * @param {number} right - The right coordinate of the area to check.
 * @param {number} top - The top coordinate of the area to check.
 * @param {number} bottom - The bottom coordinate of the area to check.
 * @param {number} tolerance - Optional tolerance value for intersection.
 * @returns {boolean} True if the rectangle intersects with the area, false otherwise.
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
 * Gets the union of two rectangles.
 * @param {Rectangle} a - The first rectangle.
 * @param {Rectangle} b - The second rectangle.
 * @param {Rectangle} output - Optional rectangle to store the result in.
 * @returns {Rectangle} The union of the rectangles.
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
 * Gets the axis-aligned bounding box (AABB) of a set of points.
 * @param {Point[]} points - The array of points to calculate the AABB for.
 * @param {Rectangle} output - Optional rectangle to store the result in.
 * @returns {Rectangle} The AABB of the points.
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
 * Gets an empty rectangle instance.
 * @returns {Rectangle} An empty rectangle.
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
