import { BaseTexture } from './base_texture.js';
import { Texture } from './texture.js';

/**
 * TBD.
 * @param {HTMLCanvasElement} canvas - TBD.
 * @param {number} [scaleMode] - TBD.
 * @returns {BaseTexture} TBD.
 */
export const baseTextureFromCanvas = (canvas, scaleMode) => {
  if (canvas.width === 0) {
    canvas.width = 1;
  }
  if (canvas.height === 0) {
    canvas.height = 1;
  }
  return new BaseTexture(canvas, scaleMode);
};

/**
 * TBD.
 * @param {HTMLCanvasElement} canvas - TBD.
 * @param {number} [scaleMode] - TBD.
 * @returns {Texture} TBD.
 */
export const textureFromCanvas = (canvas, scaleMode) => {
  return new Texture(baseTextureFromCanvas(canvas, scaleMode));
};
