import { ComplexPrimitiveShader } from './shader/complex.js';
import { FastShader } from './shader/fast.js';
import { NormalShader } from './shader/normal.js';
import { PrimitiveShader } from './shader/primitive.js';
import { StripShader } from './shader/strip.js';

export class WebGLShaderManager {
  /**
   * TBD.
   */
  constructor() {
    this.gl = null;
    this.primitiveShader = null;
    this.complexPrimitiveShader = null;
    this.defaultShader = null;
    this.fastShader = null;
    this.stripShader = null;
    this.maxAttibs = 10;
    this.attribState = [];
    this.tempAttribState = [];
    for (let i = 0; i < this.maxAttibs; i += 1) {
      this.attribState[i] = false;
    }
    this.stack = [];
  }

  /**
   * TBD.
   * @param {WebGLRenderingContext} gl - TBD.
   */
  setContext(gl) {
    this.gl = gl;
    this.primitiveShader = new PrimitiveShader(gl);
    this.complexPrimitiveShader = new ComplexPrimitiveShader(gl);
    this.defaultShader = new NormalShader(gl);
    this.fastShader = new FastShader(gl);
    this.stripShader = new StripShader(gl);
    this.setShader(this.defaultShader);
  }

  /**
   * TBD.
   * @param {number[]} attribs - TBD.
   */
  setAttribs(attribs) {
    // reset temp state
    let i;
    for (i = 0; i < this.tempAttribState.length; i += 1) {
      this.tempAttribState[i] = false;
    }
    // set the new attribs
    for (i = 0; i < attribs.length; i += 1) {
      const attribId = attribs[i];
      this.tempAttribState[attribId] = true;
    }
    const gl = this.gl;
    for (i = 0; i < this.attribState.length; i += 1) {
      if (this.attribState[i] !== this.tempAttribState[i]) {
        this.attribState[i] = this.tempAttribState[i];
        if (this.tempAttribState[i]) {
          gl.enableVertexAttribArray(i);
        } else {
          gl.disableVertexAttribArray(i);
        }
      }
    }
  }

  /**
   * TBD.
   * @param {NormalShader} shader - TBD.
   * @returns {boolean} TBD.
   */
  setShader(shader) {
    if (this._currentId === shader._UID) {
      return false;
    }
    this._currentId = shader._UID;
    this.currentShader = shader;
    this.gl.useProgram(shader.program);
    this.setAttribs(shader.attributes);
    return true;
  }

  /**
   * TBD.
   */
  destroy() {
    this.attribState = null;
    this.tempAttribState = null;
    this.currentShader = null;
    this._currentId = null;
    this.primitiveShader.destroy();
    this.complexPrimitiveShader.destroy();
    this.defaultShader.destroy();
    this.fastShader.destroy();
    this.stripShader.destroy();
    this.gl = null;
  }
}
