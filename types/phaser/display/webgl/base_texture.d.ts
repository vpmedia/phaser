export class BaseTexture {
    /**
     * TBD.
     * @param {HTMLCanvasElement} source - TBD.
     * @param {number} scaleMode - TBD.
     */
    constructor(source: HTMLCanvasElement, scaleMode: number);
    resolution: number;
    width: any;
    height: any;
    scaleMode: any;
    hasLoaded: boolean;
    source: HTMLCanvasElement;
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