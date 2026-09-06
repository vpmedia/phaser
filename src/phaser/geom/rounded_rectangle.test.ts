import { expect, describe, it } from 'vitest';
import { RoundedRectangle } from './rounded_rectangle.js';

describe('RoundedRectangle Constructor', (): void => {
  it('should create a new instance with correct properties', (): void => {
    const rectangle = new RoundedRectangle(10, 20, 30, 40, 5);
    expect(rectangle.x).toBe(10);
    expect(rectangle.y).toBe(20);
    expect(rectangle.width).toBe(30);
    expect(rectangle.height).toBe(40);
    expect(rectangle.radius).toBe(5);
  });
});

describe('RoundedRectangle contains Method', (): void => {
  it('should return false for zero width or height', (): void => {
    const rectangle = new RoundedRectangle(10, 20, 0, 40, 5);
    expect(rectangle.contains(15, 25)).toBe(false);

    const rectangle2 = new RoundedRectangle(10, 20, 30, 0, 5);
    expect(rectangle2.contains(15, 25)).toBe(false);
  });

  it('should return true for a point inside the rectangle', (): void => {
    const rectangle = new RoundedRectangle(10, 20, 30, 40, 5);
    expect(rectangle.contains(15, 25)).toBe(true);
  });

  it("should return true for a point on the rectangle's edge", (): void => {
    const rectangle = new RoundedRectangle(10, 20, 30, 40, 5);
    expect(rectangle.contains(0, 25)).toBe(false);
    expect(rectangle.contains(30, 25)).toBe(true);
    expect(rectangle.contains(15, 0)).toBe(false);
    expect(rectangle.contains(15, 40)).toBe(true);
  });

  it('should return false for a point outside the rectangle', (): void => {
    const rectangle = new RoundedRectangle(10, 20, 30, 40, 5);
    expect(rectangle.contains(-1, -1)).toBe(false);
    expect(rectangle.contains(50, 60)).toBe(false);
  });
});

describe('RoundedRectangle clone Method', (): void => {
  it('should create a deep copy of the original rectangle', (): void => {
    const original = new RoundedRectangle(10, 20, 30, 40, 5);
    const clone = original.clone();
    expect(clone.x).toBe(original.x);
    expect(clone.y).toBe(original.y);
    expect(clone.width).toBe(original.width);
    expect(clone.height).toBe(original.height);
    expect(clone.radius).toBe(original.radius);

    // Change one property to verify the clone is independent
    original.x += 1;
    expect(original.x).not.toBe(clone.x);
  });
});
