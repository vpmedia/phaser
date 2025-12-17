export class Timer {
    /**
     * Creates a new Timer instance.
     * @param {import('./game.js').Game} game - The game instance.
     * @param {boolean} autoDestroy - Whether to automatically destroy the timer when it completes.
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
     * Creates a new TimerEvent.
     * @param {number} delay - The delay in milliseconds before the event fires.
     * @param {boolean} loop - Whether the event should loop indefinitely.
     * @param {number} repeatCount - The number of times to repeat the event (0 = infinite).
     * @param {Function} callback - The function to call when the event fires.
     * @param {object} callbackContext - The context in which to call the callback.
     * @param {...any} args - Arguments to pass to the callback function.
     * @returns {TimerEvent} The created TimerEvent.
     */
    create(delay: number, loop: boolean, repeatCount: number, callback: Function, callbackContext: object, args: any[]): TimerEvent;
    /**
     * Creates a new TimerEvent that runs once.
     * @param {number} delay - The delay in milliseconds before the event fires.
     * @param {Function} callback - The function to call when the event fires.
     * @param {object} callbackContext - The context in which to call the callback.
     * @param {...any} args - Arguments to pass to the callback function.
     * @returns {TimerEvent} The created TimerEvent.
     */
    add(delay: number, callback: Function, callbackContext?: object, ...args: any[]): TimerEvent;
    /**
     * Creates a new TimerEvent that repeats a specified number of times.
     * @param {number} delay - The delay in milliseconds before the event fires.
     * @param {number} repeatCount - The number of times to repeat the event (0 = infinite).
     * @param {Function} callback - The function to call when the event fires.
     * @param {object} callbackContext - The context in which to call the callback.
     * @param {...any} args - Arguments to pass to the callback function.
     * @returns {TimerEvent} The created TimerEvent.
     */
    repeat(delay: number, repeatCount: number, callback: Function, callbackContext?: object, ...args: any[]): TimerEvent;
    /**
     * Creates a new TimerEvent that loops indefinitely.
     * @param {number} delay - The delay in milliseconds before the event fires.
     * @param {Function} callback - The function to call when the event fires.
     * @param {object} callbackContext - The context in which to call the callback.
     * @param {...any} args - Arguments to pass to the callback function.
     * @returns {TimerEvent} The created TimerEvent.
     */
    loop(delay: number, callback: Function, callbackContext?: object, ...args: any[]): TimerEvent;
    /**
     * Starts the timer.
     * @param {number} delay - The delay in milliseconds before starting (optional).
     */
    start(delay?: number): void;
    /**
     * Stops the timer.
     * @param {boolean} clearEvents - Whether to clear all events (default: true).
     */
    stop(clearEvents?: boolean): void;
    /**
     * Removes a TimerEvent from the timer.
     * @param {TimerEvent | null | undefined} event - The TimerEvent to remove.
     * @returns {boolean} True if the event was removed, false otherwise.
     */
    remove(event: TimerEvent | null | undefined): boolean;
    /**
     * Orders the timer events by their next tick time.
     */
    order(): void;
    /**
     * Sorts TimerEvents by their tick time.
     * @param {TimerEvent} a - First TimerEvent to compare.
     * @param {TimerEvent} b - Second TimerEvent to compare.
     * @returns {number} Comparison result (-1, 0, or 1).
     */
    sortHandler(a: TimerEvent, b: TimerEvent): number;
    /**
     * Clears pending events from the timer.
     */
    clearPendingEvents(): void;
    /**
     * Updates the timer state at a given time.
     * @param {number} time - The current time in milliseconds.
     * @returns {boolean} True if the timer should continue running, false if it should be destroyed.
     */
    update(time: number): boolean;
    /**
     * Pauses the timer.
     */
    pause(): void;
    /**
     * Internal pause method for the timer.
     */
    _pause(): void;
    /**
     * Adjusts timer events when time has jumped (e.g., when tab is switched).
     * @param {number} baseTime - The time to adjust from.
     */
    adjustEvents(baseTime: number): void;
    /**
     * Resumes the timer.
     */
    resume(): void;
    /**
     * Internal resume method for the timer.
     */
    _resume(): void;
    /**
     * Removes all events from the timer.
     */
    removeAll(): void;
    /**
     * Destroys the timer and cleans up resources.
     */
    destroy(): void;
    /**
     * Gets the next tick time for the timer.
     * @returns {number} The next tick time in milliseconds.
     */
    get next(): number;
    /**
     * Gets the duration until the next event.
     * @returns {number} The duration in milliseconds.
     */
    get duration(): number;
    /**
     * Gets the number of active events in the timer.
     * @returns {number} The number of events.
     */
    get length(): number;
    /**
     * Gets the elapsed time since the timer started.
     * @returns {number} The elapsed time in milliseconds.
     */
    get ms(): number;
    /**
     * Gets the elapsed time in seconds since the timer started.
     * @returns {number} The elapsed time in seconds.
     */
    get seconds(): number;
}
import { TimerEvent } from './timer_event.js';
import { Signal } from './signal.js';
//# sourceMappingURL=timer.d.ts.map