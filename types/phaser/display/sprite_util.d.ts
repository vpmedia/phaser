/**
 * TBD.
 * @param {import('./image').Image} target - TBD.
 * @param {import('./webgl/texture').Texture} texture - TBD.
 * @param {boolean} destroyBase - TBD.
 */
export function setTexture(target: import('./image').Image, texture: import('./webgl/texture').Texture, destroyBase?: boolean): void;
/**
 * TBD.
 * @param {import('./image').Image} target - TBD.
 * @param {object} matrix - TBD.
 * @returns {import('../geom/rectangle').Rectangle} TBD.
 */
export function getBounds(target: import('./image').Image, matrix?: object): import('../geom/rectangle').Rectangle;
/**
 * TBD.
 * @param {import('./image').Image} target - TBD.
 * @returns {import('../geom/rectangle').Rectangle} TBD.
 */
export function getLocalBounds(target: import('./image').Image): import('../geom/rectangle').Rectangle;
/**
 * TBD.
 * @param {import('./image').Image} target - TBD.
 * @param {object} renderSession - TBD.
 * @param {import('../geom/matrix').Matrix} matrix - TBD.
 */
export function renderWebGL(target: import('./image').Image, renderSession: object, matrix: import('../geom/matrix').Matrix): void;
/**
 * TBD.
 * @param {import('./image').Image} target - TBD.
 * @param {object} renderSession - TBD.
 * @param {import('../geom/matrix').Matrix} matrix - TBD.
 */
export function renderCanvas(target: import('./image').Image, renderSession: object, matrix: import('../geom/matrix').Matrix): void;
//# sourceMappingURL=sprite_util.d.ts.map