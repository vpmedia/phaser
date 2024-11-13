export class WebGLBlendModeManager {
    gl: WebGLRenderingContext & {
        id: number;
    };
    currentBlendMode: number;
    /**
     * TBD.
     * @param {WebGLRenderingContext & { id: number }} gl - TBD.
     */
    setContext(gl: WebGLRenderingContext & {
        id: number;
    }): void;
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