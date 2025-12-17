export class BaseTexture {
    /**
     * Updates the base texture with a new source.
     * @param {HTMLCanvasElement} source - The new canvas element to use as the texture source.
     * @param {number} [scaleMode] - The scale mode to use for the texture.
     */
    constructor(source: HTMLCanvasElement, scaleMode?: number);
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
     * Updates the base texture with new dimensions.
     * @param {number} width - The new width of the texture.
     * @param {number} height - The new height of the texture.
     */
    forceLoaded(width: number, height: number): void;
    /**
     * Destroys the texture.
     */
    destroy(): void;
    /**
     * Marks the texture as dirty.
     */
    dirty(): void;
    /**
     * Unloads the texture from the GPU.
     */
    unloadFromGPU(): void;
}
//# sourceMappingURL=base_texture.d.ts.map