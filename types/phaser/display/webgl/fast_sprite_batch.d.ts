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
     * @param spriteBatch - TBD.
     * @param {object} renderSession - TBD.
     */
    begin(spriteBatch: any, renderSession: object): void;
    /**
     * TBD.
     */
    end(): void;
    /**
     * TBD.
     * @param spriteBatch - TBD.
     */
    render(spriteBatch: any): void;
    /**
     * TBD.
     * @param sprite - TBD.
     */
    renderSprite(sprite: any): void;
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