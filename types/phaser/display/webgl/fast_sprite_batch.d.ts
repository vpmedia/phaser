export class FastSpriteBatch {
    /**
     * Creates a new FastSpriteBatch instance.
     * @param {WebGLRenderingContext & { id: number }} gl - The WebGL rendering context.
     */
    constructor(gl: WebGLRenderingContext & {
        id: number;
    });
    vertSize: number;
    maxSize: number;
    size: number;
    vertices: Float32Array<ArrayBuffer>;
    indices: Uint16Array<ArrayBuffer>;
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
     * Sets the WebGL context for this batch.
     * @param {WebGLRenderingContext & { id: number }} gl - The WebGL rendering context.
     */
    setContext(gl: WebGLRenderingContext & {
        id: number;
    }): void;
    gl: WebGLRenderingContext & {
        id: number;
    };
    /**
     * Renders a sprite batch using WebGL.
     * @param {object} spriteBatch - The sprite batch to render.
     * @param {object} renderSession - The render session to use.
     */
    begin(spriteBatch: object, renderSession: object): void;
    /**
     * Updates the sprite batch.
     */
    end(): void;
    /**
     * Flushes the sprite batch to WebGL.
     * @param {object} spriteBatch - The sprite batch to flush.
     */
    render(spriteBatch: object): void;
    /**
     * Renders a sprite using WebGL.
     * @param {import('../../display/image.js').Image} sprite - The sprite to render.
     */
    renderSprite(sprite: import("../../display/image.js").Image): void;
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