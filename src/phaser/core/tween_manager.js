import { GROUP } from './const.js';
import { Tween } from './tween.js';
import {
  BackIn,
  BackInOut,
  BackOut,
  BounceIn,
  BounceInOut,
  BounceOut,
  CircularIn,
  CircularInOut,
  CircularOut,
  CubicIn,
  CubicInOut,
  CubicOut,
  ElasticIn,
  ElasticInOut,
  ElasticOut,
  ExponentialIn,
  ExponentialInOut,
  ExponentialOut,
  LinearNone,
  QuadraticIn,
  QuadraticInOut,
  QuadraticOut,
  QuarticIn,
  QuarticInOut,
  QuarticOut,
  QuinticIn,
  QuinticInOut,
  QuinticOut,
  SinusoidalIn,
  SinusoidalInOut,
  SinusoidalOut,
} from './tween_easing.js';

export class TweenManager {
  /**
   * Creates a new TweenManager instance.
   * @param {import('./game.js').Game} game - The game instance this manager belongs to.
   */
  constructor(game) {
    this.game = game;
    /** @type {Tween[]} */
    this._tweens = [];
    /** @type {Tween[]} */
    this._add = [];
    /** @type {{[key: string]: (k: number) => number}} */
    this.easeMap = {
      Linear: LinearNone,
      Quad: QuadraticOut,
      Cubic: CubicOut,
      Quart: QuarticOut,
      Quint: QuinticOut,
      Sine: SinusoidalOut,
      Expo: ExponentialOut,
      Circ: CircularOut,
      Elastic: ElasticOut,
      Back: BackOut,
      Bounce: BounceOut,
      'Quad.easeIn': QuadraticIn,
      'Cubic.easeIn': CubicIn,
      'Quart.easeIn': QuarticIn,
      'Quint.easeIn': QuinticIn,
      'Sine.easeIn': SinusoidalIn,
      'Expo.easeIn': ExponentialIn,
      'Circ.easeIn': CircularIn,
      'Elastic.easeIn': ElasticIn,
      'Back.easeIn': BackIn,
      'Bounce.easeIn': BounceIn,
      'Quad.easeOut': QuadraticOut,
      'Cubic.easeOut': CubicOut,
      'Quart.easeOut': QuarticOut,
      'Quint.easeOut': QuinticOut,
      'Sine.easeOut': SinusoidalOut,
      'Expo.easeOut': ExponentialOut,
      'Circ.easeOut': CircularOut,
      'Elastic.easeOut': ElasticOut,
      'Back.easeOut': BackOut,
      'Bounce.easeOut': BounceOut,
      'Quad.easeInOut': QuadraticInOut,
      'Cubic.easeInOut': CubicInOut,
      'Quart.easeInOut': QuarticInOut,
      'Quint.easeInOut': QuinticInOut,
      'Sine.easeInOut': SinusoidalInOut,
      'Expo.easeInOut': ExponentialInOut,
      'Circ.easeInOut': CircularInOut,
      'Elastic.easeInOut': ElasticInOut,
      'Back.easeInOut': BackInOut,
      'Bounce.easeInOut': BounceInOut,
    };

    this.game.onPause.add(this._pauseAll, this);
    this.game.onResume.add(this._resumeAll, this);
  }

  /**
   * Get all tweens managed by this manager.
   * @returns {Tween[]} An array of all active tweens.
   */
  getAll() {
    return this._tweens;
  }

  /**
   * Remove all tweens from the manager.
   * This method removes all active and pending tweens.
   */
  removeAll() {
    for (let i = 0; i < this._tweens.length; i += 1) {
      this._tweens[i].pendingDelete = true;
    }
    this._add = [];
  }

  /**
   * Remove tweens associated with an object or its children.
   * @param {object} obj - The object to remove tweens from.
   * @param {object[]} children - Optional array of child objects to remove tweens from.
   */
  removeFrom(obj, children = null) {
    let i;
    let len;
    if (Array.isArray(obj)) {
      for (i = 0, len = obj.length; i < len; i += 1) {
        this.removeFrom(obj[i]);
      }
    } else if (obj.type === GROUP && children) {
      for (i = 0, len = obj.children.length; i < len; i += 1) {
        this.removeFrom(obj.children[i]);
      }
    } else {
      for (i = 0, len = this._tweens.length; i < len; i += 1) {
        if (obj === this._tweens[i].target) {
          this.remove(this._tweens[i]);
        }
      }
      for (i = 0, len = this._add.length; i < len; i += 1) {
        if (obj === this._add[i].target) {
          this.remove(this._add[i]);
        }
      }
    }
  }

  /**
   * Add a tween to the manager.
   * @param {Tween} tween - The tween to add.
   */
  add(tween) {
    tween.manager = this;
    this._add.push(tween);
  }

  /**
   * Create a new tween for an object.
   * @param {object} object - The object to create a tween for.
   * @returns {Tween} The created Tween object.
   */
  create(object) {
    return new Tween(object, this.game, this);
  }

  /**
   * Remove a tween from the manager.
   * @param {Tween | null | undefined} tween - The tween to remove.
   */
  remove(tween) {
    let i = this._tweens.indexOf(tween);
    if (i !== -1) {
      this._tweens[i].pendingDelete = true;
    } else {
      i = this._add.indexOf(tween);
      if (i !== -1) {
        this._add[i].pendingDelete = true;
      }
    }
  }

  /**
   * Update all tweens managed by this manager.
   * @returns {boolean} True if any tweens were updated, false otherwise.
   */
  update() {
    const addTweens = this._add.length;
    let numTweens = this._tweens.length;
    if (numTweens === 0 && addTweens === 0) {
      return false;
    }
    let i = 0;
    while (i < numTweens) {
      if (this._tweens[i].update(this.game.time.time)) {
        i += 1;
      } else {
        this._tweens.splice(i, 1);
        numTweens -= 1;
      }
    }
    //  If there are any new tweens to be added, do so now - otherwise they can be spliced out of the array before ever running
    if (addTweens > 0) {
      this._tweens = this._tweens.concat(this._add);
      this._add.length = 0;
    }
    return true;
  }

  /**
   * Check if an object is currently being tweened.
   * @param {object} object - The object to check.
   * @returns {boolean} True if the object is being tweened, false otherwise.
   */
  isTweening(object) {
    return this._tweens.some((tween) => tween.target === object);
  }

  /**
   * Pause all tweens managed by this manager.
   * This method pauses all active tweens.
   */
  _pauseAll() {
    for (let i = this._tweens.length - 1; i >= 0; i -= 1) {
      this._tweens[i]._pause();
    }
  }

  /**
   * Resume all tweens managed by this manager.
   * This method resumes all paused tweens.
   */
  _resumeAll() {
    for (let i = this._tweens.length - 1; i >= 0; i -= 1) {
      this._tweens[i]._resume();
    }
  }

  /**
   * Pause all tweens managed by this manager.
   * This method pauses all active tweens.
   */
  pauseAll() {
    for (let i = this._tweens.length - 1; i >= 0; i -= 1) {
      this._tweens[i].pause();
    }
  }

  /**
   * Resume all tweens managed by this manager.
   * This method resumes all paused tweens.
   */
  resumeAll() {
    for (let i = this._tweens.length - 1; i >= 0; i -= 1) {
      this._tweens[i].resume(true);
    }
  }
}
