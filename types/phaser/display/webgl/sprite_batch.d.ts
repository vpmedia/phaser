export class WebGLSpriteBatch {
    vertSize: number;
    size: number;
    vertices: ArrayBuffer;
    positions: Float32Array<ArrayBuffer>;
    colors: Uint32Array<ArrayBuffer>;
    indices: Uint16Array<ArrayBuffer>;
    lastIndexCount: number;
    drawing: boolean;
    currentBatchSize: number;
    currentBaseTexture: any;
    dirty: boolean;
    textures: any[];
    blendModes: any[];
    shaders: any[];
    sprites: any[];
    defaultShader: AbstractFilter;
    /**
     * Renders a sprite using WebGL.
     * @param {WebGLRenderingContext & { id: number }} gl - The WebGL rendering context.
     */
    setContext(gl: WebGLRenderingContext & {
        id: number;
    }): void;
    gl: WebGLRenderingContext & {
        id: number;
    };
    vertexBuffer: WebGLBuffer;
    indexBuffer: WebGLBuffer;
    currentBlendMode: number;
    /**
     * Renders the sprite batch using WebGL.
     * @param {object} renderSession - The render session to use.
     */
    begin(renderSession: object): void;
    renderSession: any;
    shader: any;
    /**
     * Updates the sprite batch.
     */
    end(): void;
    /**
     * Renders a sprite using the sprite batch.
     * @param {import('../../display/image.js').Image} sprite - The sprite to render.
     * @param {import('../../geom/matrix.js').Matrix} matrix - The transformation matrix.
     */
    render(sprite: import("../../display/image.js").Image, matrix: import("../../geom/matrix.js").Matrix): void;
    /**
     * Binds the sprite batch to the WebGL context.
     */
    renderTilingSprite(): void;
    /**
     * Updates the sprite batch.
     */
    flush(): void;
    /**
     * Updates the sprite batch with a new texture.
     * @param {import('./base_texture.js').BaseTexture} texture - The texture to use.
     * @param {number} size - The size of the batch.
     * @param {number} startIndex - The start index in the batch.
     */
    renderBatch(texture: import("./base_texture.js").BaseTexture, size: number, startIndex: number): void;
    /**
     * Destroys this sprite batch and cleans up resources.
     */
    stop(): void;
    /**
     * Renders the sprite batch using Canvas.
     */
    start(): void;
    /**
     * Destroys the sprite batch instance.
     */
    destroy(): void;
}
import { AbstractFilter } from './abstract_filter.js';
//# sourceMappingURL=sprite_batch.d.ts.map