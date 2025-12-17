import * as MathUtils from '../util/math.js';
import { TWEEN_COMPLETE, TWEEN_LOOPED, TWEEN_PENDING, TWEEN_RUNNING } from './const.js';
import { Signal } from './signal.js';
import { TweenData } from './tween_data.js';

export class Tween {
  /**
   * Creates a new Tween instance.
   * @param {import('../display/display_object.js').DisplayObject} target - The object to tween.
   * @param {import('./game.js').Game} game - Reference to the Phaser Game instance.
   * @param {import('./tween_manager.js').TweenManager} manager - Reference to the Tween Manager.
   */
  constructor(target, game, manager) {
    this.game = game;
    this.target = target;
    /** @type {import('./tween_manager.js').TweenManager} */
    this.manager = manager;
    /** @type {TweenData[]} */
    this.timeline = [];
    /** @type {boolean} */
    this.reverse = false;
    /** @type {number} */
    this.timeScale = 1;
    /** @type {number} */
    this.repeatCounter = 0;
    /** @type {boolean} */
    this.pendingDelete = false;
    /** @type {Signal} */
    this.onStart = new Signal();
    /** @type {Signal} */
    this.onLoop = new Signal();
    /** @type {Signal} */
    this.onRepeat = new Signal();
    /** @type {Signal} */
    this.onChildComplete = new Signal();
    /** @type {Signal} */
    this.onComplete = new Signal();
    /** @type {boolean} */
    this.isRunning = false;
    /** @type {number} */
    this.current = 0;
    this.properties = {};
    this.chainedTween = null;
    /** @type {boolean} */
    this.isPaused = false;
    this._onUpdateCallback = null;
    this._onUpdateCallbackContext = null;
    /** @type {number} */
    this._pausedTime = 0;
    /** @type {boolean} */
    this._codePaused = false;
    /** @type {boolean} */
    this._hasStarted = false;
  }

  /**
   * Adds a tween to the timeline that animates properties to their target values.
   * @param {object} properties - The properties to tween and their target values.
   * @param {number} duration - The duration of the tween in milliseconds.
   * @param {string | Function} ease - The easing function to use.
   * @param {boolean} autoStart - Whether to start the tween immediately.
   * @param {number} delay - The delay before starting the tween in milliseconds.
   * @param {number} repeat - Number of times to repeat the tween.
   * @param {boolean} yoyo - Whether to reverse the tween on repeat.
   * @returns {Tween} This Tween object for chaining.
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
   * Adds a tween to the timeline that animates properties from their current values.
   * @param {object} properties - The properties to tween and their target values.
   * @param {number} duration - The duration of the tween in milliseconds.
   * @param {string | Function} ease - The easing function to use.
   * @param {boolean} autoStart - Whether to start the tween immediately.
   * @param {number} delay - The delay before starting the tween in milliseconds.
   * @param {number} repeat - Number of times to repeat the tween.
   * @param {boolean} yoyo - Whether to reverse the tween on repeat.
   * @returns {Tween} This Tween object for chaining.
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
   * Starts the tween timeline from a specific index.
   * @param {number} index - The index to start from in the timeline.
   * @returns {Tween} This Tween object for chaining.
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
          this.properties[property] *= 1;
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
   * Stops the tween and optionally completes it.
   * @param {boolean} complete - Whether to dispatch the complete event.
   * @returns {Tween} This Tween object for chaining.
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
   * Updates a property in the tween data.
   * @param {string} property - The property name to update.
   * @param {object} value - The new value for the property.
   * @param {number} index - The index in the timeline to update.
   * @returns {Tween} This Tween object for chaining.
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
   * Sets a delay for a specific timeline entry.
   * @param {number} duration - The delay in milliseconds.
   * @param {number} index - The index in the timeline to apply the delay to.
   * @returns {Tween} This Tween object for chaining.
   */
  delay(duration, index) {
    return this.updateTweenData('delay', duration, index);
  }

  /**
   * Sets how many times to repeat the tween.
   * @param {number} total - The number of times to repeat (-1 for infinite).
   * @param {number} repeatDelay - Delay between repeats in milliseconds.
   * @param {number} index - The index in the timeline to apply the repeat to.
   * @returns {Tween} This Tween object for chaining.
   */
  repeat(total, repeatDelay = 0, index = 0) {
    this.updateTweenData('repeatCounter', total, index);
    return this.updateTweenData('repeatDelay', repeatDelay, index);
  }

  /**
   * Sets the repeat delay for a specific timeline entry.
   * @param {number} duration - The delay between repeats in milliseconds.
   * @param {number} index - The index in the timeline to apply the delay to.
   * @returns {Tween} This Tween object for chaining.
   */
  repeatDelay(duration, index) {
    return this.updateTweenData('repeatDelay', duration, index);
  }

  /**
   * Enables or disables yoyo behavior for a timeline entry.
   * @param {boolean} enable - Whether to enable yoyo behavior.
   * @param {number} yoyoDelay - Delay between yoyo cycles in milliseconds.
   * @param {number} index - The index in the timeline to apply yoyo to.
   * @returns {Tween} This Tween object for chaining.
   */
  yoyo(enable, yoyoDelay = 0, index = 0) {
    this.updateTweenData('yoyo', enable, index);
    return this.updateTweenData('yoyoDelay', yoyoDelay, index);
  }

  /**
   * Sets the yoyo delay for a specific timeline entry.
   * @param {number} duration - The delay between yoyo cycles in milliseconds.
   * @param {number} index - The index in the timeline to apply the delay to.
   * @returns {Tween} This Tween object for chaining.
   */
  yoyoDelay(duration, index) {
    return this.updateTweenData('yoyoDelay', duration, index);
  }

  /**
   * Sets the easing function for a timeline entry.
   * @param {string|Function} ease - The easing function to use.
   * @param {number} index - The index in the timeline to apply easing to.
   * @returns {Tween} This Tween object for chaining.
   */
  easing(ease, index) {
    if (typeof ease === 'string' && this.manager.easeMap[ease]) {
      ease = this.manager.easeMap[ease];
    }
    return this.updateTweenData('easingFunction', ease, index);
  }

  /**
   * Sets the interpolation function for a timeline entry.
   * @param {Function} interpolation - The interpolation function to use.
   * @param {object} context - The context in which to call the interpolation function.
   * @param {number} index - The index in the timeline to apply interpolation to.
   * @returns {Tween} This Tween object for chaining.
   */
  interpolation(interpolation, context = MathUtils, index = 0) {
    this.updateTweenData('interpolationFunction', interpolation, index);
    return this.updateTweenData('interpolationContext', context, index);
  }

  /**
   * Sets how many times to repeat all timeline entries.
   * @param {number} total - The number of times to repeat (-1 for infinite).
   * @returns {Tween} This Tween object for chaining.
   */
  repeatAll(total = 0) {
    this.repeatCounter = total;
    return this;
  }

  /**
   * Chains one or more tweens to this tween.
   * @param {...any} args - The tweens to chain.
   * @returns {Tween} This Tween object for chaining.
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
   * Sets whether the tween should loop infinitely.
   * @param {boolean} value - Whether to loop infinitely.
   * @returns {Tween} This Tween object for chaining.
   */
  loop(value = true) {
    this.repeatCounter = value ? -1 : 0;
    return this;
  }

  /**
   * Sets a callback to be called when the tween updates.
   * @param {Function} callback - The callback function to call.
   * @param {object} callbackContext - The context in which to call the callback.
   * @returns {Tween} This Tween object for chaining.
   */
  onUpdateCallback(callback, callbackContext) {
    this._onUpdateCallback = callback;
    this._onUpdateCallbackContext = callbackContext;
    return this;
  }

  /**
   * Pauses the tween.
   */
  pause() {
    this.isPaused = true;
    this._codePaused = true;
    this._pausedTime = this.game.time.time;
  }

  /**
   * Internal method to pause the tween.
   */
  _pause() {
    if (!this._codePaused) {
      this.isPaused = true;
      this._pausedTime = this.game.time.time;
    }
  }

  /**
   * Resumes the tween.
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
   * Internal method to resume the tween.
   */
  _resume() {
    if (!this._codePaused) {
      this.resume();
    }
  }

  /**
   * Updates the tween state at a given time.
   * @param {number} time - The current game time.
   * @returns {boolean} True if the tween should continue running, false if it's complete.
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
   * Generates animation data for a given frame rate.
   * @param {number} frameRate - The target frame rate.
   * @param {object[]} data - The array to store the generated data in.
   * @returns {object[]} The populated data array.
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
          this.properties[property] *= 1;
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
   * Gets the total duration of all timeline entries.
   * @returns {number} The total duration in milliseconds.
   */
  get totalDuration() {
    let total = 0;
    for (let i = 0; i < this.timeline.length; i += 1) {
      total += this.timeline[i].duration;
    }
    return total;
  }
}
