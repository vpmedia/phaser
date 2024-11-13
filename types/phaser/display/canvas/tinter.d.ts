/**
 * TBD.
 * @param {object} sprite - TBD.
 * @param {object} color - TBD.
 * @returns {object} TBD.
 */
export function getTintedTexture(sprite: object, color: object): object;
/**
 * TBD.
 * @param {object} texture - TBD.
 * @param {object} color - TBD.
 * @param {HTMLCanvasElement} canvas - TBD.
 */
export function tintWithMultiply(texture: object, color: object, canvas: HTMLCanvasElement): void;
/**
 * TBD.
 * @param {object} texture - TBD.
 * @param {object} color - TBD.
 * @param {HTMLCanvasElement} canvas - TBD.
 */
export function tintWithPerPixel(texture: object, color: object, canvas: HTMLCanvasElement): void;
/**
 * TBD.
 * @param {import('../../core/game.js').Game} game - TBD.
 * @returns {boolean} TBD.
 * @throws {Error} TBD.
 */
export function checkInverseAlpha(game: import("../../core/game.js").Game): boolean;
/**
 * TBD.
 * @param {import('../../core/game.js').Game} game - TBD.
 * @returns {boolean} TBD.
 * @throws {Error} TBD.
 */
export function canUseNewCanvasBlendModes(game: import("../../core/game.js").Game): boolean;
/**
 * TBD.
 * @param {import('../../core/game.js').Game} game - TBD.
 */
export function detectCapabilities(game: import("../../core/game.js").Game): void;
//# sourceMappingURL=tinter.d.ts.map