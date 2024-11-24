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
     * TBD.
     * @param {WebGLRenderingContext & { id: number }} gl - TBD.
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
    render(sprite: import("../../display/image.js").Image, matrix: import("../../geom/matrix.js").Matrix): void;
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
     * @param {import('./base_texture.js').BaseTexture} texture - TBD.
     * @param {number} size - TBD.
     * @param {number} startIndex - TBD.
     */
    renderBatch(texture: import("./base_texture.js").BaseTexture, size: number, startIndex: number): void;
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