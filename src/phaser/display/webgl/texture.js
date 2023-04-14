/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Mat Groves http://matgroves.com/ @Doormat23
 */
import Rectangle from '../../geom/rectangle';

export class TextureUvs {
  constructor() {
    this.x0 = 0;
    this.y0 = 0;
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
    this.x3 = 0;
    this.y3 = 0;
  }
}

export default class {
  constructor(baseTexture, frame, crop, trim) {
    this.noFrame = false;
    if (!frame) {
      this.noFrame = true;
      frame = new Rectangle(0, 0, 1, 1);
    }
    if (baseTexture && baseTexture.baseTexture) {
      baseTexture = baseTexture.baseTexture;
    }
    this.baseTexture = baseTexture;
    this.frame = frame;
    this.trim = trim;
    this.valid = false;
    this.isTiling = false;
    this.requiresUpdate = false;
    this.requiresReTint = false;
    this._uvs = null;
    this.width = 0;
    this.height = 0;
    this.crop = crop || new Rectangle(0, 0, 1, 1);
    if (baseTexture.hasLoaded) {
      if (this.noFrame) {
        frame = new Rectangle(0, 0, baseTexture.width, baseTexture.height);
      }
      this.setFrame(frame);
    }
  }

  onBaseTextureLoaded() {
    if (this.noFrame) {
      this.frame = new Rectangle(0, 0, this.baseTexture.width, this.baseTexture.height);
    }
    this.setFrame(this.frame);
  }

  destroy(destroyBase = false) {
    if (destroyBase) {
      this.baseTexture.destroy();
    }
    this.valid = false;
  }

  setFrame(frame) {
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
      (frame.x + frame.width > this.baseTexture.width ||
        frame.y + frame.height > this.baseTexture.height)
    ) {
      // If `true` then `PIXI.Texture.setFrame` will no longer throw an error if the texture dimensions are incorrect.
      // Instead `Texture.valid` will be set to `false` (#1556)
      // TODO: make this configurable
      const isTextureSilentFail = true;
      if (!isTextureSilentFail) {
        throw new Error(
          'Texture Error: frame does not fit inside the base Texture dimensions ' + this
        );
      }
      this.valid = false;
      return;
    }
    this.valid =
      frame && frame.width && frame.height && this.baseTexture.source && this.baseTexture.hasLoaded;
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

  _updateUvs() {
    if (!this._uvs) {
      this._uvs = new TextureUvs();
    }
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
