import { describe, expect, it } from 'vitest';
import { Point } from '../point.js';
import { clone } from './point.js';

describe('point utils', (): void => {
  it('should clone a point', (): void => {
    const point1 = new Point(1, 2);
    const point2 = clone(point1);
    expect(point1.x).toBe(point2.x);
    expect(point1.y).toBe(point2.y);
  });
});
