import { BaseTexture } from './base_texture.js';
import { Texture } from './texture.js';

/**
 * Creates a new BaseTexture from a canvas element.
 * @param {HTMLCanvasElement} canvas - The canvas element to use as the texture source.
 * @param {number} [scaleMode] - The scale mode to use for the texture.
 * @returns {BaseTexture} The newly created BaseTexture instance.
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
 * Creates a new Texture from a canvas element.
 * @param {HTMLCanvasElement} canvas - The canvas element to use as the texture source.
 * @param {number} [scaleMode] - The scale mode to use for the texture.
 * @returns {Texture} The newly created Texture instance.
 */
export const textureFromCanvas = (canvas, scaleMode) => {
  return new Texture(baseTextureFromCanvas(canvas, scaleMode));
};
