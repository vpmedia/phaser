export default class _default {
    constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
    a: number;
    b: number;
    c: number;
    d: number;
    tx: number;
    ty: number;
    type: number;
    fromArray(array: any): default;
    setTo(a: any, b: any, c: any, d: any, tx: any, ty: any): default;
    clone(): object;
    copyTo(matrix: any): any;
    copyFrom(matrix: any): default;
    toArray(transpose?: boolean, output?: null): Float32Array;
    apply(pos: any, output?: null): Point;
    applyInverse(pos: any, output?: null): Point;
    translate(x: any, y: any): default;
    scale(x: any, y: any): default;
    rotate(angle: any): default;
    append(matrix: any): default;
    identity(): default;
}
import Point from './point';
//# sourceMappingURL=matrix.d.ts.map