/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Mat Groves http://matgroves.com/ @Doormat23
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
import { removeByCanvas } from '../canvas/pool';

export default class {

  constructor(source, scaleMode) {
    this.resolution = 1;
    this.width = 100;
    this.height = 100;
    this.scaleMode = scaleMode || window.PhaserRegistry.TEXTURE_SCALE_MODE;
    this.hasLoaded = false;
    this.source = source;
    this.premultipliedAlpha = true;
    this._glTextures = [];
    this.mipmap = false;
    this.skipRender = false;
    this._powerOf2 = false;
    this._dirty = [true, true, true, true];
    if (source) {
      if ((this.source.complete || this.source.getContext) && this.source.width && this.source.height) {
        this.hasLoaded = true;
        this.width = this.source.naturalWidth || this.source.width;
        this.height = this.source.naturalHeight || this.source.height;
        this.dirty();
      }
    }
  }

  forceLoaded(width, height) {
    this.hasLoaded = true;
    this.width = width;
    this.height = height;
    this.dirty();
  }

  destroy() {
    if (this.source) {
      removeByCanvas(this.source);
    }
    this.source = null;
    this.unloadFromGPU();
  }

  dirty() {
    for (let i = 0; i < this._glTextures.length; i += 1) {
      this._dirty[i] = true;
    }
  }

  unloadFromGPU() {
    this.dirty();
    for (let i = this._glTextures.length - 1; i >= 0; i -= 1) {
      const glTexture = this._glTextures[i];
      const gl = window.PhaserRegistry.GL_CONTEXTS[i];
      if (gl && glTexture) {
        gl.deleteTexture(glTexture);
      }
    }
    this._glTextures.length = 0;
    this.dirty();
  }

}
