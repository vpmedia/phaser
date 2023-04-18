/**
 * TBD.
 * @param {Circle} input - TBD.
 * @param {Circle} output - TBD.
 * @returns {Circle} TBD.
 */
export function clone(input: Circle, output?: Circle): Circle;
/**
 * TBD.
 * @param {Circle} a - TBD.
 * @param {number} x - TBD.
 * @param {number} y - TBD.
 * @returns {boolean} TBD.
 */
export function contains(a: Circle, x: number, y: number): boolean;
/**
 * TBD.
 * @param {Circle} a - TBD.
 * @param {Circle} b - TBD.
 * @returns {boolean} TBD.
 */
export function equals(a: Circle, b: Circle): boolean;
/**
 * TBD.
 * @param {Circle} a - TBD.
 * @param {Circle} b - TBD.
 * @returns {boolean} TBD.
 */
export function intersects(a: Circle, b: Circle): boolean;
/**
 * TBD.
 * @param {Circle} a - TBD.
 * @param {number} angle - TBD.
 * @param {boolean} asDegrees - TBD.
 * @param {Circle} output - TBD.
 * @returns {Circle} TBD.
 */
export function circumferencePoint(a: Circle, angle: number, asDegrees?: boolean, output?: Circle): Circle;
/**
 * TBD.
 * @param {Circle} a - TBD.
 * @param {number} angle - TBD.
 * @param {boolean} asDegrees - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function intersectsPoint(a: Circle, angle: number, asDegrees?: boolean, output?: Point): Point;
/**
 * TBD.
 * @param {Circle} c - TBD.
 * @param {object} r - TBD.
 * @returns {boolean} TBD.
 */
export function intersectsRectangle(c: Circle, r: object): boolean;
import { Circle } from '../circle';
import { Point } from '../point';
//# sourceMappingURL=circle.d.ts.map