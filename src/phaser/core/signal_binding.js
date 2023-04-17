/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 */

export class SignalBinding {
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

  detach() {
    return this.isBound() ? this._signal.remove(this._listener, this.context) : null;
  }

  isBound() {
    return !!this._signal && !!this._listener;
  }

  isOnce() {
    return this._isOnce;
  }

  getListener() {
    return this._listener;
  }

  getSignal() {
    return this._signal;
  }

  _destroy() {
    delete this._signal;
    delete this._listener;
    delete this.context;
  }

  toString() {
    return (
      '[SignalBinding isOnce:' +
      this._isOnce +
      ', isBound:' +
      this.isBound() +
      ', active:' +
      this.active +
      ']'
    );
  }
}
