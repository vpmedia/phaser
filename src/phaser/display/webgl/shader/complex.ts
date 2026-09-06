import { v4 as uuidv4 } from 'uuid';
import { compileProgram } from '../util.js';

// the next one is used for rendering triangle strips

export class ComplexPrimitiveShader {
  public gl: WebGLRenderingContext | null;
  public _UID: string;
  public program: WebGLProgram | null;
  public fragmentSrc: string[];
  public vertexSrc: string[];
  public projectionVector!: WebGLUniformLocation | null;
  public offsetVector!: WebGLUniformLocation | null;
  public tintColor!: WebGLUniformLocation | null;
  public color!: WebGLUniformLocation | null;
  public flipY!: WebGLUniformLocation | null;
  public translationMatrix!: WebGLUniformLocation | null;
  public alpha!: WebGLUniformLocation | null;
  public aVertexPosition!: number;
  public colorAttribute: number | undefined;
  public uniforms: unknown = null;
  public attributes: (number | undefined)[] | null = null;
  /**
   * Creates a new ComplexShader instance.
   * @param {WebGLRenderingContext} gl - The WebGL rendering context.
   */
  public constructor(gl: WebGLRenderingContext) {
    this.gl = gl;
    this._UID = uuidv4();
    /** @type {WebGLProgram} */
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
      // 'attribute vec4 aColor;',
      'uniform mat3 translationMatrix;',
      'uniform vec2 projectionVector;',
      'uniform vec2 offsetVector;',

      'uniform vec3 tint;',
      'uniform float alpha;',
      'uniform vec3 color;',
      'uniform float flipY;',
      'varying vec4 vColor;',

      'void main(void) {',
      '   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);',
      '   v -= offsetVector.xyx;',
      '   gl_Position = vec4( v.x / projectionVector.x -1.0, (v.y / projectionVector.y * -flipY) + flipY , 0.0, 1.0);',
      '   vColor = vec4(color * alpha * tint, alpha);', // " * vec4(tint * alpha, alpha);',
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
    this.projectionVector = gl.getUniformLocation(program, 'projectionVector');
    this.offsetVector = gl.getUniformLocation(program, 'offsetVector');
    this.tintColor = gl.getUniformLocation(program, 'tint');
    this.color = gl.getUniformLocation(program, 'color');
    this.flipY = gl.getUniformLocation(program, 'flipY');
    // get and store the attributes
    this.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    // this.colorAttribute = gl.getAttribLocation(program, 'aColor');
    this.attributes = [this.aVertexPosition, this.colorAttribute];
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
