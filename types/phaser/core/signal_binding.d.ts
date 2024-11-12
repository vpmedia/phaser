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
    constructor(signal: import("./signal.js").Signal, listener: Function, isOnce?: boolean, listenerContext?: object, priority?: number, args?: any[]);
    _signal: import("./signal.js").Signal;
    _listener: Function;
    _args: any;
    _priority: number;
    _isOnce: boolean;
    context: any;
    callCount: number;
    active: boolean;
    params: any;
    /**
     * TBD.
     * @param {any[]} paramsArr - TBD.
     * @returns {Function} TBD.
     */
    execute(paramsArr: any[]): Function;
    /**
     * TBD.
     * @returns {Function} TBD.
     */
    detach(): Function;
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    isBound(): boolean;
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    isOnce(): boolean;
    /**
     * TBD.
     * @returns {Function} TBD.
     */
    getListener(): Function;
    /**
     * TBD.
     * @returns {import('./signal.js').Signal} TBD.
     */
    getSignal(): import("./signal.js").Signal;
    /**
     * TBD.
     */
    _destroy(): void;
    /**
     * TBD.
     * @returns {string} TBD.
     */
    toString(): string;
}
//# sourceMappingURL=signal_binding.d.ts.map