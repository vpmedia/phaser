// No error has been recorded. The value of this constant is 0.
export const NO_ERROR = 0;
// An unacceptable value has been specified for an enumerated argument. The command is ignored and the error flag is set.
export const INVALID_ENUM = 0x0500;
// A numeric argument is out of range. The command is ignored and the error flag is set.
export const INVALID_VALUE = 0x0501;
// The specified command is not allowed for the current state. The command is ignored and the error flag is set.
export const INVALID_OPERATION = 0x0502;
// The currently bound framebuffer is not framebuffer complete when trying to render to or to read from it.
export const INVALID_FRAMEBUFFER_OPERATION = 0x0506;
// Not enough memory is left to execute the command.
export const OUT_OF_MEMORY = 0x0505;
// If the WebGL context is lost, this error is returned on the first call to getError. Afterwards and until the context has been restored, it returns gl.NO_ERROR.
export const CONTEXT_LOST_WEBGL = 0x9242;

/**
 * TBD.
 * @param {WebGLRenderingContext} gl - TBD.
 * @returns {number} TBD.
 */
export function getWebGLContextErrorCode(gl) {
  return gl?.getError() ?? 0;
}

/**
 * TBD.
 * @param {number} errorCode - TBD.
 * @returns {string} TBD.
 */
export function getWebGLContextErrorName(errorCode) {
  switch (errorCode) {
    case NO_ERROR:
      return 'NO_ERROR';
    case INVALID_ENUM:
      return 'INVALID_ENUM';
    case INVALID_VALUE:
      return 'INVALID_VALUE';
    case INVALID_OPERATION:
      return 'INVALID_OPERATION';
    case INVALID_FRAMEBUFFER_OPERATION:
      return 'INVALID_FRAMEBUFFER_OPERATION';
    case OUT_OF_MEMORY:
      return 'OUT_OF_MEMORY';
    case CONTEXT_LOST_WEBGL:
      return 'CONTEXT_LOST_WEBGL';
    default:
      return `UNKNOWN_ERROR_${errorCode}`;
  }
}

/**
 * TBD.
 */
export function initDefaultShaders() {}

/**
 * TBD.
 * @param {WebGLRenderingContext} gl - TBD.
 * @param {string[]|string} shaderSrc - TBD.
 * @param {object} shaderType - TBD.
 * @returns {WebGLShader} TBD.
 */
export function compileShader(gl, shaderSrc, shaderType) {
  let src = shaderSrc;
  if (Array.isArray(shaderSrc)) {
    src = shaderSrc.join('\n');
  }
  const shader = gl.createShader(shaderType);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    if (!window.PhaserRegistry) {
      window.PhaserRegistry = {};
    }
    window.PhaserRegistry.GL_SHADER_INFO_LOG = gl.getShaderInfoLog(shader);
    return null;
  }
  return shader;
}

/**
 * TBD.
 * @param {WebGLRenderingContext} gl - TBD.
 * @param {string[]|string} shaderSrc - TBD.
 * @returns {WebGLShader} TBD.
 */
export function compileVertexShader(gl, shaderSrc) {
  return compileShader(gl, shaderSrc, gl.VERTEX_SHADER);
}

/**
 * TBD.
 * @param {WebGLRenderingContext} gl - TBD.
 * @param {string[]|string} shaderSrc - TBD.
 * @returns {WebGLShader} TBD.
 */
export function compileFragmentShader(gl, shaderSrc) {
  return compileShader(gl, shaderSrc, gl.FRAGMENT_SHADER);
}

/**
 * TBD.
 * @param {WebGLRenderingContext} gl - TBD.
 * @param {string[]|string} vertexSrc - TBD.
 * @param {string[]|string} fragmentSrc - TBD.
 * @returns {WebGLProgram} TBD.
 */
export function compileProgram(gl, vertexSrc, fragmentSrc) {
  const fragmentShader = compileFragmentShader(gl, fragmentSrc);
  const vertexShader = compileVertexShader(gl, vertexSrc);

  const shaderProgram = gl.createProgram();

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    if (!window.PhaserRegistry) {
      window.PhaserRegistry = {};
    }
    window.PhaserRegistry.GL_PROGRAM_INFO_LOG = gl.getProgramInfoLog(shaderProgram);
  }
  return shaderProgram;
}
