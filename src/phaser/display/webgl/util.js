/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Mat Groves http://matgroves.com/ @Doormat23
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */

/**
 *
 */
export function initDefaultShaders() {
}

/**
 *
 * @param gl
 * @param shaderSrc
 * @param shaderType
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
    console.log(gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
}

/**
 *
 * @param gl
 * @param shaderSrc
 */
export function compileVertexShader(gl, shaderSrc) {
  return compileShader(gl, shaderSrc, gl.VERTEX_SHADER);
}

/**
 *
 * @param gl
 * @param shaderSrc
 */
export function compileFragmentShader(gl, shaderSrc) {
  return compileShader(gl, shaderSrc, gl.FRAGMENT_SHADER);
}

/**
 *
 * @param gl
 * @param vertexSrc
 * @param fragmentSrc
 */
export function compileProgram(gl, vertexSrc, fragmentSrc) {
  const fragmentShader = compileFragmentShader(gl, fragmentSrc);
  const vertexShader = compileVertexShader(gl, vertexSrc);

  const shaderProgram = gl.createProgram();

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.log(gl.getProgramInfoLog(shaderProgram));
    console.log('Could not initialise shaders');
  }
  return shaderProgram;
}
