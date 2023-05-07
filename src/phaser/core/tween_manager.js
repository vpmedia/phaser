import { Tween } from './tween';
import {
  LinearNone,
  QuadraticIn,
  QuadraticOut,
  QuadraticInOut,
  CubicIn,
  CubicOut,
  CubicInOut,
  QuarticIn,
  QuarticOut,
  QuarticInOut,
  QuinticIn,
  QuinticOut,
  QuinticInOut,
  SinusoidalIn,
  SinusoidalOut,
  SinusoidalInOut,
  ExponentialIn,
  ExponentialOut,
  ExponentialInOut,
  CircularIn,
  CircularOut,
  CircularInOut,
  ElasticIn,
  ElasticOut,
  ElasticInOut,
  BackIn,
  BackOut,
  BackInOut,
  BounceIn,
  BounceOut,
  BounceInOut,
} from './tween_easing';
import { GROUP } from './const';

export class TweenManager {
  /**
   * TBD.
   * @param {import('./game').Game} game - TBD.
   */
  constructor(game) {
    this.game = game;
    this._tweens = [];
    this._add = [];
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
   * TBD.
   * @returns {Tween[]} TBD.
   */
  getAll() {
    return this._tweens;
  }

  /**
   * TBD.
   */
  removeAll() {
    for (let i = 0; i < this._tweens.length; i += 1) {
      this._tweens[i].pendingDelete = true;
    }
    this._add = [];
  }

  /**
   * TBD.
   * @param {object} obj - TBD.
   * @param {object[]} children - TBD.
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
   * TBD.
   * @param {Tween} tween - TBD.
   */
  add(tween) {
    tween._manager = this;
    this._add.push(tween);
  }

  /**
   * TBD.
   * @param {object} object - TBD.
   * @returns {Tween} TBD.
   */
  create(object) {
    return new Tween(object, this.game, this);
  }

  /**
   * TBD.
   * @param {Tween} tween - TBD.
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
   * TBD.
   * @returns {boolean} TBD.
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
   * TBD.
   * @param {object} object - TBD.
   * @returns {boolean} TBD.
   */
  isTweening(object) {
    return this._tweens.some((tween) => tween.target === object);
  }

  /**
   * TBD.
   */
  _pauseAll() {
    for (let i = this._tweens.length - 1; i >= 0; i -= 1) {
      this._tweens[i]._pause();
    }
  }

  /**
   * TBD.
   */
  _resumeAll() {
    for (let i = this._tweens.length - 1; i >= 0; i -= 1) {
      this._tweens[i]._resume();
    }
  }

  /**
   * TBD.
   */
  pauseAll() {
    for (let i = this._tweens.length - 1; i >= 0; i -= 1) {
      this._tweens[i].pause();
    }
  }

  /**
   * TBD.
   */
  resumeAll() {
    for (let i = this._tweens.length - 1; i >= 0; i -= 1) {
      this._tweens[i].resume(true);
    }
  }
}
