import { RoundedRectangle } from '../rounded_rectangle.js';
import { clone } from './rounded_rectangle.js';

it('should clone a rounded rectangle', () => {
  const rectangle1 = new RoundedRectangle(0, 0, 10, 10, 2);
  const rectangle2 = clone(rectangle1);
  expect(rectangle1.x).toBe(rectangle2.x);
  expect(rectangle1.y).toBe(rectangle2.y);
  expect(rectangle1.width).toBe(rectangle2.width);
  expect(rectangle1.height).toBe(rectangle2.height);
  expect(rectangle1.radius).toBe(rectangle2.radius);
});
