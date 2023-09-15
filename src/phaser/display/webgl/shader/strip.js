import { generateShaderID } from '../../../util/math.js';
import { compileProgram } from '../util.js';

// the next one is used for rendering triangle strips

export class StripShader {
  /**
   * TBD.
   * @param {WebGLRenderingContext} gl - TBD.
   */
  constructor(gl) {
    this.gl = gl;
    this._UID = generateShaderID();
    this.program = null;
    this.fragmentSrc = [
      'precision mediump float;',
      'varying vec2 vTextureCoord;',
      // 'varying float vColor;',
      'uniform float alpha;',
      'uniform sampler2D uSampler;',
      'void main(void) {',
      '   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * alpha;',
      // '   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);',//gl_FragColor * alpha;',
      '}',
    ];
    this.vertexSrc = [
      'attribute vec2 aVertexPosition;',
      'attribute vec2 aTextureCoord;',
      'uniform mat3 translationMatrix;',
      'uniform vec2 projectionVector;',
      'uniform vec2 offsetVector;',
      // 'uniform float alpha;',
      // 'uniform vec3 tint;',
      'varying vec2 vTextureCoord;',
      // 'varying vec4 vColor;',
      'void main(void) {',
      '   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);',
      '   v -= offsetVector.xyx;',
      '   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);',
      '   vTextureCoord = aTextureCoord;',
      // '   vColor = aColor * vec4(tint * alpha, alpha);',
      '}',
    ];

    this.init();
  }

  /**
   * TBD.
   */
  init() {
    const gl = this.gl;
    const program = compileProgram(gl, this.vertexSrc, this.fragmentSrc);
    gl.useProgram(program);
    // get and store the uniforms for the shader
    this.uSampler = gl.getUniformLocation(program, 'uSampler');
    this.projectionVector = gl.getUniformLocation(program, 'projectionVector');
    this.offsetVector = gl.getUniformLocation(program, 'offsetVector');
    this.colorAttribute = gl.getAttribLocation(program, 'aColor');
    // this.dimensions = gl.getUniformLocation(this.program, 'dimensions');
    // get and store the attributes
    this.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    this.aTextureCoord = gl.getAttribLocation(program, 'aTextureCoord');
    this.attributes = [this.aVertexPosition, this.aTextureCoord];
    this.translationMatrix = gl.getUniformLocation(program, 'translationMatrix');
    this.alpha = gl.getUniformLocation(program, 'alpha');
    this.program = program;
  }

  /**
   * TBD.
   */
  destroy() {
    this.gl.deleteProgram(this.program);
    this.uniforms = null;
    this.gl = null;
    this.attribute = null;
  }
}
