/**
 * @module geom/util/line
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 */
import Point from '../point';
import Line from '../line';
import { intersects as intersectsRect } from './rectangle';

/**
 * TBD.
 *
 * @param {Line} input - TBD.
 * @param {Line} output - TBD.
 * @returns {Line} TBD.
 */
export function clone(input, output = null) {
  const result = output || new Line();
  result.start.x = input.start.x;
  result.start.y = input.start.y;
  result.end.x = input.end.x;
  result.end.y = input.end.y;
  return result;
}

/**
 * TBD.
 *
 * @param {object} a - TBD.
 * @param {object} b - TBD.
 * @param {object} e - TBD.
 * @param {object} f - TBD.
 * @param {boolean} asSegment - TBD.
 * @param {Point} output - TBD.
 * @returns {boolean} TBD.
 */
export function intersectsPoints(a, b, e, f, asSegment = true, output = null) {
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
}

/**
 * TBD.
 *
 * @param {object} a - TBD.
 * @param {object} b - TBD.
 * @param {boolean} asSegment - TBD.
 * @param {object} result - TBD.
 * @returns {boolean} TBD.
 */
export function intersects(a, b, asSegment, result) {
  return intersectsPoints(a.start, a.end, b.start, b.end, asSegment, result);
}

/**
 * TBD.
 *
 * @param {object} line - TBD.
 * @param {object} rect - TBD.
 * @returns {boolean} TBD.
 */
export function intersectsRectangle(line, rect) {
  //  Quick bail out of the Line and Rect bounds don't intersect
  if (intersectsRect(line, rect)) {
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
  if (
    (x1 >= bx1 && x1 <= bx2 && y1 >= by1 && y1 <= by2) ||
    (x2 >= bx1 && x2 <= bx2 && y2 >= by1 && y2 <= by2)
  ) {
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
}

/**
 * TBD.
 *
 * @param {object} a - TBD.
 * @param {object} b - TBD.
 * @returns {number} TBD.
 */
export function reflect(a, b) {
  return 2 * b.normalAngle - 3.141592653589793 - a.angle;
}
