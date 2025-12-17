import { removeByCanvas } from '../canvas/pool.js';

export class BaseTexture {
  /**
   * Updates the base texture with a new source.
   * @param {HTMLCanvasElement} source - The new canvas element to use as the texture source.
   * @param {number} [scaleMode] - The scale mode to use for the texture.
   */
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

  /**
   * Updates the base texture with new dimensions.
   * @param {number} width - The new width of the texture.
   * @param {number} height - The new height of the texture.
   */
  forceLoaded(width, height) {
    this.hasLoaded = true;
    this.width = width;
    this.height = height;
    this.dirty();
  }

  /**
   * Destroys the texture.
   */
  destroy() {
    if (this.source) {
      removeByCanvas(this.source);
    }
    this.source = null;
    this.unloadFromGPU();
  }

  /**
   * Marks the texture as dirty.
   */
  dirty() {
    for (let i = 0; i < this._glTextures.length; i += 1) {
      this._dirty[i] = true;
    }
  }

  /**
   * Unloads the texture from the GPU.
   */
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
