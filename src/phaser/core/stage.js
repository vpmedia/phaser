/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
import Matrix from '../geom/matrix';
import DisplayObject from '../display/display_object';
import { setUserSelect, setTouchAction } from '../display/canvas/util';
import { valueToColor } from '../util/math';
import { SCALE_LINEAR, SCALE_NEAREST } from './const';

export default class extends DisplayObject {
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

  boot() {
    setUserSelect(this.game.canvas, 'none');
    setTouchAction(this.game.canvas, 'none');
  }

  preUpdate() {
    this.currentRenderOrderID = 0;
    //  This can't loop in reverse, we need the renderOrderID to be in sequence
    for (let i = 0; i < this.children.length; i += 1) {
      this.children[i].preUpdate();
    }
  }

  update() {
    let i = this.children.length;
    while (i) {
      i -= 1;
      this.children[i].update();
    }
  }

  postUpdate() {
    for (let i = 0; i < this.children.length; i += 1) {
      this.children[i].postUpdate();
    }
    this.updateTransform();
  }

  updateTransform() {
    this.worldAlpha = 1;
    for (let i = 0; i < this.children.length; i += 1) {
      this.children[i].updateTransform();
    }
  }

  destroy() {
    this.exists = false;
    this.game = null;
    this.worldTransform = null;
    this._bgColor = null;
  }

  get backgroundColor() {
    return this._bgColor.color;
  }

  set backgroundColor(value) {
    this.setBackgroundColor(value);
  }

  get smoothed() {
    return window.PhaserRegistry.TEXTURE_SCALE_MODE === SCALE_LINEAR;
  }

  set smoothed(value) {
    window.PhaserRegistry.TEXTURE_SCALE_MODE = value ? SCALE_LINEAR : SCALE_NEAREST;
  }
}
