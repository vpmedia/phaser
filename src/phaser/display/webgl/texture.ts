import { Rectangle } from '../../geom/rectangle.js';
import type { BaseTexture } from './base_texture.js';

/** The four corners of a texture frame in normalised texture space. */
export class TextureUvs {
  public x0 = 0;
  public y0 = 0;
  public x1 = 0;
  public y1 = 0;
  public x2 = 0;
  public y2 = 0;
  public x3 = 0;
  public y3 = 0;
}

export class Texture {
  public noFrame = false;
  public baseTexture!: BaseTexture;
  public frame!: Rectangle;
  public trim!: Rectangle | null;
  public valid!: boolean;
  public isTiling!: boolean;
  public requiresUpdate!: boolean;
  public requiresReTint!: boolean;
  public _uvs!: TextureUvs | null;
  public width!: number;
  public height!: number;
  public crop!: Rectangle;
  /**
   * Creates a new Texture instance.
   * @param {BaseTexture} baseTexture - The base texture to use.
   * @param {Rectangle | null | undefined} frame - The frame rectangle.
   * @param {Rectangle | null | undefined} crop - The crop rectangle.
   * @param {Rectangle | null | undefined} trim - The trim rectangle.
   */
  public constructor(
    baseTexture: BaseTexture,
    frame: Rectangle | null | undefined = null,
    crop: Rectangle | null | undefined = null,
    trim: Rectangle | null | undefined = null
  ) {
    this.noFrame = !frame;
    let textureFrame = frame ?? new Rectangle(0, 0, 1, 1);
    const source = baseTexture instanceof Texture ? baseTexture.baseTexture : baseTexture;
    this.baseTexture = source;
    /** @type {Rectangle} */
    this.frame = textureFrame;
    /** @type {Rectangle | null | undefined} */
    this.trim = trim;
    /** @type {boolean} */
    this.valid = false;
    /** @type {boolean} */
    this.isTiling = false;
    /** @type {boolean} */
    this.requiresUpdate = false;
    /** @type {boolean} */
    this.requiresReTint = false;
    /** @type {TextureUvs} */
    this._uvs = null;
    /** @type {number} */
    this.width = 0;
    /** @type {number} */
    this.height = 0;
    /** @type {Rectangle} */
    this.crop = crop ?? new Rectangle(0, 0, 1, 1);
    if (source.hasLoaded) {
      if (this.noFrame) {
        textureFrame = new Rectangle(0, 0, source.width, source.height);
      }
      this.setFrame(textureFrame);
    }
  }

  /**
   * Destroys this texture and cleans up resources.
   */
  public onBaseTextureLoaded(): void {
    if (this.noFrame) {
      this.frame = new Rectangle(0, 0, this.baseTexture.width, this.baseTexture.height);
    }
    this.setFrame(this.frame);
  }

  /**
   * Destroys this texture and cleans up resources.
   * @param {boolean} destroyBase - Whether to destroy the base texture as well.
   */
  public destroy(destroyBase = false): void {
    if (destroyBase) {
      this.baseTexture.destroy();
    }
    this.valid = false;
  }

  /**
   * Sets the frame of this texture.
   * @param {Rectangle} frame - The new frame rectangle.
   * @throws {Error} If the operation fails.
   */
  public setFrame(frame: Rectangle): void {
    this.noFrame = false;
    this.frame = frame;
    this.width = frame.width;
    this.height = frame.height;
    this.crop.x = frame.x;
    this.crop.y = frame.y;
    this.crop.width = frame.width;
    this.crop.height = frame.height;
    if (
      !this.trim &&
      (frame.x + frame.width > this.baseTexture.width || frame.y + frame.height > this.baseTexture.height)
    ) {
      // If `true` then `PIXI.Texture.setFrame` will no longer throw an error if the texture dimensions are incorrect.
      // Instead `Texture.valid` will be set to `false` (#1556)
      // TODO: make this configurable
      const isTextureSilentFail = true;
      if (!isTextureSilentFail) {
        throw new Error(`Texture Error: frame does not fit inside the base Texture dimensions ${this}`);
      }
      this.valid = false;
      return;
    }
    this.valid = Boolean(frame && frame.width && frame.height && this.baseTexture.source && this.baseTexture.hasLoaded);
    if (this.trim) {
      this.width = this.trim.width;
      this.height = this.trim.height;
      this.frame.width = this.trim.width;
      this.frame.height = this.trim.height;
    }
    if (this.valid) {
      this._updateUvs();
    }
  }

  /**
   * Updates the texture UVs based on the crop frame.
   */
  public _updateUvs(): void {
    this._uvs ??= new TextureUvs();
    const frame = this.crop;
    const tw = this.baseTexture.width;
    const th = this.baseTexture.height;
    this._uvs.x0 = frame.x / tw;
    this._uvs.y0 = frame.y / th;
    this._uvs.x1 = (frame.x + frame.width) / tw;
    this._uvs.y1 = frame.y / th;
    this._uvs.x2 = (frame.x + frame.width) / tw;
    this._uvs.y2 = (frame.y + frame.height) / th;
    this._uvs.x3 = frame.x / tw;
    this._uvs.y3 = (frame.y + frame.height) / th;
  }
}
