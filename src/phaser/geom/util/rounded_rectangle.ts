import { RoundedRectangle } from '../rounded_rectangle.js';

/**
 * Clones a rounded rectangle.
 * @param {RoundedRectangle} input - The rounded rectangle to clone.
 * @param {RoundedRectangle} output - Optional rounded rectangle to store the result in.
 * @returns {RoundedRectangle} The cloned rounded rectangle.
 */
export const clone = (input, output = null) => {
  const result = output || new RoundedRectangle();
  result.x = input.x;
  result.y = input.y;
  result.width = input.width;
  result.height = input.height;
  result.radius = input.radius;
  return result;
};
