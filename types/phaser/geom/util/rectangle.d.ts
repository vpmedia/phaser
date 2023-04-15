/**
 * TBD.
 *
 * @param {Rectangle} a - TBD.
 * @param {number} dx - TBD.
 * @param {number} dy - TBD.
 * @returns {Rectangle} TBD.
 */
export function inflate(a: Rectangle, dx: number, dy: number): Rectangle;
/**
 * TBD.
 *
 * @param {Rectangle} a - TBD.
 * @param {object} point - TBD.
 * @returns {Rectangle} TBD.
 */
export function inflatePoint(a: Rectangle, point: object): Rectangle;
/**
 * TBD.
 *
 * @param {Rectangle} a - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function size(a: Rectangle, output?: Point): Point;
/**
 * TBD.
 *
 * @param {Rectangle} input - TBD.
 * @param {Rectangle} output - TBD.
 * @returns {Rectangle} TBD.
 */
export function clone(input: Rectangle, output?: Rectangle): Rectangle;
/**
 * TBD.
 *
 * @param {Rectangle} a - TBD.
 * @param {number} x - TBD.
 * @param {number} y - TBD.
 * @returns {boolean} TBD.
 */
export function contains(a: Rectangle, x: number, y: number): boolean;
/**
 * TBD.
 *
 * @param {number} rx - TBD.
 * @param {number} ry - TBD.
 * @param {number} rw - TBD.
 * @param {number} rh - TBD.
 * @param {number} x - TBD.
 * @param {number} y - TBD.
 * @returns {boolean} TBD.
 */
export function containsRaw(rx: number, ry: number, rw: number, rh: number, x: number, y: number): boolean;
/**
 * TBD.
 *
 * @param {Rectangle} a - TBD.
 * @param {Point} point - TBD.
 * @returns {boolean} TBD.
 */
export function containsPoint(a: Rectangle, point: Point): boolean;
/**
 * TBD.
 *
 * @param {Rectangle} a - TBD.
 * @param {Rectangle} b - TBD.
 * @returns {boolean} TBD.
 */
export function containsRect(a: Rectangle, b: Rectangle): boolean;
/**
 * TBD.
 *
 * @param {Rectangle} a - TBD.
 * @param {Rectangle} b - TBD.
 * @returns {boolean} TBD.
 */
export function equals(a: Rectangle, b: Rectangle): boolean;
/**
 * TBD.
 *
 * @param {Rectangle} a - TBD.
 * @param {Rectangle} b - TBD.
 * @returns {boolean} TBD.
 */
export function sameDimensions(a: Rectangle, b: Rectangle): boolean;
/**
 * TBD.
 *
 * @param {Rectangle} a - TBD.
 * @param {Rectangle} b - TBD.
 * @returns {boolean} TBD.
 */
export function intersects(a: Rectangle, b: Rectangle): boolean;
/**
 * TBD.
 *
 * @param {Rectangle} a - TBD.
 * @param {Rectangle} b - TBD.
 * @param {Rectangle} output - TBD.
 * @returns {Rectangle} TBD.
 */
export function intersection(a: Rectangle, b: Rectangle, output?: Rectangle): Rectangle;
/**
 * TBD.
 *
 * @param {Rectangle} a - TBD.
 * @param {number} left - TBD.
 * @param {number} right - TBD.
 * @param {number} top - TBD.
 * @param {number} bottom - TBD.
 * @param {number} tolerance - TBD.
 * @returns {boolean} TBD.
 */
export function intersectsRaw(a: Rectangle, left: number, right: number, top: number, bottom: number, tolerance?: number): boolean;
/**
 * TBD.
 *
 * @param {Rectangle} a - TBD.
 * @param {Rectangle} b - TBD.
 * @param {Rectangle} output - TBD.
 * @returns {Rectangle} TBD.
 */
export function union(a: Rectangle, b: Rectangle, output?: Rectangle): Rectangle;
/**
 * TBD.
 *
 * @param {Point[]} points - TBD.
 * @param {Rectangle} output - TBD.
 * @returns {Rectangle} TBD.
 */
export function aabb(points: Point[], output?: Rectangle): Rectangle;
/**
 * TBD.
 *
 * @returns {Rectangle} TBD.
 */
export function getEmptyRectangle(): Rectangle;
import Rectangle from '../rectangle';
import Point from '../point';
//# sourceMappingURL=rectangle.d.ts.map