export class SignalBinding {
  /**
   * TBD.
   * @param {import('./signal.js').Signal} signal - TBD.
   * @param {Function} listener - TBD.
   * @param {boolean} isOnce - TBD.
   * @param {object} listenerContext - TBD.
   * @param {number} priority - TBD.
   * @param {...any} args - TBD.
   */
  constructor(signal, listener, isOnce = false, listenerContext = null, priority = 0, args = null) {
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
  execute(paramsArr) {
    let handlerReturn;
    let params;
    if (this.active && !!this._listener) {
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
  detach() {
    return this.isBound() ? this._signal.remove(this._listener, this.context) : null;
  }

  /**
   * TBD.
   * @returns {boolean} TBD.
   */
  isBound() {
    return !!this._signal && !!this._listener;
  }

  /**
   * TBD.
   * @returns {boolean} TBD.
   */
  isOnce() {
    return this._isOnce;
  }

  /**
   * TBD.
   * @returns {Function} TBD.
   */
  getListener() {
    return this._listener;
  }

  /**
   * TBD.
   * @returns {import('./signal.js').Signal} TBD.
   */
  getSignal() {
    return this._signal;
  }

  /**
   * TBD.
   */
  _destroy() {
    delete this._signal;
    delete this._listener;
    delete this.context;
  }

  /**
   * TBD.
   * @returns {string} TBD.
   */
  toString() {
    return `[SignalBinding isOnce:${this._isOnce}, isBound:${this.isBound()}, active:${this.active}]`;
  }
}
