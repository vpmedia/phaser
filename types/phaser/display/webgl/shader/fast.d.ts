export class FastShader {
    /**
     * TBD.
     * @param {WebGLRenderingContext} gl - TBD.
     */
    constructor(gl: WebGLRenderingContext);
    gl: WebGLRenderingContext;
    _UID: string;
    program: WebGLProgram;
    textureCount: number;
    fragmentSrc: string[];
    vertexSrc: string[];
    /**
     * TBD.
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
     * TBD.
     */
    destroy(): void;
    uniforms: any;
}
//# sourceMappingURL=fast.d.ts.map