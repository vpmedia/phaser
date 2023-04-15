export default class _default {
    /**
     * TBD.
     *
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    constructor(x?: number, y?: number, width?: number, height?: number);
    x: number;
    y: number;
    width: number;
    height: number;
    type: number;
    setTo(x: any, y: any, width: any, height: any): default;
    getBounds(): Rectangle;
    copyFrom(source: any): default;
    copyTo(dest: any): any;
    contains(x: any, y: any): boolean;
    random(output?: null): Point;
    toString(): string;
}
import Rectangle from './rectangle';
import Point from './point';
//# sourceMappingURL=ellipse.d.ts.map