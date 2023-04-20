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
     * @param gl
     */
    setContext(gl: any): void;
    gl: any;
    vertexBuffer: any;
    indexBuffer: any;
    currentBlendMode: number;
    /**
     * TBD.
     * @param renderSession
     */
    begin(renderSession: any): void;
    renderSession: any;
    shader: any;
    /**
     * TBD.
     */
    end(): void;
    /**
     * TBD.
     * @param sprite
     * @param matrix
     */
    render(sprite: any, matrix: any): void;
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
     * @param texture
     * @param size
     * @param startIndex
     */
    renderBatch(texture: any, size: any, startIndex: any): void;
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