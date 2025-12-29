export class Signal {
    _bindings: any[];
    _prevParams: any[];
    memorize: boolean;
    _shouldPropagate: boolean;
    active: boolean;
    _boundDispatch: (...rest: any[]) => void;
    /**
     * Validates that a listener is a function.
     * @param {Function} listener - The listener to validate.
     * @param {string} fnName - The name of the function this validation is for.
     * @throws {Error} If the listener is not a function.
     */
    validateListener(listener: Function, fnName: string): void;
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
    _registerListener(listener: Function, isOnce?: boolean, listenerContext?: object, priority?: number, args?: any[]): SignalBinding;
    /**
     * Add a binding to the list of listeners.
     * @param {SignalBinding} binding - The binding to add.
     */
    _addBinding(binding: SignalBinding): void;
    /**
     * Find the index of a listener in the bindings array.
     * @param {Function} listener - The listener to find.
     * @param {object} context - The context of the listener.
     * @returns {number} The index of the listener in the bindings array, or -1 if not found.
     */
    _indexOfListener(listener: Function, context?: object): number;
    /**
     * Check if a listener is registered with the signal.
     * @param {Function} listener - The listener to check.
     * @param {object} context - The context of the listener.
     * @returns {boolean} True if the listener is registered, false otherwise.
     */
    has(listener: Function, context?: object): boolean;
    /**
     * Add a listener that will be called every time the signal is dispatched.
     * @param {Function} listener - The function to call when the signal is dispatched.
     * @param {object} listenerContext - The context to apply when calling the listener.
     * @param {number} priority - The priority of this listener (higher numbers execute first).
     * @param {...any} args - Additional arguments to pass to the listener.
     * @returns {SignalBinding} The binding for this listener.
     */
    add(listener: Function, listenerContext?: object, priority?: number, ...args: any[]): SignalBinding;
    /**
     * Add a listener that will be called only once when the signal is dispatched.
     * @param {Function} listener - The function to call when the signal is dispatched.
     * @param {object} listenerContext - The context to apply when calling the listener.
     * @param {number} priority - The priority of this listener (higher numbers execute first).
     * @param {...any} args - Additional arguments to pass to the listener.
     * @returns {SignalBinding} The binding for this listener.
     */
    addOnce(listener: Function, listenerContext?: object, priority?: number, ...args: any[]): SignalBinding;
    /**
     * Remove a listener from the signal.
     * @param {Function} listener - The listener to remove.
     * @param {object} context - The context of the listener.
     * @returns {Function} The removed listener function.
     */
    remove(listener: Function, context?: object): Function;
    /**
     * Remove all listeners from the signal, or only those in a specific context.
     * @param {object} context - The context to filter listeners by, or null to remove all.
     */
    removeAll(context?: object): void;
    /**
     * Get the number of listeners registered with the signal.
     * @returns {number} The number of registered listeners.
     */
    getNumListeners(): number;
    /**
     * Stop the signal from propagating to other listeners.
     * This method prevents any remaining listeners from being called.
     */
    halt(): void;
    /**
     * Dispatch the signal to all registered listeners.
     * @param {...any} args - Arguments to pass to the listeners.
     */
    dispatch(...args: any[]): void;
    /**
     * Clear any previously memorized arguments.
     * This removes the stored arguments from a previous dispatch.
     */
    forget(): void;
    /**
     * Dispose of the signal and clean up all resources.
     * This method removes all listeners and clears internal state.
     */
    dispose(): void;
    /**
     * Get a string representation of the signal.
     * @returns {string} A string representation of the signal.
     */
    toString(): string;
    /**
     * Get a bound version of the dispatch function.
     * @returns {Function} A function that will dispatch the signal with the correct context.
     */
    get boundDispatch(): Function;
    /**
     * Promisify the Signal.
     * @returns {Promise<any>} The resolved result.
     */
    toPromise(): Promise<any>;
}
import { SignalBinding } from './signal_binding.js';
//# sourceMappingURL=signal.d.ts.map