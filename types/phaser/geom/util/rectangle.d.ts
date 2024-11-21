export function inflate(a: Rectangle, dx: number, dy: number): Rectangle;
export function inflatePoint(a: Rectangle, point: object): Rectangle;
export function size(a: Rectangle, output?: Point): Point;
export function clone(input: Rectangle, output?: Rectangle): Rectangle;
export function contains(a: Rectangle, x: number, y: number): boolean;
export function containsRaw(rx: number, ry: number, rw: number, rh: number, x: number, y: number): boolean;
export function containsPoint(a: Rectangle, point: Point): boolean;
export function containsRect(a: Rectangle, b: Rectangle): boolean;
export function equals(a: Rectangle, b: Rectangle): boolean;
export function sameDimensions(a: Rectangle, b: Rectangle): boolean;
export function intersects(a: Rectangle, b: Rectangle): boolean;
export function intersection(a: Rectangle, b: Rectangle, output?: Rectangle): Rectangle;
export function intersectsRaw(a: Rectangle, left: number, right: number, top: number, bottom: number, tolerance?: number): boolean;
export function union(a: Rectangle, b: Rectangle, output?: Rectangle): Rectangle;
export function aabb(points: Point[], output?: Rectangle): Rectangle;
export function getEmptyRectangle(): Rectangle;
import { Rectangle } from '../rectangle.js';
import { Point } from '../point.js';
//# sourceMappingURL=rectangle.d.ts.map