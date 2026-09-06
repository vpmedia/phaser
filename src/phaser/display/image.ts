import { AnimationManager } from '../core/animation_manager.js';
import { BLEND_NORMAL, IMAGE, PENDING_ATLAS, SCALE_NEAREST } from '../core/const.js';
import { EventManager } from '../core/event_manager.js';
import { Rectangle } from '../geom/rectangle.js';
import { clone } from '../geom/util/rectangle.js';
import { DisplayObject } from './display_object.js';
import { getBounds, getLocalBounds, renderCanvas, renderWebGL, setTexture } from './sprite_util.js';
import { Texture } from './webgl/texture.js';
import type { Game } from '../core/game.js';
import type { Frame } from '../core/frame.js';
import type { Matrix } from '../geom/matrix.js';
import type { RenderSession } from './render_session.js';

export class Image extends DisplayObject {
  public key!: any;
  public texture!: Texture;
  declare public _width: number;
  declare public _height: number;
  public tint!: number;
  public cachedTint!: number;
  public tilingTexture!: Texture | null;
  public tintedTexture!: HTMLCanvasElement | null;
  public blendMode!: number;
  public shader!: object | null;
  public _frame!: any;
  public pendingDestroy!: boolean;
  declare public events: EventManager;
  public animations!: AnimationManager;
  public customRender!: boolean;
  public cropRect!: Rectangle | null;
  public _crop!: Rectangle | null;
  public refreshTexture!: boolean;
  declare public renderOrderID: number;
  /**
   * Creates a new Image instance.
   * @param {Game} game - The game instance this image belongs to.
   * @param {number} x - The x position of the image.
   * @param {number} y - The y position of the image.
   * @param {string | number | Texture} key - The texture key or texture to use.
   * @param {string | number} frame - The frame identifier (name or index) to use.
   */
  public constructor(
    game: Game,
    x: number,
    y: number,
    key: string | number | Texture | null,
    frame: string | number | null = 0
  ) {
    super(game);
    /** @type {number} */
    this.type = IMAGE;
    /** @type {boolean} */
    this.renderable = true;
    /** @type {string | number | Texture} */
    this.key = key;
    this.texture = globalThis.PhaserRegistry.CACHE_MISSING_IMAGE;
    /** @type {object} */
    this.data = {};
    /** @type {number} */
    this._width = 0;
    /** @type {number} */
    this._height = 0;
    /** @type {number} */
    this.tint = 0xff_ff_ff;
    /** @type {number} */
    this.cachedTint = -1;
    /** @type {Texture | null} */
    this.tilingTexture = null;
    /** @type {Texture | null} */
    this.tintedTexture = null;
    /** @type {number} */
    this.blendMode = BLEND_NORMAL;
    this.shader = null;
    this._frame = null;
    /** @type {boolean} */
    this.pendingDestroy = false;
    /* If (this.texture.baseTexture.hasLoaded) {
      this.onTextureUpdate();
    } */
    this.position.setTo(x, y);
    /** @type {EventManager} */
    this.events = new EventManager(this);
    /** @type {AnimationManager} */
    this.animations = new AnimationManager(this);
    this.loadTexture(key, frame);
  }

  /**
   * Destroys this image and cleans up resources.
   */
  public override destroy(): void {
    this.game = null!;
    this.key = null;
    this.data = null;
    this.texture = null!;
    this.tint = 0xff_ff_ff;
    this.cachedTint = -1;
    this.tintedTexture = null;
    this.shader = null;
    this._frame = null;
    if (this.events) {
      this.events.destroy();
    }
    this.events = null!;
    if (this.animations) {
      this.animations.destroy();
    }
    this.animations = null!;
    super.destroy();
  }

  /**
   * Called before the update cycle for this image.
   */
  public override preUpdate(): void {
    if (this.pendingDestroy) {
      this.destroy();
      return;
    }
    if (!this.exists || !this.parent?.exists) {
      this.renderOrderID = -1;
      return;
    }
    if (this.visible) {
      this.game.stage.currentRenderOrderID += 1;
      this.renderOrderID = this.game.stage.currentRenderOrderID;
    }
    if (this.animations) {
      this.animations.update();
    }
    for (const child of this.children) {
      child.preUpdate();
    }
  }

  // LoadTexture

  /**
   * Loads a texture for this image.
   * @param {string | number | Texture} key - The texture key or texture to use.
   * @param {string | number | null | undefined} frame - The frame identifier (name or index) to use.
   * @param {boolean} stopAnimation - Whether to stop the animation when changing textures.
   */
  public loadTexture(
    key: string | number | Texture | null,
    frame: string | number | null = 0,
    stopAnimation = true
  ): void {
    if (key === PENDING_ATLAS) {
      key = frame ?? 0;
      frame = 0;
    } else {
      frame = frame ?? 0;
    }
    if (stopAnimation) {
      this.animations.stop();
    }
    this.key = key;
    this.customRender = false;
    const { cache } = this.game;
    const smoothed = !this.texture.baseTexture.scaleMode;
    let setFrame = true;
    if (key instanceof Texture) {
      this.setTexture(key);
    } else {
      const img = cache.getImage(key, true);
      if (img) {
        this.key = img.key;
        this.setTexture(new Texture(img.base));
        if (key === '__default') {
          this.texture.baseTexture.skipRender = true;
        } else {
          this.texture.baseTexture.skipRender = false;
        }
        setFrame = !this.animations.loadFrameData(img.frameData, frame);
      }
    }
    if (setFrame) {
      this._frame = clone(this.texture.frame);
    }
    if (!smoothed) {
      this.texture.baseTexture.scaleMode = SCALE_NEAREST;
    }
  }

  /**
   * Sets the current frame of this image.
   * @param {Frame} frame - The frame to set.
   */
  public setFrame(frame: Frame): void {
    this._frame = frame;
    this.texture.frame.x = frame.x;
    this.texture.frame.y = frame.y;
    this.texture.frame.width = frame.width;
    this.texture.frame.height = frame.height;
    this.texture.crop.x = frame.x;
    this.texture.crop.y = frame.y;
    this.texture.crop.width = frame.width;
    this.texture.crop.height = frame.height;
    if (frame.trimmed) {
      if (this.texture.trim) {
        this.texture.trim.x = frame.spriteSourceSizeX;
        this.texture.trim.y = frame.spriteSourceSizeY;
        this.texture.trim.width = frame.sourceSizeW;
        this.texture.trim.height = frame.sourceSizeH;
      } else {
        this.texture.trim = {
          x: frame.spriteSourceSizeX,
          y: frame.spriteSourceSizeY,
          width: frame.sourceSizeW,
          height: frame.sourceSizeH,
        };
      }
      this.texture.width = frame.sourceSizeW;
      this.texture.height = frame.sourceSizeH;
      this.texture.frame.width = frame.sourceSizeW;
      this.texture.frame.height = frame.sourceSizeH;
    } else if (!frame.trimmed && this.texture.trim) {
      this.texture.trim = null;
    }
    if (this.cropRect) {
      this.updateCrop();
    }
    this.texture.requiresReTint = true;
    this.texture._updateUvs();
    if (this.tilingTexture) {
      this.refreshTexture = true;
    }
  }

  /**
   * Resizes the frame of this image.
   * @param {DisplayObject} _parent - The parent display object.
   * @param {number} width - The new width of the frame.
   * @param {number} height - The new height of the frame.
   */
  public resizeFrame(_parent: DisplayObject, width: number, height: number): void {
    this.texture.frame.resize(width, height);
    this.texture.setFrame(this.texture.frame);
  }

  /**
   * Resets the frame of this image to its original frame.
   */
  public resetFrame(): void {
    if (this._frame) {
      this.setFrame(this._frame);
    }
  }

  /**
   * Gets the current frame index of this image.
   * @returns {number} The current frame index.
   */
  public get frame(): number {
    return this.animations.frame;
  }

  /**
   * Sets the current frame index of this image.
   * @param {number} value - The new frame index to set.
   */
  public set frame(value: number) {
    this.animations.frame = value;
  }

  /**
   * Gets the current frame name of this image.
   * @returns {string} The current frame name.
   */
  public get frameName(): string {
    return this.animations.frameName;
  }

  /**
   * Sets the current frame name of this image.
   * @param {string} value - The new frame name to set.
   */
  public set frameName(value: string) {
    this.animations.frameName = value;
  }

  // Crop

  /**
   * Crops the texture of this image.
   * @param {Rectangle} rect - The rectangle to crop to.
   * @param {boolean} copy - Whether to copy the rect or use it directly.
   */
  public crop(rect: Rectangle, copy = false): void {
    if (rect) {
      if (copy && this.cropRect !== null) {
        this.cropRect.setTo(rect.x, rect.y, rect.width, rect.height);
      } else if (copy && this.cropRect === null) {
        this.cropRect = new Rectangle(rect.x, rect.y, rect.width, rect.height);
      } else {
        this.cropRect = rect;
      }
      this.updateCrop();
    } else {
      this._crop = null;
      this.cropRect = null;
      this.resetFrame();
    }
  }

  /**
   * Updates the crop rectangle of this image.
   */
  public updateCrop(): void {
    if (!this.cropRect) {
      return;
    }
    const oldX = this.texture.crop.x;
    const oldY = this.texture.crop.y;
    const oldW = this.texture.crop.width;
    const oldH = this.texture.crop.height;
    this._crop = clone(this.cropRect, this._crop);
    this._crop.x += this._frame.x;
    this._crop.y += this._frame.y;
    const cx = Math.max(this._frame.x, this._crop.x);
    const cy = Math.max(this._frame.y, this._crop.y);
    const cw = Math.min(this._frame.right, this._crop.right) - cx;
    const ch = Math.min(this._frame.bottom, this._crop.bottom) - cy;
    this.texture.crop.x = cx;
    this.texture.crop.y = cy;
    this.texture.crop.width = cw;
    this.texture.crop.height = ch;
    this.texture.frame.width = Math.min(cw, this.cropRect.width);
    this.texture.frame.height = Math.min(ch, this.cropRect.height);
    this.texture.width = this.texture.frame.width;
    this.texture.height = this.texture.frame.height;
    this.texture._updateUvs();
    if (this.tint !== 0xffffff && (oldX !== cx || oldY !== cy || oldW !== cw || oldH !== ch)) {
      this.texture.requiresReTint = true;
    }
  }

  /**
   * Gets the width of this image.
   * @returns {number} The width in pixels.
   */
  public override get width(): number {
    return this.scale.x * this.texture.frame.width;
  }

  /**
   * Sets the width of this image.
   * @param {number} value - The new width in pixels.
   */
  public override set width(value: number) {
    this.scale.x = value / this.texture.frame.width;
    this._width = value;
  }

  /**
   * Gets the height of this image.
   * @returns {number} The height in pixels.
   */
  public override get height(): number {
    return this.scale.y * this.texture.frame.height;
  }

  /**
   * Sets the height of this image.
   * @param {number} value - The new height in pixels.
   */
  public override set height(value: number) {
    this.scale.y = value / this.texture.frame.height;
    this._height = value;
  }

  /**
   * Called when the texture of this image is updated.
   */
  public onTextureUpdate(): void {
    // So if _width is 0 then width was not set..
    if (this._width) {
      this.scale.x = this._width / this.texture.frame.width;
    }
    if (this._height) {
      this.scale.y = this._height / this.texture.frame.height;
    }
  }

  /**
   * Sets the texture for this image.
   * @param {Texture} texture - The new texture to set.
   * @param {boolean} destroyBase - Whether to destroy the base texture.
   */
  public setTexture(texture: Texture, destroyBase = false): void {
    setTexture(this, texture, destroyBase);
  }

  /**
   * Gets the bounds of this image.
   * @param {Matrix} matrix - The transformation matrix to use.
   * @returns {Rectangle} The bounds rectangle of this image.
   */
  public override getBounds(matrix: Matrix | null = null): Rectangle {
    return getBounds(this, matrix);
  }

  /**
   * Gets the local bounds of this image.
   * @returns {Rectangle} The local bounds rectangle of this image.
   */
  public override getLocalBounds(): Rectangle {
    return getLocalBounds(this);
  }

  /**
   * Renders this image using WebGL.
   * @param {object} renderSession - The WebGL rendering session.
   * @param {Matrix} matrix - The transformation matrix to use.
   */
  public override renderWebGL(renderSession: RenderSession, matrix: Matrix | null = null): void {
    renderWebGL(this, renderSession, matrix);
  }

  /**
   * Renders this image using Canvas.
   * @param {object} renderSession - The Canvas rendering session.
   * @param {Matrix} matrix - The transformation matrix to use.
   */
  public override renderCanvas(renderSession: RenderSession, matrix: Matrix | null = null): void {
    renderCanvas(this, renderSession, matrix);
  }
}
