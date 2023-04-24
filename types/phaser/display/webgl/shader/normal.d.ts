export class NormalShader {
    /**
     * TBD.
     * @param {WebGLRenderingContext} gl - TBD.
     */
    constructor(gl: WebGLRenderingContext);
    gl: WebGLRenderingContext;
    _UID: string;
    program: any;
    fragmentSrc: string[];
    textureCount: number;
    firstRun: boolean;
    dirty: boolean;
    uniforms: {};
    attributes: any[];
    /**
     * TBD.
     */
    init(): void;
    uSampler: WebGLUniformLocation;
    projectionVector: WebGLUniformLocation;
    offsetVector: WebGLUniformLocation;
    dimensions: WebGLUniformLocation;
    aVertexPosition: number;
    aTextureCoord: number;
    colorAttribute: number;
    /**
     * TBD.
     */
    initUniforms(): void;
    /**
     * TBD.
     * @param uniform - TBD.
     */
    initSampler2D(uniform: any): void;
    /**
     * TBD.
     */
    syncUniforms(): void;
    /**
     * TBD.
     */
    destroy(): void;
}
//# sourceMappingURL=normal.d.ts.map