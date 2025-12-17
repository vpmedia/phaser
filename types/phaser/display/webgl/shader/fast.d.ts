export class FastShader {
    /**
     * Creates a new FastShader instance.
     * @param {WebGLRenderingContext} gl - The WebGL rendering context.
     */
    constructor(gl: WebGLRenderingContext);
    gl: WebGLRenderingContext;
    _UID: string;
    /** @type {WebGLProgram} */
    program: WebGLProgram;
    textureCount: number;
    fragmentSrc: string[];
    vertexSrc: string[];
    /**
     * Creates a new FastShader instance.
     */
    init(): void;
    uSampler: WebGLUniformLocation;
    projectionVector: WebGLUniformLocation;
    offsetVector: WebGLUniformLocation;
    dimensions: WebGLUniformLocation;
    uMatrix: WebGLUniformLocation;
    aVertexPosition: number;
    aPositionCoord: number;
    aScale: number;
    aRotation: number;
    aTextureCoord: number;
    colorAttribute: number;
    attributes: number[];
    /**
     * Destroys this shader and cleans up resources.
     */
    destroy(): void;
    uniforms: any;
}
//# sourceMappingURL=fast.d.ts.map