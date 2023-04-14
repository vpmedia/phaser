export default class _default {
    constructor(x?: number, y?: number);
    x: number;
    y: number;
    type: number;
    copyFrom(source: any): default;
    invert(): default;
    setTo(x: any, y: any): default;
    set(x: any, y: any): default;
    add(x: any, y: any): default;
    subtract(x: any, y: any): default;
    multiply(x: any, y: any): default;
    divide(x: any, y: any): default;
    clampX(min: any, max: any): default;
    clampY(min: any, max: any): default;
    clamp(min: any, max: any): default;
    clone(): default;
    copyTo(dest: any): any;
    distance(b: any): number;
    equals(a: any): boolean;
    angle(a: any, asDegrees?: boolean): number;
    rotate(x: any, y: any, angle: any, asDegrees: any, dist: any): object;
    getMagnitude(): number;
    getMagnitudeSq(): number;
    setMagnitude(magnitude: any): default;
    normalize(): default;
    isZero(): boolean;
    dot(a: any): number;
    cross(a: any): number;
    perp(): default;
    rperp(): default;
    normalRightHand(): default;
    floor(): default;
    ceil(): default;
    toString(): string;
}
//# sourceMappingURL=point.d.ts.map