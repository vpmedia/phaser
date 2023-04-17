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
    setContext(gl: any): void;
    gl: any;
    vertexBuffer: any;
    indexBuffer: any;
    currentBlendMode: number | undefined;
    begin(renderSession: any): void;
    renderSession: any;
    shader: any;
    end(): void;
    render(sprite: any, matrix: any): void;
    renderTilingSprite(): void;
    flush(): void;
    renderBatch(texture: any, size: any, startIndex: any): void;
    stop(): void;
    start(): void;
    destroy(): void;
}
import { AbstractFilter } from './abstract_filter';
//# sourceMappingURL=sprite_batch.d.ts.map