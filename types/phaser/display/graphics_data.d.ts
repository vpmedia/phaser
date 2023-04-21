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
     * TBD.
     * @returns {GraphicsData} TBD.
     */
    clone(): GraphicsData;
}
//# sourceMappingURL=graphics_data.d.ts.map