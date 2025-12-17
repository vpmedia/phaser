export class GraphicsData {
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
    constructor(lineWidth: number, lineColor: number, lineAlpha: number, fillColor: number, fillAlpha: number, fill: boolean, shape: object);
    lineWidth: number;
    lineColor: number;
    lineAlpha: number;
    _lineTint: number;
    fillColor: number;
    fillAlpha: number;
    _fillTint: number;
    fill: boolean;
    shape: any;
    type: any;
    /**
     * Clones this GraphicsData object.
     * @returns {GraphicsData} A new cloned GraphicsData object.
     */
    clone(): GraphicsData;
}
//# sourceMappingURL=graphics_data.d.ts.map