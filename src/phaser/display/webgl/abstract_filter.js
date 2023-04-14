/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Mat Groves http://matgroves.com/ @Doormat23
 */

export default class {
  constructor(fragmentSrc, uniforms) {
    this.passes = [this];
    this.shaders = [];
    this.dirty = true;
    this.padding = 0;
    this.uniforms = uniforms || {};
    this.fragmentSrc = fragmentSrc || [];
  }

  syncUniforms() {
    for (let i = 0, j = this.shaders.length; i < j; i += 1) {
      this.shaders[i].dirty = true;
    }
  }
}
