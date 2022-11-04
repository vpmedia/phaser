/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
import RoundedRectangle from '../rounded_rectangle';

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
 * @param {object} input TBD
 * @param {object} output TBD
 * @returns {object} TBD
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
