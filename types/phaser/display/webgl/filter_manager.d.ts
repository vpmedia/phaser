export class WebGLFilterManager {
    filterStack: any[];
    offsetX: number;
    offsetY: number;
    /**
     * TBD.
     * @param gl - TBD.
     */
    setContext(gl: any): void;
    gl: any;
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