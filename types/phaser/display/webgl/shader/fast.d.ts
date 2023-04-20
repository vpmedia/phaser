export class FastShader {
    /**
     * TBD.
     * @param gl
     */
    constructor(gl: any);
    gl: any;
    _UID: string;
    program: any;
    textureCount: number;
    fragmentSrc: string[];
    vertexSrc: string[];
    /**
     * TBD.
     */
    init(): void;
    uSampler: any;
    projectionVector: any;
    offsetVector: any;
    dimensions: any;
    uMatrix: any;
    aVertexPosition: any;
    aPositionCoord: any;
    aScale: any;
    aRotation: any;
    aTextureCoord: any;
    colorAttribute: any;
    attributes: any[];
    /**
     * TBD.
     */
    destroy(): void;
    uniforms: any;
}
//# sourceMappingURL=fast.d.ts.map