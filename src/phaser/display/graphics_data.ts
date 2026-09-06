import type { Circle } from '../geom/circle.js';
import type { Ellipse } from '../geom/ellipse.js';
import type { Polygon } from '../geom/polygon.js';
import type { Rectangle } from '../geom/rectangle.js';
import type { RoundedRectangle } from '../geom/rounded_rectangle.js';
import { clone } from './graphics_data_util.js';

/** The geometry a graphics path can be built from. */
export type GraphicsShape = Circle | Ellipse | Polygon | Rectangle | RoundedRectangle;

export class GraphicsData {
  public lineWidth: number;
  public lineColor: number;
  public lineAlpha: number;
  public _lineTint: number;
  public fillColor: number | null;
  public fillAlpha: number;
  public _fillTint: number | null;
  public fill: boolean;
  public shape: GraphicsShape;
  public type: number;
  /** Flattened points the WebGL builders work from, filled in while updating the graphics. */
  public points: number[] = [];
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
    fillColor: number | null,
    fillAlpha: number,
    fill: boolean,
    shape: GraphicsShape
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
  public clone(): GraphicsData {
    return clone(this);
  }
}
