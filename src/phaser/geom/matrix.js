import { Point } from './point';
import { clone } from './util/matrix';
import { GEOM_MATRIX } from '../core/const';

export class Matrix {
  /**
   * TBD.
   * @param {number} a - TBD.
   * @param {number} b - TBD.
   * @param {number} c - TBD.
   * @param {number} d - TBD.
   * @param {number} tx - TBD.
   * @param {number} ty - TBD.
   */
  constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = tx;
    this.ty = ty;
    this.type = GEOM_MATRIX;
  }

  /**
   * TBD.
   * @param array
   */
  fromArray(array) {
    return this.setTo(array[0], array[1], array[3], array[4], array[2], array[5]);
  }

  /**
   * TBD.
   * @param a
   * @param b
   * @param c
   * @param d
   * @param tx
   * @param ty
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
   * TBD.
   */
  clone() {
    return clone(this);
  }

  /**
   * TBD.
   * @param matrix
   */
  copyTo(matrix) {
    matrix.copyFrom(this);
    return matrix;
  }

  /**
   * TBD.
   * @param matrix
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
   * TBD.
   * @param transpose
   * @param output
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
   * TBD.
   * @param pos
   * @param output
   */
  apply(pos, output = null) {
    const result = output || new Point();
    result.x = this.a * pos.x + this.c * pos.y + this.tx;
    result.y = this.b * pos.x + this.d * pos.y + this.ty;
    return result;
  }

  /**
   * TBD.
   * @param pos
   * @param output
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
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   */
  translate(x, y) {
    this.tx += x;
    this.ty += y;
    return this;
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
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
   * TBD.
   * @param angle
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
   * TBD.
   * @param matrix
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
   * TBD.
   */
  identity() {
    return this.setTo(1, 0, 0, 1, 0, 0);
  }
}
