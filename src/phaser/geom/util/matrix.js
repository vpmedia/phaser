import { Matrix } from '../matrix.js';

/**
 * TBD.
 * @param {Matrix} input - TBD.
 * @param {Matrix} output - TBD.
 * @returns {Matrix} TBD.
 */
export const clone = (input, output = null) => {
  const result = output || new Matrix();
  result.a = input.a;
  result.b = input.b;
  result.c = input.c;
  result.d = input.d;
  result.tx = input.tx;
  result.ty = input.ty;
  return result;
};

/**
 * TBD.
 * @returns {Matrix} TBD.
 */
export const getIdentityMatrix = () => {
  if (!window.PhaserRegistry) {
    window.PhaserRegistry = {};
  }
  if (!window.PhaserRegistry.IDENTITY_MATRIX) {
    window.PhaserRegistry.IDENTITY_MATRIX = new Matrix();
  }
  return window.PhaserRegistry.IDENTITY_MATRIX;
};

/**
 * TBD.
 * @returns {Matrix} TBD.
 */
export const getTempMatrix = () => {
  if (!window.PhaserRegistry) {
    window.PhaserRegistry = {};
  }
  if (!window.PhaserRegistry.TEMP_MATRIX) {
    window.PhaserRegistry.TEMP_MATRIX = new Matrix();
  }
  return window.PhaserRegistry.TEMP_MATRIX;
};
