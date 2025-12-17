export class StripShader {
    /**
     * Creates a new StripShader instance.
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
     * Binds this shader to the WebGL context.
     */
    destroy(): void;
    uniforms: any;
    attribute: any;
}
//# sourceMappingURL=strip.d.ts.map