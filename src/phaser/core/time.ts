import type { Game } from './game.js';
import { Timer } from './timer.js';

export class Time {
  public game!: Game;
  public time!: number;
  public prevTime!: number;
  public now!: number;
  public elapsed!: number;
  public elapsedMS!: number;
  public desiredFpsMult!: number;
  public _desiredFps!: number;
  public suggestedFps!: number;
  public advancedTiming!: boolean;
  public frames!: number;
  public fps!: number;
  public fpsMin!: number;
  public fpsMax!: number;
  public msMin!: number;
  public msMax!: number;
  public pauseDuration!: number;
  public timeToCall!: number;
  public timeExpected!: number;
  public events!: Timer;
  public _frameCount!: number;
  public _elapsedAccumulator!: number;
  public _started!: number;
  public _timeLastSecond!: number;
  public _pauseStarted!: number;
  public _justResumed!: boolean;
  public _timers!: Timer[];
  /**
   * Creates a new Time instance.
   * @param {Game} game - Reference to the Phaser Game instance.
   */
  public constructor(game: Game) {
    this.game = game;
    this.time = 0;
    this.prevTime = 0;
    this.now = 0;
    this.elapsed = 0;
    this.elapsedMS = 0;
    this.desiredFpsMult = 1 / 60;
    this._desiredFps = 60;
    this.suggestedFps = this.desiredFps;
    this.advancedTiming = false;
    this.frames = 0;
    this.fps = 0;
    this.fpsMin = 1000;
    this.fpsMax = 0;
    this.msMin = 1000;
    this.msMax = 0;
    this.pauseDuration = 0;
    this.timeToCall = 0;
    this.timeExpected = 0;
    this.events = new Timer(this.game, false);
    this._frameCount = 0;
    this._elapsedAccumulator = 0;
    this._started = 0;
    this._timeLastSecond = 0;
    this._pauseStarted = 0;
    this._justResumed = false;
    this._timers = [];
  }

  /**
   * Initializes the time manager and starts tracking time.
   */
  public boot() {
    this._started = Date.now();
    this.time = Date.now();
    this.events.start();
    this.timeExpected = this.time;
  }

  /**
   * Adds a Timer to the Time manager.
   * @param {Timer} timer - The Timer to add.
   * @returns {Timer} The added Timer object.
   */
  public add(timer: Timer) {
    this._timers.push(timer);
    return timer;
  }

  /**
   * Creates a new Timer and adds it to the Time manager.
   * @param {boolean} autoDestroy - Whether the timer should be automatically destroyed when it completes.
   * @returns {Timer} The created Timer object.
   */
  public create(autoDestroy = true) {
    const timer = new Timer(this.game, autoDestroy);
    this._timers.push(timer);
    return timer;
  }

  /**
   * Removes all timers from the Time manager.
   */
  public removeAll() {
    for (const timer of this._timers) {
      timer.destroy();
    }
    this._timers = [];
    this.events.removeAll();
  }

  /**
   * Refreshes the time tracking values.
   */
  public refresh() {
    const previousDateNow = this.time;
    // this.time always holds a Date.now value
    this.time = Date.now();
    //  Adjust accordingly.
    this.elapsedMS = this.time - previousDateNow;
  }

  /**
   * Updates the Time manager with a new timestamp.
   * @param {number} time - The new timestamp to use for updating.
   */
  public update(time: number) {
    const previousDateNow = this.time;
    // this.time always holds a Date.now value
    this.time = Date.now();
    //  Adjust accordingly.
    this.elapsedMS = this.time - previousDateNow;
    // 'now' is currently still holding the time of the last call, move it into prevTime
    this.prevTime = this.now;
    // update 'now' to hold the current time
    // this.now may hold the RAF high resolution time value if RAF is available (otherwise it also holds Date.now)
    this.now = time;
    // elapsed time between previous call and now - this could be a high resolution value
    this.elapsed = this.now - this.prevTime;
    if (this.advancedTiming) {
      this.updateAdvancedTiming();
    }
    //  Paused but still running?
    if (!this.game.paused) {
      //  Our internal Phaser.Timer
      this.events.update(this.time);
      if (this._timers.length > 0) {
        this.updateTimers();
      }
    }
  }

  /**
   * Updates all timers managed by the Time manager.
   */
  public updateTimers() {
    let i = 0;
    let len = this._timers.length;
    while (i < len) {
      if (this._timers[i]!.update(this.time)) {
        i += 1;
      } else {
        //  Timer requests to be removed
        this._timers.splice(i, 1);
        len -= 1;
      }
    }
  }

  /**
   * Updates the advanced timing values.
   */
  public updateAdvancedTiming() {
    // count the number of time.update calls
    this._frameCount += 1;
    this._elapsedAccumulator += this.elapsed;
    // occasionally recalculate the suggestedFps based on the accumulated elapsed time
    if (this._frameCount >= this._desiredFps * 2) {
      // this formula calculates suggestedFps in multiples of 5 fps
      this.suggestedFps = Math.floor(200 / (this._elapsedAccumulator / this._frameCount)) * 5;
      this._frameCount = 0;
      this._elapsedAccumulator = 0;
    }
    this.msMin = Math.min(this.msMin, this.elapsed);
    this.msMax = Math.max(this.msMax, this.elapsed);
    this.frames += 1;
    if (this.now > this._timeLastSecond + 1000) {
      this.fps = Math.round((this.frames * 1000) / (this.now - this._timeLastSecond));
      this.fpsMin = Math.min(this.fpsMin, this.fps);
      this.fpsMax = Math.max(this.fpsMax, this.fps);
      this._timeLastSecond = this.now;
      this.frames = 0;
    }
  }

  /**
   * Handles game pause event.
   */
  public gamePaused() {
    this._pauseStarted = Date.now();
    this.events.pause();
    let i = this._timers.length;
    while (i) {
      i -= 1;
      this._timers[i]!._pause();
    }
  }

  /**
   * Handles game resume event.
   */
  public gameResumed() {
    this.time = Date.now();
    this.pauseDuration = this.time - this._pauseStarted;
    this.events.resume();
    let i = this._timers.length;
    while (i) {
      i -= 1;
      this._timers[i]!._resume();
    }
  }

  /**
   * Gets the total elapsed time in seconds since the game started.
   * @returns {number} The total elapsed time in seconds.
   */
  public totalElapsedSeconds() {
    return (this.time - this._started) * 0.001;
  }

  /**
   * Gets the elapsed time in milliseconds since a given timestamp.
   * @param {number} since - The timestamp to calculate elapsed time from.
   * @returns {number} The elapsed time in milliseconds.
   */
  public elapsedSince(since: number) {
    return this.time - since;
  }

  /**
   * Gets the elapsed time in seconds since a given timestamp.
   * @param {number} since - The timestamp to calculate elapsed time from.
   * @returns {number} The elapsed time in seconds.
   */
  public elapsedSecondsSince(since: number) {
    return (this.time - since) * 0.001;
  }

  /**
   * Resets the time tracking values.
   */
  public reset() {
    this._started = this.time;
    this.removeAll();
  }

  /**
   * Destroys the Time manager and cleans up resources.
   */
  public destroy() {
    this.reset();
  }

  /**
   * Gets the desired frames per second.
   * @returns {number} The desired frames per second.
   */
  public get desiredFps() {
    return this._desiredFps;
  }

  /**
   * Sets the desired frames per second.
   */
  public set desiredFps(value) {
    this._desiredFps = value;
    this.desiredFpsMult = 1 / value;
  }
}
