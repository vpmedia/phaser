export class TimerEvent {
  /**
   * TBD.
   * @param timer
   * @param delay - TBD.
   * @param tick
   * @param repeatCount
   * @param loop
   * @param callback - TBD.
   * @param callbackContext
   * @param args - TBD.
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
