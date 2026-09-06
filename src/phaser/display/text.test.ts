import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Game } from '../core/game.js';
import { getRegistry } from '../core/registry.js';
import { Text } from './text.js';
import { textureFromCanvas } from './webgl/texture_util.js';

// happy-dom has no 2D canvas implementation, so Text cannot be constructed without one. This is the
// smallest surface updateText() touches.
const createContext2D = (): CanvasRenderingContext2D =>
  ({
    font: '',
    fillStyle: '',
    strokeStyle: '',
    textBaseline: '',
    lineWidth: 0,
    lineJoin: '',
    globalAlpha: 1,
    measureText: (value: string) => ({
      width: value.length * 8,
      actualBoundingBoxAscent: 8,
      actualBoundingBoxDescent: 2,
    }),
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    fillText: vi.fn(),
    strokeText: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    scale: vi.fn(),
    translate: vi.fn(),
    setTransform: vi.fn(),
    getImageData: () => ({ data: new Uint8ClampedArray(4) }),
    putImageData: vi.fn(),
  }) as unknown as CanvasRenderingContext2D;

const createGame = (): Game =>
  ({
    renderer: { resolution: 1 },
    cache: { getImage: () => null },
    add: { existing: (child: unknown) => child },
  }) as unknown as Game;

const createText = (value: string | number): Text => new Text(createGame(), 0, 0, value);

describe('Text', () => {
  const originalGetContext = HTMLCanvasElement.prototype.getContext;

  beforeAll(() => {
    HTMLCanvasElement.prototype.getContext = function getContext(this: HTMLCanvasElement, id: string) {
      return id === '2d' ? createContext2D() : null;
    } as typeof HTMLCanvasElement.prototype.getContext;
  });

  beforeEach(() => {
    getRegistry().CACHE_MISSING_IMAGE = textureFromCanvas(document.createElement('canvas'));
  });

  afterAll(() => {
    HTMLCanvasElement.prototype.getContext = originalGetContext;
  });

  describe('constructor', () => {
    it('keeps a string as-is', () => {
      expect(createText('hello').text).toBe('hello');
    });

    // The game clients pass numbers straight into game.add.text(). The constructor must coerce:
    // updateText() calls .split() on the value, which throws on a number.
    it('coerces a number to its string form', () => {
      expect(createText(42).text).toBe('42');
    });

    it('coerces zero rather than falling back to the empty string', () => {
      expect(createText(0).text).toBe('0');
    });

    it('coerces a negative number', () => {
      expect(createText(-7).text).toBe('-7');
    });

    it('defaults to the empty string', () => {
      expect(new Text(createGame(), 0, 0).text).toBe('');
    });

    it('renders a numeric label without throwing', () => {
      expect(() => createText(2026)).not.toThrow();
    });
  });

  describe('text setter', () => {
    it('coerces a number assigned after construction', () => {
      const text = createText('start');
      text.text = 99;
      expect(text.text).toBe('99');
    });
  });

  describe('setText', () => {
    it('coerces a number', () => {
      const text = createText('start');
      text.setText(123);
      expect(text.text).toBe('123');
    });

    it('returns itself for chaining', () => {
      const text = createText('start');
      expect(text.setText('next')).toBe(text);
    });
  });
});
