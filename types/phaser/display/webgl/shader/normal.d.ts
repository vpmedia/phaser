export class NormalShader {
    /**
     * TBD.
     * @param gl - TBD.
     */
    constructor(gl: any);
    gl: any;
    _UID: string;
    program: any;
    fragmentSrc: string[];
    textureCount: number;
    firstRun: boolean;
    dirty: boolean;
    uniforms: {};
    attributes: any[];
    /**
     * TBD.
     */
    init(): void;
    uSampler: any;
    projectionVector: any;
    offsetVector: any;
    dimensions: any;
    aVertexPosition: any;
    aTextureCoord: any;
    colorAttribute: any;
    /**
     * TBD.
     */
    initUniforms(): void;
    /**
     * TBD.
     * @param uniform
     */
    initSampler2D(uniform: any): void;
    /**
     * TBD.
     */
    syncUniforms(): void;
    /**
     * TBD.
     */
    destroy(): void;
}
//# sourceMappingURL=normal.d.ts.map