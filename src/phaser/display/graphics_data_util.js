import { GraphicsData } from './graphics_data.js';

/**
 * Clones a GraphicsData object.
 * @param {GraphicsData} source - The source GraphicsData to clone.
 * @returns {GraphicsData} A new cloned GraphicsData object.
 */
export const clone = (source) => {
  return new GraphicsData(
    source.lineWidth,
    source.lineColor,
    source.lineAlpha,
    source.fillColor,
    source.fillAlpha,
    source.fill,
    source.shape
  );
};
