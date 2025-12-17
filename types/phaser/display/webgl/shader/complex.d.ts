export class ComplexPrimitiveShader {
    /**
     * Creates a new ComplexShader instance.
     * @param {WebGLRenderingContext} gl - The WebGL rendering context.
     */
    constructor(gl: WebGLRenderingContext);
    gl: WebGLRenderingContext;
    _UID: string;
    /** @type {WebGLProgram} */
    program: WebGLProgram;
    fragmentSrc: string[];
    vertexSrc: string[];
    /**
     * Destroys this shader and cleans up resources.
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
     * Binds this shader to the WebGL context.
     */
    destroy(): void;
    uniforms: any;
    attribute: any;
}
//# sourceMappingURL=complex.d.ts.map