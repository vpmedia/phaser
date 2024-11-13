export class StripShader {
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
    fragmentSrc: string[];
    vertexSrc: string[];
    /**
     * TBD.
     */
    init(): void;
    uSampler: WebGLUniformLocation;
    projectionVector: WebGLUniformLocation;
    offsetVector: WebGLUniformLocation;
    colorAttribute: number;
    aVertexPosition: number;
    aTextureCoord: number;
    attributes: number[];
    translationMatrix: WebGLUniformLocation;
    alpha: WebGLUniformLocation;
    /**
     * TBD.
     */
    destroy(): void;
    uniforms: any;
    attribute: any;
}
//# sourceMappingURL=strip.d.ts.map