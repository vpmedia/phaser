import { clone } from './graphics_data_util';

export class GraphicsData {
  /**
   * TBD.
   * @param lineWidth - TBD.
   * @param lineColor - TBD.
   * @param lineAlpha - TBD.
   * @param fillColor - TBD.
   * @param fillAlpha - TBD.
   * @param fill - TBD.
   * @param shape - TBD.
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
