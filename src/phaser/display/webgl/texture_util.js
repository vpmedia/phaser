import { BaseTexture } from './base_texture';
import { Texture } from './texture';

/**
 * TBD.
 * @param {HTMLCanvasElement} canvas - TBD.
 * @param {number} scaleMode - TBD.
 * @returns {object} TBD.
 */
export function baseTextureFromCanvas(canvas, scaleMode) {
  if (canvas.width === 0) {
    canvas.width = 1;
  }
  if (canvas.height === 0) {
    canvas.height = 1;
  }
  return new BaseTexture(canvas, scaleMode);
}

/**
 * TBD.
 * @param {HTMLCanvasElement} canvas - TBD.
 * @param {number} scaleMode - TBD.
 * @returns {object} TBD.
 */
export function textureFromCanvas(canvas, scaleMode) {
  return new Texture(baseTextureFromCanvas(canvas, scaleMode));
}
