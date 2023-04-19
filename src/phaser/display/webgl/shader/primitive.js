import { generateShaderID } from '../../../util/math';
import { compileProgram } from '../util';

// the next one is used for rendering primitives

export class PrimitiveShader {
  constructor(gl) {
    this.gl = gl;
    this._UID = generateShaderID();
    this.program = null;
    this.fragmentSrc = [
      'precision mediump float;',
      'varying vec4 vColor;',

      'void main(void) {',
      '   gl_FragColor = vColor;',
      '}',
    ];
    this.vertexSrc = [
      'attribute vec2 aVertexPosition;',
      'attribute vec4 aColor;',
      'uniform mat3 translationMatrix;',
      'uniform vec2 projectionVector;',
      'uniform vec2 offsetVector;',
      'uniform float alpha;',
      'uniform float flipY;',
      'uniform vec3 tint;',
      'varying vec4 vColor;',

      'void main(void) {',
      '   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);',
      '   v -= offsetVector.xyx;',
      '   gl_Position = vec4( v.x / projectionVector.x -1.0, (v.y / projectionVector.y * -flipY) + flipY , 0.0, 1.0);',
      '   vColor = aColor * vec4(tint * alpha, alpha);',
      '}',
    ];
    this.init();
  }

  init() {
    const gl = this.gl;
    const program = compileProgram(gl, this.vertexSrc, this.fragmentSrc);
    gl.useProgram(program);
    // get and store the uniforms for the shader
    this.projectionVector = gl.getUniformLocation(program, 'projectionVector');
    this.offsetVector = gl.getUniformLocation(program, 'offsetVector');
    this.tintColor = gl.getUniformLocation(program, 'tint');
    this.flipY = gl.getUniformLocation(program, 'flipY');
    // get and store the attributes
    this.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    this.colorAttribute = gl.getAttribLocation(program, 'aColor');
    this.attributes = [this.aVertexPosition, this.colorAttribute];
    this.translationMatrix = gl.getUniformLocation(program, 'translationMatrix');
    this.alpha = gl.getUniformLocation(program, 'alpha');
    this.program = program;
  }

  destroy() {
    this.gl.deleteProgram(this.program);
    this.uniforms = null;
    this.gl = null;
    this.attributes = null;
  }
}
