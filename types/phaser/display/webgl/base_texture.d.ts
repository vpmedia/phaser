export class BaseTexture {
    /**
     * TBD.
     * @param source - TBD.
     * @param scaleMode - TBD.
     */
    constructor(source: any, scaleMode: any);
    resolution: number;
    width: any;
    height: any;
    scaleMode: any;
    hasLoaded: boolean;
    source: any;
    premultipliedAlpha: boolean;
    _glTextures: any[];
    mipmap: boolean;
    skipRender: boolean;
    _powerOf2: boolean;
    _dirty: boolean[];
    /**
     * TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    forceLoaded(width: number, height: number): void;
    /**
     * TBD.
     */
    destroy(): void;
    /**
     * TBD.
     */
    dirty(): void;
    /**
     * TBD.
     */
    unloadFromGPU(): void;
}
//# sourceMappingURL=base_texture.d.ts.map