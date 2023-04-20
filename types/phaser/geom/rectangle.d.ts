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
     * @param dx
     * @param dy
     */
    offset(dx: any, dy: any): Rectangle;
    /**
     * TBD.
     * @param point
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
     * @param source
     */
    copyFrom(source: any): Rectangle;
    /**
     * TBD.
     * @param dest
     */
    copyTo(dest: any): any;
    /**
     * TBD.
     * @param dx
     * @param dy
     */
    inflate(dx: any, dy: any): Rectangle;
    /**
     * TBD.
     * @param output
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
     * @param output
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
     * @param b
     */
    containsRect(b: any): boolean;
    /**
     * TBD.
     * @param b
     */
    equals(b: any): boolean;
    /**
     * TBD.
     * @param b
     * @param out
     */
    intersection(b: any, out: any): Rectangle;
    /**
     * TBD.
     * @param b
     */
    intersects(b: any): boolean;
    /**
     * TBD.
     * @param left
     * @param right
     * @param top
     * @param bottom
     * @param tolerance
     */
    intersectsRaw(left: any, right: any, top: any, bottom: any, tolerance: any): boolean;
    /**
     * TBD.
     * @param b
     * @param out
     */
    union(b: any, out: any): Rectangle;
    /**
     * TBD.
     * @param output
     */
    random(output?: any): any;
    /**
     * TBD.
     * @param position
     * @param output
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