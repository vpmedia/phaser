export class NormalShader {
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
    init(): void;
    uSampler: any;
    projectionVector: any;
    offsetVector: any;
    dimensions: any;
    aVertexPosition: any;
    aTextureCoord: any;
    colorAttribute: any;
    initUniforms(): void;
    initSampler2D(uniform: any): void;
    syncUniforms(): void;
    destroy(): void;
}
//# sourceMappingURL=normal.d.ts.map