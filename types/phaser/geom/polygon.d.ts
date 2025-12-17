export class Polygon {
    /**
     * Creates a new Polygon instance.
     * @param {object[]} points - The array of points to define the polygon (optional).
     */
    constructor(points?: object[]);
    /** @type {number} */
    area: number;
    /** @type {Point[]} */
    _points: Point[];
    /** @type {boolean} */
    closed: boolean;
    /** @type {boolean} */
    flattened: boolean;
    /** @type {number} */
    type: number;
    /**
     * Converts the polygon's points to a number array.
     * @param {number[]} output - The array to store the result in (optional).
     * @returns {number[]} An array of numbers representing the polygon's points.
     */
    toNumberArray(output?: number[]): number[];
    /**
     * Flattens the polygon's point array to a simple numeric array.
     * @returns {Polygon} This polygon instance for chaining.
     */
    flatten(): Polygon;
    /**
     * Creates a clone of this polygon.
     * @returns {Polygon} A new polygon with the same values as this one.
     */
    clone(): Polygon;
    /**
     * Checks if the specified point is contained within this polygon.
     * @param {number} x - The x coordinate of the point to check.
     * @param {number} y - The y coordinate of the point to check.
     * @returns {boolean} True if the point is contained within this polygon, false otherwise.
     */
    contains(x: number, y: number): boolean;
    /**
     * Sets the polygon's points to new values.
     * @param {object[]} points - The array of points to define the polygon.
     * @returns {Polygon} This polygon instance for chaining.
     */
    setTo(points: object[]): Polygon;
    /**
     * Calculates the area of this polygon.
     * @param {number} y0 - The y coordinate of the lowest boundary (internal use).
     * @returns {number} The area of this polygon.
     */
    calculateArea(y0: number): number;
    /**
     * Sets the points of this polygon.
     */
    set points(value: object[]);
    /**
     * Gets the points of this polygon.
     * @returns {object[]} The array of points that define this polygon.
     */
    get points(): object[];
}
import { Point } from './point.js';
//# sourceMappingURL=polygon.d.ts.map