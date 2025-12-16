export class Polygon {
    /**
     * TBD.
     * @param {object[]} points - TBD.
     */
    constructor(points?: object[]);
    /** @type {number} */
    area: number;
    /** @type {Point[]} */
    _points: Point[];
    /** @type {boolean} */
    closed: boolean;
    /** @type {boolean} */
    flattened: boolean;
    /** @type {number} */
    type: number;
    /**
     * TBD.
     * @param {number[]} output - TBD.
     * @returns {number[]} TBD.
     */
    toNumberArray(output?: number[]): number[];
    /**
     * TBD.
     * @returns {Polygon} TBD.
     */
    flatten(): Polygon;
    /**
     * TBD.
     * @returns {Polygon} TBD.
     */
    clone(): Polygon;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @returns {boolean} TBD.
     */
    contains(x: number, y: number): boolean;
    /**
     * TBD.
     * @param {object[]} points - TBD.
     * @returns {Polygon} TBD.
     */
    setTo(points: object[]): Polygon;
    /**
     * TBD.
     * @param {number} y0 - TBD.
     * @returns {number} TBD.
     */
    calculateArea(y0: number): number;
    /**
     * TBD.
     */
    set points(value: object[]);
    /**
     * TBD.
     * @returns {object[]} TBD.
     */
    get points(): object[];
}
import { Point } from './point.js';
//# sourceMappingURL=polygon.d.ts.map