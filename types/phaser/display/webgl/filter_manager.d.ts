export class WebGLFilterManager {
    filterStack: any[];
    offsetX: number;
    offsetY: number;
    /**
     * Initializes the filter manager with a WebGL context.
     * @param {WebGLRenderingContext} gl - The WebGL rendering context.
     */
    setContext(gl: WebGLRenderingContext): void;
    gl: WebGLRenderingContext;
    texturePool: any[];
    /**
     * Applies a filter to the specified texture.
     */
    begin(): void;
    /**
     * Updates the filter texture for the specified size.
     */
    pushFilter(): void;
    /**
     * Resizes the filter manager to the specified dimensions.
     */
    popFilter(): void;
    /**
     * Destroys this filter manager and cleans up resources.
     */
    applyFilterPass(): void;
    /**
     * TBD.
     */
    initShaderBuffers(): void;
    /**
     * TBD.
     */
    destroy(): void;
}
//# sourceMappingURL=filter_manager.d.ts.map