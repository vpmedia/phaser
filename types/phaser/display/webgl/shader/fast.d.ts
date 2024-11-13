export class FastShader {
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