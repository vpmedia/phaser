import { create, removeByCanvas } from './pool.js';

export class CanvasBuffer {
  /**
   * Creates a new CanvasBuffer instance.
   * @param {number} width - The width of the canvas buffer.
   * @param {number} height - The height of the canvas buffer.
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.canvas = create(this, this.width, this.height);
    this.context = this.canvas.getContext('2d', { willReadFrequently: false });
    this.canvas.width = width;
    this.canvas.height = height;
  }

  /**
   * Clears the canvas buffer.
   */
  clear() {
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.width, this.height);
  }

  /**
   * Resizes the canvas buffer.
   * @param {number} width - The new width of the canvas buffer.
   * @param {number} height - The new height of the canvas buffer.
   */
  resize(width, height) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  /**
   * Destroys the canvas buffer and cleans up resources.
   */
  destroy() {
    try {
      this.context?.reset();
    } catch {
      // pass
    }
    removeByCanvas(this.canvas);
  }
}
