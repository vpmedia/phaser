/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Mat Groves http://matgroves.com/ @Doormat23
 */

export class WebGLBlendModeManager {
  constructor() {
    this.gl = null;
    this.currentBlendMode = 99999;
  }

  setContext(gl) {
    this.gl = gl;
  }

  setBlendMode(blendMode) {
    if (this.currentBlendMode === blendMode) {
      return false;
    }
    this.currentBlendMode = blendMode;
    const blendModeWebGL = window.PhaserRegistry.blendModesWebGL[this.currentBlendMode];
    if (blendModeWebGL) {
      this.gl.blendFunc(blendModeWebGL[0], blendModeWebGL[1]);
    }
    return true;
  }

  destroy() {
    this.gl = null;
  }
}
