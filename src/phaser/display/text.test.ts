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
    cache: { getImage: (): null => null },
    add: { existing: (child: unknown): unknown => child },
  }) as unknown as Game;

const createText = (value: string | number): Text => new Text(createGame(), 0, 0, value);

describe('Text', (): void => {
  const originalGetContext = HTMLCanvasElement.prototype.getContext;

  beforeAll((): void => {
    HTMLCanvasElement.prototype.getContext = function getContext(
      this: HTMLCanvasElement,
      id: string
    ): CanvasRenderingContext2D | null {
      return id === '2d' ? createContext2D() : null;
    } as typeof HTMLCanvasElement.prototype.getContext;
  });

  beforeEach((): void => {
    getRegistry().CACHE_MISSING_IMAGE = textureFromCanvas(document.createElement('canvas'));
  });

  afterAll((): void => {
    HTMLCanvasElement.prototype.getContext = originalGetContext;
  });

  describe('constructor', (): void => {
    it('keeps a string as-is', (): void => {
      expect(createText('hello').text).toBe('hello');
    });

    // Callers pass numbers straight into game.add.text(). The constructor must coerce:
    // updateText() calls .split() on the value, which throws on a number.
    it('coerces a number to its string form', (): void => {
      expect(createText(42).text).toBe('42');
    });

    it('coerces zero rather than falling back to the empty string', (): void => {
      expect(createText(0).text).toBe('0');
    });

    it('coerces a negative number', (): void => {
      expect(createText(-7).text).toBe('-7');
    });

    it('defaults to the empty string', (): void => {
      expect(new Text(createGame(), 0, 0).text).toBe('');
    });

    it('renders a numeric label without throwing', (): void => {
      expect((): Text => createText(2026)).not.toThrow();
    });
  });

  describe('text setter', (): void => {
    it('coerces a number assigned after construction', (): void => {
      const text = createText('start');
      text.text = 99;
      expect(text.text).toBe('99');
    });
  });

  describe('fontSize', (): void => {
    // A px-suffixed size cannot be read with Number(); it yields NaN. An autofix made exactly that
    // substitution once already.
    it('reads a px size back as a number', (): void => {
      const text = new Text(createGame(), 0, 0, 'hello', { font: '20px Arial' });
      expect(text.fontSize).toBe(20);
    });

    it('round trips through the setter', (): void => {
      const text = createText('hello');
      text.fontSize = 32;
      expect(text.fontSize).toBe(32);
    });

    it('reads zero back as zero', (): void => {
      const text = createText('hello');
      text.fontSize = 0;
      expect(text.fontSize).toBe(0);
    });

    it('never reports NaN for a styled font', (): void => {
      const text = new Text(createGame(), 0, 0, 'hello', { font: 'bold 14px Arial' });
      expect(Number.isNaN(text.fontSize)).toBe(false);
    });
  });

  describe('setText', (): void => {
    it('coerces a number', (): void => {
      const text = createText('start');
      text.setText(123);
      expect(text.text).toBe('123');
    });

    it('returns itself for chaining', (): void => {
      const text = createText('start');
      expect(text.setText('next')).toBe(text);
    });
  });
});
