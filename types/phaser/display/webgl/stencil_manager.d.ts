export class WebGLStencilManager {
    stencilStack: any[];
    reverse: boolean;
    count: number;
    /**
     * TBD.
     * @param {WebGLRenderingContext} gl - TBD.
     */
    setContext(gl: WebGLRenderingContext): void;
    gl: WebGLRenderingContext;
    /**
     * TBD.
     */
    destroy(): void;
    /**
     * TBD.
     * @param graphics - TBD.
     * @param webGLData
     * @param {object} renderSession - TBD.
     */
    pushStencil(graphics: any, webGLData: any, renderSession: object): void;
    /**
     * TBD.
     * @param graphics - TBD.
     * @param webGLData
     * @param {object} renderSession - TBD.
     */
    bindGraphics(graphics: any, webGLData: any, renderSession: object): void;
    /**
     * TBD.
     * @param graphics - TBD.
     * @param webGLData
     * @param {object} renderSession - TBD.
     */
    popStencil(graphics: any, webGLData: any, renderSession: object): void;
}
//# sourceMappingURL=stencil_manager.d.ts.map