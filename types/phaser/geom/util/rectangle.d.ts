/**
 *
 * @param {object} a - TBD.
 * @param {number} dx - TBD.
 * @param {number} dy - TBD.
 * @returns {object} TBD.
 */
export function inflate(a: object, dx: number, dy: number): object;
/**
 *
 * @param {object} a - TBD.
 * @param {object} point - TBD.
 * @returns {object} TBD.
 */
export function inflatePoint(a: object, point: object): object;
/**
 *
 * @param {object} a - TBD.
 * @param {object} output - TBD.
 * @returns {object} TBD.
 */
export function size(a: object, output?: object): object;
/**
 *
 * @param {object} input - TBD.
 * @param {object} output - TBD.
 * @returns {object} TBD.
 */
export function clone(input: object, output?: object): object;
/**
 *
 * @param {object} a - TBD.
 * @param {number} x - TBD.
 * @param {number} y - TBD.
 * @returns {boolean} TBD.
 */
export function contains(a: object, x: number, y: number): boolean;
/**
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
 *
 * @param {object} a - TBD.
 * @param {object} point - TBD.
 * @returns {boolean} TBD.
 */
export function containsPoint(a: object, point: object): boolean;
/**
 *
 * @param {object} a - TBD.
 * @param {object} b - TBD.
 * @returns {boolean} TBD.
 */
export function containsRect(a: object, b: object): boolean;
/**
 *
 * @param {object} a - TBD.
 * @param {object} b - TBD.
 * @returns {boolean} TBD.
 */
export function equals(a: object, b: object): boolean;
/**
 *
 * @param {object} a - TBD.
 * @param {object} b - TBD.
 * @returns {boolean} TBD.
 */
export function sameDimensions(a: object, b: object): boolean;
/**
 *
 * @param {object} a - TBD.
 * @param {object} b - TBD.
 * @returns {boolean} TBD.
 */
export function intersects(a: object, b: object): boolean;
/**
 *
 * @param {object} a - TBD.
 * @param {object} b - TBD.
 * @param {object} output - TBD.
 * @returns {object} TBD.
 */
export function intersection(a: object, b: object, output?: object): object;
/**
 *
 * @param {object} a - TBD.
 * @param {number} left - TBD.
 * @param {number} right - TBD.
 * @param {number} top - TBD.
 * @param {number} bottom - TBD.
 * @param {number} tolerance - TBD.
 * @returns {boolean} TBD.
 */
export function intersectsRaw(a: object, left: number, right: number, top: number, bottom: number, tolerance?: number): boolean;
/**
 *
 * @param {object} a - TBD.
 * @param {object} b - TBD.
 * @param {object} output - TBD.
 * @returns {object} TBD.
 */
export function union(a: object, b: object, output?: object): object;
/**
 *
 * @param {object[]} points - TBD.
 * @param {object} output - TBD.
 * @returns {object} TBD.
 */
export function aabb(points: object[], output?: object): object;
/**
 * TBD.
 *
 * @returns {object} TBD.
 */
export function getEmptyRectangle(): object;
//# sourceMappingURL=rectangle.d.ts.map