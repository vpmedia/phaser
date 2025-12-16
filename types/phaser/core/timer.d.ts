export class Timer {
    /**
     * TBD.
     * @param {import('./game.js').Game} game - TBD.
     * @param {boolean} autoDestroy - TBD.
     */
    constructor(game: import("./game.js").Game, autoDestroy?: boolean);
    game: import("./game.js").Game;
    /** @type {boolean} */
    running: boolean;
    /** @type {boolean} */
    autoDestroy: boolean;
    /** @type {boolean} */
    expired: boolean;
    /** @type {number} */
    elapsed: number;
    /** @type {TimerEvent[]} */
    events: TimerEvent[];
    /** @type {Signal} */
    onComplete: Signal;
    /** @type {number} */
    nextTick: number;
    /** @type {number} */
    timeCap: number;
    /** @type {boolean} */
    paused: boolean;
    /** @type {boolean} */
    _codePaused: boolean;
    /** @type {number} */
    _started: number;
    /** @type {number} */
    _pauseStarted: number;
    /** @type {number} */
    _pauseTotal: number;
    /** @type {number} */
    _now: number;
    /** @type {number} */
    _len: number;
    /** @type {number} */
    _marked: number;
    /** @type {number} */
    _i: number;
    /** @type {number} */
    _diff: number;
    /** @type {number} */
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
    add(delay: number, callback: Function, callbackContext?: object, ...args: any[]): TimerEvent;
    /**
     * TBD.
     * @param {number} delay - TBD.
     * @param {number} repeatCount - TBD.
     * @param {Function} callback - TBD.
     * @param {object} callbackContext - TBD.
     * @param {...any} args - TBD.
     * @returns {TimerEvent} TBD.
     */
    repeat(delay: number, repeatCount: number, callback: Function, callbackContext?: object, ...args: any[]): TimerEvent;
    /**
     * TBD.
     * @param {number} delay - TBD.
     * @param {Function} callback - TBD.
     * @param {object} callbackContext - TBD.
     * @param {...any} args - TBD.
     * @returns {TimerEvent} TBD.
     */
    loop(delay: number, callback: Function, callbackContext?: object, ...args: any[]): TimerEvent;
    /**
     * TBD.
     * @param {number} delay - TBD.
     */
    start(delay?: number): void;
    /**
     * TBD.
     * @param {boolean} clearEvents - TBD.
     */
    stop(clearEvents?: boolean): void;
    /**
     * TBD.
     * @param {TimerEvent | null | undefined} event - TBD.
     * @returns {boolean} TBD.
     */
    remove(event: TimerEvent | null | undefined): boolean;
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
import { TimerEvent } from './timer_event.js';
import { Signal } from './signal.js';
//# sourceMappingURL=timer.d.ts.map