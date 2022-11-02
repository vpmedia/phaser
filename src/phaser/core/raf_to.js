/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
export default class {

  constructor(game) {
    this.game = game;
    this.isRunning = false;
    this.isSetTimeOut = true;
    this.timeoutId = null;
  }

  start() {
    this.isRunning = true;
    this.timeoutId = window.setTimeout(this.update, 0);
  }

  stop() {
    window.clearTimeout(this.timeoutId);
    this.isRunning = false;
  }

  update() {
    if (!this.isRunning) {
      return;
    }
    this.game.update(Date.now());
    this.timeoutId = window.setTimeout(this.update, this.game.time.timeToCall);
  }


}
