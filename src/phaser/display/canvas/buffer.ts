import { create, removeByCanvas } from './pool.js';

export class CanvasBuffer {
  public width!: number;
  public height!: number;
  public canvas!: HTMLCanvasElement;
  public context!: CanvasRenderingContext2D;
  /**
   * Creates a new CanvasBuffer instance.
   * @param {number} width - The width of the canvas buffer.
   * @param {number} height - The height of the canvas buffer.
   */
  public constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.canvas = create(this, this.width, this.height);
    this.context = this.canvas.getContext('2d', { willReadFrequently: false })!;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  /**
   * Clears the canvas buffer.
   */
  public clear(): void {
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.width, this.height);
  }

  /**
   * Resizes the canvas buffer.
   * @param {number} width - The new width of the canvas buffer.
   * @param {number} height - The new height of the canvas buffer.
   */
  public resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  /**
   * Destroys the canvas buffer and cleans up resources.
   */
  public destroy(): void {
    try {
      this.context?.reset();
    } catch {
      // pass
    }
    removeByCanvas(this.canvas);
  }
}
