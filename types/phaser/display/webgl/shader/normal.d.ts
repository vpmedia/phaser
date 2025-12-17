export class NormalShader {
    /**
     * Creates a new NormalShader instance.
     * @param {WebGLRenderingContext & { id: number }} gl - The WebGL rendering context.
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
     * Destroys this shader and cleans up resources.
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
     * Binds this shader to the WebGL context.
     */
    initUniforms(): void;
    /**
     * Sets a uniform value for this shader.
     * @param {object} uniform - The uniform to set.
     */
    initSampler2D(uniform: object): void;
    /**
     * Sets the shader to use for rendering.
     */
    syncUniforms(): void;
    /**
     * Destroys this shader and cleans up resources.
     */
    destroy(): void;
}
//# sourceMappingURL=normal.d.ts.map