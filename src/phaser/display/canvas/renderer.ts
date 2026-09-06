import type { Game } from '../../core/game.js';
import type { Stage } from '../../core/stage.js';
import {
  BLEND_ADD,
  BLEND_COLOR,
  BLEND_COLOR_BURN,
  BLEND_COLOR_DODGE,
  BLEND_DARKEN,
  BLEND_DIFFERENCE,
  BLEND_EXCLUSION,
  BLEND_HARD_LIGHT,
  BLEND_HUE,
  BLEND_LIGHTEN,
  BLEND_LUMINOSITY,
  BLEND_MULTIPLY,
  BLEND_NORMAL,
  BLEND_OVERLAY,
  BLEND_SATURATION,
  BLEND_SCREEN,
  BLEND_SOFT_LIGHT,
  RENDER_CANVAS,
  SCALE_LINEAR,
  SCALE_NEAREST,
} from '../../core/const.js';
import { ENGINE_ERROR_CREATING_CANVAS_2D_CONTEXT } from '../../core/error_code.js';
import * as CanvasMaskManager from './masker.js';
import { detectCapabilities } from './tinter.js';
import { getSmoothingPrefix, setSmoothing } from './util.js';
import type { RenderSession } from '../render_session.js';

export class CanvasRenderer {
  public type!: any;
  public resolution!: number;
  public clearBeforeRender!: any;
  public transparent!: any;
  public autoResize!: any;
  public contextLost!: any;
  public width!: number;
  public height!: number;
  public view!: any;
  public context!: CanvasRenderingContext2D;
  public refresh!: any;
  public count!: any;
  public renderSession!: RenderSession;
  /**
   * Creates a new CanvasRenderer instance.
   * @param {Game} _game - The game instance.
   */
  public constructor(game: Game) {
    detectCapabilities(game);
    /** @type {number} */
    this.type = RENDER_CANVAS;
    this.resolution = game.config.resolution;
    this.clearBeforeRender = game.config.clearBeforeRender;
    this.transparent = game.config.transparent;
    this.autoResize = false;
    this.contextLost = false;
    this.width = game.width * this.resolution;
    this.height = game.height * this.resolution;
    this.view = game.canvas;
    /** @type {CanvasRenderingContext2D} */
    this.context = this.view.getContext('2d', { willReadFrequently: false, alpha: this.transparent });
    if (!this.context) {
      throw new Error(ENGINE_ERROR_CREATING_CANVAS_2D_CONTEXT);
    }
    this.refresh = true;
    this.count = 0;
    // Only the canvas half of the session applies to this renderer.
    this.renderSession = {
      context: this.context,
      maskManager: CanvasMaskManager,
      scaleMode: game.config.antialias ? SCALE_LINEAR : SCALE_NEAREST,
      smoothProperty: getSmoothingPrefix(this.context),
      roundPixels: game.config.roundPixels,
    } as RenderSession;
    this.mapBlendModes();
    this.resize(this.width, this.height);
  }

  /**
   * Renders the stage to canvas.
   * @param {Stage} root - The root stage to render.
   */
  public render(root: Stage): void {
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

  /**
   * Destroys this renderer and cleans up resources.
   * @param {boolean} removeView - Whether to remove the view from the DOM.
   */
  public destroy(removeView = true): void {
    if (removeView && this.view.parent) {
      this.view.parent.removeChild(this.view);
    }
  }

  /**
   * Resizes the canvas to the specified dimensions.
   * @param {number} width - The new width of the canvas.
   * @param {number} height - The new height of the canvas.
   */
  public resize(width: number, height: number): void {
    this.width = width * this.resolution;
    this.height = height * this.resolution;
    this.view.width = this.width;
    this.view.height = this.height;
    if (this.autoResize) {
      this.view.style.width = `${this.width / this.resolution}px`;
      this.view.style.height = `${this.height / this.resolution}px`;
    }
    if (this.renderSession.smoothProperty) {
      setSmoothing(this.context, this.renderSession.smoothProperty, this.renderSession.scaleMode === SCALE_LINEAR);
    }
  }

  /**
   * Renders a display object to canvas.
   * @param {Image} displayObject - The display object to render.
   * @param {CanvasRenderingContext2D} context - The canvas rendering context.
   * @param {Matrix} matrix - The transformation matrix.
   */
  public renderDisplayObject(displayObject: any, context?: any, matrix?: any): void {
    this.renderSession.context = context ?? this.context;
    this.renderSession.resolution = this.resolution;
    displayObject.renderCanvas(this.renderSession, matrix);
  }

  /**
   * Maps blend modes to canvas rendering operations.
   */
  public mapBlendModes(): void {
    if (globalThis.PhaserRegistry.blendModesCanvas) {
      return;
    }
    const b: GlobalCompositeOperation[] = [];
    const useNew = globalThis.PhaserRegistry.CAN_CANVAS_USE_MULTIPLY;
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
    globalThis.PhaserRegistry.blendModesCanvas = b;
  }

  /**
   * Initializes the WebGL context for rendering.
   * @param {Game} game - The game instance.
   */
  public initContext(_game: Game): void {
    // stub
  }
}
