export class Line {
    /**
     * TBD.
     *
     * @param {number} x1 - TBD.
     * @param {number} y1 - TBD.
     * @param {number} x2 - TBD.
     * @param {number} y2 - TBD.
     */
    constructor(x1?: number, y1?: number, x2?: number, y2?: number);
    start: Point;
    end: Point;
    type: number;
    setTo(x1: any, y1: any, x2: any, y2: any): Line;
    fromSprite(startSprite: any, endSprite: any, useCenter?: boolean): Line;
    fromAngle(x: any, y: any, angle: any, length: any): Line;
    rotate(angle: any, asDegrees?: boolean): Line;
    rotateAround(x: any, y: any, angle: any, asDegrees?: boolean): Line;
    intersects(line: any, asSegment: any, result: any): boolean;
    reflect(line: any): number;
    midPoint(output?: any): any;
    centerOn(x: any, y: any): void;
    pointOnLine(x: any, y: any): boolean;
    pointOnSegment(x: any, y: any): boolean;
    random(output?: any): any;
    coordinatesOnLine(stepRate?: number, results?: any[]): any[];
    clone(): Line;
    get length(): number;
    get angle(): number;
    get slope(): number;
    get perpSlope(): number;
    get x(): number;
    get y(): number;
    get left(): number;
    get right(): number;
    get top(): number;
    get bottom(): number;
    get width(): number;
    get height(): number;
    get normalX(): number;
    get normalY(): number;
    get normalAngle(): number;
}
import { Point } from './point';
//# sourceMappingURL=line.d.ts.map