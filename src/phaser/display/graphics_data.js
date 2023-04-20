import { clone } from './graphics_data_util';

export class GraphicsData {
  /**
   *
   * @param lineWidth
   * @param lineColor
   * @param lineAlpha
   * @param fillColor
   * @param fillAlpha
   * @param fill
   * @param shape
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
   *
   */
  clone() {
    return clone(this);
  }
}
