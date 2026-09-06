import { afterEach, describe, expect, it } from 'vitest';
import { addToDOM, create, removeFromDOM, setBackgroundColor, setTouchAction, setUserSelect } from './util.js';

const createCanvas = (): HTMLCanvasElement => create(null, 32, 16, '', true);

describe('canvas util', (): void => {
  afterEach((): void => {
    document.body.innerHTML = '';
  });

  describe('create', (): void => {
    it('sizes the canvas as asked', (): void => {
      const canvas = createCanvas();
      expect(canvas.width).toBe(32);
      expect(canvas.height).toBe(16);
    });

    it('falls back to 256 square for a zero size', (): void => {
      const canvas = create(null, 0, 0, '', true);
      expect(canvas.width).toBe(256);
      expect(canvas.height).toBe(256);
    });

    it('assigns the id it is given and leaves an empty one off', (): void => {
      expect(create(null, 32, 16, 'stage', true).id).toBe('stage');
      expect(createCanvas().id).toBe('');
    });

    it('takes the canvas out of the flow', (): void => {
      expect(createCanvas().style.display).toBe('block');
    });
  });

  describe('addToDOM', (): void => {
    it('appends to the element with the given id', (): void => {
      const host = document.createElement('div');
      host.id = 'host';
      document.body.append(host);
      const canvas = createCanvas();
      addToDOM(canvas, 'host');
      expect(canvas.parentElement).toBe(host);
    });

    it('appends to an element passed directly', (): void => {
      const host = document.createElement('div');
      document.body.append(host);
      const canvas = createCanvas();
      addToDOM(canvas, host);
      expect(canvas.parentElement).toBe(host);
    });

    it('falls back to the body for an id nothing matches', (): void => {
      const canvas = createCanvas();
      addToDOM(canvas, 'nothing-here');
      expect(canvas.parentElement).toBe(document.body);
    });

    it('falls back to the body when given no parent', (): void => {
      const canvas = createCanvas();
      addToDOM(canvas, null);
      expect(canvas.parentElement).toBe(document.body);
    });

    // An empty id used to build the selector `#`, which throws before the body fallback is reached.
    it('falls back to the body for an empty id', (): void => {
      const canvas = createCanvas();
      addToDOM(canvas, '');
      expect(canvas.parentElement).toBe(document.body);
    });

    it('hides the parent overflow unless told not to', (): void => {
      const host = document.createElement('div');
      document.body.append(host);
      addToDOM(createCanvas(), host);
      expect(host.style.overflow).toBe('hidden');
      const other = document.createElement('div');
      document.body.append(other);
      addToDOM(createCanvas(), other, false);
      expect(other.style.overflow).toBe('');
    });

    it('survives an id that is not a valid bare selector', (): void => {
      const host = document.createElement('div');
      host.id = 'game.container';
      document.body.append(host);
      const canvas = createCanvas();
      addToDOM(canvas, 'game.container');
      expect(canvas.parentElement).toBe(host);
    });
  });

  describe('removeFromDOM', (): void => {
    it('detaches an attached canvas', (): void => {
      const canvas = createCanvas();
      document.body.append(canvas);
      removeFromDOM(canvas);
      expect(canvas.parentElement).toBeNull();
    });

    it('leaves a detached canvas alone', (): void => {
      const canvas = createCanvas();
      expect((): void => {
        removeFromDOM(canvas);
      }).not.toThrow();
    });
  });

  describe('style helpers', (): void => {
    it('sets the background colour', (): void => {
      expect(setBackgroundColor(createCanvas(), 'rgb(255, 0, 0)').style.backgroundColor).toBe('rgb(255, 0, 0)');
    });

    it('disables touch actions', (): void => {
      expect(setTouchAction(createCanvas()).style.getPropertyValue('touch-action')).toBe('none');
    });

    it('falls back to none for an empty touch action', (): void => {
      expect(setTouchAction(createCanvas(), '').style.getPropertyValue('touch-action')).toBe('none');
    });

    it('disables user selection', (): void => {
      expect(setUserSelect(createCanvas()).style.getPropertyValue('user-select')).toBe('none');
    });

    it('falls back to none for an empty user selection', (): void => {
      expect(setUserSelect(createCanvas(), '').style.getPropertyValue('user-select')).toBe('none');
    });
  });
});
