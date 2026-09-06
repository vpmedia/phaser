import { beforeEach, describe, expect, it } from 'vitest';
import { create, getFirst, getFree, getPool, getTotal, remove, removeByCanvas } from './pool.js';

describe('canvas pool', (): void => {
  beforeEach((): void => {
    getPool().length = 0;
  });

  describe('getPool', (): void => {
    it('lazily creates the backing array and returns the same one thereafter', (): void => {
      expect(getPool()).toBe(getPool());
      expect(getPool()).toStrictEqual([]);
    });
  });

  describe('create', (): void => {
    it('adds a new entry when the pool is empty', (): void => {
      const parent = { name: 'owner' };
      const canvas = create(parent);
      expect(getPool()).toHaveLength(1);
      expect(getPool()[0]?.parent).toBe(parent);
      expect(getPool()[0]?.canvas).toBe(canvas);
    });

    it('reuses a free entry instead of growing the pool', (): void => {
      const first = { name: 'first' };
      const canvas = create(first);
      remove(first);
      const second = { name: 'second' };
      expect(create(second)).toBe(canvas);
      expect(getPool()).toHaveLength(1);
      expect(getPool()[0]?.parent).toBe(second);
    });

    it('grows the pool when skipPool is set even if an entry is free', (): void => {
      const first = { name: 'first' };
      create(first);
      remove(first);
      create({ name: 'second' }, undefined, undefined, true);
      expect(getPool()).toHaveLength(2);
    });

    it('applies the requested dimensions', (): void => {
      const canvas = create({ name: 'sized' }, 64, 32);
      expect(canvas.width).toBe(64);
      expect(canvas.height).toBe(32);
    });
  });

  describe('getFirst', (): void => {
    it('reports -1 when every entry is claimed', (): void => {
      create({ name: 'owner' });
      expect(getFirst()).toBe(-1);
    });

    it('reports the index of the first free entry', (): void => {
      create({ name: 'a' });
      const b = { name: 'b' };
      create(b);
      create({ name: 'c' });
      remove(b);
      expect(getFirst()).toBe(1);
    });
  });

  describe('remove', (): void => {
    it('frees the entry and shrinks its canvas to 1x1', (): void => {
      const parent = { name: 'owner' };
      const canvas = create(parent, 100, 50);
      remove(parent);
      expect(getPool()[0]?.parent).toBeNull();
      expect(canvas.width).toBe(1);
      expect(canvas.height).toBe(1);
    });

    it('ignores a parent that owns nothing', (): void => {
      create({ name: 'owner' });
      expect((): void => {
        remove({ name: 'stranger' });
      }).not.toThrow();
      expect(getPool()[0]?.parent).not.toBeNull();
    });
  });

  describe('removeByCanvas', (): void => {
    it('frees the entry holding that canvas', (): void => {
      const canvas = create({ name: 'owner' }, 100, 50);
      removeByCanvas(canvas);
      expect(getPool()[0]?.parent).toBeNull();
      expect(canvas.width).toBe(1);
    });
  });

  describe('getTotal and getFree', (): void => {
    it('count claimed and unclaimed entries', (): void => {
      const a = { name: 'a' };
      create(a);
      create({ name: 'b' });
      expect(getTotal()).toBe(2);
      expect(getFree()).toBe(0);
      remove(a);
      expect(getTotal()).toBe(1);
      expect(getFree()).toBe(1);
    });
  });
});
