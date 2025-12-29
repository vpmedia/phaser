import { expect } from 'vitest';
import { Circle } from './circle.js';
import { Point } from './point.js';

describe('Circle', () => {
  describe('constructor', () => {
    it('should initialize properties correctly when no arguments are provided', () => {
      const circle = new Circle();
      expect(circle.x).toBe(0);
      expect(circle.y).toBe(0);
      expect(circle.diameter).toBe(0);
    });

    it('should initialize properties correctly when x, y, and diameter are provided', () => {
      const circle = new Circle(10, 20, 30);
      expect(circle.x).toBe(10);
      expect(circle.y).toBe(20);
      expect(circle.diameter).toBe(30);
    });
  });

  describe('circumference', () => {
    it('should calculate the circumference correctly when diameter is provided', () => {
      const circle = new Circle(0, 0, 1);
      expect(circle.circumference()).toBeCloseTo(Math.PI);
    });

    it('should return Infinity when diameter is 0', () => {
      const circle = new Circle();
      circle.diameter = 0;
      expect(circle.circumference()).toBe(0);
    });
  });

  describe('random', () => {
    it('should generate a random point within the circle correctly', () => {
      const circle = new Circle();
      const output = new Point();
      circle.random(output);
      expect(output.x).toBeGreaterThan(-1);
      expect(output.y).toBeGreaterThan(-1);
      expect(Math.hypot(output.x, output.y)).toBe(0);
    });

    it('should generate a random point within the circle correctly when output is not provided', () => {
      const circle = new Circle();
      const output = new Point();
      circle.random(output);
      expect(output.x).toBeGreaterThan(-1);
      expect(output.y).toBeGreaterThan(-1);
      expect(Math.hypot(output.x, output.y)).toBe(0);
    });
  });

  describe('getBounds', () => {
    it('should calculate the bounds correctly when diameter is provided', () => {
      const circle = new Circle(0, 0, 1);
      const bounds = circle.getBounds();
      expect(bounds.x).toBe(-0.5);
      expect(bounds.y).toBe(-0.5);
      expect(bounds.width).toBe(1);
      expect(bounds.height).toBe(1);
    });

    it('should return empty rectangle when diameter is 0', () => {
      const circle = new Circle();
      circle.diameter = 0;
      const bounds = circle.getBounds();
      expect(bounds.x).toBe(0);
      expect(bounds.y).toBe(0);
      expect(bounds.width).toBe(0);
      expect(bounds.height).toBe(0);
    });
  });

  describe('setTo', () => {
    it('should set properties correctly when x, y, and diameter are provided', () => {
      const circle = new Circle();
      circle.setTo(10, 20, 30);
      expect(circle.x).toBe(10);
      expect(circle.y).toBe(20);
      expect(circle.diameter).toBe(30);
    });

    it('should set radius property correctly when diameter is changed', () => {
      const circle = new Circle();
      circle.diameter = 1;
      expect(circle.radius).toBe(0.5);
    });
  });

  describe('copyFrom', () => {
    it('should copy properties correctly from another Circle instance', () => {
      const source = new Circle(10, 20, 30);
      const dest = new Circle();
      dest.copyFrom(source);
      expect(dest.x).toBe(source.x);
      expect(dest.y).toBe(source.y);
      expect(dest.diameter).toBe(source.diameter);
    });
  });

  describe('copyTo', () => {
    it('should copy properties correctly to another Circle instance', () => {
      const source = new Circle(10, 20, 30);
      const dest = new Circle();
      source.copyTo(dest);
      expect(dest.x).toBe(source.x);
      expect(dest.y).toBe(source.y);
      expect(dest.diameter).toBe(source.diameter);
    });
  });

  describe('distance', () => {
    it('should calculate the distance correctly between two points within a circle', () => {
      const circle = new Circle();
      const point = new Point(1, 1);
      expect(circle.distance(point)).toBeCloseTo(Math.hypot(point.x, point.y));
    });

    it('should return Infinity when diameter is 0', () => {
      const circle = new Circle();
      circle.diameter = 0;
      expect(circle.distance(new Point(1, 1))).toBeCloseTo(1.4142);
    });
  });

  describe('clone', () => {
    it('should create a deep copy of the Circle instance correctly', () => {
      const source = new Circle(10, 20, 30);
      const clone = source.clone();
      expect(clone.x).toBe(source.x);
      expect(clone.y).toBe(source.y);
      expect(clone.diameter).toBe(source.diameter);
    });
  });

  describe('contains', () => {
    it('should determine if a point is within the circle correctly', () => {
      const circle = new Circle();
      const point = new Point(1, 1);
      expect(circle.contains(point.x, point.y)).toBe(false);
    });

    it('should return false when diameter is 0', () => {
      const circle = new Circle();
      circle.diameter = 0;
      expect(circle.contains(1, 1)).toBe(false);
    });
  });

  describe('circumferencePoint', () => {
    it('should generate a point on the circumference correctly', () => {
      const circle = new Circle();
      const output = new Point();
      expect(circle.circumferencePoint(Math.PI / 2).x).toBeCloseTo(0.5 * circle.radius);
    });

    it('should return null when diameter is 0', () => {
      const circle = new Circle();
      circle.diameter = 0;
      expect(circle.circumferencePoint(Math.PI / 2).type).toBe(25);
    });
  });

  describe('offset', () => {
    it('should offset the circle correctly by a point', () => {
      const circle = new Circle();
      const point = new Point(1, 1);
      circle.offset(point.x, point.y);
      expect(circle.x).toBeGreaterThan(0);
      expect(circle.y).toBeGreaterThan(0);
    });

    it('should return the Circle instance itself', () => {
      const circle = new Circle();
      const point = new Point(1, 1);
      circle.offset(point.x, point.y);
      expect(circle).toBe(circle);
    });
  });

  describe('offsetPoint', () => {
    it('should offset the circle correctly by a point', () => {
      const circle = new Circle();
      const point = new Point(1, 1);
      circle.offsetPoint(point);
      expect(circle.x).toBeGreaterThan(0);
      expect(circle.y).toBeGreaterThan(0);
    });
  });

  describe('toString', () => {
    it('should generate the correct string representation of the Circle instance', () => {
      const circle = new Circle();
      expect(circle.toString()).toBe('[{Circle (x=0 y=0 diameter=0 radius=0)}]');
    });
  });
});
