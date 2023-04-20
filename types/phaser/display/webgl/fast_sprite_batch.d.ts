export class FastSpriteBatch {
    /**
     * TBD.
     * @param gl
     */
    constructor(gl: any);
    vertSize: number;
    maxSize: number;
    size: number;
    vertices: Float32Array;
    indices: Uint16Array;
    vertexBuffer: any;
    indexBuffer: any;
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
     * @param gl
     */
    setContext(gl: any): void;
    gl: any;
    /**
     * TBD.
     * @param spriteBatch
     * @param renderSession
     */
    begin(spriteBatch: any, renderSession: any): void;
    /**
     * TBD.
     */
    end(): void;
    /**
     * TBD.
     * @param spriteBatch
     */
    render(spriteBatch: any): void;
    /**
     * TBD.
     * @param sprite
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