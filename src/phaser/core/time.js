import { Timer } from './timer';

export class Time {
  constructor(game) {
    this.game = game;
    this.time = 0;
    this.prevTime = 0;
    this.now = 0;
    this.elapsed = 0;
    this.elapsedMS = 0;
    this.desiredFpsMult = 1.0 / 60;
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

  boot() {
    this._started = Date.now();
    this.time = Date.now();
    this.events.start();
    this.timeExpected = this.time;
  }

  add(timer) {
    this._timers.push(timer);
    return timer;
  }

  create(autoDestroy = true) {
    const timer = new Timer(this.game, autoDestroy);
    this._timers.push(timer);
    return timer;
  }

  removeAll() {
    for (let i = 0; i < this._timers.length; i += 1) {
      this._timers[i].destroy();
    }
    this._timers = [];
    this.events.removeAll();
  }

  refresh() {
    const previousDateNow = this.time;
    // this.time always holds a Date.now value
    this.time = Date.now();
    //  Adjust accordingly.
    this.elapsedMS = this.time - previousDateNow;
  }

  update(time) {
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

  gamePaused() {
    this._pauseStarted = Date.now();
    this.events.pause();
    let i = this._timers.length;
    while (i) {
      i -= 1;
      this._timers[i]._pause();
    }
  }

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

  totalElapsedSeconds() {
    return (this.time - this._started) * 0.001;
  }

  elapsedSince(since) {
    return this.time - since;
  }

  elapsedSecondsSince(since) {
    return (this.time - since) * 0.001;
  }

  reset() {
    this._started = this.time;
    this.removeAll();
  }

  destroy() {
    this.reset();
  }

  get desiredFps() {
    return this._desiredFps;
  }

  set desiredFps(value) {
    this._desiredFps = value;
    this.desiredFpsMult = 1.0 / value;
  }
}
