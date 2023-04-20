import { Matrix } from '../geom/matrix';
import { DisplayObject } from '../display/display_object';
import { setUserSelect, setTouchAction } from '../display/canvas/util';
import { valueToColor } from '../util/math';
import { SCALE_LINEAR, SCALE_NEAREST } from './const';
import { Game } from './game';

export class Stage extends DisplayObject {
  /**
   * TBD.
   * @param {Game} game - TBD.
   */
  constructor(game) {
    super();
    this.game = game;
    this.name = '_stage_root';
    this.worldTransform = new Matrix();
    this.currentRenderOrderID = 0;
    this._bgColor = {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
      color: 0,
      rgba: '#000000',
    };
    if (!game.config.transparent) {
      // transparent = 0,0,0,0 - otherwise r,g,b,1
      this._bgColor.a = 1;
    }
    if (game.config.backgroundColor && !this.game.config.transparent) {
      this.setBackgroundColor(game.config.backgroundColor);
    }
  }

  /**
   * TBD.
   * @param {number} color - TBD.
   */
  setBackgroundColor(color) {
    if (this.game.config.transparent) {
      return;
    }
    valueToColor(color, this._bgColor);
    //  For gl.clearColor (canvas uses _bgColor.rgba)
    this._bgColor.r /= 255;
    this._bgColor.g /= 255;
    this._bgColor.b /= 255;
    this._bgColor.a = 1;
  }

  /**
   * TBD.
   */
  boot() {
    setUserSelect(this.game.canvas, 'none');
    setTouchAction(this.game.canvas, 'none');
  }

  /**
   * TBD.
   */
  preUpdate() {
    this.currentRenderOrderID = 0;
    //  This can't loop in reverse, we need the renderOrderID to be in sequence
    for (let i = 0; i < this.children.length; i += 1) {
      this.children[i].preUpdate();
    }
  }

  /**
   * TBD.
   */
  update() {
    let i = this.children.length;
    while (i) {
      i -= 1;
      this.children[i].update();
    }
  }

  /**
   * TBD.
   */
  postUpdate() {
    for (let i = 0; i < this.children.length; i += 1) {
      this.children[i].postUpdate();
    }
    this.updateTransform();
  }

  /**
   * TBD.
   */
  updateTransform() {
    this.worldAlpha = 1;
    for (let i = 0; i < this.children.length; i += 1) {
      this.children[i].updateTransform();
    }
  }

  /**
   * TBD.
   */
  destroy() {
    this.exists = false;
    this.game = null;
    this.worldTransform = null;
    this._bgColor = null;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get backgroundColor() {
    return this._bgColor.color;
  }

  /**
   * TBD.
   */
  set backgroundColor(value) {
    this.setBackgroundColor(value);
  }

  /**
   * TBD.
   * @returns {boolean} TBD.
   */
  get smoothed() {
    return window.PhaserRegistry.TEXTURE_SCALE_MODE === SCALE_LINEAR;
  }

  /**
   * TBD.
   */
  set smoothed(value) {
    window.PhaserRegistry.TEXTURE_SCALE_MODE = value ? SCALE_LINEAR : SCALE_NEAREST;
  }
}
