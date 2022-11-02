/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
export default class {

  constructor(game) {
    this.game = game;
    this.isRunning = false;
    this.timeoutId = null;
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
    this.updateBinded = this.update.bind(this);
    // this.updateBinded = time => this.update(time);
  }

  start() {
    this.isRunning = true;
    this.timeoutId = window.requestAnimationFrame(this.updateBinded);
  }

  stop() {
    window.cancelAnimationFrame(this.timeoutId);
    this.isRunning = false;
  }

  update(rafTime) {
    if (!this.isRunning) {
      return;
    }
    // floor the rafTime to make it equivalent to the Date.now() provided by updateSetTimeout (just below)
    // this.game.update(Math.floor(rafTime));
    this.game.update(rafTime);
    this.timeoutId = window.requestAnimationFrame(this.updateBinded);
  }

}
