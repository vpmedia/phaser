export class Rectangle {
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
     * @param {number} dx - TBD.
     * @param {number} dy - TBD.
     * @returns {Rectangle} TBD.
     */
    offset(dx: number, dy: number): Rectangle;
    /**
     * TBD.
     * @param {Point} point - TBD.
     * @returns {Rectangle} TBD.
     */
    offsetPoint(point: Point): Rectangle;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     * @returns {Rectangle} TBD.
     */
    setTo(x: number, y: number, width: number, height: number): Rectangle;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @returns {Rectangle} TBD.
     */
    scale(x: number, y: number): Rectangle;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @returns {Rectangle} TBD.
     */
    centerOn(x: number, y: number): Rectangle;
    /**
     * TBD.
     */
    set centerX(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get centerX(): number;
    /**
     * TBD.
     */
    set centerY(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get centerY(): number;
    /**
     * TBD.
     */
    floor(): void;
    /**
     * TBD.
     */
    floorAll(): void;
    /**
     * TBD.
     */
    ceil(): void;
    /**
     * TBD.
     */
    ceilAll(): void;
    /**
     * TBD.
     * @param {Rectangle} source - TBD.
     * @returns {Rectangle} TBD.
     */
    copyFrom(source: Rectangle): Rectangle;
    /**
     * TBD.
     * @param {Rectangle} dest - TBD.
     * @returns {Rectangle} TBD.
     */
    copyTo(dest: Rectangle): Rectangle;
    /**
     * TBD.
     * @param {number} dx - TBD.
     * @param {number} dy - TBD.
     * @returns {Rectangle} TBD.
     */
    inflate(dx: number, dy: number): Rectangle;
    /**
     * TBD.
     * @param {Point} output - TBD.
     * @returns {Point} TBD.
     */
    size(output: Point): Point;
    /**
     * TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     * @returns {Rectangle} TBD.
     */
    resize(width: number, height: number): Rectangle;
    /**
     * TBD.
     * @param {Rectangle} output - TBD.
     * @returns {Rectangle} TBD.
     */
    clone(output: Rectangle): Rectangle;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @returns {boolean} TBD.
     */
    contains(x: number, y: number): boolean;
    /**
     * TBD.
     * @param {Rectangle} b - TBD.
     * @returns {boolean} TBD.
     */
    containsRect(b: Rectangle): boolean;
    /**
     * TBD.
     * @param {Rectangle} b - TBD.
     * @returns {boolean} TBD.
     */
    equals(b: Rectangle): boolean;
    /**
     * TBD.
     * @param {Rectangle} b - TBD.
     * @param {Rectangle} out - TBD.
     * @returns {Rectangle} TBD.
     */
    intersection(b: Rectangle, out: Rectangle): Rectangle;
    /**
     * TBD.
     * @param {Rectangle} b - TBD.
     * @returns {boolean} TBD.
     */
    intersects(b: Rectangle): boolean;
    /**
     * TBD.
     * @param {number} left - TBD.
     * @param {number} right - TBD.
     * @param {number} top - TBD.
     * @param {number} bottom - TBD.
     * @param {number} tolerance - TBD.
     * @returns {boolean} TBD.
     */
    intersectsRaw(left: number, right: number, top: number, bottom: number, tolerance: number): boolean;
    /**
     * TBD.
     * @param {Rectangle} b - TBD.
     * @param {Rectangle} out - TBD.
     * @returns {Rectangle} TBD.
     */
    union(b: Rectangle, out: Rectangle): Rectangle;
    /**
     * TBD.
     * @param {Point} output - TBD.
     * @returns {Point} TBD.
     */
    random(output?: Point): Point;
    /**
     * TBD.
     * @param {number} position - TBD.
     * @param {Point} output - TBD.
     * @returns {Point} TBD.
     */
    getPoint(position: number, output?: Point): Point;
    /**
     * TBD.
     * @returns {string} TBD.
     */
    toString(): string;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get halfWidth(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get halfHeight(): number;
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
    set topLeft(arg: Point);
    /**
     * TBD.
     * @returns {Point} TBD.
     */
    get topLeft(): Point;
    /**
     * TBD.
     */
    set topRight(arg: Point);
    /**
     * TBD.
     * @returns {Point} TBD.
     */
    get topRight(): Point;
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
    set bottom(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get bottom(): number;
    /**
     * TBD.
     */
    set bottomLeft(arg: Point);
    /**
     * TBD.
     * @returns {Point} TBD.
     */
    get bottomLeft(): Point;
    /**
     * TBD.
     */
    set bottomRight(arg: Point);
    /**
     * TBD.
     * @returns {Point} TBD.
     */
    get bottomRight(): Point;
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
     * @returns {number} TBD.
     */
    get volume(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get perimeter(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get randomX(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get randomY(): number;
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
import { Point } from './point';
//# sourceMappingURL=rectangle.d.ts.map