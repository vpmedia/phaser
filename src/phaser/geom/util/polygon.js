import { Polygon } from '../polygon.js';

/**
 * TBD.
 * @param {Polygon} input - TBD.
 * @param {Polygon} output - TBD.
 * @returns {Polygon} TBD.
 */
export function clone(input, output = null) {
  const result = output || new Polygon();
  result.setTo(input._points.slice());
  return result;
}
