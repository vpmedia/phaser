export class TimerEvent {
    /**
     * TBD.
     * @param {Timer} timer - TBD.
     * @param {number} delay - TBD.
     * @param {number} tick - TBD.
     * @param {number} repeatCount - TBD.
     * @param {boolean} loop - TBD.
     * @param {Function} callback - TBD.
     * @param {object} callbackContext - TBD.
     * @param {...any} args - TBD.
     */
    constructor(timer: Timer, delay: number, tick: number, repeatCount: number, loop: boolean, callback: Function, callbackContext: object, args: any[]);
    timer: Timer;
    delay: number;
    tick: number;
    repeatCount: number;
    loop: boolean;
    callback: Function;
    callbackContext: any;
    args: any;
    pendingDelete: boolean;
}
import { Timer } from './timer';
//# sourceMappingURL=timer_event.d.ts.map