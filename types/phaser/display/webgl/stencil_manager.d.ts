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
     * @param {Graphics} graphics - TBD.
     * @param {GraphicsData} webGLData - TBD.
     * @param {object} renderSession - TBD.
     */
    pushStencil(graphics: Graphics, webGLData: GraphicsData, renderSession: object): void;
    /**
     * TBD.
     * @param {Graphics} graphics - TBD.
     * @param {GraphicsData} webGLData - TBD.
     * @param {object} renderSession - TBD.
     */
    bindGraphics(graphics: Graphics, webGLData: GraphicsData, renderSession: object): void;
    /**
     * TBD.
     * @param {Graphics} graphics - TBD.
     * @param {GraphicsData} webGLData - TBD.
     * @param {object} renderSession - TBD.
     */
    popStencil(graphics: Graphics, webGLData: GraphicsData, renderSession: object): void;
}
import { Graphics } from '../../display/graphics';
import { GraphicsData } from './graphics_data';
//# sourceMappingURL=stencil_manager.d.ts.map