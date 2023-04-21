/**
 * TBD.
 * @param {object} target - TBD.
 * @param {object} texture - TBD.
 * @param {boolean} destroyBase - TBD.
 */
export function setTexture(target: object, texture: object, destroyBase?: boolean): void;
/**
 * TBD.
 * @param {object} target - TBD.
 * @param {object} matrix - TBD.
 * @returns {Rectangle} TBD.
 */
export function getBounds(target: object, matrix?: object): Rectangle;
/**
 * TBD.
 * @param {object} target - TBD.
 * @returns {Rectangle} TBD.
 */
export function getLocalBounds(target: object): Rectangle;
/**
 * TBD.
 * @param {object} target - TBD.
 * @param {object} renderSession - TBD.
 * @param {object} matrix - TBD.
 */
export function renderWebGL(target: object, renderSession: object, matrix: object): void;
/**
 * TBD.
 * @param {object} target - TBD.
 * @param {object} renderSession - TBD.
 * @param {object} matrix - TBD.
 */
export function renderCanvas(target: object, renderSession: object, matrix: object): void;
import { Rectangle } from '../geom/rectangle';
//# sourceMappingURL=sprite_util.d.ts.map