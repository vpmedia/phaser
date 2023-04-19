import { create, removeByCanvas } from './pool';

export class CanvasBuffer {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.canvas = create(this, this.width, this.height);
    this.context = this.canvas.getContext('2d');
    this.canvas.width = width;
    this.canvas.height = height;
  }

  clear() {
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.width, this.height);
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  destroy() {
    removeByCanvas(this.canvas);
  }
}
