import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { RENDER_CANVAS } from './const.js';
import { Game } from './game.js';

// happy-dom has no canvas implementation, so booting needs the smallest 2D context the canvas
// renderer touches. Booting is the one path that wires every subsystem together, which makes it the
// regression net for guards that only fire while the game is half-built.
const createContext2D = (): CanvasRenderingContext2D =>
  ({
    font: '',
    fillStyle: '',
    strokeStyle: '',
    globalAlpha: 1,
    globalCompositeOperation: 'source-over',
    imageSmoothingEnabled: true,
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    drawImage: vi.fn(),
    setTransform: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    translate: vi.fn(),
    getImageData: (): ImageData => ({ data: new Uint8ClampedArray(4) }) as ImageData,
    putImageData: vi.fn(),
    measureText: (value: string) => ({ width: value.length * 8 }),
  }) as unknown as CanvasRenderingContext2D;

const createGame = (): Game =>
  new Game({
    width: 320,
    height: 240,
    renderType: RENDER_CANVAS,
    isSkipTicker: true,
  });

describe('Game', () => {
  const originalGetContext = HTMLCanvasElement.prototype.getContext;

  beforeAll(() => {
    HTMLCanvasElement.prototype.getContext = function getContext(
      this: HTMLCanvasElement,
      id: string
    ): CanvasRenderingContext2D | null {
      return id === '2d' ? createContext2D() : null;
    } as typeof HTMLCanvasElement.prototype.getContext;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  afterAll(() => {
    HTMLCanvasElement.prototype.getContext = originalGetContext;
  });

  describe('boot', () => {
    it('brings the game up', () => {
      expect(createGame().isBooted).toBe(true);
    });

    it('wires every subsystem', () => {
      const game = createGame();
      expect(game.scale).toBeDefined();
      expect(game.stage).toBeDefined();
      expect(game.world).toBeDefined();
      expect(game.add).toBeDefined();
      expect(game.cache).toBeDefined();
      expect(game.load).toBeDefined();
      expect(game.time).toBeDefined();
      expect(game.tweens).toBeDefined();
      expect(game.input).toBeDefined();
      expect(game.sound).toBeDefined();
      expect(game.renderer).toBeDefined();
    });

    it('takes the size from the config', () => {
      const game = createGame();
      expect(game.width).toBe(320);
      expect(game.height).toBe(240);
      expect(game.scale.width).toBe(320);
      expect(game.scale.height).toBe(240);
    });

    it('gives the scale manager an input scale once input is up', () => {
      expect(createGame().input.scale.x).toBeGreaterThan(0);
    });

    it('attaches the canvas to the document', () => {
      const game = createGame();
      expect(game.canvas.parentElement).not.toBeNull();
    });

    it('skips the ticker when the config asks it to', () => {
      expect(createGame().raf).toBeUndefined();
    });

    it('defaults the size when the config gives none', () => {
      const game = new Game({ renderType: RENDER_CANVAS, isSkipTicker: true });
      expect(game.width).toBe(800);
      expect(game.height).toBe(600);
    });
  });

  describe('update', () => {
    it('advances the clock and the world without throwing', () => {
      const game = createGame();
      expect(() => {
        game.update(16);
        game.update(32);
      }).not.toThrow();
    });
  });

  describe('config', () => {
    it('takes a canvas supplied by the config instead of creating one', () => {
      const canvas = document.createElement('canvas');
      const game = new Game({ width: 320, height: 240, renderType: RENDER_CANVAS, isSkipTicker: true, canvas });
      expect(game.canvas).toBe(canvas);
    });
  });

  describe('destroy', () => {
    it('detaches the canvas and drops it', () => {
      const game = createGame();
      const { canvas } = game;
      game.destroy();
      expect(canvas.parentElement).toBeNull();
      expect(game.canvas).toBeNull();
    });
  });
});
