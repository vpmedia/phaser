export class PrimitiveShader {
    /**
     * TBD.
     * @param gl - TBD.
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
    projectionVector: any;
    offsetVector: any;
    tintColor: any;
    flipY: any;
    aVertexPosition: any;
    colorAttribute: any;
    attributes: any[];
    translationMatrix: any;
    alpha: any;
    /**
     * TBD.
     */
    destroy(): void;
    uniforms: any;
}
//# sourceMappingURL=primitive.d.ts.map