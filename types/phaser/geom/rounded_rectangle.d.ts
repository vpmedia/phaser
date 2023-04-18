export class RoundedRectangle {
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     * @param {number} radius - TBD.
     */
    constructor(x?: number, y?: number, width?: number, height?: number, radius?: number);
    x: number;
    y: number;
    width: number;
    height: number;
    radius: number;
    type: number;
    contains(x: any, y: any): boolean;
    clone(): RoundedRectangle;
}
//# sourceMappingURL=rounded_rectangle.d.ts.map