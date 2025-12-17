export class RoundedRectangle {
    /**
     * Creates a new RoundedRectangle instance.
     * @param {number} x - The x coordinate of the top-left corner of the rectangle (default: 0).
     * @param {number} y - The y coordinate of the top-left corner of the rectangle (default: 0).
     * @param {number} width - The width of the rectangle (default: 0).
     * @param {number} height - The height of the rectangle (default: 0).
     * @param {number} radius - The corner radius (default: 20).
     */
    constructor(x?: number, y?: number, width?: number, height?: number, radius?: number);
    x: number;
    y: number;
    width: number;
    height: number;
    radius: number;
    type: number;
    /**
     * Checks if the specified point is contained within this rounded rectangle.
     * @param {number} x - The x coordinate of the point to check.
     * @param {number} y - The y coordinate of the point to check.
     * @returns {boolean} True if the point is contained within this rounded rectangle, false otherwise.
     */
    contains(x: number, y: number): boolean;
    /**
     * Creates a clone of this rounded rectangle.
     * @returns {RoundedRectangle} A new rounded rectangle with the same values as this one.
     */
    clone(): RoundedRectangle;
}
//# sourceMappingURL=rounded_rectangle.d.ts.map