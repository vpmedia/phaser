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
     * @param {GraphicsData} webGLData - TBD.
     * @param {object} renderSession - TBD.
     */
    pushStencil(graphics: any, webGLData: GraphicsData, renderSession: object): void;
    /**
     * TBD.
     * @param graphics - TBD.
     * @param {GraphicsData} webGLData - TBD.
     * @param {object} renderSession - TBD.
     */
    bindGraphics(graphics: any, webGLData: GraphicsData, renderSession: object): void;
    /**
     * TBD.
     * @param graphics - TBD.
     * @param {GraphicsData} webGLData - TBD.
     * @param {object} renderSession - TBD.
     */
    popStencil(graphics: any, webGLData: GraphicsData, renderSession: object): void;
}
import { GraphicsData } from './graphics_data';
//# sourceMappingURL=stencil_manager.d.ts.map