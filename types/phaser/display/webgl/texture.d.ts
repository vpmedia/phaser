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
    /**
     * TBD.
     * @param baseTexture
     * @param frame
     * @param crop
     * @param trim
     */
    constructor(baseTexture: any, frame: any, crop: any, trim: any);
    noFrame: boolean;
    baseTexture: any;
    frame: any;
    trim: any;
    valid: boolean;
    isTiling: boolean;
    requiresUpdate: boolean;
    requiresReTint: boolean;
    _uvs: TextureUvs;
    width: number;
    height: number;
    crop: any;
    /**
     * TBD.
     */
    onBaseTextureLoaded(): void;
    /**
     * TBD.
     * @param destroyBase
     */
    destroy(destroyBase?: boolean): void;
    /**
     * TBD.
     * @param frame
     */
    setFrame(frame: any): void;
    /**
     * TBD.
     */
    _updateUvs(): void;
}
//# sourceMappingURL=texture.d.ts.map