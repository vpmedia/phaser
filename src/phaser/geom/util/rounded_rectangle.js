import { RoundedRectangle } from '../rounded_rectangle';

/**
 * TBD.
 * @param {RoundedRectangle} input - TBD.
 * @param {RoundedRectangle} output - TBD.
 * @returns {RoundedRectangle} TBD.
 */
export function clone(input, output = null) {
  const result = output || new RoundedRectangle();
  result.x = input.x;
  result.y = input.y;
  result.width = input.width;
  result.height = input.height;
  result.radius = input.radius;
  return result;
}
