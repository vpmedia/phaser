import { Matrix } from '../matrix.js';
import { clone, getIdentityMatrix, getTempMatrix } from './matrix.js';

it('should clone a matrix', () => {
  const matrix1 = new Matrix(2, 0, 0, 2, 0, 0);
  const matrix2 = clone(matrix1);
  expect(matrix1.a).toBe(matrix2.a);
  expect(matrix1.b).toBe(matrix2.b);
  expect(matrix1.c).toBe(matrix2.c);
  expect(matrix1.d).toBe(matrix2.d);
  expect(matrix1.tx).toBe(matrix2.tx);
  expect(matrix1.ty).toBe(matrix2.ty);
});

it('should create an identity matrix', () => {
  const matrix = getIdentityMatrix();
  expect(matrix.a).toBe(1);
});

it('should create a temporary matrix', () => {
  const matrix = getTempMatrix();
  expect(matrix.a).toBe(1);
});
