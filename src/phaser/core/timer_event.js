export class TimerEvent {
  /**
   * Creates a new TimerEvent instance.
   * @param {import('./timer.js').Timer} timer - Reference to the parent Timer.
   * @param {number} delay - The delay (in milliseconds) before the event should occur.
   * @param {number} tick - The tick (in milliseconds) at which the event should occur.
   * @param {number} repeatCount - The number of times the event should repeat.
   * @param {boolean} loop - Whether the event should loop.
   * @param {Function} callback - The function to call when the event occurs.
   * @param {object} callbackContext - The context in which to call the callback function.
   * @param {...any} args - Arguments to pass to the callback function.
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
