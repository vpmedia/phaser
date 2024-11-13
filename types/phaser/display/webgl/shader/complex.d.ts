export class ComplexPrimitiveShader {
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