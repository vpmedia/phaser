export class WebGLStencilManager {
    stencilStack: any[];
    reverse: boolean;
    count: number;
    /**
     * Binds the stencil buffer for rendering.
     * @param {WebGLRenderingContext} gl - The WebGL rendering context.
     */
    setContext(gl: WebGLRenderingContext): void;
    gl: WebGLRenderingContext;
    /**
     * Sets up the stencil buffer for rendering.
     */
    destroy(): void;
    /**
     * Renders the stencil buffer for graphics.
     * @param {import('../graphics.js').Graphics} graphics - The graphics object to render.
     * @param {import('./graphics_data.js').GraphicsData} webGLData - The WebGL graphics data.
     * @param {object} renderSession - The rendering session.
     */
    pushStencil(graphics: import("../graphics.js").Graphics, webGLData: import("./graphics_data.js").GraphicsData, renderSession: object): void;
    /**
     * Renders the stencil buffer for graphics.
     * @param {import('../graphics.js').Graphics} graphics - The graphics object to render.
     * @param {import('./graphics_data.js').GraphicsData} webGLData - The WebGL graphics data.
     * @param {object} renderSession - The rendering session.
     */
    bindGraphics(graphics: import("../graphics.js").Graphics, webGLData: import("./graphics_data.js").GraphicsData, renderSession: object): void;
    /**
     * Renders the stencil buffer for graphics.
     * @param {import('../graphics.js').Graphics} graphics - The graphics object to render.
     * @param {import('./graphics_data.js').GraphicsData} webGLData - The WebGL graphics data.
     * @param {object} renderSession - The rendering session.
     */
    popStencil(graphics: import("../graphics.js").Graphics, webGLData: import("./graphics_data.js").GraphicsData, renderSession: object): void;
}
//# sourceMappingURL=stencil_manager.d.ts.map