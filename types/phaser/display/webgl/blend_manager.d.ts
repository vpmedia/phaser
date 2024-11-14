export class WebGLBlendModeManager {
    gl: WebGLRenderingContext;
    currentBlendMode: number;
    /**
     * TBD.
     * @param {WebGLRenderingContext} gl - TBD.
     */
    setContext(gl: WebGLRenderingContext): void;
    /**
     * TBD.
     * @param {number} blendMode - TBD.
     * @returns {boolean} TBD.
     */
    setBlendMode(blendMode: number): boolean;
    /**
     * TBD.
     */
    destroy(): void;
}
//# sourceMappingURL=blend_manager.d.ts.map