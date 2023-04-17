/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Mat Groves http://matgroves.com/ @Doormat23
 */

export class WebGLFilterManager {
  constructor() {
    this.filterStack = [];
    this.offsetX = 0;
    this.offsetY = 0;
  }

  setContext(gl) {
    this.gl = gl;
    this.texturePool = [];
    this.initShaderBuffers();
  }

  begin() {
    // TODO
  }

  pushFilter() {
    // TODO
  }

  popFilter() {
    // TODO
  }

  applyFilterPass() {
    // TODO
  }

  initShaderBuffers() {
    // TODO
  }

  destroy() {
    // TODO
  }
}
