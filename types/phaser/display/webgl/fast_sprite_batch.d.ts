/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Mat Groves http://matgroves.com/ @Doormat23
 */
export class FastSpriteBatch {
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
    setContext(gl: any): void;
    gl: any;
    begin(spriteBatch: any, renderSession: any): void;
    end(): void;
    render(spriteBatch: any): void;
    renderSprite(sprite: any): void;
    flush(): void;
    stop(): void;
    start(): void;
}
//# sourceMappingURL=fast_sprite_batch.d.ts.map