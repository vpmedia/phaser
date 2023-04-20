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
     * @returns {Ellipse} TBD.
     */
    setTo(x: number, y: number, width: number, height: number): Ellipse;
    /**
     * TBD.
     * @returns {Rectangle} TBD.
     */
    getBounds(): Rectangle;
    /**
     * TBD.
     * @param source - TBD.
     * @returns {Ellipse} TBD.
     */
    copyFrom(source: any): Ellipse;
    /**
     * TBD.
     * @param dest - TBD.
     * @returns {Ellipse} TBD.
     */
    copyTo(dest: any): Ellipse;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @returns {boolean} TBD.
     */
    contains(x: number, y: number): boolean;
    /**
     * TBD.
     * @param output - TBD.
     * @returns {Point} TBD.
     */
    random(output?: any): Point;
    /**
     * TBD.
     * @returns {string} TBD.
     */
    toString(): string;
}
import { Rectangle } from './rectangle';
import { Point } from './point';
//# sourceMappingURL=ellipse.d.ts.map