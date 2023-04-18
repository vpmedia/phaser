/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * TBD.
 */
export function initDefaultShaders() {}

/**
 * TBD.
 * @param {object} gl - TBD.
 * @param {string[]|string} shaderSrc - TBD.
 * @param {object} shaderType - TBD.
 * @returns {object} TBD.
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
    if (window.PhaserRegistry) {
      window.PhaserRegistry.GL_SHADER_INFO_LOG = gl.getShaderInfoLog(shader);
    }
    return null;
  }
  return shader;
}

/**
 * TBD.
 * @param {object} gl - TBD.
 * @param {string[]|string} shaderSrc - TBD.
 * @returns {object} TBD.
 */
export function compileVertexShader(gl, shaderSrc) {
  return compileShader(gl, shaderSrc, gl.VERTEX_SHADER);
}

/**
 * TBD.
 * @param {object} gl - TBD.
 * @param {string[]|string} shaderSrc - TBD.
 * @returns {object} TBD.
 */
export function compileFragmentShader(gl, shaderSrc) {
  return compileShader(gl, shaderSrc, gl.FRAGMENT_SHADER);
}

/**
 * TBD.
 * @param {object} gl - TBD.
 * @param {string[]|string} vertexSrc - TBD.
 * @param {string[]|string} fragmentSrc - TBD.
 * @returns {object} TBD.
 */
export function compileProgram(gl, vertexSrc, fragmentSrc) {
  const fragmentShader = compileFragmentShader(gl, fragmentSrc);
  const vertexShader = compileVertexShader(gl, vertexSrc);

  const shaderProgram = gl.createProgram();

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    if (window.PhaserRegistry) {
      window.PhaserRegistry.GL_PROGRAM_INFO_LOG = gl.getProgramInfoLog(shaderProgram);
    }
  }
  return shaderProgram;
}
