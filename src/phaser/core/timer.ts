import type { Game } from './game.js';
import { Signal } from './signal.js';
import { TimerEvent } from './timer_event.js';
import type { AppliedCallback, Callback } from './callback.js';

export class Timer {
  public game!: Game;
  public running!: boolean;
  public autoDestroy!: boolean;
  public expired!: boolean;
  public elapsed!: number;
  public events!: TimerEvent[];
  public onComplete!: Signal;
  public nextTick!: number;
  public timeCap!: number;
  public paused!: boolean;
  public _codePaused!: boolean;
  public _started!: number;
  public _pauseStarted!: number;
  public _pauseTotal!: number;
  public _now!: number;
  public _len!: number;
  public _marked!: number;
  public _i!: number;
  public _diff!: number;
  public _newTick!: number;
  /**
   * Creates a new Timer instance.
   * @param {Game} game - The game instance.
   * @param {boolean} autoDestroy - Whether to automatically destroy the timer when it completes.
   */
  public constructor(game: Game, autoDestroy = false) {
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
   * Creates a new TimerEvent.
   * @param {number} delay - The delay in milliseconds before the event fires.
   * @param {boolean} loop - Whether the event should loop indefinitely.
   * @param {number} repeatCount - The number of times to repeat the event (0 = infinite).
   * @param {Function} callback - The function to call when the event fires.
   * @param {object} callbackContext - The context in which to call the callback.
   * @param {...any} args - Arguments to pass to the callback function.
   * @returns {TimerEvent} The created TimerEvent.
   */
  public create(
    delay: number,
    loop: boolean,
    repeatCount: number,
    callback: Callback,
    callbackContext: unknown = null,
    args: unknown[] = []
  ): TimerEvent {
    const roundedDelay = Math.round(delay);
    let tick = roundedDelay;
    tick += this._now === 0 ? this.game.time.time : this._now;
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
  public add(delay: number, callback: Callback, callbackContext: unknown = null, ...args: unknown[]): TimerEvent {
    return this.create(delay, false, 0, callback, callbackContext, args);
  }

  /**
   * Creates a new async TimerEvent that runs once.
   * @template T
   * @param {number} delay - The delay in milliseconds before the promise resolves.
   * @param {...T} args - Arguments to pass to the resolve function.
   * @returns {Promise<T | T[]>} The created Promise.
   */
  public wait(delay: number, ...args: unknown[]): Promise<unknown> {
    return new Promise((resolve): void => {
      this.create(delay, false, 0, (): void => {
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
  public repeat(
    delay: number,
    repeatCount: number,
    callback: Callback,
    callbackContext: unknown = null,
    ...args: unknown[]
  ): TimerEvent {
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
  public loop(delay: number, callback: Callback, callbackContext: unknown = null, ...args: unknown[]): TimerEvent {
    return this.create(delay, true, 0, callback, callbackContext, args);
  }

  /**
   * Starts the timer.
   * @param {number} delay - The delay in milliseconds before starting (optional).
   */
  public start(delay = 0): void {
    if (this.running) {
      return;
    }
    this._started = this.game.time.time + (delay || 0);
    this.running = true;
    for (const event of this.events) {
      event.tick = event.delay + this._started;
    }
  }

  /**
   * Stops the timer.
   * @param {boolean} clearEvents - Whether to clear all events (default: true).
   */
  public stop(clearEvents = true): void {
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
  public remove(event: TimerEvent | null | undefined): boolean {
    for (const candidate of this.events) {
      if (candidate === event) {
        candidate.pendingDelete = true;
        return true;
      }
    }
    return false;
  }

  /**
   * Orders the timer events by their next tick time.
   */
  public order(): void {
    if (this.events.length > 0) {
      //  Sort the events so the one with the lowest tick is first
      this.events.sort(this.sortHandler);
      const [first] = this.events;
      if (first) {
        this.nextTick = first.tick;
      }
    }
  }

  /**
   * Sorts TimerEvents by their tick time.
   * @param {TimerEvent} a - First TimerEvent to compare.
   * @param {TimerEvent} b - Second TimerEvent to compare.
   * @returns {number} Comparison result (-1, 0, or 1).
   */
  public sortHandler(a: TimerEvent, b: TimerEvent): 1 | -1 | 0 {
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
  public clearPendingEvents(): void {
    this._i = this.events.length;
    while (this._i) {
      this._i -= 1;
      if (this.events[this._i]?.pendingDelete) {
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
  public update(time: number): boolean {
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
        const event = this.events[this._i];
        if (!event) {
          break;
        }
        if (this._now >= event.tick && !event.pendingDelete) {
          //  (now + delay) - (time difference from last tick to now)
          this._newTick = this._now + event.delay - (this._now - event.tick);
          if (this._newTick < 0) {
            this._newTick = this._now + event.delay;
          }
          if (event.loop) {
            event.tick = this._newTick;
            (event.callback as AppliedCallback).apply(event.callbackContext, event.args);
          } else if (event.repeatCount > 0) {
            event.repeatCount -= 1;
            event.tick = this._newTick;
            (event.callback as AppliedCallback).apply(event.callbackContext, event.args);
          } else {
            this._marked += 1;
            event.pendingDelete = true;
            (event.callback as AppliedCallback).apply(event.callbackContext, event.args);
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
  public pause(): void {
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
  public _pause(): void {
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
  public adjustEvents(baseTime: number): void {
    for (const event of this.events) {
      if (!event.pendingDelete) {
        //  Work out how long there would have been from when the game paused until the events next tick
        let t = event.tick - baseTime;
        if (t < 0) {
          t = 0;
        }
        //  Add the difference on to the time now
        event.tick = this._now + t;
      }
    }
    const d = this.nextTick - baseTime;
    this.nextTick = d < 0 ? this._now : this._now + d;
  }

  /**
   * Resumes the timer.
   */
  public resume(): void {
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
  public _resume(): void {
    if (this._codePaused) {
      return;
    }
    this.resume();
  }

  /**
   * Removes all events from the timer.
   */
  public removeAll(): void {
    this.onComplete.removeAll();
    this.events.length = 0;
    this._len = 0;
    this._i = 0;
  }

  /**
   * Destroys the timer and cleans up resources.
   */
  public destroy(): void {
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
  public get next(): number {
    return this.nextTick;
  }

  /**
   * Gets the duration until the next event.
   * @returns {number} The duration in milliseconds.
   */
  public get duration(): number {
    if (this.running && this.nextTick > this._now) {
      return this.nextTick - this._now;
    }
    return 0;
  }

  /**
   * Gets the number of active events in the timer.
   * @returns {number} The number of events.
   */
  public get length(): number {
    return this.events.length;
  }

  /**
   * Gets the elapsed time since the timer started.
   * @returns {number} The elapsed time in milliseconds.
   */
  public get ms(): number {
    if (this.running) {
      return this._now - this._started - this._pauseTotal;
    }
    return 0;
  }

  /**
   * Gets the elapsed time in seconds since the timer started.
   * @returns {number} The elapsed time in seconds.
   */
  public get seconds(): number {
    if (this.running) {
      return this.ms * 0.001;
    }
    return 0;
  }
}
