/**
 * TBD.
 */
export function initDefaultShaders(): void;
/**
 * TBD.
 * @param {WebGLRenderingContext & { id: number }} gl - TBD.
 * @param {string[]|string} shaderSrc - TBD.
 * @param {object} shaderType - TBD.
 * @returns {WebGLShader} TBD.
 */
export function compileShader(gl: WebGLRenderingContext & {
    id: number;
}, shaderSrc: string[] | string, shaderType: object): WebGLShader;
/**
 * TBD.
 * @param {WebGLRenderingContext & { id: number }} gl - TBD.
 * @param {string[]|string} shaderSrc - TBD.
 * @returns {WebGLShader} TBD.
 */
export function compileVertexShader(gl: WebGLRenderingContext & {
    id: number;
}, shaderSrc: string[] | string): WebGLShader;
/**
 * TBD.
 * @param {WebGLRenderingContext & { id: number }} gl - TBD.
 * @param {string[]|string} shaderSrc - TBD.
 * @returns {WebGLShader} TBD.
 */
export function compileFragmentShader(gl: WebGLRenderingContext & {
    id: number;
}, shaderSrc: string[] | string): WebGLShader;
/**
 * TBD.
 * @param {WebGLRenderingContext & { id: number }} gl - TBD.
 * @param {string[]|string} vertexSrc - TBD.
 * @param {string[]|string} fragmentSrc - TBD.
 * @returns {WebGLProgram} TBD.
 */
export function compileProgram(gl: WebGLRenderingContext & {
    id: number;
}, vertexSrc: string[] | string, fragmentSrc: string[] | string): WebGLProgram;
//# sourceMappingURL=util.d.ts.map