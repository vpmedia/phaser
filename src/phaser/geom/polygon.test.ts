import { describe, expect, it } from 'vitest';
import { Point } from './point.js';
import { Polygon } from './polygon.js';

const square = (): Polygon => new Polygon([new Point(0, 0), new Point(10, 0), new Point(10, 10), new Point(0, 10)]);

const triangle = (): Polygon => new Polygon([new Point(0, 0), new Point(10, 0), new Point(0, 10)]);

describe('Polygon', () => {
  describe('contains', () => {
    it('accepts a point well inside a square', () => {
      expect(square().contains(5, 5)).toBe(true);
    });

    it('rejects points outside a square on every side', () => {
      const polygon = square();
      expect(polygon.contains(-1, 5)).toBe(false);
      expect(polygon.contains(11, 5)).toBe(false);
      expect(polygon.contains(5, -1)).toBe(false);
      expect(polygon.contains(5, 11)).toBe(false);
    });

    it('accepts a point inside a triangle and rejects one in the cut corner', () => {
      const polygon = triangle();
      expect(polygon.contains(2, 2)).toBe(true);
      expect(polygon.contains(8, 8)).toBe(false);
    });

    it('agrees with itself once flattened', () => {
      const probes: [number, number][] = [
        [5, 5],
        [-1, 5],
        [11, 5],
        [2, 2],
        [9, 9],
        [0.5, 9.5],
      ];
      const asPoints = square();
      const asNumbers = square().flatten();
      for (const [x, y] of probes) {
        expect(asNumbers.contains(x, y)).toBe(asPoints.contains(x, y));
      }
    });

    it('agrees with itself once flattened for a triangle', () => {
      const probes: [number, number][] = [
        [2, 2],
        [8, 8],
        [1, 8],
        [9, 0.5],
        [-5, -5],
      ];
      const asPoints = triangle();
      const asNumbers = triangle().flatten();
      for (const [x, y] of probes) {
        expect(asNumbers.contains(x, y)).toBe(asPoints.contains(x, y));
      }
    });

    it('reports false for a polygon with no points', () => {
      expect(new Polygon().contains(0, 0)).toBe(false);
    });
  });

  describe('toNumberArray', () => {
    it('flattens points to x/y pairs', () => {
      expect(square().toNumberArray()).toStrictEqual([0, 0, 10, 0, 10, 10, 0, 10]);
    });

    it('passes an already flattened polygon through unchanged', () => {
      expect(square().flatten().toNumberArray()).toStrictEqual([0, 0, 10, 0, 10, 10, 0, 10]);
    });
  });

  describe('flatten', () => {
    it('marks the polygon flattened and swaps the point representation', () => {
      const polygon = square().flatten();
      expect(polygon.flattened).toBe(true);
      expect(polygon._points.every((value) => typeof value === 'number')).toBe(true);
    });
  });
});
