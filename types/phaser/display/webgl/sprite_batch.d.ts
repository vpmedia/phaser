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
     * @param {Image} sprite - TBD.
     * @param {import('../../geom/matrix').Matrix} matrix - TBD.
     */
    render(sprite: new (width?: number, height?: number) => HTMLImageElement, matrix: import('../../geom/matrix').Matrix): void;
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
import { AbstractFilter } from './abstract_filter';
//# sourceMappingURL=sprite_batch.d.ts.map