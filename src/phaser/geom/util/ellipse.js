/**
 * TBD.
 * @param {import('../ellipse.js').Ellipse} a - TBD.
 * @param {number} x - TBD.
 * @param {number} y - TBD.
 * @returns {boolean} TBD.
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
