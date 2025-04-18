import * as MathUtils from '../util/math.js';
import { TWEEN_COMPLETE, TWEEN_LOOPED, TWEEN_PENDING, TWEEN_RUNNING } from './const.js';

export class TweenData {
  /**
   * TBD.
   * @param {import('./tween.js').Tween} parent - TBD.
   */
  constructor(parent) {
    this.parent = parent;
    this.game = parent.game;
    this.vStart = {};
    this.vStartCache = {};
    this.vEnd = {};
    this.vEndCache = {};
    this.duration = 1000;
    this.percent = 0;
    this.value = 0;
    this.repeatCounter = 0;
    this.repeatDelay = 0;
    this.repeatTotal = 0;
    this.interpolate = false;
    this.yoyo = false;
    this.yoyoDelay = 0;
    this.inReverse = false;
    this.delay = 0;
    this.dt = 0;
    this.startTime = null;
    this.easingFunction = (k) => k;
    this.interpolationFunction = MathUtils.linearInterpolation;
    this.interpolationContext = MathUtils;
    this.isRunning = false;
    this.isFrom = false;
  }

  /**
   * TBD.
   * @param {object} properties - TBD.
   * @param {number} duration - TBD.
   * @param {(number) => number} ease - TBD.
   * @param {number} delay - TBD.
   * @param {number} repeat - TBD.
   * @param {boolean} yoyo - TBD.
   * @returns {TweenData} TBD.
   */
  to(properties, duration, ease, delay, repeat, yoyo) {
    this.vEnd = properties;
    this.duration = duration;
    this.easingFunction = ease;
    this.delay = delay;
    this.repeatTotal = repeat;
    this.yoyo = yoyo;
    this.isFrom = false;
    return this;
  }

  /**
   * TBD.
   * @param {object} properties - TBD.
   * @param {number} duration - TBD.
   * @param {(number) => number} ease - TBD.
   * @param {number} delay - TBD.
   * @param {number} repeat - TBD.
   * @param {boolean} yoyo - TBD.
   * @returns {TweenData} TBD.
   */
  from(properties, duration, ease, delay, repeat, yoyo) {
    this.vEnd = properties;
    this.duration = duration;
    this.easingFunction = ease;
    this.delay = delay;
    this.repeatTotal = repeat;
    this.yoyo = yoyo;
    this.isFrom = true;
    return this;
  }

  /**
   * TBD.
   * @returns {TweenData} TBD.
   */
  start() {
    this.startTime = this.game.time.time + this.delay;
    if (this.parent.reverse) {
      this.dt = this.duration;
    } else {
      this.dt = 0;
    }
    if (this.delay > 0) {
      this.isRunning = false;
    } else {
      this.isRunning = true;
    }
    if (this.isFrom) {
      //  Reverse them all and instant set them
      const keys = Object.keys(this.vStartCache);
      for (let k = 0; k < keys.length; k += 1) {
        const property = keys[k];
        this.vStart[property] = this.vEndCache[property];
        this.vEnd[property] = this.vStartCache[property];
        this.parent.target[property] = this.vStart[property];
      }
    }
    this.value = 0;
    this.yoyoCounter = 0;
    this.repeatCounter = this.repeatTotal;
    return this;
  }

  /**
   * TBD.
   * @returns {TweenData} TBD.
   */
  loadValues() {
    const keys = Object.keys(this.parent.properties);
    for (let k = 0; k < keys.length; k += 1) {
      const property = keys[k];
      //  Load the property from the parent object
      this.vStart[property] = this.parent.properties[property];
      //  Check if an Array was provided as property value
      if (Array.isArray(this.vEnd[property])) {
        if (this.vEnd[property].length === 0) {
          // pass
          // TODO: this was continue;
        } else if (this.percent === 0) {
          //  Put the start value at the beginning of the array
          //  but we only want to do this once, if the Tween hasn't run before
          this.vEnd[property] = [this.vStart[property]].concat(this.vEnd[property]);
        }
      }
      if (typeof this.vEnd[property] !== 'undefined') {
        if (typeof this.vEnd[property] === 'string') {
          //  Parses relative end values with start as base (e.g.: +10, -3)
          this.vEnd[property] = this.vStart[property] + Number.parseFloat(this.vEnd[property]);
        }
        this.parent.properties[property] = this.vEnd[property];
      } else {
        //  Null tween
        this.vEnd[property] = this.vStart[property];
      }
      this.vStartCache[property] = this.vStart[property];
      this.vEndCache[property] = this.vEnd[property];
    }
    return this;
  }

  /**
   * TBD.
   * @param {number} time - TBD.
   * @returns {number} TBD.
   */
  update(time) {
    if (!this.isRunning) {
      if (time >= this.startTime) {
        this.isRunning = true;
      } else {
        return TWEEN_PENDING;
      }
    } else if (time < this.startTime) {
      //  Is Running, but is waiting to repeat
      return TWEEN_RUNNING;
    }
    const ms = this.game.time.elapsedMS;
    if (this.parent.reverse) {
      this.dt -= ms * this.parent.timeScale;
      this.dt = Math.max(this.dt, 0);
    } else {
      this.dt += ms * this.parent.timeScale;
      this.dt = Math.min(this.dt, this.duration);
    }
    this.percent = this.dt / this.duration;
    this.value = this.easingFunction(this.percent);
    const keys = Object.keys(this.vEnd);
    for (let k = 0; k < keys.length; k += 1) {
      const property = keys[k];
      const start = this.vStart[property];
      const end = this.vEnd[property];
      if (Array.isArray(end)) {
        this.parent.target[property] = this.interpolationFunction.call(this.interpolationContext, end, this.value);
      } else {
        this.parent.target[property] = start + (end - start) * this.value;
      }
    }
    if ((!this.parent.reverse && this.percent === 1) || (this.parent.reverse && this.percent === 0)) {
      return this.repeat();
    }
    return TWEEN_RUNNING;
  }

  /**
   * TBD.
   * @param {number} frameRate - TBD.
   * @returns {object[]} TBD.
   */
  generateData(frameRate) {
    if (this.parent.reverse) {
      this.dt = this.duration;
    } else {
      this.dt = 0;
    }
    let data = [];
    let complete = false;
    const fps = (1 / frameRate) * 1000;
    do {
      if (this.parent.reverse) {
        this.dt -= fps;
        this.dt = Math.max(this.dt, 0);
      } else {
        this.dt += fps;
        this.dt = Math.min(this.dt, this.duration);
      }
      this.percent = this.dt / this.duration;
      this.value = this.easingFunction(this.percent);
      const blob = {};
      const keys = Object.keys(this.vEnd);
      for (let k = 0; k < keys.length; k += 1) {
        const property = keys[k];
        const start = this.vStart[property];
        const end = this.vEnd[property];
        if (Array.isArray(end)) {
          blob[property] = this.interpolationFunction(end, this.value);
        } else {
          blob[property] = start + (end - start) * this.value;
        }
      }
      data.push(blob);
      if ((!this.parent.reverse && this.percent === 1) || (this.parent.reverse && this.percent === 0)) {
        complete = true;
      }
    } while (!complete);
    if (this.yoyo) {
      const reversed = data.slice();
      reversed.reverse();
      data = data.concat(reversed);
    }
    return data;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  repeat() {
    //  If not a yoyo and repeatCounter = 0 then we're done
    if (this.yoyo) {
      //  We're already in reverse mode, which means the yoyo has finished and there's no repeats, so end
      if (this.inReverse && this.repeatCounter === 0) {
        //  Restore the properties
        const keys = Object.keys(this.vStartCache);
        for (let k = 0; k < keys.length; k += 1) {
          const property = keys[k];
          this.vStart[property] = this.vStartCache[property];
          this.vEnd[property] = this.vEndCache[property];
        }
        this.inReverse = false;
        return TWEEN_COMPLETE;
      }
      this.inReverse = !this.inReverse;
    } else if (this.repeatCounter === 0) {
      return TWEEN_COMPLETE;
    }
    if (this.inReverse) {
      //  If inReverse we're going from vEnd to vStartCache
      const keys = Object.keys(this.vStartCache);
      for (let k = 0; k < keys.length; k += 1) {
        const property = keys[k];
        this.vStart[property] = this.vEndCache[property];
        this.vEnd[property] = this.vStartCache[property];
      }
    } else {
      //  If not inReverse we're just repopulating the cache again
      const keys = Object.keys(this.vStartCache);
      for (let k = 0; k < keys.length; k += 1) {
        const property = keys[k];
        this.vStart[property] = this.vStartCache[property];
        this.vEnd[property] = this.vEndCache[property];
      }
      //  -1 means repeat forever, otherwise decrement the repeatCounter
      //  We only decrement this counter if the tween isn't doing a yoyo, as that doesn't count towards the repeat total
      if (this.repeatCounter > 0) {
        this.repeatCounter -= 1;
      }
    }
    this.startTime = this.game.time.time;
    if (this.yoyo && this.inReverse) {
      this.startTime += this.yoyoDelay;
    } else if (!this.inReverse) {
      this.startTime += this.repeatDelay;
    }
    if (this.parent.reverse) {
      this.dt = this.duration;
    } else {
      this.dt = 0;
    }
    return TWEEN_LOOPED;
  }
}
