/**
 * TBD.
 * @param {WebGLRenderingContext} gl - TBD.
 * @returns {number} TBD.
 */
export function getWebGLContextErrorCode(gl: WebGLRenderingContext): number;
/**
 * TBD.
 * @param {number} errorCode - TBD.
 * @returns {string} TBD.
 */
export function getWebGLContextErrorName(errorCode: number): string;
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
export const NO_ERROR: 0;
export const INVALID_ENUM: 1280;
export const INVALID_VALUE: 1281;
export const INVALID_OPERATION: 1282;
export const INVALID_FRAMEBUFFER_OPERATION: 1286;
export const OUT_OF_MEMORY: 1285;
export const CONTEXT_LOST_WEBGL: 37442;
//# sourceMappingURL=util.d.ts.map