export class AbstractFilter {
    /**
     * TBD.
     * @param fragmentSrc - TBD.
     * @param {object} uniforms - TBD.
     */
    constructor(fragmentSrc: any, uniforms: object);
    passes: AbstractFilter[];
    shaders: any[];
    dirty: boolean;
    padding: number;
    uniforms: any;
    fragmentSrc: any;
    /**
     * TBD.
     */
    syncUniforms(): void;
}
//# sourceMappingURL=abstract_filter.d.ts.map