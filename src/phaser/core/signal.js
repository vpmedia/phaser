/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
import SignalBinding from './signal_binding';

export default class {

  constructor() {
    this._bindings = null;
    this._prevParams = null;
    this.memorize = false;
    this._shouldPropagate = true;
    this.active = true;
    this._boundDispatch = false;
  }

  validateListener(listener, fnName) {
    if (typeof listener !== 'function') {
      throw new Error('Signal: listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName));
    }
  }

  _registerListener(listener, isOnce, listenerContext, priority, args) {
    const prevIndex = this._indexOfListener(listener, listenerContext);
    let binding;
    if (prevIndex !== -1) {
      binding = this._bindings[prevIndex];
      if (binding.isOnce() !== isOnce) {
        throw new Error('You cannot add' + (isOnce ? '' : 'Once') + '() then add' + (!isOnce ? '' : 'Once') + '() the same listener without removing the relationship first.');
      }
    } else {
      binding = new SignalBinding(this, listener, isOnce, listenerContext, priority, args);
      this._addBinding(binding);
    }
    if (this.memorize && this._prevParams) {
      binding.execute(this._prevParams);
    }
    return binding;
  }

  _addBinding(binding) {
    if (!this._bindings) {
      this._bindings = [];
    }
    //  Simplified insertion sort
    let n = this._bindings.length;
    do {
      n -= 1;
    }
    while (this._bindings[n] && binding._priority <= this._bindings[n]._priority);
    this._bindings.splice(n + 1, 0, binding);
  }

  _indexOfListener(listener, context = null) {
    if (!this._bindings) {
      return -1;
    }
    let n = this._bindings.length;
    let cur;
    while (n) {
      n -= 1;
      cur = this._bindings[n];
      if (cur._listener === listener && cur.context === context) {
        return n;
      }
    }
    return -1;
  }

  has(listener, context) {
    return this._indexOfListener(listener, context) !== -1;
  }

  add(listener, listenerContext, priority, ...args) {
    this.validateListener(listener, 'add');
    return this._registerListener(listener, false, listenerContext, priority, args);
  }

  addOnce(listener, listenerContext, priority, ...args) {
    this.validateListener(listener, 'addOnce');
    return this._registerListener(listener, true, listenerContext, priority, args);
  }

  remove(listener, context) {
    this.validateListener(listener, 'remove');
    const i = this._indexOfListener(listener, context);
    if (i !== -1) {
      // no reason to a SignalBinding exist if it isn't attached to a signal
      this._bindings[i]._destroy();
      this._bindings.splice(i, 1);
    }
    return listener;
  }

  removeAll(context = null) {
    if (!this._bindings) {
      return;
    }
    let n = this._bindings.length;
    while (n) {
      n -= 1;
      if (context) {
        if (this._bindings[n].context === context) {
          this._bindings[n]._destroy();
          this._bindings.splice(n, 1);
        }
      } else {
        this._bindings[n]._destroy();
      }
    }
    if (!context) {
      this._bindings.length = 0;
    }
  }

  getNumListeners() {
    return this._bindings ? this._bindings.length : 0;
  }

  halt() {
    this._shouldPropagate = false;
  }

  dispatch(...args) {
    if (!this.active || !this._bindings) {
      return;
    }
    const paramsArr = args.slice();
    let n = this._bindings.length;

    if (this.memorize) {
      this._prevParams = paramsArr;
    }
    if (!n) {
      // Should come after memorize
      return;
    }
    const bindings = this._bindings.slice(); // clone array in case add/remove items during dispatch
    this._shouldPropagate = true; // in case `halt` was called before dispatch or during the previous dispatch.

    // execute all callbacks until end of the list or until a callback returns `false` or stops propagation
    // reverse loop since listeners with higher priority will be added at the end of the list
    do {
      n -= 1;
    }
    while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
  }

  forget() {
    if (this._prevParams) {
      this._prevParams = null;
    }
  }

  dispose() {
    this.removeAll();
    this.forget();
    this._bindings = null;
  }

  toString() {
    return '[Signal active:' + this.active + ' numListeners:' + this.getNumListeners() + ']';
  }

  get boundDispatch() {
    const _this = this;
    if (!this._boundDispatch) {
      this._boundDispatch = (...rest) => _this.dispatch(...rest);
    }
    return this._boundDispatch;
  }

}
