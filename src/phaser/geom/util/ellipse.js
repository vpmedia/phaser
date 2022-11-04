/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */

/**
 * TBD
 *
 * @deprecated
 * @returns {boolean} TBD
 */
export default function () {
  return true;
}

/**
 *
 * @param {object} a TBD
 * @param {number} x TBD
 * @param {number} y TBD
 * @returns {boolean} TBD
 */
export function contains(a, x, y) {
  if (a.width <= 0 || a.height <= 0) {
    return false;
  }
  //  Normalize the coords to an ellipse with center 0,0 and a radius of 0.5
  let normx = ((x - a.x) / a.width) - 0.5;
  let normy = ((y - a.y) / a.height) - 0.5;
  normx *= normx;
  normy *= normy;
  return (normx + normy < 0.25);
}
