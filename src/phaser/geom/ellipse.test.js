import { Ellipse } from './ellipse.js';

it('should create an ellipse with default values', () => {
  const ellipse = new Ellipse();
  expect(ellipse.x).toBe(0);
  expect(ellipse.y).toBe(0);
  expect(ellipse.width).toBe(0);
  expect(ellipse.height).toBe(0);
});

it('should create an ellipse with custom x, y, width, height', () => {
  const ellipse = new Ellipse(10, 20, 30, 40);
  expect(ellipse.x).toBe(10);
  expect(ellipse.y).toBe(20);
  expect(ellipse.width).toBe(30);
  expect(ellipse.height).toBe(40);
});

it('should set the ellipse values to new x, y, width, height', () => {
  const ellipse = new Ellipse();
  ellipse.setTo(10, 20, 30, 40);
  expect(ellipse.x).toBe(10);
  expect(ellipse.y).toBe(20);
  expect(ellipse.width).toBe(30);
  expect(ellipse.height).toBe(40);
});

it('should return the ellipse instance', () => {
  const ellipse = new Ellipse();
  const result = ellipse.setTo(10, 20, 30, 40);
  expect(result).toBe(ellipse);
});

it('should create a rectangle with correct bounds', () => {
  const ellipse = new Ellipse(10, 20, 30, 40);
  const bounds = ellipse.getBounds();
  expect(bounds.x).toBe(10 - 30);
  expect(bounds.y).toBe(20 - 40);
  expect(bounds.width).toBe(30);
  expect(bounds.height).toBe(40);
});

it('should copy the values from another ellipse', () => {
  const source = new Ellipse(10, 20, 30, 40);
  const target = new Ellipse();
  target.copyFrom(source);
  expect(target.x).toBe(source.x);
  expect(target.y).toBe(source.y);
  expect(target.width).toBe(source.width);
  expect(target.height).toBe(source.height);
});

it('should copy the values to another ellipse', () => {
  const source = new Ellipse(10, 20, 30, 40);
  const target = new Ellipse();
  source.copyTo(target);
  expect(target.x).toBe(source.x);
  expect(target.y).toBe(source.y);
  expect(target.width).toBe(source.width);
  expect(target.height).toBe(source.height);
});

it('should return true if point is inside the ellipse', () => {
  const ellipse = new Ellipse(10, 20, 30, 40);
  expect(ellipse.contains(20, 30)).toBe(true);
});

it('should return false if point is outside the ellipse', () => {
  const ellipse = new Ellipse(10, 20, 30, 40);
  expect(ellipse.contains(-5, -10)).toBe(false);
});

it('should generate a random point within the ellipse', () => {
  const ellipse = new Ellipse(10, 20, 30, 40);
  const point = ellipse.random();
  expect(typeof point.x).toBe('number');
  expect(typeof point.y).toBe('number');
});

it('should return a string representation of the ellipse', () => {
  const ellipse = new Ellipse(10, 20, 30, 40);
  expect(ellipse.toString()).toBe('[{Ellipse (x=10 y=20 width=30 height=40)}]');
});
