import { SignalBinding } from './signal_binding.js';

export class Signal {
  public _bindings: SignalBinding[] | null = null;
  public _prevParams: unknown[] | null = null;
  public memorize = false;
  public _shouldPropagate = true;
  public active = true;
  public _boundDispatch: ((...args: unknown[]) => void) | null = null;

  /**
   * Creates a new Signal instance.
   * A Signal is a simple event system that allows you to dispatch events and listen for them.
   */

  /**
   * Validates that a listener is a function.
   * @param {Function} listener - The listener to validate.
   * @param {string} fnName - The name of the function this validation is for.
   * @throws {Error} If the listener is not a function.
   */
  public validateListener(listener: Function, fnName: string): void {
    if (typeof listener !== 'function') {
      throw new TypeError(
        'Signal: listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName)
      );
    }
  }

  /**
   * Register a new listener with the signal.
   * @param {Function} listener - The function to call when the signal is dispatched.
   * @param {boolean} isOnce - Whether the listener should only be called once.
   * @param {object} listenerContext - The context to apply when calling the listener.
   * @param {number} priority - The priority of this listener (higher numbers execute first).
   * @param {...any} args - Additional arguments to pass to the listener.
   * @returns {SignalBinding} The binding for this listener.
   * @throws {Error} If the listener is already registered with a different once setting.
   */
  public _registerListener(
    listener: Function,
    isOnce = false,
    listenerContext: unknown | null = null,
    priority = 0,
    args: any = null
  ): SignalBinding {
    const prevIndex = this._indexOfListener(listener, listenerContext);
    let binding;
    const existing = prevIndex !== -1 && this._bindings ? this._bindings[prevIndex] : undefined;
    if (existing) {
      binding = existing;
      if (binding.isOnce() !== isOnce) {
        throw new Error(
          `You cannot add${isOnce ? '' : 'Once'}() then add${
            !isOnce ? '' : 'Once'
          }() the same listener without removing the relationship first.`
        );
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

  /**
   * Add a binding to the list of listeners.
   * @param {SignalBinding} binding - The binding to add.
   */
  public _addBinding(binding: SignalBinding): void {
    this._bindings ??= [];
    //  Simplified insertion sort
    let n = this._bindings.length;
    do {
      n -= 1;
    } while (this._bindings[n] && binding._priority <= this._bindings[n]!._priority);
    this._bindings.splice(n + 1, 0, binding);
  }

  /**
   * Find the index of a listener in the bindings array.
   * @param {Function} listener - The listener to find.
   * @param {object} context - The context of the listener.
   * @returns {number} The index of the listener in the bindings array, or -1 if not found.
   */
  public _indexOfListener(listener: Function, context: unknown = null): number {
    if (!this._bindings) {
      return -1;
    }
    let n = this._bindings.length;
    let cur;
    while (n) {
      n -= 1;
      cur = this._bindings[n]!;
      if (cur._listener === listener && cur.context === context) {
        return n;
      }
    }
    return -1;
  }

  /**
   * Check if a listener is registered with the signal.
   * @param {Function} listener - The listener to check.
   * @param {object} context - The context of the listener.
   * @returns {boolean} True if the listener is registered, false otherwise.
   */
  public has(listener: Function, context: unknown = null): boolean {
    return this._indexOfListener(listener, context) !== -1;
  }

  /**
   * Add a listener that will be called every time the signal is dispatched.
   * @param {Function} listener - The function to call when the signal is dispatched.
   * @param {object} listenerContext - The context to apply when calling the listener.
   * @param {number} priority - The priority of this listener (higher numbers execute first).
   * @param {...any} args - Additional arguments to pass to the listener.
   * @returns {SignalBinding} The binding for this listener.
   */
  public add(
    listener: Function,
    listenerContext: unknown | null = null,
    priority = 0,
    ...args: unknown[]
  ): SignalBinding {
    this.validateListener(listener, 'add');
    return this._registerListener(listener, false, listenerContext, priority, args);
  }

  /**
   * Add a listener that will be called only once when the signal is dispatched.
   * @param {Function} listener - The function to call when the signal is dispatched.
   * @param {object} listenerContext - The context to apply when calling the listener.
   * @param {number} priority - The priority of this listener (higher numbers execute first).
   * @param {...any} args - Additional arguments to pass to the listener.
   * @returns {SignalBinding} The binding for this listener.
   */
  public addOnce(
    listener: Function,
    listenerContext: unknown | null = null,
    priority = 0,
    ...args: unknown[]
  ): SignalBinding {
    this.validateListener(listener, 'addOnce');
    return this._registerListener(listener, true, listenerContext, priority, args);
  }

  /**
   * Remove a listener from the signal.
   * @param {Function} listener - The listener to remove.
   * @param {object} context - The context of the listener.
   * @returns {Function} The removed listener function.
   */
  public remove(listener: Function, context: unknown = null): Function {
    this.validateListener(listener, 'remove');
    const i = this._indexOfListener(listener, context);
    if (i !== -1 && this._bindings) {
      // no reason to a SignalBinding exist if it isn't attached to a signal
      this._bindings[i]!._destroy();
      this._bindings.splice(i, 1);
    }
    return listener;
  }

  /**
   * Remove all listeners from the signal, or only those in a specific context.
   * @param {object} context - The context to filter listeners by, or null to remove all.
   */
  public removeAll(context: unknown = null): void {
    if (!this._bindings) {
      return;
    }
    let n = this._bindings.length;
    while (n) {
      n -= 1;
      if (context) {
        if (this._bindings[n]!.context === context) {
          this._bindings[n]!._destroy();
          this._bindings.splice(n, 1);
        }
      } else {
        this._bindings[n]!._destroy();
      }
    }
    if (!context) {
      this._bindings.length = 0;
    }
  }

  /**
   * Get the number of listeners registered with the signal.
   * @returns {number} The number of registered listeners.
   */
  public getNumListeners(): number {
    return this._bindings ? this._bindings.length : 0;
  }

  /**
   * Stop the signal from propagating to other listeners.
   * This method prevents any remaining listeners from being called.
   */
  public halt(): void {
    this._shouldPropagate = false;
  }

  /**
   * Dispatch the signal to all registered listeners.
   * @param {...any} args - Arguments to pass to the listeners.
   */
  public dispatch(...args: unknown[]): void {
    if (!this.active || !this._bindings) {
      return;
    }
    const paramsArr = [...args];
    let n = this._bindings.length;

    if (this.memorize) {
      this._prevParams = paramsArr;
    }
    if (!n) {
      // Should come after memorize
      return;
    }
    const bindings = [...this._bindings]; // clone array in case add/remove items during dispatch
    this._shouldPropagate = true; // in case `halt` was called before dispatch or during the previous dispatch.

    // execute all callbacks until end of the list or until a callback returns `false` or stops propagation
    // reverse loop since listeners with higher priority will be added at the end of the list
    do {
      n -= 1;
    } while (bindings[n] && this._shouldPropagate && bindings[n]!.execute(paramsArr) !== false);
  }

  /**
   * Clear any previously memorized arguments.
   * This removes the stored arguments from a previous dispatch.
   */
  public forget(): void {
    if (this._prevParams) {
      this._prevParams = null;
    }
  }

  /**
   * Dispose of the signal and clean up all resources.
   * This method removes all listeners and clears internal state.
   */
  public dispose(): void {
    this.removeAll();
    this.forget();
    this._bindings = null;
  }

  /**
   * Get a string representation of the signal.
   * @returns {string} A string representation of the signal.
   */
  public toString(): string {
    return `[Signal active:${this.active} numListeners:${this.getNumListeners()}]`;
  }

  /**
   * Get a bound version of the dispatch function.
   * @returns {Function} A function that will dispatch the signal with the correct context.
   */
  public get boundDispatch() {
    const _this = this;
    this._boundDispatch ??= (...rest: unknown[]): void => {
      _this.dispatch(...rest);
    };
    return this._boundDispatch;
  }

  /**
   * Promisify the Signal.
   * @returns {Promise<any>} The resolved result.
   */
  public toPromise(): Promise<unknown> {
    return new Promise((resolve): void => {
      this.addOnce((...args: unknown[]): void => {
        resolve(args.length <= 1 ? args[0] : args);
      }, this);
    });
  }
}
