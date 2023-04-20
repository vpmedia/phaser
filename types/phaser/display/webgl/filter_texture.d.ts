export class FilterTexture {
    /**
     * TBD.
     * @param gl - TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     * @param scaleMode
     */
    constructor(gl: any, width: number, height: number, scaleMode: any);
    gl: any;
    frameBuffer: any;
    texture: any;
    renderBuffer: any;
    /**
     * TBD.
     */
    clear(): void;
    /**
     * TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    resize(width: number, height: number): void;
    width: any;
    height: number;
    /**
     * TBD.
     */
    destroy(): void;
}
//# sourceMappingURL=filter_texture.d.ts.map