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
    circumference(): number;
    random(output?: any): any;
    getBounds(): Rectangle;
    setTo(x: any, y: any, diameter: any): Circle;
    copyFrom(source: any): Circle;
    copyTo(dest: any): any;
    distance(dest: any, round?: boolean): number;
    clone(): Circle;
    contains(x: any, y: any): boolean;
    circumferencePoint(angle: any, asDegrees: any, out: any): Circle;
    offset(dx: any, dy: any): Circle;
    offsetPoint(point: any): Circle;
    toString(): string;
    set diameter(arg: number);
    get diameter(): number;
    set radius(arg: number);
    get radius(): number;
    set left(arg: number);
    get left(): number;
    set right(arg: number);
    get right(): number;
    set top(arg: number);
    get top(): number;
    set bottom(arg: number);
    get bottom(): number;
    get area(): number;
    set empty(arg: boolean);
    get empty(): boolean;
}
import { Rectangle } from './rectangle';
//# sourceMappingURL=circle.d.ts.map