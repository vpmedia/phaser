/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
export default class {

  constructor(game, forceSetTimeOut = false) {
    this.game = game;
    this.forceSetTimeOut = forceSetTimeOut;
    this.isRunning = false;
    this._isSetTimeOut = false;
    this._onLoop = null;
    this._timeOutID = null;
    const vendors = [
      'ms',
      'moz',
      'webkit',
      'o',
    ];
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; x += 1) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'];
    }
  }

  start() {
    const scope = this;
    this.isRunning = true;
    if (!window.requestAnimationFrame || this.forceSetTimeOut) {
      this._isSetTimeOut = true;
      this._onLoop = () => scope.updateSetTimeout();
      this._timeOutID = window.setTimeout(this._onLoop, 0);
    } else {
      this._isSetTimeOut = false;
      this._onLoop = time => scope.updateRAF(time);
      this._timeOutID = window.requestAnimationFrame(this._onLoop);
    }
  }

  stop() {
    this.isRunning = false;
    if (this._isSetTimeOut) {
      window.clearTimeout(this._timeOutID);
    } else {
      window.cancelAnimationFrame(this._timeOutID);
    }
  }

  updateRAF(rafTime) {
    if (!this.isRunning) {
      return;
    }
    // floor the rafTime to make it equivalent to the Date.now() provided by updateSetTimeout (just below)
    this.game.update(Math.floor(rafTime));
    this._timeOutID = window.requestAnimationFrame(this._onLoop);
  }

  updateSetTimeout() {
    if (!this.isRunning) {
      return;
    }
    this.game.update(Date.now());
    this._timeOutID = window.setTimeout(this._onLoop, this.game.time.timeToCall);
  }

  isSetTimeOut() {
    return this._isSetTimeOut;
  }

  isRAF() {
    return this._isSetTimeOut === false;
  }

}
