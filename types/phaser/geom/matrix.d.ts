export class Matrix {
    /**
     * Creates a new Matrix instance.
     * @param {number} a - The a component of the matrix (default: 1).
     * @param {number} b - The b component of the matrix (default: 0).
     * @param {number} c - The c component of the matrix (default: 0).
     * @param {number} d - The d component of the matrix (default: 1).
     * @param {number} tx - The tx component of the matrix (default: 0).
     * @param {number} ty - The ty component of the matrix (default: 0).
     */
    constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
    /** @type {number} */
    a: number;
    /** @type {number} */
    b: number;
    /** @type {number} */
    c: number;
    /** @type {number} */
    d: number;
    /** @type {number} */
    tx: number;
    /** @type {number} */
    ty: number;
    /** @type {number} */
    type: number;
    /**
     * Sets the matrix components from an array.
     * @param {number[]} array - The array to read the matrix components from (should have 6 elements).
     * @returns {Matrix} This matrix instance for chaining.
     */
    fromArray(array: number[]): Matrix;
    /**
     * Sets the matrix components to new values.
     * @param {number} a - The new a component of the matrix.
     * @param {number} b - The new b component of the matrix.
     * @param {number} c - The new c component of the matrix.
     * @param {number} d - The new d component of the matrix.
     * @param {number} tx - The new tx component of the matrix.
     * @param {number} ty - The new ty component of the matrix.
     * @returns {Matrix} This matrix instance for chaining.
     */
    setTo(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix;
    /**
     * Creates a clone of this matrix.
     * @returns {Matrix} A new matrix with the same values as this one.
     */
    clone(): Matrix;
    /**
     * Copies the values of this matrix to another matrix.
     * @param {Matrix} matrix - The matrix to copy values to.
     * @returns {Matrix} The destination matrix.
     */
    copyTo(matrix: Matrix): Matrix;
    /**
     * Copies the values from another matrix to this matrix.
     * @param {Matrix} matrix - The matrix to copy values from.
     * @returns {Matrix} This matrix instance for chaining.
     */
    copyFrom(matrix: Matrix): Matrix;
    /**
     * Converts this matrix to a Float32Array.
     * @param {boolean} transpose - Whether to transpose the matrix (default: false).
     * @param {Float32Array} output - The array to store the result in (optional).
     * @returns {Float32Array} A Float32Array containing the matrix elements.
     */
    toArray(transpose?: boolean, output?: Float32Array): Float32Array;
    /**
     * Applies this matrix to a point.
     * @param {Point} pos - The point to apply the matrix to.
     * @param {Point} output - The point to store the result in (optional).
     * @returns {Point} The transformed point.
     */
    apply(pos: Point, output?: Point): Point;
    /**
     * Applies the inverse of this matrix to a point.
     * @param {Point} pos - The point to apply the inverse matrix to.
     * @param {Point} output - The point to store the result in (optional).
     * @returns {Point} The transformed point.
     */
    applyInverse(pos: Point, output?: Point): Point;
    /**
     * Translates this matrix by the specified amounts.
     * @param {number} x - The amount to translate in the x direction.
     * @param {number} y - The amount to translate in the y direction.
     * @returns {Matrix} This matrix instance for chaining.
     */
    translate(x: number, y: number): Matrix;
    /**
     * Scales this matrix by the specified amounts.
     * @param {number} x - The amount to scale in the x direction.
     * @param {number} y - The amount to scale in the y direction.
     * @returns {Matrix} This matrix instance for chaining.
     */
    scale(x: number, y: number): Matrix;
    /**
     * Rotates this matrix by the specified angle.
     * @param {number} angle - The angle in radians to rotate by.
     * @returns {Matrix} This matrix instance for chaining.
     */
    rotate(angle: number): Matrix;
    /**
     * Appends another matrix to this matrix (multiplying matrices).
     * @param {Matrix} matrix - The matrix to append.
     * @returns {Matrix} This matrix instance for chaining.
     */
    append(matrix: Matrix): Matrix;
    /**
     * Sets this matrix to an identity matrix (no transformation).
     * @returns {Matrix} This matrix instance for chaining.
     */
    identity(): Matrix;
}
import { Point } from './point.js';
//# sourceMappingURL=matrix.d.ts.map