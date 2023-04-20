export class Line {
    /**
     * TBD.
     * @param {number} x1 - TBD.
     * @param {number} y1 - TBD.
     * @param {number} x2 - TBD.
     * @param {number} y2 - TBD.
     */
    constructor(x1?: number, y1?: number, x2?: number, y2?: number);
    start: Point;
    end: Point;
    type: number;
    /**
     * TBD.
     * @param {number} x1 - TBD.
     * @param {number} y1 - TBD.
     * @param {number} x2 - TBD.
     * @param {number} y2 - TBD.
     * @returns {Line} TBD.
     */
    setTo(x1: number, y1: number, x2: number, y2: number): Line;
    /**
     * TBD.
     * @param {object} startSprite - TBD.
     * @param {object} endSprite - TBD.
     * @param {boolean} useCenter - TBD.
     * @returns {Line} TBD.
     */
    fromSprite(startSprite: object, endSprite: object, useCenter?: boolean): Line;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {number} angle - TBD.
     * @param {number} length - TBD.
     * @returns {Line} TBD.
     */
    fromAngle(x: number, y: number, angle: number, length: number): Line;
    /**
     * TBD.
     * @param {number} angle - TBD.
     * @param {boolean} asDegrees - TBD.
     * @returns {Line} TBD.
     */
    rotate(angle: number, asDegrees?: boolean): Line;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {number} angle - TBD.
     * @param {boolean} asDegrees - TBD.
     * @returns {Line} TBD.
     */
    rotateAround(x: number, y: number, angle: number, asDegrees?: boolean): Line;
    /**
     * TBD.
     * @param {Line} line - TBD.
     * @param {boolean} asSegment - TBD.
     * @param {Point} result - TBD.
     * @returns {Point} TBD.
     */
    intersects(line: Line, asSegment: boolean, result: Point): Point;
    /**
     * TBD.
     * @param {Line} line - TBD.
     * @returns {number} TBD.
     */
    reflect(line: Line): number;
    /**
     * TBD.
     * @param {Point} output - TBD.
     * @returns {Point} TBD.
     */
    midPoint(output?: Point): Point;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    centerOn(x: number, y: number): void;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @returns {boolean} TBD.
     */
    pointOnLine(x: number, y: number): boolean;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @returns {boolean} TBD.
     */
    pointOnSegment(x: number, y: number): boolean;
    /**
     * TBD.
     * @param {Point} output - TBD.
     * @returns {Point} TBD.
     */
    random(output?: Point): Point;
    /**
     * TBD.
     * @param {number} stepRate - TBD.
     * @param {number[][]} results - TBD.
     * @returns {number[][]} TBD.
     */
    coordinatesOnLine(stepRate?: number, results?: number[][]): number[][];
    /**
     * TBD.
     * @returns {Line} TBD.
     */
    clone(): Line;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get length(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get angle(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get slope(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get perpSlope(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get x(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get y(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get left(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get right(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get top(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get bottom(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get width(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get height(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get normalX(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get normalY(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get normalAngle(): number;
}
import { Point } from './point';
//# sourceMappingURL=line.d.ts.map