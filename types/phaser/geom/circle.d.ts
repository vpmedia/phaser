export class Circle {
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {number} diameter - TBD.
     */
    constructor(x?: number, y?: number, diameter?: number);
    x: number;
    y: number;
    _diameter: number;
    _radius: number;
    type: number;
    /**
     * TBD.
     */
    circumference(): number;
    /**
     * TBD.
     * @param output - TBD.
     */
    random(output?: any): any;
    /**
     * TBD.
     */
    getBounds(): Rectangle;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param diameter - TBD.
     */
    setTo(x: number, y: number, diameter: any): Circle;
    /**
     * TBD.
     * @param source - TBD.
     */
    copyFrom(source: any): Circle;
    /**
     * TBD.
     * @param dest - TBD.
     */
    copyTo(dest: any): any;
    /**
     * TBD.
     * @param dest - TBD.
     * @param round - TBD.
     */
    distance(dest: any, round?: boolean): number;
    /**
     * TBD.
     */
    clone(): Circle;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    contains(x: number, y: number): boolean;
    /**
     * TBD.
     * @param angle - TBD.
     * @param asDegrees - TBD.
     * @param out - TBD.
     */
    circumferencePoint(angle: any, asDegrees: any, out: any): Point;
    /**
     * TBD.
     * @param dx - TBD.
     * @param dy - TBD.
     */
    offset(dx: any, dy: any): Circle;
    /**
     * TBD.
     * @param point - TBD.
     */
    offsetPoint(point: any): Circle;
    /**
     * TBD.
     */
    toString(): string;
    /**
     * TBD.
     */
    set diameter(arg: number);
    /**
     * TBD.
     */
    get diameter(): number;
    /**
     * TBD.
     */
    set radius(arg: number);
    /**
     * TBD.
     */
    get radius(): number;
    /**
     * TBD.
     */
    set left(arg: number);
    /**
     * TBD.
     */
    get left(): number;
    /**
     * TBD.
     */
    set right(arg: number);
    /**
     * TBD.
     */
    get right(): number;
    /**
     * TBD.
     */
    set top(arg: number);
    /**
     * TBD.
     */
    get top(): number;
    /**
     * TBD.
     */
    set bottom(arg: number);
    /**
     * TBD.
     */
    get bottom(): number;
    /**
     * TBD.
     */
    get area(): number;
    /**
     * TBD.
     */
    set empty(arg: boolean);
    /**
     * TBD.
     */
    get empty(): boolean;
}
import { Rectangle } from './rectangle';
import { Point } from './point';
//# sourceMappingURL=circle.d.ts.map