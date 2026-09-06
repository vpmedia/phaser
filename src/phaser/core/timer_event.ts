import type { Timer } from './timer.js';
import type { Callback } from './callback.js';

export class TimerEvent {
  public timer: Timer;
  public delay: number;
  public tick: number;
  public repeatCount: number;
  public loop: boolean;
  public callback: Callback;
  public callbackContext: unknown;
  public args: unknown[];
  public pendingDelete: boolean;

  public constructor(
    timer: Timer,
    delay: number,
    tick: number,
    repeatCount: number,
    loop: boolean,
    callback: Callback,
    callbackContext: unknown,
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
