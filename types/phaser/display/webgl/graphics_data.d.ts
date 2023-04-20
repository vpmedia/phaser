export class GraphicsData {
    /**
     * TBD.
     * @param gl - TBD.
     */
    constructor(gl: any);
    gl: any;
    color: number[];
    points: any[];
    indices: any[];
    buffer: any;
    indexBuffer: any;
    mode: number;
    alpha: number;
    dirty: boolean;
    /**
     * TBD.
     */
    reset(): void;
    glPoints: Float32Array;
    glIndicies: Uint16Array;
    /**
     * TBD.
     */
    upload(): void;
}
//# sourceMappingURL=graphics_data.d.ts.map