/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
import Circle from '../circle';
import Point from '../point';
import { degToRad, distance } from '../../util/math';

/**
 *
 * @param input
 * @param output
 */
export function clone(input, output = null) {
  const result = output || new Circle();
  result.x = input.x;
  result.y = input.y;
  result.diameter = input.diameter;
  return result;
}

/**
 *
 * @param a
 * @param x
 * @param y
 */
export function contains(a, x, y) {
  if (a.radius > 0 && x >= a.left && x <= a.right && y >= a.top && y <= a.bottom) {
    const dx = (a.x - x) * (a.x - x);
    const dy = (a.y - y) * (a.y - y);
    return (dx + dy) <= (a.radius * a.radius);
  }
  return false;
}

/**
 *
 * @param a
 * @param b
 */
export function equals(a, b) {
  return (a.x === b.x && a.y === b.y && a.diameter === b.diameter);
}

/**
 *
 * @param a
 * @param b
 */
export function intersects(a, b) {
  return distance(a.x, a.y, b.x, b.y) <= (a.radius + b.radius);
}

/**
 *
 * @param a
 * @param angle
 * @param asDegrees
 * @param output
 */
export function circumferencePoint(a, angle, asDegrees = false, output = null) {
  const result = output || new Point();
  if (asDegrees === true) {
    angle = degToRad(angle);
  }
  result.x = a.x + a.radius * Math.cos(angle);
  result.y = a.y + a.radius * Math.sin(angle);
  return result;
}

/**
 *
 * @param a
 * @param angle
 * @param asDegrees
 * @param output
 */
export function intersectsPoint(a, angle, asDegrees = false, output = null) {
  const result = output || new Point();
  if (asDegrees === true) {
    angle = degToRad(angle);
  }
  result.x = a.x + a.radius * Math.cos(angle);
  result.y = a.y + a.radius * Math.sin(angle);
  return result;
}

/**
 *
 * @param c
 * @param r
 */
export function intersectsRectangle(c, r) {
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
}
