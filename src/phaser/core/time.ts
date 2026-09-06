import type { Game } from './game.js';
import { Timer } from './timer.js';

export class Time {
  game!: Game;
  time!: number;
  prevTime!: number;
  now!: number;
  elapsed!: number;
  elapsedMS!: number;
  desiredFpsMult!: number;
  _desiredFps!: number;
  suggestedFps!: number;
  advancedTiming!: boolean;
  frames!: number;
  fps!: number;
  fpsMin!: number;
  fpsMax!: number;
  msMin!: number;
  msMax!: number;
  pauseDuration!: number;
  timeToCall!: number;
  timeExpected!: number;
  events!: Timer;
  _frameCount!: number;
  _elapsedAccumulator!: number;
  _started!: number;
  _timeLastSecond!: number;
  _pauseStarted!: number;
  _justResumed!: boolean;
  _timers!: Timer[];
  /**
   * Creates a new Time instance.
   * @param {import('./game.js').Game} game - Reference to the Phaser Game instance.
   */
  constructor(game: Game) {
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
  boot() {
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
  add(timer: Timer) {
    this._timers.push(timer);
    return timer;
  }

  /**
   * Creates a new Timer and adds it to the Time manager.
   * @param {boolean} autoDestroy - Whether the timer should be automatically destroyed when it completes.
   * @returns {Timer} The created Timer object.
   */
  create(autoDestroy: boolean = true) {
    const timer = new Timer(this.game, autoDestroy);
    this._timers.push(timer);
    return timer;
  }

  /**
   * Removes all timers from the Time manager.
   */
  removeAll() {
    for (let i = 0; i < this._timers.length; i += 1) {
      this._timers[i].destroy();
    }
    this._timers = [];
    this.events.removeAll();
  }

  /**
   * Refreshes the time tracking values.
   */
  refresh() {
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
  update(time: number) {
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
      if (this._timers.length) {
        this.updateTimers();
      }
    }
  }

  /**
   * Updates all timers managed by the Time manager.
   */
  updateTimers() {
    let i = 0;
    let len = this._timers.length;
    while (i < len) {
      if (this._timers[i].update(this.time)) {
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
  updateAdvancedTiming() {
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
  gamePaused() {
    this._pauseStarted = Date.now();
    this.events.pause();
    let i = this._timers.length;
    while (i) {
      i -= 1;
      this._timers[i]._pause();
    }
  }

  /**
   * Handles game resume event.
   */
  gameResumed() {
    this.time = Date.now();
    this.pauseDuration = this.time - this._pauseStarted;
    this.events.resume();
    let i = this._timers.length;
    while (i) {
      i -= 1;
      this._timers[i]._resume();
    }
  }

  /**
   * Gets the total elapsed time in seconds since the game started.
   * @returns {number} The total elapsed time in seconds.
   */
  totalElapsedSeconds() {
    return (this.time - this._started) * 0.001;
  }

  /**
   * Gets the elapsed time in milliseconds since a given timestamp.
   * @param {number} since - The timestamp to calculate elapsed time from.
   * @returns {number} The elapsed time in milliseconds.
   */
  elapsedSince(since: number) {
    return this.time - since;
  }

  /**
   * Gets the elapsed time in seconds since a given timestamp.
   * @param {number} since - The timestamp to calculate elapsed time from.
   * @returns {number} The elapsed time in seconds.
   */
  elapsedSecondsSince(since: number) {
    return (this.time - since) * 0.001;
  }

  /**
   * Resets the time tracking values.
   */
  reset() {
    this._started = this.time;
    this.removeAll();
  }

  /**
   * Destroys the Time manager and cleans up resources.
   */
  destroy() {
    this.reset();
  }

  /**
   * Gets the desired frames per second.
   * @returns {number} The desired frames per second.
   */
  get desiredFps() {
    return this._desiredFps;
  }

  /**
   * Sets the desired frames per second.
   */
  set desiredFps(value) {
    this._desiredFps = value;
    this.desiredFpsMult = 1 / value;
  }
}
