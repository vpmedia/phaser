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
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    setTo(x: number, y: number, width: number, height: number): Ellipse;
    /**
     * TBD.
     */
    getBounds(): Rectangle;
    /**
     * TBD.
     * @param source
     */
    copyFrom(source: any): Ellipse;
    /**
     * TBD.
     * @param dest
     */
    copyTo(dest: any): any;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    contains(x: number, y: number): boolean;
    /**
     * TBD.
     * @param output
     */
    random(output?: any): any;
    /**
     * TBD.
     */
    toString(): string;
}
import { Rectangle } from './rectangle';
//# sourceMappingURL=ellipse.d.ts.map