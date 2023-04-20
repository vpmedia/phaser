export class WebGLStencilManager {
    stencilStack: any[];
    reverse: boolean;
    count: number;
    /**
     * TBD.
     * @param gl
     */
    setContext(gl: any): void;
    gl: any;
    /**
     * TBD.
     */
    destroy(): void;
    /**
     * TBD.
     * @param graphics
     * @param webGLData
     * @param renderSession
     */
    pushStencil(graphics: any, webGLData: any, renderSession: any): void;
    /**
     * TBD.
     * @param graphics
     * @param webGLData
     * @param renderSession
     */
    bindGraphics(graphics: any, webGLData: any, renderSession: any): void;
    /**
     * TBD.
     * @param graphics
     * @param webGLData
     * @param renderSession
     */
    popStencil(graphics: any, webGLData: any, renderSession: any): void;
}
//# sourceMappingURL=stencil_manager.d.ts.map