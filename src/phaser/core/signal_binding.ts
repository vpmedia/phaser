import type { DispatchedListener, Signal, SignalListener } from './signal.js';
export class SignalBinding {
  public _signal: Signal | null;
  public _listener: SignalListener | null;
  public _args: unknown[] | null;
  public _priority: number;
  public _isOnce: boolean;
  public context: unknown;
  public callCount: number;
  public active: boolean;
  public params: unknown[] | null;

  /**
   * TBD.
   * @param {Signal} signal - TBD.
   * @param {Function} listener - TBD.
   * @param {boolean} isOnce - TBD.
   * @param {object} listenerContext - TBD.
   * @param {number} priority - TBD.
   * @param {...any} args - TBD.
   */
  public constructor(
    signal: Signal,
    listener: SignalListener,
    isOnce = false,
    listenerContext: unknown = null,
    priority = 0,
    args: unknown[] | null = null
  ) {
    this._signal = signal;
    this._listener = listener;
    this._args = args;
    this._priority = priority;
    this._isOnce = isOnce;
    this.context = listenerContext;
    this.callCount = 0;
    this.active = true;
    this.params = null;
  }

  /**
   * TBD.
   * @param {any[]} paramsArr - TBD.
   * @returns {Function} TBD.
   */
  public execute(paramsArr: unknown[]): unknown {
    let handlerReturn;
    if (this.active && this._listener) {
      let params = this.params ? [...this.params, ...paramsArr] : paramsArr;
      if (this._args) {
        params = [...params, ...this._args];
      }
      handlerReturn = (this._listener as DispatchedListener).apply(this.context, params);
      this.callCount += 1;
      if (this._isOnce) {
        this.detach();
      }
    }
    return handlerReturn;
  }

  /**
   * TBD.
   * @returns {Function} TBD.
   */
  public detach(): SignalListener | null {
    return this.isBound() ? this._signal!.remove(this._listener!, this.context) : null;
  }

  /**
   * TBD.
   * @returns {boolean} TBD.
   */
  public isBound(): boolean {
    return Boolean(this._signal) && Boolean(this._listener);
  }

  /**
   * TBD.
   * @returns {boolean} TBD.
   */
  public isOnce(): boolean {
    return this._isOnce;
  }

  /**
   * TBD.
   * @returns {Function} TBD.
   */
  public getListener(): SignalListener | null {
    return this._listener;
  }

  /**
   * TBD.
   * @returns {Signal} TBD.
   */
  public getSignal(): Signal | null {
    return this._signal;
  }

  /**
   * TBD.
   */
  public _destroy(): void {
    this._signal = null;
    this._listener = null;
    this.context = null;
  }

  /**
   * TBD.
   * @returns {string} TBD.
   */
  public toString(): string {
    return `[SignalBinding isOnce:${this._isOnce}, isBound:${this.isBound()}, active:${this.active}]`;
  }
}
