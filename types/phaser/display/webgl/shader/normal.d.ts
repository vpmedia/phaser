export class NormalShader {
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
    /** @type {WebGLProgram} */
    program: WebGLProgram;
    fragmentSrc: string[];
    /** @type {string[]} */
    vertexSrc: string[];
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
     * @param {object} uniform - TBD.
     */
    initSampler2D(uniform: object): void;
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