export class TimerEvent {
    /**
     * TBD.
     * @param timer
     * @param delay - TBD.
     * @param tick
     * @param repeatCount
     * @param loop
     * @param callback - TBD.
     * @param callbackContext
     * @param args - TBD.
     */
    constructor(timer: any, delay: any, tick: any, repeatCount: any, loop: any, callback: any, callbackContext: any, args: any);
    timer: any;
    delay: any;
    tick: any;
    repeatCount: number;
    loop: any;
    callback: any;
    callbackContext: any;
    args: any;
    pendingDelete: boolean;
}
//# sourceMappingURL=timer_event.d.ts.map