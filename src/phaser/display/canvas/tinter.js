import { CanvasBuffer } from './buffer.js';
import { create, removeByCanvas } from './pool.js';
import { hex2rgb } from '../../util/math.js';

/**
 * TBD.
 * @param {object} sprite - TBD.
 * @param {object} color - TBD.
 * @returns {object} TBD.
 */
export function getTintedTexture(sprite, color) {
  const canvas = sprite.tintedTexture || create('CanvasTinter');
  window.PhaserRegistry.CANVAS_TINT_METHOD(sprite.texture, color, canvas);
  return canvas;
}

/**
 * TBD.
 * @param {object} texture - TBD.
 * @param {object} color - TBD.
 * @param {HTMLCanvasElement} canvas - TBD.
 */
export function tintWithMultiply(texture, color, canvas) {
  const context = canvas.getContext('2d');
  const crop = texture.crop;
  if (canvas.width !== crop.width || canvas.height !== crop.height) {
    canvas.width = crop.width;
    canvas.height = crop.height;
  }
  context.clearRect(0, 0, crop.width, crop.height);
  context.fillStyle = '#' + ('00000' + (color | 0).toString(16)).substr(-6);
  context.fillRect(0, 0, crop.width, crop.height);
  context.globalCompositeOperation = 'multiply';
  context.drawImage(texture.baseTexture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
  context.globalCompositeOperation = 'destination-atop';
  context.drawImage(texture.baseTexture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
}

/**
 * TBD.
 * @param {object} texture - TBD.
 * @param {object} color - TBD.
 * @param {HTMLCanvasElement} canvas - TBD.
 */
export function tintWithPerPixel(texture, color, canvas) {
  const context = canvas.getContext('2d');
  const crop = texture.crop;
  canvas.width = crop.width;
  canvas.height = crop.height;
  context.globalCompositeOperation = 'copy';
  context.drawImage(texture.baseTexture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
  const rgbValues = hex2rgb(color);
  const r = rgbValues[0];
  const g = rgbValues[1];
  const b = rgbValues[2];
  const pixelData = context.getImageData(0, 0, crop.width, crop.height);
  const pixels = pixelData.data;
  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i + 0] *= r;
    pixels[i + 1] *= g;
    pixels[i + 2] *= b;
    const canHandleAlpha = window.PhaserRegistry.CAN_CANVAS_HANDLE_ALPHA;
    if (!canHandleAlpha) {
      const alpha = pixels[i + 3];
      pixels[i + 0] /= 255 / alpha;
      pixels[i + 1] /= 255 / alpha;
      pixels[i + 2] /= 255 / alpha;
    }
  }
  context.putImageData(pixelData, 0, 0);
}

/**
 * TBD.
 * @returns {boolean} TBD.
 */
export function checkInverseAlpha() {
  const canvas = new CanvasBuffer(2, 1);
  canvas.context.fillStyle = 'rgba(10, 20, 30, 0.5)';
  //  Draw a single pixel
  canvas.context.fillRect(0, 0, 1, 1);
  //  Get the color values
  const s1 = canvas.context.getImageData(0, 0, 1, 1);
  if (s1 === null) {
    return false;
  }
  //  Plot them to x2
  canvas.context.putImageData(s1, 1, 0);
  //  Get those values
  const s2 = canvas.context.getImageData(1, 0, 1, 1);
  //  Compare and return
  return (
    s2.data[0] === s1.data[0] && s2.data[1] === s1.data[1] && s2.data[2] === s1.data[2] && s2.data[3] === s1.data[3]
  );
}

/**
 * TBD.
 * @returns {boolean} TBD.
 */
export function canUseNewCanvasBlendModes() {
  if (document === undefined) {
    return false;
  }
  const pngHead = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABAQMAAADD8p2OAAAAA1BMVEX/';
  const pngEnd = 'AAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';
  const magenta = new Image();
  magenta.src = pngHead + 'AP804Oa6' + pngEnd;
  const yellow = new Image();
  yellow.src = pngHead + '/wCKxvRF' + pngEnd;
  const canvas = create('CanvasTinter', 6, 1);
  const context = canvas.getContext('2d');
  context.globalCompositeOperation = 'multiply';
  context.drawImage(magenta, 0, 0);
  context.drawImage(yellow, 2, 0);
  if (!context.getImageData(2, 0, 1, 1)) {
    return false;
  }
  const data = context.getImageData(2, 0, 1, 1).data;
  removeByCanvas(canvas);
  return data[0] === 255 && data[1] === 0 && data[2] === 0;
}

/**
 * TBD.
 */
export function detectCapabilities() {
  if (!window.PhaserRegistry) {
    window.PhaserRegistry = {};
  }
  if (!window.PhaserRegistry.CAN_CANVAS_HANDLE_ALPHA) {
    window.PhaserRegistry.CAN_CANVAS_HANDLE_ALPHA = checkInverseAlpha();
  }
  if (!window.PhaserRegistry.CAN_CANVAS_USE_MULTIPLY) {
    window.PhaserRegistry.CAN_CANVAS_USE_MULTIPLY = canUseNewCanvasBlendModes();
  }
  if (!window.PhaserRegistry.CANVAS_TINT_METHOD) {
    window.PhaserRegistry.CANVAS_TINT_METHOD = window.PhaserRegistry.CAN_CANVAS_USE_MULTIPLY
      ? tintWithMultiply
      : tintWithPerPixel;
  }
}
