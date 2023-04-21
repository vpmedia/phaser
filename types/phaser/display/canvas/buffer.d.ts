export class CanvasBuffer {
    /**
     * TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    constructor(width: number, height: number);
    width: number;
    height: number;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    /**
     * TBD.
     */
    clear(): void;
    /**
     * TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    resize(width: number, height: number): void;
    /**
     * TBD.
     */
    destroy(): void;
}
//# sourceMappingURL=buffer.d.ts.map