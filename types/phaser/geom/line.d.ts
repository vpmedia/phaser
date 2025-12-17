export class Line {
    /**
     * Creates a new Line instance.
     * @param {number} x1 - The x coordinate of the start point (default: 0).
     * @param {number} y1 - The y coordinate of the start point (default: 0).
     * @param {number} x2 - The x coordinate of the end point (default: 0).
     * @param {number} y2 - The y coordinate of the end point (default: 0).
     */
    constructor(x1?: number, y1?: number, x2?: number, y2?: number);
    /** @type {Point} */
    start: Point;
    /** @type {Point} */
    end: Point;
    /** @type {number} */
    type: number;
    /**
     * Sets the coordinates of this line to new values.
     * @param {number} x1 - The new x coordinate of the start point.
     * @param {number} y1 - The new y coordinate of the start point.
     * @param {number} x2 - The new x coordinate of the end point.
     * @param {number} y2 - The new y coordinate of the end point.
     * @returns {Line} This line instance for chaining.
     */
    setTo(x1: number, y1: number, x2: number, y2: number): Line;
    /**
     * Sets the coordinates of this line to match the positions of two sprites.
     * @param {object} startSprite - The starting sprite to get the position from.
     * @param {object} endSprite - The ending sprite to get the position from.
     * @param {boolean} useCenter - Whether to use the center of the sprites (default: false).
     * @returns {Line} This line instance for chaining.
     */
    fromSprite(startSprite: object, endSprite: object, useCenter?: boolean): Line;
    /**
     * Sets the coordinates of this line to a point at a specific angle and distance.
     * @param {number} x - The x coordinate of the starting point.
     * @param {number} y - The y coordinate of the starting point.
     * @param {number} angle - The angle in radians to set the line at.
     * @param {number} length - The length of the line.
     * @returns {Line} This line instance for chaining.
     */
    fromAngle(x: number, y: number, angle: number, length: number): Line;
    /**
     * Rotates this line around its center point by the specified angle.
     * @param {number} angle - The angle in radians (or degrees if asDegrees is true) to rotate by.
     * @param {boolean} asDegrees - Whether the angle is provided in degrees (default: false).
     * @returns {Line} This line instance for chaining.
     */
    rotate(angle: number, asDegrees?: boolean): Line;
    /**
     * Rotates this line around a specific point by the specified angle.
     * @param {number} x - The x coordinate of the center point to rotate around.
     * @param {number} y - The y coordinate of the center point to rotate around.
     * @param {number} angle - The angle in radians (or degrees if asDegrees is true) to rotate by.
     * @param {boolean} asDegrees - Whether the angle is provided in degrees (default: false).
     * @returns {Line} This line instance for chaining.
     */
    rotateAround(x: number, y: number, angle: number, asDegrees?: boolean): Line;
    /**
     * Checks if this line intersects with another line.
     * @param {Line} line - The other line to check for intersection with.
     * @param {boolean} asSegment - Whether to treat the lines as segments (default: false).
     * @param {Point} result - The point to store the intersection in (optional).
     * @returns {Point} The intersection point, or null if no intersection occurs.
     */
    intersects(line: Line, asSegment: boolean, result: Point): Point;
    /**
     * Calculates the reflection of this line off another line.
     * @param {Line} line - The line to reflect off.
     * @returns {number} The angle of reflection in radians.
     */
    reflect(line: Line): number;
    /**
     * Returns the midpoint of this line.
     * @param {Point} output - The point to store the result in (optional).
     * @returns {Point} The midpoint of this line.
     */
    midPoint(output?: Point): Point;
    /**
     * Centers this line on the specified point.
     * @param {number} x - The x coordinate to center the line on.
     * @param {number} y - The y coordinate to center the line on.
     */
    centerOn(x: number, y: number): void;
    /**
     * Checks if the specified point lies on this line (not necessarily on the segment).
     * @param {number} x - The x coordinate of the point to check.
     * @param {number} y - The y coordinate of the point to check.
     * @returns {boolean} True if the point lies on this line, false otherwise.
     */
    pointOnLine(x: number, y: number): boolean;
    /**
     * Checks if the specified point lies on this line segment.
     * @param {number} x - The x coordinate of the point to check.
     * @param {number} y - The y coordinate of the point to check.
     * @returns {boolean} True if the point lies on this line segment, false otherwise.
     */
    pointOnSegment(x: number, y: number): boolean;
    /**
     * Returns a random point on this line.
     * @param {Point} output - The point to store the result in (optional).
     * @returns {Point} A random point on this line.
     */
    random(output?: Point): Point;
    /**
     * Gets coordinates of points along this line at regular intervals.
     * @param {number} stepRate - The interval between points (default: 1).
     * @param {number[][]} results - The array to store the results in (optional).
     * @returns {number[][]} An array of coordinate pairs representing points along this line.
     */
    coordinatesOnLine(stepRate?: number, results?: number[][]): number[][];
    /**
     * Creates a clone of this line.
     * @returns {Line} A new line with the same values as this one.
     */
    clone(): Line;
    /**
     * Gets the length of this line.
     * @returns {number} The length of this line.
     */
    get length(): number;
    /**
     * Gets the angle of this line in radians.
     * @returns {number} The angle of this line in radians.
     */
    get angle(): number;
    /**
     * Gets the slope of this line.
     * @returns {number} The slope of this line.
     */
    get slope(): number;
    /**
     * Gets the perpendicular slope of this line.
     * @returns {number} The perpendicular slope of this line.
     */
    get perpSlope(): number;
    /**
     * Gets the x coordinate of the leftmost point on this line.
     * @returns {number} The x coordinate of the leftmost point on this line.
     */
    get x(): number;
    /**
     * Gets the y coordinate of the topmost point on this line.
     * @returns {number} The y coordinate of the topmost point on this line.
     */
    get y(): number;
    /**
     * Gets the x coordinate of the leftmost point on this line.
     * @returns {number} The x coordinate of the leftmost point on this line.
     */
    get left(): number;
    /**
     * Gets the x coordinate of the rightmost point on this line.
     * @returns {number} The x coordinate of the rightmost point on this line.
     */
    get right(): number;
    /**
     * Gets the y coordinate of the topmost point on this line.
     * @returns {number} The y coordinate of the topmost point on this line.
     */
    get top(): number;
    /**
     * Gets the y coordinate of the bottommost point on this line.
     * @returns {number} The y coordinate of the bottommost point on this line.
     */
    get bottom(): number;
    /**
     * Gets the width of this line (absolute difference between x coordinates).
     * @returns {number} The width of this line.
     */
    get width(): number;
    /**
     * Gets the height of this line (absolute difference between y coordinates).
     * @returns {number} The height of this line.
     */
    get height(): number;
    /**
     * Gets the normal vector x component of this line (perpendicular to the line).
     * @returns {number} The normal vector x component of this line.
     */
    get normalX(): number;
    /**
     * Gets the normal vector y component of this line (perpendicular to the line).
     * @returns {number} The normal vector y component of this line.
     */
    get normalY(): number;
    /**
     * Gets the angle of the normal vector of this line in radians.
     * @returns {number} The angle of the normal vector of this line in radians.
     */
    get normalAngle(): number;
}
import { Point } from './point.js';
//# sourceMappingURL=line.d.ts.map