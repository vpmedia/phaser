export default class _default {
    constructor(x?: number, y?: number, diameter?: number);
    x: number;
    y: number;
    _diameter: number;
    _radius: number;
    type: number;
    circumference(): number;
    random(output?: null): Point;
    getBounds(): Rectangle;
    setTo(x: any, y: any, diameter: any): default;
    copyFrom(source: any): default;
    copyTo(dest: any): any;
    distance(dest: any, round?: boolean): number;
    clone(): object;
    contains(x: any, y: any): boolean;
    circumferencePoint(angle: any, asDegrees: any, out: any): object;
    offset(dx: any, dy: any): default;
    offsetPoint(point: any): default;
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
import Point from './point';
import Rectangle from './rectangle';
//# sourceMappingURL=circle.d.ts.map