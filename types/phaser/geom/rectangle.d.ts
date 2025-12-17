export class Rectangle {
    /**
     * Creates a new Rectangle instance.
     * @param {number} x - The x coordinate of the top-left corner of the rectangle (default: 0).
     * @param {number} y - The y coordinate of the top-left corner of the rectangle (default: 0).
     * @param {number} width - The width of the rectangle (default: 0).
     * @param {number} height - The height of the rectangle (default: 0).
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
     * Offsets the rectangle's position by the specified amounts.
     * @param {number} dx - The amount to offset the x coordinate by.
     * @param {number} dy - The amount to offset the y coordinate by.
     * @returns {Rectangle} This rectangle instance for chaining.
     */
    offset(dx: number, dy: number): Rectangle;
    /**
     * Offsets the rectangle's position by the specified point coordinates.
     * @param {Point} point - The point to offset the rectangle by.
     * @returns {Rectangle} This rectangle instance for chaining.
     */
    offsetPoint(point: Point): Rectangle;
    /**
     * Sets the rectangle's position and size to new values.
     * @param {number} x - The new x coordinate of the top-left corner of the rectangle.
     * @param {number} y - The new y coordinate of the top-left corner of the rectangle.
     * @param {number} width - The new width of the rectangle.
     * @param {number} height - The new height of the rectangle.
     * @returns {Rectangle} This rectangle instance for chaining.
     */
    setTo(x: number, y: number, width: number, height: number): Rectangle;
    /**
     * Scales the rectangle's size by the specified amounts.
     * @param {number} x - The amount to scale the width by.
     * @param {number} y - The amount to scale the height by (default: x).
     * @returns {Rectangle} This rectangle instance for chaining.
     */
    scale(x: number, y: number): Rectangle;
    /**
     * Centers the rectangle on the specified point.
     * @param {number} x - The x coordinate to center the rectangle on.
     * @param {number} y - The y coordinate to center the rectangle on.
     * @returns {Rectangle} This rectangle instance for chaining.
     */
    centerOn(x: number, y: number): Rectangle;
    /**
     * Sets the x coordinate of the center of this rectangle.
     */
    set centerX(value: number);
    /**
     * Gets the x coordinate of the center of this rectangle.
     * @returns {number} The x coordinate of the center of this rectangle.
     */
    get centerX(): number;
    /**
     * Sets the y coordinate of the center of this rectangle.
     */
    set centerY(value: number);
    /**
     * Gets the y coordinate of the center of this rectangle.
     * @returns {number} The y coordinate of the center of this rectangle.
     */
    get centerY(): number;
    /**
     * Floors the x and y coordinates of the rectangle (rounds down to nearest integer).
     */
    floor(): void;
    /**
     * Floors all coordinates of the rectangle (rounds down to nearest integer).
     */
    floorAll(): void;
    /**
     * Ceils the x and y coordinates of the rectangle (rounds up to nearest integer).
     */
    ceil(): void;
    /**
     * Ceils all coordinates of the rectangle (rounds up to nearest integer).
     */
    ceilAll(): void;
    /**
     * Copies the values from another rectangle to this rectangle.
     * @param {Rectangle} source - The rectangle to copy values from.
     * @returns {Rectangle} This rectangle instance for chaining.
     */
    copyFrom(source: Rectangle): Rectangle;
    /**
     * Copies the values of this rectangle to another rectangle.
     * @param {Rectangle} dest - The rectangle to copy values to.
     * @returns {Rectangle} The destination rectangle.
     */
    copyTo(dest: Rectangle): Rectangle;
    /**
     * Increases the size of the rectangle by the specified amounts.
     * @param {number} dx - The amount to increase the width by.
     * @param {number} dy - The amount to increase the height by.
     * @returns {Rectangle} This rectangle instance for chaining.
     */
    inflate(dx: number, dy: number): Rectangle;
    /**
     * Gets the size of the rectangle as a point.
     * @param {Point} output - The point to store the size in (optional).
     * @returns {Point} The size of the rectangle as a point.
     */
    size(output: Point): Point;
    /**
     * Resizes the rectangle to the specified dimensions.
     * @param {number} width - The new width of the rectangle.
     * @param {number} height - The new height of the rectangle.
     * @returns {Rectangle} This rectangle instance for chaining.
     */
    resize(width: number, height: number): Rectangle;
    /**
     * Creates a clone of this rectangle.
     * @param {Rectangle} output - The rectangle to store the clone in (optional).
     * @returns {Rectangle} A new rectangle with the same values as this one.
     */
    clone(output: Rectangle): Rectangle;
    /**
     * Checks if the specified point is contained within this rectangle.
     * @param {number} x - The x coordinate of the point to check.
     * @param {number} y - The y coordinate of the point to check.
     * @returns {boolean} True if the point is contained within this rectangle, false otherwise.
     */
    contains(x: number, y: number): boolean;
    /**
     * Checks if the specified rectangle is fully contained within this rectangle.
     * @param {Rectangle} b - The rectangle to check if it's contained.
     * @returns {boolean} True if the rectangle is contained within this rectangle, false otherwise.
     */
    containsRect(b: Rectangle): boolean;
    /**
     * Checks if this rectangle is equal to another rectangle.
     * @param {Rectangle} b - The rectangle to compare with.
     * @returns {boolean} True if the rectangles have the same values, false otherwise.
     */
    equals(b: Rectangle): boolean;
    /**
     * Gets the intersection of this rectangle and another rectangle.
     * @param {Rectangle} b - The rectangle to intersect with.
     * @param {Rectangle} out - The rectangle to store the result in (optional).
     * @returns {Rectangle} The intersection of the two rectangles.
     */
    intersection(b: Rectangle, out: Rectangle): Rectangle;
    /**
     * Checks if this rectangle intersects with another rectangle.
     * @param {Rectangle} b - The rectangle to check for intersection with.
     * @returns {boolean} True if the rectangles intersect, false otherwise.
     */
    intersects(b: Rectangle): boolean;
    /**
     * Checks if this rectangle intersects with the specified bounds.
     * @param {number} left - The left boundary of the area to check for intersection.
     * @param {number} right - The right boundary of the area to check for intersection.
     * @param {number} top - The top boundary of the area to check for intersection.
     * @param {number} bottom - The bottom boundary of the area to check for intersection.
     * @param {number} tolerance - A tolerance value to use when checking (default: 0).
     * @returns {boolean} True if the rectangle intersects with the bounds, false otherwise.
     */
    intersectsRaw(left: number, right: number, top: number, bottom: number, tolerance: number): boolean;
    /**
     * Gets the union of this rectangle and another rectangle.
     * @param {Rectangle} b - The rectangle to union with.
     * @param {Rectangle} out - The rectangle to store the result in (optional).
     * @returns {Rectangle} The union of the two rectangles.
     */
    union(b: Rectangle, out: Rectangle): Rectangle;
    /**
     * Gets a random point within this rectangle.
     * @param {Point} output - The point to store the result in (optional).
     * @returns {Point} A random point within this rectangle.
     */
    random(output?: Point): Point;
    /**
     * Gets a point at a specific position on the rectangle.
     * @param {number} position - The position to get the point for (TOP_LEFT, TOP_CENTER, etc.).
     * @param {Point} output - The point to store the result in (optional).
     * @returns {Point} A point at the specified position on the rectangle.
     */
    getPoint(position: number, output?: Point): Point;
    /**
     * Returns a string representation of this rectangle.
     * @returns {string} A string representation of the rectangle.
     */
    toString(): string;
    /**
     * Gets half the width of this rectangle.
     * @returns {number} Half the width of this rectangle.
     */
    get halfWidth(): number;
    /**
     * Gets half the height of this rectangle.
     * @returns {number} Half the height of this rectangle.
     */
    get halfHeight(): number;
    /**
     * Sets the top coordinate of this rectangle.
     */
    set top(value: number);
    /**
     * Gets the top coordinate of this rectangle.
     * @returns {number} The top coordinate of this rectangle.
     */
    get top(): number;
    /**
     * Sets the top-left point of this rectangle.
     */
    set topLeft(value: Point);
    /**
     * Gets the top-left point of this rectangle.
     * @returns {Point} The top-left point of this rectangle.
     */
    get topLeft(): Point;
    /**
     * Sets the top-right point of this rectangle.
     */
    set topRight(value: Point);
    /**
     * Gets the top-right point of this rectangle.
     * @returns {Point} The top-right point of this rectangle.
     */
    get topRight(): Point;
    /**
     * Sets the right coordinate of this rectangle.
     */
    set right(value: number);
    /**
     * Gets the right coordinate of this rectangle.
     * @returns {number} The right coordinate of this rectangle.
     */
    get right(): number;
    /**
     * Sets the bottom coordinate of this rectangle.
     */
    set bottom(value: number);
    /**
     * Gets the bottom coordinate of this rectangle.
     * @returns {number} The bottom coordinate of this rectangle.
     */
    get bottom(): number;
    /**
     * Sets the bottom-left point of this rectangle.
     */
    set bottomLeft(value: Point);
    /**
     * Gets the bottom-left point of this rectangle.
     * @returns {Point} The bottom-left point of this rectangle.
     */
    get bottomLeft(): Point;
    /**
     * Sets the bottom-right point of this rectangle.
     */
    set bottomRight(value: Point);
    /**
     * Gets the bottom-right point of this rectangle.
     * @returns {Point} The bottom-right point of this rectangle.
     */
    get bottomRight(): Point;
    /**
     * Sets the left coordinate of this rectangle.
     */
    set left(value: number);
    /**
     * Gets the left coordinate of this rectangle.
     * @returns {number} The left coordinate of this rectangle.
     */
    get left(): number;
    /**
     * Gets the volume (area) of this rectangle.
     * @returns {number} The volume (area) of this rectangle.
     */
    get volume(): number;
    /**
     * Gets the perimeter of this rectangle.
     * @returns {number} The perimeter of this rectangle.
     */
    get perimeter(): number;
    /**
     * Gets a random x coordinate within this rectangle.
     * @returns {number} A random x coordinate within this rectangle.
     */
    get randomX(): number;
    /**
     * Gets a random y coordinate within this rectangle.
     * @returns {number} A random y coordinate within this rectangle.
     */
    get randomY(): number;
    /**
     * Sets whether this rectangle is empty (zero width or height).
     */
    set empty(value: boolean);
    /**
     * Checks if this rectangle is empty (has zero width or height).
     * @returns {boolean} True if the rectangle is empty, false otherwise.
     */
    get empty(): boolean;
}
import { Point } from './point.js';
//# sourceMappingURL=rectangle.d.ts.map