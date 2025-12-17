export class GraphicsData {
    /**
     * Creates a new GraphicsData instance.
     * @param {WebGLRenderingContext} gl - The WebGL rendering context.
     */
    constructor(gl: WebGLRenderingContext);
    gl: WebGLRenderingContext;
    color: number[];
    points: any[];
    indices: any[];
    buffer: WebGLBuffer;
    indexBuffer: WebGLBuffer;
    mode: number;
    alpha: number;
    dirty: boolean;
    /**
     * Destroys this graphics data and cleans up resources.
     */
    reset(): void;
    glPoints: Float32Array<ArrayBuffer>;
    glIndicies: Uint16Array<ArrayBuffer>;
    /**
     * Updates the graphics data for WebGL rendering.
     */
    upload(): void;
}
//# sourceMappingURL=graphics_data.d.ts.map