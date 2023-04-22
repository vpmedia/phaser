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
     * @param {number} delay - TBD.
     * @param {boolean} loop - TBD.
     * @param {number} repeatCount - TBD.
     * @param {Function} callback - TBD.
     * @param {object} callbackContext - TBD.
     * @param {...any} args - TBD.
     * @returns {TimerEvent} TBD.
     */
    create(delay: number, loop: boolean, repeatCount: number, callback: Function, callbackContext: object, args: any[]): TimerEvent;
    /**
     * TBD.
     * @param {number} delay - TBD.
     * @param {Function} callback - TBD.
     * @param {object} callbackContext - TBD.
     * @param {...any} args - TBD.
     * @returns {TimerEvent} TBD.
     */
    add(delay: number, callback: Function, callbackContext: object, ...args: any[]): TimerEvent;
    /**
     * TBD.
     * @param {number} delay - TBD.
     * @param {number} repeatCount - TBD.
     * @param {Function} callback - TBD.
     * @param {object} callbackContext - TBD.
     * @param {...any} args - TBD.
     * @returns {TimerEvent} TBD.
     */
    repeat(delay: number, repeatCount: number, callback: Function, callbackContext: object, ...args: any[]): TimerEvent;
    /**
     * TBD.
     * @param {number} delay - TBD.
     * @param {Function} callback - TBD.
     * @param {object} callbackContext - TBD.
     * @param {...any} args - TBD.
     * @returns {TimerEvent} TBD.
     */
    loop(delay: number, callback: Function, callbackContext: object, ...args: any[]): TimerEvent;
    /**
     * TBD.
     * @param {number} delay - TBD.
     */
    start(delay: number): void;
    /**
     * TBD.
     * @param {boolean} clearEvents - TBD.
     */
    stop(clearEvents?: boolean): void;
    /**
     * TBD.
     * @param {Event} event - TBD.
     * @returns {boolean} TBD.
     */
    remove(event: Event): boolean;
    /**
     * TBD.
     */
    order(): void;
    /**
     * TBD.
     * @param {TimerEvent} a - TBD.
     * @param {TimerEvent} b - TBD.
     * @returns {number} TBD.
     */
    sortHandler(a: TimerEvent, b: TimerEvent): number;
    /**
     * TBD.
     */
    clearPendingEvents(): void;
    /**
     * TBD.
     * @param {number} time - TBD.
     * @returns {boolean} TBD.
     */
    update(time: number): boolean;
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
     * @param {number} baseTime - TBD.
     */
    adjustEvents(baseTime: number): void;
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
     * @returns {number} TBD.
     */
    get next(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get duration(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get length(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get ms(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get seconds(): number;
}
import { Game } from './game';
import { Signal } from './signal';
import { TimerEvent } from './timer_event';
//# sourceMappingURL=timer.d.ts.map