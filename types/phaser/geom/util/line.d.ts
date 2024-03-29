/**
 * TBD.
 * @param {Line} input - TBD.
 * @param {Line} output - TBD.
 * @returns {Line} TBD.
 */
export function clone(input: Line, output?: Line): Line;
/**
 * TBD.
 * @param {object} a - TBD.
 * @param {object} b - TBD.
 * @param {object} e - TBD.
 * @param {object} f - TBD.
 * @param {boolean} asSegment - TBD.
 * @param {Point} output - TBD.
 * @returns {Point} TBD.
 */
export function intersectsPoints(a: object, b: object, e: object, f: object, asSegment?: boolean, output?: Point): Point;
/**
 * TBD.
 * @param {object} a - TBD.
 * @param {object} b - TBD.
 * @param {boolean} asSegment - TBD.
 * @param {Point} result - TBD.
 * @returns {Point} TBD.
 */
export function intersects(a: object, b: object, asSegment: boolean, result: Point): Point;
/**
 * TBD.
 * @param {object} line - TBD.
 * @param {object} rect - TBD.
 * @returns {boolean} TBD.
 */
export function intersectsRectangle(line: object, rect: object): boolean;
/**
 * TBD.
 * @param {object} a - TBD.
 * @param {object} b - TBD.
 * @returns {number} TBD.
 */
export function reflect(a: object, b: object): number;
import { Line } from '../line.js';
import { Point } from '../point.js';
//# sourceMappingURL=line.d.ts.map