/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Mat Groves http://matgroves.com/ @Doormat23
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
import {
  RENDER_CANVAS,
  SCALE_LINEAR,
  BLEND_NORMAL,
  BLEND_ADD,
  BLEND_MULTIPLY,
  BLEND_SCREEN,
  BLEND_OVERLAY,
  BLEND_DARKEN,
  BLEND_LIGHTEN,
  BLEND_COLOR_DODGE,
  BLEND_COLOR_BURN,
  BLEND_HARD_LIGHT,
  BLEND_SOFT_LIGHT,
  BLEND_DIFFERENCE,
  BLEND_EXCLUSION,
  BLEND_HUE,
  BLEND_SATURATION,
  BLEND_COLOR,
  BLEND_LUMINOSITY,
  SCALE_NEAREST,
} from '../../core/const';
import { getSmoothingPrefix } from './util';
import { detectCapabilities } from './tinter';
import * as CanvasMaskManager from './masker';

export default class {
  constructor(game) {
    detectCapabilities();
    this.type = RENDER_CANVAS;
    this.resolution = game.config.resolution;
    this.clearBeforeRender = game.config.clearBeforeRender;
    this.transparent = game.config.transparent;
    this.autoResize = false;
    this.width = game.width * this.resolution;
    this.height = game.height * this.resolution;
    this.view = game.canvas;
    this.context = this.view.getContext('2d', { alpha: this.transparent });
    if (!this.context) {
      throw new Error('Error creating Canvas 2D context.');
    }
    this.refresh = true;
    this.count = 0;
    this.renderSession = {
      context: this.context,
      maskManager: CanvasMaskManager,
      scaleMode: game.config.antialias ? SCALE_LINEAR : SCALE_NEAREST,
      smoothProperty: getSmoothingPrefix(this.context),
      roundPixels: game.config.roundPixels,
    };
    this.mapBlendModes();
    this.resize(this.width, this.height);
  }

  render(root) {
    if (!this.context) {
      return;
    }
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.globalAlpha = 1;
    this.renderSession.currentBlendMode = 0;
    this.renderSession.shakeX = 0;
    this.renderSession.shakeY = 0;
    this.context.globalCompositeOperation = 'source-over';
    if (this.clearBeforeRender) {
      if (this.transparent) {
        this.context.clearRect(0, 0, this.width, this.height);
      } else if (root._bgColor) {
        this.context.fillStyle = root._bgColor.rgba;
        this.context.fillRect(0, 0, this.width, this.height);
      }
    }
    this.renderDisplayObject(root);
  }

  destroy(removeView = true) {
    if (removeView && this.view.parent) {
      this.view.parent.removeChild(this.view);
    }
    this.view = null;
    this.context = null;
    this.renderSession = null;
  }

  resize(width, height) {
    this.width = width * this.resolution;
    this.height = height * this.resolution;
    this.view.width = this.width;
    this.view.height = this.height;
    if (this.autoResize) {
      this.view.style.width = this.width / this.resolution + 'px';
      this.view.style.height = this.height / this.resolution + 'px';
    }
    if (this.renderSession.smoothProperty) {
      this.context[this.renderSession.smoothProperty] =
        this.renderSession.scaleMode === SCALE_LINEAR;
    }
  }

  renderDisplayObject(displayObject, context, matrix) {
    this.renderSession.context = context || this.context;
    this.renderSession.resolution = this.resolution;
    displayObject.renderCanvas(this.renderSession, matrix);
  }

  mapBlendModes() {
    if (window.PhaserRegistry.blendModesCanvas) {
      return;
    }
    const b = [];
    const useNew = window.PhaserRegistry.CAN_CANVAS_USE_MULTIPLY;
    b[BLEND_NORMAL] = 'source-over';
    b[BLEND_ADD] = 'lighter';
    b[BLEND_MULTIPLY] = useNew ? 'multiply' : 'source-over';
    b[BLEND_SCREEN] = useNew ? 'screen' : 'source-over';
    b[BLEND_OVERLAY] = useNew ? 'overlay' : 'source-over';
    b[BLEND_DARKEN] = useNew ? 'darken' : 'source-over';
    b[BLEND_LIGHTEN] = useNew ? 'lighten' : 'source-over';
    b[BLEND_COLOR_DODGE] = useNew ? 'color-dodge' : 'source-over';
    b[BLEND_COLOR_BURN] = useNew ? 'color-burn' : 'source-over';
    b[BLEND_HARD_LIGHT] = useNew ? 'hard-light' : 'source-over';
    b[BLEND_SOFT_LIGHT] = useNew ? 'soft-light' : 'source-over';
    b[BLEND_DIFFERENCE] = useNew ? 'difference' : 'source-over';
    b[BLEND_EXCLUSION] = useNew ? 'exclusion' : 'source-over';
    b[BLEND_HUE] = useNew ? 'hue' : 'source-over';
    b[BLEND_SATURATION] = useNew ? 'saturation' : 'source-over';
    b[BLEND_COLOR] = useNew ? 'color' : 'source-over';
    b[BLEND_LUMINOSITY] = useNew ? 'luminosity' : 'source-over';
    window.PhaserRegistry.blendModesCanvas = b;
  }
}
