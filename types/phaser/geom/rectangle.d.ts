export default class _default {
    /**
     * TBD.
     *
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
    offset(dx: any, dy: any): default;
    offsetPoint(point: any): default;
    setTo(x: any, y: any, width: any, height: any): default;
    scale(x: any, y: any): default;
    centerOn(x: any, y: any): default;
    set centerX(arg: number);
    get centerX(): number;
    set centerY(arg: number);
    get centerY(): number;
    floor(): void;
    floorAll(): void;
    ceil(): void;
    ceilAll(): void;
    copyFrom(source: any): default;
    copyTo(dest: any): any;
    inflate(dx: any, dy: any): default;
    size(output: any): Point;
    resize(width: any, height: any): default;
    clone(output: any): default;
    contains(x: any, y: any): boolean;
    containsRect(b: any): boolean;
    equals(b: any): boolean;
    intersection(b: any, out: any): default;
    intersects(b: any): boolean;
    intersectsRaw(left: any, right: any, top: any, bottom: any, tolerance: any): boolean;
    union(b: any, out: any): default;
    random(output?: null): Point;
    getPoint(position: any, output?: null): Point;
    toString(): string;
    get halfWidth(): number;
    get halfHeight(): number;
    set top(arg: number);
    get top(): number;
    set topLeft(arg: Point);
    get topLeft(): Point;
    set topRight(arg: Point);
    get topRight(): Point;
    set right(arg: number);
    get right(): number;
    set bottom(arg: number);
    get bottom(): number;
    set bottomLeft(arg: Point);
    get bottomLeft(): Point;
    set bottomRight(arg: Point);
    get bottomRight(): Point;
    set left(arg: number);
    get left(): number;
    get volume(): number;
    get perimeter(): number;
    get randomX(): number;
    get randomY(): number;
    set empty(arg: boolean);
    get empty(): boolean;
}
import Point from './point';
//# sourceMappingURL=rectangle.d.ts.map