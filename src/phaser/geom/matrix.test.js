import { Matrix } from './matrix.js';
import { Point } from './point.js';

describe('Constructor', () => {
  it('should set default values when no arguments are passed', () => {
    const matrix = new Matrix();
    expect(matrix.a).toBe(1);
    expect(matrix.b).toBe(0);
    expect(matrix.c).toBe(0);
    expect(matrix.d).toBe(1);
    expect(matrix.tx).toBe(0);
    expect(matrix.ty).toBe(0);
  });

  it('should set values when arguments are passed', () => {
    const matrix = new Matrix(2, 3, 4, 5, 6, 7);
    expect(matrix.a).toBe(2);
    expect(matrix.b).toBe(3);
    expect(matrix.c).toBe(4);
    expect(matrix.d).toBe(5);
    expect(matrix.tx).toBe(6);
    expect(matrix.ty).toBe(7);
  });
});

describe('fromArray', () => {
  it('should set values from an array', () => {
    const matrix = new Matrix();
    const array = [2, 3, 4, 5, 6, 7];
    matrix.fromArray(array);
    expect(matrix.a).toBe(array[0]);
    expect(matrix.b).toBe(array[1]);
    expect(matrix.c).toBe(array[3]);
    expect(matrix.d).toBe(array[4]);
    expect(matrix.tx).toBe(array[2]);
    expect(matrix.ty).toBe(array[5]);
  });
});

describe('setTo', () => {
  it('should set values when arguments are passed', () => {
    const matrix = new Matrix();
    const a = 2;
    const b = 3;
    const c = 4;
    const d = 5;
    const tx = 6;
    const ty = 7;
    matrix.setTo(a, b, c, d, tx, ty);
    expect(matrix.a).toBe(a);
    expect(matrix.b).toBe(b);
    expect(matrix.c).toBe(c);
    expect(matrix.d).toBe(d);
    expect(matrix.tx).toBe(tx);
    expect(matrix.ty).toBe(ty);
  });

  it('should return the matrix instance', () => {
    const matrix = new Matrix();
    const a = 2;
    const b = 3;
    const c = 4;
    const d = 5;
    const tx = 6;
    const ty = 7;
    expect(matrix.setTo(a, b, c, d, tx, ty)).toBe(matrix);
  });
});

describe('clone', () => {
  it('should return a copy of the matrix instance', () => {
    const matrix1 = new Matrix(2, 3, 4, 5, 6, 7);
    const matrix2 = matrix1.clone();
    expect(matrix2.a).toBe(matrix1.a);
    expect(matrix2.b).toBe(matrix1.b);
    expect(matrix2.c).toBe(matrix1.c);
    expect(matrix2.d).toBe(matrix1.d);
    expect(matrix2.tx).toBe(matrix1.tx);
    expect(matrix2.ty).toBe(matrix1.ty);
  });
});

describe('copyTo', () => {
  it('should copy values to another matrix instance', () => {
    const matrix1 = new Matrix(2, 3, 4, 5, 6, 7);
    const matrix2 = new Matrix();
    matrix1.copyTo(matrix2);
    expect(matrix2.a).toBe(matrix1.a);
    expect(matrix2.b).toBe(matrix1.b);
    expect(matrix2.c).toBe(matrix1.c);
    expect(matrix2.d).toBe(matrix1.d);
    expect(matrix2.tx).toBe(matrix1.tx);
    expect(matrix2.ty).toBe(matrix1.ty);
  });
});

describe('copyFrom', () => {
  it('should copy values from another matrix instance', () => {
    const matrix1 = new Matrix(2, 3, 4, 5, 6, 7);
    const matrix2 = new Matrix();
    matrix2.copyFrom(matrix1);
    expect(matrix2.a).toBe(matrix1.a);
    expect(matrix2.b).toBe(matrix1.b);
    expect(matrix2.c).toBe(matrix1.c);
    expect(matrix2.d).toBe(matrix1.d);
    expect(matrix2.tx).toBe(matrix1.tx);
    expect(matrix2.ty).toBe(matrix1.ty);
  });
});

describe('apply', () => {
  it('should apply the matrix to a point', () => {
    const matrix = new Matrix(2, 3, 4, 5, 6, 7);
    const point = new Point(1, 2);
    const result = new Point();
    matrix.apply(point, result);
    expect(result.x).toBe(matrix.a * point.x + matrix.c * point.y + matrix.tx);
    expect(result.y).toBe(matrix.b * point.x + matrix.d * point.y + matrix.ty);

    matrix.setTo(8, 9, 10, 11, 12, 13);
    matrix.apply(point, result);
    expect(result.x).toBe(matrix.a * point.x + matrix.c * point.y + matrix.tx);
    expect(result.y).toBe(matrix.b * point.x + matrix.d * point.y + matrix.ty);
  });
});

describe('applyInverse', () => {
  it('should apply the inverse of the matrix to a point', () => {
    const matrix = new Matrix(2, 3, 4, 5, 6, 7);
    const point = new Point(1, 2);
    const result = new Point();
    matrix.applyInverse(point, result);
    expect(result.x).toBe(2.5);
    expect(result.y).toBe(-2.5);
  });
});

describe('translate', () => {
  it('should add the translation values to the matrix', () => {
    const matrix = new Matrix(2, 3, 4, 5, 6, 7);
    const x = 1;
    const y = 2;
    matrix.translate(x, y);
    expect(matrix.tx).toBe(7);
    expect(matrix.ty).toBe(9);
  });
});

describe('scale', () => {
  it('should multiply the scaling values with the matrix', () => {
    const matrix = new Matrix(2, 3, 4, 5, 6, 7);
    const x = 1;
    const y = 2;
    matrix.scale(x, y);
    expect(matrix.a).toBe(2);
    expect(matrix.b).toBe(6);
    expect(matrix.c).toBe(4);
    expect(matrix.d).toBe(10);
    expect(matrix.tx).toBe(6);
    expect(matrix.ty).toBe(14);
  });
});

describe('rotate', () => {
  it('should multiply the rotation values with the matrix', () => {
    const matrix = new Matrix(2, 3, 4, 5, 6, 7);
    const angle = Math.PI / 2;
    matrix.rotate(angle);
    expect(matrix.a).toBe(-3);
    expect(matrix.c).toBe(-5);
    expect(matrix.tx).toBe(-7);
  });
});

describe('append', () => {
  it('should add the second matrix to the first one', () => {
    const matrix1 = new Matrix(2, 3, 4, 5, 6, 7);
    const matrix2 = new Matrix(8, 9, 10, 11, 12, 13);
    matrix1.append(matrix2);
    expect(matrix1.a).toBe(52);
    expect(matrix1.d).toBe(85);
    expect(matrix1.tx).toBe(82);
  });
});

describe('identity', () => {
  it('should set the values to the identity matrix', () => {
    const matrix = new Matrix();
    matrix.identity();
    expect(matrix.a).toBe(1);
    expect(matrix.c).toBe(0);
    expect(matrix.tx).toBe(0);

    matrix.setTo(2, 3, 4, 5, 6, 7);
    matrix.identity();
    expect(matrix.a).toBe(1);
    expect(matrix.c).toBe(0);
    expect(matrix.tx).toBe(0);
  });
});

describe('toArray', () => {
  it('should return the values as an array', () => {
    const matrix = new Matrix(2, 3, 4, 5, 6, 7);
    const result = matrix.toArray();
    expect(result[0]).toBe(matrix.a);
    expect(result[1]).toBe(matrix.c);
    expect(result[2]).toBe(matrix.tx);
    expect(result[3]).toBe(matrix.b);
    expect(result[4]).toBe(matrix.d);
    expect(result[5]).toBe(matrix.ty);

    matrix.setTo(8, 9, 10, 11, 12, 13);
    const result2 = matrix.toArray();
    expect(result2[0]).toBe(matrix.a);
    expect(result2[1]).toBe(matrix.c);
    expect(result2[2]).toBe(matrix.tx);
    expect(result2[3]).toBe(matrix.b);
    expect(result2[4]).toBe(matrix.d);
    expect(result2[5]).toBe(matrix.ty);
  });

  it('should return the values as an array with transposed coordinates', () => {
    const matrix = new Matrix(2, 3, 4, 5, 6, 7);
    const result = matrix.toArray(true);
    expect(result[0]).toBe(matrix.a);
    expect(result[1]).toBe(matrix.b);
    expect(result[2]).toBe(0);
    expect(result[3]).toBe(matrix.c);
    expect(result[4]).toBe(matrix.d);
    expect(result[5]).toBe(0);

    matrix.setTo(8, 9, 10, 11, 12, 13);
    const result2 = matrix.toArray(true);
    expect(result2[0]).toBe(matrix.a);
    expect(result2[1]).toBe(matrix.b);
    expect(result2[2]).toBe(0);
    expect(result2[3]).toBe(matrix.c);
    expect(result2[4]).toBe(matrix.d);
    expect(result2[5]).toBe(0);
  });
});
