import { expect } from 'vitest';
import { Ellipse } from '../ellipse.js';
import { contains } from './ellipse.js';

it('should contain an ellipse the given coordinates', () => {
  const ellipse = new Ellipse(0, 0, 10, 10);
  expect(contains(ellipse, 5, 5)).toBe(true);
  expect(contains(ellipse, 15, 15)).toBe(false);
});
