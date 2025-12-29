import { Signal } from './signal.js';
import { TimerEvent } from './timer_event.js';

export class Timer {
  /**
   * Creates a new Timer instance.
   * @param {import('./game.js').Game} game - The game instance.
   * @param {boolean} autoDestroy - Whether to automatically destroy the timer when it completes.
   */
  constructor(game, autoDestroy = false) {
    this.game = game;
    /** @type {boolean} */
    this.running = false;
    /** @type {boolean} */
    this.autoDestroy = autoDestroy;
    /** @type {boolean} */
    this.expired = false;
    /** @type {number} */
    this.elapsed = 0;
    /** @type {TimerEvent[]} */
    this.events = [];
    /** @type {Signal} */
    this.onComplete = new Signal();
    /** @type {number} */
    this.nextTick = 0;
    /** @type {number} */
    this.timeCap = 1000;
    /** @type {boolean} */
    this.paused = false;
    /** @type {boolean} */
    this._codePaused = false;
    /** @type {number} */
    this._started = 0;
    /** @type {number} */
    this._pauseStarted = 0;
    /** @type {number} */
    this._pauseTotal = 0;
    /** @type {number} */
    this._now = Date.now();
    /** @type {number} */
    this._len = 0;
    /** @type {number} */
    this._marked = 0;
    /** @type {number} */
    this._i = 0;
    /** @type {number} */
    this._diff = 0;
    /** @type {number} */
    this._newTick = 0;
  }

  /**
   * Creates a new TimerEvent.
   * @param {number} delay - The delay in milliseconds before the event fires.
   * @param {boolean} loop - Whether the event should loop indefinitely.
   * @param {number} repeatCount - The number of times to repeat the event (0 = infinite).
   * @param {Function} callback - The function to call when the event fires.
   * @param {object} callbackContext - The context in which to call the callback.
   * @param {...any} args - Arguments to pass to the callback function.
   * @returns {TimerEvent} The created TimerEvent.
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
   * Creates a new TimerEvent that runs once.
   * @param {number} delay - The delay in milliseconds before the event fires.
   * @param {Function} callback - The function to call when the event fires.
   * @param {object} callbackContext - The context in which to call the callback.
   * @param {...any} args - Arguments to pass to the callback function.
   * @returns {TimerEvent} The created TimerEvent.
   */
  add(delay, callback, callbackContext = null, ...args) {
    return this.create(delay, false, 0, callback, callbackContext, args);
  }

  /**
   * Creates a new async TimerEvent that runs once.
   * @template T
   * @param {number} delay - The delay in milliseconds before the promise resolves.
   * @param {...T} args - Arguments to pass to the resolve function.
   * @returns {Promise<T | T[]>} The created Promise.
   */
  wait(delay, ...args) {
    return new Promise((resolve) => {
      this.create(delay, false, 0, () => {
        resolve(args.length <= 1 ? args[0] : args);
      });
    });
  }

  /**
   * Creates a new TimerEvent that repeats a specified number of times.
   * @param {number} delay - The delay in milliseconds before the event fires.
   * @param {number} repeatCount - The number of times to repeat the event (0 = infinite).
   * @param {Function} callback - The function to call when the event fires.
   * @param {object} callbackContext - The context in which to call the callback.
   * @param {...any} args - Arguments to pass to the callback function.
   * @returns {TimerEvent} The created TimerEvent.
   */
  repeat(delay, repeatCount, callback, callbackContext = null, ...args) {
    return this.create(delay, false, repeatCount, callback, callbackContext, args);
  }

  /**
   * Creates a new TimerEvent that loops indefinitely.
   * @param {number} delay - The delay in milliseconds before the event fires.
   * @param {Function} callback - The function to call when the event fires.
   * @param {object} callbackContext - The context in which to call the callback.
   * @param {...any} args - Arguments to pass to the callback function.
   * @returns {TimerEvent} The created TimerEvent.
   */
  loop(delay, callback, callbackContext = null, ...args) {
    return this.create(delay, true, 0, callback, callbackContext, args);
  }

  /**
   * Starts the timer.
   * @param {number} delay - The delay in milliseconds before starting (optional).
   */
  start(delay = 0) {
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
   * Stops the timer.
   * @param {boolean} clearEvents - Whether to clear all events (default: true).
   */
  stop(clearEvents = true) {
    this.running = false;
    if (clearEvents) {
      this.events.length = 0;
    }
  }

  /**
   * Removes a TimerEvent from the timer.
   * @param {TimerEvent | null | undefined} event - The TimerEvent to remove.
   * @returns {boolean} True if the event was removed, false otherwise.
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
   * Orders the timer events by their next tick time.
   */
  order() {
    if (this.events.length > 0) {
      //  Sort the events so the one with the lowest tick is first
      this.events.sort(this.sortHandler);
      this.nextTick = this.events[0].tick;
    }
  }

  /**
   * Sorts TimerEvents by their tick time.
   * @param {TimerEvent} a - First TimerEvent to compare.
   * @param {TimerEvent} b - Second TimerEvent to compare.
   * @returns {number} Comparison result (-1, 0, or 1).
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
   * Clears pending events from the timer.
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
   * Updates the timer state at a given time.
   * @param {number} time - The current time in milliseconds.
   * @returns {boolean} True if the timer should continue running, false if it should be destroyed.
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
   * Pauses the timer.
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
   * Internal pause method for the timer.
   */
  _pause() {
    if (this.paused || !this.running) {
      return;
    }
    this._pauseStarted = this.game.time.time;
    this.paused = true;
  }

  /**
   * Adjusts timer events when time has jumped (e.g., when tab is switched).
   * @param {number} baseTime - The time to adjust from.
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
   * Resumes the timer.
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
   * Internal resume method for the timer.
   */
  _resume() {
    if (this._codePaused) {
      return;
    }
    this.resume();
  }

  /**
   * Removes all events from the timer.
   */
  removeAll() {
    this.onComplete.removeAll();
    this.events.length = 0;
    this._len = 0;
    this._i = 0;
  }

  /**
   * Destroys the timer and cleans up resources.
   */
  destroy() {
    this.onComplete.removeAll();
    this.running = false;
    this.events = [];
    this._len = 0;
    this._i = 0;
  }

  /**
   * Gets the next tick time for the timer.
   * @returns {number} The next tick time in milliseconds.
   */
  get next() {
    return this.nextTick;
  }

  /**
   * Gets the duration until the next event.
   * @returns {number} The duration in milliseconds.
   */
  get duration() {
    if (this.running && this.nextTick > this._now) {
      return this.nextTick - this._now;
    }
    return 0;
  }

  /**
   * Gets the number of active events in the timer.
   * @returns {number} The number of events.
   */
  get length() {
    return this.events.length;
  }

  /**
   * Gets the elapsed time since the timer started.
   * @returns {number} The elapsed time in milliseconds.
   */
  get ms() {
    if (this.running) {
      return this._now - this._started - this._pauseTotal;
    }
    return 0;
  }

  /**
   * Gets the elapsed time in seconds since the timer started.
   * @returns {number} The elapsed time in seconds.
   */
  get seconds() {
    if (this.running) {
      return this.ms * 0.001;
    }
    return 0;
  }
}
