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
     * @param array
     */
    fromArray(array: any): Matrix;
    /**
     * TBD.
     * @param a
     * @param b
     * @param c
     * @param d
     * @param tx
     * @param ty
     */
    setTo(a: any, b: any, c: any, d: any, tx: any, ty: any): Matrix;
    /**
     * TBD.
     */
    clone(): Matrix;
    /**
     * TBD.
     * @param matrix
     */
    copyTo(matrix: any): any;
    /**
     * TBD.
     * @param matrix
     */
    copyFrom(matrix: any): Matrix;
    /**
     * TBD.
     * @param transpose
     * @param output
     */
    toArray(transpose?: boolean, output?: any): any;
    /**
     * TBD.
     * @param pos
     * @param output
     */
    apply(pos: any, output?: any): any;
    /**
     * TBD.
     * @param pos
     * @param output
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
     * @param angle
     */
    rotate(angle: any): Matrix;
    /**
     * TBD.
     * @param matrix
     */
    append(matrix: any): Matrix;
    /**
     * TBD.
     */
    identity(): Matrix;
}
//# sourceMappingURL=matrix.d.ts.map