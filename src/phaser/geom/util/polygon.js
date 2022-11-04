/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
import Polygon from '../polygon';

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
  const result = output || new Polygon();
  result.setTo(input._points.slice());
  return result;
}
