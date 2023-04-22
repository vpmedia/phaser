export class FilterTexture {
    /**
     * TBD.
     * @param {WebGLRenderingContext} gl - TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     * @param {number} scaleMode - TBD.
     */
    constructor(gl: WebGLRenderingContext, width: number, height: number, scaleMode: number);
    gl: WebGLRenderingContext;
    frameBuffer: WebGLFramebuffer;
    texture: WebGLTexture;
    renderBuffer: WebGLRenderbuffer;
    /**
     * TBD.
     */
    clear(): void;
    /**
     * TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    resize(width: number, height: number): void;
    width: any;
    height: number;
    /**
     * TBD.
     */
    destroy(): void;
}
//# sourceMappingURL=filter_texture.d.ts.map