import { expect } from 'vitest';
import { Rectangle } from '../rectangle.js';
import { clone } from './rectangle.js';

it('should clone a rectangle', () => {
  const rectangle1 = new Rectangle(0, 0, 10, 10);
  const rectangle2 = clone(rectangle1);
  expect(rectangle1.x).toBe(rectangle2.x);
  expect(rectangle1.y).toBe(rectangle2.y);
  expect(rectangle1.width).toBe(rectangle2.width);
  expect(rectangle1.height).toBe(rectangle2.height);
});
