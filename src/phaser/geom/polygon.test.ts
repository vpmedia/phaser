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

  describe('setTo', () => {
    it('reads a flat list of loose numbers as x/y pairs', () => {
      expect(new Polygon([0, 0, 10, 0, 10, 10]).toNumberArray()).toStrictEqual([0, 0, 10, 0, 10, 10]);
    });

    it('reads a list of x/y tuples', () => {
      expect(
        new Polygon([
          [0, 0],
          [10, 0],
          [10, 10],
        ]).toNumberArray()
      ).toStrictEqual([0, 0, 10, 0, 10, 10]);
    });

    it('reads a list of plain x/y objects', () => {
      expect(new Polygon([{ x: 0, y: 0 }, { x: 10, y: 0 }, new Point(10, 10)]).toNumberArray()).toStrictEqual([
        0, 0, 10, 0, 10, 10,
      ]);
    });

    it('stores every vertex as a point whatever form it came in as', () => {
      expect(new Polygon([0, 0, 10, 0]).points.every((value) => value instanceof Point)).toBe(true);
    });

    it('replaces the previous points', () => {
      const polygon = square();
      polygon.points = [new Point(1, 1), new Point(2, 2)];
      expect(polygon.toNumberArray()).toStrictEqual([1, 1, 2, 2]);
    });

    it('empties the polygon when the points are cleared', () => {
      const polygon = square();
      polygon.points = null;
      expect(polygon.points).toStrictEqual([]);
      expect(polygon.area).toBe(0);
    });
  });

  describe('calculateArea', () => {
    it('measures a square', () => {
      expect(Math.abs(square().area)).toBe(100);
    });

    it('measures a triangle as half its bounding square', () => {
      expect(Math.abs(triangle().area)).toBe(50);
    });
  });

  describe('clone', () => {
    it('copies the vertices into a detached polygon', () => {
      const original = square();
      const copy = original.clone();
      expect(copy.toNumberArray()).toStrictEqual(original.toNumberArray());
      original.points = [new Point(1, 1)];
      expect(copy.toNumberArray()).toStrictEqual([0, 0, 10, 0, 10, 10, 0, 10]);
    });
  });
});
