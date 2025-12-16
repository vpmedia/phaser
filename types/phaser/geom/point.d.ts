export class Point {
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    constructor(x?: number, y?: number);
    /** @type {number} */
    x: number;
    /** @type {number} */
    y: number;
    /** @type {number} */
    type: number;
    /**
     * TBD.
     * @param {Point} source - TBD.
     * @returns {Point} TBD.
     */
    copyFrom(source: Point): Point;
    /**
     * TBD.
     * @returns {Point} TBD.
     */
    invert(): Point;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @returns {Point} TBD.
     */
    setTo(x: number, y: number): Point;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @returns {Point} TBD.
     * @deprecated
     */
    set(x: number, y: number): Point;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @returns {Point} TBD.
     */
    add(x: number, y: number): Point;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @returns {Point} TBD.
     */
    subtract(x: number, y: number): Point;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @returns {Point} TBD.
     */
    multiply(x: number, y: number): Point;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @returns {Point} TBD.
     */
    divide(x: number, y: number): Point;
    /**
     * TBD.
     * @param {number} min - TBD.
     * @param {number} max - TBD.
     * @returns {Point} TBD.
     */
    clampX(min: number, max: number): Point;
    /**
     * TBD.
     * @param {number} min - TBD.
     * @param {number} max - TBD.
     * @returns {Point} TBD.
     */
    clampY(min: number, max: number): Point;
    /**
     * TBD.
     * @param {number} min - TBD.
     * @param {number} max - TBD.
     * @returns {Point} TBD.
     */
    clamp(min: number, max: number): Point;
    /**
     * TBD.
     * @returns {Point} TBD.
     */
    clone(): Point;
    /**
     * TBD.
     * @param {Point} dest - TBD.
     * @returns {Point} TBD.
     */
    copyTo(dest: Point): Point;
    /**
     * TBD.
     * @param {Point} b - TBD.
     * @returns {number} TBD.
     */
    distance(b: Point): number;
    /**
     * TBD.
     * @param {Point} a - TBD.
     * @returns {boolean} TBD.
     */
    equals(a: Point): boolean;
    /**
     * TBD.
     * @param {Point} a - TBD.
     * @param {boolean} asDegrees - TBD.
     * @returns {number} TBD.
     */
    angle(a: Point, asDegrees?: boolean): number;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {number} angle - TBD.
     * @param {boolean} asDegrees - TBD.
     * @param {number | null | undefined} dist - TBD.
     * @returns {Point} TBD.
     */
    rotate(x: number, y: number, angle: number, asDegrees: boolean, dist?: number | null | undefined): Point;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    getMagnitude(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    getMagnitudeSq(): number;
    /**
     * TBD.
     * @param {number} magnitude - TBD.
     * @returns {Point} TBD.
     */
    setMagnitude(magnitude: number): Point;
    /**
     * TBD.
     * @returns {Point} TBD.
     */
    normalize(): Point;
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    isZero(): boolean;
    /**
     * TBD.
     * @param {Point} a - TBD.
     * @returns {number} TBD.
     */
    dot(a: Point): number;
    /**
     * TBD.
     * @param {Point} a - TBD.
     * @returns {number} TBD.
     */
    cross(a: Point): number;
    /**
     * TBD.
     * @returns {Point} TBD.
     */
    perp(): Point;
    /**
     * TBD.
     * @returns {Point} TBD.
     */
    rperp(): Point;
    /**
     * TBD.
     * @returns {Point} TBD.
     */
    normalRightHand(): Point;
    /**
     * TBD.
     * @returns {Point} TBD.
     */
    floor(): Point;
    /**
     * TBD.
     * @returns {Point} TBD.
     */
    ceil(): Point;
    /**
     * TBD.
     * @returns {string} TBD.
     */
    toString(): string;
}
//# sourceMappingURL=point.d.ts.map