export class Point {
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    constructor(x?: number, y?: number);
    x: number;
    y: number;
    type: number;
    /**
     * TBD.
     * @param source - TBD.
     */
    copyFrom(source: any): Point;
    /**
     * TBD.
     */
    invert(): Point;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    setTo(x: number, y: number): Point;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    set(x: number, y: number): Point;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    add(x: number, y: number): Point;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    subtract(x: number, y: number): Point;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    multiply(x: number, y: number): Point;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    divide(x: number, y: number): Point;
    /**
     * TBD.
     * @param min - TBD.
     * @param max - TBD.
     */
    clampX(min: any, max: any): Point;
    /**
     * TBD.
     * @param min - TBD.
     * @param max - TBD.
     */
    clampY(min: any, max: any): Point;
    /**
     * TBD.
     * @param min - TBD.
     * @param max - TBD.
     */
    clamp(min: any, max: any): Point;
    /**
     * TBD.
     */
    clone(): Point;
    /**
     * TBD.
     * @param dest - TBD.
     */
    copyTo(dest: any): any;
    /**
     * TBD.
     * @param b - TBD.
     */
    distance(b: any): number;
    /**
     * TBD.
     * @param a - TBD.
     */
    equals(a: any): boolean;
    /**
     * TBD.
     * @param a - TBD.
     * @param asDegrees - TBD.
     */
    angle(a: any, asDegrees?: boolean): number;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param angle - TBD.
     * @param asDegrees - TBD.
     * @param dist - TBD.
     */
    rotate(x: number, y: number, angle: any, asDegrees: any, dist: any): any;
    /**
     * TBD.
     */
    getMagnitude(): number;
    /**
     * TBD.
     */
    getMagnitudeSq(): number;
    /**
     * TBD.
     * @param magnitude - TBD.
     */
    setMagnitude(magnitude: any): Point;
    /**
     * TBD.
     */
    normalize(): Point;
    /**
     * TBD.
     */
    isZero(): boolean;
    /**
     * TBD.
     * @param a - TBD.
     */
    dot(a: any): number;
    /**
     * TBD.
     * @param a - TBD.
     */
    cross(a: any): number;
    /**
     * TBD.
     */
    perp(): Point;
    /**
     * TBD.
     */
    rperp(): Point;
    /**
     * TBD.
     */
    normalRightHand(): Point;
    /**
     * TBD.
     */
    floor(): Point;
    /**
     * TBD.
     */
    ceil(): Point;
    /**
     * TBD.
     */
    toString(): string;
}
//# sourceMappingURL=point.d.ts.map