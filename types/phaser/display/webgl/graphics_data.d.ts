export class GraphicsData {
    /**
     * TBD.
     * @param {WebGLRenderingContext} gl - TBD.
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
     * TBD.
     */
    reset(): void;
    glPoints: Float32Array;
    glIndicies: Uint16Array;
    /**
     * TBD.
     */
    upload(): void;
}
//# sourceMappingURL=graphics_data.d.ts.map