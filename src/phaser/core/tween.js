import * as MathUtils from '../util/math.js';
import { TWEEN_COMPLETE, TWEEN_LOOPED, TWEEN_PENDING, TWEEN_RUNNING } from './const.js';
import { Signal } from './signal.js';
import { TweenData } from './tween_data.js';

export class Tween {
  /**
   * TBD.
   * @param {import('../display/display_object.js').DisplayObject} target - TBD.
   * @param {import('./game.js').Game} game - TBD.
   * @param {import('./tween_manager.js').TweenManager} manager - TBD.
   */
  constructor(target, game, manager) {
    this.game = game;
    this.target = target;
    this.manager = manager;
    this.timeline = [];
    this.reverse = false;
    this.timeScale = 1;
    this.repeatCounter = 0;
    this.pendingDelete = false;
    this.onStart = new Signal();
    this.onLoop = new Signal();
    this.onRepeat = new Signal();
    this.onChildComplete = new Signal();
    this.onComplete = new Signal();
    this.isRunning = false;
    this.current = 0;
    this.properties = {};
    this.chainedTween = null;
    this.isPaused = false;
    this._onUpdateCallback = null;
    this._onUpdateCallbackContext = null;
    this._pausedTime = 0;
    this._codePaused = false;
    this._hasStarted = false;
  }

  /**
   * TBD.
   * @param {object} properties - TBD.
   * @param {number} duration - TBD.
   * @param {string | Function} ease - TBD.
   * @param {boolean} autoStart - TBD.
   * @param {number} delay - TBD.
   * @param {number} repeat - TBD.
   * @param {boolean} yoyo - TBD.
   * @returns {Tween} TBD.
   */
  to(properties, duration = 1000, ease = 'Linear', autoStart = false, delay = 0, repeat = 0, yoyo = false) {
    if (typeof ease === 'string' && this.manager.easeMap[ease]) {
      ease = this.manager.easeMap[ease];
    }
    if (this.isRunning) {
      return this;
    }
    // @ts-ignore
    this.timeline.push(new TweenData(this).to(properties, duration, ease, delay, repeat, yoyo));
    if (autoStart) {
      this.start();
    }
    return this;
  }

  /**
   * TBD.
   * @param {object} properties - TBD.
   * @param {number} duration - TBD.
   * @param {string | Function} ease - TBD.
   * @param {boolean} autoStart - TBD.
   * @param {number} delay - TBD.
   * @param {number} repeat - TBD.
   * @param {boolean} yoyo - TBD.
   * @returns {Tween} TBD.
   */
  from(properties, duration = 1000, ease = 'Linear', autoStart = false, delay = 0, repeat = 0, yoyo = false) {
    if (typeof ease === 'string' && this.manager.easeMap[ease]) {
      ease = this.manager.easeMap[ease];
    }
    if (this.isRunning) {
      this.game.logger.warn('Tween.from cannot be called after Tween.start');
      return this;
    }
    // @ts-ignore
    this.timeline.push(new TweenData(this).from(properties, duration, ease, delay, repeat, yoyo));
    if (autoStart) {
      this.start();
    }
    return this;
  }

  /**
   * TBD.
   * @param {number} index - TBD.
   * @returns {Tween} TBD.
   */
  start(index = 0) {
    if (this.game === null || this.target === null || this.timeline.length === 0 || this.isRunning) {
      return this;
    }
    //  Populate the tween data
    for (let i = 0; i < this.timeline.length; i += 1) {
      //  Build our master property list with the starting values
      const keys = Object.keys(this.timeline[i].vEnd);
      for (let k = 0; k < keys.length; k += 1) {
        const property = keys[k];
        this.properties[property] = this.target[property] || 0;
        if (!Array.isArray(this.properties[property])) {
          //  Ensures we're using numbers, not strings
          this.properties[property] *= 1.0;
        }
      }
    }
    for (let i = 0; i < this.timeline.length; i += 1) {
      this.timeline[i].loadValues();
    }
    this.manager.add(this);
    this.isRunning = true;
    if (index < 0 || index > this.timeline.length - 1) {
      index = 0;
    }
    this.current = index;
    this.timeline[this.current].start();
    return this;
  }

  /**
   * TBD.
   * @param {boolean} complete - TBD.
   * @returns {Tween} TBD.
   */
  stop(complete = false) {
    this.isRunning = false;
    this._onUpdateCallback = null;
    this._onUpdateCallbackContext = null;
    if (complete) {
      this.onComplete.dispatch(this.target, this);
      this._hasStarted = false;
      if (this.chainedTween) {
        this.chainedTween.start();
      }
    }
    this.manager.remove(this);
    return this;
  }

  /**
   * TBD.
   * @param {string} property - TBD.
   * @param {object} value - TBD.
   * @param {number} index - TBD.
   * @returns {Tween} TBD.
   */
  updateTweenData(property, value, index = 0) {
    if (this.timeline.length === 0) {
      return this;
    }
    if (index === -1) {
      for (let i = 0; i < this.timeline.length; i += 1) {
        this.timeline[i][property] = value;
      }
    } else {
      this.timeline[index][property] = value;
    }
    return this;
  }

  /**
   * TBD.
   * @param {number} duration - TBD.
   * @param {number} index - TBD.
   * @returns {Tween} TBD.
   */
  delay(duration, index) {
    return this.updateTweenData('delay', duration, index);
  }

  /**
   * TBD.
   * @param {number} total - TBD.
   * @param {number} repeatDelay - TBD.
   * @param {number} index - TBD.
   * @returns {Tween} TBD.
   */
  repeat(total, repeatDelay = 0, index = 0) {
    this.updateTweenData('repeatCounter', total, index);
    return this.updateTweenData('repeatDelay', repeatDelay, index);
  }

  /**
   * TBD.
   * @param {number} duration - TBD.
   * @param {number} index - TBD.
   * @returns {Tween} TBD.
   */
  repeatDelay(duration, index) {
    return this.updateTweenData('repeatDelay', duration, index);
  }

  /**
   * TBD.
   * @param {boolean} enable - TBD.
   * @param {number} yoyoDelay - TBD.
   * @param {number} index - TBD.
   * @returns {Tween} TBD.
   */
  yoyo(enable, yoyoDelay = 0, index = 0) {
    this.updateTweenData('yoyo', enable, index);
    return this.updateTweenData('yoyoDelay', yoyoDelay, index);
  }

  /**
   * TBD.
   * @param {number} duration - TBD.
   * @param {number} index - TBD.
   * @returns {Tween} TBD.
   */
  yoyoDelay(duration, index) {
    return this.updateTweenData('yoyoDelay', duration, index);
  }

  /**
   * TBD.
   * @param {string|Function} ease - TBD.
   * @param {number} index - TBD.
   * @returns {Tween} TBD.
   */
  easing(ease, index) {
    if (typeof ease === 'string' && this.manager.easeMap[ease]) {
      ease = this.manager.easeMap[ease];
    }
    return this.updateTweenData('easingFunction', ease, index);
  }

  /**
   * TBD.
   * @param {Function} interpolation - TBD.
   * @param {object} context - TBD.
   * @param {number} index - TBD.
   * @returns {Tween} TBD.
   */
  interpolation(interpolation, context = MathUtils, index = 0) {
    this.updateTweenData('interpolationFunction', interpolation, index);
    return this.updateTweenData('interpolationContext', context, index);
  }

  /**
   * TBD.
   * @param {number} total - TBD.
   * @returns {Tween} TBD.
   */
  repeatAll(total = 0) {
    this.repeatCounter = total;
    return this;
  }

  /**
   * TBD.
   * @param {...any} args - TBD.
   * @returns {Tween} TBD.
   */
  chain(...args) {
    let i = args.length;
    while (i) {
      i -= 1;
      if (i > 0) {
        args[i - 1].chainedTween = args[i];
      } else {
        this.chainedTween = args[i];
      }
    }
    return this;
  }

  /**
   * TBD.
   * @param {boolean} value - TBD.
   * @returns {Tween} TBD.
   */
  loop(value = true) {
    this.repeatCounter = value ? -1 : 0;
    return this;
  }

  /**
   * TBD.
   * @param {Function} callback - TBD.
   * @param {object} callbackContext - TBD.
   * @returns {Tween} TBD.
   */
  onUpdateCallback(callback, callbackContext) {
    this._onUpdateCallback = callback;
    this._onUpdateCallbackContext = callbackContext;
    return this;
  }

  /**
   * TBD.
   */
  pause() {
    this.isPaused = true;
    this._codePaused = true;
    this._pausedTime = this.game.time.time;
  }

  /**
   * TBD.
   */
  _pause() {
    if (!this._codePaused) {
      this.isPaused = true;
      this._pausedTime = this.game.time.time;
    }
  }

  /**
   * TBD.
   */
  resume() {
    if (this.isPaused) {
      this.isPaused = false;
      this._codePaused = false;
      for (let i = 0; i < this.timeline.length; i += 1) {
        if (!this.timeline[i].isRunning) {
          this.timeline[i].startTime += this.game.time.time - this._pausedTime;
        }
      }
    }
  }

  /**
   * TBD.
   */
  _resume() {
    if (!this._codePaused) {
      this.resume();
    }
  }

  /**
   * TBD.
   * @param {number} time - TBD.
   * @returns {boolean} TBD.
   */
  update(time) {
    if (this.pendingDelete || !this.target) {
      return false;
    }
    if (this.isPaused) {
      return true;
    }
    const status = this.timeline[this.current].update(time);
    if (status === TWEEN_PENDING) {
      return true;
    } else if (status === TWEEN_RUNNING) {
      if (!this._hasStarted) {
        this.onStart.dispatch(this.target, this);
        this._hasStarted = true;
      }
      if (this._onUpdateCallback !== null) {
        this._onUpdateCallback.call(
          this._onUpdateCallbackContext,
          this,
          this.timeline[this.current].value,
          this.timeline[this.current]
        );
      }
      //  In case the update callback modifies this tween
      return this.isRunning;
    } else if (status === TWEEN_LOOPED) {
      if (this.timeline[this.current].repeatCounter === -1) {
        this.onLoop.dispatch(this.target, this);
      } else {
        this.onRepeat.dispatch(this.target, this);
      }
      return true;
    } else if (status === TWEEN_COMPLETE) {
      let complete = false;
      //  What now?
      if (this.reverse) {
        this.current -= 1;
        if (this.current < 0) {
          this.current = this.timeline.length - 1;
          complete = true;
        }
      } else {
        this.current += 1;
        if (this.current === this.timeline.length) {
          this.current = 0;
          complete = true;
        }
      }
      if (complete) {
        //  We've reached the start or end of the child tweens (depending on Tween.reverse), should we repeat it?
        if (this.repeatCounter === -1) {
          this.timeline[this.current].start();
          this.onLoop.dispatch(this.target, this);
          return true;
        } else if (this.repeatCounter > 0) {
          this.repeatCounter -= 1;

          this.timeline[this.current].start();
          this.onRepeat.dispatch(this.target, this);
          return true;
        }
        //  No more repeats and no more children, so we're done
        this.isRunning = false;
        this.onComplete.dispatch(this.target, this);
        this._hasStarted = false;
        if (this.chainedTween) {
          this.chainedTween.start();
        }
        return false;
      }
      //  We've still got some children to go
      this.onChildComplete.dispatch(this.target, this);
      this.timeline[this.current].start();
      return true;
    }
    return false;
  }

  /**
   * TBD.
   * @param {number} frameRate - TBD.
   * @param {object[]} data - TBD.
   * @returns {object[]} TBD.
   */
  generateData(frameRate = 60, data = []) {
    if (this.game === null || this.target === null) {
      return null;
    }
    //  Populate the tween data
    for (let i = 0; i < this.timeline.length; i += 1) {
      //  Build our master property list with the starting values
      const keys = Object.keys(this.timeline[i].vEnd);
      for (let k = 0; k < keys.length; k += 1) {
        const property = keys[k];
        this.properties[property] = this.target[property] || 0;
        if (!Array.isArray(this.properties[property])) {
          //  Ensures we're using numbers, not strings
          this.properties[property] *= 1.0;
        }
      }
    }
    for (let i = 0; i < this.timeline.length; i += 1) {
      this.timeline[i].loadValues();
    }
    for (let i = 0; i < this.timeline.length; i += 1) {
      data = data.concat(this.timeline[i].generateData(frameRate));
    }
    return data;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get totalDuration() {
    let total = 0;
    for (let i = 0; i < this.timeline.length; i += 1) {
      total += this.timeline[i].duration;
    }
    return total;
  }
}
