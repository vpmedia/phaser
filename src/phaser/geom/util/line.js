import { Line } from '../line.js';
import { Point } from '../point.js';
import { intersects as intersectsRect } from './rectangle.js';

/**
 * Clones a line.
 * @param {Line} input - The line to clone.
 * @param {Line} output - Optional line to store the result in.
 * @returns {Line} The cloned line.
 */
export const clone = (input, output = null) => {
  const result = output || new Line();
  result.start.x = input.start.x;
  result.start.y = input.start.y;
  result.end.x = input.end.x;
  result.end.y = input.end.y;
  return result;
};

/**
 * Gets the intersection point of two lines.
 * @param {object} a - The first line (with x1, y1, x2, y2 properties).
 * @param {object} b - The second line (with x1, y1, x2, y2 properties).
 * @param {object} e - The first endpoint of the first line (with x, y properties).
 * @param {object} f - The second endpoint of the second line (with x, y properties).
 * @param {boolean} asSegment - True if the lines are treated as segments, false if infinite lines.
 * @param {Point} output - Optional point to store the result in.
 * @returns {Point} The intersection point, or null if there is no intersection.
 */
export const intersectsPoints = (a, b, e, f, asSegment = true, output = null) => {
  const result = output || new Point();
  const a1 = b.y - a.y;
  const a2 = f.y - e.y;
  const b1 = a.x - b.x;
  const b2 = e.x - f.x;
  const c1 = b.x * a.y - a.x * b.y;
  const c2 = f.x * e.y - e.x * f.y;
  const denom = a1 * b2 - a2 * b1;
  if (denom === 0) {
    return null;
  }
  result.x = (b1 * c2 - b2 * c1) / denom;
  result.y = (a2 * c1 - a1 * c2) / denom;
  if (asSegment) {
    const uc = (f.y - e.y) * (b.x - a.x) - (f.x - e.x) * (b.y - a.y);
    const ua = ((f.x - e.x) * (a.y - e.y) - (f.y - e.y) * (a.x - e.x)) / uc;
    const ub = ((b.x - a.x) * (a.y - e.y) - (b.y - a.y) * (a.x - e.x)) / uc;
    if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
      return result;
    }
    return null;
  }
  return result;
};

/**
 * Gets the intersection point of two lines (alternative implementation).
 * @param {object} a - The first line (with x1, y1, x2, y2 properties).
 * @param {object} b - The second line (with x1, y1, x2, y2 properties).
 * @param {boolean} asSegment - True if the lines are treated as segments, false if infinite lines.
 * @param {Point} result - Optional point to store the result in.
 * @returns {Point} The intersection point, or null if there is no intersection.
 */
export const intersects = (a, b, asSegment, result) => {
  return intersectsPoints(a.start, a.end, b.start, b.end, asSegment, result);
};

/**
 * Checks if a line intersects with a rectangle.
 * @param {object} line - The line to check (with x1, y1, x2, y2 properties).
 * @param {object} rect - The rectangle to check (with x, y, width, height properties).
 * @returns {boolean} True if the line intersects with the rectangle, false otherwise.
 */
export const intersectsRectangle = (line, rect) => {
  //  Quick bail out of the Line and Rect bounds don't intersect
  if (!intersectsRect(line, rect)) {
    return false;
  }
  const x1 = line.start.x;
  const y1 = line.start.y;
  const x2 = line.end.x;
  const y2 = line.end.y;
  const bx1 = rect.x;
  const by1 = rect.y;
  const bx2 = rect.right;
  const by2 = rect.bottom;
  let t = 0;
  //  If the start or end of the line is inside the rect then we assume
  //  collision, as rects are solid for our use-case.
  if ((x1 >= bx1 && x1 <= bx2 && y1 >= by1 && y1 <= by2) || (x2 >= bx1 && x2 <= bx2 && y2 >= by1 && y2 <= by2)) {
    return true;
  }
  if (x1 < bx1 && x2 >= bx1) {
    //  Left edge
    t = y1 + ((y2 - y1) * (bx1 - x1)) / (x2 - x1);
    if (t > by1 && t <= by2) {
      return true;
    }
  } else if (x1 > bx2 && x2 <= bx2) {
    //  Right edge
    t = y1 + ((y2 - y1) * (bx2 - x1)) / (x2 - x1);
    if (t >= by1 && t <= by2) {
      return true;
    }
  }
  if (y1 < by1 && y2 >= by1) {
    //  Top edge
    t = x1 + ((x2 - x1) * (by1 - y1)) / (y2 - y1);
    if (t >= bx1 && t <= bx2) {
      return true;
    }
  } else if (y1 > by2 && y2 <= by2) {
    //  Bottom edge
    t = x1 + ((x2 - x1) * (by2 - y1)) / (y2 - y1);
    if (t >= bx1 && t <= bx2) {
      return true;
    }
  }
  return false;
};

/**
 * Calculates the distance between two points (line length).
 * @param {object} a - The first point (with x, y properties).
 * @param {object} b - The second point (with x, y properties).
 * @returns {number} The distance between the points.
 */
export const reflect = (a, b) => {
  return 2 * b.normalAngle - 3.141592653589793 - a.angle;
};
