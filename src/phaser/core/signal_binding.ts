import type { Signal } from './signal.js';
export class SignalBinding {
  public _signal: any;
  public _listener: any;
  public _args: any;
  public _priority: number;
  public _isOnce: boolean;
  public context: unknown;
  public callCount: number;
  public active: boolean;
  public params: any;

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
    listener: Function,
    isOnce = false,
    listenerContext: unknown | null = null,
    priority = 0,
    args: any = null
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
  public execute(paramsArr: any[]) {
    let handlerReturn;
    let params;
    if (this.active && Boolean(this._listener)) {
      params = this.params ? this.params.concat(paramsArr) : paramsArr;
      if (this._args) {
        params = params.concat(this._args);
      }
      handlerReturn = this._listener.apply(this.context, params);
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
  public detach() {
    return this.isBound() ? this._signal.remove(this._listener, this.context) : null;
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
  public getListener() {
    return this._listener;
  }

  /**
   * TBD.
   * @returns {Signal} TBD.
   */
  public getSignal() {
    return this._signal;
  }

  /**
   * TBD.
   */
  public _destroy(): void {
    delete this._signal;
    delete this._listener;
    delete this.context;
  }

  /**
   * TBD.
   * @returns {string} TBD.
   */
  public toString(): string {
    return `[SignalBinding isOnce:${this._isOnce}, isBound:${this.isBound()}, active:${this.active}]`;
  }
}
