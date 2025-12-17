export class Circle {
    /**
     * Creates a new Circle instance.
     * @param {number} x - The x coordinate of the center point (default: 0).
     * @param {number} y - The y coordinate of the center point (default: 0).
     * @param {number} diameter - The diameter of the circle (default: 0).
     */
    constructor(x?: number, y?: number, diameter?: number);
    /** @type {number} */
    x: number;
    /** @type {number} */
    y: number;
    /** @type {number} */
    _diameter: number;
    /** @type {number} */
    _radius: number;
    /** @type {number} */
    type: number;
    /**
     * Calculates the circumference of this circle.
     * @returns {number} The circumference of this circle.
     */
    circumference(): number;
    /**
     * Returns a random point within this circle.
     * @param {Point} output - The point to store the result in (optional).
     * @returns {Point} A random point within this circle.
     */
    random(output?: Point): Point;
    /**
     * Gets the bounding rectangle of this circle.
     * @returns {Rectangle} The bounding rectangle of this circle.
     */
    getBounds(): Rectangle;
    /**
     * Sets the position and size of this circle to new values.
     * @param {number} x - The new x coordinate of the center point.
     * @param {number} y - The new y coordinate of the center point.
     * @param {number} diameter - The new diameter of the circle.
     * @returns {Circle} This circle instance for chaining.
     */
    setTo(x: number, y: number, diameter: number): Circle;
    /**
     * Copies the values from another circle to this circle.
     * @param {Circle} source - The circle to copy values from.
     * @returns {Circle} This circle instance for chaining.
     */
    copyFrom(source: Circle): Circle;
    /**
     * Copies the values of this circle to another circle.
     * @param {Circle} dest - The circle to copy values to.
     * @returns {Circle} The destination circle.
     */
    copyTo(dest: Circle): Circle;
    /**
     * Calculates the distance between this circle and another circle.
     * @param {Circle} dest - The other circle to calculate the distance to.
     * @param {boolean} round - Whether to round the result (default: false).
     * @returns {number} The distance between the circles.
     */
    distance(dest: Circle, round?: boolean): number;
    /**
     * Creates a clone of this circle.
     * @returns {Circle} A new circle with the same values as this one.
     */
    clone(): Circle;
    /**
     * Checks if the specified point is contained within this circle.
     * @param {number} x - The x coordinate of the point to check.
     * @param {number} y - The y coordinate of the point to check.
     * @returns {boolean} True if the point is contained within this circle, false otherwise.
     */
    contains(x: number, y: number): boolean;
    /**
     * Gets a point at a specific angle on the circumference of this circle.
     * @param {number} angle - The angle in radians (or degrees if asDegrees is true) to get the point for.
     * @param {boolean} asDegrees - Whether the angle is provided in degrees (default: false).
     * @param {Point} out - The point to store the result in (optional).
     * @returns {Point} A point at the specified angle on the circumference of this circle.
     */
    circumferencePoint(angle: number, asDegrees: boolean, out: Point): Point;
    /**
     * Offsets the position of this circle by the specified amounts.
     * @param {number} dx - The amount to offset the x coordinate by.
     * @param {number} dy - The amount to offset the y coordinate by.
     * @returns {Circle} This circle instance for chaining.
     */
    offset(dx: number, dy: number): Circle;
    /**
     * Offsets the position of this circle by the specified point coordinates.
     * @param {Point} point - The point to offset the circle by.
     * @returns {Circle} This circle instance for chaining.
     */
    offsetPoint(point: Point): Circle;
    /**
     * Returns a string representation of this circle.
     * @returns {string} A string representation of the circle.
     */
    toString(): string;
    /**
     * Sets the diameter of this circle.
     */
    set diameter(value: number);
    /**
     * Gets the diameter of this circle.
     * @returns {number} The diameter of this circle.
     */
    get diameter(): number;
    /**
     * Sets the radius of this circle.
     */
    set radius(value: number);
    /**
     * Gets the radius of this circle.
     * @returns {number} The radius of this circle.
     */
    get radius(): number;
    /**
     * Sets the left coordinate of this circle.
     */
    set left(value: number);
    /**
     * Gets the left coordinate of this circle.
     * @returns {number} The left coordinate of this circle.
     */
    get left(): number;
    /**
     * Sets the right coordinate of this circle.
     */
    set right(value: number);
    /**
     * Gets the right coordinate of this circle.
     * @returns {number} The right coordinate of this circle.
     */
    get right(): number;
    /**
     * Sets the top coordinate of this circle.
     */
    set top(value: number);
    /**
     * Gets the top coordinate of this circle.
     * @returns {number} The top coordinate of this circle.
     */
    get top(): number;
    /**
     * Sets the bottom coordinate of this circle.
     */
    set bottom(value: number);
    /**
     * Gets the bottom coordinate of this circle.
     * @returns {number} The bottom coordinate of this circle.
     */
    get bottom(): number;
    /**
     * Gets the area of this circle.
     * @returns {number} The area of this circle.
     */
    get area(): number;
    /**
     * Sets whether this circle is empty (zero diameter).
     */
    set empty(value: boolean);
    /**
     * Checks if this circle is empty (has zero diameter).
     * @returns {boolean} True if the circle is empty, false otherwise.
     */
    get empty(): boolean;
}
import { Point } from './point.js';
import { Rectangle } from './rectangle.js';
//# sourceMappingURL=circle.d.ts.map