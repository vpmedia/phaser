export class Matrix {
    /**
     * TBD.
     * @param {number} a - TBD.
     * @param {number} b - TBD.
     * @param {number} c - TBD.
     * @param {number} d - TBD.
     * @param {number} tx - TBD.
     * @param {number} ty - TBD.
     */
    constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
    a: number;
    b: number;
    c: number;
    d: number;
    tx: number;
    ty: number;
    type: number;
    /**
     * TBD.
     * @param {number[]} array - TBD.
     * @returns {Matrix} TBD.
     */
    fromArray(array: number[]): Matrix;
    /**
     * TBD.
     * @param {number} a - TBD.
     * @param {number} b - TBD.
     * @param {number} c - TBD.
     * @param {number} d - TBD.
     * @param {number} tx - TBD.
     * @param {number} ty - TBD.
     * @returns {Matrix} TBD.
     */
    setTo(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix;
    /**
     * TBD.
     * @returns {Matrix} TBD.
     */
    clone(): Matrix;
    /**
     * TBD.
     * @param {Matrix} matrix - TBD.
     * @returns {Matrix} TBD.
     */
    copyTo(matrix: Matrix): Matrix;
    /**
     * TBD.
     * @param {Matrix} matrix - TBD.
     * @returns {Matrix} TBD.
     */
    copyFrom(matrix: Matrix): Matrix;
    /**
     * TBD.
     * @param {boolean} transpose - TBD.
     * @param {Float32Array} output - TBD.
     * @returns {Float32Array} TBD.
     */
    toArray(transpose?: boolean, output?: Float32Array): Float32Array;
    /**
     * TBD.
     * @param {Point} pos - TBD.
     * @param {Point} output - TBD.
     * @returns {Point} TBD.
     */
    apply(pos: Point, output?: Point): Point;
    /**
     * TBD.
     * @param {Point} pos - TBD.
     * @param {Point} output - TBD.
     * @returns {Point} TBD.
     */
    applyInverse(pos: Point, output?: Point): Point;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @returns {Matrix} TBD.
     */
    translate(x: number, y: number): Matrix;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @returns {Matrix} TBD.
     */
    scale(x: number, y: number): Matrix;
    /**
     * TBD.
     * @param {number} angle - TBD.
     * @returns {Matrix} TBD.
     */
    rotate(angle: number): Matrix;
    /**
     * TBD.
     * @param {Matrix} matrix - TBD.
     * @returns {Matrix} TBD.
     */
    append(matrix: Matrix): Matrix;
    /**
     * TBD.
     * @returns {Matrix} TBD.
     */
    identity(): Matrix;
}
import { Point } from './point';
//# sourceMappingURL=matrix.d.ts.map