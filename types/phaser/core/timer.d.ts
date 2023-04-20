export class Timer {
    /**
     * TBD.
     * @param {object} game - TBD.
     * @param autoDestroy
     */
    constructor(game: object, autoDestroy?: boolean);
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
    /**
     * TBD.
     * @param delay - TBD.
     * @param loop
     * @param repeatCount
     * @param callback - TBD.
     * @param callbackContext
     * @param args - TBD.
     */
    create(delay: any, loop: any, repeatCount: any, callback: any, callbackContext: any, args: any): TimerEvent;
    /**
     * TBD.
     * @param delay - TBD.
     * @param callback - TBD.
     * @param callbackContext
     * @param {...any} args
     */
    add(delay: any, callback: any, callbackContext: any, ...args: any[]): TimerEvent;
    /**
     * TBD.
     * @param delay - TBD.
     * @param repeatCount
     * @param callback - TBD.
     * @param callbackContext
     * @param {...any} args
     */
    repeat(delay: any, repeatCount: any, callback: any, callbackContext: any, ...args: any[]): TimerEvent;
    /**
     * TBD.
     * @param delay - TBD.
     * @param callback - TBD.
     * @param callbackContext
     * @param {...any} args
     */
    loop(delay: any, callback: any, callbackContext: any, ...args: any[]): TimerEvent;
    /**
     * TBD.
     * @param delay - TBD.
     */
    start(delay: any): void;
    /**
     * TBD.
     * @param clearEvents
     */
    stop(clearEvents?: boolean): void;
    /**
     * TBD.
     * @param event
     */
    remove(event: any): boolean;
    /**
     * TBD.
     */
    order(): void;
    /**
     * TBD.
     * @param a
     * @param b
     */
    sortHandler(a: any, b: any): 0 | 1 | -1;
    /**
     * TBD.
     */
    clearPendingEvents(): void;
    /**
     * TBD.
     * @param time
     */
    update(time: any): boolean;
    /**
     * TBD.
     */
    pause(): void;
    /**
     * TBD.
     */
    _pause(): void;
    /**
     * TBD.
     * @param baseTime
     */
    adjustEvents(baseTime: any): void;
    /**
     * TBD.
     */
    resume(): void;
    /**
     * TBD.
     */
    _resume(): void;
    /**
     * TBD.
     */
    removeAll(): void;
    /**
     * TBD.
     */
    destroy(): void;
    /**
     * TBD.
     */
    get next(): number;
    /**
     * TBD.
     */
    get duration(): number;
    /**
     * TBD.
     */
    get length(): number;
    /**
     * TBD.
     */
    get ms(): number;
    /**
     * TBD.
     */
    get seconds(): number;
}
import { Signal } from './signal';
import { TimerEvent } from './timer_event';
//# sourceMappingURL=timer.d.ts.map