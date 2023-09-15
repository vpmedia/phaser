export class WebGLSpriteBatch {
    vertSize: number;
    size: number;
    vertices: ArrayBuffer;
    positions: Float32Array;
    colors: Uint32Array;
    indices: Uint16Array;
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
     * TBD.
     * @param {WebGLRenderingContext} gl - TBD.
     */
    setContext(gl: WebGLRenderingContext): void;
    gl: WebGLRenderingContext;
    vertexBuffer: WebGLBuffer;
    indexBuffer: WebGLBuffer;
    currentBlendMode: number;
    /**
     * TBD.
     * @param {object} renderSession - TBD.
     */
    begin(renderSession: object): void;
    renderSession: any;
    shader: any;
    /**
     * TBD.
     */
    end(): void;
    /**
     * TBD.
     * @param {import('../../display/image.js').Image} sprite - TBD.
     * @param {import('../../geom/matrix.js').Matrix} matrix - TBD.
     */
    render(sprite: import('../../display/image.js').Image, matrix: import('../../geom/matrix.js').Matrix): void;
    /**
     * TBD.
     */
    renderTilingSprite(): void;
    /**
     * TBD.
     */
    flush(): void;
    /**
     * TBD.
     * @param {import('./base_texture').BaseTexture} texture - TBD.
     * @param {number} size - TBD.
     * @param {number} startIndex - TBD.
     */
    renderBatch(texture: import('./base_texture').BaseTexture, size: number, startIndex: number): void;
    /**
     * TBD.
     */
    stop(): void;
    /**
     * TBD.
     */
    start(): void;
    /**
     * TBD.
     */
    destroy(): void;
}
import { AbstractFilter } from './abstract_filter.js';
//# sourceMappingURL=sprite_batch.d.ts.map