export class TimerEvent {
    /**
     * TBD.
     * @param timer - TBD.
     * @param delay - TBD.
     * @param tick - TBD.
     * @param repeatCount - TBD.
     * @param loop - TBD.
     * @param {Function} callback - TBD.
     * @param {object} callbackContext - TBD.
     * @param args - TBD.
     */
    constructor(timer: any, delay: any, tick: any, repeatCount: any, loop: any, callback: Function, callbackContext: object, args: any);
    timer: any;
    delay: any;
    tick: any;
    repeatCount: number;
    loop: any;
    callback: Function;
    callbackContext: any;
    args: any;
    pendingDelete: boolean;
}
//# sourceMappingURL=timer_event.d.ts.map