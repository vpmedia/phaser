export class Point {
    /**
     * TBD.
     *
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    constructor(x?: number, y?: number);
    x: number;
    y: number;
    type: number;
    copyFrom(source: any): Point;
    invert(): Point;
    setTo(x: any, y: any): Point;
    set(x: any, y: any): Point;
    add(x: any, y: any): Point;
    subtract(x: any, y: any): Point;
    multiply(x: any, y: any): Point;
    divide(x: any, y: any): Point;
    clampX(min: any, max: any): Point;
    clampY(min: any, max: any): Point;
    clamp(min: any, max: any): Point;
    clone(): Point;
    copyTo(dest: any): any;
    distance(b: any): number;
    equals(a: any): boolean;
    angle(a: any, asDegrees?: boolean): number;
    rotate(x: any, y: any, angle: any, asDegrees: any, dist: any): any;
    getMagnitude(): number;
    getMagnitudeSq(): number;
    setMagnitude(magnitude: any): Point;
    normalize(): Point;
    isZero(): boolean;
    dot(a: any): number;
    cross(a: any): number;
    perp(): Point;
    rperp(): Point;
    normalRightHand(): Point;
    floor(): Point;
    ceil(): Point;
    toString(): string;
}
//# sourceMappingURL=point.d.ts.map