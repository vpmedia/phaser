/**
 * @module geom/util/rounded_rectangle
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 */
import RoundedRectangle from '../rounded_rectangle';

/**
 * TBD.
 *
 * @returns {boolean} TBD.
 * @deprecated
 */
export default function () {
  return true;
}

/**
 * TBD.
 *
 * @param {object} input - TBD.
 * @param {object} output - TBD.
 * @returns {object} TBD.
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
