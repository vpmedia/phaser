/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Mat Groves http://matgroves.com/ @Doormat23
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
import PrimitiveShader from './shader/primitive';
import ComplexPrimitiveShader from './shader/complex';
import NormalShader from './shader/normal';
import FastShader from './shader/fast';
import StripShader from './shader/strip';

export default class {

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

  setContext(gl) {
    this.gl = gl;
    this.primitiveShader = new PrimitiveShader(gl);
    this.complexPrimitiveShader = new ComplexPrimitiveShader(gl);
    this.defaultShader = new NormalShader(gl);
    this.fastShader = new FastShader(gl);
    this.stripShader = new StripShader(gl);
    this.setShader(this.defaultShader);
  }

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
