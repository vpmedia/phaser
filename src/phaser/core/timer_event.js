export class TimerEvent {
  /**
   * TBD.
   * @param {import('./timer.js').Timer} timer - TBD.
   * @param {number} delay - TBD.
   * @param {number} tick - TBD.
   * @param {number} repeatCount - TBD.
   * @param {boolean} loop - TBD.
   * @param {Function} callback - TBD.
   * @param {object} callbackContext - TBD.
   * @param {...any} args - TBD.
   */
  constructor(timer, delay, tick, repeatCount, loop, callback, callbackContext, args) {
    this.timer = timer;
    this.delay = delay;
    this.tick = tick;
    this.repeatCount = repeatCount - 1;
    this.loop = loop;
    this.callback = callback;
    this.callbackContext = callbackContext;
    this.args = args;
    this.pendingDelete = false;
  }
}
