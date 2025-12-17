import { AnimationManager } from '../core/animation_manager.js';
import { BLEND_NORMAL, IMAGE, PENDING_ATLAS, SCALE_NEAREST } from '../core/const.js';
import { EventManager } from '../core/event_manager.js';
import { Rectangle } from '../geom/rectangle.js';
import { clone } from '../geom/util/rectangle.js';
import { DisplayObject } from './display_object.js';
import { getBounds, getLocalBounds, renderCanvas, renderWebGL, setTexture } from './sprite_util.js';
import { Texture } from './webgl/texture.js';

export class Image extends DisplayObject {
  /**
   * Creates a new Image instance.
   * @param {import('../core/game.js').Game} game - The game instance this image belongs to.
   * @param {number} x - The x position of the image.
   * @param {number} y - The y position of the image.
   * @param {string | number | Texture} key - The texture key or texture to use.
   * @param {string | number} frame - The frame identifier (name or index) to use.
   */
  constructor(game, x, y, key, frame = 0) {
    super(game);
    /** @type {number} */
    this.type = IMAGE;
    /** @type {boolean} */
    this.renderable = true;
    /** @type {string | number | Texture} */
    this.key = key;
    this.texture = window.PhaserRegistry.CACHE_MISSING_IMAGE;
    /** @type {object} */
    this.data = {};
    /** @type {number} */
    this._width = 0;
    /** @type {number} */
    this._height = 0;
    /** @type {number} */
    this.tint = 0xffffff;
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
    /* if (this.texture.baseTexture.hasLoaded) {
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
  destroy() {
    this.game = null;
    this.key = null;
    this.data = null;
    this.texture = null;
    this.tint = 0xffffff;
    this.cachedTint = -1;
    this.tintedTexture = null;
    this.shader = null;
    this._frame = null;
    if (this.events) {
      this.events.destroy();
    }
    this.events = null;
    if (this.animations) {
      this.animations.destroy();
    }
    this.animations = null;
    super.destroy();
  }

  /**
   * Called before the update cycle for this image.
   */
  preUpdate() {
    if (this.pendingDestroy) {
      this.destroy();
      return;
    }
    if (!this.exists || !this.parent.exists) {
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
    for (let i = 0; i < this.children.length; i += 1) {
      this.children[i].preUpdate();
    }
  }

  // LoadTexture

  /**
   * Loads a texture for this image.
   * @param {string | number | Texture} key - The texture key or texture to use.
   * @param {string | number | null | undefined} frame - The frame identifier (name or index) to use.
   * @param {boolean} stopAnimation - Whether to stop the animation when changing textures.
   */
  loadTexture(key, frame = 0, stopAnimation = true) {
    if (key === PENDING_ATLAS) {
      key = frame;
      frame = 0;
    } else {
      frame = frame || 0;
    }
    if (stopAnimation) {
      this.animations.stop();
    }
    this.key = key;
    this.customRender = false;
    const cache = this.game.cache;
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
   * @param {import('../core/frame.js').Frame} frame - The frame to set.
   */
  setFrame(frame) {
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
   * @param {DisplayObject} parent - The parent display object.
   * @param {number} width - The new width of the frame.
   * @param {number} height - The new height of the frame.
   */
  resizeFrame(parent, width, height) {
    this.texture.frame.resize(width, height);
    this.texture.setFrame(this.texture.frame);
  }

  /**
   * Resets the frame of this image to its original frame.
   */
  resetFrame() {
    if (this._frame) {
      this.setFrame(this._frame);
    }
  }

  /**
   * Gets the current frame index of this image.
   * @returns {number} The current frame index.
   */
  get frame() {
    return this.animations.frame;
  }

  /**
   * Sets the current frame index of this image.
   * @param {number} value - The new frame index to set.
   */
  set frame(value) {
    this.animations.frame = value;
  }

  /**
   * Gets the current frame name of this image.
   * @returns {string} The current frame name.
   */
  get frameName() {
    return this.animations.frameName;
  }

  /**
   * Sets the current frame name of this image.
   * @param {string} value - The new frame name to set.
   */
  set frameName(value) {
    this.animations.frameName = value;
  }

  // Crop

  /**
   * Crops the texture of this image.
   * @param {Rectangle} rect - The rectangle to crop to.
   * @param {boolean} copy - Whether to copy the rect or use it directly.
   */
  crop(rect, copy = false) {
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
  updateCrop() {
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
  get width() {
    return this.scale.x * this.texture.frame.width;
  }

  /**
   * Sets the width of this image.
   * @param {number} value - The new width in pixels.
   */
  set width(value) {
    this.scale.x = value / this.texture.frame.width;
    this._width = value;
  }

  /**
   * Gets the height of this image.
   * @returns {number} The height in pixels.
   */
  get height() {
    return this.scale.y * this.texture.frame.height;
  }

  /**
   * Sets the height of this image.
   * @param {number} value - The new height in pixels.
   */
  set height(value) {
    this.scale.y = value / this.texture.frame.height;
    this._height = value;
  }

  /**
   * Called when the texture of this image is updated.
   */
  onTextureUpdate() {
    // so if _width is 0 then width was not set..
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
  setTexture(texture, destroyBase = false) {
    setTexture(this, texture, destroyBase);
  }

  /**
   * Gets the bounds of this image.
   * @param {import('../geom/matrix.js').Matrix} matrix - The transformation matrix to use.
   * @returns {Rectangle} The bounds rectangle of this image.
   */
  getBounds(matrix = null) {
    return getBounds(this, matrix);
  }

  /**
   * TBD.
   * @returns {Rectangle} TBD.
   */
  getLocalBounds() {
    return getLocalBounds(this);
  }

  /**
   * Renders this image using WebGL.
   * @param {object} renderSession - The WebGL rendering session.
   * @param {import('../geom/matrix.js').Matrix} matrix - The transformation matrix to use.
   */
  renderWebGL(renderSession, matrix = null) {
    renderWebGL(this, renderSession, matrix);
  }

  /**
   * Renders this image using Canvas.
   * @param {object} renderSession - The Canvas rendering session.
   * @param {import('../geom/matrix.js').Matrix} matrix - The transformation matrix to use.
   */
  renderCanvas(renderSession, matrix = null) {
    renderCanvas(this, renderSession, matrix);
  }
}
