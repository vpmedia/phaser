export class TimerEvent {
    /**
     * Creates a new TimerEvent instance.
     * @param {import('./timer.js').Timer} timer - Reference to the parent Timer.
     * @param {number} delay - The delay (in milliseconds) before the event should occur.
     * @param {number} tick - The tick (in milliseconds) at which the event should occur.
     * @param {number} repeatCount - The number of times the event should repeat.
     * @param {boolean} loop - Whether the event should loop.
     * @param {Function} callback - The function to call when the event occurs.
     * @param {object} callbackContext - The context in which to call the callback function.
     * @param {...any} args - Arguments to pass to the callback function.
     */
    constructor(timer: import("./timer.js").Timer, delay: number, tick: number, repeatCount: number, loop: boolean, callback: Function, callbackContext: object, args: any[]);
    timer: import("./timer.js").Timer;
    delay: number;
    tick: number;
    repeatCount: number;
    loop: boolean;
    callback: Function;
    callbackContext: any;
    args: any;
    pendingDelete: boolean;
}
//# sourceMappingURL=timer_event.d.ts.map