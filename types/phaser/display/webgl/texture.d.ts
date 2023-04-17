export class TextureUvs {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x3: number;
    y3: number;
}
export class Texture {
    constructor(baseTexture: any, frame: any, crop: any, trim: any);
    noFrame: boolean;
    baseTexture: any;
    frame: any;
    trim: any;
    valid: boolean;
    isTiling: boolean;
    requiresUpdate: boolean;
    requiresReTint: boolean;
    _uvs: TextureUvs | null;
    width: number;
    height: number;
    crop: any;
    onBaseTextureLoaded(): void;
    destroy(destroyBase?: boolean): void;
    setFrame(frame: any): void;
    _updateUvs(): void;
}
//# sourceMappingURL=texture.d.ts.map