export class WebGLFilterManager {
    filterStack: any[];
    offsetX: number;
    offsetY: number;
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
    texturePool: any[];
    /**
     * TBD.
     */
    begin(): void;
    /**
     * TBD.
     */
    pushFilter(): void;
    /**
     * TBD.
     */
    popFilter(): void;
    /**
     * TBD.
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