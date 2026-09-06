import type { Game } from './game.js';
import { GROUP } from './const.js';
import { Tween } from './tween.js';
import {
  backIn,
  backInOut,
  backOut,
  bounceIn,
  bounceInOut,
  bounceOut,
  circularIn,
  circularInOut,
  circularOut,
  cubicIn,
  cubicInOut,
  cubicOut,
  elasticIn,
  elasticInOut,
  elasticOut,
  exponentialIn,
  exponentialInOut,
  exponentialOut,
  linearNone,
  quadraticIn,
  quadraticInOut,
  quadraticOut,
  quarticIn,
  quarticInOut,
  quarticOut,
  quinticIn,
  quinticInOut,
  quinticOut,
  sinusoidalIn,
  sinusoidalInOut,
  sinusoidalOut,
} from './tween_easing.js';

/** What a tween can be attached to: any object, or a list of them. */
export type TweenTarget = object | object[];

export class TweenManager {
  public game!: Game;
  public _tweens!: Tween[];
  public _add!: Tween[];
  public easeMap!: Record<string, (k: number) => number>;
  /**
   * Creates a new TweenManager instance.
   * @param {Game} game - The game instance this manager belongs to.
   */
  public constructor(game: Game) {
    this.game = game;
    /** @type {Tween[]} */
    this._tweens = [];
    /** @type {Tween[]} */
    this._add = [];
    /** @type {{[key: string]: (k: number) => number}} */
    this.easeMap = {
      Linear: linearNone,
      Quad: quadraticOut,
      Cubic: cubicOut,
      Quart: quarticOut,
      Quint: quinticOut,
      Sine: sinusoidalOut,
      Expo: exponentialOut,
      Circ: circularOut,
      Elastic: elasticOut,
      Back: backOut,
      Bounce: bounceOut,
      'Quad.easeIn': quadraticIn,
      'Cubic.easeIn': cubicIn,
      'Quart.easeIn': quarticIn,
      'Quint.easeIn': quinticIn,
      'Sine.easeIn': sinusoidalIn,
      'Expo.easeIn': exponentialIn,
      'Circ.easeIn': circularIn,
      'Elastic.easeIn': elasticIn,
      'Back.easeIn': backIn,
      'Bounce.easeIn': bounceIn,
      'Quad.easeOut': quadraticOut,
      'Cubic.easeOut': cubicOut,
      'Quart.easeOut': quarticOut,
      'Quint.easeOut': quinticOut,
      'Sine.easeOut': sinusoidalOut,
      'Expo.easeOut': exponentialOut,
      'Circ.easeOut': circularOut,
      'Elastic.easeOut': elasticOut,
      'Back.easeOut': backOut,
      'Bounce.easeOut': bounceOut,
      'Quad.easeInOut': quadraticInOut,
      'Cubic.easeInOut': cubicInOut,
      'Quart.easeInOut': quarticInOut,
      'Quint.easeInOut': quinticInOut,
      'Sine.easeInOut': sinusoidalInOut,
      'Expo.easeInOut': exponentialInOut,
      'Circ.easeInOut': circularInOut,
      'Elastic.easeInOut': elasticInOut,
      'Back.easeInOut': backInOut,
      'Bounce.easeInOut': bounceInOut,
    };

    this.game.onPause.add(this._pauseAll, this);
    this.game.onResume.add(this._resumeAll, this);
  }

  /**
   * Get all tweens managed by this manager.
   * @returns {Tween[]} An array of all active tweens.
   */
  public getAll() {
    return this._tweens;
  }

  /**
   * Remove all tweens from the manager.
   * This method removes all active and pending tweens.
   */
  public removeAll(): void {
    for (const tween of this._tweens) {
      tween.pendingDelete = true;
    }
    this._add = [];
  }

  /**
   * Remove tweens associated with an object or its children.
   * @param {object} obj - The object to remove tweens from.
   * @param {object[]} children - Optional array of child objects to remove tweens from.
   */
  public removeFrom(obj: TweenTarget, children: object[] | null = null): void {
    if (Array.isArray(obj)) {
      for (const entry of obj as object[]) {
        this.removeFrom(entry);
      }
      return;
    }
    const group = obj as { type?: number; children?: TweenTarget[] };
    if (group.type === GROUP && children && group.children) {
      for (const child of group.children) {
        this.removeFrom(child);
      }
      return;
    }
    const running = [...this._tweens];
    for (const tween of running) {
      if (obj === tween.target) {
        this.remove(tween);
      }
    }
    const pending = [...this._add];
    for (const tween of pending) {
      if (obj === tween.target) {
        this.remove(tween);
      }
    }
  }

  /**
   * Add a tween to the manager.
   * @param {Tween} tween - The tween to add.
   */
  public add(tween: Tween): void {
    tween.manager = this;
    this._add.push(tween);
  }

  /**
   * Create a new tween for an object.
   * @param {object} object - The object to create a tween for.
   * @returns {Tween} The created Tween object.
   */
  public create(object: TweenTarget): Tween {
    return new Tween(object, this.game, this);
  }

  /**
   * Remove a tween from the manager.
   * @param {Tween | null | undefined} tween - The tween to remove.
   */
  public remove(tween: Tween | null | undefined): void {
    if (!tween) {
      return;
    }
    let i = this._tweens.indexOf(tween);
    if (i !== -1) {
      this._tweens[i]!.pendingDelete = true;
    } else {
      i = this._add.indexOf(tween);
      if (i !== -1) {
        this._add[i]!.pendingDelete = true;
      }
    }
  }

  /**
   * Update all tweens managed by this manager.
   * @returns {boolean} True if any tweens were updated, false otherwise.
   */
  public update(): boolean {
    const addTweens = this._add.length;
    let numTweens = this._tweens.length;
    if (numTweens === 0 && addTweens === 0) {
      return false;
    }
    let i = 0;
    while (i < numTweens) {
      if (this._tweens[i]!.update(this.game.time.time)) {
        i += 1;
      } else {
        this._tweens.splice(i, 1);
        numTweens -= 1;
      }
    }
    //  If there are any new tweens to be added, do so now - otherwise they can be spliced out of the array before ever running
    if (addTweens > 0) {
      this._tweens = [...this._tweens, ...this._add];
      this._add.length = 0;
    }
    return true;
  }

  /**
   * Check if an object is currently being tweened.
   * @param {object} object - The object to check.
   * @returns {boolean} True if the object is being tweened, false otherwise.
   */
  public isTweening(object: unknown): boolean {
    return this._tweens.some((tween: Tween): boolean => tween.target === object);
  }

  /**
   * Pause all tweens managed by this manager.
   * This method pauses all active tweens.
   */
  public _pauseAll(): void {
    for (const tween of this._tweens) {
      tween._pause();
    }
  }

  /**
   * Resume all tweens managed by this manager.
   * This method resumes all paused tweens.
   */
  public _resumeAll(): void {
    for (const tween of this._tweens) {
      tween._resume();
    }
  }

  /**
   * Pause all tweens managed by this manager.
   * This method pauses all active tweens.
   */
  public pauseAll(): void {
    for (const tween of this._tweens) {
      tween.pause();
    }
  }

  /**
   * Resume all tweens managed by this manager.
   * This method resumes all paused tweens.
   */
  public resumeAll(): void {
    for (const tween of this._tweens) {
      tween.resume();
    }
  }
}
