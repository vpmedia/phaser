export class StripShader {
    /**
     * TBD.
     * @param gl
     */
    constructor(gl: any);
    gl: any;
    _UID: string;
    program: any;
    fragmentSrc: string[];
    vertexSrc: string[];
    /**
     * TBD.
     */
    init(): void;
    uSampler: any;
    projectionVector: any;
    offsetVector: any;
    colorAttribute: any;
    aVertexPosition: any;
    aTextureCoord: any;
    attributes: any[];
    translationMatrix: any;
    alpha: any;
    /**
     * TBD.
     */
    destroy(): void;
    uniforms: any;
    attribute: any;
}
//# sourceMappingURL=strip.d.ts.map