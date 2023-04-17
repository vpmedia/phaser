export class Signal {
    _bindings: any[];
    _prevParams: any[];
    memorize: boolean;
    _shouldPropagate: boolean;
    active: boolean;
    _boundDispatch: boolean;
    validateListener(listener: any, fnName: any): void;
    _registerListener(listener: any, isOnce: any, listenerContext: any, priority: any, args: any): any;
    _addBinding(binding: any): void;
    _indexOfListener(listener: any, context?: any): number;
    has(listener: any, context: any): boolean;
    add(listener: any, listenerContext: any, priority: any, ...args: any[]): any;
    addOnce(listener: any, listenerContext: any, priority: any, ...args: any[]): any;
    remove(listener: any, context: any): any;
    removeAll(context?: any): void;
    getNumListeners(): number;
    halt(): void;
    dispatch(...args: any[]): void;
    forget(): void;
    dispose(): void;
    toString(): string;
    get boundDispatch(): boolean;
}
//# sourceMappingURL=signal.d.ts.map