import { describe, expect, it } from 'vitest';
import { triangulate } from './earcut.js';

/** Signed area of the polygon a triangulation covers, used to check it tiles the input. */
const triangleArea = (data: number[], a: number, b: number, c: number): number => {
  const ax = data[a * 2]!;
  const ay = data[a * 2 + 1]!;
  const bx = data[b * 2]!;
  const by = data[b * 2 + 1]!;
  const cx = data[c * 2]!;
  const cy = data[c * 2 + 1]!;
  return Math.abs((ax * (by - cy) + bx * (cy - ay) + cx * (ay - by)) / 2);
};

const coveredArea = (data: number[], triangles: number[]): number => {
  let total = 0;
  for (let i = 0; i < triangles.length; i += 3) {
    total += triangleArea(data, triangles[i]!, triangles[i + 1]!, triangles[i + 2]!);
  }
  return total;
};

const SQUARE = [0, 0, 10, 0, 10, 10, 0, 10];
const TRIANGLE = [0, 0, 10, 0, 0, 10];
const L_SHAPE = [0, 0, 20, 0, 20, 10, 10, 10, 10, 20, 0, 20];
const CONCAVE = [0, 0, 20, 0, 20, 20, 10, 10, 0, 20];
const SQUARE_WITH_HOLE = [
  // outer ring
  0, 0, 30, 0, 30, 30, 0, 30,
  // hole
  10, 10, 20, 10, 20, 20, 10, 20,
];

describe('earcut triangulate', (): void => {
  describe('simple polygons', (): void => {
    it('cuts a square into two triangles', (): void => {
      const triangles = triangulate(SQUARE, null, 2);
      expect(triangles).toHaveLength(6);
      expect(coveredArea(SQUARE, triangles)).toBeCloseTo(100, 6);
    });

    it('leaves a triangle as one triangle', (): void => {
      const triangles = triangulate(TRIANGLE, null, 2);
      expect(triangles).toHaveLength(3);
      expect(coveredArea(TRIANGLE, triangles)).toBeCloseTo(50, 6);
    });

    it('covers an L shape exactly', (): void => {
      const triangles = triangulate(L_SHAPE, null, 2);
      expect(triangles).toHaveLength(12);
      expect(coveredArea(L_SHAPE, triangles)).toBeCloseTo(300, 6);
    });

    it('covers a concave polygon exactly', (): void => {
      const triangles = triangulate(CONCAVE, null, 2);
      expect(coveredArea(CONCAVE, triangles)).toBeCloseTo(300, 6);
    });

    it('emits indices in range and in whole triangles', (): void => {
      const triangles = triangulate(L_SHAPE, null, 2);
      expect(triangles.length % 3).toBe(0);
      for (const index of triangles) {
        expect(index).toBeGreaterThanOrEqual(0);
        expect(index).toBeLessThan(L_SHAPE.length / 2);
      }
    });
  });

  describe('polygons with holes', (): void => {
    it('covers the outer ring minus the hole', (): void => {
      const triangles = triangulate(SQUARE_WITH_HOLE, [4], 2);
      expect(coveredArea(SQUARE_WITH_HOLE, triangles)).toBeCloseTo(900 - 100, 6);
    });

    it('emits whole triangles', (): void => {
      const triangles = triangulate(SQUARE_WITH_HOLE, [4], 2);
      expect(triangles.length % 3).toBe(0);
      expect(triangles.length).toBeGreaterThan(0);
    });
  });

  describe('winding order', (): void => {
    it('gives the same coverage whichever way the ring is wound', (): void => {
      const clockwise = [0, 0, 0, 10, 10, 10, 10, 0];
      const counter = [0, 0, 10, 0, 10, 10, 0, 10];
      expect(coveredArea(clockwise, triangulate(clockwise, null, 2))).toBeCloseTo(
        coveredArea(counter, triangulate(counter, null, 2)),
        6
      );
    });
  });

  describe('degenerate input', (): void => {
    it('returns nothing for an empty ring', (): void => {
      expect(triangulate([], null, 2)).toStrictEqual([]);
    });

    it('returns nothing for a single point', (): void => {
      expect(triangulate([1, 1], null, 2)).toStrictEqual([]);
    });

    it('returns nothing for a two point ring', (): void => {
      expect(triangulate([0, 0, 10, 10], null, 2)).toStrictEqual([]);
    });

    it('returns nothing for a zero area ring', (): void => {
      expect(triangulate([0, 0, 10, 10, 20, 20], null, 2)).toStrictEqual([]);
    });

    it('drops duplicated consecutive points', (): void => {
      const withDuplicate = [0, 0, 0, 0, 10, 0, 10, 10, 0, 10];
      expect(coveredArea(withDuplicate, triangulate(withDuplicate, null, 2))).toBeCloseTo(100, 6);
    });
  });

  describe('large rings', (): void => {
    // Past 80 vertices earcut switches to the z-order curve hash, a separate code path.
    it('covers a many sided polygon exactly, exercising the hashed path', (): void => {
      const sides = 200;
      const radius = 100;
      const ring: number[] = [];
      for (let i = 0; i < sides; i += 1) {
        const angle = (i / sides) * Math.PI * 2;
        ring.push(Math.cos(angle) * radius, Math.sin(angle) * radius);
      }
      const triangles = triangulate(ring, null, 2);
      expect(triangles).toHaveLength((sides - 2) * 3);
      const expected = 0.5 * sides * radius * radius * Math.sin((2 * Math.PI) / sides);
      expect(coveredArea(ring, triangles)).toBeCloseTo(expected, 3);
    });
  });
});
