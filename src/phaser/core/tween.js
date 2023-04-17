/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 */
import { Signal } from  './signal';
import TweenData from './tween_data';
import * as MathUtils from '../util/math';
import { TWEEN_PENDING, TWEEN_RUNNING, TWEEN_COMPLETE, TWEEN_LOOPED } from './const';

export default class {
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

  to(
    properties,
    duration = 1000,
    ease = 'Linear',
    autoStart = false,
    delay = 0,
    repeat = 0,
    yoyo = false
  ) {
    if (typeof ease === 'string' && this.manager.easeMap[ease]) {
      ease = this.manager.easeMap[ease];
    }
    if (this.isRunning) {
      return this;
    }
    this.timeline.push(new TweenData(this).to(properties, duration, ease, delay, repeat, yoyo));
    if (autoStart) {
      this.start();
    }
    return this;
  }

  from(
    properties,
    duration = 1000,
    ease = 'Linear',
    autoStart = false,
    delay = 0,
    repeat = 0,
    yoyo = false
  ) {
    if (typeof ease === 'string' && this.manager.easeMap[ease]) {
      ease = this.manager.easeMap[ease];
    }
    if (this.isRunning) {
      console.warn('Tween.from cannot be called after Tween.start');
      return this;
    }
    this.timeline.push(new TweenData(this).from(properties, duration, ease, delay, repeat, yoyo));
    if (autoStart) {
      this.start();
    }
    return this;
  }

  start(index = 0) {
    if (
      this.game === null ||
      this.target === null ||
      this.timeline.length === 0 ||
      this.isRunning
    ) {
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

  delay(duration, index) {
    return this.updateTweenData('delay', duration, index);
  }

  repeat(total, repeatDelay = 0, index = 0) {
    this.updateTweenData('repeatCounter', total, index);
    return this.updateTweenData('repeatDelay', repeatDelay, index);
  }

  repeatDelay(duration, index) {
    return this.updateTweenData('repeatDelay', duration, index);
  }

  yoyo(enable, yoyoDelay = 0, index = 0) {
    this.updateTweenData('yoyo', enable, index);
    return this.updateTweenData('yoyoDelay', yoyoDelay, index);
  }

  yoyoDelay(duration, index) {
    return this.updateTweenData('yoyoDelay', duration, index);
  }

  easing(ease, index) {
    if (typeof ease === 'string' && this.manager.easeMap[ease]) {
      ease = this.manager.easeMap[ease];
    }
    return this.updateTweenData('easingFunction', ease, index);
  }

  interpolation(interpolation, context = MathUtils, index = 0) {
    this.updateTweenData('interpolationFunction', interpolation, index);
    return this.updateTweenData('interpolationContext', context, index);
  }

  repeatAll(total = 0) {
    this.repeatCounter = total;
    return this;
  }

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

  loop(value = true) {
    this.repeatCounter = value ? -1 : 0;
    return this;
  }

  onUpdateCallback(callback, callbackContext) {
    this._onUpdateCallback = callback;
    this._onUpdateCallbackContext = callbackContext;
    return this;
  }

  pause() {
    this.isPaused = true;
    this._codePaused = true;
    this._pausedTime = this.game.time.time;
  }

  _pause() {
    if (!this._codePaused) {
      this.isPaused = true;
      this._pausedTime = this.game.time.time;
    }
  }

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

  _resume() {
    if (!this._codePaused) {
      this.resume();
    }
  }

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

  get totalDuration() {
    let total = 0;
    for (let i = 0; i < this.timeline.length; i += 1) {
      total += this.timeline[i].duration;
    }
    return total;
  }
}
