export class FilterTexture {
    /**
     * TBD.
     * @param {WebGLRenderingContext & { id: number }} gl - TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     * @param {number} scaleMode - TBD.
     */
    constructor(gl: WebGLRenderingContext & {
        id: number;
    }, width: number, height: number, scaleMode: number);
    gl: WebGLRenderingContext & {
        id: number;
    };
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