import { GraphicsData } from './graphics_data';

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
