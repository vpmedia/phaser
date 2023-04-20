export class Signal {
    _bindings: any[];
    _prevParams: any[];
    memorize: boolean;
    _shouldPropagate: boolean;
    active: boolean;
    _boundDispatch: boolean;
    /**
     * TBD.
     * @param listener
     * @param fnName
     */
    validateListener(listener: any, fnName: any): void;
    /**
     * TBD.
     * @param listener
     * @param isOnce
     * @param listenerContext
     * @param priority
     * @param args - TBD.
     */
    _registerListener(listener: any, isOnce: any, listenerContext: any, priority: any, args: any): any;
    /**
     * TBD.
     * @param binding
     */
    _addBinding(binding: any): void;
    /**
     * TBD.
     * @param listener
     * @param context
     */
    _indexOfListener(listener: any, context?: any): number;
    /**
     * TBD.
     * @param listener
     * @param context
     */
    has(listener: any, context: any): boolean;
    /**
     * TBD.
     * @param listener
     * @param listenerContext
     * @param priority
     * @param {...any} args
     */
    add(listener: any, listenerContext: any, priority: any, ...args: any[]): any;
    /**
     * TBD.
     * @param listener
     * @param listenerContext
     * @param priority
     * @param {...any} args
     */
    addOnce(listener: any, listenerContext: any, priority: any, ...args: any[]): any;
    /**
     * TBD.
     * @param listener
     * @param context
     */
    remove(listener: any, context: any): any;
    /**
     * TBD.
     * @param context
     */
    removeAll(context?: any): void;
    /**
     * TBD.
     */
    getNumListeners(): number;
    /**
     * TBD.
     */
    halt(): void;
    /**
     * TBD.
     * @param {...any} args
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
     */
    toString(): string;
    /**
     * TBD.
     */
    get boundDispatch(): boolean;
}
//# sourceMappingURL=signal.d.ts.map