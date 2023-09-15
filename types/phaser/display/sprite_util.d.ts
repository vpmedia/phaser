/**
 * TBD.
 * @param {import('./image.js').Image} target - TBD.
 * @param {import('./webgl/texture').Texture} texture - TBD.
 * @param {boolean} destroyBase - TBD.
 */
export function setTexture(target: import('./image.js').Image, texture: import('./webgl/texture').Texture, destroyBase?: boolean): void;
/**
 * TBD.
 * @param {import('./image.js').Image} target - TBD.
 * @param {object} matrix - TBD.
 * @returns {import('../geom/rectangle.js').Rectangle} TBD.
 */
export function getBounds(target: import('./image.js').Image, matrix?: object): import('../geom/rectangle.js').Rectangle;
/**
 * TBD.
 * @param {import('./image.js').Image} target - TBD.
 * @returns {import('../geom/rectangle.js').Rectangle} TBD.
 */
export function getLocalBounds(target: import('./image.js').Image): import('../geom/rectangle.js').Rectangle;
/**
 * TBD.
 * @param {import('./image.js').Image} target - TBD.
 * @param {object} renderSession - TBD.
 * @param {import('../geom/matrix.js').Matrix} matrix - TBD.
 */
export function renderWebGL(target: import('./image.js').Image, renderSession: object, matrix: import('../geom/matrix.js').Matrix): void;
/**
 * TBD.
 * @param {import('./image.js').Image} target - TBD.
 * @param {object} renderSession - TBD.
 * @param {import('../geom/matrix.js').Matrix} matrix - TBD.
 */
export function renderCanvas(target: import('./image.js').Image, renderSession: object, matrix: import('../geom/matrix.js').Matrix): void;
//# sourceMappingURL=sprite_util.d.ts.map