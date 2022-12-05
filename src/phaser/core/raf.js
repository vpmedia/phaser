/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
export default class {

  constructor(game) {
    this.game = game;
    this.rafId = 0;
    this.updateBinded = this.update.bind(this);
  }

  start() {
    this.rafId = requestAnimationFrame(this.updateBinded);
  }

  stop() {
    cancelAnimationFrame(this.rafId);
  }

  update(rafTime) {
    this.game.update(rafTime);
    this.rafId = requestAnimationFrame(this.updateBinded);
  }

}
