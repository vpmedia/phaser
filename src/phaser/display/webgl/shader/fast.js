import { v4 as uuidv4 } from 'uuid';
import { compileProgram } from '../util.js';

// this shader is used for the fast sprite rendering

export class FastShader {
  /**
   * TBD.
   * @param {WebGLRenderingContext} gl - TBD.
   */
  constructor(gl) {
    this.gl = gl;
    this._UID = uuidv4();
    /** @type {WebGLProgram} */
    this.program = null;
    this.textureCount = 0;
    this.fragmentSrc = [
      'precision lowp float;',
      'varying vec2 vTextureCoord;',
      'varying float vColor;',
      'uniform sampler2D uSampler;',
      'void main(void) {',
      '   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;',
      '}',
    ];
    this.vertexSrc = [
      'attribute vec2 aVertexPosition;',
      'attribute vec2 aPositionCoord;',
      'attribute vec2 aScale;',
      'attribute float aRotation;',
      'attribute vec2 aTextureCoord;',
      'attribute float aColor;',

      'uniform vec2 projectionVector;',
      'uniform vec2 offsetVector;',
      'uniform mat3 uMatrix;',

      'varying vec2 vTextureCoord;',
      'varying float vColor;',

      'const vec2 center = vec2(-1.0, 1.0);',

      'void main(void) {',
      '   vec2 v;',
      '   vec2 sv = aVertexPosition * aScale;',
      '   v.x = (sv.x) * cos(aRotation) - (sv.y) * sin(aRotation);',
      '   v.y = (sv.x) * sin(aRotation) + (sv.y) * cos(aRotation);',
      '   v = ( uMatrix * vec3(v + aPositionCoord , 1.0) ).xy ;',
      '   gl_Position = vec4( ( v / projectionVector) + center , 0.0, 1.0);',
      '   vTextureCoord = aTextureCoord;',
      // '   vec3 color = mod(vec3(aColor.y/65536.0, aColor.y/256.0, aColor.y), 256.0) / 256.0;',
      '   vColor = aColor;',
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
    this.dimensions = gl.getUniformLocation(program, 'dimensions');
    this.uMatrix = gl.getUniformLocation(program, 'uMatrix');
    // get and store the attributes
    this.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    this.aPositionCoord = gl.getAttribLocation(program, 'aPositionCoord');
    this.aScale = gl.getAttribLocation(program, 'aScale');
    this.aRotation = gl.getAttribLocation(program, 'aRotation');
    this.aTextureCoord = gl.getAttribLocation(program, 'aTextureCoord');
    this.colorAttribute = gl.getAttribLocation(program, 'aColor');
    // Begin worst hack eva //
    // WHY??? ONLY on my chrome pixel the line above returns -1 when using filters?
    // maybe its somthing to do with the current state of the gl context.
    // Im convinced this is a bug in the chrome browser as there is NO reason why this should be returning -1 especially as it only manifests on my chrome pixel
    // If theres any webGL people that know why could happen please help :)
    if (this.colorAttribute === -1) {
      this.colorAttribute = 2;
    }
    this.attributes = [
      this.aVertexPosition,
      this.aPositionCoord,
      this.aScale,
      this.aRotation,
      this.aTextureCoord,
      this.colorAttribute,
    ];
    // End worst hack eva //
    this.program = program;
  }

  /**
   * TBD.
   */
  destroy() {
    this.gl.deleteProgram(this.program);
    this.uniforms = null;
    this.gl = null;
    this.attributes = null;
  }
}
