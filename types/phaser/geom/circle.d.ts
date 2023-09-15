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
     * @returns {number} TBD.
     */
    circumference(): number;
    /**
     * TBD.
     * @param {Point} output - TBD.
     * @returns {Point} TBD.
     */
    random(output?: Point): Point;
    /**
     * TBD.
     * @returns {Rectangle} TBD.
     */
    getBounds(): Rectangle;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {number} diameter - TBD.
     * @returns {Circle} TBD.
     */
    setTo(x: number, y: number, diameter: number): Circle;
    /**
     * TBD.
     * @param {Circle} source - TBD.
     * @returns {Circle} TBD.
     */
    copyFrom(source: Circle): Circle;
    /**
     * TBD.
     * @param {Circle} dest - TBD.
     * @returns {Circle} TBD.
     */
    copyTo(dest: Circle): Circle;
    /**
     * TBD.
     * @param {Circle} dest - TBD.
     * @param {boolean} round - TBD.
     * @returns {number} TBD.
     */
    distance(dest: Circle, round?: boolean): number;
    /**
     * TBD.
     * @returns {Circle} TBD.
     */
    clone(): Circle;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @returns {boolean} TBD.
     */
    contains(x: number, y: number): boolean;
    /**
     * TBD.
     * @param {number} angle - TBD.
     * @param {boolean} asDegrees - TBD.
     * @param {Point} out - TBD.
     * @returns {Point} TBD.
     */
    circumferencePoint(angle: number, asDegrees: boolean, out: Point): Point;
    /**
     * TBD.
     * @param {number} dx - TBD.
     * @param {number} dy - TBD.
     * @returns {Circle} TBD.
     */
    offset(dx: number, dy: number): Circle;
    /**
     * TBD.
     * @param {Point} point - TBD.
     * @returns {Circle} TBD.
     */
    offsetPoint(point: Point): Circle;
    /**
     * TBD.
     * @returns {string} TBD.
     */
    toString(): string;
    /**
     * TBD.
     */
    set diameter(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get diameter(): number;
    /**
     * TBD.
     */
    set radius(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get radius(): number;
    /**
     * TBD.
     */
    set left(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get left(): number;
    /**
     * TBD.
     */
    set right(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get right(): number;
    /**
     * TBD.
     */
    set top(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get top(): number;
    /**
     * TBD.
     */
    set bottom(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get bottom(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get area(): number;
    /**
     * TBD.
     */
    set empty(arg: boolean);
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    get empty(): boolean;
}
import { Point } from './point.js';
import { Rectangle } from './rectangle.js';
//# sourceMappingURL=circle.d.ts.map