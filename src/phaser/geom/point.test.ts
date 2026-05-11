import { expect } from 'vitest';
import { Point } from './point.js';

describe('Point', () => {
  it('should create a point with default values', () => {
    const point = new Point();
    expect(point.x).toBe(0);
    expect(point.y).toBe(0);
  });

  it('should create a point with custom x and y values', () => {
    const point = new Point(10, 20);
    expect(point.x).toBe(10);
    expect(point.y).toBe(20);
  });

  it('should copy from another point', () => {
    const point1 = new Point(10, 20);
    const point2 = new Point();
    point2.copyFrom(point1);
    expect(point2.x).toBe(10);
    expect(point2.y).toBe(20);
  });

  it('should invert a point', () => {
    const point = new Point(10, 20);
    const invertedPoint = point.invert();
    expect(invertedPoint.x).toBe(20);
    expect(invertedPoint.y).toBe(10);
  });

  it('should set to x and y values', () => {
    const point = new Point();
    point.setTo(10, 20);
    expect(point.x).toBe(10);
    expect(point.y).toBe(20);
  });

  it('should set to y value as x value', () => {
    const point = new Point();
    point.setTo(10);
    expect(point.x).toBe(10);
    expect(point.y).toBe(10);
  });

  it('should add points', () => {
    const point1 = new Point(10, 20);
    const point2 = new Point(30, 40);
    const sum = point1.add(point2.x, point2.y);
    expect(sum.x).toBe(40);
    expect(sum.y).toBe(60);
  });

  it('should subtract points', () => {
    const point1 = new Point(10, 20);
    const point2 = new Point(30, 40);
    const difference = point1.subtract(point2.x, point2.y);
    expect(difference.x).toBe(-20);
    expect(difference.y).toBe(-20);
  });

  it('should multiply points', () => {
    const point = new Point(10, 20);
    const multipliedPoint = point.multiply(2, 3);
    expect(multipliedPoint.x).toBe(20);
    expect(multipliedPoint.y).toBe(60);
  });

  it('should divide points', () => {
    const point1 = new Point(10, 20);
    const point2 = new Point(2, 3);
    const quotient = point1.divide(2, 3);
    expect(quotient.x).toBe(5);
    expect(quotient.y).toBeCloseTo(6.67);
  });

  it('should clamp x value', () => {
    const point = new Point(-10, 20);
    const clampedPoint = point.clampX(-5, 10);
    expect(clampedPoint.x).toBe(-5);
    expect(clampedPoint.y).toBe(20);
  });

  it('should clamp y value', () => {
    const point = new Point(10, -20);
    const clampedPoint = point.clampY(-5, 10);
    expect(clampedPoint.x).toBe(10);
    expect(clampedPoint.y).toBe(-5);
  });

  it('should clamp x and y values', () => {
    const point = new Point(-10, -20);
    const clampedPoint = point.clamp(-5, 10);
    expect(clampedPoint.x).toBe(-5);
    expect(clampedPoint.y).toBe(-5);
  });

  it('should clone a point', () => {
    const point1 = new Point(10, 20);
    const clonedPoint = point1.clone();
    expect(clonedPoint.x).toBe(10);
    expect(clonedPoint.y).toBe(20);
  });

  it('should copy to another point', () => {
    const point1 = new Point(10, 20);
    const point2 = new Point();
    point1.copyTo(point2);
    expect(point2.x).toBe(10);
    expect(point2.y).toBe(20);
  });

  it('should calculate distance between two points', () => {
    const point1 = new Point(0, 0);
    const point2 = new Point(3, 4);
    const distance = point1.distance(point2);
    expect(distance).toBeCloseTo(5);
  });

  it('should check if two points are equal', () => {
    const point1 = new Point(10, 20);
    const point2 = new Point(10, 20);
    expect(point1.equals(point2)).toBe(true);
  });

  it('should calculate angle between two points', () => {
    const point1 = new Point(0, 0);
    const point2 = new Point(3, 4);
    const angle = point1.angle(point2, true);
    expect(angle).toBeCloseTo(53.13);
  });

  it('should rotate a point around another point', () => {
    const point1 = new Point(10, 20);
    const rotatedPoint = point1.rotate(0, 0, Math.PI / 2, true);
    expect(rotatedPoint.x).toBeCloseTo(9.447);
    expect(rotatedPoint.y).toBeCloseTo(20.266);
  });

  it('should get magnitude of a point', () => {
    const point = new Point(3, 4);
    expect(point.getMagnitude()).toBeCloseTo(5);
  });

  it('should get magnitude squared of a point', () => {
    const point = new Point(3, 4);
    expect(point.getMagnitudeSq()).toBeCloseTo(25);
  });

  it('should set magnitude of a point', () => {
    const point = new Point(3, 4);
    const newPoint = point.setMagnitude(10);
    expect(newPoint.x).toBe(6);
    expect(newPoint.y).toBe(8);
  });

  it('should normalize a point', () => {
    const point = new Point(3, 4);
    const normalizedPoint = point.normalize();
    expect(normalizedPoint.x).toBeCloseTo(0.6);
    expect(normalizedPoint.y).toBeCloseTo(0.8);
  });

  it('should check if a point is zero', () => {
    const point1 = new Point(0, 0);
    const point2 = new Point(10, 20);
    expect(point1.isZero()).toBe(true);
    expect(point2.isZero()).toBe(false);
  });

  it('should calculate dot product of two points', () => {
    const point1 = new Point(1, 1);
    const point2 = new Point(2, 2);
    expect(point1.dot(point2)).toBe(4);
  });

  it('should calculate cross product of two points', () => {
    const point1 = new Point(1, 1);
    const point2 = new Point(1, 2);
    expect(point1.cross(point2)).toBe(1);
  });

  it('should get perpendicular point', () => {
    const point = new Point(10, 20);
    const perpPoint = point.perp();
    expect(perpPoint.x).toBe(-20);
    expect(perpPoint.y).toBe(10);
  });

  it('should get right-hand normal point', () => {
    const point = new Point(10, 20);
    const normalPoint = point.normalRightHand();
    expect(normalPoint.x).toBe(-20);
    expect(normalPoint.y).toBe(10);
  });

  it('should floor a point', () => {
    const point = new Point(3.14, 4.23);
    const flooredPoint = point.floor();
    expect(flooredPoint.x).toBe(3);
    expect(flooredPoint.y).toBe(4);
  });

  it('should ceil a point', () => {
    const point = new Point(3.14, 4.23);
    const ceiledPoint = point.ceil();
    expect(ceiledPoint.x).toBe(4);
    expect(ceiledPoint.y).toBe(5);
  });
});
