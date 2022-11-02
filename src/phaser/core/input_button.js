import Signal from './signal';
/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */

export default class {

  constructor(parent, buttonCode) {
    this.parent = parent;
    this.game = parent.game;
    this.event = null;
    this.isDown = false;
    this.isUp = true;
    this.timeDown = 0;
    this.timeUp = 0;
    this.repeats = 0;
    this.altKey = false;
    this.shiftKey = false;
    this.ctrlKey = false;
    this.value = 0;
    this.buttonCode = buttonCode;
    this.onDown = new Signal();
    this.onUp = new Signal();
    this.onFloat = new Signal();
  }

  start(event, value) {
    if (this.isDown) {
      return;
    }
    this.isDown = true;
    this.isUp = false;
    this.timeDown = this.game.time.time;
    this.repeats = 0;
    this.event = event;
    this.value = value;
    if (event) {
      this.altKey = event.altKey;
      this.shiftKey = event.shiftKey;
      this.ctrlKey = event.ctrlKey;
    }
    this.onDown.dispatch(this, value);
  }

  stop(event, value) {
    if (this.isUp) {
      return;
    }
    this.isDown = false;
    this.isUp = true;
    this.timeUp = this.game.time.time;
    this.event = event;
    this.value = value;
    if (event) {
      this.altKey = event.altKey;
      this.shiftKey = event.shiftKey;
      this.ctrlKey = event.ctrlKey;
    }
    this.onUp.dispatch(this, value);
  }

  padFloat(value) {
    this.value = value;
    this.onFloat.dispatch(this, value);
  }

  justPressed(duration = 250) {
    return (this.isDown && (this.timeDown + duration) > this.game.time.time);
  }

  justReleased(duration = 250) {
    return (this.isUp && (this.timeUp + duration) > this.game.time.time);
  }

  reset() {
    this.isDown = false;
    this.isUp = true;
    this.timeDown = this.game.time.time;
    this.repeats = 0;
    this.altKey = false;
    this.shiftKey = false;
    this.ctrlKey = false;
  }

  destroy() {
    this.onDown.dispose();
    this.onUp.dispose();
    this.onFloat.dispose();
    this.parent = null;
    this.game = null;
  }

  get duration() {
    if (this.isUp) {
      return -1;
    }
    return this.game.time.time - this.timeDown;
  }

}
