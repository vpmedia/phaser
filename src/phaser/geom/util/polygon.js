/**
 * @module geom/util/polygon
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 */
import Polygon from '../polygon';

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
  const result = output || new Polygon();
  result.setTo(input._points.slice());
  return result;
}
