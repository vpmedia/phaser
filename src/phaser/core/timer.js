import { Signal } from './signal.js';
import { TimerEvent } from './timer_event.js';

export class Timer {
  /**
   * TBD.
   * @param {import('./game.js').Game} game - TBD.
   * @param {boolean} autoDestroy - TBD.
   */
  constructor(game, autoDestroy = false) {
    this.game = game;
    this.running = false;
    this.autoDestroy = autoDestroy;
    this.expired = false;
    this.elapsed = 0;
    this.events = [];
    this.onComplete = new Signal();
    this.nextTick = 0;
    this.timeCap = 1000;
    this.paused = false;
    this._codePaused = false;
    this._started = 0;
    this._pauseStarted = 0;
    this._pauseTotal = 0;
    this._now = Date.now();
    this._len = 0;
    this._marked = 0;
    this._i = 0;
    this._diff = 0;
    this._newTick = 0;
  }

  /**
   * TBD.
   * @param {number} delay - TBD.
   * @param {boolean} loop - TBD.
   * @param {number} repeatCount - TBD.
   * @param {Function} callback - TBD.
   * @param {object} callbackContext - TBD.
   * @param {...any} args - TBD.
   * @returns {TimerEvent} TBD.
   */
  create(delay, loop, repeatCount, callback, callbackContext = null, args) {
    const roundedDelay = Math.round(delay);
    let tick = roundedDelay;
    if (this._now === 0) {
      tick += this.game.time.time;
    } else {
      tick += this._now;
    }
    const event = new TimerEvent(this, roundedDelay, tick, repeatCount, loop, callback, callbackContext, args);
    this.events.push(event);
    this.order();
    this.expired = false;
    return event;
  }

  /**
   * TBD.
   * @param {number} delay - TBD.
   * @param {Function} callback - TBD.
   * @param {object} callbackContext - TBD.
   * @param {...any} args - TBD.
   * @returns {TimerEvent} TBD.
   */
  add(delay, callback, callbackContext = null, ...args) {
    return this.create(delay, false, 0, callback, callbackContext, args);
  }

  /**
   * TBD.
   * @param {number} delay - TBD.
   * @param {number} repeatCount - TBD.
   * @param {Function} callback - TBD.
   * @param {object} callbackContext - TBD.
   * @param {...any} args - TBD.
   * @returns {TimerEvent} TBD.
   */
  repeat(delay, repeatCount, callback, callbackContext = null, ...args) {
    return this.create(delay, false, repeatCount, callback, callbackContext, args);
  }

  /**
   * TBD.
   * @param {number} delay - TBD.
   * @param {Function} callback - TBD.
   * @param {object} callbackContext - TBD.
   * @param {...any} args - TBD.
   * @returns {TimerEvent} TBD.
   */
  loop(delay, callback, callbackContext = null, ...args) {
    return this.create(delay, true, 0, callback, callbackContext, args);
  }

  /**
   * TBD.
   * @param {number} delay - TBD.
   */
  start(delay) {
    if (this.running) {
      return;
    }
    this._started = this.game.time.time + (delay || 0);
    this.running = true;
    for (let i = 0; i < this.events.length; i += 1) {
      this.events[i].tick = this.events[i].delay + this._started;
    }
  }

  /**
   * TBD.
   * @param {boolean} clearEvents - TBD.
   */
  stop(clearEvents = true) {
    this.running = false;
    if (clearEvents) {
      this.events.length = 0;
    }
  }

  /**
   * TBD.
   * @param {Event} event - TBD.
   * @returns {boolean} TBD.
   */
  remove(event) {
    for (let i = 0; i < this.events.length; i += 1) {
      if (this.events[i] === event) {
        this.events[i].pendingDelete = true;
        return true;
      }
    }
    return false;
  }

  /**
   * TBD.
   */
  order() {
    if (this.events.length > 0) {
      //  Sort the events so the one with the lowest tick is first
      this.events.sort(this.sortHandler);
      this.nextTick = this.events[0].tick;
    }
  }

  /**
   * TBD.
   * @param {TimerEvent} a - TBD.
   * @param {TimerEvent} b - TBD.
   * @returns {number} TBD.
   */
  sortHandler(a, b) {
    if (a.tick < b.tick) {
      return -1;
    } else if (a.tick > b.tick) {
      return 1;
    }
    return 0;
  }

  /**
   * TBD.
   */
  clearPendingEvents() {
    this._i = this.events.length;
    while (this._i) {
      this._i -= 1;
      if (this.events[this._i].pendingDelete) {
        this.events.splice(this._i, 1);
      }
    }
    this._len = this.events.length;
    this._i = 0;
  }

  /**
   * TBD.
   * @param {number} time - TBD.
   * @returns {boolean} TBD.
   */
  update(time) {
    if (this.paused) {
      return true;
    }
    this.elapsed = time - this._now;
    this._now = time;
    //  spike-dislike
    if (this.elapsed > this.timeCap) {
      //  For some reason the time between now and the last time the game was updated was larger than our timeCap.
      //  This can happen if the Game.config.disableVisibilityChange is true and you swap tabs, which makes the raf pause.
      //  In this case we need to adjust the TimerEvents and nextTick.
      this.adjustEvents(time - this.elapsed);
    }
    this._marked = 0;
    //  Clears events marked for deletion and resets _len and _i to 0.
    this.clearPendingEvents();
    if (this.running && this._now >= this.nextTick && this._len > 0) {
      while (this._i < this._len && this.running) {
        if (this._now >= this.events[this._i].tick && !this.events[this._i].pendingDelete) {
          //  (now + delay) - (time difference from last tick to now)
          this._newTick = this._now + this.events[this._i].delay - (this._now - this.events[this._i].tick);
          if (this._newTick < 0) {
            this._newTick = this._now + this.events[this._i].delay;
          }
          if (this.events[this._i].loop === true) {
            this.events[this._i].tick = this._newTick;
            this.events[this._i].callback.apply(this.events[this._i].callbackContext, this.events[this._i].args);
          } else if (this.events[this._i].repeatCount > 0) {
            this.events[this._i].repeatCount -= 1;
            this.events[this._i].tick = this._newTick;
            this.events[this._i].callback.apply(this.events[this._i].callbackContext, this.events[this._i].args);
          } else {
            this._marked += 1;
            this.events[this._i].pendingDelete = true;
            this.events[this._i].callback.apply(this.events[this._i].callbackContext, this.events[this._i].args);
          }
          this._i += 1;
        } else {
          break;
        }
      }
      //  Are there any events left?
      if (this.events.length > this._marked) {
        this.order();
      } else {
        this.expired = true;
        this.onComplete.dispatch(this);
      }
    }
    if (this.expired && this.autoDestroy) {
      return false;
    }
    return true;
  }

  /**
   * TBD.
   */
  pause() {
    if (!this.running) {
      return;
    }
    this._codePaused = true;
    if (this.paused) {
      return;
    }
    this._pauseStarted = this.game.time.time;
    this.paused = true;
  }

  /**
   * TBD.
   */
  _pause() {
    if (this.paused || !this.running) {
      return;
    }
    this._pauseStarted = this.game.time.time;
    this.paused = true;
  }

  /**
   * TBD.
   * @param {number} baseTime - TBD.
   */
  adjustEvents(baseTime) {
    for (let i = 0; i < this.events.length; i += 1) {
      if (!this.events[i].pendingDelete) {
        //  Work out how long there would have been from when the game paused until the events next tick
        let t = this.events[i].tick - baseTime;
        if (t < 0) {
          t = 0;
        }
        //  Add the difference on to the time now
        this.events[i].tick = this._now + t;
      }
    }
    const d = this.nextTick - baseTime;
    if (d < 0) {
      this.nextTick = this._now;
    } else {
      this.nextTick = this._now + d;
    }
  }

  /**
   * TBD.
   */
  resume() {
    if (!this.paused) {
      return;
    }
    const now = this.game.time.time;
    this._pauseTotal += now - this._now;
    this._now = now;
    this.adjustEvents(this._pauseStarted);
    this.paused = false;
    this._codePaused = false;
  }

  /**
   * TBD.
   */
  _resume() {
    if (this._codePaused) {
      return;
    }
    this.resume();
  }

  /**
   * TBD.
   */
  removeAll() {
    this.onComplete.removeAll();
    this.events.length = 0;
    this._len = 0;
    this._i = 0;
  }

  /**
   * TBD.
   */
  destroy() {
    this.onComplete.removeAll();
    this.running = false;
    this.events = [];
    this._len = 0;
    this._i = 0;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get next() {
    return this.nextTick;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get duration() {
    if (this.running && this.nextTick > this._now) {
      return this.nextTick - this._now;
    }
    return 0;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get length() {
    return this.events.length;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get ms() {
    if (this.running) {
      return this._now - this._started - this._pauseTotal;
    }
    return 0;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get seconds() {
    if (this.running) {
      return this.ms * 0.001;
    }
    return 0;
  }
}
