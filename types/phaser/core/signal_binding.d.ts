export class SignalBinding {
    /**
     * TBD.
     * @param signal
     * @param listener
     * @param isOnce
     * @param listenerContext
     * @param priority
     * @param args - TBD.
     */
    constructor(signal: any, listener: any, isOnce?: boolean, listenerContext?: any, priority?: number, args?: any);
    _signal: any;
    _listener: any;
    _args: any;
    _priority: number;
    _isOnce: boolean;
    context: any;
    callCount: number;
    active: boolean;
    params: any;
    /**
     * TBD.
     * @param paramsArr
     */
    execute(paramsArr: any): any;
    /**
     * TBD.
     */
    detach(): any;
    /**
     * TBD.
     */
    isBound(): boolean;
    /**
     * TBD.
     */
    isOnce(): boolean;
    /**
     * TBD.
     */
    getListener(): any;
    /**
     * TBD.
     */
    getSignal(): any;
    /**
     * TBD.
     */
    _destroy(): void;
    /**
     * TBD.
     */
    toString(): string;
}
//# sourceMappingURL=signal_binding.d.ts.map