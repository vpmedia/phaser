export class Polygon {
    /**
     * TBD.
     * @param points
     */
    constructor(points?: any);
    area: number;
    _points: any[];
    closed: boolean;
    flattened: boolean;
    type: number;
    /**
     * TBD.
     * @param output
     */
    toNumberArray(output?: any[]): any[];
    /**
     * TBD.
     */
    flatten(): Polygon;
    /**
     * TBD.
     */
    clone(): Polygon;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    contains(x: number, y: number): boolean;
    /**
     * TBD.
     * @param points
     */
    setTo(points: any): Polygon;
    /**
     * TBD.
     * @param y0
     */
    calculateArea(y0: any): number;
    /**
     * TBD.
     */
    set points(arg: any[]);
    /**
     * TBD.
     */
    get points(): any[];
}
//# sourceMappingURL=polygon.d.ts.map