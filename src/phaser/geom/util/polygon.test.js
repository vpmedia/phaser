import { Polygon } from '../polygon.js';
import { clone } from './polygon.js';

it('should clone a polygon', () => {
  const polygon = new Polygon([0, 0, 1, 0, 1, 1]);
  const points = clone(polygon).toNumberArray();
  expect(points[0]).toBe(0);
  expect(points[1]).toBe(0);
  expect(points[2]).toBe(1);
  expect(points[3]).toBe(0);
  expect(points[4]).toBe(1);
  expect(points[5]).toBe(1);
});
