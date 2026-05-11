import type { Timer } from './timer.js';

export class TimerEvent {
  timer: Timer;
  delay: number;
  tick: number;
  repeatCount: number;
  loop: boolean;
  callback: Function;
  callbackContext: object;
  args: unknown[];
  pendingDelete: boolean;

  constructor(
    timer: Timer,
    delay: number,
    tick: number,
    repeatCount: number,
    loop: boolean,
    callback: Function,
    callbackContext: object,
    args: unknown[]
  ) {
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
