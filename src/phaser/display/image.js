/**
 * @module display/image
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 */
import Texture from './webgl/texture';
import AnimationManager from '../core/animation_manager';
import EventManager from '../core/event_manager';
import Rectangle from '../geom/rectangle';
import DisplayObject from './display_object';
import { clone } from '../geom/util/rectangle';
import { IMAGE, PENDING_ATLAS, BLEND_NORMAL, SCALE_NEAREST } from '../core/const';
import { setTexture, getBounds, getLocalBounds, renderCanvas, renderWebGL } from './sprite_util';

export default class extends DisplayObject {
  /**
   * TBD.
   *
   * @param {object} game - TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param {string} key - TBD.
   * @param {string} frame - TBD.
   */
  constructor(game, x, y, key, frame) {
    super();
    this.game = game;
    this.type = IMAGE;
    this.renderable = true;
    this.key = key;
    this.texture = window.PhaserRegistry.CACHE_MISSING_IMAGE;
    this.data = {};
    this._width = 0;
    this._height = 0;
    this.tint = 0xffffff;
    this.cachedTint = -1;
    this.tintedTexture = null;
    this.blendMode = BLEND_NORMAL;
    this.shader = null;
    this._frame = null;
    /* if (this.texture.baseTexture.hasLoaded) {
      this.onTextureUpdate();
    } */
    this.position.set(x, y);
    this.events = new EventManager(this);
    this.animations = new AnimationManager(this);
    this.loadTexture(key, frame);
  }

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

  resizeFrame(parent, width, height) {
    this.texture.frame.resize(width, height);
    this.texture.setFrame(this.texture.frame);
  }

  resetFrame() {
    if (this._frame) {
      this.setFrame(this._frame);
    }
  }

  get frame() {
    return this.animations.frame;
  }

  set frame(value) {
    this.animations.frame = value;
  }

  get frameName() {
    return this.animations.frameName;
  }

  set frameName(value) {
    this.animations.frameName = value;
  }

  // Crop

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

  get width() {
    return this.scale.x * this.texture.frame.width;
  }

  set width(value) {
    this.scale.x = value / this.texture.frame.width;
    this._width = value;
  }

  get height() {
    return this.scale.y * this.texture.frame.height;
  }

  set height(value) {
    this.scale.y = value / this.texture.frame.height;
    this._height = value;
  }

  onTextureUpdate() {
    // so if _width is 0 then width was not set..
    if (this._width) {
      this.scale.x = this._width / this.texture.frame.width;
    }
    if (this._height) {
      this.scale.y = this._height / this.texture.frame.height;
    }
  }

  setTexture(texture, destroyBase = false) {
    setTexture(this, texture, destroyBase);
  }

  getBounds(matrix = null) {
    return getBounds(this, matrix);
  }

  getLocalBounds() {
    return getLocalBounds(this);
  }

  renderWebGL(renderSession, matrix = null) {
    renderWebGL(this, renderSession, matrix);
  }

  renderCanvas(renderSession, matrix = null) {
    renderCanvas(this, renderSession, matrix);
  }
}
