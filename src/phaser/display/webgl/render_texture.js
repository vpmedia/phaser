import { Rectangle } from '../../geom/rectangle';
import { Point } from '../../geom/point';
import { Texture } from './texture';
import { BaseTexture } from './base_texture';
import { FilterTexture } from './filter_texture';
import { CanvasBuffer } from '../canvas/buffer';
import { RENDER_WEBGL } from '../../core/const';

export class RenderTexture extends Texture {
  /**
   * TBD.
   * @param {number} width - TBD.
   * @param {number} height - TBD.
   * @param renderer
   * @param scaleMode
   * @param resolution
   */
  constructor(width, height, renderer, scaleMode, resolution = 1) {
    const w = width || 100;
    const h = height || 100;
    const res = resolution || 1;
    const baseTexture = new BaseTexture(null, scaleMode || window.PhaserRegistry.TEXTURE_SCALE_MODE);
    baseTexture.width = width * res;
    baseTexture.height = height * res;
    baseTexture._glTextures = [];
    baseTexture.resolution = res;
    baseTexture.scaleMode = scaleMode || window.PhaserRegistry.TEXTURE_SCALE_MODE;
    baseTexture.hasLoaded = true;
    super(baseTexture, new Rectangle(0, 0, w * res, h * res));
    this.width = w;
    this.height = h;
    this.resolution = res;
    this.frame = new Rectangle(0, 0, this.width * this.resolution, this.height * this.resolution);
    this.crop = new Rectangle(0, 0, this.width * this.resolution, this.height * this.resolution);
    this.renderer = renderer;
    if (this.renderer.type === RENDER_WEBGL) {
      const gl = this.renderer.gl;
      this.baseTexture._dirty[gl.id] = false;
      this.textureBuffer = new FilterTexture(gl, this.width, this.height, this.baseTexture.scaleMode);
      this.baseTexture._glTextures[gl.id] = this.textureBuffer.texture;
      this.render = this.renderWebGL;
      this.projection = new Point(this.width * 0.5, -this.height * 0.5);
    } else {
      this.render = this.renderCanvas;
      this.textureBuffer = new CanvasBuffer(this.width * this.resolution, this.height * this.resolution);
      this.baseTexture.source = this.textureBuffer.canvas;
    }
    this.valid = true;
    this._updateUvs();
  }

  /**
   * TBD.
   */
  resize() {
    // TODO
  }

  /**
   * TBD.
   */
  clear() {
    // TODO
  }

  /**
   * TBD.
   */
  renderWebGL() {
    // TODO
  }

  /**
   * TBD.
   */
  renderCanvas() {
    // TODO
  }

  /**
   * TBD.
   */
  getImage() {
    const image = new Image();
    image.src = this.getBase64();
    return image;
  }

  /**
   * TBD.
   */
  getBase64() {
    return this.getCanvas().toDataURL();
  }

  /**
   * TBD.
   */
  getCanvas() {
    // TODO
  }
}
