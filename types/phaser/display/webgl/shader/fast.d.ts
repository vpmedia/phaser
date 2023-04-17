export class FastShader {
    constructor(gl: any);
    gl: any;
    _UID: string;
    program: object | null;
    textureCount: number;
    fragmentSrc: string[];
    vertexSrc: string[];
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
    attributes: any[] | null | undefined;
    destroy(): void;
    uniforms: any;
}
//# sourceMappingURL=fast.d.ts.map