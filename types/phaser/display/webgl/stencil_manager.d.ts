export class WebGLStencilManager {
    stencilStack: any[];
    reverse: boolean;
    count: number;
    /**
     * TBD.
     * @param {WebGLRenderingContext & { id: number }} gl - TBD.
     */
    setContext(gl: WebGLRenderingContext & {
        id: number;
    }): void;
    gl: WebGLRenderingContext & {
        id: number;
    };
    /**
     * TBD.
     */
    destroy(): void;
    /**
     * TBD.
     * @param {import('../graphics.js').Graphics} graphics - TBD.
     * @param {import('./graphics_data.js').GraphicsData} webGLData - TBD.
     * @param {object} renderSession - TBD.
     */
    pushStencil(graphics: import("../graphics.js").Graphics, webGLData: import("./graphics_data.js").GraphicsData, renderSession: object): void;
    /**
     * TBD.
     * @param {import('../graphics.js').Graphics} graphics - TBD.
     * @param {import('./graphics_data.js').GraphicsData} webGLData - TBD.
     * @param {object} renderSession - TBD.
     */
    bindGraphics(graphics: import("../graphics.js").Graphics, webGLData: import("./graphics_data.js").GraphicsData, renderSession: object): void;
    /**
     * TBD.
     * @param {import('../graphics.js').Graphics} graphics - TBD.
     * @param {import('./graphics_data.js').GraphicsData} webGLData - TBD.
     * @param {object} renderSession - TBD.
     */
    popStencil(graphics: import("../graphics.js").Graphics, webGLData: import("./graphics_data.js").GraphicsData, renderSession: object): void;
}
//# sourceMappingURL=stencil_manager.d.ts.map