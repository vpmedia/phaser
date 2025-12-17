export class PrimitiveShader {
    /**
     * Creates a new PrimitiveShader instance.
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
    flipY: WebGLUniformLocation;
    aVertexPosition: number;
    colorAttribute: number;
    attributes: number[];
    translationMatrix: WebGLUniformLocation;
    alpha: WebGLUniformLocation;
    /**
     * Binds this shader to the WebGL context.
     */
    destroy(): void;
    uniforms: any;
}
//# sourceMappingURL=primitive.d.ts.map