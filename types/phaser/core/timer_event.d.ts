export class TimerEvent {
    /**
     * TBD.
     * @param {import('./timer.js').Timer} timer - TBD.
     * @param {number} delay - TBD.
     * @param {number} tick - TBD.
     * @param {number} repeatCount - TBD.
     * @param {boolean} loop - TBD.
     * @param {Function} callback - TBD.
     * @param {object} callbackContext - TBD.
     * @param {...any} args - TBD.
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