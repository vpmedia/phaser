import { GraphicsData } from './graphics_data';

/**
 * TBD.
 * @param {GraphicsData} source - TBD.
 * @returns {GraphicsData} TBD.
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
