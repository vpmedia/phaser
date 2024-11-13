export class PrimitiveShader {
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
    flipY: WebGLUniformLocation;
    aVertexPosition: number;
    colorAttribute: number;
    attributes: number[];
    translationMatrix: WebGLUniformLocation;
    alpha: WebGLUniformLocation;
    /**
     * TBD.
     */
    destroy(): void;
    uniforms: any;
}
//# sourceMappingURL=primitive.d.ts.map