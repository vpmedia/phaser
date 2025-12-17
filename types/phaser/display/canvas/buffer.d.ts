export class CanvasBuffer {
    /**
     * Creates a new CanvasBuffer instance.
     * @param {number} width - The width of the canvas buffer.
     * @param {number} height - The height of the canvas buffer.
     */
    constructor(width: number, height: number);
    width: number;
    height: number;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    /**
     * Clears the canvas buffer.
     */
    clear(): void;
    /**
     * Resizes the canvas buffer.
     * @param {number} width - The new width of the canvas buffer.
     * @param {number} height - The new height of the canvas buffer.
     */
    resize(width: number, height: number): void;
    /**
     * Destroys the canvas buffer and cleans up resources.
     */
    destroy(): void;
}
//# sourceMappingURL=buffer.d.ts.map