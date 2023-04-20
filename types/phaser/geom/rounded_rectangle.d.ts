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
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @returns {boolean} TBD.
     */
    contains(x: number, y: number): boolean;
    /**
     * TBD.
     * @returns {RoundedRectangle} TBD.
     */
    clone(): RoundedRectangle;
}
//# sourceMappingURL=rounded_rectangle.d.ts.map