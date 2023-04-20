export class WebGLStencilManager {
    stencilStack: any[];
    reverse: boolean;
    count: number;
    /**
     * TBD.
     * @param gl - TBD.
     */
    setContext(gl: any): void;
    gl: any;
    /**
     * TBD.
     */
    destroy(): void;
    /**
     * TBD.
     * @param graphics - TBD.
     * @param webGLData
     * @param renderSession - TBD.
     */
    pushStencil(graphics: any, webGLData: any, renderSession: any): void;
    /**
     * TBD.
     * @param graphics - TBD.
     * @param webGLData
     * @param renderSession - TBD.
     */
    bindGraphics(graphics: any, webGLData: any, renderSession: any): void;
    /**
     * TBD.
     * @param graphics - TBD.
     * @param webGLData
     * @param renderSession - TBD.
     */
    popStencil(graphics: any, webGLData: any, renderSession: any): void;
}
//# sourceMappingURL=stencil_manager.d.ts.map