import { degToRad } from '../util/math.js';
import { Line } from './line.js';

describe('Line', () => {
  it('should create a new line instance with correct coordinates', () => {
    const line = new Line(0, 0, 10, 10);
    expect(line.start.x).toBe(0);
    expect(line.start.y).toBe(0);
    expect(line.end.x).toBe(10);
    expect(line.end.y).toBe(10);
  });

  it('should set the start and end points of the line correctly', () => {
    const line = new Line(0, 0, 10, 10);
    line.setTo(5, 5, 15, 15);
    expect(line.start.x).toBe(5);
    expect(line.start.y).toBe(5);
    expect(line.end.x).toBe(15);
    expect(line.end.y).toBe(15);
  });

  it('should create a new line instance from two sprites correctly', () => {
    const line = new Line(0, 0, 10, 10);
    const sprite1 = { x: 0, y: 0 };
    const sprite2 = { x: 10, y: 10 };
    const result = line.fromSprite(sprite1, sprite2);
    expect(result.start.x).toBe(0);
    expect(result.start.y).toBe(0);
    expect(result.end.x).toBe(10);
    expect(result.end.y).toBe(10);
  });

  it('should create a new line instance from an angle and length correctly', () => {
    const line = new Line(0, 10, 10, 10);
    const result = line.fromAngle(0, 0, degToRad(45), 10);
    expect(result.start.x).toBe(0);
    expect(result.start.y).toBe(0);
    expect(result.end.x).toBeCloseTo(7.07);
    expect(result.end.y).toBeCloseTo(7.07);
  });

  it('should rotate the line correctly', () => {
    const line = new Line(0, 0, 10, 0);
    const result = line.rotate(90, true);
    expect(result.start.x).toBe(5);
    expect(result.start.y).toBe(-5);
    expect(result.end.x).toBe(5);
    expect(result.end.y).toBe(5);
  });

  it('should rotate the line around a point correctly', () => {
    const line = new Line(0, 0, 10, 10);
    const result = line.rotateAround(5, 5, 90, true);
    expect(result.start.x).toBe(10);
    expect(result.start.y).toBe(0);
    expect(result.end.x).toBe(0);
    expect(result.end.y).toBe(10);
  });

  it('should intersect the line with another line correctly', () => {
    const line = new Line(0, 0, 10, 10);
    const line2 = new Line(5, 5, 15, 15);
    const result = line.intersects(line2, true, null);
    expect(result).toBe(null);
  });

  it('should reflect the line across another line correctly', () => {
    const line = new Line(0, 0, 10, 10);
    const line2 = new Line(5, 5, 15, 15);
    const result = line.reflect(line2);
    expect(result).toBeCloseTo(-5.497);
  });

  it('should get the midpoint of the line correctly', () => {
    const line = new Line(0, 0, 10, 10);
    const result = line.midPoint(null);
    expect(result.x).toBe(5);
    expect(result.y).toBe(5);
  });

  it('should center the line on a point correctly', () => {
    const line = new Line(0, 0, 10, 10);
    const result = line.centerOn(10, 10);
    expect(line.start.x).toBe(10 - (line.end.x - line.start.x) / 2);
    expect(line.start.y).toBe(10 - (line.end.y - line.start.y) / 2);
  });

  it('should check if a point is on the line correctly', () => {
    const line = new Line(0, 0, 10, 10);
    expect(line.pointOnLine(5, 0)).toBe(false);
    expect(line.pointOnLine(-5, 0)).toBe(false);
  });

  it('should check if a point is on the segment of the line correctly', () => {
    const line = new Line(0, 0, 10, 10);
    expect(line.pointOnSegment(5, -10)).toBe(false);
    expect(line.pointOnSegment(15, 15)).toBe(false);
  });

  it('should get the random point on the line correctly', () => {
    const line = new Line(0, 0, 10, 10);
    const result = line.random(null);
    expect(result.x > 0).toBe(true);
    expect(result.y > 0).toBe(true);
  });

  it('should get the coordinates on the line correctly', () => {
    const line = new Line(0, 0, 10, 10);
    const result = line.coordinatesOnLine(1, []);
    expect(result.length).toBeGreaterThan(0);
  });
});
