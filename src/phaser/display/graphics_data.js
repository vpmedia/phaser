import { clone } from './graphics_data_util';

export class GraphicsData {
  /**
   * TBD.
   * @param {number} lineWidth - TBD.
   * @param {number} lineColor - TBD.
   * @param {number} lineAlpha - TBD.
   * @param {number} fillColor - TBD.
   * @param {number} fillAlpha - TBD.
   * @param {boolean} fill - TBD.
   * @param {object} shape - TBD.
   */
  constructor(lineWidth, lineColor, lineAlpha, fillColor, fillAlpha, fill, shape) {
    this.lineWidth = lineWidth;
    this.lineColor = lineColor;
    this.lineAlpha = lineAlpha;
    this._lineTint = lineColor;
    this.fillColor = fillColor;
    this.fillAlpha = fillAlpha;
    this._fillTint = fillColor;
    this.fill = fill;
    this.shape = shape;
    this.type = shape.type;
  }

  /**
   * TBD.
   * @returns {GraphicsData} TBD.
   */
  clone() {
    return clone(this);
  }
}
