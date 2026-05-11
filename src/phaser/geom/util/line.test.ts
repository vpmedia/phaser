import { expect } from 'vitest';
import { Line } from '../line.js';
import { clone } from './line.js';

it('should clone a line', () => {
  const line1 = new Line(0, 0, 10, 0);
  const line2 = clone(line1);
  expect(line1.start.x).toBe(line2.start.x);
  expect(line1.start.y).toBe(line2.start.y);
  expect(line1.end.x).toBe(line2.end.x);
  expect(line1.end.y).toBe(line2.end.y);
});
