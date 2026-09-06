import { clone } from './graphics_data_util.js';

export class GraphicsData {
  public lineWidth!: any;
  public lineColor!: any;
  public lineAlpha!: any;
  public _lineTint!: any;
  public fillColor!: any;
  public fillAlpha!: any;
  public _fillTint!: any;
  public fill!: any;
  public shape!: any;
  public type!: any;
  /**
   * Creates a new GraphicsData object.
   * @param {number} lineWidth - The line width.
   * @param {number} lineColor - The line color.
   * @param {number} lineAlpha - The line alpha.
   * @param {number} fillColor - The fill color.
   * @param {number} fillAlpha - The fill alpha.
   * @param {boolean} fill - Whether to fill the shape.
   * @param {object} shape - The shape to draw.
   */
  public constructor(
    lineWidth: number,
    lineColor: number,
    lineAlpha: number,
    fillColor: number,
    fillAlpha: number,
    fill: boolean,
    shape: any
  ) {
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
   * Clones this GraphicsData object.
   * @returns {GraphicsData} A new cloned GraphicsData object.
   */
  public clone() {
    return clone(this);
  }
}
