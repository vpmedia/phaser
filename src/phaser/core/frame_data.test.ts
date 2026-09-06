import { describe, expect, it } from 'vitest';
import { Frame } from './frame.js';
import { FrameData } from './frame_data.js';

const seed = (names: string[]): FrameData => {
  const data = new FrameData();
  for (const [i, name] of names.entries()) {
    data.addFrame(new Frame(i, i * 10, 0, 10, 10, name));
  }
  return data;
};

describe('FrameData', () => {
  describe('addFrame', () => {
    it('assigns a sequential index and registers the name', () => {
      const data = seed(['a', 'b']);
      expect(data._frames.map((frame) => frame.index)).toStrictEqual([0, 1]);
      expect(data._frameNames).toStrictEqual({ a: 0, b: 1 });
    });

    it('does not register an empty name', () => {
      const data = new FrameData();
      data.addFrame(new Frame(0, 0, 0, 10, 10, ''));
      expect(data._frameNames).toStrictEqual({});
    });
  });

  describe('getFrame', () => {
    it('returns the frame at the index', () => {
      const data = seed(['a', 'b', 'c']);
      expect(data.getFrame(1).name).toBe('b');
    });

    it('falls back to the first frame when the index is out of range', () => {
      const data = seed(['a', 'b']);
      expect(data.getFrame(9).name).toBe('a');
    });
  });

  describe('getFrameByName', () => {
    it('finds a registered frame', () => {
      const data = seed(['a', 'b']);
      expect(data.getFrameByName('b')?.index).toBe(1);
    });

    it('returns null for an unknown name', () => {
      const data = seed(['a']);
      expect(data.getFrameByName('missing')).toBeNull();
    });

    it('returns null when the name maps to a frame that is gone', () => {
      const data = seed(['a']);
      data._frames.length = 0;
      expect(data.getFrameByName('a')).toBeNull();
    });
  });

  describe('checkFrameName', () => {
    it('distinguishes known from unknown names', () => {
      const data = seed(['a']);
      expect(data.checkFrameName('a')).toBe(true);
      expect(data.checkFrameName('b')).toBe(false);
    });
  });

  describe('getFrameRange', () => {
    it('collects the inclusive range', () => {
      const data = seed(['a', 'b', 'c', 'd']);
      expect(data.getFrameRange(1, 2).map((frame) => frame.name)).toStrictEqual(['b', 'c']);
    });

    it('appends into a supplied output array', () => {
      const data = seed(['a', 'b']);
      const output = [data.getFrame(0)];
      expect(data.getFrameRange(1, 1, output)).toHaveLength(2);
    });
  });

  describe('getFrameIndexes', () => {
    it('maps numeric indexes through', () => {
      const data = seed(['a', 'b', 'c']);
      expect(data.getFrameIndexes([0, 2])).toStrictEqual([0, 2]);
    });

    it('maps names when numeric indexing is off', () => {
      const data = seed(['a', 'b', 'c']);
      expect(data.getFrameIndexes(['c', 'a'], false)).toStrictEqual([2, 0]);
    });

    it('skips names that do not resolve', () => {
      const data = seed(['a']);
      expect(data.getFrameIndexes(['a', 'missing'], false)).toStrictEqual([0]);
    });

    it('returns every index when given no frames', () => {
      const data = seed(['a', 'b', 'c']);
      expect(data.getFrameIndexes([])).toStrictEqual([0, 1, 2]);
    });
  });
});
