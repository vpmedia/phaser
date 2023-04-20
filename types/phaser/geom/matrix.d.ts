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
     * @param array - TBD.
     */
    fromArray(array: any): Matrix;
    /**
     * TBD.
     * @param a - TBD.
     * @param b - TBD.
     * @param c - TBD.
     * @param d - TBD.
     * @param tx - TBD.
     * @param ty - TBD.
     */
    setTo(a: any, b: any, c: any, d: any, tx: any, ty: any): Matrix;
    /**
     * TBD.
     */
    clone(): Matrix;
    /**
     * TBD.
     * @param matrix - TBD.
     */
    copyTo(matrix: any): any;
    /**
     * TBD.
     * @param matrix - TBD.
     */
    copyFrom(matrix: any): Matrix;
    /**
     * TBD.
     * @param transpose - TBD.
     * @param output - TBD.
     */
    toArray(transpose?: boolean, output?: any): any;
    /**
     * TBD.
     * @param pos - TBD.
     * @param output - TBD.
     */
    apply(pos: any, output?: any): any;
    /**
     * TBD.
     * @param pos - TBD.
     * @param output - TBD.
     */
    applyInverse(pos: any, output?: any): any;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    translate(x: number, y: number): Matrix;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    scale(x: number, y: number): Matrix;
    /**
     * TBD.
     * @param angle - TBD.
     */
    rotate(angle: any): Matrix;
    /**
     * TBD.
     * @param matrix - TBD.
     */
    append(matrix: any): Matrix;
    /**
     * TBD.
     */
    identity(): Matrix;
}
//# sourceMappingURL=matrix.d.ts.map