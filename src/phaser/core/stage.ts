import { setTouchAction, setUserSelect } from '../display/canvas/util.js';
import { DisplayObject } from '../display/display_object.js';
import { Matrix } from '../geom/matrix.js';
import { valueToColor } from '../util/math.js';
import { SCALE_LINEAR, SCALE_NEAREST } from './const.js';
import type { Game } from './game.js';

export class Stage extends DisplayObject {
  declare public name: any;
  declare public worldTransform: any;
  public currentRenderOrderID!: any;
  public _bgColor!: any;
  /**
   * Creates a new Stage instance.
   * @param {Game} game - The game instance.
   */
  public constructor(game: Game) {
    super(game);
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
   * Sets the background color of the stage.
   * @param {number} color - The color to set as the background.
   */
  public setBackgroundColor(color: number): void {
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
   * Initializes the stage after game creation.
   */
  public boot(): void {
    setUserSelect(this.game.canvas, 'none');
    setTouchAction(this.game.canvas, 'none');
  }

  /**
   * Pre-updates the stage and its children.
   */
  public override preUpdate(): void {
    this.currentRenderOrderID = 0;
    //  This can't loop in reverse, we need the renderOrderID to be in sequence
    for (let i = 0; i < this.children.length; i += 1) {
      this.children[i]!.preUpdate();
    }
  }

  /**
   * Updates the stage and its children.
   */
  public override update(): void {
    let i = this.children.length;
    while (i) {
      i -= 1;
      this.children[i]!.update();
    }
  }

  /**
   * Post-updates the stage and its children.
   */
  public override postUpdate(): void {
    for (let i = 0; i < this.children.length; i += 1) {
      this.children[i]!.postUpdate();
    }
    this.updateTransform();
  }

  /**
   * Updates the stage's transformation matrix.
   */
  public override updateTransform(): this {
    this.worldAlpha = 1;
    for (const child of this.children) {
      child.updateTransform();
    }
    return this;
  }

  /**
   * Destroys the stage and cleans up resources.
   */
  public override destroy(): void {
    this.exists = false;
    this.game = null!;
    this.worldTransform = null;
    this._bgColor = null;
  }

  /**
   * Gets the background color of the stage.
   * @returns {number} The background color.
   */
  public get backgroundColor() {
    return this._bgColor.color;
  }

  /**
   * Sets the background color of the stage.
   */
  public set backgroundColor(value) {
    this.setBackgroundColor(value);
  }

  /**
   * Gets whether texture smoothing is enabled.
   * @returns {boolean} True if texture smoothing is enabled, false otherwise.
   */
  public get smoothed(): boolean {
    return globalThis.PhaserRegistry.TEXTURE_SCALE_MODE === SCALE_LINEAR;
  }

  /**
   * Sets whether texture smoothing is enabled.
   */
  public set smoothed(value) {
    globalThis.PhaserRegistry.TEXTURE_SCALE_MODE = value ? SCALE_LINEAR : SCALE_NEAREST;
  }
}
