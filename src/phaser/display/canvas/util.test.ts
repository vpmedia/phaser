import { afterEach, describe, expect, it } from 'vitest';
import { addToDOM, create, removeFromDOM, setBackgroundColor, setTouchAction, setUserSelect } from './util.js';

const createCanvas = (): HTMLCanvasElement => create(null, 32, 16, '', true);

describe('canvas util', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('create', () => {
    it('sizes the canvas as asked', () => {
      const canvas = createCanvas();
      expect(canvas.width).toBe(32);
      expect(canvas.height).toBe(16);
    });

    it('falls back to 256 square for a zero size', () => {
      const canvas = create(null, 0, 0, '', true);
      expect(canvas.width).toBe(256);
      expect(canvas.height).toBe(256);
    });

    it('assigns the id it is given and leaves an empty one off', () => {
      expect(create(null, 32, 16, 'stage', true).id).toBe('stage');
      expect(createCanvas().id).toBe('');
    });

    it('takes the canvas out of the flow', () => {
      expect(createCanvas().style.display).toBe('block');
    });
  });

  describe('addToDOM', () => {
    it('appends to the element with the given id', () => {
      const host = document.createElement('div');
      host.id = 'host';
      document.body.append(host);
      const canvas = createCanvas();
      addToDOM(canvas, 'host');
      expect(canvas.parentElement).toBe(host);
    });

    it('appends to an element passed directly', () => {
      const host = document.createElement('div');
      document.body.append(host);
      const canvas = createCanvas();
      addToDOM(canvas, host);
      expect(canvas.parentElement).toBe(host);
    });

    it('falls back to the body for an id nothing matches', () => {
      const canvas = createCanvas();
      addToDOM(canvas, 'nothing-here');
      expect(canvas.parentElement).toBe(document.body);
    });

    it('falls back to the body when given no parent', () => {
      const canvas = createCanvas();
      addToDOM(canvas, null);
      expect(canvas.parentElement).toBe(document.body);
    });

    // An empty id used to build the selector `#`, which throws before the body fallback is reached.
    it('falls back to the body for an empty id', () => {
      const canvas = createCanvas();
      addToDOM(canvas, '');
      expect(canvas.parentElement).toBe(document.body);
    });

    it('hides the parent overflow unless told not to', () => {
      const host = document.createElement('div');
      document.body.append(host);
      addToDOM(createCanvas(), host);
      expect(host.style.overflow).toBe('hidden');
      const other = document.createElement('div');
      document.body.append(other);
      addToDOM(createCanvas(), other, false);
      expect(other.style.overflow).toBe('');
    });

    it('survives an id that is not a valid bare selector', () => {
      const host = document.createElement('div');
      host.id = 'game.container';
      document.body.append(host);
      const canvas = createCanvas();
      addToDOM(canvas, 'game.container');
      expect(canvas.parentElement).toBe(host);
    });
  });

  describe('removeFromDOM', () => {
    it('detaches an attached canvas', () => {
      const canvas = createCanvas();
      document.body.append(canvas);
      removeFromDOM(canvas);
      expect(canvas.parentElement).toBeNull();
    });

    it('leaves a detached canvas alone', () => {
      const canvas = createCanvas();
      expect(() => {
        removeFromDOM(canvas);
      }).not.toThrow();
    });
  });

  describe('style helpers', () => {
    it('sets the background colour', () => {
      expect(setBackgroundColor(createCanvas(), 'rgb(255, 0, 0)').style.backgroundColor).toBe('rgb(255, 0, 0)');
    });

    it('disables touch actions', () => {
      expect(setTouchAction(createCanvas()).style.getPropertyValue('touch-action')).toBe('none');
    });

    it('falls back to none for an empty touch action', () => {
      expect(setTouchAction(createCanvas(), '').style.getPropertyValue('touch-action')).toBe('none');
    });

    it('disables user selection', () => {
      expect(setUserSelect(createCanvas()).style.getPropertyValue('user-select')).toBe('none');
    });

    it('falls back to none for an empty user selection', () => {
      expect(setUserSelect(createCanvas(), '').style.getPropertyValue('user-select')).toBe('none');
    });
  });
});
