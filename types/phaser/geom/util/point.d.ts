/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} b - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function add(a: Point, b: Point, output?: Point): Point;
/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} b - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function subtract(a: Point, b: Point, output?: Point): Point;
/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} b - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function multiply(a: Point, b: Point, output?: Point): Point;
/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} b - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function divide(a: Point, b: Point, output?: Point): Point;
/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} b - TBD.
 * @returns {boolean} TBD.
 */
export function equals(a: Point, b: Point): boolean;
/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} b - TBD.
 * @returns {number} TBD.
 */
export function angle(a: Point, b: Point): number;
/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function negative(a: Point, output?: Point): Point;
/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} b - TBD.
 * @param {number} s - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function multiplyAdd(a: Point, b: Point, s: number, output?: Point): Point;
/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} b - TBD.
 * @param {number} f - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function interpolate(a: Point, b: Point, f: number, output?: Point): Point;
/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function perp(a: Point, output?: Point): Point;
/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function rperp(a: Point, output?: Point): Point;
/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} b - TBD.
 * @param {boolean} round - TBD.
 * @returns {number} TBD.
 */
export function distance(a: Point, b: Point, round?: boolean): number;
/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} b - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function project(a: Point, b: Point, output?: Point): Point;
/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} b - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function projectUnit(a: Point, b: Point, output?: Point): Point;
/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function normalRightHand(a: Point, output?: Point): Point;
/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function normalize(a: Point, output?: Point): Point;
/**
 * TBD.
 * @param {Point} a - TBD.
 * @param {number} x - TBD.
 * @param {number} y - TBD.
 * @param {number} ang - TBD.
 * @param {boolean} asDegrees - TBD.
 * @param {number} dist - TBD.
 * @returns {object} TBD.
 */
export function rotate(a: Point, x: number, y: number, ang: number, asDegrees: boolean, dist: number): object;
/**
 * TBD.
 * @param {Point[]} points - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 * @throws Error TBD.
 */
export function centroid(points: Point[], output?: Point): Point;
/**
 * TBD.
 * @param {object} obj - TBD.
 * @param {string} xProp - TBD.
 * @param {string} yProp - TBD.
 * @returns {Point} TBD.
 */
export function parse(obj: object, xProp?: string, yProp?: string): Point;
/**
 * TBD.
 * @param {Point} input - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function clone(input: Point, output?: Point): Point;
import { Point } from '../point';
//# sourceMappingURL=point.d.ts.map