export class Timer {
    constructor(game: any, autoDestroy?: boolean);
    game: any;
    running: boolean;
    autoDestroy: boolean;
    expired: boolean;
    elapsed: number;
    events: any[];
    onComplete: Signal;
    nextTick: number;
    timeCap: number;
    paused: boolean;
    _codePaused: boolean;
    _started: number;
    _pauseStarted: number;
    _pauseTotal: number;
    _now: number;
    _len: number;
    _marked: number;
    _i: number;
    _diff: number;
    _newTick: number;
    create(delay: any, loop: any, repeatCount: any, callback: any, callbackContext: any, args: any): TimerEvent;
    add(delay: any, callback: any, callbackContext: any, ...args: any[]): TimerEvent;
    repeat(delay: any, repeatCount: any, callback: any, callbackContext: any, ...args: any[]): TimerEvent;
    loop(delay: any, callback: any, callbackContext: any, ...args: any[]): TimerEvent;
    start(delay: any): void;
    stop(clearEvents?: boolean): void;
    remove(event: any): boolean;
    order(): void;
    sortHandler(a: any, b: any): 0 | 1 | -1;
    clearPendingEvents(): void;
    update(time: any): boolean;
    pause(): void;
    _pause(): void;
    adjustEvents(baseTime: any): void;
    resume(): void;
    _resume(): void;
    removeAll(): void;
    destroy(): void;
    get next(): number;
    get duration(): number;
    get length(): number;
    get ms(): number;
    get seconds(): number;
}
import { Signal } from './signal';
import { TimerEvent } from './timer_event';
//# sourceMappingURL=timer.d.ts.map