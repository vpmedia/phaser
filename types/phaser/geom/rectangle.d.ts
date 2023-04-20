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
     * @param dx - TBD.
     * @param dy - TBD.
     */
    offset(dx: any, dy: any): Rectangle;
    /**
     * TBD.
     * @param point - TBD.
     */
    offsetPoint(point: any): Rectangle;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    setTo(x: number, y: number, width: number, height: number): Rectangle;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    scale(x: number, y: number): Rectangle;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    centerOn(x: number, y: number): Rectangle;
    /**
     * TBD.
     */
    set centerX(arg: number);
    /**
     * TBD.
     */
    get centerX(): number;
    /**
     * TBD.
     */
    set centerY(arg: number);
    /**
     * TBD.
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
     * @param source - TBD.
     */
    copyFrom(source: any): Rectangle;
    /**
     * TBD.
     * @param dest - TBD.
     */
    copyTo(dest: any): any;
    /**
     * TBD.
     * @param dx - TBD.
     * @param dy - TBD.
     */
    inflate(dx: any, dy: any): Rectangle;
    /**
     * TBD.
     * @param output - TBD.
     */
    size(output: any): Point;
    /**
     * TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    resize(width: number, height: number): Rectangle;
    /**
     * TBD.
     * @param output - TBD.
     */
    clone(output: any): Rectangle;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    contains(x: number, y: number): boolean;
    /**
     * TBD.
     * @param b - TBD.
     */
    containsRect(b: any): boolean;
    /**
     * TBD.
     * @param b - TBD.
     */
    equals(b: any): boolean;
    /**
     * TBD.
     * @param b - TBD.
     * @param out - TBD.
     */
    intersection(b: any, out: any): Rectangle;
    /**
     * TBD.
     * @param b - TBD.
     */
    intersects(b: any): boolean;
    /**
     * TBD.
     * @param left - TBD.
     * @param right - TBD.
     * @param top - TBD.
     * @param bottom - TBD.
     * @param tolerance - TBD.
     */
    intersectsRaw(left: any, right: any, top: any, bottom: any, tolerance: any): boolean;
    /**
     * TBD.
     * @param b - TBD.
     * @param out - TBD.
     */
    union(b: any, out: any): Rectangle;
    /**
     * TBD.
     * @param output - TBD.
     */
    random(output?: any): any;
    /**
     * TBD.
     * @param position - TBD.
     * @param output - TBD.
     */
    getPoint(position: any, output?: any): any;
    /**
     * TBD.
     */
    toString(): string;
    /**
     * TBD.
     */
    get halfWidth(): number;
    /**
     * TBD.
     */
    get halfHeight(): number;
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
    set topLeft(arg: Point);
    /**
     * TBD.
     */
    get topLeft(): Point;
    /**
     * TBD.
     */
    set topRight(arg: Point);
    /**
     * TBD.
     */
    get topRight(): Point;
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
    set bottom(arg: number);
    /**
     * TBD.
     */
    get bottom(): number;
    /**
     * TBD.
     */
    set bottomLeft(arg: Point);
    /**
     * TBD.
     */
    get bottomLeft(): Point;
    /**
     * TBD.
     */
    set bottomRight(arg: Point);
    /**
     * TBD.
     */
    get bottomRight(): Point;
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
    get volume(): number;
    /**
     * TBD.
     */
    get perimeter(): number;
    /**
     * TBD.
     */
    get randomX(): number;
    /**
     * TBD.
     */
    get randomY(): number;
    /**
     * TBD.
     */
    set empty(arg: boolean);
    /**
     * TBD.
     */
    get empty(): boolean;
}
import { Point } from './point';
//# sourceMappingURL=rectangle.d.ts.map