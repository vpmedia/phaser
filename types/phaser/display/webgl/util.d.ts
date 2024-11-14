/**
 * TBD.
 * @param {WebGLRenderingContext} gl - TBD.
 * @returns {number} TBD.
 */
export function getWebGLContextErrorCode(gl: WebGLRenderingContext): number;
/**
 * TBD.
 */
export function initDefaultShaders(): void;
/**
 * TBD.
 * @param {WebGLRenderingContext} gl - TBD.
 * @param {string[]|string} shaderSrc - TBD.
 * @param {object} shaderType - TBD.
 * @returns {WebGLShader} TBD.
 */
export function compileShader(gl: WebGLRenderingContext, shaderSrc: string[] | string, shaderType: object): WebGLShader;
/**
 * TBD.
 * @param {WebGLRenderingContext} gl - TBD.
 * @param {string[]|string} shaderSrc - TBD.
 * @returns {WebGLShader} TBD.
 */
export function compileVertexShader(gl: WebGLRenderingContext, shaderSrc: string[] | string): WebGLShader;
/**
 * TBD.
 * @param {WebGLRenderingContext} gl - TBD.
 * @param {string[]|string} shaderSrc - TBD.
 * @returns {WebGLShader} TBD.
 */
export function compileFragmentShader(gl: WebGLRenderingContext, shaderSrc: string[] | string): WebGLShader;
/**
 * TBD.
 * @param {WebGLRenderingContext} gl - TBD.
 * @param {string[]|string} vertexSrc - TBD.
 * @param {string[]|string} fragmentSrc - TBD.
 * @returns {WebGLProgram} TBD.
 */
export function compileProgram(gl: WebGLRenderingContext, vertexSrc: string[] | string, fragmentSrc: string[] | string): WebGLProgram;
//# sourceMappingURL=util.d.ts.map