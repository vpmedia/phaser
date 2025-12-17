/**
 * Checks if a point is contained within the ellipse.
 * @param {import('../ellipse.js').Ellipse} a - The ellipse to check.
 * @param {number} x - The x coordinate of the point.
 * @param {number} y - The y coordinate of the point.
 * @returns {boolean} True if the point is contained within the ellipse, false otherwise.
 */
export const contains = (a, x, y) => {
  if (a.width <= 0 || a.height <= 0) {
    return false;
  }
  //  Normalize the coords to an ellipse with center 0,0 and a radius of 0.5
  let normx = (x - a.x) / a.width - 0.5;
  let normy = (y - a.y) / a.height - 0.5;
  normx *= normx;
  normy *= normy;
  return normx + normy < 0.25;
};
