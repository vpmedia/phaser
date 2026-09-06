import { v4 as uuidv4 } from 'uuid';
import { compileProgram } from '../util.js';

const defaultVertexSrc = [
  'attribute vec2 aVertexPosition;',
  'attribute vec2 aTextureCoord;',
  'attribute vec4 aColor;',

  'uniform vec2 projectionVector;',
  'uniform vec2 offsetVector;',

  'varying vec2 vTextureCoord;',
  'varying vec4 vColor;',

  'const vec2 center = vec2(-1.0, 1.0);',

  'void main(void) {',
  '   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);',
  '   vTextureCoord = aTextureCoord;',
  '   vColor = vec4(aColor.rgb * aColor.a, aColor.a);',
  '}',
];

const glMember = (gl: WebGLRenderingContext, name: string): any => (gl as unknown as Record<string, unknown>)[name];

/** Applies one of the gl uniform setters, whose signatures vary by uniform kind. */
const callUniformSetter = (setter: unknown, gl: WebGLRenderingContext, ...args: unknown[]): void => {
  if (typeof setter === 'function') {
    (setter as (...rest: unknown[]) => void).apply(gl, args);
  }
};

// this shader is used for the default sprite rendering

export type ShaderUniform = {
  type: string;
  value: any;
  uniformLocation?: WebGLUniformLocation | null;
  /** One of the gl uniform setters. Their arities differ by uniform kind, so the stored value is
   * opaque and applied through callUniformSetter. */
  glFunc?: unknown;
  glMatrix?: boolean;
  glValueLength?: number;
  transpose?: boolean;
  textureData?: Record<string, any>;
  _init?: boolean;
};

export class NormalShader {
  public gl: WebGLRenderingContext & { id: number };
  public _UID: string;
  public program: WebGLProgram | null;
  public fragmentSrc: string[];
  public vertexSrc: string[] | null;
  public textureCount: number;
  public firstRun: boolean;
  public dirty: boolean;
  public uniforms: Record<string, ShaderUniform>;
  public attributes: number[];
  public uSampler!: WebGLUniformLocation | null;
  public projectionVector!: WebGLUniformLocation | null;
  public offsetVector!: WebGLUniformLocation | null;
  public dimensions!: WebGLUniformLocation | null;
  public aVertexPosition!: number;
  public aTextureCoord!: number;
  public colorAttribute!: number;
  /**
   * Creates a new NormalShader instance.
   * @param {WebGLRenderingContext & { id: number }} gl - The WebGL rendering context.
   */
  public constructor(gl: WebGLRenderingContext & { id: number }) {
    this.gl = gl;
    this._UID = uuidv4();
    /** @type {WebGLProgram} */
    this.program = null;
    this.fragmentSrc = [
      'precision lowp float;',
      'varying vec2 vTextureCoord;',
      'varying vec4 vColor;',
      'uniform sampler2D uSampler;',
      'void main(void) {',
      '   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;',
      '}',
    ];
    /** @type {string[]} */
    this.vertexSrc = null;
    this.textureCount = 0;
    this.firstRun = true;
    this.dirty = true;
    this.uniforms = {};
    this.attributes = [];
    this.init();
  }

  /**
   * Destroys this shader and cleans up resources.
   */
  public init(): void {
    const { gl } = this;
    const program = compileProgram(gl, this.vertexSrc ?? defaultVertexSrc, this.fragmentSrc);
    if (!program) {
      return;
    }
    gl.useProgram(program);
    // get and store the uniforms for the shader
    this.uSampler = gl.getUniformLocation(program, 'uSampler');
    this.projectionVector = gl.getUniformLocation(program, 'projectionVector');
    this.offsetVector = gl.getUniformLocation(program, 'offsetVector');
    this.dimensions = gl.getUniformLocation(program, 'dimensions');
    // get and store the attributes
    this.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    this.aTextureCoord = gl.getAttribLocation(program, 'aTextureCoord');
    this.colorAttribute = gl.getAttribLocation(program, 'aColor');
    // Begin worst hack eva //
    // WHY??? ONLY on my chrome pixel the line above returns -1 when using filters?
    // maybe its something to do with the current state of the gl context.
    // I'm convinced this is a bug in the chrome browser as there is NO reason why this should be returning -1 especially as it only manifests on my chrome pixel
    // If theres any webGL people that know why could happen please help :)
    if (this.colorAttribute === -1) {
      this.colorAttribute = 2;
    }
    this.attributes = [this.aVertexPosition, this.aTextureCoord, this.colorAttribute];
    // End worst hack eva //
    // add those custom shaders!
    for (const [key, uniform] of Object.entries(this.uniforms)) {
      // get the uniform locations..
      uniform.uniformLocation = gl.getUniformLocation(program, key);
    }
    this.initUniforms();
    this.program = program;
  }

  /**
   * Binds this shader to the WebGL context.
   */
  public initUniforms() {
    this.textureCount = 1;
    const { gl } = this;
    for (const uniform of Object.values(this.uniforms)) {
      const { type } = uniform;
      if (type === 'sampler2D') {
        uniform._init = false;
        if (uniform.value !== null) {
          this.initSampler2D(uniform);
        }
      } else if (type === 'mat2' || type === 'mat3' || type === 'mat4') {
        //  These require special handling
        uniform.glMatrix = true;
        uniform.glValueLength = 1;
        if (type === 'mat2') {
          uniform.glFunc = gl.uniformMatrix2fv;
        } else if (type === 'mat3') {
          uniform.glFunc = gl.uniformMatrix3fv;
        } else if (type === 'mat4') {
          uniform.glFunc = gl.uniformMatrix4fv;
        }
      } else {
        //  GL function reference
        uniform.glFunc = glMember(gl, `uniform${type}`);
        if (type === '2f' || type === '2i') {
          uniform.glValueLength = 2;
        } else if (type === '3f' || type === '3i') {
          uniform.glValueLength = 3;
        } else if (type === '4f' || type === '4i') {
          uniform.glValueLength = 4;
        } else {
          uniform.glValueLength = 1;
        }
      }
    }
  }

  /**
   * Sets a uniform value for this shader.
   * @param {object} uniform - The uniform to set.
   */
  public initSampler2D(uniform: any) {
    if (!uniform.value || !uniform.value.baseTexture || !uniform.value.baseTexture.hasLoaded) {
      return;
    }
    const { gl } = this;
    gl.activeTexture(glMember(gl, `TEXTURE${this.textureCount}`));
    gl.bindTexture(gl.TEXTURE_2D, uniform.value.baseTexture._glTextures[gl.id]);
    //  Extended texture data
    if (uniform.textureData) {
      const data = uniform.textureData;
      // GLTexture = mag linear, min linear_mipmap_linear, wrap repeat + gl.generateMipmap(gl.TEXTURE_2D);
      // GLTextureLinear = mag/min linear, wrap clamp
      // GLTextureNearestRepeat = mag/min NEAREST, wrap repeat
      // GLTextureNearest = mag/min nearest, wrap clamp
      // AudioTexture = whatever + luminance + width 512, height 2, border 0
      // KeyTexture = whatever + luminance + width 256, height 2, border 0
      //  magFilter can be: gl.LINEAR, gl.LINEAR_MIPMAP_LINEAR or gl.NEAREST
      //  wrapS/T can be: gl.CLAMP_TO_EDGE or gl.REPEAT
      const magFilter = data.magFilter ?? gl.LINEAR;
      const minFilter = data.minFilter ?? gl.LINEAR;
      let wrapS = data.wrapS ?? gl.CLAMP_TO_EDGE;
      let wrapT = data.wrapT ?? gl.CLAMP_TO_EDGE;
      const format = data.luminance ? gl.LUMINANCE : gl.RGBA;
      if (data.repeat) {
        wrapS = gl.REPEAT;
        wrapT = gl.REPEAT;
      }
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, Boolean(data.flipY));
      if (data.width) {
        const width = data.width ?? 512;
        const height = data.height ?? 2;
        const border = data.border ?? 0;

        // void texImage2D(GLenum target, GLint level, GLenum internalformat, GLsizei width, GLsizei height, GLint border, GLenum format, GLenum type, ArrayBufferView? pixels);
        gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, border, format, gl.UNSIGNED_BYTE, null);
      } else {
        //  void texImage2D(GLenum target, GLint level, GLenum internalformat, GLenum format, GLenum type, ImageData? pixels);
        gl.texImage2D(gl.TEXTURE_2D, 0, format, gl.RGBA, gl.UNSIGNED_BYTE, uniform.value.baseTexture.source);
      }
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
    }
    gl.uniform1i(uniform.uniformLocation, this.textureCount);
    uniform._init = true;
    this.textureCount += 1;
  }

  /**
   * Sets the shader to use for rendering.
   */
  public syncUniforms() {
    this.textureCount = 1;
    const { gl } = this;
    //  This would probably be faster in an array and it would guarantee key order
    for (const uniform of Object.values(this.uniforms)) {
      if (uniform.glValueLength === 1) {
        if (uniform.glMatrix === true) {
          callUniformSetter(uniform.glFunc, gl, uniform.uniformLocation, uniform.transpose, uniform.value);
        } else {
          callUniformSetter(uniform.glFunc, gl, uniform.uniformLocation, uniform.value);
        }
      } else if (uniform.glValueLength === 2) {
        callUniformSetter(uniform.glFunc, gl, uniform.uniformLocation, uniform.value.x, uniform.value.y);
      } else if (uniform.glValueLength === 3) {
        callUniformSetter(
          uniform.glFunc,
          gl,
          uniform.uniformLocation,
          uniform.value.x,
          uniform.value.y,
          uniform.value.z
        );
      } else if (uniform.glValueLength === 4) {
        callUniformSetter(
          uniform.glFunc,
          gl,
          uniform.uniformLocation,
          uniform.value.x,
          uniform.value.y,
          uniform.value.z,
          uniform.value.w
        );
      } else if (uniform.type === 'sampler2D') {
        if (uniform._init) {
          gl.activeTexture(glMember(gl, `TEXTURE${this.textureCount}`));
          if (uniform.value.baseTexture._dirty[gl.id]) {
            globalThis.PhaserRegistry.INSTANCES[gl.id]?.updateTexture(uniform.value.baseTexture);
          } else {
            // bind the current texture
            gl.bindTexture(gl.TEXTURE_2D, uniform.value.baseTexture._glTextures[gl.id]);
          }
          //  gl.bindTexture(gl.TEXTURE_2D, uniform.value.baseTexture._glTextures[gl.id] || PIXI.createWebGLTexture( uniform.value.baseTexture, gl));
          gl.uniform1i(uniform.uniformLocation ?? null, this.textureCount);
          this.textureCount += 1;
        } else {
          this.initSampler2D(uniform);
        }
      }
    }
  }

  /**
   * Destroys this shader and cleans up resources.
   */
  public destroy(): void {
    this.gl.deleteProgram(this.program);
    this.uniforms = {};
    this.attributes = [];
  }
}
