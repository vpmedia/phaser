export class AbstractFilter {
    /**
     * Creates a new AbstractFilter instance.
     * @param {string[]} fragmentSrc - The fragment shader source.
     * @param {object} uniforms - The uniform variables for the shader.
     */
    constructor(fragmentSrc: string[], uniforms: object);
    passes: this[];
    shaders: any[];
    dirty: boolean;
    padding: number;
    uniforms: any;
    fragmentSrc: string[];
    /**
     * Initializes the filter.
     */
    syncUniforms(): void;
}
//# sourceMappingURL=abstract_filter.d.ts.map