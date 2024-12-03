import { Circle } from '../circle.js';
import { clone, contains, equals, intersects } from './circle.js';

it('should clone a circle', () => {
  const circle1 = new Circle(0, 0, 10);
  const circle2 = clone(circle1);
  expect(circle1.x).toBe(circle2.x);
  expect(circle1.y).toBe(circle2.y);
  expect(circle1.radius).toBe(circle2.radius);
});

it('should contain a point in a circle', () => {
  const circle = new Circle(5, 5, 10);
  expect(contains(circle, 5, 5)).toBe(true);
});

it('should match two circles', () => {
  const circle1 = new Circle(5, 5, 10);
  const circle2 = new Circle(5, 5, 10);
  expect(equals(circle1, circle2)).toBe(true);
  circle2.x = 0;
  expect(equals(circle1, circle2)).toBe(false);
});

it('should intersects two circles', () => {
  const circle1 = new Circle(5, 5, 10);
  const circle2 = new Circle(5, 5, 5);
  expect(intersects(circle1, circle2)).toBe(true);
});
