/**
 * @module display/graphics_data_util
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 */
import { GraphicsData } from  './graphics_data';

/**
 * TBD.
 * @param {object} source - TBD.
 * @returns {object} TBD.
 */
export function clone(source) {
  return new GraphicsData(
    source.lineWidth,
    source.lineColor,
    source.lineAlpha,
    source.fillColor,
    source.fillAlpha,
    source.fill,
    source.shape
  );
}
