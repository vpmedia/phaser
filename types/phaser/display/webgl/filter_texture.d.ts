export class FilterTexture {
    /**
     * Creates a new FilterTexture instance.
     * @param {WebGLRenderingContext} gl - The WebGL rendering context.
     * @param {number} width - The width of the filter texture.
     * @param {number} height - The height of the filter texture.
     * @param {number} scaleMode - The scale mode to use.
     */
    constructor(gl: WebGLRenderingContext, width: number, height: number, scaleMode: number);
    gl: WebGLRenderingContext;
    frameBuffer: WebGLFramebuffer;
    texture: WebGLTexture;
    renderBuffer: WebGLRenderbuffer;
    /**
     * Destroys this filter texture and cleans up resources.
     */
    clear(): void;
    /**
     * Updates the size of this filter texture.
     * @param {number} width - The new width of the filter texture.
     * @param {number} height - The new height of the filter texture.
     */
    resize(width: number, height: number): void;
    width: any;
    height: number;
    /**
     * Updates the resolution of this filter texture.
     */
    destroy(): void;
}
//# sourceMappingURL=filter_texture.d.ts.map