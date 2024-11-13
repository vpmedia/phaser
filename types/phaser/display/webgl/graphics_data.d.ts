export class GraphicsData {
    /**
     * TBD.
     * @param {WebGLRenderingContext & { id: number }} gl - TBD.
     */
    constructor(gl: WebGLRenderingContext & {
        id: number;
    });
    gl: WebGLRenderingContext & {
        id: number;
    };
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