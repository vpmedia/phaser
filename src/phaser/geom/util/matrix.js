import { Matrix } from '../matrix.js';

/**
 * Clones a matrix.
 * @param {Matrix} input - The matrix to clone.
 * @param {Matrix} output - Optional matrix to store the result in.
 * @returns {Matrix} The cloned matrix.
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
 * Creates a new identity matrix.
 * @returns {Matrix} A new identity matrix.
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
 * Creates a new matrix with the specified values.
 * @returns {Matrix} A new matrix.
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
