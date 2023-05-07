export class Signal {
    _bindings: any[];
    _prevParams: any[];
    memorize: boolean;
    _shouldPropagate: boolean;
    active: boolean;
    _boundDispatch: boolean;
    /**
     * TBD.
     * @param {Function} listener - TBD.
     * @param {string} fnName - TBD.
     * @throws Error.
     */
    validateListener(listener: Function, fnName: string): void;
    /**
     * TBD.
     * @param {Function} listener - TBD.
     * @param {boolean} isOnce - TBD.
     * @param {object} listenerContext - TBD.
     * @param {number} priority - TBD.
     * @param {...any} args - TBD.
     * @returns {SignalBinding} TBD.
     * @throws Error.
     */
    _registerListener(listener: Function, isOnce?: boolean, listenerContext?: object, priority?: number, args?: any[]): SignalBinding;
    /**
     * TBD.
     * @param {SignalBinding} binding - TBD.
     */
    _addBinding(binding: SignalBinding): void;
    /**
     * TBD.
     * @param {Function} listener - TBD.
     * @param {object} context - TBD.
     * @returns {number} TBD.
     */
    _indexOfListener(listener: Function, context?: object): number;
    /**
     * TBD.
     * @param {Function} listener - TBD.
     * @param {object} context - TBD.
     * @returns {boolean} TBD.
     */
    has(listener: Function, context?: object): boolean;
    /**
     * TBD.
     * @param {Function} listener - TBD.
     * @param {object} listenerContext - TBD.
     * @param {number} priority - TBD.
     * @param {...any} args - TBD.
     * @returns {SignalBinding} TBD.
     */
    add(listener: Function, listenerContext?: object, priority?: number, ...args: any[]): SignalBinding;
    /**
     * TBD.
     * @param {Function} listener - TBD.
     * @param {object} listenerContext - TBD.
     * @param {number} priority - TBD.
     * @param {...any} args - TBD.
     * @returns {SignalBinding} TBD.
     */
    addOnce(listener: Function, listenerContext?: object, priority?: number, ...args: any[]): SignalBinding;
    /**
     * TBD.
     * @param {Function} listener - TBD.
     * @param {object} context - TBD.
     * @returns {Function} TBD.
     */
    remove(listener: Function, context?: object): Function;
    /**
     * TBD.
     * @param {object} context - TBD.
     */
    removeAll(context?: object): void;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    getNumListeners(): number;
    /**
     * TBD.
     */
    halt(): void;
    /**
     * TBD.
     * @param {...any} args - TBD.
     */
    dispatch(...args: any[]): void;
    /**
     * TBD.
     */
    forget(): void;
    /**
     * TBD.
     */
    dispose(): void;
    /**
     * TBD.
     * @returns {string} TBD.
     */
    toString(): string;
    /**
     * TBD.
     * @returns {Function} TBD.
     */
    get boundDispatch(): Function;
}
import { SignalBinding } from './signal_binding';
//# sourceMappingURL=signal.d.ts.map