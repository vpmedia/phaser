export class FastSpriteBatch {
    /**
     * TBD.
     * @param {WebGLRenderingContext} gl - TBD.
     */
    constructor(gl: WebGLRenderingContext);
    vertSize: number;
    maxSize: number;
    size: number;
    vertices: Float32Array;
    indices: Uint16Array;
    vertexBuffer: WebGLBuffer;
    indexBuffer: WebGLBuffer;
    lastIndexCount: number;
    drawing: boolean;
    currentBatchSize: number;
    currentBaseTexture: any;
    currentBlendMode: number;
    renderSession: any;
    shader: any;
    matrix: any;
    /**
     * TBD.
     * @param {WebGLRenderingContext} gl - TBD.
     */
    setContext(gl: WebGLRenderingContext): void;
    gl: WebGLRenderingContext;
    /**
     * TBD.
     * @param {object} spriteBatch - TBD.
     * @param {object} renderSession - TBD.
     */
    begin(spriteBatch: object, renderSession: object): void;
    /**
     * TBD.
     */
    end(): void;
    /**
     * TBD.
     * @param {object} spriteBatch - TBD.
     */
    render(spriteBatch: object): void;
    /**
     * TBD.
     * @param {import('../../display/image').Image} sprite - TBD.
     */
    renderSprite(sprite: import('../../display/image').Image): void;
    /**
     * TBD.
     */
    flush(): void;
    /**
     * TBD.
     */
    stop(): void;
    /**
     * TBD.
     */
    start(): void;
}
//# sourceMappingURL=fast_sprite_batch.d.ts.map