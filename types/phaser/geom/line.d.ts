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
     * @param x1 - TBD.
     * @param y1 - TBD.
     * @param x2 - TBD.
     * @param y2 - TBD.
     */
    setTo(x1: any, y1: any, x2: any, y2: any): Line;
    /**
     * TBD.
     * @param startSprite - TBD.
     * @param endSprite - TBD.
     * @param useCenter - TBD.
     */
    fromSprite(startSprite: any, endSprite: any, useCenter?: boolean): Line;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param angle - TBD.
     * @param length - TBD.
     */
    fromAngle(x: number, y: number, angle: any, length: any): Line;
    /**
     * TBD.
     * @param angle - TBD.
     * @param asDegrees - TBD.
     */
    rotate(angle: any, asDegrees?: boolean): Line;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param angle - TBD.
     * @param asDegrees - TBD.
     */
    rotateAround(x: number, y: number, angle: any, asDegrees?: boolean): Line;
    /**
     * TBD.
     * @param line - TBD.
     * @param asSegment - TBD.
     * @param result - TBD.
     */
    intersects(line: any, asSegment: any, result: any): Point;
    /**
     * TBD.
     * @param line - TBD.
     */
    reflect(line: any): number;
    /**
     * TBD.
     * @param output - TBD.
     */
    midPoint(output?: any): any;
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
     */
    pointOnLine(x: number, y: number): boolean;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    pointOnSegment(x: number, y: number): boolean;
    /**
     * TBD.
     * @param output - TBD.
     */
    random(output?: any): any;
    /**
     * TBD.
     * @param stepRate - TBD.
     * @param results - TBD.
     */
    coordinatesOnLine(stepRate?: number, results?: any[]): any[];
    /**
     * TBD.
     */
    clone(): Line;
    /**
     * TBD.
     */
    get length(): number;
    /**
     * TBD.
     */
    get angle(): number;
    /**
     * TBD.
     */
    get slope(): number;
    /**
     * TBD.
     */
    get perpSlope(): number;
    /**
     * TBD.
     */
    get x(): number;
    /**
     * TBD.
     */
    get y(): number;
    /**
     * TBD.
     */
    get left(): number;
    /**
     * TBD.
     */
    get right(): number;
    /**
     * TBD.
     */
    get top(): number;
    /**
     * TBD.
     */
    get bottom(): number;
    /**
     * TBD.
     */
    get width(): number;
    /**
     * TBD.
     */
    get height(): number;
    /**
     * TBD.
     */
    get normalX(): number;
    /**
     * TBD.
     */
    get normalY(): number;
    /**
     * TBD.
     */
    get normalAngle(): number;
}
import { Point } from './point';
//# sourceMappingURL=line.d.ts.map