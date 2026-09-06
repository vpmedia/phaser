import { describe, expect, it } from 'vitest';
import type { Game } from '../core/game.js';
import { Point } from '../geom/point.js';
import { Polygon } from '../geom/polygon.js';
import { Rectangle } from '../geom/rectangle.js';
import { Graphics } from './graphics.js';

const createGame = (): Game => ({ renderer: { resolution: 1 } }) as unknown as Game;

const createGraphics = (): Graphics => new Graphics(createGame());

describe('Graphics', () => {
  describe('containsPoint', () => {
    // The index never advanced here, so any filled shape that did not contain the point spun
    // forever. A vitest timeout is the only way a hang shows up as a failure.
    it('returns false for a point outside a filled shape instead of hanging', { timeout: 2000 }, () => {
      const graphics = createGraphics();
      graphics.beginFill(0xff0000);
      graphics.drawRect(0, 0, 10, 10);
      graphics.endFill();
      expect(graphics.containsPoint(new Point(100, 100), new Point())).toBe(false);
    });

    it('returns true for a point inside a filled shape', { timeout: 2000 }, () => {
      const graphics = createGraphics();
      graphics.beginFill(0xff0000);
      graphics.drawRect(0, 0, 10, 10);
      graphics.endFill();
      expect(graphics.containsPoint(new Point(5, 5), new Point())).toBe(true);
    });

    it('walks past a non-matching shape to a later matching one', { timeout: 2000 }, () => {
      const graphics = createGraphics();
      graphics.beginFill(0xff0000);
      graphics.drawRect(0, 0, 10, 10);
      graphics.drawRect(100, 100, 10, 10);
      graphics.endFill();
      expect(graphics.containsPoint(new Point(105, 105), new Point())).toBe(true);
    });

    it('ignores unfilled shapes', { timeout: 2000 }, () => {
      const graphics = createGraphics();
      graphics.lineStyle(1, 0x00ff00);
      graphics.drawRect(0, 0, 10, 10);
      expect(graphics.containsPoint(new Point(5, 5), new Point())).toBe(false);
    });

    it('returns false when nothing has been drawn', { timeout: 2000 }, () => {
      expect(createGraphics().containsPoint(new Point(0, 0), new Point())).toBe(false);
    });
  });

  describe('drawShape', () => {
    it('records a polygon as the current path', () => {
      const graphics = createGraphics();
      const data = graphics.drawShape(new Polygon([0, 0, 10, 0, 10, 10]));
      expect(graphics.currentPath).toBe(data);
      expect(data.shape).toBeInstanceOf(Polygon);
    });

    it('does not record a rectangle as the current path', () => {
      const graphics = createGraphics();
      graphics.drawShape(new Rectangle(0, 0, 10, 10));
      expect(graphics.currentPath).toBeNull();
    });

    it('carries the current fill and line style onto the data', () => {
      const graphics = createGraphics();
      graphics.lineStyle(4, 0x00ff00, 0.5);
      graphics.beginFill(0xff0000, 0.25);
      const data = graphics.drawShape(new Rectangle(0, 0, 10, 10));
      expect(data.lineWidth).toBe(4);
      expect(data.lineColor).toBe(0x00ff00);
      expect(data.lineAlpha).toBe(0.5);
      expect(data.fillColor).toBe(0xff0000);
      expect(data.fillAlpha).toBe(0.25);
      expect(data.fill).toBe(true);
    });

    it('flattens a polygon so the builders see numbers', () => {
      const graphics = createGraphics();
      const data = graphics.drawShape(new Polygon([new Point(0, 0), new Point(10, 0), new Point(10, 10)]));
      expect((data.shape as Polygon)._points.every((value) => typeof value === 'number')).toBe(true);
    });
  });

  describe('path building', () => {
    it('accumulates points through moveTo and lineTo', () => {
      const graphics = createGraphics();
      graphics.moveTo(0, 0);
      graphics.lineTo(10, 0);
      graphics.lineTo(10, 10);
      expect(graphics.currentPath?.shape.points).toStrictEqual([0, 0, 10, 0, 10, 10]);
    });

    it('starts a path at the origin when lineTo comes first', () => {
      const graphics = createGraphics();
      graphics.lineTo(10, 10);
      expect(graphics.currentPath?.shape.points).toStrictEqual([0, 0, 10, 10]);
    });
  });

  describe('endFill', () => {
    it('stops filling subsequent shapes', () => {
      const graphics = createGraphics();
      graphics.beginFill(0xff0000);
      graphics.endFill();
      expect(graphics.drawShape(new Rectangle(0, 0, 10, 10)).fill).toBe(false);
    });
  });

  describe('drawTriangle', () => {
    it('records the triangle as a polygon', () => {
      const graphics = createGraphics();
      graphics.drawTriangle([new Point(0, 0), new Point(10, 0), new Point(0, 10)]);
      expect(graphics.graphicsData).toHaveLength(1);
      expect(graphics.graphicsData[0]?.shape).toBeInstanceOf(Polygon);
    });

    it('keeps a front-facing triangle when culling', () => {
      const graphics = createGraphics();
      graphics.drawTriangle([new Point(0, 0), new Point(10, 0), new Point(0, 10)], true);
      graphics.drawTriangle([new Point(0, 0), new Point(0, 10), new Point(10, 0)], true);
      expect(graphics.graphicsData).toHaveLength(1);
    });

    it('draws both windings when culling is off', () => {
      const graphics = createGraphics();
      graphics.drawTriangle([new Point(0, 0), new Point(10, 0), new Point(0, 10)]);
      graphics.drawTriangle([new Point(0, 0), new Point(0, 10), new Point(10, 0)]);
      expect(graphics.graphicsData).toHaveLength(2);
    });
  });

  describe('drawTriangles', () => {
    it('reads a flat coordinate list as triangles', () => {
      const graphics = createGraphics();
      graphics.drawTriangles([0, 0, 10, 0, 0, 10, 20, 20, 30, 20, 20, 30], null as unknown as number[]);
      expect(graphics.graphicsData).toHaveLength(2);
    });

    it('reads a point list as triangles', () => {
      const graphics = createGraphics();
      graphics.drawTriangles([new Point(0, 0), new Point(10, 0), new Point(0, 10)], null as unknown as number[]);
      expect(graphics.graphicsData).toHaveLength(1);
    });

    it('follows an index list over a flat coordinate list', () => {
      const graphics = createGraphics();
      graphics.drawTriangles([0, 0, 10, 0, 0, 10], [0, 1, 2]);
      expect(graphics.graphicsData).toHaveLength(1);
      expect((graphics.graphicsData[0]!.shape as Polygon).toNumberArray()).toStrictEqual([0, 0, 10, 0, 0, 10]);
    });

    it('follows an index list over a point list', () => {
      const graphics = createGraphics();
      graphics.drawTriangles([new Point(0, 0), new Point(10, 0), new Point(0, 10)], [0, 1, 2]);
      expect(graphics.graphicsData).toHaveLength(1);
    });
  });

  describe('clear', () => {
    it('drops the recorded graphics data', () => {
      const graphics = createGraphics();
      graphics.beginFill(0xff0000);
      graphics.drawRect(0, 0, 10, 10);
      graphics.clear();
      expect(graphics.graphicsData).toStrictEqual([]);
      expect(graphics.currentPath).toBeNull();
    });
  });
});
