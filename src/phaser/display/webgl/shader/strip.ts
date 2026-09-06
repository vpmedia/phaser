import { v4 as uuidv4 } from 'uuid';
import { compileProgram } from '../util.js';

// the next one is used for rendering triangle strips

export class StripShader {
  public gl: WebGLRenderingContext | null;
  public _UID: string;
  public program: WebGLProgram | null;
  public fragmentSrc: string[];
  public vertexSrc: string[];
  public uSampler!: WebGLUniformLocation | null;
  public projectionVector!: WebGLUniformLocation | null;
  public offsetVector!: WebGLUniformLocation | null;
  public translationMatrix!: WebGLUniformLocation | null;
  public alpha!: WebGLUniformLocation | null;
  public colorAttribute!: number;
  public aVertexPosition!: number;
  public aTextureCoord!: number;
  public uniforms: unknown = null;
  public attributes: number[] | null = null;
  /**
   * Creates a new StripShader instance.
   * @param {WebGLRenderingContext} gl - The WebGL rendering context.
   */
  public constructor(gl: WebGLRenderingContext) {
    this.gl = gl;
    this._UID = uuidv4();
    /** @type {WebGLProgram} */
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
   * Destroys this shader and cleans up resources.
   */
  public init(): void {
    const { gl } = this;
    if (!gl) {
      return;
    }
    const program = compileProgram(gl, this.vertexSrc, this.fragmentSrc);
    if (!program) {
      return;
    }
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
   * Binds this shader to the WebGL context.
   */
  public destroy(): void {
    this.gl?.deleteProgram(this.program);
    this.uniforms = null;
    this.gl = null;
    this.attributes = null;
  }
}
