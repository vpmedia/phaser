export class AbstractFilter {
    /**
     * TBD.
     * @param {string[]} fragmentSrc - TBD.
     * @param {object} uniforms - TBD.
     */
    constructor(fragmentSrc: string[], uniforms: object);
    passes: this[];
    shaders: any[];
    dirty: boolean;
    padding: number;
    uniforms: any;
    fragmentSrc: string[];
    /**
     * TBD.
     */
    syncUniforms(): void;
}
//# sourceMappingURL=abstract_filter.d.ts.map