import { Point } from './point.js';
import { clone } from './util/matrix.js';
import { GEOM_MATRIX } from '../core/const.js';

export class Matrix {
  /**
   * Creates a new Matrix instance.
   * @param {number} a - The a component of the matrix (default: 1).
   * @param {number} b - The b component of the matrix (default: 0).
   * @param {number} c - The c component of the matrix (default: 0).
   * @param {number} d - The d component of the matrix (default: 1).
   * @param {number} tx - The tx component of the matrix (default: 0).
   * @param {number} ty - The ty component of the matrix (default: 0).
   */
  constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
    /** @type {number} */
    this.a = a;
    /** @type {number} */
    this.b = b;
    /** @type {number} */
    this.c = c;
    /** @type {number} */
    this.d = d;
    /** @type {number} */
    this.tx = tx;
    /** @type {number} */
    this.ty = ty;
    /** @type {number} */
    this.type = GEOM_MATRIX;
  }

  /**
   * Sets the matrix components from an array.
   * @param {number[]} array - The array to read the matrix components from (should have 6 elements).
   * @returns {Matrix} This matrix instance for chaining.
   */
  fromArray(array) {
    return this.setTo(array[0], array[1], array[3], array[4], array[2], array[5]);
  }

  /**
   * Sets the matrix components to new values.
   * @param {number} a - The new a component of the matrix.
   * @param {number} b - The new b component of the matrix.
   * @param {number} c - The new c component of the matrix.
   * @param {number} d - The new d component of the matrix.
   * @param {number} tx - The new tx component of the matrix.
   * @param {number} ty - The new ty component of the matrix.
   * @returns {Matrix} This matrix instance for chaining.
   */
  setTo(a, b, c, d, tx, ty) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = tx;
    this.ty = ty;
    return this;
  }

  /**
   * Creates a clone of this matrix.
   * @returns {Matrix} A new matrix with the same values as this one.
   */
  clone() {
    return clone(this);
  }

  /**
   * Copies the values of this matrix to another matrix.
   * @param {Matrix} matrix - The matrix to copy values to.
   * @returns {Matrix} The destination matrix.
   */
  copyTo(matrix) {
    matrix.copyFrom(this);
    return matrix;
  }

  /**
   * Copies the values from another matrix to this matrix.
   * @param {Matrix} matrix - The matrix to copy values from.
   * @returns {Matrix} This matrix instance for chaining.
   */
  copyFrom(matrix) {
    this.a = matrix.a;
    this.b = matrix.b;
    this.c = matrix.c;
    this.d = matrix.d;
    this.tx = matrix.tx;
    this.ty = matrix.ty;
    return this;
  }

  /**
   * Converts this matrix to a Float32Array.
   * @param {boolean} transpose - Whether to transpose the matrix (default: false).
   * @param {Float32Array} output - The array to store the result in (optional).
   * @returns {Float32Array} A Float32Array containing the matrix elements.
   */
  toArray(transpose = false, output = null) {
    const result = output || new Float32Array(9);
    if (transpose) {
      result[0] = this.a;
      result[1] = this.b;
      result[2] = 0;
      result[3] = this.c;
      result[4] = this.d;
      result[5] = 0;
      result[6] = this.tx;
      result[7] = this.ty;
      result[8] = 1;
    } else {
      result[0] = this.a;
      result[1] = this.c;
      result[2] = this.tx;
      result[3] = this.b;
      result[4] = this.d;
      result[5] = this.ty;
      result[6] = 0;
      result[7] = 0;
      result[8] = 1;
    }
    return result;
  }

  /**
   * Applies this matrix to a point.
   * @param {Point} pos - The point to apply the matrix to.
   * @param {Point} output - The point to store the result in (optional).
   * @returns {Point} The transformed point.
   */
  apply(pos, output = null) {
    const result = output || new Point();
    result.x = this.a * pos.x + this.c * pos.y + this.tx;
    result.y = this.b * pos.x + this.d * pos.y + this.ty;
    return result;
  }

  /**
   * Applies the inverse of this matrix to a point.
   * @param {Point} pos - The point to apply the inverse matrix to.
   * @param {Point} output - The point to store the result in (optional).
   * @returns {Point} The transformed point.
   */
  applyInverse(pos, output = null) {
    const result = output || new Point();
    const id = 1 / (this.a * this.d + this.c * -this.b);
    const x = pos.x;
    const y = pos.y;
    result.x = this.d * id * x + -this.c * id * y + (this.ty * this.c - this.tx * this.d) * id;
    result.y = this.a * id * y + -this.b * id * x + (-this.ty * this.a + this.tx * this.b) * id;
    return result;
  }

  /**
   * Translates this matrix by the specified amounts.
   * @param {number} x - The amount to translate in the x direction.
   * @param {number} y - The amount to translate in the y direction.
   * @returns {Matrix} This matrix instance for chaining.
   */
  translate(x, y) {
    this.tx += x;
    this.ty += y;
    return this;
  }

  /**
   * Scales this matrix by the specified amounts.
   * @param {number} x - The amount to scale in the x direction.
   * @param {number} y - The amount to scale in the y direction.
   * @returns {Matrix} This matrix instance for chaining.
   */
  scale(x, y) {
    this.a *= x;
    this.d *= y;
    this.c *= x;
    this.b *= y;
    this.tx *= x;
    this.ty *= y;
    return this;
  }

  /**
   * Rotates this matrix by the specified angle.
   * @param {number} angle - The angle in radians to rotate by.
   * @returns {Matrix} This matrix instance for chaining.
   */
  rotate(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const a1 = this.a;
    const c1 = this.c;
    const tx1 = this.tx;
    this.a = a1 * cos - this.b * sin;
    this.b = a1 * sin + this.b * cos;
    this.c = c1 * cos - this.d * sin;
    this.d = c1 * sin + this.d * cos;
    this.tx = tx1 * cos - this.ty * sin;
    this.ty = tx1 * sin + this.ty * cos;
    return this;
  }

  /**
   * Appends another matrix to this matrix (multiplying matrices).
   * @param {Matrix} matrix - The matrix to append.
   * @returns {Matrix} This matrix instance for chaining.
   */
  append(matrix) {
    const a1 = this.a;
    const b1 = this.b;
    const c1 = this.c;
    const d1 = this.d;
    this.a = matrix.a * a1 + matrix.b * c1;
    this.b = matrix.a * b1 + matrix.b * d1;
    this.c = matrix.c * a1 + matrix.d * c1;
    this.d = matrix.c * b1 + matrix.d * d1;
    this.tx = matrix.tx * a1 + matrix.ty * c1 + this.tx;
    this.ty = matrix.tx * b1 + matrix.ty * d1 + this.ty;
    return this;
  }

  /**
   * Sets this matrix to an identity matrix (no transformation).
   * @returns {Matrix} This matrix instance for chaining.
   */
  identity() {
    return this.setTo(1, 0, 0, 1, 0, 0);
  }
}
