export const NO_ERROR: 0;
export const INVALID_ENUM: 1280;
export const INVALID_VALUE: 1281;
export const INVALID_OPERATION: 1282;
export const INVALID_FRAMEBUFFER_OPERATION: 1286;
export const OUT_OF_MEMORY: 1285;
export const CONTEXT_LOST_WEBGL: 37442;
export function getWebGLContextErrorCode(gl: WebGLRenderingContext): number;
export function getWebGLContextErrorName(errorCode: number): string;
export function initDefaultShaders(): void;
export function compileShader(gl: WebGLRenderingContext, shaderSrc: string[] | string, shaderType: object): WebGLShader;
export function compileVertexShader(gl: WebGLRenderingContext, shaderSrc: string[] | string): WebGLShader;
export function compileFragmentShader(gl: WebGLRenderingContext, shaderSrc: string[] | string): WebGLShader;
export function compileProgram(gl: WebGLRenderingContext, vertexSrc: string[] | string, fragmentSrc: string[] | string): WebGLProgram;
//# sourceMappingURL=util.d.ts.map