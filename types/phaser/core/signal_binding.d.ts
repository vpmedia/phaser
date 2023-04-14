/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 */
export default class _default {
    constructor(signal: any, listener: any, isOnce?: boolean, listenerContext?: null, priority?: number, args?: null);
    _signal: any;
    _listener: any;
    _args: any;
    _priority: number;
    _isOnce: boolean;
    context: any;
    callCount: number;
    active: boolean;
    params: any;
    execute(paramsArr: any): any;
    detach(): any;
    isBound(): boolean;
    isOnce(): boolean;
    getListener(): any;
    getSignal(): any;
    _destroy(): void;
    toString(): string;
}
//# sourceMappingURL=signal_binding.d.ts.map