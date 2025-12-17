export class Ellipse {
    /**
     * Creates a new Ellipse instance.
     * @param {number} x - The x coordinate of the center point (default: 0).
     * @param {number} y - The y coordinate of the center point (default: 0).
     * @param {number} width - The width of the ellipse (default: 0).
     * @param {number} height - The height of the ellipse (default: 0).
     */
    constructor(x?: number, y?: number, width?: number, height?: number);
    /** @type {number} */
    x: number;
    /** @type {number} */
    y: number;
    /** @type {number} */
    width: number;
    /** @type {number} */
    height: number;
    /** @type {number} */
    type: number;
    /**
     * Sets the position and size of this ellipse to new values.
     * @param {number} x - The new x coordinate of the center point.
     * @param {number} y - The new y coordinate of the center point.
     * @param {number} width - The new width of the ellipse.
     * @param {number} height - The new height of the ellipse.
     * @returns {Ellipse} This ellipse instance for chaining.
     */
    setTo(x: number, y: number, width: number, height: number): Ellipse;
    /**
     * Gets the bounding rectangle of this ellipse.
     * @returns {Rectangle} The bounding rectangle of this ellipse.
     */
    getBounds(): Rectangle;
    /**
     * Copies the values from another ellipse to this ellipse.
     * @param {Ellipse} source - The ellipse to copy values from.
     * @returns {Ellipse} This ellipse instance for chaining.
     */
    copyFrom(source: Ellipse): Ellipse;
    /**
     * Copies the values of this ellipse to another ellipse.
     * @param {Ellipse} dest - The ellipse to copy values to.
     * @returns {Ellipse} The destination ellipse.
     */
    copyTo(dest: Ellipse): Ellipse;
    /**
     * Checks if the specified point is contained within this ellipse.
     * @param {number} x - The x coordinate of the point to check.
     * @param {number} y - The y coordinate of the point to check.
     * @returns {boolean} True if the point is contained within this ellipse, false otherwise.
     */
    contains(x: number, y: number): boolean;
    /**
     * Returns a random point within this ellipse.
     * @param {Point} output - The point to store the result in (optional).
     * @returns {Point} A random point within this ellipse.
     */
    random(output?: Point): Point;
    /**
     * Returns a string representation of this ellipse.
     * @returns {string} A string representation of the ellipse.
     */
    toString(): string;
}
import { Rectangle } from './rectangle.js';
import { Point } from './point.js';
//# sourceMappingURL=ellipse.d.ts.map