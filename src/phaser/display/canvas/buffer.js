import { create, removeByCanvas } from './pool.js';

export class CanvasBuffer {
  /**
   * TBD.
   * @param {number} width - TBD.
   * @param {number} height - TBD.
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.canvas = create(this, this.width, this.height);
    this.context = this.canvas.getContext('2d');
    this.canvas.width = width;
    this.canvas.height = height;
  }

  /**
   * TBD.
   */
  clear() {
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.width, this.height);
  }

  /**
   * TBD.
   * @param {number} width - TBD.
   * @param {number} height - TBD.
   */
  resize(width, height) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  /**
   * TBD.
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
