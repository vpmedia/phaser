import { RENDER_WEBGL } from '../../core/const.js';
import { Point } from '../../geom/point.js';
import { Rectangle } from '../../geom/rectangle.js';
import { CanvasBuffer } from '../canvas/buffer.js';
import { BaseTexture } from './base_texture.js';
import { FilterTexture } from './filter_texture.js';
import { Texture } from './texture.js';
import type { WebGLRenderer } from './renderer.js';
import type { CanvasRenderer } from '../canvas/renderer.js';

export class RenderTexture extends Texture {
  declare public width: number;
  declare public height: number;
  public resolution!: number;
  declare public frame: Rectangle;
  declare public crop: Rectangle;
  public renderer!: WebGLRenderer | CanvasRenderer;
  public textureBuffer!: FilterTexture | CanvasBuffer;
  public render!: () => void;
  public projection: Point | null = null;
  declare public valid: boolean;
  /**
   * Creates a new RenderTexture instance.
   * @param {number} width - The width of the render texture.
   * @param {number} height - The height of the render texture.
   * @param {WebGLRenderer|CanvasRenderer} renderer - The renderer to use.
   * @param {number} scaleMode - The scale mode to use.
   * @param {number} resolution - The resolution to use.
   */
  public constructor(
    width: number,
    height: number,
    renderer: WebGLRenderer | CanvasRenderer,
    scaleMode: number,
    resolution = 1
  ) {
    const w = width || 100;
    const h = height || 100;
    const res = resolution || 1;
    const baseTexture = new BaseTexture(null, scaleMode || globalThis.PhaserRegistry.TEXTURE_SCALE_MODE);
    baseTexture.width = width * res;
    baseTexture.height = height * res;
    baseTexture._glTextures = [];
    baseTexture.resolution = res;
    baseTexture.scaleMode = scaleMode || globalThis.PhaserRegistry.TEXTURE_SCALE_MODE;
    baseTexture.hasLoaded = true;
    super(baseTexture, new Rectangle(0, 0, w * res, h * res));
    this.width = w;
    this.height = h;
    this.resolution = res;
    this.frame = new Rectangle(0, 0, this.width * this.resolution, this.height * this.resolution);
    this.crop = new Rectangle(0, 0, this.width * this.resolution, this.height * this.resolution);
    this.renderer = renderer;
    if (renderer.type === RENDER_WEBGL) {
      const { gl } = renderer as WebGLRenderer;
      this.baseTexture._dirty[gl.id] = false;
      const buffer = new FilterTexture(gl, this.width, this.height, this.baseTexture.scaleMode);
      this.textureBuffer = buffer;
      this.baseTexture._glTextures[gl.id] = buffer.texture;
      this.render = this.renderWebGL;
      this.projection = new Point(this.width * 0.5, -this.height * 0.5);
    } else {
      this.render = this.renderCanvas;
      const buffer = new CanvasBuffer(this.width * this.resolution, this.height * this.resolution);
      this.textureBuffer = buffer;
      this.baseTexture.source = buffer.canvas;
    }
    this.valid = true;
    this._updateUvs();
  }

  /**
   * Destroys this render texture and cleans up resources.
   */
  public resize(): void {}

  /**
   * Updates the size of this render texture.
   */
  public clear(): void {}

  /**
   * Updates the resolution of this render texture.
   */
  public renderWebGL(): void {}

  /**
   * Updates the scale mode of this render texture.
   */
  public renderCanvas(): void {}

  /**
   * Gets the HTML image element for this render texture.
   * @returns {HTMLImageElement} The HTML image element.
   */
  public getImage(): HTMLImageElement {
    const image = new Image();
    image.src = this.getBase64();
    return image;
  }

  /**
   * Gets the base64 string representation of this render texture.
   * @returns {string} The base64 string representation.
   */
  public getBase64(): string {
    return this.getCanvas()?.toDataURL() ?? '';
  }

  /**
   * Gets the canvas element for this render texture.
   * @returns {HTMLCanvasElement} The canvas element.
   */
  public getCanvas(): HTMLCanvasElement | null {
    return null;
  }
}
