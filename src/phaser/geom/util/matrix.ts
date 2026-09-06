import { Matrix } from '../matrix.js';
import { getRegistry } from '../../core/registry.js';

/**
 * Clones a matrix.
 * @param {Matrix} input - The matrix to clone.
 * @param {Matrix} output - Optional matrix to store the result in.
 * @returns {Matrix} The cloned matrix.
 */
export const clone = (input: Matrix, output: Matrix | null = null) => {
  const result = output ?? new Matrix();
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
  getRegistry();
  globalThis.PhaserRegistry.IDENTITY_MATRIX ??= new Matrix();
  return globalThis.PhaserRegistry.IDENTITY_MATRIX;
};

/**
 * Creates a new matrix with the specified values.
 * @returns {Matrix} A new matrix.
 */
export const getTempMatrix = () => {
  getRegistry();
  globalThis.PhaserRegistry.TEMP_MATRIX ??= new Matrix();
  return globalThis.PhaserRegistry.TEMP_MATRIX;
};
