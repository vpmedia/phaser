/**
 * TBD.
 */
export function initDefaultShaders(): void;
/**
 * TBD.
 * @param {object} gl - TBD.
 * @param {string[]|string} shaderSrc - TBD.
 * @param {object} shaderType - TBD.
 * @returns {object} TBD.
 */
export function compileShader(gl: object, shaderSrc: string[] | string, shaderType: object): object;
/**
 * TBD.
 * @param {object} gl - TBD.
 * @param {string[]|string} shaderSrc - TBD.
 * @returns {object} TBD.
 */
export function compileVertexShader(gl: object, shaderSrc: string[] | string): object;
/**
 * TBD.
 * @param {object} gl - TBD.
 * @param {string[]|string} shaderSrc - TBD.
 * @returns {object} TBD.
 */
export function compileFragmentShader(gl: object, shaderSrc: string[] | string): object;
/**
 * TBD.
 * @param {object} gl - TBD.
 * @param {string[]|string} vertexSrc - TBD.
 * @param {string[]|string} fragmentSrc - TBD.
 * @returns {object} TBD.
 */
export function compileProgram(gl: object, vertexSrc: string[] | string, fragmentSrc: string[] | string): object;
//# sourceMappingURL=util.d.ts.map