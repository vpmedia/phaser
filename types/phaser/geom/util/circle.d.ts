export function clone(input: Circle, output?: Circle): Circle;
export function contains(a: Circle, x: number, y: number): boolean;
export function equals(a: Circle, b: Circle): boolean;
export function intersects(a: Circle, b: Circle): boolean;
export function circumferencePoint(a: Circle, angle: number, asDegrees?: boolean, output?: Point): Point;
export function intersectsPoint(a: Circle, angle: number, asDegrees?: boolean, output?: Point): Point;
export function intersectsRectangle(c: Circle, r: object): boolean;
import { Circle } from '../circle.js';
import { Point } from '../point.js';
//# sourceMappingURL=circle.d.ts.map