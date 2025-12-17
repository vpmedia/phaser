export class WebGLBlendModeManager {
    gl: WebGLRenderingContext;
    currentBlendMode: number;
    /**
     * Initializes the blend mode manager with a WebGL context.
     * @param {WebGLRenderingContext} gl - The WebGL rendering context.
     */
    setContext(gl: WebGLRenderingContext): void;
    /**
     * Sets the blend mode for the specified WebGL context.
     * @param {number} blendMode - The blend mode to set.
     * @returns {boolean} True if the blend mode was set successfully, false otherwise.
     */
    setBlendMode(blendMode: number): boolean;
    /**
     * Sets the blend mode for the WebGL context.
     */
    destroy(): void;
}
//# sourceMappingURL=blend_manager.d.ts.map