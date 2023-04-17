export class Matrix {
    /**
     * TBD.
     *
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
    fromArray(array: any): Matrix;
    setTo(a: any, b: any, c: any, d: any, tx: any, ty: any): Matrix;
    clone(): Matrix;
    copyTo(matrix: any): any;
    copyFrom(matrix: any): Matrix;
    toArray(transpose?: boolean, output?: any): any;
    apply(pos: any, output?: any): any;
    applyInverse(pos: any, output?: any): any;
    translate(x: any, y: any): Matrix;
    scale(x: any, y: any): Matrix;
    rotate(angle: any): Matrix;
    append(matrix: any): Matrix;
    identity(): Matrix;
}
//# sourceMappingURL=matrix.d.ts.map