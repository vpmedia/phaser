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
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     */
    setTo(x1: any, y1: any, x2: any, y2: any): Line;
    /**
     * TBD.
     * @param startSprite
     * @param endSprite
     * @param useCenter
     */
    fromSprite(startSprite: any, endSprite: any, useCenter?: boolean): Line;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param angle
     * @param length
     */
    fromAngle(x: number, y: number, angle: any, length: any): Line;
    /**
     * TBD.
     * @param angle
     * @param asDegrees
     */
    rotate(angle: any, asDegrees?: boolean): Line;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param angle
     * @param asDegrees
     */
    rotateAround(x: number, y: number, angle: any, asDegrees?: boolean): Line;
    /**
     * TBD.
     * @param line
     * @param asSegment
     * @param result
     */
    intersects(line: any, asSegment: any, result: any): boolean;
    /**
     * TBD.
     * @param line
     */
    reflect(line: any): number;
    /**
     * TBD.
     * @param output
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
     * @param output
     */
    random(output?: any): any;
    /**
     * TBD.
     * @param stepRate
     * @param results
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