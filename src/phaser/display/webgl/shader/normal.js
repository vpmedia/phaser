import { generateShaderID } from '../../../util/math.js';
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

// this shader is used for the default sprite rendering

export class NormalShader {
  /**
   * TBD.
   * @param {WebGLRenderingContext} gl - TBD.
   */
  constructor(gl) {
    this.gl = gl;
    this._UID = generateShaderID();
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
    this.textureCount = 0;
    this.firstRun = true;
    this.dirty = true;
    this.uniforms = {};
    this.attributes = [];
    this.init();
  }

  /**
   * TBD.
   */
  init() {
    const gl = this.gl;
    const program = compileProgram(gl, this.vertexSrc || defaultVertexSrc, this.fragmentSrc);
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
    const keys = Object.keys(this.uniforms);
    for (let i = 0; i < keys.length; i += 1) {
      // get the uniform locations..
      this.uniforms[keys[i]].uniformLocation = gl.getUniformLocation(program, keys[i]);
    }
    this.initUniforms();
    this.program = program;
  }

  /**
   * TBD.
   */
  initUniforms() {
    this.textureCount = 1;
    const gl = this.gl;
    let uniform;
    const keys = Object.keys(this.uniforms);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      uniform = this.uniforms[key];
      const type = uniform.type;
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
        uniform.glFunc = gl[`uniform${  type}`];
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
   * TBD.
   * @param {object} uniform - TBD.
   */
  initSampler2D(uniform) {
    if (!uniform.value || !uniform.value.baseTexture || !uniform.value.baseTexture.hasLoaded) {
      return;
    }
    const gl = this.gl;
    gl.activeTexture(gl[`TEXTURE${  this.textureCount}`]);
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
      const magFilter = data.magFilter ? data.magFilter : gl.LINEAR;
      const minFilter = data.minFilter ? data.minFilter : gl.LINEAR;
      let wrapS = data.wrapS ? data.wrapS : gl.CLAMP_TO_EDGE;
      let wrapT = data.wrapT ? data.wrapT : gl.CLAMP_TO_EDGE;
      const format = data.luminance ? gl.LUMINANCE : gl.RGBA;
      if (data.repeat) {
        wrapS = gl.REPEAT;
        wrapT = gl.REPEAT;
      }
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, !!data.flipY);
      if (data.width) {
        const width = data.width ? data.width : 512;
        const height = data.height ? data.height : 2;
        const border = data.border ? data.border : 0;

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
   * TBD.
   */
  syncUniforms() {
    this.textureCount = 1;
    let uniform;
    const gl = this.gl;
    //  This would probably be faster in an array and it would guarantee key order
    const keys = Object.keys(this.uniforms);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      uniform = this.uniforms[key];
      if (uniform.glValueLength === 1) {
        if (uniform.glMatrix === true) {
          uniform.glFunc.call(gl, uniform.uniformLocation, uniform.transpose, uniform.value);
        } else {
          uniform.glFunc.call(gl, uniform.uniformLocation, uniform.value);
        }
      } else if (uniform.glValueLength === 2) {
        uniform.glFunc.call(gl, uniform.uniformLocation, uniform.value.x, uniform.value.y);
      } else if (uniform.glValueLength === 3) {
        uniform.glFunc.call(gl, uniform.uniformLocation, uniform.value.x, uniform.value.y, uniform.value.z);
      } else if (uniform.glValueLength === 4) {
        uniform.glFunc.call(
          gl,
          uniform.uniformLocation,
          uniform.value.x,
          uniform.value.y,
          uniform.value.z,
          uniform.value.w
        );
      } else if (uniform.type === 'sampler2D') {
        if (uniform._init) {
          gl.activeTexture(gl[`TEXTURE${  this.textureCount}`]);
          if (uniform.value.baseTexture._dirty[gl.id]) {
            window.PhaserRegistry.INSTANCES[gl.id].updateTexture(uniform.value.baseTexture);
          } else {
            // bind the current texture
            gl.bindTexture(gl.TEXTURE_2D, uniform.value.baseTexture._glTextures[gl.id]);
          }
          //  gl.bindTexture(gl.TEXTURE_2D, uniform.value.baseTexture._glTextures[gl.id] || PIXI.createWebGLTexture( uniform.value.baseTexture, gl));
          gl.uniform1i(uniform.uniformLocation, this.textureCount);
          this.textureCount += 1;
        } else {
          this.initSampler2D(uniform);
        }
      }
    }
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
