export class ComplexPrimitiveShader {
    /**
     * TBD.
     * @param {WebGLRenderingContext} gl - TBD.
     */
    constructor(gl: WebGLRenderingContext);
    gl: WebGLRenderingContext;
    _UID: string;
    program: any;
    fragmentSrc: string[];
    vertexSrc: string[];
    /**
     * TBD.
     */
    init(): void;
    projectionVector: WebGLUniformLocation;
    offsetVector: WebGLUniformLocation;
    tintColor: WebGLUniformLocation;
    color: WebGLUniformLocation;
    flipY: WebGLUniformLocation;
    aVertexPosition: number;
    attributes: any[];
    translationMatrix: WebGLUniformLocation;
    alpha: WebGLUniformLocation;
    /**
     * TBD.
     */
    destroy(): void;
    uniforms: any;
    attribute: any;
}
//# sourceMappingURL=complex.d.ts.map