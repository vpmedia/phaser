/** What a base texture is uploaded from: a loaded image or a canvas the engine drew into. */
export type TextureSource = HTMLImageElement | HTMLCanvasElement;

import { removeByCanvas } from '../canvas/pool.js';

export class BaseTexture {
  public resolution = 1;
  public width = 100;
  public height = 100;
  public scaleMode!: number;
  public hasLoaded!: boolean;
  public source!: TextureSource | null;
  public premultipliedAlpha!: boolean;
  public _glTextures!: (WebGLTexture | null)[];
  public mipmap!: boolean;
  public skipRender!: boolean;
  public _powerOf2!: boolean;
  public _dirty!: boolean[];
  /**
   * Updates the base texture with a new source.
   * @param {HTMLCanvasElement} source - The new canvas element to use as the texture source.
   * @param {number} [scaleMode] - The scale mode to use for the texture.
   */
  public constructor(source: TextureSource | null, scaleMode?: number) {
    this.scaleMode = scaleMode ?? globalThis.PhaserRegistry.TEXTURE_SCALE_MODE;
    this.hasLoaded = false;
    this.source = source;
    this.premultipliedAlpha = true;
    this._glTextures = [];
    this.mipmap = false;
    this.skipRender = false;
    this._powerOf2 = false;
    this._dirty = [true, true, true, true];
    if (source) {
      const loaded = source instanceof HTMLImageElement ? source.complete : true;
      if (loaded && source.width && source.height) {
        this.hasLoaded = true;
        this.width = source instanceof HTMLImageElement ? source.naturalWidth : source.width;
        this.height = source instanceof HTMLImageElement ? source.naturalHeight : source.height;
        this.dirty();
      }
    }
  }

  /**
   * Updates the base texture with new dimensions.
   * @param {number} width - The new width of the texture.
   * @param {number} height - The new height of the texture.
   */
  public forceLoaded(width: number, height: number): void {
    this.hasLoaded = true;
    this.width = width;
    this.height = height;
    this.dirty();
  }

  /**
   * Destroys the texture.
   */
  public destroy(): void {
    if (this.source instanceof HTMLCanvasElement) {
      removeByCanvas(this.source);
    }
    this.source = null;
    this.unloadFromGPU();
  }

  /**
   * Marks the texture as dirty.
   */
  public dirty(): void {
    for (let i = 0; i < this._glTextures.length; i += 1) {
      this._dirty[i] = true;
    }
  }

  /**
   * Unloads the texture from the GPU.
   */
  public unloadFromGPU(): void {
    this.dirty();
    for (let i = this._glTextures.length - 1; i >= 0; i -= 1) {
      const glTexture = this._glTextures[i];
      const gl = globalThis.PhaserRegistry.GL_CONTEXTS[i];
      if (gl && glTexture) {
        gl.deleteTexture(glTexture);
      }
    }
    this._glTextures.length = 0;
    this.dirty();
  }
}
