/**
 * TBD.
 *
 * @param {object} list - TBD.
 * @returns {object} TBD.
 */
export function sortLinked(list: object): object;
/**
 * TBD.
 *
 * @param {object} a - TBD.
 * @param {object} b - TBD.
 * @returns {number} TBD.
 */
export function compareX(a: object, b: object): number;
/**
 * TBD.
 *
 * @param {number} x - TBD.
 * @param {number} y - TBD.
 * @param {number} minX - TBD.
 * @param {number} minY - TBD.
 * @param {number} size - TBD.
 * @returns {number} TBD.
 */
export function zOrder(x: number, y: number, minX: number, minY: number, size: number): number;
/**
 * TBD.
 *
 * @param {object} start - TBD.
 * @param {number} minX - TBD.
 * @param {number} minY - TBD.
 * @param {number} size - TBD.
 */
export function indexCurve(start: object, minX: number, minY: number, size: number): void;
/**
 * TBD.
 *
 * @param {object} start - TBD.
 * @returns {object} TBD.
 */
export function getLeftmost(start: object): object;
/**
 * TBD.
 *
 * @param {number} ax - TBD.
 * @param {number} ay - TBD.
 * @param {number} bx - TBD.
 * @param {number} by - TBD.
 * @param {number} cx - TBD.
 * @param {number} cy - TBD.
 * @param {number} px - TBD.
 * @param {number} py - TBD.
 * @returns {object} TBD.
 */
export function pointInTriangle(ax: number, ay: number, bx: number, by: number, cx: number, cy: number, px: number, py: number): object;
/**
 * TBD.
 *
 * @param {object} p - TBD.
 * @param {object} q - TBD.
 * @param {object} r - TBD.
 * @returns {number} TBD.
 */
export function area(p: object, q: object, r: object): number;
/**
 * TBD.
 *
 * @param {object} p1 - TBD.
 * @param {object} p2 - TBD.
 * @returns {boolean} TBD.
 */
export function equals(p1: object, p2: object): boolean;
/**
 * TBD.
 *
 * @param {object} p1 - TBD.
 * @param {object} q1 - TBD.
 * @param {object} p2 - TBD.
 * @param {object} q2 - TBD.
 * @returns {boolean} TBD.
 */
export function intersects(p1: object, q1: object, p2: object, q2: object): boolean;
/**
 * TBD.
 *
 * @param {object} a - TBD.
 * @param {object} b - TBD.
 * @returns {boolean} TBD.
 */
export function intersectsPolygon(a: object, b: object): boolean;
/**
 * TBD.
 *
 * @param {object} a - TBD.
 * @param {object} b - TBD.
 * @returns {object} TBD.
 */
export function locallyInside(a: object, b: object): object;
/**
 * TBD.
 *
 * @param {object} a - TBD.
 * @param {object} b - TBD.
 * @returns {boolean} TBD.
 */
export function middleInside(a: object, b: object): boolean;
/**
 * TBD.
 *
 * @param {object} a - TBD.
 * @param {object} b - TBD.
 * @returns {boolean} TBD.
 */
export function isValidDiagonal(a: object, b: object): boolean;
/**
 * TBD.
 *
 * @param {object} a - TBD.
 * @param {object} b - TBD.
 * @returns {object} TBD.
 */
export function splitPolygon(a: object, b: object): object;
/**
 * TBD.
 *
 * @param {number} i - TBD.
 * @param {number} x - TBD.
 * @param {number} y - TBD.
 * @param {object} last - TBD.
 * @returns {object} TBD.
 */
export function insertNode(i: number, x: number, y: number, last: object): object;
/**
 * TBD.
 *
 * @param {object} p - TBD.
 */
export function removeNode(p: object): void;
/**
 * TBD.
 *
 * @param {object} ear - TBD.
 * @returns {boolean} TBD.
 */
export function isEar(ear: object): boolean;
/**
 * TBD.
 *
 * @param {object} ear - TBD.
 * @param {number} minX - TBD.
 * @param {number} minY - TBD.
 * @param {number} size - TBD.
 * @returns {boolean} TBD.
 */
export function isEarHashed(ear: object, minX: number, minY: number, size: number): boolean;
/**
 * TBD.
 *
 * @param {object} data - TBD.
 * @param {number} start - TBD.
 * @param {number} end - TBD.
 * @param {number} dim - TBD.
 * @param {boolean} clockwise - TBD.
 * @returns {object} TBD.
 */
export function linkedList(data: object, start: number, end: number, dim: number, clockwise: boolean): object;
/**
 * TBD.
 *
 * @param {object} start - TBD.
 * @param {object} end - TBD.
 * @returns {object} TBD.
 */
export function filterPoints(start: object, end: object): object;
/**
 * TBD.
 *
 * @param {object} hole - TBD.
 * @param {object} outerNode - TBD.
 * @returns {object} TBD.
 */
export function findHoleBridge(hole: object, outerNode: object): object;
/**
 * TBD.
 *
 * @param {object} hole - TBD.
 * @param {object} outerNode - TBD.
 */
export function eliminateHole(hole: object, outerNode: object): void;
/**
 * TBD.
 *
 * @param {object} data - TBD.
 * @param {object} holeIndices - TBD.
 * @param {object} outerNode - TBD.
 * @param {object} dim - TBD.
 * @returns {object} TBD.
 */
export function eliminateHoles(data: object, holeIndices: object, outerNode: object, dim: object): object;
/**
 * TBD.
 *
 * @param {object} start - TBD.
 * @param {object} triangles - TBD.
 * @param {number} dim - TBD.
 * @returns {object} TBD.
 */
export function cureLocalIntersections(start: object, triangles: object, dim: number): object;
/**
 * TBD.
 *
 * @param {object} start - TBD.
 * @param {object} triangles - TBD.
 * @param {number} dim - TBD.
 * @param {number} minX - TBD.
 * @param {number} minY - TBD.
 * @param {number} size - TBD.
 */
export function splitEarcut(start: object, triangles: object, dim: number, minX: number, minY: number, size: number): void;
/**
 * TBD.
 *
 * @param {object} ear - TBD.
 * @param {object} triangles - TBD.
 * @param {number} dim - TBD.
 * @param {number} minX - TBD.
 * @param {number} minY - TBD.
 * @param {number} size - TBD.
 * @param {object} pass - TBD.
 */
export function earcutLinked(ear: object, triangles: object, dim: number, minX: number, minY: number, size: number, pass: object): void;
/**
 * TBD.
 *
 * @param {object} data - TBD.
 * @param {object} holeIndices - TBD.
 * @param {number} dim - TBD.
 * @returns {object} TBD.
 */
export function triangulate(data: object, holeIndices: object, dim: number): object;
//# sourceMappingURL=earcut.d.ts.map