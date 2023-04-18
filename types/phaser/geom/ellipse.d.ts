export class Ellipse {
    /**
     * TBD.
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
    setTo(x: any, y: any, width: any, height: any): Ellipse;
    getBounds(): Rectangle;
    copyFrom(source: any): Ellipse;
    copyTo(dest: any): any;
    contains(x: any, y: any): boolean;
    random(output?: any): any;
    toString(): string;
}
import { Rectangle } from './rectangle';
//# sourceMappingURL=ellipse.d.ts.map