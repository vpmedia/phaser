export class Timer {
    /**
     * TBD.
     * @param {Game} game - TBD.
     * @param {boolean} autoDestroy - TBD.
     */
    constructor(game: Game, autoDestroy?: boolean);
    game: Game;
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
     * @param {Function} callback - TBD.
     * @param callbackContext
     * @param args - TBD.
     */
    create(delay: any, loop: any, repeatCount: any, callback: Function, callbackContext: any, args: any): TimerEvent;
    /**
     * TBD.
     * @param delay - TBD.
     * @param {Function} callback - TBD.
     * @param callbackContext
     * @param {...any} args
     */
    add(delay: any, callback: Function, callbackContext: any, ...args: any[]): TimerEvent;
    /**
     * TBD.
     * @param delay - TBD.
     * @param repeatCount
     * @param {Function} callback - TBD.
     * @param callbackContext
     * @param {...any} args
     */
    repeat(delay: any, repeatCount: any, callback: Function, callbackContext: any, ...args: any[]): TimerEvent;
    /**
     * TBD.
     * @param delay - TBD.
     * @param {Function} callback - TBD.
     * @param callbackContext
     * @param {...any} args
     */
    loop(delay: any, callback: Function, callbackContext: any, ...args: any[]): TimerEvent;
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
     * @param {Event} event - TBD.
     */
    remove(event: Event): boolean;
    /**
     * TBD.
     */
    order(): void;
    /**
     * TBD.
     * @param a - TBD.
     * @param b - TBD.
     */
    sortHandler(a: any, b: any): 0 | 1 | -1;
    /**
     * TBD.
     */
    clearPendingEvents(): void;
    /**
     * TBD.
     * @param time - TBD.
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
     * @param baseTime - TBD.
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
import { Game } from './game';
import { Signal } from './signal';
import { TimerEvent } from './timer_event';
//# sourceMappingURL=timer.d.ts.map