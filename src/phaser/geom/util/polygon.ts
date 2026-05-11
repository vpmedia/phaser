import { Polygon } from '../polygon.js';

/**
 * Clones a polygon.
 * @param {Polygon} input - The polygon to clone.
 * @param {Polygon} output - Optional polygon to store the result in.
 * @returns {Polygon} The cloned polygon.
 */
export const clone = (input: Polygon, output: Polygon = null) => {
  const result = output || new Polygon();
  result.setTo(input._points.slice());
  return result;
};
